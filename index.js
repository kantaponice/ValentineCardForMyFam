$(document).ready(function() {
    // ซ่อน letter ตั้งแต่เริ่มต้น
    $('.letter').removeClass('show active').hide();
    $('.image').removeClass('active').hide();
    
    function createFloatingHeart() {
        const heart = $('<div>❤</div>').addClass('floating-heart');
        heart.css({
            left: Math.random() * window.innerWidth + 'px',
            animationDuration: (Math.random() * 4 + 4) + 's'
        });
        $('body').append(heart);
        setTimeout(() => heart.remove(), 6000);
    }

    setInterval(createFloatingHeart, 2000);

    let isOpen = false;

    $('#open').click(function() {
        if (!isOpen) {
            $('#envelope').addClass('exploded');
            setTimeout(function() {
                $('.letter').show().addClass('show active');
            }, 300);
            isOpen = true;
        }
    });

    $('#reset').click(function() {
        $('.letter').removeClass('show active').hide();
        $('.image').removeClass('active').hide();
        
        currentImageIndex = 0;
        
        setTimeout(function() {
            $('#envelope').removeClass('exploded');
        }, 300);
        
        isOpen = false;
    });

    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false;

    // ฟังก์ชันเริ่มเล่นเพลง
    function playMusic() {
        let playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicToggle.innerHTML = '⏸';
            }).catch(error => {
                isMusicPlaying = false;
                musicToggle.innerHTML = '♪';
            });
        }
    }

    // เพิ่มการตรวจจับการโต้ตอบของผู้ใช้
    function initAudioPlayback() {
        const startPlayback = () => {
            playMusic();
            // ลบ event listeners หลังจากเริ่มเล่นเพลงสำเร็จ
            document.removeEventListener('click', startPlayback);
            document.removeEventListener('touchstart', startPlayback);
            document.removeEventListener('keydown', startPlayback);
        };

        // เพิ่ม event listeners สำหรับการโต้ตอบแบบต่างๆ
        document.addEventListener('click', startPlayback);
        document.addEventListener('touchstart', startPlayback);
        document.addEventListener('keydown', startPlayback);
    }

    // พยายามเล่นเพลงตั้งแต่เริ่มต้น
    playMusic();
    
    // ถ้าไม่สามารถเล่นได้ ให้รอการโต้ตอบจากผู้ใช้
    if (!isMusicPlaying) {
        initAudioPlayback();
    }

    // ปุ่มควบคุมการเล่น/หยุดเพลง
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // ป้องกันการ trigger event ซ้ำ
        
        if (isMusicPlaying) {
            music.pause();
            musicToggle.innerHTML = '♪';
            isMusicPlaying = false;
        } else {
            playMusic();
        }
    });

    // จัดการกรณีเพลงเล่นจบ (ถ้าไม่ได้ตั้ง loop)
    music.addEventListener('ended', () => {
        isMusicPlaying = false;
        musicToggle.innerHTML = '♪';
    });

    // จัดการกรณีเกิดข้อผิดพลาดในการเล่นเพลง
    music.addEventListener('error', () => {
        isMusicPlaying = false;
        musicToggle.innerHTML = '♪';
        console.log('Error playing audio');
    });

    $('.heart').hover(
        function() {
            $(this).css('transform', 'rotate(45deg) scale(1.1)');
        },
        function() {
            $(this).css('transform', 'rotate(45deg) scale(1)');
        }
    );
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.image');

function swapContent() {
    if (document.querySelector('.letter.active')) {
        document.querySelector('.letter').classList.remove('active');
        document.querySelector('.letter').style.display = 'none';
        images[currentImageIndex].style.display = 'block';
        images[currentImageIndex].classList.add('active');
    } else {
        images.forEach(image => {
            image.classList.remove('active');
            image.style.display = 'none';
        });
        
        currentImageIndex = (currentImageIndex + 1) % images.length;
        if (currentImageIndex === 0) {
            document.querySelector('.letter').style.display = 'block';
            document.querySelector('.letter').classList.add('active');
        } else {
            images[currentImageIndex].style.display = 'block';
            images[currentImageIndex].classList.add('active');
        }
    }
}

// เพิ่มต่อจาก JavaScript เดิม
function createHearts() {
    const container = document.createElement('div');
    container.className = 'heart-container';
    document.body.appendChild(container);

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        
        // สุ่มค่าต่างๆ
        const size = Math.random() * 20 + 10; // 10-30px
        const startX = Math.random() * window.innerWidth;
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = -Math.random() * 200 - 100;
        const duration = Math.random() * 4 + 3; // 3-7s
        
        heart.style.cssText = `
            --size: ${size}px;
            --duration: ${duration}s;
            --moveX: ${moveX}px;
            --moveY: ${moveY}px;
            left: ${startX}px;
            bottom: 0;
        `;
        
        container.appendChild(heart);
        
        // ลบหัวใจหลังจากแอนิเมชันเสร็จ
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 200); // สร้างหัวใจทุกๆ 200ms
}

// เรียกใช้งานฟังก์ชัน
createHearts();