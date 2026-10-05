/* AndreuMatic ES/VA (piloto: solo index). El español es el HTML original;
   aquí solo el valenciano. Sin commit a prod: prueba local. */
(function(){
var VA = {
skip: 'Saltar al contingut',
brand_home: 'AndreuMatic inici',
nav_inicio: 'Inici',
nav_serv: 'Serveis',
nav_precios: 'Preus',
nav_como: 'Com funciona',
nav_opi: 'Opinions',
nav_cto: 'Contacte',
hdr_call: 'Telefonar al 654 225 831',
burger: 'Obrir menú',
hero_eb: 'València · Suport IT i automatització per a PIMEs',
hero_h1: 'La teua empresa no pot parar-se per la <span class="hl">informàtica</span>',
hero_sub: '<span class="lema">Pau mental al teu món digital</span>',
scope1: 'caos',
scope2: 'diagnòstic',
scope3: 'calma',
pill1: 'Auditoria Nivell 3',
pill2: 'Iguala mensual',
pill3: 'Automatització IA',
pill4: 'Llocs de treball',
pill5: 'Suport remot',
pill6: 'Backups supervisats',
pill7: 'Xarxa i wifi oficina',
pill8: 'Web i correu empresa',
pill9: 'Urgències mateix dia',
pill10: 'Adéu Excels caòtics',
pill11: 'Microsoft 365 / Google',
pill12: 'Ciberseguretat PIME',
cta_wa: 'Escriu-nos per WhatsApp',
cta_serv: 'Què resolem →',
cta_agenda: 'Agenda la teua telefonada →',
cta_caso: 'Conta’ns el teu cas →',
hp_b: 'Hui mateix',
hp_c: 'Des de 25€',
hp_cap: 'Andreu · <span>Fundador i Director Tècnic d’<span class="same">Andreu</span>Matic</span>',
trust1: '✔ Pressupost <b>tancat</b> abans de començar',
trust2: '✔ Auditoria amb <b>informe clar</b>',
trust3: '✔ <b>Mateix dia</b> per a empreses',
pain_h: 'DEL CAOS → AL CONTROL',
pain1: 'El servidor o la xarxa va lenta i ningú dona amb la causa',
pain2: '“No tinc còpia comprovada i tem perdre les dades de l’empresa”',
pain3: 'Cada alta d’empleat és un caos: equips, correu i accessos',
pain4: 'Perdeu hores amb Excels i tasques manuals repetitives',
calma: '<b>Calma:</b> Et contacta un expert, ho deixa funcionant i t’ho explica sense tecnicismes. <a class="link-more" href="servicios.html">Vore serveis per a empreses</a>',
tb1: 'PRESSUPOST<br>TANCAT · SENSE SORPRESES',
tb2: 'EMPRESES<br>MATEIX DIA LABORABLE',
tb3: 'AUDITORIA<br>AMB INFORME CLAR',
d_eb: 'T’entenem, ho vegem cada setmana en PIMEs',
d_t: 'Si et sona alguna, podem ajudar-te hui mateix',
d_lead: 'No és que el teu equip “siga negat”. És que ningú ha mirat els teus sistemes a fons ni t’ha donat una solució definitiva. Eixe és el nostre treball.',
dp1: '<strong>“La xarxa o el servidor van lentíssims”</strong>Obrir el programa de gestió o facturar és un suplici. Cada minut parat costa diners.',
dp2: '<strong>“Tem perdre les dades de l’empresa”</strong>Còpies que ningú comprova, discos que fallen, un esborrat accidental. Cada hora compta.',
dp3: '<strong>“Les nostres dades estan al núvol, però ningú revisa les còpies”</strong>Creure que Microsoft 365 o Google Workspace fan backup automàtic és l’error núm. 1. Fem còpies de seguretat immutables del teu núvol per a protegir-te d’esborrats i ransomware.',
dp4: '<strong>“Cada empleat nou és un caos”</strong>Comptes, correu, permisos, programes… I si alguna cosa es queda a mitges el primer dia?',
dp5: '<strong>“El wifi, la impressora, el programa… fallen quan volen”</strong>A l’oficina, quan alguna cosa falla, tot es para.',
dp6: '<strong>“Vull un soci tecnològic, no un 902”</strong>Parles amb qui ho resol: ve, mira, ho arregla i t’ho explica amb calma. El teu IT extern.',

d_ctapre: 'Vore preus',
v_eb: 'Proposta de valor · per què AndreuMatic',
v_t: 'El teu departament IT extern, no un call center',
v_lead: 'Suport IT per a PIMEs amb tracte pròxim: parles amb qui ho resol. Anem a la teua empresa a València, et donem preu abans de començar i no ens n’anem fins que funciona i ho entens.',
vc1t: 'Parlem la teua llengua',
vc1p: 'Sense tecnicismes. T’expliquem què ha passat, què hem fet i com evitar-ho. Sense presses.',
vc2t: 'Anem a la teua empresa',
vc2p: 'València i rodalia. Presencial quan cal i remot immediat. Tu no et mous.',
vc3t: 'Cost predictable',
vc3p: 'Sabràs lo que pagues abans de començar. Auditoria amb informe i iguala mensual clara.',
vc4t: 'Resposta el mateix dia',
vc4p: 'Per a empreses, prioritat el mateix dia laborable. I garantia de 15 dies en el treball.',
















pt_t: 'Intervencions puntuals',
pt_p: 'Algun tema concret? Diagnòstic amb informe, remot immediat o arreplegada. Sense compromís.',
pt_li1: 'Diagnòstic amb informe clar',
pt_li2: 'Suport remot immediat',
pt_li3: 'Web caiguda / correu empresa',
pt_btn: 'Vore serveis puntuals',
bt_t: 'Empreses i PIMEs',
bt_p: 'Les teues 3 solucions: auditoria Nivell 3, iguala mensual i automatització amb IA.',
bt_li1: 'Auditoria i urgències Nivell 3',
bt_li2: 'Iguala mensual: llocs + backups',
bt_li3: 'Automatització IA: adéu Excels',
bt_btn: 'Vore serveis empreses',

c_eb: 'Així de fàcil',
c_t: 'De “quin agobi” a “ja funciona” en 3 passos',
st1t: '1. Conta’ns-ho',
st1p: 'WhatsApp o telefonada al <a href="tel:+34654225831">654 225 831</a>. Conta’ns què li passa a la teua empresa amb les teues paraules. Contestem hui mateix.',
st2t: '2. Auditoria i diagnòstic clar',
st2p: 'Anem a la teua empresa o ens connectem en remot. Et diem la causa, el cost i el termini. Tu decidixes.',
st3t: '3. Suport continu',
st3p: 'Ho deixem funcionant, amb garantia de 15 dies, informe clar i suport mensual si vols. Tu a la teua.',
o_eb: 'Empreses que ja respiren',
o_t: 'Lo que més valoren: que el negoci no es para',
o_rate: '★★★★★ <b>5,0</b> · 7 ressenyes a Google · <span class="muted"><a href="https://g.page/r/Cfi9FXQqK1T3EBM/review" id="gmb-link">deixa’ns la teua ací</a></span>',
t7p: '“Teníem còpies ‘perquè sí’, sense comprovar. Va muntar backups supervisats i recuperàrem una carpeta sencera després d’un esborrat. Dormim tranquils.”',






t4p: '“Portàvem mesos amb el programa de gestió lentíssim i dos tècnics sense donar amb la causa. Va trobar el coll de botella de la xarxa en un matí i des d’aleshores tot vola.”',
t4n: 'Marta G. — Clínica dental',
t4s: 'Auditoria Nivell 3',
t5p: '“Passàvem hores copiant dades entre l’Excel i el programa de facturació. Ens va automatitzar el procés i ara es fa sol, sense errors.”',
t5n: 'Javier R. — Assessoria',
t5s: 'Automatització amb IA',
t6p: '“Se’ns va caure el sistema un dilluns a primera hora i a migdia estàvem produint. Ràpids, clars i amb informe de lo fet.”',
q_eb: 'Qui som',
q_t: 'Som AndreuMatic. El teu soci tecnològic.',
q_lead1: 'Més de 10 anys en informàtica i tecnologia per a negocis. Som la teua empresa de manteniment informàtic a València: l’equip que agarra el telèfon, va a la teua empresa i es queda fins que tot funciona.',
q_lead2: 'La nostra missió: que sentes <strong>pau mental al teu món digital.</strong>',

q_zona: 'Zona de servei',
q_zonap: 'València i rodalia',
q_more: 'vore tot',
q_zonalist: '<a href="informatico-valencia.html">València</a> · Paterna · Torrent · <a href="informatico-mislata.html">Mislata</a> · Burjassot · <a href="informatico-quart-de-poblet.html">Quart de Poblet</a> · Aldaia · <a href="informatico-manises.html">Manises</a> · Riba-roja de Túria · Paiporta · Alboraia · Xirivella · Alaquàs · Catarroja · Massanassa · Alfafar · Benetússer · Sedaví · Picanya · Godella · Rocafort · Tavernes Blanques · Montcada · L’Eliana · La Pobla de Vallbona · Bétera · Picassent · Silla',
q_znota: 'Desplaçament des de 15€ a València i rodalia.*',
q_remoto: 'Fora de zona? Gran part es resol en <strong>remot</strong>.',
q_llamar: 'Telefonar: 654 225 831',
f_t: 'Preguntes que ens fan abans de telefonar',
fq1s: 'Quant em costarà?',
fq1a: 'Sempre ho saps abans de decidir: auditoria amb informe i pressupost tancat. Escriu-nos i et donem cost i termini.',
fq2s: 'Podeu vindre hui?',
fq2a: 'Si tenim espai, sí. Per a empreses donem prioritat el mateix dia laborable. Escriu-nos i et diem hora real.',
fq3s: 'No entenc de sistemes, m’embolcallaràs?',
fq3a: 'No. T’ho expliquem amb paraules normals i sense presses. Les empreses repetixen per això.',
fq4s: 'I si no té arregle?',
fq4a: 'T’ho diem clar i no et cobrem de més. Et proposem l’alternativa amb millor cost: recuperar dades, renovar equip, etc.',
fq5s: 'Fas factura i iguala per a empreses?',
fq5a: 'Sí. Treballem al 100% amb empreses i autònoms: auditories Nivell 3, urgències el mateix dia laborable, llocs nous, backups supervisats i iguala mensual de manteniment informàtic com el teu IT extern.',
fq6s: 'I la web o el correu de l’empresa?',
fq6a: 'Sí, resolem webs caigudes, dominis, hosting i correu corporatiu. <a href="servicios.html#web">Vore detall</a>.',
ct_eb: 'Parlem hui',
ct_t: 'No et quedes amb el problema un altre dia més',
ct_lead: 'Conta’ns què necessites. Contestem hui. Telefona al <a href="tel:+34654225831">654 225 831</a> o escriu a <a href="mailto:info@andreumatic.com">info@andreumatic.com</a>.',
form_h3: 'Conta’ns el teu cas',
form_sub: 'i et contactem hui mateix per a aclarir la situació<br><em>Pau mental al teu món digital</em>',
lb_nom: 'Nom',
lb_tel: 'Telèfon',
lb_msg: 'Què li passa a la teua empresa?',
lb_canal: 'Preferix que em contactes per',
op_llamada: 'Telefonada',
lb_serv: 'Què necessites? (opcional)',
sv_any: '— Tria si ho tens clar —',
sv_pc: 'Auditoria / problema complex',
sv_datos: 'Recuperar dades empresa',
sv_mud: 'Lloc nou / equip',
sv_comp: 'Assessoria de compra',
sv_cab: 'Iguala mensual',
sv_rem: 'Suport remot',
sv_seg: 'Seguretat i backups',
sv_mant: 'Manteniment preventiu',
sv_web: 'Web / correu empresa',
sv_soft: 'Automatització a mida (IA)',
sv_int: 'Integració de sistemes',
sv_emp: 'Urgència empresa',
sv_otro: 'Un altre tema',
ph_nom: 'El teu nom',
ph_msg: 'Ex.: El servidor va molt lent des de fa mesos i ningú dona amb la causa…',
btn_submit: 'Enviar sol·licitud →',


foot_tag: 'Pau mental al teu món digital',
foot_zone: 'València i rodalia',
foot_serv: 'Serveis',
foot_pre: 'Preus',

foot_cond: 'Condicions i serveis',
foot_aviso: 'Avís legal',
foot_priv: 'Privacitat',
foot_acc: 'Accessibilitat',
foot_ent: 'Entregues i reclamacions',
foot_atc: 'Atenció al client',
__title: 'Suport IT per a empreses a València | Auditoria, Iguala i Automatització – AndreuMatic',
__desc: 'Suport IT per a PIMEs a València: auditoria i resolució de problemes complexos, iguala mensual amb urgències el mateix dia i automatització amb IA per a estalviar hores. 654 225 831.'
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
