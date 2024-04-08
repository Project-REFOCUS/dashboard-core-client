export const isArrayEmpty = (array : any[]) => {
    return array.length === 0
}

export const isSetEmpty = (set : Set<any>) => {
    return set.size === 0
}

export function debugPrint(message: string, input: any): boolean {
    console.log(`Debug Message: ${message}`);
    console.log("Input:", input);
    return true;
}

export const nameSort = (a: {name: string}, b: {name: string}) : number => {
    return a.name.localeCompare(b.name);
}

export const toCamelCase = (subject : string) => {
    let array = subject.split(" ");

    return array.reduce((prev, curr) => 
        prev + (curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase()));
}

export const trimLowerCase = (subject : string) => {
    return subject.trim().toLowerCase();
}