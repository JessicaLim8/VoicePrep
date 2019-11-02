export const wordCounter = (text, wordList) => {
  const words = wordList ? wordList.reduce((arr, key) => {
    arr[key.toLowerCase()] = 0;
    return arr;
  }, {}) : {};

  text.split(' ').forEach((word) => {
    if (word.toLowerCase() in words) {
      words[word.toLowerCase()]++;
    }
  });

  return words;
};
