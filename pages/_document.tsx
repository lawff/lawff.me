/*
 * Copyright (c) lawliet.
 */

import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:wght@200;400;600&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans text-#121314">
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('lawff-theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('lawff-theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });
                })();
              `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
