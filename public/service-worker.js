self.addEventListener("install", (event) => {
  // no caching here, offline mode not supported
  self.skipWaiting();
});
