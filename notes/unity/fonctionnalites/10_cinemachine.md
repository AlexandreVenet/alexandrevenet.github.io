# Cinemachine

Le 11-10-2021

Module supplémentaire de gestion de la caméra.

## Présentation 

[Learn Cinemachine](https://learn.unity.com/tutorial/cinemachine "Learn Cinemachine" _blank)

**Cinemachine** est un *package* à installer depuis le *Package Manager*. Il propose un ensemble d'outils pour la caméra. Une fois installé, la barre de menu propose une nouvelle entrée « Cinemachine ».

Tout nouvelle caméra ajoutée avec le menu « Cinemachine » modifie les paramètres de la caméra de la scène (une icône rouge apparait) en ajoutant le composant `CinemachineBrain`. Cela ajoute également des **caméras virtuelles** à la scène.

## Paramètres généraux

La propriété `Priority` permet de réaliser des transitions entre caméras. Par exemple, la caméra A avec priorité à 10 laissera la place à la caméra B qui a une priorité de 100. Le type de transition se définit dans le composant `CinemachineBrain` qui est ajouté automatiquement à la caméra : voir la propriété `Default Blend` et sa durée en seconde.

`Follow` définit la caméra de façon à ce qu'elle suive l'objet référencé.

`Look At` définit la caméra de façon à ce qu'elle pointe vers l'objet référencé.

En fenêtre *Game* (pas nécessairement en mode *Game*), un ensemble d'éléments visuels permettent de paramétrer précisément la caméra. 

`Lens > Field of view` définit la profondeur du champ visuel.

## *Virtual camera*

La `Virtual Camera` permet de définir une caméra personnalisée. 

`Body > Follow Offset` définit le décalage entre l'objet suivi et la caméra.

`Aim > Tracked Object Offset` définit le décalage entre la cible de la caméra et la caméra elle-même.

La fluidité du suivi peut être modifiée avec les valeurs de `Damping` ; modifier les *sliders* pour ce faire.

## *FreeLook camera*

La `FreeLook Camera` caméra propose un contrôle libre. 

Sous `Axis Control` se trouvent les propriétés relatives au déplacement de la caméra autour de sa cible. Par défaut, les contrôles sont effectifs, mais pour les désactiver il suffit d'effacer le contenu des propriétés `Input Axis Name`.

Modifier les paramètres sous `Orbits` pour définir l'espace de déplacement à partir de trois anneaux alignés en y. 

Des contrôles plus fins et spécifiques se trouvent ensuite sous les entrées « *rig* ».

Le champ de vision peut être modifié selon la position de la caméra. Pour cela, cocher `Use Common Lens Settings`, puis modifier la valeur dans, par exemple, `BottomRig > Lens > Field Of View`.

La transition entre chaque anneau est contrôlée par `Orbits > Spline Tension`.

Les propriétés peuvent être contrôlée par une **animation** ou par **script**. Exemple :
```
public CinemachineFreeLook m_cam;
private CinemachineOrbitalTransposer.AxisState _xAxis;
private void Update()
{
	m_cam.m_XAxis.Value = 0.5f;
	m_cam.m_YAxis.Value = 0.1f;
}
```

## *Track* & *cart*

La `Dolly Track with Cart` propose un objet en mouvement (*dolly cart*) qui suit un parcours (*dolly track*) défini par l'utilisateur et ponctué d'étapes-clés (*waypoints*).

Les étapes sont liées par courbes de Bézier, ce qui lisse les déplacements.

Pour effectuer le déplacement de la caméra, on peut passer par une animation.
- Positionner le *track*.
- Y définir, positionner les *waypoints*.
- Pour le *cart*, définir son unité (`Position Units`) : en mètre ou normalisée.
- Placer la caméra en enfant du *cart*.
- Sélectionner le *cart* et y ajouter une animation (composant `Animator`, fenêtre *Animation*...).
- Dans la fenêtre *Animation*, animer la propriété `Position` du *cart*. Exemple : si l'unité choisie est normalisée, alors ce sont des valeurs entre 0 et 1 qui seront utilisées.

Cocher la case dans `Body > Auto Dolly > Enabled` pour que la caméra passe automatiquement d'un *waypoint* à un autre pour suivre au mieux sa cible.

## *State Driven camera*

La *State Driven camera* permet de passer d'une caméra virtuelle à une autre sur la base d'**états**.

Ajouter cette caméra génère un objet `CM StateDrivenCamera1`. Les champs `Virtual Camera Children` accueillent les références de caméras virtuelles qui vont être utilisées. Cela peut ne pas être toutes les caméras de la scène. On peut glisser-déposer les caméras virtuelles en tant qu'enfant de l'objet `CM StateDrivenCamera1` de façon à ce que cela renseigne automatiquement les champs.

Renseigner un `Animator` dans le champ `Animated Target`. En effet, un `Animator` est un composant structuré en états, donc peut être utilisé comme référence (par exemple, celui du *Player*).

Les états sont détectés automatiquement et apparaissent dans le tableau. Dans la colonne `State`, on choisit l'état ; dans la colonne `Camera`, on choisit la caméra que l'on veut faire correspondre à cet état. La colonne `Wait` accueille un temps en secondes, temps d'attente entre le moment où l'objet passe à cet état et celui où Cinemachine activera cette caméra. 

Par défaut, le passage d'un état à une autre fait l'objet d'une transition calculée automatiquement. Cette transition peut être paramétée dans `Default Blend` (type et durée).

On peut définir une (ou plusieurs) transition spécifique à un changement d'état, par exemple un *cut*. Pour cela, sous `Custom Blends`, cliquer sur `Create Asset`.

## *Clearshot*

Dans certains jeux, le *gameplay* consiste en des caméras fixes qui ciblent (ou non) un personnage en mouvement. Lorsque le personnage entre dans une certaine zone, une autre caméra est automatiquement choisie à un autre angle de vue.

Pour cela, choisir dans le menu `Cinemachine > Create ClearShot Virtual Camera`. Un onjet `CM ClearShot1` est créé. On y déplace en enfants les caméras virtuelles que l'on va utiliser. Le composant attaché à cet objet permet également d'ajouter de nouvelles caméras (propriété `Virtual Camera Children`).

Définir ensuite l'objet dans `Look At` et éventuellement dans `Follow`. La `Priority` générale (ou spécifique de chaque caméra dans la liste des enfants) contrôle quelle caméra utiliser : une valeur élevée conduit à utiliser telle caméra plutôt que celles ayant une valeur plus basse. `Randomize Choice` détermine si le choix d'une caméra s'effectue aléatoirement ou non. `Default Blend` et `Custom Blends` définissent le type de transition et leur durée comme la caméra précédente.

Ensuite, sélectionner toutes les caméras enfants et leur ajouter le composant `Cinemachine Collider`.
- `Collide Against` détermine les *layers* pris en compte pour la collision.
- `Preserve Line Of Sight` si la caméra reste en place ou non.
- `Optimal Target Distance` détermine à quel point la caméra est choisie.

## Avec *Timeline*

Prenons l'exemple d'une scène par défaut et ajoutons-lui un cube. Attacher à la caméra le composant `CinemachineBrain`. Cliquer-déplacer dans la fenêtre *Timeline* la caméra et choisir `CinemachineTrack`. Puis clic droit dans la partie droite de la fenêtre et choisir `Add Cinemachine Shot Clip`. 

Dans l'*Inspector*, renseigner dans le champ la caméra virtuelle ou bien cliquer sur `Create` pour en créer une nouvelle. Les propriétés affichées sont celles de la caméra choisie. Par exemple, renseigner le champ `Look At` pour orienter la caméra vers le cube. De la sorte, rien de plus n'est à animer et la rotation de la caméra est calculée dynamiquement.

Sous la catégorie `Aim`, les propriétés `Dead Zone Width` et `Dead Zone Height` définissent l'espace où la cible peut évoluer sans que la caméra ne se déplace. Si la cible sort de la zone, alors la caméra la suivra.

On peut ajouter un autre bloc à la suite du premier (dans la partie droite de *Timeline*, clic droit puis `Add Cinemachine Shot Clip` puis créer une nouvelle caméra). Ici, renseigner le champ `Follow` pour voir que *Timeline* passe automatiquement d'une caméra de suivi à une autre par un *cut* cinématographique. Superposer les deux blocs provoquera une transition entre les deux caméras (rotation et translation sont mélangées dans l'intervalle).

Pour composer avec la caméra `Dolly Track with Cart`, utiliser dans *Timeline* la piste `Animation Track`. Cliquer sur le bouton enregistrer. Puis, aux étapes désirées, paramétrer la `Body > Path Position`.

*Timeline* propose également l'ajout de piste spéciale : clic droit puis `Cinemachine.Timeline > Cinemachine Track`. Dans la partie droite, ajouter un bloc par clic droit puis `Add Cinemachine Shot Clip` et y renseigner une première caméra virtuelle. Puis faire de même avec une seconde caméra. *Timeline* passera d'une caméra à une autre automatiquement.

## *Post-processing*

Prenons l'exemple d'une scène qui contient une *Timeline*. On y trouve 3 caméras virtuelles, animées, et qui se succèdent chacune à une certaine durée.

Sélectionner la **caméra principale** (pas les caméras virtuelles). Attribuer un *layer* `Post Processing` (aussi à ses enfants si c'est demandé). Lui ajouter un composant `Post Process Layer`. Définir son `Layer` à `Post Processing`. 

On veut que les effets soient partagés entre les caméras, c'est-à-dire des effets **globaux**. Pour cela, ajouter à la caméra un composant `Post Process Volume` et cocher `Is Global`. Cliquer sur `New` pour créer un nouveau profil et paramétrer les effets.

Maintenant, sélectionner une **caméra virtuelle**. Dans le composant `Cinemachine Virtual Camera`, tout en bas dans `Add Extension`, sélectionner `cinemachinePostProcessing`. Cliquer sur `New` pour créer un nouveau profil. On peut maintenant ajouter des **effets spécifiques à cette caméra**.

On peut également superposer des effets sur certaines caméras. Pour cela, ajouter un `3D Object > Post-Process Volume` à la scène. Cet objet contient un *collider*. Sélectionner son *layer* à `Post Processing`.
- `Blend Distance` définit la transition entre les effets actuels et ceux appliqués au volume lorsque la caméra entre dans le *collider*. Une valeur à 0 effectue une transition de type *cut* entre les deux effets.

La transition entre les deux caméras peut aussi être contrôlée par la *Timeline*.
- Créer deux caméras virtuelles et les placer en succession dans l'animation : clic droit puis `Add Cinemachine Shot Clip` dans la partie droite.
- Dans l'*Inspector*, glisser la caméra dans le champ `Virtual Camera`.
- Leur ajouter un composant `Cinemachine Post Processing` et créer un nouveau profil pour chacun.
- Paramétrer la profondeur de champ de la première caméra inverse de la seconde : net de près et flou de loin pour la première caméra puis flou de près et net de loin pour la seconde,
- Superposer les blocs de façon à créer une transition automatique.
- Résultat : on a simulé l'effet de changement de profondeur de champ de la caméra, le *pull focus effect*.
- Noter que le composant `Cinemachine Post Processing` présente la propriété `Focus Tracks Target` qui opère l'effet *pull focus* automatiquement au changement de caméra et sur la base de la distance entre la cible et la caméra.

## En 2D

Cinemachine fonctionne aussi pour les projets 2D. Par exemple, on peut utiliser une `Virtual Camera` qui `Follow` le *player* dans un jeu de *scrolling* de côté.
- Le zoom est défini avec `Lens > Orthographic Size`. 
- Les paramètres `Dead Zone Width/Height` définissent la zone à partir de laquelle la caméra se met à se suivre le *player*.
- Dans la fenêtre *Game*, déplacer le gizmo, par exemple un peu à gauche de l'écran pour laisser plus de vue sur le décor qui apparaît à droite.
- `Dead Zone Height` à 0 et `Soft Zone Height` à 0.8 pour établir un retard de déplacement au saut du *player*.
- Pour limiter le déplacement de la caméra à une zone, ajouter l'extension `CinemachineConfiner`. Ajouter un *collider* (le type *polygon* fonctionne également) sur un objet, par exemple sur l'image de fond du plateau. Renseigner cela dans la propriété `Bounding Shape 2D` de l'extension.
