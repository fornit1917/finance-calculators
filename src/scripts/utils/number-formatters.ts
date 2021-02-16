export function stringToNumber(s: string): number {
    return parseFloat(s.replace(/[^\d.-]/g, ""));
}

export function formatMoney(s: string): string | null {
    const withoutFormatting = getNumberChars(s);
    if (withoutFormatting === "") {
        return "";
    }

    const money = getMoney(withoutFormatting);
    if (money === null) {
        return null;
    }

    const chars: string[] = [];
    for (let i = 0; i < money[0].length; i++) {
        chars.push(money[0][money[0].length - i - 1]);
        if (i != money[0].length - 1 && (i + 1) % 3 == 0) {
            chars.push(" ");
        }
    }

    return money[1] !== undefined
        ? chars.reverse().join("") + money[1]
        : chars.reverse().join("");
}

export function getNumberChars(s: string): string {
    return s.replace(",", ".").replace(/[^\d.-]/g, "");
}

export function getPositiveIntegerChars(s: string): string {
    return s.replace(/[^\d]/g, "");
}


function getMoney(s: string): [string, string | undefined] | null {
    const match = /^([0-9]+)(\.[0-9]{0,2})?$/gm.exec(s);

    if (match === null) {
        return null;
    }

    return [match[1], match[2]]
}