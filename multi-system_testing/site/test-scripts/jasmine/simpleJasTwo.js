describe("simpleTest02", function() {
    it("make sure today is not the 19th", function() {
        //expect(nd).toBe(nd); // pass
        expect(nd).not.toBe(19); // fail
    });
});
