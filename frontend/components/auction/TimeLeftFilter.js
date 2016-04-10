export default function TimeLeftFilter() {
    return function(time) {
        return Math.floor(time / 1000) + ' sec.';
    };
}

