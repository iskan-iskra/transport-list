const capitalizeTool = (s: string): string =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

const lowerCaseFirstLetter = (s: string) =>
  (s && s[0].toLowerCase() + s.slice(1)) || "";

// TODO: вынести методы в прототип строки!!
const makeCodeFromName = (s: string): string =>
  lowerCaseFirstLetter(
    s
      .toLocaleLowerCase()
      .split(" ")
      .map((el) => capitalizeTool(el))
      .join("")
  );

const hexRegex = /^#?([0-9A-F]{3}){1,2}$/i;

const isColorHexCode = (color: string): boolean => hexRegex.test(color);

export { makeCodeFromName, isColorHexCode };
