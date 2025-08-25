# List et LinkedList

Le 19-08-2024

Une collection de valeurs de taille variable.

## List

La `List` est une collection de **longueur variable**. Elle contient comme l'`array` des valeurs de même type. Pour fonctionner, elle enveloppe un tableau.

Des méthodes : 
- `IndexOf()` : obtenir l'index d'une valeur,
- `Find()` : obtenir le premier élément répondant à un prédicat,
- `Clear()` : vider la liste (elle n'est pas `null` pour autant),
- `TrueForAll()` : déterminer si chaque élément satisfait un prédicat,
- `Contains()` : tester si la liste contient telle valeur,
- `Add()` : ajouter un élément à la suite, 
- `AddRange()` : ajouter une plage de valeur à la suite, 
- `Remove()` : supprimer le premier élément de telle valeur,
- `RemoveAt()` : supprimer un élément avec son index, 
- `RemoveRange()` : supprimer une étendue de valeurs à partir d'un index et sur une certaine longueur,
- `Insert()` : insérer un élément à tel index,
- `InsertRange()` : insérer une étendue de valeurs à tel index,
- `ToArray()` : retourner les valeurs sous forme de tableau,
- `Sort()` : trier les éléments,
- `TrimExcess()` : ramener la `.Capacity` à la valeur de `.Count`. 
 
Des propriétés : 
- `Count` : lire le nombre d'éléments actuels, 
- `Capacity` : lire ou écrire le nombre d'éléments que la liste **peut** accueillir sans se redimensionner. 

Si `.count` augmente, alors la `Capacity` aussi. [Source GeeksForGeeks](https://www.geeksforgeeks.org/c-sharp-capacity-of-a-list/ _blank)

Exemples d'usage : l'`Array` pour des ensembles fermés comme un inventaire, des notes d'épreuve en philosophie ; la `List` pour des collections ouvertes comme une base de données, des références d'objets dont le nombre varie.

La `List` est une **classe générique**. Pour l'utiliser, on a besoin de la **librairie** afférente : 

```C#
using System.Collections.Generic;
```

## Création 

Il faut en spécifier le **type** entre **chevrons**.

```C#
public List<string> maListeDeNoms;
```

Lors de l'**instanciation**, remarquer les parenthèses : la `List` étant une classe, on en appelle le **constructeur**. Pour passer des valeurs, on utilise les **initialiseurs de collection**.

```C#
List<string> mesStrings; 
// vaut null
```

```C#
List<string> mesStrings = new List<string>(); 
// liste vide
```

```C#
List<int> maListDeDentiers = new List<int>(3); 
// longueur de 3 cases avec valeur par défaut
```

```C#
List<float> mesFloats = new List<float>(){1.0f, 2.0f}; 
// longueur 2, avec contenu
```

## Accès

On accède à un élément avec `[]` :

```C#
List<int> nbres = new list<int>(){10,20,30};
int i = nbre[0]; // 10
```

## Exploration

Pour **explorer** une `List`, on utilise souvent une **boucle**.

Comparons avec l'`Array` dans un exemple avec Unity :

```C#
public GameObject[] objetsQuiArrivent = new GameObject[10]; 
public List<GameObject> ennemisQuiArrivent = new List<GameObject>(); 
	
private void Start()
{
	objetsQuiArrivent[0] = new GameObject(); // affectation à l'index spécifié
	ennemisQuiArrivent.Add(new GameObject); // ajout sans index
	
	// l'accès en script est identique, tout autant que l'édition dans l'Inspector
	objectsQuiArrivent[1].nom = "Toto";
	ennemisQuiArrivent[1].nom = "Titi";
	
	objetsQuiArrivent[0] = null; // vider par null
	ennemisQuiArrivent.Clear(); // vider la collection
}
```

Exemple de manipulations : exploration, suppression. `Remove()` renvoyant un booléen, on pourrait tester si la suppression a eu lieu ou non.

```C#
public class MaListe
{
	public List<string> noms = new List<string>(){"Aline", "Brutus", "Carole", "Zaza"}; 
	
	public void AfficherNoms()
	{
		foreach (var nom in noms)
		{
			Console.WriteLine(nom);
		}
	}
	
	public void SupprimerEntree()
	{
		if(noms.Count > 0)
		{
			int nbreAlea = Random.Range(0,noms.Count-1);
			// soluce 1
			noms.RemoveAt(nbreAlea); 
			// soluce 2 :
			// var nomAVirer = noms[nbreAlea];
			// noms.Remove(nomAVirer);
			AfficherNoms();
		}
		else
		{
			Console.WriteLine("La liste de noms est vide.");
		}
	}
}
```

## Trier

Pour **trier** une liste avec `Sort()`, on a besoin que le type de contenu de la liste implémente l'interface `IComparable`. Prenons l'exemple d'une classe personnelle dont les instances sont ajoutées à une `List` et d'un tri effectué sur cette dernière.

```C#
using System; // Obtenir IComparable

public class Perso : IComparable<Perso>
{
    public string nom;
    public int force;
	
    public Perso(string nom, int force)
    {
        this.nom = nom;
        this.force = force;
    }
	
    // Méthode obligatoire de l'interface IComparable, scriptée à volonté
    public int CompareTo(Perso autre)
    {
		// Si pas d'autre, renvoyer 1
        if(autre == null)
			return 1;
	
        // Sinon, renvoyer la différence
		return force - autre.force;
    }
}
```

```C#
using System.Collections.Generic; // Obtenir List

public class MaClasse
{
    private void Faire() 
    {
        List<Perso> mesPersos = new List<Perso>();
	
        mesPersos.Add( new Perso("Aline", 50) );
        mesPersos.Add( new Perso("Bibi", 100) );
        mesPersos.Add( new Perso("Carole", 5) );
	
        mesPersos.Sort();
	
        foreach(Perso p in mesPersos)
        {
            Console.WriteLine($"{p.nom} : {p.force}");
        }
    }
}
```

## Renvoyer un tableau

Un objet de type `List` présente la méthode `ToArray()` qui permet de retourner le contenu de la collection sous forme de `System.Array`.

```C#
private List<int> maListe = new List<int>();
maListe.Add(100);
maListe.add(2);
maListe.Add(75);
int[] monTableau = maListe.ToArray();
foreach(int item in monTableau)
{
	Console.WriteLine(item);
}
```

## Ajouter une étendue de valeurs

Une liste peut recevoir avec `AddRange()` une étendue de valeurs. Ceci fonctionne aussi bien pour une liste que pour un tableau, à la condition que le type utilisé soit le même.

```C#
private List<int> maListe = new List<int>();
maListe.Add(100);
int[] monTableau = new int[]{0, 1, 2, 15};
maListe.AddRange(monTableau);
foreach(int item in monTableau)
{
	Console.WriteLine(item);
}
```

## LinkedList

La `LinkedList` est similaire à la `List`. Sa particularité : chaque cellule contient ses données, une référence à la cellule précédente et une référence à la cellule suivante. Au début de la collection, la référence précédente est `null` et en fin de collection, la référence suivante est `null`.

Cette collection permet facilement des insertions, suppressions, et modification de l'ordre des cellules car il suffit de modifier les références (la `List`, elle, tire sa facilité des ajouts et suppression à la fin de la collection). Limitation : l'accès par index n'est pas direct et il faut passer par une boucle de recherche (la `List`, elle, enveloppe un tableau et peut donc accéder rapidement à un index).

```C#
private LinkedList<int> mesNums = new LinkedList<int>();
```

Des méthodes utiles :
- `LinkedList.First.Value` : consulter une valeur,
- `LinkedList.AddFirst()` : ajouter au début,
- `LinkedList.AddLast()` : ajouter à la fin,
- `LinkedList.RemoveFirst()` : supprimer.
