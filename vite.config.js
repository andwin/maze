import { resolve } from 'path'

const config = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'randomized-depth-first-search': resolve(__dirname, 'randomized-depth-first-search/index.html')
      }
    }
  }
}

export default config
