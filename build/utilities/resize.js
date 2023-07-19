"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.resizeFile = exports.getFile = void 0;
const fs_1 = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const getFile = (fileName) => {
    return fs_1.promises.readFile(`./images/${fileName}`);
};
exports.getFile = getFile;
const resizeFile = (bufferFile, width, height, fileName) => {
    return (0, sharp_1.default)(bufferFile)
        .rotate()
        .resize(Number(width), Number(height))
        .jpeg({ mozjpeg: true })
        .toBuffer()
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(`images/resize-images/${fileName}`)) {
            yield fs_1.promises.writeFile(`images/resize-images/${fileName}`, data);
        }
        return {
            code: 200,
            content: `images/resize-images/${fileName}`,
        };
    }))
        .catch((err) => {
        return {
            code: 400,
            content: err.message,
        };
    });
};
exports.resizeFile = resizeFile;
