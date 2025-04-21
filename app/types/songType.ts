type Song = {
  id: NonNullable<string>
  release_id: NonNullable<string>
  artist_id: NonNullable<string>
  order: number
  title: string
  duration: string
  audio_url: string

  /** An array of artist id representing featurings, collaborators, etc. */
  contributor_artist_ids: Array<string>
}
