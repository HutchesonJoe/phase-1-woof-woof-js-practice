let dogBar = document.getElementById("dog-bar")

let getDogs = fetch(' http://localhost:3000/pups',{
  method: 'GET',
  headers:
  {
    "Content-type" : "application/json",
    }
})

.then (response => {return response.json()})
.then (function(data){
  let dogArray = data
  dogArray.map(dog => makeDogSpan(dog))
})

//making the dog list global
let dogInfoArray = []
    //creating span

function makeDogSpan(dog){
  let dogSpan = document.createElement("span")
  dogSpan.textContent = dog.name
  dogSpan.id = dog.name
  dogSpan.className = dog.isGoodDog
  dogBar.append(dogSpan);
  dogSpan.addEventListener("click", openDogInfo)
  dogInfoArray.push(dog)
    }
  

  
 
function openDogInfo(e){
let dogName = e.target.id
let thisDogSpan = e.target
let dogInfo = document.getElementById("dog-info")
dogInfo.textContent = ""
let thisDogInfo = dogInfoArray.filter(dog => dogName === dog.name)
console.log(thisDogInfo)
  let dogId = thisDogInfo[0].id 
  let dogImageSrc = thisDogInfo[0].image
  let ifGoodDog = thisDogInfo[0].isGoodDog
  let dogPicDiv = document.createElement("p")
  dogPicDiv.id = dogName
  let dogPic = document.createElement("img")
  dogPic.src = dogImageSrc
  dogPic.style.width = "150px"
  dogPicDiv.append(dogPic)
  let dogNameHeading = document.createElement("h2");
  dogNameHeading.textContent = dogName
  dogInfo.append(dogPicDiv)
  dogInfo.append(dogNameHeading)
  let goodDogButton = document.createElement("button")
  goodDogButton.textContent = ifGoodDog
  goodDogButton.id = dogId
  goodDogButton.addEventListener('click', dogSwitch)
  console.log(goodDogButton)
  if (ifGoodDog === true){
    goodDogButton.textContent = "Good Dog!"
  } else if (ifGoodDog === false){
    goodDogButton.textContent = "Bad Dog!"}
    dogInfo.append(goodDogButton)
}

function dogSwitch(e){
  let goodDogValue = e.target.textContent
  let dogButton = e.target
  let dogId = e.target.id
  
  if (goodDogValue === "Good Dog!"){
    e.target.textContent = "";
    e.target.textContent = "Bad Dog!"
    
    dogButton.className = "Bad Dog!"
//switch to bad dog
    let getDogs = fetch(`http://localhost:3000/pups/${dogId}`,{
      method: 'PATCH',
      headers:
      {
        "Content-type" : "application/json",
        },
      body:JSON.stringify(
      {
      "isGoodDog" : "Bad Dog!"

      })
    })
    
    .then (response => {return response.json()})
    .then (function(data){
      console.log(data)
    }) 
//switch to good dog
  } else if (goodDogValue === "Bad Dog!"){
    e.target.textContent = "";
    e.target.textContent = "Good Dog!"
    e.target.className = "Good Dog!"
    let getDogs = fetch(`http://localhost:3000/pups/${dogId}`,{
      method: 'PATCH',
      headers:
      {
        "Content-type" : "application/json",
        },
      body:JSON.stringify(
      {
      "isGoodDog" : "Good Dog!"
      })
    })
    .then (response => {return response.json()})
    .then (function(data){
      console.log(data)
    }) 
  }
}

let filterButton = document.getElementById("good-dog-filter");
filterButton.addEventListener("click", goodDogFilter);

function goodDogFilter(e){
  
  let thisButton = e.target
  let thisButtonText = thisButton.innerHTML
  if (thisButtonText === "Filter good dogs: OFF"){
   goodDogsOnly()
    thisButton.innerHTML = "Filter good dogs: ON"
    
  } else if (thisButtonText === "Filter good dogs: ON"){
    //thisButtonText = "";
    thisButton.innerHTML = "Filter good dogs: OFF"
  }
}

function goodDogsOnly(){
  let dogBar = document.getElementById("dog-bar")
  let badDogs = document.getElementsByClassName("Bad Dog!")
 // badDogs.remove()
  console.log(badDogs)
 
}