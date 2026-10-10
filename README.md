# jellyfin-setup

Sanitized, versioned record of the **running Jellyfin 12.2** frontend setup. This repository documents the effective CSS, JavaScript Injector scripts, SmartLists definitions, and plugin versions. It is not a backup of Jellyfin's `/config` directory.

## Current stack

| Component | Installed version / state | Purpose |
| --- | --- | --- |
| Jellyfin | 12.2.0 | Server and web client |
| Abyss theme | Official upstream `v1.2.3` | Jellyfin 12 custom CSS |
| Media Bar Enhanced | 3.9.1.0 | Home hero and trailers |
| Jellyfin Enhanced | 12.11.0.0 | Frontend integrations |
| SmartLists | 12.0.3.0 (stable) | Four automatic Home collections |
| JavaScript Injector | 4.0.0.0 | Custom Home sections and visuals |
| Media Cleaner | **3.7.1.120000 (own fork)** | Manually tagged Leaving Soon with a 14-day notice and active-playback-safe deletion |
| Seasonals | 3.3.0.0 | Seasonal effects |

See [docs/plugins.md](docs/plugins.md) for the other loaded plugins and details.

## Current Home sections

The [`02 - SmartLists Home`](javascript/02-smartlists-home.js) Injector script renders four SmartLists collections plus the Media Cleaner **Leaving Soon** collection. The Leaving Soon posters show **English deadline badges** (such as `14 days left`) from the plugin's actual deadline API, without assuming the tag was added 14 days before deletion.

Leaving Soon items are selected **manually** by adding the exact Jellyfin tag `leaving-soon` to a movie or series. Automatic eligibility by age or watch history is not intended. **The destructive Media Cleaner cleanup task's daily trigger is currently disabled** after the fork rollout; notices and collection refreshes still work, but automated deletion will not run until that trigger is explicitly restored.

## Start here

- [Setup](docs/setup.md) — how the present configuration fits together
- [Plugin stack](docs/plugins.md) — installed versions, including the Media Cleaner fork
- [Injector scripts](javascript/README.md) — current script order and functionality
- [SmartLists](smartlists/README.md) — four SmartLists plus the separate Leaving Soon collection
- [Third-party notices](THIRD_PARTY_NOTICES.md)

## Repository layout

```text
css/          Active Custom CSS
javascript/   JavaScript Injector scripts
smartlists/   Sanitized definitions of the four SmartLists
docs/         Current setup and plugin documentation
```

## Privacy and compatibility

Never commit raw Jellyfin configuration, personal media metadata, account names or IDs, tokens, credentials, private hostnames/URLs, or Leaving Soon state databases here. Runtime state stays on the server.

Target: Jellyfin 12.2 server and its web interface. Upstream Abyss v1.2.3 introduced Jellyfin 12 support, but upstream's published testing matrix does not expressly certify 12.2.
