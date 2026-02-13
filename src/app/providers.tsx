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

    // Handle up/down navigation
    if (dir === 'up' || dir === 'down') {
      if (currentMeta.layer === 'intro') {
        const INTRO_SECTIONS = ['', 'contact', 'sponsors']
        const currentIndex = INTRO_SECTIONS.indexOf(currentMeta.section || '')
        const nextIndex = dir === 'down' ? currentIndex + 1 : currentIndex - 1
        const nextSection = INTRO_SECTIONS[nextIndex]

        if (nextIndex === 0) {
          nextRoute = '/'
        } else if (nextSection) {
          nextRoute = `/${nextSection}`
        } else if (dir === 'down' && nextIndex >= INTRO_SECTIONS.length) {
          nextRoute = '/tracks/codestellation'
        }
      } else if (currentMeta.layer === 'tracks' && currentMeta.track) {
        const TRACK_SECTIONS = ['', 'rules', 'prizes', 'faq']
        const currentIndex = TRACK_SECTIONS.indexOf(currentMeta.section || '')
        const nextIndex = dir === 'down' ? currentIndex + 1 : currentIndex - 1
        const nextSection = TRACK_SECTIONS[nextIndex]

        if (nextIndex === 0) {
          nextRoute = `/tracks/${currentMeta.track}`
        } else if (nextSection) {
          nextRoute = `/tracks/${currentMeta.track}/${nextSection}`
        } else if (dir === 'up' && nextIndex < 0) {
          nextRoute = '/sponsors'
        }
      }
    }
    
    // Handle left/right navigation (track switching)
    else if (dir === 'left' || dir === 'right') {
      if (currentMeta.layer === 'tracks') {
        const newTrack = currentMeta.track === 'codestellation' ? 'decode' : 'codestellation'
        const section = currentMeta.section || ''
        nextRoute = section ? `/tracks/${newTrack}/${section}` : `/tracks/${newTrack}`
      }
    }
    
    // Handle exit (go back to intro)
    else if (dir === 'exit') {
      if (currentMeta.layer === 'tracks') {
        nextRoute = '/'
      }
    }

    else if (dir === 'nav1') {
      if (currentMeta.layer === 'intro') {
        nextRoute = '/'
      } else if (currentMeta.layer === 'tracks') {
        nextRoute = `/tracks/${currentMeta.track}`
      }
    }

    else if (dir === 'nav2') {
      if (currentMeta.layer === 'intro') {
        nextRoute = '/contact'
      } else if (currentMeta.layer === 'tracks') {
        nextRoute = `/tracks/${currentMeta.track}/rules`
      }
    }

    else if (dir === 'nav3') {
      if (currentMeta.layer === 'intro') {
        nextRoute = '/sponsors'
      } else if (currentMeta.layer === 'tracks') {
        nextRoute = `/tracks/${currentMeta.track}/prizes`
      }
    }

    else if (dir === 'nav4') {
      if (currentMeta.layer === 'tracks') {
        nextRoute = `/tracks/${currentMeta.track}/faq`
      }
    }

    // Only navigate if we have a valid next route
    if (nextRoute) {
      router.push(nextRoute)
    }
    // If no valid route (at boundary), don't lock - just let it go
  }, [router])

  useSceneScroll(handleScroll)

  return (
    <>
      <Background3D />
      <SceneContainer>{children}</SceneContainer>
    </>
  )
}
