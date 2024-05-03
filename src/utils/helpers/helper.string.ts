
export const extractSignatureFromString = (input: string): string => {
  if (!input || input.length < 2) {
    return '--'
  }
  const words = input.split(' ')
  if (words.length === 1) {
    const singleWord = words[0]
    return (singleWord[0] + singleWord[1]).toUpperCase()
  }

  return (words[0][0] + words[1][0]).toUpperCase()
}

export const toNumber = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}