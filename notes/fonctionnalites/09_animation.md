# Animation

Le 10-10-2021

Des objets peuvent être animés soit dans leurs parties en tant qu'objets autonomes, soit intégralement dans une séquence d'animation.

## Créer une anim

On peut créer une animation de bien des façons, en voici une procédure :
- sélectionner un objet dans la scène et qui va servir de support à l'animation (il aura un composant `Animator`). Comment choisir cet objet ? Il est celui que l'on veut animer ou il contient des objets enfants que l'on veut animer,
- ouvrir la fenêtre `Window > Animation > Animation`. Cliquer sur `Create`. Enregistrer un nouveau fichier  de type ***Animation Clip***,
- la fenêtre de ***Timeline*** devient disponible. On réalise l'animation en appuyant sur le bouton rouge `Record` ou bien en modifiant une propriété que l'on choisit en cliquant sur le bouton `Add Property`. Toute modification dans Unity sera représentée dans la *timeline* par une propriété et des *keyframes*,
- une autre représentation consiste en des courbes de Bézier où la modification porte sur les intervalles entre *keyframes* (pour ajuster la fenêtre, tout sélectionner puis taper la touche `F`), 
- si l'objet support ne l'a pas déjà, Unity lui attache le composant `Animator`.

Une animation doit avoir **au moins 1 *keyframe*** enregistrant la propriété à animer ; sinon, rien n’est animé. 

**L’animation verrouille les propriétés animées**. Donc, impossible de modifier ces valeurs par code dans le même temps que l’animation. Il faut changer d’état ou bien animer des propriétés qui ne nécessitent pas de changement par code.

Un fichier d'animation a des propriétés : sélectionner le fichier pour les exposer en *Inspector*.

## Animation Controller 

[Documentation Animator](https://docs.unity3d.com/ScriptReference/Animator.html "Documentation Animator")

Le composant `Animator` est attaché à un objet et réfère à un ***Animation Controller***. Ce contrôleur d'animation est un fichier (*asset*) spécifique gérant l'animation. On y accède par la fenêtre *Project* ou le champ `Controller` du composant ; double-cliquer sur ce champ ouvre la fenêtre *Animator*.

L'*animation controller* implémente le *design pattern* ***State Machine*** et la fenêtre *Animator* en fournit une représentation graphique. On y trouve : 
- des **couches** d'animation (*layers*), chacune présentant un **diagramme** d'**états** (*states*) reliés par des **transitions à conditions de passage**,
- des **paramètres** servant aux **conditions de passage** d'un état à un autre.

La fenêtre *Animator* est mise à jour en mode *Game*, ce qui permet de suivre les changements en temps réel.

Chaque **état** correspond à un fichier d'animation spécifique et est un bouton :
- **simple clic** : des infos de l'**état**, comme la vitesse (*speed*) à la quelle jouer l'animation sélectionnée,
- **double clic** : des infos sur le **fichier** d'animation, avec prévisualisation si applicable.
- **clic droit** : options de contrôle.

Un bouton vert `Entry` représente **l'état au démarrage** ; ce bouton vert est lié à un bouton d'état. Avec un clic droit sur un bouton, choisir `Set as layer default state` pour lier un autre état au lancement.

Chaque **transition** fait l'objet d'un **lien fléché** :
- **simple clic** ouvre les paramètres en *Inspector* :
   - `Has Exit Time` coché pour passer automatiquement ou non à l'animation suivante (décocher pour contrôler seulement par conditions), 
   - la *timeline* de transition mesurée en **secondes**, 
   - le **PETIT** bouton `Settings` juste au-dessus où on peut paraméter l'`Exit time` (quand sortir de la *frame*) et `Transition duration` (la durée de la transition),
   - les **conditions** de changement d'état : cliquer sur `+` pour en ajouter,
- **clic droit** : options de contrôle.

Les `Parameters` sont des **variables** : `float`, `bool`, `int` et le spécial `trigger` (*on/off*, déclenché à l'appel). Ces variables servent de paramètres aux **conditions de passage**. On peut créer par exemple un paramètre `SpeedX` qui sert de condition de transition entre des états `Idle` et `Walk`. Si par exemple, on modifie ce paramètre à 0.3, alors dans la transition la condition sera testée (par exemple `SpeedX Greater 0.1`) et le personnage passera automatiquement de `Idle` à `Walk`. Lorsqu'il y a plusieurs conditions (plusieurs paramètres sont utilisés) pour une même transition, Unity gère ces conditions en ET logique.

On peut ajouter **plusieurs transitions entre deux états**. La flèche possède alors trois triangles. Ajouter une transition génère à chaque fois un jeu de conditions et chaque transition apparaît dans la liste en haut de l'*Inspector*. Unity gère ces conditions en OU logique.

Un état peut accueillir des transitions vers lui-même.

## Côté code

En C#, on a besoin de référer au composant `Animator`. Pour cela, renseigner un champ sérialisé ou récupérer le composant dans `Awake()`. Par exemple, imaginons un objet `Player` ayant un enfant `Graphics` qui a le composant `Animator` (cet enfant contient des enfants animés), et un composant script de `Player` :
```
private Animator _animator;
private void Awake()
{
	_animator = transform.Find("Graphics").GetComponent<Animator>();
}
```

Pour modifier les paramètres en C# et déclencher des transitions :
- `SetTrigger()` : activer (*on/off*),
- `SetBool("nom", true)` : assignation de valeur booléenne,
- `SetInteger("nom", 1)` : assignation de valeur de nombre entier,
- `SetFloat("nom", 0.5f)` : assignation de valeur à virgule flottante.

Pour gérer les transitions avec `GetAxis`, il faut utiliser une valeur absolue car `GetAxis` renvoie des valeurs comprises entre `[-1,1]` alors que par exemple `SetFloat()` utilise des valeurs entre `[0,1]`.
```
float horizontal = Input.GetAxis("Horizontal");
_animator.SetFloat("SpeedX", Mathf.Abs(horizontal)); 
```

Pour aller à un état directement, on fait référence au `Layer` d'animation. On peut également indiquer le temps (normalisé de 0 à 1) à partir duquel jouer :
```
_animator.Play("Base Layer.NomEtat", 0, 0f);
```

L'état de l'animation peut être testé grâce à son nom :
```
AnimatorStateInfo animStateInfo = _animator.GetCurrentAnimatorStateInfo(0);
if(_animStateInfo.IsName("nomEtat"))
{
	//...
}
```

## Blend Tree

Les ***Blend Trees*** servent à regrouper des animations quand ces animations font partie d'un **même ensemble** et sont liées aux **mêmes paramètres**. Les *blend trees* ne fonctionnent qu'avec des `float` car les transitions y sont **calculées relativement aux paramètres** et non plus en temps comme les transitions classiques.

Par exemple : en 2D avec *scrolling* de côté, les animations `Idle`, `Walk` et `Run` ont en commun d'être des animations de locomotion sur l'axe des x. Mais rien ne lie `Walk` et `Jump` ou `Attack`. 

Pour créer un *blend tree* : clic droit dans un diagramme de la fenêtre *Animation* puis `Create State > From New Blend Tree`. Puis double cliquer dessus.

Par défaut, les *blend trees* sont à une dimension (1D) mais on peut en faire à plusieurs dimensions. Par exemple, `2D Freeform Directional` permet de poser un état central (0,0) et des états distribués en cercle tout autour.

Sélectionner le paramètre dans le menu déroulant contrôlant la transition. Ajouter un ou plusieurs `Motion`, c'est-à-dire des animations. On peut en ajouter tant qu’elles ont toutes le même rapport et sont relatives au même paramètre, sinon le rendu risque d'étonner.

Exemple d'animation 2D de l'état `Idle` d'un personnage vu de dessus et qui possède 8 positions relatives au *stick* gauche de la manette :
- créer un `BlendTree` pour l'état `Idle`,
- utiliser deux paramètres `float` : `directionX`, `directionY`,
- paramétrer le `BlendTree` : `2D Simple directional`, et en paramètre : les deux variables,
- dans la liste, on va ajouter toutes les *motions* pour cet état,
- créer dans le *Project* un dossier d’animation et un sous dossier « Idle » qui contient toutes les animations afférentes que l'on va réaliser : *idle_south*, *idle_est*...
- ajouter un objet dans la scène,
- ajouter un enfant nommé « Graphics », lui ajouter `Animator` comme composant,
- créer une animation qu’on appelle par exemple : `idle_south`,
- glisser dans la fenêtre *Animation* le ou les *sprites* correspondant à cet état : la fenêtre présente une nouvelle propriété et une *keyframe*,
- refaire pour toutes les orientations d’« Idle », 
- dans le `BlendTree`, les animations sont représentées par des points bleus, le point rouge représente les deux variables ; on peut tout déplacer ; les dégradés indiquent l’influence des animations,
- préférer une distribution en cercle (valeurs intermédiaires à 0.75) pour correspondre au *stick* analogique de la manette.

## Animation event

On peut déclencher une **fonction** depuis l’animation, qu'on appelle ***Animation Event***. Par exemple :
- sélectionner l’objet qui contient le composant `Animator`,
- dans `Animation`, sélectionner une animation,
- dans la *timeline*, déplacer la tête de lecture jusqu'à la fin de la séquence,
- cliquer sur l’icône blanche de la fenêtre en forme de tube vertical accompagné d'un `+` ; cela ajoute un petit rectangle bleu dans la *timeline* : c’est l’*animation event*,
- créer un script et l’attacher comme composant de l’objet contenant le composant `Animator`, et y écrire une fonction avec un `Debug.Log()` pour tester,
- ensuite, retourner dans l’*animation event* et y renseigner la fonction.

**Attention**, un *animation event* situé **après** une transition d'animation **n'est pas déclenché**.

## Personnage

Un **personnage** (*character*) est un *mesh* comprenant un **squelette** (*skeleton*, *rig*) et éventuellement un **ensemble d'animations**. Exemple : un humanoïde qui marche, court, saute et salue.

Le fichier importé peut ne pas être immédiatement utilisable, il convient donc d'adapter le fichier à nos besoins. Sélectionner le fichier et consulter l'*Inspector*.

Onglet `Rig` :
- l'`Animation Type` détermine si le personnage est **non animé**, animé avec l'ancien système d'animation d'Unity (compatibilité), ou animé en tant que **générique** ou **humanoïde**. Générique/humanoïde ou bien générique/générique ne sont pas compatibles et par conséquent on ne peut pas utiliser une animation de l'un avec l'autre ; en revanche, le type humanoïde permet d'utiliser des animations d'autres humanoïdes pour celui que l'on paramètre (établissement d'une bibliothèque d'animations),
- en `Humanoid`, une coche à côté du bouton `Configure...` signale que le squelette est complet. Dans le cas contraire, cliquer sur le bouton pour compléter le squelette. On entre alors en édition : la *Scene** présente le *mesh*, les os, leur hiérarchie et l'*Inspector* affiche les paramètres de  l'*asset* ***avatar***. L'*avatar* est une carte générale de l'humanoïde dont les parties réfèrent aux objets de la *Hierarchy*. Il se peut qu'il manque des références ; dans ce cas, renseigner les objets manquants. L'*avatar* présente également un onglet `Muscles & Settings` définissant comment le personnage est déformé par le squelette dans différentes poses par défaut (déplacer les *sliders* pour l'observer).

Où trouver des animations d'humanoïdes prêts à l'emploi ? Sur le site d'[Adobe Mixamo](https://www.mixamo.com "Adobe Mixamo") ou bien dans la suite de *packages* [FBX Mocap Librairy](https://assetstore.unity.com/packages/3d/animations/huge-fbx-mocap-library-part-1-19991 "FBX Mocap Librairy") du site d'[Unity AssetStore](https://assetstore.unity.com/ "Unity AssetStore").

Onglet `Animation` :
- si l'objet contient des animations, on voit ici tous leurs paramètres (exemple : boucler ou non).

Par défaut, un personnage est en ***T pose*** ou une pose équivalente.

Lors de l'import, l'objet peut avoir un composant `Animator` mais peut ne pas avoir d'`Animator Controller` ; il faut donc créer ce dernier dans Unity et le renseigner dans le composant `Animator`.

L'objet contient des animations ? Parfait. Mais il faut peut-être paramétrer le contrôleur qui, lui, est complètement vide. Pour ajouter une animation d'un personnage au contrôleur :
- dans *Project*, déplier tout dossier ou *asset* pour identifier le fichier d'animation,
- cliquer-déplacer l'animation dans la fenêtre *Animator*, ce qui y ajoute l'état correspondant. 

## Timeline

***Timeline*** est un module complémentaire d'animation.
- Créer un `GameObject` et le nommer « MaSequence ».
- Ouvrir la fenêtre `Windows > Sequencing > Timeline`. 
- Cliquer sur `Create`.
- Nommer et enregistrer le fichier dans le répertoire des *assets*.
- La fenêtre affiche maintenant deux parties : à gauche : le type de pistes (*track*), à droite : la *timeline*. Un composant `Playable Director` a aussi été ajouté automatiquement à l'objet avec quelques paramètres (boucle, démarrage à `Awake`...).

Pour animer un objet, cliquer sur le bouton `+` de la fenêtre *Timeline* et choisir `Animation Track`. Ceci permet d'animer un objet à partir de son composant `Animator` (ce composant sera ajouté si l'objet n'en a pas déjà). Glisser dans le champ nouvellement apparu l'objet de la *Scene* que l'on veut animer, par exemple un personnage. 

Maintenant, dans la partie de droite, glisser un *asset* d'animation, par exemple l'animation *Idle* du personnage ; à sa suite, ajouter l'animation *Walk* ; etc. De la sorte, on définit une séquence d'animations pour cet objet sur la base des animations dont il dispose.

Chaque bloc est **déplaçable**. Chaque bloc est aussi **redimensionnable** de façon à jouer l'animation en boucle (si paramétrée de la sorte dans l'*asset*). Les blocs sont **superposables** de façon à générer une transition entre les animations. Enfin, chaque bloc expose des paramètres en *Inspector*.

Une piste peut être **réécrite**. Cliquer sur le bouton « 3 points » de la piste et sélectionner `Add Override Track`. Puis éditer la séquence à notre convenance, par exemple en utilisant le bouton « rond rouge » qui sert à enregistrer des paramètres d'éditeur en une *keyframe*. Particularité : si on utilise une animation présentant également la **translation** (par exemple, le personnage qui marche se déplace vers l'avant sur une certaine distance), alors la piste de réécriture **annule** le déplacement, ce qui permet de paramétrer librement le déplacement, la rotation.

La piste de réécriture peut enfin être **convertie en séquence normale** pour ensuite pouvoir être manipulée en déplacement, redimension et superposition. Pour cela, clic droit sur la séquence de la piste puis choisir `Convert To Clip Track`. Cette opération n'est pas nécessaire mais peut être utile en cas de réutilisation ou pour simplement harmoniser la *timeline*.

Les *keyframes* ne sont pas éditables directement comme dans la fenêtre *Animation*. Ici, il faut d'abord cliquer sur l'icône « courbes» pour afficher la représentation en courbes de Bézier, puis sélectionner les *keyframes* et les déplacer.