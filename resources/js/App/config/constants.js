export const getBase64 = file => {
    return new Promise((reject, resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            reject(reader.result);
        };
    });
};

export const shortenString = (str, num) => {
    if (str.length > num) {
        return str.slice(0, num) + '...';
    } else {
        return str;
    }
};

export const convertPhoneMask = (phoneMask) => {
    return phoneMask.replace(/[-\s()_]/g, '');
};

export const phoneMask = [
    '+', '3', '8', ' ', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/
];

export const getIds = data => {
    if (data && Array.isArray(data)) {
        return data.map(item => item.id);
    } else {
        throw new Error('Data must be an array!');
    }
};


export const numberWithSpaces = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
