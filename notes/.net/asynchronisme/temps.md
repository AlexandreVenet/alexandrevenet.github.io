# Gestion temporelle

Le 29-08-2025

Gérer les processus temporels du programme.

## Faisons une pause

Une pause, mais pour le *thread* ou pour la *task* ?

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

Le parallélisme permet d'imaginer une course de deux méthodes et de déterminer laquelle de ces méthodes termine en premier. On réalise alors un ***timeout***. Par exemple : un délai de connexion à un serveur de base de données. Ici, on utilise `Task.WhenAny()` et le conteneur doit être `async`.

```C#
public async Task LancerEtAttendre()
{	
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
}
```

Très bien mais la tâche représentant la victoire est complexe et fait l'objet d'une fonction. Il suffit qu'elle soit asynchrone.

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

Très bien mais la fonction doit retourner un résultat. Ici, il faut ajouter `await victoire` pour obtenir le résultat de la tâche `vainqueur`. Subtilité 🧐 ! `await victoire` signifie non pas « attendre la tâche victoire » mais « obtenir le résultat ». L'attente, elle, est terminée puisqu'on dispose déjà de `vainqueur`. `await` est donc utilisable en remplacement de `.Result` et sans bloquage.

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

Les exemples précédents montrent que passé un délai les fonctions sont **interrompues**. Il existe de nombreuses causes d'interruption de traitement ; par exemple, une rupture de connexion à une base de données.

**Une fonction asynchrone n'est pas nécessairement annulable**. Par exemple, les *timeouts* précédents ne pourraient pas interrompre une opération de lecture de données. 

Pour gérer ce genre d'interruption, il faut faire autre chose : un **jeton d'annulation**. Ce qui fait qu'une action peut être interrompue, c'est le fait que l'action vérifie si le jeton en cours a été annulé. [Source Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/cancel-async-tasks-after-a-period-of-time "Annuler une tâche après un temps" _blank)

Microsoft donne l'exemple d'un champ `static readonly` pour le jeton afin de simplifier leurs exemples mais l'intérêt est ailleurs.
- Le champ global, pas nécessairemenet `static`, est utile dans le cas d'un réemploi du jeton dans plusieurs méthodes.
- Le champ global `static` est utile si on souhaite un point central d'annulation pour gérer une procédure où plusieurs méthodes/objets écoutent le même signal d'annulation (exemple : un bouton « Annuler tout » dans une application WPF pour arrêter les tâches en cours).
- Dans les deux cas, il y a partage du jeton. Alors, il faut bien gérer son cycle de vie : réinstanciation après annulation, éviter les fuites avec `Dispose()` (sinon le jeton risque de rester annulé ou causer des fuites).

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

/*
	Itération 1
	Itération 2
	Itération 3
	Itération 4
	Opération annulée !
*/
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
}

/*
	Itération 1
	Itération 2
	Itération 3
	Tâche annulée !
*/
```

## *Timers* de *thread*

Dans le domaine de l'asynchronisme, il exsite aussi la notion de chronomètres, comptes à rebours ; en anglais ***timers***. C# fournit des types dédiés aux *timers*. Voyons `System.Threading.Timer` : API plutôt bas niveau, excellente précision en milliseconde, adaptée aux scénarios temps réel ou aux intervalles très courts.

On veut un compte à rebours. Il existe deux syntaxes possibles pour lancer la méthode de gestion de *tic*, voilà pourquoi on va coder deux méthodes. En plus de cela, on va utiliser la syntaxe `using()` car ce `Timer` est `IDisposable`. Enfin, on va séparer les entités à des fins pédagogiques (il y a pas mal de choses à voir) : le code principal gère le *timer* proprement dit, sa configuration, et une classe gère les *tics*, l'état (mais on pourrait faire autrement : tout mettre dans une seule classe principale, utilitaire...).

```C#
class PetitChrono
{
	private int _secondesEcoulees = 0;
	private int _dureeMax;

	public PetitChrono(int dureeMax)
	{
		_dureeMax = dureeMax;
	}

	public void Tic(object? state) => Tac();
	public void Tic2() => Tac();
	
	private void Tac()
	{
		if (_secondesEcoulees < _dureeMax)
		{
			_secondesEcoulees++;
			Console.WriteLine(_secondesEcoulees);
			// ou bien en plus court :
			// Console.WriteLine(++_secondesEcoulees);
		}
		else
		{
			Console.WriteLine("Chrono fini !");
		}
	}
}
```
```C#
int dureeMax = 5;

PetitChrono c = new(dureeMax);
using (System.Threading.Timer chrono = new(c.Tic, null, 0, 1_000))
{
	// On attend que le chrono atteigne la duréeMax : mise en pause du *thread*.
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 1 terminé");

c = new(dureeMax);
// Autre syntaxe possible avec lambda
using (System.Threading.Timer chrono = new(_ => c.Tic2(), null, 0, 1_000)) 
{
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 2 terminé");

/*
	Sortie :
	1
	2
	3
	4
	5
	Chrono fini !
	Chrono fini !
	Exemple 1 terminé
	1
	2
	3
	4
	5
	Chrono fini !
	Chrono fini !
	Exemple 2 terminé
 */
```

En sortie, il **PEUT** apparaître plusieurs messages `Chrono fini !`. Pourquoi ? Parce que l'objet `Timer` n'est pas *disposed* immédiatement à cause d'une *callback* peut-être encore en cours d'exécution. Une façon de résoudre ce problème d'affichage indésirable est de poser explicitement que le chronomètre est fini ou non.

```C#
class PetitChrono
{
	private int _secondesEcoulees = 0;
	private int _dureeMax;
	private bool _estFini = false;

	public PetitChrono(int dureeMax)
	{
		_dureeMax = dureeMax;
	}

	public void Tic(object? state) => Tac();
	public void Tic2() => Tac();
	
	private void Tac()
	{
		if (_estFini) return; // Si fini, arrêt

		if (_secondesEcoulees < _dureeMax)
		{
			_secondesEcoulees++;
			Console.WriteLine(_secondesEcoulees);
			// ou bien en plus court :
			// Console.WriteLine(++_secondesEcoulees);
		}
		else
		{
			Console.WriteLine("Chrono fini !");
			_estFini = true; // Sûr, là, c'est fini
		}
	}
}
```
```C#
int dureeMax = 5;

PetitChrono c = new(dureeMax);
using (System.Threading.Timer chrono = new(c.Tic, null, 0, 1_000))
{
	// On attend que le chrono atteigne la duréeMax : mise en pause du *thread*.
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 1 terminé");


c = new(dureeMax);
// Autre syntaxe possible avec lambda
using (System.Threading.Timer chrono = new(_ => c.Tic2(), null, 0, 1_000)) 
{
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 2 terminé");

/*
	1
	2
	3
	4
	5
	Chrono fini !
	Exemple 1 terminé
	1
	2
	3
	4
	5
	Chrono fini !
	Exemple 2 terminé
 */
```

Parfait ! On a empêché les instructions de *tic* de s'exécuter... mais on n'a pas empêché le `Timer` lui-même. Comment améliorer ? 
- Le contrôle booléen ajouté garantit l'unicité du message de fin ; gardons cela.
- Utiliser `Timer.Change()` pour désactiver les futurs déclenchements du `Timer` ; mais cela seul ne suffit pas car les appels en cours ne sont pas arrêtés.
- On peut récupérer une instance du `Timer` dans notre classe de chronomètre pour en forcer le *dispose*. Ceci permet de s'assurer que le `Timer` est supprimé **exactement au moment où il se termine**. Ce *dispose* manuel n'est pas nécessaire car `using()` s'en charge automatiquement mais c'est un bon moyen pour s'assurer de l'arrêt des processus.

```C#
class PetitChrono
{
	private int _secondesEcoulees = 0;
	private int _dureeMax;
	private bool _estFini = false;

	private Timer _timer;
	public Timer Timer 
	{
		set => _timer = value;
	}

	public PetitChrono(int dureeMax)
	{
		_dureeMax = dureeMax;
	}

	public void Tic(object? state) => Tac();
	public void Tic2() => Tac(); 

	public void Tac()
	{
		if (_estFini) return; // Si fini, arrêt

		if (_secondesEcoulees < _dureeMax)
		{
			_secondesEcoulees++;
			Console.WriteLine(_secondesEcoulees);
		}
		else
		{
			Console.WriteLine("Chrono fini !");
			_estFini = true; // Explicter que c'est fini
			_timer?.Change(Timeout.Infinite, Timeout.Infinite); // Empêcher les futurs déclenchements
			_timer?.Dispose(); // Détruire vraiment maintenant
		}
	}
}
```
```C#
int dureeMax = 5;

PetitChrono c = new(dureeMax);
using (System.Threading.Timer chrono = new(c.Tic, null, 0, 1_000))
{
	c.Timer = chrono;
	// On attend que le chrono atteigne la duréeMax : mise en pause du *thread*.
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 1 terminé");

c = new(dureeMax);
// Autre syntaxe possible avec lambda
using (System.Threading.Timer chrono = new(_ => c.Tic2(), null, 0, 1_000))
{
	c.Timer = chrono;
	Thread.Sleep((dureeMax + 1) * 1_000);
}
Console.WriteLine("Exemple 2 terminé");

/*
	1
	2
	3
	4
	5
	Chrono fini !
	Exemple 1 terminé
	1
	2
	3
	4
	5
	Chrono fini !
	Exemple 2 terminé
*/
```

## *Timers* de *timer*

C# fournit un autre type dédié : `System.Timers.Timer`. Ce type se base sur `System.Threading.Timer` et ajoute une gestion événementielle. On est donc dans le même contexte de précision et fonctionnement mais pas le même usage ni la même manière de configurer l'objet. Source [MS *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.timers.timer "Timer" _blank)

Pour cet exemple, on garde une classe de compte à rebours à des fins pédagogiques. On veut une API très simple : fournir la durée et l'intervalle au constructeur, et lancer une méthode asynchrone de démarrage. 
- Cette classe va encapsuler le `Timer` et, pour nettoyer ce dernier, implémente `IDisposable`.
- La méthode de démarrage renvoie une `Task` pour signifier qu'elle peut être `await` mais cette méthode n'est pas `async`. Pourquoi ? Car on veut juste informer d'un état : fini ou annulé.
- L'exemple montre l'utilisation de l'événement `Timer.Elapsed` qui contient les instructions pour chaque *tic*.

```C#
class ChronoPerso : IDisposable
{
	private int _intervalle;
	private int _tempsEcoule;
	private int _nombreDeTours;
	private readonly int _dureeMax;
	private readonly System.Timers.Timer _timer;
	private TaskCompletionSource _tcs;
	// Créer une Task et décider soi-même quand elle est :
	// - terminée (completed),
	// - en erreur (faulted),
	// - ou annulée (canceled).
	// Cela évite d'exposer une méthode async alors qu'on veut juste avec un type Task informer d'un état.

	public ChronoPerso(int dureeMax, int intervalle)
	{
		_dureeMax = dureeMax;
		_intervalle = intervalle;
		_tcs = new(TaskCreationOptions.RunContinuationsAsynchronously); // ⚡ évite les deadlocks
		_timer = new System.Timers.Timer(intervalle); 
		_timer.Elapsed += OnElapsed;
		_timer.AutoReset = true; // répéter à chaque tic
	}
	
	public void Arreter()
	{
		_timer.Stop();
		// Possibilité 1
		/*if (!_tcs.Task.IsCompleted) { _tcs.SetCanceled(); }*/
		// Possibilité 2
		_tcs.TrySetCanceled();
		// ⚡ safe même si tâche déjà completed (et pas SetCanceled())
		// D'où l'inutilité de la condition
	}

	public Task DemarrerAsync() // on signale qu'on peut await mais cette méthode n'est pas async
	{
		_tempsEcoule = 0;
		_nombreDeTours = 0;
		_tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);
		_timer.Start();
		return _tcs.Task;
	}

	private void OnElapsed(object? sender, System.Timers.ElapsedEventArgs e)
	{
		if(_tempsEcoule < _dureeMax)
		{
			_nombreDeTours++;
			_tempsEcoule += _intervalle;
			Console.WriteLine($"{_nombreDeTours} ({_tempsEcoule} ms)");
		}
		else
		{
			_timer.Stop();
			// Possibilité 1
			/*if(!_tcs.Task.IsCompleted) { _tcs.SetCanceled(); }*/
			// Possibilité 2
			_tcs.TrySetResult();
			// ⚡ safe même si tâche déjà completed (et pas SetResult())
			// D'où l'inutilité de la condition
			Console.WriteLine("Chrono fini !");
		}
	}

	// IDisposable
	public void Dispose() => _timer.Dispose();
}
```
```C#
using (ChronoPerso chrono = new(dureeMax: 2_000, intervalle: 500))
{
	await chrono.DemarrerAsync();
}
Console.WriteLine("Opération suivante...");
Console.WriteLine("Autre opération...");

/*
	1 (500 ms)
	2 (1000 ms)
	3 (1500 ms)
	4 (2000 ms)
	Chrono fini !
	Opération suivante...
	Autre opération...
*/
```

On peut optimiser : les messages sont émis depuis la classe, peut-être les extraire dans le code principal tout en les gardant synchronisés avec le compte à rebours ? Pour ce faire, utiliser des événements (ici, `event Action<T>`) : un pour les *tics*, un autre pour signfier que le compte à rebours est terminé.

```C#
class ChronoPerso : IDisposable
{
	private int _intervalle;
	private int _tempsEcoule;
	private int _nombreDeTours;
	private readonly int _dureeMax;
	private readonly System.Timers.Timer _timer;
	private TaskCompletionSource _tcs;
	// Créer une Task et décider soi-même quand elle est :
	// - terminée (completed),
	// - en erreur (faulted),
	// - ou annulée (canceled).
	// Cela évite d'exposer une méthode async alors qu'on veut juste avec un type Task informer d'un état.
	
	public event Action<int, int> Tic;
	public event Action Fini;

	public ChronoPerso(int dureeMax, int intervalle)
	{
		_dureeMax = dureeMax;
		_intervalle = intervalle;
		_tcs = new(TaskCreationOptions.RunContinuationsAsynchronously); // ⚡ évite les deadlocks
		_timer = new System.Timers.Timer(intervalle); 
		_timer.Elapsed += OnElapsed;
		_timer.AutoReset = true; // répéter à chaque tic
	}
	
	public void Arreter()
	{
		_timer.Stop();
		// Possibilité 1
		/*if (!_tcs.Task.IsCompleted) { _tcs.SetCanceled(); }*/
		// Possibilité 2
		_tcs.TrySetCanceled();
		// ⚡ safe même si tâche déjà completed (et pas SetCanceled())
		// D'où l'inutilité de la condition
	}

	public Task DemarrerAsync() // on signale qu'on peut await mais cette méthode n'est pas async
	{
		_tempsEcoule = 0;
		_nombreDeTours = 0;
		_tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);
		_timer.Start();
		return _tcs.Task;
	}

	private void OnElapsed(object? sender, System.Timers.ElapsedEventArgs e)
	{
		if(_tempsEcoule < _dureeMax)
		{
			_nombreDeTours++;
			_tempsEcoule += _intervalle;
			Tic?.Invoke(_nombreDeTours, _tempsEcoule);
		}
		else
		{
			_timer.Stop();
			// Possibilité 1
			/*if(!_tcs.Task.IsCompleted) { _tcs.SetCanceled(); }*/
			// Possibilité 2
			_tcs.TrySetResult();
			// ⚡ safe même si tâche déjà completed (et pas SetResult())
			// D'où l'inutilité de la condition
			Fini?.Invoke();
		}
	}

	// IDisposable
	public void Dispose() => _timer.Dispose();
}
```
```C#
using (ChronoPerso chrono = new(dureeMax: 2_000, intervalle: 500))
{
	chrono.Tic += (tours, tempsEcoule) => Console.WriteLine($"{tours} ({tempsEcoule} ms)");
	chrono.Fini += () => Console.WriteLine("Chrono fini !");
	await chrono.DemarrerAsync();
}
Console.WriteLine("Opération suivante...");
Console.WriteLine("Autre opération...");
```

## *Timers* de *task*

Voici une exemple de compte à rebours avec `Task` et une boucle. Cette gestion du temps est moins précise que `Threading.Timer` mais beaucoup plus souple, et convient à tous les scénarios courants, ne présentant pas d'enjeux temporels critiques.

```C#
class ChronoTaskSimple
{
	private readonly int _dureeMax;
	
	public ChronoTaskSimple(int dureeMax)
	{
		_dureeMax = dureeMax;
	}

	public async Task StartAsync()
	{
		for (int secondes = 1; secondes <= _dureeMax; secondes++)
		{
			Console.WriteLine(secondes);
			await Task.Delay(1_000); // pause 1 sec
		}
		Console.WriteLine("Chrono fini !");
	}
}
```
```C#
public async Task Test()
{
	var chrono = new ChronoTaskSimple(dureeMax: 3);
	await chrono.StartAsync();
	Console.WriteLine("Dispo !");
}
/*
	1
	2
	3
	Chrono fini !
	Dispo !
*/
```
