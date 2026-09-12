document.querySelectorAll('[data-wheel]').forEach(button => button.addEventListener('click', () => {
  const image = document.getElementById('hero-wheel');
  image.src = button.dataset.wheel; image.alt = button.dataset.alt;
  document.querySelectorAll('[data-wheel]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
}));
document.getElementById('faq-search').addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase(); let count = 0;
  document.querySelectorAll('.faq-list details').forEach(item => { item.hidden = !item.textContent.toLowerCase().includes(query); if (!item.hidden) count++; if (query && !item.hidden) item.open = true; });
  document.getElementById('faq-count').textContent = query ? `${count} matching question${count === 1 ? '' : 's'}` : '';
  document.getElementById('faq-empty').hidden = count !== 0;
});
const photoDialog = document.getElementById('photo-dialog'); let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => { photoTrigger = button; document.getElementById('dialog-image').src = button.dataset.photo; document.getElementById('dialog-image').alt = button.dataset.caption; document.getElementById('dialog-caption').textContent = button.dataset.caption; photoDialog.showModal(); }));
document.getElementById('close-photo').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
photoDialog.addEventListener('close', () => photoTrigger?.focus());
