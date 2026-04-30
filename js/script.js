"use strict"

const viberBtn = document.createElement("a");

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

viberBtn.href = isMobile 
  ? "viber://chat?number=%2B380936004875"
  : "https://invite.viber.com/?number=%2B380936004875";

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

// ОФІЦІЙНА іконка (точно як у Viber)
const img = document.createElement("img");
img.src = "https://cdn-icons-png.flaticon.com/512/733/733585.png";
img.style.width = "32px";
img.style.height = "32px";

viberBtn.appendChild(img);
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

//popup
const btn = document.createElement("div");
btn.innerHTML = "✉️";

Object.assign(btn.style, {
  position: "fixed",
  bottom: "120px",
  right: "20px",
  width: "65px",
  height: "65px",
  background: "linear-gradient(135deg,#0088cc,#00c6ff)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "28px",
  cursor: "pointer",
  zIndex: "999",
  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
  transition: "0.3s"
});

btn.onmouseover = () => btn.style.transform = "scale(1.1)";
btn.onmouseout = () => btn.style.transform = "scale(1)";

document.body.appendChild(btn);

// ---------- POPUP ----------
const popup = document.createElement("div");

popup.innerHTML = `
<div id="popup-bg" style="
position:fixed;
top:0;left:0;width:100%;height:100%;
background:rgba(0,0,0,0.6);
display:none;
align-items:center;
justify-content:center;
z-index:1000;
">

<div style="
background:white;
padding:25px;
border-radius:15px;
width:320px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
animation:fadeIn 0.3s;
">

<h2 style="margin-bottom:10px;">Залиш заявку</h2>
<p style="font-size:14px;color:#666;">Ми зв’яжемось з вами</p>

<input id="name" placeholder="Ім'я" style="
width:100%;
margin:8px 0;
padding:10px;
border-radius:8px;
border:1px solid #ccc;
">

<input id="phone" placeholder="Телефон" style="
width:100%;
margin:8px 0;
padding:10px;
border-radius:8px;
border:1px solid #ccc;
">

<button id="sendBtn" style="
margin-top:10px;
padding:12px;
width:100%;
background:linear-gradient(135deg,#0088cc,#00c6ff);
color:white;
border:none;
border-radius:8px;
font-size:16px;
cursor:pointer;
">
Відправити
</button>

<p id="status" style="margin-top:10px;font-size:14px;"></p>

<button onclick="document.getElementById('popup-bg').style.display='none'" 
style="margin-top:10px;background:none;border:none;color:#888;cursor:pointer;">
Закрити
</button>

</div>
</div>

<style>
@keyframes fadeIn {
  from {opacity:0; transform:scale(0.9);}
  to {opacity:1; transform:scale(1);}
}
</style>
`;

document.body.appendChild(popup);

// ---------- ВІДКРИТИ ----------
btn.onclick = () => {
  document.getElementById("popup-bg").style.display = "flex";
};

// ---------- ВІДПРАВКА ----------
document.addEventListener("click", async function(e){
  if(e.target.id === "sendBtn"){

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const status = document.getElementById("status");

    // перевірка
    if(!name || !phone){
      status.innerText = "Заповніть всі поля!";
      status.style.color = "red";
      return;
    }

    status.innerText = "Відправка...";
    status.style.color = "black";

    try {
      await fetch("https://api.telegram.org/botTOKEN/sendMessage", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: "CHAT_ID",
          text: `🔔 Нова заявка\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}`
        })
      });

      status.innerText = "✅ Відправлено!";
      status.style.color = "green";

      setTimeout(()=>{
        document.getElementById("popup-bg").style.display = "none";
      },1500);

    } catch {
      status.innerText = "❌ Помилка!";
      status.style.color = "red";
    }
  }
});
//end popup


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


