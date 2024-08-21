const date = document.getElementById('date')
const setCurrentYear = () => {
	const currentYear = new Date().getFullYear()
	date.textContent = currentYear
}
setCurrentYear()

// hamburger menu
const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('.nav-list')
const socials = document.querySelector('.social-nav')
const navLinks = document.querySelectorAll('.nav-links')

const toggleMobileMenu = () => {
	hamburger.classList.toggle('open')
	navList.classList.toggle('open')
	socials.classList.toggle('open')
	document.body.classList.toggle('open')
}

navLinks.forEach(link => link.addEventListener('click', toggleMobileMenu))
hamburger.addEventListener('click', toggleMobileMenu)

// initialize aos (library for scroll animation)
AOS.init()

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
let index = 0;

document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % slide.length;
    slides.style.transform = `translateX(${-index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + slide.length) % slide.length;
    slides.style.transform = `translateX(${-index * 100}%)`;
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typewrite(txt, el) {
    el.innerText = "";
    for (const char of txt) {
      el.textContent += char;
      await sleep(75);
    }
  }

  async function main() {
    const TAILS = [" Web Developer.", " Problem Solver.", " Data Science Enthusiast."];
    const ROOT_TEXT = "";
    const root = document.querySelector(".root");
    const tail = document.querySelector(".tail");
    await typewrite(ROOT_TEXT, root);
    let tailIndex = 0;
    while (true) {
      await typewrite(TAILS[tailIndex], tail);
      await sleep(3000);
      tailIndex = (tailIndex + 1) % TAILS.length;
    }
  }

  document.addEventListener('DOMContentLoaded', main);
