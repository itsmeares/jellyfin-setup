(() => {
    'use strict';

    const STYLE_ID = 'rs-home-core-style';
    const HIDDEN_CLASS = 'rs-hide-my-media';

    function isHome() {
        const hash = (location.hash || '').toLowerCase();
        return hash === '#/home'
            || hash === '#!/home'
            || hash.includes('home.html');
    }

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .${HIDDEN_CLASS} {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    function hideMyMedia() {
        if (!isHome()) return;

        const container = document.querySelector('.homeSectionsContainer');
        if (!container) return;

        ensureStyle();

        for (const section of container.children) {
            if (
                !(section instanceof HTMLElement)
                || !section.classList.contains('verticalSection')
            ) continue;

            const title =
                section.querySelector('h2.sectionTitle')
                    ?.textContent
                    ?.trim()
                    .toLowerCase() || '';

            const cards = [...section.querySelectorAll('.card[data-id]')];

            const libraryTiles =
                cards.length > 0
                && cards.every(card => {
                    const type = card.dataset.type || '';
                    return type === 'CollectionFolder' || type === 'Channel';
                });

            if (title === 'my media' || libraryTiles) {
                section.classList.add(HIDDEN_CLASS);
            }
        }
    }

    let timer;

    function schedule() {
        clearTimeout(timer);
        timer = setTimeout(hideMyMedia, 150);
    }

    new MutationObserver(schedule)
        .observe(document.body, { childList: true, subtree: true });

    window.addEventListener('hashchange', schedule);
    document.addEventListener('viewshow', schedule);

    schedule();
})();