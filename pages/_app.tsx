/*
 * Copyright (c) lawliet.
 */

import React from 'react'
import type { AppProps } from 'next/app'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import Head from 'next/head'

const EmptyAppShell = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

export default function MyApp({ Component, pageProps }: AppProps) {
  let AppShell = (Component as any).appShell || EmptyAppShell
  // In order to make sidebar scrolling between pages work as expected
  // we need to access the underlying MDX component.
  if ((Component as any).isMDXComponent)
    AppShell = (Component as any)({}).props.originalType.appShell

  return (
    <AppShell>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="author" content="lawliet" />
        <meta httpEquiv="X-UA-Compatible" content="chrome=1" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <title>Lawliet FF</title>
      </Head>
      <Component {...pageProps} />
    </AppShell>
  )
}
