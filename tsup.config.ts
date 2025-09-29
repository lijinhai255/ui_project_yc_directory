import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx', 'src/styles.css'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
})