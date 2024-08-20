# *Namespace*

Le 15-08-2024

Placer les types dans des catégories nommées et en arborescence.

## Alias

`using` permet la définition d'**alias**, de façon à réduire la quantité de texte à écrire ou bien à lever des ambiguïtés comme entre `System.Object` et `UnityEngine.Object`.

```C#
using MesOutils = Toto.Foufou;
//...
MesOutils.Truc();
```

## Conflit d'environnements

Unity intègre des classes spécifiques qui font doublon avec celles de .NET. Par exemple, la classe `Random` d'Unity permet d'obtenir un nombre aléatoire, tout comme `Random` de .NET, mais pas de la même manière. Il est alors nécessaire de **spécifier le *namespace*** avec un alias (vu précédemment) ou dans le code comme dans cet exemple.

```C#
// Unity 
int nombre = UnityEngine.Random.Range(-10.0f, 10.0f);
```

```C#
// .NET
Random de = new System.Random();
int lancerDe = new Random().Next(1,7);
Console.WriteLine(lancerDe);
```

