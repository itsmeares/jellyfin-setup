# Setup

This document describes the current Jellyfin frontend customisation stack and how its pieces fit together.

## Server

The setup runs on Jellyfin 12.0 stable. The official plugin repository uses:

```text
https://repo.jellyfin.org/files/plugin/manifest.json
```

The plugin versions in use are listed in [plugins.md](plugins.md).

## Custom CSS

[`css/custom.css`](../css/custom.css) is applied through Jellyfin's Custom CSS field.

The current CSS:

1. imports the upstream Abyss theme;
2. keeps the Media Bar Enhanced layout usable on iPad landscape;
3. adds spacing below the custom Studios row.

Old Watcha/Jellium overrides are not part of the current setup.

## JavaScript Injector

The custom Home behaviour lives in [`javascript/`](../javascript/). The load order and purpose of each snippet are documented in [javascript/README.md](../javascript/README.md).

The Home scripts handle the custom Home layout, SmartLists rows, Streaming Services and Studios hubs, and the Up Next artwork changes.

## SmartLists

The four Home collections are documented in [smartlists/README.md](../smartlists/README.md). Their names are kept stable because the Home script resolves the generated collections by name.

The `.example.json` files preserve the rules without user IDs, collection IDs, timestamps, or other instance-specific state.

## Home and theme behaviour

Media Bar Enhanced owns the Home hero and trailer area. Abyss Spotlight is not used, and Abyss Home-section reordering is disabled because the Injector scripts control the Home layout.

Seasonals adds visual effects independently of the Home scripts.

Abyss is imported directly from its upstream `main` CSS. It matches Jellyfin's legacy interface more closely than the modern interface, so some theme details differ between layouts.

## Integrations

Jellyfin Enhanced provides the Seerr and *arr integrations used by the server. Integration URLs and API keys stay in Jellyfin and are not stored in this repository.
