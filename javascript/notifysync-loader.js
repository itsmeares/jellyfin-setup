(() => {
    const id = 'notifysync-client-script';

    if (document.getElementById(id)) {
        return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = '/NotifySync/client.js';
    script.async = true;

    script.onload = () => {
        console.log('[NotifySync Loader] client.js loaded');
    };

    script.onerror = () => {
        console.error('[NotifySync Loader] failed to load client.js');
    };

    document.head.appendChild(script);
})();