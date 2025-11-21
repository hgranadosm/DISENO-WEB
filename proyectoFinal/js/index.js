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

if (audio) {
    audio.addEventListener('ended', function() {
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
        btnText.textContent = 'Entrar con música';
        isPlaying = false;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    
    const galeriaImages = document.querySelectorAll('.galeria-img');
    const galeriaOverlays = document.querySelectorAll('.galeria-overlay');
    
    let currentImageIndex = 0;
    let imagesData = [];
    
    if (galeriaImages.length > 0) {
        galeriaImages.forEach((img, index) => {
            imagesData.push({
                src: img.src,
                alt: img.alt,
                caption: img.alt || `Imagen ${index + 1}`
            });
        });
        
        function openLightbox(index) {
            currentImageIndex = index;
            updateLightboxImage();
            lightboxModal.style.display = 'flex';
            setTimeout(() => {
                lightboxModal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightboxModal.classList.remove('active');
            setTimeout(() => {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
        
        function updateLightboxImage() {
            const currentImage = imagesData[currentImageIndex];
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;
            lightboxCaption.textContent = currentImage.caption;
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${imagesData.length}`;
        }
        
        function prevImage() {
            currentImageIndex = currentImageIndex === 0 ? imagesData.length - 1 : currentImageIndex - 1;
            updateLightboxImage();
        }
        
        function nextImage() {
            currentImageIndex = currentImageIndex === imagesData.length - 1 ? 0 : currentImageIndex + 1;
            updateLightboxImage();
        }
        
        galeriaOverlays.forEach((overlay, index) => {
            overlay.addEventListener('click', () => {
                openLightbox(index);
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', prevImage);
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', nextImage);
        }
        
        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', closeLightbox);
        }
        
        document.addEventListener('keydown', function(e) {
            if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        });
        
        if (lightboxModal) {
            lightboxModal.addEventListener('touchmove', function(e) {
                if (lightboxModal.classList.contains('active')) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }
});