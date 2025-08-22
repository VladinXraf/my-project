// Блокировка стандартных клавиш и событий
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(event) {
    // Блокировка Alt+F4, Ctrl+Shift+Esc, Alt+Tab и других комбинаций
    if (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) {
        event.preventDefault();
        playAlertSound();
        showWarningMessage();
    }
    
    // Блокировка F1-F12
    if (event.key.startsWith('F') && !isNaN(event.key.substring(1))) {
        event.preventDefault();
        playAlertSound();
        showWarningMessage();
    }
    
    // Блокировка Esc
    if (event.key === 'Escape') {
        event.preventDefault();
        playAlertSound();
        showWarningMessage();
    }
});

// Блокировка выхода со страницы
window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = '';
    playAlertSound();
    return '';
});

// Генерация случайного ID блокировки
function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Инициализация таймера обратного отсчета
function initCountdown() {
    let hours = 1;
    let minutes = 30;
    let seconds = 0;
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    const countdownInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Время вышло
                    clearInterval(countdownInterval);
                    playAlertSound();
                    document.body.classList.add('time-expired');
                }
            }
        }
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Ускоряем мигание таймера, когда осталось мало времени
        if (hours === 0 && minutes < 5) {
            document.querySelector('.countdown').style.animationDuration = '0.5s';
        }
        
        // Добавляем эффект тряски, когда осталось совсем мало времени
        if (hours === 0 && minutes === 0 && seconds < 30) {
            document.body.classList.add('shake');
        }
    }, 1000);
}

// Функция для воспроизведения звука тревоги
function playAlertSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLXy84/nWkzUFIG7Q9f3fsT8FGV/I+f/kuEMFFFTB/f/pukYFEUq7/v/svEkFDkC2/v/vv0wFCziy/v/xwU4FCDSv/v/zw1AFBS+s/v/1xVIFAiuq/v/3x1QFACen/v/5yVYFHyel/v/7y1gFHCWj/v/9zVoFGSOh/v//z1wFGCCg////0V4FFx6e////02AFFR2c////1WIFU0FpfJOkrZyAVkRqotrqpoFYPWis8/7GmXFKMWXI/P/bqX1QKF7O/f/isoRSIlfH/P/otIZTHlDC+//qt4hUG0u++v/suYpUGEa7+f/uvIxVFUG3+P/wvo5VEj60+P/ywJBWDzyx9//0wpJWDDmt9//2xJRXCTOq9v/4xpZXBi+n9v/6yJhYBCul9f/8yppaAimj9f/+zJxaACah9P//zp5bHyaf9P//0KBbHSSd9P//0qJcHCKb8///1KRcGyCZ8///1qZdGR6X8v//2KheGBuV8v//2qpfFxmT8f//3KxfFheR8f//3q5gFRWP8P//4LBhFBOM8P//4rJhEhGK7///5LRiEQ+I7v//5rZjEA2G7v//6LhkDguE7f//6rpkDQmC7f//7LxlDAeA7P//7r5mCwZ+7P//8MBmCgR87P//8sJnCQJ67P//9MRoCgF47P//9sZpCwB27P//+MhqDAB07P//+spqDQBy7P//+8xrDgBw7P///c5sDwBu7P///tBtEABs7P///9JuEQBq7P///9RvEgBo7P///9ZwEwBm7P///9hyFABk7P///9p0FQBi7P///9x1FgBg7P///955GgBe7P///+F7HQBc7P///+N+HwBa7P///+WAIABZ7P///+eDIgBX7P///+mGJABV7P///+uIJgBT7P///+2LKABr7P///++NKQB57P///+KHLQCB7P///9WBMQCJ7P///8h7NQCR7P///7t1OQCZ7P///65vPQCh7P///6FpQQCp7P///5RjRQCx7P///4ddSQC57P///3pXTQDB7P///21RUgDJ7P///2BLVgDR7P///1NFXADY7P///0Y/YQDf7P///zk5ZQDm7P///ywzaQDt7P///x8tbQD07P///xInbwD67P///wUhcgD/7P//AP8adQD/7P//AP8UdwD/7P//AP8OeQD/7P//AP8IewD/7P//AP8CfQD/7P//AP/8fgD/7P//AP/2gAD/7P//AP/wggD/7P//AP/qhAD/7P//AP/khgD/7P//AP/eiAD/7P//AP/YigD/7P//AP/SjAD/7P//AP/MjgD/7P//AP/GkAD/7P//AP/AkgD/7P//AP+6lAD/7P//AP+0lgD/7P//AP+umAD/7P//AP+omgD/7P//AP+imwD/7P//AP+cnQD/7P//AP+WnwD/7P//AP+QoQD/7P//AP+KowD/7P//AP+EpQD/7P//AP9+pwD/7P//AP94qQD/7P//AP9yqwD/7P//AP9srQD/7P//AP9mrgD/7P//AP9gsAD/7P//AP9asgD/7P//AP9UtAD/7P//AP9OtgD/7P//AP9IuAD/7P//AP9CugD/7P//AP88vAD/7P//AP82vgD/7P//AP8wwAD/7P//AP8qwgD/7P//AP8kxAD/7P//AP8exgD/7P//AP8YyAD/7P//AP8SygD/7P//AP8MzAD/7P//AP8GzgD/7P//AP8A0AD/7P//');
    audio.play();
}

// Функция для отображения предупреждающего сообщения
function showWarningMessage() {
    const message = document.querySelector('.message');
    message.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    setTimeout(() => {
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }, 300);
}

// Обработка формы оплаты
document.getElementById('pay-button').addEventListener('click', function() {
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (cardNumber && expiry && cvv) {
        // Показываем модальное окно с предупреждением
        document.getElementById('unlock-modal').style.display = 'flex';
    } else {
        alert('Пожалуйста, заполните все поля формы оплаты!');
    }
});

// Форматирование ввода номера карты
document.getElementById('card-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
});

// Форматирование ввода срока действия
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        formattedValue = value.substring(0, 2);
        if (value.length > 2) {
            formattedValue += '/' + value.substring(2, 4);
        }
    }
    
    e.target.value = formattedValue;
});

// Кнопка разблокировки (для демонстрации)
document.getElementById('unlock-button').addEventListener('click', function() {
    document.getElementById('unlock-modal').style.display = 'none';
    alert('Это была демонстрация винлокера. Спасибо за внимание!');
    window.location.href = 'about:blank';
});

// Эффект движения курсора
document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Создаем эффект дрожания экрана при движении мыши
    document.body.style.backgroundPositionX = -x / 100 + 'px';
    document.body.style.backgroundPositionY = -y / 100 + 'px';
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Генерируем случайный ID блокировки
    document.getElementById('random-id').textContent = generateRandomId();
    
    // Запускаем таймер
    initCountdown();
    
    // Воспроизводим звук тревоги при загрузке
    setTimeout(playAlertSound, 500);
    
    // Блокируем полноэкранный режим
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Ошибка перехода в полноэкранный режим:', err);
        });
    }
    
    // Симуляция активности веб-камеры
    setInterval(() => {
        const webcamPlaceholder = document.querySelector('.webcam-placeholder');
        webcamPlaceholder.style.opacity = (Math.random() * 0.4 + 0.6).toString();
    }, 100);
});