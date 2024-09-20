import { shikiToMonaco } from "@shikijs/monaco";
import * as monaco from "monaco-editor-core";
import { createHighlighter } from "shiki/bundle/full";

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
  themes: ["min-light"],
  langs: ["sql", "json"],
});

// Register the languageIds first. Only registered languages will be highlighted.
monaco.languages.register({ id: "sql" });
monaco.languages.register({ id: "json" });

// Register the themes from Shiki, and provide syntax highlighting for Monaco.
shikiToMonaco(highlighter, monaco);

function normalizeIndent(strings: TemplateStringsArray, ...values: unknown[]): string {
  const fullString = strings.reduce((acc, str, i) => acc + (values[i - 1] ?? "") + str);
  const lines = fullString.split("\n");

  const indentLengths = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^(\s*)/)?.[0].length ?? 0);

  const minIndent = Math.min(...indentLengths);

  return lines
    .map((line) => line.slice(minIndent))
    .join("\n")
    .trim();
}

export { monaco, normalizeIndent };
