/*
 *
 * 🔌 [Plugin | Core] Core
 *
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
<% options.stores.forEach(({ name, path }) => { %>import <%= name %> from '<%= path %>'
<% }) %>

// This resolves to <app_root>/.nuxt/middleware.js
import NuxtMiddleware from '../../middleware'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// /////////////////////////////////////////////////////////////// registerStore
const registerStore = (store, next) => {
  <% options.stores.forEach(({ name }) => { %>
    store.registerModule('<%= name %>', Object.assign({
      namespaced: true
    }, <%= name %>))
  <% }) %>
  if (next) { return next() }
}

// ////////////////////////////////////////////////////////// registerMiddleware
const registerMiddleware = (next) => {
  <% options.middlewares.forEach(({ key, middleware }) => { %>
    NuxtMiddleware['<%= key %>'] = <%= middleware.default %>
  <% }) %>
  if (next) { return next() }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ store }) => {
  registerStore(store, () => {
    registerMiddleware(() => {
      console.log(`🔌 [Plugin | Core] Core`)
    })
  })
}
