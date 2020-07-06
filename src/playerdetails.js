'use strict';

class PlayerDetails {
  playerName;
  meanAccuracy;
  accuracyCount;

  constructor(playerName, isOpponent=true) {
    this.playerName = playerName;
    this.isOpponent = isOpponent;
  }

  async fetchPlayerAccuracy() {
    const res = await fetch('https://www.chess.com/games/archive/' + this.playerName);
    const text = await res.text();
    
    const parser = new DOMParser();
    const elements = parser.parseFromString(text, 'text/html');
    const rows = elements.getElementsByClassName('v-board-popover');
    const values = [];
    for (const row of rows) {
      // Check position of target user
      const usersDiv = row.getElementsByClassName('archive-games-user-tagline')[0];
      const player1 = usersDiv.getElementsByClassName('post-view-meta-username')[0].textContent.trim();
      const playerPosition = player1 === this.playerName ? 0 : 1;
      // Get respective accuracy for derived player index
      const anylisisCell = row.getElementsByClassName('archive-games-analyze-cell')[0];
      const divs = anylisisCell.getElementsByTagName('div');
      if (divs.length) {
        values.push(parseFloat(divs[playerPosition].textContent));
      }
    }
    // Calculate Mean
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;
    this.meanAccuracy = avg;
    this.accuracyCount = values.length;
    return;
  }
}

// Use global this as dynamic imports not compatible with firefox
globalThis.PlayerDetails = PlayerDetails;