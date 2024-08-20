# Héritage

Le 17-08-2024

Genre et espèce en programmation orientée objet.

## Principe de la POO

La **programmation orientée objet (POO)** est un **paradigme de programmation** : façon de penser et d'organiser l'application, le code. La POO consiste à programmer selon la séparation entre d'un côté la **définition** (classe, interface...) et de l'autre côté la **réalisation** (objet, implémentation...).

La POO repose sur des principes généraux et sur une mise en œuvre technique qui dépend de l'auteur du langage de programmation.

J'ai déjà présenté au chapitre Classe quelques éléments de POO. Reprenons brièvement.
- **Encapsulation** : contrainte de restriction aux membres d'une entité pour contrôler sa modification, son utilisation.
- **Classe** : construction définissant des attributs et des actions.
- **Objet** : réalisation d'une classe. 
- **Membres** : terme général regroupant les attributs et actions d'une entité. D'un point de vue technique, les membres sont de nature variées : champs, constantes, propriétés, méthodes, constructeurs, événements, finaliseurs, indexeurs, opérateurs et types imbriqués. [Source](https://learn.microsoft.com/fr-fr/dotnet/csharp/programming-guide/classes-and-structs/members _blank)
- **Accessibilité** : contrôle de la visibilité d'un membre, d'une entité.

## L'héritage

L'**héritage** pose une **relation de genre et d'espèce**. Par exemple : le lit est un meuble, le meuble est le genre du lit, le lit est une espèce de meuble.

On distingue de façon générale :
- **classe de base, mère, parente** : classe en amont de toute hiérarchie de classes spécifiques,
- **classe dérivée, fille, enfant** : classe héritant de la classe de base.

Particularités de la hiérarchie :
- une classe **de base** peut avoir **plusieurs classes dérivées**, 
- une classe **dérivée** n'a qu'**une seule classe de base** (pas de multi-héritage) et elle **hérite de tous les membres non privés** de la classe de base.

L'héritage se déclare au niveau de la classe avec `:` suivi du nom de la classe parente.

```C#
public class Item
{
	public string nom;
}
	
public class Consommable : Item
{
	// Héritage du champ nom
	// Nouveau champ que la classe parente n'a pas :
	public string poison;
}
```

Instanciations :

```C#
public Item pain;
pain = new Item();
```

```C#
public Consommable painQuiPue = new Consommable();
```

L'**objet** est du **type de la classe parente et aussi du type de la classe enfant** ; c'est le **polymorphisme**.

## Héritage de Object

En général en .NET, **toutes les classes C# héritent directement ou indirectement** de la classe `Object`. Donc, si on n'écrit aucun héritage, alors la classe hérite directement d'`Object` ; si on écrit un héritage et que la classe parente hérite d'`Object`, alors la classe enfant hérite indirectement de la classe `Object`.

Hériter de la classe `Object` permet aux classes dérivées d'utiliser des méthodes : `ToString()`, `Equals()`...

Source : [MSDN System.Object](https://docs.microsoft.com/fr-fr/dotnet/api/system.object _blank)

Selon les *frameworks* adossés à .NET, il peut exister des hiérarchies d'héritage parallèles. Par exemple dans Unity, tous les `GameObject` et composants héritent de `UnityEngine.Object`. Cela peut parfois entrer en conflit de nommage avec la librairie C# `System.Object`. Pour résoudre cela : **expliciter le *namespace***, par exemple : `System.Random`, `UnityEngine.Random`.

## Héritage et constructeur

Une classe peut avoir **plusieurs constructeurs**. Par défaut, c'est le constructeur de la classe de base qui est toujours appelé, ce qui peut être modifié au besoin.

En héritage, on crée le constructeur de la classe enfant à partir d'un constructeur ciblé spécifique avec `base()`. Attention : si erreur de signature, **aucune erreur n'est envoyée** et c'est le constructeur de la classe parente qui est utilisé. 

```C#
public class Fruit
{
	public string nom;
	
	public Fruit() // Constructeur 1
	{
		nom = "Orange";
		Console.WriteLine("Fruit constructeur 1");
	}
	
	public Fruit(string nouveauNom) // Constructeur 2
	{
		nom = nouveauNom;
		Console.WriteLine("Fruit constructeur 2");
	}
}
	
public class Pomme : Fruit
{
	// Le constructeur parent est appelé avant le reste
	
	public Pomme() // Constructeur 1
	{
		nom = "Pomme rouge";
		Console.WriteLine("Pomme constructeur 1");
	}

	public Pomme(string nouveauNom) : base(nouveauNom) // Constructeur 2 
	{
		// Ce constructeur appelle le constructeur 2 de la classe parente (signature identique)
		// Inutile de définir le nouveau nom car le constructeur parent le fait déjà
		Console.WriteLine("Pomme constructeur 2");
	}
}

// Instanciations
Fruit monFruit = new Fruit();
Fruit maPomme = new Pomme();
Fruit maPomme = new Pomme("Gala");
```

`base()` permet d'appeler le constructeur parent. Le constructeur peut aussi appeler **un autre constructeur de la même classe** : on utilise `this()`. La signature doit alors correspondre au constructeur ciblé. 

```C#
public class Souris
{
	private static int compteur = 0;
	private int _vie;
	private string _nom;
	
	public Souris()
	{
		compteur ++;
	}
	
	public Souris(int vie) : this()
	{
		_vie = vie;
	}
	
	public Souris (string nom, int vie) : this(vie)
	{
		_nom = nom;
	}
}
```

On peut ainsi **chaîner des constructeurs**, dans la classe ou par héritage. L'ordre d'exécution s'effectue du plus lointain constructeur jusqu'à celui utilisé.

```C#
Souris mickey = new Souris("Mickey", 10); 
// Ordre : Souris(), Souris(int vie), Souris(string nom, int vie) 
```

## Interdire l'héritage

En Java, on peut poser des classes ou méthodes **finales**. En C#, c'est idem avec le mot-clé `sealed`. Ce mot-clé propose une certaine sécurité en évitant des manipulations non souhaitées.

```C#
public sealed class VaisseauEtoile : Vehicule
{
	// VaisseauEtoile est un Véhicule.
	// Il n'a pas de types dérivés.
}
```

`sealed` empêche également la réécriture des méthodes qui n'ont pas expressement été déclarées `virtual`. Cela peut néanmoins être contourné avec le *member hiding* avec le mot-clé `new`.

```C#
// Dans la classe dérivée :
public new string champParent;
```
