document.addEventListener('DOMContentLoaded', function() {
  const defaultRatingSelect = document.getElementById('defaultRating');
  const applyRatingButton = document.getElementById('applyRating');
  const randomizeButton = document.getElementById('randomize');
  const statusDiv = document.getElementById('status');

  // Load saved default rating
  chrome.storage.sync.get('defaultRating', function(data) {
    if (data.defaultRating) {
      defaultRatingSelect.value = data.defaultRating;
    }
  });

  applyRatingButton.addEventListener('click', function() {
    const rating = defaultRatingSelect.value;
    chrome.storage.sync.set({defaultRating: rating}, function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "applyRating", rating: rating}, function(response) {
          statusDiv.textContent = response ? response.message : "Rating applied successfully!";
        });
      });
    });
  });

  randomizeButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "randomizeRatings"}, function(response) {
        statusDiv.textContent = response ? response.message : "Ratings randomized successfully!";
      });
    });
  });
});
