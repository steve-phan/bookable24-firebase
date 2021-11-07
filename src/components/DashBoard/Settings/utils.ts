export const updateList = (arr: number[], i: number) => {
  const newArr = arr.filter(num => num !== i)
  return newArr
}
