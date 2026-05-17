const API = 'https://modernfurnitures-backend.onrender.com/api';

// Login background slideshow
(function() {
  let idx = 0;
  const slides = document.querySelectorAll('.login-bg-slide');
  if (slides.length < 2) return;
  setInterval(() => {
    slides[idx].classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
  }, 4000);
})();
let allOrders = [];

function tok() { return sessionStorage.getItem('adminToken'); }

function initLayout() {
  const isMobile = window.innerWidth <= 900;
  const hamburger = document.querySelector('.hamburger-btn');
  const closeBtn  = document.querySelector('.sidebar-close-btn');
  const sidebar   = document.querySelector('.sidebar');
  const main      = document.querySelector('.main');
  if (isMobile) {
    hamburger.style.display = 'block';
    closeBtn.style.display  = 'block';
    main.style.marginLeft   = '0';
    if (!sidebar.classList.contains('open')) sidebar.style.transform = 'translateX(-100%)';
  } else {
    hamburger.style.display = 'none';
    closeBtn.style.display  = 'none';
    sidebar.style.transform = '';
    sidebar.classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
    main.style.marginLeft = '240px';
  }
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.transform = sidebar.classList.contains('open') ? 'translateX(0)' : 'translateX(-100%)';
}
function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.remove('open');
  sidebar.style.transform = 'translateX(-100%)';
  document.getElementById('sidebarOverlay').classList.remove('active');
}

window.addEventListener('resize', initLayout);

const EYE_OPEN   = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`;
const EYE_CLOSED = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>`;
function toggleEye(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; btn.innerHTML = EYE_CLOSED; }
  else { input.type = 'password'; btn.innerHTML = EYE_OPEN; }
}

function showSetup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('setupForm').style.display = 'block';
}
function showLogin() {
  document.getElementById('setupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

async function createNewAdmin() {
  const name  = document.getElementById('newAdminName').value.trim();
  const email = document.getElementById('newAdminEmail').value.trim();
  const pass  = document.getElementById('newAdminPass').value.trim();
  const msg   = document.getElementById('createAdminMsg');
  if (!email || !pass) { msg.style.color='#ef4444'; msg.innerText='Email and password required'; return; }
  msg.style.color='#64748b'; msg.innerText='Creating…';
  try {
    const res  = await fetch(API + '/admin/create', { method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+tok()}, body: JSON.stringify({ name, email, password: pass }) });
    const data = await res.json();
    if (res.ok) {
      msg.style.color='#22c55e'; msg.innerText=`✔ Admin created: ${data.email}`;
      document.getElementById('newAdminName').value = '';
      document.getElementById('newAdminEmail').value = '';
      document.getElementById('newAdminPass').value = '';
    } else { msg.style.color='#ef4444'; msg.innerText = data.error; }
  } catch { msg.style.color='#ef4444'; msg.innerText='Connection error'; }
}

async function doSetup() {
  const name  = document.getElementById('setupName').value.trim();
  const email = document.getElementById('setupEmail').value.trim();
  const pass  = document.getElementById('setupPass').value.trim();
  const msg   = document.getElementById('setupMsg');
  if (!email || !pass) { msg.style.color='#ef4444'; msg.innerText='Email and password required'; return; }
  msg.style.color='#64748b'; msg.innerText='Creating account…';
  try {
    const res  = await fetch(API + '/admin/setup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password: pass, name }) });
    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminEmail', data.email);
      sessionStorage.setItem('adminName', data.name);
      showApp();
    } else { msg.style.color='#ef4444'; msg.innerText = data.error || 'Setup failed ❌'; }
  } catch { msg.style.color='#ef4444'; msg.innerText='Cannot connect — make sure backend is running'; }
}

async function doLogin() {
  const email = document.getElementById('adminEmail').value.trim();
  const pass  = document.getElementById('adminPass').value;
  const msg   = document.getElementById('loginMsg');
  if (!email || !pass) { msg.innerText = 'Enter email and password'; return; }
  msg.style.color = '#64748b'; msg.innerText = 'Signing in…';
  try {
    const res  = await fetch(API + '/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password: pass }) });
    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminEmail', data.email);
      sessionStorage.setItem('adminName', data.name || 'Admin');
      showApp();
    } else { msg.style.color = '#ef4444'; msg.innerText = data.error || 'Invalid email or password ❌'; }
  } catch { msg.style.color = '#ef4444'; msg.innerText = 'Cannot connect — make sure backend is running'; }
}

function doLogout() {
  sessionStorage.removeItem('adminToken');
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminPass').value = '';
  document.getElementById('loginMsg').innerText = '';
}

window.addEventListener('DOMContentLoaded', () => { if (tok()) showApp(); });

function showApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  initLayout();
  const name  = sessionStorage.getItem('adminName') || 'Admin';
  const email = sessionStorage.getItem('adminEmail') || '';
  const el = document.getElementById('sidebarName');
  const em = document.getElementById('sidebarEmail');
  const av = document.getElementById('sidebarAvatar');
  if (el) el.innerText = name;
  if (em) em.innerText = email;
  if (av) av.innerText = name.slice(0,2).toUpperCase();
  loadStats(); loadOrders(); loadNewOrders(); startNewOrdersPolling();
}

const pageTitles = { dashboard:'Dashboard', orders:'Orders', users:'Users', neworders:'New Orders', update:'Update Orders', profile:'Profile' };

function goPage(name) {
  if (window.innerWidth <= 900) closeSidebar();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.textContent.trim().toLowerCase().startsWith(pageTitles[name].toLowerCase())) n.classList.add('active');
  });
  document.getElementById('pageTitle').innerText = pageTitles[name];
  if (name === 'users') loadUsers();
  if (name === 'neworders') loadNewOrders();
  if (name === 'profile') {
    const n = sessionStorage.getItem('adminName') || 'Admin';
    const e = sessionStorage.getItem('adminEmail') || '';
    const pn = document.getElementById('profileName');
    const pe = document.getElementById('profileEmail');
    const pa = document.getElementById('profileAvatar');
    if (pn) pn.innerText = n;
    if (pe) pe.innerText = e;
    if (pa) pa.innerText = n.slice(0,2).toUpperCase();
  }
}

async function loadStats() {
  try {
    const res = await fetch(API + '/admin/stats', { headers: { Authorization: 'Bearer ' + tok() } });
    if (res.status === 401) { doLogout(); return; }
    const d = await res.json();
    document.getElementById('st-orders').innerText  = d.totalOrders  ?? '—';
    document.getElementById('st-revenue').innerText = d.revenue ? 'QAR ' + Number(d.revenue).toLocaleString() : 'QAR 0';
    document.getElementById('st-users').innerText   = d.totalUsers   ?? '—';
    document.getElementById('st-pending').innerText = d.pending       ?? '—';
    if (d.pending > 0) {
      ['sidebarPending','sidebarPending2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.innerText = d.pending; el.style.display = 'inline-block'; }
      });
    }
  } catch {}
}

async function loadOrders() {
  const bodies = ['ordersBody', 'recentBody'];
  bodies.forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = '<tr class="tbl-empty"><td colspan="8">Loading…</td></tr>'; });
  try {
    const res = await fetch(API + '/admin/orders', { headers: { Authorization: 'Bearer ' + tok() } });
    if (res.status === 401) { doLogout(); return; }
    allOrders = await res.json();
    renderOrders(allOrders); renderRecent(allOrders.slice(0,6)); updateTabCounts(); renderUpdateCards();
  } catch {
    bodies.forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = '<tr class="tbl-empty"><td colspan="8">Cannot connect to backend</td></tr>'; });
  }
}

function renderOrders(list) {
  const tbody = document.getElementById('ordersBody');
  if (!list || !list.length) { tbody.innerHTML = '<tr class="tbl-empty"><td colspan="8">No orders yet.</td></tr>'; return; }
  tbody.innerHTML = list.map(o => orderRow(o, true)).join('');
}
function renderRecent(list) {
  const tbody = document.getElementById('recentBody');
  if (!list || !list.length) { tbody.innerHTML = '<tr class="tbl-empty"><td colspan="6">No orders yet.</td></tr>'; return; }
  tbody.innerHTML = list.map(o => orderRow(o, false)).join('');
}

function orderRow(o, showAction) {
  const info  = o.orderInfo || {};
  const name  = ((info.firstName||'') + ' ' + (info.lastName||'')).trim() || 'Guest';
  const email = info.email || o.userEmail || '—';
  const items = (o.items||[]).map(i => `${i.name} ×${i.qty}`).join(', ');
  const pay   = { card:'💳 Card', apple:'🍎 Apple Pay', cod:'💵 COD' }[info.payment] || info.payment || '—';
  const _d    = new Date(o.createdAt);
  const date  = _d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) + ' ' + _d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const id    = String(o._id).slice(-8).toUpperCase();
  const action = showAction ? `<select class="status-select" id="sel_${o._id}">${['pending','confirmed','shipped','delivered','cancelled'].map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${cap(s)}</option>`).join('')}</select><button class="btn-save" onclick="saveStatus('${o._id}')">Save</button>` : '';
  const payCol = showAction ? `<td>${pay}</td>` : '';
  const actionCol = showAction ? `<td>${action}</td>` : '';
  return `<tr>
    <td><span class="order-id">#${id}</span></td>
    <td><div class="cust-name">${esc(name)}</div><div class="cust-email">${esc(email)}</div></td>
    <td><div class="item-list">${esc(items)}</div></td>
    <td><span class="amount">QAR ${Number(o.total).toLocaleString()}</span></td>
    ${payCol}<td><span class="badge badge-${o.status}">${o.status}</span></td>
    <td><span class="date-cell">${date}</span></td>${actionCol}
  </tr>`;
}

async function saveStatus(id) {
  const sel = document.getElementById('sel_' + id);
  const btn = sel.nextElementSibling;
  btn.disabled = true; btn.innerText = '…';
  try {
    const res = await fetch(API + '/admin/orders/' + id, { method:'PATCH', headers:{'Content-Type':'application/json', Authorization:'Bearer '+tok()}, body: JSON.stringify({ status: sel.value }) });
    if (res.ok) {
      const updated = await res.json();
      const idx = allOrders.findIndex(o => o._id === id);
      if (idx !== -1) allOrders[idx].status = updated.status;
      filterOrders(); renderRecent(allOrders.slice(0,6)); updateTabCounts(); loadStats();
    } else { btn.disabled = false; btn.innerText = 'Save'; alert('Update failed.'); }
  } catch { btn.disabled = false; btn.innerText = 'Save'; alert('Server error.'); }
}

let activeTab = 'all';
function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  const titles = { all:'All Orders', pending:'Pending Orders', confirmed:'Confirmed Orders', shipped:'Shipped Orders', delivered:'Delivered Orders', cancelled:'Cancelled Orders' };
  document.getElementById('ordersTabTitle').innerText = titles[tab];
  filterOrders();
}
function updateTabCounts() {
  ['pending','confirmed','shipped','delivered','cancelled'].forEach(s => {
    const cnt = allOrders.filter(o => o.status === s).length;
    const el  = document.getElementById('cnt-' + s);
    if (el) { el.innerText = cnt; el.style.display = cnt ? 'inline-block' : 'none'; }
  });
}
function filterOrders() {
  let list = activeTab === 'all' ? allOrders : allOrders.filter(o => o.status === activeTab);
  list = filterText(document.getElementById('orderSearch').value, list);
  renderOrders(list);
}
function filterText(q, list) {
  if (!q.trim()) return list;
  const s = q.toLowerCase();
  return list.filter(o => {
    const info  = o.orderInfo || {};
    const name  = ((info.firstName||'') + ' ' + (info.lastName||'')).toLowerCase();
    const email = (info.email || o.userEmail || '').toLowerCase();
    return name.includes(s) || email.includes(s) || String(o._id).toLowerCase().includes(s);
  });
}

async function loadUsers() {
  const tbody = document.getElementById('usersBody');
  tbody.innerHTML = '<tr class="tbl-empty"><td colspan="4">Loading…</td></tr>';
  try {
    const [usersRes, ordersRes] = await Promise.all([
      fetch(API + '/admin/users',  { headers: { Authorization: 'Bearer ' + tok() } }),
      fetch(API + '/admin/orders', { headers: { Authorization: 'Bearer ' + tok() } }),
    ]);
    if (usersRes.status === 401) { doLogout(); return; }
    if (!usersRes.ok) { tbody.innerHTML = `<tr class="tbl-empty"><td colspan="4">⚠️ Users route not found (${usersRes.status})</td></tr>`; return; }
    const users  = await usersRes.json();
    const orders = ordersRes.ok ? await ordersRes.json() : [];
    if (!Array.isArray(users)) { tbody.innerHTML = `<tr class="tbl-empty"><td colspan="4">⚠️ ${users.error || 'Backend error'}</td></tr>`; return; }
    if (!users.length) { tbody.innerHTML = '<tr class="tbl-empty"><td colspan="4">No registered users yet.</td></tr>'; return; }
    const orderCount = {};
    orders.forEach(o => { const email = (o.orderInfo?.email || o.userEmail || '').toLowerCase(); if (email) orderCount[email] = (orderCount[email] || 0) + 1; });
    tbody.innerHTML = users.map(u => {
      const letter = u.email[0].toUpperCase();
      const date   = new Date(u.createdAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
      const count  = orderCount[u.email.toLowerCase()] || 0;
      return `<tr>
        <td><div class="user-cell"><div class="user-avatar">${letter}</div><span style="color:#f1f5f9;font-weight:600">${esc(u.email.split('@')[0])}</span></div></td>
        <td style="color:#94a3b8">${esc(u.email)}</td>
        <td><span class="date-cell">${date}</span></td>
        <td>${count > 0 ? `<span class="badge badge-confirmed">${count} order${count!==1?'s':''}</span>` : `<span class="badge badge-cancelled">No orders</span>`}</td>
      </tr>`;
    }).join('');
  } catch { tbody.innerHTML = `<tr class="tbl-empty"><td colspan="4">Cannot connect to backend.</td></tr>`; }
}

let knownOrderIds = new Set();
let newOrdersTimer = null;

async function loadNewOrders() {
  try {
    const res = await fetch(API + '/admin/orders', { headers: { Authorization: 'Bearer ' + tok() } });
    if (res.status === 401) { doLogout(); return; }
    const orders = await res.json();
    const fresh = new Set();
    orders.forEach(o => { if (!knownOrderIds.has(o._id)) fresh.add(o._id); });
    orders.forEach(o => knownOrderIds.add(o._id));
    allOrders = orders; updateTabCounts(); renderUpdateCards();
    const pending = orders.filter(o => o.status === 'pending');
    const badge = document.getElementById('newOrdersBadge');
    if (badge) { badge.innerText = pending.length; badge.style.display = pending.length ? 'inline-block' : 'none'; }
    const grid = document.getElementById('newOrdersGrid');
    if (!pending.length) {
      grid.innerHTML = `<div style="text-align:center;padding:60px 20px;"><div style="font-size:48px;margin-bottom:12px;">✅</div><div style="color:#64748b;font-size:15px;">No pending orders right now.</div></div>`;
      return;
    }
    grid.innerHTML = pending.map(o => {
      const info  = o.orderInfo || {};
      const name  = ((info.firstName||'') + ' ' + (info.lastName||'')).trim() || 'Guest';
      const email = info.email || o.userEmail || '—';
      const phone = info.phone || '—';
      const addr  = [info.street, info.city, info.country].filter(Boolean).join(', ');
      const items = (o.items||[]).map(i => `${i.name} × ${i.qty} — QAR ${(i.price*i.qty).toLocaleString()}`).join('\n');
      const pay   = { card:'💳 Card', apple:'🍎 Apple Pay', cod:'💵 Cash on Delivery' }[info.payment] || info.payment || '—';
      const date  = new Date(o.createdAt).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
      const isFresh = fresh.has(o._id) && knownOrderIds.size > pending.length;
      return `<div class="new-order-card ${isFresh?'fresh':''}" id="nocard_${o._id}">
        <div class="no-top">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="no-badge">NEW ORDER</span><span style="font-size:11px;color:#475569;">${date}</span></div>
            <div class="no-name">${esc(name)}</div>
            <div class="no-meta">✉️ ${esc(email)} &nbsp;|&nbsp; 📞 ${esc(phone)}</div>
            ${addr ? `<div class="no-meta">📍 ${esc(addr)}</div>` : ''}
          </div>
          <div style="text-align:right;"><div class="no-total">QAR ${Number(o.total).toLocaleString()}</div><div style="font-size:11px;color:#64748b;margin-top:2px;">${pay}</div></div>
        </div>
        <div class="no-items">${items.split('\n').map(l=>`<div>📦 ${esc(l)}</div>`).join('')}</div>
        <div class="no-actions">
          <button class="btn-confirm" onclick="quickConfirm('${o._id}','confirmed')">✅ Confirm Order</button>
          <button class="btn-confirm" style="background:#7c3aed;" onclick="quickConfirm('${o._id}','shipped')">🚚 Mark Shipped</button>
          <button class="btn-cancel" onclick="quickConfirm('${o._id}','cancelled')">❌ Cancel</button>
        </div>
      </div>`;
    }).join('');
  } catch { document.getElementById('newOrdersGrid').innerHTML = '<div style="text-align:center;padding:48px;color:#475569;">Cannot connect — is backend running?</div>'; }
}

async function quickConfirm(orderId, status) {
  try {
    const res = await fetch(API + '/admin/orders/' + orderId, { method:'PATCH', headers:{'Content-Type':'application/json', Authorization:'Bearer '+tok()}, body: JSON.stringify({ status }) });
    if (res.ok) { loadNewOrders(); loadStats(); }
  } catch {}
}

function startNewOrdersPolling() {
  if (newOrdersTimer) clearInterval(newOrdersTimer);
  newOrdersTimer = setInterval(() => { loadNewOrders(); const el = document.getElementById('noLiveText'); if (el) el.innerText = 'Auto-refreshing every 30s'; }, 30000);
}

function renderUpdateCards() {
  const grid = document.getElementById('updateGrid');
  if (!allOrders.length) { grid.innerHTML = '<div style="text-align:center;padding:48px;color:#475569;">No orders yet.</div>'; return; }
  const statuses = ['pending','confirmed','shipped','delivered','cancelled'];
  const icons    = { pending:'⏳', confirmed:'✅', shipped:'🚚', delivered:'📦', cancelled:'❌' };
  grid.innerHTML = allOrders.map(o => {
    const info  = o.orderInfo || {};
    const name  = ((info.firstName||'') + ' ' + (info.lastName||'')).trim() || 'Guest';
    const email = info.email || o.userEmail || '—';
    const items = (o.items||[]).map(i => `${i.name} ×${i.qty}`).join(', ');
    const _d2   = new Date(o.createdAt);
    const date  = _d2.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) + ' ' + _d2.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    const id    = String(o._id).slice(-8).toUpperCase();
    const btns  = statuses.map(s => `<button class="status-btn ${o.status===s?'current '+s:''}" id="ubtn_${o._id}_${s}" onclick="quickUpdate('${o._id}','${s}')">${icons[s]} ${s.charAt(0).toUpperCase()+s.slice(1)}</button>`).join('');
    return `<div class="update-card" id="ucard_${o._id}">
      <div class="update-card-top">
        <div class="update-card-info">
          <div class="uc-name">${esc(name)} <span style="font-size:11px;color:#475569;font-weight:400">#${id}</span></div>
          <div class="uc-meta">${esc(email)}</div>
          <div class="uc-items">${esc(items)}</div>
        </div>
        <div class="update-card-right">
          <div class="uc-total">QAR ${Number(o.total).toLocaleString()}</div>
          <div class="uc-date">${date}</div>
        </div>
      </div>
      <div class="status-btns">${btns}</div>
    </div>`;
  }).join('');
}

async function quickUpdate(orderId, status) {
  const statuses = ['pending','confirmed','shipped','delivered','cancelled'];
  statuses.forEach(s => { const btn = document.getElementById(`ubtn_${orderId}_${s}`); if (btn) { btn.classList.add('saving'); btn.disabled = true; } });
  try {
    const res = await fetch(API + '/admin/orders/' + orderId, { method:'PATCH', headers:{'Content-Type':'application/json', Authorization:'Bearer '+tok()}, body: JSON.stringify({ status }) });
    if (res.ok) {
      const updated = await res.json();
      const idx = allOrders.findIndex(o => o._id === orderId);
      if (idx !== -1) allOrders[idx].status = updated.status;
      renderUpdateCards(); updateTabCounts(); loadStats();
    }
  } catch { statuses.forEach(s => { const btn = document.getElementById(`ubtn_${orderId}_${s}`); if (btn) { btn.classList.remove('saving'); btn.disabled = false; } }); }
}

async function clearOrders() {
  const msg = document.getElementById('dangerMsg');
  if (!confirm('Delete ALL orders permanently? This cannot be undone.')) return;
  msg.style.color = '#64748b'; msg.innerText = 'Clearing orders…';
  try {
    const res = await fetch(API + '/admin/orders/all', { method: 'DELETE', headers: { Authorization: 'Bearer ' + tok() } });
    if (res.ok) {
      allOrders = []; renderOrders([]); renderRecent([]); updateTabCounts(); renderUpdateCards(); loadStats();
      msg.style.color = '#22c55e'; msg.innerText = '✔ All orders deleted.';
    } else { const d = await res.json(); msg.style.color = '#ef4444'; msg.innerText = d.error || 'Failed to clear orders.'; }
  } catch { msg.style.color = '#ef4444'; msg.innerText = 'Connection error.'; }
}

async function clearUsers() {
  const msg = document.getElementById('dangerMsg');
  if (!confirm('Delete ALL registered users permanently? This cannot be undone.')) return;
  msg.style.color = '#64748b'; msg.innerText = 'Clearing users…';
  try {
    const res = await fetch(API + '/admin/users/all', { method: 'DELETE', headers: { Authorization: 'Bearer ' + tok() } });
    if (res.ok) {
      loadStats();
      msg.style.color = '#22c55e'; msg.innerText = '✔ All users deleted.';
    } else { const d = await res.json(); msg.style.color = '#ef4444'; msg.innerText = d.error || 'Failed to clear users.'; }
  } catch { msg.style.color = '#ef4444'; msg.innerText = 'Connection error.'; }
}

async function clearAllData() {
  const msg = document.getElementById('dangerMsg');
  if (!confirm('Delete ALL orders AND ALL users permanently?\n\nThis will wipe the entire store database. This cannot be undone.')) return;
  if (!confirm('Are you absolutely sure? Type OK to confirm.\n\nPress OK to proceed.')) return;
  msg.style.color = '#64748b'; msg.innerText = 'Clearing all data…';
  try {
    const [r1, r2] = await Promise.all([
      fetch(API + '/admin/orders/all', { method: 'DELETE', headers: { Authorization: 'Bearer ' + tok() } }),
      fetch(API + '/admin/users/all',  { method: 'DELETE', headers: { Authorization: 'Bearer ' + tok() } }),
    ]);
    if (r1.ok && r2.ok) {
      allOrders = []; renderOrders([]); renderRecent([]); updateTabCounts(); renderUpdateCards(); loadStats();
      msg.style.color = '#22c55e'; msg.innerText = '✔ All store data cleared.';
    } else { msg.style.color = '#ef4444'; msg.innerText = 'One or more operations failed.'; }
  } catch { msg.style.color = '#ef4444'; msg.innerText = 'Connection error.'; }
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
