# Enum

Le 23-09-2022

Un ensemble d'identifiants disponibles sans utiliser de chaîne de caractères et qui reposent sur un nombre. [MSDN Enum](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/enum "MSDN Enum")

## Présentation

L'**énumeration** est un **type valeur** et de **longueur fixe**. C'est un ensemble de constantes nommées dont les valeurs sont des nombres entiers. Attention, ce n'est **pas une collection**.

Elle peut être définie :
- **dans une classe** seulement si cette classe en a besoin, 
- **en dehors d'une classe**, par exemple au-dessus de la déclaration,
- **dans un fichier script spécifique** qui contient alors seulement cette `enum` déclarée publique afin que d'autres classes puissent l'utiliser.
```
public enum nom
{
	val1,
	val2
}
```

## Usage

Le **point-virgule de fin** n'est pas nécessaire. Chaque **entrée doit finir par une virgule** et la dernière entrée peut en avoir une aussi.

La **valeur par défaut** est la première valeur.

Chaque constante est déclarée à un **index** spécifique, par défaut le compte commence à 0 :
```
enum Directions {Nord, Est, Sud, Ouest}
```

On peut spécifier le premier index. Si c'est 10, alors le deuxième est le précédent +1 et ainsi de suite :
```
enum Directions {Nord = 10, Est, Sud, Ouest}
```

On peut spécifier chaque index :
```
enum Directions {Nord = 10, Est = 11, Sud = 15, Ouest = 2}
```

On peut changer le **type des constantes** tant que c'est le type numérique entier qui est utilisé. Ici, on va déclarer des `short` (codés sur 16 bits) plutôt que des `int` (codés sur 32 bits). 
```
enum Directions : short {Nord, Est, Sud, Ouest}
```

Maintenant, pour utiliser l'`enum`, il faut d'abord l'appeler. 
```
public enum Directions {Nord, Est, Sud, Ouest}
public Directions maDirection; // dans l'éditeur, apparaît sous forme de menu déroulant

private voit Start()
{
	Directions maDirection = Directions.Nord;
	Directions autreDirection = ReverseDirection(Directions.Sud);
}

private Direction ReverseDirection(Directions dir)
{
	if(dir == Directions.Nord)
		dir = Directions.Sud;
	else if(dir == Directions.Sud)
		dir = Directions.Nord;
	else if(dir == Directions.Est)
		dir = Directions.Ouest;
	else if(dir == Directions.Ouest)
		dir = Directions.Est;
	return dir;     
}
```

## Enum et classe personnelle

Les `enums` peuvent être utiles pour définir un champ dans une classe personnelle. Par exemple, ici on définit un objet `Item` **général** contenant une `enum` permettant de caractériser un champ d'instance ; cela évite de créer autant d'`Item` **particuliers** selon ce champ.
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine; 
	
public enum ItemType
{
	Aucun,
	Outil,
	Consommable
}
	
public class Item
{
	public string nom;
	public int id;
	public sprite icone;
	public ItemType monType;
	
	public void Action() // l'item a une action spécifique de son type
	{
		switch(monType)
		{
			case ItemType.Arme :
				Debug.Log("Ceci est un outil.");
				break;
			case ItemType.Consommable :
				Debug.Log("Ceci est un consommable.");
				break;
			default :
				Debug.log("Bah, quoi, c'est un item.);
				break;
		}
	}
}
```
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine; 
	
public class ItemBDD : MonoBehaviour 
{
	public List<Item> itemBDD = new List<Item>(); // définir en éditeur
	
	void Start()
	{
		itemBDD[0].Action();
	}
}
```

## Index

Une `enum` peut servir de référence pour gérer l'application, en utilisant ses **index**. 

Dans cet exemple, dans une scène initiale, intégrer ce qui suit. Ajouter autant de scènes que de difficultés. Puis dans les `Build settings`, ajouter les scènes (au mieux, dans l'ordre pour respecter le code). 
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine; 
using UnityEngine.SceneManagement;
	
public class LevelSelect : MonoBehaviour 
{
	public enum Difficulty
	{
		Easy,
		Normal,
		Hard,
		Extreme
	}
	
	public Difficulty selectedDifficulty;
	
	private void Start()
	{
		SceneManager.LoadScene((int)selectedDifficulty);
	}
}
```

## Conversions

L'utilisation de l'index trouve d'heureuses manipulations avec la **conversion explicite** (*cast*).
```
public enum Boussole { Nord = 0, Est = 1, Sud = 2, Ouest = 3 }
public Bousole b1, b2;
 
private void Awake()
{
	b1 = (Boussole) Random.Range(0, 4); 
	// ou bien
	b2 = Random.Range(0, 4) as Boussole;
}
```

La classe `System.Enum` fournit la méthode `TryParse()` permettant de tester la conversion de la valeur en celle de l'`enum` avant de l'effectuer et de renvoyer le résultat.
```
MyEnum result;
Debug.Log(System.Enum.TryParse<MyEnum>("toto", out result));
```

Conversions possibles dans les deux sens :
```
Saison 
{ 
	Printemps, 
	Ete, 
	Automne, 
	Hiver 
}

Debug.Log((int) Saison.Hiver);
Debug.Log((Saison) 1);
```
