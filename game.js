// Canvas elementini alıyoruz
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Yılanın başı ve boyutları
const snakeSize = 20;
let snake = [{ x: 100, y: 100 }]; // Yılanın başlangıç pozisyonu
let snakeDirection = 'RIGHT';

// Yiyecek pozisyonu
let food = generateFood();

// Yılanın hareketi
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && snakeDirection !== 'DOWN') snakeDirection = 'UP';
    if (event.key === 'ArrowDown' && snakeDirection !== 'UP') snakeDirection = 'DOWN';
    if (event.key === 'ArrowLeft' && snakeDirection !== 'RIGHT') snakeDirection = 'LEFT';
    if (event.key === 'ArrowRight' && snakeDirection !== 'LEFT') snakeDirection = 'RIGHT';
});

// Yılanın güncellenmesi ve oyun loop'u
function gameLoop() {
    // Yılanın başını hareket ettiriyoruz
    const head = { ...snake[0] };

    if (snakeDirection === 'UP') head.y -= snakeSize;
    if (snakeDirection === 'DOWN') head.y += snakeSize;
    if (snakeDirection === 'LEFT') head.x -= snakeSize;
    if (snakeDirection === 'RIGHT') head.x += snakeSize;

    snake.unshift(head);

    // Yılan yiyeceği yedi mi kontrol ediyoruz
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();  // Yeni yiyecek oluştur
    } else {
        snake.pop();  // Yılanın sonunu sil
    }

    // Yılanın kendisine çarpmasını kontrol et
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over");
        snake = [{ x: 100, y: 100 }];
        snakeDirection = 'RIGHT';
    }

    // Yılanın duvara çarpıp çarpmadığını kontrol et
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("Game Over");
        snake = [{ x: 100, y: 100 }];
        snakeDirection = 'RIGHT';
    }

    // Ekranı temizle ve yılanı çiz
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

// Yılanı çizme
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'black'; // Baş yeşil, gövde siyah
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

// Yiyeceği çizme
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Yiyecek için rastgele bir pozisyon oluşturma
function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    const y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    return { x, y };
}

// Oyun döngüsünü başlat
setInterval(gameLoop, 100);
