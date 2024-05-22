import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point the react-bootstrap import to the correct directory
      "react-bootstrap": "react-bootstrap/esm",
    },
  },
});
