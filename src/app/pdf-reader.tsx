'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Minus, Plus, X } from 'lucide-react';
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { bookUrl, pdfRawUrl, type Book } from '@/lib/trail';

// Leitor de PDF da BibliotecaDev dentro do DevPath.
// O arquivo vem direto do GitHub (raw, CORS liberado) e é desenhado com PDF.js;
// nada é copiado para o app. A última página lida fica salva neste navegador.

type PdfJs = typeof import('pdfjs-dist');
let pdfjsPromise: Promise<PdfJs> | null = null;
function loadPdfJs(): Promise<PdfJs> {
  pdfjsPromise ??= import('pdfjs-dist').then(lib => {
    lib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
    return lib;
  });
  return pdfjsPromise;
}

const pageKey = (bookId: string) => `devpath:pdf-page:${bookId}`;
function savedPage(bookId: string): number {
  try { return Math.max(1, Number(window.localStorage.getItem(pageKey(bookId))) || 1); } catch { return 1; }
}
function rememberPage(bookId: string, page: number) {
  try { window.localStorage.setItem(pageKey(bookId), String(page)); } catch { /* armazenamento indisponível: só não lembra a página */ }
}
const MB = (bytes: number) => (bytes / 1048576).toFixed(1).replace('.', ',');

export function PdfReader({ book, onClose }: { book: Book; onClose: () => void }) {
  const url = pdfRawUrl(book);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState({ bytes: 0, total: 0 });
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState('');

  // Carrega o documento.
  useEffect(() => {
    if (!url) { setError('Este livro não tem PDF na BibliotecaDev.'); return; }
    let cancelled = false;
    let task: PDFDocumentLoadingTask | null = null;
    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        task = pdfjs.getDocument({ url, disableAutoFetch: true });
        task.onProgress = ({ loaded: bytes, total }: { loaded: number; total: number }) => { if (!cancelled) setLoaded({ bytes, total }); };
        const pdf = await task.promise;
        if (cancelled) return;
        const start = Math.min(savedPage(book.id), pdf.numPages);
        setDoc(pdf); setPages(pdf.numPages); setPage(start); setPageInput(String(start));
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Não foi possível abrir o PDF.');
      }
    })();
    return () => { cancelled = true; void task?.destroy(); };
  }, [url, book.id]);

  // Acompanha a largura disponível para ajustar a página à tela.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(entries => setWidth(Math.floor(entries[0].contentRect.width)));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Desenha a página atual.
  useEffect(() => {
    if (!doc || !canvasRef.current || width === 0) return;
    let cancelled = false;
    let task: RenderTask | null = null;
    (async () => {
      setRendering(true);
      const pdfPage = await doc.getPage(page);
      if (cancelled || !canvasRef.current) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const fit = Math.max(0.25, (width - 24) / base.width);
      const viewport = pdfPage.getViewport({ scale: fit * zoom });
      const ratio = Math.min(window.devicePixelRatio || 1, 3);
      const canvas = canvasRef.current;
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      task = pdfPage.render({ canvas, viewport, transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0] });
      try { await task.promise; } catch { /* renderização cancelada ao trocar de página */ }
      if (!cancelled) { setRendering(false); stageRef.current?.scrollTo({ top: 0 }); }
    })();
    rememberPage(book.id, page);
    return () => { cancelled = true; task?.cancel(); };
  }, [doc, page, zoom, width, book.id]);

  const go = (target: number) => {
    if (!pages) return;
    const next = Math.min(pages, Math.max(1, target));
    setPage(next); setPageInput(String(next));
  };

  // Teclado: setas trocam de página, Esc fecha.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(page + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(page - 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const percent = loaded.total ? Math.round((loaded.bytes / loaded.total) * 100) : 0;

  return <div className="reader-overlay" role="dialog" aria-modal="true" aria-label={`Leitor: ${book.title}`}>
    <header className="reader-bar">
      <div className="reader-title"><strong>{book.title}</strong><small>{book.author}</small></div>
      <div className="reader-controls">
        <button className="btn-icon" onClick={() => go(page - 1)} disabled={!doc || page <= 1} aria-label="Página anterior"><ChevronLeft size={17} /></button>
        <form className="reader-page" onSubmit={e => { e.preventDefault(); go(Number(pageInput) || page); }}>
          <input aria-label="Ir para a página" inputMode="numeric" value={pageInput} onChange={e => setPageInput(e.target.value.replace(/\D/g, ''))} onBlur={() => go(Number(pageInput) || page)} disabled={!doc} />
          <span>de {pages || '—'}</span>
        </form>
        <button className="btn-icon" onClick={() => go(page + 1)} disabled={!doc || page >= pages} aria-label="Próxima página"><ChevronRight size={17} /></button>
        <span className="reader-sep" />
        <button className="btn-icon" onClick={() => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))} disabled={!doc} aria-label="Diminuir zoom"><Minus size={16} /></button>
        <button className="reader-zoom" onClick={() => setZoom(1)} disabled={!doc} title="Ajustar à largura">{Math.round(zoom * 100)}%</button>
        <button className="btn-icon" onClick={() => setZoom(z => Math.min(3, +(z + 0.25).toFixed(2)))} disabled={!doc} aria-label="Aumentar zoom"><Plus size={16} /></button>
        <span className="reader-sep" />
        <a className="btn-icon" href={bookUrl(book)} target="_blank" rel="noopener noreferrer" title="Abrir no GitHub" aria-label="Abrir no GitHub"><ExternalLink size={16} /></a>
        <button className="btn-icon" onClick={onClose} aria-label="Fechar leitor"><X size={18} /></button>
      </div>
    </header>
    <div className="reader-stage" ref={stageRef}>
      {!doc && !error && <div className="reader-status">
        <p>Carregando o PDF da BibliotecaDev…</p>
        <div className="progress-track"><span style={{ width: `${percent}%` }} /></div>
        <small>{loaded.total ? `${MB(loaded.bytes)} de ${MB(loaded.total)} MB` : 'Conectando ao GitHub…'}</small>
      </div>}
      {error && <div className="reader-status">
        <p>Não foi possível abrir o livro aqui.</p>
        <small>{error}</small>
        <a className="btn secondary small" href={bookUrl(book)} target="_blank" rel="noopener noreferrer">Abrir no GitHub <ExternalLink size={13} /></a>
      </div>}
      <canvas ref={canvasRef} className={`reader-canvas ${doc ? '' : 'hidden'} ${rendering ? 'busy' : ''}`} aria-label={`Página ${page} de ${pages}`} />
    </div>
  </div>;
}
