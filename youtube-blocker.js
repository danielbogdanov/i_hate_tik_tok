(function () {
  'use strict';

  let isEnabled = true;

  // Check initial state
  chrome.storage.sync.get(['youtubeEnabled'], function (result) {
    isEnabled = result.youtubeEnabled !== false;
    if (isEnabled) {
      enableBlocking();
    }
  });

  // Listen for changes from popup
  chrome.storage.sync.onChanged.addListener(function (changes) {
    if (changes.youtubeEnabled) {
      isEnabled = changes.youtubeEnabled.newValue;
      if (isEnabled) {
        enableBlocking();
      } else {
        disableBlocking();
      }
    }
  });

  function enableBlocking() {
    // Add class to body to enable CSS rules
    if (document.body) {
      document.body.classList.add('block-youtube-shorts');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('block-youtube-shorts');
      });
    }
  }

  function disableBlocking() {
    // Remove class from body to disable CSS rules
    if (document.body) {
      document.body.classList.remove('block-youtube-shorts');
    }
  }

  // Initial setup
  if (document.body) {
    if (isEnabled) enableBlocking();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      if (isEnabled) enableBlocking();
    });
  }

})();