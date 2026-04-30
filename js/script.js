"use strict"

const viberBtn = document.createElement("a");

// важливо: правильний лінк для відкриття додатку
viberBtn.href = "viber://chat?number=%2B380936004875";
viberBtn.target = "_blank";

Object.assign(viberBtn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "60px",
  height: "60px",
  background: "#7360F2",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  zIndex: "999",
  cursor: "pointer"
});

// рівна SVG іконка (центрується і не “крива”)
viberBtn.innerHTML = `
<svg viewBox="0 0 32 32" width="28" height="28" fill="white">
<path d="M16 2C8.268 2 2 7.82 2 14.99c0 3.49 1.64 6.67 4.34 9.01-.19 1.53-.7 3.93-1.48 5.77-.15.36.24.7.6.54 1.99-.85 4.4-2.02 5.92-2.84.73.17 1.5.26 2.29.26 7.732 0 14-5.82 14-12.99S23.732 2 16 2zm4.72 16.72c-.34.34-.8.52-1.28.52s-.94-.18-1.28-.52l-2.56-2.56c-.34-.34-.52-.8-.52-1.28s.18-.94.52-1.28c.34-.34.8-.52 1.28-.52s.94.18 1.28.52l2.56 2.56c.34.34.52.8.52 1.28s-.18.94-.52 1.28z"/>
</svg>
`;

document.body.appendChild(viberBtn);

// hover
viberBtn.onmouseover = () => viberBtn.style.transform = "scale(1.1)";
viberBtn.onmouseout = () => viberBtn.style.transform = "scale(1)";



const menuBtn = document.querySelector('.menu-btn');
let mobMenu = document.querySelector('.mob-menu');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }

    if (menuBtn.classList.contains('open')) {
        mobMenu.classList.add('active');
        browserWidth()


    } else {
        mobMenu.classList.remove('active');

    }


});


function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();


const navLink = document.querySelectorAll('.nav-menu__list li a');
console.log(navLink);

navLink.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault()
        if (menuBtn.classList.contains('open') && mobMenu.classList.contains('active')) {
            mobMenu.classList.remove('active');
            menuBtn.classList.remove('open');
        }
        const blockId = item.getAttribute('href').substr(1)
        document.getElementById(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })


})
;



const review = new Swiper('.review__container-slider', {
    wrapperClass: 'review__wrapper',
    // Optional parameters
    autoplay: {
        delay: 2500,
    },
    slidesPerView: 1,
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    speed: 900,
});


