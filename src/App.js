import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

const createCards = () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const shuffledCards = [...letters, ...letters].sort(
    () => Math.random() - 0.5
  );
  return shuffledCards.map((letter, index) => ({
    id: index,
    letter: letter,
    flipped: false,
    matched: false,
  }));
};

const App = () => {
  const [cards, setCards] = useState(createCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.letter === secondCard.letter) {
        const updatedCards = cards.map((card) =>
          card.id === firstIndex || card.id === secondIndex
            ? { ...card, matched: true }
            : card
        );
        setCards(updatedCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card) =>
            card.id === firstIndex || card.id === secondIndex
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 500);
      }
    }

    if (cards.every((card) => card.matched)) {
      setIsCompleted(true);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 0) {
      setMoveCount(moveCount + 1);
    }
  };

  const restartGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoveCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="GameCon">
      {isCompleted ? (
        <div className="GameDone">
          <h2>Congratulations! You've completed the game!</h2>
          <p>Total Moves: {moveCount}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <div className="grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
