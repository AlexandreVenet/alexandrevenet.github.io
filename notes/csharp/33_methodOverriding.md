# Réécriture de méthode

Le 25-09-2022

Réécrire des méthodes d'une classe de base dans une classe dérivée.

## Virtual... override

On peut définir qu'une **méthode de classe de base soit modifiable par la classe dérivée**. On parle de*method overriding*. Pour cela, il faut :
- ajouter le mot-clé `virtual` à la méthode de la classe de base,
- redéclarer la méthode dans la classe dérivée et lui ajouter le mot-clé `override` (taper ce mot-clé dans Visual Studio pour afficher les méthodes disponibles) : 
```
public override typeRetour Methode()
{
	//...
}
```

Maintenant, au lieu de tout réécrire ou redéfinir, on peut vouloir **reprendre la méthode parente** et lui **ajouter des instructions spécifiques** dans la classe enfant. On effectue cela avec `base` (équivalent de `super` en Java) qui appelle la méthode parente.
```
public override void MethodeClassEnfant()
{
	base.MyMethod();
	// autres instructions
}
```

Ceci peut être utile pour redéfinir la méthode `ToString()`, héritée de la classe `Object`, qui par défaut ne renvoie que le type de l'objet (en Java, on aurait l'adresse mémoire).

**Contraintes** : 
- l'**accessibilité** doit être **identique ou plus large**,
- le **mot-clé** `override` doit **précéder le type retourné**,
- le **type de retour** doit être **compatible**.

## Dans Unity

Voici un exemple dans Unity. On voit aussi que l'héritage à partir de la classe `MonoBehaviour` reste possible : on peut donc ajouter la classe enfant comme composant à un `GameObject`.
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Animal : MonoBehaviour
{
	protected string animalNom; 
	
	protected virtual void Dire()
	{
		Debug.Log("Je suis" + animalNom);
	}
	
	void Start()
	{
		Dire();
	}
}
```
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Canard : Animal
{
	protected override void Dire()
	{
		base.Dire(); // fonction parente telle quelle
		Debug.Log("Coin coin"); // ajout
	}
}
```

## Lors de l'instanciation

La méthode utilisée en *runtime* est toujours celle du type au *runtime*, c'est-à-dire le type avec lequel on écrit `new`.

Lors d'un ***upcasting*** et d'un appel de méthode de la classe enfant instanciée, c'est la méthode de la **classe enfant** qui est utilisée.
```
Humanoide humain = new Humanoide();
Humanoide ennemi = new Ennemi();
Humanoide orc = new Orc();
	
humain.DireBonjour(); // "Bonjour !"
ennemi.DireBonjour(); // "Il ne peut en rester qu'un."
orc.DireBonjour(); // "Gromf..."
```

## Member hiding

Il est possible de ne pas utiliser `virtual/override`, on effectue alors du ***member hiding***. Il s'agit d'utiliser le mot-clé `new` (dans un sens différent de l'instanciation). La méthode enfant fait alors peut-être quelque chose de complètement différent de la méthode parente.
```
public classe Enfant : Parent
{
	public new float uneValeur = 1.0f; // variable de Parent réécrite
	
	public new void DireBonjour() // méthode de Parent réécrite (elle comptait peut-être des pâtes)
	{
		Console.WriteLine("La méthode parente fait autre chose que prévu. Chut, ne rien dire !");    
	}
}
```

Lors d'un ***upcasting***, c'est le membre de la **classe parente** qui est utilisée, indépendamment de la réécriture et de l'instanciation de la classe enfant.

Le *member hiding* fonctionne pour des méthodes non virtuelles et des méthodes `static`. 

Problème : cela rend le code plus opaque car en lisant la classe de base, **on ne voit pas l'autorisation de réécriture** qui aura lieu dans une de ses classes dérivée. On préfèrera alors les méthodes virtuelles.

Enfin, le *member hiding* fonctionne avec des méthodes et aussi avec des champs, propriétés.