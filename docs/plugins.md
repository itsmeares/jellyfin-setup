# Plugins

These are the plugin versions used by the current Jellyfin 12.0 stable setup. This is a snapshot of the working stack, not a recommendation to install whatever happens to be newest.

| Component | Version / state | Notes |
| --- | --- | --- |
| Jellyfin | 12.0 stable | Web/webview target |
| Media Bar Enhanced | 3.7.0.0 | Home hero and trailer playback |
| Jellyfin Enhanced | 12.6.0.0 | Seerr and *arr integrations |
| SmartLists | 12.0.0.21 | Builds the collections used by the custom Home rows |
| JavaScript Injector | 4.0.0.0 | Runs the custom Home scripts |
| Fanart | 14.2609.13.0 | Artwork metadata provider |
| TMDb Box Sets | 13.2609.15.0 | Automatic movie collections |
| Trakt | 30.2606.17.0 | Trakt integration |
| Seasonals | 3.3.0.0 | Seasonal UI effects |
| Abyss | upstream `main` CSS | Imported directly from Custom CSS |

## Plugin repositories

The official Jellyfin repository uses the stable manifest:

```text
https://repo.jellyfin.org/files/plugin/manifest.json
```

Third-party repositories are only kept for plugins used by this setup.

## Home and theme choices

Media Bar Enhanced owns the Home hero/trailer area, so Abyss Spotlight is not used. Abyss Home-section reordering is also left disabled because the custom Home layout is handled by the Injector scripts instead.

Abyss fits Jellyfin's legacy interface more closely than the modern Jellyfin 12 interface, so some theme details differ between the two layouts.

Seasonals is independent from the custom Home row logic and only adds visual effects.

## Integrations

Jellyfin Enhanced is configured against Seerr and the *arr services on the running server. Their URLs and API keys stay in Jellyfin itself and are deliberately not mirrored here.

The Home scripts are documented in [javascript/README.md](../javascript/README.md), and the SmartLists definitions are in [smartlists/README.md](../smartlists/README.md).
