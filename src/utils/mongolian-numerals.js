export const toMongolianNumeral = (num) => {
  if (num === undefined || num === null) return "";
  const mongolianNumerals = {
    0: "᠐",
    1: "᠑",
    2: "᠒",
    3: "᠓",
    4: "᠔",
    5: "᠕",
    6: "᠖",
    7: "᠗",
    8: "᠘",
    9: "᠙",
  };
  return num
    .toString()
    .split("")
    .map((digit) => mongolianNumerals[digit] || digit)
    .join("");
};

export const useMongolianNumeral = () => {
  return { toMongolianNumeral };
};
