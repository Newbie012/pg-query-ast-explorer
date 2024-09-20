type RangeResult = {
  property: string;
  range: { startLine: number; endLine: number };
};

type Indentation = number;

export function getPropertyStartLines(jsonString: string, properties: string[]) {
  const set = new Set(properties);
  const results: { property: string; startLine: string }[] = [];

  for (const [lineIdx, line] of jsonString.split("\n").entries()) {
    const match = line.match(/^\s*"(\w+)":\s*/);

    if (match) {
      const property = match[1];

      if (set.has(property)) {
        results.push({ property, startLine: lineIdx.toString() });
      }
    }
  }
}

export function getPropertyRanges(jsonString: string, properties: string[]): RangeResult[] {
  const set = new Set(properties);
  const map = new Map<
    Indentation,
    { property: string; range: { startLine: number; endLine: number } }
  >();
  const results: RangeResult[] = [];

  for (const [lineIdx, line] of jsonString.split("\n").entries()) {
    // if closing tag
    const spacesMatch = line.match(/^(\s*)[}\]]/);

    if (spacesMatch !== null) {
      const spaces = spacesMatch[1].length;

      if (map.has(spaces)) {
        const { property, range } = map.get(spaces)!;
        map.delete(spaces);

        results.push({ property, range: { startLine: range.startLine, endLine: lineIdx } });
      }
    }

    // regex to match [spaces]"property": [spaces] {
    const match = line.match(/^(\s*)"(\w+)":\s*/);

    if (match === null) {
      continue;
    }

    const spaces = match[1].length;
    const property = match[2];

    if (set.has(property)) {
      map.set(spaces, { property, range: { startLine: lineIdx + 1, endLine: -1 } });
    }
  }

  console.log(results);
  return results;
}
