import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'
import { siteConfig } from '@/lib/config/site'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { cookies } from 'next/headers'
import { isDevelopmentEnvironment } from '@/lib/utils'
import Script from 'next/script'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s ・ ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'
  return (
    <html lang='en'>
      <head>{isDevelopmentEnvironment() ? null : <script defer src='https://analytics.jfay.dev/script.js' data-website-id='f0daad98-e3ac-4196-aaaa-904f2cb38507'></script>}</head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className='relative flex min-h-screen w-full flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
            <Toaster />
            <Analytics />
            <TailwindIndicator />
          </SidebarProvider>
        </ThemeProvider>
        <Script src='https://umami.stevegray.io/script.js' data-website-id='944a9a9f-0978-4d2f-8200-7c658370c4d4' />
      </body>
    </html>
  )
}
