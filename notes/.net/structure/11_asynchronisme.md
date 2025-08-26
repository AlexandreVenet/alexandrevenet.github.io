# Asynchronisme

Le 26-08-2025

Attendre ou faire autre chsoe sans bloquer.

## Définitions

**Par défaut, toute méthode est synchrone** : le programme lit ses instructions et ne permet rien d'autre pendant ce temps. 

L'**asynchronisme** signifie **ne pas bloquer** : une tâche peut s’exécuter sur un autre *thread*, ou simplement se mettre en attente et reprendre plus tard, sans bloquer le programme principal. Par exemple : lancer la machine à laver, attendre qu'elle ait fini (en faisant peut-être autre chose), être informé de la fin de la tâche pour sortir le linge.

Le **parallélisme** signifie **exécuter simultanément** (grâce à plusieurs *threads* ou cœurs CPU). Exemple : lancer la machine à laver et lancer le lave-vaisselle en même temps. Le parallélisme n'implique pas nécessairement asynchronisme. 

Conséquence : on peut effectuer des tâches asynchrones parallèles, des tâches synchrones parallèles, des tâches async ou sync non parallèles...

Distinguer ***CPU-bound*** et ***I/O-bound***.
- ***CPU-bound*** désigne une opération limitée par la puissance du processeur. La performance est mesurée par le temps qu'elle met à s'exécuter. Exemples : calculer des nombres premiers, compresser un fichier... Plusieurs *threads* ou `Task.Run()` peuvent accélérer l'exécution avec plusieurs cœurs CPU.
- ***I/O-bound*** désigne une opération limitée par les entrées/sorties (*input/output*). Ici, le processeur attend qu'une action ait lieu pour en exécuter une autre. Exemples : télécharger une ressource, lire/écrire un fichier, interroger une base de données... L'asynchronisme est ici préférable à la création de *thread* car il n'y a rien à gagner côté CPU.

## Types

.NET propose deux types : `Thread` et `Task`.

| Type|Description|Usage|Résumé
|-|-|-|-|
|`Thread`|Ensemble d'instructions géré par le système d'exploitation et qui possède sa propre pile d'exécution (consommation mémoire/CPU plus élevée).|Pour des besoins bas niveau : longues tâches en arrière-plan, contrôle précis (priorité, affinité CPU), interopérabilité système...|Lourd, rare.|
|`Task`|Abstraction de plus haut-niveau, unité de travail. S’appuie sur le *ThreadPool* (réutilisation des *threads* existants) pour les tâches *CPU-bound*, et gère aussi l’asynchronisme sans *thread* bloqué pour les *I/O*. Intégrée avec `async/await`.|Le plus utilisé, pour des besoins haut niveau. Idéal pour lancer des opérations sans gérer soi-même les *threads* : appels réseau, traitements parallèles, coordination de plusieurs tâches...|Flexible, le standard.|

## Task

Une `Task` représente un travail asynchrone et correspond à « une promesse de résultat ». Selon le cas, elle peut tourner sur un autre *thread* (exécution CPU), ou simplement gérer une attente sans bloquer de *thread* (I/O). Une fois terminée, elle fournit un résultat (`Task<T>`) ou signale juste la fin (`Task`).

Comment signaler la fin d'un traitement ? Par une méthode qui renvoie un type `Task` et que l'on suffixe conventionnellement par « Async ».

```C#
using System.Threading.Tasks;
	
public Task FaireUneChoseAsync()
{
	// Faire des choses, puis :
	return Task.CompletedTask;
}
	
var task = FaireUneChoseAsync();
```

On peut aussi vouloir récupérer de la `Task` un type spécifique. Alors, il faut enrober le résultat dans le type `Task`.

```C#
public Task<int> FaireUneChoseAsync()
{
	// Faire des choses, puis renvoyer le résultat :
	return Task.FromResult(12);
}
```

Dans ces exemples, le résultat ne se fait pas attendre car la seule chose que fait cette méthode, c'est renvoyer le fait qu'elle a immédiatement fini avec ou non un type plus spécifique. Donc, ici, on a juste posé les bases pour un traitement asynchrone mais tout est synchrone.

## Async

Pour que notre méthode soit asynchrone, on va ajouter le mot-clé `async`. Par exemple ici, transformons une méthode `void` en asynchrone : 

```C#
public async Task FaireUneChoseAsync()
{
	// Faire des choses
}
```

Lorsqu'une méthode est asynchrone, on peut aussi utiliser le type de sortie `void`. La méthode est désignée « *fire and forget* » : elle lance un processus en arrière-plan sans qu'il soit suivi. En général, ce n'est pas conseillé car cela ne permet aucun contrôle, la seule vérification possible étant `try...catch` en fin de traitement. [MS Learn Bonnes pratiques en programmation asynchrone](https://learn.microsoft.com/fr-fr/archive/msdn-magazine/2013/march/async-await-best-practices-in-asynchronous-programming "MS Learn Bonnes pratiques en programmation asynchrone")

Si on souhaite que la fonction retourne un type spécifique, on utilise `Task<T>`. Dans ce cas, on n'a plus besoin d'enrober la valeur dans `Task.FromResult()`.

```C#
public async Task<int> FaireUneChoseAsync()
{
	// Faire des choses, puis :
	return 12;
}
```

Maintenant, utiliser `async` implique d'utiliser `await`. Si on ne le fait pas, on effectue là aussi un cas de « *fire and forget* » : la méthode asynchrone est exécutée mais non contrôlée. Cela conduirait à une perte de catpure d'exceptions, une annulation de tâches si le programme s'arrête trop tôt... Lancer une tâche asynchrone suppose donc **attendre le résultat** et cela se code. On écrit ce que l'on doit faire lorsqu'on attend, c'est-à-dire lancer une autre méthode. 

```C#
private void Test(string[] args)
{
	FaireAsync(); // Fire and forget implicite 
	
	_ = FaireAsync(); // Fire and forget explicite assumé (_ : variable jetable, *discard*) 
	
	await FaireAsync(); // Feu sous contrôle
	
	Console.WriteLine("Fin de programe");
	Console.Read();
}
	
private async Task FaireAsync()
{
	Console.WriteLine("Début");
	await Autre();
	Console.WriteLine("Fin");
}
	
private async Task Autre()
{
	await Task.Delay(3_000); // en ms
	Console.WriteLine("Résultat après trois secondes");
}
```

## Zombification

Le code asynchrone est souvent appelé « code zombie » en référence à l'idée de **propagation** lorsqu'on l'utilise. Ce « code zombie » apparaît lorsque la gestion asynchrone remonte petit à petit les méthodes impliquées, y compris par exemple `Main()` (.NET) ou `Update()` (Unity) car il faut bien attendre un résultat à chaque fois, non ?

Par conséquent, il faut coder ces méthodes en asynchrone également. Il peut être nécessaire d'ajouter le mot-clé `async` à `Main()` pour par exemple les programmes Console.
```C#
async static Task Main(string[] args)
{
	await FaireUneChoseAsync();
}
```

Comment faire du code asynchrone sans rendre `async` toutes les méthodes du programme ?

Il faut considérer si **la suite du code dépend du retour de la méthode asynchrone**. Pour l'exemple, on va utiliser des méthodes obsolètes depuis l'arrivée d'`async/await` mais qui fournissent un moyen de contournement. On souhaite lancer une méthode une fois le résultat obtenu. Cela s'effectue dans une certaine syntaxe mais la procédure est synchrone : 

```C#
// Déclencher la méthode asynchrone.
// Récupérer une Action au moyen de ContinueWith().
// Pour traiter le résultat de façon synchrone.
	
// Code pour Console
static void Main(string[] args)
{
	FaireUneChoseAsync() 
		.ContinueWith(task =>
		{
			// Faire des choses
	
			// Dire que la tâche est finie.
			// Ceci pour l'exemple car ContinueWith renvoie un type Task une fois toutes les instructions terminées.
			// Ligne pouvant donc être omise.
			return Task.CompletedTask;
		});
}
	
public static async Task FaireUneChoseAsync()
{
	// Faire des choses
	await AutreTacheAsync();
	// Faire autre chose
}
```

Si on utilise un type spécifique :

```C#
// Code pour Console
static void Main(string[] args)
{
	FaireUneChoseAsync()
		.ContinueWith(task =>
		{
			int r = task.Result; // l'entier 12
			//...
			return Task.CompletedTask; // même remarque 
		});
}
	
// Méthode async avec un type spécifique
public static async Task<int> FaireUneChoseAsync()
{
	// Faire des choses
	await AutreTacheAsync();
	// Faire autre chose, puis :
	return 12;
}
```

Maintenant, `ContinueWith()` renvoie un type `Task` et cela permet d'instruire l'attente pour le traitement asynchrone avec `.Wait()`. On obtient donc :

```C#
// Code pour Console
static void Main(string[] args)
{
	FaireUneChoseAsync()
		.ContinueWith(task =>
		{
			int r = task.Result; // l'entier 12
			//...
			return Task.CompletedTask; // même remarque 
		})
		.Wait();
}
	
public static async Task<int> FaireUneChoseAsync()
{
	// Faire des choses
	await AutreTacheAsync();
	// Faire autre chose, puis :
	return 12;
}
```

💥 Mais problème ! `.Result`, `.Wait()` sont **bloquants**, cela fige le *thread* courant tant que la tâche est en cours. Dans notre exemple de programme Console, ça n'a pas d'importance car la méthode asynchrone sera déjà terminée et le résultat sera donc déjà disponible. Mais dans un **contexte** asynchrone (UI, ASP.NET...), ces instructions peuvent causer un ***deadlock*** : le *thread* attend la fin de la tâche... qui attend que ce même *thread* se libère pour se terminer ! Conclusions : 
1. l'asynchronisme remonte naturellement dans la chaîne d’appels,
2. on évite les contournements bloquants et risqués (sauf cas particulier),
3. la zombification est inéluctable... 🧟‍♀️🧟‍♂️ ... mais douce fatalité car les *frameworks* modernes sont zombie-accueillants !

```C#
// Version moderne : async Main
static async Task Main(string[] args)
{
	int result = await FaireUneChoseAsync();
	Console.WriteLine(result);
}
public static async Task<int> FaireUneChoseAsync()
{
	// Faire des choses
	await AutreTacheAsync();
	// Faire autre chose, puis :
	return 12;
}
```

## Task.Run()

Prenons un exemple : une méthode dont on attend un résultat ne doit pas bloquer le *thread* courant.

Commençons par du code synchrone :

```C#
// Code Console
static void Main(string[] args)
{
	MethodeQuiDure();
	// On attend que la méthode finisse son traitement...
}
	
public static void MethodeQuiDure()
{
	// Quelque chose qui prend du temps...
}
```

Pour rendre la méthode asynchrone et l'exécuter en arrière-plan, il faudrait en faire une méthode `async` renvoyant `Task`. On peut faire autrement, sans avoir à changer la signature de la méthode :

```C#
var tacheAsync = Task.Run( () => MethodeQuiDure() );
```

Maintenant, on peut rendre le conteneur `async` si on veut attendre à un moment donné le résultat.

```C#
// Code Console
async static Task Main(string[] args)
{
	var tacheAsync = Task.Run(() => MethodeQuiDure() );
	
	// On peut faire des choses en attendant...
	Console.WriteLine($"État initial : {tacheAsync.Status}"); // WaitingForActivation ou Running
	
	// Jusqu'à ce moment où on n'a plus rien à faire qu'attendre : 
	await tacheAsync;
	// (Si la tâche est déjà terminée, alors await est résolu immédiatement)
	
	// Effectuer le code final
	Console.WriteLine($"État final   : {tacheAsync.Status}"); // En général : RanToCompletion
}
```

`Task.Run()` est pratique pour des tâches *CPU-bound*. Avec des API asynchrones, préférer des méthodes asynchrones avec `await`. Il est inutile d'utiliser `Task.Run()` avec des méthodes déjà `async`.

## Parallélisme

Le **parallélisme** n'est pas à utiliser par défaut ; c'est une solution qui peut ne pas être adaptée à tous les cas. Par exemple, lorsqu'il s'agit d'écrire dans un fichier, il faut effectuer une file d'attente plutôt que paralléliser toutes les procédures, sans quoi il risque d'y avoir des problèmes. Donc, le parallélisme est d'abord affaire de pertinence.

Maintenant, admettons que le parallélisme est possible et qu'on veuille lancer un certain nombre de méthodes qui durent longtemps en parallèle et attendre que **toutes** aient finies avant de poursuivre. Comment procéder ? Posons un code intial où, pour l'exemple, on va lancer en boucle la même méthode qui prend un entier en paramètre :

```C#
// Code Console
static void Main(string[] args) 
{
	// Lancer des méthodes longues
	for(int i = 0; i < 10; i++)
	{
		MethodeQuiDure(i);
	}
}
	
public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

Approche 1 : rendre la méthode `async` renvoyant `Task` et l'appeler avec `await` ; ou bien utiliser `Task.Run()`. Or, on n'obtient pas le résultat attendu car cela va bloquer le flux **pour chaque tour de boucle**. Or, ici, on veut du parallélisme. Donc, ce n'est pas la solution. Exemple : 

```C#
// Code Console
async static Task Main(string[] args)
{
	// Lancer plein de méthodes qui durent
	for(int i = 0; i < 10; i++)
	{
		int index = i; 
		await Task.Run(() => MethodeQuiDure(index));
		// La lambda doit utiliser une copie de i pour avoir sa valeur au moment de la création de la lambda.
		
		// En effet, si la tâche s’exécute immédiatement avant que la boucle continue, i peut parfois être suffisant.
		// Mais c'est de la chance !
		// Car si c'est plus tard, alors la boucle sera déjà terminée ; et sans copier i, toutes les lambdas auraient 10 !
	}
}
	
public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

Approche 2 : stocker les `Task` dans une liste, lancer les méthodes et attendre le résultat dans une boucle pour tous les éléments de la liste. Or, c'est le même résultat que l'approche 1.

```C#
// Code Console
async static Task Main(string[] args) 
{
	var tasks = new List<Task>();
	// Ajouter des tâches et les lancer
	for(int i = 0; i < 10; i++)
	{
		int index = i; 
		tasks.Add(Task.Run(() => MethodeQuiDure(index)));
	}
	foreach(var item in tasks)
	{
		await item;
	}
}
	
public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

Approche 3 : utiliser une méthode spécifique de la classe `Task` sur le modèle de l'approche 2.

```C#
// Code Console
async static Task Main(string[] args) 
{
	var tasks = new List<Task>();
	// Ajouter des tâches et les lancer
	for(int i = 0; i < 10; i++)
	{
		int index = i; 
		tasks.Add(Task.Run(() => MethodeQuiDure(index)));
	}
	// Attendre que toutes les tâches de la liste soient terminées
	await Task.WhenAll(tasks);
	// Continer une fois ok
}
	
public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

Ici, `Main()` est `async`. C# permet d'effectuer la même chose mais dans du code synchrone. Il suffit d'utiliser une autre méthode de la classe `Task` :

```C#
// Code Console
static void Main(string[] args) 
{
	var tasks = new List<Task>();
	// Ajouter des tâches et les lancer
	for(int i = 0; i < 10; i++)
	{
		int index = i; 
		tasks.Add(Task.Run(() => MethodeQuiDure(index)));
	}
	// Attendre que toutes les tâches de la liste soient terminées
	Task.WaitAll(tasks.ToArray()); 
	// La méthode requiert de passer par un tableau, seule différence avec le cas précédent
	// Continer une fois ok
}
	
public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

Ceci peut être utilisé avec un seul appel de méthode :

```C#
// Code Console
static void Main(string[] args) 
{
	Task.WaitAll(new[] 
	{
		Task.Run(() => MethodeQuiDure(0)),
		Task.Run(() => MethodeQuiDure(1)),
		Task.Run(() => MethodeQuiDure(2)),
	});
}

public static void MethodeQuiDure(int valeur)
{
	// Quelque chose qui prend du temps...
}
```

💥 Mais problème ! Dans une application Console, `Task.WaitAll()` sur des `Task.Run()` est sûr car il n'y a pas de **contexte**. En ASP.NET ou avec une UI, éviter et préférer `await Task.WhenAll(...)`.

## Contexte 

Il est temps de décrire ce qu'est le **contexte asynchrone** que nous avons rencontré deux fois précédemment. En C#, le contexte est représenté par le type `SynchronizationContext`. C'est un mécanisme qui indique sur quel *thread* ou environnement exécuter le code qui se trouve après un `await`.
- WinForms, WPF : le contexte est le *thread* UI. *Deadlock* si on bloque ce *thread* UI.
- ASP.NET : le contexte est le *thread* de la requête HTTP. *Deadlock* si on bloque ce *thread* de requête.
- En Console, pas de contexte, donc pas de risque de *deadlock* : les `await` reprennent sur n’importe quel *thread* du *ThreadPool*. Donc `.Wait()` ou `.Result` peuvent être utilisés.

## Faisons une pause

Une pause ? D'accord mais pour le *thread* ou pour la *task* ?

```C#
private void Pause()
{
	while(true)
	{
		Thread.Sleep(100);
	}
}
```

```C#
private async Task Pause()
{
	while(true)
	{
		await Task.Delay(100);
	}
}
```

## *Timeout*

Avec le parallélisme, on peut penser deux méthodes parallèles et tester si celle qui s'achève en premier est bien celle que l'on attend. On réalise alors un ***timeout***. Par exemple : un délai de connexion à un serveur de base de données. Ici, on utilise `Task.WhenAny()` et le conteneur doit être `async`.

```C#
Task victoire = Task.Delay(5_000); // 5 sec
Task echec = Task.Delay(30_000); // 30 sec

Task vainqueur = await Task.WhenAny(victoire, echec);

if(vainqueur == victoire)
{
	Console.WriteLine("Victoire");
}
else
{
	throw new TimeoutException("Echec.");
}
```

Très bien mais on veut utiliser une fonction. Il suffit de créer une fonction asynchrone. 

```C#
public async Task LancerEtAttendre()
{		
	Task victoire = RequeteLongue();
	Task echec = Task.Delay(1_000);
	
	Task vainqueur = await Task.WhenAny(victoire, echec);
	
	if (vainqueur == victoire)
	{
		Console.WriteLine("Victoire");
	}
	else
	{
		throw new TimeoutException("Délai dépassé.");
	}
}

private async Task RequeteLongue()
{
	await Task.Delay(2_000);
}
```

Très bien mais la fonction doit retourner un résultat. Ici, il faut ajouter `await victoire` pour obtenir le résultat de la tâche `vainqueur`. Subtilité 🧐 ! `await victoire` signifie non pas « attendre la tâche victoire » mais « obtenir le résultat ». L'attente, elle, est terminée puisqu'on dispose déjà de `vainqueur`. `await` est donc utilisable en remplacement de `.Result`.

```C#
public async Task LancerEtAttendre()
{		
	Task<int> victoire = RequeteLongue();
	Task echec = Task.Delay(1_000);
	
	Task vainqueur = await Task.WhenAny(victoire, echec); // lancer, attendre, obtenir la tâche gagnante

	if (vainqueur == victoire)
	{
		int resultat = await victoire; // obtenir le résultat (plus rien à attendre)
		Console.WriteLine($"Victoire ! Valeur : {valeurVictoire}");
	}
	else
	{
		throw new TimeoutException("Délai dépassé.");
	}
}

private async Task<int> RequeteLongue()
{
	await Task.Delay(2_000);
	return 42;
}
```

## Interruption de traitement

Les *timeouts* réalisés précédemment supposent la notion d'**interruption**. En effet, passé un délai nos fonctions sont interrompues. Mais il existe de nombreuses autres causes d'interruption de traitement. Par exemple, une rupture de connexion à une base de données.

**Une fonction asynchrone n'est pas nécessairement annulable**. Par exemple, les *timeouts* précédents ne pourraient pas interrompre une opération de lecture de données. 

Pour gérer ce genre d'interruption, il faut faire autre chose : un **jeton d'annulation**. Ce qui fait qu'une action peut être interrompue, c'est le fait que l'action vérifie si le jeton en cours a été annulé. [Source Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/cancel-async-tasks-after-a-period-of-time "Annuler une tâche après un temps" _blank)

Microsoft donne l'exemple d'un champ `static readonly` pour le jeton afin de simplifier leurs exemples mais l'intérêt est ailleurs.
- Le champ global, pas nécessairemenet `static`, est utile dans le cas d'un réemploi du jeton dans plusieurs méthodes.
- Le champ global `static` est utile si on souhaite un point central d'annulation pour gérer une procédure où plusieurs méthodes/objets écoutent le même signal d'annulation (exemple : un bouton « Annuler tout » dans une application WPF pour arrêter les tâches en cours).
- Dans les deux cas, il y a partage du jeton. Alors, il faut bien gérer son cycle de vie : réinstanciation après annulation, éviter les fuites avec `Dispose()` (sinon le jeton risque de rester annulé ou causer des fuites).

Imaginons le code suivant dans une classe. Faisons avec `try...catch` :

```C#
private static readonly CancellationTokenSource _jeton = new CancellationTokenSource();

private async Task Test()
{
	try
	{
		_jeton.CancelAfter(300); // en ms
		await TravailLong(_jeton.Token);
		Console.WriteLine("fini !");
	}
	catch (OperationCanceledException) // couvre aussi TaskCanceledException
	{
		Console.WriteLine("Opération annulée !");
	}
	catch (Exception e)
	{
		Console.WriteLine(e.Message);
	}
	finally
	{
		_jeton.Dispose();
	}
	/*
		Itération 1
		Itération 2
		Itération 3
		Itération 4
		Opération annulée !
	*/
}

private async Task TravailLong(CancellationToken jeton)
{
	int iterationsMax = 10;
	for (int i = 0; i < iterationsMax; i++)
	{
		jeton.ThrowIfCancellationRequested(); // Vérifier si le jeton a été annulé

		Console.WriteLine($"Itération {i + 1}");
		
		await Task.Delay(100, jeton); // pause en ms simulant du travail
	}
}
```

On peut préférer `using(){}`, dit « commodité syntaxique » par Microsoft 🙂. Alors, pas besoin de `try...catch` ni de `Dispose()` car `using(){}` s'en occupe. [Source Microsot Learn](https://learn.microsoft.com/fr-fr/dotnet/api/system.idisposable "IDisposable" _blank). Cela étant, certaines exceptions ne sont pas couvertes ; donc, envelopper l'opération dans un `try...catch`. 

Ici, on utilise un jeton dans la fonction (et non pas un champ statique). C'est un jeton local, limité à la portée de l'opération, pour un usage ponctuel.

```C#
private async Task Test()
{
	try
	{
		using (CancellationTokenSource jeton = new CancellationTokenSource())
		{
			jeton.CancelAfter(300);
			await TravailLong(jeton.Token);
			Console.WriteLine("fini !");
		}
	}
	catch (TaskCanceledException) // distinguons tâche et opération pour tester
	{
		Console.WriteLine("Tâche annulée !");
	}
	catch (OperationCanceledException) 
	{
		Console.WriteLine("Opération annulée !");
	}
	catch (Exception e)
	{
		Console.WriteLine(e.Message);
	}
	/*
		Itération 1
		Itération 2
		Itération 3
		Tâche annulée !
	*/
}
```
