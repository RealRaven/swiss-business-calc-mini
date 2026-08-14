/* ============================================
   Swiss Business Kalkulation - App Logic
   Multi-language: DE / EN / FR / IT
   ============================================
   Dependency: language.js must be loaded before this file.
   ============================================ */

const App = (function() {
  let data = null;
  const STORAGE_KEY = 'swiss_kalkulation_data';

  const defaultData = {
    meta: { sprache: 'de', land: 'CH', waehrung: 'CHF', letzte_aktualisierung: '2026-07-31' },
    stammdaten: {
      firmenname: '', inhaber: '', adresse: '', plz_ort: '',
      geschaeftsidee: '', produkt_leistung: '', rechtsform: 'Einzelunternehmen',
      gruendungsjahr: 2026, gruendungsmonat: 1, kanton: 'ZH',
      gewerbe: true, mwst_pflichtig: true,
      mwst_satz_normal: 8.1, mwst_satz_ermaessigt: 2.6, mwst_satz_spezial: 3.8
    },
    private_ausgaben: {
      haushaltstyp: 'gesamter_haushalt',
      kategorien: {
        lebenserhaltung: { nahrungsmittel: {betrag:0, zahlweise:'monatlich'}, kleidung: {betrag:0, zahlweise:'monatlich'}, schuhe: {betrag:0, zahlweise:'halbjaehrlich'}, haushaltsartikel: {betrag:0, zahlweise:'quartalsweise'}, kosmetik: {betrag:0, zahlweise:'monatlich'}, arzt_selbsthalt: {betrag:0, zahlweise:'monatlich'}, sonstiges: {betrag:0, zahlweise:'monatlich'} },
        freizeit: { theater_kino: {betrag:0, zahlweise:'monatlich'}, fitness: {betrag:0, zahlweise:'monatlich'}, reisen: {betrag:0, zahlweise:'monatlich'}, geschenke: {betrag:0, zahlweise:'monatlich'}, ausbildung: {betrag:0, zahlweise:'monatlich'}, abos: {betrag:0, zahlweise:'monatlich'} },
        wohnen: { miete: {betrag:0, zahlweise:'monatlich'}, heizung: {betrag:0, zahlweise:'monatlich'}, strom: {betrag:0, zahlweise:'monatlich'}, wasser_muel: {betrag:0, zahlweise:'quartalsweise'}, reinigung: {betrag:0, zahlweise:'monatlich'}, moebel: {betrag:0, zahlweise:'jaerlich'} },
        kommunikation: { festnetz: {betrag:0, zahlweise:'monatlich'}, mobil: {betrag:0, zahlweise:'monatlich'}, internet: {betrag:0, zahlweise:'monatlich'} },
        kinder: { kindergarten: {betrag:0, zahlweise:'monatlich'}, schule: {betrag:0, zahlweise:'jaerlich'}, veranstaltungen: {betrag:0, zahlweise:'monatlich'}, taschengeld: {betrag:0, zahlweise:'monatlich'} },
        mobilitaet: { versicherung_steuer: {betrag:0, zahlweise:'jaerlich'}, treibstoff: {betrag:0, zahlweise:'monatlich'}, service: {betrag:0, zahlweise:'jaerlich'}, vignette: {betrag:0, zahlweise:'jaerlich'}, parken: {betrag:0, zahlweise:'monatlich'}, oeffis: {betrag:0, zahlweise:'monatlich'} },
        versicherungen: { haushalt: {betrag:0, zahlweise:'monatlich'}, krankenzusatz: {betrag:0, zahlweise:'monatlich'}, leben: {betrag:0, zahlweise:'monatlich'}, pension: {betrag:0, zahlweise:'monatlich'}, rechtsschutz: {betrag:0, zahlweise:'monatlich'}, unfall: {betrag:0, zahlweise:'monatlich'} },
        finanzen: { kredit: {betrag:0, zahlweise:'monatlich'}, alimente: {betrag:0, zahlweise:'monatlich'}, sparen: {betrag:0, zahlweise:'monatlich'}, kontofuehrung: {betrag:0, zahlweise:'monatlich'} }
      }
    },
    private_einnahmen: {
      nettogehalt_partner: 0, unterhalt: 0, alimente_einnahmen: 0,
      kinderzulage: 0, mieteinnahmen: 0, kapitalertraege: 0,
      familienunterstuetzung: 0, nebenjob: 0, sonstiges: 0
    },
    investitionen: {
      bestehende: [
        {bezeichnung:'Computer', restwert:0, nd:3, afa:0},
        {bezeichnung:'Geschaeftsausstattung', restwert:0, nd:8, afa:0},
        {bezeichnung:'Mobiltelefon', restwert:0, nd:2, afa:0},
        {bezeichnung:'Auto', restwert:0, nd:5, afa:0}
      ],
      neu: [
        {bezeichnung:'Laptop', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Geschaeftsausstattung', betrag_brutto:0, nd:10, afa:0},
        {bezeichnung:'Mobiltelefon', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Homepage', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Software', betrag_brutto:0, nd:3, afa:0}
      ],
      gruendungskosten: [
        {bezeichnung:'Handelsregistereintrag', betrag_netto:0, mwst:8.1},
        {bezeichnung:'Notar/Gruendung', betrag_netto:0, mwst:8.1},
        {bezeichnung:'Beratung', betrag_netto:0, mwst:8.1},
        {bezeichnung:'Kaution', betrag_netto:0, mwst:0}
      ]
    },
    betriebliche_kosten_jahr1: {
      kategorien: {
        personal: {eintraege: [{bezeichnung:'Bruttolohn inkl. Sozialabgaben', betrag:0, zahlweise:'monatlich', startmonat:1}]},
        hilfsstoffe: {eintraege: [{bezeichnung:'Verpackungsmaterial', betrag:0, zahlweise:'quartalsweise', startmonat:1}]},
        raumkosten: {eintraege: [{bezeichnung:'Miete/Betriebskosten', betrag:0, zahlweise:'monatlich', startmonat:1}]},
        reparatur: {eintraege: []},
        buero: {eintraege: []},
        marketing: {eintraege: []},
        kommunikation: {eintraege: [{bezeichnung:'Handy (70% betrieblich)', betrag:0, zahlweise:'monatlich', startmonat:1}, {bezeichnung:'Internet', betrag:0, zahlweise:'monatlich', startmonat:1}]},
        leasing: {eintraege: []},
        bank: {eintraege: []},
        steuerberatung: {eintraege: [{bezeichnung:'Buchfuehrung', betrag:0, zahlweise:'monatlich', startmonat:1}]},
        beratung: {eintraege: []},
        gebuehren: {eintraege: [{bezeichnung:'Handelsregistergebuehr', betrag:0, zahlweise:'jaerlich', startmonat:1}]},
        kfz: {eintraege: []},
        versicherungen: {eintraege: [{bezeichnung:'Haftpflicht', betrag:0, zahlweise:'jaerlich', startmonat:1}]},
        weiterbildung: {eintraege: []},
        geringwertig: {eintraege: []},
        software: {eintraege: []},
        sonstiges1: {eintraege: []},
        sonstiges2: {eintraege: []},
        sonstiges3: {eintraege: []}
      }
    },
    umsatz_jahr1: {
      angebote: [
        {name:'Angebot A', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot B', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot C', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot D', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0}
      ]
    },
    steuern_ch: {
      ahv_satz: 10.6, iv_satz: 1.4, eo_satz: 0.5,
      ahv_iv_eo_total: 12.5, alv_optional: 2.2,
      krankenkasse_gesch: 300,
      gewinnsteuer_kantone: {
        ZH: 19.6, BE: 20.5, LU: 12.2, UR: 12.6, SZ: 14.1,
        OW: 12.7, NW: 12.0, GL: 13.3, ZG: 11.9, FR: 13.7,
        SO: 13.0, BS: 13.0, BL: 16.0, SH: 13.8, AR: 13.0,
        AI: 12.7, SG: 14.5, GR: 14.0, AG: 15.1, TG: 13.4,
        TI: 16.0, VD: 14.0, VS: 17.1, NE: 13.6, GE: 14.7, JU: 15.4
      },
      einkommenssteuer: {
        progressionsstufen: [
          {bis:20000, satz:0}, {bis:40000, satz:0.02}, {bis:80000, satz:0.06},
          {bis:120000, satz:0.10}, {bis:200000, satz:0.15}, {bis:999999999, satz:0.20}
        ]
      }
    },
    liquiditaet: { startguthaben: 0, privateinlage: 0, fremdkapital: 0, foerderungen: 0 },
    investitionen_jahr2: {
      neu: [
        {bezeichnung:'Laptop', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Geschaeftsausstattung', betrag_brutto:0, nd:10, afa:0},
        {bezeichnung:'Mobiltelefon', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Homepage', betrag_brutto:0, nd:3, afa:0},
        {bezeichnung:'Software', betrag_brutto:0, nd:3, afa:0}
      ],
      nicht_aktivierungsplichtig: [
        {bezeichnung:'Geringwertige Anschaffung', betrag_brutto:0}
      ]
    },
    betriebliche_kosten_jahr2: {
      kategorien: {
        personal: {eintraege: []},
        hilfsstoffe: {eintraege: []},
        raumkosten: {eintraege: []},
        reparatur: {eintraege: []},
        buero: {eintraege: []},
        marketing: {eintraege: []},
        kommunikation: {eintraege: []},
        leasing: {eintraege: []},
        bank: {eintraege: []},
        steuerberatung: {eintraege: []},
        beratung: {eintraege: []},
        gebuehren: {eintraege: []},
        kfz: {eintraege: []},
        versicherungen: {eintraege: []},
        weiterbildung: {eintraege: []},
        geringwertig: {eintraege: []},
        software: {eintraege: []},
        sonstiges1: {eintraege: []},
        sonstiges2: {eintraege: []},
        sonstiges3: {eintraege: []}
      }
    },
    umsatz_jahr2: {
      angebote: [
        {name:'Angebot A', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot B', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot C', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0},
        {name:'Angebot D', verkaufszahlen:[0,0,0,0,0,0,0,0,0,0,0,0], einzelpreis_brutto:0, mwst_satz:8.1, ressourceneinsatz_pct:0}
      ]
    },
    liquiditaet_jahr2: { startguthaben: 0, privateinlage: 0, fremdkapital: 0, foerderungen: 0 },
    produktkalkulation: {
      produkte: [
        {bezeichnung:'Produkt A', materialkosten:0, arbeitszeit_std:0, stundensatz:0, gemeinkosten_zuschlag_pct:20, gewinnmarge_pct:15, mwst_satz:8.1, menge_jahr:0},
        {bezeichnung:'Produkt B', materialkosten:0, arbeitszeit_std:0, stundensatz:0, gemeinkosten_zuschlag_pct:20, gewinnmarge_pct:15, mwst_satz:8.1, menge_jahr:0},
        {bezeichnung:'Produkt C', materialkosten:0, arbeitszeit_std:0, stundensatz:0, gemeinkosten_zuschlag_pct:20, gewinnmarge_pct:15, mwst_satz:8.1, menge_jahr:0},
        {bezeichnung:'Produkt D', materialkosten:0, arbeitszeit_std:0, stundensatz:0, gemeinkosten_zuschlag_pct:20, gewinnmarge_pct:15, mwst_satz:8.1, menge_jahr:0}
      ]
    },
    stundensatz: { nicht_verrechenbar_std_woche:10, urlaub_wochen:4, krankheit_wochen:2, feiertage_wochen:0, gesamtarbeitszeit_woche:42, auslastungsgrad:0.75, zielgewinn_jahr:0 }
  };

  function t(key) { return Lang.t(key); }

  function fmt(n) {
    if (n === undefined || n === null || isNaN(n)) return '0.00';
    return Number(n).toLocaleString('de-CH', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  function fmtInt(n) { return Number(n || 0).toLocaleString('de-CH'); }
  function parseVal(v) {
    if (typeof v === 'number') return v;
    if (!v) return 0;
    return parseFloat(String(v).replace(/[^0-9.,-]/g, '').replace(',', '.')) || 0;
  }
  function zahlweiseFaktor(zw) {
    const map = { monatlich: 12, zweimonatlich: 6, quartalsweise: 4, halbjaehrlich: 2, jaerlich: 1 };
    return map[zw] || 12;
  }
  function monatlicherBetrag(betrag, zahlweise) {
    return parseVal(betrag) / 12 * zahlweiseFaktor(zahlweise);
  }

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { try { data = JSON.parse(stored); } catch(e) { data = null; } }
    if (!data) {
      try {
        const resp = fetch('data.json');
        data = JSON.parse(JSON.stringify(defaultData));
      } catch(e) { data = JSON.parse(JSON.stringify(defaultData)); }
    }
    if (!data) data = JSON.parse(JSON.stringify(defaultData));
    ensureStructure();
  }

  function ensureStructure() {
    function deepMerge(target, source) {
      if (!target || typeof target !== 'object') return;
      for (let k in source) {
        if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
          if (!target[k] || typeof target[k] !== 'object') target[k] = {};
          deepMerge(target[k], source[k]);
        } else if (target[k] === undefined) target[k] = source[k];
      }
    }
    deepMerge(data, defaultData);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch(e) {
      console.error('localStorage speichern fehlgeschlagen:', e);
      alert(Lang.t('save_error'));
      return false;
    }
  }

  function getData() { return data; }
  function setData(d) { data = d; ensureStructure(); save(); }

  function setLanguage(lang) {
    if (!Lang.i18n[lang]) {
      console.warn('Language not found:', lang);
      return;
    }
    Lang.setLanguage(lang);
    if (data) data.meta.sprache = lang;
    save();
    if (window.pageInit) window.pageInit();
  }
  function getLanguage() { return Lang.getLanguage(); }

  function applyLanguage() { Lang.applyLanguage(); }

  function calcPrivateAusgaben() {
    const kat = data.private_ausgaben.kategorien;
    let monatlich = 0, jaehrlich = 0;
    const details = {};
    for (let k in kat) {
      let km = 0, kj = 0;
      for (let item in kat[k]) {
        const b = parseVal(kat[k][item].betrag);
        const zw = kat[k][item].zahlweise || 'monatlich';
        const faktor = zahlweiseFaktor(zw);
        kj += b * faktor;
        km += b * faktor / 12;
      }
      details[k] = { monatlich: km, jaehrlich: kj };
      monatlich += km; jaehrlich += kj;
    }
    return { monatlich, jaehrlich, details };
  }

  function calcPrivateEinnahmen() {
    let sum = 0;
    for (let k in data.private_einnahmen) sum += parseVal(data.private_einnahmen[k]);
    return sum;
  }

  function calcMindesteinkommen() {
    const ausgaben = calcPrivateAusgaben();
    const einnahmen = calcPrivateEinnahmen();
    const diff = Math.max(0, ausgaben.monatlich - einnahmen);
    return { monatlich: diff, jaehrlich: diff * 12, ausgaben, einnahmen };
  }

  function calcInvestitionen() {
    const inv = data.investitionen;
    let bestehendeAfa = 0, neueAfa = 0, bestehendeRest = 0, neueBrutto = 0;
    inv.bestehende.forEach(function(i) {
      const rw = parseVal(i.restwert); const nd = parseVal(i.nd) || 1;
      i.afa = rw / nd; bestehendeAfa += i.afa; bestehendeRest += rw;
    });
    inv.neu.forEach(function(i) {
      const b = parseVal(i.betrag_brutto); const nd = parseVal(i.nd) || 1;
      i.afa = b / nd; neueAfa += i.afa; neueBrutto += b;
    });
    const gruendung = inv.gruendungskosten.reduce(function(s, i) { return s + parseVal(i.betrag_netto) * (1 + parseVal(i.mwst)/100); }, 0);
    return { bestehendeAfa, neueAfa, gesamtAfa: bestehendeAfa + neueAfa, bestehendeRest, neueBrutto, gruendung };
  }

  function calcBetrieblicheKosten() {
    const kat = data.betriebliche_kosten_jahr1.kategorien;
    const result = { monatlich: {}, jaehrlich: {}, gesamtMonatlich: 0, gesamtJaehrlich: 0, monatsArray: Array(12).fill(0) };
    for (let k in kat) {
      let km = 0, kj = 0; const monate = Array(12).fill(0);
      kat[k].eintraege.forEach(function(e) {
                const b = parseVal(e.betrag); const zw = e.zahlweise || 'monatlich'; const sm = (e.startmonat || 1) - 1;
        const faktor = zahlweiseFaktor(zw); const jbetrag = b * faktor; const mbetrag = jbetrag / 12;
        km += mbetrag; kj += jbetrag;
        if (zw === 'monatlich') { for (let m = sm; m < 12; m++) monate[m] += b; }
        else if (zw === 'zweimonatlich') { for (let m = sm; m < 12; m += 2) monate[m] += b; }
        else if (zw === 'quartalsweise') { for (let m = sm; m < 12; m += 3) monate[m] += b; }
        else if (zw === 'halbjaehrlich') { for (let m = sm; m < 12; m += 6) monate[m] += b; }
        else if (zw === 'jaerlich') { monate[sm] += b; }
      });
      result.monatlich[k] = km; result.jaehrlich[k] = kj;
      result.gesamtMonatlich += km; result.gesamtJaehrlich += kj;
      for (let m = 0; m < 12; m++) result.monatsArray[m] += monate[m];
    }
    return result;
  }

  function calcUmsatz() {
    const angebote = data.umsatz_jahr1.angebote;
    const result = { angebote: [], gesamtBrutto: 0, gesamtNetto: 0, gesamtMwst: 0, gesamtRessource: 0, gesamtDeckung: 0, monatsArray: Array(12).fill(0) };
    angebote.forEach(function(a, idx) {
      const preis = parseVal(a.einzelpreis_brutto); const mwst = parseVal(a.mwst_satz) / 100; const resPct = parseVal(a.ressourceneinsatz_pct) / 100;
      let brutto = 0, netto = 0, mwstSum = 0, resSum = 0; const monate = Array(12).fill(0);
      a.verkaufszahlen.forEach(function(vz, m) {
        const v = parseVal(vz); const mBrutto = v * preis; const mNetto = mBrutto / (1 + mwst); const mMwst = mBrutto - mNetto; const mRes = mNetto * resPct;
        brutto += mBrutto; netto += mNetto; mwstSum += mMwst; resSum += mRes; monate[m] = mBrutto;
      });
      const deckung = netto - resSum;
      result.angebote.push({ brutto, netto, mwst: mwstSum, ressource: resSum, deckung, monate });
      result.gesamtBrutto += brutto; result.gesamtNetto += netto; result.gesamtMwst += mwstSum;
      result.gesamtRessource += resSum; result.gesamtDeckung += deckung;
      for (let m = 0; m < 12; m++) result.monatsArray[m] += monate[m];
    });
    return result;
  }

  function calcEinkommenssteuer(bemessungsgrundlage) {
    const stufen = data.steuern_ch.einkommenssteuer.progressionsstufen;
    let rest = Math.max(0, bemessungsgrundlage); let steuer = 0; let vorherige = 0;
    for (let i = 0; i < stufen.length; i++) {
      const s = stufen[i];
      const betrag = Math.min(rest, s.bis - vorherige);
      if (betrag <= 0) break;
      steuer += betrag * s.satz; rest -= betrag; vorherige = s.bis;
    }
    return steuer;
  }

  function calcGewinn() {
    const umsatz = calcUmsatz(); const kosten = calcBetrieblicheKosten(); const invest = calcInvestitionen();
    const mindest = calcMindesteinkommen(); const afa = invest.gesamtAfa; const deckung = umsatz.gesamtDeckung;
    const betriebsergebnis = deckung - kosten.gesamtJaehrlich - afa;
    const rechtsform = data.stammdaten.rechtsform || 'Einzelunternehmen';
    const kanton = data.stammdaten.kanton || 'ZH';
    const personengesellschaften = ['Einzelunternehmen', 'Kollektivgesellschaft', 'Kommanditgesellschaft'];
    const isPersonengesellschaft = personengesellschaften.indexOf(rechtsform) !== -1;
    let ahvIvEo = 0, est = 0, steuerTyp = '', steuerLabel = '';
    if (isPersonengesellschaft) {
      ahvIvEo = Math.max(0, betriebsergebnis) * (data.steuern_ch.ahv_iv_eo_total / 100);
      const estBmg = Math.max(0, betriebsergebnis - ahvIvEo);
      est = calcEinkommenssteuer(estBmg);
      steuerTyp = 'einkommenssteuer';
      steuerLabel = 'Einkommenssteuer (vereinfacht)';
    } else {
      // Kapitalgesellschaft / Verein / Genossenschaft: keine AHV auf Gewinn, Gewinnsteuer statt ESt.
      ahvIvEo = 0;
      const kanton = data.stammdaten.kanton || 'ZH';
      const kantonsMap = data.steuern_ch.gewinnsteuer_kantone || {};
      const gewinnsteuerSatz = (kantonsMap[kanton] || 15) / 100;
      est = Math.max(0, betriebsergebnis) * gewinnsteuerSatz;
      steuerTyp = 'gewinnsteuer';
      steuerLabel = App.t('profit_tax_corp') + ' (' + kanton + ', ca. ' + (kantonsMap[kanton] || 15) + '%)';
    }
    const netto = betriebsergebnis - ahvIvEo - est;
    return { umsatz, kosten, invest, mindest, afa, deckung, betriebsergebnis, ahvIvEo, est, netto, steuerTyp, steuerLabel, isPersonengesellschaft, rechtsform, kanton };
  }

  function calcLiquiditaet() {
    const umsatz = calcUmsatz(); const kosten = calcBetrieblicheKosten(); const invest = calcInvestitionen();
    const liq = data.liquiditaet; const gewinn = calcGewinn();
    const start = parseVal(liq.startguthaben); const einlage = parseVal(liq.privateinlage);
    const fremd = parseVal(liq.fremdkapital); const foerd = parseVal(liq.foerderungen);
    const einzahlungen = Array(12).fill(0); const auszahlungen = Array(12).fill(0);
    const saldo = Array(12).fill(0); const kumuliert = Array(12).fill(0);
    for (let m = 0; m < 12; m++) einzahlungen[m] += umsatz.monatsArray[m];
    einzahlungen[0] += einlage + fremd + foerd;
    for (let m = 0; m < 12; m++) auszahlungen[m] += kosten.monatsArray[m];
    auszahlungen[0] += invest.neueBrutto + invest.gruendung;
    const ahvQ = gewinn.ahvIvEo / 4;
    for (let m = 2; m < 12; m += 3) auszahlungen[m] += ahvQ;
    auszahlungen[11] += gewinn.est;
    for (let m = 0; m < 12; m++) auszahlungen[m] += gewinn.mindest.monatlich;
    let kum = start;
    for (let m = 0; m < 12; m++) {
      saldo[m] = einzahlungen[m] - auszahlungen[m]; kum += saldo[m]; kumuliert[m] = kum;
    }
    return { einzahlungen, auszahlungen, saldo, kumuliert, start, einlage, fremd, foerd,
      gesamtEin: einzahlungen.reduce(function(a,b){return a+b;},0),
      gesamtAus: auszahlungen.reduce(function(a,b){return a+b;},0), endkum: kum };
  }

  function calcProduktkalkulation() {
    const produkte = data.produktkalkulation.produkte;
    const result = { produkte: [], gesamtMaterial: 0, gesamtLohn: 0, gesamtGemeinkosten: 0, gesamtSelbstkosten: 0, gesamtGewinn: 0, gesamtNetto: 0, gesamtMwst: 0, gesamtBrutto: 0, gesamtDeckung: 0 };
    produkte.forEach(function(p) {
      const mat = parseVal(p.materialkosten);
      const lohn = parseVal(p.arbeitszeit_std) * parseVal(p.stundensatz);
      const fertigung = mat + lohn;
      const gk = fertigung * (parseVal(p.gemeinkosten_zuschlag_pct) / 100);
      const selbstkosten = fertigung + gk;
      const gewinn = selbstkosten * (parseVal(p.gewinnmarge_pct) / 100);
      const netto = selbstkosten + gewinn;
      const mwstSatz = parseVal(p.mwst_satz) / 100;
      const mwst = netto * mwstSatz;
      const brutto = netto + mwst;
      const deckung = netto - mat - lohn; // = gewinn + gk
      const menge = parseVal(p.menge_jahr);
      result.produkte.push({
        bezeichnung: p.bezeichnung, materialkosten: mat, lohnkosten: lohn, fertigungskosten: fertigung,
        gemeinkosten: gk, selbstkosten: selbstkosten, gewinn: gewinn, netto: netto, mwst: mwst, brutto: brutto,
        deckungsbeitrag: deckung, menge: menge,
        jahrMaterial: mat * menge, jahrLohn: lohn * menge, jahrGemeinkosten: gk * menge,
        jahrSelbstkosten: selbstkosten * menge, jahrGewinn: gewinn * menge, jahrNetto: netto * menge,
        jahrMwst: mwst * menge, jahrBrutto: brutto * menge, jahrDeckung: deckung * menge
      });
      result.gesamtMaterial += mat * menge;
      result.gesamtLohn += lohn * menge;
      result.gesamtGemeinkosten += gk * menge;
      result.gesamtSelbstkosten += selbstkosten * menge;
      result.gesamtGewinn += gewinn * menge;
      result.gesamtNetto += netto * menge;
      result.gesamtMwst += mwst * menge;
      result.gesamtBrutto += brutto * menge;
      result.gesamtDeckung += deckung * menge;
    });
    return result;
  }

  function calcStundensatz() {
    const s = data.stundensatz; const gewinn = calcGewinn();
    const wochen = 52 - parseVal(s.urlaub_wochen) - parseVal(s.krankheit_wochen) - parseVal(s.feiertage_wochen);
    const gesamtStd = parseVal(s.gesamtarbeitszeit_woche) * wochen;
    const nichtVerrechenbar = parseVal(s.nicht_verrechenbar_std_woche) * wochen;
    const verrechenbar = (gesamtStd - nichtVerrechenbar) * parseVal(s.auslastungsgrad);
    const vollkosten = gewinn.kosten.gesamtJaehrlich + gewinn.umsatz.gesamtRessource + gewinn.ahvIvEo + gewinn.est;
    const mindest = vollkosten + gewinn.mindest.jaehrlich;
    const ziel = vollkosten + parseVal(s.zielgewinn_jahr);
    const basisVoll = verrechenbar > 0 ? vollkosten / verrechenbar : 0;
    const basisMin = verrechenbar > 0 ? mindest / verrechenbar : 0;
    const basisZiel = verrechenbar > 0 ? ziel / verrechenbar : 0;
    const mwst = data.stammdaten.mwst_satz_normal / 100;
    return { wochen, gesamtStd, nichtVerrechenbar, verrechenbar, basisVoll, basisMin, basisZiel, mwst };
  }

  function calcInvestitionenJahr2() {
    const inv = data.investitionen;
    const inv2 = data.investitionen_jahr2;
    
    let bestehendeAfa = 0, bestehendeRest = 0;
    const bestehendeJahr2 = (inv.bestehende || []).map(function(i) {
      const rw = parseVal(i.restwert); const nd = parseVal(i.nd) || 1;
      const afa = rw / nd;
      const restJahr2 = Math.max(0, rw - afa);
      const afaJahr2 = restJahr2 > 0.01 ? afa : 0;
      bestehendeAfa += afaJahr2;
      bestehendeRest += restJahr2;
      return { bezeichnung: i.bezeichnung, restwertJahr1: rw, nd: nd, afaJahr1: afa, restwertJahr2: restJahr2, afaJahr2: afaJahr2 };
    });
    
    let jahr1NeuAfa = 0, jahr1NeuRest = 0;
    const jahr1NeuJahr2 = (inv.neu || []).map(function(i) {
      const b = parseVal(i.betrag_brutto); const nd = parseVal(i.nd) || 1;
      const afa = b / nd;
      const restJahr2 = Math.max(0, b - afa);
      const afaJahr2 = restJahr2 > 0.01 ? afa : 0;
      jahr1NeuAfa += afaJahr2;
      jahr1NeuRest += restJahr2;
      return { bezeichnung: i.bezeichnung, betragJahr1: b, nd: nd, afaJahr1: afa, restwertJahr2: restJahr2, afaJahr2: afaJahr2 };
    });
    
    let jahr2NeuAfa = 0, jahr2NeuBrutto = 0;
    (inv2.neu || []).forEach(function(i) {
      const b = parseVal(i.betrag_brutto); const nd = parseVal(i.nd) || 1;
      i.afa = b / nd; jahr2NeuAfa += i.afa; jahr2NeuBrutto += b;
    });
    
    const nichtAktiv = (inv2.nicht_aktivierungsplichtig || []).reduce(function(s, i) { return s + parseVal(i.betrag_brutto); }, 0);
    
    const gesamtAfa = bestehendeAfa + jahr1NeuAfa + jahr2NeuAfa;
    
    return {
      bestehendeJahr2, bestehendeAfa, bestehendeRest,
      jahr1NeuJahr2, jahr1NeuAfa, jahr1NeuRest,
      jahr2NeuAfa, jahr2NeuBrutto,
      nichtAktiv,
      gesamtAfa
    };
  }

  function calcBetrieblicheKostenJahr2() {
    const kat = data.betriebliche_kosten_jahr2.kategorien;
    const result = { monatlich: {}, jaehrlich: {}, gesamtMonatlich: 0, gesamtJaehrlich: 0, monatsArray: Array(12).fill(0) };
    for (let k in kat) {
      let km = 0, kj = 0; const monate = Array(12).fill(0);
      kat[k].eintraege.forEach(function(e) {
        const b = parseVal(e.betrag); const zw = e.zahlweise || 'monatlich'; const sm = (e.startmonat || 1) - 1;
        const faktor = zahlweiseFaktor(zw); const jbetrag = b * faktor; const mbetrag = jbetrag / 12;
        km += mbetrag; kj += jbetrag;
        if (zw === 'monatlich') { for (let m = sm; m < 12; m++) monate[m] += b; }
        else if (zw === 'zweimonatlich') { for (let m = sm; m < 12; m += 2) monate[m] += b; }
        else if (zw === 'quartalsweise') { for (let m = sm; m < 12; m += 3) monate[m] += b; }
        else if (zw === 'halbjaehrlich') { for (let m = sm; m < 12; m += 6) monate[m] += b; }
        else if (zw === 'jaerlich') { monate[sm] += b; }
      });
      result.monatlich[k] = km; result.jaehrlich[k] = kj;
      result.gesamtMonatlich += km; result.gesamtJaehrlich += kj;
      for (let m = 0; m < 12; m++) result.monatsArray[m] += monate[m];
    }
    return result;
  }

  function calcUmsatzJahr2() {
    const angebote = data.umsatz_jahr2.angebote;
    const result = { angebote: [], gesamtBrutto: 0, gesamtNetto: 0, gesamtMwst: 0, gesamtRessource: 0, gesamtDeckung: 0, monatsArray: Array(12).fill(0) };
    angebote.forEach(function(a, idx) {
      const preis = parseVal(a.einzelpreis_brutto); const mwst = parseVal(a.mwst_satz) / 100; const resPct = parseVal(a.ressourceneinsatz_pct) / 100;
      let brutto = 0, netto = 0, mwstSum = 0, resSum = 0; const monate = Array(12).fill(0);
      a.verkaufszahlen.forEach(function(vz, m) {
        const v = parseVal(vz); const mBrutto = v * preis; const mNetto = mBrutto / (1 + mwst); const mMwst = mBrutto - mNetto; const mRes = mNetto * resPct;
        brutto += mBrutto; netto += mNetto; mwstSum += mMwst; resSum += mRes; monate[m] = mBrutto;
      });
      const deckung = netto - resSum;
      result.angebote.push({ brutto, netto, mwst: mwstSum, ressource: resSum, deckung, monate });
      result.gesamtBrutto += brutto; result.gesamtNetto += netto; result.gesamtMwst += mwstSum;
      result.gesamtRessource += resSum; result.gesamtDeckung += deckung;
      for (let m = 0; m < 12; m++) result.monatsArray[m] += monate[m];
    });
    return result;
  }

  function calcGewinnJahr2() {
    const umsatz = calcUmsatzJahr2(); 
    const kosten = calcBetrieblicheKostenJahr2(); 
    const invest = calcInvestitionenJahr2();
    const mindest = calcMindesteinkommen();
    
    const betriebsergebnis = umsatz.gesamtDeckung - kosten.gesamtJaehrlich - invest.gesamtAfa - invest.nichtAktiv;
    const rechtsform = data.stammdaten.rechtsform || 'Einzelunternehmen';
    const kanton = data.stammdaten.kanton || 'ZH';
    const personengesellschaften = ['Einzelunternehmen', 'Kollektivgesellschaft', 'Kommanditgesellschaft'];
    const isPersonengesellschaft = personengesellschaften.indexOf(rechtsform) !== -1;
    
    let ahvIvEo = 0, est = 0, steuerTyp = '', steuerLabel = '';
    if (isPersonengesellschaft) {
      ahvIvEo = Math.max(0, betriebsergebnis) * (data.steuern_ch.ahv_iv_eo_total / 100);
      const estBmg = Math.max(0, betriebsergebnis - ahvIvEo);
      est = calcEinkommenssteuer(estBmg);
      steuerTyp = 'einkommenssteuer';
      steuerLabel = 'Einkommenssteuer (vereinfacht)';
    } else {
      ahvIvEo = 0;
      const kantonsMap = data.steuern_ch.gewinnsteuer_kantone || {};
      const gewinnsteuerSatz = (kantonsMap[kanton] || 15) / 100;
      est = Math.max(0, betriebsergebnis) * gewinnsteuerSatz;
      steuerTyp = 'gewinnsteuer';
      steuerLabel = App.t('profit_tax_corp') + ' (' + kanton + ', ca. ' + (kantonsMap[kanton] || 15) + '%)';
    }
    const netto = betriebsergebnis - ahvIvEo - est;
    return { umsatz, kosten, invest, mindest, afa: invest.gesamtAfa, nichtAktiv: invest.nichtAktiv, deckung: umsatz.gesamtDeckung, betriebsergebnis, ahvIvEo, est, netto, steuerTyp, steuerLabel, isPersonengesellschaft, rechtsform, kanton };
  }

  function calcLiquiditaetJahr2() {
    const umsatz = calcUmsatzJahr2(); 
    const kosten = calcBetrieblicheKostenJahr2(); 
    const invest = calcInvestitionenJahr2();
    const gewinn = calcGewinnJahr2();
    const liq1 = calcLiquiditaet();
    
    const liq = data.liquiditaet_jahr2;
    const start = parseVal(liq.startguthaben) || liq1.endkum;
    const einlage = parseVal(liq.privateinlage);
    const fremd = parseVal(liq.fremdkapital);
    const foerd = parseVal(liq.foerderungen);
    
    const einzahlungen = Array(12).fill(0);
    const auszahlungen = Array(12).fill(0);
    const saldo = Array(12).fill(0);
    const kumuliert = Array(12).fill(0);
    
    for (let m = 0; m < 12; m++) einzahlungen[m] += umsatz.monatsArray[m];
    einzahlungen[0] += einlage + fremd + foerd;
    
    for (let m = 0; m < 12; m++) auszahlungen[m] += kosten.monatsArray[m];
    auszahlungen[0] += invest.jahr2NeuBrutto + invest.nichtAktiv;
    
    const ahvQ = gewinn.ahvIvEo / 4;
    for (let m = 2; m < 12; m += 3) auszahlungen[m] += ahvQ;
    auszahlungen[11] += gewinn.est;
    
    for (let m = 0; m < 12; m++) auszahlungen[m] += gewinn.mindest.monatlich;
    
    let kum = start;
    for (let m = 0; m < 12; m++) {
      saldo[m] = einzahlungen[m] - auszahlungen[m];
      kum += saldo[m];
      kumuliert[m] = kum;
    }
    
    return { einzahlungen, auszahlungen, saldo, kumuliert, start, einlage, fremd, foerd,
      gesamtEin: einzahlungen.reduce(function(a,b){return a+b;},0),
      gesamtAus: auszahlungen.reduce(function(a,b){return a+b;},0), endkum: kum };
  }

  function exportJSON() {
    try {
      if (!data) { alert(t('no_data')); return; }
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kalkulation_daten.json';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      showStatus(t('export_ok'), 'success');
    } catch(err) {
      console.error('Export fehlgeschlagen:', err);
      alert(t('export_err') + err.message);
    }
  }

  function importJSON(file) {
    return new Promise(function(resolve, reject) {
      if (!file) { reject(new Error('Keine Datei ausgewaehlt')); return; }
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const d = JSON.parse(e.target.result);
          if (!d || typeof d !== 'object') throw new Error(t('invalid_json'));
          data = d;
          ensureStructure();
          if (d.meta && d.meta.sprache && Lang.i18n[d.meta.sprache]) {
            Lang.setLanguage(d.meta.sprache);
          }
          if (save()) {
            showStatus(t('import_ok'), 'success');
            resolve(d);
          } else {
            reject(new Error(t('save_error')));
          }
        } catch(err) {
          console.error('Import fehlgeschlagen:', err);
          showStatus(t('import_err') + err.message, 'error');
          reject(err);
        }
      };
      reader.onerror = function() {
        showStatus(t('file_err'), 'error');
        reject(new Error('FileReader Fehler'));
      };
      reader.readAsText(file);
    });
  }

  function showStatus(msg, type) {
    let el = document.getElementById('app-status');
    if (!el) {
      el = document.createElement('div');
      el.id = 'app-status';
      el.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 18px;border-radius:8px;z-index:9999;font-weight:600;font-size:0.9rem;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:opacity 0.3s;';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.background = type === 'success' ? '#27ae60' : '#e74c3c';
    el.style.color = 'white';
    el.style.opacity = '1';
    setTimeout(function() { el.style.opacity = '0'; }, type === 'success' ? 3000 : 5000);
  }

  function setNavActive() {
    const page = location.pathname.split('/').pop() || 'index.html';

    /* Highlight active item in the apps dropdown */
    const dropdown = document.getElementById('nav-apps-dropdown');
    if (dropdown) {
      dropdown.querySelectorAll('a').forEach(function(a) {
        a.classList.toggle('active', a.getAttribute('href') === page);
      });
    }
  }

  /* Toggle the apps dropdown */
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('nav-apps-toggle');
    const dropdown = document.getElementById('nav-apps-dropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    /* Close when clicking outside */
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target) && e.target !== toggle) {
        dropdown.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  async function exportPDF() {
    try {
      showStatus(t('pdf_loading'), 'success');

      if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
        showStatus(t('pdf_libs'), 'success');
        await loadPdfLibraries();
      }

      const jsPDF = window.jspdf.jsPDF;
      const firmenname = data.stammdaten.firmenname || data.stammdaten.inhaber || 'Business Kalkulation';
      const lang = Lang.getLanguage();
      const dateStr = new Date().toLocaleDateString(lang === 'de' ? 'de-CH' : lang === 'fr' ? 'fr-CH' : lang === 'it' ? 'it-CH' : 'en-US');
      const pageTitle = document.title.split(' – ')[0] || document.title;

      const originalContainer = document.querySelector('.container');
      if (!originalContainer) {
        alert('Kein Inhalt zum Exportieren gefunden.');
        return;
      }

      // Build a clean printable wrapper in the DOM (off-screen but rendered)
      const pdfWrapper = document.createElement('div');
      pdfWrapper.id = 'pdf-export-wrapper';
      pdfWrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:210mm;background:#fff;z-index:-1;visibility:hidden;';
      document.body.appendChild(pdfWrapper);

      // Clone container content
      const cloneContainer = originalContainer.cloneNode(true);

      // Replace inputs with spans for print
      cloneContainer.querySelectorAll('input, select, textarea').forEach(function(el) {
        const span = document.createElement('span');
        span.textContent = el.value || el.textContent || '';
        span.style.cssText = 'display:inline-block;min-width:30px;border-bottom:1px solid #999;padding:2px 4px;font-family:inherit;font-size:0.9rem;color:#333;';
        if (el.parentNode) el.parentNode.replaceChild(span, el);
      });

      // Hide buttons
      cloneContainer.querySelectorAll('button, .btn, .lang-switcher, #btn-pdf').forEach(function(el) {
        el.style.display = 'none';
      });

      // Build pages
      const cards = Array.from(cloneContainer.querySelectorAll('.card'));
      const PAGE_H_MM = 270;
      const MM_TO_PX = 3.7795;
      const pages = [];

      function makePage() {
        const page = document.createElement('div');
        page.style.cssText = 'width:210mm;min-height:297mm;padding:12mm 12mm 15mm 12mm;background:#fff;box-sizing:border-box;overflow:hidden;';
        const header = document.createElement('div');
        header.innerHTML = '<div style="border-bottom:2px solid #b00020;padding-bottom:6px;margin-bottom:12px;"><h1 style="color:#b00020;font-size:16px;margin:0;">' + escapeHtml(pageTitle) + '</h1><p style="color:#555;font-size:10px;margin:3px 0 0 0;">' + escapeHtml(firmenname) + ' | ' + dateStr + '</p></div>';
        page.appendChild(header);
        const footer = document.createElement('div');
        footer.innerHTML = '<div style="border-top:1px solid #ccc;margin-top:10px;padding-top:6px;font-size:8px;color:#888;text-align:center;">Business Kalkulation Schweiz | ' + escapeHtml(t('disclaimer')) + ' | ' + dateStr + '</div>';
        page.appendChild(footer);
        pdfWrapper.appendChild(page);
        return { el: page, content: header, footer: footer, currentH: 38 };
      }

      function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }

      let curPage = makePage();

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        // Temporarily append to measure
        curPage.content.appendChild(card);
        const hPx = card.offsetHeight || card.scrollHeight || 200;
        const hMm = hPx / MM_TO_PX;

        if (curPage.currentH + hMm > PAGE_H_MM && curPage.content.children.length > 2) {
          // Doesn't fit – move to new page
          card.remove();
          curPage = makePage();
          curPage.content.appendChild(card);
          curPage.currentH += (card.offsetHeight || card.scrollHeight || 200) / MM_TO_PX;
        } else {
          curPage.currentH += hMm;
        }
      }

      // Remove empty pages
      const allPageEls = Array.from(pdfWrapper.children);
      const validPages = allPageEls.filter(function(p) {
        return p.querySelectorAll('.card').length > 0;
      });
      allPageEls.forEach(function(p) { if (validPages.indexOf(p) === -1) p.remove(); });

      if (validPages.length === 0) {
        document.body.removeChild(pdfWrapper);
        alert('Kein exportierbarer Inhalt gefunden.');
        return;
      }

      // Render each page to canvas and add to PDF
      const pdf = new jsPDF('p', 'mm', 'a4');

      for (let i = 0; i < validPages.length; i++) {
        const pageEl = validPages[i];
        // Make visible for rendering
        pageEl.style.visibility = 'visible';
        pageEl.style.position = 'static';

        const canvas = await html2canvas(pageEl, {
          scale: 1.2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794,
          allowTaint: true
        });

        pageEl.style.visibility = 'hidden';
        pageEl.style.position = 'absolute';

        // Use JPEG for smaller file size
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, 297));
      }

      document.body.removeChild(pdfWrapper);

      const safeName = function(s) { return String(s).replace(/[^a-zA-Z0-9\-_]/g, '_'); };
      const filename = 'Kalkulation_' + safeName(firmenname) + '_' + safeName(pageTitle) + '_' + dateStr.replace(/\./g, '-') + '.pdf';
      pdf.save(filename);
      showStatus(t('pdf_ok'), 'success');
    } catch(err) {
      console.error('PDF Export fehlgeschlagen:', err);
      showStatus(t('pdf_err') + ' ' + (err.message || ''), 'error');
    }
  }

  function loadPdfLibraries() {
    return new Promise(function(resolve, reject) {
      const scripts = [];
      if (typeof html2canvas === 'undefined') {
        const s1 = document.createElement('script');
        s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        s1.onload = function() { if (typeof jspdf !== 'undefined') resolve(); };
        s1.onerror = function() { reject(new Error('html2canvas konnte nicht geladen werden')); };
        document.head.appendChild(s1);
        scripts.push(s1);
      }
      if (typeof jspdf === 'undefined') {
        const s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        s2.onload = function() { if (typeof html2canvas !== 'undefined') resolve(); };
        s2.onerror = function() { reject(new Error('jsPDF konnte nicht geladen werden')); };
        document.head.appendChild(s2);
        scripts.push(s2);
      }
      if (scripts.length === 0) resolve();
      setTimeout(resolve, 3000);
    });
  }

  return {
    init: init, save: save, getData: getData, setData: setData,
    calcPrivateAusgaben: calcPrivateAusgaben, calcPrivateEinnahmen: calcPrivateEinnahmen, calcMindesteinkommen: calcMindesteinkommen,
    calcInvestitionen: calcInvestitionen, calcBetrieblicheKosten: calcBetrieblicheKosten, calcUmsatz: calcUmsatz,
    calcGewinn: calcGewinn, calcLiquiditaet: calcLiquiditaet, calcStundensatz: calcStundensatz, calcEinkommenssteuer: calcEinkommenssteuer, calcProduktkalkulation: calcProduktkalkulation,
    calcInvestitionenJahr2: calcInvestitionenJahr2, calcBetrieblicheKostenJahr2: calcBetrieblicheKostenJahr2, calcUmsatzJahr2: calcUmsatzJahr2, calcGewinnJahr2: calcGewinnJahr2, calcLiquiditaetJahr2: calcLiquiditaetJahr2,
    exportJSON: exportJSON, importJSON: importJSON, exportPDF: exportPDF, showStatus: showStatus,
    fmt: fmt, fmtInt: fmtInt, parseVal: parseVal, monatlicherBetrag: monatlicherBetrag, zahlweiseFaktor: zahlweiseFaktor,
    setNavActive: setNavActive, t: t, setLanguage: setLanguage, getLanguage: getLanguage, applyLanguage: applyLanguage
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
  App.setNavActive();
  App.applyLanguage();

  /* Language dropdown binding */
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    // set initial value
    langSelect.value = App.getLanguage();

    langSelect.addEventListener('change', function () {
      App.setLanguage(this.value);
    });
  }

  if (window.pageInit) window.pageInit();
});