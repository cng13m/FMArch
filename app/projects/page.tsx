import type { Metadata } from "next"
import SectionTitle from "@/components/section-title"
import ProjectCard from "@/components/project-card"
import { getProjects } from "@/app/actions/projects"

export const metadata: Metadata = {
  title: "Projects | Fjolle Murtezi Architecture",
  description:
    "Browse the architectural portfolio of Fjolle Murtezi, featuring residential, commercial, and cultural projects.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Projects" subtitle="Portfolio" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || project.slug}
              id={project.id}
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
      </div>
    </section>
  )
}
