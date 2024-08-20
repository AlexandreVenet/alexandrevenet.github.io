# *Namespace*

Le 15-08-2024

Placer les types dans des catégories nommées et en arborescence. [Source Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/namespaces _blank)

## Principe

Un ***namespace*** ou **espace de nom** désigne un **ensemble de types** qui ont la même finalité. Les *namespaces* servent à plusieurs choses :
- organiser dans une arborescence le code, les modules, sous-modules, classes, *plug-ins*... et même d'autres *namespaces*,
- résoudre des problèmes de conflits de nom,
- optimiser le programme en n'appelant que les librairies nécessaires,
- ne pas surcharger l'*IntelliSense* lors de l'écriture,
- permettre des ajouts ultérieurs (librairies de l'Asset Store pour Unity, de NuGet en général ou personnelles).

Les *namespaces* .NET sont proposés dans des ***assemblies (assemblages)*** qui sont installés en local sur la machine, en général dans le ***Global Assembly Cache (GAC)*** sous forme de fichiers `.dll`. Le GAC se trouve à l'adresse suivante : `C:\Windows\assembly` (l'utiliser avec **gacutil.exe**). Un *assembly* peut contenir plusieurs *namespaces*.

## Utilisation

On peut appeler un type à l'endroit de notre code, en appelant les *namespaces* depuis la racine. Par exemple, le ***fully qualified name*** de la classe Console est `System.Console`.

```C#
System.Console.Clear();
```

La **directive** `using` permet d'appeler la librairie une fois, ce qui épargne de saisir le chemin complet à chaque fois. Exemple : le *fully qualified name* de la console est `System.Console`, alors écrivons le *namespace* en début de document.

```C#
using System; 
//...
Console.Clear();
```

Lorsque les librairies sont imbriquées, on utilise l'opérateur *dot* pour accéder aux enfants. Par exemple : `using UnityEngine.SceneManagement` permet d'utiliser `SceneManager`.

Dans Visual Studio, les librairies chargées et utilisées sont affichées en couleur saturée normale. Celles chargées mais inutilisées sont en couleur désaturée. Bonne pratique : nettoyer les importations inutiles, à la main ou par clic droit dans la zone d'en-tête. Clic droit au niveau de l'en-tête de fichier puis **Organiser les instructions using** pour organiser.

`using` n'est valide que si l'*assembly* (qui contient les *namespaces*) est référencé dans le projet. Ceci peut être consulté dans **Affichage > Explorateur de solutions > Références**.

Si on écrit du code et qu'une librairie manque, alors faire un clic droit sur le terme souligné puis choisir **Résoudre**.

## Syntaxe

Le *namespace* de la classe peut être écrit de deux manières : soit par bloc d'accolades, soit en une ligne (depuis C#10).

```C#
namespace nom
{
	...code...
}
```

```C#
namespace nom;
...code...
```

## Créer sa librairie

Les *namespaces* permettent d'isoler du code sous un nom réservé, ce qui évite les conflits éventuels avec d'autres classes qui auraient le même nom. Côté fichiers, on essaie de respecter la nomenclature utilisée et de l'appliquer à l'arborescence de fichiers et dossiers.

**Exemple** - Le script de la librairie situé dans un dossier par exemple `Auteur/x` et le script appelant cette librairie :

```C#
namespace x
{
	public class TypeX
	{
		//...
	}
}
```

```C#
using x;

public class MaClasse
{
	private void Agir()
	{
		TypeX x = new();
	}
}
```

Il est possible d'étendre la librairie avec un *namespace* enfant.


**Exemple** - Le script de la librairie étendue dans un autre fichier situé dans le dossier `Auteur/x/y` et le script appelant cette librairie :

```C#
namespace x.y;

public class TypeY
{
	...code...
}
```

```C#
using x.y;

public class MaClasse
{
	private void Agir()
	{
		TypeY y = new();
	}
}
```

On peut écrire plusieurs types dans un seul fichier et sous le même *namespace*. Mais ce n'est pas conseillé pour des questions de clarté : mieux vaut écrire un fichier par classe.

```C#
namespace Toto;

public class Foufou {...}
public class PasFouFou {...}
```

## Alias

`using` permet la définition d'**alias**, de façon à réduire la quantité de texte à écrire ou bien à lever des ambiguïtés comme entre `System.Object` et `UnityEngine.Object`.

```C#
using MesOutils = Toto.Foufou;
//...
MesOutils.Truc();
```

