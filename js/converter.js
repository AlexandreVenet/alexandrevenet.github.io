"use strict";

class ConverterMDHTML
{
    tableauFinal = [];
    etatUL1 = false;
    etatUL2 = false;
    etatOL1 = false;
    etatOL2 = false;
    debutCode = false;

    regExOL = /^[0-9]*\. /gm;
    regExOL2 = /^   [0-9]*\. /gm
    regExLien = /\[.*?\)/g;
    regExCode = /`.*?`/g;
    regExStrongI = /\*{3}.*?\*{3}/g;
    regExStrong = /\*{2}.*?\*{2}/g;
    regExI = /\*{1}.*?\*{1}/g;

    // constructor(){}

    AnalyseMD(texte)
    {
        // let texteSansRetours = texte.replace(/\r+/g,'');

        let texteTableau = texte.split('\n');

        this.tableauFinal = [];
        this.debutCode = false;
        this.etatUL1 = false;
        this.etatUL2 = false;
        
        for (let i = 0; i < texteTableau.length; i++) {
            let element = texteTableau[i];

            let isUL = element.substring(0,2) == '- ';
            let isOL = element.match(this.regExOL);
            let isULImbriquee = element.substring(0,5) == '   - ';
            let isOLImbriquee = element.match(this.regExOL2);

            if (element === null || element == '' /*|| element == '\r'*/) 
            {
                continue;
            }
            // titre H1
            else if(element.substring(0,2) == '# ')
            {
                // VerifierFinUL2(); 
                // VerifierFinOL2();
                // VerifierFinUL1(); 
                // VerifierFinOL1(); 

                let ligne = `<h1>${element.substring(2,element.length)}</h1>`;
                this.tableauFinal.push(ligne);
            }
            // titre H2
            else if(element.substring(0,3) == '## ')
            {
                this.VerifierFinUL2();
                this.VerifierFinOL2();
                this.VerifierFinUL1();
                this.VerifierFinOL1();

                let ligne = `<h2>${element.substring(3,element.length)}</h2>`;
                this.tableauFinal.push(ligne);
            }
            // bloc de code ```
            else if(element == '```\r')
            {
                this.VerifierFinUL2();
                this.VerifierFinOL2();
                this.VerifierFinUL1();
                this.VerifierFinOL1();

                if(!this.debutCode)
                {
                    this.debutCode = true;
                    this.tableauFinal.push(`<pre><code>`);
                }
                else
                {
                    this.debutCode = false;
                    this.tableauFinal.push(`</code></pre>`);
                }
            }
            // ligne vide, possiblement du code
            else if(element == '\r')
            {
                if(!this.debutCode)
                {
                    continue;
                }
                else
                {
                    let ligne = element.slice(0,element.length-1); 
                    this.tableauFinal.push(ligne);
                }
            }
            // liste UL ou OL
            else if(isUL || isOL)
            {
                this.VerifierFinUL2();
                this.VerifierFinOL2();
                
                let justeLeTexte;
                
                if(isUL)
                {
                    this.VerifierFinOL1();
                    if(!this.etatUL1)
                    {
                        this.tableauFinal.push(`<ul>`);
                        this.etatUL1 = true;
                    }
                    justeLeTexte = this.AnalyserTexte(element.substring(2,element.length));
                }
                else
                {
                    this.VerifierFinUL1();
                    if(!this.etatOL1)
                    {
                        this.tableauFinal.push(`<ol>`);
                        this.etatOL1 = true;
                    }
                    let debutChaine = element.match(this.regExOL)[0].length;
                    justeLeTexte = this.AnalyserTexte(element.substring(debutChaine,element.length));
                }
                this.tableauFinal.push(`<li>${justeLeTexte}</li>`); 
            }
            // liste UL ou OL imbriquées
            else if(isULImbriquee || isOLImbriquee)
            {
                let elementAnalyse;

                if(isULImbriquee)
                {
                    if(!this.etatUL2)
                    {
                        this.TraiterUL2(`<ul>`);
                        this.etatUL2 = true;
                    }

                    elementAnalyse = this.AnalyserTexte(element.substring(4,element.length));
                }
                else
                {
                    if(!this.etatOL2)
                    {
                        this.TraiterUL2(`<ol>`);
                        this.etatOL2 = true;
                    }

                    let debutChaine = element.match(this.regExOL2)[0].length;
                    elementAnalyse = this.AnalyserTexte(element.substring(debutChaine,element.length));
                }
                this.TraiterUL2(`<li>${elementAnalyse}</li>`);
            }
            // IMG
            else if(element.substring(0,2)=='![')
            {
                this.VerifierFinUL2();
                this.VerifierFinOL2();
                this.VerifierFinUL1();
                this.VerifierFinOL1();

                let crochetOuvrant = element.indexOf('[') + 1;
                let crochetFermant = element.indexOf(']');
                    let titre = element.substring(crochetOuvrant,crochetFermant);
                let parentheseOuvrante = element.indexOf('(') +1;
                let parentheseFermante = element.indexOf(')');
                    let url = element.substring(parentheseOuvrante,parentheseFermante);
			    let html = `<figure><img src="${url}" alt="Image"><figcaption>${titre}</figcaption></figure>`;
			    this.tableauFinal.push(html);
            }
            // paragraphe P ou ligne de code...
            else
            {
                this.VerifierFinUL2();
                this.VerifierFinOL2();
                this.VerifierFinUL1();
                this.VerifierFinOL1();

                if(!this.debutCode)
                {
                    if(!this.etatUL1 && !this.etatOL1)
                    {
                        this.tableauFinal.push(`<p>${this.AnalyserTexte(element)}</p>`); 
                    }
                }
                else 
                {
                    let ligne = element.slice(0,element.length-1); 
                    ligne = ligne.replaceAll('<','&lt;');
				    ligne = ligne.replaceAll('>','&gt;');
                    this.tableauFinal.push(ligne);
                }
            }
        }

        this.VerifierFinUL2();
        this.VerifierFinOL2();
        this.VerifierFinUL1();
        this.VerifierFinOL1();

        return this.tableauFinal;
    }


    TraiterUL2(texteAAjouter)
    {
        let dernierEntree = this.tableauFinal[this.tableauFinal.length-1]; 
        let chaineSansTagFin = dernierEntree.substring(0,dernierEntree.length-5);
        let index = chaineSansTagFin.length;
        let resultat = dernierEntree.slice(0,index) + texteAAjouter + dernierEntree.slice(index);	
        this.tableauFinal[this.tableauFinal.length-1] = resultat;
    }


    VerifierFinUL1()
    {
        if(this.etatUL1) 
        {
            this.tableauFinal.push(`</ul>`);
            this.etatUL1 = false;
        }
    }


    VerifierFinUL2()
    {
        if(this.etatUL2)
        {
            this.TraiterUL2(`</ul>`);
            this.etatUL2 = false;
        }
    }

    VerifierFinOL1()
    {
        if(this.etatOL1) 
        {
            this.tableauFinal.push(`</ol>`);
            this.etatOL1 = false;
        }
    }

    VerifierFinOL2()
    {
        if(this.etatOL2)
        {
            this.TraiterUL2(`</ol>`);
            this.etatOL2 = false;
        }
    }


    AnalyserTexte(texte)
    {
        let liens = [...texte.matchAll(this.regExLien)];
        if(liens.length != 0)
        {
            for (let i = 0; i < liens.length; i++) {
                const e = liens[i][0];
                let crochetOuvrant = e.indexOf('[') + 1;
                let crochetFermant = e.indexOf(']');
                    let titre = e.substring(crochetOuvrant,crochetFermant);
                let parentheseOuvrante = e.indexOf('(') +1;
                let parentheseFermante = e.indexOf(')');
                let infos = e.substring(parentheseOuvrante,parentheseFermante);
                let premierEspace = infos.indexOf(' ');
                    let url = infos.substring(0,premierEspace);
                    let bulle = infos.substring(premierEspace+2,infos.length-1);
                let lien = `<a href="${url}" title="${bulle}" target="_blank" rel="noopener noreferrer">${titre}</a>`;
                texte = texte.replace(e,lien);
            }
        }

        texte = this.VerifierTexteTags(texte, this.regExCode, 1, '<code>', '</code>');
        texte = this.VerifierTexteTags(texte, this.regExStrongI, 3, '<strong><i>', '</i></strong>');
        texte = this.VerifierTexteTags(texte, this.regExStrong, 2, '<strong>', '</strong>');
        texte = this.VerifierTexteTags(texte, this.regExI, 1, '<i>', '</i>');

        return texte;
    }


    VerifierTexteTags(texte, regex, index, tagDebut, tagFin)
    {
        let instances = [...texte.matchAll(regex)];
        if(instances.length != 0)
        {
            for (let i = 0; i < instances.length; i++) {
                const e = instances[i][0];
                let justeLeTexte = e.substring(index, e.length-index);
                let texteEtTags = `${tagDebut}${justeLeTexte}${tagFin}`;
                texte = texte.replace(e, texteEtTags);
            }
        }

        return texte;
    }
}