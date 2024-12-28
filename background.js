chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "download" && message.url) {
        console.log("Downloading image:", message.url);
        chrome.downloads.download({
            url: message.url,
            filename: "download.jpg", // Optional: Customize filename
        });
    }
});
