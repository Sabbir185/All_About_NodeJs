
// Text search query --> $regex , $text
// {$regex: new RegExp(searchValue, "i")}

{ country: { $regex: /bangladesh/ } }  // hard code

{ country: {$regex: new RegExp(query.searchValue, 'i')}}  // dynamic searching case-insensitive

// query -->
// use max-tv-shows
// db.tv_show.find().pretty();
db.tv_show.find({ summary: {$regex: /violent/} }).pretty(); // or
db.tv_show.find({ summary: {$regex: new RegExp('violent', 'i')}})

