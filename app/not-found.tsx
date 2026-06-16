import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <span className="text-8xl font-light text-muted-foreground/30">404</span>
        <h1 className="mt-6 text-3xl font-light tracking-wide">Page Not Found</h1>
        <p className="mt-4 text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-foreground hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  )
}
