export function dateString(timestamp) {
    const date = new Date(timestamp);
    const day = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    const hour = `${date.getHours()}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}`
    return (`${day} ${hour}`);
}

export function commentString(commentCount) {
    if (commentCount === 0) {
        return 'No comments';
    } else if (commentCount === 1) {
        return '1 comment';
    } else {
        return `${commentCount} comments`;
    }
};