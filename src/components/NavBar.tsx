/*
 * Copyright (c) lawliet.
 */

import * as React from 'react'

import NavLink from './NavLink'

declare global {
  interface Window {
    __theme: string
    __setPreferredTheme: (theme: string) => void
  }
}

export default function NavBar() {
  return (
    <header className="header z-40">
      <NavLink
        href="/"
      >
        <img v-show="isDark" src="/logo-dark.svg?url" alt="logo" />
        <img v-show="!isDark" src="/logo.svg?url" alt="logo" />
      </NavLink>
      <nav className="nav">
        <div className="spacer" />
        <div className="right">
          <NavLink href="/posts" title="Blog">
            <span className="lt-md:hidden">Blog</span>
            <div i-ri-article-line />
          </NavLink>
          <NavLink href="/projects" title="Projects">
            <span className="lt-md:hidden">Projects</span>
            <div i-ri-lightbulb-line className="md:hidden" />
          </NavLink>
          <NavLink href="/talks" title="Talks">
            <div i-ri-slideshow-2-line />
          </NavLink>
          <NavLink href="/podcasts" title="Podcasts">
            <div i-ri-mic-line />
          </NavLink>
          <NavLink href="/streams" title="Streams">
            <div i-ri-vidicon-line />
          </NavLink>
          <NavLink href="/demos" title="Demos">
            <div i-ri-screenshot-line />
          </NavLink>
          <NavLink href="/bookmarks" title="Bookmarks">
            <div i-ri-bookmark-line />
          </NavLink>
          <NavLink href="/notes" title="Notes">
            <div i-ri-sticky-note-line />
          </NavLink>
          <NavLink href="/sponsors-list" title="Sponsors">
            <div i-ri-heart-line />
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
