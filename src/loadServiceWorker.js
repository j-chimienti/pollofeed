if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./serviceWorker.js")
            .then(r => console.log("service worker registered"))
            .catch(err => console.error("service worker not registered", err))
    })
}
