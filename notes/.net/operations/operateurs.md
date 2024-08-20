# Les opérateurs

Le 18-08-2024

Effectuer des opérations sur les valeurs.

## Généralités

Les **opérateurs** sont des moyens d'effectuer des **opérations** sur des **variables de même type**. L'opération s'effectue sur un ou plusieurs **opérandes** (substantif masculin). [MS *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/ _blank)

Opérateurs les plus courants :
- affectation : `=`
- opérateurs arithmétiques : `+`, `-`, `*`, `/` `%`, `()`, incrémentation `++`, décrémentation `--`,
- concaténation : `+`
- raccourcis (opération et affectation): `+=`, `-=`, `*=`, `/=`, `%=`
- comparaison : `==`, `!=`, `>=`, `>`, `<`, `<=`,
- opérateurs booléens : `&&`, `||`, `!`.

Exemple : connaître une année bisextile. Lorsque le modulo vaut `0`, cela signifie que le dividende est divisible par le diviseur et cela sans reste.

```C#
int annee = 2003;
float reste = annee % 4;
// 2003 n'est pas un nombre pair, alors année non bisextile
```

On peut réaliser une **surcharge de l'opérateur** afin de modifier son comportement. Exemples : 
- concaténation (texte) et addition (nombres) s'effectuent avec `+`,
- l'opérateur d'appel de méthode et l'opérateur arithmétique de priorité d'opération s'effectuent avec `()`.

## Incrémentation et décrémentation

`++` et `--` ont deux usages :
- **avant la variable** : opérer puis récupérer,
- **après la variable** : récupérer puis opérer.

Récupérer la variable, l'utiliser dans l'interpolation de chaîne, puis incrémenter la valeur.

```C#
Console.WriteLine("monTexte: " + monInt++);
```

Incrémenter la valeur, puis récupérer le résultat puis l'utiliser dans l'interpolation de chaîne.

```C#
Console.WriteLine("monTexte: " + ++monInt); 
```

## Tester non null

Tester une valeur **non nulle** avec le raccourci `?`. Comparer avec la syntaxe standard.

```C#
if (gameObject?.transform?.parent)
{}
```

```C#
if (gameObject != null 
	&& gameObject.transform != null 
	&& gameObject.transform.parent != null)
{}
```

## String

Pour comparer des `string`, on s'en remet à `==` ou à `String.Compare()` et `String.CompareTo()`.

```C#
string s1 = "abc";
string s2 = "abc;

Console.WriteLine(string.Compare(s1, s2) == 0);
Console.WriteLine(s1.Compare(s2) == 0);
```
