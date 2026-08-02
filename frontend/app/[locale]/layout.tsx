import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleTagManager } from "@next/third-parties/google"; 
import { GoogleAnalytics } from "@next/third-parties/google";
import '../globals.css'
import   AccessibilityButton  from '@/components/sections/accessibilityButton';
import AccessibilityPanel from '@/components/sections/accessibilityPanel';
import {AccessibilityProvider} from '@/components/sections/accessibilityProvider';
import {getMessages} from 'next-intl/server';
import { CONFIG } from "@/lib/config";
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import Preloader from '@/components/sections/preloader';
const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});



export const metadata: Metadata = {
    metadataBase: new URL("https://tripmitrago.in/"),

  title: {
    default: "Trip Mitra Go ",
    template: "%s | Trip Mitra Go | Car Rental & Taxi Service in Balaghat | Airport & Outstation Cabs",
  },

  description:
    "Book reliable car rental and taxi services in Balaghat with Trip Mitra. Airport transfers, outstation cabs, one-way taxi, wedding cars, corporate travel, Innova Crysta, Tempo Traveller and 24×7 booking across Central India.",

  keywords: [
    "car rental in balaghat","taxi service in balaghat","cab booking balaghat","cab service balaghat","balaghat taxi","balaghat car hire",
    "balaghat airport taxi","outstation taxi balaghat","one way taxi balaghat","chauffeur driven car balaghat","nagpur airport taxi",
    "nagpur airport cab","jabalpur airport taxi","raipur airport taxi","gondia airport taxi","airport pickup balaghat",
    "airport drop balaghat","balaghat to nagpur taxi","balaghat to jabalpur taxi","balaghat to raipur taxi","balaghat to kanha taxi",
"balaghat to pench taxi","balaghat to maihar taxi","balaghat to dongargarh taxi","lalburra to balaghat taxi","waraseoni to nagpur taxi","katangi to jabalpur taxi",
"kanha national park taxi","pench national park taxi","maihar taxi booking","dongargarh taxi","amarkantak taxi","khajuraho taxi",
"pachmarhi taxi","wedding car rental","corporate cab service","hourly cab booking","local taxi","outstation cab",
"round trip taxi","one way cab","family taxi","tempo traveller","innova crysta rental","trip mitra","trip mitra taxi","trip mitra cab",
"trip mitra car rental","trip mitra balaghat","trip mitra nagpur","best taxi service in balaghat","how much is taxi from balaghat to nagpur","cab fare balaghat to jabalpur","airport taxi charges",
"innova rental price","best cab for kanha national park","taxi available 24 hours"
 ],
  icons: {
    icon: [
      {
        url: '/tripmitralogo.webp',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/tripmitralogo.webp',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/tripmitralogo.webp',
        type: 'image/svg+xml',
      },
    ],
    apple: '/tripmitralogo.webp',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{
    locale: string;
  }>;
}>) { 
   const { locale } = await params;
  const messages = await getMessages();
   const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trip Mitra Go",
    url: "https://tripmitrago.in/",
    logo: "https://tripmitrago.in/tripmitralogo.webp",
  };

  return (
    <html lang={locale} className="bg-background" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
      <Preloader />
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
          {/* ✅ i18n Provider ADDED (safe wrapping only) */}
          <NextIntlClientProvider locale={locale}  messages={messages}>
            
            {/* <AccessibilityProvider> */}
            {children}
            {/* <AccessibilityButton />
            <AccessibilityPanel />
            </AccessibilityProvider> */}

          </NextIntlClientProvider>
             {/* <AccessibilityButton />
          <AccessibilityPanel />
        </AccessibilityProvider> */}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId="GTM-PXTQWV56" /> && <GoogleAnalytics gaId="G-6LPM5NJ8K4" />}
      </body>
      
    </html>
  )
}
