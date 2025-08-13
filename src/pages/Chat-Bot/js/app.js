/* UI y lógica sin backend. Usa KB (data/kb.js) y Fuse.js para búsqueda difusa */
document.addEventListener('DOMContentLoaded', () => {
  const q = document.getElementById('q');
  const askBtn = document.getElementById('askBtn');
  const suggestBtn = document.getElementById('suggestBtn');
  const stream = document.getElementById('relato');
  const narratorName = document.getElementById('narratorName');
  const portrait = document.getElementById('portrait');

  // Expuesto para edición rápida del narrador genérico
  const Narrador = {
    nombre: 'Guía de 1819',
    imagen: 'assets/narrador_generico.png'
  };
  narratorName.textContent = Narrador.nombre;
  portrait.src = Narrador.imagen;

  const fuse = new Fuse(KB, { keys:['title','tags','content'], threshold:0.32, includeScore:true });

  function addCard(kind, text) {
    const card = document.createElement('div');
    card.className = 'card-perg ' + (kind === 'user' ? 'user' : 'guide') + ' animate__animated animate__fadeInUp';
    card.innerHTML = `
      <div class="byline">${kind === 'user' ? 'Viajero' : Narrador.nombre}</div>
      <div class="mt-1">${text}</div>
    `;
    stream.prepend(card); // apilar tipo "panel", no chat lineal
  }

  function synthesizeAnswer(items, query){
    const intro = query ? `<strong>Consulta:</strong> ${escapeHtml(query)}<br><br>` : '';
    const bullets = items.map(i => `<strong>${i.title}:</strong> ${i.content}`).join('<br><br>');
    const hint = `<br><em>Explora más con palabras clave como "Pisba", "Vargas", "Boyacá".</em>`;
    return intro + bullets + hint;
  }

  function searchAndAnswer(query){
    const r = fuse.search(query).slice(0,4);
    if(r.length === 0){
      const base = KB.filter(k => ['intro','itinerario','consecuencias'].includes(k.id));
      return synthesizeAnswer(base, query);
    }
    return synthesizeAnswer(r.map(x => x.item), query);
  }

  function handleAsk(){
    const text = (q.value || '').trim();
    if(!text) return;
    addCard('user', escapeHtml(text));
    const answer = searchAndAnswer(text);
    // Estilo "pensamiento" del personaje (narrador)
    addCard('guide', `<span style="font-family:'Dancing Script', cursive; font-size:1.2rem;">${answer}</span>`);
    q.value = '';
  }

  askBtn.addEventListener('click', handleAsk);
  q.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleAsk(); }});

  suggestBtn.addEventListener('click', () => {
    const ideas = [
      'Resumen de la Batalla de Boyacá',
      '¿Cómo fue el cruce del Páramo de Pisba?',
      '¿Qué papel tuvo Santander?',
      'Itinerario de la Ruta Libertadora',
      'Consecuencias de 1819'
    ];
    q.value = ideas[Math.floor(Math.random()*ideas.length)];
    q.focus();
  });

  function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Mensaje inicial
  addCard('guide', `<span style="font-family:'Dancing Script', cursive; font-size:1.2rem;">
    Bienvenido viajero. Pregúntame sobre la <strong>Ruta Libertadora (1819)</strong> y te relataré los hechos como si hojeáramos un diario de campaña.
  </span>`);
});
