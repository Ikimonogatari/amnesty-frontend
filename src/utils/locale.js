// Locale utility functions
// Centralized locale handling from environment variables

/**
 * Get the current locale from environment variables
 * @returns {string} The locale string (e.g., 'mn-MN')
 */
export const getLocale = () => {
  return process.env.NEXT_PUBLIC_CMS_LOCALE || "mn-MN";
};

/**
 * Get the language code from locale (e.g., 'mn' from 'mn-MN')
 * @returns {string} The language code
 */
export const getLanguageCode = () => {
  return getLocale().split("-")[0];
};

/**
 * Format number with current locale
 * @param {number} amount - The number to format
 * @param {string} currency - Currency symbol (default: '₮')
 * @returns {string} Formatted number with currency
 */
export const formatCurrency = (amount, currency = "₮") => {
  return new Intl.NumberFormat(getLocale()).format(amount) + currency;
};

/**
 * Format date with current locale
 * @param {string|Date} dateString - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  return new Date(dateString).toLocaleDateString(getLocale(), options);
};
