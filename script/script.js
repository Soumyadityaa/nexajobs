// 1. PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('script/sw.js').catch(err => console.log('SW Reg failed:', err));
  });
}

// 2. Dark Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark' && toggleSwitch) toggleSwitch.checked = true;
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }    
}
if(toggleSwitch) toggleSwitch.addEventListener('change', switchTheme);


// 3. Scroll Reveal Animations
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll('.reveal');
  const revealRows = document.querySelectorAll('.reveal-row');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

  revealElements.forEach(el => observer.observe(el));
  revealRows.forEach(el => observer.observe(el));
});


// 4. Voice Search API
function startVoiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Voice search is not supported in this browser.");
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('searchInput').value = transcript;
    currentPage = 1;
    applyFilter();
    fireToast("Voice recognized: " + transcript);
  };
}


// 5. Simulated AI Match Score
function calculateAIMatch() {
  const input = document.getElementById('aiResumeInput').value.toLowerCase();
  const skills = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
  if(skills.length === 0) return alert("Please enter skills separated by commas");

  const rows = document.querySelectorAll('#job-table-body tr');
  rows.forEach(row => {
    if(row.id === 'noResultsRow') return;
    const jobText = row.innerText.toLowerCase();
    let matches = 0;
    skills.forEach(skill => { if (jobText.includes(skill)) matches++; });

    const percent = Math.min(Math.round((matches / skills.length) * 100), 100);
    const fillBar = row.querySelector('.ai-match-fill');
    const label = row.querySelector('.ai-match-label');
    
    if (fillBar && label) {
      fillBar.style.width = percent + '%';
      label.textContent = percent + '% Match';
      if (percent >= 80) fillBar.style.backgroundColor = '#2e7d32'; 
      else if (percent >= 50) fillBar.style.backgroundColor = '#fbc02d'; 
      else fillBar.style.backgroundColor = 'var(--accent)'; 
    }
  });
  fireToast("AI Analysis Complete!");
}


// 6. Live Toast Notification System
const mockEvents = [
  "Candidate applied for Administrative Clerk",
  "New Role Posted: Marketing Manager",
  "TechSynergy is actively reviewing applications",
  "A recruiter recently viewed your profile."
];

function fireToast(customMsg = null) {
  const container = document.getElementById('toast-container');
  if(!container) return;

  const msg = customMsg || mockEvents[Math.floor(Math.random() * mockEvents.length)];
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
setInterval(() => fireToast(), 25000);


// 7. Job Database & Storage
const jobDatabase = {
  'job-1': { org: 'GlobalFinance Bank', title: 'Financial Analyst' },
  'job-2': { org: 'National Transit Auth', title: 'Logistics Coordinator' },
  'job-3': { org: 'TechSynergy Solutions', title: 'Software Developer' },
  'job-4': { org: 'Central Staffing', title: 'Administrative Clerk' },
  'job-5': { org: 'DevStudio Agency', title: 'Web Dev Intern' },
  'job-6': { org: 'Global Reach Media', title: 'Marketing Manager' },
  'job-7': { org: 'DataCore Systems', title: 'Data Scientist' },
  'job-8': { org: 'Enterprise HR Group', title: 'HR Specialist' },
  'job-9': { org: 'Prime Freight Co.', title: 'Operations Associate' },
  'job-10': { org: 'Alpha Investments', title: 'Quantitative Analyst' },
  'job-11': { org: 'CloudScale Networks', title: 'DevOps Engineer' },
  'job-12': { org: 'Vanguard Brands', title: 'SEO Content Writer' },
  'job-13': { org: 'Apex Capital', title: 'Tax Consultant' },
  'job-14': { org: 'Metro Health Trust', title: 'Medical Receptionist' },
  'job-15': { org: 'CyberShield Labs', title: 'Security Analyst' },
  'job-16': { org: 'Swift Cargo Express', title: 'Fleet Supervisor' },
  'job-17': { org: 'BrandPulse Agency', title: 'UI/UX Designer' },
  'job-18': { org: 'PixelCraft Studio', title: 'Frontend Developer' },
  'job-19': { org: 'Sterling Credit', title: 'Loan Officer' },
  'job-20': { org: 'Apex Legal Partners', title: 'Legal Intern' },
  'job-21': { org: 'CloudNative Inc.', title: 'Cloud Architect' },
  'job-22': { org: 'OmniChannel Retail', title: 'Social Media Strategist' },
  'job-23': { org: 'VentureHorizon Capital', title: 'Investment Associate' },
  'job-24': { org: 'Global Port Logistics', title: 'Warehouse Planner' },
  'job-25': { org: 'InnoTech Systems', title: 'QA Automation Engineer' },
  'job-26': { org: 'Civic Municipal Board', title: 'Public Relations Officer' },
  'job-27': { org: 'NextGen Ads', title: 'PPC Campaign Specialist' },
  'job-28': { org: 'Quantum AI Labs', title: 'Machine Learning Engineer' },
  'job-29': { org: 'Pioneer Auditing', title: 'Junior Auditor' },
  'job-30': { org: 'TransContinental Freight', title: 'Supply Chain Analyst' }
};

// Merge externally created jobs
let customJobs = JSON.parse(localStorage.getItem('nexaCustomJobs')) || {};
Object.assign(jobDatabase, customJobs);

let savedMap = JSON.parse(localStorage.getItem('nexaJobsMap')) || {};
let showingOnlySaved = false;

document.addEventListener("DOMContentLoaded", () => {
  const saveButtons = document.querySelectorAll('.btn-save');
  saveButtons.forEach(btn => {
    const match = btn.getAttribute('onclick').match(/'([^']+)'/);
    if(match && savedMap[match[1]]) {
      btn.textContent = 'Saved';
      btn.classList.add('active');
    }
  });

  if (document.querySelector('.kanban-board')) renderKanban();
  if (typeof applyFilter === 'function' && document.getElementById('job-table-body')) applyFilter();
});

function toggleSave(jobId, btn) {
  if (savedMap[jobId]) {
    delete savedMap[jobId];
    btn.textContent = 'Save';
    btn.classList.remove('active');
  } else {
    savedMap[jobId] = 'saved';
    btn.textContent = 'Saved';
    btn.classList.add('active');
    fireToast("Job Saved Successfully.");
  }
  localStorage.setItem('nexaJobsMap', JSON.stringify(savedMap));
  if(showingOnlySaved) applyFilter();
}

function toggleSavedJobs(event) {
  event.preventDefault();
  showingOnlySaved = !showingOnlySaved;
  const toggleBtn = document.getElementById('savedJobsToggle');
  currentPage = 1;
  
  if (showingOnlySaved) {
    toggleBtn.style.color = 'var(--secondary)';
    document.getElementById('tableHeader').textContent = 'Your Saved Jobs';
  } else {
    toggleBtn.style.color = '#ffffff';
    document.getElementById('tableHeader').textContent = 'Latest Active Job Notifications';
  }
  applyFilter();
}


// 8. Advanced Kanban Features (Modals & Deletion)
function renderKanban() {
  const savedContainer = document.getElementById('cards-saved');
  const appliedContainer = document.getElementById('cards-applied');
  const interviewingContainer = document.getElementById('cards-interviewing');
  
  if(savedContainer) savedContainer.innerHTML = '';
  if(appliedContainer) appliedContainer.innerHTML = '';
  if(interviewingContainer) interviewingContainer.innerHTML = '';

  let counts = { saved: 0, applied: 0, interviewing: 0 };

  Object.keys(savedMap).forEach(jobId => {
    const status = savedMap[jobId]; 
    const jobData = jobDatabase[jobId] || { org: 'Partner Organization', title: 'Position Reference: ' + jobId };
    
    counts[status] = (counts[status] || 0) + 1;

    const card = document.createElement('div');
    card.className = 'kanban-card animate-up';
    card.setAttribute('draggable', 'true');
    card.setAttribute('id', jobId);
    card.ondragstart = drag;
    card.ondragend = dragEnd;
    
    card.innerHTML = `
      <button class="delete-card-btn" onclick="removeJobFromKanban('${jobId}')" title="Remove Application">&times;</button>
      <h4>${jobData.title}</h4>
      <p>${jobData.org}</p>
    `;
    
    const container = document.getElementById(`cards-${status}`);
    if(container) container.appendChild(card);
  });

  if(document.getElementById('count-saved')) document.getElementById('count-saved').textContent = counts.saved;
  if(document.getElementById('count-applied')) document.getElementById('count-applied').textContent = counts.applied;
  if(document.getElementById('count-interviewing')) document.getElementById('count-interviewing').textContent = counts.interviewing;
}

function removeJobFromKanban(jobId) {
  if(confirm("Are you sure you want to remove this application from the tracker?")) {
    delete savedMap[jobId];
    localStorage.setItem('nexaJobsMap', JSON.stringify(savedMap));
    renderKanban();
    fireToast("Application removed.");
  }
}

// Modal Logic for adding external jobs
function openCustomJobModal() { document.getElementById('customJobModal').style.display = 'flex'; }
function closeCustomJobModal() { document.getElementById('customJobModal').style.display = 'none'; }

function handleCustomJobSubmit(e) {
  e.preventDefault();
  const org = document.getElementById('customOrg').value;
  const title = document.getElementById('customTitle').value;
  const customId = 'custom-' + Date.now();

  customJobs[customId] = { org: org, title: title };
  localStorage.setItem('nexaCustomJobs', JSON.stringify(customJobs));
  Object.assign(jobDatabase, customJobs);

  savedMap[customId] = 'saved';
  localStorage.setItem('nexaJobsMap', JSON.stringify(savedMap));

  closeCustomJobModal();
  e.target.reset();
  renderKanban();
  fireToast("External application successfully added!");
}

let draggedElementId = null;
function drag(event) { draggedElementId = event.target.id; event.target.classList.add('dragging'); }
function dragEnd(event) { event.target.classList.remove('dragging'); }
function allowDrop(event) { event.preventDefault(); }
function drop(event, newStatus) {
  event.preventDefault();
  if (draggedElementId) {
    savedMap[draggedElementId] = newStatus;
    localStorage.setItem('nexaJobsMap', JSON.stringify(savedMap));
    renderKanban();
    fireToast(`Application status updated to ${newStatus.toUpperCase()}`);
  }
}

// 9. Pagination & Filters
let currentPage = 1;
const rowsPerPage = 10;

function applyFilter() {
  const searchInput = document.getElementById('searchInput');
  if(!searchInput) return; 
  
  const searchVal = searchInput.value.toLowerCase().trim();
  const selectedCategory = document.getElementById('categorySelect').value;
  const minSalary = document.getElementById('salaryFilter') ? parseInt(document.getElementById('salaryFilter').value) : 0;
  
  const typeCheckboxes = Array.from(document.querySelectorAll('.type-filter:checked')).map(cb => cb.value);
  const expRadio = document.querySelector('input[name="expFilter"]:checked') ? document.querySelector('input[name="expFilter"]:checked').value : 'all';

  const rows = Array.from(document.querySelectorAll('#job-table-body tr:not(#noResultsRow)'));
  const noResultsRow = document.getElementById('noResultsRow');

  const matchedRows = rows.filter(row => {
    const rId = row.getAttribute('data-id');
    const text = row.innerText.toLowerCase();
    const rCat = row.getAttribute('data-category');
    const rSal = parseInt(row.getAttribute('data-salary') || 0);
    const rType = row.getAttribute('data-type');
    const rExp = row.getAttribute('data-exp');

    const matchSearch = text.includes(searchVal);
    const matchCategory = selectedCategory === "" || rCat === selectedCategory;
    const matchSalary = rSal >= minSalary;
    const matchType = typeCheckboxes.length === 0 || typeCheckboxes.includes(rType);
    const matchExp = expRadio === "all" || rExp === expRadio;
    const matchSaved = showingOnlySaved ? savedMap[rId] : true;

    return matchSearch && matchCategory && matchSalary && matchType && matchExp && matchSaved;
  });

  rows.forEach(r => r.style.display = 'none');

  const totalPages = Math.ceil(matchedRows.length / rowsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const currentRows = matchedRows.slice(start, end);

  currentRows.forEach(r => {
    r.style.display = '';
    r.style.animation = 'fadeIn 0.4s ease';
  });

  if (noResultsRow) {
    noResultsRow.style.display = matchedRows.length === 0 ? 'table-row' : 'none';
  }
  renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
  const container = document.getElementById('paginationContainer');
  if (!container) return;
  container.innerHTML = '';
  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.innerHTML = '&#10094;';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; applyFilter(); } };
  container.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      const btn = document.createElement('button');
      btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.onclick = (function(page) { return function() { currentPage = page; applyFilter(); }; })(i);
      container.appendChild(btn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const ellipsis = document.createElement('span');
      ellipsis.className = 'page-ellipsis';
      ellipsis.textContent = '...';
      container.appendChild(ellipsis);
    }
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.innerHTML = '&#10095;';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; applyFilter(); } };
  container.appendChild(nextBtn);
}

// 10. Utils
function shareJob(title, url) {
  if (navigator.share) navigator.share({ title: title, url: url }).catch(console.error);
  else alert("Copy link: " + url);
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('active');
  document.getElementById('mobile-menu').classList.toggle('open');
}

function toggleAdvancedFilters() {
  const f = document.getElementById('advancedFilters');
  if(f) f.style.display = f.style.display === 'none' ? 'flex' : 'none';
}
function updateSalaryLabel() {
  const el = document.getElementById('salaryValue');
  if(el) el.textContent = `₹${document.getElementById('salaryFilter').value} LPA+`;
}

// Forms
function handleContactSubmit(e) {
  e.preventDefault();
  const fb = document.getElementById('formFeedback');
  if(fb) { fb.style.display = 'block'; e.target.reset(); setTimeout(() => fb.style.display='none', 4000); }
}

function handleSubscribeSubmit(e) {
  e.preventDefault();
  const fb = document.getElementById('subscribeFeedback');
  if(fb) { fb.style.display = 'block'; e.target.reset(); setTimeout(() => fb.style.display='none', 4000); }
}

// 11. Salary Calc
const salaryData = {
  "developer": { base: 400000, perYear: 150000 }, "analyst": { base: 350000, perYear: 120000 },
  "admin": { base: 250000, perYear: 60000 }, "finance": { base: 300000, perYear: 100000 },
  "marketing": { base: 300000, perYear: 90000 }
};

let salaryCounterInterval;
function calculateSalary() {
  const role = document.getElementById('calcRole').value;
  const exp = parseInt(document.getElementById('calcExp').value);
  if (!salaryData[role]) return;
  
  const targetSalary = salaryData[role].base + (salaryData[role].perYear * exp);
  const resultContainer = document.getElementById('salaryResultContainer');
  const resultText = document.getElementById('salaryResult');
  
  resultContainer.style.display = 'block';
  
  let currentVal = 0;
  const increment = targetSalary / (1000 / 16);
  
  clearInterval(salaryCounterInterval);
  salaryCounterInterval = setInterval(() => {
    currentVal += increment;
    if (currentVal >= targetSalary) {
      currentVal = targetSalary;
      clearInterval(salaryCounterInterval);
    }
    resultText.textContent = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentVal);
  }, 16);
}