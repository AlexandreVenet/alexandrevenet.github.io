# Enumerateur

Le 19-08-2024

L'**énumérateur** sert à l'exporation de données de façon plus abstraite, éventuellement avec des points d'arrêt. Dans Unity, l'énumérateur fonde la **coroutine**. 

## IEnumerable

Une boucle est du code qui effectue des itérations sur des données d'un certain type. Or, la boucle peut s'effectuer sur un type plus abstrait que la collection, de façon par exemple à laisser au développeur la liberté de changer le type de données sans avoir à recoder la boucle. On appelle ce type d'objet un **énumérateur**. 

Pour cela, on utilise le type `IEnumerable`, interface qui est implémentée par les collections (`List`, `Queue`, `Dictionary`...). Limitation : **lecture seule**. 

`IEnumerable` est proposée en générique et non générique. 

```C#
private MaDonnee[] mesDonnees;

public IEnumerable<MaDonnee> AvoirListe()
{
    return mesDonnees;
}
    
foreach(var d in AvoirListe())
{
    Console.WriteLine(d.monChamp);
}
```

L'interface ne possède qu'une seule méthode, `GetEnumerator()`, qui renvoie un type `IEnumerator`. 

## IEnumerator

`IEnumerator` possède deux méthodes et une propriété : 
- `MoveNext()` : l'*enumerator* est positionné à l'élément suivant. La fonction retourne `true` s'il existe un item ou `false` si la collection a été complètement explorée. 
- `Reset()` : l'*enumerator* est positionné au début de la collection,
- `Current` renvoie l'élément actuel dans la collection.

```C#
public List<int> l; // en Inspector
// Essayer avec LinkedList<int>, Queue<int>, Stack<int>...

private void AfficherContenu(IEnumerator<int> enumerateur)
{
    while(enumerateur.MoveNext())
    {
       Debug.Log(enumerateur.Current);
    }
}
    
AfficherContenu(l.GetEnumerator());
```

## yield

Source : [MSDN Yield](https://docs.microsoft.com/fr-fr/dotnet/csharp/language-reference/keywords/yield _blank)

`yield` est un mot-clé qui s'utilise dans une boucle. Avec l'instruction `return`, cela permet de :
1. renvoyer la donnée de l'itération en cours,
2. conserver l'état de l'exploration en posant un point d'interruption,
3. pour repartir de cet état lorsque demandé.

Utiliser `yield return` dans une méthode, un opérateur ou un *getter*, conduit à réaliser un **itérateur**. On peut donc boucler comme s'il était question d'une collection. Cela a nécessairement besoin d'une mise en mémoire supplémentaire, le temps de vie de l'itérateur ; d'où le principe des coroutines d'Unity dont l'itération peut être mise en pause dans le temps.

```C#
public int[] mesNombres; // en Inspector
    
private IEnumerable<int> NombresPairs()
{
    foreach(var num in mesNombres)
    {
        if(item % 2 == 0) yield return item;
    }
}
    
private IEnumerable<int> NombresImpairs()
{
    foreach(var num in mesNombres)
    {
        if(item % 2 != 0) yield return item;
    }
}
    
public void MaFonction()
{
    foreach(var item in NombresPairs())
    {
        Debug.Log(item);
    }
}
```

`yield break` arrête l'exécution.

## Implémentation

L'implémentation de `IEnumerable` implique l'implémentation de `IEnumerator`. Les détails se trouvent ici : [Microsoft *Learn*](https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.ienumerator _blank)
