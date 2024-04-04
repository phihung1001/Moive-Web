import logo from './logo.svg';
import Movie  from "./components/Movie";
import  React, { useEffect, useState } from 'react';

const FEATURED_API = 
     "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_API = 
     "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 
     "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
function App() {

  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setsearchTerm ] = useState('');
  
  useEffect(() => {
     getMovies(FEATURED_API);
  }, []);

  const getMovies =(API) => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => {
      setMovies(data.results);
    });
  }

  const handleOnsumit = (e) => {
     e.preventDefault();

     if(searchTerm) {

     getMovies(SEARCH_API + searchTerm);

      setsearchTerm('');
    }
  }

  const handleOnchange = (e) => {
    setsearchTerm(e.target.value);
  }

  return ( 
    <>
    <header>
      <form onSubmit={handleOnsumit}>
        <input 
           type="search" 
           className="search" 
           placeholder='Search..'
           value={searchTerm}
           onChange={handleOnchange}

        />
      </form>
    </header>

    <div className="movie-container">
      { movies.length >0 && movies.map((movie) =>  
        <Movie key={movie.id} {...movie} />
      )}
    </div>
    </>
  );
}

export default App;
