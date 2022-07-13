const externalLinks = require('remark-external-links') // Add _target and rel to external links
const images = require('remark-images') // Improved image syntax
const unrwapImages = require('remark-unwrap-images') // Removes <p> wrapper around images
const smartyPants = require('./remark-smartypants') // Cleans up typography
const customHeaders = require('./remark-header-custom-ids') // Custom header id's for i18n

module.exports = {
  remarkPlugins: [
    externalLinks,
    customHeaders,
    images,
    unrwapImages,
    smartyPants,
  ],
}
