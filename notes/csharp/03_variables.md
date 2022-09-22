# Variables

Le 22-09-2022

Représenter une donnée dans la mémoire et manipuler cette représentation.

## Présentation

Une **variable** est une entité unique **représentant** une **donnée typée** en **espace mémoire**.

La variable est définie sur 3 éléments :
- **type** : construction qui définit la quantité de mémoire à réserver pour une valeur, et la façon de lire cette valeur,
- **nom ou identificateur** en général en lowerCamelCase : l'adresse mémoire est hexadécimale et très longue, alors que le nom est un moyen commode d'accéder à cette adresse,
- **valeur** : ce que vaut la variable, ce qu'on affecte à la variable.

La **déclaration** est la réservation de l'espace mémoire. Exemple : 
```
int monEntier; // 0 par défaut 
MaClasse maClasse; // null par défaut
bool? monBooleen; // false par défaut ; type valeur rendu nullable
```

L'**affectation ou assignation ou encore définition de la variable** est le remplissage de cet espace mémoire avec la valeur. L'affectation s'effectue de droite à gauche (la valeur doit exister d'abord).
```
int monEntier;
monEntier = 1;

string monNom;
"Toto" = monNom; // erreur
```

Les deux opérations peuvent se faire en une ligne, on parle alors d'**initialisation** de la variable.
```
int monInt; // variable en mémoire, valeur par défaut
float myFloat = 0.3f; // "f" pour typer la valeur selon le type de variable 
string text = "toto"; // utiliser les guillements doubles 
GameObject maLampe1, maLampe2, maLampe3; // à la suite pour des variables de même type 
char monChar = 'p'; // utiliser des apostrophes
```

Les types les plus courants font l'objet d'**alias** implémentés pour le confort du développeur.
```
System.Int32 i = 5; // type complet de la structure
int j = 5; // usage courant par alias
```

## Catégories des types

Les variables sont classées selon deux grandes catégories : **valeur** et **référence**. La différence réside dans leurs mode et emplacement de stockage de leur valeur sur l’ordinateur au moment de l’exécution du programme.

Le **type valeur** : 
- variables **contenant leur valeur**,
- effet de l'affectation : **copie la valeur**,
- valeur par défaut : selon le type,
- il représente des **données simples**, **acccessibles immédiatement**, dont la **taille est déjà fixée** (type simples, énumérations, structures).

Le **type référence** : 
- variables **contenant une référence vers leur valeur**,
- effet de l'affectation : **copie la référence (adresse mémoire)** mais l'objet est unique,
- valeur par défaut : `null`,
- il représente des **données plus complexes**, **accessibles plus lentement**, dont la **taille est déterminée dynamiquement** (classe, tableau, chaîne, délégué, interface).

## Zones mémoire

La ***Stack*** (**pile**) :
- mémoire **rapide**,
- utilisée pour l'**exécution du code**, le stockage de **données temporaires** et de **variables locales**,
- organisée en **pile** de **blocs** qui représentent chacun une **portée** (*scope*) (exemple : bloc `if`, code entre `{}`, appel de fonction, paramètres...),
- en **fin** de portée, le bloc correspondant est **immédiatement supprimé de la mémoire**, 
- contient les **variables**, la **valeur des types valeur**, les **références/adresses** des objets (qui sont en *Heap*),
- exemple : un `int`.

Le ***Heap*** (**tas**) :
- mémoire **plus lente**,
- utilisée pour le **stockage des données accessibles globalement**, sur de plus **longues périodes** voire tout au long de la vie de l'application,
- organisée par **blocs** qui sont **accessibles par une adresse** à tout moment,
- la **taille** d'une donnée stockée en *Heap* est **allouée dynamiquement** à l'exécution (exemple : on doit toujours fournir la taille d'un `array` à son initialisation),
- pour accéder à une donnée en *Heap*, on utilise un pointeur (ou référence) vers l'adresse correspondante ; pointeur qui, lui, est une **valeur** stockée en *Stack*,
- contient les **objets**, les **valeurs globales** et **statiques**,
- exemple : un `gameObject` de la scène courante.

C# utilise un ***garbage collector*** (ramasse-miettes) : processus qui supprime automatiquement un objet en *Heap* lorsque plus aucune variable ne référence cet objet. Ce processus de désallocation mémoire est appelé **finalisation**, du nom de la méthode `Finalize()` de la classe `Object`. 

## Object

Les types sont définis par des `class` ou `structs` et structurés en arborescence. Le premier type C# est `Object`. Tout type est donc un de ses dérivés, plus ou moins directement et cette classe est la classe parente de toutes les classes .NET. Voir le chapitre sur Object.

## Types de variable

Tous les types C# ici [MSDN Built-int types](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/built-in-types "MSDN Built-int types") ou là [TutorialTeacher Data types](https://www.tutorialsteacher.com/csharp/csharp-data-types "TutorialTeacher Data types").

Une variable a un **type**. Le type permet à la machine de déterminer **comment représenter une donnée**. La donnée occupe un **espace mémoire vive** et sa **taille** dépend du type utilisé. Exemples (rappel : 1 octet = 8 bits) :
- `int` : 32bits, `long` : 64bits,
- `float` : 32bits, `double` : 64bits, `decimal` : 128bits,
- `char` : 16bits, `string` : nombre de caractère * 16bits,
- `bool` : 8bits.

La taille en *bytes* ici [W3Schols Data types](https://www.w3schools.com/cs/cs_data_types.asp "W3Schols Data types")

Les types valeur sont subdivisés en d'autres catégories, par exemple les **types simples** :
- *byte, short, int, long* : numériques entiers signés.
- *float, double* : numériques réels.
- *bool* : booléen.
- *char* : caractère.

Les types dits **complexes** sont des combinaisons des types plus simples. Par exemple, dans Unity : 
- `Vector2` : 2 `float`, donc 2 × 32bits,
- `Quaternion` : 4 `float`, donc 4 × 32bits.

Dans Unity, il existe aussi des variables pour les **composants** et leurs propriétés. 

**Le type influence la valeur**, notamment avec les nombres. Par exemple, le type `int` ne conserve d'un nombre décimal que la partie entière (c'est non un arrondi mais une troncature). En général, les **types numériques** présentent la caractéristique de **précision** : c'est le nombre de décimales après la virgule. Par conséquent, on choisira un type numérique selon les besoins.
```
int num = 0 ;
num = 1 / 2 ; // 0
```
```
int a = 7;
int b = 5;
decimal quotient = (decimal)a / (decimal)b;
Console.WriteLine(quotient); // 1.4
```

Source : [MSDN Introduction au langage C#](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/language-specification/introduction "MSDN Introduction au langage C#")

## Type valeur : struct ou enum

Tous les **types valeur** sont des `struct` (héritage de C) ou `enum`. 

Une donnée de type `struct` existe en *Stack* ; idem pour les valeurs qui la composent.

On **alloue l'espace mémoire** pour une `struct` avec le mot-clé `new` (appel de constructeur de la classe), ce qui a pour effet d'**initialiser** la variable. Cela vaut aussi pour les sous-types :
```
int x = new int(); // 0 comme valeur par défaut
```

A ne pas confondre avec la **déclaration** qui alloue la mémoire en *Stack* mais **sans** affectation de valeur (c'est la valeur par défaut qui est utilisée) :
```
int x;
```

Puisque de type valeur, la `struct` ne peut pas avoir de valeur `null`. On peut néanmoins lui donner l'attribut `nullable` : ajouter `?` en suffixe de type. Alors la valeur `null` est autorisée.
```
MonTypeValeur? x = null;
```

Exemples : 
- `Vector2`, `Vector3`, `Quaternion`, `char`...
- `float` (alias de `System.Single`),
- `bool` (alias de `System.Boolean`),
- `int` (alias de `System.int32`).

## Type référence : class

Tous les **types référence** sont des `class`.

Une donnée de type `class` existe en *Heap* ; idem pour les valeurs qui la composent.

On **alloue l'espace mémoire** pour une donnée de type `class` en **instanciant la classe** avec le mot-clé `new`. Cela crée un **nouvel objet** en *Heap* et l'adresse mémoire est stockée dans la variable qui, elle, est en *Stack*.

Une donnée de type référence est soit une référence à une instance de classe, soit la valeur `null`.

## Var

Référence : [MSDN Tour C#](https://docs.microsoft.com/fr-fr/dotnet/csharp/tour-of-csharp/ "MSDN Tour C#")

Le (mal nommé) **type universel** `var` déclare un type **implicite** (et non explicite comme précédemment) : le **compilateur** définira le type adéquat en calculant l'expression située à droite de l'opérateur d'assignation, ce qui augmente la charge de travail lors de la compilation (aucun effet sur le produit final). On est en fait en face d'un mot-clé plutôt que d'un nom de type. Caractéristiques : 
- une déclaration de variable de ce type requiert une assignation, 
- une déclaration en ligne ou multiligne est impossible,
- ce type peut servir dans les boucles,
- ce type ne peut pas servir comme type de retour d'une fonction.
```
int x = 1;
var y = i + 1; // le compilateur en fera un int

var str = "Bonjour !";
Debug.Log($"Le type de str est : {str.GetType()}.");
```

## Dans Unity

Un objet 3D d'Unity a des propriétés classées par **composant**. On peut accéder à ces composants en script avec la fonction `GetComponent<...>()` qui  retourne le composant ciblé par le **type** passé entre chevrons. C'est un appel de fonction donc on a besoin des parenthèses. Ainsi, il est possible de récupérer le composant `RigidBody` ou même un script et de réaliser de la **communication de script**.
```
// On admet un autre objet nommé "Player" qui a un script "PlayerController"
private PlayerController _playerControllerScript; 

void Start()
{
	_playerControllerScript = GameObject.Find("Player").GetComponent<PlayerController>();
}
```

## Portée

La variable est **accessible** dans un **bloc**, qui se définit par une paire d'accolades ouvrante et fermante. C'est ce qu'on appelle la **portée (*scope*) de la variable** :
- **portée locale** : la variable est déclarée dans un bloc et donc est accessible dans son bloc, les blocs enfants, mais pas dans les blocs parents,
- **portée globale** : la variable est déclarée **en dehors** d'un bloc et donc est accessible dans son bloc et les blocs enfants. 

## Fonctions et propriétés de type

Les types de variable présentent des **fonctions** et **propriétés** spécifiques : 
```
int num = int.MaxValue ; // la MaxValue de la classe int
int i = monString.IndexOf("a") ; // une fonction de la classe string
```

Ceci semble aller de soi pour les **types référence**. Mais si les **types valeur** ne contiennent qu'une valeur, alors comment peuvent-ils disposer de fonctions ? Ceci est rendu possible par une conversion de valeur à référence que le CLR effectue au cours d'un processus nommé ***boxing*** : création d'un **objet** en *Heap* qui contient et la **valeur** et les **méthodes de sa classe**. 

Les deux exemples précédents montrent un *boxing* **implicite**. Le *boxing* **explicite** s'effectue en déclarant un objet :
```
int i = 1;
object o = i; // boxing
```

On peut réaliser de l'***unboxing*** : convertir référence en valeur. Ceci consiste à copier un type valeur qui se situe dans l'objet dans un type valeur. Voir le chapitre sur les conversions (*cast*).
```
int i = 1;
object o = i; // boxing
int j = (int) o; // unboxing
```

## Postfixes

Avec les nombres, le postfixe ("l", ou "d"...) définit que le nombre est bien du type défini. Si on omet cette lettre, alors **le compilateur opère une conversion**. Exemple :
```
double d = 3; // 3 entier puis converti en double
double dd = 3d; // pas de conversion
double ddd = 3.2; // pas de conversion
```