# Boucles

Le 24-09-2022

Faire tourner des calculs sous une certaine condition.

## Introduction

Les **boucles** (*loops*) sont une autre **structure de contrôle**, celle des **instructions itératives**. Elles réexécutent les mêmes instructions par itération, c'est-à-dire à chaque tour, cycle. Les boucles sont **imbriquables**.

## For

La boucle `for` est une boucle dont **on connaît le nombre d'itérations**. On dispose d'une valeur de départ (*initializer*), d'une condition d'itération et d'un pas (*iterator*) pour calculer l'itération suivante. Cette boucle permet des traitements variés (par exemple, par décrémentation).
```
for(int i = 0; i < 10 ;i++)
{
	Console.WriteLine("itérateur = " + i);
}
```
```
for(int i = 25; i > 0; i--)
{
	if(i % 2 == 0) // modulo pour savoir si nombre pair (pas de reste)
	{
		Debug.Log($"{i} pair.");
	}
	else if(i % 2 == 1) // il y a un reste, donc nombre impair
	{
		Debug.Log($"{i} impair.");
	}
}
```

La boucle `for` peut accueillir plusieurs *initialiers*, conditions et pas.
```
for (int i = 0, j = 0; i+j < 5; i++, j++)
{
    Console.WriteLine($"{i} + {j} = {i+j}");
}
// 0 + 0 = 0
// 1 + 1 = 2
// 2 + 2 = 4
```

Dans Unity, on peut contrôler le temps entre chaque itération de la boucle avec une ***coroutine*** : **énumérateur** dont on peut définir par exemple le temps de pause avant d'effectuer une instruction ou après : 
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class BouclesFor : MonoBehaviour
{
    public int pommes;
	
    void Start()
    {
        // test avec coroutine permettant de contrôler les itérations
        StartCoroutine(AjouterPommesRoutine());

        // la coroutine est asynchrone, ceci apparaît avant la fin du traitement de l'IEnumerator
        Debug.Log(pommes);
    }
	
    IEnumerator AjouterPommesRoutine()
    {
        for (int i = 0; i < 15; i++)
        {
            pommes++;
            yield return new WaitForSeconds(0.5f); // attendre pendant x secondes 
        }
    }
}
```

## While

La boucle `while` est une boucle utilisée **lorsqu'on ne connaît pas le nombre d'itérations**, c'est-à-dire **tant qu'une condition est vraie**. 

```
int tassesALaver = 4;

while(tassesALaver > 0){
    tassesALaver --;
    Debug.Log("Une tasse lavée ! Il en reste " + tassesALaver.ToString() + " dans l'évier.");
}
```

Dans Unity, on peut temporiser une boule `while` avec une ***coroutine*** :
```
/*
   Un programme où on a une vitesse maximale aléatoire entre 60 et 120.
    On incrémente toutes les 1 seconde la vitesse de 5.
    Quand la vitesse égale ou dépasse la vitesse maximale, arrêter l'incrémentation.
*/
	
public int vitesseMax;
public int vitesse;
	
void Start()
{	
    vitesseMax = Random.Range(60,121); // min inclus, max exclu
    StartCoroutine(VitessePlus5Routine());
}
	
IEnumerator VitessePlus5Routine()
{
    /*
        for n'est pas pertinent car on est obligé d'y déclarer une condition avec une valeur maximum :
            - valeur arbitraire comme 1000,
            - vitesseMax.
        do... while non plus pour la même raison.
        Avec While, il n'y a pas de telle limite
    */
    while (true)
    {
        yield return new WaitForSeconds(1.0f);
        vitesse += 5;
        if(vitesse > vitesseMax)
            break; // arrête la boucle 
    }
}
```

## Do...while

`do...while` est comme `while` sauf que le bloc d'instructions est **effectué au moins une fois** car **le test le suit** (et non le précède comme les autres boucles).

```
bool parle = false;

do{
    Debug.Log("Je parle au moins une fois même si je suis censé me taire.");
}while(parle == true);
```

```
int i = 51;

do{
    Debug.Log(i); // affiche 51
    if(i <= 50) // non traité
    {
        i++
    }
}while(i < 50);
```

## Foreach

`foreach` permet de parcourir des objets implémentant l'interface `IEnumerable`. Cette boucle ne peut effectuer que des itérations « vers l'avant » (du début à la fin, item par item).

```
string[] tableauDeMots = {"pipi","caca","popo"};

foreach(string mot in tableauDeMots)
{
	Debug.Log(mot);
}
```

On peut reproduire le comportement d'un `for` standard :
```
int i = 0;
foreach...
{
    //...code, puis finir par :
    i++;
}
```

Attention : `foreach` ne traite les **valeurs qu'en lecture seule**.
```
int[] nbres = new int[]{1,2,3};

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
```
foreach(KeyValuePair<int,Item> item in itemDico)
{
	Debug.Log("Clé : " + item.Key);
	Debug.Log("Valeur : " + item.Value.name);
}
```

On peut aussi explorer seulement **par clé** ou **par valeur** :
```
foreach(int cle in itemDico.Keys)
{
	Debug.Log(cle);
}
```
```
foreach(Item item in itemDico.Values)
{
	Debug.Log(item.nom);
}
```

## Break

`break` permet de **terminer la boucle à une itération donnée**.

```
for(int i = 0; i < 10; i++)
{
    Debug.Log(i);
    if(i == 5){ // à cette valeur
        break; // la boucle s'arrête
    }
}
```

## Continue

`continue` permet de **stopper l'itération puis passer à la suivante** ou arrêter la boucle si plus rien.

```
int i = 0;

while (i < 10) 
{
    if (i == 5) // à cette valeur, faire ce qui suit
    {
        i += 3; 
        continue;
    }
    // après continue, ceci n'est pas effectué
    Debug.Log(i);
    i++;
}
// 0,1,2,3,4,8,9
```

## Tableau multidimensionnel

Pour parcourir un **tableau multidimensionnel** : 
- on peut **imbriquer** des boucles `for`. Exemple d'un tableau bidimensionnel : la premier parcourt les lignes, la seconde (à l'intérieur) parcourt les colonnes,
- on peut utiliser une boucle `foreach` qui **parcourt toutes les entrées**,
- attention : `nom.Length` renvoie la **taille totale**. Exemple : un tableau bidimensionnel de 2 par 4 a pour longueur 8.