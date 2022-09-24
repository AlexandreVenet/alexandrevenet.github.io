# Les opérateurs

Le 24-09-2022

Effectuer des opérations sur les valeurs.

## Généralités

Les **opérateurs** sont des moyens d'effectuer des **opérations** sur des **variables de même type**. L'opération s'effectue sur un ou plusieurs **opérandes** (substantif masculin). [MS LEarn Opérateurs](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/ "MSDN Opérateurs")

Opérateurs les plus courants :
- affectation : `=`
- opérateurs arithmétiques : `+`, `-`, `*`, `/` `%`, `()`, incrémentation `++`, décrémentation `--`,
- concaténation : `+`
- raccourcis (opération et affectation): `+=`, `-=`, `*=`, `/=`, `%=`
- comparaison : `==` (voir aussi `Equals()`), `!=`, >=`, `>`, `<`, `<=`
- opérateurs booléens : `&&`, `||`, `!`.

Exemple : connaître une année bisextile. Lorsque le modulo vaut 0, cela signifie que le dividende est divisible par le diviseur et cela sans reste.
```
int annee = 2003;
float reste = annee % 4;
// 2003 n'est pas un nombre pair, alors année non bisextile
```

Utiliser un même opérateur pour des opérations différentes s'appelle la **surcharge de l'opérateur**. Exemples : 
- concaténation (texte) et addition (nombres) s'effectuent avec `+`,
- l'opérateur d'appel de méthode et l'opérateur arithmétique de priorité d'opération s'effectuent avec `()`.

## Incrémentation et décrémentation

`++` et `--` ont deux usages :
- **avant la variable** : opérer puis récupérer,
- **après la variable** : récupérer puis opérer.

Récupérer la variable, l'utiliser dans l'interpolation de chaîne, puis incrémenter la valeur.
```
Console.WriteLine("monTexte: " + monInt++);
```

Incrémenter la valeur, puis récupérer le résultat puis l'utiliser dans l'interpolation de chaîne (parenthèses pour la lisibilité).
```
Console.WriteLine("monTexte: " + (++monInt)); 
```

## Tester non null

Tester une valeur **non nulle** avec le raccourci `?`. Comparer avec la syntaxe standard.
```
if (gameObject?.transform?.parent){}
```
```
if (gameObject != null && gameObject.transform != null && gameObject.transform.parent != null){}
```

## String

Pour comparer des `string`, on s'en remet à `==` ou à `String.Compare()` et `String.CompareTo()`.
```
string s1 = "abc";
string s2 = "abc;

Debug.Log(string.Compare(s1, s2) == 0);
Debug.Log(s1.Compare(s2) == 0);
```