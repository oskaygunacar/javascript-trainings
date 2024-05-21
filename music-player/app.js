const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const title = document.querySelector('#music-details p.title');
const singer = document.querySelector('#music-details p.singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#current-time');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
const musicListContainer = document.querySelector('ul')


const player = new musicPlayer(musicList);

window.addEventListener('load', () => {
    let music = player.getMusic();
    console.log(music);
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(m) {
    title.innerText = m.getName();
    singer.innerText = m.singer;
    image.src = "img/" +  m.img;
    audio.src =  "mp3/" + m.file;
}

play.addEventListener('click', () => {
    const isMusicPlaying = container.classList.contains('playing');
    isMusicPlaying ? pauseMusic() : playMusic();
    // audio.play();
});

function pauseMusic() {
    audio.pause();
    container.classList.remove('playing');
    play.querySelector('iconify-icon').setAttribute('icon', 'bi:play-fill');
}

function playMusic() {
    audio.play();
    container.classList.add('playing');
    play.querySelector('iconify-icon').setAttribute('icon', 'material-symbols-light:pause-outline');
}

prev.addEventListener('click', () => {
    prevMusic();
    isPlayingNow();
});

next.addEventListener('click', () => {
    nextMusic();
    isPlayingNow();
});

function prevMusic() {
    player.previous(); // Player classını previous metodunu çağırarak bir önceki şarkıya geçiyoruz.
    let music = player.getMusic(); // Bir önceki şarkıya geçtikten sonra tekrar şarkı bilgisini alıyoruz.
    displayMusic(music); // music değişkenine aldığımız yeni şarkı bilgisine de sayfada gösteriyoruz.
    playMusic(); // Şarkıyı çalmaya başlıyoruz.
}

function nextMusic() {
    player.next(); // Player classını next metodunu çağırarak bir sonraki şarkıya geçiyoruz.
    let music = player.getMusic(); // Bir sonraki şarkıya geçtikten sonra tekrar şarkı bilgisini alıyoruz.
    displayMusic(music); // music değişkenine aldığımız yeni şarkı bilgisine de sayfada gösteriyoruz.
    playMusic(); // Şarkıyı çalmaya başlıyoruz.
}

audio.addEventListener('loadedmetadata', () => {
    duration.innerText = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

function calculateTime(seconds) {
    const minute = Math.floor(seconds / 60); // saniyeyi dakikaya çeviriyoruz.
    const second = Math.floor(seconds % 60); // kalan saniyeyi bulmak için bu işlemi yapıyoruz.
    const updatedSecond = second < 10 ? `0${second}` : second; // Eğer saniye 10'dan küçükse başına 0 ekliyoruz. Çünkü zaman kısmında dakikadan sonra : ile ayrılan saniye kısmı 2 haneli olmalı.
    const result = `${minute}:${updatedSecond}`;
    return result;
}

audio.addEventListener('timeupdate', () => {
    // Şarkı çalarken sürekli olarak zamanı güncellemek için timeupdate eventini kullanıyoruz.
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.innerText = calculateTime(progressBar.value);
});

progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
    currentTime.innerText = calculateTime(progressBar.value);
});


// Volumebar'ın değerini değiştirerek sesi ayarlamak için volumeBar elementine input eventini ekliyoruz.
volumeBar.addEventListener('input', (e) => {
    let volumeValue = e.target.value;
    audio.volume = volumeValue / 100;
    if (volumeValue == 0) {
        // Ses eğer 0 ise iconu mute yap, sesi komple sustur ve muteState'i mute yap.
        volume.setAttribute('icon', 'system-uicons:volume-muted');
        muteState = "mute";
        audio.muted = true;
    } else {
        volume.setAttribute('icon', 'mdi:volume-high');
        muteState = "unmute";
        audio.muted = false;
    }
})

let muteState = "unmute"
volume.addEventListener('click', (e) => {
    if (muteState === "unmute") {
        volume.setAttribute('icon', 'system-uicons:volume-muted');
        audio.muted = true;
        muteState = "mute";
        volumeBar.value = 0;
    } else {
        volume.setAttribute('icon', 'mdi:volume-high');
        audio.muted = false;
        muteState = "unmute";
        volumeBar.value = 100;
    }
});

let displayMusicList = (musicList) => {
    for (let i=0; i < musicList.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${musicList[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${musicList[i].file}"></audio>
            </li>
        `
        musicListContainer.insertAdjacentHTML('beforeend', liTag);

        let liAudioDurationSpan = musicListContainer.querySelector(`#music-${i}`);
        let audioTag = musicListContainer.querySelector(`.music-${i}`);

        audioTag.addEventListener('loadeddata', () => {
            liAudioDurationSpan.innerText = calculateTime(audioTag.duration);
        });
    };
};


function selectedMusic(li) {
    let selectedMusicIndex = li.getAttribute('li-index');
    player.index = selectedMusicIndex;
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function isPlayingNow () {
    for (let li of musicListContainer.querySelectorAll('li')) {
        if (li.classList.contains('playing')) {
            li.classList.remove('playing');
        }

        if (li.getAttribute('li-index') == player.index) {
            li.classList.add('playing');
        }
    }
}

audio.addEventListener('ended', () => {
    nextMusic();
    isPlayingNow();
});