import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">Engineer Caller Dashboard</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700">AI receptionist intake with smart categorisation — Structural, Civil, Geotechnical, New Enquiry or Other.</p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90" />
    </section>
  )
}

export default Hero