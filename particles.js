function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';

        const duration = Math.random() * 5 + 5;

        particle.style.animation = `float${i} ${duration}s ease-in-out infinite`;

        const keyframes = `
                    @keyframes float${i} {
                        0%, 100% {
                            transform: translate(0, 0);
                            opacity: 0;
                        }
                        15% {
                            opacity: 1;
                        }
                        85% {
                            opacity: 1;
                        }
                        50% {
                            transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
                        }
                    }
                `;

        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);

        particle.style.animationDelay = Math.random() * 3 + 's';

        particlesContainer.appendChild(particle);
    }
}

createParticles();