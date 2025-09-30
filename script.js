document.getElementById('calcBtn').addEventListener('click', () => {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (!weight || !height || !age) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    // Формула Миффлина-Сан Жеора
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activity;

    // Макросы (примерная пропорция)
    const protein = (tdee * 0.3 / 4).toFixed(1); // 30% калорий из белка
    const fat = (tdee * 0.25 / 9).toFixed(1);   // 25% калорий из жиров
    const carbs = (tdee * 0.45 / 4).toFixed(1); // 45% калорий из углеводов

    document.getElementById('result').innerHTML = `
    <strong>Ваш результат:</strong><br>
    Калории: ${tdee.toFixed(0)} ккал/день<br>
    Белки: ${protein} г<br>
    Жиры: ${fat} г<br>
    Углеводы: ${carbs} г
  `;
});
