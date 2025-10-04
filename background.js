var blockedSites = ["youtube.com", "instagram.com", "reddit.com"]

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) { // tab.url
        if (blockedSites.some(site => tab.url.includes(site))) { // tab.url
            var redirectUrl = chrome.runtime.getURL("YTBlocker.html");
            chrome.tabs.update(tabId, { url: redirectUrl })
            console.log("Blocked", tab.url);
        }
    }
});