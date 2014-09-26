describe("simpleTest02", function() {
    it("make sure today is 22nd", function() {
        expect(nd).toBe(26); // pass
        //expect(nd).not.toBe(19); // fail
    });
});

describe("simpleTest01", function() {
    it("make sure today is not null", function() {
        expect(d).not.toBe(null); // pass
        //expect(d).toBe(null); // fail
    });
    it("spots mmx", function() {
        expect(mmx).not.toBe(null);
    })
});

