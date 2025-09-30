document.getElementById('calcBtn').addEventListener('click', () => {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    if (!weight || !height || !age) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // 1. BMR по формуле Миффлина-Сан Жеора
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 2. TDEE с учётом активности
    let tdee = bmr * activity;

    // 3. Корректировка TDEE в зависимости от цели
    if (goal === 'lose') {
        tdee *= 0.85; // дефицит ~15% для похудения
    } else if (goal === 'gain') {
        tdee *= 1.15; // избыток ~15% для набора массы
    }
    // если поддержание — TDEE остаётся без изменений

    // 4. Распределение макросов
    // Для похудения: чуть больше белка, меньше углеводов
    let proteinPercent = 0.3;
    let fatPercent = 0.25;
    let carbPercent = 0.45;

    if (goal === 'lose') {
        proteinPercent = 0.35;
        fatPercent = 0.25;
        carbPercent = 0.4;
    } else if (goal === 'gain') {
        proteinPercent = 0.3;
        fatPercent = 0.25;
        carbPercent = 0.45;
    }

    const protein = (tdee * proteinPercent / 4).toFixed(1); // белки (г)
    const fat = (tdee * fatPercent / 9).toFixed(1);         // жиры (г)
    const carbs = (tdee * carbPercent / 4).toFixed(1);     // углеводы (г)

    document.getElementById('result').innerHTML = `
    <strong>Ваш результат:</strong><br>
    Калории: ${tdee.toFixed(0)} ккал/день<br>
    Белки: ${protein} г<br>
    Жиры: ${fat} г<br>
    Углеводы: ${carbs} г
  `;
});
