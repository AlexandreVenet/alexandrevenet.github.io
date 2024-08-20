# Introduction au scripting C# dans Unity

Le 12-08-2024

Coder en C# pour un programme Unity.

## Généralités

Unity est un logiciel dépendant de **Microsoft .NET** et est adossé à **C#**. 

Unity peut avoir du retard sur les évolutions de .NET ou bien n'utiliser qu'une partie ou version de l'environnement. Sur ce sujet, on peut consulter la documentation ou la feuille de route de développement. [Feuille de route Unity](https://unity.com/roadmap/unity-platform "Feuille de route Unity")

## Coder

Pour coder dans Unity, on utilise des **scripts C#** (extension `.cs`) et on code en **Programmation Orientée Objet (POO)** ou bien en **DOTS** (ce qu'on ne voit pas ici).

Les scripts sont utilisés soit **en global** (exemple : une classe statique pour tout le projet) soit **en local** (exemple : une classe de composant d'objet).

En général, **les noms du fichier et de la classe doivent être identiques**. 

Unity insère automatiquement une **structure de code par défaut** :

```
// Namespaces, pour appeler les bibliothèques utiles
using System.Collections;
using System.Collections.Generic;
using UnityEngine; // Ceci pour avoir le type MonoBehaviour
	
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

Unity propose des fonctions comme `Debug.Log()` ou des classes comme `Mathf` qui n'existent pas dans l'environnement .NET, et il prend en charge les fonctions de cet environnement. On consultera donc les documentations de l'un et l'autre pour s'orienter.

**Instancier** un *prefab* avec `Instantiate()` et ses surcharges.

Pour les nombres :
- l'astuce de l'arrondi à un nombre de décimales : `Mathf.Round(myFloat * 100.0f) / 100.0f`,
- retourner le plus petit ou le plus grand nombre de plusieurs valeurs : `Mathf.Min()`, `Mathf.Max()`,
- nombre aléatoire `int` : `Random.Range(x inclus, y exclu)`,
- nombre aléatoire  `float` : `Random.Range(x inclus, y inclus)`,
- nombre aléatoire dans un cercle : `transform.position = Random.insideUnitCircle * 5` (rayon de 0 à 5).

## ECS

***Data-Oriented Technology Stack (DOTS)*** est un *framework* interne àUnity, il comprend des modules ou technologies : *C# Job System*, *ECS*, *Burst Compiler*.

ECS est une autre façon de programmer que la POO. Au lieu d'une structure centrée sur l'**objet** (ennemi, obstacle...) ou le **composant** (fonction *MoveForward*, *Destroy*...), c'est une structure centrée sur la **donnée** (vitesse de déplacement, santé du joueur). Avantage : gain de performances et optimisation. 

Exemple d'éléments : 
- `using Unity.Entities`,
- une classe héritant de `JobComponentSystem`,
- une variable `struct MovementJob : IJobProcessComponentData<Position, Rotation, MoveSpeed>{...}` où l'on voit que `Position, Rotation, MoveSpeed` sont des données.

Voir le projet *MegaCity* : 8 millions de triangles, 6 millions d'entités, 2000 véhicules, optimisé pour mobile.

## Commentaires

Unity fournit un moyen supplémentaire d'écrire des commentaires. L'**attribut** `[Tooltip()]` s'applique sur les **champs**. Cet attribut fonctionne ET pour Visual Studio ET pour l'*Inspector* : passer le curseur de la souris sur le nom du champ concerné pour afficher le texte en bulle d'aide.

```C#
[Tooltip("Des infos sur un Collider.")]
[SerializeField] private Collider _collider;
```
