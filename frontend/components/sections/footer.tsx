import Link from "next/link"
import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion";
import { ColourfulText } from "@/components/ui/colorful-text";
import { ColourfulWords } from "@/components/ui/colorful-words";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import LocalizedLink from '@/components/sections/localizedlink';
export function Footer() {
  const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/in/atulya-it-solutions/", label: "LinkedIn" },
  { Icon: Twitter, href: "https://x.com/aisitsolutions", label: "Twitter" },
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=100071791771830", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/atulyaitsolutions/", label: "Instagram" },
]
  const footerLinks = {
  Company: [
    { label: "Taxi Service In Balaghat", href: "/taxi/madhya-pradesh/balaghat/" },
    { label: "Taxi Service In Jabalpur", href: "/taxi/madhya-pradesh/jabalpur/" },
    { label: "Taxi Service In Mandla", href: "/taxi/madhya-pradesh/mandla/" },
    { label: "Taxi Service In Indore", href: "/taxi/madhya-pradesh/indore/" },
    { label: "Taxi Service In Bhopal", href: "/taxi/madhya-pradesh/bhopal/" },
    { label: "Taxi Service In Ujjain", href: "/taxi/madhya-pradesh/ujjain/" },

  ],
  Services: [
    { label: "Taxi Service In Nagpur", href: "/taxi/maharastra/nagpur/" },
    { label: "Taxi Service In Gondia", href: "/taxi/maharastra/gondia/" },
    { label: "Taxi Service In Seoni", href: "/taxi/madhya-pradesh/seoni/" },
    { label: "Taxi Service In Chindwara", href: "/taxi/madhya-pradesh/chindwara/" },
    { label: "Taxi Service In Dhar", href: "/taxi/madhya-pradesh/dhar/" },
    { label: "Taxi Service In Gwalior", href: "/taxi/madhya-pradesh/gwalior/" },
  ],
  hh: [
   { label: "Taxi Service In Pachmarhi", href: "/taxi/madhya-pradesh/pachmarhi/" },
    { label: "Taxi Service In Ratlam", href: "/taxi/madhya-pradesh/ratlam/" },
    { label: "Taxi Service In Shujalpur", href: "/taxi/madhya-pradesh/shujalpur/" },
    { label: "Taxi Service In Sahdol", href: "/taxi/madhya-pradesh/sahadol/" },
    { label: "Taxi Service In Singrauli", href: "/taxi/madhya-pradesh/singrauli/" },
    { label: "Taxi Service In Chanderi", href: "/taxi/madhya-pradesh/chanderi/" },
  ],
  tt: [
   { label: "Taxi Service In Raipur", href: "/taxi/chhattisgarh/raipur/" },
    { label: "Taxi Service In Durg", href: "/taxi/chhattisgarh/durg/" },
    { label: "Taxi Service In Bhilai", href: "/taxi/chhattisgarh/bhilai/" },
    { label: "Taxi Service In Rajnandgaon", href: "/taxi/chhattisgarh/rajnandgaon/" },
    { label: "Taxi Service In Donagargarh", href: "/taxi/chhattisgarh/donagargarh/" },
    { label: "Taxi Service In Bilaspur", href: "/taxi/chhattisgarh/bilaspur/" },
  ],
}
  return (
    <footer className="border-t border-border pt-10">
    <section className="">
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
             {/* Logo */}
            <LocalizedLink href="/" className="flex items-center gap-2">

              {/* Light Theme Logo */}
              <img
                src="/tmglogo-light.webp"
                alt="Trip Mitra Go"
                loading="eager"
                className="block dark:hidden h-12 w-auto object-contain"
              />

              {/* Dark Theme Logo */}
              <img
                src="/tmglogo-dark.webp"
                alt="Trip Mitra Go"
                loading="eager"
                className="hidden dark:block h-12 w-auto object-contain"
              />

            </LocalizedLink>
            <p className="mb-6 max-w-xs pt-4 text-sm text-muted-foreground">
              Trusted taxi services across Central India, available 24×7.
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
    {/*index < 2 && (
      <h4 className="mb-4 font-semibold text-foreground">
        {category}
      </h4>
    )*/}

    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
                        <LocalizedLink
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </LocalizedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} 
 
        </div>

        
      </div>
      </section>
        <section className="">
         <div className="container mx-auto px-4">
        {/* Bottom */}
        <div className="mt-2 flex flex-col items-center justify-between gap-2 md:gap-20 py-5 md:flex-row">
          <p className="text-sm text-muted-foreground">
           &copy; {new Date().getFullYear()} <ColourfulWords text='Trip Mitra Go'/> All rights reserved.
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
          <div className="mt-2 flex flex-col items-center justify-center  gap-2 md:gap-20 py-1 md:flex-row">
          <p className="text-sm text-muted-foreground">
           Desinged and Develoiped by <Link target="_blank" href="https://atulyaitsolutions.com/"><ColourfulWords text='Atulya IT Solutions'/></Link>
          </p>
          </div>
      </div>
        </section>
     
    </footer>
  )
}