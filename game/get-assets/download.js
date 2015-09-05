var Promise = require("bluebird");

var assets = require('./all-assets.json');

var fs = require('fs');
var http = require('http');
var path = require('path');
var mkdirp = require('mkdirp');

var ASSET_DIR = '../../assets/';

function checkIfExists(filename) {
    return new Promise(function(resolve, reject) {
        fs.exists(filename, function(err, res) {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        })
    });
}

function downloadFile(url, dest) {
    return new Promise(function(resolve, reject) {
        console.log('download', dest);
        var file = fs.createWriteStream(dest);
        var request = http.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(function() {
                    resolve(dest);
                });
            });
        }).on('error', function(err) { // Handle errors
            console.log('error', err);
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            reject(url);
        });
    });

};

// var downloads = {};

// Object.keys(assets).forEach(function(assetPath) {
//     var downloadPath = path.join(ASSET_DIR, assetPath);
//     mkdirp.sync(downloadPath);
//     var hash = assets[assetPath];

//     // Object.keys(asset).forEach(function(item) {
//     //     var value = asset[item];
//     //     if (value.name && value.name.indexOf('png') > -1) {

//     //         //if (value.name.indexOf('detail') === -1 && value.name.indexOf('icn') === -1) {
//     //         //    return;
//     //         //}

//     //         var dl = downloads[asset.id];
//     //         if (dl == null) {
//     //             dl = {
//     //                 uri: value.uri,
//     //                 paths: []
//     //             }
//     //         }
//     //         if (dl.paths.length > 0) {
//     //             return;
//     //         }

//     //         var fileName = item + '-' + value.name.replace(/\//g, '.');
//     //         dl.paths.push(path.join(downloadPath, fileName));

//     //         downloads[fileName] = dl;
//     //         // console.log(item, value.uri, dl);
//     //     }
//     // });
// });

var allAssets = Object.keys(assets);

Promise.map(allAssets, function(key, index, arry) {
    var download = assets[key];
    if (download == null) {
        return;
    }


    var lastSlash = key.lastIndexOf('/');
    var fileName = key.substring(lastSlash + 1);
    var assetPath = key.substring(0, lastSlash);

    var downloadPath = path.join(ASSET_DIR, assetPath);
    // console.log(key, downloadPath);
    mkdirp.sync(downloadPath);

    var fullPath = path.join(downloadPath, fileName)

    var url = 'http://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/' + download;

    if (fs.existsSync(fullPath)) {
        return;
    }

    console.log(index, '/', allAssets.length);
    return downloadFile(url, fullPath);
}, {
    concurrency: 3
}).then(function(data) {
    console.log('DONE', data);
})