# Inversion de dépendance

Le 16-08-2025

Dépendre d'abstractions et non pas d'implémentations.

## Argument

Les entités doivent être indépendantes. Donc, les entités doivent faire référence à des abstractions.

Pourquoi la dépendance aux types concrets est-elle à éviter ? Parce qu'un type concret est plus complexe que son ou ses abstractions et que le programme n'a pas nécessairement besoin de cette complexité à tout instant.

## Exemple

Jouons en Console .NET C# avec un interrupteur et une ampoule. L'interrupteur doit pouvoir fonctionner avec une abstraction d'ampoule et non pas une ampoule concrète. Cela conduit à penser que l'interrupteur fonctionne avec n'importe quel appareil défini sur la notion d' « interruptable » (*switchable* en anglais), donc pas seulement l'ampoule. Donc, l'inversion de dépendance autorise l'ouverture à l'extension.

```C#
public interface IInterruptable
{
    void Allumer();
    void Eteindre();
}
```
```C#
public class Ampoule : IInterruptable
{
    public void Allumer() => Console.WriteLine("Ampoule allumée !");
    public void Eteindre() => Console.WriteLine("Ampoule éteinte !");
}
```
```C#
public class Interrupteur
{
    private readonly IInterruptable _appareil;

    public Interrupteur(IInterruptable appareil)
    {
        _appareil = _appareil;
    }

    public void Activer()
    {
        _appareil.Allumer();
    }
    
	public void Desactiver()
    {
        _appareil.Eteindre();
    }
}
```

L'interrupteur ne dépend pas du type concret `Ampoule`. Il dépend certes toujours de quelque chose, ici l'interface, mais cette dépendance est suffisante et limitée ; en effet, si l'ampoule change, se complexifie, elle restera interruptable néanmoins et l'interrupteur n'aura pas à changer avec elle. Et si l'ampoule cesse d'être interruptable, l'interrupteur n'est pas impliqué dans ce changement.
