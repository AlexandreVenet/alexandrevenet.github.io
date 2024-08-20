# Interface

Le 18-08-2024

Une entité qui définit des fonctionnalités et qui contraint des entités à les implémenter. [Source](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/interfaces _blank)

## Introduction

Une **interface** est un type `abstract` ne contenant **aucune donnée** et qui **définit des comportements** au moyen de **méthodes à signature spécifique**. Avantage : l'**implémentation multiple**, alors que C# ne gère pas l'héritage multiple. Les interfaces implémentées peuvent n'avoir aucun rapport entre elles, par exemple : une mur et une voiture n'ont pas de rapport (ou pas encore) mais sont destructibles. 

Une **interface** pose une sorte de contrat de fonctionnalités :
- comme une classe `abstract`, elle **force les implémentations**,
- en retour, une classe implémentant une interface peut être utilisée en ciblant l'interface (polymorphisme).

L'interface peut être implémentée par une `class` ou une `struct`.

L'interface est plus **restrictive** qu'une classe `abstract` et donc permet d'écrire des **modèles** plus rigoureux. Elle :
- **n'est pas une classe**,
- **n'hérite d'aucune classe**,
- est `public` seulement,
- est un **ensemble de méthodes** `public` et `abstract`,
- oblige une **implémentation totale** de ce qu'elle a défini (sinon erreur),
- ne contient **aucun membre** `static`,
- ne contient **aucun champ**, mais **autorise les propriétés**, les **événements**,
- peut **implémenter une ou plusieurs autres interfaces** (donc doit aussi implémenter les méthodes définies dans ces interfaces).

L'interface n'est **pas une classe** et **ne peut pas être instanciée**. 

L'interface peut elle-même implémenter d'autres interfaces. Alors, la classe implémentant cette nouvelle interface devra implémenter **tous les membres, y compris ceux des autres interfaces**.

## Définition

On définit une interface :
- en général hors de la classe, dans un fichier script spécifique,
- en commençant son nom par un `I` majuscule signifiant "interface" et le nom suivant commençant par une majuscule,
- puis éventuellement en écrivant le nom comme "capacité".

Les méthodes sont `public` et `abstract` mais il n'est **pas nécessaire de l'indiquer**.

```C#
public interface IKillable
{
	void Kill();
}
```

Une interface peut être **générique**.

```C#
public interface IDamagable<T> // type générique
{
	int Health {get; set;}
	
	void Damage(T amount);
}
```

C# fournit beaucoup d'interfaces prêtes à l'emploi. Ex : `ISerializable`, `IEnumerable`, `IComparable`, `ICollection`...

**Attention**, à partir de C#8 et Unity 2020, un membre d'interface **peut déclarer un corps**. Ce sont alors des implémentations par défaut. L'entité implémentant l'interface n'a pas besoin de déclarer ces membres s'ils ne sont pas modifiés.

## Implémentation

Pour implémenter l'interface, il faut **écrire le code de l'interface**.

Visual Studio fournit une commande permettant d'accélérer l'implémentation du code. Il faut faire un clic droit sur le nom `IDamagable` pour que le menu apparaisse et choisir `Quick actions and refactorings...`. Dans l'exemple suivant, on a choisi `Implement interface` :

```C#
public class Ennemy : MonoBehaviour, IKillable, IDamagable<float>  
{
	public int Health {	get; set; }
	
	public void Damage(int amount)
	{
		// On peut écrire librement les instructions
		Health -= amount;
	}
	
	public void Kill()
	{
		//...
	}
}
```

Noter que les **membres d'interface implémentée sont publics**.

## Implémentation explicite

On peut effectuer une **implémentation explicite** lorsque la classe implémente plsuieurs interfaces, dans un but de confort de lecture. Ici, le mot-clé `public` **ne doit pas être utilisé**.

```C#
public class Chose IKillable
{
	void IKillable.Kill()
	{
		//...
	}
}
```

L'appel de membre, lui, ne peut s'effectuer **que sur le type de l'interface**.

```C#
IKillable c1 = new Chose();
c1.Kill();
	
Chose c2 = new Chose();
c2.Kill(); // erreur à la compilation
```

## Polymorphisme

Le polymorphisme permet **l'accès à une méthode d'interface implémentée**.

Dans l'exemple suivant, on lance un rayon à partir de la caméra vers le lieu du clic souris gauche et on lance la méthode de l'objet touché par le rayon, objet qui implémente l'interface `IDamagable`.

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Main : MonoBehaviour
{
	void Update()
	{
		if(Input.GetMouseButtonDown(0))
		{
			Ray rayonOrigine = Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hitInfo;
	
			if(Physics.Raycast(rayonOrigine, out hitInfo))
			{
				// Objet de type de l'interface
				IDamagable obj = hitInfo.collider.GetComponent<IDamagable>(); 
	
				if(obj != null)
				{
					obj.Damage(500); // accès à une de ses méthodes
				}
			}
		}
	}
}
```

## Tester l'implémentation

Sur le modèle de l'exemple précédent, on peut tester si une entité implémente une interface. Deux possibilités :
1. cibler l'entité et, par polymorphisme, y accéder par son interface,
2. par accès à l'interface.

Exemples avec Unity :

```C#
bool a = GetComponent<MonScript>() is IUsable;
bool b = (IUsable) GetComponent<MonScript>();
```

```C#
bool estIUsable = GetComponent<IUsable>() != null;
```

Avantages et inconvénients dans ces exemples :
1. test **explicite** de la cible mais implique de **connaître l'entité**,
2. test **implicite** de la cible mais ne retourne que le **premier composant** trouvé sur le `gameObject`.

## Méthodes de même signature

Prenons deux interfaces proposant chacune une méthode de même signature (nom, paramètres, sortie). L'implémentation ne requiert qu'**une seule méthode**, ce qui peut être heureux dans certains cas. Mais s'il faut distinguer les deux méthodes, alors il faut **passer par la classe**. Les méthodes seront alors nécessairement publiques car définies telles dans les interfaces :

```C#
class MaClasse : IChose, ITruc
{
	void IChose.Faire(){} 
	void ITruc.Faire(){} 
}
```

Or, côté objet, comment appeler les méthodes distinctement ? Passer par le polymorphisme :

```C#
MaClasse  obj = new MaClasse();
obj.Faire(); // erreur, la méthode n'existe pas

IChose c = obj;
c.Faire(); // ok

ITruc t = obj;
t.Faire(); // ok
```

Pour corriger l'erreur précédente, il suffit d'ajouter une méthode spécifique de la classe :

```C#
class MaClasse : IChose, ITruc
{
	void IChose.Faire(){}
	void ITruc.Faire(){}
	public void Faire(){} // Méthode de la classe
}
```

## Classes .NET

.NET propose des interfaces qui permettent de mieux réaliser nos classes personnelles. Par exemple, on a créé des objets `Enemy` et on les référence dans un `Array`. Si on veut trier ce dernier, on s'en remet aux méthodes natives .NET comme `Array.Sort()`. Or, peut-être que les critères de tri sont plus spécifiques pour notre classe `Enemy` que pour les types natifs. Alors, on peut coder la classe `Enemy` de façon à ce qu'elle implémente l'interface `IComparable` et effectue sa propre méthode de tri (méthode `CompareTo()`).

```C#
public int CompareTo(object obj)
{
	Enemy e = obj as Enemy;
	return String.Compare(this.faction, e.faction);
}
```

Usage avec un constructeur permettant de renseigner la faction des ennemis :

```C#
Enemy[] _enemies = new Enemy[]
{
	new Enemy("Verts"),
	new Enemy("Couards")
	new Enemy("Grognons"),
};

Array.Sort(_enemies);

foreach(Enemy item in _enemies)
{
	Console.WriteLine(item.faction);
}
```

On peut aussi utiliser `IEquatable<T>` pour définir le comportement de la méthode `Equals()`.
