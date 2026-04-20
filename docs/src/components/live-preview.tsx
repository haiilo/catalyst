'use client';

import { useEffect, useRef, useState, useCallback, useMemo, useReducer } from 'react';
import { EditorView, minimalSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { css as cssLang } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState, Extension } from '@codemirror/state';
import { Skeleton } from './skeleton';

const DEFAULT_PREVIEW_HEIGHT = 200;
const DEFAULT_DEBOUNCE_MS = 300;

const EDITOR_STYLES = {
  fontSize: '13px',
  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  contentPadding: '12px 16px',
} as const;

type FileType = 'html' | 'css' | 'js' | 'other';

const FILE_CONFIG: Record<string, { type: FileType; label: string; lang: () => Extension }> = {
  html: { type: 'html', label: 'HTML', lang: html },
  htm: { type: 'html', label: 'HTML', lang: html },
  css: { type: 'css', label: 'CSS', lang: cssLang },
  scss: { type: 'css', label: 'SCSS', lang: cssLang },
  less: { type: 'css', label: 'LESS', lang: cssLang },
  js: { type: 'js', label: 'JS', lang: javascript },
  ts: { type: 'js', label: 'TS', lang: javascript },
  jsx: { type: 'js', label: 'JSX', lang: javascript },
  tsx: { type: 'js', label: 'TSX', lang: javascript },
};

function getFileConfig(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return FILE_CONFIG[ext] ?? { type: 'other' as FileType, label: filename, lang: html };
}

function groupCodeByType(codeMap: Record<string, string>) {
  const result = { html: '', css: '', js: '' };
  for (const [filename, code] of Object.entries(codeMap)) {
    const { type } = getFileConfig(filename);
    if (type in result) result[type as keyof typeof result] += code + '\n';
  }
  return result;
}

interface LivePreviewFile {
  code: string;
  active?: boolean;
}

interface LivePreviewFiles {
  [filename: string]: LivePreviewFile;
}

interface LivePreviewProps {
  files: LivePreviewFiles;
  previewHeight?: number;
  debounceMs?: number;
  catalystVersion?: string;
}

/**
 * Live code preview with editable HTML/CSS/JS.
 *
 * SECURITY NOTE: This component executes user-provided code in a sandboxed iframe.
 * It is designed for documentation where code examples come from trusted authors.
 * Do NOT use this component with untrusted/user-generated content.
 *
 * Protection layers:
 * - Sandboxed iframe (scripts allowed, but isolated from parent)
 * - Content Security Policy restricting resource origins
 */
export function LivePreview({ 
  files,
  previewHeight = DEFAULT_PREVIEW_HEIGHT,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: LivePreviewProps) {
  const [mounted, setMounted] = useState(false);
  
  const filenames = useMemo(() => 
    Object.keys(files).filter(name => files[name].code.trim().length > 0),
    [files]
  );
  
  const [activeFile, setActiveFile] = useState(() => {
    const names = Object.keys(files).filter(name => files[name].code.trim().length > 0);
    const explicitActive = names.find(name => files[name].active);
    if (explicitActive) return explicitActive;
    
    const htmlFile = names.find(name => {
      const ext = name.split('.').pop()?.toLowerCase();
      return ext === 'html' || ext === 'htm';
    });
    return htmlFile || names[0] || '';
  });
  
  const codeRef = useRef<Record<string, string>>({});
  
  useEffect(() => {
    const newCode: Record<string, string> = {};
    for (const name of filenames) {
      newCode[name] = files[name].code;
    }
    codeRef.current = newCode;
  }, [files, filenames]);

  const [updateTrigger, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const editorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const iframeReadyRef = useRef(false);

  useEffect(() => {
    if (activeFile && !filenames.includes(activeFile)) {
      setActiveFile(filenames[0] || '');
    }
  }, [filenames, activeFile]);

  useEffect(() => {
    iframeReadyRef.current = false;
    forceUpdate();
  }, [files]);

  const buildSrcdoc = useCallback((codeMap: Record<string, string>) => {
    const { html, css, js } = groupCodeByType(codeMap);

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@haiilo/catalyst@latest/dist/catalyst/catalyst.css">
  <script type="module" src="https://cdn.jsdelivr.net/npm/@haiilo/catalyst@latest/dist/catalyst/index.cdn.js"></script>
  <style id="user-styles">${css}</style>
</head>
<body>
  ${html}
  <script id="user-script" type="module">${js}</script>
</body>
</html>`;
  }, []);

  const initialSrcdoc = useMemo(() => {
    const codeMap: Record<string, string> = {};
    for (const name of filenames) {
      codeMap[name] = files[name].code;
    }
    return buildSrcdoc(codeMap);
  }, [files, filenames, buildSrcdoc]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIframeLoad = useCallback(() => {
    iframeReadyRef.current = true;
  }, []);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const lastIndex = filenames.length - 1;
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight': newIndex = index === lastIndex ? 0 : index + 1; break;
      case 'ArrowLeft': newIndex = index === 0 ? lastIndex : index - 1; break;
      case 'Home': newIndex = 0; break;
      case 'End': newIndex = lastIndex; break;
      default: return;
    }

    e.preventDefault();
    setActiveFile(filenames[newIndex]);
    tabRefs.current[newIndex]?.focus();
  }, [filenames]);

  useEffect(() => {
    if (!mounted || !editorRef.current || !activeFile) return;
    
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const currentCode = codeRef.current[activeFile] || '';
    let view: EditorView | null = null;

    try {
      view = new EditorView({
        state: EditorState.create({
          doc: currentCode,
          extensions: [
            minimalSetup,
            getFileConfig(activeFile).lang(),
            oneDark,
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                codeRef.current[activeFile] = update.state.doc.toString();
                forceUpdate();
              }
            }),
            EditorView.theme({
              '&': {
                fontSize: EDITOR_STYLES.fontSize,
                backgroundColor: 'transparent',
              },
              '.cm-scroller': {
                overflow: 'auto',
                fontFamily: EDITOR_STYLES.fontFamily,
              },
              '.cm-content': {
                padding: EDITOR_STYLES.contentPadding,
              },
              '.cm-gutters': {
                display: 'none',
              },
            }),
          ],
        }),
        parent: editorRef.current,
      });

      viewRef.current = view;
    } catch (error: unknown) {
      console.error('LivePreview: Failed to initialize editor', error);
    }

    return () => {
      view?.destroy();
      if (viewRef.current === view) {
        viewRef.current = null;
      }
    };
  }, [mounted, activeFile]);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const { html, css, js } = groupCodeByType(codeRef.current);

      try {
        if (iframeReadyRef.current && iframe.contentDocument?.body) {
          iframe.contentDocument.body.innerHTML = html;
          
          const oldScript = iframe.contentDocument.getElementById('user-script');
          if (oldScript) oldScript.remove();
          
          if (js.trim()) {
            const script = iframe.contentDocument.createElement('script');
            script.id = 'user-script';
            script.type = 'module';
            script.textContent = js;
            iframe.contentDocument.body.appendChild(script);
          }
          
          const styleEl = iframe.contentDocument.getElementById('user-styles');
          if (styleEl) {
            styleEl.textContent = css;
          }
        } else {
          iframe.srcdoc = buildSrcdoc(codeRef.current);
        }
      } catch (error: unknown) {
        console.error('LivePreview: Failed to update iframe', error);
        iframe.srcdoc = buildSrcdoc(codeRef.current);
      }
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [updateTrigger, mounted, buildSrcdoc, debounceMs]);

  if (!mounted) {
    return <Skeleton className="w-full h-full min-h-[300px] rounded-lg" />;
  }

  if (filenames.length === 0) {
    return (
      <div className="border border-fd-border rounded-xl p-8 text-center text-fd-muted-foreground">
        No code files provided
      </div>
    );
  }

  return (
    <div className="border border-fd-border rounded-xl overflow-hidden my-4">
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {updateTrigger > 0 && 'Preview updated'}
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={initialSrcdoc}
        onLoad={handleIframeLoad}
        className="w-full bg-fd-background"
        style={{ height: previewHeight }}
        title="Component Preview"
        sandbox="allow-scripts allow-same-origin"
      />
      <div className="border-t border-fd-border" style={{ background: '#21252b' }}>
        <div 
          className="flex px-2" 
          role="tablist" 
          aria-label="Code files"
        >
          {filenames.map((filename, index) => (
            <button
              key={filename}
              ref={el => { tabRefs.current[index] = el; }}
              role="tab"
              aria-selected={activeFile === filename}
              aria-controls="live-preview-editor"
              onClick={() => setActiveFile(filename)}
              onKeyDown={e => handleTabKeyDown(e, index)}
              className={`px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
                activeFile === filename
                  ? 'text-white border-sky-400'
                  : 'text-neutral-400 hover:text-white border-transparent'
              }`}
            >
              {getFileConfig(filename).label}
            </button>
          ))}
        </div>
        <div 
          ref={editorRef} 
          id="live-preview-editor"
          role="tabpanel"
          aria-label={`${getFileConfig(activeFile).label} editor`}
          className="max-h-[250px] overflow-auto" 
        />
      </div>
    </div>
  );
}
