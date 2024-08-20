# Dictionary

Le 19-08-2024

Une collection non triée de paires clé-valeur. [Microsoft *Learn*](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2 _blank)

## Introduction

Le type `Dictionary<TKey,TValue>` est une **collection** de données **à taille modifiable** dont les données sont stockées par **paires clé-valeur** (*key-value pair*) et **non triée**. Chaque **clé est unique**, **immuable** et **non nulle** (sinon levée d'exception). Une clé doit exister pour être explorée ou appelée. Les valeurs peuvent être en doublon, `null`.

Le type `Dictionary<TKey,TValue>` **ne s'affiche pas** dans l'*Inspector* d'Unity. On trouvera donc des alternatives (changer de type de collection ou créer alimenter automatiquement une `List` ou faire tout autre chose...).

## Initialisations

Initialisation :

```C#
Dictionary<int, string> test = new Dictionary<int, string>();
```

Initialisation avec les initialiseurs :
```C#
Dictionary<int, string> test = new Dictionary<int, string>()
{
	{ 10, "toto" },
	{ 1, "youpi" }	
};
```

## Ajouts

Ajout de données avec `.Add()`.

```C#
test.Add(3, "Trois");
test.Add(1, "Un");
test.Add(2, "Deux");
test.Add(4, null);
test.Add(10, "dix");
test.Add(5, "Cinq");
```

On peut tester l'ajout avec `.TryAdd()`.

## Accès 

**Accéder** à une valeur avec `[key]` (levée d'exception à l'exécution si la clé n'existe pas). Pour **modifier** la valeur, même syntaxe. Avec la même syntaxe, si la clé n'existe pas, alors la paire clé-valeur est ajoutée.

```C#
Console.WriteLine(test[3]); // Trois
```

```C#
test[10] = "Dix"; // modification
test[6] = "Six"; // ajout
```

Les clé et valeur peuvent être **testées avant traitement** avec `.ContainsKey()` et `.TryGetValue()`. 

```C#
Console.WriteLine(test.ContainsKey(5));

if(test.TryGetValue(5, out int result))
{
	Console.WriteLine(result);
}
```

## Exploration

On peut accéder aux clés et valeurs dans une boucle avec les propriétés `Key` et `Value`. Par exemple dans une boucle `foreach` :

```C#
foreach(KeyValuePair<int,string> item in test)
{
	Console.WriteLine($"{item.Key} : {item.Value}");
}
```

## Suppression

Pour supprimer, utiliser `Remove(key)`. La méthode renvoie un booléen : `false` si la clé est introuvable.

```C#
test.Remove(4);
test.Remove(99); // pas d'erreur si clé introuvable
```

La collection se vide avec `.Clear()`.

```C#
test.Clear();
```

## Usages

Exemple avec un objet de classe personnelle et une clé de type `int`, dans Unity :

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
[System.Serializable]
public class Item
{
	public string nom;
	public Item(string nom)
	{
		this.nom = nom;
	}
}
```

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class ItemBDD : MonoBehaviour
{
	public Dictionary<int,Item> itemDico = new Dictionary<int,Item>();
	
	private void Start()
	{
		// Remplir le dico puisqu'on ne peut pas le faire en Inspector
		Item chose = new Item("Chose");
		Item pain = new Item("Pain");
		Item jouet = new Item("Jouet");
	
		itemDico.Add(0, chose); 
		itemDico.Add(1, pain);
		itemDico.Add(2, jouet);
		itemDico[3] = new Item("Toto"); // syntaxe des crochets
	
		// L'ajout lance une exception en cas de clé déjà existante
		try
		{
			itemDico.Add(2, new Item("Autre"));
		}
		catch (ArgumentException)
		{
			Debug.Log("Un élément utilise déjà cette clé.");
		}
	
		// Obtenir une entrée 
		var item0 = itemDico[0];
		Debug.Log(item0.nom);

		// Levée d'exception en cas de clé inexistante
		try
		{
			Debug.Log(itemDico[60].nom);
		}
		catch(KeyNotFoundException)
		{
			Debug.Log("Clé introuvable");
		}
	
		// La collection contient-elle telle clé ?
		if(itemDico.ContainsKey(60))
		{
			Debug.Log("Ok, c'est la clé 60.");
		}
		else
		{
			Debug.Log("Clé inexistante");
		}
	
		// Obtenir une valeur à partir d'une clé si cette dernière existe
		if(itemDico.TryGetValue(60, out string resultat))
		{
			Debug.Log("60 : " + resultat);
		}
		else
		{
			Debug.Log("Rien.");
		}
	}
}
```
