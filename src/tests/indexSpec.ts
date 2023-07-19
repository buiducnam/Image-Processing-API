import { getFile, resizeFile } from "../utilities/resize";
import supertest from "supertest";
import app from "./../index";

const request = supertest(app);

describe("test load file", () => {
  it("should contain file in the server", (done) => {
    expect(Number(getFile("encenadaport.jpg"))).toBeNaN();
    done();
  });
});

describe("test resize file", () => {
  it("should resize file in the server", async () => {
    const bufferFile = await getFile("encenadaport.jpg");
    const resize = await resizeFile(bufferFile, 300, 300, "encenadaport.jpg");
    expect(resize.code).toEqual(200);
  });
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
