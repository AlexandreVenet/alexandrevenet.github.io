# Boucles

Le 18-08-2024

Faire tourner des calculs sous une certaine condition. [Source](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/statements/iteration-statements _blank)

## Introduction

Les **boucles** (*loops*) sont une autre **structure de contrôle**, celle des **instructions itératives**. Elles réexécutent les mêmes instructions par itération, c'est-à-dire à chaque tour, cycle. Les boucles sont **imbriquables**.

## For

La boucle `for` est une boucle dont **on connaît le nombre d'itérations**. On dispose d'une valeur de départ (*initializer*), d'une condition d'itération et d'un pas (*iterator*) pour calculer l'itération suivante. Cette boucle permet des traitements variés (par exemple, par décrémentation).

```C#
for(int i = 0; i < 10 ;i++)
{
	Console.WriteLine("itérateur = " + i);
}
```

```C#
for(int i = 25; i > 0; i--)
{
	if(i % 2 == 0) // pas de reste
	{
		Console.WriteLine($"{i} pair.");
	}
	else if(i % 2 == 1) // il y a un reste
	{
		Console.WriteLine($"{i} impair.");
	}
}
```

La boucle `for` peut accueillir plusieurs *initializers*, conditions et pas.

```C#
for (int i = 0, j = 0; i+j < 5; i++, j++)
{
	Console.WriteLine($"{i} + {j} = {i+j}");
}
// 0 + 0 = 0
// 1 + 1 = 2
// 2 + 2 = 4
```

## While

La boucle `while` est une boucle utilisée **lorsqu'on ne connaît pas le nombre d'itérations**, c'est-à-dire **tant qu'une condition est vraie**. Ne pas oublier le cas de sortie de la boucle, sans quoi la boucle est infinie.

```C#
int tassesALaver = 4;

while(tassesALaver > 0)
{
	tassesALaver --;
	Console.WriteLine("Une tasse lavée ! Il en reste " + tassesALaver.ToString() + " dans l'évier.");
}
```

## Do...while

`do...while` est comme `while` sauf que le bloc d'instructions est **effectué au moins une fois** car **le test le suit** (et non le précède comme les autres boucles).

```C#
bool parle = false;

do
{
	Console.WriteLine("Je parle au moins une fois même si je suis censé me taire.");
}
while(parle == true);
```

```C#
int i = 51;

do
{
	Console.WriteLine(i); // 51
	if(i <= 50) // non traité
	{
		i++
	}
}while(i < 50);
```

## Foreach

`foreach` permet de parcourir des entités énumérables (qui implémentent l'interface `IEnumerable` ou `IEnumerable<T>` ou bien qui possèdent une logique de `GetEnumerator()`) : tableaux ou collections. L'énumérateur est en lecture seule, donc chaque objet itéré est en lecture seule également. Cette boucle ne peut effectuer que des itérations « vers l'avant » (du début à la fin, item par item). 

```C#
string[] tableauDeMots = {"pipi", "caca", "popo"};

foreach(string mot in tableauDeMots)
{
	Console.WriteLine(mot);
}
```

On peut reproduire le comportement d'un `for` standard :

```C#
int i = 0;
foreach(...code...)
{
    //...code, puis finir par :
    i++;
}
```

Tester que la boucle ne traite des valeurs qu'en lecture seule :

``` C#
int[] nbres = new int[]{1, 2, 3};

for(int i = 0; i < nbres.Length; i++)
{
	nbres[i] = i * 3; // on modifie le contenu du tableau
}

foreach(int nb in nbres)
{
	Console.WriteLine(nb * 3); // on modifie la variable locale nb et pas les valeurs du tableau
}
```

Pour explorer un `dictionary`, on peut utiliser `foreach` dont **l'élément d'itération est de type paire clé-valeur** :

```C#
foreach(KeyValuePair<int,Item> item in itemDico)
{
	Console.WriteLine("Clé : " + item.Key);
	Console.WriteLine("Valeur : " + item.Value.name);
}
```

On peut aussi explorer seulement **par clé** ou **par valeur** :

```C#
foreach(int cle in itemDico.Keys)
{
	Console.WriteLine(cle);
}
```

```C#
foreach(Item item in itemDico.Values)
{
	Console.WriteLine(item.nom);
}
```

## Break

`break` permet de **terminer la boucle à une itération donnée**.

```C#
for(int i = 0; i < 10; i++)
{
    Console.WriteLine(i);
    if(i == 5) // à cette valeur
	{
        break; // la boucle s'arrête
    }
}
```

## Continue

`continue` permet de **stopper l'itération puis passer à la suivante** ou arrêter la boucle si plus rien.

```C#
int i = 0;

while (i < 10) 
{
    if (i == 5) // à cette valeur, faire ce qui suit
    {
        i += 3; 
        continue;
    }
    // Ce qui suit continue n'est pas effectué
    Console.WriteLine(i);
    i++;
}
// 0,1,2,3,4,8,9
```

## Tableau multidimensionnel

Pour parcourir un **tableau multidimensionnel** : 
- on peut **imbriquer** des boucles `for`. Exemple d'un tableau bidimensionnel : la premier parcourt les lignes, la seconde (à l'intérieur) parcourt les colonnes,
- on peut utiliser une boucle `foreach` qui **parcourt toutes les entrées**,
- attention : `nom.Length` renvoie la **taille totale**. Exemple : un tableau bidimensionnel de 2 par 4 a pour longueur 8.
