// Practice data -> 
// use user
// db.users.insertMany([ {name: "Sabbir", hobbies: [{title: "Sports", frequency: 3}, {title: "Cooking", frequency: 5}], phone: 12345678}, {name: "Nazib", hobbies: [{title: "Cooking", frequency: 6}, {title: "Cars", frequency: 2}], phone: "1234567", age: 25} ])


// 2 types of element operator
// $exists, $type

// $exists -> {field : {$exists: <boolean_type>, <if_other_condition_need>} }
// null value of field is also included $exists: true
db.users.find({ age: {$exists: true } }).pretty()
db.users.find({ age: {$exists: false } }).pretty()  // will show all docs where age doesn't exist

// 2nd condition if needed
db.users.find({ age: {$exists: true, $gt: 25 } }).pretty()    // not exists in db
db.users.find({ age: {$exists: true, $gte: 25 } }).pretty()  // exists in db


// Practice data -> 
// db.users.insertMany([ {name: "Kaniz", hobbies: [{title: "Sports", frequency: 6}, {title: "Yoga", frequency: 2}], phone: "1234567", age: null} ])
db.users.find({ age: {$exists: true } }).pretty()  // return all age fields includes null also
db.users.find({ age: {$exists: true, $ne: null} }).pretty();



// $type
// match the type of field, then return documents -> double and number show same results
db.users.find({ phone: {$type: "number"} }).pretty()
db.users.find({ phone: {$type: "double"} }).pretty()

db.users.find({ phone: {$type: "string"} }).pretty()

// $type also accept an array
db.users.find({ phone: {$type: ["double", "string"]} }).pretty();


// combine -> $exists and $type
db.users.find({ phone: {$exists: true, $type: "number"} }).pretty()


