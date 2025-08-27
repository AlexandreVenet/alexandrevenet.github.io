# Type Lazy

Le 19-08-2024

Initialisation paresseuse. 

## Principe

Pour un objet, on peut faire une instanciation (ou initialisation) **paresseuse** : **le programme va générer l'instance seulement au moment où il en a besoin** ; l'instanciation est donc **différée**. On passe par le type `Lazy<>`. 

Sources
- [Microsoft *Learn*](https://learn.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization _blank)
- [Microsoft *Learn* API](https://learn.microsoft.com/fr-fr/dotnet/api/system.lazy-1 _blank)

Exemple en appelant le constructeur du type :

```C#
Lazy<MonType> _chose = new Lazy<MonType>(() => new MonType(100));
```

Pour appeler une propriété de l'objet, on passe par la propriété `Value`. **C'est à ce moment que l'instanciation a lieu.**

```C#
_chose.Value.Propriete
```

Cette propriété `Value` est en lecture seule. Si `Value` possède un type valeur, alors cette valeur est en lecture seule. Si c'est un type référence, alors les propriétés de ce type restent modifiables. Dans tous les cas, on peut toujours refaire une instance avec d'autres arguments.

```C#
_chose = new Lazy<MonType>(() => new MonType(99999));
```

Maintenant, avec des membres `static`, comment fait-on ? On passe par une fonction intermédiaire, statique (plutôt qu'appeler le constructeur directement). On peut donc faire un *singleton* paresseux.

```C#
public class Toto
{
	// Champ statique
	private static Lazy<Toto> _instance = new Lazy<Toto>(MaFonction);
	
	// Constructeur
	private Toto(int i, int j)
	{
		//...
	}
	
	// Fonction d'instanciation
	private static Toto MaFonction()
	{
		return new Toto(1, 2);
	}
}
```

## Avec des collections

`Lazy` permet d'optimiser l'usage des **collections**. 

L'exemple suivant montre l'alimentation de collections avant d'effectuer une opération. Les collections sont entièrement alimentées avant de pouvoir disposer de leur contenu. Or, l'opération à effectuer ne porte que sur quelques objets de ces collections. Conséquence non paresseuse : un important besoin en mémoire car il faut disposer de tous les objets avant d'effectuer l'opération seulement sur certains d'entre eux. On simule un temps de traitement de 1 seconde par génération d'objet.

```C#
// Types
public record Pays(string Nom);

public record Ville
{
	public string Nom { get; private set; }
	public Pays Pays { get; private set; }
	public string DescriptionLourde { get; private set; }
	public int LongueurDescription { get; private set; }

	public Ville(string nom, Pays pays)
	{
		Console.WriteLine($"Création de ville : {nom}");
		Thread.Sleep(1000); // simulation d’un traitement long

		Nom = nom;
		Pays = pays;
		DescriptionLourde = $"{nom} se trouve en ${pays.Nom}.";
		LongueurDescription = DescriptionLourde.Length;
	}
}
```
```C#
// Propriétés utiles dans une classe
private List<Pays> _pays;
private Dictionary<string, Pays> _paysDico;

private List<Ville> _villes;
```
```C#
// Créer les données pour les pays
_pays = new()
{
	new Pays("France"),
	new Pays("Espagne"),
	new Pays("Italie"),
	new Pays("Angleterre"),
};

// Alimenter le dictionnaire qui permet de trouver un pays par son nom
// Syntaxe 1
_paysDico = new();
foreach (Pays pays in _pays)
{
	_paysDico.Add(pays.Nom, pays);
}
// Syntaxe 2
_paysDico = _pays.ToDictionary(pays => pays.Nom);

// Créer les données pour les villes
_villes = new()
{
	new Ville("Paris", _paysDico["France"]),
	new Ville("Madrid", _paysDico["Espagne"]),
	new Ville("Rome", _paysDico["Italie"]),
	new Ville("Londres", _paysDico["Angleterre"]),
};
```
```C#
// Opération à effectuer
Console.WriteLine("\nLongueur de la description de certaines villes :");
Ville villeA = _villes[1];
Ville villeB = _villes[3];
Console.WriteLine($"- {villeA.Nom} : {villeA.LongueurDescription}");
Console.WriteLine($"- {villeB.Nom} : {villeB.LongueurDescription}");
```

Chaque instanciation du type `Ville` prend un certain temps et ce temps est multiplié par le nombre total d'objets que contient cette collection. Ici, il faut donc 4 secondes pour produire la collection complète avant de n'opérer que sur 2 villes.

```Sortie
Création de ville : Paris
Création de ville : Madrid
Création de ville : Rome
Création de ville : Londres

Longueur de la description de certaines villes :
- Madrid : 29
- Londres : 33
```

Maintenant, on veut introduire de la paresse dans le programme. La question qu'il faut se poser est : quand vais-je avoir besoin d'une donnée ? Le plus tard possible ? Alors, j'enrobe le type de l'entité avec `Lazy<T>`.

Voici les modifications avec une paresse située au niveau des collections. En effet, chaque objet met du temps à être généré, on peut donc différer l'instanciation de tous ces objets dans la collection pour n'obtenir que ceux nécessaires à l'opération finale. La `List<Ville>` devient alors une `List<Lazy<Ville>>`. 

```C#
// Propriétés utiles dans une classe
private List<Pays> _pays;
private Dictionary<string, Pays> _paysDico;

private List<Lazy<Ville>> _villes; // 👈
```
```C#
//...
// Créer les données pour les villes
_villes = new()
{
	new Lazy<Ville>(()=>new Ville("Paris", _paysDico["France"])), // 👈
	new Lazy<Ville>(()=>new Ville("Madrid", _paysDico["Espagne"])), // 👈
	new Lazy<Ville>(()=>new Ville("Rome", _paysDico["Italie"])), // 👈
	new Lazy<Ville>(()=>new Ville("Londres", _paysDico["Angleterre"])), // 👈
};
// On utilise une lambda et non pas l'instruction d'instanction (new Ville...).
// Pourquoi ?
// Car l'instanciation ne serait pas différée (l'objet Ville serait créé avant d'être passé au type Lazy).
```
```C#
// Opération à effectuer
Console.WriteLine("\nLongueur de la description de certaines villes :");
Ville villeA = _villes[1].Value; // 👈
Ville villeB = _villes[3].Value; // 👈
Console.WriteLine($"- {villeA.Nom} : {villeA.LongueurDescription}");
Console.WriteLine($"- {villeB.Nom} : {villeB.LongueurDescription}");
// Lazy<T> encapsule le type utile.
```

En sortie, on constate que l'instanciation est bien différée : elle a lieu au moment de l'opération et ne porte que sur les deux objets nécessaires. On a donc un traitement de 2 secondes au lieu de 4.

```Sortie
Longueur de la description de certaines villes :
Création de ville : Madrid
Création de ville : Londres
- Madrid : 29
- Londres : 33
```

Super ! Mais voilà, puisque les instanciations sont différées, alors les collections sont modifiables jusqu'à leur utilisation. .NET 8 propose un type permettant de **verrouiller le dictionnaire**, le rendre immuable : `FrozenDictionary`. L'accès à ses données est alors optimisé. Pour les listes, il faudra passer par un autre type `FrozenSet`. Voyons le cas du dictionnaire. [MS *Learn Frozen*](https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.frozen "Frozen" _blank)

```C#
// Propriétés utiles dans une classe
private List<Pays> _pays;
private FrozenDictionary<string, Pays> _paysDico; // 👈

private List<Lazy<Ville>> _villes;
```
```C#
//...
// Alimenter le dictionnaire qui permet de trouver un pays par son nom
// Syntaxe 2
_paysDico = _pays.ToFrozenDictionary(pays => pays.Nom); // 👈
//...
```
