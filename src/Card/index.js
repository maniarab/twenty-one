import React from 'react';

function Card(props) {
  return (
    <div>
      <img src={props.image} style={{width: "100px", height: "150px"}}/>
    </div>
  );
}

export default Card;
