document.getElementById('cocinar').addEventListener('click', () => {
    const selectedIngredients = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
    console.log("Ingredientes seleccionados:", selectedIngredients); // Debugging

    fetch('recipes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar recipes.json');
            }
            return response.json();
        })
        .then(recipes => {
            console.log("Recetas cargadas:", recipes); // Debugging
            let found = false;
            for (let recipe in recipes) {
                console.log("Verificando receta:", recipe, recipes[recipe].ingredientes); // Debugging
                if (JSON.stringify(recipes[recipe].ingredientes.sort()) === JSON.stringify(selectedIngredients.sort())) {
                    console.log("Receta encontrada:", recipe); // Debugging
                    document.getElementById('mensaje').innerText = `Felicidades has conseguido cocinar un ${recipe}`;
                    document.getElementById('ingredientes-seleccionados').innerHTML = selectedIngredients.map(ing => `<li>${ing}</li>`).join('');
                    document.getElementById('imagen').style.backgroundImage = `url(${recipes[recipe].imagen})`;
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log("No se encontraron recetas"); // Debugging
                document.getElementById('mensaje').innerText = "NO hay resultados";
                document.getElementById('ingredientes-seleccionados').innerHTML = '';
                document.getElementById('imagen').style.backgroundImage = '';
            }
        })
        .catch(error => {
            console.error('Error:', error); // Debugging
            document.getElementById('mensaje').innerText = "Error al cargar las recetas";
        });
});