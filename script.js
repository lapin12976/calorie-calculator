function calculateCalories() {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // BMR (Mifflin–St Jeor)
    let bmr = (gender === 'male')
        ? (10 * weight + 6.25 * height - 5 * age + 5)
        : (10 * weight + 6.25 * height - 5 * age - 161);

    let tdee = bmr * activity;

    // Коррекция по цели
    if (goal === 'lose') tdee *= 0.9;
    if (goal === 'gain') tdee *= 1.1;

    // КБЖУ
    const protein = (tdee * 0.25) / 4;
    const fat = (tdee * 0.25) / 9;
    const carbs = (tdee * 0.50) / 4;

    // Приёмы пищи
    const breakfast = {
        kcal: tdee * 0.3,
        protein: protein * 0.3,
        fat: fat * 0.3,
        carbs: carbs * 0.3
    };

    const lunch = {
        kcal: tdee * 0.4,
        protein: protein * 0.4,
        fat: fat * 0.4,
        carbs: carbs * 0.4
    };

    const dinner = {
        kcal: tdee * 0.3,
        protein: protein * 0.3,
        fat: fat * 0.3,
        carbs: carbs * 0.3
    };

    // Вывод
    document.getElementById('result').innerHTML = `
        <h3>Результаты:</h3>
        <p><strong>Суточная норма:</strong> ${Math.round(tdee)} ккал</p>
        <p>Белки: ${Math.round(protein)} г | Жиры: ${Math.round(fat)} г | Углеводы: ${Math.round(carbs)} г</p>
        <h4>Распределение:</h4>
        <p><strong>Завтрак:</strong> ${Math.round(breakfast.kcal)} ккал (Б: ${Math.round(breakfast.protein)} г, Ж: ${Math.round(breakfast.fat)} г, У: ${Math.round(breakfast.carbs)} г)</p>
        <p><strong>Обед:</strong> ${Math.round(lunch.kcal)} ккал (Б: ${Math.round(lunch.protein)} г, Ж: ${Math.round(lunch.fat)} г, У: ${Math.round(lunch.carbs)} г)</p>
        <p><strong>Ужин:</strong> ${Math.round(dinner.kcal)} ккал (Б: ${Math.round(dinner.protein)} г, Ж: ${Math.round(dinner.fat)} г, У: ${Math.round(dinner.carbs)} г)</p>
    `;
}
