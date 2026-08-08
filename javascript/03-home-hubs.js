(() => {
    'use strict';

    /*
     * 03 - Home Hubs
     *
     * StudioHubs frontend görünümü/davranışı temel alınmıştır:
     * https://github.com/MFerretti27/StudioHubs
     *
     * StudioHubs MIT lisanslıdır.
     *
     * StudioHubs plugininin kurulmasını gerektirmez.
     * Jellyfin'in authenticated ApiClient'ını kullanır.
     */

    const STREAMING_ID = 'rs-streaming-hubs';
    const STUDIOS_ID = 'rs-studio-hubs';
    const STYLE_ID = 'rs-studiohubs-style';
    const MODAL_ID = 'rs-studio-hubs-modal';

    /*
     * StudioHubs assetlerini belirli commit'e pinliyoruz.
     */
    const ASSET_COMMIT =
        '74e15b42de6050d0cb2a9941edfa3dcbed55b19c';

    const ASSET_BASE =
        'https://raw.githubusercontent.com/' +
        'MFerretti27/StudioHubs/' +
        ASSET_COMMIT +
        '/Resources/studiohubs';

    /*
     * ============================================================
     * STREAMING SERVICES
     * ============================================================
     */

    const STREAMING = [
        {
            name: 'Apple TV+',

            slug: 'apple-tv-plus',
            ext: 'png',

            aliases: [
                'Apple TV+',
                'Apple TV',
                'Apple TV Plus',
                'Apple Originals',
                'Apple Original',
                'Apple TV+ Originals',
                'Apple Studios'
            ]
        },

        {
            name: 'Amazon Prime',

            slug: 'prime',
            ext: 'png',

            aliases: [
                'Amazon Prime',
                'Amazon Prime Video',
                'Prime Video',
                'Amazon Studios',
                'Amazon MGM Studios'
            ]
        },

        {
            name: 'Netflix',

            slug: 'netflix',
            ext: 'webp',

            aliases: [
                'Netflix',
                'Netflix Studios'
            ]
        },

        {
            name: 'HBO Max',

            /*
             * StudioHubs upstream'de HBO Max asseti yok.
             * Logo + intro ayrı kaynaklardan ekleniyor;
             * kart/hover davranışı aynı component'i kullanıyor.
             */

            logo:
                'https://upload.wikimedia.org/wikipedia/commons/b/b3/HBO_Max_%282025%29.svg',

            invertLogo: true,

            video:
                'https://raw.githubusercontent.com/mrtxiv/networks-video-collection/main/networks%20videos/hbomax.mp4',

            aliases: [
                'HBO Max',
                'Max',
                'HBO Max Originals',
                'Max Originals',
                'HBO',
                'HBO Films',
                'HBO Entertainment'
            ]
        },

        {
            name: 'Disney+',

            slug: 'disney',
            ext: 'webp',

            aliases: [
                'Disney+',
                'Disney Plus',
                'Disney+ Originals',
                'Disney Plus Originals'
            ]
        }
    ];

    /*
     * ============================================================
     * STUDIOS
     * ============================================================
     */

    const STUDIOS = [
        {
            name: 'DC',

            slug: 'dc',
            ext: 'webp',

            aliases: [
                'DC',
                'DC Entertainment',
                'DC Studios'
            ]
        },

        {
            name: 'Marvel Studios',

            slug: 'marvel-studios',
            ext: 'webp',

            aliases: [
                'Marvel Studios',
                'Marvel',
                'Marvel Entertainment',
                'Marvel Studios LLC',
                'Marvel Television'
            ]
        },

        {
            name: 'Pixar',

            slug: 'pixar',
            ext: 'webp',

            aliases: [
                'Pixar',
                'Pixar Animation Studios',
                'Disney Pixar'
            ]
        },

        {
            name: 'Walt Disney Pictures',

            slug: 'walt-disney-pictures',
            ext: 'webp',

            aliases: [
                'Walt Disney Pictures',
                'Walt Disney Animation Studios',
                'Walt Disney Studios Motion Pictures'
            ]
        },

        {
            name: 'Warner Bros. Pictures',

            slug: 'warner-bros-pictures',
            ext: 'webp',

            aliases: [
                'Warner Bros. Pictures',
                'Warner Bros',
                'Warner Bros.',
                'Warner Brothers',
                'Warner Bros. Television',
                'Warner Bros. Animation'
            ]
        },

        {
            name: 'Lucasfilm Ltd.',

            slug: 'lucasfilm-ltd',
            ext: 'webp',

            aliases: [
                'Lucasfilm Ltd.',
                'Lucasfilm',
                'Lucasfilm Ltd',
                'Lucasfilm Animation'
            ]
        },

        {
            name: 'Columbia Pictures',

            slug: 'columbia-pictures',
            ext: 'webp',

            aliases: [
                'Columbia Pictures',
                'Columbia',
                'Columbia Pictures Industries'
            ]
        },

        {
            name: 'Paramount Pictures',

            slug: 'paramount-pictures',
            ext: 'webp',

            aliases: [
                'Paramount Pictures',
                'Paramount',
                'Paramount Pictures Corporation'
            ]
        },

        {
            name: 'MGM Studios',

            slug: 'metro-goldwyn-mayer',
            ext: 'png',

            aliases: [
                'MGM Studios',
                'MGM',
                'Metro Goldwyn Mayer',
                'Metro-Goldwyn-Mayer',
                'Metro-Goldwyn-Mayer Studios',
                'Amazon MGM Studios'
            ]
        },

        {
            name: 'Sony Pictures',

            slug: 'sony',
            ext: 'png',

            aliases: [
                'Sony Pictures',
                'Sony',
                'Sony Pictures Entertainment',
                'Sony Pictures Classics',
                'Sony Pictures Animation',
                'Sony Pictures Television'
            ]
        },

        {
            name: 'DreamWorks Animation',

            slug: 'dreamworks-animation',
            ext: 'webp',

            aliases: [
                'DreamWorks Animation',
                'DreamWorks',
                'DreamWorks Pictures'
            ]
        },

        {
            name: 'Lionsgate',

            slug: 'lionsgate',
            ext: 'webp',

            aliases: [
                'Lionsgate',
                'Lions Gate',
                'Lions Gate Entertainment',
                'Lions Gate Entertainment Corp',
                'Lions Gate Films'
            ]
        },

        {
            name: 'Fox',

            slug: 'fox',
            ext: 'png',

            aliases: [
                'Fox',
                '20th Century Fox',
                '20th Century Studios',
                'Twentieth Century Fox',
                'Twentieth Century Studios',
                'Fox Searchlight Pictures',
                'Searchlight Pictures'
            ]
        },

        {
            name: 'Universal',

            slug: 'universal',
            ext: 'webp',

            aliases: [
                'Universal',
                'Universal Pictures',
                'Universal Television',
                'Universal Studios'
            ]
        }
    ];

    /*
     * ============================================================
     * CACHE
     * ============================================================
     */

    const studioCache = {
        items: null,
        timestamp: 0
    };

    const STUDIO_CACHE_MS =
        6 * 60 * 60 * 1000;

    /*
     * ============================================================
     * BASIC HELPERS
     * ============================================================
     */

    function isHome() {
        const hash =
            (location.hash || '')
                .toLowerCase();

        return (
            hash === '#/home' ||
            hash === '#!/home' ||
            hash.includes('home.html')
        );
    }

    function normalizeName(value) {
        return String(value || '')
            .trim()
            .toLowerCase();
    }

    function normalizeLoose(value) {
        return String(value || '')
            .toLowerCase()

            .replace(
                /[().,\-:_+]/g,
                ' '
            )

            .replace(
                /\b(ltd|llc|inc|company|co|corp|the|pictures|studios|animation|film|films)\b/g,
                ' '
            )

            .replace(
                /\s+/g,
                ' '
            )

            .trim();
    }

    function getServerId() {
        if (
            typeof ApiClient?.serverId ===
            'function'
        ) {
            return (
                ApiClient.serverId() ||
                ''
            );
        }

        return (
            ApiClient?._serverInfo?.Id ||
            ApiClient?.serverInfo?.Id ||
            ''
        );
    }

    async function getUserId() {
        if (
            typeof ApiClient?.getCurrentUserId ===
            'function'
        ) {
            const id =
                ApiClient.getCurrentUserId();

            if (id) {
                return String(id);
            }
        }

        try {
            const user =
                await ApiClient
                    ?.getCurrentUser?.();

            if (user?.Id) {
                return String(user.Id);
            }
        } catch {
            // ignore
        }

        return String(
            ApiClient?._serverInfo?.UserId ||
            ''
        );
    }

    /*
     * ============================================================
     * ASSETS
     * ============================================================
     */

    function logoUrl(entry) {
        if (entry.logo) {
            return entry.logo;
        }

        if (
            !entry.slug ||
            !entry.ext
        ) {
            return '';
        }

        return (
            `${ASSET_BASE}/studios/` +
            `${entry.slug}.${entry.ext}`
        );
    }

    function videoUrl(entry) {
        if (entry.video === false) {
            return '';
        }

        if (entry.video) {
            return entry.video;
        }

        if (!entry.slug) {
            return '';
        }

        return (
            `${ASSET_BASE}/videos/` +
            `${entry.slug}.mp4`
        );
    }

    /*
     * ============================================================
     * STYLES
     * ============================================================
     */

    function ensureStyle() {
        if (
            document.getElementById(
                STYLE_ID
            )
        ) {
            return;
        }

        const style =
            document.createElement(
                'style'
            );

        style.id =
            STYLE_ID;

        style.textContent = `
            #${STREAMING_ID},
            #${STUDIOS_ID} {
                display: flex;
                flex-direction: column;
                --studiohubs-inline-padding: 3.2%;
                position: relative;
            }

            #${STREAMING_ID}
            .studio-hubs-native-scroller,

            #${STUDIOS_ID}
            .studio-hubs-native-scroller {
                position: relative;
            }

            #${STREAMING_ID}
            .studio-hubs-row,

            #${STUDIOS_ID}
            .studio-hubs-row {
                gap: 12px;
            }

            #${STREAMING_ID}
            .sectionTitleContainer,

            #${STUDIOS_ID}
            .sectionTitleContainer {
                padding-inline:
                    var(
                        --studiohubs-inline-padding
                    );

                margin-bottom:
                    12px;
            }

            /*
             * StudioHubs 1:1 card geometry.
             */

            .studio-hub-card {
                position: relative;

                flex: 0 0 auto;

                width:
                    clamp(
                        136px,
                        17vw,
                        210px
                    );

                aspect-ratio:
                    16 / 9;

                border-radius:
                    12px;

                overflow:
                    hidden;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        0.12
                    );

                background:
                    #1c1c2e;

                text-decoration:
                    none;

                color:
                    #fff;

                scroll-snap-align:
                    start;
            }

            .studio-hub-img {
                display:
                    block;

                width:
                    100%;

                height:
                    100%;

                box-sizing:
                    border-box;

                position:
                    relative;

                z-index:
                    1;

                object-fit:
                    cover;

                object-position:
                    center;

                transition:
                    opacity .3s ease,
                    transform .4s ease;
            }

            .studio-hub-logo {
                position:
                    absolute;

                inset:
                    0;

                object-fit:
                    contain;

                object-position:
                    center;

                padding:
                    10px;

                transform:
                    scale(.9);

                z-index:
                    1;

                background:
                    transparent;
            }

            /*
             * HBO Max logo source is black monochrome.
             */
            .rs-studiohub-invert-logo {
                filter:
                    invert(1);
            }

            .studio-hub-card:hover
            .studio-hub-logo {
                transform:
                    scale(.95);
            }

            .studio-hub-card:hover
            .studio-hub-img {
                transform:
                    scale(1);
            }

            /*
             * Hover video.
             */

            .studio-hub-video {
                position:
                    absolute;

                inset:
                    0;

                z-index:
                    2;

                width:
                    100%;

                height:
                    100%;

                object-fit:
                    cover;

                opacity:
                    0;

                transition:
                    opacity .2s ease;
            }

            .studio-hub-video.on {
                opacity:
                    1;
            }

            /*
             * =====================================================
             * MODAL
             * =====================================================
             */

            .studio-hubs-modal-open {
                overflow:
                    hidden;
            }

            .studio-hubs-modal {
                position:
                    fixed;

                inset:
                    0;

                z-index:
                    3000;

                display:
                    none;
            }

            .studio-hubs-modal.is-open {
                display:
                    block;
            }

            .studio-hubs-modal__backdrop {
                position:
                    absolute;

                inset:
                    0;

                background:
                    rgba(
                        0,
                        0,
                        0,
                        .72
                    );
            }

            .studio-hubs-modal__dialog {
                position:
                    relative;

                z-index:
                    1;

                width:
                    min(
                        1100px,
                        94vw
                    );

                max-height:
                    90vh;

                margin:
                    5vh auto;

                border-radius:
                    14px;

                overflow:
                    hidden;

                background:
                    #121726;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .18
                    );

                box-shadow:
                    0
                    25px
                    80px
                    rgba(
                        0,
                        0,
                        0,
                        .45
                    );

                display:
                    flex;

                flex-direction:
                    column;
            }

            .studio-hubs-modal__close {
                position:
                    absolute;

                top:
                    10px;

                right:
                    12px;

                z-index:
                    2;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .25
                    );

                background:
                    rgba(
                        0,
                        0,
                        0,
                        .45
                    );

                color:
                    #fff;

                border-radius:
                    999px;

                padding:
                    .35rem .7rem;

                font-size:
                    .85rem;

                cursor:
                    pointer;
            }

            .studio-hubs-modal__header {
                padding:
                    16px 20px;

                border-bottom:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .12
                    );
            }

            .studio-hubs-modal__title {
                margin:
                    0;

                font-size:
                    clamp(
                        1.1rem,
                        1.8vw,
                        1.5rem
                    );

                color:
                    #fff;
            }

            .studio-hubs-modal__body {
                padding:
                    14px
                    18px
                    18px;

                overflow:
                    auto;

                display:
                    grid;

                gap:
                    16px;
            }

            .studio-hubs-modal__section-title {
                margin:
                    0
                    0
                    10px;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        .92
                    );

                font-size:
                    1rem;
            }

            .studio-hubs-modal__grid {
                display:
                    grid;

                grid-template-columns:
                    repeat(
                        auto-fill,
                        minmax(
                            132px,
                            1fr
                        )
                    );

                gap:
                    10px;
            }

            .studio-hubs-modal__item {
                text-decoration:
                    none;

                color:
                    #fff;

                border-radius:
                    10px;

                overflow:
                    hidden;

                border:
                    1px solid
                    rgba(
                        255,
                        255,
                        255,
                        .16
                    );

                background:
                    rgba(
                        255,
                        255,
                        255,
                        .03
                    );
            }

            .studio-hubs-modal__item-image,
            .studio-hubs-modal__item-fallback {
                width:
                    100%;

                aspect-ratio:
                    2 / 3;

                display:
                    block;
            }

            .studio-hubs-modal__item-image {
                object-fit:
                    cover;
            }

            .studio-hubs-modal__item-fallback {
                display:
                    grid;

                place-items:
                    center;

                text-align:
                    center;

                padding:
                    8px;

                box-sizing:
                    border-box;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        .8
                    );
            }

            .studio-hubs-modal__item-title {
                padding:
                    8px;

                font-size:
                    .83rem;

                line-height:
                    1.2;

                min-height:
                    2.4em;
            }

            .studio-hubs-modal__empty {
                grid-column:
                    1 / -1;

                border:
                    1px dashed
                    rgba(
                        255,
                        255,
                        255,
                        .2
                    );

                border-radius:
                    10px;

                padding:
                    14px;

                color:
                    rgba(
                        255,
                        255,
                        255,
                        .76
                    );
            }

            /*
             * =====================================================
             * TABLET / MOBILE
             * =====================================================
             */

            @media (
                max-width: 820px
            ) {
                #${STREAMING_ID},
                #${STUDIOS_ID} {
                    --studiohubs-inline-padding:
                        2.6%;
                }

                .studio-hub-card {
                    width:
                        clamp(
                            140px,
                            40vw,
                            200px
                        );
                }

                .studio-hubs-modal__dialog {
                    width:
                        96vw;

                    max-height:
                        92vh;

                    margin:
                        4vh auto;
                }

                .studio-hubs-modal__body {
                    padding:
                        12px;
                }

                .studio-hubs-modal__grid {
                    grid-template-columns:
                        repeat(
                            auto-fill,
                            minmax(
                                118px,
                                1fr
                            )
                        );
                }
            }
        `;

        document.head
            .appendChild(
                style
            );
    }

    /*
     * ============================================================
     * LOAD JELLYFIN STUDIOS
     * ============================================================
     */

    async function loadStudios() {
        const now =
            Date.now();

        if (
            studioCache.items &&
            now -
                studioCache.timestamp <
                STUDIO_CACHE_MS
        ) {
            return studioCache.items;
        }

        let items = [];

        try {
            if (
                typeof ApiClient
                    ?.getStudios ===
                'function'
            ) {
                const userId =
                    await getUserId();

                const result =
                    await ApiClient
                        .getStudios(
                            userId,
                            {
                                Limit:
                                    5000
                            }
                        );

                items =
                    result?.Items ||
                    [];
            }
        } catch {
            items = [];
        }

        if (!items.length) {
            try {
                const url =
                    ApiClient.getUrl(
                        'Studios',
                        {
                            Limit:
                                5000,

                            Recursive:
                                true,

                            SortBy:
                                'SortName',

                            SortOrder:
                                'Ascending'
                        }
                    );

                const result =
                    await ApiClient
                        .getJSON(
                            url
                        );

                items =
                    result?.Items ||
                    [];
            } catch {
                items = [];
            }
        }

        studioCache.items =
            items;

        studioCache.timestamp =
            now;

        return items;
    }

    /*
     * ============================================================
     * MATCHING
     * ============================================================
     */

    function scoreStudio(
        studioName,
        entry
    ) {
        const studioExact =
            normalizeName(
                studioName
            );

        const studioLoose =
            normalizeLoose(
                studioName
            );

        let score =
            0;

        for (
            let i = 0;
            i < entry.aliases.length;
            i++
        ) {
            const alias =
                entry.aliases[i];

            const aliasExact =
                normalizeName(
                    alias
                );

            const aliasLoose =
                normalizeLoose(
                    alias
                );

            if (
                studioExact ===
                aliasExact
            ) {
                score =
                    Math.max(
                        score,
                        100 - i
                    );
            }

            if (
                studioLoose &&
                studioLoose ===
                    aliasLoose
            ) {
                score =
                    Math.max(
                        score,
                        80 - i
                    );
            }

            if (
                aliasExact &&
                studioExact
                    .includes(
                        aliasExact
                    )
            ) {
                score =
                    Math.max(
                        score,
                        40 - i
                    );
            }
        }

        return score;
    }

    function resolveEntry(
        entry,
        studios
    ) {
        const matches =
            studios
                .map(
                    studio => ({
                        studio,

                        score:
                            scoreStudio(
                                studio.Name,
                                entry
                            )
                    })
                )

                .filter(
                    item =>
                        item.score >
                        0
                )

                .sort(
                    (a, b) =>
                        b.score -
                        a.score
                );

        if (!matches.length) {
            return null;
        }

        const ids = [];

        /*
         * Aliaslar farklı Jellyfin Studio ID'lerine bölünmüş
         * olabileceği için ilk dört eşleşmeyi aynı Hub altında
         * birleştiriyoruz.
         */
        for (
            const match
            of matches
        ) {
            const id =
                String(
                    match
                        .studio
                        ?.Id ||
                    ''
                );

            if (
                id &&
                !ids.includes(id)
            ) {
                ids.push(id);
            }

            if (
                ids.length >=
                4
            ) {
                break;
            }
        }

        return {
            entry,

            primary:
                matches[0]
                    .studio,

            studioIds:
                ids
        };
    }

    function resolveEntries(
        entries,
        studios
    ) {
        return entries
            .map(
                entry =>
                    resolveEntry(
                        entry,
                        studios
                    )
            )

            .filter(Boolean);
    }

    /*
     * ============================================================
     * HUB CARD
     * ============================================================
     */

    function createCard(
        resolved
    ) {
        const entry =
            resolved.entry;

        const card =
            document.createElement(
                'a'
            );

        card.className =
            'studio-hub-card';

        card.href =
            '#';

        card.dataset.studioName =
            entry.name;

        card.dataset.studioId =
            resolved.primary
                ?.Id ||
            '';

        card.dataset.studioIds =
            resolved.studioIds
                .join(',');

        card.setAttribute(
            'aria-label',
            entry.name
        );

        /*
         * Logo
         */

        const img =
            document.createElement(
                'img'
            );

        img.className =
            'studio-hub-img ' +
            'studio-hub-logo';

        if (
            entry.invertLogo
        ) {
            img.classList.add(
                'rs-studiohub-invert-logo'
            );
        }

        img.src =
            logoUrl(
                entry
            );

        img.alt =
            entry.name;

        img.decoding =
            'async';

        card.appendChild(
            img
        );

        /*
         * Hover video
         */

        const hoverVideoUrl =
            videoUrl(
                entry
            );

        if (
            hoverVideoUrl
        ) {
            const video =
                document.createElement(
                    'video'
                );

            video.className =
                'studio-hub-video';

            video.muted =
                true;

            video.loop =
                true;

            video.playsInline =
                true;

            video.preload =
                'none';

            video.src =
                hoverVideoUrl;

            card.appendChild(
                video
            );

            card.addEventListener(
                'mouseenter',
                () => {
                    try {
                        video.currentTime =
                            0;
                    } catch {
                        // ignore
                    }

                    video
                        .play()
                        .catch(
                            () => {}
                        );

                    video
                        .classList
                        .add(
                            'on'
                        );
                }
            );

            card.addEventListener(
                'mouseleave',
                () => {
                    video.pause();

                    video
                        .classList
                        .remove(
                            'on'
                        );
                }
            );

            video.addEventListener(
                'error',
                () => {
                    video
                        .classList
                        .remove(
                            'on'
                        );
                }
            );
        }

        /*
         * Open Movies / TV Shows Hub modal
         */

        card.addEventListener(
            'click',
            event => {
                if (
                    event.button !==
                        0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }

                event.preventDefault();

                openHubModal(
                    resolved
                );
            }
        );

        return card;
    }

    /*
     * ============================================================
     * CREATE SECTION
     * ============================================================
     */

    function createSection(
        id,
        title,
        resolved
    ) {
        const section =
            document.createElement(
                'div'
            );

        section.id =
            id;

        section.className =
            'homeSection';

        section.innerHTML = `
            <div
                class="
                    sectionTitleContainer
                    sectionTitleContainer-cards
                "
            >
                <h2
                    class="
                        sectionTitle
                        sectionTitle-cards
                    "
                >
                    ${title}
                </h2>
            </div>

            <div
                is="emby-scroller"

                class="
                    studio-hubs-native-scroller
                    padded-top-focusscale
                    padded-bottom-focusscale
                "

                data-centerfocus="true"
            >
                <div
                    is="emby-itemscontainer"

                    class="
                        itemsContainer
                        scrollSlider
                        focuscontainer-x
                        animatedScrollX
                        studio-hubs-row
                    "

                    data-monitor="
                        videoplayback,
                        markplayed
                    "

                    role="list"
                ></div>
            </div>
        `;

        const row =
            section.querySelector(
                '.studio-hubs-row'
            );

        for (
            const item
            of resolved
        ) {
            row.appendChild(
                createCard(
                    item
                )
            );
        }

        return section;
    }

    /*
     * ============================================================
     * HOME PLACEMENT
     * ============================================================
     */

    function getSectionTitle(
        section
    ) {
        return String(
            section
                ?.querySelector(
                    '.sectionTitle'
                )
                ?.textContent ||
            ''
        )
            .trim()
            .toLowerCase();
    }

    function placeStreaming(
        section
    ) {
        /*
         * Top Rated Movies
         * Top Rated TV Shows
         * Streaming Services
         * Currently Airing
         * Recent Releases
         */

        const anchor =
            document.querySelector(
                '#rs-smartlists-home ' +
                '.rs-smartlist-section' +
                '[data-rs-smartlist="Top Rated TV Shows"]'
            );

        if (
            !anchor
                ?.parentElement
        ) {
            return false;
        }

        if (
            section
                .previousElementSibling !==
            anchor
        ) {
            anchor
                .insertAdjacentElement(
                    'afterend',
                    section
                );
        }

        return true;
    }

    function placeStudios(
        section
    ) {
        const home =
            document.querySelector(
                '.homeSectionsContainer'
            );

        if (!home) {
            return false;
        }

        /*
         * Recently Added in Movies
         * Recently Added in TV Shows
         * Studios
         */

        const children =
            Array.from(
                home.children
            );

        const target =
            children.find(
                child => {
                    const title =
                        getSectionTitle(
                            child
                        );

                    return (
                        title.includes(
                            'recently added in tv shows'
                        ) ||

                        title.includes(
                            'latest tv shows'
                        )
                    );
                }
            );

        if (
            target &&
            target.parentElement ===
                home
        ) {
            if (
                target
                    .nextElementSibling !==
                section
            ) {
                target
                    .insertAdjacentElement(
                        'afterend',
                        section
                    );
            }

            return true;
        }

        /*
         * Fallback: Studios son Home row.
         */

        if (
            home
                .lastElementChild !==
            section
        ) {
            home.appendChild(
                section
            );
        }

        return true;
    }

    /*
     * ============================================================
     * MODAL
     * ============================================================
     */

    function ensureModal() {
        let root =
            document.getElementById(
                MODAL_ID
            );

        if (root) {
            return root;
        }

        root =
            document.createElement(
                'div'
            );

        root.id =
            MODAL_ID;

        root.className =
            'studio-hubs-modal';

        root.innerHTML = `
            <div
                class="
                    studio-hubs-modal__backdrop
                "
            ></div>

            <div
                class="
                    studio-hubs-modal__dialog
                "

                role="dialog"
                aria-modal="true"
            >
                <button
                    type="button"

                    class="
                        studio-hubs-modal__close
                    "

                    aria-label="Close"
                >
                    Close
                </button>

                <div
                    class="
                        studio-hubs-modal__header
                    "
                >
                    <h2
                        class="
                            studio-hubs-modal__title
                        "
                    >
                        Studio
                    </h2>
                </div>

                <div
                    class="
                        studio-hubs-modal__body
                    "
                >
                    <section>
                        <h3
                            class="
                                studio-hubs-modal__section-title
                            "
                        >
                            Movies
                        </h3>

                        <div
                            class="
                                studio-hubs-modal__grid
                            "

                            data-section="movies"
                        ></div>
                    </section>

                    <section>
                        <h3
                            class="
                                studio-hubs-modal__section-title
                            "
                        >
                            TV Shows
                        </h3>

                        <div
                            class="
                                studio-hubs-modal__grid
                            "

                            data-section="series"
                        ></div>
                    </section>
                </div>
            </div>
        `;

        const close =
            () => {
                root
                    .classList
                    .remove(
                        'is-open'
                    );

                document.body
                    .classList
                    .remove(
                        'studio-hubs-modal-open'
                    );
            };

        root
            .querySelector(
                '.studio-hubs-modal__backdrop'
            )
            .addEventListener(
                'click',
                close
            );

        root
            .querySelector(
                '.studio-hubs-modal__close'
            )
            .addEventListener(
                'click',
                close
            );

        document.body
            .appendChild(
                root
            );

        return root;
    }

    function closeModal() {
        const root =
            document.getElementById(
                MODAL_ID
            );

        if (!root) {
            return;
        }

        root
            .classList
            .remove(
                'is-open'
            );

        document.body
            .classList
            .remove(
                'studio-hubs-modal-open'
            );
    }

    document.addEventListener(
        'keydown',
        event => {
            if (
                event.key ===
                'Escape'
            ) {
                closeModal();
            }
        }
    );

    /*
     * ============================================================
     * MODAL DATA
     * ============================================================
     */

    async function getHubItems(
        studioIds,
        includeType
    ) {
        const userId =
            await getUserId();

        if (
            !userId ||
            !studioIds.length
        ) {
            return [];
        }

        const result =
            await ApiClient
                .getItems(
                    userId,
                    {
                        Recursive:
                            true,

                        IncludeItemTypes:
                            includeType,

                        StudioIds:
                            studioIds
                                .join(','),

                        SortBy:
                            'DateCreated,SortName',

                        SortOrder:
                            'Descending',

                        Fields:
                            'ImageTags,' +
                            'PrimaryImageAspectRatio,' +
                            'ProductionYear,' +
                            'CommunityRating',

                        ImageTypeLimit:
                            1,

                        EnableImageTypes:
                            'Primary',

                        Limit:
                            48
                    }
                );

        return (
            result?.Items ||
            []
        );
    }

    function itemHref(
        item
    ) {
        const params =
            new URLSearchParams({
                id:
                    item.Id
            });

        const sid =
            getServerId();

        if (sid) {
            params.set(
                'serverId',
                sid
            );
        }

        return (
            '#/details?' +
            params.toString()
        );
    }

    function itemImage(
        item
    ) {
        const tag =
            item
                ?.ImageTags
                ?.Primary;

        if (
            !item?.Id ||
            !tag
        ) {
            return '';
        }

        return ApiClient
            .getImageUrl(
                item.Id,
                {
                    type:
                        'Primary',

                    tag,

                    fillWidth:
                        360,

                    fillHeight:
                        540,

                    quality:
                        90
                }
            );
    }

    function renderModalGrid(
        grid,
        items,
        emptyText
    ) {
        grid.innerHTML =
            '';

        if (
            !items.length
        ) {
            const empty =
                document.createElement(
                    'div'
                );

            empty.className =
                'studio-hubs-modal__empty';

            empty.textContent =
                emptyText;

            grid.appendChild(
                empty
            );

            return;
        }

        for (
            const item
            of items
        ) {
            const card =
                document.createElement(
                    'a'
                );

            card.className =
                'studio-hubs-modal__item';

            card.href =
                itemHref(
                    item
                );

            card.setAttribute(
                'aria-label',
                item.Name ||
                ''
            );

            card.addEventListener(
                'click',
                closeModal
            );

            const url =
                itemImage(
                    item
                );

            if (url) {
                const img =
                    document.createElement(
                        'img'
                    );

                img.className =
                    'studio-hubs-modal__item-image';

                img.src =
                    url;

                img.alt =
                    item.Name ||
                    '';

                card.appendChild(
                    img
                );
            } else {
                const fallback =
                    document.createElement(
                        'div'
                    );

                fallback.className =
                    'studio-hubs-modal__item-fallback';

                fallback.textContent =
                    item.Name ||
                    'Untitled';

                card.appendChild(
                    fallback
                );
            }

            const title =
                document.createElement(
                    'div'
                );

            title.className =
                'studio-hubs-modal__item-title';

            title.textContent =
                item.Name ||
                'Untitled';

            card.appendChild(
                title
            );

            grid.appendChild(
                card
            );
        }
    }

    async function openHubModal(
        resolved
    ) {
        const root =
            ensureModal();

        const title =
            root.querySelector(
                '.studio-hubs-modal__title'
            );

        const moviesGrid =
            root.querySelector(
                '[data-section="movies"]'
            );

        const seriesGrid =
            root.querySelector(
                '[data-section="series"]'
            );

        title.textContent =
            resolved
                .entry
                .name;

        moviesGrid.innerHTML =
            '<div class="studio-hubs-modal__empty">Loading movies...</div>';

        seriesGrid.innerHTML =
            '<div class="studio-hubs-modal__empty">Loading TV shows...</div>';

        root
            .classList
            .add(
                'is-open'
            );

        document.body
            .classList
            .add(
                'studio-hubs-modal-open'
            );

        try {
            const [
                movies,
                series
            ] =
                await Promise.all([
                    getHubItems(
                        resolved
                            .studioIds,

                        'Movie'
                    ),

                    getHubItems(
                        resolved
                            .studioIds,

                        'Series'
                    )
                ]);

            renderModalGrid(
                moviesGrid,
                movies,
                'No movies found for this studio.'
            );

            renderModalGrid(
                seriesGrid,
                series,
                'No TV shows found for this studio.'
            );
        } catch (
            error
        ) {
            console.error(
                '[Home Hubs] Modal fetch failed',
                error
            );

            renderModalGrid(
                moviesGrid,
                [],
                'Failed to load movies.'
            );

            renderModalGrid(
                seriesGrid,
                [],
                'Failed to load TV shows.'
            );
        }
    }

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    let rendering =
        false;

    async function render() {
        if (!isHome()) {
            document
                .getElementById(
                    STREAMING_ID
                )
                ?.remove();

            document
                .getElementById(
                    STUDIOS_ID
                )
                ?.remove();

            return;
        }

        if (
            rendering ||
            !window.ApiClient
        ) {
            return;
        }

        /*
         * Streaming placement depends on SmartLists Home.
         */
        if (
            !document.getElementById(
                'rs-smartlists-home'
            )
        ) {
            return;
        }

        rendering =
            true;

        try {
            ensureStyle();

            const studios =
                await loadStudios();

            const streaming =
                resolveEntries(
                    STREAMING,
                    studios
                );

            const studioEntries =
                resolveEntries(
                    STUDIOS,
                    studios
                );

            /*
             * Streaming
             */

            let streamingSection =
                document.getElementById(
                    STREAMING_ID
                );

            if (
                !streamingSection &&
                streaming.length
            ) {
                streamingSection =
                    createSection(
                        STREAMING_ID,
                        'Streaming Services',
                        streaming
                    );
            }

            if (
                streamingSection
            ) {
                placeStreaming(
                    streamingSection
                );
            }

            /*
             * Studios
             */

            let studioSection =
                document.getElementById(
                    STUDIOS_ID
                );

            if (
                !studioSection &&
                studioEntries.length
            ) {
                studioSection =
                    createSection(
                        STUDIOS_ID,
                        'Studios',
                        studioEntries
                    );
            }

            if (
                studioSection
            ) {
                placeStudios(
                    studioSection
                );
            }

            console.log(
                '[Home Hubs] Streaming:',
                streaming.map(
                    item =>
                        item.entry.name
                )
            );

            console.log(
                '[Home Hubs] Studios:',
                studioEntries.map(
                    item =>
                        item.entry.name
                )
            );
        } catch (
            error
        ) {
            console.error(
                '[Home Hubs] Render failed',
                error
            );
        } finally {
            rendering =
                false;
        }
    }

    /*
     * ============================================================
     * JELLYFIN SPA LIFECYCLE
     * ============================================================
     */

    let timer =
        null;

    function schedule(
        rebuild = false
    ) {
        if (
            rebuild
        ) {
            document
                .getElementById(
                    STREAMING_ID
                )
                ?.remove();

            document
                .getElementById(
                    STUDIOS_ID
                )
                ?.remove();

            closeModal();
        }

        clearTimeout(
            timer
        );

        timer =
            setTimeout(
                render,
                180
            );
    }

    new MutationObserver(
        () => {
            schedule(
                false
            );
        }
    ).observe(
        document.body,
        {
            childList:
                true,

            subtree:
                true
        }
    );

    window.addEventListener(
        'hashchange',
        () => {
            schedule(
                true
            );
        }
    );

    document.addEventListener(
        'viewshow',
        () => {
            schedule(
                true
            );
        }
    );

    schedule(
        true
    );
})();
