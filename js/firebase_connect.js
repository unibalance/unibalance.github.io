// Public endpoint. Deploy database.rules.json to enforce privacy on Firebase.
// REST POST creates a push ID without downloading existing responses.
(() => {
  const endpoint = 'https://unibalance-india-enquiries.firebaseio.com/messages.json';
  const form = document.getElementById('interest-form'), button = document.getElementById('submit-btn'), status = document.getElementById('form-status');
  let pending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (pending || !form.reportValidity()) return;
    const value = id => document.getElementById(id).value.trim();
    const payload = { name: value('user-name'), email: value('user-email'), subject: value('user-tel'), city: value('user-city'), message: value('user-message'), consent: document.getElementById('consent').checked, createdAt: { '.sv': 'timestamp' }, source: 'unibalance-interest-v2' };
    if (!payload.name || !payload.email || !payload.consent) { status.textContent = 'Please enter your name and email, and agree to be contacted.'; status.className = 'form-status error'; return; }
    pending = true; button.disabled = true; button.textContent = 'Registering…'; status.className = 'form-status'; status.textContent = 'Sending your interest…';
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
      if (!response.ok) throw new Error('Submission rejected');
      const result = await response.json(); if (!result.name) throw new Error('Missing confirmation');
      form.reset(); status.textContent = 'You’re on the list. Thank you! We’ll be in touch if there’s a next chapter.';
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = error.name === 'AbortError' ? 'We couldn’t confirm whether your entry arrived. Your details are still here; you can retry, but it may create a duplicate.' : 'We couldn’t confirm your registration. Please check your connection and try again. Your details are still here.';
    } finally { clearTimeout(timeout); pending = false; button.disabled = false; button.textContent = 'Register my interest ↗'; }
  });
})();
