var blockedSites = ["youtube.com", "instagram.com", "reddit.com"]

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) { // tab.url
        if (blockedSites.some(site => tab.url.includes("youtube.com"))) { // tab.url
            var redirectUrl = chrome.runtime.getUrl("https://namishj.github.io/match-master/");
            chrome.tabs.update(tabId, { url: redirectUrl })
            console.log("Blocked", tab.url);
        }
    }
});