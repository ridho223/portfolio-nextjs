'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] items-center justify-center text-sm text-[var(--muted)] lg:h-[620px]">
      Loading 3D scene...
    </div>
  ),
})

export default function Scene3DWrapper() {
  return <Scene3D />
}