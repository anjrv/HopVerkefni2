# Hópverkefni 1 - Vöruhúsið
Verkefnið er unnið af:<br/>
Atli Freyr Kristjánsson, afk5@hi.is (D3)<br/>
Jaan Jaerving, jaj20@hi.is (D1)<br/>
Snorri Sigurjónsson, sns26@hi.is (D5)

<code>Vefslóð verkefnsins:</code><br/>
Með grid: https://notendur.hi.is/~jaj20/vefforritun/Hopverkefni2Grid/<br/>
Án grids:<br/>
https://notendur.hi.is/~afk5/vefforritun/hopverkefni2/<br/>
https://notendur.hi.is/~jaj20/vefforritun/Hopverkefni2/<br/>
https://notendur.hi.is/sns26/vefforritun/HopVerkefni2/

## Uppsetning: 

Til að ná í verkefnið skal keyra:
```sh
git clone https://github.com/anjrv/HopVerkefni2.git
```

Til þess að geta keyrt verkefnið skal fyrst setja upp tól og tæki í rót verkefnis:
```sh
npm install
```

Til að keyra verkefnið og gera breytingar:
```sh
npm run dev
```

Í verkefninu er uppsett bæði stylelint og eslint.<br/>
Til að skoða hvort þar séu villur:
```sh
npm run test
```

## Verkefnið:

Verkefnið felst í því að smíða prótótýpu af fyrirlestravef fyrir vefforritun eftir eftirfarandi forskrift:

<code>Vefslóð:</code>
https://github.com/Wolfcoder13/vef1-2019-h2

Vefsíðan skal birtast rétt á ýmsum tækjum með mismunandi upplausn. Meðtöldum snjallsímum og spjaldtölvum.

## Uppsetning vefsíðu:

Vefsíðan hefur tvær HTML síður en mest allt HTML er búið til með Javascript. Kóðinn fylgir BEM skipulagi eða staðali sem auðveldar lestur og aðgengi.

Útliti er stýrt með CSS sem er skrifað í SCSS fyrir aukna möguleika við útfærslu vefsins. Skráin styles.scss safnar saman öllum SASS skrám og þaðan transpilað yfir í CSS. 

Virkni er stýrt með Javascript sem er transpilað með babel og rollup yfir í eitt bundle.js skrá. Þessi aðferð gefur okkur auknar líkur að vefsíðan virki í flestum núverandi vöfrum.

Lint er notað til að halda utanum að kóði fylgi bestu venjum ritmáli SASS og Javascript. 

Skrám verkefnisins var skipt niður í möppur til aðhalds. 

Í rót verkefnisins má finna eftirfarandi möppur:

- img:
myndir sem koma fram á síðu

- src:
inniheldur dev möppur og skrár: SASS(styles), index.js og Javascript(lib)

- dist:
inniheldur þýddar skrár fyrir CSS og Javascript

Skrár í rót:
.babelrc - Stillingar fyrir babel<br/>
.editorconfig - Samræmir notkun á tabs og spaces, bilum og fleira<br/>
.eslintrc - Stillingar fyrir Javascript linterinn<br/>
.eslintignore - Það sem eslint á ekki að skoða<br/>
.stylelintrc - Stillingar fyrir SASS linterinn<br/>
.stylelintignore - Það sem stylelint á ekki að skoða<br/>
.gitattributes - Stillingar fyrir git<br/>
.gitignore - Það sem á ekki að vera sent með í git REPOið<br/>
index.html - Upphafssíða sem gefur okkur valmynd fyrirlestra<br/>
fyrirlestur.html - Síða sem er búið til þegar einhver fyrirlestur er valinn<br/>
grid.css - Grid fyrirmynd sem unnið er eftir<br/>
lectures.json - JSON af fyrirlestrum sem er verið að birta<br/>
package.json - Tól og tæki<br/>
package-lock.json - Dependancies fyrir tól og tæki<br/>
rollup.config.js - Stillingar fyrir rollup

GitHub var notað til að uppfæra og færa skrár á milli sín. 
