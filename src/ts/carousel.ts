const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
const carousel = document.querySelector(".carousel") as HTMLElement;
const allSlides = document.querySelectorAll(".slide");
const heroSection = document.querySelector(".hero");

const textContentArray = [
  {
    title: "We can change your digital world",
    subtitle: "Bold enough to blow a hole in your next maketing campaign.",
  },
  {
    title: "Shoot for the hoop!",
    subtitle: "Aiming low is not an option for us.",
  },
  {
    title: "You need a good partner",
    subtitle: "Let us help you realise your true potential.",
  },
];

let currentIndex = 0;
let direction = 1;
let autoPlayCarouselId = 0;

const getSlideWidth = () => carousel.offsetWidth / allSlides.length;
const translateSlide = (value: number) =>
  (carousel.style.transform = `translateX(${-value}px)`);

function slide(direction: number) {
  const isAtLastSlide = currentIndex >= allSlides.length - 1;
  const isAtFirstSlide = currentIndex <= 0;

  if (
    (direction === -1 && isAtFirstSlide) ||
    (direction === 1 && isAtLastSlide)
  ) {
    const offset = direction * 200;
    translateSlide(currentIndex * getSlideWidth() + offset);
    setTimeout(() => translateSlide(currentIndex * getSlideWidth()), 200);
  } else {
    currentIndex += direction;
    translateSlide(currentIndex * getSlideWidth());
    changeSlideInfo();
  }
}

function debounce(func: Function, wait: number) {
  let timeoutId = 0;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

const debouncedResizeHandler = debounce(() => {
  translateSlide(currentIndex * getSlideWidth());
}, 200);

function changeSlideInfo() {
  if (!heroSection) return;

  let titleText = textContentArray[currentIndex].title;
  let subtitleText = textContentArray[currentIndex].subtitle;

  const titleElement = heroSection.querySelector(".title") as HTMLElement;
  const subtitleElement = heroSection.querySelector(".subtitle") as HTMLElement;

  titleElement?.classList.remove("animate");
  subtitleElement?.classList.remove("animate");

  setTimeout(() => {
    titleElement?.classList.add("animate");
    subtitleElement?.classList.add("animate");
    if (titleElement) titleElement.innerText = titleText;
    if (subtitleElement) subtitleElement.innerText = subtitleText;
  }, 200);
}

function playCarousel() {
  autoPlayCarouselId = setInterval(() => {
    slide(direction);
    if (currentIndex === allSlides.length - 1) direction = -1;
    if (currentIndex === 0) direction = 1;
  }, 3000);
}

function pauseCarousel() {
  clearInterval(autoPlayCarouselId);
}


leftButton?.addEventListener("click", () => {
  slide(-1);
  pauseCarousel();
});
rightButton?.addEventListener("click", () => {
  slide(1);
  pauseCarousel();
});
window.addEventListener("resize", debouncedResizeHandler);

if(heroSection) playCarousel();
