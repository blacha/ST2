export class Duration {
    static OneSecond = 1000;
    static OneMinute = Duration.OneSecond * 60;
    static OneHour = Duration.OneMinute * 60;
    static OneDay = Duration.OneHour * 24;

    static seconds(seconds: number): number {
        return Duration.OneSecond * seconds;
    }

    static days(days: number): number {
        return Duration.OneDay * days;
    }

    static minutes(minutes: number): number {
        return Duration.OneMinute * minutes;
    }
    static hours(hours: number) {
        return Duration.OneHour * hours;
    }
}
