import React from "react"
import { PlayIcon } from "@heroicons/react/16/solid"
import { useLiveQuery } from "dexie-react-hooks"
import { Link } from "react-router"
import { db } from "~/db"
import { Tooltip } from "react-tooltip"

type ReleaseProps = {
  artist: Artist
  release: Release
  songs: Array<Song>
}

export function Release({ artist, release, songs = [] }: ReleaseProps) {
  const supporters = useLiveQuery(() =>
    db.supporters.where("id").anyOf(release.supporter_ids).toArray(),
  )

  return (
    <div className="my-16">
      <div className="flex gap-4 mb-4 border-b pb-4 border-gray-200">
        <img
          alt={release.title}
          className="size-24 md:size-36 rounded-xl"
          src={release.cover_image_url}
        />
        <div className="p-2">
          <h2>{release.title}</h2>
          <div>{release.date.substring(0, 4)}</div>
        </div>
      </div>
      {supporters && (
        <div className="my-4 pb-4 border-b border-gray-200">
          <h3 className="mb-2">Sponsors</h3>
          <div className="flex flex-wrap gap-1">
            {supporters?.map((supporter) => (
              <React.Fragment key={supporter.id}>
                <a
                  href={supporter.website_url}
                  target="_blank"
                  rel="noreferrer"
                  data-tooltip-id={supporter.id}
                  data-tooltip-content={supporter.name}
                >
                  <img
                    alt={supporter.name}
                    src={supporter.profile_image_url}
                    className="rounded-full size-12 object-cover"
                  />
                </a>
                <Tooltip id={supporter.id} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      {songs.map((song, i) => (
        <Song
          key={song.id}
          number={i + 1}
          song={song}
          artist={artist}
          onPlay={async () => {
            await db.queue.clear()
            await db.queue.put(song)
          }}
        />
      ))}
    </div>
  )
}

type SongProps = Pick<Song, "title" | "duration"> & {
  number: number
  contributors: Array<string>
  artist: Artist
  song: Song
  onPlay: React.MouseEventHandler
}

function Song({ song, artist, number, onPlay }: SongProps) {
  const { title, contributor_artist_ids, duration } = song
  const artistsContributing = useLiveQuery(() =>
    db.artists.where("id").anyOf(contributor_artist_ids).toArray(),
  )
  const now_playing: Song | undefined = useLiveQuery(() =>
    db.queue.toCollection().reverse().first(),
  )

  const playing = now_playing?.id === song.id

  let classes =
    "grid grid-cols-[48px_1fr_72px] rounded-xl hover:bg-gray-100 min-h-12 text-neutral-600 text-sm"

  if (playing) {
    classes += " animate-pulse"
  }

  return (
    <div className={classes}>
      <button
        type="button"
        className="justify-self-center self-center p-2 cursor-pointer"
        onClick={onPlay}
      >
        {playing ? <PlayIcon className="size-5" /> : number}
      </button>

      <div className="self-center p-2">
        <button
          type="button"
          className="text-base text-neutral-950 font-medium cursor-pointer"
          onClick={onPlay}
        >
          {title}
        </button>
        <div>
          <Link to={`/artist/${artist.id}`} className="hover:underline">
            {artist.name}
          </Link>
          {artistsContributing?.map((artist) => (
            <>
              {", "}
              <Link
                key={artist.id}
                to={`/artist/${artist.id}`}
                className="hover:underline"
              >
                {artist.name}
              </Link>
            </>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="justify-self-end self-center p-2 cursor-pointer"
        onClick={onPlay}
      >
        {duration}
      </button>
    </div>
  )
}
