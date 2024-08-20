# Classe imbriquée

Le 17-08-2024

Une classe dans une classe.

## Principe

**Une classe peut être définie dans une autre**, en particulier lorsqu'il s'agit de tirer profit du type `class` sans pour autant exposer outre mesure le type que nous créons.

La classe hôte est alors un conteneur pour la classe imbriquée. On utilise l'opérateur *dot* pour y accéder.

On peut rendre la classe imbriquée `public` lorsqu'il s'agit par exemple d'organiser des types.

Particularité d'accès :
- la classe hôte n'accède qu'aux membres privés de la classe imbriquée, 
- la classe imbriquée accède à tous les membres de la classe hôte, seulement si elle dispose d'une référence à celle-ci.

L'imbrication de classe est sans conséquence sur les instanciations qui peuvent être effectuées.

## Exemple

Mettons ces instructions dans **Program.cs** d'une application Console : 

```C#
internal class Program
{
	static void Main(string[] args)
	{
		var hote = new Hote();
		hote.Test();

		Console.WriteLine("Fin programme");
		Console.Read();
	}
}
```

La classe personnelle `Hote` contient une classe imbriquée `Imbriquee` :

```C#
internal class Hote
{
	public string m_publicHote;
	private string m_privateHote;

	public void Test()
	{
		m_publicHote = "hôte champ public";
		m_privateHote = "hôte champ privé";
		
		Imbriquee imb = new();
		imb.TestImbriquee(this);
		imb.p_publicImbriquee = "imbriquée prop publique";
		// ...prop privée inaccessible
		
		Console.WriteLine(imb.p_publicImbriquee);
	}

	private class Imbriquee
	{
		public Hote p_monHote { get; set; }
		public string p_publicImbriquee { get; set; }
		private string p_privateImbriquee { get; set; }

		public void TestImbriquee(Hote h)
		{
			p_monHote = h;
			Console.WriteLine(p_monHote.m_publicHote); 
			Console.WriteLine(p_monHote.m_privateHote);
		}
	}
}
```

En sortie, on obtient :

```
hôte champ public
hôte champ privé
imbriquée prop publique
```
