/**
 * Function to convert text with spaces to text with dashes.
 * @param text The input text with spaces.
 * @returns The converted text with dashes.
 * Anshu Meena -> anshu-meena
 */
export function spaceToDash(text: string): string {
  return text.toLowerCase().replaceAll(' ', '-');
}

/**
 * Function to convert text with dashes to text with spaces.
 * @param text The input text with dashes.
 * @returns The converted text with spaces.
 * anshu-meena -> anshu meena
 */
export function DashToSpace(text: string): string {
  return text.replaceAll('-', ' ');
}

/**
 * Function to get the HTTPS URL for an image from Firebase storage bucket.
 * @param id The ID of the image.
 * @returns The HTTPS URL for the image.
 * return https url form that {id}.jpeg
 */
export function getHttpImage(id: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/quickpdf-codenanshu.appspot.com/o/${encodeURIComponent(
    `${id}`
  )}?alt=media`;
}

/**
 * Function to convert inches to pixels.
 * @param inch The value in inches.
 * @returns The converted value in pixels.
 */
export function inToPx(inch: number): number {
  const pxPerIn = 96;
  return Math.round(inch * pxPerIn);
}

/**
 * Function to convert inches to points.
 * @param inch The value in inches.
 * @returns The converted value in points.
 */
export function inToPt(inch: number): number {
  const ptPrIn = 72;
  return Math.round(inch * ptPrIn);
}

export const monthsOfYear: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// convert one digit number to two digit number
const monthChecker = Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2
});

/**
 * function to date object to miningful date
 * `date-month-year`
 * @param inch: date object
 * @returns date: string
 */
export const dateToValue = (date: Date): string => {
  console.log(date);
  return `${date.getDate()}-${monthChecker.format(date.getMonth() + 1)}-${date.getUTCFullYear()}`;
};

/**
 * convert dd-mm-yyyy to date object
 * @param dateString
 * @returns Date object
 */
export function convertToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * captalize first letter in every word
 * @param str
 * @returns captilize string
 * eg input:"anshu meena" -> output:"Anshu Meena"
 */
export function capitalizeFirstLetters(str: string): string {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(' ');
}
