# Namespace

Le 22-09-2022

Placer les types dans des catégories nommées et en arborescence.

## Principe

Un ***namespace*** ou **espace de nom** désigne un **ensemble de classes** servant la même finalité. Les *namespaces* servent à plusieurs choses :
- organiser dans une arborescence le code, les modules, sous-modules, classes, *plug-ins*... et même d'autres *namespaces*,
- résoudre des problèmes de conflits de nom,
- optimiser le programme en n'appelant que les librairies nécessaires,
- ne pas surcharger l'*Intellisense* lors de l'écriture,
- permettre des ajouts ultérieurs (librairies de l'Asset Store ou personnelles).

Les *namespaces* sont proposés dans des ***assemblies (assemblages)*** qui sont installés en général dans le ***Global Assembly Cache (GAC)*** sous forme de fichiers .dll. Le GAC se trouve à l'adresse suivante : `C:\Windows\assembly` (l'utiliser avec **gacutil.exe**). Un *assembly* peut contenir plusieurs *namespaces*.

## Appel de librairie

On peut appeler un type à l'endroit de notre code, en appelant les *namespaces* depuis la racine. Par exemple, le ***fully qualified name*** de la classe Console est `System.Console`.
```
System.Console.Clear();
```

La **directive** `using` permet d'appeler la librairie une fois sans avoir à retaper le chemin complet par la suite. Exemple : le *fully qualified name* de la console est `System.Console`, alors écrivons le début en tête de document.
```
using System; 
//...
Console.Clear();
```

Lorsque les librairies sont imbriquées, on utilise l'opérateur *dot* pour accéder aux enfants. Par exemple : `using UnityEngine.SceneManagement` permet d'utiliser `SceneManager`.

Dans Visual Studio, les librairies chargées et utilisées sont affichées en couleur saturée normale. Celles chargées mais inutilisées sont en couleur désaturée. Bonne pratique : nettoyer les importations inutiles, à la main ou par clic droit dans la zone d'en-tête. Clic droit au niveau de l'en-tête de fichier puis **Organiser les instructions using** pour organiser.

`using` n'est valide que si l'*assembly* (qui contient les *namespaces*) est référencé dans le projet. Ceci peut être consulté dans **Affichage > Explorateur de solutions > Références**.

Si on tape du code et qu'une librairie manque, alors faire un clic droit sur le terme souligné puis choisir **Résoudre**.

## Créer sa librairie

Les *namespaces* permettent d'isoler du code sous un nom réservé, ce qui évite les conflits éventuels avec d'autres classes qui auraient le même nom. Côté fichiers, on essaie de respecter la nomenclature utilisée et de l'appliquer à l'arborescence de fichiers et dossiers.

**Exemple** : le script de la librairie situé dans un dossier par exemple `Auteur/MaChosePack` et le script appelant cette librairie :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
namespace x
{
	public class TypeX : MonoBehaviour
	{
		//...
	}
}
```
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using x; // utiliser la librairie
	
public class Player : MonoBehaviour
{
	private void Start()
	{
		TypeX t = new TypeX(); 
	}
}

```

Il est possible d'étendre la librairie avec un *namespace* enfant.

**Exemple** : le script de la librairie étendue dans un autre fichier situé dans le dossier `Auteur/x/y` et le script appelant cette librairie :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
	
namespace x.y
{
	public class TypeY : MonoBehaviour
	{
		//...
	}
}
```
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using x.y;
	
public class TypeX : MonoBehaviour
{
	private TypeY y;
	
	private void Start()
	{
		y = GameObject.Find("y").GetComponent<TypeY>();
	}
}
```

On peut aussi écrire dans un seul fichier, sous le même *namespace* plusieurs types.
```
namespace Toto
{
	public class Fou {...}
	public struct PasFou {...}
}
```

## Alias

`using` permet la définition d'**alias**, de façon à réduire la quantité de texte à écrire ou bien à lever des ambiguïtés comme entre `System.Object` et `UnityEngine.Object`.
```
using MesOutils = Toto.Choses.Outils;
//...
MesOutils.Truc();
```

## Conflit d'environnements

Unity intègre des classes spécifiques qui font doublon avec celles de .NET. Par exemple, la classe `Random` d'Unity permet d'obtenir un nombre aléatoire, tout comme `Random` de .NET mais pas de la même manière. Il est alors nécessaire de **spécifier le *namespace*** avec un alias ou dans le code.
```
// Unity 
int nombre = UnityEngine.Random.Range(-10.0f, 10.0f);
```
```
// .NET
Random de = new System.Random();
int lancerDe = new Random().Next(1,7);
Console.WriteLine(lancerDe);
```

## Syntaxe simplifiée

Avec C# 10, on peut déclarer le *namespace* sans les accolades, ce qui apporte du confort.
```
namespace Titi.Tata.Toto;
	
public class Zero {...}
```