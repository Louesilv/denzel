/* eslint-disable no-console, no-process-exit */
const imdb = require('./imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const METASCORE = 77;

async function start (actor = DENZEL_IMDB_ID, metascore = METASCORE) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);
    const awesome = movies.filter(movie => movie.metascore >= metascore);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));
    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));

    //process.exit(0);
    return movies;
  } catch (e) {
    console.error(e);
    return null;
    //process.exit(1);
  }
  
}

const [, , id, metascore] = process.argv;

//const movies = start(id, metascore);

module.exports = async (id) => {
  try {
    console.log(`📽️  fetching filmography of ${id}...`);
    const movies = await imdb(id);
    //const awesome = movies.filter(movie => movie.metascore >= metascore);

    console.log(`🍿 ${movies.length} movies found.`);
    //console.log(JSON.stringify(movies, null, 2));
    //console.log(`🥇 ${awesome.length} awesome movies found.`);
    //console.log(JSON.stringify(awesome, null, 2));

    //process.exit(0);
    return movies;
  } catch (e) {
    console.error(e);
    return null;
    //process.exit(1);
  }
};


