import React from 'react';
import { LiquidBubble, LIQUID_BLOB } from '../core/LiquidBubble.jsx';

/**
 * Aqus — FileDropzone
 * Drag-and-drop file upload area. Idle = dashed border, bone surface.
 * Drag-active = liquid blob morphs, accent border fills in, glow halos.
 * The liquid identity applied to a purely functional interaction.
 */
export function FileDropzone({
  accept,
  multiple = false,
  onFiles,
  label = 'Drop files here or click to browse',
  sublabel,
  disabled = false,
  style = {},
  ...rest
}) {
  const [drag, setDrag] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const dropped = [...(e.dataTransfer?.files || [])];
    if (dropped.length) { setFiles(dropped); onFiles?.(dropped); }
  };

  const handleChange = (e) => {
    const picked = [...(e.target.files || [])];
    if (picked.length) { setFiles(picked); onFiles?.(picked); }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={e => e.key === 'Enter' && !disabled && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); if (!disabled) setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 'var(--space-3)', textAlign: 'center',
        padding: 'var(--space-8) var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        border: `2px dashed ${drag ? 'var(--accent)' : 'var(--border)'}`,
        background: drag ? 'var(--accent-light)' : files.length ? 'var(--success-light)' : 'var(--surface)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        boxShadow: drag ? '0 0 0 4px var(--accent-glow)' : 'none',
        fontFamily: 'var(--font-ui)',
        ...style,
      }}
      {...rest}
    >
      {/* Liquid blob background on drag-active */}
      {drag && (
        <span aria-hidden="true" style={{
          position: 'absolute', width: '50%', aspectRatio: '1 / 1',
          background: 'var(--accent-glass)',
          borderRadius: LIQUID_BLOB,
          animation: 'agus-liquid var(--dur-liquid) var(--ease-inout) infinite',
          filter: 'blur(32px)', pointerEvents: 'none',
        }} />
      )}

      {/* Icon: liquid bubble filled when drag-active, outline at rest */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{
          width: 52, height: 52,
          borderRadius: LIQUID_BLOB,
          background: drag ? 'linear-gradient(140deg, var(--accent-mid), var(--accent))' : 'var(--surface-raised)',
          border: `2px solid ${drag ? 'transparent' : 'var(--border)'}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: drag ? 'var(--on-accent)' : 'var(--text-muted)',
          fontSize: 24,
          animation: drag ? `agus-liquid var(--dur-liquid) var(--ease-inout) infinite` : 'none',
          transition: 'background var(--dur-ui) var(--ease-out)',
          boxShadow: drag ? 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.4)' : 'none',
        }}>
          <i className={`ph ph-${files.length ? 'check-circle' : drag ? 'arrow-line-down' : 'upload-simple'}`} />
        </span>
        {files.length > 0 ? (
          <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--success)', fontWeight: 'var(--weight-semibold)' }}>
            {files.length} file{files.length > 1 ? 's' : ''} ready
          </span>
        ) : (
          <>
            <span style={{ fontSize: 'var(--text-body-sm)', color: drag ? 'var(--accent-text)' : 'var(--text)', fontWeight: drag ? 600 : 400 }}>{label}</span>
            {sublabel && <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{sublabel}</span>}
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
    </div>
  );
}
