import { type FormEvent, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Crown, Gem, Instagram, MapPin, Menu, MessageCircle, Phone, Ruler, Scissors, Shirt, Sparkles, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
];

const services = [
  {
    name: 'Churidar Stitching',
    description: 'Clean lines, considered proportions, and a fit that lets you move.',
    icon: <Scissors size={17} strokeWidth={1.5} />,
  },
  {
    name: 'Blouse Stitching',
    description: 'The right neckline, the right fall, and all the details in between.',
    icon: <Shirt size={17} strokeWidth={1.5} />,
  },
  {
    name: 'Embroidery',
    description: 'Threadwork that turns an everyday silhouette into a keepsake.',
    icon: <Sparkles size={17} strokeWidth={1.5} />,
  },
  {
    name: 'Aari Work',
    description: 'Hand-punctured, jewel-like detail made slowly and with purpose.',
    icon: <Gem size={17} strokeWidth={1.5} />,
  },
  {
    name: 'Bridal Blouse',
    description: 'Statement pieces for the day you will remember in photographs.',
    icon: <Crown size={17} strokeWidth={1.5} />,
  },
  {
    name: 'Custom Designs',
    description: 'Bring the saved pins. We will make them belong to you.',
    icon: <Ruler size={17} strokeWidth={1.5} />,
  },
];

const gallery = [
  {
    title: 'Designer blouse',
    category: 'Shape / 01',
    src: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Woman in a richly detailed fashion look',
  },
  {
    title: 'Aari embroidery',
    category: 'Thread / 02',
    src: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Close fashion portrait with ornate fabric detail',
  },
  {
    title: 'Bridal blouse',
    category: 'Occasion / 03',
    src: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Elegant woman wearing an occasion fashion ensemble',
  },
  {
    title: 'Churidar',
    category: 'Everyday / 04',
    src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Woman wearing a modern Indian-inspired outfit',
  },
  {
    title: 'Embroidery detail',
    category: 'Close-up / 05',
    src: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Editorial portrait showing a carefully finished garment',
  },
  {
    title: 'New traditions',
    category: 'Mood / 06',
    src: 'https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fashion silhouette against a warm neutral backdrop',
  },
];

const features = [
  {
    title: 'Perfect Fit',
    copy: 'We work around your shape, not a standard size chart.',
  },
  {
    title: 'Personalized Designs',
    copy: 'Every reference becomes a starting point, never a copy.',
  },
  {
    title: 'Detailed Craftsmanship',
    copy: 'Tiny stitches and thoughtful finishing make the difference.',
  },
  {
    title: 'Premium Finishing',
    copy: 'Clean inside seams and a garment that feels good from every angle.',
  },
  {
    title: 'Made With Care',
    copy: 'A slower, more personal process for clothes you will keep reaching for.',
  },
];

const process = [
  {
    number: '01',
    title: 'Choose Your Design',
    copy: 'Save the references, fabrics, necklines, and little details you love.',
  },
  {
    number: '02',
    title: 'Get Measured',
    copy: 'A relaxed fitting session, with the attention a good fit deserves.',
  },
  {
    number: '03',
    title: 'We Stitch',
    copy: 'Your piece takes shape with precision, patience, and hand-finished detail.',
  },
  {
    number: '04',
    title: 'Wear Your Style',
    copy: 'A final try-on, a few small adjustments, and then it is yours.',
  },
];

type FormValues = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function SiteHeader({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    if (menuOpen) onToggleMenu();
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="top">
      <div className="header-inner">
        <a className="brand-mark" href="#home" data-testid="link-brand" onClick={closeMenu}>
          SHEREENA
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <a className="nav-link" href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact" data-testid="link-header-contact">
          Contact <span aria-hidden="true"><ArrowUpRight size={14} strokeWidth={1.7} /></span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={onToggleMenu}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={17} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} data-testid="link-mobile-contact">Start a piece</a>
        </nav>
      )}
    </header>
  );
}

function EnquiryForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Please add your name.';
    if (!values.phone.trim()) {
      nextErrors.phone = 'Please add your phone number.';
    } else if (!/^[+()\d\s-]{7,}$/.test(values.phone.trim())) {
      nextErrors.phone = 'Please check this phone number.';
    }
    if (!values.service) nextErrors.service = 'Please choose a service.';
    if (!values.message.trim()) nextErrors.message = 'Tell us a little about your piece.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const resetForm = () => {
    setValues({ name: '', phone: '', service: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="enquiry-form success-message" aria-live="polite" data-testid="status-enquiry-success">
        <div>
          <div className="success-mark" aria-hidden="true"><Check size={25} strokeWidth={1.6} /></div>
          <h3>We have your note.</h3>
          <p>Thank you, {values.name.split(' ')[0] || 'there'}. This is a local confirmation only; we will be in touch on {values.phone} to continue the conversation.</p>
          <button className="button" type="button" onClick={resetForm} data-testid="button-send-another-enquiry">
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <h3>Let&apos;s make it yours.</h3>
        <span>Enquiry / 01</span>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => updateValue('name', event.target.value)}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            data-testid="input-enquiry-name"
          />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={(event) => updateValue('phone', event.target.value)}
            placeholder="85905 37158"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            data-testid="input-enquiry-phone"
          />
          {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
        </div>
        <div className="field field-full">
          <label htmlFor="service">Service Required</label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => updateValue('service', event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            data-testid="select-enquiry-service"
          >
            <option value="">Choose what you have in mind</option>
            {services.map((service) => <option value={service.name} key={service.name}>{service.name}</option>)}
          </select>
          {errors.service && <p className="field-error" id="service-error">{errors.service}</p>}
        </div>
        <div className="field field-full">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => updateValue('message', event.target.value)}
            placeholder="Tell us about the occasion, your references, or the fit you are after."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            data-testid="textarea-enquiry-message"
          />
          {errors.message && <p className="field-error" id="message-error">{errors.message}</p>}
        </div>
      </div>
      <div className="form-footer">
        <p className="form-note">No payment, no pressure. Just a first conversation about your piece.</p>
        <button className="button button-arrow" type="submit" data-testid="button-send-enquiry">
          Send Enquiry <ArrowUpRight size={15} strokeWidth={1.7} />
        </button>
      </div>
    </form>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <div className="noise-overlay" aria-hidden="true" />
      <SiteHeader menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((current) => !current)} />
      <main>
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <span className="eyebrow reveal">Custom Tailoring <span aria-hidden="true">•</span> Embroidery <span aria-hidden="true">•</span> Aari Work</span>
              <h1 className="reveal reveal-delay-1">Stitched to <em>Your Style.</em></h1>
              <p className="hero-deck reveal reveal-delay-2">Custom tailoring, embroidery &amp; Aari artistry made specially for you.</p>
              <div className="hero-actions reveal reveal-delay-2">
                <a className="button button-solid button-arrow" href="#work" data-testid="link-explore-work">
                  Explore Our Work <ArrowDownRight size={15} strokeWidth={1.7} />
                </a>
                <a className="button" href="#contact" data-testid="link-contact-shereena">Contact Shereena</a>
              </div>
            </div>
            <div className="hero-art reveal reveal-delay-1" aria-label="Editorial fashion portrait">
              <div className="hero-image-frame">
                <img
                  src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Woman in a hand-finished fashion look"
                />
              </div>
              <div className="hero-stamp">Made<br />for you<br />since 2016</div>
              <div className="hero-note">Kochi · Kerala · India</div>
              <div className="hero-side-label">Studio notes / 001</div>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true">Scroll to explore</div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-inner about-grid">
            <div>
              <span className="section-label">01 / The studio</span>
              <h2 className="section-title">Where every stitch<br /><em>tells your story.</em></h2>
              <div className="about-rule">A personal kind of fashion studio</div>
            </div>
            <p className="about-copy">
              SHEREENA is where <strong>customized women&apos;s outfits</strong> start with your saved inspiration and end with the kind of fit you feel the moment you put it on. We balance clean, current silhouettes with the old-school pleasure of <strong>handcrafted detail</strong> — careful measurements, thoughtful finishing, and embroidery that takes its time.
              <br /><br />
              Whether it is your first blouse, a favourite churidar, or a bridal piece with a whole mood board behind it, every stitch is considered around <strong>your body, your occasion, and your way of wearing it.</strong>
            </p>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-inner">
            <div className="section-heading-row">
              <div>
                <span className="section-label">02 / What we do</span>
                <h2 className="section-title">Made for<br /><em>your style.</em></h2>
              </div>
              <p className="heading-note">From the everyday pieces you reach for to the one-off pieces you keep forever.</p>
            </div>
            <div className="services-list">
              {services.map((service, index) => (
                <div className="service-item" key={service.name} data-testid={`service-${index + 1}`}>
                  <span className="service-number">0{index + 1}</span>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <span className="service-name">{service.name}</span>
                  <span className="service-description">{service.description}</span>
                  <span className="service-plus" aria-hidden="true"><ChevronRight size={15} strokeWidth={1.5} /></span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-inner">
            <div className="work-intro">
              <div>
                <span className="section-label">03 / Selected work</span>
                <h2 className="section-title">A little<br /><em>inspiration.</em></h2>
              </div>
              <p>Rich textures, easy movement, and details that reveal themselves a little more every time you look.</p>
            </div>
            <div className="gallery">
              {gallery.map((item, index) => (
                <figure className="gallery-card" key={item.title} data-testid={`gallery-card-${index + 1}`}>
                  <img src={item.src} alt={item.alt} loading={index > 1 ? 'lazy' : 'eager'} />
                  <figcaption className="gallery-caption">
                    <span>{item.title}</span>
                    <span>{item.category}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="vibe-section">
          <div className="vibe-inner">
            <span className="section-label">04 / The Shereena mood</span>
            <h2 className="vibe-title">Your Outfit.<br /><em>Your Vibe.</em></h2>
            <p className="vibe-subtitle">The best pieces feel unmistakably yours. A little polished, a little unexpected, and never trying too hard.</p>
            <div className="tag-list" aria-label="Shereena style tags">
              {['#CustomFit', '#AariLove', '#BlouseGoals', '#MadeForYou', '#ShereenaStyle'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="section-inner why-grid">
            <div className="why-intro">
              <span className="section-label">05 / Why Shereena</span>
              <h2 className="section-title">Details make<br /><em>the difference.</em></h2>
              <p>Because a good outfit should not just look right on a hanger. It should feel like it has always belonged to you.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className="feature" key={feature.title} data-testid={`feature-${index + 1}`}>
                  <span className="feature-number">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="section-inner">
            <div className="process-heading">
              <div>
                <span className="section-label">06 / How it works</span>
                <h2 className="section-title">From pin<br /><em>to piece.</em></h2>
              </div>
              <p>Four easy steps from “I love this” to “I love how this feels.”</p>
            </div>
            <div className="process-grid">
              {process.map((step) => (
                <article className="process-step" key={step.number} data-testid={`process-step-${step.number}`}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-inner contact-grid">
            <div>
              <span className="section-label">07 / Come say hello</span>
              <h2 className="section-title">Let&apos;s create<br /><em>something beautiful.</em></h2>
              <p className="contact-lede">Tell us what you are dreaming up. A screenshot, a half-formed idea, a colour you cannot stop thinking about — it all counts.</p>
              <div className="contact-actions">
                <a className="button button-solid" href="tel:8590537158" data-testid="link-call-shereena">
                  <Phone size={15} strokeWidth={1.7} /> Call Shereena
                </a>
                <a className="button" href="https://wa.me/918590537158" target="_blank" rel="noreferrer" data-testid="link-whatsapp-shereena">
                  <MessageCircle size={15} strokeWidth={1.7} /> WhatsApp Shereena
                </a>
              </div>
              <div className="contact-list">
                <a className="contact-link" href="tel:8590537158" data-testid="link-phone-number"><Phone size={15} strokeWidth={1.6} /> 8590537158</a>
                <a className="contact-link" href="https://wa.me/918590537158" target="_blank" rel="noreferrer" data-testid="link-whatsapp-number"><MessageCircle size={15} strokeWidth={1.6} /> Chat on WhatsApp</a>
                <span className="contact-link"><MapPin size={15} strokeWidth={1.6} /> Kochi · Kerala · India</span>
                <a className="contact-link" href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="link-instagram"><Instagram size={15} strokeWidth={1.6} /> Follow the studio</a>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <a className="brand-mark" href="#home" data-testid="link-footer-brand">SHEREENA</a>
            <p className="footer-copy">Women&apos;s Tailoring · Embroidery · Aari Work</p>
            <a className="footer-phone" href="tel:8590537158">8590537158</a>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {navigation.map((item) => <a href={item.href} key={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</a>)}
            <a href="#contact" data-testid="link-footer-contact">Contact</a>
          </nav>
          <p className="footer-copy">© 2026 Shereena</p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;