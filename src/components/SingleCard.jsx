const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="relative">
      <div>
        <img
          className="w-full border block rounded-md transform transition-all ease-in duration-200"
          style={
            flipped
              ? { transform: "rotateY(180deg)", position: "absolute" }
              : { position: "absolute", transform: "rotateY(90deg)" }
          }
          src={card.src}
          alt="card front"
        />
        <img
          className="w-full border block rounded-md transform transition-all ease-in duration-200"
          style={
            flipped
              ? { transform: "rotateY(90deg)" }
              : { transform: "rotateY(180deg)" }
          }
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
