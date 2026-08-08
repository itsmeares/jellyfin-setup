# Plugins

These are the versions currently used by this Jellyfin 12 RC setup. The table is a snapshot of the working server, not a recommendation to install whatever happens to be newest.

| Component | Version / state | Notes |
| --- | --- | --- |
| Jellyfin | 12.0 RC | Web/webview target |
| Media Bar Enhanced | 3.3.0.0 | Home hero and trailer playback |
| Jellyfin Enhanced | 12.1.0.0 | Seerr and *arr integrations enabled |
| SmartLists | 12.0.0.12 | Builds the collections used by the custom Home rows |
| JavaScript Injector | 3.6.0.0 | Jellyfin 12-compatible build used for the custom snippets |
| NotifySync | v12 preview build | Used with the Jellyfin 12 setup |
| JellyChat | 2.1.0.0 | Installed and used with Jellyfin 12 |
| TMDb Box Sets | 13.2605.13.0 | Installed |
| Fanart | 14.2605.10.0 | Installed |
| Trakt | 30.2606.17.0 | Installed |
| Abyss | upstream `main` CSS | Imported directly from Custom CSS |

## Home and theme choices

Media Bar Enhanced owns the Home hero/trailer area, so Abyss Spotlight is not installed. Abyss Home-section reordering is also left disabled because the custom Home layout is handled by the Injector scripts instead.

Abyss currently fits Jellyfin's legacy interface better than the modern/experimental Jellyfin 12 interface. Because of that, old theme overrides should not be assumed to work unchanged with this stack.

## Integrations

Jellyfin Enhanced is configured against Seerr and the *arr services on the running server. Their URLs and API keys stay in Jellyfin itself and are deliberately not mirrored here.

For the rest of the restore flow, see the [setup guide](setup.md). The Home scripts are documented in [javascript/README.md](../javascript/README.md), and the SmartLists definitions are in [smartlists/README.md](../smartlists/README.md).
