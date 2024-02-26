chrome.storage.local.get(["keywords"]).then((result) => {
    const keywords = result.keywords;
    numKeywordsSpan.innerHTML = keywords.length;
    chrome.action.setBadgeText({text: keywords.length.toString()},() => {});

});

clearBtn.addEventListener("click", () => {
	chrome.storage.local.clear();
	chrome.storage.local.set({ "keywords":[] }).then(() => {
    		console.log("Init keywords list");
  	});
	numKeywordsSpan.innerHTML = "0";
	chrome.action.setBadgeText({text: "0"},() => {});
});
	