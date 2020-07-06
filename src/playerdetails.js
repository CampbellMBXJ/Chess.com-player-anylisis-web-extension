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
    const res = await fetch('https://www.chess.com/games/archive/' + this.playerName, {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });
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

export default PlayerDetails;