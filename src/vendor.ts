import JSZip from "jszip";

declare global {
  interface Window {
    JSZip: typeof JSZip;
  }
}

window.JSZip = JSZip;
