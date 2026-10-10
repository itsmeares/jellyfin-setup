# Plugins

Installed/loaded versions verified from Jellyfin 12.2.0 startup logs after the October 2026 update. The Media Cleaner fork was subsequently verified as loaded on the same server. This is a record of the active setup, not a list of suggested future updates.

| Component | Version / state | Notes |
| --- | --- | --- |
| Jellyfin | 12.2.0 | Current Docker server |
| Media Bar Enhanced | 3.9.1.0 | Home hero/trailers |
| Jellyfin Enhanced | 12.11.0.0 | Frontend enhancements and integrations |
| SmartLists | **12.0.3.0**, stable | Four SmartLists collections rendered by JS Injector |
| JavaScript Injector | 4.0.0.0 | Home and Leaving Soon scripts |
| **Media Cleaner** | **3.7.1.120000**, [itsmeares fork](https://github.com/itsmeares/jellyfin-plugin-media-cleaner/tree/feature/active-playback-leaving-soon) | Own Jellyfin 12 ABI build; replaces upstream 3.7.0.120000 |
| Fanart | 15.0.0.0 | Metadata |
| Intro Skipper | 12.0.4.0 | Intro skipping |
| JellyChat | 2.1.4.0 | [Own project](https://github.com/itsmeares/jellychat) |
| NotifySync | 6.0.0.0 | Notifications |
| Seasonals | 3.3.0.0 | Seasonal visuals |
| TMDb Box Sets | 15.0.0.0 | Movie collections |
| Trakt | 33.0.0.0 | Trakt integration |
| TMDb / Studio Images / OMDb / MusicBrainz / ListenBrainz Similarity Provider / AudioDB | 12.2.0.0 | Built-in metadata plugins |
| Abyss theme | [AumGupta/abyss-jellyfin `v1.2.3`](https://github.com/AumGupta/abyss-jellyfin/releases/tag/v1.2.3) | Imported from a pinned CDN URL in `css/custom.css` |

## Repositories and fork policy

- Official Jellyfin manifest: `https://repo.jellyfin.org/files/plugin/manifest.json`
- SmartLists: migrated from its unstable repository to the upstream **stable** manifest; running 12.0.3.0
- Media Cleaner: own [active-playback branch](https://github.com/itsmeares/jellyfin-plugin-media-cleaner/tree/feature/active-playback-leaving-soon), version 3.7.1.120000, target ABI 12.0.0.0. Same plugin GUID as upstream for existing configuration/state continuity. Installed manually, **not** pulled from the upstream catalog; do not blindly overwrite with upstream 3.7.0.
- Abyss: official upstream v1.2.3 is active; the old Jellyfin 12 compatibility CSS fork is no longer referenced.
- JavaScript Injector 4.0.0.0 and NotifySync 6.0.0.0 are on official Jellyfin 12-capable builds. A fork merely existing on GitHub does not mean it is actively deployed.

## Media Cleaner: active Leaving Soon behavior

The user manually applies exact metadata tag `leaving-soon` to a **movie** or the **series-level** record. Two configured deletion rules use that tag: movies, and episodes with **complete series** deletion scope. The Leaving Soon notice is **14 days**. The plugin publishes a Leaving Soon collection, and the `02 - SmartLists Home` Injector script reads its actual `DeleteAfterUtc` values to display English poster badges.

The fork uses real Jellyfin playback sessions, **not saved resume positions**, to decide whether a deletion is unsafe. Items can be announced while playing. At deletion time, an active session prevents the operation, which can be retried later. Users' watch progress is not cleared merely to announce a title.

**Current safety state:** the `Media Cleaner cleanup` scheduled-task daily trigger was manually **removed** before fork deployment and has **not been re-enabled**. The separate Leaving Soon refresh task remains. When the cleanup task is eventually scheduled again, it may delete matching files; review the rules before enabling. The user declined a dry-run. Manual tagging must be preserved as the only intended selection method.

Sonarr and Radarr have `Unmonitor Deleted Episodes` / `Unmonitor Deleted Movies` enabled. This does not necessarily stop Sonarr from monitoring future episodes of a series; manage series monitoring separately when necessary.

## Home/theme

Media Bar Enhanced handles hero/trailers, so Abyss Spotlight and Abyss Home section reordering stay off. The custom Home rows use Injector scripts; Seasonals runs separately. The primary theme is `css/custom.css`, with upstream Abyss pinned to v1.2.3 and a local iPad landscape override.

All credentials, private URLs, live XML config and the plugin's `state-v1.db` must stay out of this repository.
