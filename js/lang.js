/* AndreuMatic ES/VA (piloto: solo index). El español es el HTML original;
   aquí solo el valenciano. Sin commit a prod: prueba local. */
(function(){
var VA = {
skip: 'Saltar al contingut',
brand_home: 'AndreuMatic inici',
nav_inicio: 'Inici',
nav_serv: 'Servicis',
nav_precios: 'Preus',
nav_como: 'Com funciona',
nav_opi: 'Opinions',
nav_cto: 'Contacte',
hdr_call: 'Telefonar al 654 225 831',
burger: 'Obrir menú',
hero_eb: 'València i rodalia · +10 anys d’experiència',
hero_h1: 'Problemes amb la <span class="hl">informàtica o la tecnologia?</span>',
hero_sub: '<strong>Tu a la teua. Dels problemes ens encarreguem nosaltres.</strong><br><span class="lema">Pau mental al teu món digital</span><br>Ho resolem, sense tecnicismes i sense sorpreses.',
scope1: 'caos',
scope2: 'diagnòstic',
scope3: 'calma',
pill1: 'PC lent',
pill2: 'Recuperació de dades',
pill3: 'Virus i errors',
pill4: 'Mudança a equip nou',
pill5: 'Suport remot',
pill6: 'Seguretat digital',
pill7: 'Smart home i wifi',
pill8: 'Web i correu',
pill9: 'Empreses',
pill10: 'Assessoria de compres',
cta_wa: 'Escriu-nos per WhatsApp',
cta_serv: 'Què resolem →',
cta_agenda: 'Agenda la teua cita →',
cta_caso: 'Conta’ns el teu cas →',
trust1: '✔ <b>Sense sorpreses</b> en el preu',
trust2: '✔ Diagnòstic <b>des de 25€</b>',
trust3: '✔ <b>Mateix dia</b> si ho necessites',
pain_h: 'DEL CAOS → A LA CALMA',
pain1: 'El PC tarda 10 minuts en arrancar',
pain2: '“No he fet còpia i tinc por de perdre-ho tot”',
pain3: 'Vas comprar un portàtil i no era lo que necessitaves',
pain4: 'Tens 40 contrasenyes i no recordes cap',
calma: '<b>Calma:</b> Un tècnic et contacta, ho deixa funcionant i t’ho explica sense presses. <a class="link-more" href="servicios.html">Vore servicis</a>',
tb1: 'PRESSUPOST<br>CLAR · SENSE SORPRESES',
tb2: 'EL MATEIX DIA<br>SI HO NECESSITES HUI',
tb3: 'DIAGNÒSTIC A CASA<br>DES DE 25€ · GRATIS SI REPARES',
d_eb: 'T’entenem, açò ho vegem cada setmana',
d_t: 'Si et sona alguna d’estes, podem ajudar-te hui mateix',
d_lead: 'No és “que sigues negat per a la tecnologia”. És que ningú t’ho ha explicat bé ni t’ha donat una solució definitiva. Eixe és el nostre treball.',
dp1: '<strong>“El meu ordinador va lentíssim”</strong>Arranca malament, es penja, obrir Word és un suplici. Perds temps i paciència cada dia.',
dp2: '<strong>“Tinc por de perdre les meues fotos i documents”</strong>El disc fa sorolls, et demana formatejar, o vas esborrar alguna cosa important. Cada hora compta.',
dp3: '<strong>“No sé què comprar i tinc por que m’enganyen”</strong>Portàtil, PC, mòbil… Hi ha 200 models i tots pareixen iguals. Una mala compra són 600€ a la fem.',
dp4: '<strong>“Estrene ordinador i és un caos passar-ho tot”</strong>Programes, contrasenyes, correu, fotos… I si es perd alguna cosa pel camí?',
dp5: '<strong>“El wifi, la impressora, la càmera… fallen quan volen”</strong>A casa o al negoci, quan falla, tot es para.',
dp6: '<strong>“Vull algú de confiança, no un 902”</strong>Parlar amb un equip que ve, mira, resol i t’explica amb calma. Això és El Teu Tècnic de Capçalera.',

d_ctapre: 'Vore preus',
v_eb: 'Proposta de valor · per què AndreuMatic',
v_t: 'Un equip tècnic, no un call center',
v_lead: 'Servicis d’informàtica amb tracte humà: parles amb qui ho arregla. Anem a ta casa a València, et donem preu abans de començar i no ens n’anem fins que funciona i ho entens.',
vc1t: 'Parlem la teua llengua',
vc1p: 'Sense tecnicismes. T’expliquem què ha passat, què hem fet i com evitar-ho. Sense presses.',
vc2t: 'Anem a ta casa',
vc2p: 'València i rodalia. I si és taller, ho arrepleguem i t’ho tornem. Tu no et mous.',
vc3t: 'Sense sorpreses',
vc3p: 'Sabràs lo que pagues abans de començar. Diagnòstic des de 25€, gratis si repares.',
vc4t: 'Garantia 15 dies',
vc4p: 'En el treball realitzat. I si necessitem tornar hui mateix, suplement clar: +15€.',
















pt_t: 'Particulars',
pt_p: 'A casa, en remot o amb arreplegada a domicili. Ideal si vols oblidar-te del tema tècnic per a sempre.',
pt_li1: 'Visita i diagnòstic a casa',
pt_li2: 'Suport remot 35€/h',
pt_li3: 'Web caiguda / WordPress / correu',
pt_btn: 'Vore servicis particulars',
bt_t: 'Empreses i autònoms',
bt_p: 'Que el teu negoci no es pare per un ordinador. Urgències el mateix dia i iguala mensual.',
bt_li1: 'Urgències en el dia',
bt_li2: 'Lloc nou llest el primer dia',
bt_li3: 'Backups + IT extern mensual',
bt_btn: 'Vore servicis empreses',

c_eb: 'Així de fàcil',
c_t: 'De “quin agobi” a “ja funciona” en 3 passos',
st1t: '1. Escriu-nos',
st1p: 'WhatsApp o telefonada al <a href="tel:+34654225831">654 225 831</a>. Conta’ns què passa amb les teues paraules. Contestem hui mateix.',
st2t: '2. Diagnòstic clar',
st2p: 'Anem a casa o ens connectem en remot. Et diem què és, quant costa i quant tarda. Tu decidixes.',
st3t: '3. Calma digital',
st3p: 'Ho deixem funcionant, amb garantia de 15 dies i explicat sense presses. Tu a la teua.',
o_eb: 'Tranquil·litat real',
o_t: 'Lo que més valoren: que torne a respirar',
o_rate: '★★★★★ <b>5,0</b> · 7 ressenyes a Google · <span class="muted"><a href="https://g.page/r/Cfi9FXQqK1T3EBM/review" id="gmb-link">deixa’ns la teua ací</a></span>',
t7p: '“Me’l va recomanar un amic, ja que era un tema urgent i la veritat és que molt satisfet amb el tracte i el servici rebut. Ràpid, informació clara i bon preu. Sens dubte un bon descobriment. Gràcies Andreu!”',






t4p: '“Si teniu dubtes no en tingueu!!! Un amic em va recomanar el servici d’Andreu per a recuperar unes dades del meu ordinador antic i a més necessitava muntar un pc gaming. Tot ha ixit excel·lent i s’ha adaptat a la meua situació econòmica.”',
t4n: 'Nam B',
t4s: 'Recuperació de dades',
t5p: '“Excel·lent experiència. Destaca per la seua gran professionalitat, eficàcia i tracte al client. És difícil trobar un servici tan ben estructurat i amb tant de compromís amb la qualitat. Es nota la dedicació.”',
t5n: 'P SEO',
t5s: 'Ressenya de Google',
t6p: '“Professionals, sempre disponible, molt atents, bon preu. No dubteu, són els millors.”',
q_eb: 'Qui som',
q_t: 'Som AndreuMatic. El teu equip tècnic de capçalera.',
q_lead1: 'Més de 10 anys en informàtica i tecnologia. Treballem a València i rodalia. Som l’equip que agarra el telèfon, va a ta casa i es queda fins que tot funciona.',
q_lead2: 'La nostra missió: que sentes <strong>pau mental al teu món digital.</strong>',

q_zona: 'Zona de servici',
q_zonap: 'València · Paterna · Torrent · Mislata · Burjassot · Quart de Poblet · Aldaia · Manises · Riba-roja de Túria · Paiporta · Alboraia · Xirivella · Alaquàs · Catarroja · Massanassa · Alfafar · Benetússer · Sedaví · Picanya · Godella · Rocafort · Tavernes Blanques · Montcada · L’Eliana · La Pobla de Vallbona · Bétera · Picassent · Silla',
q_znota: 'Desplaçament des de 15€ a València i rodalia.*',
q_remoto: 'Fora de zona? Gran part es resol en <strong>remot</strong>.',
q_llamar: 'Telefonar: 654 225 831',
f_t: 'Preguntes que ens fan abans de telefonar',
fq1s: 'Quant em costarà?',
fq1a: 'Sempre ho saps abans de decidir. Mira els <a href="precios.html">preus ací</a>. El diagnòstic a casa són 25€, i si repares amb nosaltres, et ix gratis.',
fq2s: 'Podeu vindre hui?',
fq2a: 'Si tenim espai, sí. És el servici “mateix dia” (+15€ sobre el servici). Escriu-nos i et diem hora real.',
fq3s: 'No entenc d’ordinadors, m’embolcallaràs?',
fq3a: 'No. T’ho expliquem amb paraules normals i sense presses. La majoria repetix per això.',
fq4s: 'I si no té arregle?',
fq4a: 'T’ho diem clar i no et cobrem de més. Et proposem l’alternativa més barata: recuperar dades, equip nou, etc.',
fq5s: 'Fas factura per a empreses / autònoms?',
fq5a: 'Sí. Treballem amb particulars i empreses: urgències, llocs nous, backups i iguala mensual.',
fq6s: 'I la web / correu que s’ha caigut?',
fq6a: 'Sí, resolem webs caigudes, dominis, hosting, correu i menuts canvis WordPress. Des de 40€. <a href="servicios.html#web">Vore detall</a>.',
ct_eb: 'Parlem hui',
ct_t: 'No et quedes amb el problema un altre dia més',
ct_lead: 'Conta’ns què necessites. Contestem hui. Telefona al <a href="tel:+34654225831">654 225 831</a> o escriu a <a href="mailto:info@andreumatic.com">info@andreumatic.com</a>.',
form_h3: 'Escriu-nos',
form_sub: 'i et contactem per a aclarir la situació i recuperar la<br><em>Pau mental al teu món digital</em>',
lb_nom: 'Nom',
lb_tel: 'Telèfon',
lb_msg: 'Què et passa?',
lb_canal: 'Preferix que em contactes per',
op_llamada: 'Telefonada',
lb_serv: 'De quin servici ve? (opcional)',
sv_any: '— Tria si ho tens clar —',
sv_pc: 'PC lent',
sv_datos: 'Recuperar dades',
sv_mud: 'Equip nou',
sv_comp: 'Assessoria de compra',
sv_cab: 'Tècnic de capçalera',
sv_rem: 'Suport remot',
sv_seg: 'Seguretat digital',
sv_mant: 'Manteniment',
sv_web: 'Web / correu',
sv_soft: 'Software a mida',
sv_int: 'Integració',
sv_emp: 'Empresa / negoci',
sv_otro: 'Un altre tema',
ph_nom: 'El teu nom',
ph_msg: 'Ex.: El portàtil va molt lent des de fa mesos…',
btn_submit: 'Enviar sol·licitud →',


foot_tag: 'Pau mental al teu món digital',
foot_zone: 'València i rodalia',
foot_serv: 'Servicis',
foot_pre: 'Preus',

foot_cond: 'Condicions i servicis',
foot_aviso: 'Avís legal',
foot_priv: 'Privacitat',
foot_acc: 'Accessibilitat',
foot_ent: 'Entregues i reclamacions',
foot_atc: 'Atenció al client',
__title: 'Problemes amb la informàtica? Tècnic informàtic a València | AndreuMatic',
__desc: 'Problemes amb la informàtica o la tecnologia? Servicis d’informàtica a València i rodalia: tècnic informàtic a domicili, +10 anys d’experiència. Sense sorpreses i amb garantia. WhatsApp: 654 225 831.'
};
/* Textos dinámicos de main.js (huecos + formulario) */
var RUNTIME = {
'f.wait': 'Espera uns segons abans d’enviar.',
'f.required': 'Ompli el teu nom, el teu telèfon i el teu cas abans d’enviar.',
'f.phone': 'Revisa el telèfon: usa 9 dígits (ex. 600 123 123) o amb prefix +34.',
'f.email': 'Per contactar-te per email, indica’ns un email vàlid.',
'f.ok': 'Gràcies per enviar la teua consulta, et contactarem com més prompte millor.',
'f.err': 'No s’ha pogut enviar la sol·licitud.',
'f.sending': 'Enviant...',
'f.submit': 'Enviar sol·licitud →',
'h.day2': '● Hui: queden 2 espais — escriu-nos i et confirmem hora',
'h.day1': '● Hui: queda 1 espai de vesprada — el reservem?',
'h.full': '● Hui complet — t’agende per a demà a primera hora',
'h.open': '● Obrim a les 9:00 — deixa’ns el teu missatge i eres el primer',
'h.weekend': '● Cap de setmana tancat — escriu-nos i dilluns a primera et contestem'
};
var lang = 'es';
try { lang = localStorage.getItem('am-lang') || (((navigator.language || '').toLowerCase().indexOf('ca') === 0) ? 'va' : 'es'); } catch (_) { lang = 'es'; }
if (lang !== 'va') lang = 'es';
window.amT = function(k, fb){ return (lang === 'va' && RUNTIME[k]) ? RUNTIME[k] : fb; };
function firstText(el, s){
  var kids = el.childNodes, done = false, i;
  for (i = 0; i < kids.length; i++){
    if (kids[i].nodeType === 3 && kids[i].nodeValue.trim() !== ''){ if (!done){ kids[i].nodeValue = s; done = true; } else { kids[i].nodeValue = ''; } }
  }
  if (!done) el.textContent = s;
}
function applyAll(){
  var isVa = (lang === 'va'), i, all;
  document.documentElement.lang = isVa ? 'ca' : 'es';
  var _tt = document.querySelector('title[data-i18n-title]');
  if (_tt){ var _tk = _tt.getAttribute('data-i18n-title'); if (window.__amT0 === undefined) window.__amT0 = _tt.textContent; if (VA[_tk]) _tt.textContent = isVa ? VA[_tk] : window.__amT0; }
  else { if (window.__amT0 === undefined) window.__amT0 = document.title; if (VA.__title) document.title = isVa ? VA.__title : window.__amT0; }
  var md = document.querySelector('meta[name="description"]');
  if (md){ var _dk = md.getAttribute('data-i18n-desc'); if (md._es === undefined) md._es = md.getAttribute('content'); if (_dk && VA[_dk]) md.setAttribute('content', isVa ? VA[_dk] : md._es); else if (!_dk && VA.__desc) md.setAttribute('content', isVa ? VA.__desc : md._es); }
  all = document.querySelectorAll('[data-i18n]');
  for (i = 0; i < all.length; i++){
    (function(el){
      var k = el.getAttribute('data-i18n'), j;
      if (el._es === undefined){
        el._es = el.innerHTML;
        el._ctl = !!el.querySelector('input,select,textarea');
        el._esText = '';
        if (el._ctl){ var ks = el.childNodes; for (j = 0; j < ks.length; j++){ if (ks[j].nodeType === 3 && ks[j].nodeValue.trim() !== ''){ el._esText = ks[j].nodeValue; break; } } }
      }
      if (!VA[k]) return;
      /* Los labels con controles nunca se reconstruyen (conservan listeners): solo texto */
      if (isVa){ if (el._ctl) firstText(el, VA[k]); else el.innerHTML = VA[k]; }
      else { if (el._ctl) firstText(el, el._esText); else el.innerHTML = el._es; }
    })(all[i]);
  }
  all = document.querySelectorAll('[data-i18n-ph]');
  for (i = 0; i < all.length; i++){
    (function(el){
      var k = el.getAttribute('data-i18n-ph');
      if (el._ph === undefined) el._ph = el.getAttribute('placeholder') || '';
      if (VA[k]) el.setAttribute('placeholder', isVa ? VA[k] : el._ph);
    })(all[i]);
  }
  all = document.querySelectorAll('[data-i18n-aria]');
  for (i = 0; i < all.length; i++){
    (function(el){
      var k = el.getAttribute('data-i18n-aria');
      if (el._ar === undefined) el._ar = el.getAttribute('aria-label') || '';
      if (VA[k]) el.setAttribute('aria-label', isVa ? VA[k] : el._ar);
    })(all[i]);
  }
  var _ls = document.getElementById('lang-select');
  if (_ls) _ls.value = lang;
  if (window.amRefreshDynamic) window.amRefreshDynamic();
  var _fl = document.querySelectorAll('#lang-flag .flag'), _fi;
  for (_fi = 0; _fi < _fl.length; _fi++){ _fl[_fi].style.display = (_fl[_fi].getAttribute('data-flag') !== lang) ? 'none' : ''; }
}
window.amSetLang = function(l){ lang = (l === 'va') ? 'va' : 'es'; try { localStorage.setItem('am-lang', lang); } catch (_) {} applyAll(); };
var _lg = document.getElementById('lang-select');
if (_lg) _lg.addEventListener('change', function(){ window.amSetLang(_lg.value); });
for (var _x = 1; window['AM_X' + _x]; _x++){ for (var _k in window['AM_X' + _x]) VA[_k] = window['AM_X' + _x][_k]; }
applyAll();
})();
