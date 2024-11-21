function applyRating(rating) {
  const selects = document.querySelectorAll('select[name="rating_[]"]');
  selects.forEach(select => {
    const option = Array.from(select.options).find(opt => opt.value === rating);
    if (option) {
      select.value = rating;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

function randomizeRatings() {
  const selects = document.querySelectorAll('select[name="rating_[]"]');
  selects.forEach(select => {
    const randomIndex = Math.floor(Math.random() * (select.options.length - 1)) + 1;
    select.selectedIndex = randomIndex;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

function observeDOM() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        chrome.storage.sync.get('defaultRating', function(data) {
          if (data.defaultRating) {
            applyRating(data.defaultRating);
          }
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "applyRating") {
    applyRating(request.rating);
    sendResponse({message: "Rating applied successfully!"});
  } else if (request.action === "randomizeRatings") {
    randomizeRatings();
    sendResponse({message: "Ratings randomized successfully!"});
  }
  return true;
});

observeDOM();

console.log("ARIS Evaluation Assistant is active and ready to help!");
