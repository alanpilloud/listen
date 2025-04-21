import { useLiveQuery } from "dexie-react-hooks"
import { db } from "~/db"

export function AudioPlayer() {
  const now_playing: Song | undefined = useLiveQuery(() =>
    db.queue.toCollection().reverse().first(),
  )

  if (!now_playing) {
    return null
  }

  return (
    <div className="flex justify-self-center self-center">
      <audio
        controls
        autoPlay
        src={now_playing.audio_url}
        onEnded={() => {
          db.queue.delete(now_playing.id)
        }}
      />
    </div>
  )
}
