/**
 * Lightweight, dependency-free replacements for GSAP's paid SplitText plugin.
 * splitWords() returns ready-to-render <span> elements (each word masked so
 * it can slide up cleanly). splitChars() returns plain data so the caller
 * can render + key the spans exactly how it needs them.
 */

export function splitWords(text) {
  return text.split(" ").map((word, i) => (
    <span className="split-word-mask" key={`${word}-${i}`}>
      <span className="split-word">{word}&nbsp;</span>
    </span>
  ));
}

export function splitChars(text) {
  return text.split("").map((char, i) => ({
    key: `${char}-${i}`,
    value: char === " " ? "\u00A0" : char,
  }));
}