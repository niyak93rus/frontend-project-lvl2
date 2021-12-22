const stringify = (obj, replacer = ' ', spacesCount = 2) => {
  let depthLevel = 0;
  const inner = (data) => {
    if (typeof data !== 'object' || data === null) {
      return String(data);
    }
    const entries = Object.entries(data);
    depthLevel += 1;
    const result = entries
      .reduce((acc, [key, value], currentIndex) => {
        const str = `${replacer.repeat(spacesCount * depthLevel)}${key}: ${inner(value)}`;
        acc.push(str);
        if (currentIndex === entries.length - 1) {
          while (depthLevel >= 1) {
            acc.push(`${replacer.repeat(spacesCount * (depthLevel - 1))}}`);
            depthLevel -= 1;
          }
        }

        return acc;
      }, ['{']);
    return result.join('\n');
  };

  return inner(obj);
};

export default stringify;
