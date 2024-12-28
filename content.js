function addDownloadButtons() {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
        // Avoid adding duplicate buttons
        if (img.parentElement.querySelector(".download-btn")) return;

        const imageURL = img.src || img.getAttribute("data-src") || img.getAttribute("srcset");

        if (imageURL) {
            const button = document.createElement("button");
            button.innerText = "Download";
            button.className = "download-btn"; // Add a class for identification
            button.style.position = "absolute";
            button.style.top = "0";
            button.style.left = "0";
            button.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            button.style.zIndex = "9999";

            button.onclick = (e) => {
                e.stopPropagation(); // Prevent interfering with site behavior
                chrome.runtime.sendMessage({ action: "download", url: imageURL });
            };

            img.parentElement.style.position = "relative"; // Ensure the parent has relative positioning
            img.parentElement.appendChild(button);
        }
    });
}

// Observe DOM changes to re-add buttons
const observer = new MutationObserver(() => {
    addDownloadButtons();
});

// Start observing changes in the body
observer.observe(document.body, { childList: true, subtree: true });

// Initial setup
addDownloadButtons();
