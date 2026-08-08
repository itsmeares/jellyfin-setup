(() => {
    'use strict';

    const WRAPPER_ID = 'rs-smartlists-home';
    const STYLE_ID = 'rs-smartlists-home-style';
    const MAX_ITEMS = 20;

    const ROWS = [
        { name: 'Top Rated Movies', sort: 'rating' },
        { name: 'Top Rated TV Shows', sort: 'rating' },
        { name: 'Currently Airing', sort: 'lastEpisode' },
        { name: 'Recent Releases', sort: 'releaseDate' }
    ];

    const episodeCache = new Map();

    function isHome() {
        const hash = (location.hash || '').toLowerCase();
        return hash === '#/home'
            || hash === '#!/home'
            || hash.includes('home.html');
    }

    function apiReady() {
        return window.ApiClient
            && typeof ApiClient.getCurrentUserId === 'function'
            && ApiClient.getCurrentUserId();
    }

    function getServerId() {
        if (typeof ApiClient?.serverId === 'function') {
            return ApiClient.serverId() || '';
        }

        return ApiClient?.serverInfo?.Id || '';
    }

    function canonical(value) {
        return String(value || '')
            .trim()
            .replace(/\s*\[smart\]\s*$/i, '')
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    function matchScore(actual, wanted) {
        actual = canonical(actual);
        wanted = canonical(wanted);

        if (actual === wanted) return 100;
        if (
            actual.startsWith(`${wanted} `)
            || actual.endsWith(` ${wanted}`)
        ) return 80;

        if (actual.includes(wanted)) return 50;

        return 0;
    }

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            #${WRAPPER_ID} {
                width: 100%;
            }

            #${WRAPPER_ID} .rs-smartlist-section {
                margin-top: .5em;
            }

            #${WRAPPER_ID} .rs-smartlist-card .cardImageContainer {
                background-color: #242424;
            }

            #${WRAPPER_ID} .rs-placeholder {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1em;
                text-align: center;
                font-weight: 600;
                opacity: .8;
            }

            #${WRAPPER_ID} .cardText {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            #rs-smartlists-home .sectionTitleTextButton,
            #rs-smartlists-home .sectionTitleTextButton:hover,
            #rs-smartlists-home .sectionTitleTextButton:focus {
                text-decoration: none !important;
                color: inherit !important;
            }
        `;

        document.head.appendChild(style);
    }

    function detailsUrl(item) {
        const sid = item.ServerId || getServerId();

        const params = new URLSearchParams({
            id: item.Id
        });

        if (sid) {
            params.set('serverId', sid);
        }

        return `#/details?${params}`;
    }

    function getImage(item) {
        const tag = item?.ImageTags?.Primary;

        if (!tag) return '';

        return ApiClient.getImageUrl(item.Id, {
            type: 'Primary',
            tag,
            maxWidth: 360,
            quality: 90
        });
    }

    function createCard(item, index) {
        const card = document.createElement('div');

        card.className =
            'card overflowPortraitCard card-hoverable show-animation rs-smartlist-card';

        card.dataset.index = index;
        card.dataset.id = item.Id || '';
        card.dataset.type = item.Type || '';
        card.dataset.serverid = item.ServerId || getServerId();
        card.dataset.isfolder = String(Boolean(item.IsFolder));

        const box = document.createElement('div');
        box.className = 'cardBox cardBox-bottompadded';

        const scalable = document.createElement('div');
        scalable.className = 'cardScalable';

        const padder = document.createElement('div');
        padder.className = 'cardPadder cardPadder-overflowPortrait';

        const image = document.createElement('a');

        image.className =
            'cardImageContainer coveredImage cardContent itemAction';

        image.href = detailsUrl(item);
        image.setAttribute('aria-label', item.Name || '');
        image.setAttribute('role', 'img');

        const url = getImage(item);

        if (url) {
            image.style.backgroundImage = `url("${url}")`;
        } else {
            const placeholder = document.createElement('span');
            placeholder.className = 'rs-placeholder';
            placeholder.textContent = item.Name || '';

            image.appendChild(placeholder);
        }

        const footer = document.createElement('div');
        footer.className = 'cardFooter cardFooter-transparent';

        const text = document.createElement('div');
        text.className = 'cardText cardTextCentered';

        const title = document.createElement('a');
        title.className = 'itemAction textActionButton';
        title.href = detailsUrl(item);
        title.title = item.Name || '';
        title.textContent = item.Name || '';

        text.appendChild(title);
        footer.appendChild(text);

        scalable.appendChild(padder);
        scalable.appendChild(image);

        box.appendChild(scalable);
        box.appendChild(footer);

        card.appendChild(box);

        return card;
    }

    async function findCollection(userId, wanted) {
        const result = await ApiClient.getItems(userId, {
            IncludeItemTypes: 'BoxSet',
            Recursive: true,
            SearchTerm: wanted,
            Fields: 'PrimaryImageAspectRatio,SortName,ProviderIds',
            ImageTypeLimit: 1,
            EnableImageTypes: 'Primary',
            Limit: 30
        });

        return (result.Items || [])
            .map(item => ({
                item,
                score: matchScore(item.Name, wanted)
            }))
            .filter(x => x.score)
            .sort((a, b) => b.score - a.score)[0]?.item || null;
    }

    async function getChildren(userId, collection) {
        const result = await ApiClient.getItems(userId, {
            ParentId: collection.Id,
            Recursive: true,
            Fields:
                'PrimaryImageAspectRatio,SortName,CommunityRating,PremiereDate,ProductionYear,DateCreated',
            ImageTypeLimit: 1,
            EnableImageTypes: 'Primary,Backdrop,Thumb',
            Limit: 100
        });

        return result.Items || [];
    }

    function rating(item) {
        const n = Number(item.CommunityRating);
        return Number.isFinite(n) ? n : -1;
    }

    function date(value) {
        const n = Date.parse(value || '');
        return Number.isFinite(n) ? n : 0;
    }

    async function getLastEpisodeDate(userId, series) {
        if (episodeCache.has(series.Id)) {
            return episodeCache.get(series.Id);
        }

        try {
            const result = await ApiClient.getItems(userId, {
                ParentId: series.Id,
                IncludeItemTypes: 'Episode',
                Recursive: true,
                SortBy: 'PremiereDate',
                SortOrder: 'Descending',
                Fields: 'PremiereDate',
                Limit: 1
            });

            const value = date(result.Items?.[0]?.PremiereDate);

            episodeCache.set(series.Id, value);

            return value;
        } catch {
            return 0;
        }
    }

    async function sortItems(userId, items, mode) {
        const result = [...items];

        if (mode === 'rating') {
            result.sort((a, b) => rating(b) - rating(a));
        }

        if (mode === 'releaseDate') {
            result.sort(
                (a, b) =>
                    date(b.PremiereDate) - date(a.PremiereDate)
            );
        }

        if (mode === 'lastEpisode') {
            const dated = await Promise.all(
                result.map(async item => ({
                    item,
                    lastEpisode:
                        item.Type === 'Series'
                            ? await getLastEpisodeDate(userId, item)
                            : 0
                }))
            );

            dated.sort(
                (a, b) =>
                    b.lastEpisode - a.lastEpisode
                    || rating(b.item) - rating(a.item)
            );

            return dated.map(x => x.item);
        }

        return result;
    }

    function createSection(spec, collection, items) {
        const section = document.createElement('div');

        section.className =
            'verticalSection rs-smartlist-section';

        section.dataset.rsSmartlist = spec.name;

        const titleContainer = document.createElement('div');

        titleContainer.className =
            'sectionTitleContainer sectionTitleContainer-cards padded-left';

        const titleLink = document.createElement('a');

        titleLink.className =
            'button-flat button-flat-mini sectionTitleTextButton';

        titleLink.href = detailsUrl(collection);

        const heading = document.createElement('h2');
        heading.className = 'sectionTitle sectionTitle-cards';
        heading.textContent = spec.name;

        const arrow = document.createElement('span');
        arrow.className = 'material-icons chevron_right';
        arrow.setAttribute('aria-hidden', 'true');

        titleLink.appendChild(heading);
        titleLink.appendChild(arrow);
        titleContainer.appendChild(titleLink);

        const shell = document.createElement('div');

        shell.innerHTML = `
            <div is="emby-scroller"
                 class="padded-top-focusscale padded-bottom-focusscale"
                 data-centerfocus="true">
                <div is="emby-itemscontainer"
                     class="itemsContainer scrollSlider focuscontainer-x">
                </div>
            </div>
        `;

        const scroller = shell.firstElementChild;
        const container = scroller.querySelector('.itemsContainer');

        items
            .slice(0, MAX_ITEMS)
            .forEach((item, index) =>
                container.appendChild(createCard(item, index))
            );

        section.appendChild(titleContainer);
        section.appendChild(scroller);

        return section;
    }

    function findAnchor(container) {
        const nextUp =
            container
                .querySelector('a[href*="type=nextup"]')
                ?.closest('.verticalSection');

        if (nextUp) return nextUp;

        const videoSections = [
            ...container.querySelectorAll(
                ':scope > .verticalSection'
            )
        ].filter(section =>
            section.querySelector(
                '.itemsContainer[data-monitor*="videoplayback"]'
            )
        );

        if (videoSections.length) {
            return videoSections[videoSections.length - 1];
        }

        return container.querySelector(
            ':scope > .verticalSection:not(.rs-hide-my-media)'
        );
    }

    let rendering = false;

    async function render() {
        if (!isHome()) {
            document.getElementById(WRAPPER_ID)?.remove();
            return;
        }

        const home =
            document.querySelector('.homeSectionsContainer');

        if (
            !home
            || !apiReady()
            || rendering
            || document.getElementById(WRAPPER_ID)
        ) return;

        rendering = true;

        try {
            ensureStyle();

            const userId = ApiClient.getCurrentUserId();

            const resolved = await Promise.all(
                ROWS.map(async spec => {
                    try {
                        const collection =
                            await findCollection(userId, spec.name);

                        if (!collection) {
                            console.warn(
                                `[RS Home] Collection not found: ${spec.name}`
                            );
                            return null;
                        }

                        const raw =
                            await getChildren(userId, collection);

                        if (!raw.length) return null;

                        const items =
                            await sortItems(
                                userId,
                                raw,
                                spec.sort
                            );

                        return {
                            spec,
                            collection,
                            items
                        };
                    } catch (error) {
                        console.error(
                            `[RS Home] Failed: ${spec.name}`,
                            error
                        );

                        return null;
                    }
                })
            );

            if (!isHome()) return;

            const rows = resolved.filter(Boolean);

            if (!rows.length) {
                console.warn(
                    '[RS Home] No SmartLists rows available.'
                );
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.id = WRAPPER_ID;

            for (const row of rows) {
                wrapper.appendChild(
                    createSection(
                        row.spec,
                        row.collection,
                        row.items
                    )
                );
            }

            const anchor = findAnchor(home);

            if (anchor?.parentElement === home) {
                anchor.insertAdjacentElement(
                    'afterend',
                    wrapper
                );
            } else {
                home.prepend(wrapper);
            }

            console.log(
                `[RS Home] Rendered ${rows.length} SmartLists rows.`
            );
        } finally {
            rendering = false;
        }
    }

    let timer;

    function schedule(rebuild = false) {
        if (rebuild) {
            document.getElementById(WRAPPER_ID)?.remove();
        }

        clearTimeout(timer);
        timer = setTimeout(render, 250);
    }

    new MutationObserver(() => schedule())
        .observe(
            document.body,
            { childList: true, subtree: true }
        );

    window.addEventListener(
        'hashchange',
        () => schedule(true)
    );

    document.addEventListener(
        'viewshow',
        () => schedule(true)
    );

    schedule();
})();