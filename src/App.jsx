import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import { Analytics } from "@vercel/analytics/react";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    // Check for match
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        // Keep the cards flipped
        resetTurn();
      } else {
        console.log("Not a match!");
        // Flip the cards back
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffledCards();
  }, [])

  return (
    <div className="w-[860px] my-[40px] mx-auto mt-20">
      <h1 className="text-5xl md:text-3xl font-extrabold mb-5">Magic Match</h1>
      <button
        onClick={shuffledCards}
        className="border-1 py-[6px] px-8 md:px-[12px] rounded-md font-bold cursor-pointer text-3xl md:text-lg bg-transparent hover:bg-[#c23866] duration-400"
      >
        New Game
      </button>

      <div className="grid grid-cols-3 p-16 md:grid-cols-4 gap-4 mt-10">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="mt-4">Turns: {turns}</p>
      <Analytics />
    </div>
  );
}

export default App;
