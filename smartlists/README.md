# SmartLists

The Home scripts expect these SmartLists to exist with these names:

- `Top Rated Movies`
- `Top Rated TV Shows`
- `Currently Airing`
- `Recent Releases`

Keep the names stable because `javascript/02-smartlists-home.js` locates the generated collections by name.

## Home-side sorting

The exact behavior implemented by the exported Home script is:

- `Top Rated Movies` — Community Rating descending
- `Top Rated TV Shows` — Community Rating descending
- `Currently Airing` — latest episode premiere date descending, then Community Rating descending
- `Recent Releases` — premiere/release date descending
- maximum 20 rendered items per row

These are frontend sorting rules from the JavaScript Injector export. They do **not** document the exact SmartLists plugin-side filter/rule configuration.

The plugin-side SmartLists definitions still need to be exported or recorded from the running server before this repository can claim to reproduce those rules exactly. Do not infer thresholds, date windows, refresh policies, or reference-user settings here.

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
