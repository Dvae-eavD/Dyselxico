// options.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("Options page loaded");
  chrome.storage.sync.get(['color', 'fontSize', 'font'], ({ color, fontSize, font }) => {
    document.getElementById('bgcolor').value = color;
    document.getElementById('fontsize').value = parseInt(fontSize, 10);
    document.getElementById('font').value = font;
  });

  document.getElementById('save').addEventListener('click', () => {
    const color = document.getElementById('bgcolor').value;
    const fontSize = document.getElementById('fontsize').value + 'px';
    const font = document.getElementById('font').value;
    console.log(`Saving settings: color=${color}, fontSize=${fontSize}, font=${font}`);
    chrome.storage.sync.set({ color, fontSize, font }, () => {
      console.log('Settings saved');
    });
  });
});
