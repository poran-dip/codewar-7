'use client'

import { useSyncNavMeta } from '@/hooks/useSyncNavMeta'
import Background3D from '@/components/3d/Background3D'
import SceneContainer from '@/components/SceneContainer'
import { useRouter } from 'next/navigation'
import useSceneScroll, { SceneDirection } from '@/hooks/useSceneScroll'
import { useCallback } from 'react'
import { unlock } from '@/engine/transitionLock'
import { useNavMeta } from '@/store/useNavMeta'

export function Providers({ children }: { children: React.ReactNode }) {
  useSyncNavMeta()
  const router = useRouter()

  const handleScroll = useCallback((dir: SceneDirection) => {
    const currentMeta = useNavMeta.getState().currentMeta

    if (!currentMeta) {
      unlock()
      return
    }

    let nextRoute: string | null = null
    const section = currentMeta.section ? `/${currentMeta.section}` : ''

    if (dir === 'up' || dir === 'down') {
      if (currentMeta.layer === 'intro') {
        if (dir === 'down') nextRoute = `/tracks/codestellation${section}`
      } else if (currentMeta.layer === 'tracks') {
        if (currentMeta.track === 'codestellation') {
          nextRoute = dir === 'down' ? `/tracks/decode${section}` : '/'
        } else if (currentMeta.track === 'decode') {
          if (dir === 'up') nextRoute = `/tracks/codestellation${section}`
        }
      }
    }

    else if (dir === 'left' || dir === 'right') {
      if (currentMeta.layer === 'intro') {
        const SECTIONS = ['', 'contact', 'sponsors']
        const currentIndex = SECTIONS.indexOf(currentMeta.section || '')
        const nextIndex = dir === 'right' ? currentIndex + 1 : currentIndex - 1
        const next = SECTIONS[nextIndex]
        if (nextIndex === 0) nextRoute = '/'
        else if (next !== undefined) nextRoute = `/${next}`

      } else if (currentMeta.layer === 'tracks' && currentMeta.track) {
        const TRACK_SECTIONS: Record<string, string[]> = {
          codestellation: ['', 'rules', 'prizes', 'faq'],
          decode:         ['', 'rules', 'prizes', 'faq'],
        }
        const sections = TRACK_SECTIONS[currentMeta.track] ?? ['', 'rules', 'prizes', 'faq']
        const currentIndex = sections.indexOf(currentMeta.section || '')
        const nextIndex = dir === 'right' ? currentIndex + 1 : currentIndex - 1
        const next = sections[nextIndex]
        if (nextIndex === 0) nextRoute = `/tracks/${currentMeta.track}`
        else if (next !== undefined) nextRoute = `/tracks/${currentMeta.track}/${next}`
      }
    }

    else if (dir === 'nav1') {
      nextRoute = currentMeta.layer === 'intro' ? '/' : `/tracks/${currentMeta.track}`
    } else if (dir === 'nav2') {
      nextRoute = currentMeta.layer === 'intro' ? '/contact' : `/tracks/${currentMeta.track}/rules`
    } else if (dir === 'nav3') {
      nextRoute = currentMeta.layer === 'intro' ? '/sponsors' : `/tracks/${currentMeta.track}/prizes`
    } else if (dir === 'nav4') {
      if (currentMeta.layer === 'tracks') nextRoute = `/tracks/${currentMeta.track}/faq`
    } else if (dir === 'exit') {
      if (currentMeta.layer === 'tracks') nextRoute = '/'
    }

    if (nextRoute) router.push(nextRoute)
    else unlock()
  }, [router])

  useSceneScroll(handleScroll)

  return (
    <>
      <Background3D />
      <SceneContainer>{children}</SceneContainer>
    </>
  )
}
