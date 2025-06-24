import { GithubIcon, HeartIcon } from "lucide-react";
import React from "react";
import type { ParseMode } from "./App";
import ParseModeSelector from "./ParseModeSelector";

interface HeaderProps {
  parseMode: ParseMode;
  onParseModeChange: (mode: ParseMode) => void;
}

const Header: React.FC<HeaderProps> = ({ parseMode, onParseModeChange }) => (
  <header className="relative z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 shadow-xs">
    <div className="flex items-center gap-4">
      <h1 className="text-sm font-semibold text-slate-950">PG Query AST Explorer</h1>
    </div>

    <div className="flex gap-2">
      <ParseModeSelector parseMode={parseMode} onParseModeChange={onParseModeChange} />

      <a
        href="https://github.com/sponsors/Newbie012"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 ease-in-out hover:bg-slate-50 active:bg-slate-100"
      >
        <HeartIcon className="size-3.5 group-hover:fill-red-500 group-hover:text-red-500" />
        <span>Sponsor</span>
      </a>
      <a
        href="https://github.com/Newbie012/pg-query-ast-explorer"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-xs font-medium text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-slate-800 active:bg-slate-900"
      >
        <GithubIcon className="size-3.5" />
        <span>GitHub</span>
      </a>
    </div>
  </header>
);

export default Header;
