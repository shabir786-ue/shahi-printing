import { useState, useEffect, useRef, useCallback } from "react";

/* ── DATA ── */
const SERVICES = [
  { id: "wedding-cards", title: "Wedding Cards", desc: "Exquisite wedding cards that make your special day even more memorable.", img: "toWEBP\H (1).webp 0000", emoji: "💍" },
  { id: "visiting-cards", title: "Visiting Cards", desc: "Professional visiting cards that leave a lasting impression on everyone.", img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80", emoji: "🪪" },
  { id: "banners", title: "Banners & Flex", desc: "High quality banners & flex for all your promotional and event needs.", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80", emoji: "🎌" },
  { id: "apparel", title: "Apparel Printing", desc: "Custom T-shirts, hoodies, caps, aprons with your brand or design.", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80", emoji: "👕" },
  { id: "stationery", title: "Stationery", desc: "Letterhead, menu cards, calendars, pamphlets & brochures.", img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80", emoji: "📄" },
  { id: "acrylic", title: "Acrylic & Sticker", desc: "Premium acrylic boards and custom stickers for every purpose.", img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&q=80", emoji: "🔖" },
  { id: "idcard", title: "ID Card & Bill Book", desc: "Professional ID cards and custom bill books for your business.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", emoji: "🗂️" },
  { id: "carrybag", title: "Carry Bag & Box", desc: "Custom carry bags and premium box making for all occasions.", img: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=400&q=80", emoji: "📦" },
  { id: "trophy", title: "Trophy", desc: "Custom trophies and awards for corporate and personal events.", img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80", emoji: "🏆" },
  { id: "video", title: "Invitation Video", desc: "Beautiful digital wedding invitation videos for WhatsApp & social media.", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80", emoji: "🎬" },
  { id: "nikkah", title: "Nikkah Nama", desc: "Premium Islamic Nikkah Nama with elegant Arabic calligraphy designs.", img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80", emoji: "🌙" },
  { id: "calendar", title: "Calendar", desc: "Custom branded calendars for corporate gifting and personal use.", img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&q=80", emoji: "📅" },
];

const STATS = [
  { icon: "🏆", num: "10+", label: "Years of Experience" },
  { icon: "👥", num: "5000+", label: "Happy Customers" },
  { icon: "🖨️", num: "10K+", label: "Projects Completed" },
  { icon: "⭐", num: "5.0", label: "Customer Rating" },
];

const REVIEWS = [
  { name: "Priya Sharma", initial: "P", color: "#c2185b", date: "April 2026 · Wedding Cards", text: "Shahi Printers delivered our wedding cards exactly as promised — beautiful quality, fast service, and very helpful staff. The designs were stunning and everyone loved them!" },
  { name: "Rajesh Mehta", initial: "R", color: "#e91e8c", date: "March 2026 · Visiting Cards & Banner", text: "Amazing quality and quick turnaround. The team made the design process simple and the final print looks excellent. Got my visiting cards and banner done here — both superb!" },
  { name: "Neha Kulkarni", initial: "N", color: "#7c3aed", date: "February 2026 · Muslim Wedding Cards", text: "Very professional service in Mira Road. They helped me choose the perfect paper and finished the order on time. The Muslim wedding cards were absolutely gorgeous!" },
  { name: "Amit Patel", initial: "A", color: "#d97706", date: "January 2026 · T-Shirt Printing", text: "Great experience from start to finish. Excellent customer support and top-quality print materials. Got T-shirts printed for our company event — everyone was impressed!" },
  { name: "Mehul Desai", initial: "M", color: "#059669", date: "June 2025 · Box Wedding Cards", text: "Loved the quality, service and the attention to detail. This place is a gem in Mira Road. Ordered box wedding cards and they were absolutely premium. Highly recommended!" },
  { name: "Sana Khan", initial: "S", color: "#dc2626", date: "December 2025 · Nikkah Nama", text: "Best printing shop in Mira Road! Got our Nikkah Nama printed here and it was absolutely beautiful. The Arabic calligraphy was perfect. Will definitely come back for more orders." },
];

const GALLERY = [
  { src: "toWEBP\H (1).webp", caption: "Hindu Wedding Card" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", caption: "Muslim Wedding Card" },
  { src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80", caption: "Visiting Card" },
  { src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80", caption: "Hoodie Printing" },
  { src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80", caption: "Trophy" },
  { src: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80", caption: "Calendar" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", caption: "Banner" },
  { src: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&q=80", caption: "Carry Bag & Box" },
];

/* ── ICONS ── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ── USEANIMATION HOOK ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── LIGHTBOX ── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <button onClick={e=>{e.stopPropagation();onPrev()}} style={lbBtnStyle("left")}>&#8592;</button>
      <div onClick={e=>e.stopPropagation()} style={{ textAlign:"center", maxWidth:"90vw" }}>
        <img src={images[index].src} alt={images[index].caption} style={{ maxHeight:"80vh",maxWidth:"88vw",borderRadius:12,objectFit:"contain" }} />
        <p style={{ color:"rgba(255,255,255,0.75)",marginTop:12,fontFamily:"'Cormorant Garamond',serif",fontSize:18,letterSpacing:1 }}>{images[index].caption}</p>
      </div>
      <button onClick={e=>{e.stopPropagation();onNext()}} style={lbBtnStyle("right")}>&#8594;</button>
      <button onClick={onClose} style={{ position:"absolute",top:20,right:24,background:"transparent",border:"none",color:"white",fontSize:28,cursor:"pointer",lineHeight:1 }}>✕</button>
    </div>
  );
}
const lbBtnStyle = (side) => ({ position:"absolute",[side]:16,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",color:"white",width:48,height:48,borderRadius:"50%",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)" });

/* ── MAIN APP ── */
export default function ShahiPrinters() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const whatsapp = (msg = "Hello Shahi Printers! I want to place an order.") =>
    window.open(`https://wa.me/919870000132?text=${encodeURIComponent(msg)}`, "_blank");

  const [heroRef, heroIn] = useInView(0.1);
  const [servRef, servIn] = useInView(0.05);
  const [aboutRef, aboutIn] = useInView(0.1);
  const [gallRef, gallIn] = useInView(0.1);
  const [revRef, revIn] = useInView(0.05);

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", background:"#fdf6f0", color:"#1a0533", overflowX:"hidden" }}>
      <style>{CSS}</style>

      {/* SOCIAL SIDEBAR */}
      <div className="social-sidebar">
        <a href="https://www.instagram.com/_.shahiprinters._" target="_blank" rel="noreferrer" className="soc-btn soc-ig" title="Instagram"><InstagramIcon /></a>
        <a href="https://www.facebook.com/shahi.printers" target="_blank" rel="noreferrer" className="soc-btn soc-fb" title="Facebook"><FacebookIcon /></a>
        <a href="https://wa.me/919870000132" target="_blank" rel="noreferrer" className="soc-btn soc-wa" title="WhatsApp"><WhatsappIcon /></a>
      </div>

      {/* HEADER */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#hero" onClick={e=>{e.preventDefault();scrollTo("hero")}} className="logo-wrap">
            <span className="logo-text-main">SHAHI</span>
            <span className="logo-sep">✦</span>
            <span className="logo-text-sub">PRINTERS</span>
          </a>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            {[["hero","Home"],["about","About Us"],["gallery","Gallery"],["reviews","Reviews"],["contact","Contact"]].map(([id,label]) => (
              <button key={id} className="nav-btn" onClick={() => scrollTo(id)}>{label}</button>
            ))}
            <div className="nav-dropdown-wrap" onMouseEnter={()=>setDropdownOpen(true)} onMouseLeave={()=>setDropdownOpen(false)}>
              <button className="nav-btn">Our Services ▾</button>
              {dropdownOpen && (
                <div className="dropdown">
                  {SERVICES.map(s => (
                    <button key={s.id} className="dd-item" onClick={()=>{setDropdownOpen(false);scrollTo("services");}}>{s.emoji} {s.title}</button>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <button className="order-btn" onClick={()=>whatsapp()}>
            <WhatsappIcon /> ORDER NOW
          </button>
          <button className={`hamburger ${menuOpen?"active":""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" ref={heroRef} className="hero-section">
        <div className="hero-bg-pattern"/>
        <div className={`hero-content ${heroIn?"fade-up":""}`}>
          <p className="hero-welcome">Welcome to</p>
          <h1 className="hero-title">SHAHI<br/><span>PRINTERS</span></h1>
          <p className="hero-sub">PREMIUM PRINTING STUDIO · MIRA ROAD</p>
          <p className="hero-desc">We don't just print — we create impressions that last forever. Premium quality. Timely delivery. Affordable prices.</p>
          <div className="hero-badges">
            <span className="badge">✦ Premium Quality</span>
            <span className="badge">✦ Timely Delivery</span>
            <span className="badge">💰 Best Price</span>
          </div>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>scrollTo("services")}>OUR SERVICES</button>
            <button className="btn-outline" onClick={()=>scrollTo("contact")}>CONTACT US</button>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll Down</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servRef} style={{ padding:"80px 24px", background:"#fdf6f0" }}>
        <div className="section-header">
          <p className="section-label">WHAT WE OFFER</p>
          <h2 className="section-title">Our Premium Services</h2>
          <div className="divider"/>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={i * 60} visible={servIn} whatsapp={whatsapp} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef} className="about-section">
        <div className={`about-inner ${aboutIn?"fade-up":""}`}>
          <div className="about-left">
            <p className="section-label light">ABOUT US</p>
            <h2 className="about-title">Your Vision, <span>Our Printing Excellence</span></h2>
            <p className="about-desc">Shahi Printers is a premium printing studio in Mira Road East, committed to delivering top-notch printing solutions with unmatched quality and creativity. We believe in building lasting relationships with our customers through our dedication and exceptional service.</p>
            <div className="features">
              {["🛡️ Premium Quality","🤖 Modern Technology","⏱️ Timely Delivery","❤️ Customer Satisfaction"].map(f=>(
                <div key={f} className="feature-item">{f}</div>
              ))}
            </div>
            <button className="btn-primary" onClick={()=>scrollTo("contact")}>KNOW MORE ABOUT US</button>
          </div>
          <div className="stats-grid">
            {STATS.map(s => <StatBox key={s.label} stat={s} />)}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" ref={gallRef} style={{ padding:"80px 24px" }}>
        <div className="section-header">
          <p className="section-label">OUR WORK</p>
          <h2 className="section-title">A Glimpse of Our Creations</h2>
          <div className="divider"/>
        </div>
        <div className="gallery-wrap">
          <button className="gal-arrow left" onClick={()=>galleryRef.current?.scrollBy({left:-320,behavior:"smooth"})}>&#8592;</button>
          <div className="gallery-track" ref={galleryRef}>
            {GALLERY.map((g, i) => (
              <div key={i} className={`gallery-item ${gallIn?"fade-up":""}`} style={{ animationDelay:`${i*80}ms` }}
                onClick={()=>setLightbox({open:true,index:i})}>
                <img src={g.src} alt={g.caption} loading="lazy"/>
                <div className="gal-caption">{g.caption}</div>
              </div>
            ))}
          </div>
          <button className="gal-arrow right" onClick={()=>galleryRef.current?.scrollBy({left:320,behavior:"smooth"})}>&#8594;</button>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" ref={revRef} className="reviews-section">
        <div className="section-header">
          <p className="section-label">WHAT CLIENTS SAY</p>
          <h2 className="section-title" style={{color:"white"}}>Google Reviews</h2>
          <div className="divider"/>
          <div className="google-badge">
            <GoogleIcon />
            <div>
              <div style={{color:"#fbbc05",fontSize:18,letterSpacing:2}}>★★★★★</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,marginTop:2}}>5.0 · Google Reviews</div>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r,i) => (
            <div key={i} className={`review-card ${revIn?"fade-up":""}`} style={{animationDelay:`${i*80}ms`}}>
              <div className="review-head">
                <div className="avatar" style={{background:r.color}}>{r.initial}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{r.name}</div>
                  <div style={{color:"#fbbc05",fontSize:14}}>★★★★★</div>
                </div>
                <div style={{marginLeft:"auto"}}><GoogleIcon /></div>
              </div>
              <p className="review-text">"{r.text}"</p>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:12,marginTop:12}}>{r.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT STRIP */}
      <div id="contact" className="contact-strip">
        {[
          { icon:"📞", label:"Call Us", val:"9870000132 / 9833000132", href:"tel:9870000132" },
          { icon:"💬", label:"WhatsApp", val:"9870000132", href:"https://wa.me/919870000132" },
          { icon:"✉️", label:"Email Us", val:"shahiprinters23@gmail.com", href:"mailto:shahiprinters23@gmail.com" },
          { icon:"📍", label:"Visit Us", val:"Mira Road East, Thane – 401107", href:null },
        ].map(c => (
          <div key={c.label} className="contact-item">
            <span style={{fontSize:26}}>{c.icon}</span>
            <div>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.6)",display:"block",textTransform:"uppercase",letterSpacing:1}}>{c.label}</span>
              {c.href ? <a href={c.href} style={{color:"#f0d060",fontWeight:600,fontSize:14}}>{c.val}</a> : <span style={{color:"#f0d060",fontSize:13}}>{c.val}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-col">
            <div className="footer-logo">SHAHI <span>✦</span> PRINTERS</div>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:1.7,marginTop:12}}>Premium printing solutions for all your personal and business needs. Quality that speaks, service that matters.</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/_.shahiprinters._" target="_blank" rel="noreferrer" className="fsoc ig"><InstagramIcon /></a>
              <a href="https://www.facebook.com/shahi.printers" target="_blank" rel="noreferrer" className="fsoc fb"><FacebookIcon /></a>
              <a href="https://wa.me/919870000132" target="_blank" rel="noreferrer" className="fsoc wa"><WhatsappIcon /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            {[["hero","Home"],["about","About Us"],["services","Our Services"],["gallery","Gallery"],["reviews","Reviews"],["contact","Contact"]].map(([id,label])=>(
              <button key={id} className="footer-link" onClick={()=>scrollTo(id)}>{label}</button>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            {SERVICES.slice(0,8).map(s=>(
              <button key={s.id} className="footer-link" onClick={()=>scrollTo("services")}>{s.title}</button>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contact & Location</h4>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13,lineHeight:1.9}}>
              📍 Shop No. B-8, Shanti Shopping Centre,<br/>Near Railway Station,<br/>Mira Road East, Thane – 401107<br/>
              📞 <a href="tel:9870000132" style={{color:"#f0d060"}}>9870000132</a> / <a href="tel:9833000132" style={{color:"#f0d060"}}>9833000132</a><br/>
              ✉️ <a href="mailto:shahiprinters23@gmail.com" style={{color:"#f0d060"}}>shahiprinters23@gmail.com</a><br/>
              🕐 Mon–Sun: 10:00 AM – 10:00 PM
            </p>
            <a href="https://www.google.com/maps/place/Shahi+printers/@19.280654,72.8546727" target="_blank" rel="noreferrer"
              style={{display:"inline-block",marginTop:12,background:"rgba(212,175,55,0.15)",border:"1px solid #d4af37",color:"#d4af37",padding:"8px 16px",borderRadius:8,fontSize:13,textDecoration:"none"}}>
              📍 Get Directions
            </a>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",textAlign:"center",padding:"20px 24px",color:"rgba(255,255,255,0.35)",fontSize:12}}>
          © 2026 Shahi Printers. All Rights Reserved. | Shop No. B-8, Shanti Shopping Centre, Mira Road East, Thane – 401107
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <button className="wa-float" onClick={()=>whatsapp()}>
        <WhatsappIcon /> <span>Order Now</span>
      </button>

      {/* LIGHTBOX */}
      {lightbox.open && (
        <Lightbox
          images={GALLERY}
          index={lightbox.index}
          onClose={()=>setLightbox(v=>({...v,open:false}))}
          onPrev={()=>setLightbox(v=>({...v,index:(v.index-1+GALLERY.length)%GALLERY.length}))}
          onNext={()=>setLightbox(v=>({...v,index:(v.index+1)%GALLERY.length}))}
        />
      )}
    </div>
  );
}

/* ── SERVICE CARD ── */
function ServiceCard({ service, delay, visible, whatsapp }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={`service-card ${visible?"fade-up":""}`} style={{animationDelay:`${delay}ms`}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div className="service-img-wrap">
        <img src={service.img} alt={service.title} loading="lazy" style={{transform:hovered?"scale(1.08)":"scale(1)",transition:"transform 0.5s ease"}}/>
        <div className={`service-overlay ${hovered?"visible":""}`} onClick={()=>whatsapp(`Hello! I'm interested in ${service.title}`)}>
          Order Now →
        </div>
      </div>
      <div className="service-body">
        <div style={{fontSize:28,marginBottom:8}}>{service.emoji}</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#1a0533",marginBottom:6}}>{service.title}</h3>
        <p style={{color:"#666",fontSize:13,lineHeight:1.6}}>{service.desc}</p>
        <span style={{display:"inline-block",marginTop:12,color:"#c2185b",fontWeight:600,fontSize:13}}>Explore →</span>
      </div>
    </div>
  );
}

/* ── STAT BOX ── */
function StatBox({ stat }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`stat-box ${inView?"fade-up":""}`}>
      <div style={{fontSize:32}}>{stat.icon}</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:800,color:"#d4af37",margin:"4px 0"}}>{stat.num}</div>
      <div style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>{stat.label}</div>
    </div>
  );
}

/* ── CSS ── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
button { cursor: pointer; font-family: inherit; }
a { text-decoration: none; }
img { display: block; max-width: 100%; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #1a0533; }
::-webkit-scrollbar-thumb { background: #c2185b; border-radius: 3px; }

/* SOCIAL SIDEBAR */
.social-sidebar { position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 999; display: flex; flex-direction: column; gap: 2px; }
.soc-btn { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: white; border-radius: 8px 0 0 8px; transition: transform 0.3s; }
.soc-btn:hover { transform: translateX(-6px); }
.soc-ig { background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045); }
.soc-fb { background: #1877f2; }
.soc-wa { background: #25d366; }

/* HEADER */
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: linear-gradient(135deg, #1a0533 0%, #2d0a5e 100%); border-bottom: 1px solid rgba(212,175,55,0.2); transition: all 0.3s; }
.header.scrolled { box-shadow: 0 4px 30px rgba(0,0,0,0.4); background: rgba(26,5,51,0.97); backdrop-filter: blur(12px); }
.header-inner { max-width: 1400px; margin: 0 auto; padding: 0 24px; height: 72px; display: flex; align-items: center; gap: 24px; }

/* LOGO */
.logo-wrap { display: flex; align-items: center; gap: 8px; text-decoration: none; flex-shrink: 0; }
.logo-text-main { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800; color: white; letter-spacing: 3px; }
.logo-sep { color: #d4af37; font-size: 14px; }
.logo-text-sub { font-family: 'Cormorant Garamond', serif; font-size: 13px; color: #d4af37; letter-spacing: 2px; font-style: italic; }

/* NAV */
.main-nav { display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center; flex-wrap: wrap; }
.nav-btn { background: none; border: none; color: rgba(255,255,255,0.85); font-size: 13px; font-weight: 500; padding: 8px 12px; border-radius: 6px; transition: all 0.2s; white-space: nowrap; }
.nav-btn:hover { color: #d4af37; background: rgba(212,175,55,0.1); }
.nav-dropdown-wrap { position: relative; }
.dropdown { position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%); background: #1a0533; border: 1px solid rgba(212,175,55,0.2); border-radius: 10px; min-width: 230px; padding: 8px 0; box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 200; display: grid; grid-template-columns: 1fr 1fr; }
.dd-item { background: none; border: none; display: block; width: 100%; padding: 9px 16px; color: rgba(255,255,255,0.8); font-size: 12px; text-align: left; transition: all 0.2s; }
.dd-item:hover { color: #d4af37; background: rgba(212,175,55,0.08); padding-left: 22px; }

/* ORDER BTN */
.order-btn { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg,#c2185b,#e91e8c); color: white; padding: 10px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 1px; border: none; white-space: nowrap; transition: all 0.3s; box-shadow: 0 4px 16px rgba(233,30,140,0.4); flex-shrink: 0; }
.order-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(233,30,140,0.5); }

/* HAMBURGER */
.hamburger { display: none; background: none; border: none; flex-direction: column; gap: 5px; padding: 4px; }
.hamburger span { display: block; width: 24px; height: 2px; background: white; border-radius: 2px; transition: all 0.3s; }
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

/* HERO */
.hero-section { min-height: 100vh; background: linear-gradient(135deg,#1a0533 0%,#2d0a5e 50%,#4a1a8a 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 100px 24px 80px; }
.hero-bg-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%,transparent 50%), radial-gradient(circle at 80% 20%, rgba(233,30,140,0.12) 0%,transparent 40%); }
.hero-content { max-width: 700px; text-align: center; position: relative; z-index: 1; }
.hero-welcome { color: rgba(255,255,255,0.6); font-size: 14px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px; font-style: italic; font-family: 'Cormorant Garamond', serif; }
.hero-title { font-family: 'Playfair Display', serif; font-size: clamp(56px,10vw,100px); font-weight: 800; color: white; line-height: 1; margin-bottom: 16px; letter-spacing: -1px; }
.hero-title span { color: #d4af37; display: block; font-style: italic; }
.hero-sub { color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 20px; }
.hero-desc { color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.7; margin-bottom: 28px; max-width: 520px; margin-left: auto; margin-right: auto; }
.hero-badges { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
.badge { background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.3); color: #f0d060; padding: 6px 16px; border-radius: 50px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
.hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.hero-scroll-hint { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); text-align: center; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; }
.scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom,rgba(212,175,55,0.6),transparent); margin: 8px auto 0; }

/* BUTTONS */
.btn-primary { background: linear-gradient(135deg,#c2185b,#e91e8c); color: white; padding: 14px 32px; border-radius: 50px; border: none; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; transition: all 0.3s; box-shadow: 0 4px 20px rgba(233,30,140,0.35); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(233,30,140,0.5); }
.btn-outline { background: transparent; color: #d4af37; padding: 14px 32px; border-radius: 50px; border: 2px solid #d4af37; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; transition: all 0.3s; }
.btn-outline:hover { background: #d4af37; color: #1a0533; }

/* SECTION HEADER */
.section-header { text-align: center; margin-bottom: 56px; }
.section-label { color: #c2185b; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-weight: 700; margin-bottom: 12px; }
.section-label.light { color: rgba(212,175,55,0.8); }
.section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,5vw,42px); font-weight: 700; color: #1a0533; }
.divider { width: 60px; height: 3px; background: linear-gradient(90deg,#c2185b,#e91e8c); margin: 16px auto 0; border-radius: 2px; }

/* SERVICES GRID */
.services-grid { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill,minmax(260px,1fr)); gap: 24px; }
.service-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(26,5,51,0.08); transition: all 0.35s; }
.service-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(26,5,51,0.15); }
.service-img-wrap { position: relative; height: 200px; overflow: hidden; }
.service-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.service-overlay { position: absolute; inset: 0; background: rgba(194,24,91,0.85); color: white; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; letter-spacing: 1px; opacity: 0; transition: opacity 0.3s; cursor: pointer; }
.service-overlay.visible { opacity: 1; }
.service-body { padding: 20px; }

/* ABOUT */
.about-section { background: linear-gradient(135deg,#1a0533,#2d0a5e); padding: 100px 24px; }
.about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.about-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,40px); font-weight: 700; color: white; margin: 16px 0 20px; line-height: 1.2; }
.about-title span { color: #d4af37; font-style: italic; }
.about-desc { color: rgba(255,255,255,0.65); font-size: 15px; line-height: 1.8; margin-bottom: 28px; }
.features { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
.feature-item { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 500; }
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.stat-box { background: rgba(255,255,255,0.05); border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 28px 20px; text-align: center; transition: all 0.3s; }
.stat-box:hover { background: rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.4); transform: translateY(-4px); }

/* GALLERY */
.gallery-wrap { position: relative; max-width: 1300px; margin: 0 auto; }
.gallery-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 8px 0 16px; scrollbar-width: none; }
.gallery-track::-webkit-scrollbar { display: none; }
.gallery-item { flex: 0 0 280px; scroll-snap-align: start; border-radius: 14px; overflow: hidden; cursor: pointer; position: relative; box-shadow: 0 4px 20px rgba(26,5,51,0.12); transition: all 0.35s; }
.gallery-item:hover { transform: scale(1.03); box-shadow: 0 12px 32px rgba(26,5,51,0.2); }
.gallery-item img { width: 100%; height: 200px; object-fit: cover; display: block; }
.gal-caption { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent,rgba(26,5,51,0.85)); color: white; padding: 24px 12px 12px; font-size: 13px; font-weight: 600; }
.gal-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(26,5,51,0.75); border: 1px solid rgba(212,175,55,0.3); color: #d4af37; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; z-index: 2; backdrop-filter: blur(8px); transition: all 0.2s; }
.gal-arrow:hover { background: #c2185b; border-color: #c2185b; color: white; }
.gal-arrow.left { left: -22px; }
.gal-arrow.right { right: -22px; }

/* REVIEWS */
.reviews-section { background: linear-gradient(135deg,#1a0533,#2d0a5e); padding: 100px 24px; }
.reviews-section .section-title { color: white; }
.reviews-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill,minmax(320px,1fr)); gap: 20px; }
.review-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(8px); transition: all 0.3s; }
.review-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(212,175,55,0.3); transform: translateY(-4px); }
.review-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px; flex-shrink: 0; }
.review-text { color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.7; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 16px; }
.google-badge { display: inline-flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; padding: 10px 20px; margin-top: 20px; }

/* CONTACT STRIP */
.contact-strip { background: #1a0533; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); display: flex; flex-wrap: wrap; justify-content: center; gap: 0; }
.contact-item { display: flex; align-items: center; gap: 16px; padding: 28px 40px; border-right: 1px solid rgba(255,255,255,0.06); flex: 1; min-width: 220px; }
.contact-item:last-child { border-right: none; }

/* FOOTER */
.footer { background: #0d0220; padding: 64px 24px 0; }
.footer-main { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1.5fr 2fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer-logo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 800; color: white; letter-spacing: 2px; }
.footer-logo span { color: #d4af37; }
.footer-socials { display: flex; gap: 10px; margin-top: 20px; }
.fsoc { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 8px; color: white; transition: transform 0.2s; }
.fsoc:hover { transform: translateY(-3px); }
.fsoc.ig { background: linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045); }
.fsoc.fb { background: #1877f2; }
.fsoc.wa { background: #25d366; }
.footer-heading { color: white; font-weight: 700; font-size: 14px; letter-spacing: 1px; margin-bottom: 16px; }
.footer-link { display: block; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 13px; text-align: left; padding: 4px 0; transition: color 0.2s; line-height: 1.9; }
.footer-link:hover { color: #d4af37; }
.footer-col { display: flex; flex-direction: column; }

/* WHATSAPP FLOAT */
.wa-float { position: fixed; bottom: 24px; right: 24px; z-index: 998; background: #25d366; color: white; border: none; border-radius: 50px; padding: 14px 22px; display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 700; box-shadow: 0 6px 24px rgba(37,211,102,0.45); transition: all 0.3s; }
.wa-float:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(37,211,102,0.55); }

/* ANIMATIONS */
.fade-up { animation: fadeUp 0.7s both; }
@keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }

/* RESPONSIVE */
@media (max-width: 900px) {
  .main-nav { display: none; position: fixed; top: 72px; left: 0; right: 0; background: rgba(26,5,51,0.98); flex-direction: column; gap: 0; padding: 16px 0; backdrop-filter: blur(12px); }
  .main-nav.open { display: flex; }
  .hamburger { display: flex; }
  .about-inner { grid-template-columns: 1fr; gap: 48px; }
  .footer-main { grid-template-columns: 1fr 1fr; gap: 32px; }
  .gal-arrow.left { left: -8px; }
  .gal-arrow.right { right: -8px; }
}
@media (max-width: 600px) {
  .footer-main { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .contact-item { min-width: 180px; padding: 20px 16px; }
  .dropdown { grid-template-columns: 1fr; }
  .hero-btns { flex-direction: column; align-items: center; }
}
`;
