/*
 * Copyright (c) lawliet.
 */

import { Prism } from '@kira-ui/prism'

const CodeBlock = ({
  children,
  className = 'language-js',
}: {
  children: string
  className?: string
  metastring: string
  noMargin?: boolean
}) => {
  // e.g. "language-js"
  const language = className.substring(9)
  return (
    <>
      <Prism language={language as any}>{ children }</Prism>
    </>
  )
}

export default CodeBlock
