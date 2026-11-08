import React, { useState } from 'react';
import { PLANT_SYMPTOMS, PlantSymptom } from '../data/diagnostic';
import { Stethoscope, AlertCircle, CheckCircle, ShieldAlert, Sparkles, Send, Check } from 'lucide-react';

export const PlantClinic: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string>('All');
  const [activeSymptomId, setActiveSymptomId] = useState<string>(PLANT_SYMPTOMS[0].id);
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState({
    plantName: '',
    description: '',
    email: ''
  });

  const parts = ['All', 'Leaves', 'Stems', 'Soil', 'Whole Plant'];

  const filteredSymptoms = PLANT_SYMPTOMS.filter(
    (s) => selectedPart === 'All' || s.affectedPart === selectedPart
  );

  const activeSymptom =
    PLANT_SYMPTOMS.find((s) => s.id === activeSymptomId) || PLANT_SYMPTOMS[0];

  const handleClinicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.plantName || !customQuestion.description) return;
    setQuestionSubmitted(true);
    setTimeout(() => {
      setQuestionSubmitted(false);
      setCustomQuestion({ plantName: '', description: '', email: '' });
    }, 4000);
  };

  return (
    <section id="clinic" className="py-16 md:py-24 bg-[#F5F7F3] border-b border-[#E7ECE4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold mb-2 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#2D5A3F]" />
              <span>Diagnostic Botanical Companion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#13241B]">
              Plant Health Clinic & Symptom Guide
            </h2>
          </div>
          <p className="text-sm text-[#5D7065] max-w-md font-light leading-relaxed">
            Plants communicate through foliage turgor, leaf margins, and root mycorrhizae.
            Identify symptoms early to restore botanical vitality naturally.
          </p>
        </div>

        {/* Filter Pills for Affected Area */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
          {parts.map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedPart === part
                  ? 'bg-[#1A3828] text-white shadow-sm'
                  : 'bg-white text-[#465A4F] border border-[#E7ECE4] hover:bg-[#F2F5F0]'
              }`}
            >
              {part}
            </button>
          ))}
        </div>

        {/* Diagnostic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Symptom Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-[#1A3828] uppercase tracking-wider mb-2">
              Select Observed Foliage Symptom:
            </div>

            {filteredSymptoms.map((sym) => {
              const isSelected = sym.id === activeSymptom.id;

              return (
                <button
                  key={sym.id}
                  onClick={() => setActiveSymptomId(sym.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white border-[#2D5A3F] shadow-md ring-1 ring-[#2D5A3F]'
                      : 'bg-white/80 border-[#E7ECE4] hover:bg-white hover:border-[#DCE4DA]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-serif font-bold text-[#13241B] text-sm sm:text-base">
                      {sym.symptomName}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        sym.severity === 'Critical'
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : sym.severity === 'Moderate'
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#E0F2FE] text-[#0369A1]'
                      }`}
                    >
                      {sym.severity}
                    </span>
                  </div>

                  <p className="text-xs text-[#55695C] line-clamp-2 leading-relaxed font-light">
                    {sym.summary}
                  </p>

                  <div className="mt-2 text-[11px] text-[#788E81] flex items-center gap-1.5 font-mono">
                    <span>Part: {sym.affectedPart}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: In-Depth Diagnostic Action Plan */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7ECE4] shadow-sm">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EEF2EB]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#788E81] font-mono">
                    Diagnostic Analysis & Prescription
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#13241B] mt-1">
                    {activeSymptom.symptomName}
                  </h3>
                </div>

                <div
                  className={`p-3 rounded-2xl ${
                    activeSymptom.severity === 'Critical'
                      ? 'bg-[#FEE2E2] text-[#B91C1C]'
                      : 'bg-[#EAEFE8] text-[#2D5A3F]'
                  }`}
                >
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>

              {/* Likely Botanical Causes */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-[#1A3828] uppercase tracking-wider mb-2">
                  Likely Botanical Causes:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#465A4F]">
                  {activeSymptom.likelyCauses.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#2D5A3F] font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Urgent Action */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F5F8F3] border border-[#DFECE0]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A3828] mb-1.5">
                  <AlertCircle className="w-4 h-4 text-[#2D5A3F]" />
                  <span>Immediate First-Aid Action:</span>
                </div>
                <p className="text-xs text-[#33463B] leading-relaxed">
                  {activeSymptom.immediateAction}
                </p>
              </div>

              {/* Preventative Routine */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-[#1A3828] uppercase tracking-wider mb-2">
                  Ongoing Prevention & Soil Care:
                </h4>
                <p className="text-xs text-[#55695C] leading-relaxed">
                  {activeSymptom.preventativeRoutine}
                </p>
              </div>
            </div>

            {/* Custom Question Form */}
            <div className="bg-white p-6 rounded-3xl border border-[#E7ECE4] shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#13241B] mb-1">
                Need an Expert Horticulturist Review?
              </h4>
              <p className="text-xs text-[#55695C] mb-4">
                Describe an unlisted symptom or peculiar foliage growth. Our resident greenhouse botanists review inquiries weekly.
              </p>

              {questionSubmitted ? (
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#16A34A]" />
                  <span>Your botanical inquiry has been dispatched to our conservatory clinic desk!</span>
                </div>
              ) : (
                <form onSubmit={handleClinicSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Plant species (e.g. Fiddle Leaf Fig)"
                      value={customQuestion.plantName}
                      onChange={(e) => setCustomQuestion({ ...customQuestion, plantName: e.target.value })}
                      required
                      className="px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={customQuestion.email}
                      onChange={(e) => setCustomQuestion({ ...customQuestion, email: e.target.value })}
                      required
                      className="px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Describe symptoms, watering cadence, and room light exposure..."
                    value={customQuestion.description}
                    onChange={(e) => setCustomQuestion({ ...customQuestion, description: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#DCE4DA] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3F] text-[#13241B]"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#1A3828] hover:bg-[#254F39] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Clinic Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
