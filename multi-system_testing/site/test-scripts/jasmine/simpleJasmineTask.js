describe("simpleTests", function() {
    it("make sure today is 22nd", function() {
        expect(nd).not.toBe(22); // pass
        //expect(nd).not.toBe(19); // fail
    });
    it("make sure today is not null", function() {
        expect(d).not.toBe(null); // pass
        //expect(d).toBe(null); // fail
    });
});
