# Current Jellyfin setup

This document records the **current** working setup, targeting Jellyfin 12.2.0. It is intentionally not a migration history. Installed versions and details are in [plugins.md](plugins.md).

## Server and plugin setup

- Jellyfin Docker image: `jellyfin/jellyfin:12.2`.
- Official stable plugin repository: `https://repo.jellyfin.org/files/plugin/manifest.json`.
- SmartLists **12.0.3.0** stable produces the four custom SmartLists collections.
- JavaScript Injector **4.0.0.0** runs the Home customization entries.
- Media Cleaner **3.7.1.120000** is the locally built [itsmeares active-playback fork](https://github.com/itsmeares/jellyfin-plugin-media-cleaner/tree/feature/active-playback-leaving-soon); the upstream 3.7.0 build is not the installed one.

## Custom CSS

[`css/custom.css`](../css/custom.css) matches the active Custom CSS field:

1. Official upstream Abyss **`v1.2.3`** pinned CDN import for Jellyfin 12.
2. Media Bar Enhanced iPad landscape layout adjustment.
3. Extra Home spacing below the custom Studios section.

Abyss Spotlight and Abyss section reordering are disabled because Media Bar Enhanced and the Injector scripts own the Home layout. The old temporary Abyss-JF12 CSS fork is not in use.

## Injector and Home sections

Refer to [`javascript/README.md`](../javascript/README.md) for the entries and load order.

The Home script [`02-smartlists-home.js`](../javascript/02-smartlists-home.js) renders **Top Rated Movies**, **Top Rated TV Shows**, **Leaving Soon**, **Currently Airing**, and **Recent Releases**. The four non-Leaving-Soon rows resolve SmartLists-generated collections; Leaving Soon resolves the collection created by Media Cleaner.

The other scripts handle the core Home changes, the Streaming Services/Studios hubs, and Up Next artwork. The current Home screenshot places Streaming Services between Top Rated TV Shows and Leaving Soon; section layout is also affected by the separate hubs script and the standard Jellyfin Home sections.

The Leaving Soon Home poster shows a small **English** countdown badge (for example `14 days left`). It calls the Media Cleaner authenticated API `MediaCleaner/LeavingSoon/Collections/{collectionId}/Cards` and uses each item's `DeleteAfterUtc`/status. It does **not** calculate deadlines from `DateCreated` or the moment a tag was edited. The script uses Jellyfin's absolute poster positioning to avoid collapsing thumbnails to zero height.

## Leaving Soon configuration

1. An admin manually assigns the exact Jellyfin metadata tag `leaving-soon` to a film or to a series itself. There is no automatic content-selection rule beyond that tag.
2. Media Cleaner has a tagged movie cleanup rule (added-age trigger 0) and a tagged episode rule (added-age trigger 0) with **whole-series deletion** when all episodes match. Unrelated content must not be selected.
3. Leaving Soon notice period is **14 days**; the publication/refresh job adds matching titles to the Leaving Soon collection. Publication is not deletion, and users retain their playback progress.
4. The active-playback fork checks current playback sessions rather than saved progress. A live stream can temporarily block destructive cleanup even after the notice window ends.
5. **At the time of this snapshot, the destructive `Media Cleaner cleanup` scheduled-task daily trigger remains removed.** Thus 14-day notices and the Home badges work, but automated file deletion is **not enabled**. The refresh trigger remains scheduled. Restore the deletion trigger only by deliberate choice after reviewing safety.

Keep the plugin's `MediaCleaner.xml` settings and `state-v1.db` notice/protection database when maintaining or reinstalling. Both files contain server-specific settings/state and are **not included** in this repository. A pre-fork backup was made before deployment.

Sonarr/Radarr have deleted-item unmonitoring turned on, but deleting an entire series may require explicitly unmonitoring the series in Sonarr to stop future monitoring.

## SmartLists

The four rules are documented in [smartlists/README.md](../smartlists/README.md). Their sanitized reference definitions are in `smartlists/*.example.json`; Leaving Soon is **not** a fifth SmartLists rule.

## Secrets

The live Jellyfin `/config` tree, user IDs, database contents, private service URLs, and API keys remain on the server. Do not commit them. Only non-secret script and CSS configuration belongs here.
