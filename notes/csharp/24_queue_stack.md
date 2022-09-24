# Queue, Stack

Le 24-09-2022

Pile (*stack*), file (*queue*) sont des algorithmes courants intégrés à C#.

## Introduction

En **algorithmique**, il existe deux façons de traiter une **collection** :
- ***FIFO*** : *first in first out* (ex : la file d'attente),
- ***LIFO*** : *last in first out* (ex : la pile d'assiettes).

Ce genre de comportement peut être obtenu par une `List` qui propose des méthodes adéquates. Problème : elle permet aussi d'autres choses, ce qui peut ne pas être attendu. Donc, il faut passer par d'autres types de collections plus spécifiques : `Queue` et `Stack`.

Ces collections ont la particularité de **contenir leurs éléments dans l'ordre d'arrivée**.

## FIFO : Queue

*FIFO* est pris en charge par le type `Queue`.

Initialisation :
```
var queue = new Queue<string>(); 
```

Initialisation avec valeurs issues d'un tableau :
```
int[] tableau = new int[]{ 1, 2, 3, 4 };
Stack<int> maPile = new Stack<int>(tableau);
```

Ajouter une valeur à la fin avec `.Enqueue()` :
```
queue.Enqueue("Chaine1");
queue.Enqueue("Chaine2");
queue.Enqueue("Chaine3");
```

Récupérer la première entrée en la supprimant (méthode qui peut envoyer une exception) avec `Dequeue()` :
```
string texte = queue.Dequeue(); // chaine1
texte = queue.Dequeue(); // chaine2
```

Récupérer un objet du début **sans** le supprimer avec `.Peek()` :
```
string element1 = queue.Peek(); 
```

Des similitudes avec la `list` : `Count`, `Contains()`, `Clear()`...

`TryDequeue()` et `TryPeek()` renvoient un booléen pour tester une valeur avant opération.

## LIFO : Stack

*LIFO* est pris en charge par le type `Stack`.

Initialisation :
```
Stack<string> stack = new Stack<string>(); 
```

Ajouter une valeur avec `Push()` :
```
stack.Push("Chaine1");
stack.Push("Chaine2");
stack.Push("Chaine3");
```

Supprimer une valeur avec `Pop()` :
```
var element = stack.Pop(): // Chaine3
```

Mêmes méthodes et propriétés : `Peek()`, `Count`, `Clear()`, `Contains()`, `TryPeek()`, `TryPop()`...

