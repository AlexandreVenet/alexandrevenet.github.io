# Généricité

Le 17-08-2024

Les classes ou méthodes génériques sont utilisables avec n'importe quel type. 

## Méthode générique

Les **méthodes génériques** sont des fonctions dont le type est inconnu à la compilation, considéré dans sa seule généralité et connu seulement à l'exécution. Par exemple, `GetComponent<>()` d'Unity est une méthode générique et reçoit tout type de données.

```C#
public T MethodeGenerique<T>(T parametre)
{
	return typeof(T);
}
```

`T` représente le type retourné par la méthode ; « T » est une convention et importe peu (on aurait pu écrire « bisou »). Lorsque la méthode est appelée, le système remplace `T` par le type utilisé. De même, pour clé et valeur, on utilise les mots `TKey` et `TValue`.

Si on utilise plus d'un paramètre générique, il suffit de les séparer par des virgules et suivre l'alphabet.

```C#
public void MethodeGenerique<T, U, V>(T tParam, U uParam, V vParam)
{
	Console.WriteLine($"{typeof(T)}, {typeof(U)}, {typeof(V)}");
}
```

Exemple de définition et d'appel :

```C#
public class Chose 
{
    public T DireParametre<T>(T param)
    {
        return param;
    }
}
	
Chose maChose = new Chose();
int nbre = maChose.DireParametre<int>(5);
```

Indiquer le type entre chevrons n'est pas toujours requis car le type peut être déduit de l'argument.

```C#
private void Mafonction<T>(T a)
{
    //...
}
MaFonction(3);
```

## Classe générique

On peut réaliser des **classes génériques**. 

```C#
public class ChoseGenerique <T> 
{
    private T _chose;
	
    public void ModifierChose(T param) 
    {
        _chose = param;
    }
}
    
ChoseGenerique<int> instance = new ChoseGenerique<int>();
instance.ModifierChose(5);
```

Exemple de classe générique : `System.Collections.Generic.List`. Faire un clic droit dessus puis choisir ***Go To Definition*** pour obtenir la liste des interfaces que ce type implémente.

## Default()

Avec les génériques, on peut utiliser `default(T)` qui permet de **renvoyer la valeur par défaut du type**.

```C#
public T EssayerDeFaireCeci()
{
    return choseATester ? default(T) : AutreFonctionRenvoyantUnT();
}
```

## *Where*

Ces méthodes et classes génériques sont limitées aux types utilisés et leur compatibilité. On peut contrôler plus finement les entrée en ajoutant des **contraintes** avec `where` suivi des types séparés par des virgules. 
- `where T : class` : ce sera un type référence,
- `where T : struct` : ce sera un type valeur,
- `where T : new()` : il y aura un constructeur public sans paramètres,
- `where T : nomClasse` : ce sera le type de cette classe ou par polymorphisme une de ses classes dérivées,
- `where T : nomInterface` : il aura implémenté cette interface.

```C#
public void Methode<T>(T item) where T : struct 
{ }
```

```C#
public class ClassGenerique<T> where T : IComparable<T> 
{ }
```

Références : 
- [MSDN Contrainte Where](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/where-generic-type-constraint _blank)
- [Liste contraintes sur génériques](https://www.tutorialsteacher.com/csharp/constraints-in-generic-csharp _blank)
