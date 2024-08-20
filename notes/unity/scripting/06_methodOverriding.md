# Réécriture de méthode

Le 17-08-2024

Dans une classe dérivée, réécrire les méthodes de la classe de base.

## Dans Unity

Voici un exemple de réécriture de méthode avec Unity. On voit aussi que l'héritage à partir de la classe `MonoBehaviour` reste possible : on peut donc ajouter la classe enfant comme composant à un `GameObject`.

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Animal : MonoBehaviour
{
	protected string animalNom; 
	
	protected virtual void Dire()
	{
		Debug.Log("Je suis" + animalNom);
	}
	
	void Start()
	{
		Dire();
	}
}
```

```C#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
public class Canard : Animal
{
	protected override void Dire()
	{
		base.Dire(); // fonction parente telle quelle
		Debug.Log("Coin coin"); // ajout
	}
}
```
