type Release = {
  id: NonNullable<string>
  type: "album" | "ep" | "single" | "event"
  artist_id: string
  title: string
  date: string
  cover_image_url: string
  supporter_ids: Array<string>
}
