/*
 * Copyright (c) lawliet.
 */

import React from 'react'
import Image from 'next/image'

import NavLink from './NavLink'

declare global {
  interface Window {
    __theme: string
    __setPreferredTheme: (theme: string) => void
  }
}

export default function NavBar() {
  return (
    <header className="z-40">
      <NavLink
        href="/"
        classes="absolute top-1.5em left-1.5em"
      >
        <Image className="" src="/logo.svg" alt="logo" width={37} height={37} />
      </NavLink>
      <nav className="flex p-2em box-border justify-between">
        <div className="flex-1" />
        <div className="flex">
          <NavLink href="/exams" title="Law" classes="mr-1.5em op-60 hover:op-100">
            <span>Self</span>
          </NavLink>
          <NavLink href="/posts" title="Blog" classes="mr-1.5em op-60 hover:op-100">
            <span>Blog</span>
          </NavLink>
          <NavLink href="/projects" title="Projects" classes="mr-1.5em op-60 hover:op-100 lt-md:hidden">
            <span className="lt-md:hidden">Projects</span>
          </NavLink>
          <NavLink href="/notes" title="notes" classes="mr-1.5em op-60 hover:op-100 lt-md:mr-0">
            <div className="i-carbon-align-box-middle-center"></div>
          </NavLink>
          <NavLink href="/thanks" title="thanks" classes="mr-1.5em op-60 hover:op-100 lt-md:hidden">
            <span className="lt-md:hidden">Thanks</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
