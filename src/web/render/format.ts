var Formats = ['', 'K', 'M', 'G', 'T'];

export function formatNumber(num:number):string {
    var current = 0;
    while (num >= 1000 && current < Formats.length) {
        current++;
        num /= 1000;
    }

    return num.toFixed(2) + Formats[current];
}

export function formatPercent(x:number) {
    return x + '%';
}

export function formatHours(seconds:number) {
    var hours = (seconds / 60 / 60);
    return (hours / 24).toFixed(2);
}

export function formatTime(seconds:number, decimals = 2) {
    var interval = getTimeInterval(seconds);
    if (interval.amount < 2) {
        return `${interval.amount.toFixed(decimals)} ${interval.interval}`;
    }
    return `${interval.amount.toFixed(decimals)} ${interval.interval}s`;
}

function getTimeInterval(seconds:number) {
    var interval = seconds / 31536000;
    if (interval >= 1) {
        return {amount: interval, interval: 'year'};
    }

    interval = seconds / 2592000;
    if (interval >= 1) {
        return {amount: interval, interval: 'month'};
    }

    interval = seconds / 86400;
    if (interval >= 1) {
        return {amount: interval, interval: 'day'};
    }

    interval = seconds / 3600;
    if (interval >= 1) {
        return {amount: interval, interval: 'hour'};
    }

    interval = seconds / 60;
    if (interval >= 1) {
        return {amount: interval, interval: 'minute'};
    }

    return {amount: seconds, interval: 'second'}
}