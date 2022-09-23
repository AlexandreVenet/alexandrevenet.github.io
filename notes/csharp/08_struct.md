# Struct

Le 22-09-2022

Une structure légère de type valeur.

## Présentation

Référence : [MSDN Struct](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/struct "MSDN Struct")

Une ***struct*** est une unité logique comme la classe mais beaucoup plus légère que celle-ci :
- allouée sur la *stack* (et non sur la *heap* comme la classe), elle est de **type valeur** (l'opérateur d'assignation produit une copie),
- pas d'allocation mémoire en *heap*, donc pas de passage du *garbage collector*.
- non prise en charge de l'héritage (hormis d'`Object`),
- peut implémenter des interfaces, des propriétés, des méthodes, statiques ou non.

Noter que les types simples comme `bool` sont en fait des *structs* (taper `F12` sur un type et constater).

**Accessibilité directe** :
- `public` : par tout le monde,
- `internal` : seulement dans l'*assembly* qui la contient.

**Accessilité lorsqu'imbriquée dans une classe** :
- `private` : seulement pas la classe hôte,
- `protected` : seulement par les classes héritant de la classe hôte,
- `protected internal` : seulement par les classes héritant de la classe hôte et pour le même *assembly*.

On définit une `struct` de la même manière qu'une classe avec le mot-clé idoine. Elle peut avoir un **constructeur... seulement s'il présente des paramètres**. Pour instancier :
- avec `new` : on appelle alors le constructeur,
- sans `new` : les champs ont leur valeur par défaut.
```
public struct Toto
{
	public string nom;
	
	public Toto(string nom)
	{
		this.nom = nom;
	}
}
```
```
internal class Program
{
	public static Toto toto;
	
	static void Main(string[] args)
	{
		toto = new("Toto");
		Toto titi;
		Toto tutu = new();
	
		Console.WriteLine(toto.Name);
		Console.WriteLine(titi.Name); // titi non assignée
		Console.WriteLine(tutu.Name); // rien
	
		Console.WriteLine("Fin programme");
		Console.Read();
	}
}
```