# Array

Le 18-08-2025

Une structure de donnée qui accueille un ensemble de valeurs de même type.

## Introduction 

Source : [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/arrays _blank)

Un ***array*** (**tableau**) est un **ensemble d'items de même type, non redimensionnable**. La taille doit être définie. Le tableau présente des valeurs à des **index** et le premier index est `0`.

L'*array* est disponible dans la classe `System.Array`.

Un *array* est un **objet** et on y accède **par référence**. Ainsi :
- un tableau déclaré sans assignation de valeur vaut `null`,
- un tableau passé en paramètre de fonction peut être modifié directement par les instructions de la fonction.

## Création

On crée un tableau de différentes manières selon les besoins. C# propose la possibilité d'assigner directement des valeurs aux index lors de l'initialisation, grâce aux **initialiseurs de collection**.

```C#
// Déclaration de longueur, array avec les valeurs par défaut
string[] mesNoms = new string[3]; 
```

```C#
// Assignation de valeurs, longueur implicite
int[] arrayInt = new int[] {12, 76, 8}; 

// Syntaxe alternative
int[] nombres = {10,20,30}; 
```

```C#
float[] mesFloats; // vaut null
```

## Accès à l'index

Une valeur s'obtient par son **index** (sa place) dans le tableau. Le premier index est `0`. 

```C#
string[] mesNoms = new string[3];
	
// Accès à chaque index et assignation de valeur
mesNoms[0] = "pipi";
mesNoms[1] = "caca";
mesNoms[2] = "popo";
```

Pour accéder au dernier index, deux syntaxes :

```C#
arrayInt[arrayInt.Length-1] = 1; 
arrayInt[^1] = 1;
```

## Dimensions

[MSDN Tableaux multidimensionnels](https://docs.microsoft.com/fr-fr/dotnet/csharp/programming-guide/arrays/multidimensional-arrays _blank)

Un tableau peut avoir **plusieurs dimensions** (*multidimensional arrays*). Exemple : un tableau bidimensionnel comprend 2 indices : un pour la ligne, un autre pour la colonne. Le nombre de dimensions est défini par le nombre de virgules utilisées.

L'exemple suivant déclare un tableau à 2 dimensions composé de 4 lignes et de 2 colonnes.

```C#
int[,] tableau = new int[4,2]; 
```

Initialisations :

```C#
int[,] tableau = new int[,] { {1,2}, {3,4}, {5,6} };
```

```C#
int[,] tableau = new int[3,2] { {1,2}, {3,4}, {5,6} };
```

```C#
int[,] tableau = { {1,2}, {3,4}, {5,6} };
```

Accès :

```C#
tableau[0,0]; // 1
```

## Tableau de tableaux

On peut créer des tableaux **de tableaux** (*jagged arrays*).

```C#
int[][] tableauNombres = new int[2][]; 
// Création d'1 tableau contenant 2 tableaux de int
// tableauNombres[0] vaut null
// tableauNombres[1] vaut null

tableauNombres[0] = new int[3];
// Création d'un tableau de longueur 3 sans valeurs
// tableauNombres[0] a un tableau pour valeur
// tableauNombres[0][0] vaut 0 (valeur par défaut de l'int)
// tableauNombres[1] vaut null
	
tableauNombres[0][1] = 12;
// Premier tableau à l'index 0, second tableau à l'index 1 : la valeur est 12
```

Représentation :

```
[0] :
-----[0]
-----[12]
-----[0]
[1] : null
```

Un tableau de tableaux peut être créé à partir de tableaux préexistants. Imaginons 2 tableaux existants de longueurs différentes et de type `string` :

```C#
string[][] melange = { array1, array2 };
```

Dans le tableau principal, les tableaux « internes » peuvent être de **tailles différentes**.

## Extraire un tableau de tableau

Pour un autre tableau plage de valeurs d'un tableau principal, on peut utiliser une boucle sur une valeur de début et une valeur de fin (incluse ou non). C# propose en raccourci les *ranges* (plages) fondés sur les types `System.Index` et `System.Range` ; la syntaxe est : `[début..fin exclue]` (sucre syntaxique). Plus d'info chez [MS *Learn Ranges*](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-8.0/ranges "Ranges" _blank).

```C#
string chaine = "a, b, c, d, e, f, 1, 2, 3";
string[] items = chaine.Split(", ");

foreach (string item in items[1..4])
{
	Console.WriteLine(item.ToUpper());
}
/*
	B
	C
	D
 */
```
```C#
// De l'index spécifié jusqu'à la fin
string[] nombres = items[6..]; // 1, 2, 3

// De l'index spécifié en partant de la fin jusqu'à la fin
string[] nombresDepuisLaFin = items[^3..]; // 1, 2, 3

// Du début jusqu'à l'index spécifié (0 est la valeur par défaut)
string[] lettres = items[0..6]; // a, b, c, d, e, f
string[] lettres = items[..6]; // a, b, c, d, e, f
```



## Propriétés et méthodes

On peut savoir si un tableau **contient** une valeur avec `Array.Exists()` qui utilise un **prédicat** sous forme d'expression lambda/méthode anonyme.

```C#
using System;
	
bool valeurDansTableau = Array.Exists(_monArrayDeStrings, element => element == "Mon String");
```

`Clear()` efface les entrées du tableau. `null` pour un type référence ; valeur par défaut du type pour un type valeur.

`CopyTo()` copie des éléments vers un autre tableau.

La propriété `Length` retourne la longueur du tableau (le nombre d'index).

La propriété `Rank` retourne le nombre de dimensions.

`Array.Reverse()`, pour un tableau à une dimension, inverse l'ordre.

```C#
string[] mots = { "un", "deux", "trois" };
Array.Reverse(mots);
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
```

`Array.Sort()` trie un tableau à une dimension en fonction du type de données utilisé. Subtilité : si le type du tableau hérite de l'interface `IComparable`, alors c'est leur méthode `CompareTo()` qui est appelée pour effectuer le tri.

```C#
string[] mots = { "un", "deux", "trois" };
Array.Sort(mots);
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
```

`Array.Resize()` redimensionne un tableau (ajout ou suppression) à partir de la fin du tableau.

```C#
string[] mots = { "un", "deux", "trois" };
	
Array.Resize(ref mots, 5);
Console.WriteLine(mots.Length);
	
mots[3] = "quatre";
mots[4] = "cinq";
	
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
	
Array.Resize(ref mots, 3);
	
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
```

## Avec String

Le type `string`, propose des méthodes de traitement en rapport à l'`array`.

Obtenir le tableau de `char` avec `ToCharArray()`.

```C#
string mot = "Dialogue";
char[] motArrayChar = mot.ToCharArray();
```

Construire une nouvelle chaîne à partir d'un tableau de `char` avec le constructeur de la classe `String`.

```C#
string chaine = "abcdef123";
char[] chaineArrayChar = chaine.ToCharArray();
Array.Reverse(chaineArrayChar);
string chaineInverse = new string(chaineArrayChar);
Console.WriteLine(chaineInverse);
```

Ajouter un caractère « délimiteur » entre éléments d'un tableau avec `string.Join()`.

```C#
string chaine = "abcdef123";
char[] chaineArrayChar = chaine.ToCharArray();
Array.Reverse(chaineArrayChar);
string chaineAvecJoin = String.Join(",", chaineArrayChar);
Console.WriteLine(chaineAvecJoin);
```

Créer un tableau de chaînes à partir d'un caractère délimiteur avec `Split()` sur une chaîne. Dans cet exemple, la méthode reçoit un type `char` en paramètre mais il existe des surcharges. [String.Split() chez MS Lean](https://learn.microsoft.com/fr-fr/dotnet/api/system.string.split "Ouvrir le lien dans un nouvel onglet" _blank).

```C#
string chaine = "a,b,c,d,e,f,1,2,3";
string[] items = chaine.Split(',');
foreach (string item in items)
{
    Console.WriteLine(item);
}
```

## Affichage des valeurs

Pour afficher un tableau en fenêtre de sortie, on peut utiliser une **boucle** et traiter chaque élément un par un.

On peut également utiliser `string.Join()` qui fait le travail pour nous.

```C#
var tab = new[] { 4, 7, 9 };
Console.WriteLine($"Tableau : [{string.Join(" ", tab)}]");
```
