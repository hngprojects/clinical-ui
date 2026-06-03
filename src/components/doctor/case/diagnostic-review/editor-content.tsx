'use client';

import { memo, useLayoutEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon } from '@hugeicons/core-free-icons';
import type {
  EditorBlock,
  FormatState,
  ParagraphBlock,
  ImportantNoteBlock,
  TableBlock,
} from '@/types/editor-types';

interface ImportantNoteProps {
  block: ImportantNoteBlock;
  editable: boolean;
  onChange: (text: string) => void;
  onDelete: () => void;
}

const ImportantNoteBlockView = memo(function ImportantNoteBlockView({
  block,
  editable,
  onChange,
  onDelete,
}: ImportantNoteProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.text]);

  return (
    <div className="my-6 flex p-4 rounded-xl bg-[#FAFAFA] flex-col gap-2 transition-all duration-200 relative group">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[#1565C0] text-base font-medium font-['Inter'] select-none">
          Important Note
        </p>

        {editable && (
          <button
            onClick={onDelete}
            title="Delete Note"
            className="text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 p-1.5 rounded-md flex items-center justify-center"
          >
            <HugeiconsIcon icon={Delete02Icon} size={18} />
          </button>
        )}
      </div>

      {editable ? (
        <textarea
          ref={textareaRef}
          value={block.text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type important notes here..."
          className="w-full resize-none overflow-y-auto outline-none bg-transparent text-[#4B5563] text-base font-medium font-['Inter'] leading-7 placeholder:text-[#B0C4DE] max-h-[250px]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#B0C4DE transparent' }}
        />
      ) : (
        <p
          className="text-[#4B5563] text-base font-medium font-['Inter'] leading-7 whitespace-pre-line max-h-[250px] overflow-y-auto pr-2"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#B0C4DE transparent' }}
        >
          {block.text || 'No annotation provided.'}
        </p>
      )}
    </div>
  );
});

interface TableBlockProps {
  block: TableBlock;
  editable: boolean;
  onChange: (updated: TableBlock) => void;
  onDelete: () => void;
}

const TableBlockView = memo(function TableBlockView({
  block,
  editable,
  onChange,
  onDelete,
}: TableBlockProps) {
  function updateCell(rowIdx: number, colIdx: number, value: string) {
    const updatedRows = block.rows.map((row, ri) =>
      ri === rowIdx
        ? { ...row, cells: row.cells.map((cell, ci) => (ci === colIdx ? value : cell)) }
        : row,
    );
    onChange({ ...block, rows: updatedRows });
  }

  return (
    <div className="my-6 relative group pt-2">
      {editable && (
        <div className="flex justify-end absolute -top-8 right-0">
          <button
            onClick={onDelete}
            title="Delete Table"
            className="text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 p-1.5 rounded-md flex items-center justify-center z-10"
          >
            <HugeiconsIcon icon={Delete02Icon} size={18} />
          </button>
        </div>
      )}

      <div className="overflow-x-auto border-y border-[#E8E8E8] bg-white">
        <table className="w-full border-collapse text-sm font-['Inter'] table-fixed min-w-[600px]">
          <thead>
            <tr className="border-b border-[#E8E8E8]">
              {block.headers.map((header, i) => (
                <th
                  key={i}
                  className="border-r border-[#E8E8E8] last:border-r-0 px-4 py-4 text-left text-[#1B1B1B] font-medium bg-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-[#E8E8E8] last:border-b-0 group/row hover:bg-[#FAF9F9]"
              >
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-r border-[#E8E8E8] last:border-r-0 px-4 py-3 text-[#767676] vertical-align-top focus-within:bg-[#FDFDFD]"
                  >
                    {editable ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(ri, ci, e.target.value)}
                        placeholder="--"
                        className="w-full outline-none bg-transparent font-['Inter'] text-sm text-[#767676] placeholder:text-[#D0D0D0]"
                      />
                    ) : (
                      <span className="block min-h-[1.25rem]">{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

interface ParagraphProps {
  block: ParagraphBlock;
  editable: boolean;
  format: FormatState;
  onChange: (text: string) => void;
  isFirst: boolean;
}

const ParagraphBlockView = memo(function ParagraphBlockView({
  block,
  editable,
  format,
  onChange,
  isFirst,
}: ParagraphProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textStyle = {
    fontSize: `${format.fontSize}pt`,
    fontWeight: format.bold ? 700 : 400,
    fontStyle: format.italic ? 'italic' : 'normal',
    textDecoration: format.underline ? 'underline' : 'none',
  } as React.CSSProperties;

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.text, format]);

  if (!editable) {
    return (
      <p
        className="text-[#1B1B1B] font-['Inter'] leading-7 mb-3 whitespace-pre-line break-words max-h-[400px] overflow-y-auto pr-2"
        style={{
          ...textStyle,
          scrollbarWidth: 'thin',
          scrollbarColor: '#D0D0D0 transparent',
        }}
      >
        {block.text || (isFirst ? '' : '\u00A0')}
      </p>
    );
  }

  return (
    <textarea
      ref={textareaRef}
      value={block.text}
      onChange={(e) => onChange(e.target.value)}
      placeholder={isFirst ? 'Start typing medical findings here...' : 'Continue typing...'}
      className="w-full resize-none overflow-y-auto outline-none bg-transparent text-[#1B1B1B] font-['Inter'] leading-7 placeholder:text-[#C0C0C0] mb-3 focus:placeholder:opacity-50 transition-opacity max-h-[400px]"
      style={{
        ...textStyle,
        scrollbarWidth: 'thin',
        scrollbarColor: '#D0D0D0 transparent',
      }}
    />
  );
});

interface EditorContentProps {
  blocks: EditorBlock[];
  editable: boolean;
  format: FormatState;
  onUpdateBlock: (id: string, updated: Partial<EditorBlock>) => void;
  onDeleteBlock: (id: string) => void;
}

export function EditorContent({
  blocks,
  editable,
  format,
  onUpdateBlock,
  onDeleteBlock,
}: EditorContentProps) {
  return (
    <div
      className="h-full w-full flex-1 overflow-y-auto px-6 py-5 bg-[#FFFFFF]"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#D0D0D0 transparent' }}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <ParagraphBlockView
                key={block.id}
                block={block}
                editable={editable}
                format={format}
                isFirst={idx === 0}
                onChange={(text) => onUpdateBlock(block.id, { text })}
              />
            );

          case 'important-note':
            return (
              <ImportantNoteBlockView
                key={block.id}
                block={block}
                editable={editable}
                onChange={(text) => onUpdateBlock(block.id, { text })}
                onDelete={() => onDeleteBlock(block.id)}
              />
            );

          case 'table':
            return (
              <TableBlockView
                key={block.id}
                block={block}
                editable={editable}
                onChange={(updated) => onUpdateBlock(block.id, updated)}
                onDelete={() => onDeleteBlock(block.id)}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
