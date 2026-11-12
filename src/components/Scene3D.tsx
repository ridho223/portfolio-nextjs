'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { RoundedBox, Sparkles, useCursor } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  UKURAN (kartu dibesarkan dari 2.1 x 2.95)                          */
/* ------------------------------------------------------------------ */
const CARD_W = 2.25
const CARD_H = 3.1
const CARD_D = 0.14

const PX = 400 // pixel texture per unit 3D
const FACE_W = CARD_W - 0.12
const FACE_H = CARD_H - 0.12
const FW = Math.round(FACE_W * PX)
const FH = Math.round(FACE_H * PX)
const U = FW / 792 // skala layout muka kartu (desain awal selebar 792px)

const FONT = 'ui-sans-serif, system-ui, "Segoe UI", Arial, sans-serif'
const PHOTO_URL = '/profile.jpg'

/* ------------------------------------------------------------------ */
/*  TEXTURE MUKA KARTU                                                 */
/* ------------------------------------------------------------------ */
function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawCardFace(ctx: CanvasRenderingContext2D, img?: HTMLImageElement) {
  ctx.clearRect(0, 0, FW, FH)
  ctx.save()
  roundRectPath(ctx, 0, 0, FW, FH, 44 * U)
  ctx.clip()

  const bg = ctx.createLinearGradient(0, 0, 0, FH)
  bg.addColorStop(0, '#0f172a')
  bg.addColorStop(1, '#0a0f1c')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, FW, FH)

  // (garis biru di atas foto sudah dihapus; murni dekorasi, tidak memengaruhi apa pun)

  // FOTO
  const px = 52 * U
  const py = 56 * U
  const pw = FW - px * 2
  const ph = 740 * U
  ctx.save()
  roundRectPath(ctx, px, py, pw, ph, 28 * U)
  ctx.clip()
  if (img) {
    // object-fit: cover, condong ke atas supaya wajah tidak terpotong
    const boxR = pw / ph
    const imgR = img.width / img.height
    let sx = 0
    let sy = 0
    let sw = img.width
    let sh = img.height
    if (imgR > boxR) {
      sw = img.height * boxR
      sx = (img.width - sw) / 2
    } else {
      sh = img.width / boxR
      sy = (img.height - sh) * 0.25
    }
    ctx.drawImage(img, sx, sy, sw, sh, px, py, pw, ph)
  } else {
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(px, py, pw, ph)
  }
  ctx.restore()
  roundRectPath(ctx, px, py, pw, ph, 28 * U)
  ctx.strokeStyle = 'rgba(148,163,184,0.28)'
  ctx.lineWidth = 2 * U
  ctx.stroke()

  // teks
  const c = ctx as CanvasRenderingContext2D & { letterSpacing?: string }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillStyle = '#ffffff'
  ctx.font = `600 ${50 * U}px ${FONT}`
  c.letterSpacing = `${1 * U}px`
  ctx.fillText('AHMAD SAIFUR RIDHO', FW / 2, 864 * U, pw)

  ctx.fillStyle = '#93c5fd'
  ctx.font = `500 ${33 * U}px ${FONT}`
  c.letterSpacing = `${6 * U}px`
  ctx.fillText('BACKEND DEVELOPER', FW / 2, 924 * U, pw)

  ctx.fillStyle = '#64748b'
  ctx.font = `500 ${25 * U}px ${FONT}`
  c.letterSpacing = `${2 * U}px`
  ctx.fillText('D3 TEKNOLOGI INFORMASI · UB', FW / 2, 977 * U, pw)

  // garis abu di bawah teks
  ctx.fillStyle = '#374151'
  ctx.fillRect(FW * 0.15, 1053 * U, FW * 0.7, 4 * U)

  ctx.restore()
}

// Texture baru dikembalikan SETELAH foto selesai dimuat,
// supaya animasi jatuh tidak mulai dengan kartu kosong.
function useCardTexture() {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = FW
    canvas.height = FH
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8

    let alive = true
    const img = new Image()
    img.onload = () => {
      if (!alive) return
      drawCardFace(ctx, img)
      texture.needsUpdate = true
      setTex(texture)
    }
    img.onerror = () => {
      if (!alive) return
      drawCardFace(ctx)
      texture.needsUpdate = true
      setTex(texture)
    }
    img.src = PHOTO_URL

    return () => {
      alive = false
      texture.dispose()
    }
  }, [])

  return tex
}

/* ------------------------------------------------------------------ */
/*  TALI: pita datar bermotif, geometri diperbarui tiap frame          */
/* ------------------------------------------------------------------ */
const RIBBON_W = 0.4
const TILE_LEN = RIBBON_W * 4.2
const SEG = 40

function makeRibbonTexture() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 512
  const ctx = c.getContext('2d')!

  ctx.fillStyle = '#1d4ed8'
  ctx.fillRect(0, 0, 128, 512)

  const sheen = ctx.createLinearGradient(0, 0, 128, 0)
  sheen.addColorStop(0, 'rgba(255,255,255,0)')
  sheen.addColorStop(0.5, 'rgba(255,255,255,0.12)')
  sheen.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, 128, 512)

  ctx.fillStyle = '#1e3a8a'
  ctx.fillRect(0, 0, 16, 512)
  ctx.fillRect(112, 0, 16, 512)
  ctx.strokeStyle = 'rgba(255,255,255,0.55)'
  ctx.lineWidth = 2
  ctx.setLineDash([10, 8])
  ctx.beginPath()
  ctx.moveTo(8, 0)
  ctx.lineTo(8, 512)
  ctx.moveTo(120, 0)
  ctx.lineTo(120, 512)
  ctx.stroke()
  ctx.setLineDash([])

  ctx.strokeStyle = 'rgba(147,197,253,0.35)'
  ctx.lineWidth = 3
  for (let y = 20; y < 512; y += 36) {
    ctx.beginPath()
    ctx.moveTo(24, y)
    ctx.lineTo(34, y + 10)
    ctx.lineTo(24, y + 20)
    ctx.moveTo(104, y)
    ctx.lineTo(94, y + 10)
    ctx.lineTo(104, y + 20)
    ctx.stroke()
  }

  ctx.save()
  ctx.translate(64, 256)
  ctx.rotate(-Math.PI / 2)
  ctx.font = `700 38px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255,255,255,0.93)'
  ctx.fillText('RIDHO · BACKEND', 0, 0)
  ctx.restore()

  ctx.fillStyle = '#67e8f9'
  for (const y of [30, 482]) {
    ctx.beginPath()
    ctx.moveTo(64, y - 9)
    ctx.lineTo(73, y)
    ctx.lineTo(64, y + 9)
    ctx.lineTo(55, y)
    ctx.closePath()
    ctx.fill()
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 8
  return tex
}

// Geometri pita kosong (SEG+1 titik, kiri-kanan), diisi oleh updateStrand()
function makeStrandGeometry() {
  const n = SEG + 1
  const g = new THREE.BufferGeometry()
  const pos = new THREE.BufferAttribute(new Float32Array(n * 6), 3)
  const uv = new THREE.BufferAttribute(new Float32Array(n * 4), 2)
  pos.setUsage(THREE.DynamicDrawUsage)
  uv.setUsage(THREE.DynamicDrawUsage)
  const nor = new Float32Array(n * 6)
  for (let i = 0; i < n * 2; i++) nor[i * 3 + 2] = 1
  const idx: number[] = []
  for (let i = 0; i < SEG; i++) {
    const a = i * 2
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  }
  g.setAttribute('position', pos)
  g.setAttribute('uv', uv)
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3))
  g.setIndex(idx)
  return g
}

// Kurva Bezier kuadrat A -> E dengan titik kontrol C. C di tengah = tali tegang,
// C digeser ke bawah/samping = tali kendur.
function updateStrand(
  g: THREE.BufferGeometry,
  ax: number,
  ay: number,
  ex: number,
  ey: number,
  cx: number,
  cy: number,
  z: number,
  width: number
) {
  const pos = g.attributes.position.array as Float32Array
  const uv = g.attributes.uv.array as Float32Array
  const len =
    Math.hypot(ex - ax, ey - ay) * 1.04 +
    Math.hypot(cx - (ax + ex) / 2, cy - (ay + ey) / 2) * 0.9

  for (let i = 0; i <= SEG; i++) {
    const t = i / SEG
    const u = 1 - t
    const x = u * u * ax + 2 * u * t * cx + t * t * ex
    const y = u * u * ay + 2 * u * t * cy + t * t * ey
    const dx = 2 * u * (cx - ax) + 2 * t * (ex - cx)
    const dy = 2 * u * (cy - ay) + 2 * t * (ey - cy)
    const m = Math.hypot(dx, dy) || 1
    const sx = ((-dy / m) * width) / 2
    const sy = ((dx / m) * width) / 2
    const k = i * 6
    pos[k] = x + sx
    pos[k + 1] = y + sy
    pos[k + 2] = z
    pos[k + 3] = x - sx
    pos[k + 4] = y - sy
    pos[k + 5] = z
    const v = (len * t) / TILE_LEN
    uv[i * 4] = 0
    uv[i * 4 + 1] = v
    uv[i * 4 + 2] = 1
    uv[i * 4 + 3] = v
  }
  g.attributes.position.needsUpdate = true
  g.attributes.uv.needsUpdate = true
}

/* ------------------------------------------------------------------ */
/*  FISIKA RINGAN (tanpa library): bungee + bandul + puntir            */
/* ------------------------------------------------------------------ */
const PIVOT = 4.4 // titik gantung, di atas layar
const L0 = 2.3 // panjang tali dari pivot ke stopper saat diam
const ANCHOR_X = 1.55 // tali melebar ke atas (bentuk V)
const ANCHOR_Y = 4.7

const G = 18 // gravitasi: makin besar, makin cepat jatuh
const K = 480 // kekakuan tali: makin besar, makin sedikit mulur
const C = 5 // redaman mulur
const GL = 3.6 // kekakuan ayunan bandul
const THETA0 = 0.28 // sudut ayun awal (rad)
const DROP0 = -6.8 // posisi awal: kartu di atas layar (negatif = kendur)
const TWIST0 = 1.4 // puntiran awal (rad)
const WIND = 0.4 // dorongan angin kecil: bikin tali terus bergoyang
const FOLLOW = 0.16 // seberapa miring kartu mengikuti kursor

/* ------------------------------------------------------------------ */
/*  LANYARD LENGKAP                                                    */
/* ------------------------------------------------------------------ */
function Lanyard() {
  const rig = useRef<THREE.Group>(null)
  const card = useRef<THREE.Group>(null)
  const faceTex = useCardTexture()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered, 'grab')

  const reduce = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const { ribbonTex, strandL, strandR, tab } = useMemo(() => {
    const ribbonTex = makeRibbonTexture()
    const strandL = makeStrandGeometry()
    const strandR = makeStrandGeometry()
    const tab = makeStrandGeometry()
    // tali pendek dari stopper ke swivel: lurus, cukup dihitung sekali
    updateStrand(tab, 0, -0.08, 0, -0.95, 0, -0.515, 0, RIBBON_W)
    return { ribbonTex, strandL, strandR, tab }
  }, [])

  useEffect(
    () => () => {
      ribbonTex.dispose()
      strandL.dispose()
      strandR.dispose()
      tab.dispose()
    },
    [ribbonTex, strandL, strandR, tab]
  )

  const sim = useRef({
    e: reduce ? 0 : DROP0, // mulur tali (negatif = kendur, positif = meregang)
    ev: 0,
    th: reduce ? 0 : THETA0, // sudut ayun
    w: 0,
    tw: reduce ? 0 : TWIST0, // puntiran
    tv: 0,
    phi: 0, // kartu tertinggal dari tali (efek cambuk)
    pv: 0,
    lean: 0,
    drag: false,
  })

  useFrame((state, dt) => {
    if (!faceTex || !rig.current || !card.current) return
    const s = sim.current
    const h = Math.min(dt, 1 / 30)
    const t = state.clock.elapsedTime

    // 1) jatuh bebas lalu "tersentak" saat tali tegang
    s.ev += G * h
    if (s.e > 0) s.ev += (-K * s.e - C * s.ev) * h
    else s.ev *= 1 - 0.4 * h
    const prev = s.e
    s.e += s.ev * h
    if (prev < 0 && s.e >= 0) s.w -= Math.min(0.4, Math.max(0, s.ev) * 0.012)

    // 2) ayunan bandul: condong ke kursor + angin kecil supaya tidak pernah diam
    const wind = reduce ? 0 : WIND * (Math.sin(t * 0.7) + 0.5 * Math.sin(t * 1.31 + 1.7))
    const eq = reduce ? 0 : state.pointer.x * FOLLOW
    s.w += (-GL * (Math.sin(s.th) - eq) + wind - 0.45 * s.w) * h
    if (s.drag) {
      // saat diseret: kartu ditarik ke posisi kursor
      const goal = THREE.MathUtils.clamp(state.pointer.x * 0.3, -0.32, 0.32)
      s.w += (-60 * (s.th - goal) - 9 * s.w) * h
    }
    s.th += s.w * h

    // 3) puntiran tali (membuka perlahan)
    s.tv += (-9 * s.tw - 1.0 * s.tv + (reduce ? 0 : 1.5 * Math.sin(t * 0.5))) * h
    s.tw += s.tv * h

    // 4) kartu mengikuti dengan sedikit tertinggal
    const target = -0.35 * s.th - 0.06 * s.w
    s.pv += (-45 * (s.phi - target) - 3.5 * s.pv) * h
    s.phi += s.pv * h
    s.lean = THREE.MathUtils.damp(s.lean, state.pointer.x * 0.35, 4, h)

    // posisi stopper (titik temu kedua tali)
    const th = s.th + Math.sin(t * 0.8) * 0.01
    const sin = Math.sin(th)
    const cos = Math.cos(th)
    const Leff = L0 + Math.max(s.e, 0)
    const lift = Math.max(-s.e, 0)
    const mx = Leff * sin
    const my = PIVOT - Leff * cos + lift

    rig.current.position.set(mx, my, 0)
    rig.current.rotation.z = th
    card.current.rotation.set(-state.pointer.y * 0.1, s.tw + s.lean, s.phi)

    // tali: lurus saat tegang, melengkung saat kendur
    const sag = 0.04 + Math.min(lift, 2.2) * 0.45
    const sides: [THREE.BufferGeometry, number][] = [
      [strandL, -1],
      [strandR, 1],
    ]
    for (const [geo, side] of sides) {
      const ox = side * 0.08
      const ex = mx + ox * cos - 0.08 * sin
      const ey = my + ox * sin + 0.08 * cos
      const ax = side * ANCHOR_X
      updateStrand(
        geo,
        ax,
        ANCHOR_Y,
        ex,
        ey,
        (ax + ex) / 2 + side * sag * 0.5,
        (ANCHOR_Y + ey) / 2 - sag,
        side * 0.012,
        RIBBON_W
      )
    }
  })

  // tahan & seret kartu; saat dilepas kartu terlempar dan berayun lagi
  const grab = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const s = sim.current
    s.drag = true
    const release = () => {
      s.drag = false
      s.ev += 3
      s.tv += (Math.random() - 0.5) * 6
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
  }

  if (!faceTex) return null

  const metal = { color: '#cbd5e1', metalness: 0.6, roughness: 0.3 } as const
  const ribbonMat = (
    <meshStandardMaterial map={ribbonTex} roughness={0.5} metalness={0.05} side={THREE.DoubleSide} />
  )

  return (
    <group>
      {/* dua sisi tali, menjulur dari atas layar */}
      <mesh geometry={strandL} frustumCulled={false}>
        {ribbonMat}
      </mesh>
      <mesh geometry={strandR} frustumCulled={false}>
        {ribbonMat}
      </mesh>

      {/* semua yang tergantung di bawah stopper */}
      <group ref={rig}>
        {/* penjepit tipis tempat kedua tali menyatu */}
        <RoundedBox args={[0.74, 0.44, 0.14]} radius={0.05} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#0b0f1a" roughness={0.45} metalness={0.15} />
        </RoundedBox>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.03, 20]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        {/* satu tali selebar tali di atas, turun sampai ke bar logam */}
        <mesh geometry={tab} frustumCulled={false}>
          {ribbonMat}
        </mesh>
        <RoundedBox args={[0.52, 0.1, 0.1]} radius={0.03} position={[0, -0.97, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>

        {/* cincin penghubung ke kait kartu */}
        <mesh position={[0, -1.08, 0]}>
          <torusGeometry args={[0.075, 0.022, 10, 24]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <group
          ref={card}
          position={[0, -1.32, 0]}
          onPointerDown={grab}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <mesh scale={[1, 1.55, 1]}>
            <torusGeometry args={[0.11, 0.024, 12, 32]} />
            <meshStandardMaterial {...metal} />
          </mesh>

          <RoundedBox args={[0.18, 0.28, 0.1]} radius={0.025} position={[0, -0.24, 0]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.35} />
          </RoundedBox>

          <group position={[0, -0.34 - CARD_H / 2, 0]}>
            <RoundedBox args={[CARD_W, CARD_H, CARD_D]} radius={0.12} smoothness={6}>
              <meshPhysicalMaterial color="#111827" roughness={0.3} metalness={0.2} clearcoat={0.8} />
            </RoundedBox>

            <mesh position={[0, 0, CARD_D / 2 + 0.003]}>
              <planeGeometry args={[FACE_W, FACE_H]} />
              <meshBasicMaterial map={faceTex} transparent toneMapped={false} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  SCENE                                                              */
/* ------------------------------------------------------------------ */
const FADE_TOP = 'linear-gradient(to bottom, transparent 0, #000 14%)'

export default function Scene3D() {
  const wrap = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  // pause render saat scene tidak terlihat (hemat GPU/baterai)
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={wrap}
      className="h-[600px] w-full sm:h-[680px] lg:-mt-24 lg:h-[min(740px,100svh)]"
      // ujung atas tali memudar halus, bukan terpotong keras
      style={{ maskImage: FADE_TOP, WebkitMaskImage: FADE_TOP }}
    >
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0.35, 8.9], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 5]} intensity={2} />
        <pointLight position={[-3, 1, 3]} intensity={1.5} color="#3b82f6" />

        <Lanyard />

        <Sparkles count={25} scale={[5, 7, 2]} size={1.5} speed={0.3} color="#60a5fa" />
      </Canvas>
    </div>
  )
}