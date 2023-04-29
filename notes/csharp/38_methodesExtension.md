# Méthodes d'extension

Le 26-09-2022

Ajouter des méthodes à une classe sans intervenir sur la classe elle-même. [MSDN Méthodes d'extension](https://docs.microsoft.com/fr-fr/dotnet/csharp/programming-guide/classes-and-structs/extension-methods "MSDN Méthodes d'extension")

## Principe

Les ***extension methods*** ajoutent des fonctionnalités à une chose d'un certain type, sans avoir à passer par l'**héritage** ou l'**interface**. Ainsi, on peut **étendre une classe**. Utile, surtout lorsque la classe n'est pas éditable directement. Cet ajout est relatif au contexte de l'application.

Ces méthodes sont écrites dans une classe spécifique, non générique, et `static`. Ce qui les distingue d'une méthode `static` ordinaire est l'usage du mot-clé `this` dans le paramètre qui cible le type à étendre. 

Pourquoi `static` ? Car la méthode étend le comportement d'une classe sans toucher à ses instances et cela ne peut s'effectuer autrement.

## Exemple

On se propose d'étendre la classe `Transform` d'Unity (inaccessible, dans le code source) avec une nouvelle méthode de remise à zéro des position, rotation et échelle : 
- `this` cible le type `Transform` et le paramètre est nommé arbitrairement « trans »,
- pour plus de paramètres, les ajouter séparés par des virgules, sans `this`,
- **le paramètre ciblant la classe à étendre n'est pas utilisé lors de l'appel de fonction**.
```
public static class Extension
{
	public static void ResetTransformations(this Transform trans)
	{
		trans.position = Vector3.zero;
		trans.localRotation = Quaternion.identity;
		trans.localScale = Vector3.one;
	}
	
	public static double Additionner(this double a, double b)
	{
		return a + b;
	}
}
```

On appelle avec l'opérateur *dot*.
```
transform.ResetTransformations();
```

Visual Studio affiche une icône spécifique (cube flèche bas) pour ce genre de méthode d'extension lorsqu'on passe le curseur sur le nom de la méthode.

Noter qu'on peut toujours appeler la classe et sa méthode directement.
```
double a = 10.35;
double b = 24.65;
Console.WriteLine(Extension.Additionner(a, b));
Console.WriteLine(a.Additionner(b));
```

