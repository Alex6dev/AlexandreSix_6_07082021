/*-------------------fonction pour creer le header--------------------------*/
function enTete(){
    const element = document.createElement("header");
    element.innerHTML = `
        <div id="boxHeader">
            <a href="index.html" id="lienRetour"><img src="./média/logo.png" alt="logo Fish Eye" id="logo"></a>
            <nav id="navigationTags">
                <ul id="liste">
                    <li class="btn">
                        <button class="tags Btnportrait ">#Portrait</button>
                    </li >
                    <li class="btn">
                        <button class="tags Btnart">#Art</button>
                    </li >    
                    <li class="btn">
                        <button class="tags Btnfashion">#Fashion</button>
                    </li >
                    <li class="btn">
                        <button class="tags Btnarchitecture">#Architecture</button>
                    </li >
                    <li class="btn">
                        <button class="tags Btntravel">#Travel</button>
                    </li >
                    <li class="btn">    
                        <button class="tags Btnsports">#Sports</button>
                    </li >    
                    <li class="btn">
                        <button class="tags Btnanimals">#Animals</button>
                    </li >    
                    <li class="btn">
                        <button class="tags Btnevents">#Events</button>
                    </li>
                </ul> 
            </nav>  
        </div>
        
    `;
    document
        .getElementById('app')
        .appendChild(element)
}
enTete();
/*----------------------------------fonction pour creer le main------------------------*/
function main(){
    const element = document.createElement("main");
    element.innerHTML = `
    <h1 id="titreNosPhotographes">Nos photographes</h1>
    <nav id="navRetourPhotographers"><a href="#boxVignette" id="btnRetourPhotographers">Retour au debut de la liste</a></nav>
    <article id="boxVignette"></article>
    `;
    document
        .getElementById('app')
        .appendChild(element)

    
}
main()


function displayPhotographerVignette(photographer) {
    let nameClass=photographer.name;
    let newName=nameClass.replace(/ /g,"");
    const element = document.createElement("div");
    element.setAttribute("class","boxArtiste");
    element.classList.add(newName);
    element.innerHTML = ` 
        <a href="./photographepages/photographepages.html?id=${photographer.id}" >
            <img class="imgId" src="./média/PhotographersIdPhotos/${photographer.portrait}" />
            <h2 class="namePhotographer">${photographer.name}</h2>
        </a>
        <p class="cityPhotographer">${photographer.city},${photographer.country}</p>
        <p class="quotePhotographer">${photographer.tagline}</p>
        <p class="pricePhotographer">${photographer.price}€/jour</p>
        <div class="tagsPhotographer" ></div>
    `;
    return element;
}

function displayPhotographerTags(elementt){
    let element= document.createElement("button")
    element.setAttribute("class","tags")
    element.classList.add("Btn"+elementt)
    element.textContent=` #${elementt} ` 
    return element;
}
/*------------------------------fonction bouton tags------------------------------------------------ */
function buttontags(nom){
    let elt=document.getElementsByClassName("boxArtiste");
    for(var i=0; i<elt.length;i+=1){
        elt[i].style.display="none";
    }
    let eltt=document.getElementsByClassName(nom);
    for(var i=0; i<eltt.length;i+=1){
        eltt[i].style.display="block";
    }
}
function EventListener(elt, tags){
    for(var i=0; i<elt.length; i++){
        elt[i].addEventListener('click',()=>buttontags(tags));
    }
}
function createvignette(){
    let listPhotographers=[];
    fetch("data.json")
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          console.log(value);
          listPhotographers= value;
        })
        
        .then(function(){
            listPhotographers.photographers.forEach((photographer)=>{
                document
                    .getElementById("boxVignette")
                    .appendChild(displayPhotographerVignette(photographer));
                photographer.tags.forEach((elementt)=>{
                    let nameClass=photographer.name;
                    let newName=nameClass.replace(/ /g,"");
                    document
                        .querySelector("div.boxArtiste."+newName)
                        .classList.add(elementt)
                    document
                        .querySelector("div.boxArtiste."+newName+" div.tagsPhotographer")
                        .appendChild(displayPhotographerTags(elementt));
                })
            })
            let portraitBtn= document.getElementsByClassName("Btnportrait");
            let artBtn= document.getElementsByClassName("Btnart");
            let fashionBtn= document.getElementsByClassName("Btnfashion");
            let architectureBtn= document.getElementsByClassName("Btnarchitecture");
            let travelBtn= document.getElementsByClassName("Btntravel");
            let sportsBtn= document.getElementsByClassName("Btnsports");
            let animalsBtn= document.getElementsByClassName("Btnanimals");
            let eventsBtn= document.getElementsByClassName("Btnevents");

            EventListener(portraitBtn,"portrait");
            EventListener(artBtn,"art");
            EventListener(fashionBtn,"fashion");
            EventListener(architectureBtn,"architecture");
            EventListener(travelBtn,"travel");
            EventListener(sportsBtn,"sports");
            EventListener(animalsBtn,"animals");
            EventListener(eventsBtn,"events");
        })
        .catch(function (err) {
          console.error(err)
        });
}
createvignette()










