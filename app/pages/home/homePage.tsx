import { ArtistTeaser } from "~/components/ArtistTeaser"

type HomePageProps = {
  artists: Array<Artist>
}

export function HomePage({ artists }: HomePageProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {artists.map((artist: Artist) => (
        <ArtistTeaser
          key={artist.id}
          name={artist.name}
          link={`/artist/${artist.id}`}
          image_url={artist.profile_image_url}
        />
      ))}
    </div>
  )
}
