export const getNextImagePath = (src: string, width: number, quality: number = 75): string => {
  const encodedSrc = encodeURIComponent(src);
  return `/_next/image?url=${encodedSrc}&w=${width}&q=${quality}`;
};
