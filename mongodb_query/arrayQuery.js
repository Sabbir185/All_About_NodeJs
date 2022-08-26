// data
db.users.insertMany([ 
    {
        name: "Sabbir", 
        hobbies: [{title: "Sport",frequency: 2},{title: "Cooking",frequency: 3}], 
        phone: "01725151578"
    },
    {
        name: "Motiur", 
        hobbies: [{title: "Sport",frequency: 2},{title: "Blogging",frequency: 2}], 
        phone: "01965062500"
    },
    {
        name: "Kiron", 
        hobbies: [{title: "Smoking",frequency: 5},{title: "Cooking",frequency: 3}], 
        phone: 017251515
    }
 ])

/*
    {
        hobbies: [
            {
                "title": "Sport",
                "frequency": 2
            },
            {
                "title": "Cooking",
                "frequency": 3
            },
        ]
    }
*/


// for embedded document or array of object

// 1. nested document query --> 
// have to written all for sub-document --> 
// but I want only title
// and they match exact
db.users.find({ hobbies: { title: "Sport", frequency: 2 } })


// 2. maybe best way --> there no need to written all, for example: frequency
db.users.find({ "hobbies.title": "Sport" })


// $size --> i want to filter exact size array document 
db.users.find({ hobbies: {$size: 2} })


// $all --> order does'not matter that time
db.movies.find({ genre: {$all: ['thriller', 'romance']} });


// $elemMatch --> exact match query, instead of $and --> but similar of $and but more specific
db.users.find({ hobbies: {$elemMatch: {title: "Sport", frequency: 2}} })


// 