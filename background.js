
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    if (tab.title == "Assignment") {
      chrome.scripting.executeScript({
        files : ['script.js'],
        target : {tabId : tab.id}
      });
    }
  }
});

// Context menu 
// chrome.contextMenus.create({
//   id: "Assignment",
//   title: "Add this Assignment to Google Calendar",
//   contexts: ["all"],
//   documentUrlPatterns: ["https://scele.cs.ui.ac.id/mod/assign/*"]
// });

// chrome.contextMenus.onClicked.addListener(function(info, tab) {
//   if (info.menuItemId == "Assignment") {
//     let msg = {
//       txt: "sucess Assignment"
//     }
//     chrome.tabs.sendMessage(tab.id, msg);
//   }
// });





