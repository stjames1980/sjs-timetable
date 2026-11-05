// Old app retired – this removes the old offline copy and sends the phone to the new SJS App.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({type: 'window'}))
      .then(cs => cs.forEach(c => c.navigate('https://stjames1980.github.io/sjs-school/')))
  );
});
