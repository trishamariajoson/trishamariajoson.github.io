gsap.registerPlugin(ScrollTrigger);

// Use "from" method for the .text_container
gsap.from(".text_container", {
  scrollTrigger: {
    trigger: ".text_container",
    start: "top 90%",
    end: "bottom 10%",
    toggleActions: "play none none reverse",
    // markers: true // Enable to check trigger positions - uncomment for development use
  },
  x: -100, // Start position from the left, in pixels
  autoAlpha: 0, // GSAP's special property that handles both opacity and visibility
  duration: 1,
  ease: "power1.out"
});

const toggleButton = document.getElementById('toggle');
const menu = document.querySelector('.menu');
const slider = document.querySelector('.slider'); // Select your slider

toggleButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('active');

  if (isOpen) {
    document.body.classList.add('no-scroll');
    slider.style.display = 'none'; // Hide slider when menu opens
  } else {
    document.body.classList.remove('no-scroll');
    slider.style.display = 'block'; // Show slider when menu closes
  }
});


let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// Function to adjust the height of the slider
function adjustSliderHeight() {
  const activeItem = document.querySelector('.slider .list .item.active img');
  if (activeItem) {
      const imageHeight = activeItem.clientHeight;
      const slider = document.querySelector('.slider');
      slider.style.height = `${imageHeight}px`;
  }
}

// Set up an event listener for when the window resizes
window.addEventListener('resize', adjustSliderHeight);

// Initial adjust when the document is ready and when images load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure images are loaded before calculating height
  const images = document.querySelectorAll('.slider .list .item img');
  images.forEach((img) => {
      img.onload = adjustSliderHeight;
  });
  
  // Initial adjustment
  adjustSliderHeight();
});

document.addEventListener('DOMContentLoaded', () => {
  const cardWrapper = document.querySelector('.card_wrapper');
  const cards = document.querySelectorAll('.article_card');
  const prevBtn = document.querySelector('.slider-nav-btn-prev');
  const nextBtn = document.querySelector('.slider-nav-btn-next');

  cardWrapper.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior
    if (event.deltaY < 0) { // Scrolling up
      scrollToIndex(currentIndex - 1);
    } else { // Scrolling down
      scrollToIndex(currentIndex + 1);
    }
  });

  // Variables to hold mouse down and mouse move statuses
  let isDown = false;
  let startX;
  let scrollLeft;

  
  cardWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    cardWrapper.classList.add('active'); // consider adding an 'active' class to change the cursor
    startX = e.pageX - cardWrapper.offsetLeft;
    scrollLeft = cardWrapper.scrollLeft;
  });
  
  cardWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    cardWrapper.classList.remove('active');
  });
  
  cardWrapper.addEventListener('mouseup', () => {
    isDown = false;
    cardWrapper.classList.remove('active');
  });
  
  cardWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardWrapper.offsetLeft;
    const walk = (x - startX) * 2; // the * 2 value will determine the sensitivity, experiment with it
    cardWrapper.scrollLeft = scrollLeft - walk;
  });
  // Function to calculate width of an element including margin
  function getWidthWithMargin(element) {
    const style = window.getComputedStyle(element);
    return element.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
  }

  // Function to scroll to a specific card index
  function scrollToIndex(index, instant = false) {
    const targetElement = cards[index];
    const scroller = cardWrapper;
    
    const cardRect = targetElement.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();

    const scrollDistance = cardRect.left - scrollerRect.left + scroller.scrollLeft;
    const scrollCentered = scrollDistance - (scrollerRect.width / 2) + (cardRect.width / 2);

    if (instant) {
      scroller.scrollTo({ left: scrollCentered });
    } else {
      scroller.scrollTo({ left: scrollCentered, behavior: 'smooth' });
    }
  }

  let currentIndex = 0;

  prevBtn.addEventListener('click', () => {
    // If at the start, move to the end length directly and do instant scroll without animation
    if (currentIndex === 0) {
      currentIndex = cards.length - 1;
      scrollToIndex(currentIndex);
    } else {
      currentIndex--;
      scrollToIndex(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    // If at the end, move to the start and make sure scroll instantly without animation
    if (currentIndex === cards.length - 1) {
      currentIndex = 0; 
      scrollToIndex(currentIndex);
    } else {
      currentIndex++;
      scrollToIndex(currentIndex);
    }
  });

  // On load, scroll to the first index for a visually centered card without delay
  scrollToIndex(currentIndex, true);
});







