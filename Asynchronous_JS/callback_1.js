console.log("Before");

getUser(185, (user) => {
    console.log('User : ', user);
    getEmail(user.email, (data) => {
        console.log('Data : ', data)
    })

})

console.log("After");


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database');
        callback({id, email: 'sabbir@gmail.com'});
    }, 2000);
}

function getEmail(email, cb) {
    setTimeout(() => {
        console.log('Entered email is : ', email)
        cb(['a', 'b', 'c', 'etc'])
    }, 2000)
}