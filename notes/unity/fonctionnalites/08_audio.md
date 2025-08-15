# Audio

Le 27-05-2022

L'audio concerne la bande-son musicale, l'ambiance sonore et l'effet sonore. Dans Unity, les ***audio clips*** sont joués par un ***audio listener*** depuis des ***audio sources*** qui sont elles-mêmes traitées par des ***audio groups*** gérés par l'***Audio Mixer***. 

## *Audio clip*

Un ***audio clip*** est le **fichier** audio à jouer : .mp3, .ogg, .wav, aif/.aiff.

## *Audio source*

L'***audio source*** est ce qui joue le son, c'est un composant d'objet. Par défaut il est sans spatialisation, c'est-à-dire que le son est entendu de partout au même volume : sa propriété `Spatial Blend` est à 0 (ou 2D).

Pour ajouter ce composant :
- sélectionner un objet dans la scène, 
- ajouter le composant `AudioSource`,
- à la propriété `AudioClip` assigner un *asset* audio,
- modifier le **volume**, si c'est un fichier en **boucle** ou non, si le son doit être lancé en `Awake` ou non, etc.

Pour modifier la spatialisation : 
- assigner à `Spatial Blend` la valeur maximum (1, 3D),
- les `3D Sound Settings` sont alors disponibles comme le `Rolloff` qui définit la taille dans l'espace et le facteur d'atténuation,
- le graphe représente le volume sonore selon la distance de l'émetteur. On peut modifier cette courbe. La barre verticale rouge représente la position de l'*audio listener*. 

## *Audio listener*

Le son est joué **à partir** d'un ***audio listener***, autre composant d'objet, composant qui détecte un son produit à une position donnée (avec ou sans spatialisation) et le joue à l'utilisateur. C'est un peu l'oreille de la scène.

**Un seul** *audio listener* par scène. 

La **caméra** par défaut est dotée d'un tel *audio listener*. On peut préférer l'attribuer à l'objet du *player*, par exemple dans un jeu à caméra fixe où le sons dépendent de la position du *player* plutôt que de la caméra.

## Par script

On peut manipuler l'audio avec C#. Dans l'exemple suivant, on veut déclencher un son quand on appuie sur barre espace. Le `GameObject` doit avoir le composant `AudioSource` et ce composant présente un champ `Audio Clip` vide.
```C#
AudioSource _monAudioSource;

// à renseigner en éditeur
[SerializeField] private AudioClip _monSon; 

private void Start()
{
	_monAudioSource = GetComponent<AudioSource>();
}

private void Update()
{
	if(Input.GetKey(KeyCode.Space))
	{
		// lancer une fois, le son, au volume max
		_monAudioSource.PlayOneShot(_monSon, 1.0f); 
	}
}
```

Un objet peut lire un *audio clip* choisi **aléatoirement** depuis un *array*. Pour cela, ne pas renseigner d'*audio clip* dans son composant *Audio source*, décocher la case `Play On Awake`. Et coder :
```C#
[SerializeField] AudioClip[] _audioClips; 
private AudioSource _as;

private void Awake()
{
	_as = transform.GetComponent<AudioSource>();
}

private void LancerSon()
{
	_as.PlayOneShot(_audioClips[Random.Range(0,_audioClips.Length)], 1.0f);
}
```

Déterminer quand une *audio source* a **fini de jouer** :
```C#
private AudioSource _source;

private void Update()
{
	if(Input.GetKeyDown(KeyCode.Space))
	{
		StopAllCoroutines();
		_source.Play();
		StartCoroutine(CheckComplete());
	}
}

public IEnumerator CheckComplete()
{
	yield return new WaitUntil(() => // attendre que [contenu de la lambda]
	{
		_source.isPlaying == false;
	});
	// étape suivante :
	Debug.Log("lecture terminée"); 
}
```

Par défaut, la **tête de lecture** de l'*audio clip* est positionnée par l'*audio source* au début, c'est-à-dire à la valeur 0. Cette tête de lecture peut être positionnée plus tard dans la courbe audio avec la propriété `time`.

```C#
_audioSource.time = 0.3f; // la tête de lecture démarre à tel temps
_audioSource.Play();
```

## *Audio Reverb Zone*

Unity propose un composant `AudioReverbZone` indépendant des *audio groups* et *mixers*. Ce composant applique un effet de **réverbération** aux objets ayant le composant `AudioSource` et qui viennent à passer près de lui à une certaine distance.

Limite : sa forme est sphérique. Ainsi, s'il est placé au centre d'une pièce cubique, il faudra choisir entre avoir une baisse d'effet dans les coins intérieurs ou avoir un début d'effet depuis l'extérieur.

Le composant `AudioSource` offre des contrôle sur les *reverb zones* :
- cocher `Bypass Reverb Zones` pour annuler toute réverbération,
- modifier la valeur de `Reverb Zone Mix` pour contrôler la quantité de réverbération à appliquer une fois que l'objet est dans la *reverb zone*.

## *Audio group*

L'***audio group*** rassemble et canalise des *audio sources*. Ces sont autant de *mixers audio*.

## *Mixers audio*

Le ***mixer audio*** contrôle la sortie audio des *audio clips* ou des *audio groups*.

Créer dans *Project* un dossier nommé « Mixers » puis clic droit `Create > Audio Mixer`. L'***audio mixer*** propose déjà des propriétés en cliquant dessus ou sur le triangle à côté de son nom.

Double-cliquer dessus ouvre la fenêtre ***Audio Mixer***. Chaque *mixer* contient des contrôles de piste : solo, mute, effets de sortie.

Par défaut, le ***Master*** est l'*audio group* principal ou racine, contenant tous les autres. Par exemple, en modifiant le volume, on contrôle ses enfants en cascade. 

On peut créer des ***Groups*** (ex : SFX, music...) : les *audio clips* sont joués dans des `AudioSource` qui prennent en **sortie** le *group* choisi. Pour cela, d'abord ajouter un *group* (clic droit sur la ligne ou bouton `+`). Ensuite, ajouter un objet à la scène, lui attacher un composant `AudioSource` puis renseigner dans le champ `Output` le *group* voulu. Les *groups* permettent de paramétrer la sortie des `AudioSource` dans un seul *mixer*. Si l'on veut que le *Master* contrôle tous les autres, il suffit créer les *groups* en tant qu'enfants du *group Master* avec un clic droit sur ce dernier.

Ensuite, on peut **contrôler un effet par script**, en **exposant un paramètre d'effet** :
- cliquer sur un *mixer* (ex : *group* SFX), 
- dans l'*Inspector*, faire un **clic droit sur un paramètre d'effet** (ex : `Attenuation > Volume`) et choisir `Expose` ; un petite flèche apparaît, 
- dans la fenêtre *Audio Mixer*, ouvrir le menu `Exposed Parameters` puis **clic droit sur un nom pour renommer** (ex : « SFXVolume » ou bien le même nom que le paramètre exposé),
- coder :

```C#
//... autres librairies
using UnityEngine.Audio; // ajouter pour l'audio

public class AudioMixerVolume : MonoBehaviour
{
	[SerializeField] private AudioMixerGroup _audioMixerGroup; 
	// Ou type AudioMixer.
	// Renseigner avec un groupe ou l'Audio Mixer.

	public void SetVolume(float value){
		_audioMixerGroup.SetFloat("NomDuParametreExposé", value);
	}
}
```

Si on veut utiliser un `slider` d'UI, il faudra convertir les valeurs min/max -80/20 en échelle 0/1. Le script est à ajouter au `slider` (ou `GameObject` dédié) et le `Slider` doit le renseigner dans `OnValueChanged` puis dans l'ensemble `Dynamic Float`. Exemple de calcul linéaire (hors courbe logarithmique) :

```C#
private void SetVolume(float value)
{
	float volume = Mathf.Lerp(-80, 20, value);
	_audioMixerGroup.audioMixer.SetFloat(_parametre, volume);
}
```

Réaliser un *fade-in* :

```C#
[SerializeField] private AudioMixer _mixer; 
[SerializeField] private float _fadeTime = 15f; 

private void Start()
{
	StartCoroutine(FadeIn());
}

public IEnumerator FadeIn()
{
	float normalVolume = 0f; // init
	while(normalVolyme <= 1f)
	{
		_mixer.SetFloat("Volume",NormToDecibel(normalVolume));
		normalVolume += (1f / _fadeTime) * Time.deltaTime;
		yield return null;
	}
}

// Fonction de conversion d'une valeur en décibels
public float NormToDecibel(float normal)
{
	float db;
	if(normal != 0)
	{
		db = 20f * Mathf.Log10(normal);
	}
	else
	{
		db = -80f;
	}

	return decibel
}
```

## Effets

Les *audio groups* vus précédemment permettent d'appliquer des **effets** au flux sonore qu'ils canalisent.

Par exemple, dans la fenêtre *Audio Mixer*, si on dispose d'un *group* nommé « Voices », on peut créer un sous-groupe nommé « Phone ». Sélectionner ce sous-groupe. Dans la partie de la fenêtre représentant le *mixer*, cliquer sur `Add...` et choisir *Highpass simple*. Ainsi, tout son qui passe en `Output` par ce *mixer* se verra appliquer cet effet.

Les effets sont à placer dans un certain **ordre**. Dans l'*Inspector*, on peut les déplacer en sélectionnant les en-têtes. Cet ordre **peut néanmoins ne pas être suivi selon les besoins**.
- *Receive, Duck Volume*
- *Lowpass, HighPass*
- *Pitch Shifter*
- *Compressor*
- *ParamEQ*
- *Echo, Flange, Chorus*
- *SFX Reverb*
- *Attenuation*
- *Send*

Outre le fait de jouer un son avec un effet, on peut aussi vouloir jouer un **effet sur un *audio group***.
- Créer un *group* nommé « Reverb ».
- Lui ajouter les effets `SFX Reverb` et `Receive`. Noter que `SFV Reverb` ne dispose pas des *presets* du composant `Reverb Zone` : il faut tout renseigner. Placer `Receive` **en premier**.
- Dans le *group* « Phone » précédent, ajouter un effet `Send`. Dans le menu déroulant, sélectionner `Reverb\Receive` (cela cible le *group* « Reverb »). Paramétrer le `Send Level` à 0db. Enfin, placer `Send` **en dernier**.
- Maintenant, on peut modifier le niveau de réverbération en modifiant le **volume** du *mixer* « Reverb ».

Dans le même esprit, on peut utiliser l'effet `Duck Volume`, en particulier sur un *audio group* de musique : on atténue le volume de musique pendant qu'un autre son joue, par exemple un dialogue.
- Ajouter un *audio group* « Musics » enfant du *group* principal « Master ».
- Lui ajouter un effet `Duck Volume`.
- Ajouter un *audio group* « PNJ » à un groupe préexistant « Voices ».
- Lui `Add...` l'effet `Send`. Placer cet effet en fin de liste. En `Receive`, sélectionner `Musics\Duck Volume`. En `Send Level`, renseigner 0db.
- Maintenant, jouer avec les paramètres du `Duck Volume` : `Threshold` définit le seuil et `Ratio` définit la quantité à appliquer. Lorsque la voix passe le seuil, alors la musique baisse selon le `Ratio`.

La plupart des modifications peuvent s'effectuer en édition. D'autres nécessitent de passer en mode *Game*. Unity propose un bouton `Edit in Playmode` (fenêtre *Audio Mixer* ou dans l'*Inspector* d'un *mixer*) permettant d'effectuer des modifications qui sont **enregistrées même en *Game***.

## *Audio events*

Un **événement** ici consiste en l'appel d'une fonction qui se déclenche à un certain moment dans une animation. 

Par exemple : le bruit de pas d'un personnage qui marche. 
- Sélectionner une animation dans les *assets*, cliquer sur l'onglet `Animation` dans l'*Inspector* et ouvrir la catégorie `Events` (cliquer sur le triangle). 
- Se déplacer dans la prévisualisation pour se positionner à une certaine *frame* de l'animation. Cliquer sur le bouton blanc pour ajouter un événement. Renseigner un nom pour la fonction. On peut ajouter autant d'événements que nécessaire.
- Cliquer sur `Apply`.
- Sélectionner l'objet qui possède le composant `Animator` et qui utilise cette animation.
- Créer un nouveau script et l'attacher en frère ou voisin du composant `Animator`.
- Ajouter un composant `AudioSource` et y renseigner l'*audio clip* de bruit de pas. Décocher `Play On Awake` et `Loop`.
- Coder.

```C#
private AudioSource _source;
private void Awake()
{
	_source = GetComponent<AudioSource>();
}
public void NomFonctionEvenement()
{
	_source.Play();
}
```

## Pratiques, optimisation

Références : 
- [GameDevBeginner Tips](https://gamedevbeginner.com/10-unity-audio-tips-that-you-wont-find-in-the-tutorials/ "GameDevBeginner Tips" _blank),
- [GameDevBeginner optimisation](https://gamedevbeginner.com/unity-audio-optimisation-tips/ "GameDevBeginner optimisation" _blank),
- [Documentation AudioClip](https://docs.unity3d.com/Manual/class-AudioClip.html "Documentation AudioClip" _blank).

Un fichier audio peut être enregistré à différents **taux d'échantillonnage** (*sample rate*) : 11025Hz (le plus bas), 22050Hz,  48000Hz (idéal). Un taux d'échantillonnage plus élevé entraîne des fichiers plus volumineux. Pour les fichiers audio AIFF et WAV, s'assurer que la **profondeur de bits** (*bit depth*) est de 32bits et non en virgule flottante. 

On peut importer un fichier audio au **format de compression** qui est **PCM (pas de compression)**, pour ensuite paramétrer l'encodage dans Unity en fonction de nos besoins.

Code :
- `Play()` à utiliser de préférence pour les **musiques**, l'**ambiance** et autres effets nécessitant de **boucler la lecture**,
- `PlayOneShot()` à utiliser de préférence pour les **sons courts non en boucle**. Avantage : pas d'interruption de l'*audio clip* qui est déjà en train de jouer (on peut donc répéter le son sans coupure, utile pour les pistolets à bulles).
- Un son continue de jouer même avec `Time.timeScale = 0`. Avec la propriété `AudioListener.pause = true`, le son est suspendu. Pratique pour couper le son lors d'un menu pause. Mais, certains sons peuvent être nécessaires alors qu'on est dans le menu pause : alors, pour chaque *audio source* utiliser `AudioSource.ignoreListenerPause = true`.

En vrac :
- cocher la case `Force To Mono` pour les sons 3D, car cela ajoute un traitement stéréo,
- cocher la case `Load In Background` pour les sons qui seront nécessaires plus tard dans la séquence de jeu ou les *audio clips* longs et pour éviter de bloquer le jeu pour charger ce fichier (décocher pour les courts),
- sons courts (max 5 secondes) joués à la demande : `Load Type` à `Decompress on Load` (tout est chargé en mémoire au lancement de la scène et donc disponible rapidement),
- sons plus longs : `Load Type` à `Compressed in Memory`, 
- musiques et ambiances : `Load Type` à `Streaming` (le fichier n'est pas chargé d'un seul coup mais au fur et à mesure),
- `Preload Audio Data` pour éviter les retards de chargement des données audio,
- les sons audio ne sont pas ou plus utilisés ? Les supprimer de la mémoire avec `audioClip.UnloadAudioData()` (Unity ne semble pas le faire automatiquement même s'il n'y a plus d'*audio source* dans la scène),
- préférer désactiver le composant `AudioSource` plutôt qu'utiliser la propriété `Mute` qui conserve des données audio ; à moins d'avoir besoin de ces informations, évidemment.
