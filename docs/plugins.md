# Plugin stack

This file records the versions used by this setup as of 2026-08-08. It is not a recommendation to blindly install the latest version of every plugin.

| Component | Version / state | Notes |
| --- | --- | --- |
| Jellyfin | 12.0 RC | Web/webview target |
| Media Bar Enhanced | 3.3.0.0 | Home hero and trailer playback |
| Jellyfin Enhanced | 12.1.0.0 | Seerr and *arr integration enabled |
| SmartLists | 12.0.0.12 | Smart collections used by custom Home rows |
| JavaScript Injector | 3.6.0.0 | Jellyfin 12-compatible fork used for custom snippets |
| NotifySync | v12 preview build | Used with the Jellyfin 12 setup |
| JellyChat | 2.0.0.0 | Installed |
| TMDb Box Sets | 13.2605.13.0 | Installed |
| Fanart | 14.2605.10.0 | Installed |
| Trakt | 30.2606.17.0 | Installed |
| Abyss | upstream `main` CSS | Custom CSS imports upstream theme directly |

## Important compatibility notes

- The setup intentionally does **not** install Abyss Spotlight because Media Bar Enhanced already provides the Home hero/trailer experience.
- The setup intentionally does **not** use Abyss Home-section reordering.
- Abyss currently targets the legacy Jellyfin interface more accurately than Jellyfin 12's modern/experimental UI. An upstream support request has been opened separately.
- Old Abyss Media Bar / Jellyfin Enhanced override files should not be assumed compatible with the plugin versions above.

## Secrets

Do not store Seerr, Sonarr, Radarr, Bazarr or TMDb API keys in this repository. Keep only example placeholders in documentation.
