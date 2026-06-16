import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import SectionTitle from "@/components/section-title"
import AnimatedSection from "@/components/animated-section"
import { getContent } from "@/app/actions/content"
import DownloadCvClient from "./DownloadCvClient"

export const metadata: Metadata = {
  title: "About | Fjolle Murtezi Architecture",
  description:
    "Learn about Fjolle Murtezi - Architect focused on sustainable architecture, interior design, and architectural visualization.",
}

const skills = [
  "Architectural Design",
  "Interior Design",
  "3D Visualization",
  "Sustainable Design",
  "Urban Planning",
  "Project Management",
  "ArchiCAD",
  "AutoCAD",
  "SketchUp",
  "Rhino",
  "Adobe Creative Suite",
]




const experience = [
  {
    year: "2019 - 2021",
    role: "Independent Architect",
    description:
      "Leading architectural projects from concept to completion, specializing in sustainable residential design.",
  },
  {
    year: "2021 - 2023",
    role: "Junior Architect",
    description:
      "Gained foundational experience in architectural practice, contributing to residential, commercial, and cultural projects.",
  },
  {
    year: "2023 - Present",
    role: "Senior Architect",
    description:
      "Collaborated on large-scale projects, and developed innovative design solutions.",
  },
]

export default async function AboutPage() {
  const content = await getContent()

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">About</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] mb-8">Fjolle Murtezi</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{content.aboutText || "Fjolle Murtezi – architect focused on sustainable architecture, interior design, and architectural visualization."}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With a passion for creating spaces that harmonize with their environment, I approach each project as an
                opportunity to blend functionality with aesthetic excellence. My work is driven by a commitment to
                sustainable design principles and a deep respect for the cultural context of each site.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based in Kosovo, I have had the privilege of working on projects across Europe, bringing a global
                perspective to local challenges. Every project begins with listening - understanding the needs, dreams,
                and constraints that will shape the final design.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={content.aboutImage || "/professional-architect-portrait-woman-modern-offic.jpg"}
                  alt="Fjolle Murtezi - Architect"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Experience" subtitle="Professional Journey" />
          <div className="max-w-3xl mx-auto">
            {experience.map((item, index) => (
              <AnimatedSection key={item.year} delay={index * 100}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-8 border-b border-border last:border-0">
                  <span className="text-sm tracking-[0.2em] text-muted-foreground">{item.year}</span>
                  <div>
                    <h3 className="text-xl font-light tracking-wide mb-2">{item.role}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title="Skills & Expertise" subtitle="Capabilities" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill} delay={index * 50}>
                <div className="p-6 border border-border hover:border-foreground/30 transition-colors text-center">
                  <span className="text-sm tracking-wide">{skill}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.05em] mb-6">Download My CV</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              For a complete overview of my education, experience, and qualifications, download my curriculum vitae.
            </p>
            <DownloadCvClient cvLink={content.cvLink || ''} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.05em] mb-6 text-balance">
              Interested in Working Together?
            </h2>
            <p className="text-muted-foreground mb-10">
              {"I'm always open to discussing new projects and opportunities."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground hover:opacity-70 transition-opacity group"
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
