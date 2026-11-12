import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Institute About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_70928a07.png"
                alt="Practical Centre Logo"
                className="w-12 h-12 object-contain drop-shadow-xs"
              />
              <div>
                <h3 className="font-extrabold text-white text-base">Practical Centre</h3>
                <p className="text-xs text-emerald-400">Excellence in Board Preparation • Karachi</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Karachi’s premier coaching institution preparing students for SSC & HSC Board Examinations (BIEK & BSEK) across Pre-Engineering, Pre-Medical, Computer Science, and Commerce streams.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Over 35+ Years of Board Positions</span>
            </div>
          </div>

          {/* Column 2: Gulshan Campus */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Gulshan-e-Iqbal Campus (Block 1)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plot B-14, Block 1, Gulshan-e-Iqbal, Near Disco Bakery & Allama Shabbir Ahmed Usmani Road, Karachi.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>(021) 3498-4412 / 0300-8291456</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Day Shift: 15:20 – 18:00 (Sections A, A1, A2)</span>
              </p>
            </div>
          </div>

          {/* Column 3: PECHS Campus */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>PECHS Campus (Block 2)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Suite 42, Main Sharea Faisal, Block 2 PECHS, Near Nursery Flyover, Karachi.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>(021) 3455-7890 / 0321-9876543</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Evening Shift: 18:20 – 21:00 (Sections C, C1, C2)</span>
              </p>
            </div>
          </div>

          {/* Column 4: Quick Portals & Shift Rules */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Portals & Cohort Rules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/student" className="text-slate-400 hover:text-white transition-colors">
                  &rarr; Student Attendance & Weekly Reports
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                  &rarr; Admin Wi-Fi / Barcode Attendance Hub
                </Link>
              </li>
              <li>
                <Link to="/admission-form" className="text-slate-400 hover:text-white transition-colors">
                  &rarr; Online Admission & Eligibility Form
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-slate-400 hover:text-white transition-colors">
                  &rarr; Moderated Student Discussion Forum
                </Link>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="text-teal-400 font-semibold">Institutional Cohort Policy:</p>
              <p>• Male Students: Mon – Wed (Day & Eve)</p>
              <p>• Female Students: Thu – Sat (Day & Eve)</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Practical Centre (PC) Karachi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-teal-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Smart Portal Prototype (Demo Simulation)</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
