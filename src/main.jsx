import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Construction,
  FileText,
  Home,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Search,
  MapPin,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import "./styles.css";

const images = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  apartment:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
  house:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  villa:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
  bungalow:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
  project:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
};

const houseTypes = [
  {
    name: "Apartment",
    description: "Efficient urban homes with thoughtful shared amenities.",
    rate: 2100,
    duration: "8–12 months",
    image: images.apartment,
  },
  {
    name: "Individual House",
    description: "A personal family home designed around your lifestyle.",
    rate: 2350,
    duration: "10–14 months",
    image: images.house,
  },
  {
    name: "Villa",
    description: "Spacious premium living with garden-facing spaces.",
    rate: 2900,
    duration: "12–18 months",
    image: images.villa,
  },
  {
    name: "Bungalow",
    description: "Elegant single-level living with timeless character.",
    rate: 2650,
    duration: "11–16 months",
    image: images.bungalow,
  },
];
const packages = [
  {
    name: "Basic Structure",
    rate: 1700,
    description: "A dependable structural shell ready for finishing.",
    includes: [
      "Foundation and RCC frame",
      "Brickwork and plastering",
      "Basic electrical conduits",
    ],
    excludes: "Flooring, fixtures, painting",
  },
  {
    name: "Semi-Finished",
    rate: 2200,
    description: "A balanced package for flexible personal finishing.",
    includes: [
      "Everything in Basic",
      "Flooring and doors",
      "Plumbing and electrical fixtures",
    ],
    excludes: "Modular kitchen and wardrobes",
  },
  {
    name: "Fully Finished",
    rate: 2900,
    description: "Move-in-ready details with a premium finish.",
    includes: [
      "Everything in Semi-Finished",
      "Kitchen and wardrobes",
      "Painting, lights and landscaping",
    ],
    excludes: "Loose furniture and appliances",
  },
];

const demoUsers = [
  {
    id: "u1",
    name: "Aarthi Owner",
    email: "owner@aarthi.demo",
    password: "owner123",
    role: "owner",
  },
  {
    id: "u2",
    name: "Priya Engineer",
    email: "engineer@aarthi.demo",
    password: "engineer123",
    role: "engineer",
  },
  {
    id: "u3",
    name: "Kumar Manager",
    email: "manager@aarthi.demo",
    password: "manager123",
    role: "manager",
  },
  {
    id: "u4",
    name: "Demo Client",
    email: "client@aarthi.demo",
    password: "client123",
    role: "client",
  },
];
const seed = {
  users: demoUsers,
  inquiries: [],
  requests: [],
  updates: [],
  projects: [
    {
      id: "AC-1042",
      name: "Greenview Residence",
      client: "Demo Client",
      clientId: "u4",
      type: "Villa",
      package: "Fully Finished",
      location: "Coimbatore",
      area: 2400,
      budget: 6960000,
      progress: 68,
      status: "In Progress",
      manager: "u3",
      engineer: "u2",
      delivery: "2026-12-18",
      image: images.villa,
    },
    {
      id: "AC-1036",
      name: "Lakewood Bungalow",
      client: "Meena Srinivas",
      clientId: "external",
      type: "Bungalow",
      package: "Semi-Finished",
      location: "Chennai",
      area: 1850,
      budget: 4070000,
      progress: 42,
      status: "Delayed",
      manager: "u3",
      engineer: "u2",
      delivery: "2026-10-28",
      image: images.bungalow,
    },
    {
      id: "AC-1024",
      name: "Palm Court Homes",
      client: "Rahul Nair",
      clientId: "external",
      type: "Individual House",
      package: "Fully Finished",
      location: "Bengaluru",
      area: 2100,
      budget: 6090000,
      progress: 100,
      status: "Completed",
      manager: "u3",
      engineer: "u2",
      delivery: "2026-06-20",
      image: images.house,
    },
  ],
};

const AppContext = createContext(null);
function useApp() {
  return useContext(AppContext);
}
function AppProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("aarthi-data")) || seed;
    } catch {
      return seed;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("aarthi-user")) || null;
    } catch {
      return null;
    }
  });
  useEffect(
    () => localStorage.setItem("aarthi-data", JSON.stringify(data)),
    [data],
  );
  useEffect(
    () =>
      user
        ? localStorage.setItem("aarthi-user", JSON.stringify(user))
        : localStorage.removeItem("aarthi-user"),
    [user],
  );
  const actions = {
    login: (email, password) => {
      const found = data.users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!found) return false;
      setUser(found);
      return true;
    },
    logout: () => setUser(null),
    register: (account) => {
      const newUser = { ...account, id: `u${Date.now()}`, role: "client" };
      setData((d) => ({ ...d, users: [...d.users, newUser] }));
      setUser(newUser);
    },
    addInquiry: (inquiry) =>
      setData((d) => ({
        ...d,
        inquiries: [
          { ...inquiry, id: `INQ-${Date.now()}`, status: "New" },
          ...d.inquiries,
        ],
      })),
    addRequest: (request) =>
      setData((d) => ({
        ...d,
        requests: [
          { ...request, id: `REQ-${Date.now()}`, status: "Submitted" },
          ...d.requests,
        ],
      })),
    updateProject: (projectId, changes) =>
      setData((d) => ({
        ...d,
        projects: d.projects.map((project) =>
          project.id === projectId ? { ...project, ...changes } : project,
        ),
      })),
    createProject: (project) =>
      setData((d) => ({
        ...d,
        projects: [
          {
            ...project,
            name: project.name || `${project.type} - ${project.location}`,
            id: `AC-${Math.floor(1000 + Math.random() * 9000)}`,
            progress: 0,
            status: "Planning",
            image: houseTypes.find((house) => house.name === project.type)?.image || images.house,
          },
          ...d.projects,
        ],
        inquiries: d.inquiries.map((inquiry) =>
          inquiry.id === project.inquiryId ? { ...inquiry, status: "Project created" } : inquiry,
        ),
      })),
    updateRequest: (requestId, changes) =>
      setData((d) => ({
        ...d,
        requests: d.requests.map((request) =>
          request.id === requestId ? { ...request, ...changes } : request,
        ),
      })),
    addUpdate: (update) =>
      setData((d) => ({
        ...d,
        updates: [
          { ...update, id: `UPD-${Date.now()}`, createdAt: new Date().toISOString() },
          ...(d.updates || []),
        ],
      })),
    reset: () => {
      setData(seed);
      setUser(null);
    },
  };
  return (
    <AppContext.Provider value={{ data, user, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

function Logo({ dark = false }) {
  return (
    <Link className={`logo ${dark ? "logo-dark" : ""}`} to="/">
      <img className="logo-image" src="/aarthi-logo.png" alt="Aarthi Constructions" />
    </Link>
  );
}
function Button({
  children,
  variant = "primary",
  to,
  onClick,
  type = "button",
  className = "",
}) {
  const content = (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
  return to ? (
    <Link to={to} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  ) : (
    content
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav className={open ? "nav-open" : ""}>
          <a href="/#designs" onClick={() => setOpen(false)}>
            House Designs
          </a>
          <a href="/#packages" onClick={() => setOpen(false)}>
            Packages
          </a>
          <a href="/#projects" onClick={() => setOpen(false)}>
            Our Projects
          </a>
          <a href="/#about" onClick={() => setOpen(false)}>
            About Us
          </a>
          <a href="/#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Button to="/register" variant="outline">
            Sign Up
          </Button>
        </nav>
        <Button to="/login" className="nav-quote">
          Get a Quote <ArrowRight size={16} />
        </Button>
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function HomePage() {
  const [calc, setCalc] = useState({
    type: "Individual House",
    area: 1500,
    floors: 1,
    package: "Semi-Finished",
  });
  const selected = houseTypes.find((x) => x.name === calc.type);
  const pack = packages.find((x) => x.name === calc.package);
  const estimate = Math.round(
    Number(calc.area || 0) *
      (selected?.rate || 0) *
      (1 + (Number(calc.floors) - 1) * 0.08) +
      (pack?.rate || 0) * 100,
  );
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div
            className="hero-image"
            style={{ backgroundImage: `url(${images.hero})` }}
          />
          <div className="container hero-content">
            <p className="eyebrow light">BUILDING WITH PURPOSE SINCE 2008</p>
            <h1>
              Homes that feel
              <br />
              <em>like yours.</em>
            </h1>
            <p className="hero-sub">
              Thoughtful design, transparent construction, and a team invested
              in the place you call home.
            </p>
            <div className="hero-actions">
              <Button to="/#designs">
                Explore designs <ArrowRight size={17} />
              </Button>
              <Button to="/login" variant="ghost">
                Start your estimate
              </Button>
            </div>
            <div className="hero-note">
              <ShieldCheck size={18} /> 15+ years of trusted craftsmanship
            </div>
          </div>
        </section>
        <section className="stats-strip">
          <div>
            <strong>250+</strong>
            <span>Homes delivered</span>
          </div>
          <div>
            <strong>15</strong>
            <span>Years of experience</span>
          </div>
          <div>
            <strong>4.9/5</strong>
            <span>Client satisfaction</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Transparent pricing</span>
          </div>
        </section>
        <section id="designs" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR FIT</p>
              <h2>
                Designed for the way
                <br />
                <em>you live.</em>
              </h2>
            </div>
            <p>
              From compact city apartments to expansive villas, each home is
              shaped by your needs, not a template.
            </p>
          </div>
          <div className="house-grid">
            {houseTypes.map((h) => (
              <article className="house-card" key={h.name}>
                <img src={h.image} alt={h.name} />
                <div className="house-card-body">
                  <div className="card-topline">
                    <span className="tag">RESIDENTIAL</span>
                    <span>{h.duration}</span>
                  </div>
                  <h3>{h.name}</h3>
                  <p>{h.description}</p>
                  <div className="card-footer">
                    <strong>
                      From ₹{h.rate.toLocaleString("en-IN")}{" "}
                      <small>/ sq.ft.</small>
                    </strong>
                    <a href="#calculator">
                      Details <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="packages" className="section section-warm">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CONSTRUCTION PACKAGES</p>
                <h2>
                  Clarity at every
                  <br />
                  <em>stage.</em>
                </h2>
              </div>
              <p>
                Pick the level of finish that works for your budget and
                timeline. Every package comes with a clear scope of work.
              </p>
            </div>
            <div className="package-grid">
              {packages.map((p, i) => (
                <article
                  className={`package-card ${i === 1 ? "featured" : ""}`}
                  key={p.name}
                >
                  {i === 1 && <span className="popular">MOST POPULAR</span>}
                  <span className="package-number">0{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <ul>
                    {p.includes.map((x) => (
                      <li key={x}>
                        <Check size={15} />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="package-price">
                    ₹{p.rate.toLocaleString("en-IN")}
                    <small> / sq.ft. indicative</small>
                  </div>
                  <a href="#calculator">
                    Choose package <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="calculator"
          className="section container calculator-section"
        >
          <div className="calculator-copy">
            <p className="eyebrow">QUICK ESTIMATE</p>
            <h2>
              Let’s put a number
              <br />
              to your <em>vision.</em>
            </h2>
            <p>
              Get a quick indicative estimate. Your final quote is always
              tailored after a conversation with our team.
            </p>
            <Button to="/login">
              Get a detailed quote <ArrowRight size={16} />
            </Button>
          </div>
          <div className="calculator">
            <div className="calc-head">
              <span>
                <Sparkles size={17} /> Estimate calculator
              </span>
              <span className="tag">INDICATIVE</span>
            </div>
            <label>
              Home type
              <select
                value={calc.type}
                onChange={(e) => setCalc({ ...calc, type: e.target.value })}
              >
                {houseTypes.map((x) => (
                  <option key={x.name}>{x.name}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Built-up area (sq.ft.)
                <input
                  type="number"
                  min="300"
                  value={calc.area}
                  onChange={(e) => setCalc({ ...calc, area: e.target.value })}
                />
              </label>
              <label>
                Floors
                <select
                  value={calc.floors}
                  onChange={(e) => setCalc({ ...calc, floors: e.target.value })}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </label>
            </div>
            <label>
              Package
              <select
                value={calc.package}
                onChange={(e) => setCalc({ ...calc, package: e.target.value })}
              >
                {packages.map((x) => (
                  <option key={x.name}>{x.name}</option>
                ))}
              </select>
            </label>
            <div className="estimate">
              <span>Estimated investment</span>
              <strong>₹{estimate.toLocaleString("en-IN")}</strong>
              <small>
                Final pricing depends on approved drawings, site conditions and
                quotation.
              </small>
            </div>
          </div>
        </section>
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">OUR WORK</p>
                <h2>
                  Built to last.
                  <br />
                  <em>Made to matter.</em>
                </h2>
              </div>
              <p>
                A few of the spaces we have had the privilege to bring to life
                across South India.
              </p>
            </div>
            <div className="feature-project">
              <img src={images.project} alt="Construction project" />
              <div>
                <span className="tag">COMPLETED · COIMBATORE</span>
                <h3>Courtyard House</h3>
                <p>
                  A light-filled family home centered around a native garden
                  courtyard and spaces made for gathering.
                </p>
                <div className="project-meta">
                  <span>
                    <strong>2,800</strong> sq.ft.
                  </span>
                  <span>
                    <strong>14</strong> months
                  </span>
                  <span>
                    <strong>2024</strong> completed
                  </span>
                </div>
                <Button to="/login" variant="outline">
                  View project stories <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">WHY AARTHI</p>
              <h2>
                Good buildings start
                <br />
                with <em>good listening.</em>
              </h2>
            </div>
            <div>
              <p className="lead">
                We believe construction should feel less like a transaction and
                more like a partnership. Our in-house team stays close from the
                first sketch to the final key handover.
              </p>
              <div className="values">
                <div>
                  <strong>01</strong>
                  <h3>Honest by default</h3>
                  <p>Clear scopes, realistic estimates and no surprises.</p>
                </div>
                <div>
                  <strong>02</strong>
                  <h3>Built around you</h3>
                  <p>Designs that reflect your life, not a catalogue.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-cta">
          <div className="container contact-inner">
            <div>
              <p className="eyebrow light">START A CONVERSATION</p>
              <h2>
                Have a plot?
                <br />
                <em>Let’s talk.</em>
              </h2>
            </div>
            <div>
              <p>
                Tell us a little about your project and our team will get back
                to you within one working day.
              </p>
              <Button to="/register">
                Share your vision <ArrowRight size={17} />
              </Button>
              <span className="contact-detail">
                <Phone size={15} /> +91 00000 00000 · hello@aarthi.example
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <Logo dark />
        <p>
          Thoughtful spaces. Dependable delivery.
          <br />
          Building better, together.
        </p>
        <div>
          <span className="tag">CONTACT</span>
          <p>
            hello@aarthi.example
            <br />
            +91 00000 00000
          </p>
        </div>
        <div>
          <span className="tag">OFFICE</span>
          <p>
            Coimbatore, Tamil Nadu
            <br />
            India
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Aarthi Constructions</span>
        <span>Indicative information only · Privacy · Terms</span>
      </div>
    </footer>
  );
}

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-aside">
        <Logo dark />
        <div>
          <p className="eyebrow light">YOUR HOME, YOUR STORY</p>
          <h1>
            Let’s build
            <br />
            <em>something real.</em>
          </h1>
          <p>
            Sign in to follow your project, share ideas and stay close to every
            milestone.
          </p>
        </div>
        <span className="auth-quote">
          “The whole process felt clear, calm and completely ours.”
          <small>— Aarthi client, 2025</small>
        </span>
      </div>
      <div className="auth-main">
        <div className="auth-box">
          <Link to="/" className="back-link">
            ← Back to website
          </Link>
          <p className="eyebrow">{title}</p>
          <h2>{subtitle}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
function LoginPage() {
  const { login } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "client@aarthi.demo",
    password: "client123",
  });
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (login(form.email, form.password)) nav("/dashboard");
    else setError("Those details did not match a demo account.");
  };
  return (
    <AuthLayout title="WELCOME BACK" subtitle="Your project, at a glance.">
      <form onSubmit={submit} className="auth-form">
        <label>
          Email or username
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <Button type="submit">
          Sign in <ArrowRight size={16} />
        </Button>
      </form>
      <div className="demo-accounts">
        <strong>Demo accounts</strong>
        <p>Owner: owner@aarthi.demo / owner123</p>
        <p>Engineer: engineer@aarthi.demo / engineer123</p>
        <p>Manager: manager@aarthi.demo / manager123</p>
        <p>Client: client@aarthi.demo / client123</p>
      </div>
      <p className="auth-switch">
        New to Aarthi? <Link to="/register">Create a client account</Link>
      </p>
    </AuthLayout>
  );
}
function RegisterPage() {
  const { register } = useApp();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (form.password.length < 6)
      return setError("Use at least 6 characters for your password.");
    register(form);
    nav("/dashboard");
  };
  return (
    <AuthLayout
      title="CREATE YOUR ACCOUNT"
      subtitle="Your next chapter starts here."
    >
      <form onSubmit={submit} className="auth-form">
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          Create password
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <Button type="submit">
          Create account <ArrowRight size={16} />
        </Button>
      </form>
      <p className="fine-print">
        This frontend demo stores accounts in your browser only. It is not
        secure authentication for production use.
      </p>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

const roleLabels = {
  owner: "Admin / Owner",
  engineer: "Senior Engineer",
  manager: "On-Site Manager",
  client: "Client",
};
const roleMenus = {
  owner: [
    "Overview",
    "Projects",
    "Staff Management",
    "Inquiries",
    "Customization Requests",
    "Reports",
    "Settings",
  ],
  engineer: [
    "Overview",
    "Assigned Projects",
    "Inquiries",
    "Customization Requests",
    "Milestones",
    "Progress Reports",
    "Issues & Delays",
  ],
  manager: [
    "Overview",
    "My Projects",
    "Daily Progress",
    "Photo Uploads",
    "Site Issues",
  ],
  client: [
    "Overview",
    "Submit Inquiry",
    "My Inquiries",
    "My Projects",
    "Progress Tracker",
    "Construction Gallery",
    "Customization Requests",
    "Profile",
  ],
};
function Protected({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}
function Dashboard() {
  const {
    user,
    logout,
    data,
    reset,
    addInquiry,
    addRequest,
    updateProject,
    addUpdate,
    createProject,
    updateRequest,
  } = useApp();
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState(null);
  const menus = roleMenus[user.role];
  const visibleProjects = data.projects.filter(
    (p) =>
      user.role === "owner" ||
      (user.role === "client"
        ? p.clientId === user.id
        : p.manager === user.id || p.engineer === user.id),
  );
  const stats = [
    {
      label: "Active projects",
      value: visibleProjects.filter((p) => p.status === "In Progress").length,
      icon: Construction,
    },
    {
      label: "Overall progress",
      value: `${visibleProjects.length ? Math.round(visibleProjects.reduce((a, p) => a + p.progress, 0) / visibleProjects.length) : 0}%`,
      icon: Clock3,
    },
    {
      label: user.role === "client" ? "My inquiries" : "Open inquiries",
      value:
        user.role === "client"
          ? data.inquiries.filter((i) => i.clientId === user.id).length
          : data.inquiries.length,
      icon: ClipboardList,
    },
    { label: "Notifications", value: 3, icon: MessageSquare },
  ];
  const filtered = visibleProjects.filter((p) =>
    `${p.name} ${p.location} ${p.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const flash = (text) => {
    setNotice(text);
    setTimeout(() => setNotice(""), 2500);
  };
  const doLogout = () => {
    logout();
  };
  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <Logo dark />
        <div className="role-pill">
          <span className="avatar">{user.name[0]}</span>
          <span>
            <b>{user.name}</b>
            <small>{roleLabels[user.role]}</small>
          </span>
        </div>
        <nav>
          {menus.map((item, i) => (
            <button
              className={active === item ? "active" : ""}
              key={item}
              onClick={() => setActive(item)}
            >
              {[
                LayoutDashboard,
                Building2,
                Users,
                ClipboardList,
                FileText,
                ShieldCheck,
                ImagePlus,
              ][i % 7] &&
                React.createElement(
                  [
                    LayoutDashboard,
                    Building2,
                    Users,
                    ClipboardList,
                    FileText,
                    ShieldCheck,
                    ImagePlus,
                  ][i % 7],
                  { size: 17 },
                )}
              {item}
            </button>
          ))}
        </nav>
        <button className="logout" onClick={doLogout}>
          <LogOut size={17} /> Sign out
        </button>
      </aside>
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <span className="mobile-kicker">{roleLabels[user.role]}</span>
            <h1>{active}</h1>
            <p>
              Good evening, {user.name.split(" ")[0]}. Here's what needs your
              attention.
            </p>
          </div>
          <div className="dash-actions">
            <button className="icon-btn">
              <MessageSquare size={19} />
            </button>
            <span className="avatar">{user.name[0]}</span>
          </div>
        </header>
        {notice && (
          <div className="toast">
            <Check size={16} />
            {notice}
          </div>
        )}
        <div className="dash-content">
          {active === "Overview" ? (
            <>
              <div className="stat-grid">
                {stats.map((s) => (
                  <div className="stat-card" key={s.label}>
                    <div className="stat-icon">
                      <s.icon size={18} />
                    </div>
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                    <small>
                      {s.label === "Active projects"
                        ? "Across your portfolio"
                        : "Updated just now"}
                    </small>
                  </div>
                ))}
              </div>
              <div className="dash-grid">
                <section className="panel project-panel">
                  <div className="panel-head">
                    <div>
                      <span className="eyebrow">PROJECT PORTFOLIO</span>
                      <h2>Recent projects</h2>
                    </div>
                    <button
                      className="text-btn"
                      onClick={() =>
                        setActive(
                          user.role === "client" ? "My Projects" : "Projects",
                        )
                      }
                    >
                      View all <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="search-box">
                    <Search size={16} />
                    <input
                      placeholder="Search projects..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <ProjectTable projects={filtered} />
                </section>
                <section className="panel activity-panel">
                  <div className="panel-head">
                    <div>
                      <span className="eyebrow">TO-DO</span>
                      <h2>Needs attention</h2>
                    </div>
                  </div>
                  {[
                    "Review updated floor plan",
                    "Confirm material delivery",
                    "Schedule site visit",
                  ].map((x, i) => (
                    <div className="todo" key={x}>
                      <span
                        className={i === 0 ? "todo-dot current" : "todo-dot"}
                      ></span>
                      <div>
                        <b>{x}</b>
                        <small>
                          {i === 0
                            ? "Today · High priority"
                            : `${i + 2} days from now`}
                        </small>
                      </div>
                      <ChevronDown size={15} />
                    </div>
                  ))}
                  <div className="tip">
                    <Sparkles size={18} />
                    <p>
                      <b>Keep things moving</b>
                      <br />
                      Small updates make a big difference to your project
                      timeline.
                    </p>
                  </div>
                </section>
              </div>
              {(user.role === "owner" || user.role === "engineer") && (
                <section className="panel update-overview-panel">
                  <div className="panel-head">
                    <div>
                      <span className="eyebrow">SHARED UPDATES</span>
                      <h2>Latest project updates</h2>
                    </div>
                    <button
                      className="text-btn"
                      onClick={() =>
                        setActive(user.role === "owner" ? "Reports" : "Progress Reports")
                      }
                    >
                      View reports <ArrowRight size={15} />
                    </button>
                  </div>
                  {(data.updates || [])
                    .filter((update) =>
                      visibleProjects.some((project) => project.id === update.projectId),
                    )
                    .slice(0, 5)
                    .map((update) => (
                      <div className="update-row" key={update.id}>
                        <span className="status status-new">{update.progress}%</span>
                        <div>
                          <b>{update.message}</b>
                          <small>
                            {update.authorName} · {update.projectId} · {update.status}
                          </small>
                        </div>
                      </div>
                    ))}
                  {!(data.updates || []).length && (
                    <p className="empty">No project updates have been published yet.</p>
                  )}
                </section>
              )}
            </>
          ) : (
            <DashboardPage
              active={active}
              user={user}
              projects={visibleProjects}
              data={data}
              onAction={(type, payload) => {
                if (type === "inquiry") {
                  addInquiry({ ...payload, clientId: user.id });
                  flash("Inquiry submitted successfully.");
                  setActive("My Inquiries");
                }
                if (type === "request") {
                  addRequest({ ...payload, clientId: user.id });
                  flash("Customization request submitted.");
                }
                if (type === "reset") {
                  reset();
                }
                if (type === "project") {
                  updateProject(payload.projectId, payload.changes);
                  flash("Project assignment updated.");
                }
                if (type === "update") {
                  addUpdate({ ...payload, authorId: user.id, authorName: user.name });
                  flash("Project update published.");
                }
                if (type === "request") {
                  updateRequest(payload.requestId, {
                    status: payload.status,
                    response: payload.response,
                    reviewedBy: user.name,
                  });
                  flash("Customization request updated.");
                }
                if (type === "create-project") {
                  createProject(payload);
                  flash("Project created from inquiry.");
                }
              }}
              onModal={(type, payload) => setModal({ type, payload })}
            />
          )}
        </div>
        {modal && (
          <Modal
            type={modal.type}
            initialData={modal.payload}
            users={data.users}
            onClose={() => setModal(null)}
            onSubmit={(payload) => {
              if (modal.type === "inquiry") {
                addInquiry({ ...payload, clientId: user.id });
                setActive("My Inquiries");
              }
              if (modal.type === "project") createProject(payload);
              setModal(null);
              flash(modal.type === "project" ? "Project created from inquiry." : "Inquiry submitted successfully.");
            }}
          />
        )}
      </main>
    </div>
  );
}
function ProjectTable({ projects }) {
  return (
    <div className="project-table">
      {projects.length ? (
        projects.map((p) => (
          <div className="project-row" key={p.id}>
            <img src={p.image} alt="" />
            <div className="project-name">
              <b>{p.name || `${p.type} - ${p.location}`}</b>
              <span>
                {p.id} · {p.location}
              </span>
            </div>
            <div className="progress-cell">
              <span>{p.progress}%</span>
              <div className="progress">
                <i style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <span
              className={`status status-${p.status.toLowerCase().replaceAll(" ", "-")}`}
            >
              {p.status}
            </span>
            <ArrowRight size={16} />
          </div>
        ))
      ) : (
        <p className="empty">No projects match your search.</p>
      )}
    </div>
  );
}
function ProjectUpdatePanel({ title, projects, user, data, onAction }) {
  const [form, setForm] = useState({
    projectId: projects[0]?.id || "",
    progress: projects[0]?.progress || 0,
    status: projects[0]?.status || "In Progress",
    message: "",
  });
  const selectedProject = projects.find((project) => project.id === form.projectId);
  return (
    <section className="panel form-panel update-panel">
      <span className="eyebrow">SHARED PROJECT WORKFLOW</span>
      <h2>{title}</h2>
      <p className="muted">
        {user.role === "engineer"
          ? "Review the site manager's work and publish technical direction."
          : "Publish a progress update for the senior engineer and client."}
      </p>
      {!projects.length ? (
        <p className="empty">No assigned projects yet. Ask the owner to assign one.</p>
      ) : (
        <>
          {user.role === "engineer" && (
            <div className="assignment-list engineer-assignment">
              <span className="eyebrow">FIELD TEAM ASSIGNMENT</span>
              <h3>Choose the On-Site Manager</h3>
              <p className="muted">
                You are responsible for selecting the site manager who will
                carry out this project's field work.
              </p>
              <label className="assignment-field">
                <span>On-Site Manager for {selectedProject?.name}</span>
                <select
                  value={selectedProject?.manager || ""}
                  onChange={(event) =>
                    onAction("project", {
                      projectId: form.projectId,
                      changes: { manager: event.target.value },
                    })
                  }
                >
                  <option value="">Select On-Site Manager</option>
                  {data.users
                    .filter((account) => account.role === "manager")
                    .map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!selectedProject) return;
              onAction("project", {
                projectId: form.projectId,
                changes: {
                  progress: Number(form.progress),
                  status: form.status,
                },
              });
              onAction("update", {
                projectId: form.projectId,
                message: form.message,
                progress: Number(form.progress),
                status: form.status,
                audience: "team-and-client",
              });
              setForm({ ...form, message: "" });
            }}
          >
            <label>
              Project
              <select
                value={form.projectId}
                onChange={(event) => setForm({ ...form, projectId: event.target.value })}
              >
                {projects.map((project) => (
                  <option value={project.id} key={project.id}>
                    {project.name} · {project.client}
                  </option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Progress percentage
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={(event) => setForm({ ...form, progress: event.target.value })}
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(event) => setForm({ ...form, status: event.target.value })}
                >
                  <option>In Progress</option>
                  <option>Delayed</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </label>
            </div>
            <label>
              Update / instruction
              <textarea
                required
                rows="5"
                placeholder="Describe completed work, pending tasks, materials, or technical instructions."
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
            </label>
            <Button type="submit">
              Publish update <ArrowRight size={16} />
            </Button>
          </form>
          <div className="update-feed">
            {(data.updates || [])
              .filter((update) => projects.some((project) => project.id === update.projectId))
              .map((update) => (
                <div className="update-row" key={update.id}>
                  <span className="status status-new">{update.progress}%</span>
                  <div>
                    <b>{update.message}</b>
                    <small>{update.authorName} · {update.projectId} · {update.status}</small>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
function RequestReviewRow({ request, onSubmit }) {
  const [status, setStatus] = useState(request.status || "Submitted");
  const [response, setResponse] = useState(request.response || "");
  return (
    <form
      className="request-review"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ status, response });
      }}
    >
      <div className="request-review-copy">
        <b>{request.category}</b>
        <small>{request.details}</small>
      </div>
      <select value={status} onChange={(event) => setStatus(event.target.value)}>
        <option>Submitted</option>
        <option>Under Review</option>
        <option>Approved</option>
        <option>Needs Changes</option>
        <option>Rejected</option>
      </select>
      <input
        placeholder="Response to client"
        value={response}
        onChange={(event) => setResponse(event.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
function DashboardPage({ active, user, projects, data, onAction, onModal }) {
  const userById = (id) => data.users.find((account) => account.id === id);
  const [form, setForm] = useState({
    type: "Villa",
    package: "Fully Finished",
    area: "",
    location: "",
    bedrooms: "3",
    floors: "1",
    budget: "",
    details: "",
  });
  if (
    active === "Projects" ||
    active === "Assigned Projects" ||
    active === "My Projects"
  )
    return (
      <section className="panel full-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">LIVE DATA</span>
            <h2>{active}</h2>
          </div>
          {user.role === "client" && (
            <Button onClick={() => onModal("inquiry")}>
              <Plus size={16} /> New inquiry
            </Button>
          )}
        </div>
        {user.role === "owner" && (
          <div className="assignment-list assignment-list-top">
            <span className="eyebrow">OWNER ACTION</span>
            <h3>Assign project delivery team</h3>
            <p className="muted">
            Select the Senior Engineer for each project. The assigned
            engineer will select the On-Site Manager.
            </p>
            {projects.length ? projects.map((project) => (
              <div className="assignment-row" key={`top-${project.id}`}>
                <div>
                  <b>{project.name || `${project.type} - ${project.location}`}</b>
                  <small>{project.client} · {project.id}</small>
                </div>
                <label className="assignment-field">
                  <span>Senior Engineer</span>
                  <select
                    aria-label={`Senior Engineer for ${project.name}`}
                    value={project.engineer || ""}
                    onChange={(event) =>
                      onAction("project", {
                        projectId: project.id,
                        changes: { engineer: event.target.value },
                      })
                    }
                  >
                    <option value="">Assign engineer</option>
                    {data.users
                      .filter((account) => account.role === "engineer")
                      .map((account) => (
                        <option value={account.id} key={account.id}>
                          {account.name}
                        </option>
                      ))}
                  </select>
                </label>
                <div className="assignment-field assignment-readonly">
                  <span>On-Site Manager</span>
                  <strong>
                    {data.users.find((account) => account.id === project.manager)?.name ||
                      "Assigned by Senior Engineer"}
                  </strong>
                </div>
              </div>
            )) : <p className="empty">Create a project from an inquiry before assigning staff.</p>}
          </div>
        )}
        {user.role === "engineer" && projects.length > 0 && (
          <div className="assignment-list assignment-list-top">
            <span className="eyebrow">FIELD TEAM ASSIGNMENT</span>
            <h3>Choose the On-Site Manager</h3>
            <p className="muted">
              Select the site manager who will carry out the field work for
              each assigned project.
            </p>
            {projects.map((project) => (
              <div className="assignment-row" key={`manager-${project.id}`}>
                <div>
                  <b>{project.name || `${project.type} - ${project.location}`}</b>
                  <small>{project.client} · {project.id}</small>
                </div>
                <label className="assignment-field">
                  <span>On-Site Manager</span>
                  <select
                    value={project.manager || ""}
                    onChange={(event) =>
                      onAction("project", {
                        projectId: project.id,
                        changes: { manager: event.target.value },
                      })
                    }
                  >
                    <option value="">Select On-Site Manager</option>
                    {data.users
                      .filter((account) => account.role === "manager")
                      .map((account) => (
                        <option value={account.id} key={account.id}>
                          {account.name}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            ))}
          </div>
        )}
        <ProjectTable projects={projects} />
        <div className="project-cards">
          {projects.map((p) => (
            <div className="mini-project" key={p.id}>
              <img src={p.image} alt="" />
              <div>
                <b>{p.name || `${p.type} - ${p.location}`}</b>
                <span>
                  {p.type} · {p.location}
                </span>
                <div className="progress">
                  <i style={{ width: `${p.progress}%` }} />
                </div>
                <small>{p.progress}% complete</small>
                <small>{p.budget ? `Budget ₹${Number(p.budget).toLocaleString("en-IN")}` : "Budget pending"}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  if (active === "Submit Inquiry")
    return (
      <section className="panel form-panel">
        <span className="eyebrow">START A PROJECT</span>
        <h2>Tell us about your dream home.</h2>
        <p className="muted">
          A few details help our team prepare a more useful first conversation.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAction("inquiry", form);
          }}
        >
          <div className="form-row">
            <label>
              Home type
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {houseTypes.map((x) => (
                  <option key={x.name}>{x.name}</option>
                ))}
              </select>
            </label>
            <label>
              Package
              <select
                value={form.package}
                onChange={(e) => setForm({ ...form, package: e.target.value })}
              >
                {packages.map((x) => (
                  <option key={x.name}>{x.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Built-up area
              <input
                required
                type="number"
                placeholder="e.g. 1800 sq.ft."
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />
            </label>
            <label>
              Location
              <input
                required
                placeholder="City / locality"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Bedrooms
              <select
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              >
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5+</option>
              </select>
            </label>
            <label>
              Budget
              <input
                placeholder="Indicative budget"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              />
            </label>
          </div>
          <label>
            Anything else we should know?
            <textarea
              rows="4"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </label>
          <Button type="submit">
            Submit inquiry <ArrowRight size={16} />
          </Button>
        </form>
      </section>
    );
  if (active === "Customization Requests" && user.role === "client")
    return (
      <section className="panel form-panel">
        <span className="eyebrow">MAKE IT YOURS</span>
        <h2>Customization requests</h2>
        <p className="muted">
          Share changes you would like the team to review.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAction("request", { category: form.type, details: form.details });
          }}
        >
          <label>
            Request type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Room layout changes</option>
              <option>Balcony additions</option>
              <option>Flooring changes</option>
              <option>Kitchen modifications</option>
              <option>Electrical point changes</option>
            </select>
          </label>
          <label>
            Describe your request
            <textarea
              required
              rows="6"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
            />
          </label>
          <Button type="submit">
            Send request <ArrowRight size={16} />
          </Button>
        </form>
        {data.requests
          .filter((r) => r.clientId === user.id)
          .map((r) => (
            <div className="request-row" key={r.id}>
              <span className="status status-new">{r.status}</span>
              <b>{r.category}</b>
              <small>
                {r.details}
                {r.response && ` · Response: ${r.response}`}
              </small>
            </div>
          ))}
      </section>
    );
  if (active === "Customization Requests")
    return (
      <section className="panel full-panel">
        <span className="eyebrow">CLIENT REQUESTS</span>
        <h2>Customization requests</h2>
        <p className="muted">
          Review client changes and send a response to the client dashboard.
        </p>
        {(data.requests || []).map((request) => (
          <RequestReviewRow
            key={request.id}
            request={request}
            onSubmit={(changes) =>
              onAction("request", { requestId: request.id, ...changes })
            }
          />
        ))}
        {!data.requests?.length && <p className="empty">No customization requests yet.</p>}
      </section>
    );
  if (
    active === "Inquiries" ||
    active === "My inquiries" ||
    active === "My Inquiries"
  )
    return (
      <section className="panel full-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">ENQUIRIES</span>
            <h2>{active}</h2>
          </div>
        </div>
        {data.inquiries
          .filter((i) => user.role !== "client" || i.clientId === user.id)
          .map((i) => (
            <div className="inquiry-row" key={i.id}>
              <div className="stat-icon">
                <ClipboardList size={17} />
              </div>
              <div>
                <b>
                  {i.type} · {i.location}
                </b>
                <span>
                  {i.area} sq.ft. · {i.package}
                </span>
                <small className="client-detail">
                  Client: {userById(i.clientId)?.name || i.clientName || "Unknown client"}
                  {" · "}
                  {userById(i.clientId)?.email || i.clientEmail || "No email"}
                </small>
              </div>
              <span className="status status-new">{i.status}</span>
              {user.role === "owner" && i.status !== "Project created" && (
                <Button
                  variant="outline"
                  onClick={() =>
                    onModal("project", {
                      inquiryId: i.id,
                      client: userById(i.clientId)?.name || "Client",
                      clientId: i.clientId,
                      type: i.type,
                      package: i.package,
                      location: i.location,
                      area: Number(i.area) || 0,
                      budget: Number(i.budget) || 0,
                    })
                  }
                >
                  Create project
                </Button>
              )}
            </div>
          ))}
        {!data.inquiries.length && <p className="empty">No inquiries yet.</p>}
      </section>
    );
  if (
    active === "Daily Progress" ||
    active === "Progress Reports" ||
    active === "Issues & Delays" ||
    active === "Site Issues" ||
    active === "Photo Uploads"
  )
    return (
      <ProjectUpdatePanel
        title={active}
        projects={projects}
        user={user}
        data={data}
        onAction={onAction}
      />
    );
  if (
    active === "Reports" ||
    active === "Milestones" ||
    active === "Progress Tracker"
  )
    return (
      <section className="panel full-panel">
        <span className="eyebrow">PROJECT UPDATES</span>
        <h2>Progress and milestones</h2>
        <div className="timeline">
          {projects
            .flatMap((p) =>
              [
                ["Foundation & structure", p.progress > 25],
                ["Walls & services", p.progress > 50],
                ["Finishing & handover", p.progress === 100],
              ].map(([x, done]) => ({ p, x, done })),
            )
            .map((item, i) => (
              <div className="timeline-row" key={`${item.p.id}-${item.x}`}>
                <span
                  className={
                    item.done ? "timeline-check done" : "timeline-check"
                  }
                >
                  {item.done && <Check size={14} />}
                </span>
                <div>
                  <b>{item.x}</b>
                  <small>
                    {item.p.name} · {item.done ? "Complete" : "In progress"}
                  </small>
                </div>
                <span>{item.done ? "Done" : "Upcoming"}</span>
              </div>
            ))}
        </div>
        <div className="update-feed">
          <span className="eyebrow">LATEST TEAM UPDATES</span>
          {(data.updates || [])
            .filter((update) => projects.some((project) => project.id === update.projectId))
            .map((update) => (
              <div className="update-row" key={update.id}>
                <span className="status status-new">{update.progress}%</span>
                <div>
                  <b>{update.message}</b>
                  <small>{update.authorName} · {update.projectId} · {update.status}</small>
                </div>
              </div>
            ))}
          {!(data.updates || []).length && <p className="empty">Team updates will appear here.</p>}
        </div>
      </section>
    );
  if (active === "Settings")
    return (
      <section className="panel form-panel">
        <span className="eyebrow">OWNER CONTROLS</span>
        <h2>Demo settings</h2>
        <p className="muted">
          Reset the shared browser data to the original sample projects and
          accounts.
        </p>
        <Button
          variant="danger"
          onClick={() => {
            if (window.confirm("Reset all local demo data?")) onAction("reset");
          }}
        >
          Reset demo data
        </Button>
        <p className="fine-print">
          Authentication and data are stored in localStorage for demonstration
          only. This is not suitable for production security or multi-device
          synchronization.
        </p>
      </section>
    );
  return (
    <section className="panel full-panel">
      <span className="eyebrow">WORKSPACE</span>
      <h2>{active}</h2>
      <p className="muted">
        This workspace is ready for your next update. Use the navigation to
        review the live project data.
      </p>
      <Button onClick={() => onModal("inquiry")}>
        Create an update <Plus size={16} />
      </Button>
    </section>
  );
}
function Modal({ type = "inquiry", initialData = {}, users = [], onClose, onSubmit }) {
  const [form, setForm] = useState({
    type: "Villa",
    package: "Fully Finished",
    area: "",
    location: "",
    name: "",
    budget: "",
    engineer: "",
    ...initialData,
  });
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <span className="eyebrow">{type === "project" ? "CREATE PROJECT" : "NEW INQUIRY"}</span>
        <h2>{type === "project" ? "Create a project from this inquiry." : "Tell us about your project."}</h2>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <label>
            Home type
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {houseTypes.map((x) => (
                <option key={x.name}>{x.name}</option>
              ))}
            </select>
          </label>
          {type === "project" && (
            <label>
              Client
              <input value={form.client || form.name || ""} readOnly />
            </label>
          )}
          {type === "project" && (
            <label>
              Senior Engineer
              <select
                required
                value={form.engineer || ""}
                onChange={(e) => setForm({ ...form, engineer: e.target.value })}
              >
                <option value="">Assign Senior Engineer</option>
                {users
                  .filter((account) => account.role === "engineer")
                  .map((account) => (
                    <option value={account.id} key={account.id}>
                      {account.name}
                    </option>
                  ))}
              </select>
            </label>
          )}
          {type === "project" && (
            <label>
              Project name
              <input
                required
                placeholder="e.g. Swathi Villa"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
          )}
          <label>
            Location
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </label>
          {type === "project" && (
            <label>
              Budget
              <input
                type="number"
                value={form.budget || ""}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              />
            </label>
          )}
          <label>
            Built-up area
            <input
              required
              type="number"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
          </label>
          <Button type="submit">
          {type === "project" ? "Create project" : "Submit inquiry"} <ArrowRight size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}
function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
