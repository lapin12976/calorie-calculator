document.getElementById('calcBtn').addEventListener('click', calculateCalories);

function calculateCalories() {
    // Получаем данные из формы
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // Проверяем корректность ввода
    if (!weight || !height || !age) {
        document.getElementById('result').innerHTML = `<p style="color:red;">Пожалуйста, заполните все поля!</p>`;
        return;
    }

    // Формула Mifflin–St Jeor
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Общий расход (TDEE)
    let tdee = bmr * activity;

    // Корректируем под цель
    if (goal === 'lose') tdee *= 0.9;     // похудение
    if (goal === 'gain') tdee *= 1.1;     // набор

    // Расчёт КБЖУ
    const protein = (tdee * 0.25) / 4;    // 25% калорий из белков
    const fat = (tdee * 0.25) / 9;        // 25% калорий из жиров
    const carbs = (tdee * 0.50) / 4;      // 50% калорий из углеводов

    // Распределение по приёмам пищи
    function mealShare(percent) {
        return {
            kcal: tdee * percent,
            protein: protein * percent,
            fat: fat * percent,
            carbs: carbs * percent
        };
    }

    const breakfast = mealShare(0.3); // 30% завтрак
    const lunch = mealShare(0.4);     // 40% обед
    const dinner = mealShare(0.3);    // 30% ужин

    // Вывод результата
    document.getElementById('result').innerHTML = `
        <h3>Результаты:</h3>
        <p><strong>Суточная норма:</strong> ${Math.round(tdee)} ккал</p>
        <p>Белки: ${Math.round(protein)} г | Жиры: ${Math.round(fat)} г | Углеводы: ${Math.round(carbs)} г</p>
        <h4>Распределение по приёмам пищи:</h4>
        <p><strong>Завтрак:</strong> ${Math.round(breakfast.kcal)} ккал
           (Б: ${Math.round(breakfast.protein)} г, Ж: ${Math.round(breakfast.fat)} г, У: ${Math.round(breakfast.carbs)} г)</p>
        <p><strong>Обед:</strong> ${Math.round(lunch.kcal)} ккал
           (Б: ${Math.round(lunch.protein)} г, Ж: ${Math.round(lunch.fat)} г, У: ${Math.round(lunch.carbs)} г)</p>
        <p><strong>Ужин:</strong> ${Math.round(dinner.kcal)} ккал
           (Б: ${Math.round(dinner.protein)} г, Ж: ${Math.round(dinner.fat)} г, У: ${Math.round(dinner.carbs)} г)</p>
    `;
}
