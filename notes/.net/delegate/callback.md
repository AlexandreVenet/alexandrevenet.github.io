# Callback

Le 19-08-2024

Une fonction passée en paramètre de fonction.

## Présentation

Une ***callback*** est une fonction B passée comme paramètre à une autre fonction A. Cela permet une réutilisation de la fonction A dans des contextes différents, avec des traitements différents.

On peut utiliser les **expressions lambda** ou les `delegate`, `Action`, `Func`.

## Exemple avec expression lambda

Prenons l'exemple suivant avec Unity, qui fait une pause de 3 secondes avec une coroutine avant d'effectuer... rien de plus.

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class DemoScript : MonoBehaviour
{
	void Start()
	{
		StartCoroutine(MaRoutine());
	}
	
	IEnumerator MaRoutine()
	{
		yield return new WaitForSeconds(3.0f);
	}
}
```

On veut être **informé** une fois la coroutine **terminée** que les carottes sont cuites. Pour cela, on peut ajouter des instructions après la ligne `yield...`, comme : `Debug.Log("Les carottes sont cuites");`.

Mais cela suppose devoir réécrire la fonction à chaque fois que l'on veut faire autre chose.

Pour rendre cette fonction réutilisable, on peut utiliser une `Action` (qui est un `delegate`) et une fonction anonyme :
- ajouter l'`Action` en paramètre de `MaRoutine()`,
- tester après `yield...` si ce `delegate` est non `null`, et si c'est le cas, le lancer,
- pour contrôler les usages, on peut déclarer par défaut la valeur `null` à l'`Action` dans les paramètres et cela revient à déclarer que cette `Action` est optionnelle,
- lancer la coroutine avec une fonction anonyme définie lors de l'appel de `MaRoutine()`.

```C#
using System; // utilisé pour disposer d'Action
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Callback : MonoBehaviour
{
	void Start()
	{
		// Appel standard 
		// StartCoroutine(MaRoutine()); // affiche "Rien à dire."
		
		// Appel de la coroutine dans laquelle on passe une fonction callback anonyme
		StartCoroutine(MaRoutine(()=>
		{
			Debug.Log("Les carottes sont cuites.");	
		}));
	}
	
	IEnumerator MaRoutine(Action finir = null)
	{
		yield return new WaitForSeconds(3.0f);
	
		if(finir == null) // on lance MaRoutine sans paramètre
		{
			Debug.Log("Rien à dire.");
		}
		else // on lance MaRoutine avec une fonction en paramètre (donc "finir" non null)
		{
			finir();
		}	
	}
}
```

##  Syntaxes de test

En général, pour tester l'`Action` avant de la lancer, plusieurs syntaxes :

```C#
if(monAction != null)
{
	monAction();
}
```

```C#
if(monAction != null)
{
	monAction.Invoke();
}
```

```C#
action?.Invoke(); 
```

## Syntaxe avec delegate()

Les *callbacks* peuvent utiliser la syntaxe par `delegate()` :

```C#
// Création de la méthode
private void MethodeAvecCallback(Action faire)
{
	// du code...
	faire.Invoke();
}
	
// Appel de la méthode
MethodeAvecCallback(
	delegate()
	{
		Console.WriteLine("Na !");
	}
);
```
