import './styles/style.css';
import searchIcon from './assets/search.png';


//importing and initializing firebase
import { initializeApp } from 'firebase/app';
const firebaseApp = initializeApp({
  apiKey:process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
});

 // importing firebase service
import { 
  getFirestore, collection, getDocs,
 } from 'firebase/firestore';

// initialize services (db = database)
const db = getFirestore(firebaseApp);
// create an array containing each movie
let movies = []
// defining the specific collection we want to "pull data from" (collection ref)
// the function "collection" is not used on the db object, instead, it's imported directly from firebase. The reference is stored in the variable colRef
const colRef = collection(db, 'movies')

// get collection data
// this returns a promise
getDocs(colRef)
 .then((snapshot) => {
  
    
    // cycle through each item in snapshot and each time fire a function for each item
    snapshot.docs.forEach((doc) => {
      // get certain data and push it in the array
      // by calling the .data method on the doc object we get the data we return the object with different data properties
      movies.push({ ...doc.data(), id: doc.id })
    });
    initializeMovieLibrary(movies);
 });

 const trending = document.getElementById('trending');
 const mostViewed = document.getElementById('mostViewed');
 const ratings = document.getElementById('ratings');
 const searchIconImg = document.getElementById('searchIcon');
//  const exitButtonImg = document.getElementById('exit');
 const searchInput = document.getElementById('textInput')
 const searchIconButton = document.getElementById('searchIcon');
 const popupCardContainer = document.getElementById('popupCardContainer');
 const popupCardContainerContent =document.getElementById("popupCardContainerContent");
 const overlay = document.getElementById("popupOverlay");
 const filterItems = Array.from(document.querySelectorAll('.filter-item'));
 let screenWidth = window.innerWidth;
 let screenHeight = window.innerHeight;
 
 searchIconImg.src = searchIcon;
//  exitButtonImg.src = exitButton;

// Detect screen size
window.addEventListener('resize', function () {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  // console.log(screenWidth)
});





 // fills the library with movies, in an order based on conditions
function initializeMovieLibrary(movies) {
      let movieList = movies
      removeMovieCards()
    
  if (mostViewed.classList.contains('active') === true) {
        movieList.forEach((movie) => {
          const movieCard = document.createElement('div');
          movieCard.addEventListener('click', showPopupCard);
          movieCard.innerHTML = `
          <div class="card w-full aspect-[9/16] bg-cover flex flex-col overflow-hidden relative opacity-75 transition-all focus-within:opacity-100 focus-within:scale-[1.04] focus-within:z-[1] hover:opacity-100 hover:scale-[1.04] hover:z-[1] group card-shadow" tabindex="1"
          data-id="${movie.id}" 
          data-genre="${movie.genre}"
          data-trending="${movie.trending}"
          data-views="${movie.views}">
            <img class="object-cover w-full h-full md:grayscale-[80%] group-focus:grayscale-0 group-hover:grayscale-0" src="${movie.img}" alt="">
              <div class="px-[0.6rem] pb-[0.6rem] lg:p-[1.2rem] bg-gradient-to-t from-black-950 to-transparent absolute bottom-[-0.05rem] min-w-full w-full h-[40%] flex flex-col mobile-l:justify-end md:justify-around md:translate-y-[30%] xl:translate-y-[35%] transition-transform duration-400 ease group-hover:translate-y-0 group-focus:translate-y-0">
                <div class="flex flex-col justify-end basis-[50%]">
                  <h2 class="text-base mobile-l:text-lg grow-1 lg:text-xl text-sunflower-500 font-bold flex-grow-0 xl:leading-normal">${movie.title}</h2>
                  <h4 class="subtitle text-base md:text-lg grow-1">${movie.subtitle}</h4>
                </div>
                <div class="info-wrapper flex flex-col justify-end basis-[50%] md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
                  <h5 class="text-sunflower-600 text-base md:text-lg font-semibold">Rating: ${movie.rating}/10</h5>
                  <p class="hidden md:block whitespace-nowrap overflow-hidden text-ellipsis">${movie.info}</p>
                </div>
              </div>
            </div>`;
            document.getElementById('cardsWrapper').appendChild(movieCard);
        });
      
  } else if (ratings.classList.contains('active') === true){
    
    movieList.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.addEventListener('click', showPopupCard);
      movieCard.innerHTML = `
      <div class="card w-full aspect-[9/16] bg-cover flex flex-col overflow-hidden relative  opacity-75 transition-all focus-within:opacity-100 focus-within:grayscale-0 focus-within:scale-[1.04] focus-within:z-[1]   hover:opacity-100 hover:grayscale-0 hover:scale-[1.04] hover:z-[1] group card-shadow" tabindex="1"
      data-id="${movie.id}" 
      data-genre="${movie.genre}"
      data-trending="${movie.trending}"
      data-views="${movie.views}">
        <img class="object-cover w-full h-full md:grayscale-[80%] group-focus:grayscale-0 group-hover:grayscale-0" src="${movie.img}" alt="">
          <div class="px-[0.6rem] pb-[0.6rem] lg:p-[1.2rem] bg-gradient-to-t from-black-950 to-transparent absolute bottom-[-0.05rem] min-w-full w-full h-[40%] flex flex-col mobile-l:justify-end md:justify-around md:translate-y-[30%] xl:translate-y-[35%] transition-transform duration-400 ease group-hover:translate-y-0 group-focus:translate-y-0">
            <div class="flex flex-col justify-end basis-[50%]">
              <h2 class="text-base mobile-l:text-lg lg:text-xl text text-sunflower-500 font-bold flex-grow-0 xl:leading-normal">${movie.title}</h2>
              <h4 class="subtitle text-base md:text-lg grow-1">${movie.subtitle}</h4>
            </div>
            <div class="info-wrapper flex flex-col justify-end basis-[50%] md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <h5 class="text-sunflower-600 text-base md:text-lg font-semibold">Rating: ${movie.rating}/10</h5>
              <p class="hidden md:block whitespace-nowrap overflow-hidden text-ellipsis">${movie.info}</p>
            </div>
          </div>
        </div>`;
        document.getElementById('cardsWrapper').appendChild(movieCard);
    });
  } else {
    let randomizedMovieList = movieList.sort(() => Math.random() - .5);
   
      randomizedMovieList.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.addEventListener('click', showPopupCard);
      movieCard.innerHTML = `
        <div class="card w-full aspect-[9/16] bg-cover flex flex-col overflow-hidden relative  opacity-75 transition-all focus-within:opacity-100 focus-within:grayscale-0 focus-within:scale-[1.04] focus-within:z-[1]   hover:opacity-100 hover:grayscale-0 hover:scale-[1.04] hover:z-[1] group card-shadow" tabindex="1" 
        data-id="${movie.id}"
        data-genre="${movie.genre}"
        data-trending="${movie.trending}"
        data-views="${movie.views}">
          <img class="object-cover w-full h-full md:grayscale-[80%] group-focus:grayscale-0 group-hover:grayscale-0" src="${movie.img}" alt="">
            <div class="px-[0.6rem] pb-[0.6rem] lg:p-[1.2rem] bg-gradient-to-t from-black-950 to-transparent absolute bottom-[-0.05rem] min-w-full w-full h-[40%] flex flex-col mobile-l:justify-end md:justify-around md:translate-y-[30%] xl:translate-y-[35%] transition-transform duration-400 ease group-hover:translate-y-0 group-focus:translate-y-0">
              <div class="flex flex-col justify-end basis-[50%]">
                <h2 class="text-base mobile-l:text-lg lg:text-xl text-sunflower-500 font-bold flex-grow-0 xl:leading-normal">${movie.title}</h2>
                <h4 class="subtitle text-base md:text-lg grow-1">${movie.subtitle}</h4>
              </div>
              <div class="info-wrapper flex flex-col justify-end basis-[50%] md:opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
                <h5 class="text-sunflower-600 text-base md:text-lg font-semibold">Rating: ${movie.rating}/10</h5>
                <p class="hidden md:block whitespace-nowrap overflow-hidden text-ellipsis">${movie.info}</p>
              </div>
            </div>
          </div>`;
        document.getElementById('cardsWrapper').appendChild(movieCard);     
      });
    };
    
}




// POPUP CARD SETUP
function showPopupCard(e) {
  console.log('i clicked');
  const clickedCard = e.target.closest('.card');
  const movieId = clickedCard.getAttribute('data-id');
  console.log(clickedCard.getAttribute('data-id'));

  // Finds the movie in the 'movies' array using the retrieved movie ID from the getAttribute

  const movie = movies.find((movie) => movie.id === movieId)
  document.body.style.overflow = "hidden";
  if (movie) {
    const popupCard = document.createElement('div');
    popupCard.classList.add('overflow-hidden', 'w-full', 'h-full', 'relative', 'aspect-[9/16]');
    popupCard.innerHTML = `
          <img class="w-full h-full object-cover aspect-[9/16]" src="${movie.img}" alt="">
         
          <div class="popup-card-text text-gradient fixed text-center p-8 flex flex-col justify-end top-0 h-full w-full group:">
              <h2 class="movie-title mx-3 my-1 text-shadow text-xl text-sunflower-400 font-bold">${movie.title}</h2>
              <h4 class="subtitle mx-3 mb-3 text-shadow text-lg text-sunflower-500 font-bold">${movie.subtitle}</h4>
              <h5 class="movie-genre mx-3 my-2 text-shadow text-lg text-black-200 font-bold">${movie.genre}</h5>
              <h5 class="ratings mx-3 mb-3 text-shadow text-lg text-sunflower-200 font-bold">Rating: ${movie.rating}/10</h5>
              <p class="movie-info m-3 text-shadow text-base md:text-lg text-black-200 font-bold">${movie.info}</p>
          </div>
        `;
    popupCardContainerContent.appendChild(popupCard);
    popupCardContainer.classList.remove('hidden');
    popupCard.addEventListener('click', checkForFullScreenCard);
    popupCard.addEventListener('touchstart', checkForFullScreenCard);
   
   
  }
};


overlay.addEventListener('click', removePopupCard);


function checkForFullScreenCard(e) {
  const target = e.target

  if (screenWidth <= 650 && target.closest('.popup-card')) {
    console.log(target.closest('.popupCard'));
    removePopupCard()
  }
}
document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    removePopupCard()    
  };
});

function removePopupCard() {
  

  while (popupCardContainerContent.firstChild) {
    popupCardContainerContent.removeChild(popupCardContainerContent.firstChild);
    popupCardContainer.classList.add("hidden")
  }
  document.body.style.overflow = null;
}




// sets an event listener to every filter-item

filterItems.forEach((item) => {
  item.addEventListener('click', selectedFilter);
})

// Trending Movies functions
trending.addEventListener('click', trendingFilter);
function trendingFilter(e) {

        let trendingFilterClick = e.target;
    filteredTrendingMovies(trendingFilterClick);   
}

function filteredTrendingMovies() {
  
  const filteredMoviesArray = movies.filter(movie => movie.trending === true);
  const allMovieCardsWrapper = document.getElementById('cardsWrapper');
    while (allMovieCardsWrapper.firstChild) {
      allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
    }    
    initializeMovieLibrary(filteredMoviesArray);
  
}

// Most Viewed Movies functions
mostViewed.addEventListener('click', mostViewedFilter);
function mostViewedFilter(e) {

    
    let trendingFilterClick = e.target;
    filteredMostViewedMovies(trendingFilterClick);
}

function filteredMostViewedMovies() {

  const filteredMoviesArray = movies.sort((a, b) => b.views - a.views);
  
  const allMovieCardsWrapper = document.getElementById('cardsWrapper');
    while (allMovieCardsWrapper.firstChild) {
      allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
    }   
    initializeMovieLibrary(filteredMoviesArray);
    
}

// Rating Movies functions
ratings.addEventListener('click', ratingsFilter);
function ratingsFilter(e) {

    
    let ratingsFilterClick = e.target;
    filteredMoviesByRating(ratingsFilterClick);
}

function filteredMoviesByRating() {
  const filteredMoviesArray = movies.sort((a, b) => b.rating - a.rating);
  const allMovieCardsWrapper = document.getElementById('cardsWrapper');
    while (allMovieCardsWrapper.firstChild) {
      allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
    }
    
    initializeMovieLibrary(filteredMoviesArray);    
}


// resets the filter active status on click
function resetFiltersOnClick() {
  // const filterItems = Array.from(document.querySelectorAll('.filter-item'));
  filterItems.forEach(item => {
    item.classList.remove('text-sunflower-400', 'active');
  });
}

// function for selecting the targeted filter
function selectedFilter(e) {

  // calls defined functions
  resetFiltersOnClick()           
  let targetFilter = e.target;
  filteredMovies(targetFilter);
  utilityClass(targetFilter);
}

//add utility class
function utilityClass(e) {
  const filterItem = e;
  console.log(filterItem);
  filterItem.classList.add('text-sunflower-400', 'active');
}

// using the targeted filter we filter the movies array based on genre
function filteredMovies(targetFilter) {

    const filteredGenre = targetFilter.innerText.toLowerCase();
    const filteredMoviesArray = movies.filter(movie => movie.genre === filteredGenre);
    
    // TRYING WITH REMOVING AND ADDING ELEMENTS AGAIN
    initializeMovieLibrary(filteredMoviesArray);
  }

function removeMovieCards() {
    const allMovieCardsWrapper = document.getElementById('cardsWrapper');
    while (allMovieCardsWrapper.firstChild) {
      allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
    }
  }
    


// SEARCH FUNCTIONS
searchIconButton.addEventListener('click', filterBySearch);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    filterBySearch();
  }
});

searchInput.addEventListener('input', checkValidInput);
function checkValidInput() {
  document.querySelector('.navigation-filter').classList.remove('show-error');
  searchInput.value = searchInput.value.replace(/[.*+\-?^${}()|[\]\\]/g, '');
}





// THIS CHECKS FOR MATCHES IN INPUT AND TITLES BY USING REGEX
function filterBySearch() {
  console.log(searchInput.value)
   
    const minLength = 1; // Minimum length of the search text
  
    // Escape special characters in the searchText to avoid regex issues
    
  
    // Create the regular expression pattern for matching the searchText
    const regexPattern = new RegExp(`.*${searchInput.value}.*`, 'i'); // 'i' for case-insensitive search
  
    // Filter the movies based on the search text
    const filteredMovies = movies.filter((movie) => {
      return regexPattern.test(movie.title) && searchInput.value.length >= minLength;
    });
    
    console.log(filteredMovies.length);
    if (filteredMovies.length !== 0) {
      console.log(filteredMovies)
    
    resetFiltersOnClick()
    initializeMovieLibrary(filteredMovies)
    } else {
      console.log('no movies found');
      document.querySelector('.navigation-filter').classList.add('show-error')
    
    resetFiltersOnClick()
    initializeMovieLibrary(movies);
    }
}


