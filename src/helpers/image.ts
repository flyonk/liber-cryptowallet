const reduce = require('image-blob-reduce')();

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

/**
 * Function compress provided blob and return file created from it
 *
 * @param blob - The blob
 * @param fileName - Expected name of new file
 * @param fileType - Expected type of new file
 * @returns {File}
 */
export async function compressFileOrBlob(
  blob: Blob,
  fileName: string,
  fileType: string
): Promise<File> {
  let binaryFile = {} as File;
  await reduce.toBlob(blob, { max: 1000 }).then((compressedBlob: Blob) => {
    binaryFile = new File([compressedBlob], fileName, {
      type: fileType,
    });
  });
  return binaryFile;
}
