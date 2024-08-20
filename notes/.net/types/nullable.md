# Type nullable

Le 18-08-2024

Les types valeur peuvent être rendus nullables pour prendre en charge la valeur `null`.

## Nullable valeur

Source : [MSDN Type valeur nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types _blank)

On a dit au chapitre des types qu'un **type valeur** ne contient que la valeur de son type. Eh bien... on peut rendre un type **nullable** pour qu'il prenne en charge la valeur `null`. 

Pour cela, ajouter `?` en suffixe de type. La valeur par défaut du type valeur nullable est alors `null`.

```C#
int? x = 12;
x = null;
```

```C#
bool? isNullable = null;
```

```C#
char?[] chaine = new char[2];
```

Le type n'est pas transformé. En fait, il est encapsulé dans le type `Nullable<T>` (qui est une `struct`). 

```C#
Nullable<int> entierNullable = null;
```

Lorsque la valeur est `null` pour un type nullable, il s'agit en réalité d'une instance dont la propriété `Nullable<T>.HasValue` renvoie `false`. Avec une autre valeur, la méthode renvoie `true`.

Un certain nombre de méthodes et propriétés sont disponibles sur le type nullable.
- `Nullable<T>.HasValue` : l'instance nullable a-t-elle `null` pour valeur ?
- `Nullable<T>.Value` : obtenir la valeur si `.HasValue` renvoie `true`, sinon levée d'exception `InvalidOperationException`,
- `Nullable<T>.GetValueOrDefault()` : renvoie la valeur si non `null`, sinon renvoie `null`.

## Tests et conversions

C# fournit l'**opérateur de fusion** ou **opérateur de coalescence nulle** (*null-coalescing operator*) : `??`. Si la valeur de l'opérande de gauche est non `null`, alors elle est renvoyée ; sinon c'est la valeur de l'opérande de droite qui est renvoyée.

```C#
int? a = 1;
int b = a ?? 0; // b = 1
```

```C#
int? a = null;
int b = a ?? 0; // b = 0
```

Ceci est cumulable avec l'opérateur `?`. Dans cet exemple : 
- si `maSource` est `null`, alors `i` vaut 10,
- si `maSource` est non `null` :
	- si `maSource.maValeur` est `null` prendre la valeur 10,
	- sinon prendre la valeur de `maSource.maValeur`.

```C#
int i = maSource?.maValeur ?? 10;
```

Maintenant, on peut aussi assigner la valeur d'un nullable à un type non nullable avec `.GetValueOrDefault()`. 

```C#
float? x = 12.34f;
float y = x.GetValueOrDefault();
```

On peut encore passer par une conversion explicite. Une exception est alors levée si la valeur est `null`.

```C#
int? i = null;
int j = (int) i; // erreur
```

Inversement, la valeur d'un type `T` est convertible implicitement en valeur de type `T?`.

## *Lifted operators*

Avec les types nullables, les opérateurs n'ont pas tout à fait le même comportement. On parle de ***lifted operators***.

- Les opérateurs (`+`, `-`...) produisent une valeur `null` s'ils traitent **au moins une valeur** `null`. 
- Pour les opérateurs de comparaison, hors fonctionnement habituel :
	- `<`, `>`, `<=`, `>=` renvoient `false` si une valeur `null`,
	- `==` renvoie `true` si les deux opérandes sont `null`, et `false` si l'une est `null`,
	- `!=` renvoie `false` si les deux opérandes sont `null`, et `true` si l'une est `null`.

## Tester le type

On peut identifier un type nullable avec `Nullable.GetUnderlyingType()` et `typeof()`.

```C#
bool IsNullable(Type type) => Nullable.GetUnderlyingType(type) != null;
Console.WriteLine( IsNullable(typeof(int)) );
Console.WriteLine( IsNullable(typeof(int?)) );
```

## Comparaisons

`null` en général n'est pas vraiment une valeur. On ne peut que tester l'égalité (`==`) ou l'inégalité (`!=`). Mais dans le cas des types nullables, la classe `Nullable` offre la possibilité d'effectuer des comparaison grâce à `.Compare()`.

```C#
int? i = null;
int j = 1;
	
if (Nullable.Compare<int>(i, j) < 0)
    Console.WriteLine("i < j");
else if (Nullable.Compare<int>(i, j) > 0)
    Console.WriteLine("i > j");
else
    Console.WriteLine("i == j");
```

## Nullable référence

Source : [MSDN Type référence nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types _blank)

Le type **référence nullable** est paramétré contextuellement dans le projet. Par défaut, le contexte est nullable. 
- Double cliquer sur le projet dans l'**Explorateur de solution** et repérer la ligne `<Nullable>enable</Nullable>`. Remplacer par `<Nullable>disable</Nullable>`.
- Si nécessaire, dans un fichier C#, ajouter la directive `#nullable enable` pour réactiver le contexte ponctuellement.

Les types `T` et `T?` sont tous deux représentés par le même type .NET. Mais le passage de valeur de l'un à l'autre doit être explicité néanmoins, avec le ***null-forgiving operator***.

```C#
string s = "Bonjour";
string? sNullable = default;
s = sNullable!;
```
