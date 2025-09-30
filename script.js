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

    // BMR
    let bmr = (gender === 'male')
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // TDEE
    let tdee = bmr * activity;

    // Цель
    if (goal === 'lose') tdee *= 0.85; // -15%
    else if (goal === 'gain') tdee *= 1.15; // +15%

    // Макросы
    let proteinPercent = goal === 'lose' ? 0.35 : 0.3;
    let fatPercent = 0.25;
    let carbPercent = goal === 'lose' ? 0.4 : 0.45;

    const protein = (tdee * proteinPercent / 4).toFixed(1);
    const fat = (tdee * fatPercent / 9).toFixed(1);
    const carbs = (tdee * carbPercent / 4).toFixed(1);

    document.getElementById('result').innerHTML = `
    <strong>Ваш результат:</strong><br>
    Калории: ${tdee.toFixed(0)} ккал/день<br>
    Белки: ${protein} г<br>
    Жиры: ${fat} г<br>
    Углеводы: ${carbs} г
  `;
});
