# Setup

This is the short version of how the pieces in this repository fit together. It covers the frontend customisation layer only; it is not intended to recreate the whole Jellyfin server from a raw `/config` backup.

## 1. Start from Jellyfin 12.0 stable

This setup now targets the final Jellyfin 12.0 release, not an RC build. The official Jellyfin plugin repository should point at the stable manifest:

```text
https://repo.jellyfin.org/files/plugin/manifest.json
```

If the server was previously on the Jellyfin Unstable/RC repository, switch the official repository back to stable before restoring the normal plugin stack.

Install the matching versions listed in [plugins.md](plugins.md). Plugin compatibility matters more than simply installing the newest release, especially for plugins that inject or modify the Jellyfin Web UI.

## 2. Apply the Custom CSS

Copy [`css/custom.css`](../css/custom.css) into Jellyfin's Custom CSS field.

The current CSS stays deliberately small. It:

1. imports the upstream Abyss theme;
2. keeps the Media Bar Enhanced layout usable on iPad landscape;
3. adds a little breathing room below the custom Studios row.

Old Watcha/Jellium overrides are not part of this setup and should not be layered back on top by default.

## 3. Restore the JavaScript Injector snippets

Add the files from [`javascript/`](../javascript/) as separate JavaScript Injector entries, in the order documented in [javascript/README.md](../javascript/README.md).

Those files are kept as exports from the working server. If the running setup changes, export the new working snippets rather than rebuilding them from memory.

## 4. Recreate the SmartLists

Create the four collections documented in [smartlists/README.md](../smartlists/README.md). Their names need to stay the same because the Home script finds the generated collections by name.

The `.example.json` files preserve the actual rules while leaving out user IDs, collection IDs, timestamps, and other instance-specific state. Choose the appropriate reference user on the server when recreating each collection.

## 5. Configure private integrations on the server

Jellyfin Enhanced handles the Seerr and *arr integrations used by this setup. Configure their URLs and API keys directly in Jellyfin; those values are intentionally not stored in this public repository.

## 6. Restore optional plugins separately

Metadata/integration plugins such as Fanart, TMDb Box Sets, and Trakt can be restored independently from the Home customisation layer. Seasonals is also optional and should be treated as visual polish rather than a dependency of the Home scripts.

Intro Skipper, JellyChat, and NotifySync were intentionally held out during the RC7 -> 12.0 stable migration instead of copying their old binaries back blindly. Check [plugins.md](plugins.md) for their current post-migration status before restoring them.

## Theme behaviour

Abyss is imported directly from its upstream `main` CSS. Media Bar Enhanced remains responsible for the Home hero/trailer area, so this setup does not use Abyss Spotlight or Abyss Home-section reordering.

Once these pieces are in place, the expected Home layout is documented in [smartlists/README.md](../smartlists/README.md).
