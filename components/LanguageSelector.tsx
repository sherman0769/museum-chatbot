import React from 'react';
import { Language } from '../locales';

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
  label: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange, label }) => (
  <div className="text-sm text-slate-300 flex items-center space-x-1">
    <label htmlFor="language-select">{label}</label>
    <select
      id="language-select"
      value={language}
      onChange={(e) => onChange(e.target.value as Language)}
      className="bg-slate-600 text-slate-100 p-1 rounded"
    >
      <option value="zh-TW">繁體中文</option>
      <option value="zh-CN">简体中文</option>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  </div>
);
