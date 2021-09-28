let urlPage= window.location.search;
const urlSearchParams= new URLSearchParams(urlPage);
const idd= urlSearchParams.get("id");
const iddd= Number(idd); 
function enTete(){
    const element = document.createElement("header");
    element.innerHTML = `
        <div id="boxHeader">
            <a href="../../index.html" id="lienRetour"><img src="./média/logo.png" alt="Fisheye Home Page" id="logo"   ></a>
             
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
        <div id="box" aria-label="vignette du photographe">
            <h2 class="namePhotographer">${photographer.name}</h2>
            <p class="cityPhotographer">${photographer.city},${photographer.country}</p>
            <p class="quotePhotographer">${photographer.tagline}</p>
            <div id="tagsPhotographer" ></div>
        </div>
        <button id="btnContactezMoi" aria-label="bouton formulaire contactez le photographe">Contactez-moi</button>
        <img class="imgId" src="./média/PhotographersIdPhotos/${photographer.portrait}" alt="photo du photographe" />
        <aside class="pricePhotographer">
            <p id="nbrLikes">   </p>
            <i class="fas fa-heart">   </i> 
            <p id="price">${photographer.price}€/jour  </p>      
        </aside>
    `;
    return elt;
}
function trier(){
    const elt=document.getElementById('boxTrier');
    elt.innerHTML=`
    <p>Trier par</p>
        <nav id="menuDeroulant">
            <ul  >
                <li><button class="menuDeroulantBouton" id="btnPopu">Popularité</button></li>
                <li><button class="menuDeroulantBouton " id="btnDate">Date</button></li>
                <li><button class="menuDeroulantBouton " id="btnTitre">Titre</button></li>

            </ul>
        </nav>
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
let a=0
function gallery(elementt,photographerName,photoName) {

    if(elementt.image==undefined){
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.setAttribute("id",photoName);
        elt.innerHTML=`
        <a href="./média/${photographerName}/${elementt.video}" id="${elementt.title}" class="lienMedia"><video src="./média/${photographerName}/${elementt.video}" poster="" class="vignetteMedia" title="${elementt.altText}"></video></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <div class="boxlike">
            <p class="mediaCoeur" id="mediaCoeur${a}">${elementt.likes}</p>
            <button class="heartMedia" aria-label="coeur cliquable pour incrementer le nombre de likes de la photo et du photographe"> <i class="fas fa-heart"  ></i></button> 
            </div>
        </div>
        `;
        a=a+1
        return elt;
        
    }else{
        let elt= document.createElement("figure");
        elt.setAttribute("class","boxMedia");
        elt.setAttribute("id",photoName);
        elt.innerHTML=`
        <a href="./média/${photographerName}/${elementt.image}"  id="${elementt.title}" class="lienMedia"><img src="./média/${photographerName}/${elementt.image}"  class="vignetteMedia" alt="${elementt.altText}"></img></a>
        <div class="boxlegend">
            <figcaption>${elementt.title}</figcaption>
            <div class="boxlike">
            <p class="mediaCoeur" id="mediaCoeur${a}">${elementt.likes}</p>
            <button class="heartMedia" aria-label="coeur cliquable pour incrementer le nombre de likes de la photo et du photographe"> <i class="fas fa-heart"  ></i></button> 
            </div>
        </div>
        `; 
        a=a+1
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
            let photographerSelectionner=value.photographers.filter(photographer=>photographer.id==iddd);
            /*----------------------------création de la vignette du photographe------------------- */
            document
                .getElementById("vignettePhotographer")
                .appendChild(vignettePhotographerSelectionner(photographerSelectionner[0]));
            photographerSelectionner[0].tags.forEach((elementt)=>{
                document
                .getElementById("tagsPhotographer")
                .appendChild(displayPhotographerTags(elementt));
            });
            /*-----------------------------création de la zone de triage par critére-----------------  */
            trier();

            /*------------------------------création de la gallerie de photo------------------------- */
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
            /*-------------------------------mise au point du compteur likes ------------------------- */
            document
                .getElementById("nbrLikes")
                .textContent =` ${coeur} `;
            /*------------------------------les fonction de triage ------------------------------------- */
            let bb="btnPopu";
            let btnPopu= document.getElementById("btnPopu");
            let btnDate= document.getElementById("btnDate");
            let btnTitre= document.getElementById("btnTitre");
            let boxtri= document.getElementById("menuDeroulant");

            boxtri.addEventListener("mouseover",()=>boxtrie())
            btnPopu.addEventListener("focusin",boxtrie)
            btnPopu.addEventListener("focusout",()=>boxtrieout(bb,false))
            btnDate.addEventListener("focusin",boxtrie)
            btnDate.addEventListener("focusout",()=>boxtrieout(bb,false))
            btnTitre.addEventListener("focusin",boxtrie)
            btnTitre.addEventListener("focusout",()=>boxtrieout(bb,true))
            boxtri.addEventListener("mouseout",()=>boxtrieout(bb,true))
            btnPopu.addEventListener("click", ()=>btnpopu(produitSelectionner,photographerSelectionner[0].name))
            btnDate.addEventListener("click", ()=>btndate(produitSelectionner,photographerSelectionner[0].name))
            btnTitre.addEventListener("click", ()=>btntitre(produitSelectionner,photographerSelectionner[0].name))            
            
            function btnpopu(tableau,name){
                a=0
                let triProduitSelectionner= tableau.sort(function(a,b){return Number(b.likes)-Number(a.likes)});
                document.getElementById("btnPopu").style.top="-1px";
                document.getElementById("btnPopu").style.display="block";
                bb="btnPopu";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                displaytrier(triProduitSelectionner,name);
                tableau=triProduitSelectionner;
                listenerHeart()
                Lightbox.init();
                
            }
            function btndate(tableau,name){
                let triProduitSelectionner= tableau.sort(function(a,b){return Date.parse(a.date)-Date.parse(b.date)});
                a=0
                bb="btnDate"
                document.getElementById("btnDate").style.top="-1px";
                document.getElementById("btnDate").style.display="block";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                displaytrier(triProduitSelectionner,name)
                tableau=triProduitSelectionner;
                listenerHeart()
                Lightbox.init();

            }
            function btntitre(tableau,name){
                let triProduitSelectionner= tableau.sort(function(a,b){return a.title.localeCompare(b.title)});
                a=0
                bb="btnTitre";
                document.getElementById("btnTitre").style.top="-1px";
                document.getElementById("btnTitre").style.display="block";
                document
                    .getElementById("gallery")
                    .removeChild(document.getElementById("boxGallery"));
                
                document
                    .getElementById("gallery")    
                    .appendChild(boxGalle())
                displaytrier(triProduitSelectionner,name);   
                tableau=triProduitSelectionner;
                listenerHeart()
                Lightbox.init();

            }
            function boxtrie(){
                document.getElementById("btnPopu").style.top="-1px";
                document.getElementById("btnPopu").style.display="block";
                document.getElementById("btnDate").style.top="2.5rem";
                document.getElementById("btnDate").style.display="block";
                document.getElementById("btnTitre").style.top="5rem";
                document.getElementById("btnTitre").style.display="block";
                document.getElementById("menuDeroulant").style.width="11rem"
                document.getElementById("menuDeroulant").style.height="8rem";
               
            }
            function boxtrieout(aa,boloré){
                if(boloré){
                    document.getElementById("btnPopu").style.display="none";
                    document.getElementById("btnDate").style.display="none";
                    document.getElementById("btnTitre").style.display="none";
                    document.getElementById(aa).style.display="block";
                    document.getElementById(aa).style.top="-1px";
                    document.getElementById("menuDeroulant").style.height="2.5rem";
                    document.getElementById("menuDeroulant")
                }else{
                
                } 
               
            }
            function displaytrier(tableau,photographerName){
                tabNamePhoto=[];
                
                tableau.forEach((element)=>{
                    
                    let photoName= element.title.replace(/ /g,"");
                    tabNamePhoto.push(photoName)
                     
                    document
                        .getElementById("boxGallery")
                        .appendChild(gallery(element,photographerName,photoName))
                   
                })
            }
            /*-----------------------------fonction du Formulaire---------------------------------------- */
            function displayForm(){
                let elt=document.createElement("div");
                elt.setAttribute("id","bground");
                elt.setAttribute("role","dialog")
                elt.innerHTML=`
                <div id="boxForm">
                    <h1 id="titreForm">Contactez-moi ${photographerSelectionner[0].name}</h1>
                    <button aria-label="fermeture formulaire" id="closeForm" tabindex="1"><i class="fas fa-times"></i></button>
                    
                    <form name="contact" method="get" action="" id="form" onsubmit="return validate();">
                        <label for="First">Prénom</label>
                        <input type="text" id="first" name="first" tabindex="2" aria-label="entrer votre prénom"></input>

                        <label for="Last">Nom</label>
                        <input type="text" id="last" name="Last" tabindex="3" aria-label="entrer votre nom"></input>

                        <label for="Email">Email</label>
                        <input type="text" id="email" name="Email" tabindex="4" aria-label="entrer votre email"></input>

                        <label for="message">Votre message</label>
                        <textarea id="message" name="message" tabindex="5" aria-label="entrer votre message"></textarea>

                        <input type="submit" id="btnSubmit" value="Envoyer" >

                    </form>
                </div>
                
                `;
                document
                    .getElementById("vignettePhotographer")
                    .appendChild(elt);
                document.addEventListener("keyup",keyEchap);    
                document.getElementById("closeForm").addEventListener("click",closeForm);
                document.getElementById("btnSubmit").addEventListener("click",sendForm);
                document.getElementById("closeForm").addEventListener("keyup",keyEnter)
                display("none","closeForm")
            }
            function keyEnter(evt) {
                evt = evt || window.event;
                if(evt.key=='Enter'){
                    closeForm()
                }
            }
            function keyEchap(evt) {
                evt = evt || window.event;
                    if(evt.key=='Escape'){
                        closeForm()
                    }
            }
            function display(etat,focus) {
                document.getElementById("boxHeader").style.display=etat; 
                document.getElementById("gallery").style.display=etat;
                document.getElementById("boxTrier").style.display=etat;
                document.getElementById("box").style.display=etat;
                document.getElementById("gallery").style.display=etat;
                document.getElementById(focus).focus()
                if(window.innerWidth<598){
                    document.getElementById("boxTrier").style.display="none";
                }

            }
            function closeForm(){
                let btnCloseForm=document.getElementById("closeForm");
                let btnSubmit=document.getElementById("btnSubmit");
                document.removeEventListener("keyup",keyEchap)
                btnCloseForm.removeEventListener("click",closeForm)
                btnSubmit.removeEventListener("click",sendForm)
                let doc= document.getElementById("bground");
                let parent= document.getElementById("vignettePhotographer");
                parent.removeChild(doc)
                display("block","btnContactezMoi")

            }
            function sendForm(evt){
                evt.preventDefault();
                console.log(document.getElementById("first").value)
                console.log(document.getElementById("last").value)
                console.log(document.getElementById("email").value)
                console.log(document.getElementById("message").value)
                closeForm()
            }
            

            let btnContactMe=document.getElementById("btnContactezMoi");
           

            btnContactMe.addEventListener("click",()=>displayForm())
           /*---------------------------fonction lightbox-------------------------------------------------*/ 
            class Lightbox{
                static init(){
                    const links=Array.from(document.querySelectorAll('a[href$=".jpg"],a[href$=".mp4"]'))
                    const gal= links.map(link=>link.getAttribute('href'))
                    const titleMap= links.map(link=>link.getAttribute('id'))
                    const media=Array.from(document.getElementById('gallery').querySelectorAll('img,video'))
                    function alt(tableau) {
                        let altTab=[];
                        tableau.forEach(link=> {
                            if(link.getAttribute('alt')===null){
                                altTab.push(link.getAttribute('title'))
                            }else{
                                altTab.push(link.getAttribute('alt'))
                            }

                        })
                        return altTab;
                        
                    } 
                    const tabAlt= alt(media)
                     
                    links.forEach(link=> link.addEventListener("click", e=>{
                        e.preventDefault(); 
                        new Lightbox(e.currentTarget.getAttribute('href'),e.currentTarget.getAttribute('id'),gal,titleMap,tabAlt)
                        
                    }))
                } 

                constructor(url, title ,gal,titleMap,ALT){
                    this.element= this.displayLightbox(url,title,titleMap,ALT)
                    this.gal=gal
                    this.titleMap= titleMap
                    this.ALT=ALT
                    this.onKeyUp= this.onKeyUp.bind(this)
                    document.body.appendChild(this.element)
                    document.addEventListener('keyup',this.onKeyUp)
                    document.querySelector("#closeLightbox").addEventListener('click',this.close.bind(this))
                    document.querySelector("#closeLightbox").addEventListener('keyup',this.keyEnterLightbox.bind(this))
                    document.querySelector("#next").addEventListener('click',this.next.bind(this))
                    document.querySelector("#prev").addEventListener('click',this.prev.bind(this))
                       
                }
                keyEnterLightbox(e){
                    if(e.key=='Enter'){
                        this.close(e)
                    }
                }
                close(e){
                    e.preventDefault();
                    this.element.classList.add("closeBox")
                    window.setTimeout(()=>{
                        this.element.parentElement.removeChild(this.element)
                    },500)
                    document.removeEventListener('keyup',this.onKeyUp);
                    document.getElementById("boxHeader").style.display="block"; 
                    document.getElementById("gallery").style.display="block";
                    document.getElementById("boxTrier").style.display="block";
                    document.getElementById("box").style.display="block";
                    document.getElementById("gallery").style.display="block";
                    if(window.innerWidth<598){
                        document.getElementById("boxTrier").style.display="none";
                    }

                }
                next(e){
                    e.preventDefault()
                    let i = this.gal.findIndex(image=>image==this.url)
                    if(i==this.gal.length-1){
                         i=-1
                    }
                    this.mouveUrl(this.gal[i+1], this.titleMap[i+1],this.ALT[i+1])

                }
                prev(e){
                    e.preventDefault()
                    let i = this.gal.findIndex(image=>image==this.url)
                    if(i==0){
                         i=this.gal.length
                    }
                    this.mouveUrl(this.gal[i-1], this.titleMap[i-1], this.ALT[i-1])
                }
                onKeyUp(e){
                    if(e.key=='Escape'){
                        this.close(e)
                    }else if(e.key=='ArrowLeft'){ 
                        this.prev(e)
                    }else if(e.key=='ArrowRight'){
                        this.next(e)
                    }
                }
                mouveUrl(url,title,alt){
                    this.url=url
                    this.title=title
                    let image= document.getElementById("container")
                    image.innerHTML=``;
                    const reg= new RegExp('.mp4$')
                    if(reg.test(this.url)){
                        image.innerHTML=`
                            <video controls src="${url}" title="${alt}" id="photo" tabindex="1"></video>
                            <p class="legendLightbox">${title}</p>
                            
                            `;

                    }else{
                                
                        image.innerHTML=`
                            <img src="${url}" alt="${alt}" id="photo" tabindex="1"/>
                            <p class="legendLightbox">${title}</p>
                            `;
                    }
                    return image;
                    

                }
                displayLightbox(url, title,titleMap,ALT) {
                    this.url=url
                    this.title= title
                    this.titleMap=titleMap
                    let eltBox;
                    let elt;
                    const reg= new RegExp('.mp4$')
                    let i =this.titleMap.findIndex(image=>image==this.title)

                    if(reg.test(this.url)){
                        eltBox=new video(url,title,ALT[i])
                        elt=eltBox.createVideo()  
                    }else {
                        eltBox=new image(url,title,ALT[i]) 
                        elt=eltBox.createImage()
                        
                    }
                    return elt; 
                    
                }
            }
            Lightbox.init(); 

            class video{
                constructor(url, title,ALT){
                    this.title=title
                    this.url=url
                    this.ALT=ALT
                    this.createVideo=this.createVideo.bind(this)
                         
                }
                createVideo(){
                        let elt=document.createElement("div");
                        elt.setAttribute("class","lightbox") 
                        elt.innerHTML=``;
                        elt.innerHTML=`
                            <button aria-label="bouton photo suivant" id="next" tabindex="2"><i class="fas fa-chevron-up " ></i></button>
                            <button aria-label="bouton photo précédent" id="prev" tabindex="3"><i class="fas fa-chevron-up " ></i></button>
                            <button aria-label="bouton fermeture ligntbox" id="closeLightbox" tabindex="4"><i class="fas fa-times"></i></button>
                            <div id="container">
                                <video controls src="${this.url}" title="${this.ALT}" id="photo" tabindex="1"></video>
                                <p class="legendLightbox">${this.title}</p>
                            </div>
                        `;
                        document.getElementById("boxHeader").style.display="none"; 
                        document.getElementById("gallery").style.display="none";
                        document.getElementById("boxTrier").style.display="none";
                        document.getElementById("box").style.display="none";
                        document.getElementById("gallery").style.display="none";
                        
                        return elt;
                }
            }
            
            class image{
                constructor(url, title,ALT){
                    this.title=title
                    this.url=url
                    this.ALT=ALT
                    this.createImage=this.createImage.bind(this)
                         
                }
                createImage(){
                        let elt=document.createElement("div");
                        elt.setAttribute("class","lightbox") 
                        elt.innerHTML=``;
                        elt.innerHTML=`
                            <button aria-label="bouton photo suivant" id="next" tabindex="2"><i class="fas fa-chevron-up " ></i></button>
                            <button aria-label="bouton photo précédent" id="prev" tabindex="3"><i class="fas fa-chevron-up " ></i></button>
                            <button aria-label="bouton fermeture ligntbox" id="closeLightbox" tabindex="4"><i class="fas fa-times"></i></button>
                            <div id="container">
                                <img src="${this.url}" alt="${this.ALT}" id="photo" tabindex="1"/>
                                <p class="legendLightbox">${this.title}</p>
                            </div>
                        `;
                        document.getElementById("boxHeader").style.display="none"; 
                        document.getElementById("gallery").style.display="none";
                        document.getElementById("boxTrier").style.display="none";
                        document.getElementById("box").style.display="none";
                        document.getElementById("gallery").style.display="none";
                        
                        return elt;
                }
            }

            
            /*----------------------------fonction incrémentation des likes ----------------------------- */
            let newLikes=coeur;

            
            function listenerHeart() {
                function btnHeart(i){
                    let nbrlike=Number(document.getElementById("mediaCoeur"+i).innerText)
                    document.getElementById("mediaCoeur"+i).innerText=nbrlike+1
                    newLikes=newLikes+1;
                    document.getElementById("nbrLikes").innerHTML=newLikes;
                }
                let btnHeartMedia=document.getElementsByClassName("heartMedia")
                for(var i=0; i<btnHeartMedia.length;){
                    let index= i
                    btnHeartMedia[i].addEventListener('click',()=>btnHeart(index));
                    i++
                }
            }
            listenerHeart()
            
            })
            
        
        
        .catch(function (err) {
          console.error(err);
        });

         