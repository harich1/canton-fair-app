import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isNative = mode === "native";

  return {
    base: isNative ? "./" : "/canton-fair-app/",
    build: {
      outDir: isNative ? "dist-native" : "dist",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
        },
      },
    },
  };
});
