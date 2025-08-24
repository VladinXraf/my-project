// GameKeys - JavaScript функциональность
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initHeroStats();
    initGameSearch();
    initGameFilters();
    initKeyModal();
    initSmoothScrolling();
    initMobileMenu();
});

// Навигация
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Активная навигация при скролле
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Анимированные счетчики в hero секции
function initHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetValue);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Поиск игр
function initGameSearch() {
    const searchInput = document.getElementById('gameSearch');
    const gameCards = document.querySelectorAll('.game-card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3').textContent.toLowerCase();
            const gameDescription = card.querySelector('p').textContent.toLowerCase();
            const platform = card.getAttribute('data-platform');
            
            const matchesSearch = gameTitle.includes(searchTerm) || 
                                gameDescription.includes(searchTerm);
            
            if (matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Фильтрация по платформам
function initGameFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            
            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Фильтруем игры
            gameCards.forEach(card => {
                const cardPlatform = card.getAttribute('data-platform');
                
                if (platform === 'all' || cardPlatform === platform) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Модальное окно с ключом
function initKeyModal() {
    const modal = document.getElementById('keyModal');
    const modalClose = document.querySelector('.modal-close');
    const getKeyBtns = document.querySelectorAll('.get-key-btn');
    const copyKeyBtn = document.getElementById('copyKeyBtn');
    
    // Открытие модального окна
    getKeyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const gameName = btn.getAttribute('data-game');
            const gameKey = btn.getAttribute('data-key');
            const gameCard = btn.closest('.game-card');
            const gameImage = gameCard.querySelector('.game-image img').src;
            const gameDescription = gameCard.querySelector('p').textContent;
            
            // Заполняем модальное окно
            document.getElementById('modalGameImage').src = gameImage;
            document.getElementById('modalGameTitle').textContent = gameName;
            document.getElementById('modalGameDescription').textContent = gameDescription;
            document.getElementById('keyInput').value = gameKey;
            
            // Показываем модальное окно
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Анимация появления
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 10);
        });
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Копирование ключа
    copyKeyBtn.addEventListener('click', async () => {
        const keyInput = document.getElementById('keyInput');
        const originalText = copyKeyBtn.innerHTML;
        
        try {
            await navigator.clipboard.writeText(keyInput.value);
            
            // Показываем успешное копирование
            copyKeyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
            copyKeyBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
            
            setTimeout(() => {
                copyKeyBtn.innerHTML = originalText;
                copyKeyBtn.style.background = '';
            }, 2000);
            
        } catch (err) {
            // Fallback для старых браузеров
            keyInput.select();
            document.execCommand('copy');
            
            copyKeyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
            copyKeyBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
            
            setTimeout(() => {
                copyKeyBtn.innerHTML = originalText;
                copyKeyBtn.style.background = '';
            }, 2000);
        }
    });
}

function closeModal() {
    const modal = document.getElementById('keyModal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Плавная прокрутка
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Учитываем высоту header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.game-card, .platform-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Инициализация анимаций при скролле
initScrollAnimations();

// Дополнительные утилиты
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Ошибка:', e.error);
    showNotification('Произошла ошибка. Попробуйте обновить страницу.', 'error');
});

// Добавляем CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        backdrop-filter: blur(20px);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 3000;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #4ade80;
    }
    
    .notification.error {
        border-left: 4px solid #f87171;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #4ade80;
    }
    
    .notification.error i {
        color: #f87171;
    }
    
    .notification span {
        color: var(--text-primary);
        font-size: 0.9rem;
    }
    
    /* Анимации для модального окна */
    .modal {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    /* Анимации для карточек игр */
    .game-card {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .game-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Анимации для платформ */
    .platform-card {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .platform-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Анимации для статистики */
    .stat-card {
        opacity: 0;
        transform: translateX(-20px);
    }
    
    .stat-card.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    /* Мобильное меню */
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 15, 35, 0.98);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--border-color);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

document.head.appendChild(style);

// Инициализация после загрузки всех стилей
setTimeout(() => {
    // Добавляем классы для анимации появления
    const animatedElements = document.querySelectorAll('.game-card, .platform-card, .stat-card');
    animatedElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
}, 100);