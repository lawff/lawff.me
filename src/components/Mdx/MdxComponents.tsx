/*
 * Copyright (c) lawliet.
 */

import React from 'react'

import { H1, H2, H3, H4 } from './Heading'
import Link from './Link'

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="whitespace-pre-wrap my-4" {...p} />
)

const Strong = (strong: JSX.IntrinsicElements['strong']) => (
  <strong className="font-bold" {...strong} />
)

const OL = (p: JSX.IntrinsicElements['ol']) => (
  <ol className="ml-6 my-3 list-decimal" {...p} />
)
const LI = (p: JSX.IntrinsicElements['li']) => (
  <li className="leading-relaxed mb-1" {...p} />
)
const UL = (p: JSX.IntrinsicElements['ul']) => (
  <ul className="ml-6 my-3 list-disc" {...p} />
)

const Divider = () => (
  <hr className="my-2em mx-auto w-50px" />
)

const Blockquote = ({
  children,
  ...props
}: JSX.IntrinsicElements['blockquote']) => {
  return (
    <blockquote
      className="mdx-blockquote py-4 px-8 my-8 shadow-inner bg-highlight dark:bg-highlight-dark bg-opacity-50 rounded-lg leading-6 flex relative"
      {...props}>
      <span className="block relative">{children}</span>
    </blockquote>
  )
}

function Math({ children }: { children: any }) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Regular, Georgia, serif',
        fontSize: '1.2rem',
      }}>
      {children}
    </span>
  )
}

function MathI({ children }: { children: any }) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Italic, Georgia, serif',
        fontSize: '1.2rem',
      }}>
      {children}
    </span>
  )
}

function AuthorCredit({
  author,
  authorLink,
}: {
  author: string
  authorLink: string
}) {
  return (
    <p className="text-center text-secondary dark:text-secondary-dark text-base mt-2">
      <cite>
        Illustrated by{' '}
        {authorLink
          ? (
            <a className="text-link dark:text-link-dark" href={authorLink}>
              {author}
            </a>
          )
          : (
            author
          )}
      </cite>
    </p>
  )
}

function Illustration({
  caption,
  src,
  alt,
  author,
  authorLink,
}: {
  caption: string
  src: string
  alt: string
  author: string
  authorLink: string
}) {
  return (
    <div className="my-16 mx-0 2xl:mx-auto max-w-4xl 2xl:max-w-6xl">
      <figure className="my-8 flex justify-center">
        <img
          src={src}
          alt={alt}
          style={{ maxHeight: 300 }}
          className="bg-white rounded-lg"
        />
        {caption
          ? (
            <figcaption className="text-center leading-tight mt-4">
              {caption}
            </figcaption>
          )
          : null}
      </figure>
      {author ? <AuthorCredit author={author} authorLink={authorLink} /> : null}
    </div>
  )
}

function IllustrationBlock({
  title,
  sequential,
  author,
  authorLink,
  children,
}: {
  title: string
  author: string
  authorLink: string
  sequential: boolean
  children: any
}) {
  const imageInfos = React.Children.toArray(children).map(
    (child: any) => child.props,
  )
  const images = imageInfos.map((info, index) => (
    <figure key={index}>
      <div className="bg-white rounded-lg p-4 flex-1 flex xl:p-6 justify-center items-center my-4">
        <img src={info.src} alt={info.alt} height={info.height} />
      </div>
      {info.caption
        ? (
          <figcaption className="text-secondary dark:text-secondary-dark text-center leading-tight mt-4">
            {info.caption}
          </figcaption>
        )
        : null}
    </figure>
  ))
  return (
    <div className="my-16 mx-0 2xl:mx-auto max-w-4xl 2xl:max-w-6xl">
      {title
        ? (
          <h3 className="text-center text-xl font-bold leading-9 mb-4">
            {title}
          </h3>
        )
        : null}
      {sequential
        ? (
          <ol className="mdx-illustration-block flex">
            {images.map((x: any, i: number) => (
              <li className="flex-1" key={i}>
                {x}
              </li>
            ))}
          </ol>
        )
        : (
          <div className="mdx-illustration-block">{images}</div>
        )}
      {author ? <AuthorCredit author={author} authorLink={authorLink} /> : null}
    </div>
  )
}

export const MDXComponents = {
  p: P,
  strong: Strong,
  blockquote: Blockquote,
  ol: OL,
  ul: UL,
  li: LI,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  hr: Divider,
  a: Link,
  // The code block renders <pre> so we just want a div here.
  pre: (p: JSX.IntrinsicElements['div']) => <div {...p} />,
  Illustration,
  IllustrationBlock,
  Math,
  MathI,
}
