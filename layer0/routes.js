import { Router } from '@layer0/core/router'
import { isProductionBuild } from '@layer0/core/environment'

const router = new Router()
  // Serve the old Layer0 predefined routes by the latest prefix
  .match('/__xdn__/:path*', ({ redirect }) => {
    redirect('/__layer0__/:path*', 301)
  })
  // Cache the Layer0 devtools css js and other assets served by L0 by default
  .match('/__layer0__/:path*', ({ cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 } })
  })
  // Serve the compiled service worker with Layer0 prefetcher working
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('dist/service-worker.js')
  })

if (isProductionBuild()) {
  router.static('build')
  router.fallback(({ serveStatic }) => serveStatic('build/index.html'))
} else {
  router.fallback(({ renderWithApp }) => {
    renderWithApp()
  })
}

export default router
