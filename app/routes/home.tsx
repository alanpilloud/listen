import { db } from "~/db"
import type { Route } from "./+types/home"
import { HomePage } from "~/pages/home/homePage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return { artists: await db.table("artists").toArray() }
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { artists } = loaderData
  return <HomePage artists={artists} />
}
