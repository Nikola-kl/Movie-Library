import { initializeMovieLibrary } from "./movies";
import { movies } from "./index";

const filterItems = Array.from(document.querySelectorAll(".filter-item"));
filterItems.forEach((item) => {
  item.addEventListener("click", selectedFilter);
});

function trendingFilter(e) {
  let trendingFilterClick = e.target;
  filteredTrendingMovies(trendingFilterClick);
}

function mostViewedFilter(e) {
  let trendingFilterClick = e.target;
  filteredMostViewedMovies(trendingFilterClick);
}

function ratingsFilter(e) {
  let ratingsFilterClick = e.target;
  filteredMoviesByRating(ratingsFilterClick);
}

//add utility class
function utilityClass(e) {
  const filterItem = e;
  console.log(filterItem);
  filterItem.classList.add("text-sunflower-400", "active");
}

// Trending Movies functions

function filteredTrendingMovies() {
  const filteredMoviesArray = movies.filter((movie) => movie.trending === true);
  const allMovieCardsWrapper = document.getElementById("cardsWrapper");
  while (allMovieCardsWrapper.firstChild) {
    allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
  }
  initializeMovieLibrary(filteredMoviesArray);
}

// Most Viewed Movies functions

function filteredMostViewedMovies() {
  const filteredMoviesArray = movies.sort((a, b) => b.views - a.views);

  const allMovieCardsWrapper = document.getElementById("cardsWrapper");
  while (allMovieCardsWrapper.firstChild) {
    allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
  }
  initializeMovieLibrary(filteredMoviesArray);
}

function filteredMoviesByRating() {
  const filteredMoviesArray = movies.sort((a, b) => b.rating - a.rating);
  const allMovieCardsWrapper = document.getElementById("cardsWrapper");
  while (allMovieCardsWrapper.firstChild) {
    allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
  }

  initializeMovieLibrary(filteredMoviesArray);
}

// resets the filter active status on click
function resetFiltersOnClick() {
  // const filterItems = Array.from(document.querySelectorAll('.filter-item'));
  filterItems.forEach((item) => {
    item.classList.remove("text-sunflower-400", "active");
  });
}

// function for selecting the targeted filter
function selectedFilter(e) {
  // calls defined functions
  resetFiltersOnClick();
  let targetFilter = e.target;
  filteredMovies(targetFilter);
  utilityClass(targetFilter);
}

// using the targeted filter we filter the movies array based on genre

function filteredMovies(targetFilter) {
  const filteredGenre = targetFilter.innerText.toLowerCase();
  const filteredMoviesArray = movies.filter(
    (movie) => movie.genre === filteredGenre
  );

  // TRYING WITH REMOVING AND ADDING ELEMENTS AGAIN
  initializeMovieLibrary(filteredMoviesArray);
}

export { ratingsFilter, trendingFilter, mostViewedFilter, resetFiltersOnClick };
