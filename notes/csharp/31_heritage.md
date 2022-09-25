# Héritage

Le 25-09-2022

Genre et espèce en programmation orientée objet.

## Principe

L'**héritage** pose une **relation de genre et d'espèce**. Exemple : on dispose de l'idée d'ordinateur dont on réalise un objet ; l'ordinateur est une machine ou une espèce de machine.

On distingue alors de façon générale :
- **classe de base, mère, parente** : classe en amont de toute hiérarchie de classes spécifiques,
- **classe dérivée, fille, enfant** : classe héritant de la classe de base.

Particularités de la hiérarchie :
- une classe **de base** peut avoir **plusieurs classes dérivées**, 
- une classe **dérivée** n'a qu'**une seule classe de base** (pas de multi-héritage) et elle **hérite de tous les membres non privés** de la classe de base.
```
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
```
public Item pain;
pain = new Item();
public Consommable painQuiPue = new Consommable();
```

L'**objet** est du **type de la classe parente et aussi du type de la classe enfant** ; c'est le **polymorphisme**.

## .NET et Unity

En général en .NET, **toutes les classes C# héritent directement ou indirectement** de la classe `Object`. Donc, si on n'écrit aucun héritage, alors la classe hérite directement d'`Object` ; si on écrit un héritage et que la classe parente hérite d'`Object`, alors la classe enfant hérite indirectement de la classe `Object`.

Hériter de la classe `Object` permet aux classes dérivées d'utiliser des méthodes : `ToString()`, `Equals()`...

Source : [MSDN System.Object](https://docs.microsoft.com/fr-fr/dotnet/api/system.object "MSDN System.Object")

Dans Unity, tous les `GameObjects` et composants héritent de `UnityEngine.Object`. Cela peut parfois entrer en conflit de nommage avec la librairie C# `System.Object`. Pour résoudre cela : **expliciter le *namespace***, par exemple : `System.Random`, `UnityEngine.Random`.

## Héritage et constructeur

Une classe peut avoir **plusieurs constructeurs**. Par défaut, c'est le constructeur de la classe de base qui est toujours appelé, ce qui peut être modifié au besoin.

En héritage, on crée le constructeur de la classe enfant à partir d'un constructeur ciblé spécifique avec `base()`. Attention : si erreur de signature, **aucune erreur n'est envoyée** et c'est le constructeur de la classe parente qui est utilisé. 
```
public class Fruit
{
	public string nom;
	
	public Fruit() // Constructeur 1
	{
		nom = "Orange";
		Debug.Log("Fruit constructeur 1");
	}
	
	public Fruit(string nouveauNom) // Constructeur 2
	{
		nom = nouveauNom;
		Debug.Log("Fruit constructeur 2");
	}
}
	
public class Pomme : Fruit
{
	// Le constructeur parent est appelé avant le reste
	
	public Pomme() // Constructeur 1
	{
		nom = "Pomme rouge";
		Debug.Log("Pomme constructeur 1");
	}

	public Pomme(string nouveauNom) : base(nouveauNom) // Constructeur 2 
	{
		// Ce constructeur appelle le constructeur 2 de la classe parente (signature identique)
		// Inutile de définir le nouveau nom car le constructeur parent le fait déjà
		Debug.Log("Pomme constructeur 2");
	}
}

// Instanciations
Fruit monFruit = new Fruit();
Fruit maPomme = new Pomme();
Fruit maPomme = new Pomme("Gala");
```

`base()` permet d'appeler le constructeur parent. Le constructeur peut aussi appeler **un autre constructeur de la même classe** : on utilise `this()`. La signature doit alors correspondre au constructeur ciblé. 
```
public class Souris
{
	private static int compteur = 0;
	private int _vie;
	private string _nom;
	
	public Souris (string nom, int vie) : this(vie)
	{
		_nom = nom;
	}
	
	public Souris(int vie) : this()
	{
		_vie = vie;
	}
	
	public Souris()
	{
		compteur ++;
	}
}
```

On peut ainsi **chaîner des constructeurs**, dans la classe ou par héritage. L'ordre d'exécution s'effectue du plus lointain constructeur jusqu'à celui utilisé.
```
Souris mickey = new Souris("Mickey", 10); // ordre : Souris(), Souris(int vie), Souris(string nom, int vie) 
```

## Interdire l'héritage

En Java, on peut poser des classes ou méthodes **finales**. En C#, c'est idem avec le mot-clé `sealed`. Ce mot-clé propose une certaine sécurité en évitant des manipulations non souhaitées.
```
public sealed class VaisseauEtoile : Vehicule
{
	// VaisseauEtoile est un Véhicule.
	// Il n'a pas de types dérivés.
}
```

`Sealed` empêche également la réécriture des méthodes qui n'ont pas expressement été déclarées `virtual`. Cela peut néanmoins être contourné avec le *member hiding* avec le mot-clé `new`.
```
// Dans la classe dérivée :
public new string champParent;
```
