const paymentSuccess = true;
const mark = 55;

const enroll = () => {
    console.log("Course enrollment is processing...");

    const promise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            if(paymentSuccess) {
                resolve();
            } else {
                reject('Payment failed...');
            }
        }, 2000);
    });

    return promise;
}

const courseProgress = () => {
    console.log('Course on progressing...');

    const promise = new Promise( (resolve, reject) => {
        setTimeout(() => {
            if(mark >= 80) {
                resolve();
            } else {
                reject("Sorry! you are not able to get certificate, due to enough mark...")
            }
        }, 3000);
    });

    return promise;
}

const getCertificate = () => {
    console.log('On processing...');

    const promise = new Promise( (resolve) => {
        setTimeout(() => {
            resolve("Congratulations! You have got your certificate...")
        }, 1000);
    })

    return promise;
}


// promise calling or consuming code
// enroll holds promise, bz it return a promise
enroll()
    .then( courseProgress )    // for resolve, next function is deserved
    .then( getCertificate )   // again for resolve, next function is deserved
    .then( data => {         // now, resolve() return some data
        console.log(data)

    }).catch( error => {    // for error handling of then chain

        console.log(error)
    })
