function firstOrUndefined<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstOrUndefined([12, 15]));
console.log(firstOrUndefined(["standard", "student"]));
console.log(firstOrUndefined([]));
