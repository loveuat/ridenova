"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Briefcase, Clock, MapPin, Sparkles, Heart, GraduationCap, Rocket } from "lucide-react"

const openings = [
  {
    title: "Senior Full-Stack Developer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote / On-site",
  },
  {
    title: "UI/UX Designer",
    dept: "Design",
    type: "Full-time",
    location: "Remote",
  },
  {
    title: "DevOps Engineer",
    dept: "Infrastructure",
    type: "Full-time",
    location: "On-site",
  },
  {
    title: "Business Development Executive",
    dept: "Sales",
    type: "Full-time",
    location: "On-site",
  },
]

const perks = [
  {
    icon: Rocket,
    title: "Growth & Impact",
    desc: "Work on challenging projects that accelerate your career and shape real products.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    desc: "Comprehensive health coverage and a culture that respects work-life balance.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    desc: "Dedicated time and budget for courses, certifications, and conferences.",
  },
]

export function Careers() {
  const [appliedRole, setAppliedRole] = useState<string | null>(null)

  function handleApply(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="relative overflow-hidden">
      {/* subtle radial glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,102,0,0.18) 0%, rgba(255,102,0,0) 70%)",
        }}
      />

      <section className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Careers
          </span>

          <h1 className="mt-8 text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build the Future <span className="text-primary">With Us</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            At Atulya IT Solutions, we analyze, architect, and accelerate. Join a team that
            values curiosity, ownership, and building reliable, future-ready technology.
          </p>
        </div>

        {/* Perks */}
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="rounded-2xl border border-border bg-card p-6 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                <perk.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{perk.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Openings */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Open Positions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Find a role that matches your skills and ambitions.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="text-primary">{job.dept}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAppliedRole(job.title)}
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Apply
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application form */}
        <div className="mt-20 rounded-2xl border border-border bg-card p-6 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Don&apos;t see the right role?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We&apos;re always looking for talented people. Send us your details and we&apos;ll
            reach out when something fits.
          </p>

          {appliedRole && (
            <p className="mt-4 inline-flex rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-foreground">
              Applying for: <span className="ml-1 font-medium text-primary">{appliedRole}</span>
            </p>
          )}

          <form onSubmit={handleApply} className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Full name"
              aria-label="Full name"
              className="h-12 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              className="h-12 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="text"
              placeholder="Role you're interested in"
              aria-label="Role you're interested in"
              defaultValue={appliedRole ?? ""}
              className="h-12 rounded-lg border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 sm:col-span-2"
            />
            <textarea
              placeholder="Tell us about yourself"
              aria-label="Tell us about yourself"
              rows={4}
              className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 sm:col-span-2"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:col-span-2 sm:w-fit"
            >
              Submit Application
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
