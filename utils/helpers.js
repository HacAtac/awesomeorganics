module.exports = {
  format_date: (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date";
    }
    return `${
      parsedDate.getMonth() + 1
    }/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
  },

  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
  multiply: (a, b) => {
    return a * b;
  },
  if_eq: (a, b, options) => {
    if (a === b) {
      return options.fn(this); // Return the block contents if the values are equal
    }
    return options.inverse(this); // Return the inverse block if the values are not equal
  },
};
