var xhr = require('../xhr').xhr;
var xhrP = require('../xhr').xhrP;

describe("XHR wrapper", function () {

    beforeEach(function () {
        spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'send');
    });

    it("Should send GET requests", function () {
        xhr('get', 'http://google.com', function () {
        }, false);
        expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
        expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith( 'get', 'http://google.com', false );
        expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });

    it("Should send GET requests - Promises", function () {
        xhrP('get', 'http://google.com', false).then(function() {
        });
        expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
        expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith( 'get', 'http://google.com', false );
        expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });


});
