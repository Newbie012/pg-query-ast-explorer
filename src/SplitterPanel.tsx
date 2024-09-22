import { Splitter } from "@ark-ui/react";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Viewer from "./Viewer";

// @ts-expect-error types are not available
import PGQuery from "pg-query-emscripten";

const pgQuery = await new PGQuery();

const SplitterPanel: React.FC = () => {
  const [value, setValue] = useState("");
  const isVertical = useIsVertical();

  return (
    <Splitter.Root
      defaultSize={[
        { id: "a", size: 50 },
        { id: "b", size: 50 },
      ]}
      orientation={isVertical ? "vertical" : "horizontal"}
    >
      <Splitter.Panel id="a">
        <Editor onChange={setValue} />
      </Splitter.Panel>
      <Splitter.ResizeTrigger
        id="a:b"
        className="w-1 bg-gray-200 transition-colors duration-200 ease-in-out hover:bg-gray-400"
      />
      <Splitter.Panel id="b">
        {value ? <Viewer value={JSON.stringify(pgQuery.parse(value), null, 2)} /> : null}
      </Splitter.Panel>
    </Splitter.Root>
  );
};

function useIsVertical(): boolean {
  const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsVertical(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isVertical;
}

export default SplitterPanel;
