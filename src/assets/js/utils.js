
export function getObjByClassName (value, className, arr) {
  for (let item of arr) {
    if (item[className] === value) {
      return item
    }
  }
}
