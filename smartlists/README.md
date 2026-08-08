# SmartLists

The Home scripts expect these SmartLists to exist with these names:

- `Top Rated Movies`
- `Top Rated TV Shows`
- `Currently Airing`
- `Recent Releases`

Keep the names stable because `javascript/02-smartlists-home.js` locates the generated collections by name.

## Reproducible definitions

The `.example.json` files in this directory preserve the SmartLists plugin-side rules exported from the working server on 2026-08-08, with instance-specific state removed.

They intentionally omit:

- SmartLists IDs;
- Jellyfin collection IDs;
- reference/creator user IDs;
- creation and refresh timestamps;
- item counts and runtime statistics.

Create each entry as a SmartLists **Collection**, select the appropriate reference user for your own Jellyfin instance, and reproduce the remaining fields from the matching example file. Do not copy private instance identifiers from another server.

### Current rules

| Name | Media | Filter | Sort | Max | Refresh |
| --- | --- | --- | --- | ---: | --- |
| `Top Rated Movies` | Movie | Community Rating >= 7.5 | Community Rating descending | 20 | On library changes |
| `Top Rated TV Shows` | Series | Community Rating >= 7.5 | Community Rating descending | 20 | On library changes |
| `Currently Airing` | Series | Series Status = Continuing | Last Episode Air Date descending | 20 | On library changes |
| `Recent Releases` | Movie | Release Date newer than 3 months | Release Date descending, then Community Rating descending | 20 | On library changes |

All four collections are enabled, exclude extras, hide when empty, and have no explicit refresh or visibility schedules.

## Home-side sorting

The exported JavaScript Injector script applies the Home presentation order independently of the plugin-side collection order:

- `Top Rated Movies` — Community Rating descending
- `Top Rated TV Shows` — Community Rating descending
- `Currently Airing` — latest episode premiere date descending, then Community Rating descending
- `Recent Releases` — premiere/release date descending
- maximum 20 rendered items per row

## Intended Home order

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
