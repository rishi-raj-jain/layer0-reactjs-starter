import { useEffect } from 'react'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

const App = () => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  }, [])
  return <div>Hi!</div>
}

export default App
