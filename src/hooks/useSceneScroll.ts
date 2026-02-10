'use client'

import { isLocked, lock } from '@/engine/transitionLock'
import Lenis from 'lenis'
import { useEffect } from 'react'

export type SceneDirection = 'up' | 'down' | 'left' | 'right' | 'enter' | 'exit' | 'nav1' | 'nav2' | 'nav3' | 'nav4'

export default function useSceneScroll(
  onDirection: (dir: SceneDirection) => void
) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    const unsub = lenis.on('scroll', () => {
      if (isLocked()) return

      const velocity = lenis.velocity
      const dir = lenis.direction

      if (Math.abs(velocity) < 0.1) return
      if (dir === 0) return

      lock()
      onDirection(dir === 1 ? 'down' : 'up')
    })

    const handleKey = (e: KeyboardEvent) => {
      if (isLocked()) return

      const target = e.target as HTMLElement
      const tag = target.tagName.toLowerCase()

      // Don't capture keys when typing in input fields
      if (tag === 'input' || tag === 'textarea' || target.isContentEditable) {
        return
      }

      let direction: SceneDirection | null = null

      // Up navigation
      if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'w' || e.key === 'W') {
        direction = 'up'
      }
      // Down navigation
      else if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 's' || e.key === 'S') {
        direction = 'down'
      }
      // Left navigation
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        direction = 'left'
      }
      // Right navigation
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        direction = 'right'
      }
      // Enter/confirm action
      else if (e.key === 'Enter' || e.key === 'f' || e.key === 'F') {
        direction = 'enter'
      }
      // Exit/back action
      else if (e.key === 'Escape') {
        direction = 'exit'
      }

      else if (e.key === '1') {
        e.preventDefault()
        lock()
        onDirection('nav1')
        return
      }

      else if (e.key === '2') {
        e.preventDefault()
        lock()
        onDirection('nav2')
        return
      }

      else if (e.key === '3') {
        e.preventDefault()
        lock()
        onDirection('nav3')
        return
      }

      else if (e.key === '4') {
        e.preventDefault()
        lock()
        onDirection('nav4')
        return
      }

      if (direction) {
        e.preventDefault()
        lock()
        onDirection(direction)
      }
    }

    window.addEventListener('keydown', handleKey)

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      unsub()
      lenis.destroy()
      window.removeEventListener('keydown', handleKey)
      cancelAnimationFrame(rafId)
    }
  }, [onDirection])
}
