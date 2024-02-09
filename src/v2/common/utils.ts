
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