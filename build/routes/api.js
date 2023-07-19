"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resize_1 = require("../utilities/resize");
const router = express_1.default.Router();
router.get("/images", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName = "", width = 300, height = 300 } = req.query;
    if (!fileName) {
        next("Invalid original file names");
    }
    else if (isNaN(Number(width)) || isNaN(Number(height)) || Number(height) < 1 || Number(width) < 1) {
        next("Invalid height/width parameters");
    }
    else if (!fs_1.default.existsSync(`images/${fileName}`)) {
        next("The fileName is not exists");
    }
    else if (fileName && !isNaN(Number(width)) && !isNaN(Number(height))) {
        try {
            const bufferFile = yield (0, resize_1.getFile)(fileName.toString());
            return (0, resize_1.resizeFile)(bufferFile, width, height, fileName).then((result) => {
                if (result.code === 200) {
                    return res.status(200).sendFile(result.content, {
                        root: path_1.default.join(__dirname, "../.."),
                    });
                }
                else {
                    next(result.content);
                }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}));
exports.default = router;
