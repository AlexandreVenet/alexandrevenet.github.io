# WeakReference

Le 18-08-2024

Un objet candidat à la collecte du *Garbage Collector* pouvant s'échapper de l'anéantissement juste à temps.

## Objet fort, objet faible

Une référence ordinaire à un objet est dite **référence forte**. Tant que l'objet est utilisé, le *Garbage Collector* ne le supprime pas de la mémoire. 

Une **référence faible** concerne un objet qui, lorsqu'il n'existe aucune référence forte, peut encore être utilisé (donc faire l'objet d'une référence forte) et cela uniquement pendant le temps (indéterminé) qui précède la collecte de l'objet par le *Garbage Collector*.

Garder à l'esprit que le *Garbage Collector* peut collecter l’objet **avant** qu’une référence forte ne soit établie de nouveau.

## Mise en œuvre

La référence faible en C# s'établit à partir du type `WeakReference`. On instancie un objet de ce type, on lui passe notre objet en paramètre ; cette instance `WeakReference` a la charge de faire une référence à notre objet. Une fois que le *Garbage Collector* collecte notre objet, l'instance `WeakReference` réfère `null`. Microsoft parle ici de **référence faible courte**.

Maintenant, on peut spécifier `true` dans le constructeur du type `WeakReference` de façon à conserver une référence de notre objet même si ce dernier a été finalisé. Notre objet peut donc être récupéré même après la collecte... mais, ici, Microsoft précise que « l'état de l'objet reste imprévisible » ; par conséquent, il existe toujours une incertitude sur le résultat car si l'objet est collecté par le *Garbage Collector*, alors l'objet `WeakReference` renverra `null`. Il s'agit de **référence faible longue**. 

Dans les deux cas, cet objet de type `WeakReference` est aussi *managé*. Par conséquent, il est lui aussi collecté par le *Garbage Collector* une fois qu'il n'est plus utilisé dans le programme. 

Exemple avec un programme Console :

```C#
internal class ClassLourde
{
	public string monString;
	
	public ClassLourde(string monString)
	{
		this.monString = monString.Trim();
	}
}
```

```C#
internal class Program
{
	private static void Main(string[] args)
	{
		WeakReference refFaible = Initialisation();
		
		// Traitements...
		// On a de nouveau besoin de l'objet (ou d'une nouvelle instance)
		Reutilisation(refFaible);
		
		// Garbage Collector passe par là. Attendre un peu
		GC.Collect();
		Thread.Sleep(1000);
		
		// On a de nouveau besoin de l'objet (ou d'une nouvelle instance)
		Reutilisation(refFaible);
		
		Console.Read();
	}
	
	private static WeakReference Initialisation()
	{
		ClassLourde obj = new ClassLourde("Coucou !");
		Console.WriteLine("Initialisation : " + obj.monString);
		
		// Traitements...
		// obj a fini mais peut être réutilisé. Donc, faire une référence faible.
		return new WeakReference(obj);
	}
	
	private static void Reutilisation(WeakReference refFaible)
	{
		// Objet de récupération
		ClassLourde obj = null;
		
		// Récupérer si possible
		if(refFaible != null && refFaible.IsAlive) 
		{
			obj = (ClassLourde) refFaible.Target;
		}
		// Sinon, nouvelle instance
		else
		{
			obj = new ClassLourde("Nouvelle instance.");
		}
		
		Console.WriteLine("Réutilisation ? " + obj.monString);
		
		// Traitements...
		// obj a fini mais peut encore être réutilisé. Donc, faire une référence faible.
		refFaible.Target = obj;
	}
}
```

## Usages

La référence faible peut servir à conserver de très gros objets dont l'initialisation est coûteuse, qui doivent être finalisés si inutilisés mais qui peuvent éventuellement être réutilisés avant finalisation. C'est le principe de la **mise en cache**.

Plus d'informations chez Microsoft :
- [Classe WeakReference](https://learn.microsoft.com/fr-fr/dotnet/api/system.weakreference _blank)
- [Références faibles](https://learn.microsoft.com/fr-fr/dotnet/standard/garbage-collection/weak-references _blank)
