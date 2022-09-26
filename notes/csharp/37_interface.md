# Interface

Le 26-09-2022

Une `class` ou `struct` implémentant une interface fournit tous les membres prévus de cette interface. [MS Learn Interface](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/interface "MS Learn Interface")

## Introduction

Une **interface** est un type `abstract` ne contenant **aucune donnée** et qui **définit des comportements** au moyen de **méthodes à signature spécifique**. Avantage : l'**implémentation multiple** même si ces interfaces n'ont aucun rapport entre elles. Exemple : une mur et une voiture n'ont pas de rapport mais sont tous les deux destructibles. On dit alors que telle classe possède telle fonctionnalité.

Une **interface** pose une sorte de contrat de fonctionnalités :
- comme une classe `abstract`, elle **force les implémentations**,
- en retour, une classe implémentant une interface peut être utilisée en ciblant l'interface (polymorphisme).

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

L'interface peut elle-même implémenter d'autres interfaces. Alors, la classe implémentant cette nouvelle interface devra **tous les membres, y compris ceux des autres interfaces**.

## Définition

On définit une interface :
- en général hors de la classe, dans un fichier script spécifique,
- en commençant son nom par un `I` majuscule signifiant "interface" et le nom suivant commençant par une majuscule,
- puis éventuellement en écrivant le nom comme "capacité".

Les méthodes sont `public` et `abstract` mais il n'est **pas nécessaire de l'indiquer**.
```
public interface IKillable
{
	void Kill();
}
```

Une interface peut être **générique**.
```
public interface IDamagable<T> // type générique
{
	int Health {get; set;}
	
	void Damage(T amount);
}
```

C# fournit beaucoup d'interfaces prêtes à l'emploi. Ex : `ISerializable`, `IEnumerable`, `IComparable`, `ICollection`...

**Attention**, à partir de C#8 et Unity 2020, un membre d'interface **peut déclarer un corps**. 

## Implémentation

Pour implémenter l'interface, il faut **écrire le code de l'interface**.

Visual Studio fournit une commande permettant d'accélérer l'implémentation du code. Il faut faire un clic droit sur le nom `IDamagable` pour que le menu apparaisse et choisir `Quick actions and refactorings...`. Dans l'exemple suivant, on a choisi `Implement interface` :
```
public class Ennemy : MonoBehaviour, IKillable, IDamagable<float>  
{
	public int Health 
	{	get
		{
			
		}
		set
		{
			
		}
	}
	
	public void Damage(float amount)
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
```
public class Chose IKillable
{
	void IKillable.Kill()
	{
		//...
	}
}
```

L'appel de membre, lui, ne peut s'effectuer **que sur le type de l'interface**.
```
IKillable c1 = new Chose();
c1.Kill();
	
Chose c2 = new Chose();
c2.Kill(); // erreur à la compilation
```

## Polymorphisme

Le polymorphisme permet **l'accès à une méthode d'interface implémentée**.

Dans l'exemple suivant, on lance un rayon à partir de la caméra vers le lieu du clic souris gauche et on lance la méthode de l'objet touché par le rayon, objet qui implémente l'interface `IDamagable`.
```
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
					obj.Damage(500.0f); // accès à une de ses méthodes
			}
		}
	}
}
```

## Tester l'implémentation

Sur le modèle de l'exemple précédent, on peut tester si un script implémente une interface. Deux possibilités :
1. en ciblant le script, et par polymorphisme y accéder par son interface,
2. par accès à l'interface.

Exemples avec Unity :
```
bool t1a = GetComponent<MonScript>() is IUsable;
bool t1b = (IUsable) GetComponent<MonScript>();
```
```
bool t2 = GetComponent<IUsable>() == null;
```

Avantages et inconvénients dans ces exemples :
1. test **explicite** de la cible mais implique de **connaître le script**,
2. test **implicite** de la cible mais ne retourne que le **premier composant** trouvé sur le `gameObject`.

## L'Inspector d'Unity

Actuellement, dans Unity, les interfaces ne sont pas sérialisées, donc ne sont pas affichées dans l'*Inspector*. Des solutions de contournement plus ou moins complexes existent.

**Solution 1** : remplacer les interfaces par des classes abstraites. On crée une classe héritant de la classe de base, puis par exemple on définit un champ dans une classe d'objet joueur.
```
public abstract class MaBase : MonoBehaviour 
{
	public abstract void Utiliser(); 
}
```
```
public class Derivee : MaBase 
{ 
	public override void Utiliser()
	{ 
		//...
	}
} 
```
```
[SerializedField] MaBase chose;
```

**Solution 2** : passer par une variable passerelle et rafraîchir la variable cible. S'il y a une erreur, utiliser non des `Array` mais des `List`.
```
public List<IMonInterface> m_monInterface  = new List<IMonInterface>(); // ne s'affiche pas
public List<MonoBehaviour> m_mesScripts = new List<MonoBehaviour>(); // scripts implémentant l'interface

private void OnValidate() // en éditeur : au chargement ou au changement de contenu
{
	m_monInterface.Clear();
	foreach (MonoBehaviour item in m_mesScripts)
	{
		if (item is IMonInterface)
		{
			m_monInterface.Add((IMonInterface) item);
		}
	}
}
```

Dans cette solution 2, on peut très bien **appeler la méthode de l'interface directement**, ce qui évite de devoir passer par une seconde liste. La syntaxe est un peu particulière :
```
public List<MonoBehaviour> m_mesScripts = new List<MonoBehaviour>(); // scripts implémentant l'interface

if (m_mesScripts.Count > 0)
{
	foreach (MonoBehaviour mb in m_mesScripts)
	{
		if (mb is IMonInterface)
		{
			((IMonInterface)mb).LaMethode(); // syntaxe du cast d'appel de méthode
		}
	}
}
```

## Méthodes de même signature

Prenons deux interfaces proposant chacune une méthode de même signature que l'autre (nom, paramètres, sortie). L'implémentation ne requiert qu'**une seule méthode**. 

Pour distinguer les deux méthodes, alors il faut **passer par la classe**. Les méthodes seront alors nécessairement publiques car définies telles dans les interfaces :
```
class MaClasse : IChose, ITruc
{
	void IChose.Faire(){} // Méthode de l'un
	void ITruc.Faire(){} // Méthode de l'autre
}
```

Or, côté objet, comment appeler les méthodes distinctement ? Alors, on passera par le polymorphisme :
```
MaClasse  obj = new MaClasse();
obj.Faire(); // erreur, la méthode n'existe pas

IChose c = obj;
c.Faire();

ITruc t = obj;
t.Faire();
```

Pour corriger l'erreur précédente, il suffit d'ajouter une méthode spécifique de la classe :
```
class MaClasse : IChose, ITruc
{
	void IChose.Faire(){} // Méthode de l'un
	void ITruc.Faire(){} // Méthode de l'autre
	public void Faire(){} // Méthode de la classe
}
```

## Classes .NET

.NET propose des interfaces qui permettent de mieux intégrer nos classes personnelles. Par exemple, on a créé des objets `Enemy` et on les référence dans un `array`. Si on veut trier ce dernier, on s'en remet aux méthodes natives .NET comme `Array.Sort()`. Or, peut-être que les critères de tri sont plus spécifiques pour notre classe `Enemy` que pour les types natifs. Alors, on peut coder la classe `Enemy` de façon à ce qu'elle implémente l'interface `IComparable` et effectue sa propre méthode de tri (méthode `CompareTo()`).
```
public int CompareTo(object obj)
{
	Enemy e = obj as Enemy;
	return String.Compare(this.faction, e.faction);
}
```
Usage avec un constructeur permettant de renseigner la faction des ennemis :
```
Enemy[] _enemies = new Enemy[]
{
	new Enemy("Verts"),
	new Enemy("Couards")
	new Enemy("Grognons"),
};

Array.Sort(_enemies);

foreach(Enemy item in _enemies)
{
	Debug.Log(item.faction);
}
```
