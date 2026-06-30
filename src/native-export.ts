import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

declare global {
  interface Window {
    FairNoteNative?: {
      isNative: boolean;
      exportBlob: (blob: Blob, fileName: string) => Promise<string>;
    };
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

window.FairNoteNative = {
  isNative: Capacitor.isNativePlatform(),
  async exportBlob(blob, fileName) {
    const data = await blobToBase64(blob);
    const saved = await Filesystem.writeFile({
      path: `FairNote/${fileName}`,
      data,
      directory: Directory.Cache,
      recursive: true,
    });

    await Share.share({
      title: fileName,
      url: saved.uri,
      dialogTitle: "FairNote",
    });

    return saved.uri;
  },
};
