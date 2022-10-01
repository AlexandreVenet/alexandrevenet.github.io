# Event

Le 01-10-2022

Des entités sont informées de la survenue d'un fait. [MSDN Events overview](https://docs.microsoft.com/fr-fr/dotnet/csharp/events-overview "MSDN Events overview")

## Introduction

Dans un programme, un **événement** est un fait qui survient et informe d'autres choses pour qu'elles agissent.

En C#, un ***event*** est un type encapsulant un `delegate`, permettant un **système centralisé de diffusion de notification** : chaque classe ou objet est **autonome** et peut s'inscrire ou se désinscrire d'un événement. Dans les ***design patterns***, cela conduit au ***pattern Observer*** qui propose des **abonnés (*suscribers*) écouteurs (*listeners*)** autonomes les uns des autres. 

Utiliser des événements revient à définir des **gestionnaires d'événements** (*event handlers*). Ce sont des méthodes qu'on **abonne** à l'événement et qui s'exécutent dès que l'événement survient.

On peut déclarer l'événement en `static` afin de ne pas avoir à instancier la classe pour accéder à l'événement.
```
public delegate void ActionClick(); // la méthode de type delegate
public static event ActionClick onClick; // l'event du type ci-dessus, static éventuellement
```

Pour utiliser l'`event`, comme les `delegate`, il faut d'abord tester s'il est non `null` (s'il a des abonnés) avant de le lancer.

## Exemple dans Unity

Imaginons qu'on veuille cliquer sur un bouton d'UI et que cela change la couleur de 3 cubes :
- créer un script nommé `Main`,
- l'ajouter à la caméra,
- créer un bouton d'UI,
- dans sa propriété "On Click()", cliquer sur "+",
- ajouter la caméra dans le champ,
- dans le menu déroulant, choisir `Main/BoutonClick` (le nom de la fonction ci-après déclarée).
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
    
public class Main : MonoBehaviour
{
	// Déclaration du delegate
    public delegate void ActionClick();
    
    // Déclaration de l'événement
    public static event ActionClick onClick;
    
    // Lorsque ceci a lieu
    public void BoutonClick()
	{
        // Si pile non null, alors lancer l'event
        if(onClick != null)
            onClick();
	}
}
```

Ainsi, dans le script `Main` il y a une **méthode à laquelle peuvent s'abonner des écouteurs d'événement**. 

Comment les abonnés accèdent-ils à l'événement ? Il faut une fonction qui **respecte la signature** du `delegate` qui a permi de réaliser cet événement et ensuite **ajouter cette fonction à l'événement** sur le modèle d'une incrémentation. Se désabonner de l'événement s'effectue sur le modèle de la décrémentation. 

Dans l'exemple, ajoutons un script `Cube` aux cubes de manière à ce que chaque cube s'abonne à l'événement `Main.onClick` et se désabonne lorsque désactivé :
```
public class Cube : MonoBehaviour
{
    void OnEnable()
    {
        // Ajouter la fonction à l'événement (écouter l'événement)
        Main.onClick += ColorerEnRouge;  
    }
    
    // La fonction respectueuse
    public void ColorerEnRouge() 
    {
        GetComponent<MeshRenderer>().material.color = Color.red;
    }
    
    // Si l'objet est désactivé
	void OnDisable()
	{
        // Retirer la fonction respectueuse de l'événement (ne plus écouter l'événement)
		Main.onClick -= ColorerEnRouge; 
	}
}
```

Une bonne pratique est de **prévoir un cas de désabonnement** pour éviter de charger la mémoire inutilement. Dans l'exemple, désactiver l'objet désabonne la méthode.

Comme l'`event` encapsule un `delegate`, cela signifie que le même système peut être réalisé avec **seulement** des `delegates`. Mais les `events` sont **plus sécurisés** que les `delegate` : 
- d'autres classes peuvent appeler le `delegate` et en contrôler l'exécution,
- alors que l'événement ne permet seulement qu'une inscription/désinscription.

## Autonomie & centralisation

L'exemple précédent montre l'**autonomie** des objets : il est toujours possible de scripter un objet de façon à ce qu'il fasse tout autre chose que colorer en rouge, du moment que la fonction ajoutée à l'événement respecte la signature du type du délégué utilisé. Ainsi, il n'est pas nécessaire de coder de façon centralisée et verrouillée le comportement de tous les objets : des comportements différents ont un ou plusieurs événements en commun.

L'exemple précédent utilise un script `Main` qui sert en fait d'`EventManager`. On peut ainsi clarifier l'application en utilisant un **gestionnaire global et centralisé** de l'événement (diffusion) et toutes sortes d'objets abonnés qui n'ont aucun rapports entre eux (peu de dépendance).

## EventHandler Delegate

.NET fournit nativement deux types de `delegate` dont le but est de générer des événements et établir le *pattern observer*.

`EventHandler<TEventArgs>` : pour un **événement qui envoie des données aux abonnés**.
```
internal class Program
{
	static void Main(string[] args)
	{
		MaClasse m = new();
		m.MonEventHandler += MonGestionnairePerso;
		m.Demarrer();
	
		Console.WriteLine("Fin de programme.");
		Console.Read();
	}
	
	private static void MonGestionnairePerso(object? sender, EventArgs e)
	{
		Console.WriteLine("Une chose est effectuée.");
	}
}
	
internal class MaClasse
{
	public event EventHandler MonEventHandler;
	
	public void Demarrer()
	{
		Console.WriteLine("Demarrer() est lancée.");
		LancerEvenement(EventArgs.Empty);
	}
	
	private void LancerEvenement(EventArgs e)
	{
		MonEventHandler?.Invoke(this, e);
	}
}
```

`EventHandler` : pour un **événement sans envoi de données**.
```
internal class Program
{
	static void Main(string[] args)
	{
		MaClasse m = new();
		m.MonEventHandlerT += MonGestionnairePerso;
		m.Demarrer();
	
		Console.WriteLine("Fin de programme.");
		Console.Read();
	}
	
	private static void MonGestionnairePerso(object? sender, bool e)
	{
		Console.WriteLine($"La valeur reçue est : {e}");
	}
}
	
internal class MaClasse
{
	public event EventHandler<bool> MonEventHandlerT;
	
	public void Demarrer()
	{
		Console.WriteLine("Demarrer() est lancée.");
		int value = new Random().Next(0, 2);
		bool boolValue = Convert.ToBoolean(value);
		LancerEvenement(boolValue);
	}
	
	private void LancerEvenement(bool isOk)
	{
		MonEventHandlerT?.Invoke(this, isOk);
	}
}
```

Si on veut **passer plusieurs données**, on remplacera dans l'exemple précédent le type booléen par un type qui contient les champs ou propriétés nécessaires :
- soit une `class` personnelle,
- soit une `class` personnelle héritant de `EventArgs` (pour profiter des avantages de ce type),
- soit une `struct` personnelle (`tuple` par exemple).

