document.querySelector("#bdy").innerHTML=`
<h1 class="container">✨My Pokedex✨</h1><br>
<div class="container" align="center" id="searchBox">
    <button type="button" id="first" class="btn btn-dark">⌂</button>
    <input type="text" id="searchBar" placeholder=" Search for the pokemon name here (eg: bulbasaur) "/>
    <button class="btn btn-dark" id="searchbtn">&#128269;</button>   
    </div><br>
<ul id="listofpokemon" class="container"></ul>
<p id="result"></p>
<nav id="navbar">
<button class="btn btn-dark" id="prev"><<</button>
<button class="btn btn-dark" id="btn1">1</button>
<button class="btn btn-dark" id="btn2">2</button>
<button class="btn btn-dark" id="btn3">3</button>
<button class="btn btn-dark" id="btn4">4</button>
<button class="btn btn-dark" id="btn5">5</button>
<button class="btn btn-dark" id="next">>></button>
<button class="btn btn-dark" id="last">Last</button>
</nav><br>
`;

let currentPage=1, firstItem, lastItem;
let unfiltered=[],filtered=[];
const first = document.querySelector('#first');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const last = document.querySelector('#last');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');
const listOfPokemon = document.querySelector("#listofpokemon");

myFn = (async () => {
    document.querySelector("#result").innerHTML=
    listOfPokemon.innerHTML="";
    try {
        firstItem = currentPage*9-8;
        lastItem = currentPage*10-currentPage;
        if (currentPage>=5) {
        btn1.innerHTML = currentPage-4;
        btn2.innerHTML = currentPage-3;
        btn3.innerHTML = currentPage-2;
        btn4.innerHTML = currentPage-1;
        btn5.innerHTML = currentPage;
        }
      for (let i = firstItem; i <= lastItem; i++) {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let object = await res.json();
        getData(object);
    }
    } 
    catch (error) {
      console.log(error);
    }
  });

  getData = (object) => {
    let name = object.name;
    let image = object.sprites.front_default;
    let type = object.types.map(data => data.type.name);
    let abil = object.abilities.map(data => data.ability.name);
    let moves = object.moves.map(data => data.move.name);
    let wt = object.weight;
listOfPokemon.innerHTML += `
<li class="card">
<img class="card-img-top" src="${image}"/>
<div class="card-body">
<h3 class="card-title">${object.id}. ${name}</h3>
<p class="card-text">Weight: ${wt} kg</p>
<p class="card-text">Abilities: ${abil}</p>
<p class="card-text">Type: ${type}</p>
<p class="card-text">Moves: ${moves}</p>
</div>
</li>
`;
  }

  myFn();

  searchbtn.addEventListener('click', async () => {
    const text = document.getElementById("searchBar").value.toLowerCase();
    document.querySelector("#result").innerHTML="";
    listOfPokemon.innerHTML="";
    if (text.length<1){
        myFn();
        // break;
    }
    try {
      for (let i = 1; i <= 180; i++) {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let data = await res.json();
        unfiltered=[...unfiltered,data];        
    }
    filtered=unfiltered.filter(obj=>obj.name==text);
    if (filtered.length > 0){
    getData(filtered[0]);
    }
    else if (text.length<1) {
        document.querySelector("#result").innerHTML="";    
    }
    else
    document.querySelector("#result").innerHTML=`<p align="center">No results found</p>`;
}
    catch (error) {
      console.log(error);
    }
  });

  first.addEventListener('click', () => {
    currentPage=1;
    btn1.innerHTML = currentPage;
    btn2.innerHTML = currentPage+1;
    btn3.innerHTML = currentPage+2;
    btn4.innerHTML = currentPage+3;
    btn5.innerHTML = currentPage+4;
    myFn();
})

prev.addEventListener('click', () => {
    if (currentPage>1){
    currentPage--;
    btn1.innerHTML = currentPage;
    btn2.innerHTML = currentPage+1;
    btn3.innerHTML = currentPage+2;
    btn4.innerHTML = currentPage+3;
    btn5.innerHTML = currentPage+4;
    myFn();
    }
});

btn1.addEventListener('click', () => {
    currentPage = Number(btn1.innerHTML);
    myFn();
});

btn2.addEventListener('click', () => {
    currentPage = Number(btn2.innerHTML);
    myFn();
});

btn3.addEventListener('click', () => {
    currentPage = Number(btn3.innerHTML);
    myFn();
});

btn4.addEventListener('click', () => {
    currentPage = Number(btn4.innerHTML);
    myFn();
});

btn5.addEventListener('click', () => {
    currentPage = Number(btn5.innerHTML);
    myFn();
});

next.addEventListener('click', () => {
    if (currentPage<20 && currentPage>=5){
        currentPage++;
    btn1.innerHTML = currentPage-4;
    btn2.innerHTML = currentPage-3;
    btn3.innerHTML = currentPage-2;
    btn4.innerHTML = currentPage-1;
    btn5.innerHTML = currentPage;
        myFn();
    }
    else if (currentPage<5)
    {
    currentPage++;
    myFn();
}
})

last.addEventListener('click', () => {
    currentPage=20;
    btn1.innerHTML = currentPage-4;
    btn2.innerHTML = currentPage-3;
    btn3.innerHTML = currentPage-2;
    btn4.innerHTML = currentPage-1;
    btn5.innerHTML = currentPage;
    myFn();
})