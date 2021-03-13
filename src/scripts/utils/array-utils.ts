export function getMinMaxIndices<T>(items: T[]): [number, number] {
    const n = items.length;
    if (n === 0) {
        throw Error("Array can not be empty");
    }

    let min: T = items[0];
    let max: T = items[0];
    let minI: number = 0;
    let maxI: number = 0;

    for (let i = 1; i < n; i++) {
        if (items[i] < min) {
            min = items[i];
            minI = i;
        }
        if (items[i] > max) {
            max = items[i];
            maxI = i;
        }
    }

    return [minI, maxI];
}