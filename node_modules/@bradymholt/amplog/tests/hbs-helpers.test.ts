import { limit } from "../src/hbs-helpers";

describe("limit", () => {
  it("limits array size", () => {
    expect(limit([1, 2, 3, 4, 5], 2).length).toBe(2);
  });

  it("trims from end of array", () => {
    expect(limit([1, 2, 3, 4, 5], 2)).toEqual([1, 2]);
  });
});
