export enum daysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
