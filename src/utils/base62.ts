const BASE62_CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Convert a hexadecimal string (UUID) to Base-62
 * @param hex - The hexadecimal string
 * @returns The Base-62 representation
 */
export const uuidToBase62 = (hex: string): string => {
  let number = BigInt(`0x${hex.replace(/-/g, '')}`); // Convert hex to BigInt
  let base62Result = '';

  // Base-62 conversion
  while (number > 0) {
    const remainder = number % 62n; // Use BigInt arithmetic
    base62Result = BASE62_CHARSET[Number(remainder)] + base62Result;
    number = number / 62n;
  }

  // Limit the length of the result (taking the first portion as in your example)
  let shortenedBase62 = '';
  for (let i = 0; i < base62Result.length / 5; i++) {
    shortenedBase62 += base62Result[i];
  }

  return shortenedBase62;
};
