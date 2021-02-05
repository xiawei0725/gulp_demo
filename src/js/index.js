

const foo = x => x + 2

const str = `hello gulp`

console.log(str);

const p1 = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000);
})

p1.then(res => {
  console.log(res);
})