import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import compressPlugin from "vite-plugin-compression";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const pathSrc = path.resolve(__dirname, 'src')
  return {
    plugins: [
      vue(),
      visualizer(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
        symbolId: '[name]'
      }),
      compressPlugin({
        threshold: 1024 * 50 // 大于这个值的压缩
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      Icons({
        autoInstall: true,
      }),
      Inspect()
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      }
    },
    server: {
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_BASEURL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_API_PREFIX.length)
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
