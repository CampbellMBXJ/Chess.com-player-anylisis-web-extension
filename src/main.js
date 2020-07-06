

'use strict';

import PlayerDetails from './playerdetails.js';
import DetailBar from './detailbar.js';

async function main() {
  
  const inGame = isInGame();
  console.log(`inGame: ${inGame}`);

  if (inGame) {
    const opponentName = getOpponent();
    const opponent = new PlayerDetails("Umutof");
    await opponent.fetchPlayerAccuracy();
    console.log(opponent.accuracyCount);
    console.log(opponent.meanAccuracy);
    const opponentBar = new DetailBar(opponent);
    
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

main();