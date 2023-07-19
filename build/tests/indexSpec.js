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
const resize_1 = require("../utilities/resize");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("./../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("test load file", () => {
    it("should contain file in the server", (done) => {
        expect(Number((0, resize_1.getFile)("encenadaport.jpg"))).toBeNaN();
        done();
    });
});
describe("test resize file", () => {
    it("should resize file in the server", () => __awaiter(void 0, void 0, void 0, function* () {
        const bufferFile = yield (0, resize_1.getFile)("encenadaport.jpg");
        const resize = yield (0, resize_1.resizeFile)(bufferFile, 300, 300, "encenadaport.jpg");
        expect(resize.code).toEqual(200);
    }));
});
describe("test endpoint", () => {
    it("should fail to get deleted customer", function () {
        return request
            .get("/api/images?fileName=encenadaport.jpg&width=500&height=500")
            .set("Accept", "application/json")
            .expect("Content-Type", "image/jpeg")
            .expect(200);
    });
});
