import Dexie, { type EntityTable } from "dexie"

const db = new Dexie("MusicDatabase") as Dexie & {
  artists: EntityTable<Artist, "id">
  releases: EntityTable<Release, "id">
  songs: EntityTable<Song, "id">
  supporters: EntityTable<Supporter, "id">
  queue: EntityTable<Song, "id">
}

// Schema declaration:
db.version(1).stores({
  artists: "id, name",
  releases: "id, artist_id, title",
  songs: "id, artist_id, title",
  supporters: "id",
  queue: "id, artist_id, title",
})

export { db }
