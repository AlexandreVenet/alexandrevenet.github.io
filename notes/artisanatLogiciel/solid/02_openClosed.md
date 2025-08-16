# Ouvert/Fermé

Le 16-08-2025

Fermer à la modification, ouvrir à l'extension.

## Argument

Une entité doit être fermée à la modification mais ouverte à l'extension. Grâce à l'héritage, il s'agit de pouvoir étendre des comportements à partir d'une entité préservée du changement. 

Pourquoi ce principe ? Diminuer l'interdépendance des entités, apporter plus de souplesse pour les évolutions du programme.

## Exemple

Faisons de la géométrie avec une application Console .NET C#. On veut calculer la surface de différentes figures géométriques : cercle, rectangle. Or, le calcul de la surface est différent pour chacune. 

Si on crée une entité concrète par figure, sans point commun, on ne pourra pas faire de traitement de lots (par exemple, calculer la surface de plusieurs figures quelle que soit leur nature). Donc, il vaut mieux poser une abstraction pour une figure, dont on va tirer des types concrets de cercle, de rectangle.

Or, cette abstraction : classe ou interface ? À première vue, on ne veut que calculer la surface donc on peut opter pour une interface. 

```C#
public interface IFigureGeometrique
{
	double CalculerSurface();
}
```
```C#
public class Cercle : IFigureGeometrique
{
	public double Rayon { get; set; }
	public double CalculerSurface() => Math.PI * Rayon * Rayon;
}

public class Rectangle : IFigureGeometrique
{
	public double Largeur { get; set; }
	public double Hauteur { get; set; }
	public double CalculerSurface() => Largeur * Hauteur;
}
```
```C#
// Usage : on veut calculer la surface totale de toutes les figures
var figures = new List<IFigureGeometrique>
{
    new Cercle { Rayon = 5 },
    new Rectangle { Largeur = 3, Hauteur = 4 }
};

// Avec LINQ
var totalSurfaces = figures.Sum(figure => figure.CalculerSurface());

// Sans LINQ
double total = 0;
foreach (var figure in figures)
{
	total += figure.CalculerSurface();
}
```

Le programme est ouvert à l'extension et fermé à la modification car ajouter une nouvelle figure géométrique consiste à créer une nouvelle entité sans modifier l'abstraction.

Maintenant, imaginons une clientèle matheuse qui souhaite ajouter aux figures géométriques une couleur et une fonction de dessin. Que faire ?
- Dans la même direction que ce qui précède, créer d'autres interfaces représentant une notion différente à chaque fois (`IColoree`, `IDessinable`...).
- Ou bien préférer à l'interface une classe abstraite qui expose les membres utiles (couleur, dessiner...). La classe abstraite occupe le même niveau d'abstraction d'une interface car ne peut pas être utilisée concrètement.

Comment choisir ? 
- L'interface si on souhaite un rôle (par exemple, « a une surface »).
- La classe si on souhaite une hiérarchie (par exemple « est une figure géométrique »). 
- Selon le traitement par lot : par rôle (interface), par nature (classe).
- Selon la flexibilité : précision, création modulaire (interface), structure stricte (classe).
- ...
- Or, la question du choix est résolue avec le principe de ségrégation des interfaces : les entités n'ont pas à dépendre de méthodes dont elles n'ont pas besoin. Donc, si je manipule dans le même programmes toute sorte de figures  géométriques colorées ou non, dessinables ou non, alors je ne dois utiliser que des interfaces.

```C#
public interface IFigureGeometrique
{
	double CalculerSurface();
}

public interface IDessinable
{
	void Dessiner();
}

public interface IColoree
{
	string Couleur { get; set; }
	// La classe concrète s'engagera à avoir une propriété de couleur
}
```
```C#
public abstract class FigureGeometrique
{
	public abstract double CalculerSurface();
	// Comportement requis

	public virtual void Dessiner()
	{
		Console.WriteLine("Je dessine une forme générique.");
	}
	// Dessiner() peut être surchargée mais les classes dérivées n'y sont pas obligées
	
	public string Color { get; set; }
	// Une figure a une couleur
}
```
