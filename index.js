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

document.getElementById('toggle').addEventListener('click', function() {
  document.querySelector('header nav .menu').classList.toggle('active');
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