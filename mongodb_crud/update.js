
// --> updateOne, updateMany

// --> first filter object needs finding query
// --> Second option actually for performing update fields

// $set --> used for document's fields update/add, it takes object
db.users.updateOne(
    { _id: ObjectId(id) }, // document finding query logic
    { $set: { hobbies: [{ title: "Sport", frequency: 2 }, { title: "Cooking", frequency: 1 }] } }  // existing hobbies -> updating/added sub document
)


// we can add new fields into a or many documents
db.users.updateMany(
    { "hobbies.title": "Sport" },   // document finding query logic
    { $set: { isSporty: true } }      // add a new field into many document, according to filter query
);



// multiple fields update, if any fields are absence, it will create for you :)
db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    {
        $set: {
            phone: 01756574157,
            age: 26
        }
    }
)


// $inc --> accept an object -> {<field_name>: inc_value} -> for increment or decrement value
db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $inc: { age: 1 } },
)


// update + $inc -> remember that, same fields at a same time will not work
// $inc and $set in an object
db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $inc: { age: -1 }, $set: { isSporty: false } }
)


// alternative/exceptional update keyword instead of $set
// $min, $max, $mul
// for $min --> new updated value must lower  than old value
// for $max --> new updated value must higher than old value
// $mul --> just multiply old value with given new value
db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $min: { age: 24 } } // it will directly update age
)

db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $max: { age: 27 } }
)

db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $mul: { age: 1.1 } }   // will 10% increase
)


// $unset operator -> delete/drop fields
db.users.updateOne(
    { _id: ObjectId("6308e6b761ecc3618440212b") },
    { $unset: { phone: "" } }  // you may type phone value or just give it empty string, both same
)


// rename field/s
db.users.updateMany(
    {},
    { $rename: { age: "totalAge" } }
)


// upsert: true --> if our query document does not exist during update time, mongodb will create a new document for us and insert it into collection, if we pass upsert: true as a 3rd parameter
db.users.updateOne(
    { name: "Mahbub" },
    { $set: { name: "Mahbub", age: '28', hobbies: [{ title: 'Foody', frequency: 5 }], isSporty: true } },
    { upsert: true }
)


//**  big update with query filtering

// I wan to update or insert some fields into sub-document (array of object), so first we need to find out that object by query..here we have to option (1). $and  (2). $elemMatch, so which one is perfect for us? Array contains many objects. So it has a high chance to mix-up filtering object. For this situation maybe $elemMatch is perfect

// filtering part 1
// using $and -> if sub-documents contains this then show us
db.users.find({ $and: [{ "hobbies.title": "Sport" }, { "hobbies.frequency": 2 }] })
// this filter query in this case is not perfect, rather than....

// use $elemMatch -> here frequency is related on Sport -> exact match for Sport and frequency
db.users.find({ hobbies: { $elemMatch: { title: "Sport", frequency: { $gte: 2 } } } })

// updating part 2
db.users.updateMany(
    { hobbies: { $elemMatch: { title: "Sport", frequency: { $gte: 2 } } } },
    { $set: { "hobbies.$.highFrequency": true } }
)

// ** end


// Update all sub-document specific field of array
db.users.updateMany(
    { "hobbies.title": 'Foody' },
    { $inc: { "hobbies.$[].frequency": -1 } }
)


// insert filed or object into array
// for this, $push keyword is used
// single object insert
db.users.updateOne(
    { name: 'Mahbub' },
    { $push: { hobbies: { title: 'Walking', frequency: 2 } } }
)

// multiple object or field insert into an array
// $each keyword is used for that
// you can sort or slice, before save into database with $each
db.users.updateOne(
    { name: 'Mahbub' },
    { $push: { hobbies: { $each: [{ title: 'Good Wine', frequency: 1 }, { title: 'Hiking', frequency: 2 }], $sort: { frequency: -1 } } } },
)


// $addToSet --> similar to push --> but push allow duplicate value/object
// but addToSet do not allow same value in the array
db.users.updateOne(
    { name: 'Mahbub' },
    { $addToSet: { hobbies: { title: 'Hiking', frequency: 2 } } } ,
)


// pull or remove anythings from array
// $pull is used
db.users.updateOne(
    { name: 'Mahbub' },
    { $pull: { hobbies: { title: 'Hiking', frequency: 2 } } }
)

// we can remove element from first or last position from array
// last element 1, first element -1
db.users.updateOne(
    { name: 'Mahbub' },
    { $pop: { hobbies: 1 } }
)