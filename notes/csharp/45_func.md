# Func

Le 01-10-2022

Un `delegate` prêt à l'emploi avec valeur de retour.

## Principe

`Func` est un **type générique** de `delegate` **renvoyant une valeur**. Ce type permet de faciliter l'écriture des événéments.

Pour l'utiliser, il faut ajouter la librarie `System`.

Son fonctionnement est similaire à l'`Action` ; se reporter à la page concernant ce dernier.

## Delegate

Exemple : créer un programme qui prend un `string` et retourne sa longueur en `int`. 

Script standard :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StringTest : MonoBehaviour
{
	void Start()
	{
		// Appelons la fonction et enregistrons le résultat en variable
		int longueurMot = ObtenirLongueur("Toto");
	}

	// Notre fonction de renvoi de longueur
	int ObtenirLongueur(string mot)
	{
		return mot.Length;
	}
}
```

Script avec délégué :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StringTest : MonoBehaviour
{
	// Déclaration du delegate recevant une valeur et en renvoyant une autre
	public delegate int DelegateLongueurString(string texte);

	void Start()
	{
		// Assignation
		DelegateLongueurString ls = new DelegateLongueurString(ObtenirLongueur);
		
		// ...code...
		
		// Utilisation
		Debug.Log(ls("Toto"));
	}

	// Notre fonction respectant la signature 
	int ObtenirLongueur(string mot)
	{
		return mot.Length;
	}
}
```

Script avec délégué - alternative :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StringTest : MonoBehaviour
{
	// Faisons un délégué recevant une valeur et en renvoyant une autre
	public delegate int DelegateLongueurString(string texte);

	// Une var de notre déléguée
	DelegateLongueurString ls;

	void Start()
	{
		// Assignation sans nécessité de "new..."
		ls = ObtenirLongueur;

		// ...code...
		
		// Utilisation
		Debug.Log(ls("Toto"));
	}

	// Notre fonction respectant la signature
	int ObtenirLongueur(string mot)
	{
		return mot.Length;
	}
}
```

## Func

[MSDN Func](https://learn.microsoft.com/fr-fr/dotnet/api/system.func-1 "MSDN Func")

`Func` définit une ***function delegate***, un délégué de type fonction. `Func` fonctionne de la même manière que `Action` et **retourne une valeur** (alors que `Action` ne le permet pas) :
- appeler la librairie `System`,
- déclarer la méthode avec le terme clé suivi des chevrons T qui permettent de déclarer d'éventuels paramètres : la **dernière valeur est le type retourné** et toutes les autres sont les paramètres de fonction.
```
public event Func OnDoing1;
public event Func<bool> OnDoing2; // retourne bool 
public event Func<string, bool> OnDoing3; // idem + string en paramètre
```

Exemple dans Unity :
```
using System; // nécessaire
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StringTest : MonoBehaviour
{
	// Func prenant un string en paramètre, renvoyant un int
	public Func<string, int> LongueurString; 

	private void Start()
	{
		// Abonner la fonction respectueuse à notre Func
		LongueurString = ObtenirLongueur;

		// Utilisation
		int nombre = LongueurString("Toto");
	}

	// Notre fonction respectant la signature
	private int ObtenirLongueur(string mot)
	{
		return mot.Length;
	}
}
```

## En Callback

`Func` peut être utilisé pour définir une *callback*. Par exemple avec une fonction anonyme :
```
internal class Test
{
	public void CalculerFunc(double a, double b, Func<double, double, double> function)
	{
		Console.WriteLine(function(a, b));
	}
}
	
Test x = new();
	
x.CalculerFunc(10, 20, Addition); // 30
x.CalculerFunc(10, 20, delegate (double a, double b) { return a + b; } ); // 30
x.CalculerFunc(10, 20, (double a, double b)=>{ return a + b; } ); // 30
x.CalculerFunc(10, 20, (a,b) => { return a + b; }); // 30
x.CalculerFunc(10, 20, (a,b) => a + b ); // 30
	
double Addition(double a, double b) return a + b;
```
