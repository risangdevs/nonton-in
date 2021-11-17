function formatDate(value) {
    return value.toISOString().split("T")[0];
}

function formatTime(value) {
    return value.toISOString().split("T")[1].slice(0, 5);
}

module.exports = { formatDate, formatTime };