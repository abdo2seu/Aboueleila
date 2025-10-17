import * as React from 'react';
import * as ReactDOM from 'react-dom';

const CALENDLY_URL = 'https://calendly.com/abouella-dev/30min?month=2025-10';

// Load Calendly (CSS + JS) once
function useCalendlyAssets() {
  React.useEffect(() => {
    const cssId = 'calendly-css';
    if (!document.getElementById(cssId)) {
      const l = document.createElement('link');
      l.id = cssId;
      l.rel = 'stylesheet';
      l.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(l);
    }
    const jsId = 'calendly-js';
    if (!document.getElementById(jsId)) {
      const s = document.createElement('script');
      s.id = jsId;
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);
}

export function MeetingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useCalendlyAssets();
  const targetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Initialize the inline widget once open and Calendly is ready
  React.useEffect(() => {
    if (!open || !targetRef.current) return;

    function initCalendly() {
      if (targetRef.current) targetRef.current.innerHTML = '';
      // @ts-ignore
      if (typeof window !== 'undefined' && window.Calendly?.initInlineWidget && targetRef.current) {
        // @ts-ignore
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: targetRef.current,
          prefill: {},
          utm: {},
        });
      }
    }

    // If Calendly script not ready yet, poll until available
    // @ts-ignore
    const ready = typeof window !== 'undefined' && !!window.Calendly?.initInlineWidget;
    if (ready) initCalendly();
    else {
      const interval = setInterval(() => {
        // @ts-ignore
        if (window.Calendly?.initInlineWidget) {
          clearInterval(interval);
          initCalendly();
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [open]);

  // Cleanup container on close
  React.useEffect(() => {
    if (!open && targetRef.current) targetRef.current.innerHTML = '';
  }, [open]);

  if (!open) return null;

  const modalUi = (
    <div className="fixed inset-0 z-[1000]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60"
        style={{ zIndex: 1000 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-[min(980px,92vw)] max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-[1002] rounded-full p-2 hover:bg-black/5 focus:outline-none"
          >
            ✕
          </button>

          {/* Calendly injection target */}
          <div ref={targetRef} style={{ minWidth: '320px', height: '720px' }} />

          <noscript>
            <div className="p-4 text-center">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="underline">
                Open Calendly
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );

  // Portal to body to avoid stacking/overflow issues from ancestors
  return ReactDOM.createPortal(modalUi, document.body);
}
