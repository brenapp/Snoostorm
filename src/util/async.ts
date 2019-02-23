/**
 * Async utilites for arrays, inspired by William Lohan
 * https://stackoverflow.com/a/53508547/2016735
 */

export function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U> | U
): Promise<U[]> {
  return Promise.all(array.map(callbackfn));
}
export async function filterAsync<T>(
  array: T[],
  callbackfn: (
    value: T,
    index: number,
    array: T[]
  ) => Promise<boolean> | boolean
): Promise<T[]> {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((value, index) => filterMap[index]);
}
