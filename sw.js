const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/main.js',
    '/assets/i18n.js',
    '/assets/rtl.css',
    '/locales/en.json',
    '/locales/ar.json',
    '/images/profile1.jpg',
    '/images/profile2.jpg',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});