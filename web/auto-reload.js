var events = new EventSource("events");
events.addEventListener("files-changed", (event) => {
    events.close();
    location.reload()
})

events.onerror = (err) => {
    console.log("server-sent event source 'event' failed");
};

// Avoid error when page is reloaded.
// https://bugzilla.mozilla.org/show_bug.cgi?id=833462#c11
window.addEventListener('beforeunload', () => {
    events.close();
});
