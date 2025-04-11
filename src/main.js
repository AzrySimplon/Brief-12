//VARIABLES
// HTML Elements
const ingredientInput = document.getElementById('ingredient'); // Input field for entering ingredient
const categorySelect = document.getElementById('category'); // Dropdown to select meal category
const countrySelect = document.getElementById('country'); // Dropdown to select meal origin (country)
const mealsDiv = document.getElementById('mealsDiv'); // Container where the meals will be displayed
const themeButton = document.getElementById("theme"); // Button to change theme

//manual variables
const url = "https://www.themealdb.com/api/json/v1/1/"; // Base URL for the API
const mealsList = []; // Array to store Meal objects
const ingredientNbr =20;

//theme
let actualTheme = 0;
//themes colors with css variable names
const themes = {
    "--color-green": ["#4CAF50", "#000000"],
    "--color-orange": ["#FF9800", "#000000"],
    "--color-white": ["#FFFFFF", "#ffffff"],
    "--color-gray": ["#9E9E9E", "#000000"],
    "--color-dark-gray": ["#616161", "#000000"],
    "--bg-light-green": ["rgba(76, 175, 80, 0.13)", "#ffffff"],
    "--bg-light-orange": ["rgba(255, 152, 0, 0.1)", "#cccccc"],
    "--box-shadow-color": ["rgba(0, 0, 0, 0.1)", "#ffffff"],
    "--accessibility-border-color": ["transparent", "#626262"],
    "--tittle-bg-color": ["#FF9800", "#ffffff"]
}


// Define the Meal class
class Meal {
    constructor(id, name, imageUrl) {
        this.id = id; // Meal ID
        this.name = name; // Meal name
        this.imageUrl = imageUrl; // URL for the meal's image
        this.isRecipeShown = false; // Boolean to track if the recipe is currently displayed
    }

    // Toggle the visibility of the recipe details
    toggleRecipeVisibility() {
        this.isRecipeShown = !this.isRecipeShown;
    }
}


//FUNCTIONS
//changes theme in loop
function changeTheme() {
    if(actualTheme === themes[Object.keys(themes)[0]].length - 1) {
        actualTheme = 0;
    }
    else{
        actualTheme ++;
    }

    //edit color of each variable
    for(let themeName in themes){
        document.documentElement.style.setProperty(themeName, themes[themeName][actualTheme]);
    }
}

// Function to add meals into `mealsList`
function addMeals(mealsArray) {
    mealsList.length = 0; // Clear the current list
    mealsArray.forEach(meal => {
        // Create a new instance of the Meal class for each meal and add it to mealsList
        const newMeal = new Meal(meal.idMeal, meal.strMeal, meal.strMealThumb);
        mealsList.push(newMeal);
    });
}

// Function to format input strings by replacing spaces with underscores
function formatInput(input) {
    input = input.replace(/\s/g, '_'); // Replace spaces with underscores
    return input;
}

// Function to add an option to a dropdown (select element)
function addOption(select, value) {
    const option = document.createElement('option'); // Create a new <option> element
    option.value = value;
    option.innerText = value;
    select.appendChild(option); // Add the option to the select element
}

// Function to initialize the category and country dropdown menus
function initializeSelectOptions() {
    // Fetch meal categories from the API and add them to the category dropdown
    fetch(`${url}categories.php`)
        .then(response => response.json())
        .then(data => {
            addOption(categorySelect, "...");
            data.categories.forEach(category => {
                addOption(categorySelect, category.strCategory);
            });
        })
        .catch(error => console.log(error));

    // Fetch available countries/areas from the API and add them to the country dropdown
    fetch(`${url}list.php?a=list`)
        .then(response => response.json())
        .then(data => {
            addOption(countrySelect, "...");
            data.meals.forEach(country => {
                addOption(countrySelect, country.strArea);
            });
        })
        .catch(error => console.log(error));
}

// Function to find and display meals based on a filtering criterion and a URL parameter
function findMealByCriteria(criteria, urlParameter) {
    fetch(`${url}${urlParameter}${criteria}`)
        .then(response => response.json())
        .then((data) => {
            // If meals are found, add them to the list and render them
            if (data.meals !== null) {
                addMeals(data.meals);
                renderMealsSelection(mealsList);
            }
        })
        .catch(error => console.log(error));
}

// Render the list of meals visually on the page
function renderMealsSelection(mealsArray) {
    mealsDiv.innerHTML = ""; // Clear the mealsDiv contents
    mealsArray.forEach(meal => {
        // Create article container for each meal
        const article = document.createElement('article');
        article.classList.add('meal'); // Add CSS class for styling

        // Create and set the title of the meal
        const mealTitle = document.createElement('h3');
        mealTitle.textContent = meal.name;

        // Create and set the image of the meal
        const mealImage = document.createElement('img');
        mealImage.src = meal.imageUrl; // Set the image source URL
        mealImage.alt = meal.name; // Set the alternate text for the image

        // Append the title and image to the article
        article.appendChild(mealTitle);
        article.appendChild(mealImage);

        // Add an event listener for the article
        article.addEventListener('click', () => {
            meal.toggleRecipeVisibility(); // Toggle recipe visibility
            if (meal.isRecipeShown) {
                renderSelectedMeal(meal.id, article); // Show recipe details
            } else {
                removeSelectedMeal(article); // Remove recipe details
            }
        });

        // Append the article to the mealsDiv
        mealsDiv.appendChild(article);
    });
}

// Render the selected meal's recipe
function renderSelectedMeal(mealId, article) {
    fetch(`${url}lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then((meal) => {
            const mealData = meal.meals[0]; // Access the data for the meal
            const instructionsP = document.createElement('p'); // Create a <p> element for the instructions

            instructionsP.textContent = mealData.strInstructions; // Set the instruction text
            const ingredientsList = document.createElement('ul'); // Create a new unordered list
            ingredientsList.textContent = 'Ingredients:'; // Add a title for the list

            // Extract ingredients and their measurements from meal data
            for (let i = 1; i <= ingredientNbr; i++) {
                const ingredient = mealData[`strIngredient${i}`];
                const measure = mealData[`strMeasure${i}`];
                if (ingredient !== '') {
                    // Create a list item for each ingredient
                    const listItem = document.createElement('li');
                    listItem.textContent = `${ingredient} - ${measure}`; // Combine ingredient and measure
                    listItem.classList.add('ingredient'); // Add CSS class

                    // Add an image for the ingredient
                    const ingredientImageHTML = document.createElement('img');
                    ingredientImageHTML.src = `https://www.themealdb.com/images/ingredients/${formatInput(ingredient)}.png`; // Format ingredient name for the URL
                    listItem.appendChild(ingredientImageHTML);
                    ingredientsList.appendChild(listItem);
                }
            }

            // Append instructions and ingredients to the meal article
            article.appendChild(instructionsP);
            article.appendChild(ingredientsList);
        })
        .catch(error => console.log(error));
}

// Remove the recipe from the selected meal
function removeSelectedMeal(article) {
    const recipeDetails = article.querySelectorAll('h2, p, ul'); // Query for recipe details (headers, paragraphs, lists)
    recipeDetails.forEach(detail => detail.remove()); // Remove each detail
}


//INITIALIZATION AT START
// Event listener for "ingredient" input change - filters meals by ingredient
ingredientInput.addEventListener('input', () => {
    const value = ingredientInput.value;
    if (value !== "") {
        findMealByCriteria(formatInput(ingredientInput.value), "filter.php?i="); // Filter meals by ingredient
    }
});

// Event listener for "category" selection change - filters meals by category
categorySelect.addEventListener('change', () => {
    const value = categorySelect.value;
    findMealByCriteria(value, "filter.php?c="); // Filter meals by category
});

// Event listener for "country" selection change - filters meals by country
countrySelect.addEventListener('change', () => {
    const value = countrySelect.value;
    findMealByCriteria(value, "filter.php?a="); // Filter meals by country
});

themeButton.addEventListener('click', changeTheme);

// Initialize category and country select options at the beginning
initializeSelectOptions();