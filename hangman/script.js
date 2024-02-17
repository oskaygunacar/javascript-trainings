 const word_el = document.getElementById('word');
 const popup = document.getElementById('popup-container');
 const message_el = document.getElementById('succes-message');
 const wrongLetters_element = document.getElementById('wrong-letters');
 const items = document.querySelectorAll('.item');
 const message = document.getElementById('message');
 const playAgain = document.getElementById('play-again');

 const correctLetters = [];
 const wrongLetters = []
 let selectedWord = getRandomWord();


 function getRandomWord() {
    const words = ['javascript', 'java', 'python']
    return words[Math.floor(Math.random() * words.length)]
 }


 function displayWord(){
    word_el.innerHTML = `
    ${selectedWord.split('').map(letter => `<div class="letter">${correctLetters.includes(letter) ? letter : ''}</div>`).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g, '')
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = "Congrats You've Won"
    }
 }

 function updateWrongLetters(){
   wrongLetters_element.innerHTML = `
      ${wrongLetters.length>0  ? '<h3>Wrong Letters</h3>':''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
   `;
 
   items.forEach((item,index)=> {
      const errorCount = wrongLetters.length;

      if (index < errorCount) {
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
   })

   if (wrongLetters.length === items.length) {
      popup.style.display = 'flex';
      popup.style.backgroundColor = 'red';
      message_el.innerText = 'Game over!';
      
   }
  
 }

function displayMessage(){
   message.classList.add('show');

   setTimeout(()=>{
      message.classList.remove('show')
   },2000)
}

 window.addEventListener('keydown', function(e){
   if (e.keyCode >= 65 && e.keyCode <= 90){ // harf dışındaki keyleri (control, space vb.) dışarı bırakmak için.
      const letter = e.key; 

      if (selectedWord.includes(letter)) {
         if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
         } else {
            displayMessage();
         }
      } else {
         if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
         } else {
            displayMessage();
         }
      }
   }
 })

 playAgain.addEventListener('click', ()=>{
   correctLetters.splice(0);
   wrongLetters.splice(0);
   selectedWord = getRandomWord();
   displayWord();
   updateWrongLetters();
   popup.style.display = 'none';
 })

 displayWord();