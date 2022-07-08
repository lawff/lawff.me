/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'
import { useRouter } from 'next/router'
import NPLoading from '../NProgress'
import { Footer } from '../Footer'
import NavBar from '../NavBar'
import NavLink from '../NavLink'
interface PageProps {
  children: React.ReactNode
}

export function Page({ children }: PageProps) {
  const router = useRouter()
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
        { router.pathname !== '/' && <div className="max-w-65ch m-auto mt-8 mb-8">
          <NavLink
            href={router.pathname.split('/').slice(0, -1).join('/') || '/'}
            classes="font-mono no-underline opacity-50 hover:opacity-75"
          >
             cd ..
          </NavLink>
        </div>}
        <Footer />
      </main>
    </div>
  )
}
