# Array

Le 24-09-2022

Une structure de donnée qui accueille un ensemble de valeurs de même type.

## Introduction 

Source : [Unity Docs Array](https://docs.unity3d.com/ScriptReference/Array.html "Unity Docs Array")

Un ***array*** (**tableau**) est un **ensemble d'items de même type, non redimensionnable**. La taille doit être définie. Le tableau présente des valeurs à des **index** et le premier index est 0.

L'*array* est disponible dans la classe `System.Array`.

Un *array* est un **objet** et on y accède **par référence**. Ainsi :
- un tableau déclaré sans assignation de valeur vaut `null`,
- un tableau passé en paramètre de fonction peut être modifié directement par les instructions de la fonction.

## Création

On crée un tableau de différentes manières selon les besoins. C# propose la possibilité d'assigner directement des valeurs aux index lors de l'initialisation, grâce aux **initialiseurs de collection**.
```
// déclaration de longueur, array avec les valeurs par défaut
string[] mesNoms = new string[3]; 
```
```
// assignation de valeurs, longueur implicite
int[] arrayInt = new int[] {12, 76, 8}; 

// syntaxe alternative
int[] nombres = {10,20,30}; 
```
```
float[] mesFloats; // vaut null
```

## Accès à l'index

Une valeur s'obtient par son **index** (sa place) dans le tableau. Le premier index est 0. 
```
string[] mesNoms = new string[3];
	
// accès à chaque index et assignation de valeur
mesNoms[0] = "pipi;
mesNoms[1] = "caca";
mesNoms[2] = "popo";
```

Pour accéder au dernier index, deux syntaxes :
```
arrayInt[arrayInt.Length-1] = 1; 
arrayInt[^1] = 1;
```

## Dimensions

[MSDN Tableaux multidimensionnels](https://docs.microsoft.com/fr-fr/dotnet/csharp/programming-guide/arrays/multidimensional-arrays "MSDN Tableaux multidimensionnels")

Un tableau peut avoir **plusieurs dimensions** (*multidimensional arrays*). Exemple : un tableau bidimensionnel comprend 2 indices : un pour la ligne, un autre pour la colonne. Le nombre de dimension est défini par le nombre de virgules utilisées.0

L'exemple suivant déclare un tableau à 2 dimensions composé de 4 lignes et de 2 colonnes.
```
int[,] tableau = new int[4,2]; 
```

Autres déclarations possibles en assignant des valeurs :
```
int[,] tableau = new int[,] { {1,2}, {3,4}, {5,6} };
```
```
int[,] tableau = new int[3,2] { {1,2}, {3,4}, {5,6} };
```
```
int[,] tableau = { {1,2}, {3,4}, {5,6} };
```

Pour accéder :
```
Debug.Log(tableau[0,0]); // 1
```

## Tableau de tableaux

On peut aussi créer des tableaux **de tableaux** (*jagged arrays*).
```
int[][] tableauNombres = new int[2][]; 
// création d'1 tableau contenant 2 tableaux de int
// tableauNombres[0] vaut null
// tableauNombres[1] vaut null
	
tableauNombres[0] = new int[3];
// création d'un tableau de longueur 3 sans valeurs
// tableauNombres[0] a un tableau pour valeur
// tableauNombres[0][0] vaut 0 (valeur par défaut de l'int)
// tableauNombres[1] vaut null
	
tableauNombres[0][1] = 12;
// premier tableau à l'index 0 > second tableau à l'index 1 > la valeur est 12
```

Représentation :
```
[0] :
-----[0]
-----[12]
-----[0]
[1] : null
```

Un tableau de tableau peut être créé à partir de tableaux préexistants. Imaginons 2 tableaux existants de longueurs différentes et de type `string` :
```
string[][] melange = { array1, array2 };
```

Dans le tableau principal, les tableaux « internes » peuvent être de **tailles différentes**.

## Propriétés et méthodes

On peut savoir si un tableau **contient** une valeur avec `Array.Exists()` qui utilise un **prédicat** sous forme d'expression lambda/méthode anonyme.
```
using System;
	
bool valeurDansTableau = Array.Exists(_monArrayDeStrings_, element => element == "Mon String");
```

`Clear()` efface les entrées du tableau. `null` pour un type référence ; valeur par défaut du type pour un type valeur.

`CopyTo()` copie des éléments vers un autre tableau.

La propriété `Length` retourne la longueur du tableau (le nombre d'index).

La propriété `Rank` retourne le nombre de dimensions.

`Array.Reverse()`, pour un tableau à une dimension, inverse l'ordre.
```
string[] mots = { "un", "deux", "trois" };
Array.Reverse(mots);
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
```

`Array.Sort()` trie un tableau à une dimension en fonction du type de données utilisé. Subtilité : si le type du tableau hérite de l'interface `IComparable`, alors c'est leur méthode `CompareTo()` qui est appelée pour effectuer le tri.
```
string[] mots = { "un", "deux", "trois" };
Array.Sort(mots);
foreach (var mot in mots)
{
    Console.WriteLine(mot);
}
```

`Array.Resize()` redimensionne un tableau (ajout ou suppression) à partir de la fin du tableau.
```
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
```
string mot = "Dialogue";
char[] motArrayChar = mot.ToCharArray();
```

Construire une nouvelle chaîne à partir d'un tableau de `char` avec le constructeur de la classe `String`.
```
string chaine = "abcdef123";
char[] chaineArrayChar = chaine.ToCharArray();
Array.Reverse(chaineArrayChar);
string chaineInverse = new string(chaineArrayChar);
Console.WriteLine(chaineInverse);
```

Ajouter un caractère « délimiteur » entre éléments d'un tableau avec `string.Join()`.
```
string chaine = "abcdef123";
char[] chaineArrayChar = chaine.ToCharArray();
Array.Reverse(chaineArrayChar);
string chaineAvecJoin = String.Join(",", chaineArrayChar);
Console.WriteLine(chaineAvecJoin);
```

Créer un tableau de chaînes à partir d'un caractère délimiteur avec `Split()` sur une chaîne (la méthode reçoit un type `char` en paramètre).
```
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
```
var tab = new[] { 4, 7, 9 };
Console.WriteLine($"Tableau : [{string.Join(" ", tab)}]");
```

## Dans Unity

Les tableaux peuvent être utilisés pour gérer des inventaires. Dans l'exemple suivant, on utilise une classe de données (*data-class*) avec un **attribut** `[System.Serializable]` pour l'afficher dans l'*Inspector*.
```
[System.Serializable]
public class Objet
{
	public int id;
	public string nom;
	public string description;
}

public class Inventaire : MonoBehaviour{
	
	public Objet[] mesObjets; // tableau d'instances de la classe Objet, à renseigner en éditeur

	void Start()
	{
		// afficher le contenu de l'inventaire
		foreach(var objet in mesObjets)
		{
			Debug.Log($"{objet.id} : {objet.nom}");
		}

		// afficher un élément aléatoirement 
		int alea = Random.Range(0,mesObjets.Length);
		Debug.Log($"Aléatoirement : {mesObjets[alea].nom} / {mesObjets[alea].description}");

		// chercher dans le tableau avec for  
		for(int i = 0; i < mesObjets.Length; i++)
		{
			if(mesObjets[i].id == 7)
			{
				Debug.Log("Vous avez l'objet d'id 7.");
			}
			else
			{
				Debug.Log("Pas d'objet d'id 7.");
			}
		}
	}

}
```

Dans Unity, on peut renseigner des tableaux de tout type, par exemple `GameObject`. Dans l'exemple suivant, on suppose que dans la scène sont placés 3 objets de ***tag*** « *Player* » nommés librement, et 3 *textMesh* nommés respectivement `td0`, `td1`, `td2` où le nombre est l'index du tableau. 
```
public class ArraysScript : MonoBehaviour
{
    public GameObject[] listeDePlayers; // à renseigner en éditeur

    void Start()
    {
        listeDePlayers = GameObject.FindGameObjectsWithTag("Player");

        for(int i = 0; i < listeDePlayers.Length; i++)
        {   
            GameObject td = GameObject.Find("td"+i.ToString());
            TextMesh texte = td.GetComponent<TextMesh>();
            texte.text = listeDePlayers[i].name;
			td.GetComponent<Renderer>().material.color = new Color(Random.value, Random.value, Random.value);
        }
    }
}
```
