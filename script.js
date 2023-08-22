//création des tableau des revenus et dépenses ainsi que la classe pour les remplir
let Revenus = [];
let Depense = [];

generateDepenses(Depense);
generateRevenus(Revenus);


class element {
    constructor(nom, montant) {
        this.nom = nom;
        this.montant = montant;
    }
}

//création des fonctions de génération des lignes des colonnes revenu et dépense ,et de leur interactivité
function generateDepenses(depense){
    const divDepense = document.querySelector(".listDepense");
    divDepense.innerHTML = "";
    for(let i=0; i<depense.length; i++){

        const row = document.createElement("div");
        row.className = "rows";
        const name = document.createElement("input");
        name.setAttribute("type", "text");
        name.className = "itemNom";
        name.value = depense[i].nom;
        const amount = document.createElement("input");
        amount.setAttribute("type", "number");
        amount.className= "itemMontant";
        amount.value = depense[i].montant;
        const supprBtn = document.createElement("button");
        supprBtn.className = "suppression";
        supprBtn.innerText = "X";

        divDepense.appendChild(row);
        row.appendChild(name);
        row.appendChild(amount);
        row.appendChild(supprBtn);
    }

    const itemMontant = document.querySelectorAll(".listDepense .rows .itemMontant");
    for (let i = 0; i < itemMontant.length; i++){
        itemMontant[i].addEventListener("change", function(event){
            Depense[i].montant = Number(itemMontant[i].value);
            calculBilan(Revenus, Depense);
        })
    }

    const itemNom = document.querySelectorAll(".listDepense .rows .itemNom");
    for (let i = 0; i < itemNom.length; i++){
        itemNom[i].addEventListener("change", function(event){
            Depense[i].nom = itemNom[i].value;
        })
    }


    const supprDepenseBtn = document.querySelectorAll(".listDepense .rows button")
    for (let i = 0; i < supprDepenseBtn.length; i++){
        supprDepenseBtn[i].addEventListener("click", function(event){
            const indice = [i];
            Depense.splice(indice,1);
            generateDepenses(Depense);
            calculBilan(Revenus, Depense);
        })
    }
}

function generateRevenus(revenu){
    const divRevenu = document.querySelector(".listRevenu")
    divRevenu.innerHTML = "";
    for(let i=0; i<revenu.length; i++){
        const row = document.createElement("div");
        row.className = "rows";
        const name = document.createElement("input");
        name.setAttribute("type", "text");
        name.className = "itemNom";
        name.value = revenu[i].nom;
        const amount = document.createElement("input");
        amount.setAttribute("type", "number");
        amount.className= "itemMontant";
        amount.value = revenu[i].montant;
        const supprBtn = document.createElement("button");
        supprBtn.className = "suppression";
        supprBtn.innerText = "X";

        divRevenu.appendChild(row);
        row.appendChild(name);
        row.appendChild(amount);
        row.appendChild(supprBtn);
    }
    
    const itemMontant = document.querySelectorAll(".listRevenu .rows .itemMontant");
    for (let i = 0; i < itemMontant.length; i++){
        itemMontant[i].addEventListener("change", function(event){
            Revenus[i].montant = Number(itemMontant[i].value);
            calculBilan(Revenus, Depense);
        })
    }

    const itemNom = document.querySelectorAll(".listRevenu .rows .itemNom");
    for (let i = 0; i < itemNom.length; i++){
        itemNom[i].addEventListener("change", function(event){
            Revenus[i].nom = itemNom[i].value;
        })
    }

    const supprDepenseBtn = document.querySelectorAll(".listRevenu .rows button")
    for (let i = 0; i < supprDepenseBtn.length; i++){
        supprDepenseBtn[i].addEventListener("click", function(event){
            const indice = [i];
            Revenus.splice(indice,1);
            generateRevenus(Revenus);
            calculBilan(Revenus, Depense);
        })
    }
}

//mise en fonction des boutons de génération de nouveaux revenus et dépense
const addDepense = document.getElementById('addDepense');
const addRevenu = document.getElementById('addRevenu');

addDepense.addEventListener('click', ()=>{
    var depense = new element("",0);
    Depense.push(depense);
    generateDepenses(Depense);
})

addRevenu.addEventListener('click', ()=>{
    var revenu = new element("",0);
    Revenus.push(revenu);
    generateRevenus(Revenus);
})


//calcul des bilans à partir des tableaux
function calculBilan(revenu, depense){
    var totalRevenus = 0;
    var totalDepenses = 0;

    for(let i=0; i<revenu.length; i++){
        totalRevenus = totalRevenus + revenu[i].montant;
    }
    const revenuShown = document.getElementById('revenuTotal');
    revenuShown.innerText = totalRevenus

    for(let i=0; i<depense.length; i++){
        totalDepenses = totalDepenses + depense[i].montant;
    }
    const depenseShown = document.getElementById('depenseTotal');
    depenseShown.innerText = totalDepenses;

    var totalBilan = 0;
    totalBilan = totalRevenus-totalDepenses;


    const bilanShown = document.getElementById('bilanTotal');
    bilanShown.innerText = totalBilan;

    const bilanTitle = document.getElementById('bilanTitle');
    if(totalBilan<0){
        bilanShown.className = "negatif";
        bilanTitle.className = "negatif";
    }else{
        bilanShown.className = "positif";
        bilanTitle.className = "positif";
    }
}

calculBilan(Revenus, Depense);