import React, {useState, useEffect} from 'react';
import Player from './Player';
import Cards from './_helpers/cards';



function App() {
  const TENS = new Set('JACK', 'QUEEN', 'KING');
  const cards = new Cards();
  const [currPlayer, setCurrPlayer] = useState(0);
  const players = [];
  players.push(usePlayerState('Dealer'));
  players.push(usePlayerState('Player 1'));


  function usePlayerState(name='', score=0, cards=[]) {
    const [playerState, setPlayerState] = useState({name, score, cards})
    return {
      playerState,
      setPlayerState
    };
  }

  async function handleStartGame() {
    setCurrPlayer(0);
    await cards.shuffle();
    const dealerCards = await cards.getCard(2);
    const dealer = players[currPlayer];
    dealer.setPlayerState(prevState => {
      return {
        name: prevState.name,
        score: determineBestScore(dealerCards),
        cards: prevState.cards.concat(dealerCards)
      };
    });
    setCurrPlayer(prevPlayer => prevPlayer + 1);
    console.log('cards: ', cards);
  }

  function getCardValue(card) {
    let value = Number(card.value);
    if(!value) {
      value = TENS.has(card.value) ? 10 : value;
    }
    return value;
  }

  function determineBestScore(cards) {
    let score = 0;
    let numOfAces = 0;
    cards.forEach(c => {
      let val = getCardValue(c);
      if(!val){
        numOfAces++;
      } else {
        score += val;
      }
    });

    if(numOfAces) {
      console.log('has aces');
    }
    return score;

    function calcBestScore(curr, numAces) {
      // ace : 1 or 10
    }
  }

  async function handleHit() {
    console.log('cards: ', cards);
    const playerCards = await cards.getCard();
    const player = players[currPlayer];
    player.setPlayerState(prevState => {
      return {
        name: prevState.name,
        score: determineBestScore(playerCards),
        cards: prevState.cards.concat(playerCards)
      };
    });
  }

  function handleStand() {
    console.log('standing');
    // handle end game.
  }

  return (
    <div className="App">
      <h1>Twenty One</h1>
      <button name="button" onClick={handleStartGame}>Start Game</button>
      {
        players.map((details,idx) => <Player key={idx} {...details.playerState} />)
      }
      <hr />
      <p>Current player: {players[currPlayer].playerState.name}</p>
      <button name="button" onClick={handleHit}>Hit</button>
      <button name="button" onClick={handleStand}>Stand</button>

    </div>
  );
}

export default App;
