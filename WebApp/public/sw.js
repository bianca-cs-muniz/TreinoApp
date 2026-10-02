// sw.js — Service Worker para notificações em background
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

// Guarda os timeoutIds das notificações de tempo (para poder cancelar)
const timeoutsTreino = [];

self.addEventListener("message", (event) => {
  // ─── Descanso: notificação única agendada por delay ───────────────────────
  if (event.data?.type === "SCHEDULE_NOTIFICATION") {
    const { delayMs, title, body } = event.data;
    event.waitUntil(
      new Promise((resolve) => {
        setTimeout(() => {
          self.registration.showNotification(title, {
            body,
            icon: "/icons/icon-192.png",
            badge: "/icons/icon-192.png",
            vibrate: [200, 100, 200],
            tag: "descanso-fim",
            renotify: true,
          }).then(resolve);
        }, delayMs);
      })
    );
  }

  if (event.data?.type === "CANCEL_NOTIFICATION") {
    event.waitUntil(
      self.registration.getNotifications({ tag: "descanso-fim" }).then((ns) => ns.forEach((n) => n.close()))
    );
  }

  // ─── Tempo de treino: múltiplas notificações agendadas por timestamp ───────
  if (event.data?.type === "SCHEDULE_TREINO_TIMERS") {
    // Cancela timers anteriores
    timeoutsTreino.forEach((id) => clearTimeout(id));
    timeoutsTreino.length = 0;

    const { marcos } = event.data;
    // marcos: [{ fireAtMs, title, body, tag }, ...]
    const now = Date.now();
    for (const marco of marcos) {
      const delay = marco.fireAtMs - now;
      if (delay <= 0) continue; // já passou — ignora

      const id = setTimeout(() => {
        self.registration.showNotification(marco.title, {
          body: marco.body,
          icon: "/icons/icon-192.png",
          badge: "/icons/icon-192.png",
          vibrate: [200, 100, 200],
          tag: marco.tag,
          renotify: true,
        });
      }, delay);
      timeoutsTreino.push(id);
    }
  }

  if (event.data?.type === "CANCEL_TREINO_TIMERS") {
    timeoutsTreino.forEach((id) => clearTimeout(id));
    timeoutsTreino.length = 0;
    // fecha eventuais notificações abertas
    event.waitUntil(
      Promise.all([
        self.registration.getNotifications({ tag: "treino-1h" }).then((ns) => ns.forEach((n) => n.close())),
        self.registration.getNotifications({ tag: "treino-1h30" }).then((ns) => ns.forEach((n) => n.close())),
        self.registration.getNotifications({ tag: "treino-2h" }).then((ns) => ns.forEach((n) => n.close())),
      ])
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      const focusable = clientList.find((c) => "focus" in c);
      if (focusable) return focusable.focus();
      return self.clients.openWindow("/");
    })
  );
});
