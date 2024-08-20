# Variables

Le 15-08-2024

Représenter une donnée dans la mémoire et opérer des traitements sur la valeur.

## Composant, type

Un objet 3D d'Unity a des propriétés classées par **composant**. On peut accéder à ces composants en script avec la fonction `GetComponent<...>()` qui retourne le composant ciblé par le **type** passé entre chevrons. C'est un appel de fonction donc on a besoin des parenthèses (fonction générique). Ainsi, il est possible de récupérer le composant `RigidBody` ou même un script et de réaliser de la **communication de script**. Le principe ici est d'affecter une valeur à une variable.

```C#
// On admet un autre objet nommé "Player" qui a un script "PlayerController"
private PlayerController _playerControllerScript; 

void Start()
{
	_playerControllerScript = GameObject.Find("Player").GetComponent<PlayerController>();
}
```

## Catégorie des types

En plus de la division des types .NET, Unity utilise des constructions spécifiques, par exemple `Vector2`, `Quaternion`... On peut désigner par **types complexes** ces combinaisons de types simples, combinaisons qui dérivent de `struct`.
