/**
 * The two next/image quality settings (next.config.ts allows only these).
 * Small text in screenshots smears at lower settings. Next 16.4 encodes AVIF at quality x 50/80
 * (16.2 used quality - 20), so 88 and 96 give AVIF 55 and 60, the same as 75 and 80 gave before
 * the upgrade. Do not lower them.
 */
export const IMAGE_QUALITY = { photo: 88, screenshot: 96 };
