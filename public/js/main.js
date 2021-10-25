//  {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{Class}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
class Personne {
    constructor(nom, lieu, argent, mainDroite, mainGauche) {
        this.nom = nom
        this.lieu = lieu
        this.argent = argent
        this.mainDroite = mainDroite
        this.mainGauche = mainGauche

        this.seDeplacer = (depart, arrivee) => {
            this.lieu = arrivee.nom;
            arrivee.space.push(this)
            depart.space.splice(depart.space.indexOf(this), 1)
            console.log(`${this.nom} se déplace de ${depart.nom} vers ${arrivee.nom}`)
        }
        this.prendre = (objet, main) => {
            if (main == "droite") {
                this.mainDroite.push(objet)
                epicerie.paniers.splice(epicerie.paniers.indexOf(objet), 1)
                console.log(`${batman.nom} prend un des paniers a l'entrée du magasin`);

            } else if (main == 'gauche') {
                this.mainGauche.push(objet)
                epicerie.paniers.splice(epicerie.paniers.indexOf(objet), 1)
            } else if (main == "ingredients") {

                ingredients.forEach(element => {
                    batman.mainDroite[0].contenu.push(element)
                    console.log(`${batman.nom} a ajouté ${element.nom} dans le panier`);

                });
                console.log(`${batman.nom} viens de prendre tout les ingredients necessires`);
            }
            return
        }
        this.payerArticle = (article) => {

            this.argent -= article.prix;

        }
        this.couper = (ingredients, outil) => {
            if (ingredient.state == "entier") {
                outil.action(ingredient)

            }

        }
    }

}

class Lieu {
    constructor(nom, space, special) {
        this.nom = nom
        this.space = space
        this.special = special


    }

}
class Epicerie extends Lieu {
    constructor(nom, space, paniers) {
        super(nom, space)
        this.paniers = paniers
    }
}


class Ingredient {
    constructor(nom, etat, prix) {

        this.nom = nom
        this.etat = etat
        this.prix = prix
    }

}

class Outil {
    constructor(nom, content, action) {
        this.nom = nom
        this.content = content
        this.action = action

        this.couper = (cuisinier, ingredient) => {
            console.log(`${cuisinier.nom} prend le couteau et decoupe l'ingredients`);
            if (ingredient.etat == "entier") {
                ingredient.etat = "coupé"
                console.log(`${ingredient.nom} est coupé`);
            } else {
                console.log(`${ingredient.nom} est déja coupé pas besoin de le coupé a nouveau`);

            }
        }
       

        this.melanger = (newName) => {
            let mixt = new Ingredient (newName,"pas cuit",0) 
            // while (this.content.length > 0) {
            //     this.content.shift()
            // }
            this.content = []
            this.content.push(mixt)
        }

        this.cuire = () => {
            console.log(`L'${this.content[0].nom} est en préparation`);
            this.content[0].etat = "cuite"
            setTimeout(() => {
                console.log(`${this.content[0].nom} est ${this.content[0].etat}`);
            }, 4000);
        }

        this.sonne = () => {
            console.log("Ding - Dong -Ding-Dong, on sonne a la porte");
            
        }


    }
}


// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{Variables}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
// Personnes
let batman = new Personne("Bruce", "", 150, [], [])
let Catwomen = new Personne("Selina", "", 5, [], [])

// lieu
let maison = new Lieu("Maison", [])
let epicerie = new Epicerie("Lidl", [],
    [{
        nom: "panier 1",
        contenu: [],
    }, {
        nom: "panier 2",
        contenu: [],
    }, ])
// Ingredients
let oignon = new Ingredient("oignon", "entier", 2)
let oeuf = new Ingredient("oeuf", "entier", 3)
let epice = new Ingredient("epice", "moulu", 1.5)
let fromage = new Ingredient("fromage", "rapée", 5)

let ingredients = [oignon, oeuf, epice, fromage]
// objets
let couteau = new Outil("couteau", [], "coupe")
let bol = new Outil("bol", [], "melange")
let poele = new Outil("poele", [], "cuit")
let sonnette = new Outil("sonette",[],"sonne")


// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{CONSOLE.LOG}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} 
maison.space.push(batman)

console.log(`Notre chére ${batman.nom} se trouve actuelllement a la ${maison.nom}`);
console.log(maison);
console.log(`${batman.nom} décide de se rendre a l'épicerie pour acheter de quoi preparer son omellette pour son diner romantique avec ${Catwomen.nom}`);
batman.seDeplacer(maison, epicerie)
console.log(`${batman.nom} se trouve actuellement a ${epicerie.nom}`);
console.log(epicerie);

batman.prendre(epicerie.paniers[0], "droite")
console.log(batman);
console.log(`${batman.nom} se rend dans les rayons et prends les ingredients necessaires`);
batman.prendre(epicerie.paniers[0], "ingredients")
console.log(`${batman.nom} se rend en caisse`);
ingredients.forEach(element => {
    batman.payerArticle(element)
    console.log(`${batman.nom} paye ${element.nom} a ${element.prix}€`);
});
console.log(`${batman.nom} a payé tout les articles et lui reste en cash ${batman.argent}€ "c'es pas largent qui lui manque hein..."`);
batman.seDeplacer(epicerie, maison)
console.log(`${batman.nom} est arrivé a la maison est se precipite dans la cuisine pour préparer l'omelette avant que la belle ${Catwomen.nom} n'arrive`);
ingredients.forEach(element => {
    couteau.couper(batman, element)
})

while (batman.mainDroite[0].contenu.length > 0) {
    bol.content.push(batman.mainDroite[0].contenu.shift())
}
console.log(`${batman.nom} a mis tous les ingredients dans le bol`);

batman.seDeplacer(maison, epicerie)
console.log(`${batman.nom} retourne a l'epicerie deposer le panier`);
epicerie.paniers.push(batman.mainDroite.pop())
console.log(`Esuite retourne a la maison`);
batman.seDeplacer(epicerie, maison)

bol.melanger("omelette")
console.log(`Dans le ${bol.nom} les ingredients melanger sont devenus une magnifique base ${bol.content[0].nom} mais c'est encore ${bol.content[0].etat}`);

poele.content.push(bol.content.pop())
poele.cuire("omelette")
sonnette.sonne()
maison.space.push(Catwomen)
console.log(`${Catwomen.nom} est arrivée pile pour deguster l'omelette, Bonne apetit`);
console.log(maison.space);




