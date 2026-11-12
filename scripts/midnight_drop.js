const fs = require('fs');
const path = require('path');
const { generateDailyDrop } = require('../lib/celeste_engine.js');

async function runMidnightAgent(targetDate) {
  const dateStr = targetDate || new Date().toISOString().slice(0, 10);
  const drop = generateDailyDrop(dateStr);
  drop.agent_mode = 'celeste_vance_ephemeris_v1';

  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'daily_horoscopes.json');
  fs.writeFileSync(outPath, JSON.stringify(drop, null, 2), 'utf8');
  return { outPath, drop };
}

if (require.main === module) {
  runMidnightAgent(process.argv[2]).then(({ outPath, drop }) => {
    console.log(`🌙✦ Astral Velvet Midnight Drop generated for ${drop.date} -> ${outPath}`);
  });
}

module.exports = { runMidnightAgent };

