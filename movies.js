
var express = require("express");
const pool = require("./queries");
var router = express.Router();
var movies = [
  { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 102, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 103, name: "Fight Club", year: 1999, rating: 8.1 },
  { id: 104, name: "Fight Club", year: 1999, rating: 8.1 },
];

module.exports=router;
router.get('/users',function (req,res) {
    pool.query('select * from users',(error, results)=>{
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
})
router.get('/movies',function (req,res) {
    pool.query('select * from movies',(error, results)=>{
        if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
})

// post queryy
// router.post('/movies',function (req,res) {
//   const id=parseInt(req.params.id)
//   const {title,genres,year}=req.body
//     pool.query('insert into movies values(id,title,genres,year) values ($1,$2,$3,$4)',[id,title,genres,year],
//     (error, results)=>{
//         if(error){
//             throw error
//         }
//         res.status(200).json(results.rows)
//     })
// })
router.post('/movies', (req, res) => { 
  const title = req.body.title;
  const genres= req.body.genres;
  const year= req.body.year;
  console.log(req.body)
  
  pool.query("INSERT INTO movies(title, genres,year) VALUES ($1, $2, $3) ", [title, genres ,year]),
  (error, results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
  }
})

router.get('/movies/paginate',function (req,res) {
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);

    const startIndex=(page-1)*limit;
    const endIndex=(page*limit);

    const results={};
    if (endIndex<movies.length) {
        results.next={
            page:page+1,
            limit:limit,
        };
    }
    if (startIndex>0) {
        results.previous={
            page:page-1,
            limit:limit,
        };
    }
    results.results=movies.slice(startIndex,endIndex);
    res.json(results);
});

router.get("/:id([0-9]{3,})", function (req, res) {
  var currMovie = movies.filter(function (movie) {
    if (movie.id == req.params.id) {
      return true;
    }
  });

  if (currMovie.length == 1) {
    res.json(currMovie[0]);
  } else {
    res.status(404);
    res.json({ message: "Not Found" });
  }
});

router.post("/movies", function (req, res) {
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    var newId = movies[movies.length - 1].id + 1;
    movies.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
    });
    res.json({ message: "New Movie created. ", location: "/movies/" + newId });
  }
});

router.put("/:id", function (req, res) {
  if (
    !req.body.name ||
    !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
    !req.params.id.toString().match(/^[0-9]{3,}$/g)
  ) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    var updateIndex = movies.map(function (movie) {
        return movie.id;
      }).indexOf(parseInt(req.params.id));

    if (updateIndex === -1) {
      movies.push({
        id: req.params.id,
        name: req.body.name,
        year: req.body.year,
        rating: req.body.rating,
      });
      res.json({message: "New Movie Created. ",location: "/movies/" + req.params.id});
    }else{
        movies[updateIndex]={
            id:req.params.id,
            name:req.body.name,
            year:req.body.year,
            rating:req.body.rating
        };
        res.json({message: "Movie id "+req.params.id+ " updated.",
    location:" /movies/"+req.params.id})
    }
  }
});

router.delete("/:id", function (req, res) {
    var removeIndex=movies.map(function(movie){
        return movie.id;
    }).indexOf(req.params.id);

    if (removeIndex=== -1) {
        res.json({message:"not found"});
    } else {
        movies.splice(removeIndex,1);
        res.send({message:"Movie id "+req.params.id+ " removed."});
    }
});
