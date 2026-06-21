import Link from "next/link"
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Our Product", href: "/ourproduct" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "WordPress", href: "/services" },
    { label: "Shopify", href: "/services" },
    { label: "WooCommerce", href: "/services" },
    { label: "SEO", href: "/services" },
  ],
  hh: [
    { label: "React", href: "/services" },
    { label: "Node.js", href: "/services" },
    { label: "Website", href: "/services" },
    { label: "Management", href: "/services" },
  ],
  tt: [
    { label: "Privacy Policy", href: "/services" },
    { label: "Terms of Service", href: "/services" },
    { label: "Cookie Policy", href: "/services" },
    { label: "GDPR", href: "/services" },
  ],
}

const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/in/atulya-it-solutions/", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/aisitsolutions", label: "Twitter" },
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100071791771830", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/atulyaitsolutions/", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-black transition-colors">
                <img
                  src="/aislogo.webp"
                  alt="Atulya IT Solutions Logo"
                  loading="eager"
                  className="h-10 w-10 rounded-xl object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-foreground">Atulya IT Solutions</span>
                <span className="text-xs text-muted-foreground">
                  Analyze. Architect. Accelerate.
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-xs pt-4 text-sm text-muted-foreground">
              Connecting businesses with the world&apos;s top 1% of vetted developers. Remote hiring made simple,
              secure, and cost-effective.
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary/20 hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
{Object.entries(footerLinks).map(([category, links], index) => (
  <div key={category}>
    {index < 2 && (
      <h4 className="mb-4 font-semibold text-foreground">
        {category}
      </h4>
    )}

    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))} 
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 - 2026 Atulya IT Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}