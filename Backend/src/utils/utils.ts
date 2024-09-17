import { ILike } from "typeorm";

export function compareArrays(oldArray: number[], newArray: number[]) {
  const oldSet = new Set(oldArray);
  const newSet = new Set(newArray);
  // Find items that are in oldArray but not in newArray (items to be removed)
  const toRemove = [...oldSet].filter((item) => !newSet.has(item));
  // Find items that are in newArray but not in oldArray (items to be added)
  const toAdd = [...newSet].filter((item) => !oldSet.has(item));
  return { toRemove, toAdd };
}

export function getKeys(obj: any): any {
  const keys: any = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") keys[key] = obj[key];
    else {
      keys[key] = ILike(`%${obj[key].like}%`);
    }
  }

  return keys;
}
