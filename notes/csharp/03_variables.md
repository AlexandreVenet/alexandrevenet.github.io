# Variables

Le 23-09-2022

Représenter une donnée dans la mémoire et opérer des traitements sur la valeur.

## Présentation

Une **variable** est une entité unique **représentant** une **donnée typée** en **espace mémoire**.

La variable est définie sur 3 éléments :
- **type** : construction qui définit la quantité de mémoire à réserver pour une valeur, et la façon de lire cette valeur,
- **nom ou identificateur** : l'adresse mémoire est hexadécimale et très longue, alors que le nom est un moyen commode d'accéder à cette adresse,
- **valeur** : ce que vaut la variable, ce qu'on affecte à la variable.

Le nom de la variable suit quelques règles : 
- il s'écrit en général lowerCamelCase,
- il doit être unique, 
- il peut contenir des lettres de l'alphabet anglais, des nombres et l'*underscore*, 
- il est sensible à la casse,
- il ne peut pas être un mot-clé réservé du langage C#.

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
```

Les deux opérations peuvent se faire en une ligne, on parle alors d'**initialisation** de la variable.
```
int monInt; // variable en mémoire, valeur par défaut
float myFloat = 0.3f; // "f" pour typer la valeur selon le type de variable 
string text = "toto"; // utiliser les guillements doubles 
GameObject maLampe1, maLampe2, maLampe3; // à la suite pour des variables de même type 
char monChar = 'p'; // utiliser des apostrophes
```

## Portée

La variable est **accessible** dans un **bloc**, qui se définit par une paire d'accolades ouvrante et fermante. C'est ce qu'on appelle la **portée (*scope*) de la variable** :
- **portée locale** : la variable est déclarée dans un bloc et donc est accessible dans son bloc, les blocs enfants, mais pas dans les blocs parents,
- **portée globale** : la variable est déclarée **en dehors** d'un bloc et donc est accessible dans son bloc et les blocs enfants. 

## Dans Unity

Un objet 3D d'Unity a des propriétés classées par **composant**. On peut accéder à ces composants en script avec la fonction `GetComponent<...>()` qui  retourne le composant ciblé par le **type** passé entre chevrons. C'est un appel de fonction donc on a besoin des parenthèses. Ainsi, il est possible de récupérer le composant `RigidBody` ou même un script et de réaliser de la **communication de script**. Le principe ici est d'affecter une valeur à une variable.
```
// On admet un autre objet nommé "Player" qui a un script "PlayerController"
private PlayerController _playerControllerScript; 

void Start()
{
	_playerControllerScript = GameObject.Find("Player").GetComponent<PlayerController>();
}
```