describe("simpleTest01", function () {
    it("make sure today is not null", function () {
        expect(d).not.toBe(null); // pass
    });
});
describe("simpleTest02", function () {
    it("make sure today is not the 19th", function () {
        expect(nd).not.toBe(19); // fail
    });
});
describe("simpleTest03", function () {
    it("spots mmx", function () {
        expect(mmx).not.toBe(null);
    });
});
