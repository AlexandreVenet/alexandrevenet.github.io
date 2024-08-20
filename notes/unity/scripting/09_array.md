# Array

Le 19-08-2024

Une structure de donnée qui accueille un ensemble de valeurs de même type.

## Dans Unity

Les tableaux peuvent être utilisés pour gérer des inventaires. Dans l'exemple suivant, on utilise une classe de données (*data-class*, modèle) avec un **attribut** `[System.Serializable]` pour l'afficher dans l'*Inspector*.

```C#
[System.Serializable]
public class Objet
{
	public int id;
	public string nom;
	public string description;
}

public class Inventaire : MonoBehaviour
{
	public Objet[] mesObjets; // tableau d'instances de la classe Objet, à renseigner en éditeur

	void Start()
	{
		// Afficher le contenu de l'inventaire
		foreach(var objet in mesObjets)
		{
			Debug.Log($"{objet.id} : {objet.nom}");
		}

		// Afficher un élément aléatoirement 
		int alea = Random.Range(0, mesObjets.Length);
		Debug.Log($"Aléatoirement : {mesObjets[alea].nom}, {mesObjets[alea].description}");

		// Chercher dans le tableau avec for  
		for(int i = 0; i < mesObjets.Length; i++)
		{
			if(mesObjets[i].id == 7)
			{
				Debug.Log("Vous avez l'objet d'id 7.");
			}
			else
			{
				Debug.Log("Pas d'objet d'id 7.");
			}
		}
	}
}
```

Dans Unity, on peut renseigner des tableaux de tout type, par exemple `GameObject`. Dans l'exemple suivant, on suppose que dans la scène sont placés 3 objets de ***tag*** « *Player* » nommés librement, et 3 *textMesh* nommés respectivement `td0`, `td1`, `td2` où le nombre est l'index du tableau. 

```C#
public class ArraysScript : MonoBehaviour
{
	public GameObject[] listeDePlayers; // à renseigner en éditeur

	void Start()
	{
		listeDePlayers = GameObject.FindGameObjectsWithTag("Player");

		for(int i = 0; i < listeDePlayers.Length; i++)
		{   
			GameObject td = GameObject.Find("td" + i.ToString());
			TextMesh texte = td.GetComponent<TextMesh>();
			texte.text = listeDePlayers[i].name;
			td.GetComponent<Renderer>().material.color = new Color(Random.value, Random.value, Random.value);
		}
	}
}
```
