# Enum

Le 18-08-2024

Un ensemble d'identifiants disponibles sans utiliser de chaîne de caractères et qui reposent sur un nombre. [MSDN Enum](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/enum _blank)

## Présentation

L'**énumeration** est un **type valeur** et de **longueur fixe**. C'est un ensemble de constantes nommées dont les valeurs sont des nombres entiers. Attention, ce n'est **pas une collection**.

Elle peut être définie :
- **dans une classe** si cette classe seule en a besoin, 
- **en dehors d'une classe**, par exemple au-dessus de la déclaration dans le même fichier,
- **dans un fichier script spécifique** qui contient alors seulement cette `enum` déclarée publique afin que d'autres classes puissent l'utiliser.

```C#
public enum nom
{
	val1,
	val2
}
```

## Définition

Le **point-virgule de fin** n'est pas nécessaire. Chaque **entrée doit finir par une virgule** et la dernière entrée peut en avoir une aussi.

La **valeur par défaut** est la première valeur.

Chaque constante est déclarée à un **index** spécifique, par défaut le compte commence à 0 :

```C#
enum Direction {Nord, Est, Sud, Ouest}
```

On peut spécifier le premier index. Par exemple, si le premier index est `10`, alors le deuxième est `11` et ainsi de suite :

```C#
enum Direction {Nord = 10, Est, Sud, Ouest}
```

On peut spécifier chaque index :

```C#
enum Direction {Nord = 10, Est = 11, Sud = 15, Ouest = 2}
```

On peut changer le **type des constantes** tant que c'est le type numérique entier qui est utilisé. Ici, on va déclarer des `short` (codés sur 16 bits) plutôt que des `int` (codés sur 32 bits). 

```C#
enum Direction : short {Nord, Est, Sud, Ouest}
```

## Usage

Exemple dans une seule classe :

```C#
public enum Direction {Nord, Est, Sud, Ouest}
public Direction maDirection; 

private voit Start()
{
	maDirection = Direction.Nord;
	Direction autreDirection = ReverseDirection(Direction.Sud);
}

private Direction ReverseDirection(Direction dir)
{
	if(dir == Direction.Nord)
		dir = Direction.Sud;
	else if(dir == Direction.Sud)
		dir = Direction.Nord;
	else if(dir == Direction.Est)
		dir = Direction.Ouest;
	else if(dir == Direction.Ouest)
		dir = Direction.Est;
	return dir;     
}
```

## Enum et classe personnelle

Les `enum` peuvent être utiles pour définir un champ dans une classe personnelle. Par exemple, ici on définit un objet `Item` **général** contenant une `enum` permettant de caractériser un champ d'instance ; cela évite de créer autant d'`Item` **particuliers** selon ce champ.

```C#
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
				Debug.log("M'enfin, c'est un item !);
				break;
		}
	}
}
```

```C#
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

Une `enum` peut servir de référence de configuration, en utilisant ses **index**. 

Dans cet exemple, dans une scène initiale Unity, intégrer ce qui suit. Ajouter autant de scènes que de difficultés. Puis dans les `Build settings`, ajouter les scènes (au mieux, dans l'ordre pour respecter le code). 

```C#
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

```C#
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

```C#
MyEnum result;
Console.WriteLine(System.Enum.TryParse<MyEnum>("toto", out result));
```

Conversions possibles dans les deux sens :

```C#
Saison 
{ 
	Printemps, 
	Ete, 
	Automne, 
	Hiver 
}

Console.WriteLine((int) Saison.Hiver);
Console.WriteLine((Saison) 1);
```
