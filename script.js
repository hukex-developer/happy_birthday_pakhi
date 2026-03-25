document.addEventListener('DOMContentLoaded', () => {
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');
    const cutCakeBtn = document.getElementById('cutCakeBtn');
    const flames = document.querySelectorAll('.flame');
    const knife = document.getElementById('knife');
    const cake = document.getElementById('cake');
    const message = document.getElementById('message');
    const cakeContainer = document.getElementById('cakeContainer');

    // Clone cake for smooth slicing
    const cakeRight = cake.cloneNode(true);
    cakeRight.id = 'cakeRight';
    cakeRight.className = 'cake-half-right';
    cakeContainer.appendChild(cakeRight);

    // Initialize decorative elements
    createParticles();
    createFloatingHearts();

    // Button Glow Effect Tracking
    const buttons = document.querySelectorAll('.premium-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });
    });

    // Blowing Candles
    blowCandlesBtn.addEventListener('click', () => {
        // Smoke effect
        flames.forEach(flame => {
            const smoke = document.createElement('div');
            smoke.classList.add('candle-smoke');
            flame.parentElement.appendChild(smoke);
            flame.classList.add('out');
        });

        // Add satisfying click animation
        blowCandlesBtn.style.transform = 'scale(0.95)';
        setTimeout(() => blowCandlesBtn.classList.add('hidden'), 200);

        // Show cut cake button after a tiny delay
        setTimeout(() => {
            cutCakeBtn.classList.remove('hidden');
            cutCakeBtn.style.animation = 'fadeInUp 0.5s ease-out forwards';

            // Sweet magical spark
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.65 },
                colors: ['#ffd166', '#ffffff', '#ff97b7'],
                disableForReducedMotion: true
            });
        }, 1200);
    });

    // Cutting the Cake
    cutCakeBtn.addEventListener('click', () => {
        cutCakeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => cutCakeBtn.classList.add('hidden'), 200);

        // Trigger knife drop
        knife.style.animation = 'cutAction 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';

        // Split the cake midway through knife animation
        setTimeout(() => {
            cakeRight.style.opacity = '1';
            cake.classList.add('sliced');
            cakeRight.classList.add('sliced-right');

            // Pull halves apart elegantly
            cake.style.transform = 'translateX(-65%) rotate(-2deg)';
            cakeRight.style.transform = 'translateX(-35%) rotate(2deg)';

            // Grand Confetti Explosion
            startGrandCelebration();

            // Reveal Bengali specific note
            setTimeout(() => {
                message.classList.remove('hidden');
            }, 1200);

        }, 1500); // Trigger split when knife reaches the bottom
    });

    function startGrandCelebration() {
        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 100 };

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);

            // Launch from bottom corners
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff477e', '#ffd166', '#ffffff', '#3a0ca3']
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff477e', '#ffd166', '#ffffff', '#3a0ca3']
            }));
        }, 250);
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animation = `floatUp ${Math.random() * 15 + 10}s linear infinite`;
            particle.style.animationDelay = `-${Math.random() * 10}s`;
            particlesContainer.appendChild(particle);
        }
    }

    function createFloatingHearts() {
        const heartsContainer = document.getElementById('floatingHearts');
        const heartDetails = ['🎀', '✨', '💖', '🧸', '🌸', '🍰', '💘'];

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerText = heartDetails[Math.floor(Math.random() * heartDetails.length)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
            heart.style.animationDelay = `-${Math.random() * 10}s`;
            heart.style.fontSize = `${Math.random() * 15 + 10}px`;
            heart.style.opacity = Math.random() * 0.5 + 0.2;
            heartsContainer.appendChild(heart);
        }
    }

    // 🎈 Advanced Balloon Logic 🎈
    createBalloons();

    function createBalloons() {
        const balloonContainer = document.getElementById('balloonsContainer');
        const colors = ['#ff758f', '#ffb3c6', '#ffc2d1', '#fb6f92', '#ff4d6d', '#ff0a54'];

        // Dynamic continuous spawn
        setInterval(() => {
            if (document.querySelectorAll('.balloon').length < 12) {
                spawnBalloon(colors, balloonContainer);
            }
        }, 2000);

        // Intial batch of balloons
        for (let i = 0; i < 6; i++) {
            setTimeout(() => spawnBalloon(colors, balloonContainer), i * 400);
        }
    }

    function spawnBalloon(colors, container) {
        if (!container) return;

        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        // Random coloring
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;
        balloon.style.color = color; // For the ::after triangle

        // Advanced sizing (adding varied proportions)
        const width = Math.random() * 20 + 35; // 35px to 55px
        balloon.style.width = `${width}px`;
        balloon.style.height = `${width * 1.25}px`;

        // Start position
        balloon.style.left = `${Math.random() * 90 + 5}vw`;

        // Random float duration
        const duration = Math.random() * 8 + 10; // 10s to 18s float
        balloon.style.animation = `floatUpWobble ${duration}s ease-in-out forwards`;

        // Interactive POP logic
        balloon.addEventListener('click', function (e) {
            // Prevent multiple clicks
            if (this.classList.contains('popped')) return;

            this.classList.add('popped');

            // Pop confetti effect via canvas-confetti
            confetti({
                particleCount: 25,
                spread: 70,
                origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight
                },
                colors: [color, '#ffffff', '#ffd166'],
                disableForReducedMotion: true
            });

            // Remove DOM element after animation
            setTimeout(() => {
                if (this.parentNode) this.parentNode.removeChild(this);
            }, 150);
        });

        // Auto cleanup if balloon escapes screen
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, duration * 1000);

        container.appendChild(balloon);
    }
});
