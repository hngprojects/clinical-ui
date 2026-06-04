'use client';

import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { EditorToolbar } from './editor-toolbar';
import { EditorContent } from './editor-content';
import type { EditorMode } from './edit-dropdown';
import type { EditorBlock, FormatState, TableBlock } from '@/types/editor-types';

interface ReportEditorProps {
  caseId: string;
}

export function ReportEditor({ caseId }: ReportEditorProps) {
  const [mode, setMode] = useState<EditorMode>('edit');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState('');

  const [format, setFormat] = useState<FormatState>({
    fontSize: 11,
    bold: false,
    italic: false,
    underline: false,
  });

  const [blocks, setBlocks] = useState<EditorBlock[]>([
    { id: 'init-block-1', type: 'paragraph', text: '' },
  ]);

  const isReportEmpty = useMemo(() => {
    return blocks.every((block) => {
      if (block.type === 'paragraph' || block.type === 'important-note') {
        return !block.text.trim();
      }
      if (block.type === 'table') {
        return block.rows.every((row) => row.cells.every((cell) => !cell.trim()));
      }
      return true;
    });
  }, [blocks]);

  const handleUpdateBlock = useCallback((id: string, updatedFields: Partial<EditorBlock>) => {
    setBlocks(
      (prev) =>
        prev.map((block) =>
          block.id === id ? { ...block, ...updatedFields } : block,
        ) as EditorBlock[],
    );
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  }, []);

  const handleToggleFormat = useCallback((key: keyof Omit<FormatState, 'fontSize'>) => {
    setFormat((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleFontSizeShift = useCallback((delta: 1 | -1) => {
    setFormat((prev) => ({
      ...prev,
      fontSize: Math.min(72, Math.max(8, prev.fontSize + delta)),
    }));
  }, []);

  const handleInsertImportantNote = useCallback(() => {
    setBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'important-note', text: '' },
      { id: crypto.randomUUID(), type: 'paragraph', text: '' },
    ]);
  }, []);

  const handleInsertTable = useCallback(() => {
    const defaultTable: TableBlock = {
      id: crypto.randomUUID(),
      type: 'table',
      headers: ['Medication', 'Dosage', 'Frequency', 'Duration'],
      rows: [{ cells: ['', '', '', ''] }, { cells: ['', '', '', ''] }],
    };

    setBlocks((prev) => [
      ...prev,
      defaultTable,
      { id: crypto.randomUUID(), type: 'paragraph', text: '' },
    ]);
  }, []);

  const handleOpenSendModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDocumentName('');
  };

  const handleFinalizeSubmit = () => {
    toast.success(`Report "${documentName}" for Case ${caseId} submitted successfully!`);
    setIsModalOpen(false);
    setDocumentName('');
  };

  return (
    <>
      <div className="flex-1 flex flex-col gap-4 min-w-0 h-full">
        <div className="flex justify-end items-center shrink-0">
          <button
            type="button"
            onClick={handleOpenSendModal}
            disabled={isReportEmpty}
            className={`px-5 py-2.5 transition-all duration-150 text-white text-sm font-medium font-['Inter'] rounded-lg shadow-sm ${
              isReportEmpty
                ? 'bg-[#D4D4D4] cursor-not-allowed'
                : 'bg-[#1565C0] hover:bg-[#1256A8] active:bg-[#0F4C9E]'
            }`}
          >
            Send Report
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-[#E8E8E8] flex flex-col overflow-hidden shadow-sm h-full">
          <EditorToolbar
            mode={mode}
            onModeChange={setMode}
            format={format}
            onFormat={handleToggleFormat}
            onFontSize={handleFontSizeShift}
            onInsertImportantNote={handleInsertImportantNote}
            onInsertTable={handleInsertTable}
          />

          <div className="flex-1 overflow-y-auto w-full">
            <EditorContent
              blocks={blocks}
              editable={mode === 'edit'}
              format={format}
              onUpdateBlock={handleUpdateBlock}
              onDeleteBlock={handleDeleteBlock}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[440px] p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#1B1B1B] text-xl font-semibold font-['Inter'] leading-6">
                Confirm Report Delivery
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-[#1B1B1B] hover:bg-gray-100 transition-colors p-1.5 rounded-full"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[#1B1B1B] text-sm font-medium font-['Inter']">
                Document Name
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Report Name"
                className="w-full px-4 py-3 border border-[#E8E8E8] rounded-xl outline-none focus:border-[#1565C0] text-[#494949] placeholder:text-[#BBBBBB] text-base font-['Inter'] transition-colors"
              />
            </div>

            <p className="text-[#767676] text-sm font-['Inter'] leading-5 mb-6">
              This report will be shared with the patient and will initiate the consultation phase
            </p>

            <button
              onClick={handleFinalizeSubmit}
              disabled={!documentName.trim()}
              className={`w-full py-3.5 rounded-xl text-white text-base font-medium font-['Inter'] transition-all ${
                documentName.trim()
                  ? 'bg-[#1565C0] hover:bg-[#1256A8] shadow-sm'
                  : 'bg-[#D4D4D4] cursor-not-allowed'
              }`}
            >
              Finalize & Submit Report
            </button>
          </div>
        </div>
      )}
    </>
  );
}
