# Delegate

Le 19-08-2024

Utiliser une variable comme si c'était une méthode. [MSDN Delegate](https://docs.microsoft.com/fr-fr/dotnet/csharp/delegate-class _blank)

## Principe

`delegate` en C# est un **type référence** ciblant/encapsulant une **méthode** pour un objet de ce type. C'est une classe qui définit une signature. 

Cela fournit un moyen de gérer des **fonctions *callbacks***, des **fonctions anonymes**, des **expressions lambda** et de **programmer des événements**. 

On déclare un type `delegate` comme une méthode sans corps, dans l'espace global de la classe ou en dehors (on définit effectivement un type `delegate` pour encapsuler telle méthode), et en ajoutant le mot-clé idoine. Une fois fait, on peut déclarer une variable de ce type. Alors, on peut déclarer une fonction qui, **si elle respecte la signature**, sera appelée dans la variable.

Une bonne pratique est de toujours tester si le `delegate` est non `null` car sinon il y a erreur bloquante.

Microsoft propose des types plus pratiques à utiliser et, par conséquent, on ne restera pas sur le type `delegate`. Il suffit seulement ici de retenir le principe.

## Exemples

Exemple dans Unity : on déclare un `delegate` dans la classe de composant.

```C#
public class DemoScript : MonoBehaviour
{
	public delegate void ChangeColor(Color couleur); // signature de méthode de type delegate
	public ChangeColor onColorChange; // une instance du type précédent

	public delegate void OnComplete(); // autre exemple 
	public OnComplete onComplete;

	void Start()
	{
		onColorChange = UpdateColor; // attacher une méthode de même signature
		//onColorChange = Dire; // erreur : non respect de signature
	
		if(onColorChange != null) // si non null
			onColorChange(Color.green); // appel comme une fonction
	
		// On peut utiliser onColorChange (attacher une autre méthode, appel) autant de fois qu'on le désire
		// Ainsi, un seul delegate peut servir à lancer des fonctions différentes, du moment que la signature est respectée
	
		onComplete = Dire; // autre exemple
		if(onComplete != null)
			onComplete();
	}
	
	public void UpdateColor(Color couleur) // méthode respectant la signature du delegate
	{
		Debug.Log("Changer la couleur pour : " + couleur.ToString());
	}
	
	public void Dire() // autre exemple
	{
		Debug.Log("Je fais quelque chose.");
	}
}
```

Autre exemple :

```C#
public delegate bool IsOver();
public IsOver m_isOver = () => true; // ce que fait la fonction
	
private void TriggerEvent()
{
	if(m_isOver != null) m_isOver();
	
	// Autre syntaxe : m_isOver?.Invoke();
}
```

## Multicast

`delegate` prend en charge le ***multicast***, c'est-à-dire le **déclenchement de plusieurs méthodes à la fois**. On peut ajouter ou enlever des méthodes à la pile générée. Attention : le ***Garbage collector* ne supprime aucune des classes liées**. Donc, penser à supprimer les abonnements lorsqu'ils ne sont plus utilisés pour éviter les fuites de mémoire.

```C#
delegate void Toto();
Toto maVar;
	
void OnEnable()
{
	// Ajouter
	maVar += Dire1;
	maVar += Dire2;
	maVar += Dire3;
	
	// Lancer
	maVar?.Invoke();
}
	
void OnDisable()
{
	// Enlever
	maVar -= Dire3;
	maVar -= Dire2;
	maVar -= Dire1;
}
	
void Dire1() 
{
	Debug.Log("Je dis 1.");
}	
void Dire2() 
{
	Debug.Log("Allez, 2 !");
}	
void Dire3() 
{
	Debug.Log("Le chiffre 3.");
}
```

## Générique

On peut déclarer un `delegate` de type générique. Le principe reste le même (définir des méthodes qui respectent la signature), ce à quoi on ajoute la déclaration d'un type.

```C#
public delegate T Plus<T>(T a, T b);
	
class MaClasse
{
	Plus<int> addition = Additionner;
	Console.WriteLine(addition(1,2));
	
	Plus<string> concatenation = Concatener;
	Console.WriteLine(concatenation("Toto","Zouzou"));
	
	public int Additionner(int a, int b)
	{
		return a + b;
	}
	
	public int Concatener(string a, string b)
	{
		return a + b;
	}
}
```

## Paramètre de fonction

Un `delegate` peut être utilisé en **paramètre de fonction**, ceci pour diversifier les traitements au sein de la fonction.

Exemple **avec renvoi de valeur**.

```C#
internal class Calculer
{
	public delegate double Test(double a, double b);
	public double Tester(double a, double b, Test methode)
	{
		return methode(a, b);
	}
}
```

```C#
// Usage 1
	
Calculer x = new();
	
double Addition(double a, double b)
{
	return a + b;
}
	
double valeur = x.Tester(1,2,Addition);
	
Console.WriteLine($"valeur = {valeur}"); // 3
```

```C#
// Usage 2
	
Calculer x = new();
	
double toto = x.Tester(1,2,(a,b)=>
{
	return a - b;
});
	
Console.WriteLine($"toto = {toto}"); // -1
```

Exemple **sans renvoi de valeur**.

```C#
internal class Calculer
{
	public delegate void Test(string str);
	public void Tester(string str, Test methode)
	{
		method(str);
	}
}
```

```C#
// Usage 1
	
Calculer x = new();
	
void Afficher(string s) { Console.WriteLine(s); }
	
x.Tester("Bonjour !", Afficher); // Bonjour !
```

```C#
// Usage 2
	
Calculer x = new();
	
x.Tester("Bonjour !", (v) => 
{
	string sub = v.Substring(0,3);
	Console.WriteLine(sub); // Bon
});
```
