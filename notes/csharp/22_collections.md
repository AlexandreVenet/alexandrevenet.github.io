# Collections

Le 24-09-2022

Les tableaux sont de longueur fixe, les collections sont de longueur ariable.

## Introduction

Les **collections** sont des classes qui implémentent l'interface `ICollection`. 

La collection, par rapport au tableau, peut être développé ou réduit dynamiquement. 

Les collections se présentent sous deux formes : 
- non génériques dans le *namespace* `System.Collections`,
- génériques dans le *namespace* `System.Collections.Generic`.

En général, on préfèrera utiliser les versions génériques qui sont plus rapides que le non génériques et réduisent la levée d'exception par l'utilisation d'erreurs à la compilation.

## Collections génériques

Les collections génériques dans C# :
- `List<T>` : collection d'éléments de même type,
- `Dictionary<TKey, TValue>` : éléments conservés par paires clé-valeur,
- `SortedList<TKey, TValue>` : idem précédent avec tri automatique par ordre croissant,
- `Queue<T>` : enregistrement *FIFO* (*First In First Out*), les données gardent leur place par ordre d'arrivée,
- `Stack<T>` : enregistrement *LIFO* (*Last In First Out*),
- `HashSet<T>` : collection de valeurs uniques (pas de doublons).

## Collections non génériques

Les collections non génériques dans C# :
- `ArrayList` : équivalent d'une liste, cette collection accueille toute sorte de types différents étant conservés dans le type `object`. Ceci implique une conversion lorsqu'on veut traiter un élément selon son type spécifique,
- `SortedList` : éléments conservés par paires clé-valeur avec tri automatique par ordre croissant,
- `Queue` : enregistrement *FIFO* (*First In First Out*), les données gardent leur place par ordre d'arrivée,
- `Stack` : enregistrement *LIFO* (*Last In First Out*),
- `HashTable` : collection par paires clé-valeur. Les valeurs sont restituées en comparant le *hash* des clés (et non les clés elles-mêmes),
- `BitArray` : tableau de bits représentés par des booléens (`true` : 1, `false` : 0).