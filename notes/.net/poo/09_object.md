# *Object*

Le 18-08-2024

Un type pour les gouverner tous.

## Introduction

[MSDN Object](https://docs.microsoft.com/fr-fr/dotnet/api/system.object _blank)

Les types C# héritent tous de `System.Object`, d'alias `object`. 

Cette classe possède des méthodes `virtual`, c'est-à-dire que les développeurs de C# autorisent la réécriture de ces fonctions pour les types dérivés. Exemple : un type `Personne` peut présenter une réécriture de la fonction `ToString()`.

## ToString()

`ToString()` renvoie le **type de l'objet ou la classe en chaîne de caractères**. Cette méthode peut être surchargée. Dans Visual Studio, taper `override` suivi d'un espace pour obtenir l'aide à l'édition.

```C#
public override string ToString()
{
	return base.ToString(); 
	// On ne fait qu'exécuter le code de la méthode de base
}
```

```C#
public override string ToString()
{
	return "Chien";
	// On retourne toujours le même contenu
}
```

Emplois : 

```C#
string toto = uneChose.ToString();
string titi = $"{uneChose} est une chose.";
```

## ReferenceEquals()

`ReferenceEquals()` est une méthode `static`. Elle teste si **deux objets sont identiques en mémoire** dans le *Heap* et retourne une valeur booléenne (elle renvoie `false` pour des types valeurs et n'est alors d'aucune utilité).

```C#
MaClasse c1 = new MaClasse();
MaClasse c2 = new MaClasse();
if(Object.ReferenceEquals(c1, c2))
{
	//---
}
```

## Equals() et GetHashCode()

`Equals()` teste si **une valeur ou objet est identique à une ou un autre**. La comparaison porte sur des types valeurs ou référence. Deux syntaxes sont possibles : à partir d'un objet courant, ou bien à partir de classe `Object`.

```C#
int i = 1;
int j = 1;
i.Equals(j) == true; // true
```

```C#
MaClasse o1 = new MaClasse();
MaClasse o2 = o1;
Object.Equals(o1, o2) == true; // true
```

`Equals()` compare deux objets tout comme `==`. Quelle différence ? 
- Si `==` compare des **valeurs**, alors aucun objet n'est impliqué. Les fonctions sont donc bien distinctes. 
- Si `==` compare des **objets**, alors cela s'effectue sur leur **espace mémoire**. Exemple : deux instances de même classe avec le même contenu occupant deux espaces mémoires différents ; l'opérateur compare deux objets différents et la comparaison renvoie `false`. Ce comportement est le même que `Object.ReferenceEquals()`.

**Mais** par commodité, pour certains types comme `string`, l'opérateur d'égalité `==` est réécrit pour porter sur la **valeur** (et pas sur les objets). 

On peut récupérer la méthode et la déclencher telle que fournie (cela dit, c'est ajouter inutilement un appel de fonction) ou en modifier le comportement.

```C#
public override bool Equals(object obj)
{
	//return base.Equals(obj);
	
	if(obj is Voiture)
	{
		Voiture v = obj as Voiture;
		return true;
	}
	
	return false;
}
```

```C#
voiture.Equals(DateTime.Now); 
```

`Equals()` est liée à `GetHashCode()` car les deux font une vérification. Surcharger l'une implique surcharger l'autre.
- `Equals()` fait une vérification d'un point de vue sémantique ou métier.
- `GetHashCode()` fait une vérification technique pour récupérer une instance sous forme de nombre entier qu'on appelle ***hash***. Ceci peut être utile pour du stockage et des traitement à moindre coût que d'utiliser les objets eux-mêmes. 

Maintenant, on peut utiliser ces deux méthodes d'un point de vue sémantique. Exemple : le *hashCode* pourrait représenter un numéro de série de produit.

```C#
public override int GetHashCode()
{
	//return base.GetHashCode(); 
	return _monNombrePerso;
}
```

Avec des types valeur, la fonction renvoie la valeur. Avec des types référence, la fonction renvoie la référence de l'objet.

En général, on calcule le *hash* à partir d'une chaîne de caractères représentant ce que l'objet a de spécifique et qui est utile à la comparaison. Exemple : comparer deux voitures avec du *hashCode*. Ici, `GetHashCode()` est la méthode de `string` et non un traitement personnel :

```C#
public override int GetHashCode()
{
	return ("Voiture;" +  Modele + ";" + Chevaux).GetHashCode();
}
```

Notes
- Si `Equals()` renvoie `true` lors d'une comparaison entre deux objets, alors les `GetHashCode()` des deux objets doivent renvoyer un *hash* identique.
- Deux objets dont `GetHashCode()` renvoie des valeurs identiques n'implique pas que `Equals()` les considère identiques : en effet, l'algorithme de calcul a pu générer deux *hash* identiques, ce qu'on appelle une **collision**.
- Surcharger ces méthodes implique en général de surcharger les opérateurs `==` et `!=`.

## *Override* d'opérateur de comparaison

Peut-on `override` l'**opérateur de comparaison** de façon à ce qu'il se comporte comme `Equals()` ? Oui, en déclarant une méthode `static` (l'opérateur n'a pas besoin d'instance pour fonctionner) avec le mot-clé `operator` (on veut réécrire un opérateur).

```C#
public static bool operator == (TypeObjet v1, TypeObjet v2)
{
	return v1.Equals(v2);
}
```

Maintenant, on précisera la méthode selon que les opérandes sont tous deux `null`, ou si un d'entre eux est `null`. Or, pour cela, on n'utilisera pas `==` puisqu'on est en train de le redéfinir ; on utilisera `is`.

```C#
public static bool operator == (TypeObjet v1, TypeObjet v2)
{
	if(v1 is null && v2 is null)
	{
		return true; // choix du développeur
	}

	if((v1 is null && !(v2 is null)) || (!(v1 is null) && v2 is null))
	{
		return false; // choix du développeur
	}

	return v1.Equals(v2);
}
```

Selon l'opérateur, il peut être nécessaire de définir la négation. Par exemple, pour l'opérateur d'égalité, il est nécessaire de définir l'opérateur d'inégalité ; mais si on a défini l'égalité, alors il suffit d'en faire la négation.

```C#
public static bool operator !== (TypeObjet v1, TypeObjet v2)
{
	return !(v1 == v2); // on a déjà réécrit l'égalité, donc utilisons-la
}
```

Cette réécriture d'opérateur peut aussi porter sur les opérateurs arithmétiques.

L'`override` d'opérateur apparaît en *IntelliSense*, informant l'utilisateur qu'il ne dispose pas de la version de base (passer le curseur sur l'opérateur pour afficher l'info-bulle).

## Finalize()

`Finalize()`, autrement nommée le **destructeur** ou le **finaliseur**, est une méthode appelée par le *Garbage Collector* lorsque rien ne pointe plus sur l'objet. On l'`override` à souhait également. Sa version modifiée est héritée par les classes dérivées. 

```C#
~NomClasse()
{
	// code
}
```

## GetType()

`GetType()` fournit le type (de type `Type`) d'un objet. Voir le chapitre Polymorphisme.
