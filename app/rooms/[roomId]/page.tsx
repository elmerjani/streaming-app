'use client'

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
} from '@livekit/components-react'
import { Room, Track } from 'livekit-client'
import '@livekit/components-styles'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function LiveRoomPage() {
  const params = useParams()
  const room = params.roomId as string
  const { user } = useUser()
  const name = user?.username || user?.id || 'anonymous'

  const [roomInstance] = useState(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true,
      })
  )

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const resp = await fetch(`/api/token?room=${room}&username=${name}`)
        const data = await resp.json()
        if (!mounted) return
        if (data.token) {
          await roomInstance.connect(
            process.env.NEXT_PUBLIC_LIVEKIT_URL || '',
            data.token
          )
        }
      } catch (e) {
        console.error(e)
      }
    })()

    return () => {
      mounted = false
      roomInstance.disconnect()
    }
  }, [roomInstance, room, name])

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: '100dvh' }}>
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  )
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  )
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
    >
      <ParticipantTile />
    </GridLayout>
  )
}

