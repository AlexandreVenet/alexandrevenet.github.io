# Tuple

Le 23-09-2022

Une structure de donnée accueillant des valeurs pouvant être de types différents.

## Présentation

Le type `tuple` est **type valeur** qui permet de **regrouper des données** de **types différents** dans une structure légère. Nombre maximum de valeurs : 26.

Les tuples sont utiles en particulier lorsqu'une **fonction** doit retourner plusieurs valeurs (voir le chapitre Fonction). 

Références :
- https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/builtin-types/value-tuples
- https://learn.microsoft.com/fr-fr/dotnet/api/system.tuple

## Usages standards

La déclaration du type des membres s'effectue entre parenthèses. L'affectation s'effectue également entre parenthèses et les valeurs doivent correspondre en nombre et en types. Par exemple cette initialisation de variable :
```
(double, int) monTuple = (10.5, 2);
```

On peut aussi passer la classe :
```
var pop = new Tuple<string, int, int>("Zozo",1,2);
```

On encore par méthode d'assistance :
```
var pop = Tuple.Create("Zozo",1,2);
```

On lit les valeurs avec l'opérateur `.` et les **noms par défaut**.
```
Console.WriteLine(monTuple.Item1);
Console.WriteLine(monTuple.Item2);
```

## Noms personnalisés

On peut aussi renseigner un **nom pour chaque valeur** du côté des types aussi bien que du côté des valeurs. 
```
var coteValeurs = (Sum: 4.5, Count: 3);
Console.WriteLine($"Sum of {coteValeurs.Count} elements is {coteValeurs.Sum}.");
	
(double Sum, int Count) coteTypes = (4.5, 3);
Console.WriteLine($"Sum of {coteTypes.Count} elements is {coteTypes.Sum}.");
```

On peut accéder au nom par défaut même si on utilise un nom personnalisé, ce qui autorise un mélange des deux options. De plus, C# propose des **initialiseurs de projection de tuple** : le nom du champ dans le tuple peut être déduit du nom de la variable correspondante (le nom de variable est "projeté" sur le champ du tuple).
```
var toto = 1;
var t = (toto, b: 2, 3);
Console.WriteLine($"{t.Item1} = {t.toto}"); // 1 = 1
Console.WriteLine($"{t.Item2} = {t.b}"); // 2 = 2
Console.WriteLine($"{t.Item3}"); // 3
```

Lors du *build*, le compilateur remplace les noms personnalisés par les noms par défaut. Par conséquent, les noms personnalisés ne sont pas disponibles à l'exécution.

## Deconstuct

Un tuple peut être, dit en anglais, ***deconstruct***, c'est-à-dire que l'on peut distribuer ses valeurs dans des variables automatiquement. [MSDN Deconstruct](https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/functional/deconstruct "MSDN Deconstruct")

Avec déclaration des types :
```
var tutu = ("youpi", 12);
(string message, int age) = tutu;
Console.WriteLine($"{message}, {age}");
```

En laissant le compilateur déduire les types des valeurs utilisées :
```
var tutu = ("youpi", 12);
var (message, age) = tutu;
Console.WriteLine($"{message}, {age}");
```

En utilisant des variables existantes :
```
var message = string.Empty;
var age = 0;

var tutu = ("youpi", 12);
(message, age) = tutu;
Console.WriteLine($"{message}, {age}");
```

Note concernant le français. On remarquera que Microsoft utilise le substantif "*déconstruction*", le verbe "*déconstruire*" et la locution par exemple "*tuple déconstructé*". Il semble s'agir d'une facilité ou d'un raccourci. En effet, l'usage imposerait plutôt les néologismes "*déconstructer*" et "*déconstructation*". Ou bien, il s'agit d'une erreur, et alors on doit rectifier en n'utilisant que "*déconstruction*", "*déconstruire*", "*tuple déconstruit*".

## Tester

Les tests d'égalité et d'inégalité s'effectuent sur les membres. Les tuples comparés doivent avoir le même nombre de valeurs et les valeurs doivent comparables. 
```
(int a, byte b) left = (5, 10);
(long a, int b) right = (5, 10);
Console.WriteLine(left == right);  // true
Console.WriteLine(left != right);  // false
	
var t1 = (A: 5, B: 10);
var t2 = (B: 5, A: 10);
Console.WriteLine(t1 == t2);  // true
Console.WriteLine(t1 != t2);  // false
```

## Retour de fonction

Exemple de tuple avec membres nommés retourné par une fonction :
```
public (int Nbre, string Nom, bool Ok) TestTuple()
{
	(int, string, bool) val = (10, "Toto", true);
	return val;
}
```