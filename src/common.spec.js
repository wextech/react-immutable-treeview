import { expect } from "chai";
import { nullEventHandler } from './common'
describe("Component Event", function () {
  it("prop Event worked", () => {
    expect(nullEventHandler()).equal(undefined);
  })
});

