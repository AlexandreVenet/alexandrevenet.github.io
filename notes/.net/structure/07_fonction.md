# Fonction

Le 17-08-2024

La lampe d'Aladin est une fonction : elle prend en entrée le frottement sur sa surface et en retour elle fournit le génie.

## Structure

Une **méthode** est une **fonction** dans le **contexte d'une classe**. Mais alors qu'est-ce qu'une fonction ?

Une fonction est un **ensemble réutilisable** d'**instructions encapsulées** sous un **nom** en général en UpperCamelCase. Le principe de l'**encapsulation** est de regrouper des données et comportements fonctionnant ensemble dans une même entité, éléments n'ayant pas besoin d'être accessibles depuis l'extérieur. 

La fonction comprend :
- une **signature** : la première ligne (type retourné, paramètres d'entrée),
- des **paramètres** éventuels entre parenthèses (elles s'appellent **opérateur d'appel de méthode**),
- un **type et une valeur de retour**,
- un **corps** : le bloc d'instructions.

Les **paramètres** : 
- un paramètre est défini par son **type** et son **nom**,
- il peut avoir une **valeur par défaut**. Ex : `int val = 12`. Il est alors optionnel à l'usage. Les paramètres par défaut doivent être écrits **après** les paramètres nécessaires,
- si on veut un **nombre variable de paramètres**, utiliser le mot-clé `params`,
- passage par **référence en entrée et sortie** avec le mot-clé `ref`,
- passage par **référence en sortie seulement** avec `out`.

Si la fonction ne retourne rien, utiliser `void` en signature, sinon renseigner le type attendu. Pour **renvoyer une valeur** et terminer l'exécution de la fonction, utiliser le mot-clé-instruction `return`. Noter que `return` **interrompt la fonction** et les instructions qui la suivent dans la fonction ne seront pas exécutées.

```C#
private void MaFonction()
{
	float valeur = Additionner2Floats(3.2f, 95.35f);
}

private float Additionner2Floats(float a, float b)
{
	return a + b;
}
```

**Appeler** la fonction peut s'effectuer de deux manières selon qu'on souhaite récupérer ou non la valeur retournée. Si la fonction présente des paramètres, alors on **passe des arguments** :
- ce sont les **valeurs** fournies pour autant de paramètres,
- l’**ordre** des valeurs est **celui des paramètres**, mais **il peut être changé en précisant le nom du paramètre**. Ex : `val:20`,
- au besoin, utiliser `ref` ou `out`.

```C#
float x = Additionner2Floats(1.1f, 0.1f); 
// Récupérer la valeur de sortie
```

```C#
Additionner2Floats(1.1f, 0.1f); 
// Appel sans récupération - Cas de brillante inutilité ^^
```

## Code lisible et maintenable 

Une bonne pratique est de créer des fonctions qui n'ont qu'**un seul but, rôle ou action**. Ceci permet de conserver un **code lisible et maintenable**. Exemple avec Unity :

```C#
public int health = 100;
Light maLampe;
	
void Start ()
{
	transform.position = SetPosition(0,0,0);
	maLampe = gameObject.GetComponent<Light>(); 
}
	
void Update()
{
	if(Input.GetKey("space"))
	{
		Damage(5);
	}
	
	if(Input.GetKeyUp(KeyCode.L))
	{
		GererLampe();
	}
}
	
Vector3 SetPosition(float x, float y, float z)
{
	return new Vector3(x, y, z);
}
	
int Damage(int damageAmount)
{
	health -= damageAmount;
	if(health < 1)
	{
		health = 0;
		Destroy(this.gameObject);
	}
}
	
void GererLampe()
{
	maLampe.enabled = !maLampe.enabled;
}
```

## Surcharge de méthode

Le ***method overloading*** consiste à proposer des **variations** d'une fonction. Contraintes :
- le **nom** de la fonction doit être **identique**,
- les **paramètres** doivent être **différents**.

Ainsi, on peut par exemple, réaliser une seule fonction `Ajouter()` qui a plusieurs surcharges.

```C#
public int Ajouter(int a, int b)
{
	return a + b; 
}

public string Ajouter(string a, string b)
{
	return a + b; 
}
```

On appelle cette fonction selon la signature désirée. Lors de l'écriture de code, l'*IntelliSense* fournira les possibilités.

```C#
int nbre = Ajouter(1,2);
string toto = Ajouter("To", "to");
```

L'ordre de traitement par le système est le suivant :
1. recherche de signature exacte ; si cette version de la méthode est trouvée, elle est renvoyée,
2. si non trouvée, recherche de signature comprenant le moins de conversion de type à effectuer ; si cette version de méthode est trouvée, elle est renvoyée,
3. si non trouvée ou s'il n'y a que des versions ayant le même niveau de conversion, alors renvoi d'erreur.

Une étape d'abstraction est franchie lorsqu'on passe du *method overloading* aux ***generics*** (voir chapitre idoine).

## Valeur et référence en paramètre

Sources : 
- [OpenClassRooms Méthodes C#](https://openclassrooms.com/fr/courses/218202-apprenez-a-programmer-en-c-sur-net/216676-les-methodes _blank)
- [PluralSight *in out ref parameters*](https://www.pluralsight.com/guides/csharp-in-out-ref-parameters _blank)

Une variable de **type valeur** passée en paramètre est **copiée localement**, c'est-à-dire que cette copie existe en *Stack* le temps de la fonction (dans le corps de la méthode délimité par les accolades). Ainsi, aucun changement sur l'argument ne se répercute à l'extérieur de la méthode. On peut donc dans la fonction modifier la **valeur de l'argument**, et cela sans modifier la **valeur de variable passée en argument** puisque la fonction opère sur une copie.

```C#
private void ChangerInt(int val) 
{
	Console.WriteLine("val = " + val); 
	val = 5;
	Console.WriteLine("val = " + val);
}
private int nombre = 1;
ChangerInt(nombre); // nombre = 1 
```

Une variable de **type référence** peut être passée en argument. Rappelons : un type référence est en mémoire *Heap*, et une variable typée en mémoire *Stack* pointe vers cette référence. Alors, la variable passée est copiée dans la fonction mais ces deux variables pointent vers le même emplacement mémoire en *Heap*. Donc, les changements sur l'argument se répercutent à l'extérieur de la méthode.

Maintenant, on peut modifier le comportement des méthodes relatif aux variables de façon à effectuer des **passages par référence**. Ici, la variable en *Stack* **n'est pas copiée** dans la fonction ; on agit sur la référence.
- `ref` : lecture et écriture ; la variable **doit être initialisée avant appel** de la méthode et va être modifiée par la méthode. [MSDN Ref](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/ref _blank)
- `out` : écriture seule ; la variable **peut ne pas être initialisée préalablement** et va être initialisée ou modifée par la méthode (la variable n'est pas lue, elle est seulement écrite). [MSDN Out](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/out-parameter-modifier _blank)
- `in` : lecture seule ; la variable **doit être initialisée avant appel** de la méthode, pour établir que la variable passée **ne peut pas être modifiée** par la méthode.

Et comment **forcer un passage par valeur** ? Eh bien, si ce n'est pas déjà un type valeur, alors il faut effectuer une copie avant l'appel de méthode.

```C#
private void maFonction(ref int val)
{
	val += 1;
}
int toto = 0;
maFonction(ref toto) ; // toto = 1
```

```C#
private Rigidbody2D rb2d;
if(TryGetComponent<rigidbody2D>(out rb2d))
{
	// Intervenir sur rb2d
}
```

```C#
_audioMixer.GetFloat("NomParametreExpose", out float masterVolume);
float test = masterVolume; // lecture
```

```C#
private void AssignerNombre(out int i)
{
	i = 1;
}
int nombre;
AssignerNombre(out nombre); // nombre = 1;
```

`out` et `ref` ont l'avantage de permettre à une fonction de **renvoyer plusieurs valeurs**. Par exemple `int.TryParse("123", out monNombre)` utilise une variable en paramètre sur laquelle intervenir, tout en renvoyant un booléen signifiant l'état de réussite.

Pour expliciter le fait qu' `out` déclare une variable, il peut être nécessaire d'ajouter une ligne d'assignation de valeur par défaut.

```C#
public bool TryDoThing(string str, out int toto)
{
	toto = default; // Visual Studio oblige à renseigner une valeur
	
	if(str.Length > 10)
	{
		toto = str.Length;
	}
	
	return true;
}
```

Maintenant, les types référence peuvent avoir la valeur `null`. Donc, avec `ref` ou `out`, il convient de **tester si les valeurs obtenues sont non nulles**. Pour cela, on passera par des tests (voir chapitre Opérateurs).

## Syntaxe simplifiée

C# propose la **syntaxe simplifiée des fonctions à une ligne** ; le `return` y est alors implicite. Ceci fonctionne aussi avec les fonctions `void`. C'est la syntaxe d'**expression lambda**. [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/csharp/language-reference/operators/lambda-expressions _blank)

```C#
public int Quotient(int nombre, double diviseur) => (int)(nombre/diviseur); 
// Noter la troncature
```

```C#
private void DireToto() => Debug.Log("Toto");
```

## Fonctions imbriquées

Oui, il est tout à fait possible d'imbriquer une fonction dans une autre. La fonction locale est alors disponible uniquement à sa fonction hôte. Ceci peut s'avérer utile lorsqu'il s'agit d'éviter de complexifier une classe (seule la méthode hôte utilise cette fonction, donc pourquoi ne pas la rendre locale). Pratique  discutable néanmoins.
