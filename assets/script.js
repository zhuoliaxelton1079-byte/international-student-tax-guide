
// ===== TAXSLAYER SCREENSHOT STEPS =====
const taxslayerSteps = [
  {
    id: 'slide23',
    title: 'Step 1: Get Started — Visit UWGB VITA',
    url: 'https://www.uwgb.edu/vita/',
    caption: 'How to Get Started',
    description: 'Go to uwgb.edu/vita and register for the VITA program. You will receive an email with a unique URL to access TaxSlayer FSA for free. Click the "Self-Filing" option. Your AGI must be under $84,000 to be eligible.',
    isSlide: true
  },
  {
    id: 'slide24',
    title: 'Step 2: Choose Filing Status — Nonresident Alien',
    url: 'taxslayer.com/pro',
    caption: 'Selecting the Correct Filing Status',
    description: 'On the "What\'s your filing status?" page, select "Nonresident Alien" — the last option in the list. This is critical! Selecting any other status will generate the wrong form (1040 instead of 1040-NR). Then click "CONTINUE."',
    isSlide: true
  },
  {
    id: 'slide25',
    title: 'Step 3: Enter Form 8843',
    url: 'taxslayer.com/pro',
    caption: 'Federal → Miscellaneous Forms → Form 8843',
    description: 'Navigate to Federal → Miscellaneous Forms → Form 8843. Enter your visa type, date of first entry, passport number, days in the U.S., and your school\'s information from your I-20 or DS-2019. When using TaxSlayer FSA, Form 8843 is e-filed with your return — no need to mail it separately.',
    isSlide: true
  },
  {
    id: 'slide26',
    title: 'Step 4: Complete Schedule OI',
    url: 'taxslayer.com/pro',
    caption: 'Basic Information → Schedule OI',
    description: 'Navigate to Basic Information → Schedule OI. Complete: Items A & B (countries of citizenship and residence), Item E (U.S. visa type), Items G & H (entry/exit dates and days present over 3 years), and Item L (tax treaty exemption, if applicable). Check your travel history at i94.cbp.dhs.gov.',
    isSlide: true
  },
  {
    id: 'slide27',
    title: 'Step 5: Add Wisconsin State Return',
    url: 'taxslayer.com/pro',
    caption: 'Adding the Wisconsin State Return',
    description: 'After completing your federal return, select "Add State Return" and choose "Wisconsin." TaxSlayer will automatically generate Form 1NPR. Do NOT select Wisconsin Form 1 (the resident return).',
    isSlide: true
  },
  {
    id: 'slide28',
    title: 'Step 6: Confirm Wisconsin Nonresident Status',
    url: 'taxslayer.com/pro',
    caption: 'Basic Information — Confirm Nonresident Alien Status for Wisconsin',
    description: 'In the Wisconsin Basic Information section, confirm your nonresident alien status. Select "Nonresident of Wisconsin." Even if you lived in Wisconsin all year, international students are always treated as Wisconsin nonresidents because they cannot become domiciled in Wisconsin.',
    isSlide: true
  },
  {
    id: 'slide29',
    title: 'Step 7: Wisconsin Treaty Wages Adjustment',
    url: 'taxslayer.com/pro',
    caption: 'Wisconsin Wages Adjustment for Treaty Benefits',
    description: 'If you have treaty-exempt wages, you may need to manually adjust the Wisconsin wages by entering a negative amount to exclude treaty-exempt income. Note: The US-India treaty does NOT apply to Wisconsin wages. The software may not automatically adjust for treaty benefits.',
    isSlide: true
  },
  {
    id: 'slide30',
    title: 'Step 8: After E-Filing',
    url: 'taxslayer.com/pro',
    caption: 'What Happens After You E-File',
    description: 'After e-filing, you will receive a notice that the IRS accepted or rejected your return. Acceptance means it passed basic checks (name/SSN match, math correct) — it does NOT mean the IRS agrees your return is correct. The IRS may still review your return for up to 3 years.',
    isSlide: true
  }
];

let currentSSStep = 0;

function buildScreenshotViewer() {
  const tabsContainer = document.getElementById('ssTabsContainer');
  const panelsContainer = document.getElementById('ssPanelsContainer');
  if (!tabsContainer || !panelsContainer) return;

  taxslayerSteps.forEach((step, i) => {
    // Tab
    const tab = document.createElement('button');
    tab.className = 'screenshot-tab' + (i === 0 ? ' active' : '');
    tab.textContent = `Step ${i+1}`;
    tab.onclick = () => goToSSStep(i);
    tabsContainer.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'screenshot-panel' + (i === 0 ? ' active' : '');
    panel.id = `ss-panel-${i}`;

    const imgSrc = SLIDES[step.id] || '';
    panel.innerHTML = `
      <div class="screenshot-frame">
        <div class="screenshot-titlebar">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
          <div class="screenshot-url">${step.url}</div>
        </div>
        ${imgSrc ? `<img src="${imgSrc}" class="screenshot-img" alt="${step.title}" loading="lazy">` : `<div style="background:#2d2d3f;padding:40px;text-align:center;color:#a0a0c0;font-size:14px;">Screenshot: ${step.title}</div>`}
      </div>
      <div class="screenshot-caption">
        <strong>${step.title}</strong>
        ${step.description}
      </div>
    `;
    panelsContainer.appendChild(panel);
  });

  updateSSNav();
}

function goToSSStep(i) {
  const tabs = document.querySelectorAll('.screenshot-tab');
  const panels = document.querySelectorAll('.screenshot-panel');
  tabs.forEach(t => t.classList.remove('active'));
  panels.forEach(p => p.classList.remove('active'));
  tabs[i].classList.add('active');
  panels[i].classList.add('active');
  currentSSStep = i;
  updateSSNav();
}

function navigateScreenshot(dir) {
  const newStep = currentSSStep + dir;
  if (newStep >= 0 && newStep < taxslayerSteps.length) {
    goToSSStep(newStep);
  }
}

function updateSSNav() {
  document.getElementById('ssPrevBtn').disabled = currentSSStep === 0;
  document.getElementById('ssNextBtn').disabled = currentSSStep === taxslayerSteps.length - 1;
  document.getElementById('ssCounter').textContent = `Step ${currentSSStep + 1} of ${taxslayerSteps.length}`;
}

// ===== RESIDENCY CALCULATOR =====
function updateResidencyHints() {
  const visa = document.getElementById('visaType').value;
  const sptSection = document.getElementById('sptSection');
  const yearsGroup = document.getElementById('yearsGroup');
  if (visa === 'f1' || visa === 'j1_student' || visa === 'm1') {
    yearsGroup.style.display = 'block';
    sptSection.style.display = 'none';
  } else if (visa === 'j1_teacher') {
    yearsGroup.style.display = 'block';
    sptSection.style.display = 'none';
  } else if (visa) {
    yearsGroup.style.display = 'none';
    sptSection.style.display = 'block';
  }
  document.getElementById('residencyResult').classList.remove('show');
}

function calcSPT() {
  const d2025 = parseInt(document.getElementById('days2025').value) || 0;
  const d2024 = parseInt(document.getElementById('days2024').value) || 0;
  const d2023 = parseInt(document.getElementById('days2023').value) || 0;
  const weighted = d2025 + Math.floor(d2024/3) + Math.floor(d2023/6);
  const calcResult = document.getElementById('sptCalcResult');
  const formula = document.getElementById('sptFormula');
  if (d2025 > 0 || d2024 > 0 || d2023 > 0) {
    calcResult.style.display = 'block';
    formula.textContent = `${d2025} + (${d2024} ÷ 3 = ${Math.floor(d2024/3)}) + (${d2023} ÷ 6 = ${Math.floor(d2023/6)}) = ${weighted} weighted days`;
  }
  return { d2025, weighted };
}

function calculateResidency() {
  const visa = document.getElementById('visaType').value;
  const years = document.getElementById('yearsInUS').value;
  const resultBox = document.getElementById('residencyResult');
  const header = document.getElementById('residencyResultHeader');
  const body = document.getElementById('residencyResultBody');

  if (!visa) {
    alert('Please select your visa type.');
    return;
  }

  resultBox.className = 'result-box show';

  if (visa === 'f1' || visa === 'j1_student' || visa === 'm1') {
    if (!years) { alert('Please select how many years you have been in the U.S.'); return; }
    const y = parseInt(years);
    if (y <= 5) {
      resultBox.classList.add('result-nonresident');
      resultBox.classList.remove('result-resident', 'result-warning');
      header.innerHTML = '✅ You are likely a NONRESIDENT ALIEN for federal tax purposes';
      body.innerHTML = `
        <p>As an <strong>${visa.toUpperCase()} student in your ${years} year(s)</strong> in the U.S., you are an <strong>exempt individual</strong> under the Substantial Presence Test for your first 5 calendar years. This means you are a <strong>Nonresident Alien</strong> for federal tax purposes.</p>
        <br>
        <strong>What this means for you:</strong>
        <ul style="padding-left:20px;margin-top:8px;line-height:2;">
          <li>File <strong>Form 1040-NR</strong> (not Form 1040)</li>
          <li>File <strong>Form 8843</strong> to document your exempt days</li>
          <li>Only U.S.-source income is taxable</li>
          <li>No standard deduction (except students from India)</li>
          <li>May be eligible for tax treaty benefits</li>
          <li>Exempt from FICA (Social Security/Medicare) taxes</li>
          <li>You are always a <strong>Wisconsin Nonresident</strong> — file Form 1NPR if you have WI income</li>
        </ul>
      `;
    } else {
      resultBox.classList.add('result-warning');
      resultBox.classList.remove('result-resident', 'result-nonresident');
      header.innerHTML = '⚠️ You may be a RESIDENT ALIEN — further analysis needed';
      body.innerHTML = `
        <p>You have been in the U.S. for <strong>6 or more years</strong> on an F-1/J-1 visa. Your exempt status may have expired, and you may now be subject to the <strong>Substantial Presence Test</strong>.</p>
        <br>
        <p>You need to calculate whether you meet the SPT (183 weighted days). If you do, you may be a <strong>Resident Alien</strong> and should file Form 1040 instead of 1040-NR.</p>
        <br>
        <div class="alert alert-warning" style="margin-top:8px;">
          <span class="alert-icon">⚠️</span>
          <div><strong>This situation is complex.</strong> If you are transitioning from nonresident to resident status (dual-status alien), this is <strong>out of scope for VITA</strong>. Please consult a qualified tax professional or contact the IRS.</div>
        </div>
      `;
    }
  } else if (visa === 'j1_teacher') {
    if (!years) { alert('Please select how many years you have been in the U.S.'); return; }
    const y = parseInt(years);
    if (y <= 2) {
      resultBox.classList.add('result-nonresident');
      resultBox.classList.remove('result-resident', 'result-warning');
      header.innerHTML = '✅ You are likely a NONRESIDENT ALIEN for federal tax purposes';
      body.innerHTML = `<p>J-1 teachers/trainees are exempt from the SPT for the first <strong>2 of the preceding 6 calendar years</strong>, provided they were not previously exempt as a student. You are likely a <strong>Nonresident Alien</strong>. File Form 1040-NR and Form 8843.</p>`;
    } else {
      resultBox.classList.add('result-warning');
      resultBox.classList.remove('result-resident', 'result-nonresident');
      header.innerHTML = '⚠️ Further analysis needed — consult a professional';
      body.innerHTML = `<p>Your exempt status as a J-1 teacher/trainee may have expired. Please consult a qualified tax professional to determine your residency status.</p>`;
    }
  } else if (visa === 'h1b' || visa === 'other') {
    const { d2025, weighted } = calcSPT();
    if (!d2025) {
      resultBox.classList.add('result-warning');
      resultBox.classList.remove('result-resident', 'result-nonresident');
      header.innerHTML = '⚠️ Please enter your days present in the U.S.';
      body.innerHTML = `<p>For H-1B and other visa holders, please enter your days present in the U.S. for the past 3 years to calculate the Substantial Presence Test.</p>`;
      document.getElementById('sptSection').style.display = 'block';
      return;
    }
    if (d2025 >= 31 && weighted >= 183) {
      resultBox.classList.add('result-resident');
      resultBox.classList.remove('result-nonresident', 'result-warning');
      header.innerHTML = '✅ You are likely a RESIDENT ALIEN for federal tax purposes';
      body.innerHTML = `
        <p>You meet the Substantial Presence Test (<strong>${d2025} days in 2025</strong>, <strong>${weighted} weighted days</strong> ≥ 183). You are a <strong>Resident Alien</strong> for federal tax purposes.</p>
        <br>
        <strong>What this means:</strong>
        <ul style="padding-left:20px;margin-top:8px;line-height:2;">
          <li>File <strong>Form 1040</strong> (not 1040-NR)</li>
          <li>Taxed on <strong>worldwide income</strong></li>
          <li>May claim standard deduction</li>
          <li>May be eligible for education credits and other credits</li>
          <li>Subject to FICA taxes</li>
        </ul>
        <div class="alert alert-info" style="margin-top:12px;"><span class="alert-icon">ℹ️</span><div>Note: Resident alien for tax purposes does NOT mean resident for immigration purposes.</div></div>
      `;
    } else {
      resultBox.classList.add('result-nonresident');
      resultBox.classList.remove('result-resident', 'result-warning');
      header.innerHTML = '✅ You are likely a NONRESIDENT ALIEN for federal tax purposes';
      body.innerHTML = `
        <p>You do not meet the Substantial Presence Test (<strong>${d2025} days in 2025</strong>, <strong>${weighted} weighted days</strong> &lt; 183). You are a <strong>Nonresident Alien</strong>.</p>
        <br>
        <p>File <strong>Form 1040-NR</strong>. Only U.S.-source income is taxable.</p>
      `;
    }
  }
}

// ===== TREATY CHECKER =====
const treatyData = {
  // Code 16 (Scholarships) - [maxYears, treatyArticle]
  code16: {
    'Bangladesh': ['2', '21(2)'],
    'China': ['No limit', '20(b)'],
    'Cyprus': ['5', '21(1)'],
    'Czech Republic': ['5', '21(1)'],
    'Egypt': ['5', '23(1)'],
    'Estonia': ['5', '20(1)'],
    'France': ['5', '21(1)'],
    'Germany': ['No limit', '20(3)'],
    'Iceland': ['5', '19(1)'],
    'Indonesia': ['5', '19(1)'],
    'Israel': ['5', '24(1)'],
    'Kazakhstan': ['5', '19(1)'],
    'Korea': ['5', '21(1)'],
    'Latvia': ['5', '20(1)'],
    'Lithuania': ['5', '20(1)'],
    'Morocco': ['5', '18(1)'],
    'Netherlands': ['3', '22(2)'],
    'Norway': ['5', '16(1)'],
    'Philippines': ['5', '22(1)'],
    'Poland': ['5', '18(1)'],
    'Portugal': ['5', '23(1)'],
    'Romania': ['5', '20(1)'],
    'Slovak Republic': ['5', '21(1)'],
    'Slovenia': ['5', '20(1)'],
    'Spain': ['5', '22(1)'],
    'Thailand': ['5', '22(1)'],
    'Trinidad and Tobago': ['5', '19(1)'],
    'Tunisia': ['5', '20(1)'],
    'Ukraine': ['5', '20(1)'],
    'Venezuela': ['5', '21(1)']
  },
  // Code 20 (Wages) - [annualLimit, yearLimit, treatyArticle]
  code20: {
    'Bangladesh': ['$8,000', 'No Limit', '21(2)'],
    'Belgium': ['$9,000', '5', '21(1)'],
    'Bulgaria': ['$9,000', 'No Limit', '19(1)'],
    'Canada': ['$10,000', '5', 'XV'],
    'China': ['$5,000', 'No Limit', '20(c)'],
    'Cyprus': ['$2,000', '5', '21(1)'],
    'Czech Republic': ['$5,000', '5', '21(1)'],
    'Egypt': ['$3,000', '5', '23(1)'],
    'Estonia': ['$5,000', '5', '20(1)'],
    'France': ['$5,000', '5', '21(1)'],
    'Germany': ['$9,000', '4', '20(4)'],
    'Iceland': ['$9,000', '5', '19(1)'],
    'Indonesia': ['$2,000', '5', '19'],
    'Israel': ['$3,000', '5', '24(1)'],
    'Korea': ['$2,000', '5', '21(1)'],
    'Latvia': ['$5,000', '5', '20(1)'],
    'Lithuania': ['$5,000', '5', '20(1)'],
    'Malta': ['$9,000', 'No Limit', '20'],
    'Morocco': ['$2,000', '5', '18'],
    'Netherlands': ['$2,000', '3', '22(1)'],
    'Norway': ['$2,000', '5', '16(1)'],
    'Pakistan': ['$5,000', 'No Limit', 'XIII(1)'],
    'Philippines': ['$3,000', '5', '22(1)'],
    'Poland': ['$2,000', '5', '18(1)'],
    'Portugal': ['$5,000', '5', '23(1)'],
    'Romania': ['$2,000', '5', '20(1)'],
    'Slovak Republic': ['$5,000', '5', '21(1)'],
    'Slovenia': ['$5,000', '5', '20(1)'],
    'Spain': ['$5,000', '5', '22(1)'],
    'Thailand': ['$3,000', '5', '22(1)'],
    'Trinidad and Tobago': ['$2,000', '5', '19(1)'],
    'Tunisia': ['$4,000', '5', '20'],
    'Venezuela': ['$5,000', '5', '21(1)']
  }
};

function checkTreaty() {
  const country = document.getElementById('treatyCountry').value;
  const incomeType = document.getElementById('treatyIncomeType').value;
  const resultDiv = document.getElementById('treatyResult');
  const noTreatyDiv = document.getElementById('noTreatyResult');

  if (!country || !incomeType) {
    resultDiv.classList.remove('show');
    noTreatyDiv.classList.remove('show');
    return;
  }

  if (country === 'OTHER') {
    resultDiv.classList.remove('show');
    noTreatyDiv.classList.add('show');
    document.getElementById('noTreatyDesc').textContent = 'Your country does not appear in the treaty benefit tables for students. You are subject to standard U.S. tax rates. Check IRS Publication 901 for a complete list of all U.S. tax treaties.';
    return;
  }

  const has16 = treatyData.code16[country];
  const has20 = treatyData.code20[country];

  let found = false;
  let html = '';
  let title = '';
  let desc = '';
  let instructions = '';

  if (incomeType === '16' && has16) {
    found = true;
    title = `✅ ${country} has Treaty Benefits for Scholarships (Income Code 16)`;
    desc = 'Your country has a tax treaty with the U.S. that may exempt scholarship or fellowship income from U.S. taxation.';
    html = `
      <div class="treaty-detail-item"><div class="label">Max Years in U.S.</div><div class="value">${has16[0]}</div></div>
      <div class="treaty-detail-item"><div class="label">Treaty Article</div><div class="value">${has16[1]}</div></div>
      <div class="treaty-detail-item"><div class="label">Income Code</div><div class="value">16</div></div>
    `;
    instructions = `<strong>How to Claim:</strong> Report the treaty-exempt scholarship income on Form 1040-NR, Schedule OI, Item L. Enter the treaty article number (${has16[1]}) and the exempt amount. This income is also exempt for Wisconsin tax purposes.`;
  } else if (incomeType === '20' && has20) {
    found = true;
    title = `✅ ${country} has Treaty Benefits for Student Wages (Income Code 20)`;
    desc = 'Your country has a tax treaty with the U.S. that may exempt student employment wages up to the annual limit.';
    html = `
      <div class="treaty-detail-item"><div class="label">Annual Limit</div><div class="value">${has20[0]}</div></div>
      <div class="treaty-detail-item"><div class="label">Year Limit</div><div class="value">${has20[1]}</div></div>
      <div class="treaty-detail-item"><div class="label">Treaty Article</div><div class="value">${has20[2]}</div></div>
      <div class="treaty-detail-item"><div class="label">Income Code</div><div class="value">20</div></div>
    `;
    instructions = `<strong>How to Claim:</strong> If your employer has not already applied treaty benefits on your W-2, enter the treaty-exempt amount on Schedule OI, Item L of Form 1040-NR. For Wisconsin: treaty-exempt income is also exempt for WI, but you may need to manually enter a negative adjustment in TaxSlayer.`;
  } else if (incomeType === 'both') {
    if (has16 || has20) {
      found = true;
      title = `✅ ${country} has Treaty Benefits`;
      desc = 'Your country has treaty benefits for one or more income types.';
      if (has16) html += `<div class="treaty-detail-item"><div class="label">Scholarship (Code 16) — Max Years</div><div class="value">${has16[0]}</div></div><div class="treaty-detail-item"><div class="label">Scholarship Treaty Article</div><div class="value">${has16[1]}</div></div>`;
      if (has20) html += `<div class="treaty-detail-item"><div class="label">Wages (Code 20) — Annual Limit</div><div class="value">${has20[0]}</div></div><div class="treaty-detail-item"><div class="label">Wages Treaty Article</div><div class="value">${has20[2]}</div></div>`;
      instructions = `<strong>How to Claim:</strong> Report treaty-exempt amounts on Schedule OI, Item L of Form 1040-NR. Specify the treaty article for each income type. Treaty-exempt income is also exempt for Wisconsin tax purposes.`;
    }
  }

  if (found) {
    document.getElementById('treatyResultTitle').textContent = title;
    document.getElementById('treatyResultDesc').textContent = desc;
    document.getElementById('treatyDetailGrid').innerHTML = html;
    document.getElementById('treatyInstructions').innerHTML = instructions;
    resultDiv.classList.add('show');
    noTreatyDiv.classList.remove('show');
  } else {
    resultDiv.classList.remove('show');
    noTreatyDiv.classList.add('show');
    let msg = '';
    if (incomeType === '16') msg = `${country} does not have a tax treaty benefit for scholarship/fellowship income (Income Code 16). Your scholarship income may be subject to the standard 14% withholding rate.`;
    else if (incomeType === '20') msg = `${country} does not have a tax treaty benefit for student wages (Income Code 20). Your wages are taxed at standard rates.`;
    else msg = `${country} does not appear to have treaty benefits for the selected income types. Check IRS Publication 901 for complete treaty information.`;
    document.getElementById('noTreatyDesc').textContent = msg;
  }
}

// ===== CHECKLIST =====
const TOTAL_CHECKS = 20;
function updateChecklist() {
  const checkboxes = document.querySelectorAll('.checklist input[type=checkbox]');
  let checked = 0;
  checkboxes.forEach(cb => {
    const label = cb.nextElementSibling;
    if (cb.checked) {
      checked++;
      label.classList.add('checked');
    } else {
      label.classList.remove('checked');
    }
  });
  const pct = Math.round((checked / TOTAL_CHECKS) * 100);
  document.getElementById('checklistProgressFill').style.width = pct + '%';
  document.getElementById('checklistProgressLabel').textContent = `${checked} of ${TOTAL_CHECKS} items completed`;
  document.getElementById('sidebarProgress').style.width = pct + '%';
  document.getElementById('sidebarProgressLabel').textContent = `${checked} of ${TOTAL_CHECKS} items completed`;
}

// ===== TABS =====
function switchTab(btn, panelId) {
  const container = btn.closest('.tab-container');
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}

// ===== ACCORDION =====
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const isOpen = header.classList.contains('open');
  header.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}
function closeMobileNav(e) {
  if (!e || e.target === document.getElementById('mobileNav') || e.target.tagName === 'A') {
    document.getElementById('mobileNav').classList.remove('open');
  }
}

// ===== SMOOTH SCROLL WITH STICKY HEADER OFFSET =====
function getHeaderHeight() {
  const header = document.querySelector('.site-header');
  return header ? header.offsetHeight + 12 : 76;
}
function smoothScrollToId(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

// ===== ACTIVE NAV HIGHLIGHTING =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - getHeaderHeight() - 20;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  buildScreenshotViewer();
  updateChecklist();
  updateActiveNav();

  // Intercept ALL anchor links and apply smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        smoothScrollToId(targetId);
        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, '#' + targetId);
        }
      }
    });
  });

  // Handle direct URL hash on page load (e.g., opening file://...#fica)
  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    setTimeout(() => smoothScrollToId(targetId), 100);
  }
});

// ===== FICA EXEMPTION CHECKER =====
document.getElementById('ficaVisa').addEventListener('change', function() {
  const visa = this.value;
  const yearsGroup = document.getElementById('ficaYearsGroup');
  const workGroup = document.getElementById('ficaWorkGroup');
  const result = document.getElementById('ficaResult');
  result.style.display = 'none';
  if (visa === 'f1' || visa === 'j1_student' || visa === 'j1_scholar' || visa === 'm1') {
    yearsGroup.style.display = 'block';
    workGroup.style.display = 'block';
  } else {
    yearsGroup.style.display = 'none';
    workGroup.style.display = 'none';
  }
});

function checkFICAExemption() {
  const visa = document.getElementById('ficaVisa').value;
  const years = document.getElementById('ficaYears').value;
  const work = document.getElementById('ficaWork').value;
  const resultDiv = document.getElementById('ficaResult');
  const resultContent = document.getElementById('ficaResultContent');

  if (!visa) {
    alert('Please select your visa type.');
    return;
  }

  let html = '';

  if (visa === 'f2_j2') {
    html = `<div style="color:#ff6b6b;font-size:15px;font-weight:700;margin-bottom:8px;">❌ Not Exempt from FICA</div>
    <p style="font-size:13px;">F-2, J-2, and M-2 dependent visa holders are <strong>not exempt</strong> from FICA taxes. Social Security and Medicare taxes apply to your wages.</p>`;
  } else if (visa === 'h1b' || visa === 'other') {
    html = `<div style="color:#ff6b6b;font-size:15px;font-weight:700;margin-bottom:8px;">❌ Not Exempt from FICA</div>
    <p style="font-size:13px;">H-1B, H-4, L-1, O-1, and other work visa holders are <strong>not exempt</strong> from FICA taxes. Social Security and Medicare taxes apply to your wages. However, check if your country has a <strong>Totalization Agreement</strong> with the U.S. that may affect your liability.</p>`;
  } else if (visa === 'j1_scholar') {
    if (!years) { alert('Please select how many years you have been in the U.S.'); return; }
    if (years === '1' || years === '2') {
      html = `<div style="color:#2ecc71;font-size:15px;font-weight:700;margin-bottom:8px;">✅ Likely Exempt from FICA</div>
      <p style="font-size:13px;">J-1 Research Scholars and Professors are generally exempt from FICA for the first <strong>2 calendar years</strong> in the U.S. You are in year ${years}, so you should be exempt.</p>
      <p style="font-size:13px;margin-top:8px;"><strong>Action:</strong> Provide your employer with a copy of your DS-2019 and visa to confirm your exempt status.</p>`;
    } else {
      html = `<div style="color:#f5a623;font-size:15px;font-weight:700;margin-bottom:8px;">⚠️ May No Longer Be Exempt</div>
      <p style="font-size:13px;">J-1 Research Scholars and Professors are exempt for the first 2 calendar years. You have been in the U.S. for ${years === '6plus' ? '6+' : years} years. You may have become a resident alien under the Substantial Presence Test, making FICA applicable.</p>
      <p style="font-size:13px;margin-top:8px;"><strong>Action:</strong> Use the Residency Test Tool (Section 2) to determine your current tax residency status. Consult a tax professional if needed.</p>`;
    }
  } else if (visa === 'f1' || visa === 'j1_student' || visa === 'm1') {
    if (!years) { alert('Please select how many years you have been in the U.S.'); return; }
    if (!work) { alert('Please select your type of employment.'); return; }

    const visaLabel = visa === 'f1' ? 'F-1' : visa === 'j1_student' ? 'J-1' : 'M-1';
    const yearNum = years === '6plus' ? 6 : parseInt(years);

    if (yearNum >= 6) {
      html = `<div style="color:#f5a623;font-size:15px;font-weight:700;margin-bottom:8px;">⚠️ Likely No Longer Exempt</div>
      <p style="font-size:13px;">You have been in the U.S. for 6 or more years on an ${visaLabel} visa. You have likely become a <strong>resident alien</strong> for tax purposes under the Substantial Presence Test, which means FICA taxes now apply to your wages.</p>
      <p style="font-size:13px;margin-top:8px;"><strong>Exception:</strong> If you are enrolled at least half-time and employed by your school, you may still qualify for the <strong>student FICA exemption</strong> under IRC §3121(b)(10).</p>`;
    } else if (work === 'unauthorized') {
      html = `<div style="color:#ff6b6b;font-size:15px;font-weight:700;margin-bottom:8px;">❌ Not Exempt from FICA</div>
      <p style="font-size:13px;">The FICA exemption only applies to employment <strong>authorized by USCIS</strong> and consistent with the purpose of your visa. Unauthorized employment is not exempt from FICA (or income tax).</p>`;
    } else {
      const workLabel = work === 'oncampus' ? 'on-campus employment' : work === 'cpt' ? 'CPT off-campus employment' : 'OPT off-campus employment';
      html = `<div style="color:#2ecc71;font-size:15px;font-weight:700;margin-bottom:8px;">✅ Exempt from FICA</div>
      <p style="font-size:13px;">Based on your answers, you qualify for the FICA exemption:</p>
      <ul style="font-size:13px;padding-left:18px;margin-top:8px;line-height:2;">
        <li>Visa: <strong>${visaLabel}</strong> ✅</li>
        <li>Years in U.S.: <strong>${years === '6plus' ? '6+' : years} year(s)</strong> — nonresident alien status ✅</li>
        <li>Employment: <strong>${workLabel}</strong> — USCIS-authorized ✅</li>
      </ul>
      <p style="font-size:13px;margin-top:10px;"><strong>Action:</strong> If your employer is withholding FICA taxes, provide them with a copy of your visa, I-20/DS-2019, and a written statement citing IRC §3121(b)(19). If they continue to withhold, use Forms 843 and 8316 to claim a refund from the IRS.</p>`;
    }
  }

  resultContent.innerHTML = html;
  resultDiv.style.display = 'block';
}

/* ===== SIDEBAR TOGGLE ===== */
function toggleSidebar() {
  const sidebar = document.getElementById('mainSidebar');
  const revealBtn = document.getElementById('sidebarRevealBtn');
  if (!sidebar) return;
  const isCollapsed = sidebar.classList.toggle('collapsed');
  if (revealBtn) revealBtn.classList.toggle('visible', isCollapsed);
  localStorage.setItem('sidebarCollapsed', isCollapsed ? '1' : '0');
}

// Restore sidebar state on load
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('mainSidebar');
    const revealBtn = document.getElementById('sidebarRevealBtn');
    if (sidebar && localStorage.getItem('sidebarCollapsed') === '1') {
      sidebar.classList.add('collapsed');
      if (revealBtn) revealBtn.classList.add('visible');
    }
  });
})();
