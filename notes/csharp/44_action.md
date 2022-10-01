# Action

Le 01-10-2022

Un `delegate` prêt à l'emploi et sans valeur de retour.

## Principe

`Action` est un **type générique** de `delegate` **ne renvoyant pas de valeur**. Ce type permet de faciliter l'écriture des événéments.

Pour l'utiliser, il faut ajouter la librarie `System`.

Pour déclarer, on utilise le terme clé suivi de de chevrons encadrant un ou plusieurs types qui permettent de déclarer d'éventuels **paramètres**. Un exemple avec un événement `static` :
```
public static event Action onEnd;

// c'est exactement la même chose que : 
public delegate void End();
public static event End onEnd;
```

Autre exemple avec un type :
```
public event Action<string> OnEnvoyerALaCasse;
```

## Exemple avec Unity

Exemple complet (1) du script déclarant et déclenchant l'action suivi, (2) du script qui abonne une méthode à l'action.
```
using System; // nécessaire
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Main : MonoBehaviour
{
	public static Action<int> onDamageReceived;

	public int Health {get; set;}

	void Start()
	{
		Health = 10;	
	}

	void Update()
	{
		if(Input.GetKey(KeyCode.Space))
		{
			Health --;
			if(onDamageReceived != null)
				onDamageReceived(Health);
		}
	}
	
}
```
```
// pas besoin de using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Chose : MonoBehaviour
{
	private void OnEnable()
	{
		Main.onDamageReceived += DireHealth;
	}

	private void DireHealth(int health)
	{
		Debug.Log("La santé est de : " + health);
	}

	private void OnDisable()
	{
		Main.onDamageReceived -= DireHealth;
	}
}
```

## Autres syntaxes

D'autres syntaxes sont possibles. Ici, dans le cas où on souhaite attribuer à l'événement une fonction particulière (et non pas un ensemble de *listeners*).

Définitions de l'événement avec `delegate` ou fonction anonyme :
```
private Action<string> MonAction = delegate (string str)
{
	Debug.Log(str);
};
```
```
private Action<string> MonAction = (string str) => Debug.Log(str);
```

Méthode pour appeler l'événement :
```
public void TriggerAction(string str)
{
	MonAction(str);
}
```

## En Callback

`Action` peut être utilisé pour définir une *callback*. Par exemple avec une fonction anonyme :
```
internal class Test
{
	public void Message(string str, Action<string> action)
	{
		action(message);
	}
}
	
Test x = new();
	
x.Message("Bonjour", (str)=>
{
	Console.WriteLine(str.Substring(0, 3)); // Bon
});
```
