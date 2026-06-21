import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleTagManager } from "@next/third-parties/google"; 
import { GoogleAnalytics } from "@next/third-parties/google";
import './globals.css'
import   AccessibilityButton  from '@/components/sections/accessibilityButton';
import AccessibilityPanel from '@/components/sections/accessibilityPanel';
import {AccessibilityProvider} from '@/components/sections/accessibilityProvider';
const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});



export const metadata: Metadata = {
    metadataBase: new URL("https://atulyaitsolutions.com"),

  title: {
    default: "Atulya IT Solutions",
    template: "%s | Atulya IT Solutions",
  },

  description:
    "Web Development, WordPress, Next.js, SEO and Digital Marketing Services.",

  keywords: [
    "Web Development Company",
    "WordPress Development",
    "Next.js Development",
    "React Development",
    "SEO Services",
    "Website Maintenance",
    "Digital Marketing",
  ],
  icons: {
    icon: [
      {
        url: '/latestlogo500.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/latestlogo500.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/latestlogo500.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/latestlogo500.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) { 
   const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atulya IT Solutions",
    url: "https://atulyaitsolutions.com",
    logo: "https://atulyaitsolutions.com/aislogo.webp",
  };

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
       {/* <AccessibilityProvider> */}
          {children}
             {/* <AccessibilityButton />
          <AccessibilityPanel />
        </AccessibilityProvider> */}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId="GTM-NGSMM74C" /> && <GoogleAnalytics gaId="G-4EEMQTK68G" />}
      </body>
      
    </html>
  )
}
