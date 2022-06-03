/**
 * Loads an image and wraps the result in a promise.
 *
 * @param src the image URL
 * @returns a promise
 */
const loadImg = (src: string): Promise<Event> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
};

export default loadImg;
