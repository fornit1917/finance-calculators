export function stringToNumber(s: string): number {
    return parseInt(s.replace(/[^\d.-]/g, ""), 10);
}

export function formatBigNumber(s: string): string {
    const digits = getOnlyDigits(s);
    const chars: string[] = [];
    for (let i = 0; i < digits.length; i++) {
        chars.push(digits[digits.length - i - 1]);
        if (i != digits.length - 1 && (i + 1) % 3 == 0) {
            chars.push(" ");
        }
    }
    return chars.reverse().join("");
}

export function getOnlyDigits(s: string): string {
    return s.replace(/[^\d.-]/g, "");
}