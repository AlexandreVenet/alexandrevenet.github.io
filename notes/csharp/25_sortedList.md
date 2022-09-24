# SortedList

Le 24-09-2022

Une liste triée automatiquement.

## Introduction 

`SortedList<TKey,TValue>` et `SortedList` sont des classes de collection permettant de stocker des données au format de **paire clé-valeur** qui sont **triées automatiquement par les clés** grâce à la mise en œuvre de l'interface **IComparer**. 

Par exemple, si les clés sont des nombres entiers, alors elles sont triées dans l'ordre croissant.

Les clés sont **uniques** (sinon levée d'exception), doivent être **immutables** et **non** `null`. Les valeurs peuvent être en doublon, `null`.

## Initialisations

Initialisation :
```
SortedList<int, string> test = new SortedList<int, string>();
```

Initialisation avec les initialiseurs :
```
SortedList<int, string> test = new SortedList<int, string>()
{
	{ 10, "toto" },
	{ 1, "youpi" }	
};
```

## Ajouts

Ajout de données avec `Add()`.
```
test.Add(3, "Trois");
test.Add(1, "Un");
test.Add(2, "Deux");
test.Add(4, null);
test.Add(10, "dix");
test.Add(5, "Cinq");
```

## Accès 

**Accéder** à une valeur avec `[key]` (levée d'exception à l'exécution si la clé n'existe pas.). Pour **modifier** la valeur, même syntaxe. Avec la même syntaxe, si la clé n'existe pas, alors la paire clé-valeur est ajoutée.
```
Console.WriteLine(test[3]); // trois
```
```
test[10] = "Dix"; // modification
test[6] = "Six"; // ajout
```

Les clé et valeur peuvent être **testées avant lecture** avec `ContainsKey()` et `TryGetValue()`.
```
Console.WriteLine(test.ContainsKey(5));

if(test.TryGetValue(5, out int result))
{
	Console.WriteLine(result);
}
```

## Exploration

On peut accéder aux clés et valeurs dans une boucle avec les propriétés `Keys` et `Values`. Par exemple dans une boucle `for` :
```
for(int i = 0; i < test.Count; i++)
{
	Console.Writeline($"{test.Keys[i]} : {test.Values[i]}");
}
```

## Suppression

Pour supprimer, utiliser `Remove(key)` ou `RemoveAt(index)`. 
```
test.Remove(4);
test.Remove(99); // pas d'erreur si clé introuvable
```
```
test.RemoveAt(0);
test.RemoveAt(99)); // erreur car index hors limites
```