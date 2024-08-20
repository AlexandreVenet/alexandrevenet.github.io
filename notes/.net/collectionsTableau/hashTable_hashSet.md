# HashTable, HashSet

Le 19-08-2024

Conserver une donnée et son *hash* généré automatiquement.

## HashTable

Le type `HashTable` non générique est une **collection** de données **à taille modifiable** dont les données sont stockées par **paires clé-valeur** (*key-value pair*). Les clé sont **uniques**, **immuables** et **non nulles** (sinon le *hash* ne peut pas être calculé). Les valeurs sont de type `object`, donc on peut mettre tout type ; conséquence : les valeurs doivent être converties pour être utilisées. [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.hashtable _blank)

Principe : 
- en plus du stockage des données, `HashTable` calcule et conserve pour son fonctionnement le ***hash*** de chaque clé. Ceci s'effectue grâce au fait que tous les types dérivent d'`object`, type qui contient une fonction `.GetHashCode()`,
- lors de l'accès à une valeur par clé, une correspondance est établie entre la clé spécifiée et le code de hashage existant.

L'accès par *hash* est réputé plus rapide que par l'usage d'une valeur typée.

Initialisation :

```C#
HashTable test = new HashTable();
```

Initialisation avec initialiseurs :

```C#
HashTable test = new HashTable()
{
	{ 10, "toto" },
	{ 1, "youpi" }		
};
```

`HashTable` peut recevoir des données à partir d'un `Dictionary`.

```C#
Dictionary<int,string> dico = new Dictionary<int,string>()
{
	{ 1, "in" },
	{ 2, "deux" }		
};

HashTable test = new HashTable(dico);
```

Ajout de données avec `.Add()`.

```C#
test.Add(4, "quatre");
test.Add(6, "six");
test.Add(9, "neuf");
```

**Accéder** à une valeur avec `[key]` (renvoie `null` si clé inexistante). Pour **modifier** la valeur, même syntaxe. Avec la même syntaxe, si la clé n'existe pas, alors la paire clé-valeur est ajoutée.

```C#
Console.WriteLine(test[4]); // quatre
```

```C#
test[1] = "un"; // modification
test[7] = "cette"; // ajout
```

Les clé et valeur peuvent être **testées avant traitement** avec `.ContainsKey()` et `.ContainsValue()`. 

```C#
Console.WriteLine(test.ContainsKey(10));
```

On peut accéder aux clés et valeurs dans une **boucle** avec le type `DictionaryEntry` puis ses propriétés `Key` et `Value`. Par exemple dans une boucle `foreach` :

```C#
foreach(DictionaryEntry item in test)
{
	Console.WriteLine($"{item.Key} : {item.Value}");
}
```

Pour **supprimer** une entrée, utiliser `Remove(key)`. Si la clé est introuvable, alors la collection est inchangée et aucune exception n'est levée.

```C#
test.Remove(4);
test.Remove(99); // pas d'erreur si clé introuvable
```

La collection `HashTable` se vide avec `.Clear()`.

```C#
test.Clear();
```

## HashSet

Le type `HashSet<T>` est une **collection générique** de données **à taille modifiable** où le *hash* est calculé pour chaque valeur. Chaque **valeur est unique** et du type spécifié (pas de conversion à prévoir). [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic.hashset-1 _blank)

Quelques méthodes et propriétés habituelles aux collections : `.Add()`, `.Clear()`, `.Contains()`, `Remove()`, `.Count`.

`HashSet` permet d'effectuer des traitement sur différentes collections de même type.
- `UnionWith()` : union ou ajout,
- `IntersetWith()` : intersection,
- `ExceptWith()` : soustraction,
- `SymmetricExceptWith()` : différence symétrique.
