const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
let selectedAmount='';
let donationFrequency='One-time';
document.querySelectorAll('.amounts button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.amounts button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectedAmount=btn.dataset.amount;document.getElementById('customAmount').value='';}));
document.getElementById('customAmount')?.addEventListener('input',()=>{if(document.getElementById('customAmount').value){selectedAmount=document.getElementById('customAmount').value;document.querySelectorAll('.amounts button').forEach(b=>b.classList.remove('active'))}});
document.querySelectorAll('.frequency-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.frequency-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');donationFrequency=btn.dataset.frequency;}));
let donationMethod='Card';
document.querySelectorAll('.payment-method').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.payment-method').forEach(b=>b.classList.remove('active'));btn.classList.add('active');donationMethod=btn.dataset.method;}));
document.getElementById('contactForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const text=`Hello Hope for Life South Sudan,%0A%0AName: ${f.get('name')}%0AEmail: ${f.get('email')}%0ASubject: ${f.get('subject')}%0A%0A${f.get('message')}`;document.getElementById('contactStatus').textContent='Opening WhatsApp…';window.open(`https://wa.me/211924469911?text=${encodeURIComponent(text)}`,'_blank')});

// Stories modal
const storyModal = document.getElementById('storyModal');
const storyTitle = document.getElementById('storyModalTitle');
const storyLabel = document.getElementById('storyModalLabel');
const storyText = document.getElementById('storyModalText');
const storyNote = document.getElementById('storyModalNote');
const stories = {
  education: {
    label: 'EDUCATION',
    title: 'Creating Spaces for Learning',
    text: 'The photograph shows children gathered during a Hope for Life South Sudan activity focused on learning, care and community connection. Creating welcoming spaces for children can support participation in educational activities while giving them encouragement, attention and a safe environment to learn and interact.',
    note: 'The photograph was provided for the Hope for Life South Sudan website. Approved location, date, program details and education outcomes can be added when those records are available.'
  },
  water: {
    label: 'COMMUNITY',
    title: 'A Village Transformed by Clean Water',
    text: 'A new borehole can change far more than access to water. For the people of Rumbek described in the website story, improved access to clean water can reduce the burden of water-related illness, save time and create space for families and communities to grow.',
    note: 'The website currently presents this as a community story. Project dates, beneficiary numbers and photographs can be added when the organization provides the approved field information.'
  },
  clinics: {
    label: 'HEALTHCARE',
    title: 'Mobile Clinics Reaching the Unreached',
    text: 'Remote communities can face major barriers to essential healthcare. Hope for Life’s mobile-health story highlights the importance of bringing basic care closer to people who may otherwise struggle to reach services.',
    note: 'This is based on the story description supplied for the website. Specific clinic locations, dates, services and beneficiary figures should be added from verified program records.'
  },
  upperNileChildren: {
    label: 'CHILD PROTECTION',
    title: 'Standing With Children Affected by Conflict',
    text: 'Our CEO met with children affected by conflict from Upper Nile State, listened to their experiences, and reaffirmed the organization’s commitment to supporting them and promote their safety and well-being.',
    note: 'The photographs accompanying this story were provided for the Hope for Life South Sudan website.'
  },
  all: {
    label: 'STORIES OF HOPE',
    title: 'Real stories. Real communities. Real hope.',
    text: 'Stories help show what support can mean beyond a program name — from education and clean water to healthcare and dignity. Hope for Life can continue adding approved stories here as projects develop across South Sudan.',
    note: 'We can turn this into a full story library with photos, dates, locations and impact figures once those materials are available.'
  }
};
function openStory(key){
  const story=stories[key]||stories.all;
  if(!storyModal) return;
  storyLabel.textContent=story.label;
  storyTitle.textContent=story.title;
  storyText.textContent=story.text;
  storyNote.textContent=story.note;
  storyModal.classList.add('open');
  storyModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  storyModal.querySelector('.story-modal-close')?.focus();
}
function closeStory(){
  if(!storyModal) return;
  storyModal.classList.remove('open');
  storyModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('[data-story]').forEach(btn=>btn.addEventListener('click',()=>openStory(btn.dataset.story)));
document.querySelectorAll('[data-story][tabindex]').forEach(el=>el.addEventListener('click',e=>{ if(e.target.closest('button')) return; openStory(el.dataset.story); }));
document.querySelectorAll('[data-story][tabindex]').forEach(el=>el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();openStory(el.dataset.story);} }));
document.querySelectorAll('[data-close-story]').forEach(el=>el.addEventListener('click',closeStory));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeStory();});

// Child protection story page
document.querySelectorAll('[data-story-page]').forEach(el=>el.addEventListener('click',e=>{
  if(e.target.closest('button')){ e.stopPropagation(); }
  window.location.href=el.dataset.storyPage;
}));
document.querySelectorAll('[data-story-page][tabindex]').forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();window.location.href=el.dataset.storyPage;}}));


// Functional Get Involved forms: validate locally, then prepare both email and WhatsApp submissions.
const INVOLVED_EMAIL = 'Hopeforlifesouthsudan@gmail.com';
const INVOLVED_WHATSAPP = '211924469911';
const modalTriggers = document.querySelectorAll('.involve-trigger');
const closeModal = (modal) => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
modalTriggers.forEach(btn=>btn.addEventListener('click',()=>{const modal=document.getElementById(btn.dataset.form); if(modal){modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); modal.querySelector('input,select,textarea')?.focus();}}));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',()=>closeModal(el.closest('.involve-modal'))));
document.querySelectorAll('.involve-modal').forEach(modal=>modal.addEventListener('click',e=>{if(e.target===modal)closeModal(modal);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.involve-modal.open').forEach(closeModal);});
document.querySelectorAll('.involve-form').forEach(form=>form.addEventListener('submit',e=>{
  if(form.classList.contains('career-form')) {
    if(!form.reportValidity()) { e.preventDefault(); return; }
    const status=form.querySelector('.form-status');
    if(status) status.textContent='Submitting your CV and application…';
    return;
  }
  e.preventDefault();
  if(!form.reportValidity()) return;
  const data=Object.fromEntries(new FormData(form).entries());
  const kind=form.dataset.kind;
  const lines=Object.entries(data).filter(([,v])=>String(v).trim()).map(([k,v])=>`${k.replace(/_/g,' ')}: ${v}`);
  const subject=`Hope for Life South Sudan - ${kind}`;
  const body=`Hello Hope for Life South Sudan,\n\nI am contacting you regarding: ${kind}.\n\n${lines.join('\n')}\n\nThank you.`;
  const status=form.querySelector('.form-status');
  status.textContent='Opening WhatsApp and email with your request…';
  window.open(`https://wa.me/${INVOLVED_WHATSAPP}?text=${encodeURIComponent(body)}`,'_blank');
  window.location.href=`mailto:${INVOLVED_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setTimeout(()=>{status.textContent='Your request has been prepared. If email did not open, please send the WhatsApp message that opened in the new tab.';},700);
}));


// Donation checkout configuration.
// Add the organization's verified hosted payment link here after the payment account is created.
// Keep secret API keys on the payment provider/server, never in this static website.
const HFL_PAYMENT_LINK = '';
const HFL_MONTHLY_PAYMENT_LINK = '';

const donationForm = document.getElementById('donationForm');
if (donationForm) {
  donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = selectedAmount || document.getElementById('customAmount')?.value.trim();
    const status = document.getElementById('donationStatus');
    const name = document.getElementById('donorName')?.value.trim() || '';
    const email = document.getElementById('donorEmail')?.value.trim() || '';
    if (!amount || Number(amount) <= 0) {
      if (status) status.textContent = 'Please choose a donation amount or enter a custom amount.';
      return;
    }
    const paymentLink = donationFrequency === 'Monthly' ? HFL_MONTHLY_PAYMENT_LINK : HFL_PAYMENT_LINK;
    if (!paymentLink) {
      const message = `Hello Hope for Life South Sudan,\n\nI would like to make a ${donationFrequency.toLowerCase()} donation of $${amount}.\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nPlease send me the verified online payment link. Thank you.`;
      if (status) status.textContent = 'The secure checkout is ready to connect. Please use the WhatsApp fallback until the verified payment link is added.';
      window.open(`https://wa.me/211924469911?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }
    const url = new URL(paymentLink);
    url.searchParams.set('amount', amount);
    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    window.location.href = url.toString();
  });
}
