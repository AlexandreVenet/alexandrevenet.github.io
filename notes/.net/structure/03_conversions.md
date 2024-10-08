# Conversions

Le 16-08-2024

Prendre une donnée d'un type et la transformer pour un autre type.


## Présentation

Lorsque deux variables ont le même type, cela signifie qu'elles possèdent la même taille en mémoire. La valeur de l'une peut donc être récupérée, utilisée, par l'autre. 

La **conversion de type** consiste à changer le type de données d'une entité dans un autre. Exemple : copier un `double` dans un `int`. 

## Conversion implicite

La **conversion implicite/étendue** est **automatique** d'un type simple/petit vers plus complexe/grand **lorsqu'il n'y a pas de perte de données ou de précision**. 

```C#
int entier = 10;
double entierEnDouble = entier; // la valeur 10 prend juste plus de place en mémoire
int doubleEnInt = entierEnDouble; // erreur
```

L'ordre des tailles de types numériques est le suivant :

```
byte < short < int < long < float < double < decimal 
```

Le caractère peut aussi être converti implicitement :

```
char < int ...puis idem précédent
```

## Conversion explicite

La **conversion explicite/restrictive** (ou *cast*) est **manuelle** d'un type complexe/grand vers un plus simple/petit **lorsqu'il y a un risque de perte de précision ou de donnée**. La conversion explicite est le moyen d'informer le compilateur que la conversion est intentionnelle et maîtrisée malgré la perte d'information.

Deux opérateurs de conversions explicites sont proposées :
- `(monType)` : si problème, lève une exception,
- `as monType` : si problème, renvoie `null`. Par conséquent, ne fonctionne qu'avec des types référence.

Exemple : convertir un `float` en `int` conduit à penser la **troncature** ou l'**arrondi**.

```C#
float number = (int) 2.5f ; 
// 2.5 converti en entier puis affecté à une variable de type float
```

La **conversion explicite** pouvant échouer, il convient de savoir ce que le compilateur peut convertir ou non. Si une conversion explicite est impossible, alors préférer une autre solution, par exemple la méthode d'assistance `Convert` ou tout autre traitement approprié comme les méthodes de type (`int.TryParse()` par exemple).

Enfin, la conversion explicite est en fait un appel de méthode spécifique dont on ne voit pas la teneur.

```C#
double numero = 1.2;
int entier = (int) numero; // 1 (troncature)
int entierParConvert = Convert.ToInt32(numero); // 2 (arrondi)
```

Pour s'assurer de la possibilité d'une conversion, on peut s'en remettre au **polymorphisme** et l'opérateur `is` (voir chapitre en question).

## Conversion par classe d'assistance

La conversion par **classe d'assistance** consiste à faire appel à des fonctions prêtes à l'emploi, comme `System.Convert()` ou `TypeConverter()`. 

Le résultat peut être différent d'une conversion explicite. Par conséquent, utiliser la classe `Convert` pour effectuer une conversion restrictive avec un arrondi.

```C#
int i1 = (int) 1.5m; 
// troncature, conversion explicite
```

```C#
int i2 = Convert.ToInt32(1.5m); 
// arrondi supérieur, conversion par classe d'assistance 
```

## Conversion par méthode de type

Parmi les fonctions et propriétés spécifiques, les type proposent des **méthodes de conversion spécifiques à leur type**, comme `Parse()` ou `TryParse()` du type `int`. 

Ces fonctions permettent des conversions entre types qui ne sont **pas de la même catégorie**. Exemple : chaîne de caractères vers entier.

```C#
// Effectuer la conversion quelle que soit la valeur d'entrée
int i = int.Parse("2");
```

```C#
// Tester la conversion puis retourner la valeur si cela fonctionne
int.TryParse(age, out age); 
// renvoie un booléen ; "age" contient la valeur
```

## Cas des types référence

Pour les **types référence**, le compilateur, reconnaissant par exemple les **interfaces** implémentées ou l'**héritage**, peut cibler automatiquement un type par un autre. Ce n'est pas vraiment une conversion : l'objet ne change pas de type mais est simplement **considéré selon un autre type dont il hérite** (voir le polymorphisme).

```C#
string text = "text";
IFormattable formattable = text;
```

## Exemple : string et enum

Voici un exemple d'une valeur de type `string` convertie en une valeur de type `enum`. [Source StackOverflow](https://stackoverflow.com/questions/15394032/difference-between-casting-and-using-the-convert-to-method _blank)

```C#
enum MesRelations { Toto, Tata, Titi }
string monTexte = "Toto";
MesRelations chose = (MesRelations) System.Enum.Parse(typeof(MesRelations), monTexte);
```
