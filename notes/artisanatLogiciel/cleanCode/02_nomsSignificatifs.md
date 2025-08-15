# Noms significatifs

Le 14-08-2025

Notes du chapitre 2

## Révéler les intentions

Les noms doivent révéler les intentions, les concepts.

Les questions à se poser pour trouver le nom d'une entité sont : 
- la raison de son existence : **pourquoi** ?
- son rôle : **que fait-elle** ?
- son utilisation : **comment l'utiliser** ?

```Javascript
var d = 0; // n'évoque rien
var distance = 0; // représente ce qui est écrit
```

L'implémentation d'un patron de conception peut être explicitée en donnant le nom à la classe, par exemple `MaClasseDecorateur` pour le patron Décorateur.

## Eviter la désinformation

Les noms ne doivent pas favoriser la désinformation. 

Ne pas utiliser de noms trop proches.

```
XYZControllerForEfficientHandlingOfStrings
XYZControllerForEfficientStorageOfStrings
```

Ne pas utiliser le type utilisé dans le nom (codification) car si le type change, alors le nom utilisé ne correspondra plus... à moins de le changer aussi, ce qui prouve que nommer le type est inutile. 

```C#
List<string> ListeDeNoms;
```

Que penser de la notification hongroise ? C'est une codification, donc selon l'auteur il faudrait l'éviter. Or, l'auteur ne traite pas de l'aisance de recherche, en IntelliSense de Visual Studio par exemple. Par conséquent, je considère qu'on peut l'utiliser dans une certaine mesure.
- `_` champ privé,
- `m_` champ public,
- `Fonction`, `Propriété` en PascalCase.

L'auteur déconseille le `I` préfixant le nom d'une interface. Or, même remarque que précédemment pour la facilité de recherche. Et cela expose également la nature de la chose, ce qui permet de l'identifier par rapport à une `class` ou une `struct`.

## Faire des distinctions significatives

Ne pas utiliser des lettres qui ressemblent à des nombres dans certaines polices de caractères. Comparer : `lO` et `10` .

Utiliser des noms différents pour des choses différentes et que ces noms signifient des choses. 

```Javascript
MaFonction(int a, int b){...}
MaFonction(int source, int destination){...}
```

```Javascript
ProductData
ProductInfo
// Quelle est la spécificité de ces entités ?
```

```Javascript
Customer
CustomerObject
CustomerInfo
// Que représente quoi ?
```

## Choisir des noms prononçables

Choisir des noms prononçables, qui portent une signification, et pouvant être utilisés en langue naturelle.

```Javascript
genymdhms
// On prononce comment en danois ?
```

Je considère que ceci dépend du contexte linguistique des individus, de l'équipe, du projet, de l'entreprise... Le choix effectué peut donc paraître  discutable si le contexte change.

## Ne pas obliger à des conversions mentales

Le lecteur ne doit pas avoir à faire des conversions mentales d'un nom écrit en un nom compris.

```Javascript
r 
// version en minuscule de URL où hôte et schéma sont supprimés, c'est ok ?
```

## Nom de classe

Le nom d'une classe, d'un objet, doit être concret et non pas abstrait, doit être un substantif.

```Javascript
CharacterManager
DataController
ControllerManager
// Que font véritablement ces classes ?
```

## Nom de méthode

Une méthode ou fonction a pour nom un verbe ou commence par un verbe.

## Surcharges de constructeur

Lorsque les constructeurs sont surchargés, utiliser des méthodes de Fabrique Statique avec des noms décrivant les arguments (rendre les constructeurs privés, sinon inutile). Comparer :

```C#
var a = new Complex(23.0); // Est-ce que c'est la partie réelle ? imaginaire ?
var b = new Complex(0.0, 23.0); // Est-ce plus clair ?

// Entité
public class Complex
{
	public Complex(double real) {...} 
	public Complex(double real, double imaginary) {...} 
	public Complex(double magnitude, double angle) {...}
}
```

```C#
var toto = Complex.FromRealNumber(23.0);  // Réel = 23, imaginaire = 0
var bibi = Complex.FromPolar(2, Math.PI/4); // Magnitude et angle

// Entité
public class Complex
{
	private Complex(double real, double imaginary) { /* ... */ }

	public static Complex FromRealNumber(double real) =>
		new Complex(real, 0);

	public static Complex FromPolar(double magnitude, double angle) =>
		new Complex(magnitude * Math.Cos(angle), magnitude * Math.Sin(angle));
}
```

## Pas de blagues

Eviter les plaisanteries ou jeux de mots car ces choses ne sont pas compréhensibles par tout le monde. 

## Respecter la nomenclature choisie

Une fois un concept nommé, conserver le nom pour le même concept quelles que soient les entités. Ceci afin d'éviter de devoir produire un lexique pour les mêmes comportements.

```Javascript
Solde.Get();
CompteBancaire.Get();
Bilan.Get();
```

Attention à ce que le nom de fonction et le comportement soient respectés d'un point de vue **sémantique**. 

```Javascript
Add(a) { _maValeur + a; }
Add(a) { _maListe.Add(a); }
// Même nom mais sens/comportement différent. 
// Préférer Insert(a) ou Append(a) pour la seconde fonction.
```

## Domaines du problème, de la solution

On peut choisir un nom : 
- issu du domaine du problème : côté métier,
- issu du domaine de la solution : côté technique.

Ne pas sortir de ces domaines car un programmeur ne connaissant pas tel nom peut au moins demander à un expert du domaine le sens de ce nom.

Exemple : ne pas s'interdire d'ajouter un suffixe signifiant un patron de conception, par exemple `AccountVisitor`, `JobQueue`.

## Le contexte

Les termes obscurs peuvent gagner en clarté par le contexte, ceci pouvant nécessiter de changer l'architecture (créer des méthodes spécifiques, des classes spécifiques...). 

Comparer :
- `Numero` : mais de quoi ?
- `AdresseNumero` : on s'attend à ce que tous les champs soient préfixés,
- `Adresse.Numero` : on sait qu'on dispose d'une entité `Adresse` dédiée, réutilisable.

Inversement, trop de contexte nuit à la lisibilité.

Exemples : 
- admettons une application nommée Station Service de Luxe. Ne pas préfixer chaque classe SSL. D'abord parce que cela ne sert à rien, ensuite parce que cela crée de la confusion avec d'autres choses comme le protocole *Secure Sockets Layer*,
- on utilise une classe `Adresse` mais on utilise des adresses MAC, web et postales. Corriger en utilisant plutôt les classes `AdressePostale`, `MAC` et `URI`.
