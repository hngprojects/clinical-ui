export type BlockType = 'paragraph' | 'important-note' | 'table';

export interface ParagraphBlock {
  id: string;
  type: 'paragraph';
  text: string;
}

export interface ImportantNoteBlock {
  id: string;
  type: 'important-note';
  text: string;
}

export interface TableRow {
  cells: string[];
}

export interface TableBlock {
  id: string;
  type: 'table';
  headers: string[];
  rows: TableRow[];
}

export type EditorBlock = ParagraphBlock | ImportantNoteBlock | TableBlock;

export interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number;
}

export type EditorMode = 'edit' | 'preview';

export interface FormatState {
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface BaseBlock {
  id: string;
  type: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  text: string;
}

export interface ImportantNoteBlock extends BaseBlock {
  type: 'important-note';
  text: string;
}

export interface TableRow {
  cells: string[];
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  headers: string[];
  rows: TableRow[];
}
