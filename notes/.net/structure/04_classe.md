# Classe

Le 16-08-2024

Construction qui définit des attributs et des actions.

## L'objet

Un **objet** : 
- est une entité d'un certain **type**, 
- entité **identifiée** (numéro, chaîne de caractères, adresse mémoire...) et donc **unique**,
- qui possède des **caractéristiques/attributs** (champs),
- qui peut effectuer des **actions** (méthodes) ou dit autrement qui a des comportements,
- et qui est préécrite sous forme de **classe**.

Attributs et actions : ce sont les **membres** de la classe. 
- Si la classe s'**instancie en objet**, alors ces membres **appartiennent à l'objet**.
- Si la classe est **statique** (pas d'instanciation), alors ces membres **n'appartiennent à aucun objet**.

Il y a donc séparation :
- entre l'**objet** et sa **définition**,
- entre l'**implémentation** et l'**utilisation**.

Tout ceci conduit au principe d'**encapsulation** : le fonctionnement interne d'une classe n'est pas exposé lors de l'usage de cette classe. Le développement doit être orienté de façon à respecter ce principe. Il s'agit de considérer toute classe ou membre d'abord `private` et de changer cette visibilité seulement si c'est nécessaire.

## Classe

La **classe** est ce qui **définit** l'objet. Elle est une unité logique. La classe est un type **référence** : des variables pointent vers le même emplacement mémoire. 

La classe contient des champs (attributs) et des méthodes (actions). En général, une classe prend la forme d'un fichier C# de même nom, par exemple **Toto.cs**.

```C#
namespace MonProgramme;

public class Toto
{
	// Champs
	private string _bonjour = "Bonjour !";
	
	// Méthodes
	public void DireBonjour()
	{
		Console.WriteLine(_bonjour);
	}
}
```

L'**objet** peut être considéré comme la **réalisation** de l'idée qu'est la classe. Par exemple, un lit est défini par telles parties, tels concepts, et mon lit est une réalisation, un cas concret d'idée de lit. Créer l'objet d'une classe, c'est effectuer ce qu'on appelle une **instanciation** de la classe ; pour cela, on utilise l'opérateur `new` qui présente plusieurs syntaxes.

```C#
Toto o1 = new Toto();
```

```C#
Toto o2 = new();
```

```C#
var 3 = new Toto();
```

Que fait l'opérateur `new` ?
- Allouer un espace mémoire correspondant à la donnée à y stocker et en obtenir une adresse.
- Créer l'objet et le stocker en mémoire.
- Retourner l'adresse pour l'affecter à la variable.

## Accès

Le **niveau d'accessibilité** désigne la **visibilité d'un membre**, d'une classe. On définit cela par un mot-clé dit **modificateur d'accès**. 

**Classe non imbriquée** :
- `private` : inaccessible,
- `public` : accessible à tous les scripts,
- `internal` : accessible seulement dans l'*assembly* actuel,
- `partial` : définit une partie de la classe qui est écrite dans plusieurs fichiers.
 
**Membre de classe non imbriquée** :
- `private` : accessible seulement à la classe ou à l'instance,
- `public` : accessible à tous les scripts,
- `internal` : accessible seulement dans l'*assembly* actuel,
- `protected` : accessible seulement à la classe et ses dérivées,
- `protected internal` : accessible seulement à la classe et ses dérivées et ce dans l'*assembly* actuel.

**Classe imbriquée** :
- `private` : accessible seulement à la classe englobante,
- `protected` : accessible à la classe de base et ses dérivées,
- `protected internal` : accessible à la classe de base et ses dérivées et ce dans l'*assembly* actuel.

Exemple de déclaration (sans assignation) d'un champ :

```C#
private int monEntier;
```

On peut expliciter l'accessibilité des variables en préfixant leur nom d'un identifiant. Par exemple, la **notation hongroise** ([Wikipédia Notation hongroise](https://fr.wikipedia.org/wiki/Notation_hongroise _blank)) :
- les champs `private` et `protected` avec un ***underscore*** `_`,
- les champs `public` avec `m_` (pour « membre »),
- les propriétés avec `m_` ou `p_`,
- ... tout ceci dans la mesure de la lisibilité et la compréhension.

Toute variable est **privée par défaut**, ceci pour respecter et inciter le développeur à respecter le principe d'**encapsulation** (réduire l'exposition des membres). C# autorise l'**absence du mot-clé** `private` mais l'explicitation reste une bonne pratique (*a fortiori* lorsqu'on code aussi en Java où tout est au contraire par défaut public dans le paquetage). En général, tout membre doit être d'abord pensé `private` ; c'est seulement s'il est **nécessaire** d'y accéder autrement qu'on change sa visibilité. 

## this

Dans la classe, pour accéder à un membre, on peut :
- l'appeler directement : `nom`, `Faire()`,
- l'appeler en ciblant l'instance courante avec `this` : `this.nom`, `this.Faire()`.

Utiliser `this`, c'est **référer à l'instance courante**. Ce mot-clé **peut toutefois être omis** car le compilateur l'ajoutera automatiquement s'il manque.

Dans Visual Studio, taper `this.` a pour effet d'afficher l'*IntelliSense* et de proposer les membres.

## Méthodes

On appelle **méthode** une fonction lorsqu'elle existe dans le contexte d'une classe. Le modèle est le suivant :

```
accessibilité typeRetour Nom(paramètres)
{
	instructions
}
```

On l'**appelle** avec l'opérateur *dot* selon ce modèle :

```C#
monObjet.NomMethode(paramètres);
```

## Constructeur

Un **constructeur** accompagne toute classe. C'est une fonction nécessaire à l'instanciation et qui se déclenche une fois l'objet créé en mémoire. Son but : définir les valeurs de l'objet, lancer des instructions. 

Le constructeur est une **méthode sans retour de même nom que la classe**. On peut très bien le **surcharger** afin de proposer différentes manières d'instancier la classe. **Un seul constructeur est utilisé pour l'instanciation** ; pour choisir le constructeur, il suffit d'utiliser la **signature** correspondante. 

Côté accessibilité :
- `private` : instanciation impossible,
- `public` : instanciation autorisée à tout script,
- `internal` : instanciation possible seulement par les entités de l'*assembly* actuel,
- `protected` : instanciation possible par la classe actuelle et ses dérivées,
- `protected internal` : instanciation possible par la classe actuelle et ses dérivées et ce pour l'*assembly* actuel.

Si la classe n'explicite pas de constructeur, le compilateur en ajoutera un sans paramètre ni contenu ; on parle de **constructeur par défaut**. On peut néanmoins écrire ce constructeur par défaut : entrer `ctor` dans Visual Studio puis appuyer sur la touche `tab`. Disposer d'un constructeur vide peut être très utile lorsque par exemple on souhaite disposer de l'objet avant sa manipuation ou pour prévoir des développements ultérieurs de la classe.

`this.` est nécessaire dans le constructeur pour **éviter une ambiguïté** entre le nom d'un paramètre passé et le nom d'un champ ou d'une propriété qui va accueillir la valeur.

```C#
class MaClass
{
	private int x;
	public MaClasse(int x)
	{
		this.x = x; 
	}
}
```

**Les constructeurs peuvent être chaînés**.

```C#
private bool _demarree;
private bool _roule;
private string _modele;

public Voiture()
{
	// L'objet est instancié, définissons intentionnellement les valeurs
	_demarree = false;
	_roule = false;
}

public Voiture(string modele) : this() // appelle le constructeur précédent...
{
	//... puis :
	_modele = modele;
}
```

## Instanciation

Lors de l'**instanciation**, tous les champs de l'objet prennent leur valeur par défaut ou celle qui leur est affectée :
- affectée en **assignant** une valeur lors de la déclaration des champs, ce qui a une certaine limite car les champs ne peuvent pas être en relation,
- affectée en passant par un **constructeur**.

Pour **créer un objet**, il faut :
- déclarer un objet du type de la classe,
- lui affecter une valeur du type de la classe en appelant le constructeur et en utilisant le mot-clé `new`,
- ou bien initialiser, c'est-à-dire faire les deux étapes en une ligne.

Pour accéder aux caractéristiques exposées et utilisables, utiliser l'**opérateur point** (*dot*). Exemple :

```C#
public class Personnage
{
	public Vector3 m_position;
	
	public Personnage()
	{
		m_position = Vector3.zero;
	}
	
	public Personnage(Vector3 position)
	{
		m_position = position;
	}
	
	public void DireBonjour()
	{
		Debug.Log("Bonjour"):
	}
}

Personnage toto = new Personnage(new Vector3(0,1,2));
toto.DireBonjour();
Debug.Log(toto.m_position);
```

Côté mémoire :
- le *CLR* fait une requête d'espace mémoire au système d'exploitation de la taille du type demandé,
- le constructeur de chaque caractéristique est exécuté,
- si constructeur personnel, alors lancement,
- le *CLR* retourne la référence de l'objet au programme qui a lancé l'instanciation,
- ... par conséquent, puisque chaque type a un constructeur, alors les types se chargent d'un traitement de données. On évaluera donc le besoin d'un constructeur dans chaque situation.

Le constructeur peut être `static`. Il est alors lancé **une seule fois**, **avant la première instanciation** et **avant tout constructeur d'instance**. Pas de visibilité à définir. Cela peut être utile pour définir à l'exécution la valeur de champs eux-mêmes `static`. Voir chapitre Static.

```C#
public class MaClasse
{
	private static int compteur = 0; // valeur définie à la compilation
	private int identifiant;
	
	static MaClasse()
	{
		compteur = 100; // valeur définie à l'exécution
	}
	
	public MaClasse()
	{
		identifiant = MaClasse.compteur;
		compteur ++;
	}
}
```

## Constante, lecture seule

Un champ est souvent modifié pendant la durée de vie de la classe où il est déclaré. Il est possible de verrouiller la valeur du champ, donc rendre le champ **immuable**, avec un mot-clé : `const` ou `readonly`.

`const` : la valeur est celle renseignée lors de l'écriture de l'instruction. Une constante doit avoir une valeur et son nom s'écrit conventionnellement en majuscules.

```C#
private const int AGE = 10;
```

`readonly` : la valeur peut être affectée au *runtime* à partir de l'écriture de l'instruction (idem précédent) ou bien du constructeur. Le champ n'est immuable qu'après affectation de la valeur.

```C#
private readonly DateTime maintenant = DateTime.Now.Date;
```

```C#
class MaClasse
{
	private readonly DateTime maintenant;
	
	public MaClasse()
	{
		maintenant = DateTime.Now.Date;
	}
}
```

## Champs et propriétés

Source : [MSDN Propiétés](https://docs.microsoft.com/fr-fr/dotnet/csharp/properties _blank)

Les **champs** sont des variables, accompagnés du modificateur d'accès, déclarés à la racine de la classe. 

Les champs ne peuvent pas se référer les uns aux autres au niveau racine. Pour récupérer des valeurs, dans Unity par exemple lors d'une initialisation, on code dans `Awake()` ou `Start()`. Il y a néanmoins des exceptions.

```C#
// Champs avec valeurs
int difficulteFacile = 0;
int difficulteMoyenne = 1;
int difficulteDure = 2;
	
// public int maDifficulte = difficulteFacile; // génère une erreur
public int maDifficulte;
	
void Start()
{
	maDifficulte = difficulteFacile; // ok	
}
```

Les champs sont accessibles en général en **lecture** et **écriture**. Ils reçoivent toute valeur selon leur type. Exemple : l'âge d'un chat serait alors `-500`, `0`, `5`, `15623`... Or, on peut vouloir que ces valeurs représentent une certaine réalité, aient un sens d'un point de vue « métier ». Alors, il s'agit d'éviter que l'utilisateur de la classe produise des contenus incohérents. Pour cela, l'enjeu est :
- **limiter l'accès** aux membres de la classe avec des **modificateurs d'accessibilité**,
- **contrôler la valeur** des champs... mais comment ?

On peut coder des méthodes de contrôle que sont les ***getters*** et ***setters***, comme en Java. On traduit par **accesseurs** et **mutateurs** ; ou bien dans Java les deux sont des accesseurs dont chacun a un rôle spécifique *getter* et l'autre *setter*. 

```C#
private int nombre;

public bool SetNombre(int num)
{
	bool valeur = false;
	if(num >= 0 && num <= 100)
	{
		nombre = num;
		valeur = true;
	}
	return valeur;
}

public int GetNombre() => nombre; // raccourci avec opérateur lambda
```

Source : [MSDN Opérateur lambda](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/lambda-operator _blank)

C# propose aussi les **propriétés**. Une propriété **encapsule** un champ. Lors de l'utilisation, **la propriété donne l'impression de manipuler un champ**. En général, le nom est en UpperCamelCase et est le même que le champ encapsulé. Une fois la propriété réalisée, penser à placer le champ correspondant en `private` si ce n'est pas fait automatiquement, pour que le champ reste sous le seul contrôle de la propriété (au moins vis-à-vis de l'extérieur de la classe), ce qui respecte le principe de l'encapsulation.

```C#
private type champ;

public type Champ 
{
	get { return champ; }
	set { champ = value; }
}

public type ChampSyntaxeLambda
{
    get => champ;
    set => champ = value;
}
```

On **accède** à la propriété d'un objet avec l'opérateur *dot* :

```C#
Console.WriteLine(objet.MaProp); // lecture
objet.MaProp = 2; // écriture
```

`get{}` et `set{}` autorisent toute sorte de code, et pas seulement une vérification de valeur de variable. Inconvénient : le *setter* ne fournit pas de valeur de retour, si cela s'avère nécessaire ; on s'en remettra alors à une fonction dédiée.

Ces contrôles s'effectuent avant les fonctions héritées (par exemple dans Unity, `MonoBehaviour` : `Start()`, `Update()`...). 

On peut définir le niveau d'accessibilité de ces contrôles un à un ; mais dans ce cas la propriété, elle, doit rester `public`. 

Enfin, dans cette syntaxe, on peut définir des propriétés ***read-only*** ou ***write-only***, ou ***read-write***. Pour cela, utiliser des modificateurs d'accès ou omettre la fonction non désirée.

```C#
public class GameManager : MonoBehaviour
{
	bool _isGameOver; // le champ privé
	
	public bool IsGameOver // sa propriété publique 
	{
		get // getter public
		{
			return _isGameOver; // renvoyer la valeur
		}
		protected set // setter pour la classe et ses dérivées seulement
		{
			if(value == true) // "value" représente la valeur reçue
			{
				Debug.Log("GameOver !");
			}
			_isGameOver = value; // assigner la valeur au champ
		}
	}
	
	void Start()
	{
		IsGameOver = false; // écriture
	}
	
	void Update()
	{
		if(Input.GetKey(KeyCode.Space))
		{
			bool toto = IsGameOver; // lecture
		}
	}
}
```

Autre exemple (avec opérateur conditionnel ternaire) : 

```C#
public bool PauseGame
{
	get
	{
		return Time.timeScale == 0f ? true : false ;
	}
	set
	{
		Time.timeScale = value ? 0f : 1f ;
	}
}
```

Noter que C# autorise la **création de propriété sans champ correspondant**. Avantage : rapidité, données dynamiques. 

Les **propriétés auto-implémentées** sont un moyen commode et rapide de déclarer les *getters* et *setters* lorsqu'il n'est pas exigé de contrôler plus avant le contenu. Dans Visual Studio, taper `prop` et deux fois la touche de tabulation ; ou sélectionner un champ puis `CTRL+R` ou `CTRL+E` ou bien clic droit `Refactoriser > Encapsuler le champ...` pour en générer une propriété. Particularités :
- les contrôles ne peuvent pas être codés plus spécifiquement,
- `get` et `set` doivent être présents,
- le compilateur intègre le champ automatiquement. Par exemple, le champ `nombre` et la propriété `Nombre{get;set;}` ne sont absolument pas corrélés même si leur nom respecte une certaine syntaxe.
- avant C# 6, impossible d'assigner une valeur de départ, il faut passer par une initialisation différée (dans `Start()` par exemple). Avec C# 6, un peu de bonheur :

```C#
public bool Youpi {get; private set;} = true;
```

On peut définir une propriété de façon à ce que la **valeur soit définie une seule fois à la création de l'instance** (ne fonctionne pas en classe `static`). On utilise le mot clé `init`. Le mot-clé fonctionne également avec une propriété encapsulant un champ déclaré. Pour une propriété de type valeur, si aucune assignation n'est effectuée, alors la propriété prendra la valeur par défaut du type ; pour un type référence, renseigner une valeur sera obligatoire à l'instanciation. Le comportement est le suivant :
- lors de l'instanciation, le constructeur peut *set* une valeur en utilisant la propriété,
- une fois l'objet créé, le *setter* n'est plus disponible.

```C#
public class MaClasse
{
	public string Nom { get; init; }
	
	public int Valeur { get; init; } = 10;
	
	private int _id;
	public int Id 
	{ 
		get => _id; 
		init => _id = value; 
	}

	public MaClasse(string nom)
	{
		Nom = nom;
	}
}

// Usage

MaClasse sousClasse = new ("Toto");

Console.WriteLine(sousClasse.Nom); // Toto
Console.WriteLine(sousClasse.Valeur); // 10
Console.WriteLine(sousClasse.Id); // 0

MaClasse autre = new (); // compilation impossible
```

Or, il peut se présenter le cas où on ne peut/veut pas utiliser de constructeur pour une propriété marquée `init` et à laquelle il faut pourtant assigner une valeur depuis l'extérieur de l'instance. Alors, comment effectuer l'affectation à l'instanciation ? En utilisant la syntaxe d'initialiseur (voir paragraphe suivant). Alors, lors de l'écriture de l'instruction, Visual Studio affiche en IntelliSense que le champ est obligatoire.

```C#
public class Chose
{
	public required string Nom { get; init; }
}

// Usage

Chose bidule = new() { Nom = "Bibi" };

Console.WriteLine(bidule.Nom); // Bibi
```

## Initialiseurs

La syntaxe des **initialiseurs** permet de réduire l'usage ou le nombre de constructeurs en accédant aux champs ou propriétés `public` depuis l'extérieur. Comparer les exemples suivants. [MSDN Coding Conventions](https://docs.microsoft.com/fr-fr/dotnet/csharp/fundamentals/coding-style/coding-conventions _blank)

```C#
var monObj = new Exemple();
monObj._nom = "Toto"; // champ
monObj.ID = 37414; // propriété
```

```C#
var monObj = new Exemple() // ou "new()", ou "new Exemple"
{ 
	_nom = "Toto", // champ
	ID = 37414, // propriété
};
```

## Destructeur

La classe peut possèder un destructeur, appelé **finaliseur**. Lorsqu'il existe, il est appelé par le *garbage collector* lorsque ce dernier effectue la désallocation mémoire d'un objet en *Heap*. Ce finaliseur peut être codé, en particulier avec le ***Dispose pattern***, pour contrôler plus finement la désallocation (voir chapitres Diposable et Object). [MSDN Finalizers](https://docs.microsoft.com/fr-fr/dotnet/csharp/programming-guide/classes-and-structs/finalizers _blank)

```C#
class maClasse
{
	~maClasse()
	{
		// instructions avant nettoyage mémoire...
	}
}
```

## Exploration de classe

On peut accéder à une variable par son nom lors d'une **exploration des membres** de la classe. 

```C#
public class MonObj
{
	public float toto = 10.5f;
}
	
MonObj obj = new MonObj();
	
float monFloat = (float) obj.GetType().GetField("toto").GetValue(obj);
```
