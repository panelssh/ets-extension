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
