declare var Promise:any;
export function promiseSeries(array, iterator) {
    var output = [];
    var current = Promise.resolve();

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        current = output[i] = current.then(function(i) {
            return iterator(array[i]);
        }.bind(null, i))
    }

    return Promise.all(output);
}


