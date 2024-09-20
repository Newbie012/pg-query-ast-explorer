import React from "react";
import { monaco } from "./monaco";

interface ViewerProps {
  value: string;
}

export default function Viewer(props: ViewerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const editorInstance = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const initialValue = React.useRef(props.value);

  React.useEffect(() => {
    if (!ref.current) return;

    // Create a model specifically for this viewer instance
    const model = monaco.editor.createModel(initialValue.current, "json");

    // Create the editor
    editorInstance.current = monaco.editor.create(ref.current, {
      model: model,
      language: "json", // Use 'json' for the viewer
      theme: "min-light",
      fontSize: 14,
      minimap: { enabled: false }, // Disable the minimap
      folding: true, // Enable folding
      foldingHighlight: true, // Highlight folding regions
      showFoldingControls: "always", // Always show folding controls
      readOnly: true, // Make the editor readonly,
      automaticLayout: true,
      contextmenu: false,
    });

    // Clean up model and editor on unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.dispose();
        model.dispose();
      }
    };
  }, []);

  React.useEffect(() => {
    if (editorInstance.current) {
      editorInstance.current.getModel()?.setValue(props.value);
    }
  }, [props.value]);

  return <div ref={ref} className="h-full" />;
}
