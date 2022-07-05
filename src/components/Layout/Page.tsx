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
    <div className="h-auto lg:h-screen flex flex-row">
      <div className="no-bg-scrollbar h-auto lg:h-[calc(100%-40px)] lg:overflow-y-scroll fixed flex flex-row lg:flex-col py-0 top-16 sm:top-10 left-0 right-0 lg:max-w-xs w-full shadow lg:shadow-none z-50">
        <NavBar />
      </div>

      {/* No fallback UI so need to be careful not to suspend directly inside. */}
      <React.Suspense fallback={null}>
        <div className="flex flex-1 w-full h-full self-stretch">
          <div className="w-full min-w-0">
            <main className="flex flex-1 self-stretch mt-16 sm:mt-10 flex-col items-end justify-around">
              {children}
              <Footer />
            </main>
          </div>
        </div>
      </React.Suspense>
    </div>
  )
}