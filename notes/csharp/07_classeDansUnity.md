# Classe dans Unity

Le 08-08-2022

Utiliser les classes C# dans Unity.

## L'Inspector

Dans Unity, pour afficher des données en ***Inspector*** :
- utiliser `public`,
- utiliser `private` avec un ***attribute*** comme `[SerializeField]`,
- savoir que certains types de données ne peuvent pas s'afficher,
- passer par l'***Editor Scripting*** pour aller plus loin dans la prise en charge UI et des données en éditeur.
```
public Vector3 deplacer; // accessible de partout et visible en Inspector
	
[SerializeField] // ce qui suit visible en Inspector
private string nom;
	
private void Start()
{
	transform.position = deplacer;
	Debug.Log(nom);
}
```

Si on déclare un champ de type spécifique d'Unity, comme `Transform` par exemple, et qu'il est **sérialisé**, alors on peut dans l'éditeur déplacer un composant ou un objet dans le champ afférent de l'`Inspector` pour assigner une valeur. Cet affichage en `Inspector` est très utile pour tester, debugger, paramétrer sans avoir à éditer le script à chaque fois et il apporte un gain de performances en évitant d'effectuer des recherches  (`find()`, `GetComponent<>()`).
```
public float[] mesNotes; // tableau vide à renseigner dans Unity
```

Dans Unity, pour qu'une classe fonctionne comme **composant**, elle doit **hériter** de la classe `MonoBehaviour` (c'est le cas du script par défaut fournit par Unity lorsqu'on crée un nouveau fichier script).

Enfin côté objet, si l'on souhaite référer à un composant dynamiquement, alors on utilise `GetComponent<>()` (ou bien on passe par le paramétrage en *Inspector*):
```
NomScript toto = GameObject.Find("nomObjet").GetComponent<NomScript>();
toto.DireCoucou();
```

## Classes non composant

On peut écrire des classes non héritées de `MonoBehaviour`. La différence porte sur l'usage : 
- classe `MonoBehaviour` pour un composant d'objet, un comportement, une action spécifique d'un objet...,
- classe non `MonoBehaviour` pour du script de contenu, de données, de propriétés d'item collectable... (vaut aussi `ScriptableObject`).

Pour que la classe et ses champs apparaissent dans l'*Inspector*, il faut la **sérialiser** (Unity les convertit avant de les utiliser) avec l'**attribut** `[System.Serializable]`.
```
[System.Serializable]
public class Outil
{
	// champs
	public string nom;
	public float vitesseTir;
	public int munitions;
	
	// constructeur
	public Outil(string nom, float vitesseTir, int munitions)
	{
		this.nom = nom;
		this.vitesseTir = vitesseTir;
		this.munitions = munitions;
	}
}
	
public class Joueur : MonoBehaviour{
	public Outil pistoletPeinture;
	void Start()
	{
		pistoletPeinture = new Outil("Pistolet à peinture", 1.5f, 10);
		Debug.Log($"Mon Outil est {pistoletPeinture.nom}.");
	}
}
```

## Classes de données

Une **classe de données** (*data class*) sert à stocker des informations ; elle ne définit pas de comportement dans la scène. On crée ce genre de classe dans un fichier à part.

Par exemple : créer des inventaires. Dans ce cas, on a besoin de définir ce qu'est un **item d'inventaire** et ce qu'est l'**inventaire**.

**Exemple 1** : classe `Item` (données) et classe `Inventaire` (comportement).
```
public class Item
{
	public string nom;
	public int id;
	public string description;
	
	public Item(string nom, int id, string description)
	{
		this.nom = nom;
		this.id = id;
		this.description = description;
	}
}
```
```
public class Inventaire : MonoBehaviour
{
	Item hache;
	Item marteau;
	Item savon;
	
	void Start(){
		// on peut instancier directement...
		hache = new Item("Hache", 1, "Pour couper du bois.");
		
		// ... ou utiliser une fonction spécifique
		marteau = CreerItem("Marteau, 2, "Pour enfoncer des clous.");
		savon = CreerItem("Savon", 3, "Pour nettoyer des surfaces.");
	}
	
	private Item CreerItem(string nom, int id, string description)
	{
		var item = new Item(nom, id, description);
		return item;
	}
}
```

Tout ceci est très bien. On peut afficher le contenu de ces choses dans l'`Inspector` en serialisant la classe `Item` et en déclarant les champs de l'inventaire en `public`.

Problème : les éléments sont codés en dur en script, ce qui empêche le traitement par lot et une manipulation aisée hors script. On préfèrera utiliser l'`Inspector` d'Unity pour renseigner des objets et utiliser un `array` regroupant les items. La classe de données, sans être un comportement, participe d'un comportement.

**Exemple 2** : classe `Item` serialisée, classe `Inventaire` avec tableau d'`Items`.
```
[System.Serializable] // apparait dans l'Inspector
public class Item
{
	public string nom;
	public int id;
	public string description;
	public Sprite icone;
	
	public Item(string nom, int id, string description)
	{
		this.nom = nom;
		this.id = id;
		this.description = description;
	}
}
```
```
public class Inventaire : MonoBehaviour
{
	public Item[] items; // à renseigner en éditeur (items paramétrables)
	
	void Start()
	{
		Debug.Log($"Mon premier item est {items[0].nom}.");
	}
}
```

Une autre étape est franchie lorsqu'on utilise des classes héritant de `ScriptableObject`. De cette manière, on peut créer des *assets* (instances)qui servent, par exemple, à paramétrer URP, HDRP ou bien à représenter des données de sauvegardes, ou bien encore à stocker des données le temps de la session du programme. [Manual ScriptableObject](https://docs.unity3d.com/Manual/class-ScriptableObject.html "Manual ScriptableObject")