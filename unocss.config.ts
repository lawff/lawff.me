// unocss.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    'lawff-link': 'after:hover:-top-0 after-transition-top after-content-empty after-absolute after-bg-[rgba(79,192,141,0.5)] after-left--0.1em after-right--0.1em after-top-66% after-bottom-0 after-z--1',
  },
  theme: {
    fontFamily: {
      sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
  },
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetUno(),
  ],
})
