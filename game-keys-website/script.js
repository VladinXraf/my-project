// GameKeys Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Platform filtering for games
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter games
            gameCards.forEach(card => {
                if (platform === 'all' || card.getAttribute('data-platform') === platform) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Game key generation simulation
    const getKeyBtns = document.querySelectorAll('.btn-success');
    getKeyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const gameName = this.closest('.game-card').querySelector('h3').textContent;
            generateGameKey(gameName, this);
        });
    });

    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 900);

    // Floating games animation
    const floatingGames = document.querySelectorAll('.game-icon');
    floatingGames.forEach((game, index) => {
        game.style.animationDelay = `${index * 0.5}s`;
    });

    // Platform cards hover effects
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Game cards hover effects
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск игр...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    const gamesSection = document.querySelector('#games .container');
    gamesSection.insertBefore(searchContainer, gamesSection.firstChild);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        gameCards.forEach(card => {
            const gameName = card.querySelector('h3').textContent.toLowerCase();
            const gameDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (gameName.includes(searchTerm) || gameDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add CSS for search input
    const searchStyles = `
        .search-container {
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .search-input {
            width: 100%;
            max-width: 400px;
            padding: 15px 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .search-input:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .hero-title,
        .hero-subtitle,
        .hero-buttons {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);

    // Statistics counter animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => statsObserver.observe(stat));
});

// Generate game key function
function generateGameKey(gameName, button) {
    const originalText = button.textContent;
    button.textContent = 'Генерация...';
    button.disabled = true;
    
    // Simulate key generation delay
    setTimeout(() => {
        const key = generateRandomKey();
        showKeyModal(gameName, key);
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Generate random game key
function generateRandomKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) key += '-';
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

// Show key modal
function showKeyModal(gameName, key) {
    const modal = document.createElement('div');
    modal.className = 'key-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Ключ для ${gameName}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>Ваш ключ активации:</p>
                <div class="key-display">${key}</div>
                <button class="copy-btn" onclick="copyToClipboard('${key}')">
                    <i class="fas fa-copy"></i> Копировать
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
        copyBtn.style.background = '#00b894';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Animate counter function
function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const isPlus = finalValue.includes('+');
    const isSlash = finalValue.includes('/');
    
    let finalNumber;
    if (isPercentage) {
        finalNumber = parseInt(finalValue.replace('%', ''));
    } else if (isPlus) {
        finalNumber = parseInt(finalValue.replace('+', ''));
    } else if (isSlash) {
        finalNumber = 24; // For 24/7
    } else {
        finalNumber = parseInt(finalValue.replace('K', '000'));
    }
    
    let current = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
        }
        
        let displayValue;
        if (isPercentage) {
            displayValue = Math.floor(current) + '%';
        } else if (isPlus) {
            displayValue = Math.floor(current) + '+';
        } else if (isSlash) {
            displayValue = Math.floor(current) + '/7';
        } else if (finalValue.includes('K')) {
            displayValue = Math.floor(current / 1000) + 'K+';
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue;
    }, 50);
}

// Add modal styles
const modalStyles = `
    .key-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header h3 {
        color: #333;
        margin: 0;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        transition: color 0.3s ease;
    }
    
    .close-btn:hover {
        color: #333;
    }
    
    .key-display {
        background: #f8f9fa;
        border: 2px solid #e9ecef;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        letter-spacing: 2px;
    }
    
    .copy-btn {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .copy-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
`;

const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.platform-card, .game-card, .stat');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
});

// Add animation styles
const animationStyles = `
    .platform-card,
    .game-card,
    .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .platform-card.animate,
    .game-card.animate,
    .stat.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet);