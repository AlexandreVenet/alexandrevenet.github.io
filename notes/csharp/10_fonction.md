# Fonction

Le 23-09-2022

La lampe d'Aladin a une fonction ouverte sur l'extérieur : elle prend en paramètre le frottement sur sa surface et en retour elle fournit le génie.

## Structure

Une **fonction** est un **ensemble réutilisable** d'**instructions encapsulées** sous un **nom** en général en UpperCamelCase. Le principe de l'**encapsulation** est de regrouper des données et comportements fonctionnant ensemble dans une même entité, éléments n'ayant pas besoin d'être accessibles depuis l'extérieur. 

Elle comprend :
- une **signature** : la première ligne (type retourné, paramètres d'entrée),
- des **paramètres** éventuels entre parenthèses (elles s'appellent "**opérateur d'appel de méthode**"),
- un **type de retour**,
- un **corps** : le bloc d'instructions.

Les **paramètres** : 
- un paramètre est défini par son **type** et son **nom**,
- il peut avoir une **valeur par défaut**. Ex : `int val = 12`. Il est alors optionnel à l'usage. Les paramètres par défaut doivent être écrits **après** les paramètres nécessaires,
- si on veut un **nombre variable de paramètres**, utiliser le mot-clé `params`,
- passage par **référence en entrée et sortie** avec le mot-clé `ref`,
- passage par **référence en sortie seulement** avec `out`.

Si la fonction ne retourne rien, utiliser `void` en signature, sinon renseigner le type attendu. Pour **renvoyer une valeur** et terminer l'exécution de la fonction, utiliser le mot-clé-instruction `return`. Noter que `return` **interrompt la fonction** et les instructions qui la suivent dans la fonction ne seront pas exécutées.
```
private void Awake()
{
	float valeur = Additionner2Floats(3.2f, 95.35f);
	Debug.Log(valeur);
}

private float Additionner2Floats(float a, float b)
{
	int resultat = a + b;
	return resultat;
}
```

**Appeler** la fonction peut s'effectuer de deux manières selon qu'on souhaite récupérer ou non la valeur retournée. Si la fonction présente des paramètres, alors on **passe des arguments** :
- ce sont les **valeurs** fournies pour autant de paramètres,
- l’**ordre** des valeurs est **celui des paramètres**,
- l’ordre des valeurs **peut être changé en précisant le nom du paramètre**. Ex : `val:20`,
- au besoin, utiliser `ref` ou `out`.

```
type var = NomMethode1(param1, param2); // récupérer la valeur de sortie
nomMethode2(); // appel sans récupération
```

## Dans Unity

Dans Unity, les objets actifs présentent autant de fonctions gérées par le moteur logiciel. 

En mode *Game* par exemple, le moteur lit le code dans une vaste **boucle** où chaque itération est une ***frame***.

Certaines fonctions sont **appelées automatiquement**, ce sont les ***callbacks*** héritées de la classe **MonoBehaviour**. Ces fonctions sont là pour faciliter le travail du développeur (non obligatoire de les déclarer toutes si on ne se sert que de quelques-unes). Ces fonctions sont par défaut `private`. Elles font l'objet d'un **ordre de traitement** par le moteur. [Unity Ordre d'exécution](https://docs.unity3d.com/Manual/ExecutionOrder.html "Unity Ordre d'exécution")


I - `Awake()` :
- appelée **au chargement du script**, de la scène, même si **composant de script non activé** (dans l'`Inspector` la case du composant script est décochée). Donc, appelée en général au **démarrage du jeu**, première *frame*, où tous les objets sont instanciés,
- appelée avant `Start()`,
- lancée **une fois**, 
- sert en général à **déclarer des références** entre les scripts et l'initialisation effectuée avec `Start()` ; permet aussi de définir l'**ordre** dans lequel on veut que les scripts se lancent.

II - `Start()` :
- sert à l'**initialisation** de l'objet,
- se lance **une seule fois** avant le premier `Update()` (avant la première *frame*) seulement si **composant de script activé** (dans l'`Inspector` la case du composant script est cochée). Donc : désactiver/activer le composant ne relance pas `Start()`,
- par conséquent : peut servir au debug ou à différer du code à initialiser seulement lorsque nécessaire (ex :un  ennemi avec `Awake()` a des munitions et une arme mais ne peut tirer que si `Start()` est lancée, *cad* lorsque le composant de script est activé).

Ensuite, le **moteur physique** démarre. Il est autonome et peut continuer de calculer pendant que le **moteur de rendu** démarre à son tour. Ainsi, les deux processus opèrent en **parallèle**.

III - `FixedUpdate()`, **moteur physique** :
- réservée à la gestion **physique** des objets, 
- appelée **à chaque pas de temps de moteur physique**, *cad* que ce gestionnaire peut être appelé plusieurs fois par *frame* si son propre *framerate* est plus bas que celui d'`Update()`,
- a son **propre *framerate***. Par conséquent, le *framerate* du moteur physique peut être différent du *framerate* du moteur visuel, ce qui implique de coder selon le moteur (par exemple : les valeurs d'entrées en `Update()` et les déplacements physiques en `FixedUpdate()`).

IV - **Moteur de rendu** :
- `Update()` :
	- appelée **avant chaque *frame* de moteur visuel**,
	- c'est ici qu'on code l'**action** des objets : bouger des objets non physiques, chronomètres (*timers*) simples, entrées...
	- ne dépend pas du temps mais de la complexité du calcul à opérer : si une *frame* est plus longue à calculer qu'une autre, alors il faudra attendre qu'elle ait fini pour passer à la suivante.
- `LateUpdate()` :
	- appelée à la **fin de chaque *frame***, après `Update()`,
	- utile pour les **caméras** : l'objet est d'abord calculé (collisions, positions, etc.) sans influencer la caméra codée en fin de traitement.

Noter que si un script n’a pas `Update()`, alors on ne peut pas activer/désactiver ce composant dans l’`Inspector` et il reste toujours actif.

D'autres fonctions peuvent être utiles et s'inscrivent toutes à un certain moment dans la boucle de calcul de la *frame*. Par exemple :
- `OnEnable`, `OnDisable` : déclenchée à tout moment lorsque le `GameObject` est activé ou désactivé, 
- `OnMouseDown`, `OnMouseUp` : bouton souris pressé ou relâchée avec détection de collider (pas besoin de le chercher, on peut coder par exemple : `Destroy(gameObject);`),
- `OnDestroy()` : événement lors de la destruction de l'objet courant,
- `OnCollisionEnter`, `OnTriggerExit`...
- ...
 
Dans Unity, les **composants** respectent l'**encapsulation**. Un composant :
- regroupe un ensemble de comportements formant une fonctionnalité (exemple : `AreaEffector`),
- n'expose aux autres composants qu'un sous-ensemble de ses membres (ce qui est décrit dans la documentation).

## Code lisible et maintenable 

Une bonne pratique est de créer des fonctions **par rôle ou action** et ne laisser que le minimum dans les fonctions, ceci afin de conserver un **code lisible et maintenable**. Exemple avec Unity :
```
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
		Damage(5);
	
	if(Input.GetKeyUp(KeyCode.L))
		GererLampe();
}

Vector3 SetPosition(float x, float y, float z)
{
	Vector3 pos = new Vector3(x, y, z);
	return pos; 
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

Le ***method overloading*** consiste à proposer des variations d'une seule et même fonction à des types, traitement et paramètres différents. Contraintes :
- le **nom** de la fonction doit être **identique**,
- les **paramètres** doivent être **différents**.

Ainsi, on peut par exemple, réaliser une seule fonction `Ajouter()` qui a plusieurs surcharges.
```
public int Ajouter(int a, int b)
{
	return a + b; 
}
public string Ajouter(string a, string b)
{
	return a + b; 
}
```

On appelle cette fonction selon la signature désirée. Lors de l'écriture de code, l'*Intellisense* fournira les possibilités.
```
int nbre = Ajouter(1,2);
string toto = Ajouter("To", "to);
```

L'ordre de traitement par le système est le suivant :
1. recherche de signature exacte ; si cette version de la méthode est trouvée, elle est renvoyée,
2. si non trouvée, recherche de signature comprenant le moins de conversion de type à effectuer ; si cette version de méthode est trouvée, elle est renvoyée,
3. si non trouvée ou s'il n'y a que des versions ayant le même niveau de conversion, alors renvoi d'erreur.

Une étape d'abstraction est franchie lorsqu'on passe du *method overloading* aux ***generics*** (voir chapitre idoine).

## Valeur et référence en paramètre

Références : 
- [OpenClassRooms Méthodes C#](https://openclassrooms.com/fr/courses/218202-apprenez-a-programmer-en-c-sur-net/216676-les-methodes "OpenClassRooms Méthodes C#")
- [PluralSight in out ref parameters](https://www.pluralsight.com/guides/csharp-in-out-ref-parameters "PluralSight in out ref parameters")

Une variable de **type valeur** passée en paramètre est **copiée localement**, c'est-à-dire que cette copie existe en *stack* le temps de la fonction (dans le corps de la méthode délimité par les accolades). Ainsi, aucun changement sur le paramètre ne se répercute à l'extérieur de la méthode. On peut donc dans la fonction modifier la **valeur de l'argument**, et cela sans modifier la **valeur de variable passée en argument** puisque la fonction opère sur une copie.
```
// Exemple C# .NET
private void ChangerInt(int val) 
{
	Console.WriteLine("val = " + val); 
	val = 5; // idem
	Console.WriteLine("val = " + val);
}
private int nombre = 1;
ChangerInt(nombre); // nombre = 1 
```

Une variable de **type référence** peut être passée en argument. Rappelons : un type référence est en mémoire *Heap*, et une variable typée en mémoire *Stack* pointe vers cette référence. Alors, la variable passée est copiée dans la fonction mais ces deux variables pointent vers le même emplacement mémoire en *Heap*. Donc, les changements sur l'argument se répercutent à l'extérieur de la méthode.

Maintenant, on peut modifier le comportement des méthodes relatif aux variables de façon à effectuer des **passages par référence**. Ici, la variable en *Stack* **n'est pas copiée** dans la fonction. On agit directement sur la référence.
- `ref` : lecture et écriture ; la variable **doit être initialisée avant appel** de la méthode et va être modifiée par la méthode. [MSDN Ref](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/ref "MSDN Ref")
- `out` : écriture seule ; la variable **peut ne pas être initialisée préalablement** et va être initialisée ou modifée par la méthode (la variable n'est pas lue, elle est seulement écrite). [MSDN Out parameter](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/out-parameter-modifier "MSDN Out parameter")
- `in` : lecture seule ; la variable **doit être initialisée avant appel** de la méthode, pour établir que la variable passée **ne peut pas être modifiée** par la méthode.

Et comment **forcer un passage par valeur** ? Eh bien, si ce n'est pas déjà un type valeur, alors il faut effectuer une copie avant l'appel de méthode.

Exemples : 
```
private void maFonction(ref int val){
	val += 1;
}
int toto = 0;
maFonction(ref toto) ; // toto = 1
```
```
private Rigidbody2D rb2d;
if(TryGetComponent<rigidbody2D>(out rb2d))
{
	//...
}
```
```
_audioMixer.GetFloat("NomParametreExpose", out float masterVolume);
float test = masterVolume;
```
```
private void AssignerNombre(out int i)
{
	i = 1;
}
int nombre;
AssignerNombre(out nombre); // nombre = 1;
```

`out` et `ref` ont l'avantage de permettre à une fonction de **renvoyer plusieurs valeurs**. Par exemple `int.TryParse("123", out monNombre)` utilise une variable en paramètre sur laquelle intervenir, tout en renvoyant un booléen signifiant l'état de réussite.

Pour expliciter le fait qu' `out` déclare une variable, il peut être nécessaire d'ajouter une ligne d'assignation de valeur par défaut.
```
public bool TryDoThing(string str, out int toto)
{
	toto = default; // 0
	if(str.Length > 10)
	{
		toto = str.Length;
	}

	return true;
}
```

Maintenant, les types références peuvent avoir la valeur `null`. Donc, avec `ref` ou `out`, il convient de **tester si les valeurs obtenues sont non nulles**. Pour cela, on passera par des tests (voir chapitre Opérateurs).

## Syntaxe simplifiée

C# propose la **syntaxe simplifiée des fonctions à une ligne** ; le `return` y est alors implicite. Ceci fonctionne aussi avec les fonctions `void`.
```
public int Quotient(int nombre, double diviseur) => (int)(nombre/diviseur); // noter la troncature
```
```
private void DireToto() => Debug.Log("Toto");
```

## Fonctions imbriquées

Oui, il est tout à fait possible d'imbriquer une fonction dans une autre. La fonction locale est alors disponible uniquement à sa fonction hôte. Ceci peut s'avérer utile lorsqu'il s'agit d'éviter de complexifier une classe (seule la méthode hôte utilise cette fonction, donc pourquoi ne pas la rendre locale).