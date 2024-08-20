# Fonction

Le 17-08-2024

La fonction dans le cas d'Unity.

## Contexte

Dans Unity, les objets actifs présentent autant de fonctions gérées par le moteur logiciel. 

En mode *Game* par exemple, le moteur lit le code dans une vaste **boucle** où chaque itération est une ***frame***.

Certaines fonctions sont **appelées automatiquement**, ce sont les ***callbacks*** héritées de la classe **MonoBehaviour**. Ces fonctions existent pour faciliter le travail du développeur (non obligatoire de les déclarer toutes si on ne se sert que de quelques-unes). Ces fonctions sont par défaut `private`. Elles font l'objet d'un **ordre de traitement** par le moteur. [Unity Ordre d'exécution](https://docs.unity3d.com/Manual/ExecutionOrder.html _blank)

I - `Awake()` :
- appelée **au chargement du script**, de la scène, même si **composant de script non activé** (dans l'`Inspector` la case du composant script est décochée). Donc, appelée en général au **démarrage du jeu**, première *frame*, où tous les objets sont instanciés,
- appelée avant `Start()`,
- lancée **une fois**, 
- sert en général à **déclarer des références** entre les scripts et l'initialisation effectuée avec `Start()` ; permet aussi de définir l'**ordre** dans lequel on veut que les scripts se lancent.

II - `Start()` :
- sert à l'**initialisation** de l'objet,
- se lance **une seule fois** avant le premier `Update()` (avant la première *frame*) seulement si **composant de script activé** (dans l'`Inspector` la case du composant script est cochée). Donc : désactiver/activer le composant ne relance pas `Start()`,
- par conséquent : peut servir au débogage ou à différer du code à initialiser seulement lorsque nécessaire (ex :un  ennemi avec `Awake()` a des munitions et une arme mais ne peut tirer que si `Start()` est lancée, c'est-à-dire lorsque le composant de script est activé).

Ensuite, le **moteur physique** démarre. Il est autonome et peut continuer de calculer pendant que le **moteur de rendu** démarre à son tour. Ainsi, les deux processus opèrent en **parallèle**.

III - `FixedUpdate()`, **moteur physique** :
- réservée à la gestion **physique** des objets, 
- appelée **à chaque pas de temps de moteur physique**, c'est-à-dire que ce gestionnaire peut être appelé plusieurs fois par *frame* si son propre *framerate* est plus bas que celui d'`Update()`,
- a son **propre *framerate***. Par conséquent, le *framerate* du moteur physique peut être différent du *framerate* du moteur visuel, ce qui implique coder selon le moteur (par exemple : les valeurs d'entrées en `Update()` et les déplacements physiques en `FixedUpdate()`).

IV - **Moteur de rendu** :
- `Update()` :
	- appelée **avant chaque *frame* de moteur visuel**,
	- c'est ici qu'on code l'**action** des objets : bouger des objets non physiques, chronomètres (*timers*) simples, entrées...
	- ne dépend pas du temps mais de la complexité du calcul à opérer : si une *frame* est plus longue à calculer qu'une autre, alors il faudra attendre qu'elle ait fini pour passer à la suivante.
- `LateUpdate()` :
	- appelée à la **fin de chaque *frame***, après `Update()`,
	- utile pour les **caméras** : l'objet est d'abord calculé (collisions, positions, etc.) sans influencer la caméra codée en fin de traitement.

Noter que si un script n’a pas `Update()`, alors on ne peut pas activer/désactiver ce composant dans l’`Inspector` et il reste toujours actif.

D'autres fonctions peuvent être utiles et s'inscrivent toutes à un certain moment dans la boucle de calcul de la *frame*. Par exemple :
- `OnEnable`, `OnDisable` : déclenchée à tout moment lorsque le `GameObject` est activé ou désactivé, 
- `OnMouseDown`, `OnMouseUp` : bouton souris pressé ou relâchée avec détection de *collider* (pas besoin de le chercher, on peut coder par exemple : `Destroy(gameObject);`),
- `OnDestroy()` : événement lors de la destruction de l'objet courant,
- `OnCollisionEnter`, `OnTriggerExit`...
- ...
 
Dans Unity, les **composants** respectent l'**encapsulation**. Un composant :
- regroupe un ensemble de comportements formant une fonctionnalité (exemple : `AreaEffector`),
- n'expose aux autres composants qu'un sous-ensemble de ses membres (ce qui est décrit dans la documentation).
