const sections = {
	"AI": "AI",
	"English": "Tiếng Anh",
	"Japanese": "Tiếng Nhật",
	"Buddhism": "Đạo Phật",
	"Politics":"Chính trị"
}

chrome.runtime.onInstalled.addListener(() => {
	for (const key of Object.keys(sections)) {
		chrome.contextMenus.create({
			id: key,
			title: sections[key],
			type: 'normal',
			contexts: ['selection']
		});
	}
	chrome.storage.local.set({ "keywords":[] }).then(() => {
    		console.log("Init keywords list");
  	});
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
	const phrase = info.selectionText;
	const section = info.menuItemId;
	const keyword = `"${phrase}": ${section}`;
	chrome.storage.local.get(["keywords"]).then((result) => {
		const keywords = result.keywords;
		keywords.push(keyword);
		chrome.storage.local.set({ "keywords": keywords }).then(() => {
			chrome.action.setBadgeText({text:keywords.length.toString()},() => {});
  		});
  	});
	
});