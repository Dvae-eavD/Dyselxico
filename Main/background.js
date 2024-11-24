// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.storage.sync.set({ color: '#ffffff', fontSize: '16px', font: 'Arial' });
});

chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked');
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});
