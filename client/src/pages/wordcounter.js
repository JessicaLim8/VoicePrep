import { fillerWords } from "./variables";

export const wordCounter = (speech, filler, words = []) => {
  if (filler === true) words = fillerWords;
  words =  words ? words.reduce((arr, key) => (arr[key.toLowerCase()] = 0, arr), {}) : {};
  speech.split(' ').forEach((word) => {
    if (word.toLowerCase() in words) {
      words[word.toLowerCase()]++;
    }
  });
  return words;
}
