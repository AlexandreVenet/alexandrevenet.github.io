# List

Le 24-09-2022

Une collection de valeurs de taille variable.

## List

La `List` est une collection de **longueur variable**. Elle contient comme l'`array` des valeurs de même type. 

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
- `TrimExcess()` : ramener la `.Capacity` à la valer de `.Count`. 
 
Des propriétés : 
- `Count` : lire le nombre d'éléments actuels, 
- `Capacity` : lire ou écrire le nombre d'éléments que la liste **peut** accueillir sans se redimensionner. Si `.count` augmente, alors la `Capacity` aussi. [Capacity sur GeeksForGeeks](https://www.geeksforgeeks.org/c-sharp-capacity-of-a-list/ "Capacity sur GeeksForGeeks")

Exemples d'usage : l'`array` pour des ensemble fermés comme un inventaire, des notes d'épreuve en philosophie ; la `list` pour des collections ouvertes comme une base de données, des références d'objets dont le nombre varie.

La `list` est une **classe générique**. Pour l'utiliser, on a besoin de la **librairie** afférente : 
```
using System.Collections.Generic;
```

## Création 

Il faut en spécifier le **type** entre **chevrons**.
```
public List<string> maListeDeNoms;
```

Lors de l'**instanciation**, remarquer les parenthèses : la `list` étant une classe, on en appelle le **constructeur**. Pour passer des valeurs, on utilise les **initialiseurs de collection**.
```
List<string> mesStrings; // vaut null
List<string> mesStrings = new List<string>(); // liste vide
List<int> maListDeDentiers = new List<int>(3); // longueur de 3 cases avec valeur par défaut
List<float> mesFloats = new List<float>(){1.0f, 2.0f}; // longueur 2, avec contenu
```

## Accès

On accède à un élément avec `[]` :
```
List<int> nbres = new list<int>(){10,20,30};
int i = nbre[0]; // 10
```

## Exploration

Pour **explorer** une `list`, on utilise souvent une **boucle**.

Comparons avec l'`array` dans un exemple avec Unity :
```
public GameObject[] objetsQuiArrivent = new GameObject[10]; // longueur de 10
public List<GameObject> ennemisQuiArrivent = new List<GameObject>(); // pas de longueur
	
private void Start()
{
	objetsQuiArrivent[0] = new GameObject(); // affectation à l'index spécifié
	ennemisQuiArrivent.Add(new GameObject); // ajout sans index
	
	// l'accès en script est identique, tout autant que l'édition dans l'Inspector d'Unity
	objectsQuiArrivent[1].nom = "Toto";
	ennemisQuiArrivent[1].nom = "Titi";
	
	objetsQuiArrivent[0] = null; // vider par null
	ennemisQuiArrivent.Clear(); // vider la collection
}
```

Exemple de manipulations dans Unity : exploration, suppression. `Remove()` renvoyant un booléen, on pourrait tester si la suppression a eu lieu ou non.
```
public class MaListe
{
	public List<string> noms = new List<string>(){"Aline","Brutus","Carole","Zaza"}; 
	
	public void AfficherNoms()
	{
		foreach (var nom in noms)
		{
			Console.WriteLine(nom);
		}
	}
	
	public void SupprimerEntree()
	{
		if(noms.Count > 0){
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
```
using System; // pour obtenir l'interface IComparable

public class Perso : IComparable<Perso>
{
    public string nom;
    public int force;
	
    public Perso(string nom, int force)
    {
        this.nom = nom;
        this.force = force;
    }
	
    // méthode obligatoire de l'interface IComparable, scriptée à volonté
    public int CompareTo(Perso autre)
    {
		// si pas d'autre, renvoyer 1
        if(autre == null)
            return 1;
	
        // sinon, renvoyer la différence
        return force - autre.force;
    }
```
```
using System.Collections.Generic; // pour utiliser List

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

Un objet de type `List<>` présente la méthode `ToArray()` qui permet de retourner le contenu de la collection sous forme de `System.Array`.
```
private List<int> maListe = new List<int>();
maListe.Add(100);
maListe.add(2);
maListe.Add(75);
int[] monTableau = maListe.ToArray();
foreach(int item in monTableau)
{
	Debug.Log(item);
}
```

## Ajouter une étendue de valeurs

Une liste peut recevoir avec `AddRange()` une étendue de valeurs. Ceci fonctionne aussi bien pour une liste que pour un tableau, à la condition que le type utilisé soit le même.
```
private List<int> maListe = new List<int>();
maListe.Add(100);
int[] monTableau = new int[]{0,1,2,15};
maListe.AddRange(monTableau);
foreach(int item in monTableau)
{
	Debug.Log(item);
}
```
