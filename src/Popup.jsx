import { useState, useEffect } from "react";
import Sun from "./assets/sunlogo.png";

export default function Popup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [flipped, setFlipped] = useState([false, false, false]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    const initialAmounts = ["100", "200", "300"];
    setAmounts(initialAmounts.sort(() => Math.random() - 0.5));
  }, []);

  const handleFlip = (index) => {
    if (isFrozen) return;

    setIsFrozen(true);
    setFlipped((prevState) =>
      prevState.map((isFlipped, i) => (i === index ? true : isFlipped))
    );

    setTimeout(() => {
      setFlipped([true, true, true]);
    }, 500);
  };

  const renderCard = (index) => (
    <div
      className={`relative w-40 h-64 cursor-pointer transition-transform duration-500 transform ${
        flipped[index] ? "rotate-y-180" : ""
      }`}
      onClick={() => handleFlip(index)}
    >
      <div className="absolute inset-0 backface-hidden bg-[#013946] p-4 rounded-xl shadow-md flex justify-center items-center">
        {flipped[index] ? (
          <h3
            className={`font-bold text-lg rotate-y-180 ${
              flipped[index] ? "text-yellow-400" : "text-white"
            }`}
          >
            ${amounts[index]}
          </h3>
        ) : (
          <img
            src={Sun}
            className="w-24 h-20 object-contain rounded-lg"
            alt={`Card ${index + 1} Logo`}
          />
        )}
      </div>

      <div className="absolute inset-0 backface-hidden bg-[#F0B627] p-6 rounded-xl shadow-md transform rotate-y-180 flex flex-col justify-center items-center text-center">
        <h3 className="text-[#013946] font-bold text-3xl">${amounts[index]}</h3>
        <p className="text-black font-medium mt-2">
          🎉 Congratulations! You got ${amounts[index]}.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="bg-white p-16 shadow-2xl w-[800px] max-w-full relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-2xl font-bold text-gray-700 hover:text-red-500 transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#013946] mb-8 text-center">
          Flip a card for your daily claim!
        </h2>

        <div className="flex justify-center items-center gap-10">
          {renderCard(0)}
          {renderCard(1)}
          {renderCard(2)}
        </div>
      </div>
    </div>
  );
}
