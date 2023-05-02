// background.js

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 500,
      height: 500
    });
  });
  