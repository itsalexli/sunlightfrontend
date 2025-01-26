import { useState, useEffect } from "react";
import Logo from "./assets/sunlife_logo.jpg";

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

  return (
    <div className="fixed inset-0 bg-yellow-300 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-2/3 relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex justify-around items-center gap-6">
          {flipped.map((isFlipped, index) => (
            <div
              key={index}
              className={`relative w-40 h-64 cursor-pointer transition-transform transform ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={() => handleFlip(index)}
            >
              <div className="absolute inset-0 backface-hidden bg-green-950 p-4 rounded-lg shadow-md flex justify-center items-center">
                {isFlipped ? (
                  <h3 className="text-white font-bold text-lg rotate-y-180">
                    Flipped Text
                  </h3>
                ) : (
                  <img
                    src={Logo}
                    className="w-24 h-24 object-contain"
                    alt={`Card ${index + 1} Logo`}
                  />
                )}
              </div>

              <div className="absolute inset-0 backface-hidden bg-gray-800 p-4 rounded-lg shadow-md transform rotate-y-180 flex flex-col justify-center items-center">
                <h3 className="text-white font-bold text-3xl">
                  ${amounts[index]}
                </h3>
                <p className="text-gray-300 mt-2 text-center">
                  Congratulations! You got ${amounts[index]}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
