'use client';

import { memo } from 'react';
import {
  NoteEditIcon,
  LayoutTableIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Link01Icon,
  ImageUpload01Icon,
  ListViewIcon,
  LeftToRightListBulletIcon,
  TextIndentIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { EditDropdown, type EditorMode } from './edit-dropdown';
import type { FormatState } from '@/types/editor-types';

const VDivider = memo(function VDivider() {
  return <div className="w-px h-4 bg-[#E0E0E0] mx-1 shrink-0" aria-hidden="true" />;
});

interface IconBtnProps {
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon'];
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const IconBtn = memo(function IconBtn({ icon, label, active = false, onClick }: IconBtnProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`w-7 h-7 flex items-center justify-center rounded transition-all duration-150 shrink-0
        ${active ? 'bg-[#E8EEF9] text-[#1565C0]' : 'text-[#1B1B1B] hover:bg-[#F0F0F0]'}`}
    >
      <HugeiconsIcon icon={icon} size={16} color={active ? '#1565C0' : '#1B1B1B'} />
    </button>
  );
});

interface Row1BtnProps {
  icon: React.ComponentProps<typeof HugeiconsIcon>['icon'];
  label: string;
  onClick?: () => void;
}

const Row1Btn = memo(function Row1Btn({ icon, label, onClick }: Row1BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-[#1B1B1B] bg-[#F5F5F5] hover:bg-[#EAEAEA] active:bg-[#E0E0E0] font-medium font-['Inter'] rounded-full transition-colors whitespace-nowrap"
    >
      <HugeiconsIcon icon={icon} size={15} color="#1B1B1B" />
      <span>{label}</span>
    </button>
  );
});

interface EditorToolbarProps {
  mode: EditorMode;
  onModeChange: (m: EditorMode) => void;
  format: FormatState;
  onFormat: (key: keyof Omit<FormatState, 'fontSize'>) => void;
  onFontSize: (delta: 1 | -1) => void;
  onInsertImportantNote: () => void;
  onInsertTable: () => void;
}

export function EditorToolbar({
  mode,
  onModeChange,
  format,
  onFormat,
  onFontSize,
  onInsertImportantNote,
  onInsertTable,
}: EditorToolbarProps) {
  const isPreview = mode === 'preview';

  return (
    <div
      className={`bg-white select-none transition-all duration-200 border-b border-[#E8E8E8] ${isPreview ? 'pb-1' : ''}`}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        {!isPreview ? (
          <div className="flex items-center gap-2">
            <Row1Btn icon={LayoutTableIcon} label="Template" />
            <Row1Btn icon={NoteEditIcon} label="Important Note" onClick={onInsertImportantNote} />
            <Row1Btn icon={LayoutTableIcon} label="Table" onClick={onInsertTable} />
          </div>
        ) : (
          <div aria-hidden="true" />
        )}

        <div>
          <EditDropdown mode={mode} onChange={onModeChange} />
        </div>
      </div>

      {!isPreview && (
        <div className="flex items-center px-4 pb-3 gap-0.5 animate-fadeIn">
          <button
            type="button"
            aria-label="Decrease font size"
            onClick={() => onFontSize(-1)}
            className="w-6 h-6 flex items-center justify-center text-[#1B1B1B] hover:bg-[#F0F0F0] rounded text-base leading-none transition-colors shrink-0"
          >
            −
          </button>
          <span className="mx-0.5 min-w-[2rem] px-1 h-6 flex items-center justify-center border border-[#D0D0D0] rounded text-sm text-[#1B1B1B] font-medium font-['Inter']">
            {format.fontSize}
          </span>
          <button
            type="button"
            aria-label="Increase font size"
            onClick={() => onFontSize(1)}
            className="w-6 h-6 flex items-center justify-center text-[#1B1B1B] hover:bg-[#F0F0F0] rounded text-base leading-none transition-colors shrink-0"
          >
            +
          </button>

          <VDivider />

          <IconBtn
            icon={TextBoldIcon}
            label="Bold"
            active={format.bold}
            onClick={() => onFormat('bold')}
          />
          <IconBtn
            icon={TextUnderlineIcon}
            label="Underline"
            active={format.underline}
            onClick={() => onFormat('underline')}
          />
          <IconBtn
            icon={TextItalicIcon}
            label="Italic"
            active={format.italic}
            onClick={() => onFormat('italic')}
          />

          <button
            type="button"
            aria-label="Text colour"
            className="w-7 h-7 flex flex-col items-center justify-center rounded hover:bg-[#F0F0F0] transition-colors shrink-0"
          >
            <span className="text-sm font-bold text-[#1B1B1B] leading-none">A</span>
            <span className="w-3.5 h-[3px] rounded-full bg-[#1B1B1B] mt-0.5" />
          </button>

          <VDivider />

          <IconBtn icon={Link01Icon} label="Insert link" />
          <IconBtn icon={ImageUpload01Icon} label="Insert image" />

          <VDivider />

          <IconBtn icon={TextIndentIcon} label="Indent" />
          <IconBtn icon={ListViewIcon} label="Outdent" />
          <IconBtn icon={LeftToRightListBulletIcon} label="Bullet list" />
        </div>
      )}
    </div>
  );
}
