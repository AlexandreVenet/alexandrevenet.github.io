# Type Lazy

Le 19-08-2024

Initialisation paresseuse. 

## Principe

Pour un objet, on peut faire une instanciation (ou initialisation) **paresseuse**. L'instanciation est paresseuse en ce sens que **le programme va générer l'instance seulement au moment où le programme tente de lire cet objet** ; l'instanciation est donc **différée**. On passe par le type `Lazy<>`. 

Sources
- [Microsoft *Learn*](https://learn.microsoft.com/en-us/dotnet/framework/performance/lazy-initialization _blank)
- [Microsoft *Learn* API](https://learn.microsoft.com/fr-fr/dotnet/api/system.lazy-1 _blank)

Exemple en appelant le constructeur du type :

```C#
Lazy<MonType> _chose = new Lazy<MonType>(() => new MonType(100));
```

Pour appeler une propriété l'objet, on passe par la propriété `Value` :

```C#
_chose_.Value.Propriete
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
