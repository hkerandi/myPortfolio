// === Data Diva interactions ===
(function () {
  const grid = document.getElementById('dd-grid');
  if (!grid) return;

  const search = document.getElementById('dd-search');
  const filter = document.getElementById('dd-filter');
  const tiles = Array.from(grid.querySelectorAll('.dd-tile'));

  const modal = document.getElementById('dd-modal');
  const closeBtn = document.getElementById('dd-close');
  const mImg = document.getElementById('m-img');
  const mTitle = document.getElementById('m-title');
  const mDesc = document.getElementById('m-desc');
  const mChips = document.getElementById('m-chips');
  const mOpen = document.getElementById('m-open');
  const mRepo = document.getElementById('m-repo');

  function matches(tile) {
    const q = (search.value || '').toLowerCase().trim();
    const cat = filter.value;
    const tags = (tile.dataset.tags || '').toLowerCase();
    const title = tile.querySelector('h3').textContent.toLowerCase();
    const desc = tile.querySelector('p').textContent.toLowerCase();
    const inCat = cat === 'All' || tile.dataset.category === cat;
    const inQuery = !q || tags.includes(q) || title.includes(q) || desc.includes(q);
    return inCat && inQuery;
  }

  function render() {
    tiles.forEach(t => {
      t.style.display = matches(t) ? '' : 'none';
    });
  }

  search.addEventListener('input', render);
  filter.addEventListener('change', render);
  render();

  tiles.forEach(t => {
    // Click opens modal
    t.addEventListener('click', (e) => {
      // Avoid stealing double click
      if (e.detail > 1) return;
      const img = t.querySelector('img');
      const title = t.querySelector('h3').textContent;
      const desc = t.querySelector('p').textContent;
      const chips = Array.from(t.querySelectorAll('.dd-chips span')).map(s => s.textContent);
      mImg.src = img.src; mImg.alt = img.alt;
      mTitle.textContent = title;
      mDesc.textContent = desc;
      mChips.innerHTML = chips.map(c => `<span>${c}</span>`).join('');
      mOpen.href = t.dataset.link || '#';
      if (t.dataset.repo) {
        mRepo.href = t.dataset.repo;
        mRepo.style.display = '';
      } else {
        mRepo.style.display = 'none';
      }
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    });

    // Double-click jumps (portal/case study)
    t.addEventListener('dblclick', () => {
      const link = t.dataset.link;
      if (link) window.location.href = link;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeBtn.click();
  });
})();

