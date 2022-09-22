# Introduction

Le 22-09-2022

Découvrir la programmation en **C#**, avec de l'Unity dedans.

## Références

Voici un certain nombre de ressources utiles pour débuter :
- [Coding in Unity for the Absolute Beginner 2014](https://www.youtube.com/watch?v=nWkUutm7Kus "Coding in Unity for the Absolute Beginner 2014")
- [Chaîne Tuto Unity FR](https://www.youtube.com/c/TUTOUNITYFR "Chaîne Tuto Unity FR")
- [Beginner Gameplay Scripting](https://learn.unity.com/project/beginner-gameplay-scripting "Beginner Gameplay Scripting")
- [Tutorial Teacher](https://www.tutorialsteacher.com/ "Tutorial Teacher")

## Vocabulaire, notions

En programmation impérative, l'**instruction** désigne la commande que l'on souhaite que la machine effectue. Elle est composée d'une ou plusieurs **expressions** : toute combinaison de valeurs, d'opérateurs et de méthodes qui **retourne une valeur**. Exemple : l'expression booléenne qui renvoie une valeur `true` ou `false`.

Une **constante littérale** est une représentation explicite de la donnée : ce que l'on écrit est ce qui est traité. Cette donnée est typée et vaut pour les nombres positifs, les caractères et les chaînes de caractères. *A contrario*, par exemple un nombre négatif ne représente pas littéralement la donnée car il est obtenu par  composition (opérateur unaire `-` et donnée en valeur absolue).

## Sur .NET

**.NET** de Microsoft existe depuis l'année 2000 et est un **environnement de développement et d'exécution de programmes** pour toute plateforme ou destination, et plus spécifiquement un **environnement unifié de *frameworks***. 
- Le programme ***CLR (Common Language Runtime)*** gère la mémoire, les allocations et désallocations, l'exécution de l'application et les dépendances. Comme Java, .NET est un **environnement d'exécution contrôlée**.
- Le code est dit **code managé**, c'est-à-dire pris en charge par le CLR. 
- .NET prend en charge les langages respectant les spécifications de l'unification des types (VB, F#, C#...).

Références :
- [Site web officiel](https://dotnet.microsoft.com "DotNet")
- [Page de téléchargement](https://dotnet.microsoft.com/en-us/download "Page de téléchargement")
- [MSDN .NET](https://learn.microsoft.com/fr-fr/dotnet "MSDN .NET")

Une fois l'environnement installé, le terminal Windows fournit des commandes utiles.

Connaître les *runtimes* installés ou les SDKs installés, ou encore les deux.
```
dotnet --list-runtimes
```
```
dotnet --list-sdks
```
```
dotnet --info
```

Obtenir de l'aide en général ou pour une commande.
```
dotnet -h
```
```
dotnet commande -h
```

Comment fonctionne l'environnement d'exécution ?
- Le développeur code son programme en **C#** par exemple.
- Le programme est **compilé** en **langage intermédiaire** (nom qui change au cours du temps : MSIL, CIL, IL) et prend la forme d'un ***assembly*** (.exe ou .dll). Noter que ce code managé est facile à désassembler (avec ILSpy par exemple) mais qu'on peut procéder à une *obfuscation* (avec ConfuserEx par exemple).
- On lance l'application.
- Pour exécuter l'application, le CRL opère une **compilation à la volée** (*Just In Time Compiler*) du code IL en code binaire adapé au système d'exploitation utilisé (il y a aussi une mise en cache pour réutilisation rapide).

Cette complexité ralentit légèrement la vitesse d'exécution des programmes (par rapport au C ou au C++), mais la différence est aujourd'hui négligeable par rapport aux avantages obtenus. 

L'***assembly*** est un ensemble de code prêt à l'emploi. 
- Fichier .exe : ***assembly* de processus**, lance l’application,
- Fichier .dll : ***assembly* de bibliothèques**, peut être partagé entre plusieurs applications.

Unity est un logiciel utilisant .NET et est adossé à C#. Il peut avoir du retard sur les évolutions de .NET ou bien n'utiliser qu'une partie ou version de l'environnement. Sur ce sujet, on peut consulter la documentation ou la feuille de route de développement. [Feuille de route Unity](https://unity.com/roadmap/unity-platform "Feuille de route Unity")

## Scripts Unity

Pour coder dans Unity, on utilise des **scripts C#** (extension `.cs`) et on code en **Programmation Orientée Objet (POO)** ou bien en **DOTS** (ce qu'on ne voit pas ici).

Les scripts sont utilisés soit **en global** (exemple : une classe statique pour tout le projet) soit **en local** (exemple : une classe de composant d'objet).

En général, **les noms du fichier et de la classe doivent être identiques**. 

Unity insère automatiquement une **structure de code par défaut** :
```
// Namespaces, pour appeler les bibliothèques utiles
using System.Collections;
using System.Collections.Generic;
using UnityEngine; // Ceci pour que la classe hérite de MonoBehaviour

public class DemoScript : MonoBehaviour // La classe peut être attribuée comme composant à un objet
{
	// Des méthodes héritées de MonoBehaviour
	void Start()
	{

	}
	void Update()
	{

	}
}
```

## Exemples de fonctionnalités

Unity propose des fonctions comme `Debug.Log()` ou des classes comme `Mathf` qui n'existent pas dans l'environnement **.NET**, et il prend en charge les fonctions de cet environnement. On consultera donc les documentations de l'un et l'autre pour s'orienter.

Obtenir un **nombre aléatoire** avec la classe d'Unity : 

**Instancier** par exemple un `prefab` avec `Instantiate()` qui prend plusieurs options de paramètres.

Pour les nombres, 
- l'astuce de l'arrondi à un nombre de décimales : `Mathf.Round(myFloat * 100.0f) / 100.0f`,
- retourner le plus petit ou le plus grand nombre de plusieurs valeurs : `Mathf.Min()`, `Mathf.Max()`,
- nombre aléatoire `int` : `Random.Range(x inclus, y exclu)`,
- nombre aléatoire  `float` : `Random.Range(x inclus, y inclus)`,
- nombre aléatoire dans un cercle : `transform.position = Random.insideUnitCircle * 5` (rayon de 0 à 5).

## ECS

***Data-Oriented Technology Stack (DOTS)*** est un *framework* d'Unity, il comprend des modules ou technologies : *C# Job System*, *ECS*, *Burst Compiler*.

ECS représente une autre façon de programmer que la POO. Au lieu d'une structure centrée sur l'**objet** (ennemi, obstacle...) ou le **composant** (fonction *MoveForward*, *Destroy*...), c'est une structure centrée sur la **donnée** (vitesse de déplacement, santé du joueur). Avantage : gain de performances et optimisation. 

Exemple d'éléments : 
- `using Unity.Entities`,
- une classe héritant de `JobComponentSystem`,
- une variable `struct MovementJob : IJobProcessComponentData<Position, Rotation, MoveSpeed>{...}` où l'on voit que `Position, Rotation, MoveSpeed` sont des données.

Voir le projet *MegaCity* : 8 millions de triangles, 6 millions d'entités, 2000 véhicules, optimisé pour mobile.