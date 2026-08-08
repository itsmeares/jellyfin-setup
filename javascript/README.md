# JavaScript Injector

These are the custom Injector entries exported from the working Jellyfin setup on 2026-08-08. They are kept as separate snippets so the live configuration is easy to compare with the repository.

All four entries are enabled and require authentication.

## Load order

| Order | Injector name | File | Purpose |
| ---: | --- | --- | --- |
| 1 | `NotifySync Loader` | [`notifysync-loader.js`](notifysync-loader.js) | Loads the NotifySync frontend script |
| 2 | `01 - RS Home Core` | [`01-rs-home-core.js`](01-rs-home-core.js) | Core Home tweaks, including hiding the default My Media row |
| 3 | `02 - SmartLists Home` | [`02-smartlists-home.js`](02-smartlists-home.js) | Renders the SmartLists collections as native-looking Home rows |
| 4 | `03 - Provider Libraries` | [`03-home-hubs.js`](03-home-hubs.js) | Adds Streaming Services and Studios hubs, including their browsing modals |

`03 - Provider Libraries` is the old name of the Injector entry. The script itself has since grown into the Home Hubs implementation, but keeping the entry name documented makes it easier to match this repository against the running server.

## Keeping this in sync

When a snippet changes on the live server, export the working Injector configuration and update the matching file here. The goal is to preserve what actually works, not a reconstruction of what the script was supposed to contain.

The exported scripts in this repository contain no API keys, passwords, access tokens, session tokens, or private server URLs. Keep private values out of future exports as well.

The collections used by `02 - SmartLists Home` are documented in [smartlists/README.md](../smartlists/README.md).
