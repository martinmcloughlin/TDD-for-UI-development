var myfunc = thirdNewTest;

describe("simpleTest01", function () {
  it("make sure today is not null", function () {
      expect(myfunc.d).not.toBe(null); // pass
  });
});
describe("simpleTest02", function () {
  it("make sure today is not the 19th", function () {
      expect(myfunc.innertestOne()).not.toBe(19); // fail
  });
});
describe("simpleTest03", function () {
  it("spots mmx", function () {
      expect(myfunc.innertestTwo()).not.toBe(null);
  });
});
