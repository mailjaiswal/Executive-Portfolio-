/**
 * ANKUR JAISWAL — AI BUILDER & ENTERPRISE LEADER
 * Interactive Mechanics, Background Canvas Particle Engine, Innovation Lab Filters, 60s Quote Generator & Ask Ankur AI Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavigation();
  initLabFilters();
  initQuoteForm();
  initAskAnkurAI();
});

/* ==========================================================================
   0. Interactive Particle Canvas Background (Exact Rishav Studio Visual)
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 70);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 130) * 0.12;
          ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      p.alpha += Math.sin(Date.now() * p.pulse) * 0.008;
      const currentAlpha = Math.max(0.1, Math.min(0.7, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   1. Navigation & Header Scroll State
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        links.forEach(l => l.classList.remove('active'));
        if (navItem) navItem.classList.add('active');
      }
    });
  }
}

/* ==========================================================================
   2. AI Innovation Lab Category Filters
   ========================================================================== */
function initLabFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const labCards = document.querySelectorAll('.lab-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      labCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   3. 60-Second Quote Form & Prefilled Dispatchers
   ========================================================================== */
function initQuoteForm() {
  const form = document.getElementById('projectQuoteForm');
  if (!form) return;

  const serviceChips = document.querySelectorAll('#serviceChips .form-chip');
  const timelineChips = document.querySelectorAll('#timelineChips .form-chip');
  let selectedServices = ['AI MVP Development'];
  let selectedTimeline = '2-4 weeks';

  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-val');
      if (chip.classList.contains('selected')) {
        chip.classList.remove('selected');
        selectedServices = selectedServices.filter(s => s !== val);
      } else {
        chip.classList.add('selected');
        selectedServices.push(val);
      }
    });
  });

  timelineChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timelineChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedTimeline = chip.getAttribute('data-val');
    });
  });

  const emailBtn = document.getElementById('sendEmailQuoteBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value.trim() || 'Client';
      const email = document.getElementById('clientEmail')?.value.trim() || 'Not provided';
      const details = document.getElementById('projectDetails')?.value.trim() || 'Discuss my project scope and timeline.';

      const subject = encodeURIComponent(`Project Inquiry: ${selectedServices.join(', ') || 'Consulting'} - ${name}`);
      const body = encodeURIComponent(
`Hi Ankur,

I came across your website and would like to discuss a potential project engagement.

Project Type:
${selectedServices.length ? selectedServices.join(', ') : 'AI / Web / Operations'}

Timeline:
${selectedTimeline}

Client Name:
${name}

Contact Email / Phone:
${email}

Project Requirements & Details:
${details}

Looking forward to connecting with you.

Best regards,
${name}`
      );

      window.open(`mailto:mail.jaiswal@gmail.com?subject=${subject}&body=${body}`, '_blank');
      showToast('Opening your email client with prefilled details...');
    });
  }

  const waBtn = document.getElementById('sendWhatsAppQuoteBtn');
  if (waBtn) {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value.trim() || 'Client';
      const details = document.getElementById('projectDetails')?.value.trim() || 'Discuss my project scope and timeline.';

      const text = encodeURIComponent(
`Hi Ankur,

I visited your website and I'm interested in discussing an AI solution / consulting engagement for my business.

Project Type:
${selectedServices.length ? selectedServices.join(', ') : 'AI MVP / Automation'}

Timeline:
${selectedTimeline}

Client Name:
${name}

Project Requirements:
${details}

Looking forward to speaking with you.`
      );

      window.open(`https://wa.me/919686663717?text=${text}`, '_blank');
      showToast('Redirecting to WhatsApp with project details...');
    });
  }
}

/* ==========================================================================
   4. Interactive "Ask Ankur AI" Assistant Widget
   ========================================================================== */
function initAskAnkurAI() {
  const triggerBtn = document.getElementById('aiTriggerBtn');
  const chatDrawer = document.getElementById('aiChatDrawer');
  const closeBtn = document.getElementById('aiCloseBtn');
  const chatInput = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiSendBtn');
  const messagesArea = document.getElementById('aiMessagesArea');

  if (!triggerBtn || !chatDrawer) return;

  triggerBtn.addEventListener('click', () => {
    chatDrawer.classList.toggle('open');
    if (chatDrawer.classList.contains('open')) {
      setTimeout(() => chatInput?.focus(), 200);
    }
  });

  closeBtn?.addEventListener('click', () => {
    chatDrawer.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.ai-chip');
    if (chip) {
      const prompt = chip.getAttribute('data-prompt') || chip.innerText;
      handleUserQuery(prompt);
    }
  });

  sendBtn?.addEventListener('click', () => {
    const query = chatInput?.value.trim();
    if (query) {
      handleUserQuery(query);
      chatInput.value = '';
    }
  });

  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = chatInput.value.trim();
      if (query) {
        handleUserQuery(query);
        chatInput.value = '';
      }
    }
  });

  function handleUserQuery(queryText) {
    appendMessage(queryText, 'user');
    const typingId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const answer = generateKnowledgeResponse(queryText);
      appendMessage(answer, 'bot');
    }, 600);
  }

  function appendMessage(text, sender) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-message ${sender}`;

    const bubbleEl = document.createElement('div');
    bubbleEl.className = 'ai-msg-bubble';
    bubbleEl.innerHTML = text;

    msgEl.appendChild(bubbleEl);
    messagesArea.appendChild(msgEl);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }

  function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingEl = document.createElement('div');
    typingEl.id = id;
    typingEl.className = 'ai-message bot';
    typingEl.innerHTML = `
      <div class="ai-msg-bubble">
        <div style="display:flex;gap:4px;padding:4px 0;">
          <span style="width:5px;height:5px;background:#94a3b8;border-radius:50%;display:inline-block;"></span>
          <span style="width:5px;height:5px;background:#94a3b8;border-radius:50%;display:inline-block;"></span>
          <span style="width:5px;height:5px;background:#94a3b8;border-radius:50%;display:inline-block;"></span>
        </div>
      </div>
    `;
    messagesArea.appendChild(typingEl);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function generateKnowledgeResponse(rawQuery) {
    const q = rawQuery.toLowerCase();

    if (q.includes('background') || q.includes('who is') || q.includes('experience') || q.includes('career') || q.includes('veripark') || q.includes('mphasis') || q.includes('infosys')) {
      return `<strong>Ankur Jaiswal</strong> is a Director Presales, Sales Enablement & Large Deal Specialist with <strong>20+ years</strong> of enterprise leadership.<br><br>
      • <strong>Scale:</strong> Managed annual deal pipelines exceeding <strong>$500M+</strong> with <strong>40%+ win ratios</strong>.<br>
      • <strong>Teams:</strong> Built and led global presales teams of up to 22 members across NA, EMEA, UK, and APAC.<br>
      • <strong>Tenure:</strong> Senior leadership roles at <em>VeriPark</em>, <em>Royal Cyber</em>, <em>Mphasis</em> (8-year tenure, top 4 ratings in 8/11 cycles), <em>Happiest Minds</em>, <em>July Systems</em>, and <em>Infosys</em>.<br>
      • <strong>Education:</strong> PGDBM in Marketing & Systems (Goa Institute of Management) and B.E. Mechanical Engineering.`;
    }

    if (q.includes('project') || q.includes('ai') || q.includes('built') || q.includes('foundersignal') || q.includes('kontentos') || q.includes('swapiki') || q.includes('swatik') || q.includes('work') || q.includes('portfolio')) {
      return `Here are the active AI applications & enterprise platforms Ankur has built:<br><br>
      1. 🚀 <a href="https://founder-signal-three.vercel.app/" target="_blank" style="color:#34d399;font-weight:700;">FounderSignal</a>: Indian startup opportunity radar turning hiring, regulatory & community signals into scored briefs (⚡ Dev).<br>
      2. 🎬 <strong>KontentOS v2</strong>: AI Creator Operating System with Raw-to-Reel video editing & auto-captions (⚡ In Development).<br>
      3. 🎙️ <strong>Swapiki</strong>: Candidate audio proof platform delivering 2-min walkthroughs directly to recruiters (⚡ In Development).<br>
      4. 📊 <strong>Swatik (Team OS)</strong>: Agile resource & capacity intelligence for engineering teams (⚡ In Development).<br>
      5. 💼 <a href="https://mailjaiswal.github.io/AnkurJaiswal/" target="_blank" style="color:#38bdf8;font-weight:700;">Executive Portfolio</a>: Comprehensive portfolio showcasing 20+ years of presales leadership & web solutions.<br>
      6. 💬 <strong>WhatsApp Automation System</strong>: Conversation flows, automated qualification & CRM sync (⚡ In Development).`;
    }

    if (q.includes('service') || q.includes('offer') || q.includes('what do you build') || q.includes('hire')) {
      return `Here are the core engagements Ankur provides for enterprise & scaling teams:<br><br>
      • <strong>AI MVP Development:</strong> Idea → working, demoable AI web product in <strong>5–7 days</strong>.<br>
      • <strong>Presales & Large Deal Pursuits:</strong> End-to-end bid governance, win-theme positioning, and commercial pricing models.<br>
      • <strong>AI RFP & Ops Automation:</strong> GenAI automation & centralized M365 knowledge repositories cutting turnaround from 8 to 5 days.<br>
      • <strong>Business Websites & Headless SaaS:</strong> Conversion-focused, fast web apps built to generate revenue.<br>
      • <strong>CX & SLA Transformation:</strong> Deflection, CSAT uplift, and operations redesign.`;
    }

    if (q.includes('contact') || q.includes('quote') || q.includes('email') || q.includes('whatsapp') || q.includes('book')) {
      return `You can connect with Ankur directly (initial consultation is free):<br><br>
      📱 <strong>WhatsApp:</strong> <a href="https://wa.me/919686663717" target="_blank" style="color:#34d399;font-weight:700;">+91 9686663717</a> (Fastest response)<br>
      ✉️ <strong>Email:</strong> <a href="mailto:mail.jaiswal@gmail.com" style="color:#38bdf8;font-weight:700;">mail.jaiswal@gmail.com</a><br>
      💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/-ankurjaiswal" target="_blank" style="color:#34d399;font-weight:700;">linkedin.com/in/-ankurjaiswal</a><br>
      📍 <strong>Location:</strong> Bengaluru, India (Holds valid US B1 Visa).`;
    }

    return `Ankur specializes in <strong>AI Products, Enterprise Presales, and RFP Workflow Automation</strong>.<br><br>
    Select a topic below to explore:<br>
    • <span class="ai-chip" data-prompt="What AI projects has Ankur built?">His AI Builds & Demos</span><br>
    • <span class="ai-chip" data-prompt="What services does Ankur offer?">Services & 5-Day MVP</span><br>
    • <span class="ai-chip" data-prompt="How do I get a free quote or contact Ankur?">Getting a Free Consultation</span>`;
  }
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
