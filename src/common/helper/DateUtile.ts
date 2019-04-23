import { isPlatform } from '@ionic/core';

export class DateUtile {


    /**
     * 添加日
     * @param{Date}date 日期
     * @param{number}days 添加的天数
     * @returns{Date}
     * @memberofBaseDate
     */
    public static addDays(date: Date, days: number): Date {
        return new Date(date.setDate(date.getDate() + days));
    }
}