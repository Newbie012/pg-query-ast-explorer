import { Splitter } from "@ark-ui/react";
import React, { useEffect, useState } from "react";
import type { ParseMode } from "./App";
import Editor from "./Editor";
import Viewer from "./Viewer";

import { loadModule, parseSync, scanSync } from "@libpg-query/parser";

await loadModule();

interface SplitterPanelProps {
  parseMode: ParseMode;
}

const SplitterPanel: React.FC<SplitterPanelProps> = ({ parseMode }) => {
  const [value, setValue] = useState("");
  const isVertical = useIsVertical();

  const getProcessedValue = () => {
    if (!value) return null;
    
    try {
      const result = parseMode === "scan" ? scanSync(value) : parseSync(value);
      return JSON.stringify(result, null, 2);
    } catch (error) {
      return JSON.stringify({ error: error instanceof Error ? error.message : String(error) }, null, 2);
    }
  };

  return (
    <Splitter.Root
      panels={[{ id: "a" }, { id: "b" }]}
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
        {value ? <Viewer value={getProcessedValue() || ""} /> : null}
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
