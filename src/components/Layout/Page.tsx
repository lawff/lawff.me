/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import { Footer } from '../Footer'
import NavBar from '../NavBar'
interface PageProps {
  children: React.ReactNode
}

export function Page({ children }: PageProps) {
  return (
    <div className="h-auto lg:h-screen flex flex-col">

      <NavBar />

      <main className="px-7 py-10">
        {/* No fallback UI so need to be careful not to suspend directly inside. */}
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
