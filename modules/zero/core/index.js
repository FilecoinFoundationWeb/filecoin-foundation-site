/*
 *
 * 📦 [Module] Core
 *
 */

const camelize = (string) => {
  return string.replace(/-./g, word => word[1].toUpperCase())
}

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////// General
import Path from 'path'
import Fs from 'fs'

// ///////////////////////////////////////////////////////////////////// Plugins
const plugins = [
  {
    src: Path.resolve(__dirname, 'plugins/index.js'),
    filename: 'au-nuxt-module-zero/core/index.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/helpers.js'),
    filename: 'au-nuxt-module-zero/core/helpers.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/seo.js'),
    filename: 'au-nuxt-module-zero/core/seo.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/toaster.js'),
    filename: 'au-nuxt-module-zero/core/toaster.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/uuid.js'),
    filename: 'au-nuxt-module-zero/core/uuid.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/vue-ls.js'),
    filename: 'au-nuxt-module-zero/core/vue-ls.js',
    mode: 'client'
  },
  {
    src: Path.resolve(__dirname, 'plugins/get-scroll-speed.js'),
    filename: 'au-nuxt-module-zero/core/get-scroll-speed.js',
    mode: 'client'
  },
  {
    src: Path.resolve(__dirname, 'plugins/scroll-to.js'),
    filename: 'au-nuxt-module-zero/core/scroll-to.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/click-outside.js'),
    filename: 'au-nuxt-module-zero/core/click-outside.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/nuxt-hammer.js'),
    filename: 'au-nuxt-module-zero/core/nuxt-hammer.js'
  },
  {
    src: Path.resolve(__dirname, 'plugins/global-components.js'),
    filename: 'au-nuxt-module-zero/core/global-components.js'
  }
]

// ////////////////////////////////////////////////////////////////// Middleware
const middlewares = [
  'redirector'
]

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// /////////////////////////////////////////////////////////// compileComponents
const compileComponents = (instance) => {
  return new Promise((next) => {
    const componentsDir = `${instance.options.rootDir}/components`
    plugins.forEach((plugin) => {
      // Need to pass component name list to global-components.js, which subsequently
      // loads all the module components as global ones for app-wide use
      if (plugin.filename === 'au-nuxt-module-zero/core/global-components.js') {
        plugin.options = []
        const components = Fs.readdirSync(`${__dirname}/components`).filter(file => file !== '.DS_Store')
        components.forEach((component) => {
          const name = component.split('.')[0]
          let override
          try {
            override = Fs.readFileSync(`${componentsDir}/${component}`)
            override = `${componentsDir}/${component}`
          } catch (e) {
            override = false
          }
          const path = override || Path.resolve(__dirname, `components/${component}`)
          plugin.options.push({ name, path })
        })
      }
    })
    next()
  })
}

// //////////////////////////////////////////////////////////////// compileStore
const compileStore = (instance) => {
  return new Promise((next) => {
    const contentDir = instance.options.rootDir
    plugins.forEach((plugin) => {
      if (plugin.filename === 'au-nuxt-module-zero/core/index.js') {
        plugin.options = {
          stores: []
        }
        const storePath = Path.resolve(__dirname, 'store')
        const stores = Fs.readdirSync(storePath).filter(store => store !== '.DS_Store')
        stores.forEach((store) => {
          const path = Path.resolve(storePath, store)
          plugin.options.stores.push({
            name: camelize(store.split('.')[0]),
            path
          })
        })
      }
    })
    next()
  })
}

// ////////////////////////////////////////////////////////// registerMiddleware
const registerMiddleware = (instance, next) => {
  return new Promise((next) => {
    plugins.forEach((plugin) => {
      if (plugin.filename === 'au-nuxt-module-zero/core/index.js') {
        plugin.options.middlewares = []
        middlewares.forEach((key) => {
          import(Path.resolve(__dirname, 'middleware', `${key}.js`))
            .then((middleware) => {
              instance.options.router.middleware.push(key)
              plugin.options.middlewares.push({ key, middleware })
            })
        })
      }
    })
    next()
  })
}

// ////////////////////////////////////////////////////////////// registerRoutes
const registerRoutes = (instance) => {
  return new Promise((next) => {
    const rootDir = instance.options.rootDir
    const modules = instance.options.modules
    const redirects = instance.options.publicRuntimeConfig.redirects
    const sitemap = instance.options.sitemap
    // Add redirects to generate routes -> for static sites
    if (redirects && redirects.length > 0) {
      instance.options.generate.routes = () => {
        return redirects.map(redirect => (redirect.from))
      }
      if (sitemap) {
        const exclude = redirects.map(redirect => (redirect.from))
        if (sitemap.exclude && Array.isArray(sitemap.exclude)) {
          sitemap.exclude = [...new Set(sitemap.exclude.concat(exclude))]
        } else {
          sitemap.exclude = exclude
        }
      }
    }
    // Add blog post paths if using @nuxt/content module and .md files in @/content/blog
    if (modules.includes('@nuxt/content') && Fs.existsSync(`${rootDir}/content/blog`)) {
      const routesKey = instance.options.generate.routes
      let routes = typeof routesKey === 'function' ? routesKey() : []
      const paths = Fs.readdirSync(`${rootDir}/content/blog`)
        .filter(file => file.includes('.md'))
        .map(file => `/blog/${file.split('.md')[0]}`)
      if (paths.length > 0) {
        routes = routes.concat(paths)
        instance.options.generate.routes = () => { return routes }
      }
    }
    next()
  })
}

// ///////////////////////////////////////////////////////////// registerPlugins
const registerPlugins = (instance, next) => {
  plugins.forEach((plugin) => {
    instance.addPlugin(plugin)
  })
  if (next) { return next() }
}

// //////////////////////////////////////////////////////////////////// runHttps
const runHttps = (instance, next) => {
  if (process.env.NODE_ENV === 'development' && typeof instance.options.server === 'object') {
    const rootPath = instance.options.alias['@']
    instance.options.server.https = {
      key: Fs.readFileSync(Path.resolve(instance.options.rootDir, 'localhost_key.pem')),
      cert: Fs.readFileSync(Path.resolve(instance.options.rootDir, 'localhost_cert.pem'))
    }
  }
  if (next) { return next() }
}

// ///////////////////////////////////////////////////////////////////// Liftoff
// -----------------------------------------------------------------------------
export default async function (instance) {
  if (instance.options.zero.core.include) {
    await compileComponents(instance)
    await compileStore(instance)
    await registerMiddleware(instance)
    await registerRoutes(instance)
    registerPlugins(instance, () => {
      runHttps(instance, () => {
        console.log(`📦 [Module] Core`)
      })
    })
  }
}
