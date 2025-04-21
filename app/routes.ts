import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("artist/:artist_id", "routes/artist.tsx"),
  route("release/:release_id", "routes/release.tsx"),
] satisfies RouteConfig
