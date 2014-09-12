describe("user should be able to visit home page", function () {

    var url = '';

    it("Then ", function() {

        browser.visit(url);

        expect(element(by.id('heading')).getText()).toBe('Map');
    });

});
