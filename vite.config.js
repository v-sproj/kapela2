import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';

const path = require('path')


export default defineConfig(() => {
    return {
        root: path.resolve(__dirname, 'src'),
        build: {
            outDir: '../dist',
            rollupOptions: {
              output: {
                assetFileNames: (assetInfo) => {
                  let extType = assetInfo.name.split('.').at(1);
                  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                    extType = 'images';
                  }
                  return `assets/${extType}/[name]-[hash][extname]`;
                },  
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
              },
            },
          },
        server: {
            port: 8080
        },
        plugins: [
            ViteImageOptimizer({
                /* pass your config */
                jpeg: {
                    quality: 70,
                    mozjpeg: true
                },
                jpg: {
                    quality: 70,
                    mozjpeg: true
                },
                png: {
                    quality: 70,
                    compressionLevel: 7,
                    palette: true
                },
                svg: {
                    quality: 70
                },
                tiff: {
                    quality: 70
                },
                webp: {
                    quality: 70
                }
            }),
        ],
    };
});