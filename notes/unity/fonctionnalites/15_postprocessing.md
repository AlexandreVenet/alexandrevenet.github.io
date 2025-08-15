# *Post-processing*

Le 20-10-2021

Le *post-processing* désigne l'ensemble des effets appliqués à l'image, une fois celle-ci générée.

## Références

- [Manual : Post-processing](https://docs.unity3d.com/Manual/PostProcessingOverview.html "Manual : Post-processing" _blank)
- [Package : URP](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@14.0/manual/index.html "Package : URP" _blank)

## Paramétrage 

On peut ajouter des effets de ***post-processing*** à la caméra :  ce sont des effets visuels ajoutés en fin de calcul de *frame* pour obtenir un certain rendu.

Si le *package* n'est pas déjà installé, suivre cette procédure.
- Ouvrir le menu `Window > Package manager`.
- Choisir `Unity Registry`.
- Chercher `Post Processing`.
- Installer.

Dans la fenêtre *Project*, faire clic droit puis `Create > Post-processing Profile` (ou `Volume Profile` sous URP). C'est le fichier  qui contient toutes les données d'effets que l'on va ajouter.

Créer un objet dans la scène et lui attacher le composant `Post-Process Volume` (ou bien ajouter dans la scène à partir du menu `Create > Volume > Global Volume`). On peut aussi attacher ce composant à la caméra mais en faire un **objet dédié** a des avantages : 
- si on change de caméra au cours de l'application, nul besoin d'ajouter un composant à cette nouvelle caméra ; ainsi **les paramètres sont conservés**,
- cela autorise **plusieurs *post process***, par exemple : utiliser un objet dédié pour un espace extérieur et un autre pour un espace intérieur.

Voyons des propriétés de ce composant `Volume`.
- `Mode` : global ou local (affecte ou non toute la scène).
- `Weight` : le poids de l'effet en pourcentage (0,1).
- `Profile` : y renseigner dans le champ `Profile` le fichier profil précédemment créé. Si le fichier n'existe pas, on peut cliquer sur `New` pour en créer un ; alors le fichier est créé dans un dossier du nom de la scène avec le suffixe `_Profiles`.

Attribuer à cet objet un ***Layer*** nommé « PostProcess » (ou autre). C'est par ce *layer* que la caméra va afficher les effets ; sans lui, pas d'effet. 

Sélectionner la caméra, lui attacher un composant `Post-Process Layer`. Au paramètre `Layer`, choisir « PostProcess ». Sous URP, inutile de faire cela : il suffit de cocher la case `Post Processing` et d'attribuer le *layer* à la propriété `Volume Mask`. 

On peut commencer à paramétrer le composant `Post-Process Volume`.

Dans la fenêtre *Scene*, en édition, il est possible d'afficher/masquer les effets visuels pour mieux les paramétrer.

## Effets

On dispose maintenant d'une batterie d'effets à ajouter avec le bouton `Add effect...`.

Tous ces effets sont autant de calculs en plus pour rendre l'image à l'écran. Certains effets sont peu coûteux en calcul (vignette, distorsion de lentille) car ils prennent peu d'informations de la scène pour être effectués. En revanche, tous les effets sont **superposables**, ce qui a un coût en termes de calcul **en plus** du calcul de chaque effet. 

Le bouton `On/Off` gère le paramètre d’**activité**. Ne pas confondre avec l’activité du **composant** d’effet contrôlée par la case à cocher à côté du nom.

- `Vignette` permet d'ajouter un filtre autour du centre de l'image pour concentrer l'attention ou créer une tension,
- `Bloom` ajoute des éblouissements sur les zones lumineuses, matériaux avec émission, *specular highlights*,
- `Lens distorsion` : effets de lentille comme par exemple le *fish-eye*,
- `Motion blur` : plus efficace en rotation qu’en translation, gourmand en calcul car dépend du mouvement de caméra,
- `Depth of field` : avec une `Aperture` petite et une `Length` grande la modification de la `Focus distance` est plus aisée le point de netteté est visible,
- `Auto exposure` : gestion automatique de l’éblouissement ou de l'obscurcissement lors du passage d'une zone éclaire à une zone d'ombre et inversement,
- `Chromatic aberration` : décalage des couleurs (à coupler éventuellement avec la distorsion de lentille),
- `Color grading` : modification des couleurs. Il nécessite un **espace de couleurs linéaire** qui est plus réaliste et plus lourd en calculs que le **gamma**. Pour cela, aller dans menu `Edit > Project settings > Player > Other settings > Color space`. Ensuite, paramétrer le composant à loisir. Pour les *trackballs*, tout est déplaçable avec clic gauche souris, et le clic droit réinitialise les valeurs : `Lift` pour les tons sombres, `Gamma` pour les tons moyens, `Gain` pour les tons clairs,
- `Ambiant occlusion` : ombres dans les angles moins éclairés. Les objets peuvent avoir une texture au paramètre `Occlusion`, texture qui contrôle en niveau de gris comment l’effet doit s’appliquer,
- `Screen space reflections` : réclame une caméra en `Rendering path` : `Deferred`. Simule des réflexions en inversant le rendu. Limite : un objet non vu par la caméra n’est pas calculé,
- `White Balance` permet de modifier la couleur du blanc.

Tous ces effets sont ceux d'Unity mais il existe de nombreux autres disponibles selon la *Render pipeline* utilisée ou sur Internet.
