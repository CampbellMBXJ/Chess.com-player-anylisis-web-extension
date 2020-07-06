'use strict';

/* global chrome:false */

const BASE_URL = 'https://www.chess.com/live';

chrome.browserAction.setBadgeText({text: '(ツ)'});
chrome.browserAction.setBadgeBackgroundColor({color: '#eae'});

chrome.runtime.onMessage.addListener(messageHandler);

chrome.tabs.onUpdated.addListener(URLUpdateHandler);

chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.query({'url': BASE_URL}, (tabs) => {
    if (tabs.length === 0) {
      // There is no catgif tab!
      chrome.tabs.create({'url': BASE_URL, 'active': true});
    } else {
      chrome.tabs.query({'url': BASE_URL, 'active': true}, (active) => {
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

function URLUpdateHandler(tabId, update, tab) {
  console.log(JSON.stringify(update));
  
  if (update.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      type: 'tabupdate'
    });
  }
}
