
export const getUniqueList = <T>(list: T[]) => {
  return [...new Set(list)]
}