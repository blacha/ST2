export function series(promises) {
    var output = [];
    var current = Promise.resolve();

    for (var i = 0; i < promises.length; i++) {
        current = current.then(promises[i]);
    }

    current.resolve(output);

    return current;
}