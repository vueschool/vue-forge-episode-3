window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      var currentTab = tabs[0];
      var url = encodeURIComponent(currentTab.url);
      var iframe = document.createElement('iframe');
      iframe.height = 600;
      iframe.src = 'http://localhost:3000/?extension=true&url=' + url;
      document.body.appendChild(iframe);
    });
  });