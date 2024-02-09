var models = [
    {
      name:'Javascript',
      image:'img/js.png',
      link:'https://www.dijitalzade.com/javascript/',
    },
    {
      name:'Python',
      image:'img/python-logo.png',
      link:'https://www.dijitalzade.com/python/',
    },
    {
        name:'Vs Code',
        image:'img/vscode.png',
        link:'https://www.dijitalzade.com/vscode/',
      },
      {
        name:'X',
        image:'img/x.jpeg',
        link:'https://www.dijitalzade.com/x/',
      },
      {
        name:'Youtube',
        image:'img/youtube.png',
        link:'https://www.dijitalzade.com/youtube',
      },  

]

var index=0;

init();

//  ALttaki 2 selector ile sol ve sağ arrow'lara click eventini dinleme özelliği ekledik. Sol arrow'a basılınca index küçülüyor sağa basılınca index büyüyor.
document.querySelector('.card-footer').children[0].addEventListener('click', ()=>{
  index--;
  updateSlider();
})

document.querySelector('.card-footer').children[1].addEventListener('click', ()=>{
  index ++;
  updateSlider();
})


function updateSlider() {

    if (index < 0 ) {
      index = models.length -1;
    } else if (index >= models.length) {
      index = 0;
    }

    console.log(index)

  document.querySelector('.card-title').innerText = models[index].name;
  document.querySelector('.card-img-top').setAttribute('src', models[index].image);
  document.querySelector('.card-link').setAttribute('href', models[index].link);
}

//  Her 2 saniyede 2000 ms bir slider'ın otomatik olarak artan şekilde hareket etmesini sağlamak için aşağıdaki fonksiyonu (init) yazdık.

var interval;

function init(){
  interval = setInterval(()=>{
    index ++
    updateSlider();  
  }, 2000)
}

// Aşağıdaki döngü ile arrow'lara event listenerlar eklenir. Buna göre arrow'ların üstüne gelince üstteki interval durdurulur, üstünden mouse uzaklaştırılınca interval tekrar çalıştırılır.


for (let arrow of document.querySelector('.card-footer').children ) {
  arrow.addEventListener('mouseover', ()=>{
    clearInterval(interval)
  })

  arrow.addEventListener('mouseleave', ()=>{
    init();
  })

}
