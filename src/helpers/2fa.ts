/**
 * Fuction to check date expiration
 *
 * @param fromTime - The date from number
 * @param days - Number of days to check number
 * @returns {boolean}
 */
export async function checkExpiration(
  fromTime: number,
  days: number
): Promise<boolean> {
  console.log(
    Math.round((Date.now() - fromTime) / (1000 * 60 * 60 * 24)) > days
  );
  return Math.round((Date.now() - fromTime) / (1000 * 60 * 60 * 24)) > days;
}
