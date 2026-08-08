# SmartLists

These four SmartLists power the custom Home rows used by `javascript/02-smartlists-home.js`:

- `Top Rated Movies`
- `Top Rated TV Shows`
- `Currently Airing`
- `Recent Releases`

The names are part of the contract between SmartLists and the Home script, so keep them unchanged.

## Recreating the collections

The `.example.json` files below come from the working server and preserve the real SmartLists rules without carrying over private or instance-specific state.

| Collection | Definition |
| --- | --- |
| Top Rated Movies | [`top-rated-movies.example.json`](top-rated-movies.example.json) |
| Top Rated TV Shows | [`top-rated-tv-shows.example.json`](top-rated-tv-shows.example.json) |
| Currently Airing | [`currently-airing.example.json`](currently-airing.example.json) |
| Recent Releases | [`recent-releases.example.json`](recent-releases.example.json) |

Create each one as a SmartLists **Collection** and select the appropriate reference user for your own Jellyfin instance. The example files deliberately leave out list IDs, Jellyfin collection IDs, user IDs, timestamps, item counts, and runtime statistics.

## Current rules

| Name | Media | Filter | Sort | Max | Refresh |
| --- | --- | --- | --- | ---: | --- |
| `Top Rated Movies` | Movie | Community Rating ≥ 7.5 | Community Rating descending | 20 | On library changes |
| `Top Rated TV Shows` | Series | Community Rating ≥ 7.5 | Community Rating descending | 20 | On library changes |
| `Currently Airing` | Series | Series Status = Continuing | Last Episode Air Date descending | 20 | On library changes |
| `Recent Releases` | Movie | Release Date newer than 3 months | Release Date descending, then Community Rating descending | 20 | On library changes |

All four are enabled, exclude extras, hide themselves when empty, and have no explicit refresh or visibility schedule.

## What the Home script does on top

The plugin decides which items belong in each collection. The Injector script then renders those collections on Home and applies its own presentation sorting:

- `Top Rated Movies` — Community Rating descending
- `Top Rated TV Shows` — Community Rating descending
- `Currently Airing` — latest episode premiere date descending, then Community Rating descending
- `Recent Releases` — premiere/release date descending

At most 20 items are rendered in each custom row.

## Home order

The intended Home layout is:

```text
Media Bar
Continue Watching
Next Up
Top Rated Movies
Top Rated TV Shows
Streaming Services
Currently Airing
Recent Releases
Recently Added in Movies
Recently Added in TV Shows
Studios
```

See [javascript/README.md](../javascript/README.md) for the Injector load order and [docs/setup.md](../docs/setup.md) for the full restore flow.
