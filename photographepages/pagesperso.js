let urlPage= window.location.search;
const urlSearchParams= new URLSearchParams(urlPage);
const idd= urlSearchParams.get("id");
const iddd= Number(idd); 
function enTete(){
    const element = document.createElement("header");
    element.innerHTML = `
        <div id="boxHeader">
            <a href="index.html" id="lienRetour"><img src="./média/logo.png" alt="logo Fish Eye" id="logo"></a>
             
        </div>
        
    `;
    document
        .getElementById('app')
        .appendChild(element)
}
enTete();

function main(){
    const element = document.createElement("main");
    element.innerHTML = `
    <article id="vignettePhotographer"></article>
    <div id="boxTrier"></div>
    <aside id="gallery"></aside>
    `;
    document
        .getElementById('app')
        .appendChild(element)
}
main()
function trier(){
    const elt=document.createElement("div");
    elt.innerHTML=`
    <p>Trier par</p>
    <ul>
        <li><button>Popularité</button></li>
        <li><button>Date</button></li>
        <li><button>Titre</button></li>

    </ul>
    `;
    return elt;
}
function vignettePhotographerSelectionner(photographer){
    const elt= document.createElement("div");
    elt.setAttribute("id","boxPhotographer")
    elt.innerHTML=`
        <div id="box">
            <h1 class="namePhotographer">${photographer.name}</h1>
            <p class="cityPhotographer">${photographer.city},${photographer.country}</p>
            <p class="quotePhotographer">${photographer.tagline}</p>
            <div id="tagsPhotographer" ></div>
        </div>
        <button id="btnContactezMoi">Contactez-moi</button>
        <img class="imgId" src="./média/PhotographersIdPhotos/${photographer.portrait}" />
        <aside class="pricePhotographer">${coeur}<i class="fas fa-heart"></i> ${photographer.price}€/jour</aside>
    `;
    return elt;
}
function displayPhotographerTags(elementt){
    let element= document.createElement("button")
    element.setAttribute("class","tags")
    element.classList.add("Btn"+elementt)
    element.textContent=` #${elementt} ` 
    return element;
}
function gallery(elementt,photographerName) {
    
    if(elementt.image==undefined){
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.innerHTML=`
        <a href=""><video src="./média/${photographerName}/${elementt.video}" poster="" class="vignetteMedia" alt="${elementt.title}"></video></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <p class="mediaCoeur">${elementt.likes}<i class="fas fa-heart"></i></p>
        </div>
        `
        return elt;
    }else{
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.innerHTML=`
        <a href=""><img src="./média/${photographerName}/${elementt.image}"  class="vignetteMedia"></img></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <p class="mediaCoeur">${elementt.likes}<i class="fas fa-heart"></i></p>
        </div>
        ` 
        return elt;
    }
    
}
let coeur= 0;
fetch("../../data.json")
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
            console.log(value.media);
            console.log(iddd);
            let photographerSelectionner=value.photographers.filter(photographer=>photographer.id==iddd);
            
            document
                .getElementById("vignettePhotographer")
                .appendChild(vignettePhotographerSelectionner(photographerSelectionner[0]));
            photographerSelectionner[0].tags.forEach((elementt)=>{
                document
                .getElementById("tagsPhotographer")
                .appendChild(displayPhotographerTags(elementt));
            })
            document
                .getElementById("boxTrier")
                .appendChild(trier());
            let produitSelectionner= value.media.filter(photo=>photo.photographerId===iddd);
            produitSelectionner.forEach((element)=>{
                
                coeur+=element.likes;
                console.log(coeur)
                let photographerName=photographerSelectionner[0].name;
                document
                    .getElementById("gallery")
                    .appendChild(gallery(element,photographerName))
            })
        })
        
        
        .catch(function (err) {
          console.error(err);
        });