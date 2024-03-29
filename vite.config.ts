import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "my-organization-x9",
    project: "autocomplete",
  }), splitVendorChunkPlugin()],

  build: {
    sourcemap: false
  }
})