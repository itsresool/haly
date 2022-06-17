import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/v1": "http://localhost:5287"
        }
    },
    plugins: [react()]
})
