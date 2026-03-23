import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Building,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { BookingStatus, PracticeArea } from "./backend";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import {
  useBookAppointment,
  useGetAllBookings,
  useIsAdmin,
  useUpdateBookingStatus,
} from "./hooks/useQueries";

// ────────── helpers ──────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const PRACTICE_AREAS = [
  {
    key: PracticeArea.criminal,
    label: "Criminal Law",
    icon: Shield,
    desc: "Expert defense in all criminal matters — bail, trials, appeals. Protecting your rights with aggressive legal representation.",
  },
  {
    key: PracticeArea.civil,
    label: "Civil Law",
    icon: FileText,
    desc: "Comprehensive civil litigation services covering disputes, contracts, property rights, and compensatory claims.",
  },
  {
    key: PracticeArea.family,
    label: "Family Law",
    icon: Heart,
    desc: "Sensitive and strategic guidance for custody, maintenance, matrimonial disputes, and domestic matters.",
  },
  {
    key: PracticeArea.property,
    label: "Property Law",
    icon: Home,
    desc: "Title verification, property disputes, registration, real estate transactions, and land acquisition matters.",
  },
  {
    key: PracticeArea.divorce,
    label: "Divorce Law",
    icon: Users,
    desc: "Compassionate representation in contested & mutual consent divorces, alimony, and asset division proceedings.",
  },
  {
    key: PracticeArea.corporate,
    label: "Corporate Law",
    icon: Building,
    desc: "Business formation, contracts, compliance, mergers, and corporate governance for startups and enterprises.",
  },
];

const STATUS_COLORS: Record<BookingStatus, string> = {
  [BookingStatus.pending]:
    "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  [BookingStatus.confirmed]:
    "bg-green-500/20 text-green-300 border-green-500/30",
  [BookingStatus.cancelled]: "bg-red-500/20 text-red-300 border-red-500/30",
};

// ────────── Navbar ──────────
function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Our Team", id: "team" },
    { label: "Practice Areas", id: "practice" },
    { label: "Appointment", id: "appointment" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "oklch(0.13 0.03 245 / 0.97)",
        borderColor: "oklch(0.73 0.12 85 / 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 group"
          onClick={() => scrollTo("home")}
          data-ocid="nav.link"
        >
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2"
            style={{ borderColor: "oklch(0.73 0.12 85)" }}
          >
            <img
              src="/assets/uploads/high-court-2.jpeg"
              alt="High Court Chhattisgarh"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <div
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.73 0.12 85)" }}
            >
              Advocate
            </div>
            <div
              className="text-sm font-bold tracking-wide uppercase"
              style={{ color: "oklch(0.93 0.01 260)" }}
            >
              Love Kumar Prajapati
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: "oklch(0.78 0.02 255)" }}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <button
              type="button"
              onClick={onAdminClick}
              className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold flex items-center gap-1"
              style={{ color: "oklch(0.73 0.12 85)" }}
              data-ocid="admin.link"
            >
              <LayoutDashboard className="w-4 h-4" /> Admin
            </button>
          )}
          {identity ? (
            <Button
              size="sm"
              variant="outline"
              onClick={clear}
              className="border-gold/40 text-gold hover:bg-gold/10"
              data-ocid="nav.logout_button"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="font-semibold uppercase tracking-wide"
              style={{
                background: "oklch(0.73 0.12 85)",
                color: "oklch(0.13 0.03 245)",
              }}
              data-ocid="nav.login_button"
            >
              <LogIn className="w-4 h-4 mr-1" /> Login
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" style={{ color: "oklch(0.73 0.12 85)" }} />
          ) : (
            <Menu
              className="w-6 h-6"
              style={{ color: "oklch(0.73 0.12 85)" }}
            />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t"
            style={{
              background: "oklch(0.15 0.035 247)",
              borderColor: "oklch(0.73 0.12 85 / 0.2)",
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-left text-sm font-medium uppercase tracking-wider py-2"
                  style={{ color: "oklch(0.78 0.02 255)" }}
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onAdminClick();
                    setMobileOpen(false);
                  }}
                  className="text-left text-sm font-medium uppercase tracking-wider py-2"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                  data-ocid="admin.link"
                >
                  Admin Dashboard
                </button>
              )}
              {identity ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="border-gold/40 text-gold w-fit"
                  data-ocid="nav.logout_button"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={loginStatus === "logging-in"}
                  className="w-fit"
                  style={{
                    background: "oklch(0.73 0.12 85)",
                    color: "oklch(0.13 0.03 245)",
                  }}
                  data-ocid="nav.login_button"
                >
                  Login
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ────────── Hero ──────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/uploads/high-court-2.jpeg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.13 0.03 245 / 0.82)" }}
      />
      {/* Gold top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.73 0.12 85), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-semibold uppercase tracking-widest"
            style={{
              borderColor: "oklch(0.73 0.12 85 / 0.4)",
              color: "oklch(0.73 0.12 85)",
              background: "oklch(0.73 0.12 85 / 0.1)",
            }}
          >
            <Scale className="w-3 h-3" /> Trusted Legal Expert
          </div>

          {/* Name */}
          <h1
            className="font-serif font-bold uppercase tracking-widest mb-3 leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "oklch(0.73 0.12 85)",
              textShadow: "0 0 40px oklch(0.73 0.12 85 / 0.3)",
            }}
          >
            Advocate
            <br />
            Love Kumar Prajapati
          </h1>

          {/* Divider */}
          <div
            className="w-24 h-px mx-auto my-5"
            style={{ background: "oklch(0.73 0.12 85)" }}
          />

          {/* Tagline */}
          <p
            className="text-lg md:text-xl font-medium tracking-wide mb-2"
            style={{ color: "oklch(0.93 0.01 260)" }}
          >
            Criminal • Civil • Family • Property • Divorce • Corporate
          </p>
          <p
            className="text-sm tracking-widest uppercase mb-10"
            style={{ color: "oklch(0.68 0.02 255)" }}
          >
            24/7 Service &nbsp;•&nbsp; Free Consultation &nbsp;•&nbsp; Bilaspur,
            CG
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollTo("appointment")}
              className="px-8 py-6 text-sm font-bold uppercase tracking-widest rounded-none transition-all hover:scale-105"
              style={{
                background: "oklch(0.73 0.12 85)",
                color: "oklch(0.13 0.03 245)",
                boxShadow: "0 0 30px oklch(0.73 0.12 85 / 0.3)",
              }}
              data-ocid="hero.primary_button"
            >
              Book a Consultation
            </Button>
            <a
              href="tel:9131178255"
              className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest border transition-all hover:scale-105"
              style={{
                borderColor: "oklch(0.73 0.12 85)",
                color: "oklch(0.73 0.12 85)",
              }}
              data-ocid="hero.secondary_button"
            >
              <Phone className="w-4 h-4" /> Call Now: 9131178255
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { n: "500+", label: "Cases Won" },
              { n: "15+", label: "Years Exp." },
              { n: "24/7", label: "Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-serif font-bold"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                >
                  {stat.n}
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "oklch(0.68 0.02 255)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown
          className="w-6 h-6"
          style={{ color: "oklch(0.73 0.12 85 / 0.6)" }}
        />
      </motion.div>
    </section>
  );
}

// ────────── About ──────────
function About() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "oklch(0.15 0.035 247)" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 text-center"
              style={{ color: "oklch(0.73 0.12 85)" }}
            >
              About Me
            </p>
            <h2 className="section-title text-center">
              Your Trusted Legal Advisor
            </h2>
            <div className="gold-divider" />

            <div className="grid md:grid-cols-2 gap-12 mt-8 items-center">
              <div>
                <div
                  className="aspect-square max-w-xs mx-auto rounded-none border-2 overflow-hidden"
                  style={{
                    borderColor: "oklch(0.73 0.12 85 / 0.4)",
                    background: "oklch(0.17 0.035 248)",
                  }}
                >
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-23-at-2.10.04-PM-2.jpeg"
                    alt="Adv. Love Kumar Prajapati"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "oklch(0.78 0.02 255)" }}
                >
                  Advocate Love Kumar Prajapati is a distinguished legal
                  professional based in Bilaspur, Chhattisgarh, with over 15
                  years of dedicated practice in diverse areas of law. Known for
                  unwavering commitment to justice and client-first approach.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "oklch(0.78 0.02 255)" }}
                >
                  With a proven track record of over 500 successful cases across
                  criminal, civil, family, and corporate law, he brings both
                  legal expertise and compassionate advocacy to every case.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { icon: Award, label: "LLB, LLM Qualified" },
                    { icon: CheckCircle, label: "Bar Council Member" },
                    { icon: Scale, label: "High Court Practice" },
                    { icon: Star, label: "500+ Cases Won" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.93 0.01 260)" }}
                    >
                      <Icon
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "oklch(0.73 0.12 85)" }}
                      />
                      {label}
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:9131178255"
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    <Phone className="w-4 h-4" /> 9131178255
                  </a>
                  <a
                    href="https://wa.me/919131178255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────── Practice Areas ──────────
function PracticeAreas() {
  return (
    <section
      id="practice"
      className="py-24"
      style={{ background: "oklch(0.13 0.03 245)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.73 0.12 85)" }}
          >
            Expertise
          </p>
          <h2 className="section-title">Practice Areas</h2>
          <div className="gold-divider" />
          <p
            className="text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.68 0.02 255)" }}
          >
            Comprehensive legal services tailored to your needs across all major
            domains of law.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRACTICE_AREAS.map((area, i) => (
            <motion.div
              key={area.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 border transition-all duration-300 hover:border-gold/60 cursor-default"
              style={{
                background: "oklch(0.17 0.035 248)",
                borderColor: "oklch(0.25 0.04 250)",
              }}
            >
              <div
                className="w-12 h-12 border flex items-center justify-center mb-4 group-hover:border-gold/60 transition-colors"
                style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
              >
                <area.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                />
              </div>
              <h3
                className="font-serif font-semibold text-lg mb-2 uppercase tracking-wide"
                style={{ color: "oklch(0.73 0.12 85)" }}
              >
                {area.label}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.02 255)" }}
              >
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────── Appointment Form ──────────
function AppointmentForm() {
  const { mutateAsync, isPending } = useBookAppointment();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    practiceArea: "" as PracticeArea | "",
    preferredDate: "",
    message: "",
  });
  const [successId, setSuccessId] = useState<bigint | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.practiceArea) {
      toast.error("Please select a practice area.");
      return;
    }
    try {
      const id = await mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        practiceArea: form.practiceArea as PracticeArea,
        preferredDate: form.preferredDate,
        message: form.message,
      });
      setSuccessId(id);
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  const resetForm = () => {
    setSuccessId(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      practiceArea: "",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <section
      id="appointment"
      className="py-24"
      style={{ background: "oklch(0.15 0.035 247)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.73 0.12 85)" }}
          >
            Get Started
          </p>
          <h2 className="section-title">Book an Appointment</h2>
          <div className="gold-divider" />
          <p className="text-sm" style={{ color: "oklch(0.68 0.02 255)" }}>
            Free consultation — fill the form and we'll contact you shortly.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {successId !== null ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 border"
                style={{
                  background: "oklch(0.17 0.035 248)",
                  borderColor: "oklch(0.73 0.12 85 / 0.4)",
                }}
                data-ocid="appointment.success_state"
              >
                <CheckCircle
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                />
                <h3
                  className="font-serif text-2xl font-bold mb-2"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                >
                  Appointment Requested!
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: "oklch(0.78 0.02 255)" }}
                >
                  Your booking ID:{" "}
                  <strong style={{ color: "oklch(0.73 0.12 85)" }}>
                    #{successId.toString()}
                  </strong>
                </p>
                <p
                  className="text-sm mb-8"
                  style={{ color: "oklch(0.68 0.02 255)" }}
                >
                  We'll contact you at <strong>{form.phone}</strong> to confirm
                  your appointment.
                </p>
                <Button
                  onClick={resetForm}
                  style={{
                    background: "oklch(0.73 0.12 85)",
                    color: "oklch(0.13 0.03 245)",
                  }}
                  data-ocid="appointment.secondary_button"
                >
                  Book Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 border space-y-6"
                style={{
                  background: "oklch(0.17 0.035 248)",
                  borderColor: "oklch(0.25 0.04 250)",
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="app-name"
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="app-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      placeholder="Your full name"
                      className="rounded-none border-border/60 bg-navy focus:border-gold"
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="app-phone"
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      Phone *
                    </Label>
                    <Input
                      id="app-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      placeholder="10-digit mobile number"
                      className="rounded-none border-border/60 bg-navy focus:border-gold"
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="app-email"
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      Email
                    </Label>
                    <Input
                      id="app-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="rounded-none border-border/60 bg-navy focus:border-gold"
                      data-ocid="appointment.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      Practice Area *
                    </Label>
                    <Select
                      value={form.practiceArea}
                      onValueChange={(v) =>
                        setForm((p) => ({
                          ...p,
                          practiceArea: v as PracticeArea,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="rounded-none border-border/60 bg-navy"
                        data-ocid="appointment.select"
                      >
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRACTICE_AREAS.map((a) => (
                          <SelectItem key={a.key} value={a.key}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="app-date"
                      className="text-xs uppercase tracking-wider"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      Preferred Date *
                    </Label>
                    <Input
                      id="app-date"
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          preferredDate: e.target.value,
                        }))
                      }
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="rounded-none border-border/60 bg-navy focus:border-gold"
                      data-ocid="appointment.input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="app-msg"
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.68 0.02 255)" }}
                  >
                    Message / Case Details
                  </Label>
                  <Textarea
                    id="app-msg"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Briefly describe your legal matter..."
                    rows={4}
                    className="rounded-none border-border/60 bg-navy focus:border-gold resize-none"
                    data-ocid="appointment.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 text-sm font-bold uppercase tracking-widest rounded-none transition-all hover:scale-[1.01]"
                  style={{
                    background: "oklch(0.73 0.12 85)",
                    color: "oklch(0.13 0.03 245)",
                  }}
                  data-ocid="appointment.submit_button"
                >
                  {isPending ? "Submitting..." : "Request Appointment"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ────────── Contact ──────────
function Contact() {
  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "oklch(0.13 0.03 245)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.73 0.12 85)" }}
          >
            Reach Us
          </p>
          <h2 className="section-title">Contact</h2>
          <div className="gold-divider" />
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 border space-y-6"
            style={{
              background: "oklch(0.17 0.035 248)",
              borderColor: "oklch(0.25 0.04 250)",
            }}
          >
            <h3
              className="font-serif text-xl font-semibold uppercase tracking-wide"
              style={{ color: "oklch(0.73 0.12 85)" }}
            >
              Get in Touch
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
                >
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    Address
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.02 255)" }}
                  >
                    Bilaspur, Chhattisgarh
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
                >
                  <Phone
                    className="w-4 h-4"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:9131178255"
                    className="text-sm hover:text-gold transition-colors"
                    style={{ color: "oklch(0.78 0.02 255)" }}
                  >
                    +91 9131178255
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
                >
                  <MessageCircle
                    className="w-4 h-4"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    WhatsApp
                  </div>
                  <a
                    href="https://wa.me/919131178255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-gold transition-colors"
                    style={{ color: "oklch(0.78 0.02 255)" }}
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
                >
                  <Clock
                    className="w-4 h-4"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    Working Hours
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.02 255)" }}
                  >
                    Mon – Sat: 9:00 AM – 7:00 PM
                    <br />
                    Emergency: 24/7 Available
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="w-10 h-10 border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "oklch(0.73 0.12 85 / 0.4)" }}
                >
                  <Mail
                    className="w-4 h-4"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.73 0.12 85)" }}
                  >
                    Email
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.02 255)" }}
                  >
                    advocate.lovekumar@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border overflow-hidden"
            style={{ borderColor: "oklch(0.25 0.04 250)", minHeight: "400px" }}
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14895.678!2d82.1408!3d22.0797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b0f0b0b0b0b%3A0x0!2sBilaspur%2C+Chhattisgarh!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "400px",
                filter: "invert(90%) hue-rotate(180deg)",
              }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ────────── Admin Dashboard ──────────
function AdminDashboard({ onClose }: { onClose: () => void }) {
  const { data: bookings, isLoading } = useGetAllBookings();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateBookingStatus();

  const handleStatusChange = async (id: bigint, status: BookingStatus) => {
    try {
      await updateStatus({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <section
      id="admin"
      className="py-24"
      style={{ background: "oklch(0.15 0.035 247)" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title text-left">Admin Dashboard</h2>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.68 0.02 255)" }}
            >
              Manage all appointment bookings
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border/60"
            data-ocid="admin.close_button"
          >
            <X className="w-4 h-4 mr-2" /> Close
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-16" data-ocid="admin.loading_state">
            <div
              className="w-8 h-8 border-2 border-t-gold rounded-full animate-spin mx-auto"
              style={{
                borderColor: "oklch(0.25 0.04 250)",
                borderTopColor: "oklch(0.73 0.12 85)",
              }}
            />
            <p
              className="text-sm mt-3"
              style={{ color: "oklch(0.68 0.02 255)" }}
            >
              Loading bookings...
            </p>
          </div>
        ) : !bookings?.length ? (
          <div
            className="text-center py-16 border"
            style={{
              background: "oklch(0.17 0.035 248)",
              borderColor: "oklch(0.25 0.04 250)",
            }}
            data-ocid="admin.empty_state"
          >
            <Scale
              className="w-12 h-12 mx-auto mb-3"
              style={{ color: "oklch(0.73 0.12 85 / 0.4)" }}
            />
            <p style={{ color: "oklch(0.68 0.02 255)" }}>
              No appointments yet.
            </p>
          </div>
        ) : (
          <div
            className="border overflow-hidden"
            style={{ borderColor: "oklch(0.25 0.04 250)" }}
            data-ocid="admin.table"
          >
            <Table>
              <TableHeader>
                <TableRow
                  style={{
                    borderColor: "oklch(0.25 0.04 250)",
                    background: "oklch(0.17 0.035 248)",
                  }}
                >
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    #
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Name
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Phone
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Practice Area
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Date
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Status
                  </TableHead>
                  <TableHead
                    style={{ color: "oklch(0.73 0.12 85)" }}
                    className="uppercase text-xs tracking-wider"
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, idx) => (
                  <TableRow
                    key={booking.id.toString()}
                    style={{ borderColor: "oklch(0.25 0.04 250)" }}
                    data-ocid={`admin.row.item.${idx + 1}`}
                  >
                    <TableCell
                      className="text-xs"
                      style={{ color: "oklch(0.68 0.02 255)" }}
                    >
                      {booking.id.toString()}
                    </TableCell>
                    <TableCell
                      className="font-medium"
                      style={{ color: "oklch(0.93 0.01 260)" }}
                    >
                      {booking.name}
                    </TableCell>
                    <TableCell style={{ color: "oklch(0.78 0.02 255)" }}>
                      <a
                        href={`tel:${booking.phone}`}
                        className="hover:text-gold transition-colors"
                      >
                        {booking.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize border-gold/30"
                        style={{ color: "oklch(0.73 0.12 85)" }}
                      >
                        {booking.practiceArea}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="text-sm"
                      style={{ color: "oklch(0.78 0.02 255)" }}
                    >
                      {booking.preferredDate}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs capitalize border ${STATUS_COLORS[booking.status]}`}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isUpdating}
                            className="text-xs rounded-none border-border/60 h-7"
                            data-ocid={`admin.edit_button.${idx + 1}`}
                          >
                            Update <ChevronDown className="w-3 h-3 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {Object.values(BookingStatus).map((s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => handleStatusChange(booking.id, s)}
                              className="capitalize text-sm"
                            >
                              {s}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

// ────────── Our Team ──────────
const TEAM = [
  {
    name: "Adv. Love Kumar Prajapati",
    role: "Senior Advocate",
    phone: "9131178255",
    photo: "/assets/uploads/love09-3.jpeg",
  },
  {
    name: "ADV Umesh Varma",
    role: "Senior Advocate",
    phone: "9827189494",
    photo: "/assets/uploads/WhatsApp-Image-2026-03-23-at-2.09.25-PM-1.jpeg",
  },
  {
    name: "Ayush Varma",
    role: "Senior Advocate",
    phone: "9826561474",
    photo: "/assets/uploads/download-1.webp",
  },
  {
    name: "Vivek Sharma",
    role: "Senior Advocate",
    phone: "8770496240",
    photo:
      "/assets/uploads/download-019d1b9f-84f9-74fa-a260-8b17977ffc77-1.webp",
  },
];

function OurTeam() {
  return (
    <section
      id="team"
      className="py-24"
      style={{ background: "oklch(0.13 0.03 245)" }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.73 0.12 85)" }}
          >
            Meet the Team
          </p>
          <h2 className="section-title">Our Legal Professionals</h2>
          <div className="gold-divider" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.phone}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-none border text-center p-6 flex flex-col items-center gap-4"
              style={{
                background: "oklch(0.17 0.035 248)",
                borderColor: "oklch(0.25 0.04 250)",
              }}
              data-ocid={`team.item.${i + 1}`}
            >
              <div
                className="w-36 h-36 rounded-none border-2 overflow-hidden flex-shrink-0"
                style={{ borderColor: "oklch(0.73 0.12 85 / 0.6)" }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3
                  className="font-serif text-lg font-semibold"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.58 0.02 255)" }}
                >
                  {member.role}
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center justify-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                  data-ocid={"team.link"}
                >
                  <Phone className="w-4 h-4" /> {member.phone}
                </a>
                <a
                  href={`https://wa.me/91${member.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-none border transition-colors hover:opacity-90"
                  style={{
                    background: "oklch(0.73 0.12 85 / 0.12)",
                    borderColor: "oklch(0.73 0.12 85 / 0.4)",
                    color: "oklch(0.73 0.12 85)",
                  }}
                  data-ocid={"team.button"}
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────── Footer ──────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t py-12"
      style={{
        background: "oklch(0.11 0.025 245)",
        borderColor: "oklch(0.73 0.12 85 / 0.3)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2"
                style={{ borderColor: "oklch(0.73 0.12 85)" }}
              >
                <img
                  src="/assets/uploads/high-court-2.jpeg"
                  alt="High Court Chhattisgarh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "oklch(0.73 0.12 85)" }}
                >
                  Advocate
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: "oklch(0.93 0.01 260)" }}
                >
                  Love Kumar Prajapati
                </div>
              </div>
            </div>
            <p className="text-xs" style={{ color: "oklch(0.58 0.02 255)" }}>
              Trusted legal expertise in Bilaspur. Committed to justice and your
              rights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.73 0.12 85)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "home",
                "about",
                "team",
                "practice",
                "appointment",
                "contact",
              ].map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="text-xs uppercase tracking-wider hover:text-gold transition-colors"
                    style={{ color: "oklch(0.58 0.02 255)" }}
                    data-ocid="footer.link"
                  >
                    {id === "practice"
                      ? "Practice Areas"
                      : id === "team"
                        ? "Our Team"
                        : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.73 0.12 85)" }}
            >
              Contact
            </h4>
            <div className="space-y-2">
              <a
                href="tel:9131178255"
                className="flex items-center gap-2 text-xs hover:text-gold transition-colors"
                style={{ color: "oklch(0.58 0.02 255)" }}
              >
                <Phone className="w-3 h-3" /> 9131178255
              </a>
              <a
                href="https://wa.me/919131178255"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs hover:text-gold transition-colors"
                style={{ color: "oklch(0.58 0.02 255)" }}
              >
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </a>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "oklch(0.58 0.02 255)" }}
              >
                <MapPin className="w-3 h-3" /> Bilaspur, Chhattisgarh
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "oklch(0.73 0.12 85 / 0.15)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.02 255)" }}>
            © {year} Advocate Love Kumar Prajapati. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.45 0.02 255)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              style={{ color: "oklch(0.73 0.12 85 / 0.7)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ────────── App ──────────
export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { data: isAdmin } = useIsAdmin();
  const adminRef = useRef<HTMLDivElement>(null);

  const handleAdminClick = () => {
    setShowAdmin(true);
    setTimeout(
      () => adminRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Navbar onAdminClick={handleAdminClick} />
      <main>
        <Hero />
        <About />
        <OurTeam />
        <PracticeAreas />
        <AppointmentForm />
        <Contact />
        {isAdmin && showAdmin && (
          <div ref={adminRef}>
            <AdminDashboard onClose={() => setShowAdmin(false)} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
