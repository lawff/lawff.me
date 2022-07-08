/*
 * Copyright (c) lawliet.
 */

import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React from 'react'

const NPLoading = () => {
  const { events } = useRouter()
  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start()
    }
    const handleRouteChangeComplete = () => {
      NProgress.done()
    }
    events.on('routeChangeStart', handleRouteChangeStart)
    events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      events.off('routeChangeStart', handleRouteChangeStart)
      events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  return null
}

export default NPLoading
