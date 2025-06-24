import { SegmentGroup } from "@ark-ui/react";
import React from "react";
import type { ParseMode } from "./App";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

interface ParseModeSelectorProps {
  parseMode: ParseMode;
  onParseModeChange: (mode: ParseMode) => void;
}

const ParseModeSelector: React.FC<ParseModeSelectorProps> = ({ parseMode, onParseModeChange }) => (
  <Root
    value={parseMode}
    onValueChange={(details) => onParseModeChange(details.value as ParseMode)}
  >
    <Indicator />
    <Item value="parse">
      <SegmentGroup.ItemText>Parse</SegmentGroup.ItemText>
      <SegmentGroup.ItemHiddenInput />
    </Item>
    <Item value="scan">
      <SegmentGroup.ItemText>Scan</SegmentGroup.ItemText>
      <SegmentGroup.ItemHiddenInput />
    </Item>
  </Root>
);

const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

const Root = ({ className, ...props }: SegmentGroup.RootProps) => (
  <SegmentGroup.Root
    className={cn("relative inline-flex rounded-md border border-gray-200 p-1", className)}
    {...props}
  />
);

const Indicator = ({ className, ...props }: SegmentGroup.IndicatorProps) => (
  <SegmentGroup.Indicator
    className={cn(
      "left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-sm bg-gray-100 transition-all duration-200 ease-out",
      className,
    )}
    {...props}
  />
);

const Item = ({ className, ...props }: SegmentGroup.ItemProps) => (
  <SegmentGroup.Item
    className={cn(
      "relative z-10 cursor-pointer px-4 py-1.5 text-xs font-medium text-gray-600 transition-colors duration-200 select-none data-[state=checked]:text-gray-900",
      className,
    )}
    {...props}
  />
);

export default ParseModeSelector;
