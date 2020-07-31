// @flow

// Artez sets unreasonable max lengths on address fields (varchar 50), so try to
// accomodate for people who have longer addresses than that.

export default (
  address: string,
): { AddressLine1: string, AddressLine1: string } => {
  if (address.length <= 50) return { AddressLine1: address };

  let words = [];
  let lines = [];
  // Try to split the address into two lines sensibly if it's longer than 50
  // characters.
  address.split(' ').forEach(word => {
    if ([word].concat(words).join(' ').length <= 50) {
      words.push(word);
    } else {
      lines.push(words);
      words = [word];
    }
  });

  if (lines[lines.length - 1][words.length - 1] !== words[words.length - 1]) {
    lines.push(words);
  }

  // If any line is still longer than 50 characters, the only thing left to
  // do is truncate.
  lines = lines
    .map(line =>
      line.join(' ').length >= 50
        ? line
            .join(' ')
            .substr(0, 50)
            .split(' ')
        : line,
    )
    .slice(0, 2);

  return {
    AddressLine1: lines[0].join(' '),
    AddressLine2: lines[1].join(' '),
  };
};
