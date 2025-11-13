// Audio control para Glow Spa
let isPlaying = false;
const audio = document.getElementById('backgroundAudio');
const audioIcon = document.querySelector('.audio-icon');
const btnText = document.querySelector('.btn-text');

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
        btnText.textContent = 'Entrar con música';
        isPlaying = false;
    } else {
        audio.play().catch(function(error) {
            console.log('Error al reproducir audio:', error);
            alert('No se pudo reproducir el audio. Asegúrate de que el archivo existe.');
        });
        audioIcon.classList.remove('fa-play');
        audioIcon.classList.add('fa-pause');
        btnText.textContent = 'Pausar música';
        isPlaying = true;
    }
}

audio.addEventListener('ended', function() {
    audioIcon.classList.remove('fa-pause');
    audioIcon.classList.add('fa-play');
    btnText.textContent = 'Entrar con música';
    isPlaying = false;
});