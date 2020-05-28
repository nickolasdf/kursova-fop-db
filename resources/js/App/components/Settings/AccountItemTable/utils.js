export const calcTotal = data => {
    let count = 0;
    if (data && data.length > 0) {
        data.forEach(item => {
            count++;
            item.childes.forEach(() => {
                count++;
            });
        });
    }
    return count;
};
