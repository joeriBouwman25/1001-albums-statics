import {viteCommonjs} from '@originjs/vite-plugin-commonjs';

import path from 'path';
import {defineConfig} from 'vite';
import checker from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
        viteCommonjs({
            include: ['hyphen'],
        }),
        checker({typescript: true}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        allowedHosts: true,
    },
    optimizeDeps: {
        include: ['hyphen'],
    },
});