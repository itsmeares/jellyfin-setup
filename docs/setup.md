# Setup notes

This repository preserves the web customization layer. It is deliberately not a raw backup of Jellyfin's `/config` directory.

## Custom CSS

Copy `css/custom.css` into Jellyfin's Custom CSS field.

The current CSS does three things only:

1. imports the upstream Abyss theme;
2. preserves the iPad landscape spacing required by Media Bar Enhanced;
3. adds bottom spacing after the custom Studios row.

Do not add old Watcha/Jellium theme overrides on top of this baseline.

## JavaScript Injector

The JavaScript files in `javascript/` are intended to be installed as separate snippets in their numbered order.

Only commit exact snippets exported from the working server. Do not reconstruct missing snippets from memory.

## SmartLists

Create the SmartLists documented under `smartlists/` and keep their names stable because the Home JavaScript locates them by name.

## Integrations

Jellyfin Enhanced is configured separately for Seerr and the *arr applications. Store URLs/API keys only in the running Jellyfin configuration, never in this public repository.

## Abyss

Abyss is used as the real upstream theme via `abyss.css`.

This setup intentionally omits:

- Abyss Spotlight;
- Abyss Home-section reordering.

Media Bar Enhanced remains responsible for the Home hero/trailer area.
