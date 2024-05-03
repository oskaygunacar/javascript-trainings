// OOP: Nesne Tabanlı Programlama

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap
}

let sorular = [
    new Soru("1-Pelge ailesi kaç kişiden oluşmaktadır?", { a: "4", b: "2", c: "7" , d: "9" }, "c"),
    new Soru("2-Mööö deyince aklınıza kim geliyor?", { a: "Hasiret Pelge", b: "Ali Pelge", c: "Oskay Günaçar", d:'Nazar Pelge' }, "d"),
    new Soru("3-Hasiret Pelge büyüyünce ne olcek?", { a: "Media Markt Kırmızılı", b: "Doktor", c: "Avukat" }, "c"),
    new Soru("4-Hasiret Pelge'nin lakabı nedir?", { a: "Hasiret", b: "Fazilet", c: "Gurubet", d:'Cevidet', e:'Matik' }, "e"),
    new Soru("5- 9x8 kaçtır?", { a: "102", b: "12", c: "56", d:'72', e:'74' }, "d"),
    new Soru("6- Poşet ver lan repliğinin sahibi kimdir?", { a: "Selma Pelge", b: "Mahmut Pelge", c: "Osman Günaçar", d:'Ali Pelge', e:'Hasiret Pelge' }, "d"),
];
