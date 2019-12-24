function de(obj) {
    return (
        '\n' +
        Object.keys(obj)
            .map(c => [c, obj[c]])
            .sort((a, b) => Number(a[1]) - Number(b[1]))
            .map(c => c.join(' = '))
            .join(',\n') +
        '\n'
    );
}
/**
 * Convert all `E` vars into typescript enums
 */
Object.keys(ClientLib.Base).forEach(c => {
    if (c.startsWith('E')) {
        console.log(`export const enum ${c} {
            ${de(ClientLib.Base[c])}
        }`);
    }
});
