
// --> updateOne, updateMany

// --> first filter object needs finding query
// --> Second option actually for performing update fields

// $set --> used for document's fields update/add, it takes object
db.users.updateOne(
    { _id: ObjectId(id) }, // document finding query logic
    {$set: {hobbies: [{title: "Sport", frequency:2}, {title: "Cooking", frequency: 1}]} }  // existing hobbies -> updating/added sub document
) 


// we can add new fields into a or many documents
db.users.updateMany(
    {"hobbies.title": "Sport"},   // document finding query logic
    {$set: {isSporty: true}}      // add a new field into many document, according to filter query
);



// multiple fields update, if any fields are absence, it will create for you :)
db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {
        $set: {
            phone: 01756574157,
            age: 26
        }
    }
)


// $inc --> accept an object -> {<field_name>: inc_value} -> for increment or decrement value
db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$inc: {age: 1}},
)


// update + $inc -> remember that, same fields at a same time will not work
// $inc and $set in an object
db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$inc: {age: -1}, $set: {isSporty: false} }
)


// alternative/exceptional update keyword instead of $set
// $min, $max, $mul
// for $min --> new updated value must lower  than old value
// for $max --> new updated value must higher than old value
// $mul --> just multiply old value with given new value
db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$min: {age: 24}} // it will directly update age
)

db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$max: {age: 27}} 
)

db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$mul: {age: 1.1}}   // will 10% increase
)


// $unset operator -> delete/drop fields
db.users.updateOne(
    {_id: ObjectId("6308e6b761ecc3618440212b")},
    {$unset: {phone: ""}}  // you may type phone value or just give it empty string, both same
)


// rename field/s
db.users.updateMany(
    {},
    {$rename: {age: "totalAge"}}
)


// upsert: true --> if our query document does not exist during update time, mongodb will create a new document for us and insert it into collection, if we pass upsert: true as a 3rd parameter
