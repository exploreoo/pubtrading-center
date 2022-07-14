/* eslint-disable prettier/prettier */
export const transAmount = (num: number | string) => {
    // eslint-disable-next-line prefer-const
    let origin = String(num),
        dotAfter = "",
        arr,
        // eslint-disable-next-line prefer-const
        result = [];
    if (origin.includes(".")) {
        dotAfter = origin.split(".")[1];
        arr = origin.split(".")[0].split("").reverse();
    } else {
        arr = origin.split("").reverse();
    }
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (count == 3) {
            count = 0;
            result.push(",");
        }
        result.push(arr[i]);
        count++;
    }
    return result.reverse().join("") + (dotAfter ? ('.' + dotAfter) : '');
};
