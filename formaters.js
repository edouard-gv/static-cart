export let priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function mapConcatMap(aMap, f) {
    return Object.values(aMap).map(f).join('');
}

export function mapConcatArray(anArray, f) {
    return anArray.map(f).join('');
}