// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');
const closeButtons = document.querySelectorAll('.close');
const buyCourseButtons = document.querySelectorAll('.buy-course');
const payButton = document.getElementById('payButton');

// Course data
const courses = {
    'web-dev': {
        name: 'Web-разработка',
        price: 29900,
        description: 'Полный курс по веб-разработке'
    },
    'marketing': {
        name: 'Маркетинг и продажи',
        price: 24900,
        description: 'Курс по современному маркетингу'
    },
    'design': {
        name: 'Дизайн и креатив',
        price: 19900,
        description: 'Курс по дизайну и креативу'
    }
};

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Buy Course Button Click
buyCourseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const courseId = button.dataset.course;
        const course = courses[courseId];
        showPaymentModal(course);
    });
});

// Show Payment Modal
function showPaymentModal(course) {
    const courseInfo = document.getElementById('courseInfo');
    courseInfo.innerHTML = `
        <h3>${course.name}</h3>
        <p>${course.description}</p>
        <div class="course-price-display">
            <span class="price">₽${course.price.toLocaleString()}</span>
        </div>
    `;
    paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close Success Modal
function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Card Input Formatting
const cardNumber = document.getElementById('cardNumber');
const expiry = document.getElementById('expiry');
const cvv = document.getElementById('cvv');
const cardName = document.getElementById('cardName');

// Format card number with spaces
cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
});

// Format expiry date
expiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Format CVV
cvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Format card name (uppercase)
cardName.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// Payment Processing
payButton.addEventListener('click', async () => {
    // Validate form
    if (!validatePaymentForm()) {
        return;
    }

    // Show loading state
    payButton.disabled = true;
    payButton.textContent = 'Обработка...';

    try {
        // Simulate payment processing
        await processPayment();
        
        // Hide payment modal and show success
        paymentModal.style.display = 'none';
        successModal.style.display = 'block';
        
        // Reset form
        resetPaymentForm();
        
    } catch (error) {
        alert('Произошла ошибка при обработке платежа. Попробуйте еще раз.');
    } finally {
        payButton.disabled = false;
        payButton.textContent = 'Оплатить';
    }
});

// Validate Payment Form
function validatePaymentForm() {
    const cardNumberValue = cardNumber.value.replace(/\s/g, '');
    const expiryValue = expiry.value;
    const cvvValue = cvv.value;
    const cardNameValue = cardName.value.trim();

    if (cardNumberValue.length !== 16) {
        alert('Введите корректный номер карты');
        cardNumber.focus();
        return false;
    }

    if (!expiryValue.match(/^\d{2}\/\d{2}$/)) {
        alert('Введите корректный срок действия карты (MM/YY)');
        expiry.focus();
        return false;
    }

    if (cvvValue.length !== 3) {
        alert('Введите корректный CVV код');
        cvv.focus();
        return false;
    }

    if (cardNameValue.length < 3) {
        alert('Введите имя владельца карты');
        cardName.focus();
        return false;
    }

    return true;
}

// Process Payment (Simulation)
function processPayment() {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Payment failed'));
            }
        }, 2000);
    });
}

// Reset Payment Form
function resetPaymentForm() {
    cardNumber.value = '';
    expiry.value = '';
    cvv.value = '';
    cardName.value = '';
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
    const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
    const message = formData.get('message') || contactForm.querySelector('textarea').value;
    
    if (name && email && message) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        setTimeout(() => {
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить';
        }, 1500);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .stat, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
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

// Add loading animation for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Add scroll effect for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add hover effects for course cards
document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add form validation feedback
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '#10b981';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#6366f1';
        }
    });
});

console.log('Академия Успеха - сайт успешно загружен! 🚀');