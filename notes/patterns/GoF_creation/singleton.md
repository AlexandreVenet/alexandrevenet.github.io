# *Singleton*

Le 09-10-2024

Une entité unique dans tout le programme.

## Présentation

*Singleton* **restreint l'instanciation d'une classe à un seul objet** dans le but de centraliser des opérations, contrôler l'accès à une ressource, et rester disponible dans tout le programme. 

C'est une classe contenant une méthode qui a pour responsabilité de **créer une instance seulement s'il n'en existe pas déjà une** et de renvoyer cette instance. La méthode de création est `public` et `static`.

La classe présente un **attribut du même type de la classe**, ce qui peut étonner de prime abord. Cet attribut `static` permet le stockage de l'objet et la méthode retourne l'instance référencée par cet attribut.

Le constructeur est `private` ou `protected` pour forcer à utiliser la méthode spécifique et éviter d'autres instanciations. 

Dans un langage basé sur les prototypes (Javascript par exemple), *Singleton* désigne simplement un objet sans copie et qui ne sert pas non plus de modèle à d'autres objets.

![Diagramme UML de classe](../../../media/patterns/GofCreation/singleton.svg)

!- Diagramme UML de classe du patron *Singleton*.

## Implémentation C# 

```C#
internal sealed class DireBonjourSingleton
{
	private static DireBonjourSingleton _instance;
	static readonly object _instanceLock = new object();

	private DireBonjourSingleton() { }

	// Propriété. Getter seul.
	public static DireBonjourSingleton Instance
	{
		get
		{
			if (_instance == null)
			{
				lock (_instanceLock)
				{
					if (_instance == null)
					{
						_instance = new DireBonjourSingleton();
					}
				}
			}
			return _instance;
		}
	}

	public string Bonjour()
	{
		return "Bonjour !";
	}
}
```

```C#
var instance1 = DireBonjourSingleton.Instance;
var instance2 = DireBonjourSingleton.Instance;

Console.WriteLine(instance1.Bonjour()); 
// Bonjour !

Console.WriteLine(instance1.Equals(instance2)); 
// true
```

Depuis .NET4, il est possible d'effectuer l'instanciation paresseuse et de simplifier le code. Ici avec une fonction lambda plutôt qu'une référence de méthode :

```C#
internal sealed class DireBonjourSingleton
{
	private static readonly Lazy<DireBonjourSingleton> _lazy = new(() => new DireBonjourSingleton());

	public static DireBonjourSingleton Instance 
	{
		get => _lazy.Value; 
	}

	public string Bonjour()
	{
		return "Bonjour !";
	}
}
```

## Sources

- [Wikipédia avec exemples d'autres langages](https://fr.wikipedia.org/wiki/Singleton_(patron_de_conception) _blank)
- [C# *in Depth* : plusieurs versions](https://csharpindepth.com/Articles/Singleton _blank)
