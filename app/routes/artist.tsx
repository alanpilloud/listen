import { db } from "~/db"
import type { Route } from "./+types/artist"
import { ArtistPage } from "~/pages/artist/artistPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artist test" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const artist = await db.artists.get(params.artist_id)
  if (!artist) {
    throw new Response("Not Found", { status: 404 })
  }
  const releases = await db.releases
    .where({ artist_id: params.artist_id })
    .reverse()
    .sortBy("date")

  const songsList = await db.songs
    .where({ artist_id: params.artist_id })
    .sortBy("order")

  const songs = songsList.reduce(
    (acc: Record<string, Array<Song>>, song: Song) => {
      acc[song.release_id] = [...(acc[song.release_id] ?? []), song]
      return acc
    },
    {},
  )

  return { artist, releases, songs }
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>
}

export default function ArtistRoute({ loaderData }: Route.ComponentProps) {
  const { artist, releases, songs } = loaderData

  return <ArtistPage artist={artist} releases={releases} songs={songs} />
}
