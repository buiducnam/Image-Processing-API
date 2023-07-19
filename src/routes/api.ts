import express, { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { getFile, resizeFile } from "../utilities/resize";

const router = express.Router();

router.get(
  "/images",
  async (req: Request, res: Response, next: NextFunction) => {
    const { fileName = "", width = 300, height = 300 } = req.query;
    if (!fileName) {
      next("Invalid original file names");
    } else if (isNaN(Number(width)) || isNaN(Number(height))) {
      next("Invalid height/width parameters");
    } else if (!fs.existsSync(`images/${fileName}`)) {
      next("The fileName is not exists");
    } else if (fileName && !isNaN(Number(width)) && !isNaN(Number(height))) {
      try {
        const bufferFile = await getFile(fileName.toString());
        return resizeFile(
          bufferFile,
          width as number,
          height as number,
          fileName as string
        ).then((result) => {
          if (result.code === 200) {
            return res.status(200).sendFile(result.content, {
              root: path.join(__dirname, "../.."),
            });
          } else {
            next(result.content);
          }
        });
      } catch (error: unknown) {
        throw new Error((error as { message: string }).message);
      }
    }
  }
);

export default router;
