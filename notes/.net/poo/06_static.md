# Static

Le 17-08-2024

Appeler un membre de classe sans passer par un objet.

## Principe

Références : 
- [Microsoft *Learn Static class & members*](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members _blank)
- [Microsoft *Learn Static constructors*](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-constructors _blank)

`static` est un mot-clé utilisé pour accéder à une classe ou membre **sans passer par un objet** (classe,  méthode, propriété, opérateur, événement, constructeur...). L'entité est alors dite « partagée » avec toutes les instances de classe ou avec toutes classes du programme.

Un membre `static` dépend de la classe et non pas d'une instance de la classe. Il est unique pour toutes les instances. On appelle le membre statique **par la classe**. Exemples : `Console.WriteLine()`, `Program.Main()`. Cela vaut aussi pour une instance de classe car cette instance ne peut pas accéder à ce membre `static` comme élément interne. 

Sur la mémoire : 
- `static` permet de conserver un **espace mémoire permanent** pour l'entité, ce qui a pour conséquence de demander plus de mémoire pour utiliser l'application,
- *a contrario*, l'**instance** a pour principe de conserver les valeurs en elle-même. Une instance qui disparaît est un espace mémoire libéré. 

Comparons staticité et instance : 
- une chose `static` dure toute la vie de l'application, est partagée et unique entre les instances, s'appelle par sa classe,
- un membre d'instance dure le temps de l'objet (hors associations spéciales ou références encore en cours), est copié autant de fois qu'il y a d'instances, s'appelle par l'objet.

**Ordre d'exécution** : dans une classe non `static`, une méthode `static` est toujours exécutée **avant les méthodes d'instance**.

## Restrictions

Restrictions sur les membres : 
- un membre `static` ne peut accéder qu'à des membres `static` (et non pas des membres d'instance).

Une classe `static` :
- ne peut hériter d'aucune classe,
- ne contient que des membres `static`,
- ne peut pas être instanciée,
- ne peut pas contenir de constructeur,
- ne peut pas être dérivée.

## Fonctionnement

On utilise le mot-clé `static` pour déclarer un membre... `static`.

Par exemple avec Unity, prenons les deux classes suivantes. La classe `Test` appelle le champ `score` depuis la classe `Score` et cette dernière n'a pas besoin d'être instanciée.

```C#
// Classe non ajoutée en tant que composant
public class Score : MonoBehaviour
{
	public static int score;
}
```

```C#
// Classe ajoutée comme composant
public class Test : MonoBehaviour
{
	void Start()
	{
		Score.score +=10;
		Debug.Log(Score.score);
	}
}
```

Un exemple répandu dans les manuels et cours de programmation est celui du compteur incrémenté à chaque instanciation. Ceci s'effectue avec le constructeur de la classe qui peut récupérer la valeur `static` et l'incrémenter.

```C#
class Client
{
	private static int compteur = 0;
	private int _monID;
	
	public Client()
	{
		Client.compteur ++;
		_monID = Client.compteur; // premier client est à 1
	}
}
```

## Utility helper

`static` appliqué à une **classe** permet de créer une **classe utilitaire** ou ***utility helper class***. Ce type de classe permet de fournir et centraliser des méthodes spécifiques à un projet, que ce soit pour son fonctionnement ou pour la maintenance, le suivi de développement, etc. On utilise déjà de façon ordinaire ce genre de classes, par exemple avec Unity : 
- membres : `Vector2.zero`, `Quaternion.identity`, `Time.time`...
- méthodes : `GameObject.FindObjectWithTag()`, `Mathf.Approximately()`... 

Exemple avec Unity : voici deux scripts, le premier d'une classe `static`, le second qui utilise cette classe.

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public static class UtilityHelper
{
	public static GameObject CreerCube()
	{
		GameObject obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
        return obj;
	}
	
	public static void ResetPosition(GameObject obj)
	{
		obj.transform.position = Vector3.zero;
	}
}
```

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Chose : MonoBehaviour
{
	void Start()
	{
		GameObject toto = UtilityHelper.CreerCube();
		UtilityHelper.ResetPosition(toto);
	}
}
```

## Constructeur

Le **constructeur** d'une classe peut être `static`. Il est alors lancé **une seule fois**, **avant la première instanciation** si classe non `static` ou **avant le premier appel** si classe `static` et **avant tout constructeur d'instance**. Pas de visibilité à définir. 

Cela peut être utile pour en premier lieu définir la valeur de champs eux-mêmes `static`.

```C#
public class MaClasse
{
	private static int compteur = 0; // valeur définie à la compilation
	private int identifiant;

	static MaClasse()
	{
		compteur = 100; // valeur définie à l'exécution
	}

	public MaClasse()
	{
		identifiant = MaClasse.compteur;
		MaClasse.compteur ++;
	}
}
```
