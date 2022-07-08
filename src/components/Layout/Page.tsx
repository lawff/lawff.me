/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import NPLoading from '../NProgress'
import { Footer } from '../Footer'
import NavBar from '../NavBar'
interface PageProps {
  children: React.ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <div className="h-auto lg:h-screen flex flex-col">

      <NPLoading />

      <NavBar />

      <main className="px-7 py-10">
        <React.Suspense fallback={null}>
          <div className="max-w-65ch m-auto">
            {children}
          </div>
        </React.Suspense>
        <Footer />
      </main>
    </div>
  )
}
