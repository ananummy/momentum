// часы и календарь 

const time = document.querySelector('.time')
const dateLine = document.querySelector('.date')
const date = new Date()

function showDate() {
    const currentDate = new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'})
    dateLine.textContent = currentDate
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString([], {hour: 'numeric', minute: 'numeric', second: 'numeric'})
    setTimeout(showTime, 1000)
    showDate()
}

showTime()


// приветствие

const greetingText = document.querySelector('.greeting')
const hours = date.getHours()
const userName = document.querySelector('.name')

function getTimeOfDay() {   
    switch (hours) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return "night"
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return "morning"
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            return "afternoon"
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            return "evening"
    }
}

const timeOfDay = getTimeOfDay()

function showGreeting() {
    greetingText.textContent = `Good ${timeOfDay},`
    function setLocalStorage() {
        localStorage.setItem('name', userName.value);
    }
    window.addEventListener('beforeunload', setLocalStorage)
    
    function getLocalStorage() {
        if(localStorage.getItem('name')) {
          userName.value = localStorage.getItem('name');
        }
    }
    window.addEventListener('load', getLocalStorage)
}

showGreeting()

// слайдер изображений 

function getRandomNum(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const body = document.querySelector('.body-bg')
const bgNum = getRandomNum(1, 20)
let randomNum = bgNum

function setBg() {
    const img = new Image()
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${String(randomNum).padStart(2,"0")}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${String(randomNum).padStart(2,"0")}.jpg')`
    }
}

setBg()


function getSlideNext() {
    if (1 <= randomNum <= 20) {
        randomNum = randomNum + 1
    }
       
    if (randomNum === 21) {
        randomNum = 1
    }

    setBg()
}

function getSlidePrev() {
    if (20 >= randomNum >= 1) {
        randomNum = randomNum - 1
    }

    if (randomNum === 0) {
        randomNum = 20
    }

    setBg()
}

const nextSlide = document.querySelector('.slide-next')
nextSlide.addEventListener('click', getSlideNext)

const prevSlide = document.querySelector('.slide-prev')
prevSlide.addEventListener('click', getSlidePrev)

//цитата 

const quoteText = document.querySelector('.quote')
const quoteAuthor = document.querySelector('.author')

async function getQuotes() {  
    let quoteIndex = 0
    function getRandomIndex() {
        quoteIndex = Math.random() * (22 - 1) + 1;
        quoteIndex = Math.round(quoteIndex)
        return Number(quoteIndex)
    }
    const resQuote = getRandomIndex()

    const quotes = 'data.json'
    const res = await fetch(quotes)
    const data = await res.json()
    quoteText.textContent = `${data[resQuote].text}`
    quoteAuthor.textContent = `${data[resQuote].author}`
}
getQuotes()

document.querySelector('.change-quote').addEventListener('click', getQuotes)


let quoteIndex = 0
function qetRandomIndex() {
    quoteIndex = Math.random() * (255 - 1) + 1;
    quoteIndex = Math.round(quoteIndex)
    return Number(quoteIndex)
}



// погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const myCity = document.querySelector('.city');
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity.value}&lang=en&appid=53d7e2242bf0e8dc1c278aee353256a0&units=metric`
    const res = await fetch(url)
    const data = await res.json()
    
    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `Wind speed ${data.wind.speed}m/s`
    humidity.textContent = `Humidity ${data.main.humidity}%`
}

function cityName() {
    function setCity(event) {
        if (event.code === 'Enter') {
            getWeather()
            myCity.blur()
            localStorage.setItem('city', myCity.value)
        }
    }
    
    function getCity() {
        if(localStorage.getItem('city')) {
          myCity.value = localStorage.getItem('city')
          getWeather()
        }
    }
    
    window.addEventListener('load', getCity)
    window.addEventListener('beforeunload', setCity)
    myCity.addEventListener('keypress', setCity)
}
cityName()


document.addEventListener('DOMContentLoaded', getWeather)

//аудио

const prevAudio = document.querySelector('.play-prev')
const nextAudio = document.querySelector('.play-next')
const playButton = document.querySelector('.play')
const playListContainer = document.querySelector('.play-list')
let playNum = 0
import playList from "./playList.js"


for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li')
    playListContainer.append(li)
    li.classList.add("play-item")
    li.textContent = playList[i].title
}

const audio = new Audio

let isPlay = false
function playAudio() {
    audio.src = playList[playNum].src
    audio.currentTime = 0
    if (!isPlay) {
        audio.play()
        isPlay = true
    } else {
        audio.pause()
        isPlay = false
    }
}

audio.addEventListener('ended', function(){
    playNext()
    playAudio()
    toggleBtn()
})

function toggleBtn() {
    playButton.classList.toggle('pause')
}

playButton.addEventListener('click', toggleBtn)
playButton.addEventListener('click', playAudio)


function playPrev() {
    if (playNum === 0) {
        playNum = playList.length - 1
    } else playNum = playNum - 1
    playAudio()
    toggleBtn()
}
prevAudio.addEventListener('click', playPrev)

function playNext() {
    playNum = playNum + 1
    if (playNum === playList.length) {
        playNum = 0
    }
    playAudio()
    toggleBtn()
}
nextAudio.addEventListener('click', playNext)

// поп ап

const toDoList = document.querySelector('.to-do_list')
const toDoBtn = document.querySelector('.to-do_title')
const exit = document.querySelector('.exit')

toDoBtn.addEventListener('click', () => {
    toDoList.classList.toggle('active-popup')
})

exit.addEventListener('click', () => {
    toDoList.classList.toggle('active-popup')
})

const task = document.querySelectorAll('.to-do_item')

function setTask(event) {
    if (event.code === 'Enter') {
        localStorage.setItem('to-do_item', task.value)
    }
}
window.addEventListener('beforeunload', setTask)

function getTask() {
    if(localStorage.setItem('to-do_item')) {
        task.value = localStorage.getItem('to-do_item')
    }
}
window.addEventListener('load', getTask)
task.addEventListener('keypress', setTask)



