# Type nullable

Le 23-09-2022

Les types valeurs peuvent être rendus nullables pour prendre en charge la valeur `null`.

## Nullable valeur

Source : [MSDN Type valeur nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types "MSDN Type valeur nullable")

On a dit au chapitre des types qu'un **type valeur** ne contient que la valeur de son type. Eh bien... on peut rendre un type **nullable** pour qu'il prenne en charge la valeur `null`. 

Pour cela, ajouter `?` en suffixe de type. La valeur par défaut du type valeur nullable est alors `null`.
```
int? x = 12;
x = null;
	
bool? isNullable = null;
	
char?[] chaine = new char[2];
```

Le type n'est pas transformé. En fait, il est encapsulé dans le type `Nullable<T>` (qui est une `struct`). 
```
Nullable<int> entierNullable = null;
```

Lorsque la valeur est `null`, il s'agit en réalité d'une instance dont la propriété `Nullable<T>.HasValue` renvoie `false`. Avec une autre valeur, la méthode renvoie `true`.

Un certain nombre de méthodes et propriétés sont disponibles sur le type nullable.
- `Nullable<T>.HasValue` : l'instance nullable a-t-elle `null` pour valeur ?
- `Nullable<T>.Value` : obtenir la valeur si `.HasValue` renvoie `true`, sinon levée d'exception `InvalidOperationException`,
- `Nullable<T>.GetValueOrDefault()` : renvoie la valeur si non `null`, sinon renvoie `null`.

## Conversions

Assigner une valeur d'un nullable à un type non nullable peut s'effectuer en utilisant `.GetValueOrDefault()`. 

On peut aussi utiliser l'**opérateur de coalescence nulle** (*null-coalescing operator*) : `??`. Le principe est : si x est null, alors prendre la valeur indiquée.
```
int? a = 1;
int b = a ?? 0; // b = 1
```
```
int? a = null;
int b = a ?? 0; // b = 0
```

On peut encore passer par une conversion explicite. Une exception est levée si la valeur est `null`.
```
int? i = null;
int j = (int) i; // erreur
```

Inversement, la valeur d'un type `T` est convertible implicitement en valeur de type `T?`.

## Lifted operators

Avec les types nullables, les opérateurs n'ont pas tout à fait le même comportement. On parle de ***lifted operators***.

- Les opérateurs (`+`, `-`...) produisent une valeur `null` s'ils traitent **au moins une valeur** `null`. 
- Pour les opérateurs de comparaison, hors fonctionnement habituel :
   - `<`, `>`, `<=`, `>=` renvoient `false` si une une valeur `null`,
   - `==` renvoie `true` si les deux opérandes sont `null`, et `false` si l'une est `null`,
   - `!=` renvoie `false` si les deux opérandes sont `null`, et `true` si l'une est `null`.

## Tester le type

On peut identifier un type nullable avec `Nullable.GetUnderlyingType()` et `typeof()`.
```
bool IsNullable(Type type) => Nullable.GetUnderlyingType(type) != null;
Console.WriteLine( IsNullable(typeof(int)) );
Console.WriteLine( IsNullable(typeof(int?)) );
```

## Comparaisons

`null` en général n'est pas vraiment une valeur. On ne peut que tester l'égalité (`==`) ou l'inégalité (`!=`). Mais dans le cas des types nullables, la classe `Nullable` offre la possibilité d'effectuer des comparaison grâce à `.Compare()`.
```
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

Source : [MSDN Type référence nullable](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types "MSDN Type référence nullable")

Le type **référence nullable** est paramétré contextuellement dans le projet. Par défaut, le contexte est nullable. 
- Double cliquer sur le projet dans l'Explorateur de solution et repérer la ligne `<Nullable>enable</Nullable>`. Remplacer par `<Nullable>disable</Nullable>`.
- Si nécessaire, dans un fichier C#, ajouter la directive `#nullable enable` pour réactiver le contexte ponctuellement.

Les types `T` et `T?` sont tous deux représentés par le même type .NET. Mais le passage de valeur de l'un à l'autre doit être explicité néanmoins, avec le ***null-forgiving operator***.
```
string s = "Bonjour";
string? sNullable = default;
s = sNullable!;
```
