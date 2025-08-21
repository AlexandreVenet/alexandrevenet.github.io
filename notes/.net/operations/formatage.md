# Formatage

Le 18-08-2025

Présenter les données dans un certain format, selon une culture.

## Format, culture

Une donnée est **construite** dans un certain **format** (structure interne) et est **présentée** peut-être dans un autre (mise en forme), selon le contexte d'utilisation. La mise en forme dépend de la **culture** ou de la **praticité**. 

| Exemple | Structure                 | Représentation                        | Contexte  |
| ------- | ------------------------- | ------------------------------------- | --------- |
| 1.      | Nombre décimal `12345.67` | Prix en France en Euros `12 345,67 €` | Culture   |
| 2.      | Nombre décimal `12345.67` | Prix aux USA en Dollars `$12,345.67`  | Culture   |
| 3.      | Nombre entier `255`       | Hexadécimal classique `0xFF`          | Praticité |
| 4.      | Nombre entier `255`       | Hexadécimal suffixé `FFh`             | Praticité |

En C#, la **mise en forme** s'effectue avec la méthode `ToString()` ou des chaînes interpolées, et des **spécificateurs de format**. C'est-à-dire qu'on ne transforme pas la donnée elle-même : on crée une représentation de la donnée, représentation qui est une autre donnée, en l'occurrence une chaîne de caractères.

Références
- [MS *Learn* Vue d'ensemble du formatage](https://learn.microsoft.com/fr-fr/dotnet/standard/base-types/formatting-types "Vue d'ensemble du formatage" _blank)
- [MS *Learn* Méthode Format](https://learn.microsoft.com/fr-fr/dotnet/fundamentals/runtime-libraries/system-string-format "Méthode Format" _blank)

La **culture informatique** désigne l'information de la langue et du pays de l'utilisateur ou de l'utilisatrice. Cette culture informatique, pour être choisie, fait l'objet d'un format : `langue-pays` (langues : norme ISO 639, pays : norme ISO 3166). Par exemple, le français de France est noté `fr-FR`, le français du Canada `fr-CA`. En C#, la culture informatique prend la forme du type `CultureInfo` de l'espace de noms `System.Globalization`. La culture informatique n'est pas en soi une mise en forme, c'est simplement une information, mais elle sert de critère à une mise en forme.

Références
- [MS *Learn* Fondamentaux CultureInfo](https://learn.microsoft.com/fr-fr/dotnet/fundamentals/runtime-libraries/system-globalization-cultureinfo "Fondamentaux CultureInfo" _blank)
- [MS *Learn* API CultureInfo](https://learn.microsoft.com/fr-fr/dotnet/api/system.globalization.cultureinfo "API CultureInfo" _blank)

## Avec les nombres

```C#
CultureInfo cultureFr = new CultureInfo("fr-FR");

decimal prix = 123.45m;
int remise = 50;

Console.WriteLine($"""
	Prix = {prix}
	Prix (c) = {prix:c}
	Remise (C) = {remise.ToString("C")}
	Montant (C2) = {prix - remise:C2} 
	Montant (.00) = {prix - remise:.00}
	""");

/*
	Prix = 12367,89
	Prix (c) = 12 367,89 €
	Remise (C) = 50,00 €
	Montant (C2) = 12 317,89 €
	Montant (.00) = 12317,89
*/
```

## Avec les dates

Pour afficher les **dates**, sous un certain format, en chaînes de caractères.

L'exemple suivant (inspiré de cette source [StackOverflow](https://stackoverflow.com/questions/4353232/how-can-i-get-date-and-time-formats-based-on-culture-info "Source" _blank)) montre :
- la définition de la culture informatique (type `CultureInfo`), 
- l'exploration des paramètres de cette culture informatique (type `DateTimeFormat`),
- l'application de la culture informatique à une date (type `DateTime`).

```C#
CultureInfo us = new CultureInfo("en-US");

string shortUsDateFormatString = us.DateTimeFormat.ShortDatePattern;
string shortUsTimeFormatString = us.DateTimeFormat.ShortTimePattern;

DateTime date = new(year: 2025, month: 08, day: 20, hour: 12, minute: 30, second: 59);

Console.WriteLine($"""
	Date : {date}
	Date (f) : {date:f}
	Date (g) : {date:g}
	Date (d) : {date:d}
	Date (t) : {date:t}
	Date (dd-MM-yyyy HH:mm:ss.fff) : {date:dd-MM-yyyy HH:mm:ss.fff}
	Date (en-US) : {date.ToString(us)}
	Date (d en-US) : {date.ToString("d", us)}
	Date (en-US ShortDatePattern) : {date.ToString(shortUsDateFormatString)}
	Date (en-US ShortTimePattern) : {date.ToString(shortUsTimeFormatString)}
	""");

/* 
	Sortie pour un système d'exploitation ou un thread fr-FR

	Date : 20/08/2025 12:30:59
	Date (f) : mercredi 20 août 2025 12:30
	Date (g) : 20/08/2025 12:30
	Date (d) : 20/08/2025
	Date (t) : 12:30
	Date (dd-MM-yyyy HH:mm:ss.fff) : 20-08-2025 12:30:59.000
	Date (en-US) : 8/20/2025 12:30:59 PM
	Date (d en-US) : 8/20/2025
	Date (en-US ShortDatePattern) : 8/20/2025
	Date (en-US ShortTimePattern) : 12:30
 */
```

La culture informatique peut être utilisée par ailleurs pour tester une date dont le format est attendu sous cette culture. [ParseExact()](https://learn.microsoft.com/fr-fr/dotnet/api/system.datetime.parseexact "ParseExact()" _blank), [TryParseExact()](https://learn.microsoft.com/fr-fr/dotnet/api/system.datetime.tryparseexact "TryParseExact()" _blank).

## Avec les caractères

```C#
CultureInfo us = new CultureInfo("en-US");

string texte1 = "ét\u00e9";
string texte2 = "été";

Console.WriteLine($"""
	ét\u00e9: {texte1}
	été: {texte2}
	""");

/*
	ét\u00e9 : été
	été : été
 */

// Les valeurs sont-elles identiques ?
bool comparaison1 = texte1.Equals(texte2); // True
bool comparaison2 = texte1.Equals(texte2, StringComparison.Ordinal); // True
bool comparaison3 = texte1.Equals(texte2, StringComparison.CurrentCulture); // en fr-FR True
bool comparaison4 = us.CompareInfo.Compare(texte1, texte2, CompareOptions.IgnoreCase) == 0; // True
bool comparaison5 = string.Compare(texte1, texte2, ignoreCase: true, culture: us) == 0; // True
```

## Appliquer au programme

La culture informatique peut être nécessaire tout au long du programme. On peut la déclarer comme un objet que l'on passe aux entités utiles, aux fonctions de formatage. 

On peut aussi la déclarer pour tout le *thread* :

```C#
CultureInfo langueFrancaiseDeFrance = new CultureInfo("fr-FR");
Thread.CurrentThread.CurrentCulture = cultureFr;
```
