import type { Metadata } from "next"
import { Mail, MapPin, ArrowUpRight } from "lucide-react"
import SectionTitle from "@/components/section-title"
import AnimatedSection from "@/components/animated-section"
import { getContactInfo } from "@/app/actions/content"

export const metadata: Metadata = {
  title: "Contact | Fjolle Murtezi Architecture",
  description: "Get in touch with Fjolle Murtezi for architectural projects, collaborations, or inquiries.",
}

export default async function ContactPage() {
  const contactInfo = await getContactInfo()

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.05em] mb-6 text-balance">
              {"Let's Work Together"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss a potential collaboration? I would love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="space-y-12">
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Name</h3>
                  <p className="text-2xl font-light">{contactInfo.name || "Fjolle Murtezi"}</p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-2xl font-light hover:opacity-70 transition-opacity inline-flex items-center gap-3 group"
                  >
                    {contactInfo.email || "fjollemurteziarch@gmail.com"}
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Location</h3>
                  <p className="text-2xl font-light">{contactInfo.location || "Prishtina, Kosovo"}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-secondary p-8 md:p-12">
                <h3 className="text-2xl font-light tracking-wide mb-6">Send Me a Message</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Ready to start your project? Click below to send me an email directly. I typically respond within
                  24-48 hours.
                </p>
                <a
                  href={`mailto:${contactInfo.email || "fjollemurteziarch@gmail.com"}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity group w-full justify-center"
                >
                  <Mail className="h-4 w-4" />
                  Send Email
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="How I Can Help" subtitle="Services" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "01",
                title: "Consultation",
                description: "Initial project discussions to understand your vision, requirements, and budget.",
              },
              {
                icon: "02",
                title: "Design Development",
                description: "From concept sketches to detailed construction documents and 3D visualizations.",
              },
              {
                icon: "03",
                title: "Project Management",
                description: "Comprehensive oversight from planning through construction completion.",
              },
            ].map((service, index) => (
              <AnimatedSection key={service.icon} delay={index * 100}>
                <div className="text-center">
                  <span className="text-4xl font-light text-muted-foreground/40">{service.icon}</span>
                  <h3 className="mt-4 text-xl font-light tracking-wide">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="h-[400px] bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{contactInfo.location || "Prishtina, Kosovo"}</p>
          </div>
        </div>
      </section>
    </>
  )
}
