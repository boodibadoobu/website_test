const mainContainer = document.querySelector(".main-container"),
    imagePreview = mainContainer.querySelectorAll(".image-preview"),
    images = mainContainer.querySelectorAll(".image-preview img"),
    video = mainContainer.querySelectorAll("video");

let fadeInInProgress = new Array(video.length).fill(false);

window.onload = () => {
    mainContainer.onmouseenter = () => {
        images.forEach((image) => {
            image.style.opacity = 0.5;
        });
    };
    
    mainContainer.onmouseleave = () => {
        images.forEach((image) => {
            image.style.opacity = 1;
        });
    };

    let tl = gsap.timeline();

    tl.to(imagePreview, {
        duration: 1,
        clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
        stagger: 0.1
    });

    imagePreview.forEach((image, index) => {
        image.onmouseenter = () => {
            video[index].play();
            fadeInAudio(video[index], index);
        };    
        image.onmouseleave = () => {
            video[index].pause(); 
            video[index].currentTime = 0; 
        };    
    });

    function fadeInAudio(video, index) {
        if (fadeInInProgress[index]) return; 
        fadeInInProgress[index] = true; 

        let volume = 0;
        video.volume = 0; 
        
        function increaseVolume() {
            if (volume < 1) {
                volume += 0.005;
                video.volume = volume.toFixed(2);
                requestAnimationFrame(increaseVolume); 
            } else {
                fadeInInProgress[index] = false;
            }
        }
        
        increaseVolume();
    }

    function updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        };
        document.querySelector('.date-time').textContent = now.toLocaleString('en-US', options);
    }

    setInterval(updateDateTime, 1000); 
    updateDateTime();
}
