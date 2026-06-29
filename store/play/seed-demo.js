(async () => {
  const makePhoto = (kind) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext("2d");
    const gradients = {
      lamp: ["#e9e1d6", "#c9b9a5"],
      tray: ["#d8e2dd", "#8fa99e"],
      box: ["#ead6b7", "#b9976d"],
    };
    const [start, end] = gradients[kind];
    const background = context.createLinearGradient(0, 0, 800, 600);
    background.addColorStop(0, start);
    background.addColorStop(1, end);
    context.fillStyle = background;
    context.fillRect(0, 0, 800, 600);

    context.save();
    context.shadowColor = "rgba(44, 35, 29, .28)";
    context.shadowBlur = 36;
    context.shadowOffsetY = 24;

    if (kind === "lamp") {
      context.fillStyle = "#5c5048";
      context.beginPath();
      context.ellipse(400, 500, 155, 32, 0, 0, Math.PI * 2);
      context.fill();
      context.lineWidth = 25;
      context.lineCap = "round";
      context.strokeStyle = "#65584f";
      context.beginPath();
      context.moveTo(400, 470);
      context.lineTo(370, 235);
      context.stroke();
      context.fillStyle = "#fff8e8";
      context.beginPath();
      context.moveTo(280, 100);
      context.lineTo(520, 100);
      context.lineTo(570, 280);
      context.lineTo(230, 280);
      context.closePath();
      context.fill();
    } else if (kind === "tray") {
      context.translate(400, 300);
      context.rotate(-0.08);
      context.fillStyle = "#f4efe6";
      context.beginPath();
      context.roundRect(-280, -195, 560, 390, 42);
      context.fill();
      const colors = ["#c7785d", "#8ba99b", "#8ba99b", "#c7785d"];
      for (let index = 0; index < 4; index += 1) {
        const x = index % 2 === 0 ? -240 : 20;
        const y = index < 2 ? -155 : 15;
        context.fillStyle = colors[index];
        context.beginPath();
        context.roundRect(x, y, 220, 140, 25);
        context.fill();
      }
    } else {
      context.translate(400, 300);
      context.rotate(-0.04);
      context.fillStyle = "#d99e58";
      context.fillRect(-190, -160, 380, 320);
      context.fillStyle = "#f2c88f";
      context.fillRect(-8, -160, 16, 320);
      context.fillStyle = "#fff9ee";
      context.fillRect(-145, -55, 160, 80);
      context.shadowColor = "transparent";
      context.fillStyle = "#6c3e23";
      context.font = "800 28px Segoe UI";
      context.fillText("SAMPLE", -120, -5);
    }
    context.restore();
    return canvas.toDataURL("image/jpeg", 0.82);
  };

  const event = {
    id: "play-store-demo",
    name: "2026 서울 리빙페어",
    templateId: "sourcing",
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("cf_onboarding_complete", "1");
  localStorage.setItem("cf_lang", "ko");
  localStorage.setItem("cf_events", JSON.stringify([event]));
  localStorage.setItem("cf_current_event", event.id);
  localStorage.setItem("pwa_dismissed", "1");

  const request = indexedDB.open("cf_guest", 2);
  const database = await new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

  const now = Date.now();
  const products = [
    {
      booth: "A-101",
      name: "무선 디스플레이 램프",
      price: "USD 12.50",
      delivery: "해상 30일",
      packaging: "12개 / 박스",
      moq: "500",
      contact: "Mina Chen",
      photos: [makePhoto("lamp")],
      businessCards: [],
      customFields: [],
      eventId: event.id,
      createdAt: new Date(now - 60_000).toISOString(),
      updatedAt: new Date(now - 60_000).toISOString(),
    },
    {
      booth: "B-204",
      name: "모듈형 정리 트레이",
      price: "KRW 8,900",
      delivery: "국내 택배",
      packaging: "6개 / 박스",
      contact: "한빛리빙",
      photos: [makePhoto("tray")],
      businessCards: [],
      customFields: [],
      eventId: event.id,
      createdAt: new Date(now - 120_000).toISOString(),
      updatedAt: new Date(now - 120_000).toISOString(),
    },
    {
      booth: "C-315",
      name: "리테일 패키지 샘플",
      price: "USD 0.42",
      delivery: "항공 샘플",
      packaging: "맞춤 인쇄",
      contact: "Sunrise Pack",
      photos: [makePhoto("box")],
      businessCards: [],
      customFields: [],
      eventId: event.id,
      createdAt: new Date(now - 180_000).toISOString(),
      updatedAt: new Date(now - 180_000).toISOString(),
    },
  ];

  await new Promise((resolve, reject) => {
    const transaction = database.transaction("p", "readwrite");
    const store = transaction.objectStore("p");
    store.clear();
    for (const product of products) store.add(product);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  database.close();
  return "seeded";
})();
