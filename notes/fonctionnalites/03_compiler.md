# Compiler

Le 22-04-2021

Un projet Unity n'est pas interprété (comme un fichier Javascript dans un navigateur) mais il est compilé.

## Principe

On **compile** ou exporte le projet pour une **plateforme**.

Pour cela, ouvrir l'application **Unity Hub**, sélectionner `Installs`. Dans la version d'Unity utilisée, cliquer sur le rouage puis `Add modules`. Choisir ensuite une ou plusieurs **destinations**.

Compiler pour un certain type de plateforme peut nécessiter également l'installation de programmes tiers, par exemple Android SDK pour exporter sur les terminaux Android.

Ensuite, dans Unity, ouvrir la fenêtre du menu `File > Build Settings`. Ajouter les scènes désirées (glisser-déposer) et les placer dans un ordre si cela est nécessaire. Sélectionner la destination ; Unity reconfigure le projet à chaque changement.

Le bouton `Player Settings...` ouvre la fenêtre des ***Project Settings*** à l'entrée `Player` où l'on renseigne les paramètres d'export pour la plateforme choisie.

En général, on peut organiser les sorties en créant des dossiers sur le disque, par exemple :
- le dossier `Build` pour les versions PC/Mac/Linux,
- le dossier `Build-WebGL` pour les verions WebGL.

## Cas particuliers

La **publication** sur [Itch.io](https://itch.io "Itch.io") exige la compression en `.zip` du contenu du dossier WebGL de l'application (et non pas le dossier où ce contenu se trouve).

Pour compiler en **WebGL**, il peut être nécessaire de **désactiver la compression** dans `Edit > Project Settings... > Publishing settings > Compression format > Disabled`. Plus d'infos ici : [Deploiement WebGL](https://docs.unity3d.com/Manual/webgl-deploying.html "https://docs.unity3d.com/Manual/webgl-deploying.html").