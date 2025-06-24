import { useState } from "react";
import Header from "./Header";
import SplitterPanel from "./SplitterPanel";

export type ParseMode = "scan" | "parse";

function App() {
  const [parseMode, setParseMode] = useState<ParseMode>("parse");

  return (
    <div className="flex h-screen flex-col">
      <Header parseMode={parseMode} onParseModeChange={setParseMode} />
      <div className="flex-1">
        <SplitterPanel parseMode={parseMode} />
      </div>
    </div>
  );
}

export default App;
