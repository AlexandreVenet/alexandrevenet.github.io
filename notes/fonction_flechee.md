# JS : fonction fléchée
Référence complète : [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es "Fonctions fléchées sur MDN").

Il existe les fonctions qu’on écrit de deux manières :
```
const maFonction1 = function(parametre){
	return expression ;
}
```
```
function maFonction2(parametre){
	return expression ;
}
```
Il existe les **fonctions fléchées**. Elles sont plus faciles à écrire, à lire, font la même chose que les fonctions **mais** elles ne disposent pas de leurs  "propres valeurs de `this`, `arguments`, `super` ou `new.target`" et n’ont pas de prototype, pas de constructeur. "Elles sont souvent anonymes et ne sont pas destinées à être utilisées pour déclarer des méthodes."
```
(parametre) => {
	instructions
}
```
```
const toto = (parametre) => {
	return expression ;
}
```
Quand **un seul argument**, pas besoin des parenthèses :
```
param => expression
```
Quand **pas de paramètres**, les parenthèses sont très bien vides :
```
() => {
	instructions
}
```
La fonction fléchée gère le **reste des paramètres**, *cad* un nombre indéfini de paramètres traités en tableau :
```
(param1, param2, ...reste) => {
	instructions
}
```
Elle gère aussi les **valeurs par défaut** (par défaut, les paramètres sont `undefined`) :
```
(param1 = 1, param2 = param1 + 2) => {
	instructions
}
```
Gestion de la **décomposition** pour la liste des paramètres :
```
let f = ([a,b] = [1,2], {x:c} = {x:a+b}) => a+b+c;
f();  
```
La fonction fléchée est déconseillée pour "déclarer une méthode" car ne disposant pas de `this` (elle renvoie le `this` du parent) mais elle peut être utilisée néanmoins à la condition de ne pas faire appel à ces choses :
```
const bonhomme = {
	nom: 'Bob',
	demanderAmi: (a1, a2, a3) => {
		// avec les "templates litteral" ou "templates string"
		return `Tu connais ${a1}, ${a2}, ${a3} ? `;
	}
}
console.log(bonhomme.demanderAmi('pipi','caca','popo'));
```
