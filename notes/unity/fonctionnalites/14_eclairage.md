# Eclairage

Le 11-08-2024

L'éclairage est ce qui rend visibles les objets d'une scène. 

## Généralités

Unity propose toute sorte de **lumières** : omnidirectionnelles, directionnelle, *light-mapping*, *baked*... 

Questions à poser en conception : 
- qu'est-ce qui m'**attire** visuellement ?
- quelles sont les **sources principales** ?
- quelle **impression** l'éclairage me donne-t-il ?
- quelles informations me donne-t-il de l'**espace** ?

Les lumières peuvent être classées : 
- par aspect **pratique ou décoratif** : elles permettent de voir la scène / elles contribuent à l'esthétique sans apporter de visibilité,
- par type **omnidirectionnel ou directionnel** : *ambiant*, *point* / *spot*, *directional*,
- par type de **technique** : temps réel / précalculé.

Références : 
- [Documentation Tour d'horizon de l'éclairage](https://docs.unity3d.com/Manual/LightingOverview.html "Documentation Tour d'horizon de l'éclairage" _blank),
- [Learn Best practices](https://learn.unity.com/tutorial/lighting-best-practices "Learn Best practices" _blank).

## *Render Pipeline*

Unity propose plusieurs ***render pipelines*** que l'on peut présenter rapidement ainsi :
- ***Built-in render pipeline*** : le mode « par défaut », peu personnalisable, peu efficient (efficience = pour un processus technique, optimimum entre résultat obtenu et ressources utilisées). Un nouveau projet « 3D » dans Unity Hub présente ce paramétrage. Il tend à être déprécié au profit des autres,
- ***Universal Render Pipeline (URP)*** : la qualité visuelle optimisée et compatible avec la plupart des terminaux (mobile, WebGL, VR...),
- ***High Definition Render Pipeline (HDRP)*** : le meilleur de la qualité visuelle qu'Unity peut proposer, destiné aux machines puissantes et récentes (consoles de salon, terminaux spécialisés *gaming*...), mais requiert une expertise en calculs graphiques.

URP et HDRP sont **personnalisables**. Ils font partie des ***Scriptable Render Pipelines (SRP)***. Les SRP sont une architecture de *pipelines* personnalisables, on peut même les rédiger de toutes pièces. Ceci étant réservé à des connaisseurs, Unity propose les modèles URP et HDRP qui serviront pour la grande majorité des projets.

Comment choisir son *pipeline* de rendu ? En fonction des objectifs qu'on s'est fixés. Néanmoins :
- les SRP proposent des outils supplémentaires au *built-in render pipeline* comme **Shader Graph** et **VFX Graph**,
- URP est orienté performances quelle que soit la plateforme visée (web, *destktop*, mobile, VR).

[Choisir sa conduite de rendu](https://docs.unity3d.com/2019.3/Documentation/uploads/Main/BestPracticeLightingPipeline16.svg "Choisir sa conduite de rendu" _blank)

## Lieux du paramétrage

On manipule les lumières à différents endroits selon les besoins :
- dans la scène lorsqu'il s'agit d'objets ou composants relatifs à l'éclairage (lumière, caméra),
- dans la fenêtre *Lighting*,
- dans menu `Edit > Project settings...` puis `Player > Other settings` ou bien `Graphics` qui propose un lien vers l'***asset* de configuration d'URP ou HDRP**.

## Exemple

Voici un exemple de rendu temps réel dans un environnement éclairé de façon générale. Garder à l'esprit que tous les calculs de lumière sont **combinés** avec chaque nouveau paramètre. Donc, procéder en isolant chaque fonction avant de tout mixer afin de mieux contrôler chaque effet. On paramètre ici :
- la `Skybox`, l'`Environment lighting`, les `Environment reflections`,
- les effets de `Post Processing`.

Procèdure :
- dans un dossier « Materials », créer un nouveau *Material* de type `Skybox/Procedural` : on le paramètre à loisir (alors que la `Skybox` par défaut est verrouillée),
- ouvrir la fenêtre *Lighting*,
- assigner le matériau au champ `Skybox Material`,
- dans `Environment Lighting`, choisir `Gradient` et manipuler à loisir (exemple : couleur de sol idem que le sol qu'on utilise pour simuler le rebond de lumière) ; cela donne plus de contrôle que d'utiliser seulement les valeurs de la `Skybox`,
- dans `Environment Reflections`, modifier l'`Intensity Multiplier` au besoin, ainsi que les `Bounces` (nombre de rebonds, par exemple lorsque des miroirs se font face) ; tout ceci affecte les réflexions de l'environnement,
- décocher `Baked Global Illumination` pour que l'éclairage soit complètement temps réel,
- en bas de la fenêtre, décocher `Auto generate` pour voir les différences à chaque étape et cliquer sur `Generate Lighting` pour calculer l'éclairage (laisser appuyer pour ouvrir le menu et vider les données si besoin avec `Clear Baked Data`) ; un dossier portant le nom de la scène est automatiquement créé et contient des données d'éclairage et les `Reflections Probes`,
- pour profiter des effets ainsi générés, créer par exemple un matériau transparent, blanc, `Metallic` à 1 et `Smoothness` à 1, et prenant les `Specular highlights` et `Reflections`.

Ensuite, on peut vouloir ajouter des effets de ***Post Processing*** :
- si non disponible, installer le *package* depuis le menu `Window > Package Manager > Unity Registry > Post Processing`,
- sélectionner la caméra et y ajouter le composant `Rendering/Post-process Layer`,
- dans `Layer`, sélectionner `Everything`,
- sélectionner le `Mode` d'*anti-aliasing* si besoin,
- ajouter un autre composant `Rendering/Post-process Volume`,
- sélectionner `Is Global`,
- cliquer `New` pour générer un nouvel asset de profil qui contiendra tous les paramètres (utiles pour les réutiliser à loisir dans le même projet ou dans d'autres projets),
- à partir de là, ajouter des effets avec `Add effect...`,
- l'`Ambiant occlusion` calcule les ombres dans les angles resserrés d'objets,
- Le `Bloom` génère des éblouissements sur les matériaux avec émission et `Specular highlights`...,
- le `Color grading` apporte des contrôles fins sur les couleurs (`Post-exposure EV` et `Saturation`)

## Lumières et illumination globale

Il existe en 3D l'**éclairage direct et indirect**.
- éclairage **direct** : une lampe envoie un rayon qui touchant une surface l'éclaire.
- éclairage **indirect** : la surface renvoie un rayon de lumière vers une autre surface. L'éclairage indirect demande beaucoup de calculs et, en général, n'est pas fait en temps réel. 

Le fait que le rayon de lumière « rebondisse » sur les surfaces conduit à penser une illumination « globale » ; l'éclairage de la scène dépend alors des interactions entre lumières et matériaux.

Unity propose **deux systèmes d'illumination globale** correspondant à ces deux types d'éclairage et dépendant par ailleurs du type de ***render pipeline*** choisi. Ces deux systèmes sont :
- ***realtime global illumination*** : lumières temps réel, *light probes*,
- ***baked global illumination*** : *lightmap*, *area light*, *reflection probes*.

## Modes

Précisons les **techniques d'éclairage** ou **modes de lumière (*light modes*)** pour chaque illumination globale. Voyons également le cas proposé par Unity qui consiste à **combiner** temps réel et *baked*.
- **Temps réel (*realtime*)** : 
	- tout est calculé à chaque *frame*, 
	- permet d'éclairer et projeter des ombres sur des **objets dynamiques, amenés à changer**,
	- impossible de faire rebondir les rayons lumieux sur les surfaces, 
	- les ombres apparaissent complètement noires et ne subissent **aucun effet de lumière indirecte** (rebond), donc c’est non réaliste.
	- peut lourdement impacter les performances si scène complexe,
- ***Baked GI lighting*** : 
	- lumières **précalculées** sous forme de texture type ***lightmap*** avec prise en charge du **rebond** et d'**éclairage indirect** mais **sans effet sur l'éclairage *specular***, 
	- technique utilisée pour des **objets statiques, amenés à ne pas changer**, (cocher la case `static` dans l'*Inspector* à côté du nom de l'objet),
	- dans la fenêtre *Lighting*, dans `Scene`, créer de nouveaux paramètres d'éclairage pour la scène,  
	- les lumières utilisées doivent être paramtrées `baked`,
	- les lumières indirectes sont calculées par des ***light probes***,
	- les objets dynamiques ne reçoivent pas ces éclairage ni ses ombres,
	- gain de performances,
- ***Mixed realtime & GI lighting*** : 
	- génère une *lightmap* à partir des objets statiques **ET** prend en charge l'éclairage temps réel,
	- ombres dynamiques et précalculées **ET** contribution à **l’éclairage direct temps réel** et à **l’éclairage indirect précalculé**,
	- les lumières peuvent être **modifiées en temps réel** mais seulement pour leurs valeurs *realtime* (et pas les *baked*) ; paramétrer les lumières en mode `Mixed`,
	- dépend du `Lighting mode` : dans la fenêtre *Lighting*, cocher la case `Baked Global Illumination` puis voir le menu déroulant,
	- performances intermédiaires car prenant en compte les deux modes de calcul précédents.

*Baked GI lighting* et *Mixed realtime & GI lighting* peuvent être utilisés sur des PC dernières générations. Sur des configs moins puissantes (mobiles ou autres), *Baked GI lighting* est à préférer ; c'est souvent par élimination que le choix est fait. 

Entre les deux techniques, on peut ne choisir que le traitement **temps réel** pour toute lumière de la scène : ouvrir la fenêtre *Lighting* et décocher la case `Baked Global Illumination`.

Pour toute technique de *lightmap* : 
- les ***area lights*** sont des lampes à diffusion carrée.

## *Lightmapping*

La carte d'éclairage ou ***lightmap*** est un **fichier image comprenant les données d'éclairage**, en particulier l'éclairage indirect. 

Pour réaliser une *lightmap* : sélectionner les objets et les passer en `Static`, sélectionner les lumières et définir leur mode en `Mixed` ou `Baked`, et dans la fenêtre *Lighting* cliquer sur le bouton `Generate Lighting`.

Ce fichier est généré à partir des paramètres de la fenêtre *Lighting* à l'onglet `Scene`. On peut y paramétrer par exemple :
- la `Resolution` : plus la valeur est élevée, plus le calcul est long (40 est déjà énorme). Pour chaque pixel de texture par unité (mètre), il y a n pixels calculés pour la *lightmap* (nommés « *texels* »). Ceci peut être visualisé à partir du menu de la fenêtre *Scene* au menu `Shaded > Baked Global Illumination > Albedo`,
- le `Filtering` : gestion de la compression, 
- le nombre de `Bounces`  : rebonds de rayon lumineux (augmenter pour plus de réalisme mais au détriment du temps de calcul),
- `Direct Samples`, `Indirect Samples` et `Environment Samples` contrôlent la qualité de l'éclairage : échantillons calculés selon le contexte (par exemple pour les environnements extérieurs, augmenter `Environment Samples` ; pour les intérieurs, augmenter `Indirect Samples`),
- l'`Ambient Occlusion` : ombres de contacts entre les surfaces, dont on peut modifier la `Contribution` à l'éclairage et la `Max Distance` sur laquelle l'effet est calculé,
- l'`Indirect Intensity` définit la puissance de l'éclairage indirect de façon globale. Pour un contrôle plus fin ou en cas de problème juste avec une lampe, préférer intervenir sur celle-ci localement sur le paramètre `Indirect Multiplier`.

Dans la fenêtre *Lighting* à l'onglet `Baked Lightings`, on trouve une prévisualisation de la texture. Ce fichier *lightmap* peut présenter des espaces noirs :
- car certains endroits de la scène sont non éclairés,
- car ces pixels ne sont pas utilisés. 

Lors du *baking*, l'objet peut présenter un affichage non souhaité (artefacts, aberrations). Pour y remédier, plusieurs options :
- regarder dans *Lighting* les paramètres `Direct Samples`, `Indirect Samples` et `Environment Samples` qui contrôlent la qualité de l'éclairage. Ces paramètres sont à ajuster selon le contenu de la scène,
- décocher la case `Compress Lightmaps` : certes, le fichier sera plus lourd ca non compressé mais ne présentera plus les éventuelles interpolations indésirables des pixels.

Pour qu'un objet présente une texture, il lui faut une **carte UV**. Lors du *baking*, l'objet peut encore présenter des bizarreries. Alors, sélectionner le *mesh* importé et cocher la case `Generate Lightmap UVs`.

[Wikipédia à propos des Carte UV](https://fr.wikipedia.org/wiki/Cartographie_UV "Wikipédia à propos des Carte UV" _blank)

Unity utilise un **cache** pour accélérer le traitement. On peut vider ce dernier dans `Preferences > GI Cache > Clear cache`.

## Matériaux émissifs

L'**émissivité** est une propriété de matériau qui fournit à ce dernier le comportement d'une lumière. Ceci est utilisé préférentiellement avec une *lightmap* donc en éclairage *baked*.

Ajouter un nouvel objet à la scène, le définir en `static`. Créer un matériau et l'appliquer à l'objet. Dans l'*Inspector*, cocher la case `Use Emission Intensity` et changer la couleur. Cocher `Baked Emission`. Maintenant, dans la fenêtre *Lighting*, générer le *lightmap*, par exemple automatiquement, et voilà : un objet lumineux.

## *Light probes*

La *ligthmap* ne concerne que les objets **statiques**, c'est-à-dire immobiles. Donc, un objet non statique, dynamique, en mouvement, n'est pas affecté par la *lightmap*, ce qui a pour conséquence de ruiner le réalisme.

Unity propose la technique des ***light probes*** (sondes de lumière) pour **simuler en temps réel** la *lightmap* sur les objets dynamiques. Les *light probes* sont des points dans une matrice 3D qui donnent chacune une information de couleur selon leur position (moyenne). La simulation est donc une **approximation** temps réel de la *lightmap* sur les objets dynamiques.

Vérifications :
- pour travailler, ouvrir le menu *Lighting* et éventuellement cocher la case `Auto Generate` pour que la *lightmap* soit mise à jour automatiquement,
- dans les objets non statiques, sous `Probes`, définir `Light Probes` à `Blend Probes`.

Créer l'objet depuis menu `GameObject > Light > Light Probe Group` (ou clic droit dans *Hierarchy*).

Modifions :
- chaque disque jaune est une *probe*,
- la *probe* analyse en temps réel les données d'éclairage à sa position,
- donc, il s'agit de positionner chaque *probe* de façon stratégique aux endroits où l'objet dynamique va passer d'un éclairage à un autre,
- pour cela, dans le composant `Light Probe Group`, cliquer sur le bouton d'édition. On peut alors manipuler les disques dans l'espace 3D,
- positionner les *probes* non pas à l'intérieur des objets (sinon cela ne produit plus d'effet) mais juste devant les surfaces éclairées : l'objet dynamique doit ainsi se déplacer dans cette matrice d'éclairage temps réel,
- la matrice peut avoir une certaine résolution. Par exemple, dans une pièce en forme de cube, on peut commencer à placer 4 *probes* par face intérieure. Dupliquer les probes et les placer à des positions intermédiaires va donc augmenter le réalisme (il y a plus de changements de lumière sur l'objet dynamique) ; mais ceci a un coût en termes de calculs. 

Une fois le paramétrage terminé, un objet soumis aux *light probes* est accompagné dans la *Scene* de l'affichage des *probes* qui l'affectent en temps réel.

## *Rendering path*

Menu `Edit > Project settings... > Player` puis chercher ***Rendering path***.

C'est la façon de gérer la lumière, du moins au plus réaliste (ce qui augmente le nombre de *draw calls*).
- Le ***Vertex Lit*** est le plus léger et le moins fidèle.
- Le ***Forward rendering*** est plus lourd en calcul et plus fidèle. Il ne prend pas en compte l'*anti-aliasing* et pour compenser cela on devra passer par du *post-processing*. Chaque objet est rendu par *pass* pour chaque lumière qui l'affecte. Rapide, il permet le ***multi-sample anti-aliasing (MSAA)***,
- Le ***Deferred rendering*** est le plus beau et le plus lourd à calculer. Il prend en compte l'*anti-aliasing* directement. Le coût de l'éclairage est proportionnnel au nombre de pixels que la lumière éclaire (et non du nombre de lumières). 

Ce mode peut être forcé dans les paramètres de caméra. Ainsi, chaque caméra peut avoir un *render path* spécifique.

La fenêtre *Scene* propose l'option d'affichage du *Render Path*.
- Couleur rouge : ce qui est rendu en *vertex lit*.
- Couleur jaune : ce qui est rendu en *forward*.
- Couleur verte : ce qui est rendu en *deferred*.

## Espace de couleur

L'**espace de couleur** est défini dans menu `Edit > Project settings > Player > Other settings` :
- ***linear space*** : plus naturel mais plus gourmand, parfois non supporté selon le matériel (mobiles par exemple),
- ***gamma*** : moins naturel, la luminosité monte très vite et surexpose les couleurs.

## *HDR* & *tonemapping*

Par défaut, Unity utilise le ***Low Dynamic Range (LDR)*** où les couleurs sont codées sur 8 bits par canal (256x256x256). L'***High Dynamic Range (HDR)*** va au-delà de ces limitation. Quelques caractéristiques :
- défini dans les propriétés de la **caméra**,
- peut ne pas être pris en charge selon la configuration,
-  non supporté avec *Forward rendering* utilisant MSAA,
- à utiliser combiné à l'espace de couleur linéaire pour plus de réalisme.

Le ***tonemapping*** est un calcul mathématique permettant d'afficher ce qui est **surexposé** dans les lumière et **enterré** dans les ombres ; c'est un *package* (à récupérer et ensuite installer dans `Assets > Import Package > Effects`) fournissant un script à ajouter à la **caméra**.

[Documentation HDR](https://docs.unity3d.com/Manual/HDR.html "Documentation HDR" _blank)

## Lumière ambiante

L'***ambiant light*** ou ***environment lighting*** est peu réaliste mais peu gourmande en calcul.

Elle est à coupler avec *Baked GI Lighting* ou *Precomputed Realtime GI Lighting* pour teinter les interactions de lumières (effet de lissage visuel réaliste).

Elle **n'affecte pas** le rendu du *skybox*.

## Limite d'éclairages

Si le projet est configuré avec URP ou HDRP, alors Unity limite le nombre de lumières actives à chaque instant pour la caméra, à des fins d'optimisation. Cette limitation s'avère utile dans la plupart des cas. 

Cette limitation peut aussi ne pas correspondre aux attentes et il faut alors la paramétrer. Aller dans le menu `Edit > Project settings... > Graphics`, puis cliquer sur la référence dans le champ intitulé *Scriptable Render Pipeline Settings*. Cela sélectionne un *asset* de configuration. Maintenant, dans l'*Inspector* de cet *asset*, sous l'entrée *Lighting*, regarder l'option `Per Object Limit` : le nombre indiqué est la limite de lumières active pour la caméra.

## Ombres

L'**ombre** (*shadow*) calculée à partir de la lumière peut être :
- **absente** (*none*): pas d’ombre,
- **dure** (*hard*) : franches, nettes, crénelée,
- **douce** (*soft*) : dégradée, douce.

L'ombre peut être paramétrée dans les propriétés du composant `Light`, c'est-à-dire **localement**, pour chaque objet. Quelques propriétés :
- cocher par exemple la case `Enable`,
- `Update Mode` : définir quel mode de rafraîchissement. Toutes les *frames*, c'est-à-dire tout le temps ; à l'activation seulement, c'est-à-dire une seule fois (par exemple lorsqu'on allume une lampe contre un mur) ; à la demande, c'est-à-dire lorsqu'on le décide par code,
- `Resolution` : taille en pixels de l'image en mémoire, image qui est utilisée pour rendre l'ombre pour telle lumière. Plus cette taille est élevée, plus l'ombre est nette et plus elle demande de calculs,
- `Contact Shadows` peuvent être `Enable` en cochant la case idoine. Cela fournit un effet d'occlusion ambiante. Limitation : seule une lampe active dans la scène peut avoir ce paramètre activé.

Les ombres peuvent être paramétrées **globalement**. Pour cela, il faut accéder à l'*asset* de configuration du *render pipeline* choisi (URP ou HDRP). Les propriétés des ombres se trouvent sous l'onglet `Lighting` de ces *assets*. Quelques propriétés :
- `Maximum Shadows` : le nombre d'ombres maximum pour la scène,
- `Directional Light Shadows` :
	- les champs `Low`, `Medium`, `High`, `Ultra` définissent la résolution de l'image pour chaque niveau de qualité, 
	- `Max shadow resolution` : la résolution maximum de l'image.

Bien sûr, global et local peuvent être combinés.

Pour l'optimisation : ne choisir de calculer des ombres à chaque *frame* que si cela s'avère nécessaire ; le reste du temps, tous ces calculs peuvent être effectués en une fois ou bien peuvent être *baked*.

## Réflexions

Les réflexions sont souvent **précalculées** car gourmandes en calcul. Elles prennent la forme de *CubeMap* projeté sur les objets.
- Elles peuvent êtres **globales** : fenêtre *Lighting* à l'onglet `Environment Reflections`.
- Elles peuvent être **locales**, avec les ***Reflection Probes*** et ***Planar Reflection Probes*** : cubes ou plans qui génèrent une *SkyBox* à partir d'un point de l'espace (leur centre ou la `Capture Position`) et comprenant tout ce qui se trouve à l'intérieur de leur champ (*gizmo*). Ces *probes* augmentent significativement le réalisme.

Les *probes* présentent deux modes :
- ***baked*** : calcul de réflexion uniquement sur les objets de type `Reflection probes static` (sur un objet, cliquer à côté de son nom dans l'*Inspector* et choisir ce paramètre dans la liste),
- ou ***real-time*** : tout objet visible est calculé selon le masque de sélection utilisé.

Dans un *probe*, `Clear Flags` et `Background` permettent d'autonomiser les paramètres par rapport à ceux de la fenêtre *Lighting*.

Le paramètre `Intensity` ou `Multiplier` contrôle l'intensité de l'effet et trouve d'heureuses combinaisons avec le ***Post-process*** (par exemple l'effet `Bloom`).

Cocher `Use Influence Volume` pour que soit prise en compte la zone du *probe* où les matériaux réfléchissants vont utiliser les résultats capturés par le *probe* pour influencer leur propre surface.

Pour simuler le métal, l'objet recevant la lumière doit avoir un paramètre métallique et autoriser les réflexions.

[Documentation Cube map](https://docs.unity3d.com/Manual/class-Cubemap.html "Documentation Cube map" _blank)
