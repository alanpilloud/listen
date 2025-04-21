type ReleasePageProps = {
  artist: Artist
  release: Release
}

export function ReleasePage({ artist, release }: ReleasePageProps) {
  return (
    <div>
      Artiste: {artist.name}
      Release: {release.title}
    </div>
  )
}
