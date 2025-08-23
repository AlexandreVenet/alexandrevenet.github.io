# Exceptions

Le 23-08-2025

Une exception représente une erreur, anomalie, qui se produit au cours de l'exécution de l'application.

## Introduction

Source : [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.exception _blank)

Les anomalies font l'objet d'**exceptions**. On dit que telle instruction « *a levé une exception* ». La levée d'exception bloque l'exécution du programme. 

Les **causes** de levée d'exception sont variées et la résolution dépend de la nature de l'exception levée : 
- mauvaise **syntaxe** : erreur de saisie, corriger ce qui est écrit (ex : `maMethode(')`),
- mauvais **usage** : comprendre le fonctionnement et coder selon les contraintes (ex : accéder à un index en dehors des limites d'un tableau),
- manque de **contrôle** : poser des conditions (ex : faire une requête serveur alors que l'utilisateur coupe son accès internet).

Une exception est une **obligation faite au développeur pour traiter une erreur** (sinon, blocage). Qu'une méthode retourne simplement un code d'erreur ne constitue pas une telle obligation car le développeur peut décider de ne pas le traiter.

Une exception a deux aspects : **émission** et **traitement**.
- Émission : `throw new TypeException()`.
- Traitement : `try... catch`. 

## Emission rapide

Une façon simple et rapide de lever une exception à l'endroit désiré dans du code est d'utiliser une surcharge du constructeur de la classe `Exception` ou d'un type dérivé plus spécifique.

```C#
throw new Exception("Mon texte d'erreur.");
```
```C#
throw new ArgumentOutOfRangeException(nameof(p), "Pas bon, ça.");
```

## Test et émission rapides

Imaginons le cas suivant : tester si une valeur est `null` et si c'est le cas, alors lever `NullReferenceException`. Ce genre de cas est fréquent en programmation, devient vite trivial, ajoute du code similaire rendant la lecture difficile... C# fournit des méthodes prêtes à l'emploi pour faciliter la lecture et l'implémentation de ces vérifications ordinaires grâce au type `ArgumentException`. Comparer :

```C#
public void Test1(string valeur)
{
	if(valeur == null)
	{
		throw new ArgumentNullException(nameof(valeur), "Le paramètre valeur ne peut pas être null.");
	}
	Console.WriteLine("OK : " + valeur);
}

public void Test1b(string valeur)
{
	ArgumentException.ThrowIfNullOrEmpty(valeur, "Le paramètre valeur ne peut pas être null.");
	Console.WriteLine("OK : " + valeur);
}
```
```C#
public void Test2 (int nombre)
{
	//if(nombre <= 0 || nombre > 1_000)
	// Ou bien avec la syntaxe *pattern matching* :
	if(nombre is < 0 or > 1_000)
	{
		throw new ArgumentOutOfRangeException(nameof(nombre), "Le paramètre nombre n'est pas ]0, 1000[.");
	}
	Console.WriteLine("OK : " + nombre);
}

public void Test2b(int nombre)
{
	ArgumentOutOfRangeException.ThrowIfNegative(nombre, nameof(nombre));
	ArgumentOutOfRangeException.ThrowIfGreaterThan(nombre, 1_000, nameof(nombre));
	Console.WriteLine("OK : " + nombre);
}
```

## Traitement : try...catch

Dans le cas d'un **contrôle**, on peut utiliser `try...catch`. Si une instruction ne fonctionne pas dans `try`, le code de `catch` sera utilisé. `catch` interrompt le flux du programme. Laisser `catch` vide est déconseillé car on ne sait rien de l'erreur qui peut survenir. 

Exemple : un code permettant la division par zéro va ici déclencher l'instruction `catch`.

```C#
try
{
	Console.WriteLine(v1 / v2);
}
catch
{
	Console.WriteLine("Erreur");
}
```

En développement, les outils de levée d'exception fournissent des informations utiles, en particulier le **type** de l'erreur. Par exemple dans le cas de la division par zéro, c'est l'erreur `DivideByZeroException`. Ceci peut être utilisé dans le `catch`. Si on souhaite savoir si une exception d'un certain type est lancée et cela sans avoir d'autres informations sur cette exception, alors on peut ne préciser que le **type** de l'exception dans le `catch` (sans passer par une variable).

```C#
try
{
	Console.WriteLine(v1 / v2);
}
catch(DivideByZeroException)
{
	Console.WriteLine("Impossible de diviser par zéro");
}
```

Une bonne pratique consiste à toujours fournir dans un `catch` non pas juste le type de l'exception mais une **instance** de cette exception. Cela vaut par exemple pour le dernier `catch` pour lequel on va récupérer un objet de type `Exception` (le type le plus général d'exception). Cette instance fournit des propriétés  comme `Message`, `StackTrace`.

L'instruction peut présenter **plusieurs** `catch`.  
1. L'ordre a une importance : les `catch` traitent les exceptions de la plus spécifique à la plus générale.
2. La succession de `catch` a pour objectif de couvrir plusieurs exceptions qui peuvent survenir quant à la même chose ; on parle de **filtres d'exception**.
3. Impossible d'ajouter des `catch` pour le même type (sauf avec `when`, voir paragraphe suivant).

```C#
try
{
	Console.WriteLine(v1 / v2);
}
catch(DivideByZeroException) // traitement spécifique
{
	Console.WriteLine("Impossible de diviser par zéro.");
}
catch // traitement le plus général, ou bien : catch(Exception e)
{
	Console.WriteLine("Une erreur est survenue");
}
```

```C#
Console.Write("Entrer un nombre diviseur de 100.");
	
try
{
    int diviseur = int.Parse(Console.ReadLine());
	
    int resultat = 100 / diviseur;
	
    Console.WriteLine($"100 / {diviseur} = {resultat}");
}
catch(DivideByZeroException e)
{
    Console.Write("Je ne peux pas diviser par 0.");
}
catch(InvalidOperationException e)
{
    Console.Write("L'opération est invalide.");
}
catch(FormatException e)
{
    Console.Write("La valeur entrée n'a pas le format attendu.");
}
catch(Exception e)
{
    Console.Write("Une erreur est survenue mais je ne sais pas laquelle !");
}
```

Noter que `catch` et `catch(Exception e)` font la même chose. 
- C# interdit l'utilisation des deux pour le même `try...catch`.
- Ces deux blocs se posent en dernier, sinon cela lève une exception à la compilation.

`try...catch` possède aussi une clause optionelle `finally` qui est **déclenchée quoi qu'il arrive**, **après tout ce qui précède**, **qu'il y ait eu exception ou non**. Elle est utile par exemple pour effectuer du nettoyage de données, dans l'objet ayant levé l'exception.

```C#
MonType x = null;
	
try
{
	// On manipule x...
}
catch(Exception e)
{
	Console.WriteLine("Exception : " + e.Message);
}
finally
{
	Console.WriteLine("L'instance x du type MonType est valide.");
}
```

On peut utiliser un `try...catch` **sans se concentrer sur la notion d'erreur** et préférer que le programme se poursuive **sans nuire à l'expérience utilisateur**. Par exemple : si un `int.Parse()` échoue dans `try`, affecter une valeur par défaut à la variable dans `catch`. Néanmoins, Microsoft ne conseille pas cette utilisation car c'est détourner le **concept** d'exception pour gérer un cas nominal.

Si le type d'exception dans le `catch` est trop général, alors il y a risque de perdre de la précision sur l'erreur. Par exemple, utiliser le type `Exception` conduit à récupérer la classe de base des exceptions.

## Même type, entité différente

Avec le mot-clé `when`, il est possible de poser des `catch` sur des types identiques mais des paramètres différents, dans une méthode par exemple.

```C#
public class Personne
{
	public Personne(string prenom, string nom)
	{
		ArgumentException.ThrowIfNullOrEmpty(prenom, nameof(prenom));
		ArgumentException.ThrowIfNullOrEmpty(nom, nameof(nom)); 
	}
}

public void Test()
{
	try
	{
		Personne p = new("Toto", "", 3);
	}
	catch (ArgumentException e) when (e.ParamName.Equals("prenom"))
	{
		Console.Error.WriteLine("prenom : {0}", e.Message);
	}
	catch (ArgumentException e) when (e.ParamName.Equals("nom"))
	{
		Console.Error.WriteLine("nom : {0}", e.Message);
	}
}
```

## Emission d'exceptions personnelles

On peut écrire des **exceptions personnalisées**. En effet, les types d'erreurs sont des classes et rien n'empêche de créer les nôtres. La classe des exceptions est `System.Exception` et, par convention, on écrit « Exception » en fin de nom.

```C#
class NbreIdentiqueException : Exception
{
	
}
```

Imaginons une méthode de calcul dans laquelle on souhaite effectuer l'addition de deux nombres seulement s'ils sont différents. Si les nombres sont en identité, alors on veut **lancer** une exception du type de celle qu'on a codée précédemment. Pour cela on utilise le mot-clé `throw`.

```C#
private int Addition(int v1, int v2)
{
	if(v1 == v2)
	{
		// Lancer l'exception (instance de classe)
		throw new NbreIdentiqueException();
	}
	return v1 + v2;
}
```

Maintenant, ceci n'est pas suffisant car il faut encore tester avec un `try...catch` cette méthode pour prendre en charge l'erreur éventuelle. En effet, si on ne fait pas cela, l'exception serait envoyée mais non traitée.

```C#
try
{
	Console.WriteLine(Addition(v1,v2));
}
catch(NbreIdentiqueException)
{
	// Cas de l'identité des deux nombres
}
catch
{
	// Cas autre
}
```

Ceci est très bien mais on peut préciser l'exception par un **renvoi de valeur**. Reprenons l'exception personnelle dans ce sens :

```C#
class NbreIdentiqueException : Exception
{
	public int Valeur {get; set;}
}
```

Modifions la méthode d'addition qui renvoie une exception en cas de l'identité des deux nombres :

```C#
private int Addition(int v1,int v2)
{
	if(v1 == v2)
	{
		var monException = new nNbreIdentiqueException();
		monException.Valeur = v1; // ou v2, peu importe
		throw monException;
	}
	return v1 + v2;
}
```

Changeons le `try...catch` pour récupérer l'exception.

```C#
try
{
	Console.WriteLine(Addition(v1,v2));
}
catch(NbreIdentiqueException e)
{
	Console.WriteLine("Nombres identiques de valeur " + e.Valeur);
}
catch()
{
	Console.WriteLine("erreur");
}
```

Enfin, appliquons la bonne pratique d'utiliser une instance du type de l'exception. 

```C#
try
{
	Console.WriteLine(Addition(v1,v2));
}
catch(NbreIdentiqueException e)
{
	Console.WriteLine("Nombres identiques de valeur " + e.Valeur);
}
catch(Exception e)
{
	Console.WriteLine("erreur" + e); 
}
```

De cette manière, on teste une instruction et si elle fonctionne, le programme se poursuit. Si l'exception métier, spécifique, est levée, alors le programme est interrompu et on s'informe de la nature de l'anomalie. Enfin, dans tout autre cas, on récupère l'exception que l'on peut explorer.

Dans la classe de notre exception, on peut ajouter autant de membres que nécessaires. Par exemple : plusieurs constructeurs, une méthode particulière...

Allez, un dernier exemple pour le plaisir, avec l'exception native `DivideByZeroException`.

```C#
internal class ExceptionTest
{
	public static double SafeDivision(double a, double b)
	{
		if (b == 0)
		{
			throw new DivideByZeroException("Attention, vous tentez une division par zéro.");
		}
		
		return a / b;
	}
}
```

```C#
double dividende = 1;
double diviseur = 0;
double resultat;
	
try
{
    resultat = ExceptionTest.SafeDivision(dividende, diviseur);
    Console.WriteLine($"{dividende} divisé par {diviseur} est égal à {resultat}.");
}
catch (DivideByZeroException e)
{
    Console.WriteLine(e.Message);
}
finally
{
    Console.WriteLine("Je m'exécute quelque soit l'issue du Try/Catch");
}
```



## Cas nominal

C# fournit aussi des méthodes prêtes à l'emploi pour gérer le flux du programme lorsque celui-ci ne doit pas s'interrompre. Par exemple : au lieu de faire `int.Parse()` sur une chaîne de caractères quelle qu'elle soit, ce qui génère une erreur lorsque cela échoue, utiliser plutôt `int.TryParse()` dans une condition ou un `try...`.

Si l'exception n'a pas d'importance, on peut simplement verrouiller des valeurs avec un test.

```C#
if(i < 0)
{
	// ...
}
```

On peut, par exemple avec un programme Console, boucler tant que la valeur entrée n'est pas celle attendue.

```C#
double a = 0;
while (!double.TryParse(Console.ReadLine(), out a))
{
	Console.WriteLine("Veuillez entrer un nombre.");
}
```

## Instruction *using*

`using` utilisé avec les classes implémentant `IDisposable` peut remplacer `try` et `finally`... mais il ne remplace pas `catch`. Par conséquent :
- si une exception est lancée dans le bloc `using` et qu'elle n'est pas interceptée dans un `catch`, alors le programme s'arrête, 
- il peut arriver que le programme s'arrête **avant** que le flux de données soit fermé ; donc l'accès est toujours ouvert,
- donc, il convient de placer le bloc dans un `try...catch`.

```C#
try
{
	using(Test t = new Test()) // ouverture de flux
	{
		t.Methode();
	} // fermeture par lancement de Dispose()
}
catch(Exception e)
{
	Console.WriteLine("Exception" + e.Message);
}
finally
{
	Console.WriteLine("Finally");
}
```

Il est aussi possible d'utiliser le `try...catch` dans `using` :

```C#
using(Test t = new Test())
{
	try
	{
		t.Methode();
	}
	catch(Exception e)
	{
		Console.WriteLine("Exception" + e.Message);
	}
	finally
	{
		Console.WriteLine("Finally");
	}
}
```

## Hiérarchie des traitements

Imaginons le cas suivant.
- Une classe A a une méthode qui envoie une exception si erreur.
- Une classe B utilise une instance de A et a une méthode qui traite la méthode de A (avec un `try... catch`).
- Une classe C utilise une instance de B et traite la méthode de B (`try... catch` aussi). 

Si erreur, en général le *CLR* remonte dans la **pile des appels** qui ont conduit à l'exécution de la méthode (qui a levé l'exception) et cherche un traitement de l'exception. Si aucune capture n'est faite, alors blocage. Les exceptions contiennent une propriété `StackTrace` qui fournit la chaîne des méthodes impliquées dans la pile des appels.

Ici, le premier traitement (dans la classe B) peut être relayé au traitement de la classe C (niveau d'appel précédent). Pour cela, dans le `catch` de la méthode B, on écrit simplement : `throw;`.

```C#
try
{
	// lancement de la méthode de A
}
catch(Exception e)
{
	throw; // renvoie au traitement try...catch de niveau supérieur (dans C)
}
```
