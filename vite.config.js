import { loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // 拿到的值是 string 类型
  const { VITE_PORT, VITE_HTTP_API } = env;

  return {
    plugins: [
      reactRefresh(),
      // styleImport
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript，支持 less 内联 JS
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: path.resolve(__dirname, './') },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    server: {
      port: Number(VITE_PORT), // 开发环境启动的端口
      proxy: {
        '/api': {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: VITE_HTTP_API,
          changeOrigin: true,
          // rewrite: (pre) => pre.replace(/^\/api/, ''), // 将 /api 重写为空
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
            return 'wq';
          },
        },
      },
    },
  }
}
