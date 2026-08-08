# JavaScript Injector scripts

These files mirror the custom scripts exported from the running JavaScript Injector configuration on 2026-08-08.

Install them in this order:

| Injector name | File | Enabled | Requires authentication |
| --- | --- | --- | --- |
| `NotifySync Loader` | `notifysync-loader.js` | Yes | Yes |
| `01 - RS Home Core` | `01-rs-home-core.js` | Yes | Yes |
| `02 - SmartLists Home` | `02-smartlists-home.js` | Yes | Yes |
| `03 - Provider Libraries` | `03-home-hubs.js` | Yes | Yes |

`03 - Provider Libraries` is the historical Injector entry name. The current script itself is the Home Hubs implementation that renders both Streaming Services and Studios.

The source export contained no API keys, passwords, access tokens, private server URLs, or other credentials. Do not add such values to these files.
