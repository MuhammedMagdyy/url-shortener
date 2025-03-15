const BASE62_CHARSET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Convert a hexadecimal string (UUID) to Base-62
 * @param hex - The hexadecimal string
 * @returns The Base-62 representation
 */
export const uuidToBase62 = (hex: string): string => {
  let number = BigInt(`0x${hex.replace(/-/g, '')}`);
  let base62Result = '';

  while (number > 0) {
    const remainder = number % 62n;
    base62Result = BASE62_CHARSET[Number(remainder)] + base62Result;
    number = number / 62n;
  }

  let shortenedBase62 = '';
  for (let i = 0; i < base62Result.length / 5; i++) {
    shortenedBase62 += base62Result[i];
  }

  return shortenedBase62;
};
