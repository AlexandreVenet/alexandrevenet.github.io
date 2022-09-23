# String

Le 22-09-2022

Un texte est toujours en *string*.

## Présentation

`string` est l'alias de `System.String`.

Le type `string` définit ce qu'on appelle une **chaîne de caractères**. C'est un **type référence**, donc il est de type `class`. 

Mais une donnée de type `string` **se comporte comme un type valeur** car elle est **immutable** (sa valeur peut être remplacée mais pas modifiée). Un `string` est en effet un **tableau** de `char` qui sont de type `struct` (immutables) ; on en connaît la longueur avec la propriété `Length`.

Par conséquent, chaque affectation, copie ou traitement d'une donnée de type `string` **génère une nouvelle donnée** en *heap*.

En général, on n'utilise pas `new` lors d'une déclaration de chaîne. En effet, les chaînes sont si fréquentes que C# propose la commodité de les manipuler comme un type simple (sucre syntaxique).

On écrit la valeur ou la constante littérale de type `string` **entre guillemets** alors que celle d'un `char` s'écrit **entre apostrophes dactylographiques (ou guillemets simples)**. [Apostrophe et impostrophe](https://www.antidote.info/fr/blogue/enquetes/apostrophe-et-impostrophe "Apostrophe et impostrophe")

## Déclaration, affectation

**Déclarations** diverses.
```
string t1 = "Test";
String t2 = "Test";
string t3 = new string("Test");
String t4 = new String("Test");
```

Une chaîne est un **tableau de caractères**.
```
char[] lettres = { 'H', 'e', 'p' };
	
string str = new string(lettres); // Hep
	
foreach (var l in str)
{
	Console.WriteLine(l);
}
```

## Concaténation

La chaîne de caractères peut être construite par combinaison avec `+` qui est alors l'opérateur de **concaténation** ou `+=`.
```
Debug.Log("Bonjour" + " ! ");
```

Un `string` étant immuable, alors concaténer procéduralement signifie recréer autant de chaînes en mémoire. On préférera donc passer par `StringBuilder` pour construire une chaîne dynamiquement.

## StringBuilder

Référence : [MSDN StringBuilder](https://docs.microsoft.com/fr-fr/dotnet/standard/base-types/stringbuilder "stringbuilder")

**StringBuilder** permet de **construire au fur et à mesure** (dynamiquement) une chaîne de caractères. En effet, ce type est **mutable**. De plus, **StringBuilder optimise la mémoire pour des concaténations effectuées dans des boucles**. Méthodes principales :
- `Append()` ajoute une chaîne à la suite des autres,
- `AppendLine()` ajoute une chaîne terminée par le caractère de nouvelle ligne,
- `AppendFormat()` ajoute une valeur selon un certain format (selon la culture informatique par exemple),
- `Insert()`, `Remove()`, `Replace()` modifient le contenu sur un index,
- `ToString()` est nécessaire pour obtenir la chaîne finale.
```
string nom = "Toto";
	
StringBuilder sb = new StringBuilder();
sb.Append("Bonjour ");
sb.Append(nom);
sb.Append(".");
	
Debug.Log(sb.ToString());
```
```
StringBuilder sb = new StringBuilder();
for(int i = 0; i < 100; i++)
{
	sb.AppendLine("Toto");
}
string texteIncroyable = sb.ToString();
```

## Caractères spéciaux

Les `string` peuvent accueillir des **caractères spéciaux** grâce à l'antislash qui sert de caractère d'échappement :
- `\"` : écrire les guillemets américains,
- `\\` : écrire l'antislash,
- `\r` : écrire un retour chariot,
- `\n` : écrire une nouvelle ligne,
- `\t` : écrire une tabulation.

Exemples :
- saut de ligne : `\r\n`
- échapper l'antislash : `"C:\\monDossier\\monFichier"`

## Traitements spéciaux

Prenons une chaîne standard :
```
string standardPath = "c:\\monDossier\\monFichier";
```

Le **littéral de chaîne textuel** conserve tout le contenu tel que saisi et permet de se passer de l'échappement par antislash ou des caractères spéciaux. On utilise la directive `@` devant la chaîne. Ici, pour ajouter le guillemet dans la chaîne, il faut non pas utiliser l'antislash mais... le guillemet.
```
Console.WriteLine(@"     C:\monDossier\monFichier"
		Quelques tabulations);
```
```
string totoDit = @"Toto dit ""Youpi""";
```

La **mise en forme composite** consiste à utiliser des espaces réservés dans une chaîne qui, à l'exécution, seront remplacé par les valeurs correspondantes.
```
string monPrenom = "Thêta";
string monNom = "Toto";
Debug.Log( string.Format("{0} {1}", monPrenom, monNom) );
Console.WriteLine("{0} {0}", monNom);
```

On peut combiner une chaîne de caractères par **interpolation**, qui est une mise en forme composite simplifiée. On utilise la directive `$` devant la chaîne. Ici, pour ajouter l'accolade dans la chaîne, il faut non pas utiliser l'antislash mais... l'accolade.
```
int monAge = 10;
Debug.Log($"Mon âge est de {monAge} ans.");
```
```
string totoDit = $"Toto dit {{Youpi}}";
```

Tout cela peut être combiné. 
```
string monNom = "Youpi";
Debug.Log($@"C:\monDossier\{monNom}\monSousDossier");
```
```
int monAge = 10;
Console.WriteLine($@"Mon âge est de {{{monAge}}} ""zans"".");
```

Certaines données peuvent être mises en forme, par l'interpolation et la mise en forme composite, selon la « **culture informatique** » de l'utilisateur, c'est-à-dire les paramètres de **pays** et de **langue** du système d'exploitation utilisé. Le **code de culture** est une chaîne de 5 caractères présentant ces deux informations. Exemple : francophone en France avec `fr-FR`, francophone au Canada avec `fr-CA`. Adapter la mise en forme selon le code de culture se nomme la **localisation**.
```
// Affichage des nombres
decimal valeur = 123456.78912m;
Console.WriteLine($"Valeur = {valeur:N}");
	
// culture en-US -> Valeur = 123,456.79
	
// Précision à 4 décimales (troncature)
Console.WriteLine($"Valeur = {valeur:N4}");
	
// culture en-US -> Valeur = 123,456.7891
```
```
// Pourcentages 
decimal taxe = .36785m;
Console.WriteLine($"Taxe = {taxe:P2}");
	
// -> Taxe = 36.79 %
```
```
// Valeurs monétaires
decimal prix = 123.45m;
int remise = 50;
Console.WriteLine($"Prix = {prix:C} - Remise = {remise:C}");
	
// Sans prise en charge de la culture -> Prix = ¤123.45 - Remise = ¤50.00
// culture fr-FR -> Prix = 12,45€ - Remise = 50,00€ 
```

Sources :
- [Interpolation de chaîne](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/tokens/interpolated "Interpolation de chaîne")
- [Utiliser des données dans C#](https://docs.microsoft.com/fr-fr/learn/paths/csharp-data/ "Utiliser des données dans C#")
- [Formatage des nombres](https://learn.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings "Formatage des nombres")

## Méthodes

`String` est un type embarquant un certain nombre de méthodes comme `Contains()` permettant de tester si la chaîne contient une sous-chaîne. Il existe aussi `StartsWith()`, `EndsWith()`, `Substring()`, `IndexOf()`, `LastIndexOf()`.
```
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
```
string s1 = "abc";
string s2 = "abc";
	
Console.WriteLine(String.Compare(s1,s2)); // 0
Colored.WriteLine(s1.CompareTo(s2).ToString()); // 0
```

Autres méthodes pour **comparer** des chaînes : `Trim()` (retirer les espaces), `TrimStart()`, `TrimEnd()`, `GetHashcode()`, propriété `Length`.
```
string v1 = " a";
string v2 = "A ";
Console.WriteLine(v1.Trim().ToLower() == v2.Trim().ToLower()); // true
```

Modifier une chaîne par **insertion ou suppression de contenu** : `Replace()`, `Insert()`, `Remove()`.
```
string chaine = "12345GnaGnaGna           5000  3  ";
string chaineModifiee = chaine.Remove(5, 20);  
Console.WriteLine($"[{chaineModifiee}]"); // [123455000  3  ]
chaineModifiee = chaineModifiee.Replace(' ','-');
Console.WriteLine(chaineModifiee); // [123455000--3--]
```

Avec les **tableaux** : `split()`, `ToCharArray()`.

`PadLeft()` et `PadRight()` **ajoutent un espace blanc ou un caractère un certain nombre de fois**. Cela peut être utile pour **formater une donnée** en sortie (par exemple, un nombre sur 6 digits même s'il contient des espaces non utilisés, pour une base de données ou pour présentation à l'utilisateur).
```
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

Voici un exemple de traitements par Microsoft (code puis sortie). Ici, pour un programme Console, dans une culture fr-FR.
```
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