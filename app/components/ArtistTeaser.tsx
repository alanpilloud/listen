import { Link } from "react-router"

type ArtistTeaserProps = {
  link: string
  image_url: string
  name: string
}

export function ArtistTeaser({ link, image_url, name }: ArtistTeaserProps) {
  return (
    <Link to={link}>
      <img className="size-36 rounded-lg" alt={name} src={image_url} />
      <div>{name}</div>
    </Link>
  )
}
