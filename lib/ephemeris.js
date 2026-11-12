/**
 * High-Precision Astronomical Ephemeris + Degree Theory
 * + 8-Asteroid Selector + Midnight Sapphire & Champagne Gold 360° Natal Wheel SVG
 * Built on NASA JPL DE405 / VSOP87 via astronomy-engine
 */

const Astronomy = require('astronomy-engine');
const { findCity, localTimeToUtc } = require('./geo.js');

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_ABBR = ['Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir', 'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'];

const SIGN_META = [
  { name: 'Aries', glyph: '♈', element: 'Fire', color: '#F472B6' },
  { name: 'Taurus', glyph: '♉', element: 'Earth', color: '#34D399' },
  { name: 'Gemini', glyph: '♊', element: 'Air', color: '#FBBF24' },
  { name: 'Cancer', glyph: '♋', element: 'Water', color: '#818CF8' },
  { name: 'Leo', glyph: '♌', element: 'Fire', color: '#F472B6' },
  { name: 'Virgo', glyph: '♍', element: 'Earth', color: '#34D399' },
  { name: 'Libra', glyph: '♎', element: 'Air', color: '#FBBF24' },
  { name: 'Scorpio', glyph: '♏', element: 'Water', color: '#818CF8' },
  { name: 'Sagittarius', glyph: '♐', element: 'Fire', color: '#F472B6' },
  { name: 'Capricorn', glyph: '♑', element: 'Earth', color: '#34D399' },
  { name: 'Aquarius', glyph: '♒', element: 'Air', color: '#FBBF24' },
  { name: 'Pisces', glyph: '♓', element: 'Water', color: '#818CF8' }
];

const BODIES = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
];

const DEGREE_ARCHETYPES = {
  0: { ruler: 'Pure Sign Portal', tag: '✦ 0° Genesis Degree', alert: 'fresh_start', note: 'Pure, unconditioned sign frequency — an initiation point for new timelines.' },
  1: { ruler: 'Aries / Mars', tag: '1° Pioneer Spark', alert: null, note: 'Self-starting momentum, courage, and decisive leadership.' },
  2: { ruler: 'Taurus / Venus', tag: '💎 2° Venusian Prosperity', alert: 'wealth', note: 'Natural magnetism for material abundance, luxury, and grounded worth.' },
  3: { ruler: 'Gemini / Mercury', tag: '3° Mercurial Voice', alert: null, note: 'Articulate storytelling, publishing, and high-frequency connection.' },
  4: { ruler: 'Cancer / Moon', tag: '4° Sanctuary Root', alert: null, note: 'Emotional security, ancestral intuition, and sacred home space.' },
  5: { ruler: 'Leo / Sun', tag: '👑 5° Solar Radiance', alert: 'stardom', note: 'Charismatic visibility, creative magnetism, and effortless stage presence.' },
  6: { ruler: 'Virgo / Mercury', tag: '6° Sacred Craft', alert: null, note: 'Devotion to mastery, somatic wellness, and refined daily rituals.' },
  7: { ruler: 'Libra / Venus', tag: '7° Harmonic Alliance', alert: null, note: 'High-value partnerships, aesthetic grace, and balanced reciprocity.' },
  8: { ruler: 'Scorpio / Pluto', tag: '🕯️ 8° Deep Alchemy', alert: 'vampire', note: 'Magnetic depth, shared capital, and transmuting shadow into strength.' },
  9: { ruler: 'Sagittarius / Jupiter', tag: '🍀 9° Jupiterian Horizon', alert: 'luck', note: 'Global expansion, fortunate synchronicity, and philosophical wisdom.' },
  10: { ruler: 'Capricorn / Saturn', tag: '🏛️ 10° Legacy Architect', alert: 'wealth', note: 'Executive authority, long-term empire building, and lasting reputation.' },
  11: { ruler: 'Aquarius / Uranus', tag: '⚡ 11° Quantum Breakthrough', alert: 'freedom', note: 'Sudden innovation, creative independence, and timeline acceleration.' },
  12: { ruler: 'Pisces / Neptune', tag: '🔮 12° Mystic Oracle', alert: null, note: 'Clairvoyant sensitivity, artistic flow, and dream-state downloads.' },
  13: { ruler: 'Aries / Mars', tag: '13° Fearless Pivot', alert: null, note: 'Bold course correction and unapologetic forward motion.' },
  14: { ruler: 'Taurus / Venus', tag: '💎 14° Opulent Grace', alert: 'wealth', note: 'Sensory abundance, financial ease, and magnetic attraction.' },
  15: { ruler: 'Gemini / Mercury', tag: '15° Signal Amplifier', alert: null, note: 'Viral ideas, dual mastery, and cultural resonance.' },
  16: { ruler: 'Cancer / Moon', tag: '🕯️ 16° Karmic Turning Point', alert: 'vampire', note: 'Deep emotional truth surfacing to clear stagnant patterns and restore sovereignty.' },
  17: { ruler: 'Leo / Sun', tag: '👑 17° Icon & Legacy', alert: 'stardom', note: 'Enduring recognition, heart-led leadership, and creative sovereignty.' },
  18: { ruler: 'Virgo / Mercury', tag: '18° Forensic Clarity', alert: null, note: 'Precision discernment — remember to ground in the body and rest.' },
  19: { ruler: 'Libra / Venus', tag: '19° Magnetic Favor', alert: null, note: 'Graceful negotiations, beauty, and mutually elevating contracts.' },
  20: { ruler: 'Scorpio / Pluto', tag: '🛡️ 20° Phoenix Regeneration', alert: 'vampire', note: 'Profound cellular renewal and energetic boundary mastery.' },
  21: { ruler: 'Sagittarius / Jupiter', tag: '🍀 21° Crown Of Fortune', alert: 'luck', note: 'Major expansion windows, international reach, and generous windfalls.' },
  22: { ruler: 'Capricorn / Saturn', tag: '🛡️ 22° Sovereign Boundary', alert: 'boundary', note: 'Unshakeable standards, structural mastery, and self-command.' },
  23: { ruler: 'Aquarius / Uranus', tag: '⚡ 23° Visionary Original', alert: 'freedom', note: 'Breaking outdated molds and thriving through sovereign authenticity.' },
  24: { ruler: 'Pisces / Neptune', tag: '🌙 24° Celestial Sanctuary', alert: null, note: 'Sacred sound healing, water immersion, and spiritual restoration.' },
  25: { ruler: 'Aries / Mars', tag: '25° Decisive Command', alert: null, note: 'Clean cord-cutting and stepping boldly into the next chapter.' },
  26: { ruler: 'Taurus / Venus', tag: '💎 26° Generational Wealth', alert: 'wealth', note: 'Enduring equity, land, beauty, and material serenity.' },
  27: { ruler: 'Gemini / Mercury', tag: '27° Master Synthesizer', alert: null, note: 'Translating complex wisdom into clear, resonant guidance.' },
  28: { ruler: 'Cancer / Moon', tag: '🌙 28° Sacred Harbor', alert: 'wealth', note: 'Deep emotional fulfillment, protected sanctuary, and family blessing.' },
  29: { ruler: 'Anaretic Mastery', tag: '👑 29° Anaretic Graduation', alert: 'stardom', note: 'Culminating soul mastery — distilling a lifetime of experience into pure authority.' }
};

function getDegreeTheory(degInt) {
  const d = ((Math.floor(degInt) % 30) + 30) % 30;
  return { deg: d, ...(DEGREE_ARCHETYPES[d] || DEGREE_ARCHETYPES[0]) };
}

function formatExactDms(eclipticLon) {
  const norm = ((eclipticLon % 360) + 360) % 360;
  const signIdx = Math.floor(norm / 30);
  const inSign = norm - signIdx * 30;
  const deg = Math.floor(inSign);
  const minFloat = (inSign - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = Math.round((minFloat - min) * 60) % 60;
  const degTheory = getDegreeTheory(deg);
  return {
    sign: ZODIAC_SIGNS[signIdx],
    abbr: SIGN_ABBR[signIdx],
    glyph: SIGN_META[signIdx].glyph,
    element: SIGN_META[signIdx].element,
    deg,
    min,
    sec,
    degree_in_sign: Number(inSign.toFixed(2)),
    exact_label: `${deg}° ${SIGN_ABBR[signIdx]} ${String(min).padStart(2, '0')}' ${String(sec).padStart(2, '0')}"`,
    degree_theory: degTheory
  };
}

function calculateNorthNode(date) {
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  let omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000.0;
  return ((omega % 360) + 360) % 360;
}

const SIGNATURE_ASTEROIDS = [
  {
    id: 19, key: 'Fortuna', label: '19 Fortuna', icon: '🍀',
    epoch: 2461200.5, a: 2.441509944072874, e: 0.1581144571294698, i: 1.573529585781511,
    om: 210.9922659828297, w: 182.4358203745859, ma: 148.2622141754194, n: 0.258354676819405,
    domain: 'Wheel of Fortune, Synchronicity Windfalls & Pivotal Blessings'
  },
  {
    id: 7782, key: 'Mony', label: '7782 Mony', icon: '💎',
    epoch: 2461200.5, a: 3.171618477602275, e: 0.3126158490535498, i: 14.44636620851493,
    om: 259.6273021556166, w: 113.1580908025548, ma: 296.1285609089759, n: 0.1744948705107163,
    domain: '2nd/8th House Capital, Prosperity Channels & Long-Term Equity'
  },
  {
    id: 7707, key: 'Yes', label: '7707 Yes', icon: '✨',
    epoch: 2461200.5, a: 2.652148531923937, e: 0.1420610140627719, i: 15.69347289326408,
    om: 131.1839009585817, w: 77.83412338350939, ma: 245.0157004089689, n: 0.2281956228371733,
    domain: 'Green-Light Opportunities, Effortless Favor & Open Doors'
  },
  {
    id: 9777, key: 'Enterprise', label: '9777 Enterprise', icon: '🏛️',
    epoch: 2461200.5, a: 2.399049885643765, e: 0.2317139414823986, i: 3.273792173565524,
    om: 115.5481616755569, w: 179.4442180555015, ma: 221.0240949371676, n: 0.2652437478418583,
    domain: 'Founder Vision, Autonomous Career Architecture & Executive Strategy'
  },
  {
    id: 408, key: 'Fama', label: '408 Fama', icon: '📣',
    epoch: 2461200.5, a: 3.167341227511315, e: 0.1477551364977772, i: 9.089770852479129,
    om: 297.0847667959958, w: 109.0463865748119, ma: 58.55299109495965, n: 0.1748484526156669,
    domain: 'Public Voice, Thought Leadership, Reputation & Media Resonance'
  },
  {
    id: 4150, key: 'Star', label: '4150 Starr', icon: '🌟',
    epoch: 2461200.5, a: 2.233181325954991, e: 0.1665861305512198, i: 3.19697047892345,
    om: 122.883041221529, w: 197.67849314953, ma: 197.684953210843, n: 0.2953371587639414,
    domain: 'Spotlight Magnetism, Creative Presence & Unmistakable Aura'
  },
  {
    id: 90482, key: 'Orcus', label: '90482 Orcus', icon: '⚖️',
    epoch: 2461200.5, a: 39.37686537914865, e: 0.2205240628250881, i: 20.55681019612,
    om: 268.4053519455824, w: 73.56848606705262, ma: 189.0972913554275, n: 0.003988800931399829,
    domain: 'Soul Integrity, Deep Accountability, Shadow Mastery & Sacred Vows'
  },
  {
    id: 33, key: 'Polyhymnia', label: '33 Polyhymnia', icon: '🎶',
    epoch: 2461200.5, a: 2.87133496806849, e: 0.3344915245297666, i: 1.854194735990684,
    om: 8.126765416786608, w: 338.8138529964299, ma: 147.6094435360536, n: 0.2025714720052792,
    domain: 'Harmonic Sound Healing, Somatic Flow & Esoteric Wisdom'
  }
];

function computeGeocentricAsteroidLon(ast, date) {
  const rad = Math.PI / 180;
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const time = new Astronomy.AstroTime(date);
  const eq = Astronomy.HelioVector(Astronomy.Body.Earth, time);
  const eps0 = 23.439291111 * rad;
  const xe = eq.x;
  const ye = eq.y * Math.cos(eps0) + eq.z * Math.sin(eps0);
  const ze = -eq.y * Math.sin(eps0) + eq.z * Math.cos(eps0);

  function helioEclipticAt(jdTarget) {
    const M = (((ast.ma + ast.n * (jdTarget - ast.epoch)) % 360) + 360) % 360 * rad;
    let E = M;
    for (let k = 0; k < 8; k++) {
      E = E - (E - ast.e * Math.sin(E) - M) / (1 - ast.e * Math.cos(E));
    }
    const xv = ast.a * (Math.cos(E) - ast.e);
    const yv = ast.a * Math.sqrt(1 - ast.e * ast.e) * Math.sin(E);
    const v = Math.atan2(yv, xv);
    const r = Math.hypot(xv, yv);
    const u = v + ast.w * rad;
    const om = ast.om * rad;
    const inc = ast.i * rad;
    return {
      x: r * (Math.cos(om) * Math.cos(u) - Math.sin(om) * Math.sin(u) * Math.cos(inc)),
      y: r * (Math.sin(om) * Math.cos(u) + Math.cos(om) * Math.sin(u) * Math.cos(inc)),
      z: r * (Math.sin(u) * Math.sin(inc))
    };
  }

  let h = helioEclipticAt(jd);
  const distAu = Math.hypot(h.x - xe, h.y - ye, h.z - ze);
  h = helioEclipticAt(jd - distAu / 173.14463267);
  const lonJ2000 = Math.atan2(h.y - ye, h.x - xe) / rad;
  const precDeg = (50.28796195 * ((jd - 2451545.0) / 365.25)) / 3600.0;
  return ((lonJ2000 + precDeg) % 360 + 360) % 360;
}

function calculateSignatureAsteroids(date, _sunLon, cusps) {
  const out = {};
  for (const ast of SIGNATURE_ASTEROIDS) {
    const lon = computeGeocentricAsteroidLon(ast, date);
    const lon6h = computeGeocentricAsteroidLon(ast, new Date(date.getTime() + 6 * 3600 * 1000));
    let diff = lon6h - lon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const dms = formatExactDms(lon);
    out[ast.key] = {
      id: ast.id,
      key: ast.key,
      label: ast.label,
      icon: ast.icon,
      domain: ast.domain,
      degree: Number(lon.toFixed(4)),
      retrograde: diff < 0,
      ...dms,
      house: getHouseForDegree(lon, cusps)
    };
  }
  return out;
}

function calculateAngles(date, lat, lon) {
  const time = new Astronomy.AstroTime(date);
  const gastHours = Astronomy.SiderealTime(time);
  const ramcDeg = ((gastHours * 15.0 + lon) % 360 + 360) % 360;
  const eps = Astronomy.e_tilt(time).tobl;

  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;
  const ramcRad = ramcDeg * toRad;
  const epsRad = eps * toRad;
  const latRad = lat * toRad;

  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * toDeg;
  mc = ((mc % 360) + 360) % 360;

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
  let asc = Math.atan2(y, x) * toDeg;
  asc = ((asc % 360) + 360) % 360;

  return {
    ascendant: asc,
    midheaven: mc,
    descendant: (asc + 180) % 360,
    ic: (mc + 180) % 360
  };
}

function calculateHouses(asc) {
  const ascSignIndex = Math.floor(asc / 30);
  const cusps = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(((ascSignIndex + i) * 30) % 360);
  }
  return cusps;
}

function getHouseForDegree(deg, cusps) {
  for (let i = 0; i < 12; i++) {
    const cusp = cusps[i];
    const nextCusp = cusps[(i + 1) % 12];
    if (cusp < nextCusp) {
      if (deg >= cusp && deg < nextCusp) return i + 1;
    } else {
      if (deg >= cusp || deg < nextCusp) return i + 1;
    }
  }
  return 1;
}

function geocentricEclipticLon(bodyName, date) {
  const time = new Astronomy.AstroTime(date);
  if (bodyName === 'Sun') return Astronomy.SunPosition(time).elon;
  if (bodyName === 'Moon') return Astronomy.EclipticGeoMoon(time).lon;
  const vec = Astronomy.GeoVector(Astronomy.Body[bodyName], time, true);
  return Astronomy.Ecliptic(vec).elon;
}

function isRetrograde(bodyName, date) {
  if (bodyName === 'Sun' || bodyName === 'Moon') return false;
  const l1 = geocentricEclipticLon(bodyName, date);
  const l2 = geocentricEclipticLon(bodyName, new Date(date.getTime() + 6 * 3600 * 1000));
  let diff = l2 - l1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff < 0;
}

function calculateNatalChart(params = {}) {
  const dateStr = params.date || params.birth_date || '1996-09-22';
  const timeStr = params.time || params.birth_time || '14:15';
  const loc = findCity(params.city || 'New York');
  const lat = typeof params.latitude === 'number' ? params.latitude : loc.lat;
  const lon = typeof params.longitude === 'number' ? params.longitude : loc.lon;
  const utcDate = localTimeToUtc(dateStr, timeStr, params.timezone || loc.tz);

  const angles = calculateAngles(utcDate, lat, lon);
  const cusps = calculateHouses(angles.ascendant);

  const planets = {};
  for (const b of BODIES) {
    const elon = ((geocentricEclipticLon(b, utcDate) % 360) + 360) % 360;
    const dms = formatExactDms(elon);
    planets[b] = {
      degree: Number(elon.toFixed(4)),
      ...dms,
      retrograde: isRetrograde(b, utcDate),
      house: getHouseForDegree(elon, cusps)
    };
  }

  const nnLon = calculateNorthNode(utcDate);
  planets.NorthNode = {
    degree: Number(nnLon.toFixed(4)),
    ...formatExactDms(nnLon),
    retrograde: true,
    house: getHouseForDegree(nnLon, cusps)
  };

  const snLon = (nnLon + 180) % 360;
  planets.SouthNode = {
    degree: Number(snLon.toFixed(4)),
    ...formatExactDms(snLon),
    retrograde: true,
    house: getHouseForDegree(snLon, cusps)
  };

  const asteroids = calculateSignatureAsteroids(utcDate, planets.Sun.degree, cusps);

  const houses = cusps.map((c, idx) => ({
    house: idx + 1,
    cusp_degree: c,
    sign: ZODIAC_SIGNS[Math.floor(c / 30)],
    glyph: SIGN_META[Math.floor(c / 30)].glyph
  }));

  const ascDms = formatExactDms(angles.ascendant);
  const mcDms = formatExactDms(angles.midheaven);

  const degreeAlerts = [];
  const checkPoints = [
    { label: 'Rising (ASC)', ...ascDms, house: 1 },
    { label: 'Midheaven (MC)', ...mcDms, house: 10 },
    ...['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'SouthNode'].map(k => ({
      label: k === 'NorthNode' ? 'North Node' : k === 'SouthNode' ? 'South Node' : k,
      ...planets[k]
    }))
  ];
  for (const pt of checkPoints) {
    const dt = pt.degree_theory;
    if (dt && dt.alert) {
      degreeAlerts.push({
        body: pt.label,
        sign: pt.sign,
        house: pt.house,
        deg: pt.deg,
        exact_label: pt.exact_label,
        category: dt.alert,
        tag: dt.tag,
        ruler: dt.ruler,
        note: dt.note
      });
    }
  }

  return {
    meta: {
      birth_date: dateStr,
      birth_time: timeStr,
      resolved_location: `${loc.city}${loc.state ? ', ' + loc.state : ''}${loc.country ? ' (' + loc.country + ')' : ''}`,
      city: loc.city,
      timezone: loc.tz,
      utc_time: utcDate.toISOString(),
      lat,
      lon
    },
    angles: {
      ...angles,
      asc_details: ascDms,
      mc_details: mcDms
    },
    planets,
    asteroids,
    houses,
    degree_alerts: degreeAlerts
  };
}

const PLANET_GLYPHS = {
  Sun: { g: '☉', c: '#FBBF24' },
  Moon: { g: '☽', c: '#E2E8F0' },
  Mercury: { g: '☿', c: '#38BDF8' },
  Venus: { g: '♀', c: '#F472B6' },
  Mars: { g: '♂', c: '#FB7185' },
  Jupiter: { g: '♃', c: '#E2B86B' },
  Saturn: { g: '♄', c: '#34D399' },
  Uranus: { g: '♅', c: '#22D3EE' },
  Neptune: { g: '♆', c: '#818CF8' },
  Pluto: { g: '♇', c: '#C084FC' },
  NorthNode: { g: '☊', c: '#E2B86B' },
  SouthNode: { g: '☋', c: '#94A3B8' }
};

const ASPECT_RULES = [
  { name: 'Conjunction', angle: 0, orb: 8, color: '#E2B86B' },
  { name: 'Sextile', angle: 60, orb: 6, color: '#34D399' },
  { name: 'Square', angle: 90, orb: 7, color: '#F472B6' },
  { name: 'Trine', angle: 120, orb: 8, color: '#818CF8' },
  { name: 'Opposition', angle: 180, orb: 8, color: '#38BDF8' }
];

function calculateAspects(planets) {
  const keys = Object.keys(planets);
  const aspects = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if ((keys[i] === 'NorthNode' && keys[j] === 'SouthNode') || (keys[i] === 'SouthNode' && keys[j] === 'NorthNode')) continue;
      let diff = Math.abs(planets[keys[i]].degree - planets[keys[j]].degree);
      if (diff > 180) diff = 360 - diff;
      for (const rule of ASPECT_RULES) {
        const orb = Math.abs(diff - rule.angle);
        if (orb <= rule.orb) {
          aspects.push({
            planet1: keys[i],
            planet2: keys[j],
            aspect: rule.name,
            orb: Number(orb.toFixed(2)),
            color: rule.color
          });
          break;
        }
      }
    }
  }
  return aspects;
}

function renderCelestialWheel(chartData, size = 720) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.46;
  const rInnerSign = size * 0.365;
  const rPlanet = size * 0.285;
  const rHub = size * 0.195;
  const asc = chartData.angles.ascendant;

  const degToScreen = (deg) => {
    const diff = (deg - asc + 360) % 360;
    return ((180 - diff + 360) % 360) * (Math.PI / 180);
  };
  const pt = (r, deg) => {
    const a = degToScreen(deg);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="100%" height="100%">
  <defs>
    <radialGradient id="sapphireGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#17203A" stop-opacity="0.98"/>
      <stop offset="68%" stop-color="#0B1021" stop-opacity="0.98"/>
      <stop offset="100%" stop-color="#050811" stop-opacity="0.99"/>
    </radialGradient>
    <linearGradient id="champagneRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2B86B"/>
      <stop offset="50%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#F472B6"/>
    </linearGradient>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${rOuter + 10}" fill="url(#sapphireGlow)" stroke="url(#champagneRing)" stroke-width="3.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="#E2B86B" stroke-opacity="0.55" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rInnerSign}" fill="#080C1A" fill-opacity="0.9" stroke="#818CF8" stroke-opacity="0.45" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="${rHub}" fill="#0D1326" stroke="#E2B86B" stroke-opacity="0.45" stroke-width="1.2"/>`;

  for (let i = 0; i < 12; i++) {
    const startDeg = i * 30;
    const midDeg = startDeg + 15;
    const p1 = pt(rInnerSign, startDeg);
    const p2 = pt(rOuter, startDeg);
    const pHouseIn = pt(rHub, chartData.houses[i].cusp_degree);
    const pHouseOut = pt(rInnerSign, chartData.houses[i].cusp_degree);
    const gPos = pt((rOuter + rInnerSign) / 2, midDeg);
    const hPos = pt(rHub + 18, chartData.houses[i].cusp_degree + 15);
    const sm = SIGN_META[i];

    svg += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#E2B86B" stroke-opacity="0.32" stroke-width="1.2"/>`;
    svg += `<line x1="${pHouseIn.x.toFixed(1)}" y1="${pHouseIn.y.toFixed(1)}" x2="${pHouseOut.x.toFixed(1)}" y2="${pHouseOut.x.toFixed(1)}" stroke="#475569" stroke-dasharray="3,3" stroke-width="1"/>`;
    svg += `<text x="${gPos.x.toFixed(1)}" y="${(gPos.y + 7).toFixed(1)}" text-anchor="middle" font-size="21" fill="${sm.color}" font-family="Segoe UI Symbol, Apple Symbols, sans-serif">${sm.glyph}</text>`;
    svg += `<text x="${hPos.x.toFixed(1)}" y="${(hPos.y + 4).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#FDE68A" fill-opacity="0.7" font-family="Plus Jakarta Sans, sans-serif">${i + 1}</text>`;
  }

  const ascL = pt(rOuter + 6, asc);
  const dscL = pt(rOuter + 6, (asc + 180) % 360);
  svg += `<line x1="${ascL.x.toFixed(1)}" y1="${ascL.y.toFixed(1)}" x2="${dscL.x.toFixed(1)}" y2="${dscL.y.toFixed(1)}" stroke="#E2B86B" stroke-width="2.2" stroke-opacity="0.85"/>`;
  svg += `<text x="${(ascL.x - 16).toFixed(1)}" y="${(ascL.y - 6).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="800" fill="#FDE68A" font-family="Plus Jakarta Sans, sans-serif">ASC</text>`;

  const aspects = calculateAspects(chartData.planets);
  for (const asp of aspects) {
    const a1 = pt(rHub - 4, chartData.planets[asp.planet1].degree);
    const a2 = pt(rHub - 4, chartData.planets[asp.planet2].degree);
    svg += `<line x1="${a1.x.toFixed(1)}" y1="${a1.y.toFixed(1)}" x2="${a2.x.toFixed(1)}" y2="${a2.y.toFixed(1)}" stroke="${asp.color}" stroke-opacity="0.52" stroke-width="1.35"/>`;
  }

  const pEntries = Object.entries(chartData.planets)
    .map(([k, v]) => ({ key: k, ...v, plotDeg: v.degree }));
  pEntries.sort((a, b) => a.degree - b.degree);
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < pEntries.length; i++) {
      const next = pEntries[(i + 1) % pEntries.length];
      let diff = (next.plotDeg - pEntries[i].plotDeg + 360) % 360;
      if (diff < 7.5) {
        pEntries[i].plotDeg = (pEntries[i].plotDeg - 2 + 360) % 360;
        next.plotDeg = (next.plotDeg + 2) % 360;
      }
    }
  }

  for (const p of pEntries) {
    const pos = pt(rPlanet, p.plotDeg);
    const trueTick = pt(rInnerSign, p.degree);
    const pg = PLANET_GLYPHS[p.key] || { g: '✦', c: '#E2B86B' };
    svg += `<line x1="${trueTick.x.toFixed(1)}" y1="${trueTick.y.toFixed(1)}" x2="${pos.x.toFixed(1)}" y2="${pos.y.toFixed(1)}" stroke="${pg.c}" stroke-opacity="0.45" stroke-width="1"/>`;
    svg += `<circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="14" fill="#0B1022" stroke="${pg.c}" stroke-width="2"/>`;
    svg += `<text x="${pos.x.toFixed(1)}" y="${(pos.y + 5).toFixed(1)}" text-anchor="middle" font-size="14.5" font-weight="700" fill="${pg.c}" font-family="Segoe UI Symbol, Apple Symbols, sans-serif">${pg.g}</text>`;
    const dPos = pt(rPlanet - 23, p.plotDeg);
    svg += `<text x="${dPos.x.toFixed(1)}" y="${(dPos.y + 3).toFixed(1)}" text-anchor="middle" font-size="8.8" font-weight="700" fill="#E2E8F0" font-family="Plus Jakarta Sans, sans-serif">${p.deg}°${p.retrograde ? '℞' : ''}</text>`;
  }

  svg += `<circle cx="${cx}" cy="${cy}" r="22" fill="url(#champagneRing)" fill-opacity="0.22" stroke="#E2B86B" stroke-width="1.4"/>`;
  svg += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="15">🌙✦</text></svg>`;
  return svg;
}

module.exports = {
  ZODIAC_SIGNS,
  SIGN_META,
  DEGREE_ARCHETYPES,
  SIGNATURE_ASTEROIDS,
  getDegreeTheory,
  formatExactDms,
  calculateNatalChart,
  calculateAspects,
  renderCottonCandyWheel: renderCelestialWheel,
  renderCrucibleWheel: renderCelestialWheel,
  renderCelestialWheel,
  geocentricEclipticLon
};

