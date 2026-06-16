import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import ProjectGallery from "@/components/project-gallery"
import AnimatedSection from "@/components/animated-section"
import { getProjects, getProject } from "@/app/actions/projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found | Fjolle Murtezi Architecture" }
  }

  return {
    title: `Project: ${project.title} | Fjolle Murtezi Architecture`,
    description: project.description || '',
    openGraph: {
      title: `Project: ${project.title} | Fjolle Murtezi Architecture`,
      description: project.description || '',
      images: project.cover_image ? [{ url: project.cover_image }] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  const projects = await getProjects()
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={project.cover_image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-light tracking-[0.05em] mb-6">{project.title}</h1>
                <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
              </div>

              <div className="space-y-6">
                {project.year && (
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Year</span>
                    <p className="text-foreground">{project.year}</p>
                  </div>
                )}
                {project.location && (
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Location</span>
                    <p className="text-foreground">{project.location}</p>
                  </div>
                )}
                {project.category && (
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Category
                    </span>
                    <p className="text-foreground">{project.category}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                      Client
                    </span>
                    <p className="text-foreground">{project.client}</p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 md:pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection delay={200}>
            <h2 className="text-2xl font-light tracking-wide mb-8">Gallery</h2>
            <ProjectGallery images={project.gallery || []} title={project.title} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="group">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Previous Project
                </span>
                <span className="text-lg font-light group-hover:opacity-70 transition-opacity">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="group text-right">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">
                  Next Project
                </span>
                <span className="text-lg font-light group-hover:opacity-70 transition-opacity">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
