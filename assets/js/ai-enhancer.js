// assets/js/ai-enhancer.js
// Small, privacy-preserving client-side 'enhancer'.
// It picks a gentle daily accent color variant and applies it via CSS variables.
// It runs locally in the user's browser and does not call external services.
(function(){
  try{
    const KEY = 'site:daily-accent';
    const today = new Date().toISOString().slice(0,10);
    const stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    if(stored && stored.date === today){
      document.documentElement.style.setProperty('--accent', stored.color);
      return;
    }
    // deterministic pseudo-random palette derived from date
    const base = [37,99,235]; // original blue
    const variations = [
      [37,99,235],
      [56,161,105],
      [236,72,153],
      [249,115,22],
      [16,185,129]
    ];
    const idx = (new Date().getUTCDate()) % variations.length;
    const choice = variations[idx];
    const color = `rgb(${choice[0]}, ${choice[1]}, ${choice[2]})`;
    document.documentElement.style.setProperty('--accent', color);
    try{ localStorage.setItem(KEY, JSON.stringify({date:today,color:color})); }catch(e){}
  }catch(e){console.error(e)}
})();
