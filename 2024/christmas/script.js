// Snow animation
function createSnow() {
    const snow = document.createElement('div');
    snow.classList.add('snow');
    snow.style.left = Math.random() * window.innerWidth + 'px';
    snow.style.opacity = Math.random();
    snow.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    document.body.appendChild(snow);

    const animation = snow.animate([
        { transform: 'translateY(-10px)' },
        { transform: `translateY(${window.innerHeight + 10}px)` }
    ], {
        duration: (Math.random() * 3 + 2) * 1000,
        easing: 'linear'
    });

    animation.onfinish = () => snow.remove();
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.opacity = 0.9;
    document.body.appendChild(heart);

    heart.style.animation = 'pulse 1s infinite';

    const animation = heart.animate([
        {
            transform: 'translateY(100vh) scale(0)',
            opacity: 0.9
        },
        {
            transform: 'translateY(-20vh) scale(1.5)',
            opacity: 0
        }
    ], {
        duration: 6000,
        easing: 'ease-out'
    });

    animation.onfinish = () => heart.remove();
}

function rotatePhoto() {
    const photo = document.querySelector('.photo');
    let rotation = 0;
    setInterval(() => {
        rotation += 1;
        photo.style.transform = `rotateY(${rotation}deg)`;
    }, 50);
}

// Handle iOS viewport height issues
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
setVH();

setInterval(createSnow, 100);
setInterval(createHeart, 300);
rotatePhoto();

// Add your photos
const photos = [
    './api/01_lego.jepg',  // Replace with your photo URLs
    './api/02_xige_birthday.jpeg',
    './api/03_keg.jpeg',
    './api/04_chengdu.jpeg',
    './api/05_gloria_birthday.jpeg',
    './api/06_graduate.jpeg',
    './api/07_osu.jpeg',
    './api/08_wedding.jpeg',
    './api/09_osu.jpeg',
];

let currentPhoto = 0;
const photoElement = document.querySelector('.photo img');

setInterval(() => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    photoElement.src = photos[currentPhoto];
}, 3000);