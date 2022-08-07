// $or, $and, $nor, $not

// $and
db.movies.find({ $and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }] });


// alternative of $and -> inside of filter object -> and separate each condition by comma
db.movies.find({ "rating.average": {$gt: 9}, genres: "Drama" });


// $or
db.movies.find({ $or: [{"rating.average": {$lt: 4}}, {"rating.average": {$gt: 9}}] });


// $nor is just opposite condition of $or condition
// where neither of these two conditions is met
// returns all documents that fail to match both clauses.
db.movies.find({ $nor: [{"rating.average": {$lt: 4}}, {"rating.average": {$gt: 9}}] });


// $not -> then query that we don't want to run
// Inverts the effect of a query expression and returns documents that do not match the query expression.
db.movies.find({ runtime: {$not: {$eq: 60}} });

// alternative but simple 
db.movies.find({ runtime: {$ne: 60} });
