let isDisplayingaMeal = false;
function init() {
    const btn = document.querySelector(".btn");
    let randomMealObj = {};
    btn.addEventListener("click", () => {
        if (isDisplayingaMeal == true) {
            DestroyElements();
        }
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(res => res.json())
            .then(res => {
                randomMealObj = res.meals[0];
                console.log(randomMealObj);
                DisplayMeal(randomMealObj);
            })
            .catch(err => console.log(err))
    })
}
init();

function DisplayMeal(randMeal) {
    isDisplayingaMeal = true;
    const container = document.querySelector(".container");
    const div = container.nextElementSibling;
    const lastDiv = div.nextElementSibling;
    lastDiv.classList.add("lastDiv");
    console.log(lastDiv);
    div.classList.add("displayContainer");
    const firstChildE = firstChild(randMeal)
    div.appendChild(firstChildE);
    const iframeElement = getiFrame(randMeal);
    lastDiv.innerHTML=iframeElement;
}

function getiFrame(randMeal) {
    const videoId = randMeal.strYoutube.split("=")[1];
    const iframeMarkup = '<h1>Video Recipe:</h1><iframe width="560" height="315" src="//www.youtube.com/embed/'
        + videoId + '" frameborder="0" allowfullscreen></iframe>';
    return iframeMarkup;
}

function firstChild(randMeal) {
    const imgAndinfo = document.createElement("div");
    imgAndinfo.classList.add("imgAndinfo");
    const div1 = createDiv1(randMeal);
    div1.classList.add("div1");
    const div2 = createDiv2(randMeal);
    div2.classList.add("div2");

    imgAndinfo.appendChild(div1);
    imgAndinfo.appendChild(div2);
    return imgAndinfo;
}

function ulElement(randMeal) {
    const ul = document.createElement("ul");
    const indigridents = getIndigredents(randMeal);
    const temp = document.createElement("h3");
    temp.textContent = "Ingredients:";
    ul.appendChild(temp);
    indigridents.val.forEach((item, ind) => {
        const li = document.createElement("li");
        li.textContent = item + " - " + indigridents.meas[ind];
        ul.appendChild(li);
    })
    return ul;
}

function createDiv1(randMeal) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = randMeal.strMealThumb;

    const div1 = document.createElement("div");
    div1.appendChild(img);
    const category = document.createElement("b");
    category.textContent = `Category: ${randMeal.strCategory}`;
    const area = document.createElement("b");
    area.textContent = `Area: ${randMeal.strArea}`;
    div1.appendChild(category);
    div1.appendChild(area);
    if (randMeal.strTags != null) {
        const tags = document.createElement("b");
        tags.textContent = `Tags: ${randMeal.strTags}`;
        div1.appendChild(tags);
    }
    const ul = ulElement(randMeal);

    div.appendChild(div1);
    div.appendChild(ul);
    return div;
}

function getIndigredents(randMeal) {
    const arrVal = [];
    const arrMeas = []
    for (const [key, value] of Object.entries(randMeal)) {
        if (key.substring(0, 13) == "strIngredient" && value != "" && value != null) {
            arrVal.push(value);
        }
        if (key.substring(0, 10) == "strMeasure" && value != "" && value != null) {
            arrMeas.push(value);
        }
    }
    return { val: arrVal, meas: arrMeas };
}

function createDiv2(randMeal) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const p = document.createElement("p");
    p.textContent = randMeal.strInstructions;
    title.textContent = randMeal.strMeal;
    div.appendChild(title);
    div.appendChild(p);
    return div;
}


function DestroyElements() {
    const container = document.querySelector(".container");
    const div = container.nextElementSibling;
    const div2 = div.nextElementSibling;
    div.classList.remove("displayContainer");
    div.innerHTML = "";
    div2.innerHTML="";
}