import "./styles/style.css";
import searchIcon from "./assets/search.png";
import {
  initializeMovieLibrary,
  showPopupCard,
  removeMovieCards,
  removePopupCard,
} from "./movies.js";
import {
  ratingsFilter,
  trendingFilter,
  mostViewedFilter,
  resetFiltersOnClick,
} from "./moviefilters";

//importing and initializing firebase
import { initializeApp } from "firebase/app";
const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
});

// importing firebase service
import { getFirestore, collection, getDocs } from "firebase/firestore";

// initialize services (db = database)
const db = getFirestore(firebaseApp);
// create an array containing each movie
let movies = [];
// defining the specific collection we want to "pull data from" (collection ref)
// the function "collection" is not used on the db object, instead, it's imported directly from firebase. The reference is stored in the variable colRef
const colRef = collection(db, "movies");

// get collection data
// this returns a promise
getDocs(colRef).then((snapshot) => {
  // cycle through each item in snapshot and each time fire a function for each item
  snapshot.docs.forEach((doc) => {
    // get certain data and push it in the array
    // by calling the .data method on the doc object we get the data we return the object with different data properties
    movies.push({ ...doc.data(), id: doc.id });
  });
  initializeMovieLibrary(movies);
});

const trending = document.getElementById("trending");
const mostViewed = document.getElementById("mostViewed");
const ratings = document.getElementById("ratings");
const searchIconImg = document.getElementById("searchIcon");
//  const exitButtonImg = document.getElementById('exit');
const searchInput = document.getElementById("textInput");
const searchIconButton = document.getElementById("searchIcon");
const overlay = document.getElementById("popupOverlay");
searchIconImg.src = searchIcon;
//  exitButtonImg.src = exitButton;

overlay.addEventListener("click", removePopupCard);

// sets an event listener to first three filters
trending.addEventListener("click", trendingFilter);
mostViewed.addEventListener("click", mostViewedFilter);
ratings.addEventListener("click", ratingsFilter);

// SEARCH FUNCTIONS
searchIconButton.addEventListener("click", filterBySearch);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    filterBySearch();
  }
});

searchInput.addEventListener("input", checkValidInput);
function checkValidInput() {
  document.querySelector(".navigation-filter").classList.remove("show-error");
  searchInput.value = searchInput.value.replace(/[.*+\-?^${}()|[\]\\]/g, "");
}

// THIS CHECKS FOR MATCHES IN INPUT AND TITLES BY USING REGEX
function filterBySearch() {
  console.log(searchInput.value);

  const minLength = 1; // Minimum length of the search text

  // Escape special characters in the searchText to avoid regex issues

  // Create the regular expression pattern for matching the searchText
  const regexPattern = new RegExp(`.*${searchInput.value}.*`, "i"); // 'i' for case-insensitive search

  // Filter the movies based on the search text
  const filteredMovies = movies.filter((movie) => {
    return (
      regexPattern.test(movie.title) && searchInput.value.length >= minLength
    );
  });

  console.log(filteredMovies.length);
  if (filteredMovies.length !== 0) {
    console.log(filteredMovies);

    resetFiltersOnClick();
    initializeMovieLibrary(filteredMovies);
  } else {
    console.log("no movies found");
    document.querySelector(".navigation-filter").classList.add("show-error");

    resetFiltersOnClick();
    initializeMovieLibrary(movies);
  }
}

export { movies };
