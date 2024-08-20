# Réécriture de méthode

Le 17-08-2024

Dans une classe dérivée, réécrire les méthodes de la classe de base.

## Virtual... override

On peut définir qu'une **méthode de classe de base soit modifiable par la classe dérivée**. On parle de *method overriding*. Pour cela, il faut :
- ajouter le mot-clé `virtual` à la méthode de la classe de base,
- redéclarer la méthode dans la classe dérivée et lui ajouter le mot-clé `override` (taper ce mot-clé dans Visual Studio pour afficher les méthodes disponibles) : 

```C#
public override TypeRetour Methode()
{
	//...
}
```

Maintenant, au lieu de tout réécrire ou redéfinir, on peut vouloir **reprendre la méthode parente** et lui **ajouter des instructions spécifiques**. On effectue cela avec `base` (équivalent de `super` en Java) qui appelle la méthode parente.

```C#
public override void MaMethode()
{
	base.MaMethode();
	// ... autres instructions
}
```

Ceci peut être utile pour redéfinir la méthode `ToString()`, héritée de la classe `Object`, qui par défaut ne renvoie que le type de l'objet (en Java, on aurait l'adresse mémoire).

**Contraintes** : 
- l'**accessibilité** doit être **identique ou plus large**,
- le **mot-clé** `override` doit **précéder le type retourné**,
- le **type de retour** doit être **compatible**.

## Avec l'upcasting

La méthode utilisée au *runtime* est toujours celle du type au *runtime*, c'est-à-dire le type avec lequel on écrit `new`.

Lors d'un ***upcasting*** et d'un appel de méthode de la classe enfant instanciée, **c'est la méthode de la classe enfant qui est utilisée**.

```C#
Humanoide humain = new Humanoide();
Humanoide ennemi = new Ennemi();
Humanoide orc = new Orc();
	
humain.DireBonjour(); // "Bonjour !"
ennemi.DireBonjour(); // "Il ne peut en rester qu'un."
orc.DireBonjour(); // "Gromf..."
```

## Member hiding

Il est possible de ne pas utiliser `virtual/override`, on effectue alors du ***member hiding***. Il s'agit d'utiliser le mot-clé `new` (dans un sens différent de l'instanciation) pour réécrire, d'une certaine manière sans le dire, le membre parent par le membre enfant (méthode, champ, propriété). 

```C#
public classe Enfant : Parent
{
	// Variable de Parent réécrite
	public new float uneValeur = 1.0f; 
	
	// Méthode de Parent réécrite (la formule était peut-être en anglais)
	public new void DireBonjour() 
	{
		Console.WriteLine("La méthode parente fait maintenant autre chose que prévu. Chut, ne rien dire !");    
	}
}
```

Lors d'un ***upcasting***, c'est le membre de la **classe parente** qui est utilisée, indépendamment de la réécriture et de l'instanciation de la classe enfant.

Le *member hiding* fonctionne pour des méthodes non virtuelles et des méthodes `static`. 

Problème : cela rend le code plus opaque car en lisant la classe de base, **on ne voit pas l'autorisation de réécriture** qui aura lieu dans une de ses classes dérivée. On préfèrera alors les méthodes virtuelles.
