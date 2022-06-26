const paymentSuccess = true;
const mark = 70;

function enroll(callback) {
  console.log("Course enrollment is processing...");

  // sometime wait to payment verify
  setTimeout(() => {
    if (paymentSuccess) {
      callback();
    } else {
      console.log("Payment failed! try again...");
    }
  }, 2000);
}

function courseProgress(callback) {
  console.log("Course on progress....");

  // wait to finish the course
  setTimeout(() => {
    if (mark >= 70) {
      callback();
    } else {
      console.log("Sorry! you are not able to get certificate...");
    }
  }, 3000);
}

function getCertificate() {
    console.log('On processing...')

    // wait to certificate ready
    setTimeout(() => {
        console.log('Congratulations! You have got your certificate...')
    }, 1000);
}


// function calling sequences/system
enroll( function() {
    courseProgress( getCertificate );
})

// here, enroll deserve a function with parameter, but we can't pass a function with parameter because it will call that immediately, we have to just pass a reference of a function / function body. courseProgress() also deserve a function with parameter.