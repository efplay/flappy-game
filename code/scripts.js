var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

hole.addEventListener('animationiteration', () => {
   // Генерируем случайную позицию отверстия для каждого нового круга
   var random = -((Math.random() * 150) + 150);
   hole.style.top = random + "px";
   counter++;
   console.log("Iteration: " + counter);
});

// Двигаем блок с каждым интервалом
function moveBlock() {
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft <= -60) {
        // Перемещаем блок за правую сторону экрана для следующего появления
        block.style.left = "100%";
    } else {
        // Двигаем блок влево
        block.style.left = (blockLeft - 2) + "px";
    }
}

// Проверка столкновений и движения персонажа
setInterval(function () {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    
    // Двигаем персонажа вниз, если он не в прыжке
    if (jumping == 0 && characterTop < 480) {
        character.style.top = (characterTop + 3) + "px"; // Падает вниз с каждым интервалом
    }

    // Двигаем блок
    moveBlock();

    // Получаем данные о позиции блока и отверстия
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);  // Высота персонажа для проверки столкновений

    // Проверка столкновений и "Game Over"
    if ((characterTop > 480) || 
        (blockLeft < 20 && blockLeft > -50 && 
        (cTop < holeTop || cTop > holeTop + 130))) {
        alert("Game Over. Your Score: " + (counter - 1));
        character.style.top = 100 + "px";  // Сбрасываем персонажа на начальную позицию
        counter = 0;
    }
}, 10);

// Функция прыжка
function jump() {
    if (jumping == 0) {
        jumping = 1;
        let jumpCount = 0;
        var jumpInterval = setInterval(function () {
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if (characterTop > 6 && jumpCount < 15) {
                character.style.top = (characterTop - 5) + "px"; // Поднимаем персонажа вверх
            }
            if (jumpCount > 20) {
                clearInterval(jumpInterval); // Останавливаем прыжок
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
}
