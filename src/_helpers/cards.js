class Cards{
  constructor() {
    this.deck_id = undefined;
  }

  async shuffle() {
    // Need to handle error conditions
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    const response = await fetch(url);
    const data = await response.json();
    this.deck_id = data.deck_id;
  }

  async getCard(numCards=1) {
    // Need to handle error conditions
    const url = `https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=${numCards}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.cards;
  }
}

export default Cards
