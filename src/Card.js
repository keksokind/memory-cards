import React from "react";
import "./App.css";

const Card = ({ card, onClick }) => {
  const handleClick = () => {
    onClick(card.id);
  };

  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
      onClick={handleClick}
    >
      <div className="card-front">{card.letter}</div>
      <div className="card-back">?</div>
    </div>
  );
};

export default Card;
