import React, { useState } from 'react';
import { SEASONS_DATA, SeasonalTask } from '../data/seasons';
import { Calendar, CheckCircle, Circle, Thermometer, Clock, Shovel, ChevronRight, Sparkles } from 'lucide-react';

export const SeasonalAlmanac: React.FC = () => {
  const [selectedSeasonKey, setSelectedSeasonKey] = useState<string>('spring');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set(['sp-1']));

  const activeSeason = SEASONS_DATA[selectedSeasonKey];

  const categories = [
    'All',
    'Sowing & Propagation',
    'Soil & Nutrition',
    'Pruning & Shaping',
    'Protection & Pest Care'
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const filteredTasks = activeSeason.tasks.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const completedCount = activeSeason.tasks.filter((t) => completedTaskIds.has(t.id)).length;
  const progressPercent = Math.round((completedCount / activeSeason.tasks.length) * 100);

  return (
    <section id="almanac" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E7ECE4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#465A4F] font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2D5A3F]" />
              <span>Horticultural Rhythm & Phenology</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#13241B]">
              Seasonal Care Almanac & Checklist
            </h2>
          </div>
          <p className="text-sm text-[#5D7065] max-w-md font-light leading-relaxed">
            Gardening follows the earth's solar arc. Align your root feeding, structural pruning,
            and seed sowing with certified organic nursery practices.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {Object.entries(SEASONS_DATA).map(([key, season]) => {
            const isSelected = selectedSeasonKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedSeasonKey(key)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1A3828] text-white border-[#1A3828] shadow-md ring-1 ring-[#1A3828]'
                    : 'bg-white text-[#465A4F] border-[#E7ECE4] hover:bg-[#F2F5F0] hover:text-[#13241B]'
                }`}
              >
                <div className="text-xs font-mono uppercase tracking-wider opacity-75 mb-1">
                  Season Chapter
                </div>
                <div className={`font-serif text-lg font-bold ${isSelected ? 'text-[#FAF9F6]' : 'text-[#13241B]'}`}>
                  {season.name}
                </div>
                <div className="text-[11px] truncate mt-1 opacity-85">
                  {season.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Seasonal Conditions Overview Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7ECE4] shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-[#EEF2EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2F7F1] flex items-center justify-center text-[#2D5A3F]">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#788E81] block">Average Ambient Temperature</span>
                <span className="font-mono text-sm font-bold text-[#13241B]">{activeSeason.temperatureRange}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF9ED] flex items-center justify-center text-[#D97706]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#788E81] block">Photoperiod Daylight Arc</span>
                <span className="font-mono text-sm font-bold text-[#13241B]">{activeSeason.daylight}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5F2EB] flex items-center justify-center text-[#8D6B42]">
                <Shovel className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#788E81] block">Soil & Mycorrhizal Priority</span>
                <span className="text-xs text-[#33463B] font-medium line-clamp-1">{activeSeason.soilFocus}</span>
              </div>
            </div>
          </div>

          {/* Interactive Checklist Header & Filter */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#2D5A3F] text-white'
                      : 'bg-[#F2F5F0] text-[#55695C] hover:bg-[#E5ECE3] hover:text-[#13241B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Checklist Completion Progress */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#55695C] font-mono">
                {completedCount} of {activeSeason.tasks.length} Completed ({progressPercent}%)
              </span>
              <div className="w-24 h-2 bg-[#E7ECE4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D5A3F] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="mt-6 space-y-3">
            {filteredTasks.map((task) => {
              const isDone = completedTaskIds.has(task.id);

              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isDone
                      ? 'bg-[#F7FBF6] border-[#D1E4CF]'
                      : 'bg-[#FAF9F6] border-[#EAEFE8] hover:border-[#DCE4DA] hover:bg-[#F4F7F2]'
                  }`}
                >
                  <button
                    aria-label={`Mark task ${task.title} as ${isDone ? 'incomplete' : 'completed'}`}
                    className="mt-0.5 text-[#2D5A3F] focus:outline-none shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 fill-[#2D5A3F] text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#9CAE9F]" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#6B7D72] mb-1 font-mono">
                      <span>{task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{task.timeframe}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          task.importance === 'Essential'
                            ? 'text-[#B45309] font-semibold'
                            : 'text-[#4A7C59]'
                        }
                      >
                        {task.importance}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        isDone ? 'line-through text-[#788E81]' : 'text-[#13241B]'
                      }`}
                    >
                      {task.title}
                    </h4>

                    <p className="text-xs text-[#55695C] mt-1.5 leading-relaxed font-light">
                      <strong className="font-semibold text-[#1A3828]">Technique:</strong>{' '}
                      {task.technique}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
