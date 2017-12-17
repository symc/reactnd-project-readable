/**
* @description Helper function to return a date string from a timestamp
* @param {string} timestamp - timestamp representing the time
* @returns {string} - time in the format mm/dd/yyyy hour:minute
*/
export function dateString(timestamp) {
    const date = new Date(timestamp);
    const day = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    const hour = `${date.getHours()}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}`
    return (`${day} ${hour}`);
}

/**
* @description Helper function to return a string with information 
* about number of comments
* @param {number} commentCount - number of comments
* @returns {string} - returns the proper message which informs the
* user about the number of comments
*/
export function commentString(commentCount) {
    if (commentCount === 0) {
        return 'No comments';
    } else if (commentCount === 1) {
        return '1 comment';
    } else {
        return `${commentCount} comments`;
    }
}