module.exports = {
    parallaxed: (element, time) => {
        let elem = document.querySelector(element);
        window.addEventListener('scroll', () => {
            let coords = `center ${window.scrollY / time}px`;
            elem.style.backgroundPosition = coords;
        });
    },
    scrollTo: e => {
        e.preventDefault();
        let elem = e.target.getAttribute('href');
        document.querySelector(elem).scrollIntoView({block: "start", behavior: "smooth"});
    },
    openLeftMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.left-navbar');
        menu.classList.add('active');
    },
    closeLeftMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.left-navbar');
        menu.classList.remove('active');
    },
    openRightMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.right-navbar');
        menu.classList.add('active');
    },
    closeRightMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.right-navbar');
        menu.classList.remove('active');
    },
    openLocationsMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.locations-menu');
        menu.classList.add('active');
    },
    closeLocationsMenu: e => {
        e.preventDefault();
        let menu = document.querySelector('.locations-menu');
        menu.classList.remove('active');
    },
    makeLocationHtml: (item, excludeName = false) => {
        let container = document.createElement('div');
        if (!excludeName) {
            let cardName = document.createElement('h3');
            cardName.innerText = item.name;
            container.appendChild(cardName);
        }
        
        item.desc.map(paragraph => {
            let p = document.createElement('p');
            p.innerText = paragraph;
            container.appendChild(p);
        });
        let programTitle = document.createElement('h4');
        programTitle.innerText = item.program.title;
        container.appendChild(programTitle);
        let programList = document.createElement('ul');
        item.program.list.map(listItem => {
            let li = document.createElement('li');
            li.innerText = listItem;
            programList.appendChild(li);
        });
        container.appendChild(programList);
        return container;
    },
    sendForm: (formData, url) => {
        return new Promise((resolve, reject) => {
            let XHR = new XMLHttpRequest();
            XHR.open('POST', url);
            XHR.onreadystatechange = function() {
                if(this.readyState === 4) {
                    if(this.status == 200) resolve(this.responseText);
                    else reject({error: true, status: this.status, message: this.statusText});
                }
                else return;
            }
            
            XHR.send(formData);
        });
        
    },
    openModal: (modal) => {
        let modalWrap = document.querySelector('.modal-wrap');
        let allModals = document.getElementsByClassName('modal');
        Array.prototype.forEach.call(allModals, element => {
            element.style.display = 'none';
        });
        modalWrap.style.display = 'block';
        modal.style.display = 'block';
        setTimeout(() => {modalWrap.style.opacity = 1;}, 50);
        setTimeout(() => {modal.classList.add('visible');}, 150);
    },
    closeModal: (modal) => {
        let modalWrap = document.querySelector('.modal-wrap');
        modal.classList.remove('visible');
        setTimeout(() => {modalWrap.style.opacity = 0;}, 100);
        setTimeout(() => {modalWrap.style.display = 'none';}, 200);
    }
};