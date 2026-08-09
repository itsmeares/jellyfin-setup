(() => {
    'use strict';

    const STYLE_ID = 'rs-upnext-artwork-style';

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;

        style.textContent = `
            .upNextDialog.rs-upnext-artwork {
                width: 42em !important;
                max-width: calc(100vw - 3em) !important;
                padding: 1.05em !important;
                gap: 1.15em !important;
                align-items: center !important;

                background-color:
                    rgba(var(--abyss-glass-tint), .78) !important;

                border:
                    1px solid rgba(var(--abyss-accent), .18) !important;

                border-radius: var(--abyss-radius) !important;

                box-shadow:
                    0 12px 40px rgba(0, 0, 0, .28) !important;

                -webkit-backdrop-filter:
                    blur(var(--abyss-glass-blur))
                    saturate(120%) !important;

                backdrop-filter:
                    blur(var(--abyss-glass-blur))
                    saturate(120%) !important;
            }

            .upNextDialog.rs-upnext-artwork > .rs-upnext-art {
                width: 13.25em;
                aspect-ratio: 16 / 9;
                flex: 0 0 auto;
                object-fit: cover;

                border-radius:
                    calc(var(--abyss-radius) * .7);

                box-shadow:
                    0 4px 18px rgba(0, 0, 0, .22);
            }

            .upNextDialog.rs-upnext-artwork > .flex {
                min-width: 0;
                flex: 1 1 auto;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-nextVideoText {
                margin: 0 0 .35em !important;
                font-size: 1.05em !important;
                font-weight: 500 !important;

                color:
                    rgba(var(--abyss-accent), .78) !important;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-countdownText {
                font-weight: 600 !important;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-title {
                width: auto !important;
                max-width: none !important;
                margin: 0 0 .45em !important;

                font-size: 1.12em !important;
                font-weight: 600 !important;

                color:
                    rgba(var(--abyss-accent), .98) !important;

                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-mediainfo {
                font-size: .92em;
                opacity: .82;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-buttons {
                width: auto !important;
                margin-top: .65em !important;
                gap: .6em;
                justify-content: flex-end;
            }

            .upNextDialog.rs-upnext-artwork
            .upNextDialog-button {
                min-height: 2.8em;
                padding: .55em 1.15em !important;

                border-radius:
                    calc(var(--abyss-radius) * .75) !important;

                border:
                    1px solid rgba(var(--abyss-accent), .10) !important;

                box-shadow: none !important;
            }

            .upNextDialog.rs-upnext-artwork
            .btnStartNow {
                background:
                    rgb(var(--abyss-accent)) !important;

                color: #121212 !important;
            }

            .upNextDialog.rs-upnext-artwork
            .btnStartNow:hover,
            .upNextDialog.rs-upnext-artwork
            .btnStartNow:focus-visible {
                background:
                    rgba(var(--abyss-accent), .84) !important;
            }

            .upNextDialog.rs-upnext-artwork
            .btnHide {
                background:
                    rgba(var(--abyss-accent), .08) !important;

                color:
                    rgba(var(--abyss-accent), .88) !important;
            }

            @media (max-width: 700px) {
                .upNextDialog.rs-upnext-artwork {
                    width:
                        min(30em, calc(100vw - 2em)) !important;

                    flex-direction: column !important;
                    align-items: stretch !important;
                }

                .upNextDialog.rs-upnext-artwork
                > .rs-upnext-art {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function normal(value) {
        return String(value || '')
            .trim()
            .toLowerCase();
    }

    function hideEndsAt(dialog) {
        const items = dialog.querySelectorAll(
            '.upNextDialog-mediainfo .mediaInfoItem'
        );

        for (const item of items) {
            const text =
                item.textContent
                    ?.trim()
                    .toLowerCase() || '';

            if (text.startsWith('ends at ')) {
                item.style.display = 'none';
            }
        }
    }

    function getEpisodeImage(item) {
        const primary = item?.ImageTags?.Primary;

        if (primary) {
            return ApiClient.getImageUrl(item.Id, {
                type: 'Primary',
                tag: primary,
                maxWidth: 640,
                quality: 92
            });
        }

        const thumb = item?.ImageTags?.Thumb;

        if (thumb) {
            return ApiClient.getImageUrl(item.Id, {
                type: 'Thumb',
                tag: thumb,
                maxWidth: 640,
                quality: 92
            });
        }

        if (
            item?.ParentThumbItemId
            && item?.ParentThumbImageTag
        ) {
            return ApiClient.getImageUrl(
                item.ParentThumbItemId,
                {
                    type: 'Thumb',
                    tag: item.ParentThumbImageTag,
                    maxWidth: 640,
                    quality: 92
                }
            );
        }

        return '';
    }

    async function enhance(dialog) {
        if (!window.ApiClient?.getCurrentUserId) return;

        const titleEl =
            dialog.querySelector('.upNextDialog-title');

        const title =
            titleEl?.textContent?.trim();

        if (!title) return;

        hideEndsAt(dialog);

        if (
            dialog.dataset.rsArtworkTitle === title
            && dialog.dataset.rsArtworkState
        ) {
            return;
        }

        dialog.dataset.rsArtworkTitle = title;
        dialog.dataset.rsArtworkState = 'loading';

        const match = title.match(
            /^(.*?)\s+-\s+S(\d+):E(\d+)\s+-\s+(.+)$/i
        );

        if (!match) {
            dialog.dataset.rsArtworkState = 'failed';
            return;
        }

        const [
            ,
            seriesName,
            seasonText,
            episodeText,
            episodeName
        ] = match;

        const season = Number(seasonText);
        const episode = Number(episodeText);

        try {
            const result =
                await ApiClient.getItems(
                    ApiClient.getCurrentUserId(),
                    {
                        IncludeItemTypes: 'Episode',
                        Recursive: true,
                        SearchTerm: episodeName,

                        Fields:
                            'SeriesName,ImageTags,' +
                            'ParentThumbItemId,' +
                            'ParentThumbImageTag',

                        ImageTypeLimit: 1,
                        EnableImageTypes: 'Primary,Thumb',
                        Limit: 50
                    }
                );

            const items = result?.Items || [];

            const item =
                items.find(x =>
                    normal(x.SeriesName)
                        === normal(seriesName)
                    && Number(x.ParentIndexNumber)
                        === season
                    && Number(x.IndexNumber)
                        === episode
                )
                || items.find(x =>
                    normal(x.SeriesName)
                        === normal(seriesName)
                    && normal(x.Name)
                        === normal(episodeName)
                );

            const imageUrl = getEpisodeImage(item);

            if (!imageUrl) {
                dialog.dataset.rsArtworkState = 'failed';
                return;
            }

            dialog
                .querySelector('.rs-upnext-art')
                ?.remove();

            const image =
                document.createElement('img');

            image.className = 'rs-upnext-art';
            image.src = imageUrl;
            image.alt = item?.Name || episodeName;

            const content = dialog.firstElementChild;

            dialog.insertBefore(image, content);

            dialog.classList.add(
                'rs-upnext-artwork'
            );

            hideEndsAt(dialog);

            dialog.dataset.rsArtworkState = 'done';
        } catch (error) {
            console.error(
                '[RS Up Next Artwork]',
                error
            );

            dialog.dataset.rsArtworkState = 'failed';
        }
    }

    ensureStyle();

    const observer =
        new MutationObserver(() => {
            for (
                const dialog
                of document.querySelectorAll(
                    '.upNextDialog'
                )
            ) {
                if (
                    !dialog.classList.contains('hide')
                    && !dialog.classList.contains(
                        'upNextDialog-hidden'
                    )
                ) {
                    enhance(dialog);
                }
            }
        });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
})();
