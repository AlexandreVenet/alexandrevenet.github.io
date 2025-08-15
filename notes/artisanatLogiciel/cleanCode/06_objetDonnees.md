# Objets, données

Le 14-08-2025

Notes du chapitre 6

## Abstraction

L'**objet** doit être considéré comme la réalisation d'abstractions. Il n'est pas important de savoir comment la classe de l'objet implémente ces abstractions (encapsulation) ; il est important de savoir ce que sont ces abstractions, pour pouvoir les manipuler librement par ailleurs. 

Par conséquent, préférer une classe générale dont les fonctions ne sont pas que des enveloppes pour des champs (comme les *getter* et *setter* par exemple).

```Java
public class Vehicule 
{
	public double obtenirCapaciteReservoir();
	public double obtenirQuantiteCarburant();
}

// OK mais ces fonctions pour quoi faire ?
public class Vehicule 
{
	// Si nécessaire, garder
	private double obtenirCapaciteReservoir();
	private double obtenirQuantiteCarburant();
	
	public double obtenirPourcentageCarburantRestant();
}
```

## Asymétrie données/objet

Deux concepts s'opposent en POO : la **procéduralité** et l'**objet**.

En procéduralité, on dispose de classes qui sont des **structures de données** et d'une classe de **comportement**. La classe de comportement effectue des opérations à partir des classes de données : pour opérer de façon générale, une fonction de cette classe doit prendre en argument un type général puis en tester le type particulier.

```Java
public class Square 
{
	public Point topLeft;
	public double side;
}

public class Rectangle 
{
	public Point topLeft;
	public double height;
	public double width;
}

public class Circle 
{
	public Point center;
	public double radius;
}

public class Geometry 
{
	public final double PI = 3.141592653589793;
	public double GetArea(Object shape) throws NoSuchShapeException
	{
		if (shape instanceof Square) 
		{
			Square s = (Square)shape;
			return s.side * s.side;
		}
		else if (shape instanceof Rectangle) 
		{
			Rectangle r = (Rectangle)shape;
			return r.height * r.width;
		}
		else if (shape instanceof Circle) 
		{
			Circle c = (Circle)shape;
			return PI * c.radius * c.radius;
		}
		throw new NoSuchShapeException();
	}
}
```

En objet, chaque classe spécifique hérite d'une classe générale. La classe générale fournit des méthodes que les classes spécifiques réécrivent.

```Java
public class Square implements Shape 
{
	private Point topLeft;
	private double side;
	public double GetArea() 
	{
		return side * side;
	}
}

public class Rectangle implements Shape 
{
	private Point topLeft;
	private double height;
	private double width;
	public double GetArea() 
	{
		return height * width;
	}
}

public class Circle implements Shape 
{
	private Point center;
	private double radius;
	public final double PI = 3.141592653589793;
	public double GetArea() 
	{
		return PI * radius * radius;
	}
}
```

Les deux ont leurs avantages et inconvénients.

|Code|Avantage|Inconvénient|
|-|-|-|
|Procédural|Facilité d'ajout de nouvelles fonctions sans modifier les structures de données.|Difficulté d'ajouter de nouvelles structures de données car toutes les fonctions doivent être modifiées.|
|Objet|Facilité d'ajouter de nouvelles classes sans modifier les fonctions existantes.|Difficulté d'ajouter de nouvelles fonctions car toute les classes doivent être modifiées.|

Par conséquent, «le tout objet » est un *mythe* (souligné par l'auteur) car il faut toujours réfléchir à l'approche la plus adaptée aux besoins.

Autre conséquence : on ne peut pas mélanger procédural et objet sans générer de la confusion. En effet, l'objet (comportement) contient alors des données exposées comme des champs publics, des *getters/setters* (structure de données). Préférer alors un objet utilisant une structure de données ou bien un objet encapsulant (cachant) ses données.

## Objets de transfert de données (DTO)

Les objets qui ne sont que des conteneurs de données sont nommés des ***Data Transfer Objects (DTO)*** : objets de transfert de données. Exemple : une classe de correspondance (*mapping*) entre base de données et le programme.

On peut ajouter à ces DTO des fonctions comme `save()` ou `find()`, ce qui en fait des DTO de type ***Active Record*** ou enregistrements actifs. Exemple : la classe de *mapping* proposant la fonction d'insérer des données dans la base de données. 

Or, il faut veiller à ce que cette classe de transfert de données reste une classe technique (pas de code métier), sans quoi les genres seraient mélangés et la classe confuse.
