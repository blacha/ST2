export class Duration {
    static OneMinute = 1000 * 60;
    static OneHour = Duration.OneMinute * 60;
    static OneDay = Duration.OneHour * 24;

    day(days: number): number {
        return Duration.OneDay * days;
    }

    minute(minutes: number): number {
        return Duration.OneMinute * minutes;
    }
}
