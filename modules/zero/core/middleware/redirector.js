export default function (ctx) {
  const redirects = ctx.$config.redirects
  if (redirects && redirects.length > 0) {
    let path = ctx.route.fullPath
    const len = path.length
    if (path.charAt(len - 1) === '/') {
      path = path.slice(0, len - 1)
    }
    redirects.forEach((redirect) => {
      if (redirect.from === path) {
        ctx.redirect(301, redirect.to)
      }
    })
  }
}
