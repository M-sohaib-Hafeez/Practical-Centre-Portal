import React from 'react';
import { Filter, Search, RotateCcw, Users, Layers, Sun, Moon, Sparkles } from 'lucide-react';
import { ClassLevel, ShiftType, CohortType, StreamType } from '../../types';

export interface FilterCriteria {
  classLevel: string; // 'All' | ClassLevel
  shift: string;      // 'All' | 'Day' | 'Evening'
  cohort: string;     // 'All' | 'Male' | 'Female'
  stream: string;     // 'All' | StreamType
  section: string;    // 'All' | 'A' | 'A1' | 'A2' | 'C' | 'C1' | 'C2'
  searchQuery: string;
}

interface StudentFilterBarProps {
  filters: FilterCriteria;
  onFilterChange: (newFilters: FilterCriteria) => void;
  totalCount: number;
  filteredCount: number;
  title?: string;
}

export const StudentFilterBar: React.FC<StudentFilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
  title = 'Student Filter System',
}) => {
  const update = (key: keyof FilterCriteria, value: string) => {
    // If shift changed, reset section if it's no longer compatible with the shift rule
    let nextSection = filters.section;
    if (key === 'shift') {
      if (value === 'Day' && nextSection.startsWith('C')) {
        nextSection = 'All';
      } else if (value === 'Evening' && nextSection.startsWith('A')) {
        nextSection = 'All';
      }
    }
    onFilterChange({
      ...filters,
      [key]: value,
      section: key === 'shift' ? nextSection : key === 'section' ? value : filters.section,
    });
  };

  const handleReset = () => {
    onFilterChange({
      classLevel: 'All',
      shift: 'All',
      cohort: 'All',
      stream: 'All',
      section: 'All',
      searchQuery: '',
    });
  };

  const isFiltered =
    filters.classLevel !== 'All' ||
    filters.shift !== 'All' ||
    filters.cohort !== 'All' ||
    filters.stream !== 'All' ||
    filters.section !== 'All' ||
    filters.searchQuery.trim() !== '';

  // Institutional Section Rule:
  // Day shift students always start from A (A, A1, A2...)
  // Night / Evening shift students always start from C (C, C1, C2...)
  const daySections = ['A', 'A1', 'A2'];
  const nightSections = ['C', 'C1', 'C2', 'C3'];

  let availableSections: string[] = [];
  if (filters.shift === 'Day') {
    availableSections = daySections;
  } else if (filters.shift === 'Evening') {
    availableSections = nightSections;
  } else {
    availableSections = [...daySections, ...nightSections];
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
      {/* Top Header of the Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B4F9C] flex items-center justify-center font-bold">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              {title}
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {filteredCount} of {totalCount} Students
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Filter by: <strong className="text-slate-700">Year &gt; Shift &gt; Boys/Girls &gt; Stream &gt; Section</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Hierarchical Filter Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
        {/* 1. Academic Year / Class */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
            1. Class / Year
          </label>
          <select
            value={filters.classLevel}
            onChange={(e) => update('classLevel', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white"
          >
            <option value="All">All Years</option>
            <option value="Class IX">Class IX (Matric I)</option>
            <option value="Class X">Class X (Matric II)</option>
            <option value="Class XI">Class XI (1st Year)</option>
            <option value="Class XII">Class XII (2nd Year)</option>
          </select>
        </div>

        {/* 2. Shift (Day / Night) */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px] flex items-center gap-1">
            2. Shift
          </label>
          <select
            value={filters.shift}
            onChange={(e) => update('shift', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white"
          >
            <option value="All">All Shifts</option>
            <option value="Day">Day Shift (15:20 – 18:00)</option>
            <option value="Evening">Night Shift (18:20 – 21:00)</option>
          </select>
        </div>

        {/* 3. Gender / Cohort (Boys / Girls) */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
            3. Boys / Girls
          </label>
          <select
            value={filters.cohort}
            onChange={(e) => update('cohort', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white"
          >
            <option value="All">All Cohorts</option>
            <option value="Male">Boys (Mon – Wed)</option>
            <option value="Female">Girls (Thu – Sat)</option>
          </select>
        </div>

        {/* 4. Stream / Faculty */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
            4. Stream
          </label>
          <select
            value={filters.stream}
            onChange={(e) => update('stream', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white"
          >
            <option value="All">All Streams</option>
            <option value="Pre-Engineering">Pre-Engineering</option>
            <option value="Pre-Medical">Pre-Medical</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Matric Science">Matric Science</option>
          </select>
        </div>

        {/* 5. Section (Day starts with A, Night starts with C) */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px] flex items-center justify-between">
            <span>5. Section</span>
            <span className="text-[9px] text-[#0B4F9C] font-normal">
              {filters.shift === 'Day' ? 'Starts with A' : filters.shift === 'Evening' ? 'Starts with C' : 'A or C'}
            </span>
          </label>
          <select
            value={filters.section}
            onChange={(e) => update('section', e.target.value)}
            className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white font-mono"
          >
            <option value="All">All Sections</option>
            {availableSections.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec} {sec.startsWith('A') ? '(Day)' : '(Night)'}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Search Bar */}
        <div className="space-y-1">
          <label className="font-bold text-slate-600 uppercase tracking-wider text-[10px]">
            Search Student
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => update('searchQuery', e.target.value)}
              placeholder="Name or Roll #"
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:bg-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* Shift Rule Helper Pill */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-700">Institutional Section Rule:</span>
        <span className="inline-flex items-center gap-1 bg-blue-50 text-[#0B4F9C] px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-blue-200">
          Day Shift = Sections A, A1, A2...
        </span>
        <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded font-mono text-[10px] font-bold border border-indigo-200">
          Night Shift = Sections C, C1, C2...
        </span>
      </div>
    </div>
  );
};
