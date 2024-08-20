# String

Le 18-08-2024

Un texte est toujours en *string*.

## Présentation

`string` est l'alias de `System.String`.

Le type `string` définit ce qu'on appelle une **chaîne de caractères**. C'est un **type référence**, donc il est de type `class`. 

Mais une donnée de type `string` **se comporte comme un type valeur** car elle est **immuable** (sa valeur peut être remplacée mais pas modifiée). Un `string` est en effet un **tableau** de `char` qui sont de type `struct` (immuables) ; on en connaît la longueur avec la propriété `Length`. Par conséquent, chaque affectation, copie ou traitement d'une donnée de type `string` **génère une nouvelle donnée** en *Heap*.

En général, on n'utilise pas `new` lors d'une déclaration de chaîne. En effet, les chaînes sont si fréquentes que C# propose la commodité de les manipuler comme un type simple (sucre syntaxique).

On écrit la valeur ou la constante littérale de type `string` **entre guillemets** alors que celle d'un `char` s'écrit **entre apostrophes dactylographiques (ou guillemets simples)**. [Apostrophe et impostrophe](https://www.antidote.info/fr/blogue/enquetes/apostrophe-et-impostrophe _blank)

## Déclaration, affectation

**Déclarations** diverses.

```C#
string t1 = "Test";
String t2 = "Test";
string t3 = new string("Test");
String t4 = new String("Test");
```

Une chaîne est un **tableau de caractères**.

```C#
char[] lettres = { 'H', 'e', 'p' };
	
string str = new string(lettres); // Hep
	
foreach (var l in str)
{
	Console.WriteLine(l);
}
```

## Concaténation

La chaîne de caractères peut être construite par combinaison avec `+` qui est alors l'opérateur de **concaténation** ou `+=`.

```C#
Console.WriteLine("Bonjour" + " ! ");
```

Un `string` étant immuable, alors concaténer procéduralement signifie recréer autant de chaînes en mémoire. On préférera donc passer par `StringBuilder` pour construire une chaîne dynamiquement.

## StringBuilder

Référence : [MSDN StringBuilder](https://docs.microsoft.com/fr-fr/dotnet/standard/base-types/stringbuilder _blank)

**StringBuilder** permet de **construire au fur et à mesure** (dynamiquement) une chaîne de caractères. En effet, ce type est **muable**. De plus, **StringBuilder optimise la mémoire pour des concaténations effectuées dans des boucles**. Méthodes principales :
- `Append()` ajoute une chaîne à la suite des autres,
- `AppendLine()` ajoute une chaîne terminée par le caractère de nouvelle ligne,
- `AppendFormat()` ajoute une valeur selon un certain format (selon la culture informatique par exemple),
- `Insert()`, `Remove()`, `Replace()` modifient le contenu sur un index,
- `ToString()` est nécessaire pour obtenir la chaîne finale.

```C#
string nom = "Toto";
	
StringBuilder sb = new StringBuilder();
sb.Append("Bonjour ");
sb.Append(nom);
sb.Append(".");
	
Console.WriteLine(sb.ToString());
```

```C#
StringBuilder sb = new();
for(int i = 0; i < 100; i++)
{
	sb.AppendLine("Toto");
}
string texteIncroyable = sb.ToString();
```

## Caractères spéciaux

Les `string` peuvent accueillir des **caractères spéciaux** grâce à l'antislash qui sert de caractère d'échappement :
- `\"` : guillemets américains,
- `\\` : antislash,
- `\r` : retour chariot,
- `\n` : nouvelle ligne,
- `\t` : tabulation.

Exemples :
- saut de ligne : `\r\n`
- échapper l'antislash : `"C:\\monDossier\\monFichier"`

## Traitements spéciaux

Prenons une chaîne standard :

```C#
string standardPath = "C:\\monDossier\\monFichier";
```

Le **littéral de chaîne textuel** conserve tout le contenu tel que saisi et permet de se passer de l'échappement par antislash ou des caractères spéciaux. On utilise la directive `@` devant la chaîne. Ici, pour ajouter le guillemet dans la chaîne, plus besoin d'antislash.

```C#
Console.WriteLine(@"     C:\monDossier\monFichier
		Quelques tabulations");
```

```C#
string totoDit = @"Toto dit ""Youpi""";
```

La **mise en forme composite** consiste à utiliser des espaces réservés dans une chaîne qui, à l'exécution, seront remplacé par les valeurs correspondantes.

```C#
string monPrenom = "Thêta";
string monNom = "Toto";
Console.WriteLine( string.Format("{0} {1}", monPrenom, monNom) );
Console.WriteLine("{0} {0}", monNom);
```

On peut combiner une chaîne de caractères par **interpolation**, qui est une mise en forme composite simplifiée. On utilise la directive `$` devant la chaîne. Ici, pour ajouter l'accolade dans la chaîne, il faut non pas utiliser l'antislash mais... l'accolade.

```C#
int monAge = 10;
Console.WriteLin($"Mon âge est de {monAge} ans.");
```

```C#
string totoDit = $"Toto dit {{Youpi}}";
```

Tout cela peut être combiné. 

```C#
string monNom = "Youpi";
Console.WriteLin($@"C:\monDossier\{monNom}\monSousDossier");
```

```C#
int monAge = 10;
Console.WriteLine($@"Mon âge est de {{{monAge}}} ""zans"".");
```

Certaines données peuvent être mises en forme, par l'interpolation et la mise en forme composite, selon la « **culture informatique** » de l'utilisateur, c'est-à-dire les paramètres de **pays** et de **langue** du système d'exploitation utilisé. Le **code de culture** est une chaîne de 5 caractères présentant ces deux informations. Exemple : francophone en France avec `fr-FR`, francophone au Canada avec `fr-CA`. Adapter la mise en forme selon le code de culture se nomme la **localisation**.

```C#
// Affichage des nombres
decimal valeur = 123456.78912m;
Console.WriteLine($"Valeur = {valeur:N}");
// En culture en-U, valeur = 123,456.79
	
// Précision à 4 décimales (troncature)
Console.WriteLine($"Valeur = {valeur:N4}");
// En culture en-US, valeur = 123,456.7891
```

```C#
// Pourcentages 
decimal taxe = .36785m;
Console.WriteLine($"Taxe = {taxe:P2}");
// taxe = 36.79 %
```

```C#
// Valeurs monétaires
decimal prix = 123.45m;
int remise = 50;
Console.WriteLine($"Prix = {prix:C} - Remise = {remise:C}");
// Sans prise en charge de la culture, prix = ¤123.45 et remise = ¤50.00
// En culture fr-FR, prix = 12,45€ et remise = 50,00€ 
```

Sources :
- [Interpolation de chaîne](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/tokens/interpolated _blank)
- [Utiliser des données dans C#](https://docs.microsoft.com/fr-fr/learn/paths/csharp-data _blank)
- [Formatage des nombres](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings _blank)

## Méthodes

`String` est un type embarquant un certain nombre de méthodes comme `Contains()` permettant de tester si la chaîne contient une sous-chaîne. Il existe aussi `StartsWith()`, `EndsWith()`, `Substring()`, `IndexOf()`, `LastIndexOf()`.

```C#
const string spanOuvrant = "<span>";
const string spanFermant = "</span>";
	
string message = "Youpi la vie (c'est chouette). <span>Bisous !</span>";
	
if (message.Contains("Youpi"))
{
    Console.WriteLine("Joie.");
	
	int pos1 = message.IndexOf('(') + 1;
	int pos2 = message.IndexOf(')');
	int length = pos2 - pos1;
	Console.WriteLine(message.Substring(pos1, length));
	
	int span1 = message.IndexOf(spanOuvrant) + spanOuvrant.Length;
	int span2 = message.IndexOf(spanFermant);
	int spanLength = span2 - span1;
	Console.WriteLine(message.Substring(span1, spanLength));
}
```

Pour **comparer**, on s'en remet à `==` ou à `String.Compare()` et `String.CompareTo()`.

```C#
string s1 = "abc";
string s2 = "abc";
	
Console.WriteLine(String.Compare(s1,s2)); // 0
Colored.WriteLine(s1.CompareTo(s2).ToString()); // 0
```

Autres méthodes pour **comparer** des chaînes : `Trim()` (retirer les espaces), `TrimStart()`, `TrimEnd()`, `GetHashcode()`, propriété `Length`.

```C#
string v1 = " a";
string v2 = "A ";
Console.WriteLine(v1.Trim().ToLower() == v2.Trim().ToLower()); // true
```

Modifier une chaîne par **insertion ou suppression de contenu** : `Replace()`, `Insert()`, `Remove()`.

```C#
string chaine = "12345GnaGnaGna           5000  3  ";
string chaineModifiee = chaine.Remove(5, 20);  
Console.WriteLine($"[{chaineModifiee}]"); // [123455000  3  ]
chaineModifiee = chaineModifiee.Replace(' ','-');
Console.WriteLine(chaineModifiee); // [123455000--3--]
```

Avec les **tableaux** : `split()`, `ToCharArray()`.

`PadLeft()` et `PadRight()` **ajoutent un espace blanc ou un caractère un certain nombre de fois**. Cela peut être utile pour **formater une donnée** en sortie (par exemple, un nombre sur 6 digits même s'il contient des espaces non utilisés, pour pour présentation à l'utilisateur).

```C#
string texte = "Plus loin !";

Console.WriteLine($"[{texte.PadLeft(20)}]"); 
// [         Plus loin !]

Console.WriteLine($"[{texte.PadRight(20)}]"); 
// [Plus loin !         ]

Console.WriteLine($"[{texte.PadLeft(20, '-')}]"); 
// [---------Plus loin !]

Console.WriteLine($"[{texte.PadRight(20, '-')}]"); 
// [Plus loin !---------]
```

## Exemple 

Voici un exemple de traitements par Microsoft (code puis sortie). Ici, pour un programme Console, dans une culture `fr-FR`.

```C#
Console.OutputEncoding = System.Text.Encoding.UTF8; // disposer du caractère €
	
string produit1 = "Gain magique";
decimal retours1 = 0.1275m;
decimal gains1 = 55000000.0m;
	
string produit2 = "Avenir radieux";
decimal retours2 = 0.13125m;
decimal gains2 = 63000000.0m;
	
string comparisonMessage = "";
	
comparisonMessage = "[";
comparisonMessage += produit1.PadRight(20);
comparisonMessage += String.Format("{0:P}", retours1).PadRight(10);
comparisonMessage += String.Format("{0:C}", gains1).PadRight(20);
comparisonMessage += "]\n[";
comparisonMessage += produit2.PadRight(20);
comparisonMessage += String.Format("{0:P}", retours2).PadRight(10);
comparisonMessage += String.Format("{0:C}", gains2).PadRight(20);
comparisonMessage += "]";
	
Console.WriteLine(comparisonMessage);
```

```
[Gain magique        12,75 %   55 000 000,00 €     ]
[Avenir radieux      13,13 %   63 000 000,00 €     ]  
```

