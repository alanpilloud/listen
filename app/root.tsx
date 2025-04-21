import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { db } from "./db"
import { AudioPlayer } from "./components/AudioPlayer"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const now = Date.now()

  const lastFetch = (await localStorage.getItem("last_fetch")) as number | null

  if (lastFetch && now - lastFetch > 3600) {
    // we already fetched all the data we need and an hour as not passed
    return {}
  }

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const [artists, releases, songs, supporters] = await Promise.all([
    fetch("/artists.json", fetchOptions),
    fetch("/releases.json", fetchOptions),
    fetch("/songs.json", fetchOptions),
    fetch("/supporters.json", fetchOptions),
  ])

  const [artistsData, releasesData, songsData, supportersData] =
    await Promise.all([
      artists.json(),
      releases.json(),
      songs.json(),
      supporters.json(),
    ])

  await db.table("artists").bulkPut(artistsData)
  await db.table("releases").bulkPut(releasesData)
  await db.table("songs").bulkPut(songsData)
  await db.table("supporters").bulkPut(supportersData)

  await localStorage.setItem("last_fetch", now as unknown as string)

  return {}
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>
}

export default function App() {
  return (
    <div className="h-screen grid grid-rows-[1fr_120px] pt-2">
      <div className="w-full h-full overflow-y-auto max-w-200 mx-auto panel">
        <Outlet />
      </div>
      <AudioPlayer />
    </div>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
