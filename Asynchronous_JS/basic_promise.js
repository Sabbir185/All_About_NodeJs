// promise over-all concept maybe a alternative of callback
// it prevents the callback-hell problem

const agree = true;

console.log('Task 1');

// promise definition; promise is a javascript object
// Promise is a constructor function 
// it takes a callback function
// callback function also take optional two function
// successfully task done then resolve, else reject function will be called.
const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        if(agree) {
            resolve("Task 2...")

        } else {
            reject('Condition break: Error....')
        }
    }, 2000);
})

// promise call
promise
    .then( value => console.log(value))
    .catch( error => console.log(error))


console.log('Task 3');