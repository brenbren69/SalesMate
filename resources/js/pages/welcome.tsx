import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SALESMATE — Federated Distributors Inc.">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=syne:400,500,600,700,800&family=dm-sans:300,400,500"
                    rel="stylesheet"
                />
                <style>{`
                    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                    :root {
                        --navy:   #0b1120;
                        --navy2:  #111827;
                        --sky:    #38bdf8;
                        --sky2:   #0ea5e9;
                        --gold:   #f59e0b;
                        --white:  #f8fafc;
                        --muted:  #94a3b8;
                        --border: rgba(56,189,248,0.15);
                    }

                    body { background: var(--navy); color: var(--white); font-family: 'DM Sans', sans-serif; }

                    /* ── Grid texture ── */
                    .grid-bg {
                        background-image:
                            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
                        background-size: 48px 48px;
                    }

                    /* ── Glow orbs ── */
                    .orb {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(120px);
                        pointer-events: none;
                    }

                    /* ── Animations ── */
                    @keyframes fadeUp {
                        from { opacity:0; transform:translateY(28px); }
                        to   { opacity:1; transform:translateY(0); }
                    }
                    @keyframes pulse-ring {
                        0%,100% { opacity:.4; transform:scale(1); }
                        50%     { opacity:.7; transform:scale(1.04); }
                    }
                    @keyframes float {
                        0%,100% { transform:translateY(0px); }
                        50%     { transform:translateY(-10px); }
                    }
                    @keyframes shimmer {
                        0%   { background-position: -200% center; }
                        100% { background-position:  200% center; }
                    }

                    .fade-up-1 { animation: fadeUp .7s ease both; }
                    .fade-up-2 { animation: fadeUp .7s .15s ease both; }
                    .fade-up-3 { animation: fadeUp .7s .30s ease both; }
                    .fade-up-4 { animation: fadeUp .7s .45s ease both; }
                    .fade-up-5 { animation: fadeUp .7s .60s ease both; }

                    .float-card { animation: float 5s ease-in-out infinite; }

                    /* ── Nav ── */
                    .nav {
                        position: fixed; top:0; left:0; right:0; z-index:50;
                        display:flex; align-items:center; justify-content:space-between;
                        padding: 0 2.5rem;
                        height: 64px;
                        background: rgba(11,17,32,0.85);
                        backdrop-filter: blur(16px);
                        border-bottom: 1px solid var(--border);
                    }
                    .nav-logo {
                        font-family: 'Syne', sans-serif;
                        font-weight: 800;
                        font-size: 1.25rem;
                        letter-spacing: .04em;
                        color: var(--white);
                    }
                    .nav-logo span { color: var(--sky); }
                    .nav-links { display:flex; align-items:center; gap:1rem; }

                    /* ── Buttons ── */
                    .btn-ghost {
                        padding: .5rem 1.25rem;
                        border: 1px solid rgba(248,250,252,.15);
                        border-radius: 8px;
                        font-size: .875rem;
                        font-weight: 500;
                        color: var(--white);
                        text-decoration: none;
                        transition: border-color .2s, background .2s;
                    }
                    .btn-ghost:hover { border-color: var(--sky); background: rgba(56,189,248,.06); }

                    .btn-primary {
                        padding: .5rem 1.25rem;
                        border: 1px solid var(--sky2);
                        border-radius: 8px;
                        font-size: .875rem;
                        font-weight: 600;
                        color: var(--navy);
                        background: var(--sky);
                        text-decoration: none;
                        transition: background .2s, transform .15s;
                    }
                    .btn-primary:hover { background: var(--sky2); transform: translateY(-1px); }

                    .btn-hero {
                        display: inline-flex; align-items:center; gap:.5rem;
                        padding: .875rem 2rem;
                        border-radius: 10px;
                        font-size: 1rem; font-weight: 600;
                        color: var(--navy);
                        background: linear-gradient(135deg, var(--sky) 0%, var(--sky2) 100%);
                        text-decoration: none;
                        box-shadow: 0 0 32px rgba(56,189,248,.35);
                        transition: box-shadow .2s, transform .15s;
                    }
                    .btn-hero:hover { box-shadow: 0 0 48px rgba(56,189,248,.55); transform: translateY(-2px); }

                    /* ── Hero ── */
                    .hero {
                        min-height: 100vh;
                        display:flex; flex-direction:column; align-items:center; justify-content:center;
                        text-align:center;
                        padding: 7rem 1.5rem 4rem;
                        position: relative; overflow: hidden;
                    }

                    .badge {
                        display: inline-flex; align-items:center; gap:.5rem;
                        padding: .375rem 1rem;
                        border-radius: 999px;
                        border: 1px solid rgba(56,189,248,.3);
                        background: rgba(56,189,248,.08);
                        font-size: .75rem; font-weight:600; letter-spacing:.08em;
                        color: var(--sky);
                        text-transform: uppercase;
                        margin-bottom: 1.5rem;
                    }
                    .badge-dot {
                        width:6px; height:6px; border-radius:50%;
                        background:var(--sky);
                        animation: pulse-ring 2s ease-in-out infinite;
                    }

                    .hero-title {
                        font-family: 'Syne', sans-serif;
                        font-weight: 800;
                        font-size: clamp(2.5rem, 6vw, 5rem);
                        line-height: 1.08;
                        letter-spacing: -.02em;
                        color: var(--white);
                        max-width: 820px;
                    }
                    .hero-title .accent {
                        background: linear-gradient(90deg, var(--sky) 0%, #818cf8 100%);
                        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    .hero-title .gold { color: var(--gold); -webkit-text-fill-color: var(--gold); }

                    .hero-sub {
                        margin-top: 1.25rem;
                        font-size: 1.1rem; font-weight:300; line-height:1.7;
                        color: var(--muted); max-width:580px;
                    }

                    .hero-cta { margin-top: 2.25rem; display:flex; gap:1rem; align-items:center; justify-content:center; flex-wrap:wrap; }

                    /* ── Dashboard mock ── */
                    .mock-wrap {
                        margin-top: 4.5rem;
                        width: 100%; max-width: 900px;
                        position: relative;
                    }
                    .mock-frame {
                        border-radius: 16px;
                        border: 1px solid var(--border);
                        background: var(--navy2);
                        overflow: hidden;
                        box-shadow: 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(56,189,248,.1);
                    }
                    .mock-bar {
                        height: 36px;
                        background: rgba(255,255,255,.03);
                        border-bottom: 1px solid var(--border);
                        display:flex; align-items:center; padding:0 1rem; gap:.5rem;
                    }
                    .mock-dot { width:10px;height:10px;border-radius:50%; }
                    .mock-body { padding:1.25rem; display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:.75rem; }
                    .mock-card {
                        border-radius:10px; padding:1rem;
                        background: rgba(255,255,255,.04);
                        border: 1px solid var(--border);
                    }
                    .mock-card-label { font-size:.65rem; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; }
                    .mock-card-val { font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:700; margin-top:.25rem; }
                    .mock-chart {
                        grid-column: span 4;
                        border-radius:10px; padding:1rem;
                        background: rgba(255,255,255,.04);
                        border: 1px solid var(--border);
                        height: 110px;
                        display:flex; align-items:flex-end; gap:6px;
                    }
                    .mock-bar-item {
                        flex:1; border-radius:4px 4px 0 0;
                        background: linear-gradient(180deg, var(--sky) 0%, rgba(56,189,248,.2) 100%);
                        transition: opacity .2s;
                    }

                    /* ── Features ── */
                    .section { padding: 6rem 1.5rem; max-width: 1100px; margin: 0 auto; }
                    .section-label {
                        font-size:.75rem; font-weight:700; letter-spacing:.12em;
                        text-transform:uppercase; color:var(--sky); margin-bottom:.75rem;
                    }
                    .section-title {
                        font-family:'Syne',sans-serif; font-weight:800;
                        font-size: clamp(1.75rem, 3.5vw, 2.75rem);
                        line-height:1.15; color:var(--white);
                    }
                    .features-grid { margin-top:3rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.25rem; }
                    .feature-card {
                        border-radius:14px; padding:1.75rem;
                        background: rgba(255,255,255,.03);
                        border: 1px solid var(--border);
                        transition: border-color .2s, background .2s, transform .2s;
                        position:relative; overflow:hidden;
                    }
                    .feature-card::before {
                        content:''; position:absolute; inset:0;
                        background: radial-gradient(circle at top left, rgba(56,189,248,.06), transparent 60%);
                        pointer-events:none;
                    }
                    .feature-card:hover { border-color: rgba(56,189,248,.4); background:rgba(56,189,248,.04); transform:translateY(-3px); }
                    .feature-icon {
                        width:44px; height:44px; border-radius:10px;
                        display:flex; align-items:center; justify-content:center;
                        font-size:1.25rem; margin-bottom:1.1rem;
                    }
                    .feature-name { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:var(--white); margin-bottom:.5rem; }
                    .feature-desc { font-size:.875rem; color:var(--muted); line-height:1.65; }

                    /* ── Stats strip ── */
                    .stats-strip {
                        border-top: 1px solid var(--border);
                        border-bottom: 1px solid var(--border);
                        background: rgba(56,189,248,.03);
                        padding: 3rem 1.5rem;
                    }
                    .stats-inner { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:2rem; text-align:center; }
                    .stat-val { font-family:'Syne',sans-serif; font-weight:800; font-size:2.25rem; color:var(--sky); }
                    .stat-label { font-size:.875rem; color:var(--muted); margin-top:.25rem; }

                    /* ── Footer ── */
                    .footer {
                        border-top: 1px solid var(--border);
                        padding: 2rem 2.5rem;
                        display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;
                        font-size:.8rem; color:var(--muted);
                    }
                    .footer-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; color:var(--white); }
                    .footer-logo span { color:var(--sky); }
                `}</style>
            </Head>

            <div className="grid-bg" style={{ minHeight: '100vh' }}>

                {/* ── Nav ── */}
                <nav className="nav">
                    <div className="nav-logo">SALES<span>MATE</span></div>
                    <div className="nav-links">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary">
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="btn-ghost">Log in</Link>
                                <Link href={route('register')} className="btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* ── Hero ── */}
                <section className="hero">
                    {/* Orbs */}
                    <div className="orb" style={{ width:600, height:600, top:'-10%', left:'50%', transform:'translateX(-50%)', background:'rgba(56,189,248,0.10)' }} />
                    <div className="orb" style={{ width:300, height:300, bottom:'10%', left:'5%', background:'rgba(129,140,248,0.08)' }} />

                    <div className="badge fade-up-1">
                        <span className="badge-dot" />
                        RPA · AI Analytics · Recommendation Engine
                    </div>

                    <h1 className="hero-title fade-up-2">
                        <span className="accent">SALESMATE</span>
                        <br />
                        <span style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', fontWeight: 500, color: 'var(--muted)', fontFamily: "'DM Sans', sans-serif" }}>
                            Sales Management System for
                        </span>
                        <br />
                        <span className="gold">Federated Distributors Inc.</span>
                    </h1>

                    <p className="hero-sub fade-up-3">
                        An RPA-enabled platform with AI-driven sales analytics and an intelligent recommendation engine — built to streamline operations and accelerate growth.
                    </p>

                    <div className="hero-cta fade-up-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-hero">
                                Open Dashboard
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('register')} className="btn-hero">
                                    Get Started
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </Link>
                                <Link href={route('login')} className="btn-ghost">Sign In</Link>
                            </>
                        )}
                    </div>

                    {/* Dashboard Mock */}
                    <div className="mock-wrap fade-up-5 float-card">
                        <div className="mock-frame">
                            <div className="mock-bar">
                                <div className="mock-dot" style={{ background:'#ef4444' }} />
                                <div className="mock-dot" style={{ background:'#f59e0b' }} />
                                <div className="mock-dot" style={{ background:'#22c55e' }} />
                            </div>
                            <div className="mock-body">
                                {[
                                    { label: 'Total Revenue',  val: '₱2.4M',  color: '#38bdf8' },
                                    { label: 'Active Orders', val: '1,284',   color: '#a78bfa' },
                                    { label: 'Conversion',    val: '68.3%',   color: '#34d399' },
                                    { label: 'Forecasted',    val: '₱3.1M',   color: '#f59e0b' },
                                ].map(c => (
                                    <div className="mock-card" key={c.label}>
                                        <div className="mock-card-label">{c.label}</div>
                                        <div className="mock-card-val" style={{ color: c.color }}>{c.val}</div>
                                    </div>
                                ))}
                                <div className="mock-chart">
                                    {[40,60,45,75,55,85,65,90,70,95,80,100].map((h, i) => (
                                        <div key={i} className="mock-bar-item" style={{ height:`${h}%`, opacity: i === 11 ? 1 : 0.5 + (i/11)*0.4 }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Glow under mock */}
                        <div style={{ position:'absolute', bottom:'-40px', left:'50%', transform:'translateX(-50%)', width:'70%', height:'40px', background:'rgba(56,189,248,0.2)', filter:'blur(30px)', borderRadius:'50%' }} />
                    </div>
                </section>

                {/* ── Stats ── */}
                <div className="stats-strip">
                    <div className="stats-inner">
                        {[
                            { val: '99.9%', label: 'System Uptime' },
                            { val: '3×',    label: 'Faster Reporting' },
                            { val: '₱0',    label: 'Manual Entry Errors' },
                            { val: '24/7',  label: 'AI Monitoring' },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="stat-val">{s.val}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Features ── */}
                <div style={{ maxWidth:1100, margin:'0 auto' }}>
                    <section className="section">
                        <p className="section-label">Core Capabilities</p>
                        <h2 className="section-title">
                            Everything your sales team needs,<br />
                            <span style={{ color:'var(--sky)' }}>intelligently automated.</span>
                        </h2>

                        <div className="features-grid">
                            {[
                                {
                                    icon: '🤖', bg: 'rgba(56,189,248,0.12)', color: '#38bdf8',
                                    name: 'RPA-Enabled Automation',
                                    desc: 'Robotic Process Automation handles repetitive sales tasks — order entry, invoicing, and data syncing — with zero manual effort.',
                                },
                                {
                                    icon: '📊', bg: 'rgba(167,139,250,0.12)', color: '#a78bfa',
                                    name: 'AI-Driven Sales Analytics',
                                    desc: 'Real-time dashboards powered by machine learning surface trends, anomalies, and performance insights across all product lines.',
                                },
                                {
                                    icon: '💡', bg: 'rgba(251,191,36,0.12)', color: '#fbbf24',
                                    name: 'Recommendation Engine',
                                    desc: 'Intelligent product and upsell recommendations tailored per customer segment, driven by historical purchase patterns.',
                                },
                                {
                                    icon: '📦', bg: 'rgba(52,211,153,0.12)', color: '#34d399',
                                    name: 'Product Management',
                                    desc: 'Centralized catalog with real-time stock levels, low-inventory alerts, and category-based filtering for fast lookups.',
                                },
                                {
                                    icon: '📋', bg: 'rgba(56,189,248,0.12)', color: '#38bdf8',
                                    name: 'Automated Reporting',
                                    desc: 'Scheduled PDF and Excel reports delivered to stakeholders automatically — daily, weekly, or on-demand.',
                                },
                            ].map(f => (
                                <div className="feature-card" key={f.name}>
                                    <div className="feature-icon" style={{ background: f.bg }}>
                                        <span style={{ fontSize:'1.35rem' }}>{f.icon}</span>
                                    </div>
                                    <div className="feature-name">{f.name}</div>
                                    <div className="feature-desc">{f.desc}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── CTA Banner ── */}
                <div style={{
                    margin:'0 1.5rem 5rem',
                    maxWidth:900, marginLeft:'auto', marginRight:'auto',
                    borderRadius:20,
                    background:'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(129,140,248,0.10) 100%)',
                    border:'1px solid rgba(56,189,248,0.25)',
                    padding:'3rem 2.5rem',
                    textAlign:'center',
                    position:'relative', overflow:'hidden',
                }}>
                    <div className="orb" style={{ width:300,height:300,top:'-50%',left:'50%',transform:'translateX(-50%)',background:'rgba(56,189,248,0.08)' }} />
                    <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(1.5rem,3vw,2.25rem)', color:'var(--white)', marginBottom:'1rem' }}>
                        Ready to transform your sales operations?
                    </p>
                    <p style={{ color:'var(--muted)', fontSize:'.95rem', marginBottom:'1.75rem', maxWidth:480, margin:'0 auto 1.75rem' }}>
                        Join Federated Distributors Inc. in leveraging AI and RPA to drive smarter, faster, and more profitable sales.
                    </p>
                    {auth.user ? (
                        <Link href={route('dashboard')} className="btn-hero">
                            Open Dashboard →
                        </Link>
                    ) : (
                        <Link href={route('register')} className="btn-hero">
                            Get Started Today →
                        </Link>
                    )}
                </div>

                {/* ── Footer ── */}
                <footer className="footer">
                    <div>
                        <div className="footer-logo">SALES<span>MATE</span></div>
                        <div style={{ marginTop:'.35rem', fontSize:'.75rem' }}>Federated Distributors Inc. © 2025</div>
                    </div>
                    <div style={{ fontSize:'.75rem', textAlign:'right' }}>
                        RPA · AI Analytics · Recommendation Engine
                    </div>
                </footer>

            </div>
        </>
    );
}