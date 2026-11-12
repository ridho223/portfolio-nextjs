import Image from "next/image";
import Scene3D from "./Scene3D";

const glass =
  "absolute z-20 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-md animate-bob";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 md:px-16">
      {/* background: grid halus + blob bergerak */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="animate-float-slow pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="animate-float-slow pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl [animation-delay:-6s]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
        {/* kolom teks */}
        <div>
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-neutral-300">
            Malang, Indonesia
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Saya membangun <span className="text-blue-500">sistem web</span>{" "}
            yang berfungsi.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
            Ahmad Saifur Ridho, mahasiswa D3 Teknologi Informasi yang lagi
            membangun skill fullstack lewat proyek nyata.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="#projects"
              className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Lihat Proyek
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Kontak
            </a>
          </div>
        </div>

        {/* kolom visual: globe + foto + kartu kaca */}
        <div className="relative mx-auto h-[420px] w-full max-w-md md:h-[600px] md:max-w-none">
          <div className="absolute inset-0">
            <Scene3D />
          </div>

          <Image
            src="/ridho-cutout.png"
            alt="Foto Ahmad Saifur Ridho"
            width={600}
            height={800}
            priority
            className="absolute bottom-0 left-1/2 z-10 h-[90%] w-auto -translate-x-1/2 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]"
          />

          <div className={`${glass} left-0 top-10`}>
            <p className="font-mono text-blue-400">{"</>"}</p>
            <p className="mt-1 text-neutral-300">Laravel · Next.js</p>
          </div>
          <div className={`${glass} right-0 top-24 [animation-delay:-1.5s]`}>
            <p className="text-lg font-bold text-white">6 bulan</p>
            <p className="text-neutral-400">magang backend</p>
          </div>
          <div className={`${glass} bottom-16 left-2 [animation-delay:-3s]`}>
            <p className="text-lg font-bold text-white">Catering Hub</p>
            <p className="text-neutral-400">proyek untuk klien</p>
          </div>
        </div>
      </div>
    </section>
  );
}