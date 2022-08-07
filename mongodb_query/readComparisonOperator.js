// $gt, $gte, $lt, $lte, $in, $nin, $eq, $ne


// $eq -> equal to -> exact value
db.movies.find({ runtime: {$eq: 60} })

db.movies.find({ runtime: 60 })  // alternative of $eq


// $ne -> not equal -> will return all documents except runtime = 60
db.movies.find({ runtime: {$ne: 60} })


// $lt -> less/lower than -> will return all documents which are lower/less than 42
db.movies.find({ runtime: {$lt: 42} })

// $lte -> less than equal -> will return all documents which are less than or equal to 42
db.movies.find({ runtime: {$lte: 42 }})


// $gt -> greater than will return all documents which are greater than 60
db.movies.find({ runtime: {$gt: 60} })

// $gte -> greater than equal -> will return all documents which are greater than or equal to 60
db.movies.find({ runtime: {$gte: 60} })


// $in -> Matches any of the values specified in an array.
// query value is either 30 or 60.
// in general condition values are placed in an array. 
db.movies.find({ runtime: {$in: [30, 60]} });

// $nin -> not in --> alternative of $in
// return all documents except the condition values in the array
db.movies.find({ runtime: {$nin: [30, 60]} })

// show all documents which are doesn't meet runtime = 30 and runtime = 60

