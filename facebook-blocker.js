(function () {
  'use strict';

  let isEnabled = true;

  // Check initial state
  chrome.storage.sync.get(['facebookEnabled'], function (result) {
    isEnabled = result.facebookEnabled !== false;
    if (isEnabled) {
      enableBlocking();
    }
  });

  // Listen for changes from popup
  chrome.storage.sync.onChanged.addListener(function (changes) {
    if (changes.facebookEnabled) {
      isEnabled = changes.facebookEnabled.newValue;
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
      document.body.classList.add('block-facebook-stories');
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('block-facebook-stories');
      });
    }
  }

  function disableBlocking() {
    // Remove class from body to disable CSS rules
    if (document.body) {
      document.body.classList.remove('block-facebook-stories');
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