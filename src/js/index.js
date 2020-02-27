import '../scss/style.scss';
// import Sticky from 'sticky-js';
import Masonry from 'masonry-layout';
import Glide from '@glidejs/glide';
import IMask from 'imask';
import portfolioData from './portfolioData';
import { 
    parallaxed, 
    scrollTo,
    openLeftMenu,
    openRightMenu,
    closeLeftMenu,
    closeRightMenu,
    openLocationsMenu,
    closeLocationsMenu,
    makeLocationHtml,
    sendForm,
    openModal,
    closeModal,
} from './utils';

document.querySelectorAll('.scrollTo').forEach(elem => elem.addEventListener('click', scrollTo));

parallaxed('#cubes', 5);
parallaxed('#peoples', 2);

// fixed portfolio header if scrolling into portfolio block

// let sticky = new Sticky('#portfolio-header');

//open reviews modal

let servicesLinks = document.querySelectorAll('.services-list .item');
servicesLinks.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        let bgClass = index === 0 ? 'bg1' : index === 1 ? 'bg2' : index === 2 ? 'bg3' : 'bg4';
        document.querySelector('.services-modal').classList.remove('bg1', 'bg2', 'bg3', 'bg4');
        document.querySelector('.services-modal').classList.add(bgClass);
        let name = item.children[item.children.length - 1].innerHTML;
        name = name.replace(/<br\s?\/?>/gi, ' ');
        document.querySelector('.services-modal h2').innerText = name;
        openModal(document.querySelector('.services-modal'));
    });
});

let closeServicesLink = document.querySelector('.services-modal .close');
closeServicesLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(document.querySelector('.services-modal'));
});

// portfolio cards

// set desctop portfolio data
portfolioData.map((item, index) => {
    let cards = document.querySelectorAll('#portfolio-cards .card');
    let image = document.createElement('img');
    image.src = `./img/portfolio/${item.img}`;
    cards[index].querySelector('.form-block').prepend(image);
    let container = makeLocationHtml(item);
    cards[index].append(container);
});

window.addEventListener('load', () => {
    new Masonry(document.getElementById('portfolio-cards'), {
        gutter: 30,
        horizontalOrder: true
     });
});


// reviews slider
let glide = new Glide('#reviewsCarousel', {
    perView: 1
}).mount();

let back = document.getElementById('slideBack');
let next = document.getElementById('slideNext');

back.addEventListener('click', () => glide.go('<'));
next.addEventListener('click', () => glide.go('>'));

// mobile navs

// left menu
let hamburger = document.querySelector('.menu-link');
let closeLeftLink = document.querySelector('.left-navbar .close');

hamburger.addEventListener('click', (e) => {
    openLeftMenu(e);
    closeRightMenu(e);
});
closeLeftLink.addEventListener('click', closeLeftMenu);
document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeLeftMenu));

// right menu
let fakeLink = document.querySelector('.fake-link');
let closeRightLink = document.querySelector('.right-navbar .close');

fakeLink.addEventListener('click', (e) => {
    openRightMenu(e);
    closeLeftMenu(e);
});
closeRightLink.addEventListener('click', closeRightMenu);

// locations menu
let openLocationsLink = document.querySelector('.open-locations');
let closeLocationsLink = document.querySelector('.locations-menu .close');

openLocationsLink.addEventListener('click', openLocationsMenu);
closeLocationsLink.addEventListener('click', closeLocationsMenu);

// mobile portfolio

let portfolioCarousel = new Glide('.portfolio-carousel', {
    type: 'carousel',
    perView: 3,
    gap: 10,
    focusAt: 'center',
    breakpoints: {
        640: {
            perView: 2,
            focusAt: 0
        }
    }
});

portfolioCarousel.on(['mount.after', 'run'], function(e) {
    const currentIndex = portfolioCarousel.index;
    let item = portfolioData.filter(location => location.mobileIndex === currentIndex)[0];
    let container = makeLocationHtml(item, true);
    let desc = document.getElementsByClassName('portfolio-item-desc')[0];
    desc.innerHTML = '';
    desc.append(container);
});

portfolioCarousel.mount();

let locationLinks = document.querySelectorAll('.location-link');

locationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        closeLocationsMenu(e);
        portfolioCarousel.go(link.dataset.id);
    });
});


// phone mask
let phoneInputs = document.querySelectorAll('input[type="tel"]');
Array.prototype.map.call(phoneInputs, input => {
    let mask = IMask(input, {
        mask: "+375 (00) 000-00-00"
    });
});

// sending forms

let getTourForms = document.getElementsByClassName('get-tour');
Array.prototype.map.call(getTourForms, form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = new FormData(form);
        data.append('type', 'Заказать тур');
        sendForm(data, './send.php')
            .then(response => {
                if (!response.error) {
                    form.reset();
                    // open thankyou modal
                    openModal(document.querySelector('.thankyou-modal'));
                }
                else console.log('error');
            })
            .catch(err => console.log(`error: ${err}`));
            
    });
});

// sending contacts form
let form = document.getElementById('contacts-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    sendForm(data, '/send.php')
        .then(response => console.log(response))
        .catch(er => console.log(er));
});

// sending services-form

let servicesForm = document.getElementById('services-form');

servicesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(servicesForm);
    sendForm(data, '/send.php')
        .then(response => openModal(document.querySelector('.thankyou-modal')))
        .catch(er => console.log(er));
});

// close modal
let btn = document.querySelector('.thankyou-modal .close');
document.addEventListener('click', (e) => {
    let wrap = document.querySelector('.modal-wrap');
    if(e.target === wrap) {
        closeModal(document.querySelector('.thankyou-modal'));
        closeModal(document.querySelector('.services-modal'));
    }
});
btn.addEventListener('click', () => closeModal(document.querySelector('.thankyou-modal')));