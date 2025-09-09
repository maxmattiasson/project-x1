const workToggle = document.getElementById('toggle-work');
const schoolToggle = document.getElementById('toggle-school');
const detailToggle = document.getElementById('toggle-details');
const workEl = document.querySelectorAll('.work');
const schoolEl = document.querySelectorAll('.school');
const detailEl = document.querySelectorAll('.details');
const buttonRight = document.getElementById('card-btn-right');
const buttonLeft = document.getElementById('card-btn-left');
const weatherCont = document.querySelector('.weather-content');
const contactBtn = document.querySelector('.call-me');
const contactClose = document.getElementById('contact-close');
const contactDialog = document.getElementById('contact');
const KEY = "b2024be8c564ed764512c35c213e201c";

let currentCompany = 0;


const content = [
    {company: "Cygni", desc: "Konsultbolag med stark utvecklarkultur. Uppdrag i modern JS/TS (React/Node) och mycket fokus på kompetensutveckling", city: "🏢 Östersund"},
    {company: "Sogeti", desc: "Stort konsultnät med trainee/Careerbooster. Bra för att bygga bredd i fullstack JS/Node + moln hos lokala kunder", city: "🏢 Östersund/Sundsvall"},
    {company: "CGI", desc: "Globalt IT-bolag med samhällsnyttiga projekt. Agila team och frontend i JavaScript", city: "🏢 Östersund/Sundsvall"},
    {company: "Startups", desc: "Snabba produktteam där man med stort ansvar kan bygga end-to-end i JS/TS", city: "🏢 Överallt"},
]
getWeatherData();

async function getWeatherData() {
  const lat = 63.1792;
  const lon = 14.63566;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
  try {
    const response = await fetch(url);
    if (!response.ok) {console.log(`${response.status}`)}

    const res = await response.json();

    const temp = Math.round(res.main.temp);
    const weather = res.weather[0].main;
    const desc = res.weather[0].description;
    const icon = res.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const img = document.createElement('img');
    img.src = iconUrl;
    img.alt = desc;

    weatherCont.textContent = `Just nu: Östersund ${temp}°C, ${weather}: ${desc}`
    weatherCont.prepend(img);
  }
  catch (error) {
    console.error(error.message)
  }
}
displayContent();

function toggleWork (){
        workEl.forEach(el => {
            el.classList.toggle('hide')
        })
}

function toggleSchool (){
        schoolEl.forEach(el => {
            el.classList.toggle('hide')
        })
}
function toggleDetails(){
        detailEl.forEach(el => {
        el.classList.toggle('hide')
    })
}
function displayContent(){
  const picked = content[currentCompany];
  document.getElementById('company').textContent = picked.company;
  document.getElementById('card-desc').textContent = picked.desc;
  document.getElementById('card-city').textContent = picked.city;
  }

schoolToggle.addEventListener("change", toggleSchool);
workToggle.addEventListener("change", toggleWork);
detailToggle.addEventListener("change", toggleDetails);

buttonRight.addEventListener('click', () => {
  if (currentCompany === 3) {
    currentCompany = 0
  } else currentCompany++;
    displayContent();
})
buttonLeft.addEventListener('click', () => {

    if (currentCompany === 0) {
    currentCompany = 3
  } else currentCompany--;
    displayContent();
})

contactBtn.addEventListener('click', () => {
  contactDialog.showModal();
});

contactClose.addEventListener('click', () => {
  contactDialog.close();
});

contactDialog.addEventListener('click', e => {
  const rect = contactDialog.getBoundingClientRect();
  if (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  ) {
    contactDialog.close();
  }
});
