(function foo() {
    const re = /[A-Z]{6}/;

    const ObjMap = {};

    function getPrototype(x) {
        return Object.keys(x.__proto__)
            .filter(f => f.match(re) == null)
            .sort();
        // .filter(f => f.startsWith('get_'));
    }

    function findConstructor(obj) {
        return Object.keys($I).find(k => $I[k] == obj.constructor);
    }

    function extractData(obj, prefix = '', count = 0) {
        if (count > 5) {
            return;
        }
        const internalName = findConstructor(obj);
        const objectMap = (ObjMap[internalName] = ObjMap[internalName] || {
            names: [],
            interface: null,
        });
        objectMap.names.push(prefix);
        if (objectMap.interface) {
            return;
        }

        objectMap.interface = {};
        const keys = getPrototype(obj);
        console.log('Player', keys, internalName);
        for (const functionName of keys) {
            const objName = functionName.replace('get_', '');
            const func = obj[functionName];
            if (typeof func != 'function') {
                console.log('not func', func);
                continue;
            }
            const value = func.call(obj);
            if (value == null) {
                console.log('Null', objName);
                continue;
            }
            const typeOfVal = typeof value;
            if (typeOfVal == 'object') {
                const construct = findConstructor(value);
                objectMap.interface[functionName] = {
                    type: 'function',
                    proto: findConstructor(value),
                };
                console.log(`ClientLib${prefix}${objName}`, typeOfVal, value);
                if (ObjMap[construct] != null) {
                    ObjMap[construct].names.push(objName);

                    console.log('dupe', construct, ObjMap[construct].names);
                } else {
                    extractData(value, objName, count + 1);
                }
            } else {
                objectMap.interface[functionName] = {
                    type: 'function',
                    value: typeOfVal,
                };
            }
        }
    }

    extractData(ClientLib.Data.MainData.GetInstance());
    console.log(ObjMap);
})();
