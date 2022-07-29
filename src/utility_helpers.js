export function isEmptyKeyObject(object){
    for(let key in object) return false;

    return true;
}

export function isEmptyArray(array){
  return array.length === 0;
}

export function isEqualValue(val1, val2){
  return val1 === val2;
}

export function isEmptyString(str){
  return str === "";
}