let ui = new UI();

ui.btn_start.addEventListener("click", function() {
    ui.quiz_box.classList.add("active");
    clearInterval(counter);
    startTimer(10);
    startTimerLine();
    ui.soruGoster(quiz.soruGetir());
    ui.questionCounter(quiz.soruIndex +1)
    ui.btn_next.classList.remove("show");
})

ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        startTimer(10);
        startTimerLine();
        ui.questionCounter(quiz.soruIndex+1)
        ui.soruGoster(quiz.soruGetir());
        ui.btn_next.classList.remove("show");
    } else {
        clearInterval(counter);
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi)
        ui.quiz_box.classList.remove('active');
        ui.score_box.classList.add('active');
    }
});


function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi +=1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for(let i=0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.btn_next.classList.add("show");
}

ui.btn_quit.addEventListener('click',()=>{
    window.location.reload();
})

ui.btn_replay.addEventListener('click', ()=>{
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove('active');
})

let counter;
function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        ui.time_second.textContent = time;
        time--;
        if (time < 0 ) {
            clearInterval(counter)
            ui.time_text.innerText = 'Süre Bitti:'
            let cevap = quiz.soruGetir().dogruCevap;
            document.querySelectorAll('.option span').forEach((option)=>{
                if (option.innerText.split(':')[0] == cevap) {
                    option.parentElement.classList.add('correct')
                }
                option.parentElement.classList.add('disabled')
            })
            ui.btn_next.classList.add('show');
        }
    }
}

let counterLine;
function startTimerLine(){
    let line_width = 0;
    counterLine = setInterval(timer, 100);

    function timer(){
        line_width += 5;
        ui.time_line.style.width = line_width + "px";

        if (line_width > 549) {
            clearInterval(counterLine);
        }
    }
}