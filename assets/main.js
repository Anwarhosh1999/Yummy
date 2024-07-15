// ------------------------------------------------ activate preloader

// let loader = document.getElementById("preloader");
// window.addEventListener("load", function () {
//   loader.style.display = "none";
// });

$(document).ready(() => {
  startSearch("").then(() => {
    $("#preloader").fadeOut(2000);
  });
});

// ------------------------------------------------ Selectors

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(".open").click(function () {
  $(".side-nav-menu").css("left", "0");
  $(".nav-tab li").css("top", "0");
  $(this).css("display", "none");
  $(".close").css("display", "block");
});
closeSideNav();
function closeSideNav() {
  $(".side-nav-menu").css("left", "-250px");
  $(".nav-tab li").css("top", "300px");
  $(".close").css("display", "none");
  $(".open").css("display", "block");
}

async function startSearch(meal) {
  $(".inner").fadeIn(0);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner").fadeOut(1000);
}

function displayMeals(arr) {
  let mealsArr = "";

  for (let i = 0; i < arr.length; i++) {
    mealsArr += `
        <div class="cardunit col-md-6 col-lg-4 ">
                    <div class="card ">
                        <div class="card-img">
                            <div class="img"><img src="${arr[i].strMealThumb}" class="w-100" alt=""></div>
                        </div>
                        <div class="card-title">${arr[i].strMeal}</div>

                        <hr class="card-divider">
                        <div class="card-footer">
                            <button class="card-btn" onclick="getMealDetails('${arr[i].idMeal}'); closeSideNav()">
                                <p>See The Recipe</p>
                            </button>
                        </div>
                    </div>
                </div>
        `;
  }

  $("#cardsGroup").html(mealsArr);
}

startSearch("");

async function getCategories() {
  $(".inner").fadeIn(0);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner").fadeOut(1000);
}

function displayCategories(arr) {
  let mealsArr = "";

  for (let i = 0; i < arr.length; i++) {
    mealsArr += `
         <div class="cardunit col-md-6 col-lg-4 ">
                    <div class="card ">
                        <div class="card-img">
                            <div class="img"><img src="${arr[i].strCategoryThumb}" class="w-100" alt=""></div>
                        </div>
                        <div class="card-title">${arr[i].strCategory}</div>
                         
                        <hr class="card-divider">
                        
                        <div class="card-footer">
                            <button class="card-btn" onclick="getCategoryMeals('${arr[i].strCategory}');getCategoriesPara('${arr[i].strCategory}'); closeSideNav()">
                                <p>See Recipes</p>
                            </button>
                        </div>
                    </div>
                </div>
        `;
  }

  $("#cardsGroup").html(mealsArr);
}

async function getArea() {
  $(".inner").fadeIn(0);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();

  displayArea(respone.meals);
  $(".inner").fadeOut(1000);
}

function displayArea(arr) {
  let mealsArr = "";

  for (let i = 0; i < arr.length; i++) {
    mealsArr += `

        <div class="cardunit col-md-6 col-lg-4 ">
                    <div class="card ">

                        <div class="card-title">${arr[i].strArea}</div>
                         
                        <hr class="card-divider">
                        
                        <div class="card-footer">
                            <button class="card-btn" onclick="getAreaMeals('${arr[i].strArea}'); closeSideNav()">
                                <p>See Recipes</p>
                            </button>
                        </div>
                    </div>
          </div>
        `;
  }

  $("#cardsGroup").html(mealsArr);
}

async function getIngredients() {
  $(".inner").fadeIn(0);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  displayIngredients(respone.meals);
  $(".inner").fadeOut(1000);
}

function displayIngredients(arr) {
  let mealsArr = "";

  for (let i = 0; i < arr.length; i++) {
    mealsArr += `
               <div class="cardunit col-md-6 col-lg-4 ">
                    <div class="card ">

                        <div class="card-title">${arr[i].strIngredient}</div>
                         
                        <hr class="card-divider">
                        
                        <div class="card-footer">
                            <button class="card-btn" onclick="getIngredientsMeals('${arr[i].strIngredient}'); closeSideNav()">
                                <p>See Recipes</p>
                            </button>
                        </div>
                    </div>
          </div>
        `;
  }

  $("#cardsGroup").html(mealsArr);
}

async function getCategoryMeals(category) {
  $(".inner").fadeIn(0);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals);
  $(".inner").fadeOut(1000);
}

async function getAreaMeals(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

async function getIngredientsMeals(ingredients) {
  $(".inner").fadeIn(0);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner").fadeOut(1000);
}

async function getMealDetails(mealID) {
  $(".inner").fadeIn(0);

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  displayMealDetails(respone.meals[0]);
  $(".inner").fadeOut(1000);
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) {
    tags = [`<li class="alert alert-danger m-2 p-1">No tags available</li>`];
  }

  let tagsGroup = "";
  for (let i = 0; i < tags.length; i++) {
    tagsGroup += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let mealsArr = `       
            <div class="cardunit col-md-4  ">  
                    <div class="card recipecard">
                        <div class="card-img">
                            <div class="img"><img src="${meal.strMealThumb}" class="w-100" alt=""></div>
                        </div>
                        <hr class="card-divider">

                        <div class="card-title"><h2>${meal.strMeal}</h2>
                        </div>

                    </div>
                </div>
                <div class="cardunit col-md-8  ">
                    <div class="card ">

                        <div class="card-title">
                            <h2>Instructions</h2>
                        </div>

                        <hr class="card-divider">

                        <p>${meal.strInstructions}</p>

                        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                        <h3>Recipes :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}
                        </ul>
                        <h3>Tags :</h3>
                        <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsGroup}
                        </ul>
                        <div class="card-footer">

                            <a target="_blank" href="${meal.strSource}"
                                class="yellowish">Source</a>


                            <a target="_blank" href="${meal.strYoutube}">Youtube</a>

                        </div>
                    </div>
                </div>`;

  $("#cardsGroup").html(mealsArr);
}

function showSearchInputs() {
  $(".SearchGroup").fadeIn(500);
  $("#cardsGroup").html("");
}

function hideSearchInputs() {
  $(".SearchGroup").fadeOut(10);
}

async function searchByName(term) {
  closeSideNav();
  $("#cardsGroup").html("");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

async function searchByFLetter(term) {
  closeSideNav();
  $("#cardsGroup").html("");

  term == "" ? (term = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
}

function showContacts() {
  $(".ContactGroup").fadeIn(500);
  $("#cardsGroup").html("");
  nameInput = document.getElementById("nameInput");
  emailInput = document.getElementById("emailInput");
  phoneInput = document.getElementById("phoneInput");
  subject = document.getElementById("subject");
  message = document.getElementById("message");
  submitBtn = document.getElementById("submitBtn");
}

function hideContacts() {
  $(".ContactGroup").fadeOut(10);
}

function nameIsValid() {
  var regex = /^[A-Za-z0-9_]{3,}$/;

  if (regex.test(nameInput.value) == true && nameInput.value != "") {
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
    return true;
  } else {
    nameInput.classList.add("invalid");
    nameInput.classList.remove("valid");
    return false;
  }
}

function emailIsValid() {
  var regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (regex.test(emailInput.value) == true && emailInput.value != "") {
    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
    return true;
  } else {
    emailInput.classList.add("invalid");
    emailInput.classList.remove("valid");
    return false;
  }
}

function phoneIsValid() {
  var regex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

  if (regex.test(phoneInput.value) == true && phoneInput.value != "") {
    phoneInput.classList.add("valid");
    phoneInput.classList.remove("invalid");
    return true;
  } else {
    phoneInput.classList.add("invalid");
    phoneInput.classList.remove("valid");
    return false;
  }
}

function subjectIsValid() {
  var regex = /^[A-Za-z0-9_]{3,}$/;
  if (regex.test(subject.value) == true && subject.value != "") {
    subject.classList.add("valid");
    subject.classList.remove("invalid");
    return true;
  } else {
    subject.classList.add("invalid");
    subject.classList.remove("valid");
    return false;
  }
}

function messageIsValid() {
  var regex = /^[A-Za-z0-9_]{3,}$/;

  if (regex.test(message.value) == true && message.value != "") {
    message.classList.add("valid");
    message.classList.remove("invalid");
    return true;
  } else {
    message.classList.add("invalid");
    message.classList.remove("valid");
    return false;
  }
}

function inputsValidation() {
  if (
    nameIsValid() &&
    emailIsValid() &&
    phoneIsValid() &&
    subjectIsValid() &&
    messageIsValid()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function submit() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  subject.value = "";
  message.value = "";
  submitBtn.value = "";
}

// async function getCategoriesPara(category) {
//   let response = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/categories.php`
//   );
//   response = await response.json();

//   displayCategoriesPara(response.categories, category);
//   console.log(response.categories);
// }

// function displayCategoriesPara(arr, category) {
//   let Categories = ``;

//   for (let i = 1; i < arr.length; i++) {
//     if ((arr[i].strCategory = category)) {
//       Categories = `
//       <h3>${arr[i].strCategory}</h3>
//       <p>${arr[i].strCategoryDescription}</p>`;
//     }
//   }
//   $(".para").html(Categories);
// }
