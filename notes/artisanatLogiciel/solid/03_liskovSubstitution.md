# Substitution de Liskov

Le 16-08-2025

Interchanger type et sous-type sans rien casser.

## Argument

Un **sous-type** est :
- un type dérivé d'un type de base,
- ou un type implémentant une interface.

Le programme doit fonctionner lorsqu'une instance d'un type est remplacée par une instance d'un sous-type.

## Exemple 1

Voyons une application Console C# qui gère des oiseaux. Les oiseaux volent mais parmi les oiseaux l'autruche ne peut pas voler.

Voici une première approche pour représenter ces concepts.

```C#
// Classe de base
public class Oiseau
{
	public virtual void Voler()
	{
		Console.WriteLine("Je vole.");
	}
}

// Classe dérivée (sous-type)
public class Autruche : Oiseau
{
	public override void Voler()
	{
		throw new InvalidOperationException("L'autruche ne peut pas voler !");
	}
}
```
```C#
// Usage : une méthode pour faire voler un oiseau
public void FaireVolerOiseau(Oiseau oiseau)
{
	oiseau.Voler();
}

var autruche = new Autruche();
FaireVolerOiseau(autruche); 
// Remplacement du type Oiseau par le sous-type Autruche
// Exception à l'exécution
```

Si tout fonctionne comme attendu, il reste que le type `Autruche` ne peut pas remplacer `Oiseau` ; on ne peut pas substituer une autruche à un oiseau pour la faire voler.

Comment résoudre ce problème ? Passer par une classe abstraite ne changerait rien car la relation d'héritage est la même qu'avec des classes concrètes. Mais on peut utiliser des interfaces.

```C#
public interface IOiseau
{
	void Mange();
}

public interface IOiseauVolant : IOiseau
{
	void Vole();
}
```
```C#
public class Moineau : IOiseauVolant
{
	public void Mange() => Console.WriteLine("Le moineau mange.");
	public void Vole() => Console.WriteLine("Le moineau vole.");
}

public class Autruche : IOiseau
{
	public void Mange() => Console.WriteLine("L'autruche mange.");
	// L'autruche ne vole pas.
}
```
```C#
// Usage : une méthode pour faire voler un oiseau qui en a la capacité
public void FaireVolerOiseau(IOiseauVolant oiseau)
{
	oiseau.Voler();
}
```
```C# 
// Substitution correcte
Moineau moineau = new Moineau();
IOiseau moineauOiseau = moineau;
IOiseauVolant moineauVolant = moineau; 
FaireVolerOiseau(moineauVolant); 

// Substitution incorrecte
var autruche = new Autruche();
IOiseau autrucheOiseau = autruche;
IOiseauVolant autrucheVolante = autruche; // Exception à la compilation
FaireVolerOiseau(autruche); // Exception à la compilation
```
 
## Exemple 2

Jouons avec le rectangle et le carré. On admet qu'un carré est un type spécifique de rectangle où largeur et hauteur sont égales. On veut calculer l'aire.

```C#
public class Rectangle
{
	public virtual int Largeur {get; set;}
	public virtual int Hauteur {get; set;}
	
	public int CalculerAire () => Largeur * Hauteur;
}

public class Carre : Rectangle
{
	public override int Largeur
	{
		set
		{
			base.Largeur = value;
			base.Hauteur = value; // on force les deux
		}
	}

	public override int Hauteur
	{
		set
		{
			base.Largeur = value;
			base.Hauteur = value; // on force les deux
		}
	}
}
```
```C#
// Usage
public void AfficherAire(Rectangle rectangle)
{
    rectangle.Largeur = 5;
    rectangle.Hauteur = 10;
    Console.WriteLine(rectangle.CalculerAire());
}

AfficherAire(new Rectangle()); // 50
AfficherAire(new Carre()); // 100
```

Tout fonctionne comme attendu mais le comportement n'est pas celui qui est décrit dans le code : 
- j'utilise un carré avec une largeur de 5 et une hauteur de 10, 
- or, un carré hérite d'un rectangle,
- donc j'utilise un rectangle.

L'argument est discutable car ma prémisse majeure stipule que j'ai posé un carré ce qui, par conséquent, invalide l'utilisation de largeur et hauteur différentes. Mais ce n'est pas le sujet. 

Le sujest est technique : 
- lorsque je passe un `Carre` à la fonction, je m'attends à un comportement de `Rectangle`, donc que les valeurs de largeur et hauteur soient respectées,
- or, le résultat n'est pas celui attendu pour les valeurs utilisées,
- donc, le comportement du programme change sans que l'appelant ne s'en rende compte, sans que la logique de l'appelant ait changé.

Le problème vient du fait que `Carre` ne peut pas hériter de `Rectangle` car on ne peut pas modifier la hauteur et la largeur indépendamment.

Comment résoudre le problème ? 
- On peut considérer que dans le carré, puisque largeur et hauteur sont égales, alors elles sont indifférenciées, inidentifiables, et que par conséquent il faudrait mieux parler de côté. 
- Pour le rectangle, rien ne change. 
- Enfin, au choix : 
	- lier les deux types à une entité commune, une interface ou une classe abstraite,
	- ou bien gérer `Carre` et `Rectangle` comme deux types distincts sans point commun ; le présent exemple sert alors de cas limite.

Voyons le cas de l'interface commune.

```C#
public abstract class Forme
{
	public abstract int CalculerAire();
}
```
```C#
public class Rectangle : Forme
{
	public int Largeur { get; set; }
	public int Hauteur { get; set; }

	public override int CalculerAire() => Largeur * Hauteur;
}


public class Carre : Forme
{
	public int Cote { get; set; }

	public override int CalculerAire() => Cote * Cote;
}
```
```C#
// Usage
public void AfficherAire(Forme forme)
{
	Console.WriteLine(forme.CalculerAire());
}

var rect = new Rectangle { Largeur = 5, Hauteur = 10 };
var carre = new Carre { Cote = 5 };

AfficherAire(rect);   // 50
AfficherAire(carre);  // 25
```
