import { Splitter } from "@ark-ui/react";
import React from "react";
import Editor from "./Editor";
import Viewer from "./Viewer";

// @ts-expect-error types are not available
import PGQuery from "pg-query-emscripten";

const pgQuery = await new PGQuery();

function App() {
  const [value, setValue] = React.useState("");
  return (
    <Splitter.Root
      defaultSize={[
        { id: "a", size: 50 },
        { id: "b", size: 50 },
      ]}
    >
      <Splitter.Panel id="a">
        <Editor onChange={setValue} />
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" className="w-1 bg-gray-200 hover:bg-gray-400 transition-colors duration-200 ease-in-out" />
      <Splitter.Panel id="b">
        {value !== "" && <Viewer value={JSON.stringify(pgQuery.parse(value), null, 2)} />}
      </Splitter.Panel>
    </Splitter.Root>
  );
}

export default App;
