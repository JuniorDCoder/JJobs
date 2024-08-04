export const checkImageURL = (url) => {
    if (!url) return false;
    const pattern = new RegExp('images\\?q=', 'i');
    const isValid = pattern.test(url);
    return isValid;
};