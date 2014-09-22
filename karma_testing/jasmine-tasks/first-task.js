describe("simpleTests", function() {
    it("make sure today is 22nd", function() {
        expect(nd).toBe(22); // pass
        //expect(nd).not.toBe(19); // fail
    });
    it("make sure today is not null", function() {
        expect(d).not.toBe(null); // pass
        //expect(d).toBe(null); // fail
    });
});

describe("DOM test" , function (){
    jasmine.getFixtures();
    it('test1', function() {
        $().destroyWin('window'); // jquery 1.3.2
        expect(jq2('#window')).not.toBeInDOM(); // jq2 = jquery 2.1.1
    });

});
