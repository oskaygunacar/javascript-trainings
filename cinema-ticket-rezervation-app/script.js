const container = document.querySelector('.container');
const count = document.getElementById('count');
const amounth = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
let price;

organizeSelectedSeats()

function calculateTotal() {
    var selectedSeats = container.querySelectorAll('.seat.selected') // list

    var selectedSeatsArr = [];
    var seatsArr = [];

    //  Bu bölümün altında .forEach() ile selectedSeats ve seats değişkenlerine aldığım nodelist'leri ayrıştırıp direkt array haline getiriyoruz.

    selectedSeats.forEach(function(seat){
        selectedSeatsArr.push(seat)

    })

    seats.forEach(function(seat) {
        seatsArr.push(seat)
    })

    let selectedSeatIndexes = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat)
    })

    var selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amounth.innerText = selectedSeatCount * select.value

    saveToLocalStorage(selectedSeatIndexes)
}

function saveToLocalStorage(data) {
    localStorage.setItem('selectedSeats', JSON.stringify(data));
    localStorage.setItem('selectedMovie', select.selectedIndex)
} 

function organizeSelectedSeats(){
    // JSON.parse kullanarak diziye çeviriyoruz
    let storedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // selectedSeats Array'ini localstorage'den alıp storedSeats değişkenine atıyoruz.
    let movieIndex = localStorage.getItem('selectedMovie')
    
    if (storedSeats !== null && storedSeats.length > 0) {
        for (let index of storedSeats) {
            seats[index].classList.toggle('selected')
        }
    }

    if (movieIndex != null) {
        select.selectedIndex = movieIndex
        calculateTotal()
        
    }
    }

container.addEventListener('click', function(e){
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')

        calculateTotal()
    }

})

select.addEventListener('change', (e)=>{
    calculateTotal()

})