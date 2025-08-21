# Record

Le 21-08-2025

Un type dédié aux données immuables. [MS *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/record "Record" _blank)

## Principe

C# 9 introduit le type `record`. Ce type est utilisé pour deux raisons :
- disposer de **données immuables**,
- disposer d'objets où l'**égalité en valeur** (comparaison du contenu) est plus importante que l'**égalité en référence** (identité d'objets).

Très utile pour comparer uniquement les données : *DTO*, résultats d'API, objets métier, configurations, messages d'événements...

En C#, on dispose de deux catégories de types : `class` et `struct`. Il y a donc un `record class` et un `record struct`. Par défaut, un `record` est un `record class`.

## Égalité en valeur

Avec une classe concrète ordinaire, deux instances avec les mêmes valeurs de propriétés sont considérées différentes. En effet, ces instances pointent vers deux emplacements mémoire différents, ont chacune leur référence.

```C#
public class Personne
{
	public string Nom { get; set; }
}

// Usage

Personne toto1 = new() { Nom = "Toto" };
Personne toto2 = new() { Nom = "Toto" };

Console.WriteLine(object.ReferenceEquals(toto1, toto2));
// False

Console.WriteLine(toto1 == toto2);
// False
```

Tester l'égalité de valeur à partir de classes implique donc de créer une méthode dédiée qui teste toutes les propriétés, ou bien d'`override` la méthode `Equals()` héritée de `System.Object`. Ce peut être fastidieux. `record` résout cette complexité : **deux instances avec les mêmes valeurs de propriétés sont considérées égales**. 

## Immutabilité

Les propriétés d'un type `record` sont définies avec `init` plutôt que `set`. 

## Syntaxe constructeur

Pour déclarer un `record`, très simplement, il suffit de rédiger la signature du **constructeur**. Le type est construit automatiquement à la compilation.

```C#
public record PersonneRecord (string nom);

// Usage

PersonneRecord toto1 = new("Toto");
PersonneRecord toto2 = new("Toto");

Console.WriteLine(object.ReferenceEquals(toto1, toto2));
// False

Console.WriteLine(toto1 == toto2);
// True
```

Puisque `record` est de type `class` par défaut, alors comment poser un `recort struct` ? En l'explicitant :

```C#
public record struct Point (int X, int Y, int Z);
```

## Syntaxe propriétés

Un type `record` peut se déclarer avec un corps avec ou sans constructeur. Exemple de Microsoft avec un `record struct` sans constructeur :

```C#
public record struct Point
{
	public double X { get; set; }
	public double Y { get; set; }
	public double Z { get; set; }
}

// Usage
Point p = new Point();
Console.WriteLine($"{p.X} {p.Y} {p.Z}");
// 0 0 0 (valeurs par défaut du type int)
```

Or, cette déclaration n'est pas correcte car les propriétés peuvent être modifiées par la suite. Donc, on dispose ici en réalité d'un `struct` ordinaire. Démonstration :

```C#
Point p = new() { X = 1, Y = 2, Z = 3 };
Console.WriteLine($"{p.X} {p.Y} {p.Z}");
// 1 2 3

p.X = -1;
Console.WriteLine($"{p.X} {p.Y} {p.Z}");
// -1 2 3
```

Pour imposer l'immutabilité, il faut donc remplacer `set` par `init`.

```C#
public record struct Point
{
	public double X { get; init; }
	public double Y { get; init; }
	public double Z { get; init; }
}

// Usage

Point p = new() { X = 1, Y = 2, Z = 3 };
Console.WriteLine($"{p.X} {p.Y} {p.Z}");
// 1 2 3

p.X = -1; // Compilation impossible
```

## Syntaxe mix

Les syntaxes par constructeur et propriétés peuvent se mélanger. Par ailleurs, on reste libre de déclarer des membres qui ne sont pas nécessairement utilisés par le constructeur.

```C#
// Avec une propriété
public record Personne(string Prenom, string Nom, string Id)
{
    internal string Id { get; init; } = Id;
}
```
```C#
// Avec un champ
public record Personne(string Prenom, string Nom, int Id)
{
	internal readonly int _id = Id; 
}

// Usage
PersonneRecordId test = new("Toto", "Zéro", 3);
Console.WriteLine(test.Id); // 3
Console.WriteLine(test._id); // 3
```
```C#
// Avec un membre par ailleurs
public record PersonneRecordTab(string nom)
{
	public string[] Telephones { get; init; } = [];
};

// Usage
PersonneRecordTab test2 = new("Zaza");
Console.WriteLine(test2.Telephones.Length); // 0
```

## Copie

La modification d'un `record` est impossible mais la **copie** est possible. Pour ce faire, on utilise la **mutation non destructrice**. Source : [MS *Learn*](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/with-expression "Expression with" _blank)

```C#
public record PersonneRecord (string nom);

// Usage

PersonneRecord toto = new("Toto");
PersonneRecord zaza = toto with { nom = "Zaza" };
```

## *class* ou *struct* ?

Par défaut, `record` est de type `class`. Comment le vérifier ? Avec `typeof`.

```C#
public class Personne
{
	public string Nom { get; set; }
}

public record PersonneRecord (string nom);

// Usage

PersonneRecord toto1 = new("Toto");
PersonneRecord toto2 = new("Toto");

Type t1 = typeof(Personne);
Type t2 = typeof(PersonneRecord);

Console.WriteLine($"""
	{t1.Name}
		Struct ? {t1.IsValueType
		Classe ? {t1.IsClass}
	""");
Console.WriteLine($"""
	{t2.Name}
		Struct ? {t2.IsValueType
		Classe ? {t2.IsClass}
	""");
/*
	Personne
		Struct ? False
		Classe ? True
	PersonneRecord
		Struct ? False
		Classe ? True
*/
``` 

