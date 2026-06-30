(function setupFairNoteNativeExport() {
  const plugins = window.Capacitor && window.Capacitor.Plugins;
  const filesystem = plugins && plugins.Filesystem;
  const share = plugins && plugins.Share;

  async function blobToBase64(blob) {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const chunkSize = 0x8000;
    let binary = "";

    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(
        ...bytes.subarray(offset, offset + chunkSize),
      );
    }

    return btoa(binary);
  }

  window.FairNoteNative = {
    isNative: Boolean(filesystem && share),
    async exportBlob(blob, fileName) {
      if (!filesystem || !share) {
        throw new Error("Native export is unavailable.");
      }

      const saved = await filesystem.writeFile({
        path: `FairNote/${fileName}`,
        data: await blobToBase64(blob),
        directory: "CACHE",
        recursive: true,
      });

      await share.share({
        title: fileName,
        url: saved.uri,
        dialogTitle: "FairNote",
      });

      return saved.uri;
    },
  };
})();
