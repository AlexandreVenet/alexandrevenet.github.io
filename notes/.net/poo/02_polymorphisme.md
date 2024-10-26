# Polymorphisme

Le 17-08-2024

Accéder aux types liés par héritage.

## Principe

Le **polymorphisme** désigne le fait pour une classe dérivée d'être de son propre type **et aussi** du type de la classe de base. 

Cela concerne : 
- les paramètres de fonction : si on attend un `Animal`, alors on peut passer un `Animal` ou un `Chat`, 
- les valeurs de retour de méthodes : si on veut un `Animal`, alors on peut renvoyer un `Animal` ou un `Chat`, 
- les déclarations de type : on peut déclarer ou convertir (*cast*) un même objet de type `Animal` ou `Chat`.

On peut donc créer des méthodes de traitement généraux pour des types généraux : `Animal` est le genre des espèces `Chat` et `Chien`. 

On peut également créer des méthodes dans les classes les plus générales de façon à ce qu'elles soient disponibles dans les classes dérivées. C'est le cas de `ToString()` de la classe `Object` qui est disponible dans toute classe dérivée.

## Tester le type

Le type peut être manipulé avec :
- `typeof()` qui prend un nom de type connu **à la compilation**,
- `GetType()` qui prend une instance d'objet dont le type est connu **à l'exécution**,
- `is` qui teste si **l'objet hérite d'un type**.

```C#
public class Troop
{}

public class Barbarian : Troop
{}
	
Barbarian conan = new Barbarian();
Troop myTroop = (Troop) conan;
	
if(myTroop is Barbarian)
{
	Console.WriteLine("Un Barbarian est une Troop à lui tout seul.");
}
```

[MSDN Tester le type et conversion](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/type-testing-and-cast _blank)

```C#
// Admettons deux classes
class TypeDeBase 
{}

class TypeDerive : TypeDeBase 
{}
	
//... et cette méthode
public void MaFonction(TypeDeBase t)
{
	if(t.GetType() == typeof(TypeDerive))
	{
		// Les deux sont TypeDeBase
	}
}
```

## *Upcasting*, *downcasting*

Il peut être utile d'instancier une classe dérivée à partir de sa classe de base, ce qu'on appelle l'***upcasting***. Attention : ici, est instancié un objet **selon sa classe de base**, donc **sans** ses spécificités de classe dérivée.

```C#
Personnage toto = new Toto(); 
// Personnage est la classe de base de Toto.
// Cet objet ne propose aucune spécificité de la classe Toto.
```

L'*upcasting* peut s'effectuer à tout moment (et pas seulement lors de l'instanciation).

```C#
public class Troop
{}

public class Barbarian : Troop
{}
	
Barbarian conan = new Barbarian();
Troop TroopConan = (Troop) conan;
```

Ceci permet de créer des **collections** d'objets selon le type de la classe de base (et pas seulement par la classe dérivée, ce qui complexifierait inutilement le travail). Par exemple :

```C#
public class Humanoide
{}

public class Orc : Humanoide
{}

public class Barbare : Humanoide
{}
	
public class HumanoideManager
{
	List<Humanoide> _tousHumanoides = List<Humanoide>();
}
```

Pour utiliser ou réutiliser l'objet selon sa classe dérivée, on fait du ***downcasting*** :

```C#
Personnage toto = new Toto(); // upcasting
toto.MethodeDePersonnage(); 
	
// Downcasting direct :
(Toto) toto.MethodeDeToto(); 
	
// Downcasting avec instance :
Toto totoEnTantQuEnfant = (Toto) toto;
totoEnTantQuEnfant.MethodeDeToto();
```

*Upcasting* et *downcasting* sont **explicites**. Mais par défaut, **une classe dérivée subit une conversion implicite vers sa classe de base**.

## *Pattern matching*

Le ***pattern matching*** permet d'effectuer un **test de type tout en effectuant la conversion** :

```C#
// Standard 
if(n is int)
{
    int i = (int)n;
}

// Pattern matching
if(n is int i)
{
    // i est disponible
}
```

```C#
// Standard
var s = n as string;
if (s != null)
{
    Console.WriteLine(s);
}
	
// Pattern matching
if (n is string s)
{
    Console.WriteLine(s);
}
```
