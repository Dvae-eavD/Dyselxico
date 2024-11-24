document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError) {
      console.error('Error in tabs.query:', chrome.runtime.lastError.message);
    } else if (tabs.length === 0) {
      console.error('No active tab found');
    } else {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getCurrentBackgroundColor
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error('Error in executeScript:', chrome.runtime.lastError.message);
          } else if (results && results[0] && results[0].result) {
            const currentColor = results[0].result;
            console.log('Current background color:', currentColor);
            document.getElementById('bgcolor').value = rgbToHex(currentColor);
          } else {
            console.error('No result from executeScript');
          }
        }
      );
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const color = document.getElementById('bgcolor').value;
    const fontSize = document.getElementById('fontsize').value + 'px';
    const font = document.getElementById('font').value;
    console.log(`Saving settings: color=${color}, fontSize=${fontSize}, font=${font}`);
    chrome.storage.sync.set({ color, fontSize, font }, () => {
      console.log('Settings saved');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          console.log('Reloading tab:', tabs[0].id);
          chrome.tabs.reload(tabs[0].id);
        } else {
          console.error('No active tab found for reload');
        }
      });
    });
  });

  document.getElementById('reset').addEventListener('click', () => {
    chrome.storage.sync.set({ color: '', fontSize: '', font: '' }, () => {
      console.log('Settings reset to default');
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          console.log('Reloading tab:', tabs[0].id);
          chrome.tabs.reload(tabs[0].id);
        } else {
          console.error('No active tab found for reload');
        }
      });
    });
  });
});

function getCurrentBackgroundColor() {
  console.log('Executing getCurrentBackgroundColor');
  return window.getComputedStyle(document.body).backgroundColor;
}

function rgbToHex(rgb) {
  console.log('Converting RGB to Hex:', rgb);
  let rgbArray = rgb.match(/\d+/g);
  let hex = (parseInt(rgbArray[0]) << 16) | (parseInt(rgbArray[1]) << 8) | parseInt(rgbArray[2]);
  return '#' + hex.toString(16).padStart(6, '0');
}
