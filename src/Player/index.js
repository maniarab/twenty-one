import React from 'react';
import Card from '../Card';


function Player(props) {
  console.log(props.cards);
  return (
    <div>
      <h5>{props.name}</h5>
      <div>
        {props.cards.map(c => <Card key={c.code} image={c.image} />)}
      </div>
    </div>
  );
}

export default Player;
