import { movies } from "./index.js";
import { checkForFullScreenCard } from "./checkscreensize.js";

const popupCardContainer = document.getElementById("popupCardContainer");
const popupCardContainerContent = document.getElementById(
  "popupCardContainerContent"
);
//initialize movies
// fills the library with movies, in an order based on conditions
function initializeMovieLibrary(movies) {
  let movieList = movies;
  removeMovieCards();

  if (mostViewed.classList.contains("active") === true) {
    movieList.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.addEventListener("click", showPopupCard);
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
      document.getElementById("cardsWrapper").appendChild(movieCard);
    });
  } else if (ratings.classList.contains("active") === true) {
    movieList.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.addEventListener("click", showPopupCard);
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
      document.getElementById("cardsWrapper").appendChild(movieCard);
    });
  } else {
    let randomizedMovieList = movieList.sort(() => Math.random() - 0.5);

    randomizedMovieList.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.addEventListener("click", showPopupCard);
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
      document.getElementById("cardsWrapper").appendChild(movieCard);
    });
  }
}

// POPUP CARD SETUP
function showPopupCard(e) {
  const clickedCard = e.target.closest(".card");
  const movieId = clickedCard.getAttribute("data-id");

  // Finds the movie in the 'movies' array using the retrieved movie ID from the getAttribute

  const movie = movies.find((movie) => movie.id === movieId);
  document.body.style.overflow = "hidden";
  if (movie) {
    const popupCard = document.createElement("div");
    popupCard.classList.add(
      "overflow-hidden",
      "w-full",
      "h-full",
      "relative",
      "aspect-[9/16]"
    );
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
    popupCardContainer.classList.remove("hidden");
    popupCard.addEventListener("click", checkForFullScreenCard);
    popupCard.addEventListener("touchstart", checkForFullScreenCard);
  }
}

//popupcard deletion

function removePopupCard() {
  while (popupCardContainerContent.firstChild) {
    popupCardContainerContent.removeChild(popupCardContainerContent.firstChild);
    popupCardContainer.classList.add("hidden");
  }
  document.body.style.overflow = null;
}

// remove movies

function removeMovieCards() {
  const allMovieCardsWrapper = document.getElementById("cardsWrapper");
  while (allMovieCardsWrapper.firstChild) {
    allMovieCardsWrapper.removeChild(allMovieCardsWrapper.firstChild);
  }
}

export {
  initializeMovieLibrary,
  showPopupCard,
  removeMovieCards,
  removePopupCard,
};
