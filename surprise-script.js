// ===== CONFIGURATION =====
const CLICKS_TO_POP = 5; // Number of clicks before button pops
let clickCount = 0;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    initializeBackgroundHearts();
    initializeSurpriseButton();
});

// ===== BACKGROUND HEARTS =====
function initializeBackgroundHearts() {
    const heartsContainer = document.getElementById('bgHearts');

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.textContent = '💕';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 20 + 's';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// ===== SURPRISE BUTTON INTERACTION =====
function initializeSurpriseButton() {
    const button = document.getElementById('surpriseButton');
    const counter = document.getElementById('clickCounter');
    const popSound = document.getElementById('popSound');

    button.addEventListener('click', function () {
        clickCount++;

        // Play pop sound
        playPopSound();

        // Update counter text
        updateCounter(counter, clickCount);

        // Remove previous grow classes
        button.classList.remove('grow-1', 'grow-2', 'grow-3', 'grow-4', 'grow-final');

        // Add appropriate grow class
        if (clickCount === 1) {
            button.classList.add('grow-1');
        } else if (clickCount === 2) {
            button.classList.add('grow-2');
        } else if (clickCount === 3) {
            button.classList.add('grow-3');
        } else if (clickCount === 4) {
            button.classList.add('grow-4');
        } else if (clickCount >= CLICKS_TO_POP) {
            button.classList.add('grow-final');
            // Trigger the pop!
            setTimeout(() => {
                triggerPop();
            }, 300);
        }

        // Add bounce effect
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = '';
        }, 10);
    });
}

function updateCounter(counter, count) {
    const remaining = CLICKS_TO_POP - count;
    if (remaining > 0) {
        counter.textContent = `${remaining} more click${remaining > 1 ? 's' : ''}!`;
    } else {
        counter.textContent = 'Get ready! 🎉';
    }
}

function playPopSound() {
    const popSound = document.getElementById('popSound');
    popSound.currentTime = 0;
    popSound.play().catch(() => {
        // Silently fail if audio doesn't play
    });
}

// ===== POP EXPLOSION =====
function triggerPop() {
    const button = document.getElementById('surpriseButton');
    const initialScreen = document.getElementById('initialScreen');

    // Add popping animation
    button.classList.add('popping');

    // Create heart burst
    setTimeout(() => {
        createHeartBurst();
        createConfettiBurst();
        createSparkles();
    }, 300);

    // Hide initial screen
    setTimeout(() => {
        initialScreen.classList.add('hidden');
        document.body.classList.add('bright');
    }, 800);

    // Show popup cards
    setTimeout(() => {
        showPopupCards();
    }, 1200);
}

// ===== HEART BURST =====
function createHeartBurst() {
    const container = document.getElementById('heartsBurst');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '💗'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'burst-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            // Random direction
            const angle = (Math.PI * 2 * i) / 40;
            const distance = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            heart.style.animationDelay = (i * 0.02) + 's';

            container.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 20);
    }
}

// ===== CONFETTI BURST =====
function createConfettiBurst() {
    const container = document.getElementById('confettiBurst');
    const colors = ['#FFB6C1', '#FFD1DC', '#FFDAB9', '#FFCBA4', '#FFF', '#FF69B4'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'burst-confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 400;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            confetti.style.left = centerX + 'px';
            confetti.style.top = centerY + 'px';
            confetti.style.setProperty('--tx', tx + 'px');
            confetti.style.setProperty('--ty', ty + 'px');
            confetti.style.animationDelay = (i * 0.01) + 's';

            container.appendChild(confetti);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 2500);
        }, i * 15);
    }
}

// ===== SPARKLES =====
function createSparkles() {
    const container = document.getElementById('celebrationSparkles');
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✨'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = (i * 0.05) + 's';

            container.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }, i * 50);
    }
}

// ===== POPUP CARDS =====
function showPopupCards() {
    const cardMain = document.getElementById('cardMain');

    // Show main card
    setTimeout(() => {
        cardMain.classList.add('show');
    }, 100);

    // Continue sparkles
    setInterval(() => {
        createContinuousSparkles();
    }, 2000);
}

// ===== CONTINUOUS SPARKLES =====
function createContinuousSparkles() {
    const container = document.getElementById('celebrationSparkles');
    const sparkleEmojis = ['✨', '⭐', '💫'];

    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}

// ===== MOBILE TOUCH SUPPORT =====
if ('ontouchstart' in window) {
    const button = document.getElementById('surpriseButton');
    button.addEventListener('touchstart', function (e) {
        e.preventDefault();
        this.click();
    });
}
