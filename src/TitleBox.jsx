import Button from "./Button";

export default function TitleBox() {
  return (
    <div className=" flex p-0 m-0 bg-yellow-400 h-18 w-4/5 mx-auto mt-4 items-center">
      <p className="font-bold ml-5 mr-238">My Sun Life - Simulator</p>
      <Button name="Sun Life Account" state="fill" />
    </div>
  );
}
