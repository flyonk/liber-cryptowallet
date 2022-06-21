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
  return Math.round((Date.now() - fromTime) / (1000 * 60 * 60 * 24)) > days;
}

/**
 * Fuction to format phone number clouded
 *
 * @param dialCode - dial code string
 * @param phone - phone number string
 * @returns {string}
 */
export function formatPhone(dialCode: string, phone: string) {
  const formattedPhone = [...phone]
    .map((e, index) => {
      return index < phone.length - 4 ? '*' : e;
    })
    .join('');
  return dialCode + formattedPhone;
}
