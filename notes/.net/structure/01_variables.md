# Variables

Le 15-08-2024

Représenter une donnée dans la mémoire et opérer des traitements sur la valeur. [Source](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/ _blank)

## Présentation

Une **variable** est une entité unique **représentant** une **donnée typée** en **espace mémoire**.

La variable en C# se définit sur trois éléments :
- **type** : construction qui définit la quantité de mémoire à réserver pour une valeur, la façon de lire cette valeur, les membres (champs, méthodes...), ses interfaces implémentées, le type dont elle hérite,
- **nom ou identificateur** : l'adresse mémoire est hexadécimale et très longue, alors que le nom est un moyen commode d'accéder à cette adresse,
- **valeur** : ce que vaut la variable, ce qu'on affecte à la variable.

Conséquence : il n'existe **pas de variable définie sans déclaration d'un type**.

Le nom de la variable suit quelques règles : 
- il s'écrit en général lowerCamelCase,
- il doit être unique, 
- il peut contenir des lettres de l'alphabet anglais, des nombres et l'*underscore*, 
- il est sensible à la casse,
- il ne peut pas être un mot-clé réservé du langage C#.

La **déclaration** est la réservation de l'espace mémoire. Exemples : 
```C#
int monEntier; 
// 0 par défaut 
```

```C#
MaClasse maClasse; 
// null par défaut
```

```C#
bool? monBooleen; 
// false par défaut ; type valeur rendu nullable
```

L'**affectation** ou **assignation** ou encore **définition de la variable** est le remplissage de cet espace mémoire avec la valeur. L'affectation s'effectue de droite à gauche (la valeur doit exister d'abord).

```C#
int monEntier;
monEntier = 1;
```

Les deux opérations de déclaration et d'affectation peuvent s'écrire en une ligne, on parle alors d'**initialisation** de la variable.

```C#
int monInt; 
// Variable en mémoire, valeur par défaut
```

```C#
float myFloat = 0.3f; 
// "f" pour typer la valeur selon le type de variable 
```

```C#
GameObject maLampe1, maLampe2, maLampe3; 
// Variables de même type déclarée sur une ligne
```

```C#
string text = "toto"; 
// string avec des guillements 
```

```C#
char monChar = 'p'; 
// char avec des apostrophes
```

La valeur de la variable peut être le résultat du calcul d'une **expression** :

```C#
int x = 1 / 1;
```

Le *CLR* contrôle le calcule des expressions. Si problème, alors il lèvera une exception, ce qui constitue en langage courant une erreur.

## Portée

La variable est **accessible** dans un **bloc**, qui se définit par une paire d'accolades ouvrante et fermante. C'est ce qu'on appelle la **portée (*scope*) de la variable** :
- **portée locale** : la variable est déclarée dans un bloc et donc est accessible dans son bloc, les blocs enfants, mais pas dans les blocs parents,
- **portée globale** : la variable est déclarée **en dehors** d'un bloc et donc est accessible dans son bloc et les blocs enfants. 

## Var

Le mot-clé `var` déclare un type **implicite** (non explicite) : le **compilateur** définira le type adéquat en calculant l'expression située à droite de l'opérateur d'assignation. Ceci augmente la charge de travail lors de la compilation (aucun effet sur le produit final). `var` n'est donc pas un type. Caractéristiques : 
- une déclaration de variable de ce type requiert une assignation, 
- une déclaration en ligne ou multiligne est impossible,
- ce type peut servir dans les boucles,
- ce type ne peut pas servir comme type de retour d'une fonction.

```C#
int x = 1;
var y = i + 1; // le compilateur en fera un int

var str = "Bonjour !";
string maChaine = $"{str} Le type de str est : {str.GetType()}.";
```
