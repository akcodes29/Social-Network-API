// Date Format
const dateFormat = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

module.exports = dateFormat;