# Conditions

Le 24-09-2022

Tester une valeur.

## Introduction

Une **condition** ou **instruction conditionnelle** fait partie de ce qu'on appelle la **logique de décision** : c'est la modification du chemin d'exécution de l'application en fonction de la valeur d'une expression.

Les instructions conditionnelles sont des **structures de contrôle**. Ce sont des tests pour effectuer ou non une portion de code. On utilise :
- **`if...else if...else`**,
- **`switch`**,
- **`x ? y : z`** instruction ternaire.

Les conditions ne peuvent apparaître que dans le **corps d'une méthode**.

Les conditions peuvent être **imbriquées** selon les besoins.

Elles peuvent être utilisées pour **assigner une valeur booléenne**, résultat du test, à une variable.

## If

L'instruction `if` permet de tester des **valeurs** ou d'effectuer des **comparaisons**.

```
int monAge = 18; 
	
if(monAge == 18)
{
	Debug.Log("Vous avez : " + monAge + " ans.");
}
else if(monAge < 18)
{
	Debug.Log("Vous n'avez pas encore" + monAge + " ans");
}
else
{
	Debug.Log("Vous avez plus de " + monAge + " ans");
}
```

L'opérateur de négation logique ou opérateur *NOT* `!` permet de tester la **négation**, que l'expression est fausse : 
```
bool isWatching = false;
	
if(!isWatching)
	isWatching = true;
	
if(isWatching != true)
	isWatching = true;
	
if(isWatching)
	Debug.Log("Est en train de regarder");
```

## Switch

`switch` permet de **tester une seule valeur**. 

`break` permet d'arrêter le test ; si absent, les tests sont combinés (équivalent au "ou" inclusif) jusqu'au prochain. 

L'instruction `default` (équivalent au `else`) est optionnelle.

```
int nombre = 2; 
	
switch(nombre)
{
	case 2 :
		Debug.Log("J'aime le nombre 2.");
		break;
	case 4 :
	case 6 :
		Debug.Log("Je n'aime pas les nombres 4 et 6."); 
		break;
	default : 
		Debug.Log("Ce nombre m'est indifférent.");
		break;
}
```

Utiliser `when` pour affiner les tests. Les instructions C# sont disponibles pour les types renseignés.
```
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
```
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
```
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

```
int num = 1;

string opinion = num > 10 ? "J'y crois" : "Je n'y crois pas."; 
```
```
int val = 1234;
int res = val > 500 ? 100 : 50;

Console.WriteLine($"res: {res}"); // 100
```

Il peut être parfois nécessaire de placer l'instruction ternaire **entre parenthèses**, de façon à indiquer au *runtime* de traiter l'ensemble comme une condition.
```
int res = 500;
Console.WriteLine($"res: {(res > 1000 ? 100 : 50)}");
```

En cas d'imbrication (difficile à lire et déconseillée), l'instruction se lit **par la droite**.

```
int x = 1, y = 2, z = 3;
	
int result = x * 3 > y ? x : 
	y > z ? y : 
		z;
// équivalent à x * 3 > y ? x : (y > z ? y : z);
```

## Instruction ??

`??` est l'**opérateur de fusion** ou **de coalescence**. Si la valeur de l'opérande de gauche est non nulle, alors elle est renvoyée ; sinon c'est la valeur de l'opérande de droite qui est renvoyée.
```
MaChose monInstance;
Console.WriteLine(monInstance.ToString() ?? "Rien");
```
