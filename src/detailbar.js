'use strict'

class DetailBar {
  playerDetails;
  detailBarContainer;

  constructor(playerDetails) {
    this.playerDetails = playerDetails;
    this.setDetailBarDiv();
    this.insertDetails();
  }

  setDetailBarDiv() {
    const userTagLines = document.getElementsByClassName('board-player-default-userTagline');
    // Select tagline depending if player is oppononet or self.
    const targetTagline = userTagLines[this.playerDetails.isOpponent ? 0 : 1];
    const newBar = this.createDetailBarContainer();
    targetTagline.appendChild(newBar);
    this.detailBarContainer = newBar;
  }

  createDetailBarContainer() {
    const detailBar = document.createElement('div');
    detailBar.className = 'ccpa-bar-container';
    detailBar.id = this.playerDetails.isOpponent ? 'ccpa-opponent-detail-bar' : 'ccpa-personal-detail-bar';
    return detailBar;
  }

  insertDetails() {
    const currentDetails = `Accuracy: ${this.playerDetails.meanAccuracy.toFixed(2)}% (${this.playerDetails.accuracyCount} game average)`;
    this.detailBarContainer.innerText = currentDetails;
  }
}

// Use globalThis as dynamic imports not compatible with firefox
globalThis.DetailBar = DetailBar;