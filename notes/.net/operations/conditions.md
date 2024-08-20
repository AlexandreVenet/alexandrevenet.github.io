# Conditions

Le 18-08-2024

Tester une valeur.

## Introduction

Une **condition** ou **instruction conditionnelle** fait partie de ce qu'on appelle la **logique de décision** : c'est la modification du chemin d'exécution de l'application en fonction de la valeur d'une expression.

Les instructions conditionnelles sont des **structures de contrôle**. Ce sont des tests pour effectuer ou non une portion de code. On utilise :
- `if...else if...else`,
- `switch`,
- `x ? y : z` instruction ternaire.

Les conditions ne peuvent apparaître que dans le **corps d'une méthode**.

Les conditions peuvent être **imbriquées** selon les besoins.

Elles peuvent être utilisées pour **assigner une valeur booléenne**, résultat du test, à une variable.

## If

L'instruction `if` permet de tester des **valeurs** ou d'effectuer des **comparaisons**.

```C#
int monAge = 18; 
	
if(monAge == 18)
{
	Console.WriteLine("Vous avez : " + monAge + " ans.");
}
else if(monAge < 18)
{
	Console.WriteLine("Vous n'avez pas encore" + monAge + " ans");
}
else
{
	Console.WriteLine("Vous avez plus de " + monAge + " ans");
}
```

L'opérateur de négation logique ou opérateur *NOT* `!` permet de tester la **négation**, que l'expression est fausse : 

```C#
bool isWatching = false;
	
if(!isWatching)
	isWatching = true;
	
if(isWatching != true)
	isWatching = true;
	
if(isWatching)
	Console.WriteLine("Est en train de regarder");
```

## Switch

`switch` permet de **tester les valeurs d'une variable**. 

`break` permet d'arrêter le test ; si absent, les tests sont combinés (équivalent du OU inclusif) jusqu'au prochain. 

L'instruction `default` (équivalent au `else`) est optionnelle.

```C#
int nombre = 2; 
	
switch(nombre)
{
	case 2 :
		Console.WriteLine("J'aime le nombre 2.");
		break;
	case 4 :
	case 6 :
		Console.WriteLine("Je n'aime pas les nombres 4 et 6."); 
		break;
	default : 
		Console.WriteLine("Ce nombre m'est indifférent.");
		break;
}
```

Utiliser `when` pour affiner les tests. Les instructions C# sont disponibles pour les types renseignés.

```C#
int num = 12;
	
switch (num)
{
	case > 12:
		break;
	case int x when x >= 10:
		break;
	case int x when x < 10 && x > 0:
		break;
	case int x when x is < 10 and > 0:
		break;
	default:
		break;
}
```

```C#
string toto = "toto";
	
switch (toto)
{
	case string x when x[0] == 't':
		break;
	default:
		break;
}
```

Le ***relational pattern*** permet d'affecter une valeur à une variable avec une syntaxe raccourcie du `switch` :

```C#
int num = 12;
int res = num switch
{
	0 => 0, 
	> 10 => 1,
	_ => -1 // défault
}; 
// res = 1
```

## Instruction ternaire

L'**instruction ternaire** est un raccourci peu lisible mais rapide à écrire permettant d'effectuer des tests **en une ligne**. 

```C#
int num = 1;

string opinion = num > 10 ? "J'y crois." : "Je n'y crois pas."; 
```

```C#
int val = 1234;
int res = val > 500 ? 100 : 50;

Console.WriteLine($"res: {res}"); // 100
```

Il peut être parfois nécessaire de placer l'instruction ternaire **entre parenthèses**, de façon à indiquer au *runtime* de traiter l'ensemble comme une condition.

```C#
int res = 500;
Console.WriteLine($"res: {(res > 1000 ? 100 : 50)}");
```

En cas d'imbrication (difficile à lire et déconseillée), l'instruction se lit **par la droite**.

```C#
int x = 1, y = 2, z = 3;
	
int result = x * 3 > y ? x : 
	y > z ? y : 
		z;
// équivalent à x * 3 > y ? x : (y > z ? y : z);
```

## Instruction ??

`??` est l'**opérateur de fusion** ou **de coalescence**. Si la valeur de l'opérande de gauche est non nulle, alors elle est renvoyée ; sinon c'est la valeur de l'opérande de droite qui est renvoyée.

```C#
MaChose monInstance;
Console.WriteLine(monInstance.ToString() ?? "Rien");
```
