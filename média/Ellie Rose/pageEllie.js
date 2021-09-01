/*---------------------------------------création header------------------------------------------------ */
function banner (){
    let elt= document.createElement("header");
    elt.innertHTML=`
    <a href="index.html" id="lienRetour"><img src="./média/logo.png" alt="logo Fish Eye" id="logo"></a>
    `;
    document
        .getElementById("app")
        .appendChild(elt)
}
banner();
