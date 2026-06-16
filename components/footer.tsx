import Link from "next/link"
import content from "@/data/content.json"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="text-xl font-light tracking-[0.2em] uppercase">
              FM<span className="text-muted-foreground">.</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Architecture & Design</p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-foreground hover:opacity-70 transition-opacity">
                Home
              </Link>
              <Link href="/about" className="text-sm text-foreground hover:opacity-70 transition-opacity">
                About
              </Link>
              <Link href="/projects" className="text-sm text-foreground hover:opacity-70 transition-opacity">
                Projects
              </Link>
              <Link href="/contact" className="text-sm text-foreground hover:opacity-70 transition-opacity">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">Contact</h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground">{content.contact.name}</p>
              <a
                href={`mailto:${content.contact.email}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {content.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground tracking-wider">
            © {currentYear} Fjolle Murtezi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
