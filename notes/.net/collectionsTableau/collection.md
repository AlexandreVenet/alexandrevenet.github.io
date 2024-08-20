# Collection

Le 19-08-2024

Les tableaux sont de longueur fixe, les collections sont de longueur variable. [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.collections _blank)

## Introduction

Les **collections** sont des classes qui implémentent l'interface `ICollection`. 

La collection, par rapport au tableau, peut être développé ou réduit dynamiquement. 

Les collections se présentent sous deux formes : 
- non génériques dans le *namespace* `System.Collections`,
- génériques dans le *namespace* `System.Collections.Generic`.

En général, on préfèrera utiliser les versions génériques qui sont plus rapides que le non génériques et réduisent la levée d'exception par l'utilisation d'erreurs à la compilation.

## Collections génériques

|Collection|Description|
|-|-|
|`List<T>`|Collection d'éléments de même type enveloppant un tableau, optimisée pour les accès par index|
|`LinkedList<T>`|Idem sans tableau, idéale pour accéder de façon linéaire aux éléments considérés comme nœuds de chaîne|
|`Queue<T>`|Enregistrement *FIFO* (*First In First Out*), les données gardent leur place par ordre d'arrivée|
|`Stack<T>`|Enregistrement *LIFO* (*Last In First Out*), idem|
|`Dictionary<TKey,TValue>`|Éléments conservés par paires clé-valeur|
|`SortedList<TKey,TValue>`|Idem avec tri automatique par ordre croissant|
|`HashSet<T>`|Collection de valeurs uniques (pas de doublons)|

## Collections non génériques

|Collection|Description|
|-|-|
|`ArrayList`|Équivalent d'une liste, cette collection accueille des types différents étant conservés dans le type `object`. Ceci implique une conversion pour retrouver le le type spécifique.|
|`Queue`|Enregistrement *FIFO* (*First In First Out*), les données gardent leur place par ordre d'arrivée.|
|`Stack`|Enregistrement *LIFO* (*Last In First Out*)|
|`SortedList`|Éléments conservés par paires clé-valeur avec tri automatique par ordre croissant|
|`HashTable`|Collection par paires clé-valeur. Les valeurs sont restituées en comparant le *hash* des clés (et non les clés elles-mêmes).|
|`BitArray`|Tableau de bits représentés par des booléens (`true` : 1, `false` : 0)|


## Comparaisons

`List<T>` est plus rapide et moins ouvert à l'erreur que `ArrayList`.

`SortedList<TKey,TValue>` utilise moins de mémoire que `SortedDictionary<TKey,TValue>` et est plus rapide à trouver des données une fois triées. Elle est aussi plus lente à l'insertion et la suppression de données.

`HashTable` retrouve plus lentement les données qu'un `Dictionary<TKey,TValue>` car il doit effectuer du *boxing*/*unboxing*.

## Usage d'interfaces

Les collections sont similaires car elles implémentent souvent les **mêmes interfaces**, en versions générique ou non générique.

Par exemple :
- `ICollection<T>` fournit des méthodes et propriétés pour gérer une collection,
- `IEnumerable<T>` fournit la possibilité d'itérer,
- `IDictionary<TKey,TValue>` fournit des propriétés et méthodes pour gérer une collection par paire clé-valeur.

Ces interfaces étant disponibles, on peut les implémenter dans nos classes personnelles. 
