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
  getFirestore, collection, getDocs
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
 let screenWidth = window.innerWidth;
 let screenHeight = window.innerHeight;
 
 searchIconImg.src = searchIcon;
//  exitButtonImg.src = exitButton;

// Detect screen size
window.addEventListener('resize', function () {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  console.log(screenWidth)
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
          <div class="card" tabindex="1"
          data-id="${movie.id}" 
          data-genre="${movie.genre}"
          data-trending="${movie.trending}"
          data-views="${movie.views}">
            <img src="${movie.img}" alt="">
              <div class="card-content">
                <div class="titles-wrapper flex-item">
                  <h2 class="movie-title">${movie.title}</h2>
                  <h4 class="subtitle">${movie.subtitle}</h4>
                </div>
                <div class="info-wrapper flex-item">
                  <h5 class="ratings">Rating: ${movie.rating}/10</h5>
                  <p class="movie-info">${movie.info}</p>
                </div>
              </div>
            </div>`;
            document.getElementById('cardsWrapper').appendChild(movieCard);
            // console.log(movieCard);
            
        });
      
  } else if (ratings.classList.contains('active') === true){
    
    movieList.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.addEventListener('click', showPopupCard);
      movieCard.innerHTML = `
      <div class="card" tabindex="1"
      data-id="${movie.id}" 
      data-genre="${movie.genre}"
      data-trending="${movie.trending}"
      data-views="${movie.views}">
        <img src="${movie.img}" alt="">
          <div class="card-content">
            <div class="titles-wrapper flex-item">
              <h2 class="movie-title">${movie.title}</h2>
              <h4 class="subtitle">${movie.subtitle}</h4>
            </div>
            <div class="info-wrapper flex-item">
              <h5 class="ratings">Rating: ${movie.rating}/10</h5>
              <p class="movie-info">${movie.info}</p>
            </div>
          </div>
        </div>`;
        document.getElementById('cardsWrapper').appendChild(movieCard);
        // console.log(movieCard);
    });
  } else {
    let randomizedMovieList = movieList.sort(() => Math.random() - .5);
   

      randomizedMovieList.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.addEventListener('click', showPopupCard);
      movieCard.innerHTML = `
        <div class="card" tabindex="1" 
        data-id="${movie.id}"
        data-genre="${movie.genre}"
        data-trending="${movie.trending}"
        data-views="${movie.views}">
          <img src="${movie.img}" alt="">
            <div class="card-content">
              <div class="titles-wrapper flex-item">
                <h2 class="movie-title">${movie.title}</h2>
                <h4 class="subtitle">${movie.subtitle}</h4>
              </div>
              <div class="info-wrapper flex-item">
                <h5 class="ratings">Rating: ${movie.rating}/10</h5>
                <p class="movie-info">${movie.info}</p>
              </div>
            </div>
          </div>`;
        document.getElementById('cardsWrapper').appendChild(movieCard);
        // console.log(movieCard);
        
       
      });
    };
    
}




// POPUP CARD SETUP
function showPopupCard(e) {
  const clickedCard = e.target.closest('.card');
  const movieId = clickedCard.getAttribute('data-id');

  console.log(clickedCard.getAttribute('data-id'));

  // Finds the movie in the 'movies' array using the retrieved movie ID from the getAttribute

  const movie = movies.find((movie) => movie.id === movieId)
  document.body.style.overflow = "hidden";
  if (movie) {
    const popupCard = document.createElement('div');
    popupCard.classList.add('popup-card');
    popupCard.innerHTML = `
          <img src="${movie.img}" alt="">
         
          <div class="popup-card-text">
              <h2 class="movie-title">${movie.title}</h2>
              <h4 class="subtitle">${movie.subtitle}</h4>
              <h5 class="movie-genre">${movie.genre}</h5>
              <h5 class="ratings">Rating: ${movie.rating}/10</h5>
              <p class="movie-info">${movie.info}</p>
          </div>
        `;
    // removePopupCard();
    popupCardContainerContent.appendChild(popupCard);
    // popupCard.addEventListener('click', checkForCardExistence);
    popupCardContainer.classList.remove('hide');
    popupCard.addEventListener('click', checkForFullScreenCard);
    // popupCard.addEventListener('touchstart', checkForFullScreenCard);
   
  }
};


// window.addEventListener('click', function(e){   
//   if (document.getElementById('popupCardContainer').contains(e.target)){
//     console.log('clicked the box')
    
//   } else {
//     console.log('clicked out the box')
    
//   }
// });



overlay.addEventListener('click', removePopupCard);






function checkForFullScreenCard(e) {
  const target = e.target
  console.log(target);
  console.log(screenWidth)
  // console.log(target.closest('#popupCardContainer'));
  if (screenWidth <= 650 && target.closest('.popup-card')) {
    console.log(target.closest('.popupCard'));
    removePopupCard()
  }
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    // console.log('heyho');
    removePopupCard()    
  };
});
//////////////////////////////////////////////////


function removePopupCard() {
    // console.log('i have children')
  while (popupCardContainerContent.firstChild) {
    popupCardContainerContent.removeChild(popupCardContainerContent.firstChild);
    popupCardContainer.classList.add("hide")
  }
  document.body.style.overflow = null;
}







// sets an event listener to every filter-item
const filterItems = Array.from(document.querySelectorAll('.filter-item'));
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
  console.log(filteredMoviesArray);
  const allMovieCardsWrapper = document.getElementById('cardsWrapper');
    while (allMovieCardsWrapper.firstChild) {
      allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
    }
    
    initializeMovieLibrary(filteredMoviesArray);    
}


// resets the filter active status on click
function resetFiltersOnClick() {
  const filterItems = Array.from(document.querySelectorAll('.filter-item'));
  filterItems.forEach(item => {
    item.classList.remove('active');
  });
}

// function for selecting the targeted filter
function selectedFilter(e) {

  // calls defined functions
  resetFiltersOnClick()           
  let targetFilter = e.target;
  // checkForCardExistence(targetFilter);
  filteredMovies(targetFilter);
  utilityClass(targetFilter);
}

//add utility class
function utilityClass(e) {
  const filterItem = e;
  filterItem.classList.add('active');
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


