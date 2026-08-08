// ============ VOLCANIC EFFECTS ENGINE ============

class VolcanoEffects {
    constructor() {
        this.lavaCanvas = document.getElementById('lavaCanvas');
        this.ctx = this.lavaCanvas.getContext('2d');
        this.embers = [];
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createEmbers();
        this.animateLava();
        this.initParticles();
        this.initHeatDistortion();
    }

    resizeCanvas() {
        this.lavaCanvas.width = window.innerWidth;
        this.lavaCanvas.height = window.innerHeight;
    }

    createEmbers() {
        const count = 150;
        for (let i = 0; i < count; i++) {
            this.embers.push({
                x: Math.random() * this.lavaCanvas.width,
                y: Math.random() * this.lavaCanvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: -(Math.random() * 0.5 + 0.3),
                life: Math.random() * 100,
                color: this.getEmberColor()
            });
        }
    }

    getEmberColor() {
        const colors = ['#ff4500', '#ff6b35', '#ff8c00', '#ffd700'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateLava() {
        const drawLava = () => {
            this.ctx.clearRect(0, 0, this.lavaCanvas.width, this.lavaCanvas.height);
            
            // Draw lava blobs
            this.embers.forEach(ember => {
                ember.life++;
                ember.x += ember.speedX + Math.sin(ember.life * 0.1);
                ember.y += ember.speedY;
                
                if (ember.y < 0 || ember.life > 200) {
                    ember.y = this.lavaCanvas.height;
                    ember.x = Math.random() * this.lavaCanvas.width;
                    ember.life = 0;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
                this.ctx.fillStyle = ember.color;
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = ember.color;
                this.ctx.fill();
            });
            
            requestAnimationFrame(drawLava);
        };
        
        drawLava();
    }

    initParticles() {
        // Particle system for embers
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('ember-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 3 + 2 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            document.getElementById('ember-particles').appendChild(particle);
        };
        
        for (let i = 0; i < 30; i++) {
            setTimeout(createParticle, i * 200);
        }
    }

    initHeatDistortion() {
        // Heat distortion effect
        const distortion = document.querySelector('.heat-distortion');
        setInterval(() => {
            distortion.style.background = `radial-gradient(circle at \${Math.random() * 100}% \${Math.random() * 100}%, transparent \${Math.random() * 20}%, rgba(255, 69, 0, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)`;
        }, 2000);
    }
}

// Initialize volcanos
document.addEventListener('DOMContentLoaded', () => {
    new VolcanoEffects();
});

// ============ VOLCANIC INTERACTIONS ============

// Project core interactions
document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => {
        const project = btn.dataset.project;
        triggerEruption(project);
    });
});

function triggerEruption(project) {
    const modal = document.getElementById('eruptionModal');
    const content = document.getElementById('eruptionContent');
    
    // Add eruption effect
    modal.classList.add('erupting');
    
    // Simulate loading volcano data
    content.innerHTML = `<div class="eruption-loader">
        <div class="volcano-shake">🌋</div>
        <p>Igniting project core...</p>
    </div>`;
    
    modal.style.display = 'block';
    
    setTimeout(() => {
        content.innerHTML = createProjectContent(project);
        modal.classList.remove('erupting');
    }, 1000);
}

function createProjectContent(project) {
    const projectData = {
        'social-lava': {
            title: 'SOCIAL LAVA STREAM',
            description: 'Real-time social platform with 60fps streaming',
            tags: ['Kotlin', 'Compose', 'Firebase', 'WebSocket'],
            metrics: { fps: 60, memory: '24MB', startup: '150ms' }
        },
        'magma-analytics': {
            title: 'MAGMA ANALYTICS',
            description: 'High-performance analytics dashboard',
            tags: ['Kotlin', 'MPAndroidChart', 'Room', 'Coroutines'],
            metrics: { fps: 120, memory: '32MB', startup: '200ms' }
        },
        'basalt-security': {
            title: 'BASALT SECURITY',
            description: 'Enterprise-grade security framework',
            tags: ['Kotlin', 'Biometric', 'Encryption', 'SSL Pinning'],
            metrics: { fps: 60, memory: '18MB', startup: '120ms' }
        }
    };
    
    const data = projectData[project];
    
    return `
        <div class="eruption-content-detail">
            <h2>\${data.title}</h2>
            <p>\${data.description}</p>
            <div class="project-tags">
                \${data.tags.map(tag => `<span class="tag">\${tag}</span>`).join('')}
            </div>
            <div class="project-metrics-heat">
                <div class="metric-block">
                    <span class="metric-label">FPS</span>
                    <span class="metric-value">\${data.metrics.fps}</span>
                    <div class="heat-bar-mini" data-heat="\${data.metrics.fps / 120}"></div>
                </div>
                <div class="metric-block">
                    <span class="metric-label">MEMORY</span>
                    <span class="metric-value">\${data.metrics.memory}</span>
                    <div class="heat-bar-mini" data-heat="\${parseInt(data.metrics.memory) / 50}"></div>
                </div>
                <div class="metric-block">
                    <span class="metric-label">STARTUP</span>
                    <span class="metric-value">\${data.metrics.startup}</span>
                    <div class="heat-bar-mini" data-heat="\${parseInt(data.metrics.startup) / 500}"></div>
                </div>
            </div>
        </div>
    `;
}

// Close modal
document.querySelector('.close-eruption').addEventListener('click', () => {
    document.getElementById('eruptionModal').style.display = 'none';
});
