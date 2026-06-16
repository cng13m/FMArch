import Hero from "@/components/hero"
import SectionTitle from "@/components/section-title"
import ProjectCard from "@/components/project-card"
import AnimatedSection from "@/components/animated-section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getContent } from "@/app/actions/content"
import { getProjects } from "@/app/actions/projects"

export default async function HomePage() {
  const [content, projects] = await Promise.all([getContent(), getProjects()])
  const featuredProjects = projects.slice(0, 3)

  // Services can be stored as JSON string in content.services
  const defaultServices = [
    {
      number: "01",
      title: "Architectural Design",
      description:
        "Complete architectural solutions from concept to construction, with a focus on sustainable and innovative design.",
    },
    {
      number: "02",
      title: "Interior Design",
      description:
        "Creating harmonious interior spaces that reflect your personality while maximizing functionality and comfort.",
    },
    {
      number: "03",
      title: "3D Visualization",
      description:
        "Photorealistic renderings and animations that bring your project to life before construction begins.",
    },
  ]

  let services
  try {
    services = content.services ? JSON.parse(content.services) : defaultServices
  } catch (err) {
    // Fallback if JSON is invalid
    services = defaultServices
  }

  return (
    <>
      <Hero title={content.homeHeroText || "Architectural Vision & Design"} subtitle={content.homeSubText || "Portfolio of Fjolle Murtezi"} backgroundImage={content.homeHeroImage || "/modern-architecture-building-facade-minimalist-bla.jpg"} />

      <section className="py-24 md:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Selected Works" subtitle="Featured Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                slug={project.slug}
                year={project.year || ''}
                location={project.location || ''}
                coverImage={project.cover_image || '/placeholder.svg'}
                category={project.category}
                index={index}
              />
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground hover:opacity-70 transition-opacity group"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">About</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] mb-8 text-balance">
                Creating Spaces That Inspire
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{content.aboutText || "Fjolle Murtezi – architect focused on sustainable architecture, interior design, and architectural visualization."}</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground hover:opacity-70 transition-opacity group"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={200} className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={content.homeAboutImage || content.aboutImage || "/architect-working-on-blueprints-studio.jpg"} alt="Architect at work" className="object-cover w-full h-full" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Services" subtitle="What I Offer" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {services.map((service: any, index: number) => (
              <AnimatedSection key={service.number || index} delay={index * 100}>
                <div className="group">
                  <span className="text-5xl font-light text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors">
                    {service.number}
                  </span>
                  <h3 className="mt-4 text-xl font-light tracking-wide">{service.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8 bg-foreground text-background">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.05em] mb-6 text-balance">
              {"Let's Create Something Together"}
            </h2>
            <p className="text-background/70 mb-10 max-w-2xl mx-auto">
              Have a project in mind? I would love to hear about it. Get in touch to discuss how we can bring your
              vision to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 border border-background/30 text-sm tracking-[0.2em] uppercase hover:bg-background hover:text-foreground transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
