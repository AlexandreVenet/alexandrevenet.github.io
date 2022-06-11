# Physique

Le 06-06-2022

Unity possède un moteur de calculs permettant de simuler les lois de la physique : accélération, collisions, gravité... [Manuel : Physique](https://docs.unity3d.com/Manual/PhysicsSection.html "Manuel : Physique").

## Deux moteurs

Pour aborder, la physique, il faut d'abord distinguer :
- les **moteurs physiques précalculés** : avec des fonctions très avancées utilisées dans les films,
- les **moteurs physiques temps réel** : calculs limités en *frames* par seconde (sur 60fps, une image toutes les 16ms). 

Unity est un logiciel de calcul 3D temps réel, il a donc un **moteur physique 3D temps réel**.

## L'intersection

Un moteur physique a pour caractéristique de **détecter** une **intersection**, quand deux formes s'intersectent : une partie du volume de chaque forme appartient à l'autre. 

Sans cela, impossible de savoir quand par exemple l'épée d'un joueur commence à toucher le corps d'un ennemi pour lui faire perdre des points de vie. Impossible de savoir quel objet est cliqué, ni restreindre un personnage entre des murs.

Un type d'intersection souvent utilisé est le ***raycasting*** : le lancer de rayons. On lance un rayon à partir d'un objet dans une certaine direction et orientiation. Et lorsque ce rayon intersecte quelque chose, le moteur renvoie des informations. Exemple : cliquer dans la scène consiste à envoyer un rayon depuis le lieu où le joueur a cliqué et si ce rayon intersecte par exemple une zone de la carte, alors le personnage bouge jusqu'à cet endroit.

## Simulation de lois physiques

Le moteur physique fournit un **simulateur de lois physiques réelles**. Cela permet d'associer à un objet des propriétés : 
- la **masse** et autres pour simuler la **chute** d'un objet, la **gravité**,
- un ***collider*** (boîte de collision) pour simuler des **interactions** entre objets solides. Cela peut être une approximation du modèle 3D ou le modèle lui-même pour plus de précisions.

Le moteur permet également d'**interagir avec ces lois simulées**. Exemple : le jeu *Portal* propose une physique irréaliste et pourtant cette physique est fondée sur des lois simulées réalistes (calcul sur la vitesse, la position...).

## Fonctionnalités & destinations

Chaque moteur physique propose des **fonctionnalités** :
- **générales** : ce qu'il peut être attendu de tout moteur physique,
- **spécifiques** : ce qui est relatif à un certain moteur compte tenu de sa visée. 

Unity propose une simulation des lois physiques et propose des **composants spécifiques pour les projets 2D et d'autres pour les projets 3D**. La plupart des composants physiques 3D ne sont pas utilisables en 2D et réciproquement (non fonctionnels, anomalies...). Exemple : le composant `Polygon Collider 2D` pour générer un *collider* 2D point par point.

## Défauts 

Pour tenir l'engagement de simuler les lois de la physique et de garder une fluidité visuelle, les moteurs physiques 3D temps réel fonctionnent par **approximation**. Cette approximation dépend de la puissance de la machine exécutant ces calculs. 

L'approximation est source de défauts : 
- le **non-déterminisme de la simulation** : aucune garantie que sur une machine moins puissante qu'une autre, la simulation se déroule comme attendu,
- les **équilibres instables irréalisables** : tout objet soumis aux forces physiques ne peut pas rester en place et ainsi il est impossible d'avoir par exemple une sphère en équilibre en haut d'une pyramide (pour cela, il faudra tricher).
 
Ces défauts sont **acceptables** on non selon le but poursuivi.

## Objets statiques/dynamiques

Les **objets** :
- **statiques** ne réagissent pas aux forces physiques,
- **dynamiques** réagissent à des forces physiques.

## Collider

Le composant `Collider` fournit la **boîte de collision** : 
- de forme diverse : `WheelCollider` pour des roues de véhicules par exemple, 
- de type `physics` : réagit aux lois physiques,
- ou de type `trigger` : déclencheur non soumis aux lois physiques.

`Collider` et `Mesh renderer` sont des composants **indépendants**. Ainsi :
- on peut créer une boîte de collision **sans l'afficher**,
- un objet **n'a pas nécessairement** de boîte de collision,
- un objet n'a pas nécessairement une boîte de collision **de même forme** : on définit cette dernière en fonction des besoins (approximation plus ou moins grande).

## Rigidbody

Le `Rigidbody` ou `Rigidbody2D` fournit le **corps solide** prenant en compte la physique :
- `Mass` : quantité de matière l'objet. Plus elle est élevée, plus l'objet exerce de force sur les autres objets,
- `Drag` : résistance à l'air en translation. 0 = pas de frottement. Plus la valeur est élevée, plus il y a de frottement,
- `Angular drag` : résistance à l'air en rotation.
- **contraintes** de position/rotation (empêcher qu'un objet ne se déplace ou ne se tourne sur des axes) ; attention : ces contraintes n'affectent pas le `Transform`,
- etc.

[De la masse du Rigidbody](https://docs.unity3d.com/ScriptReference/Rigidbody-mass.html "De la masse du Rigidbody")

Selon Newton, tout corps a une **force de gravité**. Cette force est **proportionnelle à sa masse**.

La **masse**, exprimée en **kilogrammes**, désigne la **quantité de matière** d'un objet.

Le **poids** est exprimé en **Newtons** : c'est le **produit de la masse et de la longueur du vecteur de gravité**, ou dit autrement c'est la force de gravité s'exerçant sur un corps. Le poids d'un objet est proportionnel à sa masse ; il est inversement proportionnel au carré de sa distance au centre du corps qui l'attire (plus il loin, moins il est attiré). Dans Unity, la gravité est un vecteur de (0, -9.81, 0). Ainsi, un corps de masse de 1kg a un poids de 9.81N ; définir une gravité à 0 fait qu'il a un poids de 0Kg.

Appliquer une **force** à un objet d'une certaine masse donne de l'**élan** ou un **mouvement** à ce dernier. Un objet plus massif nécessite plus de force qu'un objet moins massif. Ainsi, dans Unity, une voiture de masse de 1000kg et une balle de ping-pong de masse de 0.0027kg, subissant toutes deux une même force, réagissent de manière différente.

## Matériaux physiques

Les **matériaux physiques** sont à référencer dans le `Collider` et fournissent les propriétés surfaciques :
- la **friction statique** : frottement lorsque l'objet ne bouge pas, 
- la **friction dynamique** frottement lorsque l'objet bouge, 
- le **rebond**, 
- la **combinaison de rebond** : quelle valeur prendre pour le rebond lorsqu'il y a collision (moyenne, minimum, maximum, multipliée par autant de contacts),
- la **combinaison de friction** : idem avec la friction.

## Paramètres généraux

`Edit > Project settings > Physics` fournit les paramètres généraux de la physique du projet :
- la **gravité** exprimée en Newton est terrestre (réelle) et peut être paramétrée sur les axes x, y, et z,
- la **matrice de collision** organise les relations physiques entre catégories d'objets. Elle permet aussi d'optimiser l'application en éliminant les interactions qui n'ont pas lieu d'être calculées (gain de performances),
- etc.

Dans `Project settings > Time > Fixed timestep`, on accède au **taux de rafraîchissement** physique. Cela modifie l'approximation de la simulation. On peut grâce à cela par exemple tester l’effet de la non utilisation de `Time.fixedDeltaTime` dans `FixedUpdate()`.

## Côté code

Pour qu'un objet soit soumis à la simulation de lois physiques, il doit avoir un composant `RididBody` et par exemple un composant `BoxCollider`. Si on souhaite coder les comportements physiques, alors le ou les scripts en question doivent être des **composants frères** des `Collider` **OU** `RigidBody`;

L'intersection fait l'objet d'**événements** qui sont autant de fonctions natives de `MonoBehaviour` :
- **Collisions** :
   - `OnCollisionEnter()` : début, 1ère frame de la collision,
   - `OnCollisionStay()` : toute la durée de la collision,
   - `OnCollisionExit()` : dernière frame de la collision.
- ***Triggers*** :
   - `OnTriggerEnter()` : début, 1ère *frame* du déclenchement,
   - `OnTriggeStay()` : toute la durée du déclenchement,
   - `OnTriggerExit()` : dernière *frame* du déclenchement.

`OnTriggerEnter` : événement survenant lors d'un contact avec un `collider trigger`. Par exemple,  un *powerup* :
```
private bool _hasPowerUp;

private void OnTriggerEnter(Collider other)
{
	if(other.CompareTag("PowerUp"))
	{
		_hasPowerUp = true;
		Destroy(other.gameObject);
	}
}
```

`OnCollisionEnter` : événement survenant lors d'un contact physique entre objets. En suivant l'exemple précédent, détecter un ennemi selon qu'on a pris un *powerup* :
```
private void OnCollisionEnter(Collision collision)
{
	if(collision.gameObject.CompareTag("Ennemi") && _hasPowerUp)
	{
		Debug.Log($"On a cogné {collision.gameObject.name} avec _hasPowerUp à {_hasPowerUp}.");
	}
}
```

**Astuce** : `OnTriggerStay` **s’arrête au bout d’un certain temps**, ce qui peut ne pas être souhaité. Pour modifier cela, sélectionner le `Rigidbody` et définir son `Sleeping Mode` à `Never Sleep`.

On peut **appliquer des forces** à l'objet avec la fonction `AddForce()` qui admet différentes options (avec ou sans `ForceMode` par exemple):
```
public class PlayerController : MonoBehaviour
{
	public Rigidbody _playerRB;

	private void Start()
	{
		_playerRB = GetComponent<Rigidbody>(); // assigner le composant Rigidbody
		_playerRB.AddForce(Vector3.up * 500); // appliquer une force à ce composant (direction et puissance)
	}

	private void Update()
	{
		if(Input.GetKeyDown(KeyCode.Space))
		{
			_playerRB.AddForce(Vector3.up * 10, ForceMode.Impulse);
		}
	}
}
```

La **gravité** appliquée à **tout objet de la scène** peut être modifiée avec `Physics.gravity`. Ici, valeur par défaut de `1`, aucune force de gravité avec `0`. 
```
public float _gravityModifier = 1f;

private void Start()
{
	Physics.gravity *= _gravityModifier; 
}
```

## Collectable

Voici un exemple d'objet **collectable** par collision avec le joueur.

Préparer le **joueur** :
- ajouter un objet dans la scène,
- lui ajouter si non présent un composant `Box collider` physique avec la case `Is Trigger` non cochée, 
- ajouter un composant `Rigidbody`,
- lui ajouter ce script :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Joueur : MonoBehaviour
{
    private void OnTriggerEnter(Collider other) // à la collision 
    {
        if(other.tag == "PickUp") // si l'autre objet porte l'étiquette nommée (ou utiliser CompareTag())
        {
            // ajouter des points, des bonus, faire quelque chose...
            // ... enfin, détruire l'objet si besoin (ou SetActive(false))
            Destroy(other.gameObject);
        }
    }
}
```

Préparer le **collectable** : 
- ajouter un objet dans la scène,
- lui ajouter si non présent un composant `Box collider`,
- cocher la case `Is Trigger` pour en faire un **déclencheur** ; l'objet perd alors sa boîte de collision,
- décocher `Use Gravity` pour éviter que l'objet ne tombe ; mais l'objet réagira toujours aux autres forces physiques (vent par exemple),
- cocher `Is Kinematic` pour éliminer tout traitement physique (le vent n'y fera plus rien),
- attribuer une **étiquette** (*tag*). Ces étiquetes sont paramétrables dans `Project settings > Tags and Layers`. Ici, sélectionner l'objet et dans l'*Inspector*, attribuer le *tag* « Pickup ».

## Composite collider

Le composant `Composite Collider` permet de fusionner dans un objet parent les *colliders* de ses objets enfants :
- combinaison des *colliders* enfants qui sont en intersection,
- lissage des différences de niveau éventuelles,
- conservation des espaces vides à partir d'une certaine distance.

Pour l'utiliser :
- cocher dans les composants `Collider` enfants : `used by composite`,
- ajouter un `Composite Collider` sur le parent ; un `Rigidbody` est automatiquement ajouté,
- passer le `Rigibody` du parent en `Kinematic` (s’il bouge sans physique) ou `Static` (s’il ne bouge pas).

## Hinge joint

Les **joints** lient des objets physiques entre eux, par exemple `Hinge Joint`.

Ajouter une sphère avec `Rigidbody`. Lui ajouter un composant `Hinge joint` : **balancier, chaîne**...
- `Anchor` : point d'attache.

## Fixed joint

Ajouter une sphère avec `Rigidbody`. Lui ajouter le composant `Fixed joint` : **lie l'objet à un autre**.
- `Connected body` : l'objet auquel se lier (prendre la sphère précédente qui est en `Hinge joint`).
Effet : l'objet suit l'autre, tout en réagissant à des contacts physiques qui le concernent spécifiquement.

## Spring joint

Ajouter une sphère avec `Rigidbody`. Lui ajouter le composant `Spring joint` : **ressort**.
- `Anchor` : point d'attache.
- `Spring` : valeur du ressort.
- `Break force` : force nécessaire pour casser le joint.
- `Break torque` : tension nécessaire pour casser le joint.

## Interactive Cloth

Créer un objet vide. Lui ajouter un composant `Interactive Cloth`. Cela calcule la physique d'une surface de **tissu**.
- `Mesh` : attacher un objet.

Pour calculer le rendu du `Cloth`, ajouter un composant `Cloth renderer`. Le *mesh* précédent est affiché.
- Dans ce composant, ajouter un matériau pour le *mesh*.

Paramètres de `Interactive Cloth` :
- `Bending Stiffness`, `Stretching Stiffness` : rigidité de la courbure et de l'étirement.
- `Damping` : amorti.
- `Thickness` : épaisseur.
- `Use gravity` : utiliser la gravité.
- `Self collision` : collision avec lui-même. Gourmand en calculs.
- `Friction` : frottements. Une valeur élevée réduit la chute de l'objet.
- `Density`, `Pressure` : pour modifier les effets physiques.
- `Attachment response`, `Tear factor` : effet de déchirement.

## Skinned cloth

Le composant `Skinned Cloth` est utilisé pour réaliser des vêtements (pas seulement des surfaces de tissu). 
