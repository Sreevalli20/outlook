import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Copy,
  Check,
  Edit3,
  BookOpen,
  Sparkles,
  Save,
  Trash2,
  Send,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  FolderArchive,
  KanbanSquare,
} from 'lucide-react';
import { useTemplateStore } from '../store/useTemplateStore';
import { useApplicationStore } from '../store/useApplicationStore';
import { TemplateCategory, EssayTemplate, UserAdaptedDraft } from '../types/template';
import { Badge } from '../components/common/Badge';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { formatDate } from '../utils/formatters';

const CATEGORIES: { label: string; value: TemplateCategory | 'all' }[] = [
  { label: 'All Templates', value: 'all' },
  { label: 'Personal Statement', value: 'Personal Statement' },
  { label: 'Leadership', value: 'Leadership' },
  { label: 'Financial Need', value: 'Financial Need' },
  { label: 'STEM & Innovation', value: 'STEM & Innovation' },
  { label: 'Community Service', value: 'Community Service' },
];

export const ApplicationTemplatesPage: React.FC = () => {
  const {
    templates,
    drafts,
    selectedTemplateId,
    setSelectedTemplateId,
    saveDraft,
    deleteDraft,
  } = useTemplateStore();

  const { applications, updateApplicationDetails } = useApplicationStore();

  const [categoryFilter, setCategoryFilter] = useState<TemplateCategory | 'all'>('all');
  const [activeWorkspaceMode, setActiveWorkspaceMode] = useState<'guide' | 'adapt' | 'drafts'>('guide');

  // Currently selected template
  const currentTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Editor states
  const [editorDraftTitle, setEditorDraftTitle] = useState(`${currentTemplate.category} Draft`);
  const [editorContent, setEditorContent] = useState(currentTemplate.content);
  const [targetAppId, setTargetAppId] = useState<string>(applications[0]?.id || '');
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);

  // User notifications & feedback
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [deletingDraft, setDeletingDraft] = useState<UserAdaptedDraft | null>(null);

  // Filter templates list
  const filteredTemplates = useMemo(() => {
    if (categoryFilter === 'all') return templates;
    return templates.filter((t) => t.category === categoryFilter);
  }, [templates, categoryFilter]);

  // Word count calculation
  const wordCount = useMemo(() => {
    const text = editorContent.trim();
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [editorContent]);

  const readingTimeMinutes = Math.ceil(wordCount / 200);

  // Handle switching template
  const handleSelectTemplate = (tmpl: EssayTemplate) => {
    setSelectedTemplateId(tmpl.id);
    setEditorDraftTitle(`${tmpl.category} Draft`);
    setEditorContent(tmpl.content);
    setActiveDraftId(null);
  };

  // Copy template content to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Save current adaptation to drafts
  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = saveDraft({
      id: activeDraftId || undefined,
      templateId: currentTemplate.id,
      templateTitle: currentTemplate.title,
      title: editorDraftTitle.trim() || 'Untitled Essay Draft',
      content: editorContent,
      targetApplicationId: targetAppId || undefined,
    });
    setActiveDraftId(saved.id);
    setSaveSuccessMsg('Essay draft saved to your local workspace!');
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  // Push draft into chosen application's notes
  const handleApplyToApplication = () => {
    if (!targetAppId) return;
    const targetApp = applications.find((a) => a.id === targetAppId);
    if (!targetApp) return;

    const appendedNotes = targetApp.notes
      ? `${targetApp.notes}\n\n--- Essay Draft: ${editorDraftTitle} ---\n${editorContent}`
      : `--- Essay Draft: ${editorDraftTitle} ---\n${editorContent}`;

    updateApplicationDetails(targetAppId, {
      notes: appendedNotes,
    });

    setSaveSuccessMsg(`Draft attached directly to ${targetApp.scholarshipName}'s application notes!`);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Load a saved draft into the live editor
  const handleLoadDraft = (draft: UserAdaptedDraft) => {
    setActiveDraftId(draft.id);
    setSelectedTemplateId(draft.templateId);
    setEditorDraftTitle(draft.title);
    setEditorContent(draft.content);
    if (draft.targetApplicationId) {
      setTargetAppId(draft.targetApplicationId);
    }
    setActiveWorkspaceMode('adapt');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#101828] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SCHOLARSHIP ESSAY ARCHITECTURE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Application Essay Templates & Adaptation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Battle-tested narrative structures for personal statements, leadership narratives, and financial adversity statements. Study paragraph-by-paragraph formulas, fill guided placeholders, and attach customized essays directly to your application trackers.
          </p>
        </div>

        {/* Quick Links to Documents and Applications */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            to="/documents"
            className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <FolderArchive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Document Vault</span>
          </Link>
          <Link
            to="/applications"
            className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <KanbanSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Application Tracker</span>
          </Link>
        </div>
      </div>

      {/* Category Pills & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategoryFilter(cat.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                categoryFilter === cat.value
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-end sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveWorkspaceMode('guide')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeWorkspaceMode === 'guide'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Template Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveWorkspaceMode('adapt')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeWorkspaceMode === 'adapt'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Adapt & Customize</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveWorkspaceMode('drafts')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeWorkspaceMode === 'drafts'
                ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Drafts ({drafts.length})</span>
          </button>
        </div>
      </div>

      {/* Success notification banner */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar (4 Cols): Template Catalog Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Framework
            </span>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {filteredTemplates.length} Available
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredTemplates.map((tmpl) => {
              const isSelected = tmpl.id === currentTemplate.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 dark:bg-[#101828] border-emerald-500/80 dark:border-emerald-500 shadow-xs'
                      : 'bg-white dark:bg-[#101828] border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <Badge variant={isSelected ? 'emerald' : 'default'} size="sm">
                      {tmpl.category}
                    </Badge>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {tmpl.targetLength}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                    {tmpl.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {tmpl.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Panel (8 Cols): Dependent on Active Workspace Mode */}
        <div className="lg:col-span-8">
          {/* MODE 1: Template Guide */}
          {activeWorkspaceMode === 'guide' && (
            <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-6 transition-colors">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="emerald" size="sm">
                      {currentTemplate.category}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Target: {currentTemplate.targetLength}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {currentTemplate.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyText(currentTemplate.content)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copyFeedback ? 'Copied' : 'Copy Template'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveWorkspaceMode('adapt')}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Adapt This Template</span>
                  </button>
                </div>
              </div>

              {/* Section-by-Section Structural Formula */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Narrative Blueprint & Paragraph Architecture
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentTemplate.structure.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-900 font-mono text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          {sec.heading}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {sec.recommendedLength}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                        {sec.guidance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Content Preview Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Template Draft (with Guided Placeholders)
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ~{currentTemplate.content.split(/\s+/).length} words
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-serif leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                  {currentTemplate.content}
                </div>
              </div>

              {/* Writing & Review Tips */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/80 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Evaluation Committee Review Advice</span>
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {currentTemplate.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* MODE 2: Adapt & Customize Workspace */}
          {activeWorkspaceMode === 'adapt' && (
            <form
              onSubmit={handleSaveDraft}
              className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Essay Title / Target Award
                  </label>
                  <input
                    type="text"
                    value={editorDraftTitle}
                    onChange={(e) => setEditorDraftTitle(e.target.value)}
                    placeholder="e.g. Personal Statement - Google Generation CS"
                    className="w-full text-base font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                {/* Target Application Selector */}
                {applications.length > 0 && (
                  <div className="shrink-0">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Link to Application Tracker
                    </label>
                    <select
                      value={targetAppId}
                      onChange={(e) => setTargetAppId(e.target.value)}
                      className="text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl p-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 max-w-[200px] truncate"
                    >
                      <option value="">None (Independent Draft)</option>
                      {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.scholarshipName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Placeholder Helper Banner */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Adaptive Writing Tip:</strong> Replace every bracketed placeholder like{' '}
                  <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono text-[11px]">
                    [Your Field of Study]
                  </code>{' '}
                  or{' '}
                  <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono text-[11px]">
                    [Mention 1-2 skills]
                  </code>{' '}
                  with your authentic personal accomplishments and numbers.
                </p>
              </div>

              {/* Live Textarea Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Essay Workspace
                  </label>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span>
                      <strong className="text-slate-900 dark:text-slate-100">{wordCount}</strong> words
                    </span>
                    <span>•</span>
                    <span>~{readingTimeMinutes} min read</span>
                  </div>
                </div>

                <textarea
                  rows={14}
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full p-4 text-xs sm:text-sm font-serif leading-relaxed bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-[#0B1120] focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner"
                  placeholder="Draft your essay here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleCopyText(editorContent)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  {copyFeedback ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copyFeedback ? 'Copied' : 'Copy Formatted Essay'}</span>
                </button>

                <div className="flex items-center gap-2.5">
                  {targetAppId && (
                    <button
                      type="button"
                      onClick={handleApplyToApplication}
                      className="px-3.5 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Attach to Tracker Notes</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Draft</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* MODE 3: Saved Drafts List */}
          {activeWorkspaceMode === 'drafts' && (
            <div className="bg-white dark:bg-[#101828] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-2xs space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  My Customized Essay Drafts ({drafts.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveWorkspaceMode('adapt')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  + New Adaptation
                </button>
              </div>

              {drafts.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                  You haven't saved any customized essay drafts yet. Select a template and click 'Adapt This Template' to begin.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {drafts.map((draft) => {
                    const wordCount = draft.content.trim().split(/\s+/).length;
                    const linkedApp = applications.find((a) => a.id === draft.targetApplicationId);

                    return (
                      <div
                        key={draft.id}
                        className="py-4 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 p-2 rounded-xl transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {draft.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-mono">{wordCount} words</span>
                            <span>•</span>
                            <span>Updated {formatDate(draft.updatedAt)}</span>
                            {linkedApp && (
                              <>
                                <span>•</span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                                  Linked: {linkedApp.scholarshipName}
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 font-serif italic">
                            "{draft.content.slice(0, 160)}..."
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleLoadDraft(draft)}
                            className="px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors"
                          >
                            Edit Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingDraft(draft)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete draft"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Draft Confirmation */}
      {deletingDraft && (
        <ConfirmDialog
          isOpen={Boolean(deletingDraft)}
          onClose={() => setDeletingDraft(null)}
          onConfirm={() => {
            if (deletingDraft) {
              deleteDraft(deletingDraft.id);
              if (activeDraftId === deletingDraft.id) {
                setActiveDraftId(null);
              }
              setDeletingDraft(null);
            }
          }}
          title="Delete Essay Draft"
          message={`Are you sure you want to delete "${deletingDraft.title}"? This draft will be removed from your local workspace.`}
          confirmLabel="Delete Draft"
          isDestructive={true}
        />
      )}
    </div>
  );
};
