# Predicate

Le 01-10-2022

Une fonction servant de critère de sélection.

## Présentation

`Predicate` représente une **méthode définissant des critères et déterminant si un objet spécifié satisfait ces critères.** [MS Learn Predicate](https://learn.microsoft.com/fr-fr/dotnet/api/system.predicate-1 "MS Learn Predicate")

Le *namespace* est `System`.

Pour définir un tel critère de sélection, il est habituel d'utiliser une expression lambda plutot qu'un `delegate`.

On trouve très souvent les prédicats dans LINQ, par exemple dans `.FirstOrDefault()`.

## Exemple

.NET fournit la classe `Point` qui permet de représenter un point dans l'espace en deux dimensions (coordonnées x et y dont le type est `int32`). L'exemple suivant utilise ce type de données. D'autre part, on utilise le type `Array` qui fournit la fonction `.Find()` prenant un prédicat en paramètre permettant de trouver une entrée correspondant à un critère particulier.
```
static void Main(string[] args)
{
	Point[] points =
	{
		new (1,2),
		new (10,20),
		new (100,200)
	};
	
	Point monPoint = Array.Find(points, point => point.X == 10 && point.Y == 20);
	
	Console.WriteLine(monPoint.ToString()); // {X=10,Y=20}
}
```

