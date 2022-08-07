//--------------------------------------------
//--------------------------------------------
//           Aggregation Pipeline
//--------------------------------------------
//--------------------------------------------   
// just like as find() method in mongodb
db.persons.aggregate([{ $match: { gender: "female" } }]).pretty();


//--------------------------------------------
//--------------------------------------------
//           Group Pipeline
//--------------------------------------------
//--------------------------------------------
// find all female, show their location and do sum for same location
db.persons.aggregate([
    { $match: { gender: "female" } },
    {
        $group: {
            _id: { state: "$location.state" },
            totalPersons: { $sum: 1 },
        },
    },
]).pretty();

// sort
db.persons.aggregate([
    { $match: { gender: "female" } },
    {
        $group: {
            _id: { state: "$location.state" },
            totalPerson: { $sum: 1 },
        },
    },
    { $sort: { totalPerson: -1 } },
]).pretty();


//--------------------------------------------
//--------------------------------------------
//           Projection Pipeline
//--------------------------------------------
//--------------------------------------------
// projection --> $project --> fields show/hidden 
// for client side response
db.persons.aggregate([
    {$project: {
        _id: 0,
        gender: 1,
        fullName: {
            $concat: [
                "$name.first", ' ', "$name.last"
            ]
        }
    }}
])

// projection, little bit complex: v1
db.persons.aggregate([
    {$project: {
        _id: 0,
        gender: 1,
        fullName: {
            $concat: [
                {$toUpper : "$name.first"}, ' ', {$toUpper : "$name.last"}
            ]
        }
    }}
])

// projection, little bit complex: v2
// first character Upper Case then
// rest of the characters [1 index, (str.length-1)]
db.persons.aggregate([
    {$project: {
        _id: 0,
        gender: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }}
])

// More projection for location
db.persons.aggregate([
    // 1st stage project
    {$project: {
        _id: 0,
        gender: 1,
        name: 1,
        email: 1,
        location: {
            type: "Point",
            coordinates: [
                "$location.coordinates.longitude",
                "$location.coordinates.latitude"
            ]
        }
    }},

    // 2nd stage
    {$project: {
        gender: 1,
        email: 1,
        location: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }}
]).pretty()

// convert longitude and latitude into number
db.persons.aggregate([
    // 1st stage project
    {$project: {
        _id: 0,
        gender: 1,
        name: 1,
        email: 1,
        location: {
            type: "Point",
            coordinates: [
                {$convert: {input: "$location.coordinates.longitude", to: 'double', onError: 0.0, onNull: 0.0}},
                {$convert: {input: "$location.coordinates.latitude", to: 'double', onError: 0.0, onNull: 0.0}}
            ]
        }
    }},

    // 2nd stage
    {$project: {
        gender: 1,
        email: 1,
        location: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }}
]).pretty()



// birthday and age
db.persons.aggregate([
    // 1st stage project
    {$project: {
        _id: 0,
        gender: 1,
        name: 1,
        birthday: {$convert: {input: "$dob.date", to: "date"}},
        age: "$dob.age",
        email: 1,
        location: {
            type: "Point",
            coordinates: [
                {$convert: {input: "$location.coordinates.longitude", to: 'double', onError: 0.0, onNull: 0.0}},
                {$convert: {input: "$location.coordinates.latitude", to: 'double', onError: 0.0, onNull: 0.0}}
            ]
        }
    }},

    // 2nd stage
    {$project: {
        gender: 1,
        email: 1,
        birthday: 1,
        age: 1,
        location: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }}
]).pretty()


// shortcut, if we don't need to set onError or onNull
db.persons.aggregate([
    // 1st stage project
    {$project: {
        _id: 0,
        gender: 1,
        name: 1,
        birthday: {$toDate: "$dob.date"},  // shortcut
        age: "$dob.age",
        email: 1,
        location: {
            type: "Point",
            coordinates: [
                {$convert: {input: "$location.coordinates.longitude", to: 'double', onError: 0.0, onNull: 0.0}},
                {$convert: {input: "$location.coordinates.latitude", to: 'double', onError: 0.0, onNull: 0.0}}
            ]
        }
    }},

    // 2nd stage
    {$project: {
        gender: 1,
        email: 1,
        birthday: 1,
        age: 1,
        location: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }}
]).pretty()


// project, group, sort
db.persons.aggregate([
    // 1st stage project
    {$project: {
        _id: 0,
        gender: 1,
        name: 1,
        birthday: {$toDate: "$dob.date"},  // shortcut
        age: "$dob.age",
        email: 1,
        location: {
            type: "Point",
            coordinates: [
                {$convert: {input: "$location.coordinates.longitude", to: 'double', onError: 0.0, onNull: 0.0}},
                {$convert: {input: "$location.coordinates.latitude", to: 'double', onError: 0.0, onNull: 0.0}}
            ]
        }
    }},

    // 2nd stage
    {$project: {
        gender: 1,
        email: 1,
        birthday: 1,
        age: 1,
        location: 1,
        fullName: {
            $concat: [
                {$toUpper : {$substrCP: ["$name.first", 0, 1]}},
                {$substrCP: ["$name.first", 1, {$subtract: [{$strLenCP: "$name.first"}, 1]}]}, 
                ' ', 
                {$toUpper : {$substrCP: ["$name.last", 0, 1]}},
                {$substrCP: ["$name.last", 1, {$subtract: [{$strLenCP: "$name.last"}, 1]}]}
            ]
        }
    }},

    // grouping according to birth-year
    {$group: {
        _id: {birthYear: {$isoWeekYear: "$birthday"}},
        numPersons: {$sum: 1}
    }},

    // sorting according to numPersons from above stage
    {$sort: {numPersons: -1}}
]).pretty()



//--------------------------------------------
//--------------------------------------------
//           Array in Aggregation
//--------------------------------------------
//--------------------------------------------
// group by age, and create new array (allHobbies) according to their hobbies  
db.friends.aggregate([
    {$group: {
        _id: {age: "$age"},
        allHobbies: {$push: "$hobbies"}
    }}
]).pretty()


// splitting/platens array by unwind
// unwind takes an array
db.friends.aggregate([
    {$unwind: "$hobbies"}
]).pretty()


// join flat array by grouping
db.friends.aggregate([
    {$unwind: "$hobbies"},
    {$group: {
        _id: {age: "$age"},
        allHobbies: {$push: "$hobbies"}
    }}
]).pretty()


// remove duplicate value --> addToSet, instead of push
db.friends.aggregate([
    {$unwind: "$hobbies"},
    {$group: {
        _id: {age: "$age"},
        allHobbies: {$addToSet: "$hobbies"}
    }}
]).pretty()


// More of array projection... examScores
db.friends.aggregate([
    {$project: {
        _id: 0, examScores: {$slice: ["$examScores", 1]} // 1st element of array
    }}
]).pretty()


// last two elements of array
db.friends.aggregate([
    {$project: {
        _id: 0, examScores: {$slice: ["$examScores", -2]} 
    }}
]).pretty()


// start from 3rd element and show 1 element of array
db.friends.aggregate([
    {$project: {
        _id: 0, examScores: {$slice: ["$examScores", 2, 1]} // array, index, nth showing number
    }}
]).pretty()


// start from 2rd element and show 2 elements of array
db.friends.aggregate([
    {$project: {
        _id: 0, examScores: {$slice: ["$examScores", 1, 2]} // array, index, nth showing number
    }}
]).pretty()


// length of array --> $size
db.friends.aggregate([
    {$project: {
        _id: 0, numScores: {$size: "$examScores"}
    }}
]).pretty()


// filtering data from array, conditional based
// to access temporary variable --> $$ are used.
db.friends.aggregate([
    {$project: {
        _id: 0, 
        scores: { $filter: { input: "$examScores", as: 'sc', cond: { $gt: ['$$sc.score', 70]} }}
    }}
])


// highest score find out
db.friends.aggregate([
    {$project: {
        _id: 0, 
        topScore: { $max: "$examScores.score"}
    }},
    {$sort: {topScore: -1}}
])


// alternative --> using max
db.friends.aggregate([
    { $unwind: "$examScores" },
    { $project: {
        _id: 1, name: 1, age: 1, score: "$examScores.score"
    }},
    { $sort: { score: -1 }},
    { $group: {
        _id: "$_id", name: { $first: "$name" }, maxScore: { $max: "$score" }
    }},
    { $sort: { maxScore: -1 }}
])


// alternative, using slice of array
db.friends.aggregate([
    { $unwind: "$examScores" },
    { $project: {
        _id: 1, name: 1, age: 1, score: "$examScores.score"
    }},
    { $sort: { score: -1 }},
    { $group: { _id: "$_id", topArray: {$push: "$score"}}},
    {$project: {
        _id: 1, name: 1, topScore: {$slice: ["$topArray", 1]}
    }}
]).pretty()


//--------------------------------------------
//--------------------------------------------
//           Bucket in Aggregation
//--------------------------------------------
//--------------------------------------------
db.persons.aggregate([
    { $bucket: {
        groupBy: "$dob.age",
        boundaries: [20, 30, 40, 50, 70, 100],
        output: {
            numPersons: { $sum: 1 },
            averageAge: { $avg: "$dob.age"}
        }
    }}
])

// auto boundary generate
db.persons.aggregate([
    { $bucketAuto: {
        groupBy: "$dob.age",
        buckets: 5,
        output: {
            numPersons: { $sum: 1 },
            averageAge: { $avg: "$dob.age"}
        }
    }}
]).pretty()