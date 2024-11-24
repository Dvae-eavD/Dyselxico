// content.js
console.log("Content script loaded");
chrome.storage.sync.get(['color', 'fontSize', 'font'], ({ color, fontSize, font }) => {
  console.log(`Applying settings: color=${color}, fontSize=${fontSize}, font=${font}`);
  document.body.style.backgroundColor = color || '';
  document.body.style.fontSize = fontSize || '';
  document.body.style.fontFamily = font || '';

  // Apply styles to all text elements
  const elements = document.querySelectorAll('body, body *');
  elements.forEach((element) => {
    element.style.fontSize = fontSize || '';
    element.style.fontFamily = font || '';
  });
});
