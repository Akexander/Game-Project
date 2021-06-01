
// const that is collecting API URL
const Random_Quote_API_URL = 'http://api.quotable.io/random'
// const that will render HTML to quote display
const quoteDisplayElement = document.getElementById('quoteDisplay')
// const that will collect HTML to quote input
const quoteInputElement = document.getElementById('quoteInput')
// const that will render timmer to the HTML
const timerElement = document.getElementById('timer') 

// EventListener is to log changes/recognise activity
quoteInputElement.addEventListener('input', () => {
   const arrayQuote = quoteDisplayElement.querySelectorAll('span')
   const arrayValue = quoteInputElement.value.split('')

  //    This forEach is designed to register/log  the letters as correct or incorrect
   let correct = true //Stating by default that everything is true
   arrayQuote.forEach((characterSpan, index) => {
     const character = arrayValue[index] //This will match the characters typed to the characters in the quote
     if (character === null) { //null means that the character has not been typed yet
       characterSpan.classList.remove('correct')
       characterSpan.classList.remove('incorrect')
       correct = false //Stating false because player has not activated it 
     } else if (character === characterSpan.innerText) {
       characterSpan.classList.add('correct') 
       characterSpan.classList.remove('incorrect')
     } else { //if they are not equal to each other
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false //Stating false because player has typed incorrectly 
     }
   })
   if (correct) renderNewQuote() //If all is correct/true add new quote
   })

  //  This fetch function calls the API
function getRandomQuote() {
  return fetch(Random_Quote_API_URL)
  .then(response => response.json())
  .then(data => data.content)
}

// Asynchronous function will run out of sync with the rest of the code
async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = '' //insert quote into quote input
  quote.split('').forEach(character => {   //forLoop separates each letter
    const characterSpan = document.createElement('span') //captures each individual letter and gives it a span
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })

  quoteInputElement.value = null //Clears the input box
  startTimer() //Will refresh timer
}

// Timer function
let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date() //Links timer to computer clock
  setInterval(() => {
    getTimerTime()
    timerElement.innerText = getTimerTime()
  },1000) //Timer is not 100% accurate so is linked to computer clock
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000) //MATH.FLOOR will round down -> Start time is always accurate 
}


renderNewQuote()
