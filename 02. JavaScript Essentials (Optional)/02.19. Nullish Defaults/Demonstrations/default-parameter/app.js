const getCount = (count = 1) => count;
console.log(getCount(undefined));
console.log(getCount(null));
console.log(null ?? 1);
