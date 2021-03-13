export function getMonthAndYear(d: Date): string {
    const m = d.getMonth() + 1;
    let month: string;
    switch (m) {
        case 1:
            month = "Янв";
            break;
        case 2:
            month = "Фев";
            break;
        case 3:
            month = "Мар";
            break;
        case 4:
            month = "Апр";
            break;
        case 5:
            month = "Май";
            break;
        case 6:
            month = "Июн";
            break;
        case 7:
            month = "Июл";
            break;
        case 8:
            month = "Авг";
            break;
        case 9:
            month = "Сен";
            break;
        case 10:
            month = "Окт";
            break;
        case 11:
            month = "Нояб";
            break;
        case 12:
            month = "Дек";
            break;
    }

    return `${month} ${d.getFullYear()}`;
}
