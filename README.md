# jellyfin-setup

Public, sanitized record of the Jellyfin web setup used on my server.

The repository is intended to preserve the exact working frontend customization layer rather than act as a generic Jellyfin configuration dump.

## Current stack

- Jellyfin 12 RC
- Media Bar Enhanced
- Jellyfin Enhanced
- SmartLists
- JavaScript Injector
- NotifySync
- Abyss theme
- Custom Home rows for SmartLists, streaming services, and studios

## Repository layout

```text
css/          Custom CSS applied in Jellyfin
javascript/   JavaScript Injector snippets
docs/         Setup and plugin notes
smartlists/   SmartLists definitions
```

## Secrets

Do not commit API keys, passwords, access tokens, session tokens, private URLs, or unsanitized Jellyfin configuration files. Example values and placeholders should be used instead.

## Compatibility note

The setup currently targets Jellyfin 12 RC web/webview clients. Abyss itself is upstream CSS; Jellyfin 12's modern/experimental interface can differ from the legacy interface that Abyss currently targets.
