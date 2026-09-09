# Plugins

These are the versions used by the Jellyfin 12.0 stable setup after the 2026-09-09 migration from RC7. The table is a snapshot of the working server, not a recommendation to install whatever happens to be newest.

## Active / restored after the stable migration

| Component | Version / state | Notes |
| --- | --- | --- |
| Jellyfin | 12.0 stable | Web/webview target |
| Media Bar Enhanced | 3.7.0.0 | Home hero and trailer playback |
| Jellyfin Enhanced | 12.6.0.0 | Jellyfin 12 stable build; Seerr and *arr integrations enabled |
| SmartLists | 12.0.0.21 | Builds the collections used by the custom Home rows |
| JavaScript Injector | 4.0.0.0 | Jellyfin 12 build used for the custom snippets |
| Fanart | 14.2609.13.0 | Artwork metadata provider |
| TMDb Box Sets | 13.2609.15.0 | Automatic movie collections |
| Trakt | 30.2606.17.0 | Trakt integration |
| Seasonals | 3.3.0.0 | Optional seasonal UI effects; current catalog release includes Jellyfin 12/RC7 support |
| Abyss | upstream `main` CSS | Imported directly from Custom CSS |

## Held out / pending post-migration confirmation

These plugins were deliberately not copied back blindly from the RC7 install. Their old plugin directories are preserved outside the live plugin folder until the stable install state is confirmed.

| Component | Last known version | State |
| --- | --- | --- |
| Intro Skipper | 12.0.2.0 | Jellyfin 12 build; pending restore/verification |
| JellyChat | 2.1.4.0 | Jellyfin 12-compatible build; pending restore/verification |
| NotifySync | 5.8.3.0 | Jellyfin 12 Preview build; intentionally treated as preview |

## Plugin repositories

The official Jellyfin repository should use the stable manifest:

```text
https://repo.jellyfin.org/files/plugin/manifest.json
```

Do not leave the official Jellyfin Unstable/RC repository enabled after moving to 12.0 stable. Third-party repositories remain separate and should only be added for the plugins actually used by this setup.

## Home and theme choices

Media Bar Enhanced owns the Home hero/trailer area, so Abyss Spotlight is not installed. Abyss Home-section reordering is also left disabled because the custom Home layout is handled by the Injector scripts instead.

Abyss still fits Jellyfin's legacy interface better than the modern Jellyfin 12 interface. Because of that, old theme overrides should not be assumed to work unchanged with this stack.

Seasonals is optional visual polish and is not part of the custom Home row logic. If it causes client-side layout or playback UI regressions, disable it independently without changing the Injector or SmartLists setup.

## Integrations

Jellyfin Enhanced is configured against Seerr and the *arr services on the running server. Their URLs and API keys stay in Jellyfin itself and are deliberately not mirrored here.

For the rest of the restore flow, see the [setup guide](setup.md). The Home scripts are documented in [javascript/README.md](../javascript/README.md), and the SmartLists definitions are in [smartlists/README.md](../smartlists/README.md).
