import { ReleasePage } from "~/pages/release/releasePage"
import type { Route } from "./+types/release"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Artist" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>
}

export default function ReleaseRoute({
  params,
  loaderData,
}: Route.ComponentProps) {
  return null
  // const { artist, release } = loaderData
  // return <ReleasePage artist={artist} release={release} />;
}
