const getNumber = async () => 7;
const request = getNumber();
console.log(`Is a promise: ${request instanceof Promise}`);
request.then(value => console.log(`Received: ${value}`));
console.log("After attaching handler");
