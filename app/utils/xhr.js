export function xhr(method, url, callback, async) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', callback, false);
    request.addEventListener('error', callback, false);
    request.open(method, url, async === false ? async : true);
    request.send();
    return request;
}

export function xhrP(method, url, async) {
    return new Promise(function (resolve,reject) {
        var request = new XMLHttpRequest();

        request.addEventListener('load', function() {
          return resolve(this.responseText);
        }, false);

        request.addEventListener('error', function() {
           return reject(this.statusText);
        }, false);

        request.open(method, url, async === false ? async : true);
        request.send();
    });


}
