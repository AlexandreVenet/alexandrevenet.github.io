# Partial

Le 09-08-2022

Découper les choses en plusieurs parties.

## Classes et méthodes partielles

Une classe, structure, interface ou une méthode peuvent faire l'objet de **plusieurs fichiers**. Chaque fichier contient une partie de la définition du type ou de la méthode, et toutes les parties sont ensuite combinées automatiquement à la compilation.

Sources :
- [MSDN Méthode partielle](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/partial-method "MSDN Méthode partielle")
- [MS Learn Partial](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods "MS Learn Partial")

Dans Unity, les classes partielles sont utiles par exemple dans le cas suivant :
- une partie contient une architecture utilisée par un script d'éditeur,
- ce qui permet de générer automatiquement le contenu d'une seconde partie.

## Classe partielle

On utilise alors le terme `partial` pour indiquer au compilateur de rassembler les différents fichiers en une seule entité.
- Une telle classe doit faire partie du même *namespace*. 
- Les noms de fichiers doivent rester compréhensibles mais le nom de la classe doit être le même, et précédé du mot-clé `partial`.
- Héritage, attributs, membres... tout fonctionne sans avoir à déclarer quoi que ce soit.

Fichier *ClassePartielle1.cs* :
```
partial class ClassePartielle
{
	public bool isOk = true;
}
```

Fichier *ClassePartielle2.cs* :
```
partial class ClassePartielle
{
	private void Start()
	{
		Debug.Log(isOk);
	}
}
```

## Méthodes partielles

Dans le cas de classe partielle, il est possible d'écrire la seule **signature de méthode** dans un fichier et d'**éventuellement** implémenter la méthode correspondate dans un autre fichier. Ainsi :
- si une telle signature ici n'a pas sa contrepartie en méthode dans l'autre fichier, alors le compilateur, tout simplement, n'intègre rien (pas de code inutile en sortie),
- si une telle signature ici a sa contrepartie en méthode dans l'autre fichier, alors le compilateur intègre la méthode.

Limitation : applicable seulement sur une méthode retournant `void` et de type `private`.

Fichier *ClassePartielle1.cs* :
```
partial class ClassePartielle
{
	public bool isOk = true;

	partial void Methode(bool b);
}
```

Fichier *ClassePartielle2.cs* :
```
partial class ClassePartielle
{
	private void Start()
	{
		Debug.Log(isOk);
	}

	partial void Methode(bool b)
	{
		Debug.Log(b);
	}
}