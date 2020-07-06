

'use strict';

/* global chrome:false */

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    // listen for messages sent from background.js
    if (request.type === 'tabupdate') {
      main();
    }
    sendResponse();
});


async function main() {
  const inGame = isInGame();
  console.log(`inGame: ${inGame}`);

  if (inGame) {
    const opponentName = getOpponent();
    const opponent = new globalThis.PlayerDetails(opponentName);
    await opponent.fetchPlayerAccuracy();
    console.log(opponent.accuracyCount);
    console.log(opponent.meanAccuracy);
    const opponentBar = new globalThis.DetailBar(opponent);
    
    // sendMessage("accuracy", accuracyResHandler, { opponent });
  }
}

function accuracyResHandler(response) {
  console.log(JSON.stringify(response));
  
}

function sendMessage(fetchType, callback, body) {
  console.log(`Message sent with fetchType: ${fetchType}`);
  chrome.runtime.sendMessage({fetch: fetchType, body}, callback);
}

function getOpponent() {
  const users = document.getElementsByClassName("user-tagline-username");
  const opponent = users[0].dataset.username;
  console.log("opponent: " + opponent);
  return opponent;
}

function isInGame() {
  const PATH = "https://www.chess.com/live";
  const url = location.href;
  
  return url.slice(PATH.length).startsWith("#g=");
}