/**
 * string capitalization - first letter - capital, other - lowercase.
 * @param {String} word - Word or sentence.
 * @source https://gist.github.com/jpetitcolas/4481778#gistcomment-2360352
 */

export function capitalize(word: string): string {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1).toLowerCase()}`;
}

/**
 * Strting camelization - underscores, dividing words replaces to Capital letters
 * sound_text => soundText.
 * @param {String} text - Word or sentence
 * @source https://gist.github.com/jpetitcolas/4481778#gistcomment-2360352
 */
export function camelize(text: string): string {
  const words = text.replace(/[^A-Za-z\s-_]/gs, '').split(/[\s-_]/);
  const result = [capitalize(words[0])];
  words.slice(1).forEach((word: string) => result.push(capitalize(word)));
  return result.join('');
}

/**
 * Find element in array using regex match without iterating over array
 * @param {String} text - Keywords
 * @param {Array} data - list data
 * @source https://jsbin.com/qemeseyeme/edit?js,console
 */
export function search(text: string, data: string[]): string {
  const check = data.findIndex(find => find.match(text));
  if (check === -1) return `type ${text} is not allowed!`;
  return `You mean ${data[check]}?`;
}
