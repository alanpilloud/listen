import { Release } from "~/components/Release"

type ArtistPageProps = {
  artist: Artist
  releases?: Array<Release>
  songs?: Record<string, Array<Song>>
}

export function ArtistPage({
  artist,
  releases = [],
  songs = {},
}: ArtistPageProps) {
  return (
    <>
      <div className="flex gap-4 mb-4">
        <img
          alt={artist.name}
          className="size-36 rounded-xl"
          src={artist.profile_image_url}
        />
        <div className="p-2">
          <h1>{artist.name}</h1>
          {artist.biography && (
            <p className="whitespace-pre-line text-sm">{artist.biography}</p>
          )}
        </div>
      </div>
      {releases.map((release) => (
        <Release
          key={release.id}
          artist={artist}
          release={release}
          songs={songs[release.id]}
        />
      ))}
    </>
  )
}
