import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, { join } from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import compressPlugin from "vite-plugin-compression";
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Inspect from 'vite-plugin-inspect';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';
import { currentVersion } from "./config/config";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const pathSrc = path.resolve(__dirname, 'src')
  return {
    plugins: [
      Inspect(),
      visualizer(),
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(root, 'src/assets/icon')],
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
        dts: path.resolve(root, '.d.ts/auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ],
        dts: path.resolve(root, '.d.ts/components.d.ts')
      }),
      Icons({
        autoInstall: true,
      }),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
        '~': join(__dirname)
      }
    },
    server: {
      host: '0.0.0.0',
      port: '5100',
      proxy: {
        [env.VITE_API_PREFIX]: {
          target: env.VITE_BASEURL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_API_PREFIX.length)
        },
        [env.VITE_API_FILE_PREFIX]: {
          target: env.VITE_FILE_BASEURL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_API_FILE_PREFIX.length)
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
      },
      assetsDir: `./${currentVersion}`
    }
  }
})
