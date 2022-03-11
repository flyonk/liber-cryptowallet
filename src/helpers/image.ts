export const cropImage = async (
  base64: string,
  x: number,
  y: number,
  newWidth: number,
  newHeight: number
) => {
  const img = await image64ToImage(base64);
  return crop(img as CanvasImageSource, x, y, newWidth, newHeight);
};

const image64ToImage = (base64: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = function () {
      resolve(this);
    };
    image.onerror = function () {
      reject(this);
    };
  });
};

const crop = (
  image: CanvasImageSource,
  x: number,
  y: number,
  newWidth: number,
  newHeight: number
) => {
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');

  ctx?.drawImage(image, x, y, newWidth, newHeight, 0, 0, newWidth, newHeight);
  return canvas.toDataURL('image/jpeg');
};
