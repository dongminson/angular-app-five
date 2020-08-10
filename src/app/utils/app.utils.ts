
export const notEmpty = (input:string) => {
    if (!input) {
        return false;
    }
    const result = input.trim();
    return !(result === '');
}

export const validEmail = (input:string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(input);
}