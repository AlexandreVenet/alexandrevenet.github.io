# String

Le 20-08-2025

Explorer des chaînes de caractères à l'aide de motifs. [MS *Learn*](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions "Regular expressions" _blank)

## Présentation

Une chaîne de caractères peut être explorée, analysée, avec comme critère une structure, un motif (*pattern*). Le motif d'analyse est ce qu'on appelle une **expression régulière** (*regular expression*).

En C#, l'expression régulière est utilisée avec :
- le type `string` dont une instance contient le motif,
- le type `Regex` de l'espace de noms `System.Text.RegularExpressions` pour tout ce qui concerne l'analyse.

Une expression régulière de type `Regex` est un arbre, une structure de nœuds (type de caractères, type de répétition, etc.).

## Vérifier

Vérifier qu'une chaîne respecte un motif avec `IsMatch()`.

```C#
string texte = "abcDEF123";

if(Regex.IsMatch(texte, "[a-z]{3}[A-Z0-9]{3,10}"))
{
	Console.WriteLine("OK");
}
else
{
	Console.WriteLine("KO");
}
// OK
```

Si le motif doit être réutilisé, alors le déclarer en type `Regex`. Ceci évite de recalculer l'arbre à partir de la chaîne à chaque appel de méthode d'évaluation. La vérification s'effectue avec `IsMatch()` de l'instance.

```C#
string texte = "abcDEF123";

Regex motif = new Regex("[a-z]{3}[A-Z0-9]{3,10}");

if (motif.IsMatch(texte))
{
	Console.WriteLine("OK");
}
else
{
	Console.WriteLine("KO");
}
// OK
```

## Extraire la première sous-chaîne

Extraire la première sous-chaîne trouvée selon un motif avec `Match()`.

```C#
string texte = "abcDEF123";

Console.WriteLine(Regex.Match(texte, "[A-Z]{3}")); // DEF
```

Avec une instance de type `Regex` :

```C#
string texte = "abcDEF123";

Regex motif = new Regex("[A-Z]{3}");

Console.WriteLine(motif.Match(texte)); // DEF
```

## Extraire toutes sous-chaînes

Extraire toutes les sous-chaînes respectant un motif avec `Matches()`.

```C#
string texte = "abcDEF123";

MatchCollection regexMatches = Regex.Matches(texte, "[a-zA-Z]{3}");

Console.WriteLine(regexMatches.Count); // 2

foreach (Match match in regexMatches)
{
	Console.WriteLine(match.Value);
}
// abc
// DEF
```

Avec une instance de type `Regex` : 

```C#
string texte = "abcDEF123";

Regex motifMatches = new("[a-zA-Z]{3}");

MatchCollection regexMatches2 = motifMatches.Matches(texte);
foreach (Match match in regexMatches2)
{
	Console.WriteLine(match.Value);
}
// abc
// DEF
```

## Rédaction de la chaîne

Une expression régulière peut contenir des raccourcis. Lorsqu'on en utilise, il faut penser à échapper les caractères spécifiques (doubler l'antislash par exemple), ou utiliser `@`.

Exemple : `\w+` signifie « un ou plusieurs mots » pour capturer toutes sous-chaînes séparées entre espaces, caractères de ponctuation. La chaîne correspondante en C# est rédigée ainsi : `@"\w+"`.

## Options

Un certain nombre d'options sont proposées pour effectuer l'analyse. Par exemple, ignorer la casse du texte d'entrée pour obtenir toutes les occurences d'un texte même si la casse change :

```C#
string texte = "texte, Texte, TEXTE, TeXtE";

Regex motif = new Regex("texte", options: RegexOptions.IgnoreCase);

var matches = motif.Matches(texte);

foreach(Match match in matches)
{
	Console.WriteLine(match.Value);
}
// texte
// Texte
// TEXTE
// TeXtE
```

Ceci peut néanmoins être déclaré dans l'expression régulière elle-même. Voir donc ce qui est pertinent au cas par cas :

```C#
string texte = "texte, Texte, TEXTE, TeXtE";

Regex regex = new Regex(@"(?i)texte");

foreach (Match match in regex.Matches(texte))
{
	Console.WriteLine(match.Value);
}
// texte
// Texte
// TEXTE
// TeXtE
```

## Optimisations

Si l'expression régulière est utilisée de nombreuses fois dans le programme, alors Microsoft préconise de la poser en champ `static` et `readonly`.

```C#
private static readonly Regex _motif = new Regex("[a-z]{3}[A-Z0-9]{3,10}");
```

On peut également créer une classe utilitaire dédiée (*helper*) qui fournit des méthodes prêtes à l'emploi.

```C#
public static class HelperRegEx 
{
	private static readonly Regex _motif = new Regex("[a-z]{3}[A-Z0-9]{3,10}");

	public static bool EstValide(string texte) => _motif.IsMatch(texte);
}
```

Par défaut, si on a suivi les approches précédemment exposées dans cet article par exemple, le motif est lu et exécuté avec un interpréteur interne. Pour optimiser cela, C# fournit `RegexOptions.Compiled` : à l'exécution du programme, l'expression régulière fait l'objet d'une génération spécifique en *IL* (*Intermediate Language*), une sorte de mini-compilation dynamique, ce qui évite d'interpréter le motif à chaque analyse.

Cette approche a des avantages :
- plus rapide si l'expression régulière est utilisée très souvent (boucles, gros traitements),
- utile si appliquée à de gros volumes de texte.

Cette approche a aussi des inconvénients :
- la création de l'expression régulière prend du temps et consomme de la mémoire (générer le *IL* puis le *JIT*)
- dans le cas d'un seul appel ponctuel, l'exécution peut être plus lente que la version interprétée,
- le code compilé de l'expression régulière reste en mémoire, ce qui influence la consommation mémoire ou électrique, la puissance requise pour exécuter le programme.

```C#
public static class Regexes
{
    private static readonly Regex _motif = new Regex(
		"[a-z]{3}[A-Z0-9]{3,10}", 
		RegexOptions.Compiled);

	public static bool EstValide(string entree) => _motif.IsMatch(entree);
}
```

Depuis .NET 7, C# propose une nouvelle approche avec le type `RegexGenerator`. Le compilateur génère non plus du code *IL* mais du code C# spécifique et optimisé de l'expression régulière. 

Avantages :
- pas de coût au *runtime* (contrairement à la solution précédente),
- meilleures performances car le code est du C# (et pas du *IL*),
- efficace avec des expression régulières fixes.

Inconvénients :
- être en .NET 7 ou supérieur,
- ne porte que sur des motifs connus à la compilation (pas sur ceux construits dynamiquement),
- nécessite une annotation et une déclaration de la méthode en `partial` et sans corps (il est généré automatiquement à la compilation) ; la classe doit aussi être déclarée `partial`.

```C#
public static partial class MyRegexHelper
{
	[RegexGenerator(@"^\d+$")]
	private static partial Regex _justeDesNombres();

	public static bool EstJusteDesNombres(string entree) => _justeDesNombres().IsMatch(entree);
}
```

Source : [MS *Learn - Source generators*](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-source-generators "Source generators" _blank)

