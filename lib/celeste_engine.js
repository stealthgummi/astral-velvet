/**
 * Celeste Vance (@celestevance.astro) — Astral Velvet ✦ Engine
 * Editorial, Luxury CHANI-Style Astrology Engine for Creator Outreach Demos
 */

const {
  ZODIAC_SIGNS,
  SIGN_META,
  calculateNatalChart
} = require('./ephemeris.js');

const CELESTE_SIGN_VOICE = {
  Aries: {
    vibe: 'Cardinal Fire Pioneer · Mars-Ruled Sovereign Spark',
    sun: 'Your Solar signature is pure initiation. You were designed to move first, trust your instinct before consensus arrives, and lead with unapologetic clarity.',
    moon: 'Your emotional body processes energy through motion and candor. When you suppress your fire to keep others comfortable, your vitality stagnates—daily movement and immediate honesty keep your nervous system clear.',
    rising: 'With Aries on the Ascendant, your presence is magnetic, direct, and unmistakable. Life rewards you every time you bet on your own autonomy.',
    venusMoney: '2nd/8th House Prosperity Code: Fast-moving ventures, independent ownership, brand leadership, and decisive first-mover offers.',
    northNodeMission: 'Claim your autonomy, trust your instinct, and pioneer your own path without waiting for external permission.',
    southNodePurge: 'Release people-pleasing compromises and fighting battles that do not belong to your mission.'
  },
  Taurus: {
    vibe: 'Fixed Earth Architect · Venusian Luxury & Embodied Worth',
    sun: 'Your Solar blueprint is anchored in high-value permanence, sensory grace, and unshakeable self-worth. You build legacies that compound over time.',
    moon: 'Your nervous system thrives on beauty, tactile comfort, and serene environments. Rushing or tolerating chaotic spaces drains your natural magnetism.',
    rising: 'Grounded, poised, and quietly magnetic. People instinctively trust your steadiness while you curate a life of enduring quality.',
    venusMoney: '2nd/8th House Prosperity Code: Compound equity, luxury positioning, real assets, and high-retainer advisory.',
    northNodeMission: 'Anchor into your intrinsic worth and build self-funded peace on your own terms.',
    southNodePurge: 'Release attachment to outgrown comfort zones and scarcity-driven hesitation.'
  },
  Gemini: {
    vibe: 'Mutable Air Oracle · Mercurial Synthesis & Cultural Voice',
    sun: 'Your mind is a high-frequency transmitter. You connect patterns, translate complex ideas into magnetic language, and open doors through curiosity and wit.',
    moon: 'Your emotional equilibrium is tied to mental spaciousness and breath. Journaling, voice notes, and selective boundaries protect your bandwidth.',
    rising: 'Luminous, adaptable, and endlessly perceptive. You read the room in seconds and shift the conversation effortlessly.',
    venusMoney: '2nd/8th House Prosperity Code: Publishing, media, intellectual property, digital ecosystems, and multi-stream entrepreneurship.',
    northNodeMission: 'Speak your immediate truth clearly and share your voice directly with the world.',
    southNodePurge: 'Release mental scatter, over-analysis, and diluting your message for approval.'
  },
  Cancer: {
    vibe: 'Cardinal Water Luminary · Lunar Intuition & Sacred Sanctuary',
    sun: 'Cardinal Water initiates through emotional depth and fierce devotion. You are here to create sanctuaries of trust, generational wealth, and intuitive leadership.',
    moon: 'Deeply clairvoyant and cellularly perceptive. Water immersion, protected solitude, and energetic hygiene keep your intuitive gifts crystal clear.',
    rising: 'Warm, perceptive, and fiercely protective of your inner circle. Your intuition registers the truth of a room before a word is spoken.',
    venusMoney: '2nd/8th House Prosperity Code: Private sanctuaries, real estate, high-trust mentorship, and legacy wealth.',
    northNodeMission: 'Lead with emotional authenticity, honor your sensitivity as strength, and nurture your own vessel first.',
    southNodePurge: 'Release over-functioning for others and carrying emotional responsibilities that aren’t yours.'
  },
  Leo: {
    vibe: 'Fixed Fire Luminary · Solar Royalty & Creative Command',
    sun: 'Ruled by the Sun itself, your chart is built for heart-centered leadership, creative brilliance, and warm, magnetic visibility.',
    moon: 'Your emotional world flourishes when you are celebrated, creatively expressed, and surrounded by genuine devotion.',
    rising: 'Radiant, regal, and unforgettable. When you walk into a room owning your light, opportunities naturally orbit around you.',
    venusMoney: '2nd/8th House Prosperity Code: Personal brand authority, luxury experiences, creative direction, and center-stage leadership.',
    northNodeMission: 'Step fully into the spotlight and lead from your authentic creative heart.',
    southNodePurge: 'Release shrinking into the background or seeking validation from unaligned audiences.'
  },
  Virgo: {
    vibe: 'Mutable Earth Alchemist · Sacred Precision & Somatic Mastery',
    sun: 'You possess the rare gift of sacred discernment—seeing the exact detail that elevates a system, craft, or ritual from ordinary to extraordinary.',
    moon: 'Your body and nervous system are finely tuned instruments. Grounded routines, herbal nourishment, and decluttered spaces restore your peace.',
    rising: 'Refined, observant, and effortlessly composed. Your attention to quality sets the standard everywhere you go.',
    venusMoney: '2nd/8th House Prosperity Code: Specialized consulting, diagnostic mastery, wellness systems, and bespoke craftsmanship.',
    northNodeMission: 'Embody daily devotion over perfectionism and trust the tangible systems you build.',
    southNodePurge: 'Release self-criticism, over-servicing, and analysis paralysis.'
  },
  Libra: {
    vibe: 'Cardinal Air Strategist · Venusian Harmony & High-Stakes Grace',
    sun: 'True Libra energy is the art of sovereign equilibrium—combining aesthetic mastery with sharp strategic judgment and magnetic diplomacy.',
    moon: 'Your nervous system requires beauty, symmetry, and respectful reciprocity. Surrounding yourself with art and calm environments is essential.',
    rising: 'Enchanting, diplomatic, and effortlessly stylish. You disarm tension while steering outcomes with quiet precision.',
    venusMoney: '2nd/8th House Prosperity Code: Strategic partnerships, luxury aesthetics, legal/contractual leverage, and curated experiences.',
    northNodeMission: 'Build mutually elevating alliances while honoring your own desires without compromise.',
    southNodePurge: 'Release peace-keeping at your own expense and indecision.'
  },
  Scorpio: {
    vibe: 'Fixed Water Alchemist · Plutonian Depth & Sovereign Power',
    sun: 'You operate beneath the surface of things. Your Solar gift is profound psychological insight, magnetic intensity, and transmuting challenge into gold.',
    moon: 'You experience life at a cellular, soul-contract level. Deep privacy, water rituals, and absolute loyalty nourish your emotional core.',
    rising: 'Piercing, enigmatic, and deeply magnetic. People feel your presence immediately and respect your unmistakable boundaries.',
    venusMoney: '2nd/8th House Prosperity Code: 8th-house investments, royalties, high-ticket transformation, and deep financial strategy.',
    northNodeMission: 'Embrace deep transformation, trust your X-ray intuition, and claim your full power.',
    southNodePurge: 'Release hyper-vigilance, secrecy loops, and holding onto expired karmic cords.'
  },
  Sagittarius: {
    vibe: 'Mutable Fire Visionary · Jupiterian Expansion & Prophecy',
    sun: 'Your Solar arrow points toward wide horizons, philosophical truth, and international adventure. You inspire others by living with boundless vision.',
    moon: 'Your spirit needs freedom, discovery, and meaning. Travel, study, and open skies reset your emotional frequency.',
    rising: 'Buoyant, candid, and magnetic. Your optimism and big-picture clarity turn obstacles into launchpads.',
    venusMoney: '2nd/8th House Prosperity Code: Global retreats, publishing, higher education, coaching platforms, and international expansion.',
    northNodeMission: 'Trust your intuitive compass and aim for the expansive macro-vision.',
    southNodePurge: 'Release restlessness and getting pulled into small, draining debates.'
  },
  Capricorn: {
    vibe: 'Cardinal Earth Sovereign · Saturnian Legacy & Executive Mastery',
    sun: 'You are the master architect of the zodiac. Time, integrity, and strategic patience turn your ambitions into enduring empires.',
    moon: 'Beneath your composed exterior is a deep devotion to security and legacy. Allowing yourself rest and softness amplifies your strength.',
    rising: 'Commanding, poised, and naturally respected. You project authority without needing to raise your voice.',
    venusMoney: '2nd/8th House Prosperity Code: Executive leadership, equity ownership, real estate, and long-horizon wealth.',
    northNodeMission: 'Step into structural authority and lead with both wisdom and heart.',
    southNodePurge: 'Release hyper-independence and carrying burdens that belong to others.'
  },
  Aquarius: {
    vibe: 'Fixed Air Futurist · Uranian Innovation & Collective Awakening',
    sun: 'You are wired for the future. Your Solar blueprint thrives on originality, sovereign community, and rewriting outdated rules.',
    moon: 'You need intellectual freedom and energetic space to process emotion. Honoring your uniqueness keeps your nervous system regulated.',
    rising: 'Distinctive, visionary, and ahead of the curve. Your authenticity magnetizes the exact community meant for your work.',
    venusMoney: '2nd/8th House Prosperity Code: Digital platforms, innovative networks, scalable memberships, and future-forward ventures.',
    northNodeMission: 'Innovate boldly for the collective while standing Sovereign in your individuality.',
    southNodePurge: 'Release emotional detachment and dimming your originality to fit in.'
  },
  Pisces: {
    vibe: 'Mutable Water Mystic · Neptunian Glamour & Clairvoyant Grace',
    sun: 'Your Solar essence bridges the seen and unseen worlds, gifting you with boundless imagination, empathy, and spiritual artistry.',
    moon: 'Highly intuitive and energetically porous. Sound healing, salt baths, and dream journaling keep your channel luminous.',
    rising: 'Ethereal, poetic, and enchanting. You move through life guided by subtle synchronicities and deep compassion.',
    venusMoney: '2nd/8th House Prosperity Code: Healing arts, creative media, spiritual retreats, and intuitively timed abundance.',
    northNodeMission: 'Trust your direct intuitive channel and surrender rigid micromanagement.',
    southNodePurge: 'Release escapism, porous boundaries, and martyr dynamics.'
  }
};

const ANGEL_NUMBERS = {
  '111': {
    number: '111',
    title: 'Solar Initiation & Timeline Alignment',
    planet_pair: 'Sun (1) + Uranus (11) · 1st/11th House Axis',
    meaning: 'A clear green-light portal. Your intentions and identity are syncing with a fresh cycle of visibility and sovereign leadership.',
    action: 'Name your top priority out loud and take one decisive step today.'
  },
  '222': {
    number: '222',
    title: '2nd/7th House Reciprocity & Wealth Harmony',
    planet_pair: 'Moon (2) + Venus · 2nd/7th House Axis',
    meaning: 'Your self-worth, material flow, and key partnerships are coming into aligned balance. Trust the timing of collaborative doors.',
    action: 'Honor your rate, nourish your nervous system, and lean into supportive alliances.'
  },
  '333': {
    number: '333',
    title: 'Jupiterian Expansion & Authentic Voice',
    planet_pair: 'Jupiter (3) + Mercury · 3rd/9th House Axis',
    meaning: 'Your message carries heightened magnetism right now. Publishing, teaching, and pitching are favored by expansive Jupiterian currents.',
    action: 'Share the piece of writing, offer, or truth you have been holding back.'
  },
  '444': {
    number: '444',
    title: 'Structural Sanctuary & Ancestral Protection',
    planet_pair: 'Saturn (4) + Uranus · 4th/10th House Axis',
    meaning: 'Your foundations, home sanctuary, and long-term career architecture are being reinforced. You are deeply supported as you build.',
    action: 'Strengthen your daily systems, boundaries, and long-term financial foundations.'
  },
  '555': {
    number: '555',
    title: 'Mercurial Pivot & Quantum Acceleration',
    planet_pair: 'Mercury (5) + Uranus · 5th/11th House Axis',
    meaning: 'Stagnant routines are giving way to liberating change. What feels like a sudden shift is clearing space for a higher trajectory.',
    action: 'Stay adaptable, welcome the pivot, and release outdated plans.'
  },
  '666': {
    number: '666',
    title: 'Venusian Somatic Reset & Luxury Return',
    planet_pair: 'Venus (6) · 2nd/6th House Axis',
    meaning: 'A gentle reminder to call your energy back from overworking or worry and anchor into physical beauty, nourishment, and rest.',
    action: 'Step away from screens, hydrate, and treat your senses with softness.'
  },
  '777': {
    number: '777',
    title: 'Neptunian Synchronicity & Intuitive Downloads',
    planet_pair: 'Neptune (7) + South Node · 9th/12th House Axis',
    meaning: 'Your intuitive channel is wide open. Dreams, deja vu, and quiet inner nudges are revealing the next step before logic catches up.',
    action: 'Record your intuitive hits and protect 20 minutes of quiet solitude.'
  },
  '888': {
    number: '888',
    title: '8th-House Abundance & Karmic Harvest',
    planet_pair: 'Saturn (8) + Pluto · 2nd/8th House Financial Axis',
    meaning: 'A major cycle of energetic and financial reciprocity is maturing. Past discipline and integrity are crystallizing into tangible rewards.',
    action: 'Review your investments, pricing, and long-term wealth containers.'
  },
  '999': {
    number: '999',
    title: 'Sacred Completion & Chapter Graduation',
    planet_pair: 'Mars (9) + Pluto · 9th/12th House Axis',
    meaning: 'An old cycle has fulfilled its purpose. Releasing what is complete creates immediate space for your next elevation.',
    action: 'Close lingering open loops and bless the chapter you are graduating from.'
  },
  '000': {
    number: '000',
    title: 'Zero-Point Sanctuary & Pure Potential',
    planet_pair: 'Source Point · 0° Cardinal Portal',
    meaning: 'You stand at an unconditioned blank canvas. Set your intentions from who you are becoming rather than where you have been.',
    action: 'Write one clear vision for the next 90 days from a place of total peace.'
  }
};

const HOUSE_TOPICS = {
  1: '1st House (Identity, Vital Presence, Embodied Aura & Personal Initiation)',
  2: '2nd House (Earned Income, Self-Worth, Liquid Assets & Material Ease)',
  3: '3rd House (Voice, Writing, Media, Local Community & Daily Mindset)',
  4: '4th House (Home Sanctuary, Ancestral Lineage, Real Estate & Inner Root)',
  5: '5th House (Creative Brilliance, Romance, Joy, Visibility & Artistry)',
  6: '6th House (Sacred Daily Rituals, Somatic Wellness, Craft & Service)',
  7: '7th House (Committed Partnerships, Contracts, Client Alliances & Mirrors)',
  8: '8th House (Shared Capital, Investments, Deep Alchemy & Soul Contracts)',
  9: '9th House (Global Travel, Publishing, Higher Philosophy & Prophecy)',
  10: '10th House (Public Legacy, Career Throne, Reputation & Executive Authority)',
  11: '11th House (Visionary Networks, Community Platforms & Future Timelines)',
  12: '12th House (Intuitive Downloads, Dream Sanctuary, Past Lives & Restoration)'
};

const SIGN_RULERS = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Pluto',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Uranus', Pisces: 'Neptune'
};

function buildCelesteNatalDossier(chartData, targetDateStr) {
  const p = chartData.planets;
  const ascSign = chartData.angles.asc_details.sign;
  const mcSign = chartData.angles.mc_details.sign;
  const sunVoice = CELESTE_SIGN_VOICE[p.Sun.sign] || CELESTE_SIGN_VOICE.Libra;
  const moonVoice = CELESTE_SIGN_VOICE[p.Moon.sign] || CELESTE_SIGN_VOICE.Libra;
  const risingVoice = CELESTE_SIGN_VOICE[ascSign] || CELESTE_SIGN_VOICE.Libra;
  const nnVoice = CELESTE_SIGN_VOICE[p.NorthNode.sign] || CELESTE_SIGN_VOICE.Libra;
  const snVoice = CELESTE_SIGN_VOICE[p.SouthNode.sign] || CELESTE_SIGN_VOICE.Libra;

  const h2Sign = chartData.houses[1]?.sign || 'Taurus';
  const h8Sign = chartData.houses[7]?.sign || 'Scorpio';
  const h2RulerName = SIGN_RULERS[h2Sign] || 'Venus';
  const h8RulerName = SIGN_RULERS[h8Sign] || 'Pluto';
  const h2Ruler = p[h2RulerName] || p.Venus;
  const h8Ruler = p[h8RulerName] || p.Pluto;

  const fixedPlacements = Object.entries(p)
    .filter(([, val]) => ['Taurus', 'Leo', 'Scorpio', 'Aquarius'].includes(val.sign))
    .map(([k, val]) => `${k === 'NorthNode' ? 'North Node' : k === 'SouthNode' ? 'South Node' : k} (${val.deg}° ${val.sign})`);

  const asteroidsList = Object.values(chartData.asteroids || {}).map(ast => ({
    ...ast,
    house_topic: HOUSE_TOPICS[ast.house] || `House ${ast.house}`,
    helena_prescription: getAsteroidPrescription(ast)
  }));

  const vampAlerts = (chartData.degree_alerts || []).filter(a => a.category === 'vampire' || a.category === 'boundary');
  const wealthAlerts = (chartData.degree_alerts || []).filter(a => a.category === 'wealth' || a.category === 'luck' || a.category === 'stardom');

  return {
    persona: {
      name: 'Celeste Vance',
      handle: '@celestevance.astro',
      tagline: 'Precision ephemeris cartography, 2nd/8th house wealth codes, and somatic sanctuary guidance.'
    },
    big_three_summary: {
      headline: `${p.Sun.sign} Sun · ${p.Moon.sign} Moon · ${ascSign} Rising`,
      subheadline: `North Node in ${p.NorthNode.sign} (House ${p.NorthNode.house}) · South Node in ${p.SouthNode.sign} (House ${p.SouthNode.house}) · Midheaven in ${mcSign}`,
      helena_intro: `“Your birth chart is a living celestial architecture. With ${ascSign} Rising setting your 12 whole-sign houses, your ${p.Sun.sign} Sun illuminates your core authority while your ${p.NorthNode.sign} North Node points directly toward your highest timeline.”`,
      cards: [
        {
          slot: 'Rising (Ascendant Horizon)',
          placement: `${ascSign} Rising (${chartData.angles.asc_details.exact_label})`,
          degree_tag: chartData.angles.asc_details.degree_theory.tag,
          reading: risingVoice.rising,
          house_focus: HOUSE_TOPICS[1]
        },
        {
          slot: 'Sun (Solar Sovereign Core)',
          placement: `${p.Sun.sign} Sun in House ${p.Sun.house} (${p.Sun.exact_label})`,
          degree_tag: p.Sun.degree_theory.tag,
          reading: sunVoice.sun,
          house_focus: HOUSE_TOPICS[p.Sun.house]
        },
        {
          slot: 'Moon (Lunar Nervous System)',
          placement: `${p.Moon.sign} Moon in House ${p.Moon.house} (${p.Moon.exact_label})`,
          degree_tag: p.Moon.degree_theory.tag,
          reading: moonVoice.moon,
          house_focus: HOUSE_TOPICS[p.Moon.house]
        },
        {
          slot: 'North Node (Soul North Star)',
          placement: `North Node in ${p.NorthNode.sign} · House ${p.NorthNode.house} (${p.NorthNode.exact_label})`,
          degree_tag: '🧭 North Node Destiny',
          reading: `Placed in ${p.NorthNode.sign} in your ${HOUSE_TOPICS[p.NorthNode.house]}: ${nnVoice.northNodeMission}`,
          house_focus: HOUSE_TOPICS[p.NorthNode.house]
        },
        {
          slot: 'South Node (Past-Life Mastery)',
          placement: `South Node in ${p.SouthNode.sign} · House ${p.SouthNode.house} (${p.SouthNode.exact_label})`,
          degree_tag: '🕯️ Sacred Release',
          reading: `Resting in ${p.SouthNode.sign} in your ${HOUSE_TOPICS[p.SouthNode.house]}: ${snVoice.southNodePurge}`,
          house_focus: HOUSE_TOPICS[p.SouthNode.house]
        }
      ]
    },
    venus_glamour_wealth: {
      headline: `2nd House (${h2Sign}) & 8th House (${h8Sign}) Prosperity Blueprint`,
      venus_placement: `Venus in ${p.Venus.sign} · House ${p.Venus.house} (${p.Venus.exact_label})`,
      mars_placement: `Mars in ${p.Mars.sign} · House ${p.Mars.house} (${p.Mars.exact_label})`,
      jupiter_placement: `Jupiter in ${p.Jupiter.sign} · House ${p.Jupiter.house} (${p.Jupiter.exact_label})`,
      second_house_ruler: `2nd House Ruler: ${h2RulerName} in ${h2Ruler.sign} (House ${h2Ruler.house} · ${h2Ruler.exact_label})`,
      eighth_house_ruler: `8th House Ruler: ${h8RulerName} in ${h8Ruler.sign} (House ${h8Ruler.house} · ${h8Ruler.exact_label})`,
      money_code: `${CELESTE_SIGN_VOICE[p.Venus.sign].venusMoney} Your 2nd House of liquid income is governed by ${h2RulerName} in House ${h2Ruler.house} (${HOUSE_TOPICS[h2Ruler.house]}), while your 8th House of shared capital and long-term equity is ruled by ${h8RulerName} in House ${h8Ruler.house} (${HOUSE_TOPICS[h8Ruler.house]}).`,
      glamour_ritual: `Prosperity Alignment: Activate your ${p.Venus.sign} Venus in House ${p.Venus.house} by pricing your work at its true value and structuring offers around your ${h2Ruler.sign}/${h8Ruler.sign} wealth axis.`,
      wealth_degrees: wealthAlerts
    },
    asteroids_list: asteroidsList,
    protection_dashboard: {
      headline: `Saturn & Pluto Boundaries · Energetic Sovereignty`,
      pluto_placement: `Pluto in ${p.Pluto.sign} · House ${p.Pluto.house} (${p.Pluto.exact_label})`,
      saturn_placement: `Saturn in ${p.Saturn.sign} · House ${p.Saturn.house} (${p.Saturn.exact_label})`,
      mars_south_node_check: `Natal Mars (${p.Mars.sign} H${p.Mars.house}) + South Node (${p.SouthNode.sign} H${p.SouthNode.house})`,
      fixed_pressure_points: fixedPlacements,
      vampire_degree_alerts: vampAlerts,
      cord_cutting_rx: [
        `Pluto in ${p.Pluto.sign} (House ${p.Pluto.house}) reveals where you hold deep regenerative power—protect your privacy and selectivity in this arena.`,
        `Saturn in ${p.Saturn.sign} (House ${p.Saturn.house}) is your structural backbone. Clear boundaries here turn effort into lasting authority.`,
        `Fixed-Sign Anchors (${fixedPlacements.join(', ') || 'House Cusps'}): When transits activate these degrees, release outdated commitments so your next elevation can lock in.`
      ]
    },
    derivative_ancestral: {
      headline: `Intuitive Lineage & Somatic Sanctuary Dossier`,
      fourth_house: `4th House of Lineage & Root: ${chartData.houses[3]?.sign || 'Cancer'}`,
      twelfth_house: `12th House of Intuitive Downloads: ${chartData.houses[11]?.sign || 'Pisces'}`,
      eighth_house: `8th House of Soul Contracts: ${h8Sign} (Ruled by ${h8RulerName} in House ${h8Ruler.house})`,
      ancestral_reading: `Your ${p.SouthNode.sign} South Node in House ${p.SouthNode.house} and ${chartData.houses[11]?.sign || 'Pisces'} 12th House form your intuitive archive. You carry natural pattern-recognition and ancestral resilience that unlock when your nervous system feels safe.`,
      bali_retreat_prescription: `🌙 Somatic Sanctuary Prescription (${p.Moon.sign} Moon + ${chartData.houses[11]?.sign || 'Pisces'} 12H): Prioritize harmonic sound baths, salt-water immersion, and protected quiet mornings to keep your intuitive channel crystal clear.`
    },
    live_personal_transits: evaluatePersonalTransits(chartData, targetDateStr)
  };
}

function getAsteroidPrescription(ast) {
  const rx = {
    Fortuna: `Fortuna (19) in ${ast.sign} (House ${ast.house}) highlights where synchronicity and fortunate pivots open doors in your ${HOUSE_TOPICS[ast.house]}.`,
    Mony: `Asteroid Mony (7782) in ${ast.sign} (House ${ast.house}) reveals a signature revenue channel—align your high-value offers with ${ast.sign} excellence.`,
    Yes: `Asteroid Yes (7707) in ${ast.sign} (House ${ast.house}) marks your effortless favor frequency—pitch and launch when this house is activated.`,
    Enterprise: `Enterprise (9777) in ${ast.sign} (House ${ast.house}) is your founder blueprint for building sustainable, autonomous ventures.`,
    Fama: `Fama (408) in ${ast.sign} (House ${ast.house}) governs your public voice and media resonance—share your perspective boldly on ${ast.sign} themes.`,
    Star: `Starr (4150) in ${ast.sign} (House ${ast.house}) shows where your natural charisma commands attention in your ${HOUSE_TOPICS[ast.house]}.`,
    Orcus: `Orcus (90482) in ${ast.sign} (House ${ast.house}) anchors your soul integrity and long-term commitments.`,
    Polyhymnia: `Polyhymnia (33) in ${ast.sign} (House ${ast.house}) connects your nervous system to harmonic sound healing, movement, and sacred study.`
  };
  return rx[ast.key] || `${ast.label} in ${ast.sign} activates your ${HOUSE_TOPICS[ast.house]}.`;
}

function evaluatePersonalTransits(natalChart, targetDateStr) {
  const targetDate = targetDateStr ? new Date(`${targetDateStr}T12:00:00Z`) : new Date();
  const transitChart = calculateNatalChart({
    date: targetDate.toISOString().slice(0, 10),
    time: '12:00',
    city: natalChart.meta?.city || 'New York'
  });

  const hits = [];
  const tPlanets = transitChart.planets;
  const nPlanets = natalChart.planets;
  const ascCusps = natalChart.houses.map(h => h.cusp_degree);

  function getNatalHouse(lon) {
    for (let i = 0; i < 12; i++) {
      const c1 = ascCusps[i];
      const c2 = ascCusps[(i + 1) % 12];
      if (c1 < c2) {
        if (lon >= c1 && lon < c2) return i + 1;
      } else {
        if (lon >= c1 || lon < c2) return i + 1;
      }
    }
    return 1;
  }

  const aspectDefs = [
    { name: 'Conjunction', angle: 0, orb: 4.5, badge: '✦ Exact Alignment' },
    { name: 'Opposition', angle: 180, orb: 4.0, badge: '⚖️ Polarity Illumination' },
    { name: 'Square', angle: 90, orb: 3.8, badge: '⚡ Dynamic Catalyst' },
    { name: 'Trine', angle: 120, orb: 4.0, badge: '🍀 Harmonic Flow' }
  ];

  const tKeys = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'NorthNode', 'SouthNode'];
  const nKeys = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Pluto', 'NorthNode', 'SouthNode'];

  for (const tk of tKeys) {
    const tp = tPlanets[tk];
    if (!tp) continue;
    const tHouse = getNatalHouse(tp.degree);

    for (const nk of nKeys) {
      const np = nPlanets[nk];
      if (!np) continue;
      let diff = Math.abs(tp.degree - np.degree);
      if (diff > 180) diff = 360 - diff;

      for (const asp of aspectDefs) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          const isNodeHit = nk === 'NorthNode' || nk === 'SouthNode' || tk === 'NorthNode' || tk === 'SouthNode';
          const priority = (isNodeHit ? 90 : 78) - orb * 5;
          hits.push({
            type: isNodeHit ? 'karmic_portal' : 'planetary_transit',
            priority: Number(priority.toFixed(1)),
            badge: isNodeHit ? '🧭 Nodal Destiny Portal' : asp.badge,
            headline: `Transit ${tk} (${tp.deg}° ${tp.abbr} · H${tHouse}) ${asp.name} Natal ${nk} (${np.deg}° ${np.abbr} · H${np.house})`,
            orb: `${orb.toFixed(1)}° orb`,
            detail: `Transiting ${tk}${tp.retrograde ? ' ℞' : ''} in your ${HOUSE_TOPICS[tHouse]} forms a ${asp.name.toLowerCase()} with your Natal ${nk} in House ${np.house}. Channel this window with intentional focus and clear boundaries.`
          });
        }
      }
    }
  }

  hits.sort((a, b) => b.priority - a.priority);
  return {
    target_date: targetDate.toISOString().slice(0, 10),
    sky_snapshot: {
      sun: `${tPlanets.Sun.exact_label}`,
      moon: `${tPlanets.Moon.exact_label}`,
      mars: `${tPlanets.Mars.exact_label}${tPlanets.Mars.retrograde ? ' ℞' : ''}`,
      pluto: `${tPlanets.Pluto.exact_label}${tPlanets.Pluto.retrograde ? ' ℞' : ''}`,
      north_node: `${tPlanets.NorthNode.exact_label}`
    },
    top_transits: hits.slice(0, 8)
  };
}

function generateDailyDrop(dateStr) {
  const targetDateStr = dateStr || new Date().toISOString().slice(0, 10);
  const sky = calculateNatalChart({ date: targetDateStr, time: '12:00', city: 'New York' });
  const p = sky.planets;

  const moonPhaseAngle = ((p.Moon.degree - p.Sun.degree) % 360 + 360) % 360;
  let moonPhaseName = 'Waxing Crescent';
  if (moonPhaseAngle < 15 || moonPhaseAngle > 345) moonPhaseName = '🌑 New Moon Intention Portal';
  else if (moonPhaseAngle >= 165 && moonPhaseAngle <= 195) moonPhaseName = '🌕 Full Moon Illumination';
  else if (moonPhaseAngle >= 75 && moonPhaseAngle <= 105) moonPhaseName = '🌓 First Quarter Momentum';
  else if (moonPhaseAngle >= 255 && moonPhaseAngle <= 285) moonPhaseName = '🌗 Last Quarter Release';
  else if (moonPhaseAngle < 180) moonPhaseName = '🌒 Waxing Alignment Portal';
  else moonPhaseName = '🌘 Waning Sanctuary Window';

  const rxList = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    .filter(k => p[k]?.retrograde)
    .map(k => `${k} ℞ in ${p[k].sign}`);

  const horoscopes = {};
  ZODIAC_SIGNS.forEach((sign, idx) => {
    const voice = CELESTE_SIGN_VOICE[sign];
    const sunHouse = ((Math.floor(p.Sun.degree / 30) - idx + 12) % 12) + 1;
    const moonHouse = ((Math.floor(p.Moon.degree / 30) - idx + 12) % 12) + 1;
    const nnHouse = ((Math.floor(p.NorthNode.degree / 30) - idx + 12) % 12) + 1;
    const venusHouse = ((Math.floor(p.Venus.degree / 30) - idx + 12) % 12) + 1;

    horoscopes[sign] = {
      sign,
      glyph: SIGN_META[idx].glyph,
      element: SIGN_META[idx].element,
      vibe_tag: voice.vibe,
      power_houses: `Sun in H${sunHouse} · Moon in H${moonHouse} · North Node in H${nnHouse}`,
      lucky_degree: `${p.Sun.deg}° ${p.Sun.abbr}`,
      angel_portal: idx % 3 === 0 ? '444' : idx % 3 === 1 ? '111' : '888',
      rising_sun_reading: `For ${sign} Rising & Sun: Today’s ${p.Sun.sign} Sun illuminates your ${HOUSE_TOPICS[sunHouse]}, while the North Node in ${p.NorthNode.sign} activates your House ${nnHouse}. ${voice.sun} Move with quiet certainty and prioritize the long-horizon vision.`,
      venus_money_love: `2nd/8th House Prosperity & Magnetism: With Venus at ${p.Venus.exact_label} moving through your ${HOUSE_TOPICS[venusHouse]}, ${voice.venusMoney} Honor your worth and lean into high-reciprocity alliances.`,
      moon_nervous_system: `Lunar Somatic Sanctuary: Today’s ${p.Moon.sign} Moon (${moonPhaseName}) moves through your ${HOUSE_TOPICS[moonHouse]}. ${voice.moon}`,
      helena_command: `“Align with your House ${nnHouse} North Node and let your ${sign} authority speak for itself.”`
    };
  });

  const bdaySign = p.Sun.sign;
  const bdayVoice = CELESTE_SIGN_VOICE[bdaySign];

  return {
    date: targetDateStr,
    generated_at: new Date().toISOString(),
    author: 'Celeste Vance (@celestevance.astro)',
    sky_weather: {
      headline: `${p.Sun.sign} Season (${p.Sun.exact_label}) · ${p.Moon.sign} Moon (${p.Moon.exact_label})`,
      moon_phase: moonPhaseName,
      north_node: `North Node in ${p.NorthNode.sign} (${p.NorthNode.exact_label})`,
      pluto_macro: `Pluto in ${p.Pluto.sign} (${p.Pluto.exact_label})`,
      mars_watch: `Mars in ${p.Mars.sign} (${p.Mars.exact_label})`,
      retrogrades: rxList,
      helena_daily_brief: `Today’s ephemeris pairs the ${p.Sun.sign} Sun with a ${p.Moon.sign} Moon alongside the ${p.NorthNode.sign} North Node—inviting clear boundaries, intentional pacing, and aligned action.`
    },
    todays_birthday: {
      title: `🎂 Today’s Solar Return Spotlight: ${p.Sun.deg}° ${bdaySign}`,
      degree_tag: p.Sun.degree_theory.tag,
      reading: `Happy Solar Return to everyone born on ${targetDateStr.slice(5)}! Your natal Sun at ${p.Sun.exact_label} (${p.Sun.degree_theory.note}) initiates a 12-month cycle of elevated visibility, financial alignment, and sovereign expansion. ${bdayVoice.sun}`
    },
    horoscopes
  };
}

function reduceDigits(num) {
  let n = Math.abs(Number(num) || 0);
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

function calculateCosmicNumbers(params = {}) {
  const birthDate = params.birth_date || '1996-09-22';
  const targetDate = params.target_date || new Date().toISOString().slice(0, 10);
  const code = String(params.angel_number || '444').trim();

  const bParts = birthDate.split('-').map(Number);
  const tParts = targetDate.split('-').map(Number);

  const lifePath = reduceDigits(
    String(birthDate).replace(/\D/g, '').split('').reduce((a, b) => a + Number(b), 0)
  );
  const personalYear = reduceDigits((bParts[1] || 1) + (bParts[2] || 1) + (tParts[0] || 2026));
  const personalMonth = reduceDigits(personalYear + (tParts[1] || 1));
  const personalDay = reduceDigits(personalMonth + (tParts[2] || 1));

  const LIFE_PATH_DECODE = {
    1: 'Life Path 1 (The Pioneer): Autonomous leadership, originality, and creative initiation.',
    2: 'Life Path 2 (The Intuitive Diplomat): Deep relational intelligence and harmonic balance.',
    3: 'Life Path 3 (The Luminary Voice): Magnetic storytelling, media, and creative expression.',
    4: 'Life Path 4 (The Master Architect): Enduring systems, sanctuary building, and legacy.',
    5: 'Life Path 5 (The Catalyst): Dynamic freedom, travel, and rapid evolution.',
    6: 'Life Path 6 (The Sanctuary Keeper): Venusian beauty, healing, and heart-led leadership.',
    7: 'Life Path 7 (The Mystic Researcher): Esoteric mastery, intuition, and deep discernment.',
    8: 'Life Path 8 (The Sovereign Executive): Financial alchemy, authority, and material mastery.',
    9: 'Life Path 9 (The Global Humanitarian): Old-soul wisdom, completion, and expansive reach.',
    11: 'Master 11 (The Intuitive Illuminator): High-frequency spiritual transmission and vision.',
    22: 'Master 22 (The Master Builder): Turning visionary ideals into lasting global institutions.',
    33: 'Master 33 (The Master Teacher): Pure heart-centered wisdom and collective elevation.'
  };

  const PERSONAL_YEAR_DECODE = {
    1: 'Personal Year 1 — New 9-Year Cycle: Fresh identity, bold launches, and sovereign beginnings.',
    2: 'Personal Year 2 — Sacred Alliances: Patience, intuition, and high-trust partnerships.',
    3: 'Personal Year 3 — Creative Visibility: Publishing, speaking, and expanding your reach.',
    4: 'Personal Year 4 — Structural Mastery: Anchoring systems, equity, and long-term foundations.',
    5: 'Personal Year 5 — Quantum Pivot: Travel, reinvention, and liberating breakthroughs.',
    6: 'Personal Year 6 — Sanctuary & Devotion: Elevating home, beauty, and key relationships.',
    7: 'Personal Year 7 — Inner Sabbatical: Deep study, spiritual refinement, and intuitive clarity.',
    8: 'Personal Year 8 — Prosperity Harvest: Stepping into executive command and financial reward.',
    9: 'Personal Year 9 — Sacred Completion: Releasing outgrown cycles to prepare for a new dawn.',
    11: 'Master 11 Year — Portal Illumination: Heightened synchronicity and prophetic insight.',
    22: 'Master 22 Year — Legacy Architecture: Building a platform that endures for decades.'
  };

  return {
    selected_angel: ANGEL_NUMBERS[code] || ANGEL_NUMBERS['444'],
    all_angel_numbers: ANGEL_NUMBERS,
    numerology: {
      birth_date: birthDate,
      target_date: targetDate,
      life_path: lifePath,
      life_path_meaning: LIFE_PATH_DECODE[lifePath] || LIFE_PATH_DECODE[8],
      personal_year: personalYear,
      personal_year_meaning: PERSONAL_YEAR_DECODE[personalYear] || PERSONAL_YEAR_DECODE[8],
      personal_month: personalMonth,
      personal_day: personalDay,
      macro_cycle_note: 'Pluto in Aquarius + 2026–2027 Outer-Planet Alignments: Your Personal Year number reveals the exact seasonal rhythm your chart is moving through now.'
    }
  };
}

module.exports = {
  HELENA_SIGN_VOICE: CELESTE_SIGN_VOICE,
  CELESTE_SIGN_VOICE,
  ANGEL_NUMBERS,
  HOUSE_TOPICS,
  buildHelenaNatalDossier: buildCelesteNatalDossier,
  buildCelesteNatalDossier,
  evaluatePersonalTransits,
  generateDailyDrop,
  calculateCosmicNumbers
};

