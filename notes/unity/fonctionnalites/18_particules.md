# Particules

Le 06-06-2022

Les particules servent à créer des effets comme la fumée, des liquides, qui seraient autrement difficiles à réaliser avec des *meshes* ou *sprites*. [Particule Systems](https://docs.unity3d.com/Manual/ParticleSystems.html "Particles Systems" _blank).

## Shuriken

Le premier **système de particules** d'Unity est le moteur **Shuriken**. On ajoute un **composant** permettant de réaliser des copies à la volée de petits objets, par exemple des plans texturés, des volumes, etc. 

Comme c'est un composant, il peut donc être ajouté à n'importe quel `GameObject`.

Unity fournit un raccourci pour créer un objet doté d'un système de particules : 
- clic-droit dans la *Hierarchy* puis `Effects > Particle system`,
- ou avec le menu `GameObject > Effets > Particule system`. 

Penser à télécharger le ***Simple particle pack*** dans l'*AssetStore* ; il est fourni par Unity et présente plein de possibilités prêtes à l'emploi.

## Paramètres à foison

Le composant présente des propriétés classées en sous-composants activables selon les besoins. 

Le paramétrage minimum par défaut comprend :
- les **paramètres généraux**,
- la catégorie `Emission` : projeter des particules,
- la catégorie `Shape` : la forme de la projection,
- la catégorie `Renderer` : afficher les particules.

Catégorie `Emission` :
- `Rate over time` : fréquence d'émission par seconde,
- `Bursts` : autant de déclenchements ponctuels d'une certaine quantité de particules. Attention : cela revient en boucle car ces déclenchements dépendent de la **durée** d'émission et si le système est en `Looping` (voir paramètres généraux du système).

Ci-après quelques **paramètres**.
- `Velocity over Lifetime` : la valeur `Speed Modifier` contrôle la **vitesse** de propagation.
- `Play On Awake` : si case cochée, déclenche le système au démarrage du jeu.
- Les valeurs numériques peuvent faire l'objet de **contrôles divers** (aléatoire entre deux valeurs, valeur unique, courbe...) ; pour cela, cliquer sur le **triangle pointant vers le bas** à droite du champ de saisie. 

## Collisions

La **collision** des particules avec autre chose peut être détectée, par exemple pour que particule et *player* soient tous les deux détruits. Pour cela, activer le sous-groupe idoine. Puis paramétrer comme suit.
- `Type : World` pour calculer à partir de la géométrie de la scène.
- `Bounce : 0` pour que la particule ne rebondisse pas.
- `Lifetime Loss : 1` pour que la perte de durée de vie soit maximale (pourcentage normalisé).
- Cocher la case `Send Collision Messages` pour recevoir des messages d'événement afin d'avoir un contrôle par code.
- Créer un fichier script Health.cs et l'attacher un objet dont le nom et le *tag* sont « Player ». Codons le script :

```
public float m_healthPoints = 100f;

private void Update()
{
	if(m_healthPoints <= 0f)
	{
		Destroy(gameObject);
	}
}
```

Codons un nouveau script pour le système de particules. Le script doit être attaché à l'objet qui présente le composant `Particle System`.

```
public float _damagePower = 20f;

private void OnParticleCollision(GameObject obj) // gestionnaire natif
{
	if(!obj.CompareTag("Player")) return;

	obj.GetComponent<Health>().m_healthPoints -= _damagePower;
}
```

## Exemple 

- Créer un matériau. Définir son *shader* à Particules/Standard `unlit` : les particules ne seront pas affectées par la lumière et l'ombre et seront affichées en couleur solide.
- `Rendering Mode > Fade`.
- `Color Mode > Multiply`.
- Choisir une texture pour l'albedo (cliquer le petit rond) : choisir `default-Particle` (dégradé).
- Cliquer le champ `HDR` et rentrer dans l'intensité une valeur de 2.7.
- Créer un système de particules.
- Assigner le matériau au système de particules.

## Exemples de code

On peut lancer et arrêter un système de particules avec `Play()` et `Stop()`. Par exemple, lancer un système de particule en tant que c'est un objet enfant d'un parent scripté :

```
ParticleSystem _explosionParticules;

void Start()
{
	_explosionParticules = gameObject.transform.Find("MesParticulesExplosion").GetComponent<ParticleSystem>();
	_explosionParticules.Play();
}
```

## VFX Graph

L'***HDR pipeline*** propose un autre système de particule : ***Visual Effect Graph***.

Dans *Project*, clic droit puis `Create > Visual Effects > Visual Effect Graph`. Double-cliquer sur ce fichier pour ouvrir la fenêtre d'édition (ancrer pour le confort). Ajouter à la scène le fichier. Vérifier que les *Visual Effect Graphs* sont affichés en consultant le menu de la fenêtre `Scene`. On dispose maintenant de la prévisualisation et de la fenêtre d'édition et de l'*Inspector* qui affiche les propriétés (du fichier et aussi bien des propriétés sélectionnées comme on va le voir).

Lors de l'édition, le fichier est enregistré automatiquement mais il peut y avoir un délai entre le paramétrage et le rendu dans la scène. Si la mise à jour n'est pas automatique, cliquer sur `Auto` dans la fenêtre de graphe ; le bouton `Compile` permet de compiler manuellement.

La fenêtre d'édition présente des **groupes**.
- ***Spawn*** : le `Rate` définit la quantité de particules à générer
- ***Initialize Particle*** : `Capacity` détermine le nombre total de particules pour une *frame*.
- ***Update Particle*** : équivalent du gestionnaire `Update` où les particules peuvent changer.
- ***Output Particle Quad*** : la façon dont la particule apparaît.

Tous ces groupes peuvent être déplacés. On peut également les supprimer mais attention, certains ne peuvent pas être recréés ; donc on préfèrera les conserver quelque part dans la fenêtre sans les lier à quoi que ce soit. On peut enfin en créer avec clic droit dans l'espace vide puis `Create Node`.

Créons un `Context > Output Particle Lit Quad` qui consiste en un effet de particules soumis à l'éclairage (la version par défaut est *unlit*). Cliquer sur la sphère de sortie de l'*Update Particle* et déplacer vers la sphère d'entrée du nouveau groupe. Voilà, un lien est effectué. Cliquer sur le lien vers l'autre groupe, puis clic droit et `Delete`. 

Maintenant, paramétrons notre groupe.
- `Base Color Map` : sélectionner un *sprite* pour la particule, par exemple une séquence d'images.
- `UV Mode` : choisir `Flipbook Blend` pour n'afficher de la séquence qu'une image à la fois.
- `Flip Book Size` : entrer le nombre de colonnes et lignes pour la séquence d'image (cela doit correspondre à la configuration de l'image). Par exemple : si on dispose d'une image en grille de 6x6, alors renseigner 6 en `x` et `y`.
- Clic droit dans la zone d'ajout puis choisir `Orient : Face Camera Position` pour que les particles se tournent toujours face à la caméra.

Il faut paramétrer le groupe *Update Particle* de façon à afficher une image de la séquence à chaque *frame*. Clic droit dans ce groupe puis `Create Block > FlipBook > FlipBook Player`.

Maintenant, on peut paramétrer la façon dont les particules sont initialisées. Dans le groupe *Initialize Particle*, modifier les valeurs de `Set Velocity Random` (intervalle entre deux valeurs pour générer de la variation), par exemple : A (-0.1,0.2,-0.02), B (0.1,0.3,0.02).

Ajoutons des modificateurs. Dans l'*Output Particle Lit Quad*, clic droit puis `Create Block` :
- choisir `Multiply Size` pour pouvoir modifier la taille de la particule (poucentage normalisé),
- choisir `Add Color over Life` pour manipuler la couleur actuelle de la particule. Définir `Sample Mode : Over Life` et `Color mode : Color And Alpha`. Paramétrer le dégradé selon nos besoins.
