import fs, { promises as fsPromise } from "fs";
import sharp from "sharp";

const getFile = (fileName: string) => {
  return fsPromise.readFile(`./images/${fileName}`);
};

const resizeFile = (
  bufferFile: Buffer,
  width: number,
  height: number,
  fileName: string
) => {
  
  return sharp(bufferFile)
    .rotate()
    .resize(Number(width), Number(height))
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then(async (data) => {
        await fsPromise.writeFile(`images/resize-images/${fileName}`, data);
      return {
        code: 200,
        content: `images/resize-images/${fileName}`,
      };
    })
    .catch((err) => {
      return {
        code: 400,
        content: err.message,
      };
    });
};

export { getFile, resizeFile };
