# PlayerPrefs

Le 29-03-2021

Conserver des préférences utilisateur pour une application créée avec Unity.

## Présentation

Les ***PlayerPrefs*** permettent d'enregistrer des informations de type **préférences utilisateur** sur le disque dur dans un petit fichier.

C’est un `Dictionary` enregistrant les données par **paires clé-valeur**, uniquement des `float`, `int` et `string`.

Au `Start()`, vérifier les clés :

```
private void Start()
{
	if(PlayerPrefs.HasKey("Volume"))
	{
		_myAudioSource.volume = PlayerPrefs.GetFloat("Volume");
	}
}
```

Pour créer ou mettre à jour : 

```
PlayerPrefs.SetFloat("Volume", 0.5f) ;
PlayerPrefs.Save(); // enregistre et gère l’existence du fichier texte
```

Pour **effacer une clé** : 

```
if(Input.GetMouseButtonDown(0))
{
	PlayerPrefs.DeleteKey("Volume");
}
```

Pour **effacer toutes les clés** (le fichier n'est toutefois pas effacé) : 

```
if(Input.GetMouseButtonDown(1))
{
	PlayerPrefs.DeleteAll();
}
```

## Emplacement

Posons le code suivant :

```
PlayerPrefs.SetInt("test int", 34) ;
PlayerPrefs.Save() ;
```

Le fichier, même vidé, est persistant sur le disque. Il n'est pas nécessairement accessible en tant que fichier car ce peut être une clé de registre par exemple dans Windows :
- ouvrir un terminal `cmd.exe`, taper `regedit`,
- chercher dans `Edit > Find` le nom du `Product Name` tel qu’il apparaît dans les `Project Settings > Player` d’Unity et ne sélectionner que des `Keys`,
- la valeur apparaît à droite. `Clic droit > Modify` et passer en `Decimal`,
- le nombre 34 est devenu lisible.

## Référence

[Documentation PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html "Documentation PlayerPrefs" _blank)
