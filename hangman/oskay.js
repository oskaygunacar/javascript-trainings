let userTry = 0;
let keywords = ['python', 'django', 'javascript', 'nodejs', 'hakko', 'hasret']
let keywordsLength = keywords.length
let openedLetters = 0;


function getRandomInt() {
    return Math.floor(Math.random() * keywordsLength);
  }

let keyword = keywords[getRandomInt()]
let keywordSplit = keyword.split('');
let word = document.querySelector('div#word')
let hangmanBodyParts = document.querySelectorAll('.item')

word.innerHTML = ''

// ${keywordSplit[index]}

for (let index=0; index < keywordSplit.length; index++) {
    let itemToAdd = `<div class="letter"></div>`
    word.insertAdjacentHTML("beforeend",itemToAdd);
}


document.addEventListener('keypress', (event)=>{
    let key = event.key;
    if (keywordSplit.includes(key)){
        for(let index in keywordSplit) {
            if ( keywordSplit[index] == key) {
                openedLetters += 1
                word.children[index].innerText = keywordSplit[index]
                if (openedLetters == keywordSplit.length ) {
                    setTimeout(()=>{
                        alert('You won !');
                        location.reload()
                    }, 400)

                }
            }
        }
    } else {
        userTry += 1
        document.querySelector('div#wrong-letters>span').innerText += ` ${key}, `

        if (userTry <= 6) {
            switch(userTry){
                case 1:
                    remover(0);
                    break;
                case 2:
                    remover(1);
                    break;
                case 3:
                    remover(2)
                    break;
                case 4:
                    remover(3)
                    break;
                case 5:
                    remover(4);
                    break;
                case 6:
                    remover(5);
                    alert('Hakkınız Doldu !')
                    setTimeout(()=>{
                        updater()
                    },500)
                     // Kodun bu bölümünde (case 6) kullanıcı 6.cı denemeyide yanlış yapırsa, önce vücudun son parçası görünür oluyor, sonra alert çıkıyor ve alertten 2 saniye sonrasına ayarlı şekilde updater() çalışıyor ve sayfayı yeniliyor.
            }
        }
    }

})

function remover(index){
    hangmanBodyParts[index].classList.remove('item')
}

function updater(){
    location.reload();
}