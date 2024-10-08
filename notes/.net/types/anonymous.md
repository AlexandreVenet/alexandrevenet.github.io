# *Anonymous*

Le 18-08-2024

Il existe un type (général) qui est une absence de type (particulier).

## Principe

Le **type anonyme** est un **type référence** qui encapsule dans un objet des **propriétés** en **lecture seule seulement** (on ne peut donc pas les modifier) sans avoir à définir explicitement un type. [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/anonymous-types _blank)

```C#
var test = new 
{ 
	MonEntier = 108, 
	Message = "Super !" 
};
	
Console.WriteLine(test.MonEntier + test.Message);
```

Ce type dérive directement de `object`. Le compilateur génère automatiquement une classe avec un nom et déduit le type de chaque propriété. Le nom n'est pas disponible dans le code source mais on peut obtenir le type.

```C#
Console.WriteLine(test.GetType().ToString());

Console.WriteLine(new Object().GetType().ToString());
Console.WriteLine(new Object() { }.GetType().ToString());
Console.WriteLine(new { }.GetType().ToString());
```

## Usages 

Les types anonymes sont **imbriquables**. Il suffit de déclarer l'un dans la propriété de l'autre.

Le type anonyme peut être un **élément de tableau**.

```C#
var MonTableau = new[] 
{ 
	new { nom = "Pomme", nombre = 10 }, 
	new { nom = "Poire", nombre = 2 }
};
```

On peut faire des **copies** avec de nouvelles valeurs grâce à la **mutation non destructrice** (`with`);

```C#
var pomme = new { Item = "Pommes", Price = 1.50 };
var PommeAVendre = pomme with { Price = 0.01 };
Console.WriteLine(pomme);
Console.WriteLine(PommeAVendre);
```

Ce type anonyme est utile dans le cas de requêtes `SELECT` avec **LINQ**. Un compromis est alors à trouver avec les tuples. [MSDN Choisir entre tuples et type anonyme](https://learn.microsoft.com/fr-fr/dotnet/standard/base-types/choosing-between-anonymous-and-tuple _blank)

## Restrictions

Le type anonyme n'est disponible que localement (dans la méthode qui le définit). Il ne peut pas servir aux chose suivantes : valeur de retour, paramètre de méthode, déclarer un champ, une propriété ou un événement.

On peut passer un type anonyme en paramètre de méthode en le déclarant du type `object` mais cela rend le principe du type anonyme inutile. Dans ce cas, mieux vaut penser à définir une structure spécifique au besoin.

## Avec une propriété

Si notre **classe** utilise une **propriété**, alors il suffit d'écrire le nom de la propriété en tant que membre de l'objet de type anonyme. En effet, c'est le compilateur qui mettra les entités en relation. L'exemple suivant utilise la syntaxe d'**instruction lambda** pour renvoyer un objet de type anonyme.

```C#
public class Chose
{
	private string Prop { get; set; }
	
	public object Test() => new
	{
		Prop,
		Nombre = 0
	};
}
```
