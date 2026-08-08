# SmartLists

These SmartLists are used by the custom Home layout. Keep the names exactly as written because the JavaScript Home layer identifies them by name.

## Top Rated Movies

- Type: Collection
- Item type: Movie
- Rule: Community Rating `>= 7.5`
- Sort: Community Rating descending
- Max items: 20
- Enabled: Yes
- Auto refresh: Library Changes
- Hide when empty: Yes
- Reference user: your normal Jellyfin user

## Top Rated TV Shows

- Type: Collection
- Item type: Series
- Rule: Community Rating `>= 7.5`
- Sort: Community Rating descending
- Max items: 20
- Enabled: Yes
- Auto refresh: Library Changes
- Hide when empty: Yes
- Reference user: your normal Jellyfin user

## Currently Airing

- Type: Collection
- Item type: Series
- Rule: Series Status = Continuing
- Sort 1: Last Episode Air Date descending
- Sort 2: Community Rating descending
- Max items: 20
- Enabled: Yes
- Auto refresh: Library Changes
- Hide when empty: Yes
- Reference user: your normal Jellyfin user

## Recent Releases

- Type: Collection
- Item type: Movie
- Rule: Release Date newer than 3 months
- Sort 1: Release Date descending
- Sort 2: Community Rating descending
- Max items: 20
- Enabled: Yes
- Auto refresh: Library Changes
- Hide when empty: Yes
- Reference user: your normal Jellyfin user

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
