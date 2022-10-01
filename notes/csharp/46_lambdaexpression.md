# Expression Lambda

Le 01-10-2022

Des fonctions dans le flux d'instructions plutôt qu'en déclarant des méthodes de classe. [MSDN Expressions lambda](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/lambda-expressions "MSDN Expressions lambda")

## Présentation

Au catalogue des types `delegate`, les **expressions lambda** permettent d'écrire des fonctions sans avoir à les déclarer comme méthodes, c'est-à-dire qu'elles permettent d'écrire des **fonctions anonymes**. Cela s'avère utile pour des instructions très spécifiques, locales, sans avoir à déclarer de fonction restant en mémoire.

Sa signature dépend de l'**opérateur lambda** : 
- en **une ligne**, on parle d'**expression lambda** :  `(args) => code;`.
- en **multiligne**, on parle d'**instruction lambda** : `(args) => {...};`.

L'instruction `return` :
- en **une ligne** est **implicite**.
- en **multiligne** doit être **explicite**,

## Exemples

Voici un exemple avec `Func` :
```
using System; // nécessaire
	
public class StringTest : MonoBehaviour
{
	// Func prenant un string en paramètre, renvoyant un int
	public Func<string, int> LongueurString; 
	
	void Start()
	{
		// Abonner la fonction respectueuse à notre Func
		LongueurString = ObtenirLongueur;

		// Utilisation
		int nombre = LongueurString("Toto");
	}

	// Notre fonction respectant la signature
	int ObtenirLongueur(string mot)
	{
		return mot.Length;
	}
}
```

Le même exemple avec une expression lambda en une ligne :
```
using System; // nécessaire
	
public class StringTest : MonoBehaviour
{
	public Func<string, int> LongueurString; 

	void Start()
	{
		// Déclaration de la fonction anonyme
		LongueurString = (texte) => texte.Length; 
		// Bas besoin de déclarer de type à "texte" car on accède au délégué directement qui déclare déjà des types. Si problème, mentionner le type.

		// Utilisation
		int nombre = LongueurString("Toto");
	}
}
```

Les fonctions anonymes peuvent être réalisées avec `delegate`. Ici, sans paramètre :
```
delegate void UnDelegate();
UnDelegate toto = delegate()
{
	Debug.Log("Coucou");
}
```
