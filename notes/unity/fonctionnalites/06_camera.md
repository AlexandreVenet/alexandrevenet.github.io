# Caméra

Le 17-02-2021

La caméra est ce par quoi une scène est représentée à l'écran.

## Présentation

La scène Unity contient par défaut une **caméra**. Elle affiche un **cadre de prévisualisation** de ce qu'elle filme lorsque sélectionnée.

Elle dispose déjà de composants. Par exemple, on peut changer sa couleur de fond en cliquant sur `Background`.

Sa projection peut être `perspective` ou `orthographic`.

La caméra possède un ***frustum*** : c'est le **champ de vision**. Ce qui est en dehors de ce champ est le **hors champ**.

On peut utiliser **plusieurs caméras**, par exemple :
- une pour afficher l'UI joueur,
- une pour représenter la scène,
- une pour une *minimap* en surimpression,
- une pour simuler une caméra de surveillance dont l'image est projetée comme texture,
- etc.

Les propriétés du composant `Camera` dépendent du type de *pipeline* de rendu (*URP*, *HDRP*, *Built-in*). [Aperçu des conduites de rendu](https://docs.unity3d.com/Manual/render-pipelines.html "Aperçu des conduites de rendu" _blank).

Le composant `Pixel Perfect Camera` permet de paramétrer la résolution de sortie de la caméra et le nombre de pixels à afficher par unité Unité (mètre). Attention : la fenêtre *Game* doit être paramétrée avec les mêmes valeurs. Ce composant est utile notamment dans les jeux 2D où l'on souhaite des valeurs précises de rendu. Penser à utiliser des multiples de 2 (éviter interpolation des pixels et s'aligner sur la structure binaire de calcul), par exemple :
- `Assets Pixels Per Unit` : 32,
- `Reference Resolution` : 640, 480.

## Références

Des références sur la caméra, dans la documentation officielle :
- [Caméra](https://docs.unity3d.com/ScriptReference/Camera.html "Caméra" _blank), 
- [Composant caméra](https://docs.unity3d.com/Manual/class-Camera.html "Composant caméra" _blank).
- 