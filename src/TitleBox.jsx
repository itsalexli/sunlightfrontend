import { useState } from "react";
import Button from "./Button";
import Popup from "./Popup";

export default function TitleBox() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex p-0 m-0 bg-yellow-400 h-18 w-4/5 mx-auto mt-4 items-center">
      <p className="font-bold ml-5 mr-238">My Sun Life - Simulator</p>

      <Button
        name="Sun Life Account"
        state="fill"
        onClick={() => setModalOpen(true)}
      />
      <Popup isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold">Sun Life Account</h2>
        <p className="mt-4">Details about the Sun Life Account go here...</p>
      </Popup>
    </div>
  );
}
