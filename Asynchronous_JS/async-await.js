const paymentSuccess = true;
const mark = 95;


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



// async-await, nothing but a system of Promise calling 
// or consuming code of Promise -> then-catch
async function course() {
    try {

        await enroll();
        await courseProgress();
        const data = await getCertificate();

        console.log(data)
        
    } catch (error) {
        console.log(error)
    }
}

course();
