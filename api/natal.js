const { calculateNatalChart, calculateAspects, renderCelestialWheel } = require('../lib/ephemeris.js');
const { resolveCityAsync } = require('../lib/geo.js');
const { buildCelesteNatalDossier } = require('../lib/celeste_engine.js');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') payload = JSON.parse(payload || '{}');
    if (!payload || Object.keys(payload).length === 0) {
      const u = new URL(req.url, 'http://localhost');
      payload = {
        name: u.searchParams.get('name') || 'Celestial Guest',
        date: u.searchParams.get('date') || '1996-09-22',
        time: u.searchParams.get('time') || '14:15',
        city: u.searchParams.get('city') || 'New York'
      };
    }

    await resolveCityAsync(payload.city || 'New York');
    const chart = calculateNatalChart(payload);
    const svg = renderCelestialWheel(chart, 720);
    const aspects = calculateAspects(chart.planets);
    const helena = buildCelesteNatalDossier(chart);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      name: payload.name || 'Celestial Guest',
      chart,
      aspects,
      helena,
      celeste: helena,
      svg
    }));
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};

