import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  server: {
    host: '0.0.0.0', // 允许通过局域网 IP 访问
    port: 5173,      // 可选：指定端口
    // 其他配置...
  },
  resolve: {
    // 配置路径别名
    alias: [
      // @代替src
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});