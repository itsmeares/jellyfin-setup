# jellyfin-setup

This repository is the sanitized, versioned copy of the Jellyfin setup I actually run. It focuses on the parts that are easy to lose or awkward to recreate later: custom CSS, JavaScript Injector snippets, SmartLists rules, and the plugin versions they were tested with.

It is **not** a backup of Jellyfin's `/config` directory, and it does not contain server credentials or private integration settings.

## Current stack

| Component | Version / state | Used for |
| --- | --- | --- |
| Jellyfin | 12.0 RC | Server and web/webview target |
| Media Bar Enhanced | 3.3.0.0 | Home hero and trailers |
| Jellyfin Enhanced | 12.1.0.0 | Seerr and *arr integrations |
| SmartLists | 12.0.0.12 | Custom Home collections |
| JavaScript Injector | 3.6.0.0 | Home customisation scripts |
| NotifySync | v12 preview build | Notifications |
| JellyChat | 2.1.0.0 | Jellyfin chat integration |
| Abyss | upstream `main` CSS | Theme |

The full plugin list and compatibility notes live in [docs/plugins.md](docs/plugins.md).

## Start here

- [Setup guide](docs/setup.md) — how the pieces fit together and the order to restore them.
- [Plugin stack](docs/plugins.md) — versions currently used with this setup.
- [JavaScript Injector scripts](javascript/README.md) — exported snippets, load order, and what each one does.
- [SmartLists](smartlists/README.md) — the four Home collections and their sanitized rules.
- [Third-party notices](THIRD_PARTY_NOTICES.md) — attribution for StudioHubs-derived work and external assets.

## Repository layout

```text
css/          Custom CSS used by Jellyfin
javascript/   JavaScript Injector snippets
smartlists/   Sanitized SmartLists definitions
docs/         Setup and plugin notes
```

The files here are meant to stay close to the working server. When a setting can be exported exactly, the exported version is preferred over recreating it from memory.

## Private data

API keys, passwords, access/session tokens, private URLs, user IDs, instance-specific GUIDs, and raw Jellyfin configuration files do not belong in this repository. Documentation should use examples or placeholders where a private value would normally be required.

## Compatibility

This setup currently targets Jellyfin 12 RC web and webview clients. Abyss still matches Jellyfin's legacy interface more closely than the modern/experimental interface, so some theme details can differ when the newer interface is enabled.
