import { getCurrentDateInISOFormat } from "../src/dateHelper";

describe("getCurrentDateInISOFormat", () => {
  it("returns correct date format", () => {
    expect(getCurrentDateInISOFormat(new Date(2019, 3, 2))).toEqual(
      "2019-04-02"
    );
  });
});
