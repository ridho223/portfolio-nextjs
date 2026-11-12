'use client'

import { useEffect, useRef } from 'react'

export default function InteractiveBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // update CSS variable maksimal 1x per frame (tidak tiap event pointermove)
    let raf = 0
    let x = 0
    let y = 0

    const flush = () => {
      raf = 0
      element.style.setProperty('--mouse-x', `${x}px`)
      element.style.setProperty('--mouse-y', `${y}px`)
    }

    const move = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const click = (event: PointerEvent) => {
      element.style.setProperty('--click-x', `${event.clientX}px`)
      element.style.setProperty('--click-y', `${event.clientY}px`)
      element.classList.remove('background-click')
      void element.offsetWidth
      element.classList.add('background-click')
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', click, { passive: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', click)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="interactive-background">
      <div className="interactive-background-glow" />
      <div className="interactive-background-grid" />
      <div className="interactive-background-noise" />
      <div className="interactive-background-ripple" />
    </div>
  )
}