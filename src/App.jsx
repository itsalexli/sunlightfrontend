import Header from "./Header";
import Button from "./Button";
import TitleBox from "./TitleBox";
import Performance from "./Performance";
import Overview from "./Overview";
import { useState } from "react";
import Trade from "./Trade";

function App() {
  const [tab, setTab] = useState("portfolio");

  return (
    <>
      <Header />
      <hr className="mt-0 mb-4 border-t border-gray-300 w-full mx-auto" />
      <div className="ml-42">
        <Button
          name="Portfolio"
          state={tab}
          width="30"
          content="Portfolio"
          onClick={() => setTab("portfolio")}
        />
        <Button
          name="Trade"
          content="Trade"
          state={tab}
          width="30"
          onClick={() => setTab("trade")}
        />
      </div>
      <TitleBox />
      <hr className="mt-4 border-t border-gray-300 w-4/5 mx-auto " />
      {tab === "portfolio" ? (
        <div className="flex w-full space-x-8 mt-10">
          <Performance />
          <Overview />
        </div>
      ) : (
        <div>
          <Trade />
        </div>
      )}
    </>
  );
}

export default App;
