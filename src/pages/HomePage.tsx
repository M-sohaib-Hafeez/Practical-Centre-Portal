import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  CalendarDays,
  FileBarChart2,
  BellRing,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Auto-sliding Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      badge: 'Admissions 2026–27',
      title: 'Admissions Open for Class IX, X, XI & XII',
      subtitle:
        'Secure your place in Karachi’s top-ranked coaching institute for Pre-Engineering, Pre-Medical, Computer Science, and Commerce streams.',
      gradient: 'from-blue-950 via-indigo-900 to-blue-900',
      actionText: 'Apply for Admission Online',
      actionLink: '/admission-form',
      highlight: 'Morning & Evening Shift Batches with Separate Male/Female Cohorts',
    },
    {
      badge: 'Rigorous Academic Rhythm',
      title: 'Weekly Subject Examination Series',
      subtitle:
        'Continuous evaluation with weekly test matrices, section averages, highest benchmarks, and computerized monthly rank calculations.',
      gradient: 'from-slate-900 via-blue-950 to-teal-950',
      actionText: 'View Sample Weekly Report',
      actionLink: '/student-login',
      highlight: 'Full Parent SMS Dispatch upon Absenteeism',
    },
    {
      badge: 'Digital Study Library',
      title: 'Comprehensive Solved Notes & Past Papers',
      subtitle:
        'Access chapter derivations, Henderson equations, calculus worksheets, and 10-year Sindh Board past paper MCQs with DRM watermarking.',
      gradient: 'from-indigo-950 via-purple-950 to-slate-900',
      actionText: 'Explore Study Notes',
      actionLink: '/student-login',
      highlight: 'Grade IX–XII Curricula Covered in Full',
    },
    {
      badge: 'Smart Campus Infrastructure',
      title: 'Wi-Fi Telemetry & Barcode Attendance Hub',
      subtitle:
        'Automated attendance logging within 20 minutes of shift commencement. Strict late-entry cutoffs and instant guardian notifications.',
      gradient: 'from-teal-950 via-slate-900 to-blue-950',
      actionText: 'Open Attendance Simulator',
      actionLink: '/admin-login',
      highlight: 'Simulated Mikrotik AP & Optical Wedge Card Integration',
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Premier Coaching Institute • Karachi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Practical Centre <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-teal-700">
                  Smart Student Portal
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Karachi’s gold standard in HSC & SSC Board examination coaching. Empowering students, faculty, and guardians through automated attendance tracking, weekly performance analytics, instant parent alerts, and secure digital study resources.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/student-login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
                >
                  <UserCheck className="w-4 h-4 text-teal-300" /> Student Login & Portal
                </Link>

                <Link
                  to="/admin-login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> Admin & Faculty Console
                </Link>

                <Link
                  to="/admission-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-700 hover:text-blue-950 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white transition-colors text-sm"
                >
                  Apply Online <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Institutional Rules Chips */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" /> Male Cohort: Mon – Wed
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" /> Female Cohort: Thu – Sat
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" /> 20-min Attendance Cutoff Rule
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-5 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/aistudio/image_70928a07.png"
                      alt="Practical Centre Logo"
                      className="w-14 h-14 object-contain drop-shadow-xs"
                    />
                    <div>
                      <h3 className="font-extrabold text-[#0B4F9C] text-sm">Practical Centre Karachi</h3>
                      <p className="text-[11px] text-emerald-600 font-semibold">Smart Student Portal • 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0B4F9C] px-2 py-1 rounded-md border border-blue-200">
                    BIEK & BSEK
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase">Morning Shift (Sec A, A1, A2)</p>
                      <p className="font-bold text-slate-900 text-xs mt-0.5">15:20 – 18:00 (Cutoff 15:40)</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      In Progress
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase">Evening Shift (Sec C, C1, C2)</p>
                      <p className="font-bold text-slate-900 text-xs mt-0.5">18:20 – 21:00 (Cutoff 18:40)</p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Scheduled
                    </span>
                  </div>

                  <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-teal-900 uppercase">Parent SMS Automation</p>
                      <p className="text-xs font-semibold text-teal-950 mt-0.5">Instant absence notice delivery</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-teal-700" />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-xs text-slate-500">
                    Campus at <strong>Gulshan-e-Iqbal Block 1, Karachi</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-sliding Banner / Carousel (Module 01) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden rounded-3xl shadow-xl text-white transition-all min-h-[300px] sm:min-h-[280px] flex items-center"
        >
          {/* Active slide container */}
          <div
            className={`w-full p-8 sm:p-12 bg-gradient-to-r ${slides[currentSlide].gradient} flex flex-col justify-between transition-all duration-700`}
          >
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
                  {slides[currentSlide].badge}
                </span>
                <span className="text-xs font-mono text-slate-300 hidden sm:inline">
                  Highlight {currentSlide + 1} of {slides.length}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {slides[currentSlide].title}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={slides[currentSlide].actionLink}
                  className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  {slides[currentSlide].actionText} <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-teal-300 font-medium">
                  ✓ {slides[currentSlide].highlight}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'w-8 bg-teal-400' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Practical Centre Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">
              Institutional Heritage
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              35+ Years of Proven Board Distinctions in Karachi
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded on the belief that rigorous conceptual clarity outshines rote learning, Practical Centre has nurtured generations of doctors, engineers, computer scientists, and business leaders across Sindh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-teal-300 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Sindh Board Syllabus Mastery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exclusively tailored curricula aligned with BIEK Karachi textbooks, solved numerical guides, and past 10-year model paper trends.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Separate Cohorts & Punctual Shifts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated 3-day schedules for Male (Mon–Wed) and Female (Thu–Sat) students, ensuring maximum focus, safety, and individual faculty mentorship.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-900 text-teal-300 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Transparent Parent Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated SMS dispatch directly to parents when an absence is recorded, coupled with computerized weekly rank cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Portal Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
            Core Modules
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Integrated Academic Operations
          </h2>
          <p className="text-sm text-slate-600">
            Engineered to streamline daily coaching institute administration with zero manual friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Attendance Telemetry</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dual-mode attendance via Campus Wi-Fi AP MAC address discovery and optical smart-card barcode scanner.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center">
              <FileBarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Weekly & Monthly Reports</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Test matrices with section averages, highest benchmarks, attendance percentages, and printable official PDF report cards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Watermarked Notes</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              DRM-protected digital reader with dynamic student name, roll number, and timestamp watermark overlay to prevent leaks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center">
              <BellRing className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Parent Alerts & Time Lock</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Simulated SMS logs dispatched immediately on attendance finalization, with customizable portal access windows.
            </p>
          </div>
        </div>
      </section>

      {/* Campuses & Admissions CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                Admissions Now Open
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                Enroll Today for Board Excellence
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Take the first step toward top positions in Karachi Board Examinations. Complete our online application form in under 5 minutes with our guided wizard.
              </p>
              <div className="pt-2">
                <Link
                  to="/admission-form"
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md active:scale-95"
                >
                  Apply for Admission Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Campus Info Box */}
            <div className="grid grid-cols-1 gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Gulshan-e-Iqbal Campus (Block 1)</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Plot B-14, Block 1, Near Disco Bakery, Main Allama Shabbir Ahmed Usmani Road, Karachi.
                </p>
                <p className="text-white font-mono font-semibold pt-1">(021) 3498-4412</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
