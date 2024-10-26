# *Prototype*

Le 10-09-2024

Une copie préférable à une création.

## Présentation

*Prototype* est utilisé lorsque créer un objet est coûteux (complexité, temps...). Alors, au lieu de créer un autre objet lorsque cela s'avèrera nécessaire, il est préférable d'en faire une copie.

La mise en œuvre passe par une classe `abstract` possédant une méthode de copie, nommée *clone*. Les classes dérivées réécrivent cette méthode.

Les classes dérivées ne sont pas instanciées (pas de `new`). On utilise leur méthode de copie. 

![Diagramme UML de classe](../../../media/patterns/GofCreation/prototype.svg)

!- Diagramme UML de classe du patron *Prototype*

Deux types de copie sont possibles.
- **Copie superficielle** : l'original et la copie peuvent avoir des champs ou des propriétés de type référence qui réfèrent un même objet. 
- **Copie profonde** : champs et propriétés de type référence réfèrent à un objet différent. 

## Implémentation C#

Selon le contexte, le méthode `Clone()` de chaque classe dérivée peut retourner le type dérivé (exemple de la forme géométrique chez Refactoring Guru) ou bien le type de base (contournement de l'impossibilité d'instancier la classe `abstract`).

```C#
internal class Id
{
	public int m_nombre;

	public Id(int nombre)
	{
		m_nombre = nombre;
	}
}
```

```C#
internal enum TypePrototype
{
	InDefini,
	CopieSuperficielle,
	CopieProfonde
}
```

```C#
internal abstract class Personne
{
	public Id m_id;
	public int m_nombre;
	public DateTime m_dateDeNaissance;
	public string m_nom;
	protected TypePrototype m_type;

	public Personne(int id, int nombre, DateTime dateDeNaissance, string nom)
	{
		m_id = new Id(id);
		m_nombre = nombre;
		m_dateDeNaissance = dateDeNaissance;
		m_nom = nom;
	}

	public abstract Personne Clone();

	public override string ToString()
	{
		return $"[{m_id.m_nombre}] {m_nombre}, {m_dateDeNaissance:dd/MM/yyyy}, {m_nom}, {m_type}";
	}
}
```

**Copie superficielle** : type et utilisation

```C#
internal class Personne1 : Personne
{
	public Personne1(int id, int nombre, DateTime dateDeNaissance, string nom) : base(id, nombre, dateDeNaissance, nom)
	{
	}
	
	public override Personne Clone()
	{
		Personne1 copie = (Personne1)this.MemberwiseClone();
		copie.m_type = TypePrototype.CopieSuperficielle;
		return copie;
	}
}
```

```C#
Personne1 toto = new(1, 1, new(2000, 1, 1), "Toto");
Personne totoCopie = toto.Clone();

Console.WriteLine(toto);
Console.WriteLine(totoCopie);
// [1] 1, 01/01/2000, Toto, InDefini
// [1] 1, 01/01/2000, Toto, CopieSuperficielle

toto.m_nombre = -1;
toto.m_id.m_nombre = 999;
toto.m_nom = "TOTO";
toto.m_dateDeNaissance = DateTime.Now;

Console.WriteLine(toto);
Console.WriteLine(totoCopie);
// [999] - 1, 10/09/2024, TOTO, InDefini
// [999] 1, 01/01/2000, Toto, CopieSuperficielle

// L'instance de type Id est bien la même pour les deux objets.
```

**Copie profonde** : type et utilisation

```C#
internal class Personne2 : Personne
{
	public Personne2(int id, int nombre, DateTime dateDeNaissance, string nom) : base(id, nombre, dateDeNaissance, nom)
	{
	}
	
	public override Personne Clone()
	{
		Personne2 copie = (Personne2)this.MemberwiseClone();
		copie.m_id = new(m_id.m_nombre + 1);
		copie.m_type = TypePrototype.CopieProfonde;
		return copie;
	}
}
```

```C#
Prototype.Personne2 zaza = new(1, 1, new(2000, 1, 1), "Zaza");
Prototype.Personne zazaCopie = zaza.Clone();

Console.WriteLine(zaza);
Console.WriteLine(zazaCopie);
// [1] 1, 01/01/2000, Zaza, InDefini
// [2] 1, 01/01/2000, Zaza, CopieProfonde

zaza.m_nombre = -1;
zaza.m_id.m_nombre = 999;
zaza.m_nom = "ZAZA";
zaza.m_dateDeNaissance = DateTime.Now;

Console.WriteLine(zaza);
Console.WriteLine(zazaCopie);
// [999] - 1, 10/09/2024, ZAZA, InDefini
// [2] 1, 01/01/2000, Zaza, CopieProfonde
```

## Sources

- [Microsoft *Learn* MemberwiseClone()](https://learn.microsoft.com/fr-fr/dotnet/api/system.object.memberwiseclone _blank)
- [Refactoring Guru](https://refactoring.guru/fr/design-patterns/prototype _blank)
- [Wikipédia](https://en.wikipedia.org/wiki/Prototype_pattern _blank)

