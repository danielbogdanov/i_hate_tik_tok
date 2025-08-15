document.addEventListener('DOMContentLoaded', function () {
  // Load saved settings
  chrome.storage.sync.get(['youtubeEnabled', 'facebookEnabled'], function (result) {
    document.getElementById('youtube-toggle').checked = result.youtubeEnabled !== false;
    document.getElementById('facebook-toggle').checked = result.facebookEnabled !== false;
  });

  // Save settings when toggled
  document.getElementById('youtube-toggle').addEventListener('change', function () {
    chrome.storage.sync.set({ youtubeEnabled: this.checked }, function () {
      console.log('YouTube setting saved:', this.checked);
    }.bind(this));
  });

  document.getElementById('facebook-toggle').addEventListener('change', function () {
    chrome.storage.sync.set({ facebookEnabled: this.checked }, function () {
      console.log('Facebook setting saved:', this.checked);
    }.bind(this));
  });
});
