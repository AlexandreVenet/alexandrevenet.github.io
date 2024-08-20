# Indexeur

Le 19-08-2024

Créer un type qui se comporte comme une collection. [TutorialsTeacher](https://www.tutorialsteacher.com/csharp/csharp-indexer _blank)

## Présentation

Lorsqu'on crée une **classe dont le but est d'encapsuler une collection**, on doit accéder à quelque chose pour intervenir dessus (méthode, propriété ou la collection même). C# fournit la surcharge de l'opérateur `[]`, ce qui signifie créer un **indexeur** : l'accès s'effectue alors avec la syntaxe des crochets `[]`. [MSDN Indexeur](https://docs.microsoft.com/fr-fr/dotnet/csharp/programming-guide/indexers/using-indexers _blank)

L'indexeur peut être implémenté dans une classe, une structure, une interface.

Noter qu'on ne réalise pas nécessairement d'objet **itérable**. Pour cela, il faudra implémenter l'interface `IEnumerable`. [MSDN IEnumerable](https://docs.microsoft.com/fr-fr/dotnet/api/system.collections.ienumerable _blank)

Lors de l'ajout d'éléments à la collection, le comportement **ressemble** à celui de l'*array* même si la collection est par exemple une `List`. 

## Exemple

D'abord, posons un type personnel :

```C#
class Test 
{
	public string m_nom;
	
	public Test(string nom) 
	{
		m_nom = nom;
	}
}
```

Maintenant, créons la classe qui sert de collection.

```C#
class TestIndexeur
{
	// Collection encapsulée
	private List<Test> _liste = new List<Test>();
	
	// Indexeur (c'est une propriété)
	public Test this[int index] 
	{
		set
		{
			_liste.Insert(index, value);
		}
		get
		{
			return _liste[index];
		}
	}
}
```

Maintenant, dans **Program.cs** par exemple, utilisons nos types :

```C#
TestIndexeur maListeParIndexeur = new();
maListeParIndexeur[0] = new("Toto");
maListeParIndexeur[1] = new("Titi");
maListeParIndexeur[3] = new("Titi"); // erreur, il manque l'index 2
```

Pour contrôler les entrées, d'abord on codera des levées d'exceptions dans la classe de l'indexeur, puis on imbriquera les instructions dans des `try...catch`.

```C#
class TestIndexeur
{
	private List<Test> _liste = new List<Test>();
	
	public Test this[int index]
	{
		set
		{
			if(!(value is Test))
			{
				throw new ArgumentException();
			}
	
			if(index > _liste.Count)
			{
				throw new IndexOutOfRangeException();
			}
	
			_liste.Insert(index, value);
		}
	
		get
		{
			if(index > _liste.Count)
			{
				throw new IndexOutOfRangeException();
			}
	
			return _liste[index];
		}
	}
}
```

```C#
// Program.cs
try
{
	TestIndexeur maListeParIndexeur = new();
	
	maListeParIndexeur[0] = new("Toto");
	maListeParIndexeur[1] = new("Titi");
	maListeParIndexeur[2] = new("Tutu");
	
	Console.WriteLine(maListeParIndexeur[0].m_nom);
	Console.WriteLine(maListeParIndexeur[1].m_nom);
	Console.WriteLine(maListeParIndexeur[2].m_nom);
}
catch (ArgumentException)
{
	Console.WriteLine("Type incompatible");
}
catch (IndexOutOfRangeException)
{
	Console.WriteLine("Index hors limites");
}
```
