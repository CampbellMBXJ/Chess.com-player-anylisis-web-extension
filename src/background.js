'use strict';

/*global chrome:false */

chrome.browserAction.setBadgeText({text: '(ツ)'});
chrome.browserAction.setBadgeBackgroundColor({color: '#eae'});

chrome.runtime.onMessage.addListener(messageHandler);

chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.query({'url': 'https://www.chess.com/live'}, (tabs) => {
    if (tabs.length === 0) {
      // There is no catgif tab!
      chrome.tabs.create({'url': 'https://www.chess.com/live', 'active': true});
    } else {
      chrome.tabs.query({'url': 'https://www.chess.com/live', 'active': true}, (active) => {
        if (active.length === 0) {
          chrome.tabs.update(tabs[0].id, {'active': true});
        }
      });
    }
  });
});

function fetchAccuracy(opponent) {
  return fetch('https://www.chess.com/games/archive/umutof')
    .then(res => {
      log(JSON.stringify(res));
      return res.text();
    });
}

function messageHandler(request, sender, sendResponse) {
  console.log("recevied messeage: " + JSON.stringify(request));
  let handler;
  switch(request.fetch) {
    case "accuracy":
      handler = fetchAccuracy.bind(null, request.body.opponent);
      break;
  }
  handler().then(res => {
    sendResponse(res);
  });
}

