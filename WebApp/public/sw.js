// sw.js — Service Worker para notificações em background (descanso entre séries)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("message", (event) => {
  if (event.data?.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data;
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        vibrate: [200, 100, 200],
        tag: "descanso-fim",
        renotify: true,
      })
    );
  }

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
