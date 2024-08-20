# *Tags* & *layers*

Le 08-10-2021

Définir des ensembles d'objets.

## Accès

***Layers*** et ***tags*** sont :
- attribués dans l'*Inspector*, dans les menus déroulants à côté du nom de l'objet,
- définis dans `Edit > Project settings > Tags and Layers`.

Le menu `Layers` de la barre d'outils permet un accès rapide à la fenêtre d'édition des *tags*, *layers* et *sorting layers* : cliquer sur les icônes en forme de triangle pour afficher les entrées.

[Documentation Tags and Layers](https://docs.unity3d.com/Manual/class-TagManager.html "Documentation Tags and Layers" _blank)

## *Tags*

Les ***tags*** sont des **étiquettes d'ensemble** d'objets. Grâce à eux, les objets intéragissent non pas entre eux particulièrement mais selon l'ensemble dans lequels ils sont inclus.

```
public class DemoScript : MonoBehaviour
{
	private GameObject _player;
	
	private void Start(){
		// Trouver un objet avec le tag indiqué
		_player = GameObject.FindWithTag("nomTag");
	}
	
	private void Update(){
		// Se tourner en permanence vers l'objet
		transform.LookAt(_player.transform);
	}
}
```

Quelques instructions utilisant les *tags* : 
- `FindWithTag()` : trouver un objet avec un *tag*,
- `FindGameObjectsWithTag()` : trouver un `array` d'objets portant un *tag*,
- `CompareTag()` : tel objet a-t-il ce *tag* (booléen),
- la propriété `gameObject.tag` pouvant être testée, récupérée, définie.

Le *tag* `EditorOnly` permet à des objets d'être utilisés seulement dans l'éditeur. Ils sont exclus dans la compilation.

## *Layers*

Les ***layers*** permettent de **restreindre** des fonctionnalités par ensembles d'objets. Par exemple : déterminer un ensemble d'objets invisibles à la caméra : 
- créer un layer `ignored by camera`,
- l'attribuer à un objet,
- dans la caméra, dans `Culling Mask`, retirer `ignored by camera`.

Les *layers* sont aussi utiles pour définir les interactions physiques avec la **matrice de collision** qui se trouve dans `Edit > Project Settings... > Physics` ou `Physics2D`. On peut ainsi autoriser ou exclure des relations entre *layers* selon les besoins. Par exemple : un personnage jouable a un `Collider` aux pieds en interaction avec les obstacles, et un `Collider` en interaction avec des objets destructibles, les deux n'étant pas en interaction (sinon comportements étranges).

La classe `LayerMask` propose un certain nombre de méthodes dont `LayerToName()` et `NameToLayer()` pour obtenir le nom d'un *layer* ou son numéro dans la liste.
```
private void OnTriggerEnter(Collider other)
{
	if (other.gameObject.layer == LayerMask.NameToLayer("NomLayer"))
	{
		//...
	}
}
```

Pour comparer des *layers*, il faut effectuer des opérations au niveau du bit.
```
public LayerMask layerMask;
 
private void OnCollisionEnter(Collision collision)
{
	int objectLayer = collision.gameObject.layer;
	if ((layerMask & 1 << objectLayer) == 1 << objectLayer)
	{
		//...
	}
}
```

Plus d'infos dans cette discussion : [Comparer des layers](https://answers.unity.com/questions/422472/how-can-i-compare-colliders-layer-to-my-layermask.html "Comparer des layers" _blank).

## Étiquettes personnelles

Il est possible de créer ses propres étiquettes. Par exemple, en utilisant une `enum` : 
```
public enum MesTags
{
	Ogre,
	Gobelin
}
```
```
public MesTags _myTag = MesTags.Gobelin;
```

Autre exemple avec un type `struct` (qu'on peut rendre `static` ou non selon les besoins)  :
```
public struct MesAutresTags
{
	public static string OgreB = "Ogre de boue";
	public static string Gobelin = "Gobe-lin carnivore";
}
```

Exemple de comparaison :
```
if(chose.monTag == MesAutresTags.Gobelin)
{ 
	//... 
}
```

Ces données peuvent enfin être regroupées dans **un même fichier script** qui sert de **paramètres** au projet.
