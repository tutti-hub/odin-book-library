const arr = [1,2,3,4];
const id = 2;
console.log([...arr.slice(0,id), ...arr.slice(id + 1)]);
