let urlPage= window.location.search;
const urlSearchParams= new URLSearchParams(urlPage);
const idd= urlSearchParams.get("id");
const iddd= Number(idd); 
function enTete(){
    const element = document.createElement("header");
    element.innerHTML = `
        <div id="boxHeader">
            <a href="../../index.html" id="lienRetour"><img src="./média/logo.png" alt="logo Fish Eye" id="logo"></a>
             
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
    <aside id="gallery"><div id="boxGallery"></div></aside>
    
    `;
    document
        .getElementById('app')
        .appendChild(element)
}
main()

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
        <aside class="pricePhotographer"><p id="textStatique"><div id="nbrLikes"></div><i class="fas fa-heart"></i> ${photographer.price}€/jour</p></aside>
    `;
    return elt;
}
function trier(){
    const elt=document.getElementById('boxTrier');
    elt.innerHTML=`
    <p>Trier par</p>
    <ul id="menuDeroulant">
        <li><button class="menuDeroulantBouton" id="btnPopu">Popularité</button></li>
        <li><button class="menuDeroulantBouton " id="btnDate">Date</button></li>
        <li><button class="menuDeroulantBouton " id="btnTitre">Titre</button></li>

    </ul>
    <i class="fas fa-chevron-up" id="chevron"></i>
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

function gallery(elementt,photographerName,photoName) {
    
    if(elementt.image==undefined){
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.setAttribute("id",photoName);
        elt.innerHTML=`
        <a href="./média/${photographerName}/${elementt.video}"><video src="./média/${photographerName}/${elementt.video}" poster="" class="vignetteMedia" alt="${elementt.title}"></video></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <p class="mediaCoeur">${elementt.likes}<i class="fas fa-heart heartMedia " ></i></p>
        </div>
        `
        return elt;
    }else{
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.setAttribute("id",photoName);
        elt.innerHTML=`
        <a href="./média/${photographerName}/${elementt.image}"><img src="./média/${photographerName}/${elementt.image}"  class="vignetteMedia"></img></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <p class="mediaCoeur">${elementt.likes}<i class="fas fa-heart heartMedia"></i></p>
        </div>
        ` 
        return elt;
        
    }
    
}

function boxGalle(){
    let elt=document.createElement("div")
    elt.setAttribute("id","boxGallery")
    return elt;
}

let coeur= 0;
let tabNamePhoto=[];
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
            });

            trier();
            let produitSelectionner= value.media.filter(photo=>photo.photographerId===iddd);
            
            produitSelectionner.forEach((element)=>{
                let photoName= element.title.replace(/ /g,"");
                tabNamePhoto.push(photoName)
                coeur+=element.likes;
                let photographerName=photographerSelectionner[0].name;
                document
                    .getElementById("boxGallery")
                    .appendChild(gallery(element,photographerName,photoName)) 
            
            });
            document
                .getElementById("nbrLikes")
                .textContent =` ${coeur} `;
           
            function btnpopu(name,tableau){
                let triProduitSelectionner= tableau.sort(function(a,b){return Number(b.likes)-Number(a.likes)});
                console.log(triProduitSelectionner)
                document.getElementById("btnPopu").style.top="-1px";
                document.getElementById("btnPopu").style.display="block";
                bb="btnPopu";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                document
                    .getElementById("boxGallery")
                    .appendChild(displaytrier(triProduitSelectionner,name));
                Lightbox.init();
            }
            function btndate(name,tableau){
                let triProduitSelectionner= tableau.sort(function(a,b){return Date.parse(a.date)-Date.parse(b.date)});
                console.log(triProduitSelectionner)
                bb="btnDate"
                document.getElementById("btnDate").style.top="-1px";
                document.getElementById("btnDate").style.display="block";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                document
                    .getElementById("boxGallery")
                    .appendChild(displaytrier(triProduitSelectionner,name));
                Lightbox.init();
            }
            function btntitre(name,tableau){
                let triProduitSelectionner= tableau.sort(function(a,b){return a.title.localeCompare(b.title)});
                console.log(triProduitSelectionner)
                bb="btnTitre";
                document.getElementById("btnTitre").style.top="-1px";
                document.getElementById("btnTitre").style.display="block";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                document
                    .getElementById("boxGallery")
                    .appendChild(displaytrier(triProduitSelectionner,name));
                Lightbox.init();
            }
            function boxtrie(){
                document.getElementById("btnPopu").style.top="-1px";
                document.getElementById("btnPopu").style.display="block";
                document.getElementById("btnDate").style.top="2.5rem";
                document.getElementById("btnDate").style.display="block";
                document.getElementById("btnTitre").style.top="5rem";
                document.getElementById("btnTitre").style.display="block";
                document.getElementById("menuDeroulant").style.width="8.5rem"
                document.getElementById("menuDeroulant").style.height="8rem";
            }
            function boxtrieout(aa){
                document.getElementById("btnPopu").style.display="none";
                document.getElementById("btnDate").style.display="none";
                document.getElementById("btnTitre").style.display="none";
                document.getElementById(aa).style.display="block";
                document.getElementById(aa).style.top="-1px";
                document.getElementById("menuDeroulant").style.height="2.5rem";
            }
             function displaytrier(tableau,name){
                tabNamePhoto=[];
                console.log(tabNamePhoto)
                tableau.forEach((element)=>{
                    let photoName= element.title.replace(/ /g,"");
                    tabNamePhoto.push(photoName)
                    document
                        .getElementById("boxGallery")
                        .appendChild(gallery(element,name))
                })
            }
            function displayForm(){
                let elt=document.createElement("div");
                elt.setAttribute("id","bground");
                elt.innerHTML=`
                <div id="boxForm">
                    <h1 id="titreForm">Contactez-moi ${photographerSelectionner[0].name}</h1>
                    <i class="fas fa-times" id="closeForm"></i>
                    <form name="contact" method="get" action="" id="form" onsubmit="return validate();">
                        <label for="First">Prénom</label>
                        <input type="text" id="first" name="first"></input>

                        <label for="Last">Nom</label>
                        <input type="text" id="last" name="Last"></input>

                        <label for="Email">Email</label>
                        <input type="text" id="email" name="Email"></input>

                        <label for="message">Votre message</label>
                        <textarea id="message" name="message" ></textarea>

                        <input type="submit" id="btnSubmit" value="Envoyer">

                    </form>
                </div>
                
                `;
                document
                    .getElementById("vignettePhotographer")
                    .appendChild(elt);
                let btnCloseForm=document.getElementById("closeForm");
                btnCloseForm.addEventListener("click",()=>closeForm())
                let btnSubmit=document.getElementById("btnSubmit");
                btnSubmit.addEventListener("click",sendForm)
                }
            function closeForm(){
                document.getElementById("bground").style.display="none";
                
            }
            function sendForm(evt){
                evt.preventDefault();
                console.log(document.getElementById("first").value)
                console.log(document.getElementById("last").value)
                console.log(document.getElementById("email").value)
                console.log(document.getElementById("message").value)
                closeForm()
            }
            let bb="btnPopu";
            let btnPopu= document.getElementById("btnPopu");
            let btnDate= document.getElementById("btnDate");
            let btnTitre= document.getElementById("btnTitre");
            let boxtri= document.getElementById("menuDeroulant");
            let btnContactMe=document.getElementById("btnContactezMoi");
           
            
            btnPopu.addEventListener("click", ()=>btnpopu(photographerSelectionner[0].name,produitSelectionner))
            btnDate.addEventListener("click", ()=>btndate(photographerSelectionner[0].name,produitSelectionner))
            btnTitre.addEventListener("click", ()=>btntitre(photographerSelectionner[0].name,produitSelectionner))
            boxtri.addEventListener("mouseover",()=>boxtrie())
            boxtri.addEventListener("mouseout",()=>boxtrieout(bb))
            btnContactMe.addEventListener("click",()=>displayForm())
            
            
            /*let newLikes=coeur;
            function btnHeart(a){
                newLikes=newLikes+1;
                console.log(tabNamePhoto)
                console.log(a)
                document.getElementById("nbrLikes").innerHTML=newLikes;
                console.log(document.querySelector("#"+tabNamePhoto[a]+" .mediaCoeur"))
                
            }
            let btnHeartMedia=document.getElementsByClassName("heartMedia")
            let a=0;
            for(var i=0; i<btnHeartMedia.length; i++){
                console.log(a)
                btnHeartMedia[i].addEventListener('click',()=>btnHeart(a));
                a=a+1;
            }*/
            class Lightbox{
                static init(){
                    const links=Array.from(document.querySelectorAll('a[href$=".jpg"],a[href$=".mp4"]'))
                    const gal= links.map(link=>link.getAttribute('href'))
                    
                    links.forEach(link=> link.addEventListener("click", e=>{
                        e.preventDefault(); 
                        new Lightbox(e.currentTarget.getAttribute('href'),gal)
                    }))
                }

                constructor(url,gal){
                    this.element= this.displayLightbox(url)
                    this.gal=gal
                    this.onKeyUp= this.onKeyUp.bind(this)
                    document.body.appendChild(this.element)
                    document.addEventListener('keyup',this.onKeyUp)

                }
                
                close(e){
                    e.preventDefault();
                    this.element.classList.add("closeBox")
                    window.setTimeout(()=>{
                        this.element.parentElement.removeChild(this.element)
                    },500)
                    document.removeEventListener('keyup',this.onKeyUp)

                }
                next(e){
                    e.preventDefault()
                    const i = this.gal.findIndex(image=>image==this.url)

                }
                onKeyUp(e){
                    if(e.key=='Escape'){
                        this.close(e)
                    }
                }
                displayLightbox(url) {
                    this.url=url
                    let elt=document.createElement("div");
                    elt.setAttribute("class","lightbox")
                    elt.innerHTML=`
                        <i class="fas fa-chevron-up " id="next"></i>
                        <i class="fas fa-chevron-up " id="prev"></i>
                        <i class="fas fa-times" id="closeLightbox"></i>
                        <div id="container">
                            <img src="${url}" alt="" id="photo">
                        </div>
                    `;
                       
                    elt.querySelector("#closeLightbox").addEventListener('click',this.close.bind(this))
                    elt.querySelector("#next").addEventListener('click',this.next.bind(this))
                    //elt.querySelector("#prev").addEventListener('click',this.prev.bind(this))
                    
                    return elt;
                }
            }
            Lightbox.init();


            })
        
        
        .catch(function (err) {
          console.error(err);
        });

         