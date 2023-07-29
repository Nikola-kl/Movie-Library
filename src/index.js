import './styles/style.css';
// import leftArrow from './assets/left-arrow.png';
// import rightArrow from './assets/right-arrow.png';
import searchIcon from './assets/search.png';
import movie1 from './assets/movie1-compressed.jpg';
import movie2 from './assets/movie2-compressed.jpg';
import movie3 from './assets/movie3-compressed.jpg';
import movie4 from './assets/movie4-compressed.jpg';
import movie5 from './assets/movie5-compressed.jpg';
import movie6 from './assets/movie6-compressed.jpg';
import movie7 from './assets/movie7-compressed.jpg';
import movie8 from './assets/movie8-compressed.jpg';


const shownSlides = 3; // show these number of slides
const scrollSlides = 3; // scroll by these slides
let currentIndex = 0;
// const leftArrowImg = document.getElementById('leftArrowImg');
// leftArrowImg.src = leftArrow;
// const rightArrowImg = document.getElementById('rightArrowImg');
// rightArrowImg.src = rightArrow;
const searchIconImg = document.getElementById('searchIcon');
searchIconImg.src = searchIcon;

const movie1Img = document.getElementById('movie1');
movie1Img.src = movie1;
const movie2Img = document.getElementById('movie2');
movie2Img.src = movie2;
const movie3Img = document.getElementById('movie3');
movie3Img.src = movie3;
const movie4Img = document.getElementById('movie4');
movie4Img.src = movie4;
const movie5Img = document.getElementById('movie5');
movie5Img.src = movie5;
const movie6Img = document.getElementById('movie6');
movie6Img.src = movie6;
const movie7Img = document.getElementById('movie7');
movie7Img.src = movie7;
const movie8Img = document.getElementById('movie8');
movie8Img.src = movie8;


const trackCarousel = document.querySelector('.movie-card-wrapper')
const slides = Array.from(trackCarousel.children);

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
// console.log(trackCarousel.getBoundingClientRect().width / shownSlides )


// //IF you put margins between cards you need to calculate the distance between them and include it
// slides.forEach((slide) => {
//     console.log(slide.getBoundingClientRect().width / shownSlides)

//     // const element = document.querySelector(slide);
//     slide.style.width = trackCarousel.getBoundingClientRect().width / shownSlides + "px";

// })

// console.log(slides?.[0]?.clientWidth)
// trackCarousel.style.width = slides?.[0]?.clientWidth * shownSlides + "px"
// trackCarousel.style.transform = `translateX(0)`;

// trackCarousel.addEventListener("click", (e) => {
  
//     const selectedSlide = e?.target;
//     const parent = e?.target?.parentNode;
//     const allChildNodes = parent?.childNodes;
//     allChildNodes.forEach((node) => {
//         if(node.nodeType !== 1) return;
//         node.classList.remove("active")
//     })

//     selectedSlide.classList.add("active")
// })
// leftArrowImg.addEventListener("click", (e) => {
//     console.log(slides)
//     console.log(e);
//     trackCarousel.style.transform = `translateX(0)`;
// })
// rightArrowImg.addEventListener("click", (e) => {
//     console.log(slides)
//     console.log(e);
//     trackCarousel.style.transform = `translateX(-${slides?.[0]?.clientWidth * scrollSlides}px)`;
// })

// when I click left, move slides to the left
// when I click right, move slides to the right
// when I click the nav indicators, move to that slide
