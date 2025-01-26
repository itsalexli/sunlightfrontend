import Header from "./Header";
import Button from "./Button";
import TitleBox from "./TitleBox";
import Performance from "./Performance";
import Overview from "./Overview";

function App() {
  return (
    <>
      <Header />
      <hr className="mt-0 mb-4 border-t border-gray-300 w-full mx-auto " />
      <div className="ml-43">
        <Button name="Portfolio" state="fill" width="30" />
        <Button name="Trade" state="unfill" width="30" />
      </div>
      <TitleBox />
      <hr className="mt-4 border-t border-gray-300 w-4/5 mx-auto " />

      <div className="flex w-full space-x-8 mt-6">
        <Performance />
        <Overview />
      </div>
    </>
  );
}

export default App;
