/*

🔌 [Plugin | Core] Seo

*/

console.log('🔌 [Plugin | Core] Seo')

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////// Get SEO and Open Graph data
// ----------------------------- Return global SEO if no identifier is specified
const GetSeo = store => (identifier = 'general') => {
  const siteContent = store.getters['global/siteContent']
  let data = siteContent[identifier]
  if (!data) { data = siteContent.general }
  const seo = data.seo
  const og = data.og
  return {
    title: seo.title,
    description: seo.description,
    structured_data: seo.structured_data,
    og_site_name: og.site_name,
    og_url: og.url,
    og_type: og.type,
    og_image: og.image
  }
}

// ///////////////////////////////////////////////// Convert SEO to final output
// ------------------------------------------------------ Output for head() hook
const CompileSeo = config => (seo) => {
  const siteName = config.seo.siteName
  const siteUrl = config.seo.siteUrl
  const title = seo.title
  const description = seo.description
  const image = siteUrl + seo.og_image
  const url = seo.og_url
  const structured_data = seo.structured_data || {}
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': structured_data['@type'] || 'WebSite',
    name: title,
    abstract: description,
    mainEntity: {
      '@type': structured_data['@type'] || 'WebSite',
      name: siteName,
      url: siteUrl
    },
    image,
    url
  }
  return {
    title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:site_name', property: 'og:site_name', content: seo.og_site_name },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:type', property: 'og:type', content: seo.og_type },
      { hid: 'og:image', property: 'og:image', content: image },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:image', name: 'twitter:image', content: image }
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'en', href: url },
      { rel: 'alternate', hreflang: 'x-default', href: url }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [{ innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }]
  }
}

// ///////////////////////////////////////////////////////////////////// Exports
// -----------------------------------------------------------------------------
export default ({ $config, store }, inject) => {
  inject('GetSeo', GetSeo(store))
  inject('CompileSeo', CompileSeo($config))
}
