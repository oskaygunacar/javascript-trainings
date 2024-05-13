const player = new MusicPlayer(musicList);

const music = player.getMusic();

console.log(music.getName());
player.next();