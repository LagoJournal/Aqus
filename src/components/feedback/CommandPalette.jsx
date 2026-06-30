import React from 'react';
import { LiquidBubble } from '../core/LiquidBubble.jsx';
import { Portal } from '../../internal/floating.jsx';

/**
 * Aqus — CommandPalette
 * ⌘K command/search interface. Floating glass panel, liquid-bubble
 * active item indicator, keyboard navigation. Toggle with `open`.
 * Mount once at the app root; it renders a fixed overlay.
 */
export function CommandPalette({
  open = false,
  onClose,
  commands = [],
  placeholder = 'Search commands…',
  style = {},
  ...rest
}) {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) { setQuery(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const filtered = commands.filter(c =>
    !query || c.label.toLowerCase().includes(query.toLowerCase()) ||
    (c.group || '').toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => { setActive(0); }, [query]);

  const run = (cmd) => { cmd.onSelect?.(); onClose?.(); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') { if (filtered[active]) run(filtered[active]); }
    if (e.key === 'Escape') onClose?.();
  };

  if (!open) return null;

  const groups = filtered.reduce((acc, cmd) => {
    const g = cmd.group || '';
    if (!acc[g]) acc[g] = [];
    acc[g].push(cmd);
    return acc;
  }, {});

  let itemIndex = -1;

  return (
    <Portal>
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onKeyDown={onKey}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '14vh',
        background: 'rgba(0,0,0,0.32)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div style={{
        width: '100%', maxWidth: 560,
        background: 'var(--glass-surface)',
        WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
        backdropFilter: 'blur(var(--glass-blur)) saturate(1.6)',
        border: '1px solid var(--glass-border-light)',
        borderBottomColor: 'var(--glass-border-dark)',
        boxShadow: 'var(--shadow-glass)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        animation: 'agus-enter var(--dur-ui) var(--ease-spring) both',
        ...style,
      }} {...rest}>
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px',
          borderBottom: filtered.length ? '1px solid var(--border)' : 'none',
        }}>
          <i className="ph ph-magnifying-glass" style={{ fontSize: 18, color: 'var(--text-muted)', flex: 'none' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--text-body)',
              color: 'var(--text)',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, color: 'var(--text-muted)', display: 'flex' }}>
              <i className="ph ph-x-circle" style={{ fontSize: 16 }} />
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length > 0 && (
          <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 8px' }}>
            {Object.entries(groups).map(([group, items]) => (
              <div key={group}>
                {group && (
                  <div style={{ fontSize: 'var(--text-mini)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 10px 4px', fontFamily: 'var(--font-ui)' }}>
                    {group}
                  </div>
                )}
                {items.map((cmd) => {
                  itemIndex++;
                  const idx = itemIndex;
                  const isActive = active === idx;
                  return (
                    <button
                      key={cmd.id ?? cmd.label}
                      onClick={() => run(cmd)}
                      onMouseEnter={() => setActive(idx)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '9px 10px', borderRadius: 'var(--radius-sm)',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: isActive ? 'var(--accent-light)' : 'transparent',
                        fontFamily: 'var(--font-ui)', color: isActive ? 'var(--accent-text)' : 'var(--text)',
                        fontSize: 'var(--text-body-sm)', fontWeight: isActive ? 600 : 400,
                        transition: 'background var(--dur-micro) var(--ease-out)',
                      }}
                    >
                      {isActive && <LiquidBubble size={8} />}
                      {!isActive && <span style={{ width: 8, flex: 'none' }} />}
                      {cmd.icon && <span style={{ fontSize: 16, flex: 'none', opacity: isActive ? 1 : 0.6 }}>{cmd.icon}</span>}
                      <span style={{ flex: 1 }}>{cmd.label}</span>
                      {cmd.shortcut && (
                        <span style={{ fontSize: 'var(--text-mini)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', gap: 3 }}>
                          {cmd.shortcut.map((k, i) => (
                            <kbd key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderBottomWidth: 2, borderRadius: 'var(--radius-xs)', padding: '2px 5px' }}>{k}</kbd>
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {query && filtered.length === 0 && (
          <div style={{ padding: 'var(--space-7) var(--space-5)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-body-sm)', fontFamily: 'var(--font-ui)' }}>
            No results for "<strong>{query}</strong>"
          </div>
        )}
      </div>
    </div>
    </Portal>
  );
}
