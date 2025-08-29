// Convert Arabic numerals to Mongolian script numerals
export const toMongolianNumbers = (number) => {
  if (number === null || number === undefined) return "᠐";

  const arabicToMongolian = {
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

  return String(number).replace(
    /[0-9]/g,
    (digit) => arabicToMongolian[digit] || digit
  );
};
