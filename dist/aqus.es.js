import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React from "react";
import ReactDOM, { createPortal } from "react-dom";
function Button({
  variant = "primary",
  size = "md",
  pulse = false,
  icon = null,
  iconRight = null,
  disabled = false,
  type = "button",
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { padding: "7px 16px", font: "var(--text-label)", height: 32, gap: 6 },
    md: { padding: "10px 22px", font: "var(--text-body-sm)", height: 40, gap: 8 },
    lg: { padding: "14px 30px", font: "var(--text-body)", height: 50, gap: 10 }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--weight-semibold)",
    fontSize: s.font,
    letterSpacing: "var(--tracking-snug)",
    lineHeight: 1,
    padding: s.padding,
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    transition: "var(--transition-hover), background var(--dur-fast) var(--ease-out)",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent",
    animation: pulse && !disabled ? "agus-pulse 2s var(--ease-inout) infinite" : "none"
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--on-accent)",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.35)"
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--accent-text)",
      border: "var(--border-emphasis) solid var(--accent)",
      boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.5)"
    },
    ghost: {
      background: "transparent",
      color: "var(--accent-text)",
      boxShadow: "none"
    },
    destructive: {
      background: "var(--danger)",
      color: "var(--on-accent)",
      boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.30)"
    }
  };
  const glossy = variant === "primary" || variant === "destructive";
  const press = (e, scale) => {
    if (!disabled) e.currentTarget.style.transform = `scale(${scale})`;
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type,
      disabled,
      className: "agus-focusable",
      style: { ...base, ...variants[variant], ...style },
      onMouseDown: (e) => press(e, size === "lg" ? 0.97 : 0.96),
      onMouseUp: (e) => press(e, 1),
      onMouseLeave: (e) => {
        press(e, 1);
      },
      ...rest,
      children: [
        glossy && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: "var(--gloss-button)",
          pointerEvents: "none",
          zIndex: -1
        } }),
        icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", flex: "none" }, children: icon }),
        children,
        iconRight && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", flex: "none" }, children: iconRight })
      ]
    }
  );
}
const LIQUID_BLOB = "42% 58% 63% 37% / 41% 44% 56% 59%";
function LiquidBubble({
  size = 14,
  variant = "filled",
  color,
  thickness,
  animate = true,
  glossy = false,
  style = {},
  ...rest
}) {
  const ring = thickness || Math.max(2, Math.round(size / 7));
  const morph = animate ? `agus-liquid var(--dur-liquid) var(--ease-inout) infinite` : "none";
  const base = {
    display: "inline-block",
    width: size,
    height: size,
    flex: "none",
    borderRadius: LIQUID_BLOB,
    animation: morph
  };
  if (variant === "outline") {
    return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", ...rest, style: {
      ...base,
      background: "transparent",
      boxShadow: `inset 0 0 0 ${ring}px ${color || "var(--accent)"}`,
      ...style
    } });
  }
  if (variant === "spinner") {
    const ringMask = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";
    return /* @__PURE__ */ jsx("span", { role: "status", "aria-label": "Loading", ...rest, style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "none",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
      padding: ring,
      borderRadius: LIQUID_BLOB,
      WebkitMask: ringMask,
      WebkitMaskComposite: "xor",
      mask: ringMask,
      maskComposite: "exclude",
      animation: animate ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none",
      ...style
    }, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "160%",
      height: "160%",
      background: `conic-gradient(from 0deg, transparent 6%, ${color || "var(--accent)"} 92%)`,
      animation: "agus-spin-center 800ms linear infinite"
    } }) });
  }
  return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", ...rest, style: {
    ...base,
    background: color || "linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))",
    boxShadow: glossy ? "0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.9)" : "inset 0 1px 1px rgba(255,255,255,0.40)",
    ...style
  } });
}
function IconButton({
  variant = "ghost",
  size = "md",
  label,
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const [press, setPress] = React.useState(false);
  const sizes = { sm: 30, md: 38, lg: 48 };
  const dim = sizes[size] || sizes.md;
  const variants = {
    ghost: { bg: "transparent", hover: "var(--accent-light)", shadow: "none", border: "none" },
    soft: { bg: "var(--surface)", hover: "var(--accent-light)", shadow: "var(--shadow-xs)", border: "1px solid var(--border)" },
    filled: { bg: "var(--accent)", hover: "var(--accent-hover)", shadow: "var(--shadow-sm)", border: "none" }
  };
  const v = variants[variant] || variants.ghost;
  const [hover, setHover] = React.useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      disabled,
      className: "agus-focusable",
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => {
        setHover(false);
        setPress(false);
      },
      onMouseDown: () => setPress(true),
      onMouseUp: () => setPress(false),
      style: {
        width: dim,
        height: dim,
        borderRadius: LIQUID_BLOB,
        border: v.border,
        background: hover ? v.hover : v.bg,
        boxShadow: v.shadow,
        color: variant === "filled" ? "var(--on-accent)" : "var(--text-muted)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
        transform: press ? "scale(0.92)" : "scale(1)",
        padding: 0,
        ...style
      },
      ...rest,
      children
    }
  );
}
function GlassPanel({
  as: Tag2 = "div",
  radius = "lg",
  inset = false,
  style = {},
  children,
  ...rest
}) {
  const radii = {
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    pill: "var(--radius-pill)"
  };
  return /* @__PURE__ */ jsxs(
    Tag2,
    {
      style: {
        position: "relative",
        background: "var(--glass-surface)",
        WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        border: "var(--border-hairline) solid var(--glass-border-light)",
        borderBottomColor: "var(--glass-border-dark)",
        borderRightColor: "var(--glass-border-dark)",
        boxShadow: inset ? "var(--shadow-glass)" : "var(--shadow-glass)",
        borderRadius: radii[radius] || radii.lg,
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)"
        } }),
        /* @__PURE__ */ jsx("div", { style: { position: "relative" }, children })
      ]
    }
  );
}
function Card({
  variant = "resting",
  interactive = false,
  gloss = true,
  style = {},
  children,
  ...rest
}) {
  const variants = {
    resting: {
      background: "var(--surface)",
      boxShadow: "var(--shadow-xs)",
      border: "var(--border-hairline) solid var(--border)"
    },
    raised: {
      background: "var(--surface-raised)",
      boxShadow: "var(--shadow-sm)",
      border: "var(--border-hairline) solid var(--border)"
    },
    featured: {
      background: "var(--accent-glass)",
      boxShadow: "var(--shadow-md), 0 10px 30px var(--accent-glow)",
      border: "var(--border-hairline) solid var(--accent-mid)"
    }
  };
  const [hover, setHover] = React.useState(false);
  const lift = interactive && hover;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: "relative",
        borderRadius: "var(--radius-md)",
        padding: "var(--space-5)",
        transition: "var(--transition-hover)",
        transform: lift ? "translateY(-2px)" : void 0,
        cursor: interactive ? "pointer" : "default",
        overflow: "hidden",
        ...variants[variant],
        ...lift ? { boxShadow: "var(--shadow-md)" } : null,
        ...style
      },
      ...rest,
      children: [
        variant === "featured" && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          width: "54%",
          aspectRatio: "1 / 1",
          right: -42,
          top: -52,
          background: "var(--accent-glass)",
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          animation: "agus-liquid var(--dur-liquid) var(--ease-inout) infinite",
          pointerEvents: "none"
        } }),
        gloss && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: "35%",
          background: "var(--gloss-card)",
          pointerEvents: "none",
          borderRadius: "inherit"
        } }),
        /* @__PURE__ */ jsx("div", { style: { position: "relative" }, children })
      ]
    }
  );
}
function Badge({
  tone = "accent",
  pill = false,
  dot = false,
  bubble = true,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    accent: { bg: "var(--accent-light)", fg: "var(--accent-text)", dot: "var(--accent)" },
    neutral: { bg: "var(--surface)", fg: "var(--text-muted)", dot: "var(--text-muted)" },
    success: { bg: "var(--success-light)", fg: "var(--success)", dot: "var(--success)" },
    warning: { bg: "var(--warning-light)", fg: "var(--warning)", dot: "var(--warning)" },
    danger: { bg: "var(--danger-light)", fg: "var(--danger)", dot: "var(--danger)" }
  };
  const t = tones[tone] || tones.accent;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-ui)",
        fontWeight: "var(--weight-semibold)",
        fontSize: "var(--text-caption)",
        letterSpacing: "var(--tracking-wide)",
        lineHeight: 1,
        padding: "4px 10px",
        color: t.fg,
        background: t.bg,
        borderRadius: pill ? "var(--radius-pill)" : "var(--radius-xs)",
        border: tone === "neutral" ? "var(--border-hairline) solid var(--border)" : "none",
        whiteSpace: "nowrap",
        ...style
      },
      ...rest,
      children: [
        dot && (bubble ? /* @__PURE__ */ jsx(LiquidBubble, { size: 8, color: t.dot }) : /* @__PURE__ */ jsx("span", { style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: t.dot,
          flex: "none"
        } })),
        children
      ]
    }
  );
}
function Tag({
  onRemove,
  onClick,
  tone = "accent",
  size = "md",
  disabled = false,
  style = {},
  children,
  ...rest
}) {
  const tones = {
    accent: { bg: "var(--accent-light)", fg: "var(--accent-text)", dot: "var(--accent)" },
    neutral: { bg: "var(--surface)", fg: "var(--text-muted)", dot: "var(--text-muted)", border: "1px solid var(--border)" },
    success: { bg: "var(--success-light)", fg: "var(--success)", dot: "var(--success)" },
    warning: { bg: "var(--warning-light)", fg: "var(--warning)", dot: "var(--warning)" },
    danger: { bg: "var(--danger-light)", fg: "var(--danger)", dot: "var(--danger)" }
  };
  const t = tones[tone] || tones.accent;
  const sizes = { sm: { fontSize: 11, padding: "3px 9px", gap: 5 }, md: { fontSize: 13, padding: "5px 12px", gap: 6 } };
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: onClick ? "button" : void 0,
      tabIndex: onClick && !disabled ? 0 : void 0,
      onClick: !disabled ? onClick : void 0,
      onKeyDown: onClick && !disabled ? (e) => e.key === "Enter" && onClick(e) : void 0,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: s.gap,
        fontFamily: "var(--font-ui)",
        fontWeight: "var(--weight-semibold)",
        fontSize: s.fontSize,
        lineHeight: 1,
        padding: s.padding,
        borderRadius: "var(--radius-pill)",
        background: t.bg,
        color: t.fg,
        border: t.border || "none",
        cursor: onClick && !disabled ? "pointer" : "default",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        transition: "background var(--dur-fast) var(--ease-out)",
        ...style
      },
      ...rest,
      children: [
        children,
        onRemove && !disabled && /* @__PURE__ */ jsx(
          "button",
          {
            "aria-label": "Remove",
            onClick: (e) => {
              e.stopPropagation();
              onRemove(e);
            },
            onMouseEnter: () => setHover(true),
            onMouseLeave: () => setHover(false),
            style: { border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "inline-flex", lineHeight: 0 },
            children: /* @__PURE__ */ jsx(
              LiquidBubble,
              {
                size: size === "sm" ? 13 : 16,
                variant: hover ? "filled" : "outline",
                color: hover ? t.dot : t.dot,
                thickness: 1.5,
                animate: hover
              }
            )
          }
        )
      ]
    }
  );
}
function Input({
  label,
  hint,
  error,
  icon = null,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border)";
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)" }, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text)",
      letterSpacing: "var(--tracking-snug)"
    }, children: label }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--surface)",
      border: `${focus ? "var(--border-focus)" : "var(--border-hairline)"} solid ${borderColor}`,
      borderRadius: "var(--radius-sm)",
      padding: focus ? "7px 11px" : "8px 12px",
      boxShadow: focus ? `0 0 0 4px ${error ? "var(--danger-light)" : "var(--focus-ring)"}, var(--shadow-xs)` : "inset 0 1px 2px rgba(0,0,0,0.05)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
    }, children: [
      icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", color: "var(--text-muted)", flex: "none" }, children: icon }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: inputId,
          onFocus: () => setFocus(true),
          onBlur: () => setFocus(false),
          style: {
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: "var(--text-body-sm)",
            color: "var(--text)",
            ...style
          },
          ...rest
        }
      )
    ] }),
    (hint || error) && /* @__PURE__ */ jsx("span", { style: {
      fontSize: "var(--text-caption)",
      color: error ? "var(--danger)" : "var(--text-muted)"
    }, children: error || hint })
  ] });
}
function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  bubble = true,
  id,
  style = {},
  ...rest
}) {
  const dims = size === "sm" ? { w: 36, h: 20, knob: 14, pad: 3 } : { w: 46, h: 26, knob: 20, pad: 3 };
  const inputId = id || React.useId();
  const x = checked ? dims.w - dims.knob - dims.pad * 2 : 0;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      id: inputId,
      disabled,
      onClick: () => !disabled && onChange && onChange(!checked),
      className: "agus-focusable",
      style: {
        position: "relative",
        width: dims.w,
        height: dims.h,
        flex: "none",
        padding: dims.pad,
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: checked ? "var(--accent)" : "var(--border)",
        boxShadow: checked ? "inset 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.30)" : "inset 0 1px 3px rgba(0,0,0,0.18)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-ui) var(--ease-out)",
        ...style
      },
      ...rest,
      children: bubble ? /* @__PURE__ */ jsx(
        LiquidBubble,
        {
          size: dims.knob,
          color: "linear-gradient(to bottom, #fff, #ECECEC)",
          glossy: true,
          style: {
            position: "absolute",
            top: dims.pad,
            left: dims.pad,
            transform: `translateX(${x}px)`,
            transition: "transform var(--dur-ui) var(--ease-spring)"
          }
        }
      ) : /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
        position: "absolute",
        top: dims.pad,
        left: dims.pad,
        width: dims.knob,
        height: dims.knob,
        borderRadius: "50%",
        background: "linear-gradient(to bottom, #fff, #ECECEC)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.9)",
        transform: `translateX(${x}px)`,
        transition: "transform var(--dur-ui) var(--ease-spring)"
      } })
    }
  );
}
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style = {},
  ...rest
}) {
  const items = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
  const idx = Math.max(0, items.findIndex((o) => o.value === value));
  const pad = size === "sm" ? 3 : 4;
  const fontSize = size === "sm" ? "var(--text-label)" : "var(--text-body-sm)";
  const padY = size === "sm" ? "5px" : "7px";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "tablist",
      style: {
        position: "relative",
        display: "inline-grid",
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        gap: 0,
        padding: pad,
        background: "var(--surface)",
        border: "var(--border-hairline) solid var(--border)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
        fontFamily: "var(--font-ui)",
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          top: pad,
          bottom: pad,
          left: pad,
          width: `calc((100% - ${pad * 2}px) / ${items.length})`,
          transform: `translateX(${idx * 100}%)`,
          background: "var(--accent)",
          borderRadius: "var(--radius-pill)",
          boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.35)",
          transition: "transform var(--dur-ui) var(--ease-out)",
          zIndex: 0
        } }),
        items.map((o) => {
          const active = o.value === value;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": active,
              onClick: () => onChange && onChange(o.value),
              style: {
                position: "relative",
                zIndex: 1,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: `${padY} 16px`,
                fontFamily: "inherit",
                fontSize,
                fontWeight: "var(--weight-semibold)",
                letterSpacing: "var(--tracking-snug)",
                color: active ? "var(--on-accent)" : "var(--text-muted)",
                transition: "color var(--dur-fast) var(--ease-out)",
                whiteSpace: "nowrap"
              },
              children: o.label
            },
            o.value
          );
        })
      ]
    }
  );
}
function ToggleGroup({
  options = [],
  value,
  onChange,
  multiple = false,
  size = "md",
  style = {},
  ...rest
}) {
  const sizes = { sm: { h: 32, px: 10, fs: 13 }, md: { h: 38, px: 13, fs: 14 }, lg: { h: 46, px: 16, fs: 15 } };
  const s = sizes[size] || sizes.md;
  const isActive = (v) => multiple ? (value || []).includes(v) : value === v;
  const toggle = (v) => {
    if (multiple) {
      const set = value || [];
      onChange == null ? void 0 : onChange(set.includes(v) ? set.filter((x) => x !== v) : [...set, v]);
    } else {
      onChange == null ? void 0 : onChange(v);
    }
  };
  return /* @__PURE__ */ jsx("div", { role: "group", style: {
    display: "inline-flex",
    padding: 3,
    gap: 3,
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-pill)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: options.map((opt) => {
    const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
    const on = isActive(o.value);
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-pressed": on,
        onClick: () => toggle(o.value),
        className: "agus-focusable",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: s.h,
          padding: `0 ${s.px}px`,
          borderRadius: "var(--radius-pill)",
          border: "none",
          cursor: "pointer",
          background: on ? "var(--accent)" : "transparent",
          color: on ? "var(--on-accent)" : "var(--text-muted)",
          boxShadow: on ? "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.3)" : "none",
          fontFamily: "var(--font-ui)",
          fontWeight: "var(--weight-semibold)",
          fontSize: s.fs,
          transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)"
        },
        children: [
          o.icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", fontSize: s.fs + 3 }, children: o.icon }),
          o.label
        ]
      },
      o.value
    );
  }) });
}
function Spinner({ size = 20, thickness, animate = true, style = {}, ...rest }) {
  return /* @__PURE__ */ jsx(
    LiquidBubble,
    {
      variant: "spinner",
      size,
      thickness,
      animate,
      style,
      ...rest
    }
  );
}
function Kbd({ children, style = {}, ...rest }) {
  return /* @__PURE__ */ jsx("kbd", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 2,
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-mini)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1,
    padding: "3px 7px",
    borderRadius: "var(--radius-xs)",
    background: "linear-gradient(to bottom, var(--surface-raised), var(--surface))",
    border: "1px solid var(--border)",
    borderBottomWidth: 2,
    color: "var(--text-muted)",
    boxShadow: "0 1px 0 var(--border), inset 0 1px 0 rgba(255,255,255,0.7)",
    whiteSpace: "nowrap",
    ...style
  }, ...rest, children });
}
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const onState = checked || indeterminate;
  return /* @__PURE__ */ jsxs("label", { htmlFor: inputId, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-body-sm)",
    color: "var(--text)",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    ...style
  }, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "checkbox",
        id: inputId,
        "aria-checked": indeterminate ? "mixed" : checked,
        disabled,
        onClick: () => !disabled && onChange && onChange(!checked),
        className: "agus-focusable",
        style: {
          position: "relative",
          width: 20,
          height: 20,
          flex: "none",
          padding: 0,
          cursor: "inherit",
          borderRadius: "var(--radius-xs)",
          border: onState ? "none" : "var(--border-emphasis) solid var(--border)",
          background: onState ? "var(--accent)" : "var(--surface)",
          boxShadow: onState ? "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.35)" : "inset 0 1px 2px rgba(0,0,0,0.06)",
          transition: "background var(--dur-fast) var(--ease-out)"
        },
        ...rest,
        children: onState && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--on-accent)"
        }, children: indeterminate ? /* @__PURE__ */ jsx("span", { style: { width: 10, height: 2.5, borderRadius: 2, background: "currentColor" } }) : /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2.5 6.2l2.2 2.3L9.5 3.5",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }) })
      }
    ),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
function Radio({
  checked = false,
  onChange,
  disabled = false,
  label,
  name,
  value,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  return /* @__PURE__ */ jsxs("label", { htmlFor: inputId, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-body-sm)",
    color: "var(--text)",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    ...style
  }, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "radio",
        id: inputId,
        name,
        "aria-checked": checked,
        disabled,
        onClick: () => !disabled && onChange && onChange(value !== void 0 ? value : true),
        className: "agus-focusable",
        style: {
          position: "relative",
          width: 20,
          height: 20,
          flex: "none",
          padding: 0,
          cursor: "inherit",
          borderRadius: "50%",
          border: "var(--border-emphasis) solid " + (checked ? "var(--accent)" : "var(--border)"),
          background: "var(--surface)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color var(--dur-fast) var(--ease-out)"
        },
        ...rest,
        children: checked && /* @__PURE__ */ jsx(LiquidBubble, { size: 11 })
      }
    ),
    label && /* @__PURE__ */ jsx("span", { children: label })
  ] });
}
const Z_FLOATING = 600;
function Portal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
function useAnchoredFloating(open, onDismiss) {
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const [rect, setRect] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }
    const update = () => {
      const el = anchorRef.current;
      if (el) setRect(el.getBoundingClientRect());
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (anchorRef.current && anchorRef.current.contains(e.target)) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      onDismiss && onDismiss();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onDismiss]);
  return { anchorRef, panelRef, rect };
}
function placeAround(rect, placement = "bottom", offset = 6, align = "start") {
  if (!rect) return { position: "fixed", visibility: "hidden", top: -9999, left: -9999 };
  const base = { position: "fixed", zIndex: Z_FLOATING };
  switch (placement) {
    case "top":
      return { ...base, bottom: window.innerHeight - rect.top + offset, ...crossX(rect, align) };
    case "left":
      return { ...base, right: window.innerWidth - rect.left + offset, top: rect.top + rect.height / 2, translate: "0 -50%" };
    case "right":
      return { ...base, left: rect.right + offset, top: rect.top + rect.height / 2, translate: "0 -50%" };
    case "bottom":
    default:
      return { ...base, top: rect.bottom + offset, ...crossX(rect, align) };
  }
}
function crossX(rect, align) {
  if (align === "center") return { left: rect.left + rect.width / 2, translate: "-50% 0" };
  if (align === "end") return { left: rect.right, translate: "-100% 0" };
  return { left: rect.left };
}
function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  label,
  disabled = false,
  id,
  style = {}
}) {
  const items = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
  const [open, setOpen] = React.useState(false);
  const inputId = id || React.useId();
  const current = items.find((o) => o.value === value);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", fontFamily: "var(--font-ui)", display: "flex", flexDirection: "column", gap: 6, ...style }, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        ref: anchorRef,
        type: "button",
        id: inputId,
        disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        onClick: () => !disabled && setOpen((o) => !o),
        className: "agus-focusable",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "9px 12px",
          borderRadius: "var(--radius-sm)",
          border: "var(--border-hairline) solid " + (open ? "var(--accent)" : "var(--border)"),
          background: "var(--surface)",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: open ? "0 0 0 4px var(--focus-ring)" : "inset 0 1px 2px rgba(0,0,0,0.05)",
          fontSize: "var(--text-body-sm)",
          color: current ? "var(--text)" : "var(--text-muted)",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
          minWidth: 160
        },
        children: [
          current ? current.label : placeholder,
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
            width: 8,
            height: 8,
            borderRight: "2px solid var(--text-muted)",
            borderBottom: "2px solid var(--text-muted)",
            transform: open ? "rotate(-135deg)" : "rotate(45deg)",
            transition: "transform var(--dur-fast)",
            marginTop: open ? 4 : -2
          } })
        ]
      }
    ),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("div", { ref: panelRef, role: "listbox", style: {
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: Z_FLOATING,
      padding: 6,
      borderRadius: "var(--radius-md)",
      boxSizing: "border-box",
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)",
      WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      backdropFilter: "blur(18px) saturate(1.6)",
      border: "1px solid var(--glass-border-light)",
      boxShadow: "var(--shadow-md)",
      animation: "agus-enter var(--dur-ui) var(--ease-spring)"
    }, children: items.map((o) => {
      const sel = o.value === value;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": sel,
          onClick: () => {
            onChange && onChange(o.value);
            setOpen(false);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            textAlign: "left",
            padding: "8px 10px",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: sel ? "var(--accent-light)" : "transparent",
            color: sel ? "var(--accent-text)" : "var(--text)",
            fontFamily: "inherit",
            fontSize: "var(--text-body-sm)",
            fontWeight: sel ? 600 : 400
          },
          onMouseEnter: (e) => {
            if (!sel) e.currentTarget.style.background = "var(--surface-raised)";
          },
          onMouseLeave: (e) => {
            if (!sel) e.currentTarget.style.background = "transparent";
          },
          children: [
            /* @__PURE__ */ jsx("span", { style: { width: 10, display: "inline-flex" }, children: sel && /* @__PURE__ */ jsx(LiquidBubble, { size: 9 }) }),
            o.label
          ]
        },
        o.value
      );
    }) }) })
  ] });
}
function Combobox({
  value,
  onChange,
  options = [],
  label,
  placeholder = "Search…",
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  const norm = (o) => typeof o === "string" ? { value: o, label: o } : o;
  const opts = options.map(norm);
  const selected = opts.find((o) => o.value === value);
  const filtered = opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  const choose = (o) => {
    onChange == null ? void 0 : onChange(o.value);
    setOpen(false);
    setQuery("");
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === "Enter" && open && filtered[active]) {
      e.preventDefault();
      choose(filtered[active]);
    }
    if (e.key === "Escape") setOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", position: "relative", minWidth: 220, ...style }, ...rest, children: [
    label && /* @__PURE__ */ jsx("label", { style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: anchorRef,
        onClick: () => setOpen(true),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 40,
          padding: "0 12px",
          borderRadius: "var(--radius-sm)",
          border: `${open ? "var(--border-focus)" : "var(--border-hairline)"} solid ${open ? "var(--accent)" : "var(--border)"}`,
          background: "var(--surface)",
          boxShadow: open ? "0 0 0 4px var(--focus-ring)" : "inset 0 1px 2px rgba(0,0,0,0.04)",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          cursor: "text"
        },
        children: [
          /* @__PURE__ */ jsx("i", { className: "ph ph-magnifying-glass", style: { fontSize: 16, color: "var(--text-muted)", flex: "none" } }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: open ? query : (selected == null ? void 0 : selected.label) || "",
              placeholder: selected ? selected.label : placeholder,
              onChange: (e) => {
                setQuery(e.target.value);
                setOpen(true);
                setActive(0);
              },
              onFocus: () => setOpen(true),
              onKeyDown: onKey,
              style: { flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: "var(--text-body-sm)", color: "var(--text)", minWidth: 0 }
            }
          ),
          /* @__PURE__ */ jsx("i", { className: "ph ph-caret-down", style: { fontSize: 14, color: "var(--text-muted)", flex: "none", transition: "transform var(--dur-fast)", transform: open ? "rotate(180deg)" : "none" } })
        ]
      }
    ),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsxs("div", { ref: panelRef, style: {
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: Z_FLOATING,
      boxSizing: "border-box",
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)",
      WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      border: "1px solid var(--glass-border-light)",
      borderBottomColor: "var(--glass-border-dark)",
      boxShadow: "var(--shadow-glass)",
      borderRadius: "var(--radius-md)",
      padding: 6,
      maxHeight: 240,
      overflowY: "auto",
      animation: "agus-enter var(--dur-fast) var(--ease-spring) both"
    }, children: [
      filtered.length === 0 && /* @__PURE__ */ jsx("div", { style: { padding: "10px 12px", fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }, children: "No matches" }),
      filtered.map((o, i) => {
        const isSel = o.value === value;
        const isActive = i === active;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => choose(o),
            onMouseEnter: () => setActive(i),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              background: isActive ? "var(--accent-light)" : "transparent",
              color: isSel || isActive ? "var(--accent-text)" : "var(--text)",
              fontFamily: "var(--font-ui)",
              fontSize: "var(--text-body-sm)",
              fontWeight: isSel ? 600 : 400
            },
            children: [
              isSel ? /* @__PURE__ */ jsx(LiquidBubble, { size: 8 }) : /* @__PURE__ */ jsx("span", { style: { width: 8, flex: "none" } }),
              /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: o.label })
            ]
          },
          o.value
        );
      })
    ] }) })
  ] });
}
function MultiSelect({
  value = [],
  onChange,
  options = [],
  label,
  placeholder = "Select…",
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  const norm = (o) => typeof o === "string" ? { value: o, label: o } : o;
  const opts = options.map(norm);
  const toggle = (v) => onChange == null ? void 0 : onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", position: "relative", minWidth: 240, ...style }, ...rest, children: [
    label && /* @__PURE__ */ jsx("label", { style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: anchorRef,
        onClick: () => setOpen((o) => !o),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          minHeight: 40,
          padding: "5px 10px",
          borderRadius: "var(--radius-sm)",
          border: `${open ? "var(--border-focus)" : "var(--border-hairline)"} solid ${open ? "var(--accent)" : "var(--border)"}`,
          background: "var(--surface)",
          boxShadow: open ? "0 0 0 4px var(--focus-ring)" : "inset 0 1px 2px rgba(0,0,0,0.04)",
          cursor: "pointer",
          transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
        },
        children: [
          value.length === 0 && /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }, children: placeholder }),
          value.map((v) => {
            const o = opts.find((x) => x.value === v);
            return /* @__PURE__ */ jsxs("span", { onClick: (e) => {
              e.stopPropagation();
              toggle(v);
            }, style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 8px",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent-light)",
              color: "var(--accent-text)",
              fontSize: "var(--text-caption)",
              fontWeight: 600
            }, children: [
              (o == null ? void 0 : o.label) || v,
              /* @__PURE__ */ jsx("i", { className: "ph ph-x", style: { fontSize: 11 } })
            ] }, v);
          }),
          /* @__PURE__ */ jsx("i", { className: "ph ph-caret-down", style: { fontSize: 14, color: "var(--text-muted)", marginLeft: "auto", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-fast)" } })
        ]
      }
    ),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("div", { ref: panelRef, style: {
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: Z_FLOATING,
      boxSizing: "border-box",
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)",
      WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      border: "1px solid var(--glass-border-light)",
      borderBottomColor: "var(--glass-border-dark)",
      boxShadow: "var(--shadow-glass)",
      borderRadius: "var(--radius-md)",
      padding: 6,
      maxHeight: 240,
      overflowY: "auto",
      animation: "agus-enter var(--dur-fast) var(--ease-spring) both"
    }, children: opts.map((o) => {
      const sel = value.includes(o.value);
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => toggle(o.value),
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            padding: "8px 10px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            background: sel ? "var(--accent-light)" : "transparent",
            color: sel ? "var(--accent-text)" : "var(--text)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-sm)",
            fontWeight: sel ? 600 : 400
          },
          onMouseEnter: (e) => {
            if (!sel) e.currentTarget.style.background = "var(--accent-light)";
          },
          onMouseLeave: (e) => {
            if (!sel) e.currentTarget.style.background = "transparent";
          },
          children: [
            sel ? /* @__PURE__ */ jsx(LiquidBubble, { size: 8 }) : /* @__PURE__ */ jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", boxShadow: "inset 0 0 0 1.5px var(--border)", flex: "none" } }),
            /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: o.label })
          ]
        },
        o.value
      );
    }) }) })
  ] });
}
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border)";
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)" }, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text)"
    }, children: label }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id: inputId,
        rows,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        style: {
          resize: "vertical",
          minHeight: 72,
          background: "var(--surface)",
          border: `${focus ? "var(--border-focus)" : "var(--border-hairline)"} solid ${borderColor}`,
          borderRadius: "var(--radius-sm)",
          padding: focus ? "9px 11px" : "10px 12px",
          boxShadow: focus ? `0 0 0 4px ${error ? "var(--danger-light)" : "var(--focus-ring)"}, var(--shadow-xs)` : "inset 0 1px 2px rgba(0,0,0,0.05)",
          fontFamily: "inherit",
          fontSize: "var(--text-body-sm)",
          color: "var(--text)",
          lineHeight: 1.5,
          outline: "none",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
          ...style
        },
        ...rest
      }
    ),
    (hint || error) && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-caption)", color: error ? "var(--danger)" : "var(--text-muted)" }, children: error || hint })
  ] });
}
function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  label,
  showValue = false,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const pct = (value - min) / (max - min) * 100;
  const setFromClientX = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = (clientX - r.left) / r.width;
    p = Math.min(1, Math.max(0, p));
    let v = min + p * (max - min);
    v = Math.round(v / step) * step;
    onChange && onChange(Math.min(max, Math.max(min, v)));
  };
  const onDown = (e) => {
    if (disabled) return;
    setFromClientX(e.clientX);
    const move = (ev) => setFromClientX(ev.clientX);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-ui)", opacity: disabled ? 0.5 : 1, ...style }, children: [
    (label || showValue) && /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "var(--text-label)", color: "var(--text)" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontWeight: "var(--weight-medium)" }, children: label }),
      showValue && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-mono)", color: "var(--text-muted)" }, children: value })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        role: "slider",
        "aria-valuenow": value,
        "aria-valuemin": min,
        "aria-valuemax": max,
        onMouseDown: onDown,
        style: { position: "relative", height: 22, display: "flex", alignItems: "center", cursor: disabled ? "not-allowed" : "pointer" },
        ...rest,
        children: [
          /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, right: 0, height: 6, borderRadius: "var(--radius-pill)", background: "var(--border)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12)" } }),
          /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, width: `${pct}%`, height: 6, borderRadius: "var(--radius-pill)", background: "var(--accent)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)" } }),
          /* @__PURE__ */ jsx(
            LiquidBubble,
            {
              size: 20,
              color: "linear-gradient(to bottom, #fff, #ECECEC)",
              glossy: true,
              animate: false,
              style: { position: "absolute", left: `calc(${pct}% - 10px)`, boxShadow: "0 2px 5px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.9)" }
            }
          )
        ]
      }
    )
  ] });
}
function NumberInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  hint,
  error,
  disabled = false,
  unit,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border)";
  const clamp = (v) => Math.min(max, Math.max(min, v));
  const StepBtn = ({ dir }) => {
    const [hover, setHover] = React.useState(false);
    const isDisabled = disabled || (dir === "dec" ? value <= min : value >= max);
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": dir === "inc" ? "Increase" : "Decrease",
        disabled: isDisabled,
        onClick: () => onChange && onChange(clamp(value + (dir === "inc" ? step : -step))),
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        style: {
          width: 28,
          height: 28,
          flex: "none",
          border: "none",
          padding: 0,
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          background: hover && !isDisabled ? "var(--accent-light)" : "transparent",
          cursor: isDisabled ? "not-allowed" : "pointer",
          color: isDisabled ? "var(--border)" : "var(--accent)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--dur-fast) var(--ease-out)",
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1
        },
        children: dir === "inc" ? "+" : "−"
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", ...style }, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "var(--surface)",
      border: `${focus ? "var(--border-focus)" : "var(--border-hairline)"} solid ${borderColor}`,
      borderRadius: "var(--radius-sm)",
      padding: "4px 8px",
      boxShadow: focus ? `0 0 0 4px var(--focus-ring), var(--shadow-xs)` : "inset 0 1px 2px rgba(0,0,0,0.05)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
      opacity: disabled ? 0.55 : 1
    }, children: [
      /* @__PURE__ */ jsx(StepBtn, { dir: "dec" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: inputId,
          type: "number",
          value,
          min,
          max,
          step,
          disabled,
          onChange: (e) => onChange && onChange(clamp(parseFloat(e.target.value) || 0)),
          onFocus: () => setFocus(true),
          onBlur: () => setFocus(false),
          style: {
            flex: 1,
            textAlign: "center",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "inherit",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--weight-semibold)",
            color: "var(--text)",
            minWidth: 0,
            MozAppearance: "textfield"
          },
          ...rest
        }
      ),
      unit && /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--text-muted)", flex: "none" }, children: unit }),
      /* @__PURE__ */ jsx(StepBtn, { dir: "inc" })
    ] }),
    (hint || error) && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-caption)", color: error ? "var(--danger)" : "var(--text-muted)" }, children: error || hint })
  ] });
}
function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select a date",
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => value ? new Date(value) : /* @__PURE__ */ new Date());
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const sel = value ? new Date(value) : null;
  const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
  const year = view.getFullYear(), month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = view.toLocaleString("default", { month: "long", year: "numeric" });
  const fmt = (d) => d.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" });
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const navIcon = (dir) => /* @__PURE__ */ jsx(
    "button",
    {
      "aria-label": dir < 0 ? "Previous month" : "Next month",
      onClick: () => setView(new Date(year, month + dir, 1)),
      style: { width: 28, height: 28, border: "none", background: "transparent", cursor: "pointer", borderRadius: LIQUID_BLOB, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center" },
      onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent-light)",
      onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
      children: /* @__PURE__ */ jsx("i", { className: `ph ph-caret-${dir < 0 ? "left" : "right"}`, style: { fontSize: 15 } })
    }
  );
  return /* @__PURE__ */ jsxs("div", { style: { display: "inline-flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", position: "relative", ...style }, ...rest, children: [
    label && /* @__PURE__ */ jsx("label", { style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsxs("button", { ref: anchorRef, onClick: () => setOpen((o) => !o), style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 200,
      padding: "0 12px",
      height: 40,
      borderRadius: "var(--radius-sm)",
      border: `${open ? "var(--border-focus)" : "var(--border-hairline)"} solid ${open ? "var(--accent)" : "var(--border)"}`,
      background: "var(--surface)",
      cursor: "pointer",
      boxShadow: open ? "0 0 0 4px var(--focus-ring)" : "inset 0 1px 2px rgba(0,0,0,0.04)",
      fontFamily: "var(--font-ui)",
      fontSize: "var(--text-body-sm)",
      color: sel ? "var(--text)" : "var(--text-muted)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
    }, children: [
      /* @__PURE__ */ jsx("i", { className: "ph ph-calendar-blank", style: { fontSize: 16, color: "var(--text-muted)" } }),
      /* @__PURE__ */ jsx("span", { style: { flex: 1, textAlign: "left" }, children: sel ? fmt(sel) : placeholder })
    ] }),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsxs("div", { ref: panelRef, style: {
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
      zIndex: Z_FLOATING,
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)",
      WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
      border: "1px solid var(--glass-border-light)",
      borderBottomColor: "var(--glass-border-dark)",
      boxShadow: "var(--shadow-glass)",
      borderRadius: "var(--radius-md)",
      padding: 14,
      width: 280,
      animation: "agus-enter var(--dur-ui) var(--ease-spring) both"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
        navIcon(-1),
        /* @__PURE__ */ jsx("span", { style: { fontWeight: "var(--weight-semibold)", fontSize: "var(--text-body-sm)", color: "var(--text)" }, children: monthName }),
        navIcon(1)
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }, children: [
        ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /* @__PURE__ */ jsx("div", { style: { textAlign: "center", fontSize: "var(--text-mini)", fontWeight: 600, color: "var(--text-muted)", padding: "4px 0" }, children: d }, i)),
        cells.map((date, i) => {
          if (!date) return /* @__PURE__ */ jsx("div", {}, `e${i}`);
          const isSel = sameDay(date, sel);
          const isToday = sameDay(date, today);
          return /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                onChange == null ? void 0 : onChange(date);
                setOpen(false);
              },
              style: {
                position: "relative",
                aspectRatio: "1 / 1",
                border: "none",
                cursor: "pointer",
                borderRadius: LIQUID_BLOB,
                background: isSel ? "linear-gradient(140deg, var(--accent-mid), var(--accent))" : "transparent",
                color: isSel ? "var(--on-accent)" : "var(--text)",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-body-sm)",
                fontWeight: isSel || isToday ? 600 : 400,
                boxShadow: !isSel && isToday ? "inset 0 0 0 1.5px var(--accent)" : "none",
                transition: "background var(--dur-micro) var(--ease-out)"
              },
              onMouseEnter: (e) => {
                if (!isSel) e.currentTarget.style.background = "var(--accent-light)";
              },
              onMouseLeave: (e) => {
                if (!isSel) e.currentTarget.style.background = "transparent";
              },
              children: date.getDate()
            },
            i
          );
        })
      ] })
    ] }) })
  ] });
}
function ColorPicker({
  value,
  onChange,
  options = [],
  label,
  size = 32,
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-ui)", ...style }, ...rest, children: [
    label && /* @__PURE__ */ jsx("label", { style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-medium)", color: "var(--text)" }, children: label }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: options.map((opt) => {
      const color = typeof opt === "string" ? opt : opt.color;
      const name = typeof opt === "string" ? opt : opt.name;
      const active = value === color;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": name || color,
          "aria-pressed": active,
          onClick: () => onChange == null ? void 0 : onChange(color),
          style: {
            width: size,
            height: size,
            flex: "none",
            borderRadius: LIQUID_BLOB,
            background: color,
            border: "none",
            cursor: "pointer",
            padding: 0,
            boxShadow: active ? `0 0 0 2px var(--bg), 0 0 0 4px ${color}, 0 4px 12px ${color}` : "inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.15)",
            transition: "box-shadow var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
            transform: active ? "scale(1.08)" : "scale(1)",
            animation: active ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none"
          }
        },
        color
      );
    }) })
  ] });
}
function OTPInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  style = {},
  ...rest
}) {
  const refs = React.useRef([]);
  const chars = value.padEnd(length).slice(0, length).split("");
  const set = (next) => {
    onChange == null ? void 0 : onChange(next);
    if (next.replace(/\s/g, "").length === length) onComplete == null ? void 0 : onComplete(next.trim());
  };
  const handle = (i, char) => {
    var _a;
    const digit = char.replace(/\D/g, "").slice(-1);
    const arr = value.padEnd(length).split("");
    arr[i] = digit || " ";
    set(arr.join("").replace(/\s+$/, ""));
    if (digit && i < length - 1) (_a = refs.current[i + 1]) == null ? void 0 : _a.focus();
  };
  const onKeyDown = (i, e) => {
    var _a, _b, _c;
    if (e.key === "Backspace" && !chars[i].trim() && i > 0) (_a = refs.current[i - 1]) == null ? void 0 : _a.focus();
    if (e.key === "ArrowLeft" && i > 0) (_b = refs.current[i - 1]) == null ? void 0 : _b.focus();
    if (e.key === "ArrowRight" && i < length - 1) (_c = refs.current[i + 1]) == null ? void 0 : _c.focus();
  };
  const onPaste = (e) => {
    var _a;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    set(pasted);
    (_a = refs.current[Math.min(pasted.length, length - 1)]) == null ? void 0 : _a.focus();
  };
  return /* @__PURE__ */ jsx("div", { style: { display: "inline-flex", gap: 10, ...style }, ...rest, children: Array.from({ length }).map((_, i) => {
    var _a;
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref: (el) => refs.current[i] = el,
        value: ((_a = chars[i]) == null ? void 0 : _a.trim()) || "",
        inputMode: "numeric",
        maxLength: 1,
        onChange: (e) => handle(i, e.target.value),
        onKeyDown: (e) => onKeyDown(i, e),
        onPaste,
        "aria-label": `Digit ${i + 1}`,
        style: {
          width: 46,
          height: 56,
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--text-h2)",
          color: "var(--text)",
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          border: "1.5px solid var(--border)",
          background: "var(--surface)",
          outline: "none",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
        },
        onFocus: (e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 0 4px var(--focus-ring)";
        },
        onBlur: (e) => {
          e.target.style.borderColor = "var(--border)";
          e.target.style.boxShadow = "none";
        }
      },
      i
    );
  }) });
}
function SearchInput({
  value = "",
  onChange,
  placeholder = "Search…",
  count,
  shortcut,
  size = "md",
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 34, md: 40, lg: 48 };
  const h = heights[size] || heights.md;
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    height: h,
    padding: "0 10px 0 12px",
    borderRadius: "var(--radius-pill)",
    border: `${focus ? "var(--border-focus)" : "var(--border-hairline)"} solid ${focus ? "var(--accent)" : "var(--border)"}`,
    background: "var(--surface)",
    boxShadow: focus ? "0 0 0 4px var(--focus-ring)" : "inset 0 1px 2px rgba(0,0,0,0.04)",
    transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    fontFamily: "var(--font-ui)",
    ...style
  }, children: [
    /* @__PURE__ */ jsx("i", { className: "ph ph-magnifying-glass", style: { fontSize: 16, color: "var(--text-muted)", flex: "none" } }),
    /* @__PURE__ */ jsx(
      "input",
      {
        value,
        placeholder,
        onChange: (e) => onChange == null ? void 0 : onChange(e.target.value),
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        style: { flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: "var(--text-body-sm)", color: "var(--text)", minWidth: 0 },
        ...rest
      }
    ),
    value && count != null && /* @__PURE__ */ jsxs("span", { style: { fontSize: "var(--text-mini)", color: "var(--text-muted)", whiteSpace: "nowrap", flex: "none" }, children: [
      count,
      " result",
      count === 1 ? "" : "s"
    ] }),
    value ? /* @__PURE__ */ jsx("button", { "aria-label": "Clear", onClick: () => onChange == null ? void 0 : onChange(""), style: { border: "none", background: "transparent", cursor: "pointer", color: "var(--text-muted)", display: "inline-flex", padding: 4, flex: "none" }, children: /* @__PURE__ */ jsx("i", { className: "ph ph-x-circle", style: { fontSize: 16 } }) }) : shortcut ? /* @__PURE__ */ jsx("kbd", { style: { fontFamily: "var(--font-mono)", fontSize: "var(--text-mini)", color: "var(--text-muted)", background: "var(--surface-raised)", border: "1px solid var(--border)", borderBottomWidth: 2, borderRadius: "var(--radius-xs)", padding: "2px 6px", flex: "none" }, children: shortcut }) : null
  ] });
}
function FileDropzone({
  accept,
  multiple = false,
  onFiles,
  label = "Drop files here or click to browse",
  sublabel,
  disabled = false,
  style = {},
  ...rest
}) {
  const [drag, setDrag] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const handleDrop = (e) => {
    var _a;
    e.preventDefault();
    setDrag(false);
    const dropped = [...((_a = e.dataTransfer) == null ? void 0 : _a.files) || []];
    if (dropped.length) {
      setFiles(dropped);
      onFiles == null ? void 0 : onFiles(dropped);
    }
  };
  const handleChange = (e) => {
    const picked = [...e.target.files || []];
    if (picked.length) {
      setFiles(picked);
      onFiles == null ? void 0 : onFiles(picked);
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-label": label,
      onClick: () => {
        var _a;
        return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.click());
      },
      onKeyDown: (e) => {
        var _a;
        return e.key === "Enter" && !disabled && ((_a = inputRef.current) == null ? void 0 : _a.click());
      },
      onDragOver: (e) => {
        e.preventDefault();
        if (!disabled) setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: handleDrop,
      style: {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        textAlign: "center",
        padding: "var(--space-8) var(--space-6)",
        borderRadius: "var(--radius-lg)",
        border: `2px dashed ${drag ? "var(--accent)" : "var(--border)"}`,
        background: drag ? "var(--accent-light)" : files.length ? "var(--success-light)" : "var(--surface)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
        boxShadow: drag ? "0 0 0 4px var(--accent-glow)" : "none",
        fontFamily: "var(--font-ui)",
        ...style
      },
      ...rest,
      children: [
        drag && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          width: "50%",
          aspectRatio: "1 / 1",
          background: "var(--accent-glass)",
          borderRadius: LIQUID_BLOB,
          animation: "agus-liquid var(--dur-liquid) var(--ease-inout) infinite",
          filter: "blur(32px)",
          pointerEvents: "none"
        } }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-3)" }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            width: 52,
            height: 52,
            borderRadius: LIQUID_BLOB,
            background: drag ? "linear-gradient(140deg, var(--accent-mid), var(--accent))" : "var(--surface-raised)",
            border: `2px solid ${drag ? "transparent" : "var(--border)"}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: drag ? "var(--on-accent)" : "var(--text-muted)",
            fontSize: 24,
            animation: drag ? `agus-liquid var(--dur-liquid) var(--ease-inout) infinite` : "none",
            transition: "background var(--dur-ui) var(--ease-out)",
            boxShadow: drag ? "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.4)" : "none"
          }, children: /* @__PURE__ */ jsx("i", { className: `ph ph-${files.length ? "check-circle" : drag ? "arrow-line-down" : "upload-simple"}` }) }),
          files.length > 0 ? /* @__PURE__ */ jsxs("span", { style: { fontSize: "var(--text-body-sm)", color: "var(--success)", fontWeight: "var(--weight-semibold)" }, children: [
            files.length,
            " file",
            files.length > 1 ? "s" : "",
            " ready"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-body-sm)", color: drag ? "var(--accent-text)" : "var(--text)", fontWeight: drag ? 600 : 400 }, children: label }),
            sublabel && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)" }, children: sublabel })
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { ref: inputRef, type: "file", accept, multiple, onChange: handleChange, style: { display: "none" } })
      ]
    }
  );
}
function Alert({
  tone = "accent",
  title,
  onClose,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    accent: { bg: "var(--accent-light)", fg: "var(--accent-text)", dot: "var(--accent)" },
    success: { bg: "var(--success-light)", fg: "var(--success)", dot: "var(--success)" },
    warning: { bg: "var(--warning-light)", fg: "var(--warning)", dot: "var(--warning)" },
    danger: { bg: "var(--danger-light)", fg: "var(--danger)", dot: "var(--danger)" }
  };
  const t = tones[tone] || tones.accent;
  return /* @__PURE__ */ jsxs("div", { role: "alert", style: {
    display: "flex",
    gap: 11,
    alignItems: "flex-start",
    padding: "13px 15px",
    borderRadius: "var(--radius-md)",
    background: t.bg,
    border: "var(--border-hairline) solid color-mix(in oklch, " + t.dot + " 22%, transparent)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { style: { marginTop: 3, flex: "none" }, children: /* @__PURE__ */ jsx(LiquidBubble, { size: 11, color: t.dot }) }),
    /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
      title && /* @__PURE__ */ jsx("div", { style: { fontWeight: "var(--weight-semibold)", fontSize: "var(--text-body-sm)", color: "var(--text)" }, children: title }),
      children && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", marginTop: title ? 2 : 0, lineHeight: 1.5 }, children })
    ] }),
    onClose && /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": "Dismiss", style: {
      flex: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontSize: 16,
      lineHeight: 1,
      padding: 2,
      marginTop: -1
    }, children: "×" })
  ] });
}
function Banner({
  tone = "accent",
  icon,
  action,
  onClose,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    accent: { bg: "var(--accent)", fg: "var(--on-accent)" },
    neutral: { bg: "var(--surface-raised)", fg: "var(--text)" },
    success: { bg: "var(--success)", fg: "var(--on-accent)" },
    warning: { bg: "var(--warning)", fg: "oklch(0.2 0.03 75)" },
    danger: { bg: "var(--danger)", fg: "var(--on-accent)" }
  };
  const t = tones[tone] || tones.accent;
  const glossy = tone !== "neutral";
  return /* @__PURE__ */ jsxs("div", { role: "region", style: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 20px",
    background: t.bg,
    color: t.fg,
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-body-sm)",
    borderBottom: tone === "neutral" ? "1px solid var(--border)" : "none",
    ...style
  }, ...rest, children: [
    glossy && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, top: 0, height: "60%", background: "var(--gloss-button)", pointerEvents: "none" } }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "center", textAlign: "center" }, children: [
      icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", fontSize: 18, flex: "none" }, children: icon }),
      /* @__PURE__ */ jsx("span", { style: { fontWeight: "var(--weight-medium)" }, children }),
      action && /* @__PURE__ */ jsx("span", { style: { flex: "none", marginLeft: 4 }, children: action })
    ] }),
    onClose && /* @__PURE__ */ jsx("button", { "aria-label": "Dismiss", onClick: onClose, style: {
      position: "relative",
      flex: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "inherit",
      opacity: 0.8,
      display: "inline-flex",
      padding: 4
    }, children: /* @__PURE__ */ jsx("i", { className: "ph ph-x", style: { fontSize: 16 } }) })
  ] });
}
function Progress({
  value = null,
  // 0..100, or null for indeterminate
  height = 6,
  label,
  showValue = false,
  style = {},
  ...rest
}) {
  const indeterminate = value === null;
  const pct = indeterminate ? 40 : Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-ui)", ...style }, ...rest, children: [
    (label || showValue) && /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "var(--text-label)" }, children: [
      /* @__PURE__ */ jsx("span", { style: { color: "var(--text)", fontWeight: "var(--weight-medium)" }, children: label }),
      showValue && !indeterminate && /* @__PURE__ */ jsxs("span", { style: { fontFamily: "var(--font-mono)", color: "var(--text-muted)" }, children: [
        Math.round(pct),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      position: "relative",
      height,
      borderRadius: "var(--radius-pill)",
      background: "var(--border)",
      overflow: "hidden",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12)"
    }, children: /* @__PURE__ */ jsx("div", { style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: indeterminate ? void 0 : 0,
      width: `${pct}%`,
      borderRadius: "var(--radius-pill)",
      background: "var(--accent)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
      transition: indeterminate ? "none" : "width var(--dur-ui) var(--ease-spring)",
      animation: indeterminate ? "agus-progress-sweep 1.4s var(--ease-inout) infinite" : "none"
    } }) }),
    /* @__PURE__ */ jsx("style", { children: `@keyframes agus-progress-sweep{0%{left:-40%}100%{left:100%}}` })
  ] });
}
function ProgressCircle({
  value = 0,
  size = 64,
  thickness = 6,
  tone = "accent",
  showValue = true,
  morph = false,
  label,
  style = {},
  ...rest
}) {
  const color = { accent: "var(--accent)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)" }[tone] || "var(--accent)";
  const pct = Math.max(0, Math.min(100, value));
  const ringMask = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: size, height: size, display: "inline-flex", flex: "none", ...style }, ...rest, children: [
    /* @__PURE__ */ jsx("div", { style: {
      width: size,
      height: size,
      boxSizing: "border-box",
      padding: thickness,
      borderRadius: LIQUID_BLOB,
      background: `conic-gradient(${color} ${pct}%, var(--border) 0)`,
      WebkitMask: ringMask,
      WebkitMaskComposite: "xor",
      mask: ringMask,
      maskComposite: "exclude",
      animation: morph ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none",
      transition: "background var(--dur-ui) var(--ease-out)"
    } }),
    (showValue || label) && /* @__PURE__ */ jsxs("div", { style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      lineHeight: 1.1
    }, children: [
      showValue && /* @__PURE__ */ jsxs("span", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: Math.round(size * 0.26), color: "var(--text)" }, children: [
        Math.round(pct),
        /* @__PURE__ */ jsx("span", { style: { fontSize: Math.round(size * 0.15) }, children: "%" })
      ] }),
      label && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-ui)", fontSize: Math.max(11, Math.round(size * 0.13)), color: "var(--text)", marginTop: 2 }, children: label })
    ] })
  ] });
}
function Skeleton({
  width = "100%",
  height = 14,
  radius = "var(--radius-sm)",
  circle = false,
  style = {},
  ...rest
}) {
  const dim = circle ? typeof width === "number" ? width : height : void 0;
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": "true",
      style: {
        display: "block",
        width: circle ? dim : width,
        height: circle ? dim : height,
        borderRadius: circle ? LIQUID_BLOB : radius,
        background: "linear-gradient(100deg, var(--skeleton-base) 30%, var(--skeleton-shine) 50%, var(--skeleton-base) 70%)",
        backgroundSize: "320% 100%",
        animation: "agus-shimmer 1.4s linear infinite",
        ...style
      },
      ...rest
    }
  );
}
function LoadingOverlay({
  show = true,
  message,
  fullscreen = false,
  blur = true,
  style = {},
  ...rest
}) {
  if (!show) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      style: {
        position: fullscreen ? "fixed" : "absolute",
        inset: 0,
        zIndex: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background: "color-mix(in oklab, var(--bg) 62%, transparent)",
        backdropFilter: blur ? "blur(3px)" : "none",
        WebkitBackdropFilter: blur ? "blur(3px)" : "none",
        borderRadius: fullscreen ? 0 : "inherit",
        fontFamily: "var(--font-ui)",
        animation: "agus-enter var(--dur-fast) var(--ease-out) both",
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx(Spinner, { size: 36 }),
        message && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", fontWeight: "var(--weight-medium)" }, children: message })
      ]
    }
  );
}
function Toast({
  tone = "accent",
  title,
  message,
  onClose,
  style = {},
  ...rest
}) {
  const dot = {
    accent: "var(--accent)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)"
  }[tone] || "var(--accent)";
  return /* @__PURE__ */ jsxs("div", { role: "status", style: {
    display: "flex",
    gap: 11,
    alignItems: "flex-start",
    minWidth: 280,
    maxWidth: 380,
    padding: "13px 15px",
    borderRadius: "var(--radius-md)",
    background: "var(--glass-surface)",
    WebkitBackdropFilter: "blur(18px) saturate(1.6)",
    backdropFilter: "blur(18px) saturate(1.6)",
    border: "1px solid var(--glass-border-light)",
    boxShadow: "var(--shadow-md)",
    fontFamily: "var(--font-ui)",
    animation: "agus-enter var(--dur-ui) var(--ease-spring)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { style: { marginTop: 3, flex: "none" }, children: /* @__PURE__ */ jsx(LiquidBubble, { size: 11, color: dot }) }),
    /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
      title && /* @__PURE__ */ jsx("div", { style: { fontWeight: "var(--weight-semibold)", fontSize: "var(--text-body-sm)", color: "var(--text)" }, children: title }),
      message && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", marginTop: title ? 2 : 0, lineHeight: 1.5 }, children: message })
    ] }),
    onClose && /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": "Dismiss", style: {
      flex: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontSize: 16,
      lineHeight: 1,
      padding: 2,
      marginTop: -1
    }, children: "×" })
  ] });
}
function Tooltip({ label, side = "top", children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(show, () => setShow(false));
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref: anchorRef,
      style: { position: "relative", display: "inline-flex" },
      onMouseEnter: () => setShow(true),
      onMouseLeave: () => setShow(false),
      onFocus: () => setShow(true),
      onBlur: () => setShow(false),
      children: [
        children,
        show && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("span", { ref: panelRef, role: "tooltip", style: {
          ...placeAround(rect, side, 8, "center"),
          zIndex: Z_FLOATING,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          padding: "6px 10px",
          borderRadius: "var(--radius-sm)",
          background: "color-mix(in oklch, var(--ink) 88%, transparent)",
          WebkitBackdropFilter: "blur(8px)",
          backdropFilter: "blur(8px)",
          color: "var(--cream)",
          fontFamily: "var(--font-ui)",
          fontSize: "var(--text-caption)",
          fontWeight: 500,
          boxShadow: "var(--shadow-md)",
          animation: "agus-enter var(--dur-fast) var(--ease-spring)",
          ...style
        }, children: label }) })
      ]
    }
  );
}
function Popover({
  trigger,
  children,
  placement = "bottom",
  offset = 8,
  zIndex = Z_FLOATING,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-flex" }, children: [
    /* @__PURE__ */ jsx("div", { ref: anchorRef, onClick: () => setOpen((o) => !o), style: { display: "inline-flex" }, children: trigger }),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsxs(
      "div",
      {
        ref: panelRef,
        role: "dialog",
        style: {
          ...placeAround(rect, placement, offset, "center"),
          zIndex,
          background: "var(--glass-surface)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          border: "1px solid var(--glass-border-light)",
          borderBottomColor: "var(--glass-border-dark)",
          boxShadow: "var(--shadow-glass)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-4)",
          minWidth: 200,
          animation: "agus-enter var(--dur-ui) var(--ease-spring) both",
          fontFamily: "var(--font-ui)",
          ...style
        },
        ...rest,
        children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)"
          } }),
          /* @__PURE__ */ jsx("div", { style: { position: "relative" }, children })
        ]
      }
    ) })
  ] });
}
function Dialog({
  open = false,
  onClose,
  title,
  children,
  actions = null,
  width = 440
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
    "div",
    {
      onMouseDown: (e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      },
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 4vw, 24px)",
        background: "rgba(20,28,42,0.32)",
        WebkitBackdropFilter: "blur(6px)",
        backdropFilter: "blur(6px)",
        animation: "agus-enter var(--dur-fast) var(--ease-out)"
      },
      children: /* @__PURE__ */ jsxs("div", { role: "dialog", "aria-modal": "true", style: {
        position: "relative",
        width,
        maxWidth: "100%",
        maxHeight: "calc(100vh - 24px)",
        overflowY: "auto",
        background: "var(--glass-surface)",
        WebkitBackdropFilter: "blur(22px) saturate(1.6)",
        backdropFilter: "blur(22px) saturate(1.6)",
        border: "1px solid var(--glass-border-light)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)",
        padding: "var(--space-5)",
        fontFamily: "var(--font-ui)",
        animation: "agus-enter var(--dur-ui) var(--ease-spring)"
      }, children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, transparent 42%), var(--accent-glass)"
        } }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
          title && /* @__PURE__ */ jsx("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "var(--text-h3)", margin: "0 0 8px", color: "var(--text)" }, children: title }),
          children && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", lineHeight: 1.6 }, children }),
          actions && /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: "var(--space-5)" }, children: actions })
        ] })
      ] })
    }
  ) });
}
function Drawer({
  open = false,
  onClose,
  side = "right",
  width = 380,
  title,
  children,
  style = {},
  ...rest
}) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && (onClose == null ? void 0 : onClose());
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const horizontal = side === "left" || side === "right";
  const hidden = { left: "translateX(-100%)", right: "translateX(100%)", top: "translateY(-100%)", bottom: "translateY(100%)" }[side];
  const edge = horizontal ? { top: 0, bottom: 0, [side]: 0, width, height: "100%" } : { left: 0, right: 0, [side]: 0, height: width, width: "100%" };
  return /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsxs("div", { "aria-hidden": !open, style: {
    position: "fixed",
    inset: 0,
    zIndex: 500,
    pointerEvents: open ? "auto" : "none"
  }, children: [
    /* @__PURE__ */ jsx("div", { onClick: onClose, style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.32)",
      backdropFilter: "blur(3px)",
      WebkitBackdropFilter: "blur(3px)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-ui) var(--ease-out)"
    } }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        style: {
          position: "absolute",
          ...edge,
          background: "var(--glass-surface)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          borderInline: horizontal && side === "right" ? "1px solid var(--glass-border-light)" : void 0,
          borderRight: horizontal && side === "left" ? "1px solid var(--glass-border-light)" : void 0,
          boxShadow: "var(--shadow-glass)",
          transform: open ? "none" : hidden,
          transition: "transform var(--dur-page) var(--ease-spring)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font-ui)",
          ...style
        },
        ...rest,
        children: [
          title && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--border)" }, children: [
            /* @__PURE__ */ jsx("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h3)", margin: 0, color: "var(--text)" }, children: title }),
            /* @__PURE__ */ jsx("button", { "aria-label": "Close", onClick: onClose, style: { border: "none", background: "transparent", cursor: "pointer", color: "var(--text-muted)", display: "flex", padding: 4 }, children: /* @__PURE__ */ jsx("i", { className: "ph ph-x", style: { fontSize: 18 } }) })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { padding: "var(--space-5)", overflowY: "auto", flex: 1 }, children })
        ]
      }
    )
  ] }) });
}
function EmptyState({
  title = "Nothing here yet",
  description,
  action,
  icon,
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "var(--space-8) var(--space-6)",
    borderRadius: "var(--radius-lg)",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      width: "60%",
      aspectRatio: "1 / 1",
      background: "linear-gradient(140deg, var(--accent-mid), var(--accent-glass))",
      borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
      animation: "agus-liquid var(--dur-liquid) var(--ease-inout) infinite",
      filter: "blur(40px)",
      opacity: 0.45,
      pointerEvents: "none",
      zIndex: 0
    } }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-4)" }, children: [
      icon && /* @__PURE__ */ jsx("span", { style: {
        fontSize: 40,
        color: "var(--accent)",
        opacity: 0.7,
        display: "inline-flex",
        marginBottom: "var(--space-1)"
      }, children: icon }),
      /* @__PURE__ */ jsx("h3", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-h3)",
        color: "var(--text)",
        margin: 0
      }, children: title }),
      description && /* @__PURE__ */ jsx("p", { style: {
        fontSize: "var(--text-body-sm)",
        color: "var(--text-muted)",
        lineHeight: "var(--leading-relaxed)",
        margin: 0,
        maxWidth: 340
      }, children: description }),
      action && /* @__PURE__ */ jsx("div", { style: { marginTop: "var(--space-1)" }, children: action })
    ] })
  ] });
}
function CommandPalette({
  open = false,
  onClose,
  commands = [],
  placeholder = "Search commands…",
  style = {},
  ...rest
}) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }, [open]);
  const filtered = commands.filter(
    (c) => !query || c.label.toLowerCase().includes(query.toLowerCase()) || (c.group || "").toLowerCase().includes(query.toLowerCase())
  );
  React.useEffect(() => {
    setActive(0);
  }, [query]);
  const run = (cmd) => {
    var _a;
    (_a = cmd.onSelect) == null ? void 0 : _a.call(cmd);
    onClose == null ? void 0 : onClose();
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === "Enter") {
      if (filtered[active]) run(filtered[active]);
    }
    if (e.key === "Escape") onClose == null ? void 0 : onClose();
  };
  if (!open) return null;
  const groups = filtered.reduce((acc, cmd) => {
    const g = cmd.group || "";
    if (!acc[g]) acc[g] = [];
    acc[g].push(cmd);
    return acc;
  }, {});
  let itemIndex = -1;
  return /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Command palette",
      onKeyDown: onKey,
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "14vh",
        background: "rgba(0,0,0,0.32)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)"
      },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose == null ? void 0 : onClose();
      },
      children: /* @__PURE__ */ jsxs("div", { style: {
        width: "100%",
        maxWidth: 560,
        background: "var(--glass-surface)",
        WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        border: "1px solid var(--glass-border-light)",
        borderBottomColor: "var(--glass-border-dark)",
        boxShadow: "var(--shadow-glass)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        animation: "agus-enter var(--dur-ui) var(--ease-spring) both",
        ...style
      }, ...rest, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 16px",
          borderBottom: filtered.length ? "1px solid var(--border)" : "none"
        }, children: [
          /* @__PURE__ */ jsx("i", { className: "ph ph-magnifying-glass", style: { fontSize: 18, color: "var(--text-muted)", flex: "none" } }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder,
              style: {
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-body)",
                color: "var(--text)"
              }
            }
          ),
          query && /* @__PURE__ */ jsx("button", { onClick: () => setQuery(""), style: { border: "none", background: "transparent", cursor: "pointer", padding: 0, color: "var(--text-muted)", display: "flex" }, children: /* @__PURE__ */ jsx("i", { className: "ph ph-x-circle", style: { fontSize: 16 } }) })
        ] }),
        filtered.length > 0 && /* @__PURE__ */ jsx("div", { style: { maxHeight: 360, overflowY: "auto", padding: "8px 8px" }, children: Object.entries(groups).map(([group, items]) => /* @__PURE__ */ jsxs("div", { children: [
          group && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-mini)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", padding: "8px 10px 4px", fontFamily: "var(--font-ui)" }, children: group }),
          items.map((cmd) => {
            itemIndex++;
            const idx = itemIndex;
            const isActive = active === idx;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => run(cmd),
                onMouseEnter: () => setActive(idx),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "9px 10px",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background: isActive ? "var(--accent-light)" : "transparent",
                  fontFamily: "var(--font-ui)",
                  color: isActive ? "var(--accent-text)" : "var(--text)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background var(--dur-micro) var(--ease-out)"
                },
                children: [
                  isActive && /* @__PURE__ */ jsx(LiquidBubble, { size: 8 }),
                  !isActive && /* @__PURE__ */ jsx("span", { style: { width: 8, flex: "none" } }),
                  cmd.icon && /* @__PURE__ */ jsx("span", { style: { fontSize: 16, flex: "none", opacity: isActive ? 1 : 0.6 }, children: cmd.icon }),
                  /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: cmd.label }),
                  cmd.shortcut && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-mini)", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "flex", gap: 3 }, children: cmd.shortcut.map((k, i) => /* @__PURE__ */ jsx("kbd", { style: { background: "var(--surface)", border: "1px solid var(--border)", borderBottomWidth: 2, borderRadius: "var(--radius-xs)", padding: "2px 5px" }, children: k }, i)) })
                ]
              },
              cmd.id ?? cmd.label
            );
          })
        ] }, group)) }),
        query && filtered.length === 0 && /* @__PURE__ */ jsxs("div", { style: { padding: "var(--space-7) var(--space-5)", textAlign: "center", color: "var(--text-muted)", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-ui)" }, children: [
          'No results for "',
          /* @__PURE__ */ jsx("strong", { children: query }),
          '"'
        ] })
      ] })
    }
  ) });
}
function Tabs({ tabs = [], value, onChange, style = {}, ...rest }) {
  const items = tabs.map((t) => typeof t === "string" ? { value: t, label: t } : t);
  const refs = React.useRef({});
  const [ind, setInd] = React.useState({ left: 0, width: 0 });
  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, tabs]);
  return /* @__PURE__ */ jsxs("div", { role: "tablist", style: {
    position: "relative",
    display: "flex",
    gap: 4,
    borderBottom: "1px solid var(--border)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    items.map((t) => {
      const active = t.value === value;
      return /* @__PURE__ */ jsx(
        "button",
        {
          role: "tab",
          "aria-selected": active,
          ref: (el) => {
            refs.current[t.value] = el;
          },
          onClick: () => onChange && onChange(t.value),
          style: {
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "10px 14px",
            fontFamily: "inherit",
            fontSize: "var(--text-body-sm)",
            fontWeight: active ? 600 : 500,
            color: active ? "var(--accent-text)" : "var(--text-muted)",
            transition: "color var(--dur-fast) var(--ease-out)",
            whiteSpace: "nowrap"
          },
          children: t.label
        },
        t.value
      );
    }),
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      bottom: -1,
      height: 3,
      borderRadius: "var(--radius-pill)",
      background: "var(--accent)",
      left: ind.left,
      width: ind.width,
      transition: "left var(--dur-ui) var(--ease-out), width var(--dur-ui) var(--ease-out)"
    } })
  ] });
}
function Breadcrumb({ items = [], onNavigate, style = {}, ...rest }) {
  const norm = items.map((it) => typeof it === "string" ? { label: it } : it);
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-body-sm)",
    ...style
  }, ...rest, children: norm.map((it, i) => {
    const last = i === norm.length - 1;
    return /* @__PURE__ */ jsxs(React.Fragment, { children: [
      last ? /* @__PURE__ */ jsx("span", { "aria-current": "page", style: { color: "var(--text)", fontWeight: 600 }, children: it.label }) : /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onNavigate && onNavigate(it.value ?? it.label, i),
          style: {
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "var(--text-muted)"
          },
          onMouseEnter: (e) => e.currentTarget.style.color = "var(--accent-text)",
          onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)",
          children: it.label
        }
      ),
      !last && /* @__PURE__ */ jsx(LiquidBubble, { size: 4, color: "var(--text-muted)", animate: false })
    ] }, i);
  }) });
}
function Menu({ trigger, items = [], align = "auto", style = {} }) {
  const [open, setOpen] = React.useState(false);
  const { anchorRef, panelRef, rect } = useAnchoredFloating(open, () => setOpen(false));
  function resolveAlign(r) {
    if (align === "right") return "end";
    if (align === "left") return "start";
    if (!r) return "start";
    return r.left > window.innerWidth * 0.55 ? "end" : "start";
  }
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-flex", ...style }, children: [
    /* @__PURE__ */ jsx("span", { ref: anchorRef, onClick: () => setOpen((o) => !o), style: { display: "inline-flex", cursor: "pointer" }, children: trigger }),
    open && rect && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx("div", { ref: panelRef, role: "menu", style: {
      ...placeAround(rect, "bottom", 6, resolveAlign(rect)),
      zIndex: Z_FLOATING,
      minWidth: 180,
      padding: 6,
      borderRadius: "var(--radius-md)",
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--glass-surface)",
      WebkitBackdropFilter: "blur(18px) saturate(1.6)",
      backdropFilter: "blur(18px) saturate(1.6)",
      border: "1px solid var(--glass-border-light)",
      boxShadow: "var(--shadow-md)",
      fontFamily: "var(--font-ui)",
      animation: "agus-enter var(--dur-ui) var(--ease-spring)"
    }, children: items.map((it, i) => it.divider ? /* @__PURE__ */ jsx("div", { style: { height: 1, background: "var(--border)", margin: "6px 4px" } }, i) : /* @__PURE__ */ jsxs(
      "button",
      {
        role: "menuitem",
        onClick: () => {
          it.onClick && it.onClick();
          setOpen(false);
        },
        style: {
          display: "flex",
          alignItems: "center",
          gap: 9,
          width: "100%",
          textAlign: "left",
          padding: "8px 10px",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          background: "transparent",
          fontFamily: "inherit",
          fontSize: "var(--text-body-sm)",
          color: it.danger ? "var(--danger)" : "var(--text)"
        },
        onMouseEnter: (e) => e.currentTarget.style.background = it.danger ? "var(--danger-light)" : "var(--surface-raised)",
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
        children: [
          it.icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", flex: "none" }, children: it.icon }),
          it.label
        ]
      },
      i
    )) }) })
  ] });
}
function ContextMenu({
  items = [],
  children,
  style = {},
  ...rest
}) {
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const close = () => setPos(null);
    if (pos) {
      document.addEventListener("click", close);
      document.addEventListener("scroll", close, true);
      window.addEventListener("resize", close);
    }
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);
  const onContext = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onContextMenu: onContext, style: { display: "contents" }, children }),
    pos && /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
      "div",
      {
        role: "menu",
        ref,
        style: {
          position: "fixed",
          top: pos.y,
          left: pos.x,
          zIndex: Z_FLOATING,
          minWidth: 200,
          background: "var(--glass-surface)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          border: "1px solid var(--glass-border-light)",
          borderBottomColor: "var(--glass-border-dark)",
          boxShadow: "var(--shadow-glass)",
          borderRadius: "var(--radius-md)",
          padding: 6,
          fontFamily: "var(--font-ui)",
          animation: "agus-enter var(--dur-fast) var(--ease-spring) both",
          ...style
        },
        ...rest,
        children: items.map(
          (item, i) => item.divider ? /* @__PURE__ */ jsx("div", { style: { height: 1, background: "var(--border)", margin: "6px 4px" } }, `d${i}`) : /* @__PURE__ */ jsxs(
            "button",
            {
              role: "menuitem",
              onClick: () => {
                var _a;
                (_a = item.onSelect) == null ? void 0 : _a.call(item);
                setPos(null);
              },
              disabled: item.disabled,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "8px 10px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: "transparent",
                cursor: item.disabled ? "not-allowed" : "pointer",
                textAlign: "left",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-body-sm)",
                color: item.tone === "danger" ? "var(--danger)" : "var(--text)",
                opacity: item.disabled ? 0.5 : 1,
                transition: "background var(--dur-micro) var(--ease-out)"
              },
              onMouseEnter: (e) => !item.disabled && (e.currentTarget.style.background = item.tone === "danger" ? "var(--danger-light)" : "var(--accent-light)"),
              onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
              children: [
                item.icon && /* @__PURE__ */ jsx("span", { style: { fontSize: 16, flex: "none", display: "inline-flex" }, children: item.icon }),
                /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: item.label }),
                item.shortcut && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-mono)", fontSize: "var(--text-mini)", color: "var(--text-muted)" }, children: item.shortcut })
              ]
            },
            item.id ?? item.label
          )
        )
      }
    ) })
  ] });
}
function Accordion({
  items = [],
  multiple = false,
  defaultOpen = [],
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = (id) => {
    setOpen((prev) => {
      const next = multiple ? new Set(prev) : /* @__PURE__ */ new Set();
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", fontFamily: "var(--font-ui)", ...style }, ...rest, children: items.map((item, i) => {
    const isOpen = open.has(item.id ?? i);
    return /* @__PURE__ */ jsxs("div", { style: { borderBottom: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          "aria-expanded": isOpen,
          onClick: () => toggle(item.id ?? i),
          className: "agus-focusable",
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            padding: "14px 4px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: "var(--weight-semibold)",
            fontSize: "var(--text-body-sm)",
            color: "var(--text)",
            gap: 12
          },
          children: [
            /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: item.title }),
            /* @__PURE__ */ jsx(
              LiquidBubble,
              {
                size: 12,
                variant: isOpen ? "filled" : "outline",
                thickness: 1.5,
                animate: isOpen,
                style: { transition: "all var(--dur-fast) var(--ease-out)" }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { style: {
        overflow: "hidden",
        maxHeight: isOpen ? 600 : 0,
        transition: "max-height var(--dur-ui) var(--ease-out)"
      }, children: /* @__PURE__ */ jsx("div", { style: {
        padding: "0 4px 16px",
        fontSize: "var(--text-body-sm)",
        lineHeight: "var(--leading-relaxed)",
        color: "var(--text-muted)"
      }, children: item.content }) })
    ] }, item.id ?? i);
  }) });
}
function Pagination({
  page = 1,
  total = 1,
  onChange,
  siblings = 1,
  style = {},
  ...rest
}) {
  const go = (p) => {
    if (p >= 1 && p <= total && onChange) onChange(p);
  };
  const range = () => {
    const pages = [];
    const left = Math.max(2, page - siblings);
    const right = Math.min(total - 1, page + siblings);
    pages.push(1);
    if (left > 2) pages.push("…L");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < total - 1) pages.push("…R");
    if (total > 1) pages.push(total);
    return pages;
  };
  const btnBase = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-ui)",
    fontWeight: "var(--weight-semibold)",
    fontSize: 14,
    transition: "background var(--dur-fast) var(--ease-out)",
    borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
    position: "relative"
  };
  const PageBtn = ({ p }) => {
    const active = p === page;
    const [hover, setHover] = React.useState(false);
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": `Page ${p}`,
        "aria-current": active ? "page" : void 0,
        onClick: () => go(p),
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        style: {
          ...btnBase,
          background: active ? "linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))" : hover ? "var(--accent-light)" : "transparent",
          color: active ? "var(--on-accent)" : "var(--text-muted)",
          boxShadow: active ? "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.35)" : "none"
        },
        children: p
      }
    );
  };
  const NavBtn = ({ dir }) => {
    const disabled = dir === "prev" ? page <= 1 : page >= total;
    const [hover, setHover] = React.useState(false);
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-label": dir === "prev" ? "Previous" : "Next",
        disabled,
        onClick: () => go(dir === "prev" ? page - 1 : page + 1),
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        style: {
          ...btnBase,
          background: hover && !disabled ? "var(--accent-light)" : "transparent",
          color: disabled ? "var(--border)" : "var(--text-muted)",
          cursor: disabled ? "not-allowed" : "pointer"
        },
        children: /* @__PURE__ */ jsx("i", { className: `ph ph-caret-${dir === "prev" ? "left" : "right"}`, style: { fontSize: 16 } })
      }
    );
  };
  return /* @__PURE__ */ jsxs("nav", { "aria-label": "Pagination", style: { display: "inline-flex", alignItems: "center", gap: 2, ...style }, ...rest, children: [
    /* @__PURE__ */ jsx(NavBtn, { dir: "prev" }),
    range().map(
      (p, i) => typeof p === "string" ? /* @__PURE__ */ jsx("span", { style: { width: 28, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }, children: "…" }, p) : /* @__PURE__ */ jsx(PageBtn, { p }, p)
    ),
    /* @__PURE__ */ jsx(NavBtn, { dir: "next" })
  ] });
}
function Stepper({
  steps = [],
  current = 0,
  orientation = "horizontal",
  style = {},
  ...rest
}) {
  const horizontal = orientation === "horizontal";
  return /* @__PURE__ */ jsx("div", { style: {
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    alignItems: horizontal ? "flex-start" : "stretch",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: steps.map((step, i) => {
    const state = i < current ? "done" : i === current ? "current" : "upcoming";
    const variant = state === "done" ? "filled" : state === "current" ? "spinner" : "outline";
    const isLast = i === steps.length - 1;
    return /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      flexDirection: horizontal ? "column" : "row",
      alignItems: horizontal ? "center" : "flex-start",
      flex: horizontal && !isLast ? 1 : "none",
      gap: horizontal ? 8 : 12,
      position: "relative",
      minWidth: horizontal ? 80 : void 0
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: horizontal ? "row" : "column", alignItems: "center", width: horizontal ? "100%" : "auto", gap: horizontal ? 0 : 0 }, children: [
        /* @__PURE__ */ jsx(LiquidBubble, { size: 16, variant, animate: state !== "upcoming", thickness: 2 }),
        !isLast && /* @__PURE__ */ jsx("div", { style: {
          flex: horizontal ? 1 : "none",
          width: horizontal ? "auto" : 2,
          height: horizontal ? 2 : 24,
          marginInline: horizontal ? 6 : 0,
          marginTop: horizontal ? 0 : 4,
          background: i < current ? "var(--accent)" : "var(--border)",
          transition: "background var(--dur-ui) var(--ease-out)"
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { textAlign: horizontal ? "center" : "left", paddingBottom: horizontal ? 0 : 16, marginTop: horizontal ? 0 : -2 }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: "var(--text-label)",
          fontWeight: state === "current" ? 700 : 600,
          color: state === "upcoming" ? "var(--text-muted)" : "var(--text)"
        }, children: step.label }),
        step.description && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)", marginTop: 2 }, children: step.description })
      ] })
    ] }, step.id ?? i);
  }) });
}
function Avatar({
  src,
  name = "",
  size = 40,
  shape = "bubble",
  // 'bubble' | 'circle' | 'square'
  status,
  // 'online' | 'away' | 'busy' | undefined
  style = {},
  ...rest
}) {
  const initials = name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const radius = shape === "circle" ? "50%" : shape === "square" ? "var(--radius-md)" : LIQUID_BLOB;
  const statusColor = { online: "var(--success)", away: "var(--warning)", busy: "var(--danger)" }[status];
  return /* @__PURE__ */ jsxs("span", { style: { position: "relative", display: "inline-flex", flex: "none", ...style }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { style: {
      width: size,
      height: size,
      borderRadius: radius,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: src ? "var(--bone)" : "linear-gradient(140deg, var(--accent-mid), var(--accent))",
      color: "var(--on-accent)",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: size * 0.38,
      boxShadow: "var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.3)"
    }, children: src ? /* @__PURE__ */ jsx("img", { src, alt: name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : initials }),
    statusColor && /* @__PURE__ */ jsx(
      LiquidBubble,
      {
        size: Math.max(9, size * 0.28),
        color: statusColor,
        animate: false,
        style: { position: "absolute", right: -1, bottom: -1, boxShadow: "0 0 0 2px var(--bg)" }
      }
    )
  ] });
}
function Divider({ orientation = "horizontal", label, style = {}, ...rest }) {
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { width: 1, alignSelf: "stretch", background: "var(--border)", ...style }, ...rest });
  }
  if (label) {
    return /* @__PURE__ */ jsxs("div", { role: "separator", style: { display: "flex", alignItems: "center", gap: 12, ...style }, ...rest, children: [
      /* @__PURE__ */ jsx("span", { style: { flex: 1, height: 1, background: "var(--border)" } }),
      /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-ui)", fontSize: "var(--text-caption)", color: "var(--text-muted)", fontWeight: 500 }, children: label }),
      /* @__PURE__ */ jsx("span", { style: { flex: 1, height: 1, background: "var(--border)" } })
    ] });
  }
  return /* @__PURE__ */ jsx("hr", { role: "separator", style: { border: "none", height: 1, background: "var(--border)", margin: 0, ...style }, ...rest });
}
function Table({
  columns = [],
  rows = [],
  striped = false,
  onSort,
  sortKey,
  sortDir = "asc",
  style = {},
  ...rest
}) {
  const handleSort = (col) => {
    if (!col.sortable || !onSort) return;
    onSort(col.key, col.key === sortKey && sortDir === "asc" ? "desc" : "asc");
  };
  return /* @__PURE__ */ jsx("div", { style: { overflowX: "auto", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", ...style }, ...rest, children: /* @__PURE__ */ jsxs("table", { style: { width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-ui)", fontSize: "var(--text-body-sm)" }, children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((col) => {
      const active = sortKey === col.key;
      return /* @__PURE__ */ jsx(
        "th",
        {
          onClick: () => handleSort(col),
          style: {
            padding: "11px 16px",
            textAlign: col.align || "left",
            fontWeight: "var(--weight-semibold)",
            fontSize: "var(--text-caption)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: active ? "var(--accent-text)" : "var(--text-muted)",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            cursor: col.sortable ? "pointer" : "default",
            userSelect: "none",
            whiteSpace: "nowrap"
          },
          children: /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
            col.label,
            col.sortable && (active ? /* @__PURE__ */ jsx(LiquidBubble, { size: 8, style: { transform: sortDir === "desc" ? "scaleY(-1)" : "none" } }) : /* @__PURE__ */ jsx(LiquidBubble, { size: 8, variant: "outline", thickness: 1.5, animate: false }))
          ] })
        },
        col.key
      );
    }) }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row, ri) => /* @__PURE__ */ jsx(
      "tr",
      {
        style: {
          background: striped && ri % 2 === 1 ? "var(--surface)" : "transparent",
          transition: "background var(--dur-micro) var(--ease-out)"
        },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent-light)",
        onMouseLeave: (e) => e.currentTarget.style.background = striped && ri % 2 === 1 ? "var(--surface)" : "transparent",
        children: columns.map((col) => /* @__PURE__ */ jsx("td", { style: {
          padding: "12px 16px",
          textAlign: col.align || "left",
          color: col.muted ? "var(--text-muted)" : "var(--text)",
          borderBottom: ri < rows.length - 1 ? "1px solid var(--border)" : "none",
          verticalAlign: "middle"
        }, children: col.render ? col.render(row[col.key], row) : row[col.key] }, col.key))
      },
      row.id ?? ri
    )) })
  ] }) });
}
function Timeline({
  items = [],
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsx("ol", { style: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: items.map((item, i) => {
    const isLast = i === items.length - 1;
    const bubbleVariant = item.status === "done" ? "filled" : item.status === "active" ? "spinner" : "outline";
    const bubbleAnimate = item.status !== "pending";
    return /* @__PURE__ */ jsxs("li", { style: { display: "flex", gap: 14, position: "relative" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }, children: [
        /* @__PURE__ */ jsx(
          LiquidBubble,
          {
            size: 14,
            variant: bubbleVariant,
            animate: bubbleAnimate,
            thickness: 1.5,
            style: { marginTop: 2 }
          }
        ),
        !isLast && /* @__PURE__ */ jsx("div", { style: {
          width: 1.5,
          flex: 1,
          minHeight: 20,
          marginTop: 4,
          background: item.status === "done" ? "var(--accent-mid)" : "var(--border)"
        } })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { paddingBottom: isLast ? 0 : 20, flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 10 }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontWeight: "var(--weight-semibold)", fontSize: "var(--text-body-sm)", color: "var(--text)" }, children: item.title }),
          item.time && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-mono)", fontSize: "var(--text-mini)", color: "var(--text-muted)" }, children: item.time })
        ] }),
        item.description && /* @__PURE__ */ jsx("p", { style: { margin: "4px 0 0", fontSize: "var(--text-body-sm)", color: "var(--text-muted)", lineHeight: 1.5 }, children: item.description }),
        item.extra && /* @__PURE__ */ jsx("div", { style: { marginTop: 8 }, children: item.extra })
      ] })
    ] }, item.id ?? i);
  }) });
}
function TreeView({
  nodes = [],
  selectedId,
  onSelect,
  defaultExpanded = [],
  style = {},
  ...rest
}) {
  const [expanded, setExpanded] = React.useState(new Set(defaultExpanded));
  const toggle = (id) => setExpanded((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const renderNode = (node, depth) => {
    const hasChildren = node.children && node.children.length > 0;
    const isOpen = expanded.has(node.id);
    const isSel = selectedId === node.id;
    return /* @__PURE__ */ jsxs("li", { style: { listStyle: "none" }, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => {
            hasChildren ? toggle(node.id) : onSelect == null ? void 0 : onSelect(node);
            if (!hasChildren) onSelect == null ? void 0 : onSelect(node);
          },
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            paddingLeft: 10 + depth * 18,
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            background: isSel ? "var(--accent-light)" : "transparent",
            color: isSel ? "var(--accent-text)" : "var(--text)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-sm)",
            fontWeight: isSel ? 600 : 400,
            transition: "background var(--dur-micro) var(--ease-out)"
          },
          onMouseEnter: (e) => {
            if (!isSel) e.currentTarget.style.background = "var(--accent-light)";
          },
          onMouseLeave: (e) => {
            if (!isSel) e.currentTarget.style.background = "transparent";
          },
          children: [
            hasChildren ? /* @__PURE__ */ jsx(LiquidBubble, { size: 10, variant: isOpen ? "filled" : "outline", thickness: 1.5, animate: isOpen }) : /* @__PURE__ */ jsx("span", { style: { width: 10, flex: "none" } }),
            node.icon && /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", fontSize: 16, color: "var(--text-muted)", flex: "none" }, children: node.icon }),
            /* @__PURE__ */ jsx("span", { style: { flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: node.label }),
            node.meta && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-mini)", color: "var(--text-muted)" }, children: node.meta })
          ]
        }
      ),
      hasChildren && isOpen && /* @__PURE__ */ jsx("ul", { style: { margin: 0, padding: 0 }, children: node.children.map((child) => renderNode(child, depth + 1)) })
    ] }, node.id);
  };
  return /* @__PURE__ */ jsx("ul", { style: { margin: 0, padding: 0, ...style }, ...rest, children: nodes.map((n) => renderNode(n, 0)) });
}
function CodeBlock({
  code = "",
  language = "code",
  showLineNumbers = false,
  style = {},
  ...rest
}) {
  const [copied, setCopied] = React.useState(false);
  const lines = String(code).replace(/\n$/, "").split("\n");
  const copy = () => {
    var _a;
    (_a = navigator.clipboard) == null ? void 0 : _a.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontFamily: "var(--font-mono)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 12px",
      borderBottom: "1px solid var(--border)",
      background: "var(--surface-raised)"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-mini)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)" }, children: language }),
      /* @__PURE__ */ jsxs("button", { onClick: copy, "aria-label": "Copy code", style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-mini)",
        fontWeight: 600,
        color: copied ? "var(--success)" : "var(--text-muted)",
        transition: "color var(--dur-fast) var(--ease-out)"
      }, children: [
        /* @__PURE__ */ jsx("i", { className: `ph ph-${copied ? "check" : "copy"}`, style: { fontSize: 14 } }),
        copied ? "Copied" : "Copy"
      ] })
    ] }),
    /* @__PURE__ */ jsx("pre", { style: { margin: 0, padding: "14px 16px", overflowX: "auto", fontSize: "var(--text-body-sm)", lineHeight: 1.65, color: "var(--text)" }, children: /* @__PURE__ */ jsx("code", { style: { fontFamily: "inherit" }, children: showLineNumbers ? lines.map((ln, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex" }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 28, flex: "none", userSelect: "none", color: "var(--text-muted)", opacity: 0.6, textAlign: "right", paddingRight: 14 }, children: i + 1 }),
      /* @__PURE__ */ jsx("span", { style: { whiteSpace: "pre" }, children: ln || " " })
    ] }, i)) : code }) })
  ] });
}
function DescriptionList({
  items = [],
  columns = 1,
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsx("dl", { style: {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: "var(--space-4) var(--space-6)",
    margin: 0,
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: items.map((item, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0, paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--border)" }, children: [
    /* @__PURE__ */ jsx("dt", { style: {
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }, children: item.term }),
    /* @__PURE__ */ jsx("dd", { style: { margin: 0, fontSize: "var(--text-body)", color: "var(--text)", fontWeight: "var(--weight-medium)" }, children: item.value })
  ] }, item.id ?? i)) });
}
function Container({
  size = "default",
  padded = true,
  as: Tag2 = "div",
  style = {},
  children,
  ...rest
}) {
  const maxWidths = {
    sm: 640,
    default: 1120,
    lg: 1400,
    full: "100%"
  };
  return /* @__PURE__ */ jsx(Tag2, { style: {
    width: "100%",
    maxWidth: maxWidths[size] ?? maxWidths.default,
    marginInline: "auto",
    paddingInline: padded ? "var(--space-5)" : 0,
    boxSizing: "border-box",
    ...style
  }, ...rest, children });
}
function Stack({
  direction = "column",
  gap = 4,
  align = "stretch",
  justify = "flex-start",
  wrap = false,
  as: Tag2 = "div",
  style = {},
  children,
  ...rest
}) {
  const gaps = { 1: "var(--space-1)", 2: "var(--space-2)", 3: "var(--space-3)", 4: "var(--space-4)", 5: "var(--space-5)", 6: "var(--space-6)", 7: "var(--space-7)", 8: "var(--space-8)" };
  return /* @__PURE__ */ jsx(Tag2, { style: {
    display: "flex",
    flexDirection: direction,
    gap: gaps[gap] ?? gap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...style
  }, ...rest, children });
}
function Section({
  as: Tag2 = "section",
  size = "md",
  horizon = false,
  style = {},
  children,
  ...rest
}) {
  const pads = { sm: "var(--space-7) 0", md: "var(--space-8) 0", lg: "var(--space-10) 0" };
  return /* @__PURE__ */ jsx(Tag2, { style: {
    position: "relative",
    padding: pads[size] ?? pads.md,
    background: horizon ? "radial-gradient(140% 90% at 50% 0%, var(--accent-light), transparent 55%), linear-gradient(to bottom, var(--surface-raised), var(--bg))" : void 0,
    ...style
  }, ...rest, children });
}
function Prose({ style = {}, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { style: {
    maxWidth: "var(--measure)",
    fontFamily: "var(--font-ui)",
    fontSize: "var(--text-body)",
    lineHeight: "var(--leading-relaxed)",
    color: "var(--text)",
    ...style
  }, ...rest, children });
}
function PageHeader({
  title,
  subtitle,
  eyebrow,
  action,
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "var(--space-5)",
    flexWrap: "wrap",
    paddingBottom: "var(--space-5)",
    borderBottom: "1px solid var(--border)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsx("div", { style: {
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "var(--space-2)"
      }, children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "var(--text-h1)",
        letterSpacing: "var(--tracking-snug)",
        color: "var(--text)",
        margin: 0,
        lineHeight: "var(--leading-snug)"
      }, children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { style: {
        fontSize: "var(--text-body)",
        color: "var(--text-muted)",
        margin: "var(--space-2) 0 0",
        lineHeight: "var(--leading-normal)"
      }, children: subtitle })
    ] }),
    action && /* @__PURE__ */ jsx("div", { style: { flex: "none" }, children: action })
  ] });
}
function HeroSection({
  eyebrow,
  headline,
  sub,
  cta,
  align = "left",
  style = {},
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "var(--radius-xl)",
    padding: "var(--space-9) var(--space-8)",
    background: "radial-gradient(120% 90% at 0% 0%, var(--accent-light), transparent 55%), linear-gradient(160deg, var(--surface-raised), var(--bg))",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow-sm)",
    textAlign: align,
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      width: "36%",
      aspectRatio: "1 / 1",
      right: "-4%",
      top: "-12%",
      background: "linear-gradient(140deg, var(--accent-mid), var(--accent))",
      opacity: 0.18,
      borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
      animation: "agus-liquid 11s var(--ease-inout) infinite",
      filter: "blur(4px)"
    } }),
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      width: "22%",
      aspectRatio: "1 / 1",
      right: "18%",
      bottom: "-18%",
      background: "var(--accent-glass)",
      borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
      animation: "agus-liquid 9s var(--ease-inout) infinite",
      animationDelay: "-4s"
    } }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", maxWidth: align === "center" ? 680 : 640, marginInline: align === "center" ? "auto" : void 0 }, children: [
      eyebrow && /* @__PURE__ */ jsx("div", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--accent)",
        marginBottom: "var(--space-4)"
      }, children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "clamp(var(--text-h1), 4vw, var(--text-display-lg))",
        letterSpacing: "var(--tracking-tight)",
        lineHeight: 1.05,
        color: "var(--text)",
        margin: "0 0 var(--space-4)"
      }, children: headline }),
      sub && /* @__PURE__ */ jsx("p", { style: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--leading-relaxed)",
        color: "var(--text-muted)",
        margin: "0 0 var(--space-6)",
        maxWidth: 520,
        marginInline: align === "center" ? "auto" : void 0
      }, children: sub }),
      cta && /* @__PURE__ */ jsx("div", { style: { display: "inline-flex", gap: "var(--space-3)", flexWrap: "wrap" }, children: cta }),
      children
    ] })
  ] });
}
function NavBar({
  links = [],
  action,
  activeHref,
  onLinkClick,
  homeHref = "/",
  onBrandClick,
  compactAt = 720,
  style = {},
  ...rest
}) {
  const { Wordmark: Wordmark2 } = window.AgusDesignSystem_492a6f;
  const [open, setOpen] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const navRef = React.useRef(null);
  React.useEffect(() => {
    const el = navRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < compactAt));
    ro.observe(el);
    return () => ro.disconnect();
  }, [compactAt]);
  React.useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);
  const linkStyle = (active, block) => ({
    display: block ? "flex" : "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: block ? "11px 14px" : "7px 14px",
    borderRadius: block ? "var(--radius-md)" : "var(--radius-pill)",
    fontWeight: active ? 600 : 500,
    fontSize: "var(--text-body-sm)",
    color: active ? "var(--accent-text)" : "var(--text-muted)",
    background: active ? "var(--accent-light)" : "transparent",
    textDecoration: "none",
    width: block ? "100%" : void 0,
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)"
  });
  const handleClick = (l) => (e) => {
    if (onLinkClick) {
      e.preventDefault();
      onLinkClick(l);
    }
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs("nav", { ref: navRef, style: {
    position: "sticky",
    top: 0,
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-3)",
    padding: "10px 14px",
    margin: "12px",
    borderRadius: "var(--radius-pill)",
    background: "var(--glass-surface)",
    // Dense 48px blur — the NavBar reads as solid chrome over scrolling content.
    WebkitBackdropFilter: "blur(var(--glass-blur-dense)) saturate(1.6)",
    backdropFilter: "blur(var(--glass-blur-dense)) saturate(1.6)",
    border: "1px solid var(--glass-border-light)",
    borderBottomColor: "var(--glass-border-dark)",
    boxShadow: "var(--shadow-glass)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      pointerEvents: "none",
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), var(--accent-glass)"
    } }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: homeHref,
        onClick: onBrandClick ? (e) => {
          e.preventDefault();
          onBrandClick(e);
        } : void 0,
        style: { position: "relative", display: "inline-flex", textDecoration: "none", flex: "none" },
        children: /* @__PURE__ */ jsx(Wordmark2, { size: 22, animate: false })
      }
    ),
    links.length > 0 && !compact && /* @__PURE__ */ jsx("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }, children: links.map((l) => {
      const active = activeHref === l.href;
      return /* @__PURE__ */ jsxs("a", { href: l.href, onClick: handleClick(l), style: linkStyle(active, false), children: [
        active && /* @__PURE__ */ jsx(LiquidBubble, { size: 7 }),
        l.label
      ] }, l.href);
    }) }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center", gap: 8, flex: "none" }, children: [
      action,
      links.length > 0 && compact && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": open ? "Close menu" : "Open menu",
          "aria-expanded": open,
          onClick: () => setOpen((o) => !o),
          style: {
            width: 38,
            height: 38,
            borderRadius: LIQUID_BLOB,
            border: "none",
            background: open ? "var(--accent-light)" : "transparent",
            color: open ? "var(--accent-text)" : "var(--text-muted)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 20,
            padding: 0,
            transition: "background var(--dur-fast) var(--ease-out)"
          },
          children: /* @__PURE__ */ jsx("i", { className: open ? "ph ph-x" : "ph ph-list" })
        }
      )
    ] }),
    compact && open && links.length > 0 && /* @__PURE__ */ jsx("div", { style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      left: 0,
      right: 0,
      zIndex: 320,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: 8,
      borderRadius: "var(--radius-lg)",
      // Glass look (inner gloss + accent film) over an OPAQUE surface base.
      // The panel is nested inside the bar, whose own backdrop-filter prevents
      // this child from frosting the page — so NO backdrop-filter here; the
      // opaque base is what keeps the links readable. A translucent base would
      // let page content bleed through (it can't be frosted).
      background: "linear-gradient(to bottom, var(--glass-inner-gloss) 0%, rgba(255,255,255,0) 42%), linear-gradient(var(--accent-glass), var(--accent-glass)), var(--surface)",
      border: "1px solid var(--glass-border-light)",
      borderBottomColor: "var(--glass-border-dark)",
      boxShadow: "var(--shadow-glass)",
      animation: "agus-enter var(--dur-ui) var(--ease-spring)"
    }, children: links.map((l) => {
      const active = activeHref === l.href;
      return /* @__PURE__ */ jsxs("a", { href: l.href, onClick: handleClick(l), style: linkStyle(active, true), children: [
        active && /* @__PURE__ */ jsx(LiquidBubble, { size: 7 }),
        l.label
      ] }, l.href);
    }) })
  ] });
}
function Footer({
  columns = [],
  copyright,
  style = {},
  ...rest
}) {
  const { Wordmark: Wordmark2 } = window.AgusDesignSystem_492a6f;
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { style: {
    background: "var(--surface)",
    borderTop: "1px solid var(--border)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: /* @__PURE__ */ jsx("div", { style: { maxWidth: "var(--container-max)", marginInline: "auto", padding: "var(--space-8) var(--space-5)" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: `auto repeat(${columns.length}, 1fr)`, gap: "var(--space-8)" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" }, children: [
      /* @__PURE__ */ jsx(Wordmark2, { size: 22, animate: false }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", margin: 0, maxWidth: 220, lineHeight: "var(--leading-relaxed)" }, children: copyright || `© ${year} Aqus. All rights reserved.` })
    ] }),
    columns.map((col, ci) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-label)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "var(--space-4)" }, children: col.title }),
      /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }, children: col.links.map((link, li) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href || "#",
          style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", textDecoration: "none", transition: "color var(--dur-fast) var(--ease-out)" },
          onMouseEnter: (e) => e.target.style.color = "var(--accent)",
          onMouseLeave: (e) => e.target.style.color = "var(--text-muted)",
          children: link.label
        }
      ) }, li)) })
    ] }, ci))
  ] }) }) });
}
function StatCard({
  label,
  value,
  delta,
  up,
  icon,
  style = {},
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "var(--space-5)",
    boxShadow: "var(--shadow-xs)",
    fontFamily: "var(--font-ui)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      insetInline: 0,
      top: 0,
      height: "35%",
      background: "var(--gloss-card)",
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        fontSize: "var(--text-label)",
        fontWeight: "var(--weight-medium)",
        color: "var(--text-muted)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        minWidth: 0
      }, children: label }),
      icon && /* @__PURE__ */ jsx("span", { style: {
        width: 30,
        height: 30,
        flex: "none",
        borderRadius: "var(--radius-sm)",
        background: "var(--accent-glass)",
        color: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15
      }, children: icon })
    ] }),
    /* @__PURE__ */ jsx("span", { style: {
      position: "relative",
      display: "block",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "var(--text-h1)",
      lineHeight: 1.1,
      color: "var(--text)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minWidth: 0
    }, children: value }),
    delta !== void 0 && /* @__PURE__ */ jsxs("span", { style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-semibold)",
      color: up ? "var(--success)" : "var(--danger)",
      whiteSpace: "nowrap"
    }, children: [
      /* @__PURE__ */ jsx(LiquidBubble, { size: 6, color: up ? "var(--success)" : "var(--danger)" }),
      delta
    ] })
  ] });
}
function FeatureCard({
  icon,
  title,
  description,
  style = {},
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "var(--space-5)",
    boxShadow: "var(--shadow-xs)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, top: 0, height: "35%", background: "var(--gloss-card)", pointerEvents: "none" } }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
      icon && /* @__PURE__ */ jsx("div", { style: {
        width: 48,
        height: 48,
        marginBottom: "var(--space-4)",
        borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
        background: "linear-gradient(140deg, var(--accent-mid), var(--accent))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--on-accent)",
        fontSize: 22,
        boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.4)"
      }, children: icon }),
      /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h3)", color: "var(--text)", margin: "0 0 var(--space-2)" }, children: title }),
      description && /* @__PURE__ */ jsx("p", { style: { fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-relaxed)", color: "var(--text-muted)", margin: 0 }, children: description }),
      children
    ] })
  ] });
}
function FilterBar({
  filters = [],
  onRemove,
  onClear,
  style = {},
  ...rest
}) {
  const { Tag: Tag2, Button: Button2 } = window.AgusDesignSystem_492a6f;
  if (!filters.length) return null;
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    flexWrap: "wrap",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)", fontWeight: 600, marginRight: 4 }, children: "Filters:" }),
    filters.map((f, i) => /* @__PURE__ */ jsx(
      Tag2,
      {
        tone: f.tone || "accent",
        size: "sm",
        onRemove: () => onRemove && onRemove(f),
        children: f.label
      },
      f.id ?? i
    )),
    onClear && /* @__PURE__ */ jsx(
      Button2,
      {
        variant: "ghost",
        size: "sm",
        onClick: onClear,
        style: { fontSize: "var(--text-caption)", padding: "4px 8px" },
        children: "Clear all"
      }
    )
  ] });
}
function TestimonialCard({
  quote,
  name,
  role,
  avatarSrc,
  avatarInitials = "?",
  style = {},
  ...rest
}) {
  const { Avatar: Avatar2, Badge: Badge2 } = window.AgusDesignSystem_492a6f;
  return /* @__PURE__ */ jsxs("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-6)",
    boxShadow: "var(--shadow-sm)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { position: "absolute", insetInline: 0, top: 0, height: "35%", background: "var(--gloss-card)", pointerEvents: "none" } }),
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
      position: "absolute",
      top: -8,
      left: 18,
      fontFamily: "var(--font-display)",
      fontSize: 96,
      fontWeight: 900,
      lineHeight: 1,
      color: "var(--accent-light)",
      userSelect: "none",
      pointerEvents: "none"
    }, children: '"' }),
    /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx("p", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--leading-relaxed)",
        color: "var(--text)",
        margin: "0 0 var(--space-5)",
        paddingTop: "var(--space-5)",
        fontStyle: "italic"
      }, children: quote }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "var(--space-3)" }, children: [
        /* @__PURE__ */ jsx(Avatar2, { src: avatarSrc, name, initials: avatarInitials, size: 40 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: { fontWeight: "var(--weight-semibold)", fontSize: "var(--text-body-sm)", color: "var(--text)" }, children: name }),
          role && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)" }, children: role })
        ] })
      ] })
    ] })
  ] });
}
function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  tags = [],
  href = "#",
  featured = false,
  style = {},
  ...rest
}) {
  const { Badge: Badge2, Tag: Tag2 } = window.AgusDesignSystem_492a6f;
  const [hover, setHover] = React.useState(false);
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      style: { textDecoration: "none", display: "block", ...style },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      ...rest,
      children: /* @__PURE__ */ jsxs("div", { style: {
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "var(--transition-hover)",
        fontFamily: "var(--font-ui)"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          height: 160,
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(120% 100% at 30% 0%, var(--accent-light), transparent 60%), linear-gradient(145deg, var(--accent-mid), var(--accent))`
        }, children: [
          featured && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
            position: "absolute",
            width: "70%",
            aspectRatio: "1 / 1",
            right: "-10%",
            bottom: "-20%",
            background: "var(--accent-glass)",
            borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            animation: "agus-liquid var(--dur-liquid) var(--ease-inout) infinite"
          } }),
          featured && /* @__PURE__ */ jsx("span", { style: {
            position: "absolute",
            top: 12,
            left: 12
          }, children: /* @__PURE__ */ jsx(Badge2, { tone: "accent", pill: true, children: "Featured" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "var(--space-5)" }, children: [
          /* @__PURE__ */ jsx("h3", { style: {
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h3)",
            color: "var(--text)",
            margin: "0 0 var(--space-2)",
            lineHeight: "var(--leading-snug)"
          }, children: title }),
          excerpt && /* @__PURE__ */ jsx("p", { style: {
            fontSize: "var(--text-body-sm)",
            color: "var(--text-muted)",
            lineHeight: "var(--leading-relaxed)",
            margin: "0 0 var(--space-4)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }, children: excerpt }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: tags.map((t) => /* @__PURE__ */ jsx(Badge2, { tone: "neutral", children: t }, t)) }),
            /* @__PURE__ */ jsxs("div", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)", whiteSpace: "nowrap", display: "flex", gap: 8 }, children: [
              date && /* @__PURE__ */ jsx("span", { children: date }),
              readTime && /* @__PURE__ */ jsxs("span", { children: [
                "· ",
                readTime
              ] })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function MediaCard({
  media,
  mediaHeight = 180,
  title,
  subtitle,
  badge,
  overlay,
  href,
  onClick,
  style = {},
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag2 = href ? "a" : "div";
  return /* @__PURE__ */ jsxs(
    Tag2,
    {
      href,
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        // Flex column + height:100% lets a grid cell stretch the card to the
        // tallest in its row; children pinned to the bottom stay aligned across
        // the row even when titles wrap to different line counts.
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        cursor: href || onClick ? "pointer" : "default",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition: "var(--transition-hover)",
        fontFamily: "var(--font-ui)",
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", height: mediaHeight, flex: "none", overflow: "hidden", background: "linear-gradient(145deg, var(--accent-mid), var(--accent))" }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            position: "absolute",
            inset: 0,
            backgroundImage: typeof media === "string" ? `url(${media})` : void 0,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform var(--dur-page) var(--ease-out)"
          }, children: typeof media !== "string" ? media : null }),
          badge && /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 12, left: 12 }, children: badge }),
          overlay && /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.18)" }, children: overlay })
        ] }),
        (title || subtitle || children) && /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: "var(--space-4) var(--space-5)" }, children: [
          title && /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h3)", color: "var(--text)", margin: 0, lineHeight: "var(--leading-snug)" }, children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", margin: "4px 0 0", lineHeight: "var(--leading-normal)" }, children: subtitle }),
          children && /* @__PURE__ */ jsx("div", { style: { marginTop: "auto", paddingTop: "var(--space-4)" }, children })
        ] })
      ]
    }
  );
}
function NotificationItem({
  icon,
  avatar,
  title,
  body,
  time,
  unread = false,
  onClick,
  tone = "accent",
  style = {},
  ...rest
}) {
  const toneColor = { accent: "var(--accent)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)" }[tone] || "var(--accent)";
  const [hover, setHover] = React.useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: onClick ? "button" : void 0,
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        borderRadius: "var(--radius-sm)",
        background: hover && onClick ? "var(--accent-light)" : unread ? "var(--accent-glass)" : "transparent",
        cursor: onClick ? "pointer" : "default",
        transition: "background var(--dur-fast) var(--ease-out)",
        fontFamily: "var(--font-ui)",
        position: "relative",
        ...style
      },
      ...rest,
      children: [
        (icon || avatar) && /* @__PURE__ */ jsx("div", { style: { flex: "none", marginTop: 2 }, children: avatar || /* @__PURE__ */ jsx("span", { style: {
          width: 36,
          height: 36,
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          background: "var(--accent-glass)",
          color: toneColor,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18
        }, children: icon }) }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-body-sm)", color: "var(--text)", fontWeight: unread ? 600 : 500 }, children: title }),
          body && /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)", marginTop: 2, lineHeight: 1.5 }, children: body })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }, children: [
          time && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-mini)", color: "var(--text-muted)", whiteSpace: "nowrap" }, children: time }),
          unread && /* @__PURE__ */ jsx(LiquidBubble, { size: 9, color: toneColor })
        ] })
      ]
    }
  );
}
function Carousel({
  children,
  itemWidth = "100%",
  gap = 16,
  showArrows = true,
  showDots = true,
  style = {},
  ...rest
}) {
  const trackRef = React.useRef(null);
  const items = React.Children.toArray(children);
  const [active, setActive] = React.useState(0);
  const isProgrammatic = React.useRef(false);
  const programmaticTimer = React.useRef(null);
  const scrollTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, items.length - 1));
    const child = track.children[clamped];
    if (child) {
      isProgrammatic.current = true;
      clearTimeout(programmaticTimer.current);
      programmaticTimer.current = setTimeout(() => {
        isProgrammatic.current = false;
      }, 400);
      track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setActive(clamped);
  };
  const onScroll = () => {
    if (isProgrammatic.current) return;
    const track = trackRef.current;
    if (!track) return;
    let nearest = 0, min = Infinity;
    [...track.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };
  const navBtn = (dir) => /* @__PURE__ */ jsx(
    "button",
    {
      "aria-label": dir < 0 ? "Previous" : "Next",
      onClick: () => scrollTo(active + dir),
      style: {
        width: 38,
        height: 38,
        flex: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
        color: "var(--text)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background var(--dur-fast) var(--ease-out)"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent-light)",
      onMouseLeave: (e) => e.currentTarget.style.background = "var(--surface)",
      children: /* @__PURE__ */ jsx("i", { className: `ph ph-caret-${dir < 0 ? "left" : "right"}`, style: { fontSize: 17 } })
    }
  );
  return /* @__PURE__ */ jsxs("div", { style: { fontFamily: "var(--font-ui)", ...style }, ...rest, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      showArrows && navBtn(-1),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: trackRef,
          onScroll,
          style: {
            display: "flex",
            gap,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            flex: 1,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "4px 0"
          },
          children: items.map((child, i) => /* @__PURE__ */ jsx("div", { style: { flex: `0 0 ${itemWidth}`, scrollSnapAlign: "start", minWidth: 0 }, children: child }, i))
        }
      ),
      showArrows && navBtn(1)
    ] }),
    showDots && items.length > 1 && /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center", gap: 8, marginTop: 14 }, children: items.map((_, i) => /* @__PURE__ */ jsx("button", { "aria-label": `Go to slide ${i + 1}`, onClick: () => scrollTo(i), style: { border: "none", background: "transparent", cursor: "pointer", padding: 2, display: "inline-flex" }, children: /* @__PURE__ */ jsx(
      LiquidBubble,
      {
        size: i === active ? 11 : 8,
        variant: "filled",
        color: i === active ? void 0 : "var(--border)",
        animate: i === active,
        thickness: 1.5,
        style: {
          transition: "width var(--dur-fast) var(--ease-spring), height var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-out)"
        }
      }
    ) }, i)) })
  ] });
}
function Monogram({
  size = 120,
  letter = "A",
  animate = true,
  style = {},
  ...rest
}) {
  const fontSize = Math.round(size * 0.52);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "img",
      "aria-label": `Aqus monogram`,
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flex: "none",
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: {
          position: "absolute",
          inset: 0,
          background: "linear-gradient(140deg, var(--accent-mid), var(--accent) 55%, var(--accent-hover))",
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          animation: animate ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none",
          boxShadow: "0 8px 20px rgba(0,0,0,0.22), inset 0 " + Math.round(size * 0.05) + "px " + Math.round(size * 0.11) + "px rgba(255,255,255,0.45)"
        } }),
        /* @__PURE__ */ jsx("span", { style: {
          position: "relative",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize,
          lineHeight: 1,
          color: "var(--on-accent)",
          textShadow: "0 -1px 2px rgba(0,0,0,0.25)"
        }, children: letter })
      ]
    }
  );
}
function Wordmark({
  size = 56,
  animate = true,
  color = "var(--text)",
  style = {},
  ...rest
}) {
  const blob = Math.round(size * 1.06);
  const sGlyph = Math.round(size * 0.76);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "img",
      "aria-label": "Aqus",
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        fontSize: size,
        display: "inline-flex",
        alignItems: "baseline",
        ...style
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { style: { color }, children: "Aqu" }),
        /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", style: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: blob,
          height: blob,
          marginLeft: Math.round(size * 0.03),
          verticalAlign: -Math.round(size * 0.19)
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            position: "absolute",
            inset: 0,
            background: "linear-gradient(140deg, var(--accent-mid), var(--accent) 60%, var(--accent-hover))",
            borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            animation: animate ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none",
            boxShadow: "0 6px 16px rgba(0,0,0,0.22), inset 0 4px 10px rgba(255,255,255,0.42)"
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            position: "relative",
            color: "var(--on-accent)",
            fontSize: sGlyph,
            fontWeight: 900,
            textShadow: "0 -1px 2px rgba(0,0,0,0.25)"
          }, children: "s" })
        ] })
      ]
    }
  );
}
const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--chart-6)", "var(--chart-7)", "var(--chart-8)"];
function ChartLegend({ series = [], direction = "row", style = {}, ...rest }) {
  return /* @__PURE__ */ jsx("div", { style: {
    display: "flex",
    flexDirection: direction,
    flexWrap: "wrap",
    gap: direction === "row" ? "var(--space-4)" : "var(--space-2)",
    fontFamily: "var(--font-ui)",
    ...style
  }, ...rest, children: series.map((s, i) => /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 7 }, children: [
    /* @__PURE__ */ jsx(LiquidBubble, { size: 10, color: s.color || PALETTE[i % PALETTE.length], animate: false }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-label)", color: "var(--text-muted)", fontWeight: "var(--weight-medium)" }, children: s.label })
  ] }, s.key ?? i)) });
}
const CHART_PALETTE = PALETTE;
function BarChart({
  data = [],
  series = [],
  height = 240,
  stacked = false,
  showGrid = true,
  showLegend = true,
  yTicks = 4,
  valueFormat = (v) => v,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  const [hover, setHover] = React.useState(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const padL = 44, padR = 16, padT = 14, padB = 28;
  const innerW = Math.max(0, w - padL - padR);
  const innerH = height - padT - padB;
  const totals = data.map((d) => stacked ? series.reduce((a, s) => a + (+d[s.key] || 0), 0) : Math.max(...series.map((s) => +d[s.key] || 0)));
  const maxV = Math.max(1, ...totals);
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => maxV * i / yTicks);
  const groupW = innerW / Math.max(1, data.length);
  const colorOf = (s, i) => s.color || CHART_PALETTE[i % CHART_PALETTE.length];
  const yAt = (v) => padT + innerH - v / maxV * innerH;
  const barGap = 0.22;
  const bw = stacked ? groupW * (1 - barGap) : groupW * (1 - barGap) / series.length;
  return /* @__PURE__ */ jsxs("div", { ref, onMouseMove: (e) => setPos({ x: e.clientX, y: e.clientY }), style: { width: "100%", fontFamily: "var(--font-ui)", position: "relative", ...style }, ...rest, children: [
    /* @__PURE__ */ jsxs("svg", { width: "100%", height, viewBox: `0 0 ${w} ${height}`, style: { display: "block", overflow: "visible" }, children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "aqus-bar-gloss", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.28)" }),
        /* @__PURE__ */ jsx("stop", { offset: "42%", stopColor: "rgba(255,255,255,0)" })
      ] }) }),
      showGrid && ticks.map((t, i) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: padL, y1: yAt(t), x2: w - padR, y2: yAt(t), stroke: "var(--chart-grid)", strokeWidth: "1", strokeDasharray: i === 0 ? "0" : "3 4", opacity: i === 0 ? 1 : 0.6 }),
        /* @__PURE__ */ jsx("text", { x: padL - 8, y: yAt(t) + 4, textAnchor: "end", fontSize: "11", fill: "var(--chart-axis)", children: valueFormat(Math.round(t)) })
      ] }, i)),
      data.map((d, gi) => {
        const gx = padL + gi * groupW + groupW * barGap / 2;
        const colPath = (x, y, bwid, h, round) => {
          if (h <= 0) return "";
          if (!round) return `M${x},${y.toFixed(1)} L${(x + bwid).toFixed(1)},${y.toFixed(1)} L${(x + bwid).toFixed(1)},${(y + h).toFixed(1)} L${x},${(y + h).toFixed(1)} Z`;
          const rad = Math.min(bwid / 2, h, 14);
          return `M${x},${(y + h).toFixed(1)} L${x},${(y + rad).toFixed(1)} Q${x},${y.toFixed(1)} ${(x + rad).toFixed(1)},${y.toFixed(1)} L${(x + bwid - rad).toFixed(1)},${y.toFixed(1)} Q${(x + bwid).toFixed(1)},${y.toFixed(1)} ${(x + bwid).toFixed(1)},${(y + rad).toFixed(1)} L${(x + bwid).toFixed(1)},${(y + h).toFixed(1)} Z`;
        };
        if (stacked) {
          const total = series.reduce((a, s) => a + (+d[s.key] || 0), 0);
          const totalH = total / maxV * innerH;
          const topY = yAt(0) - totalH;
          let segTop = yAt(0);
          const lastNonZero = [...series].reverse().findIndex((s) => (+d[s.key] || 0) > 0);
          const topIdx = lastNonZero === -1 ? -1 : series.length - 1 - lastNonZero;
          return /* @__PURE__ */ jsxs("g", { onMouseEnter: () => setHover(gi), onMouseLeave: () => setHover(null), children: [
            /* @__PURE__ */ jsx("rect", { x: padL + gi * groupW, y: padT, width: groupW, height: innerH, fill: hover === gi ? "var(--accent-glass)" : "transparent", rx: "6" }),
            series.map((s, si) => {
              const v = +d[s.key] || 0;
              const h = v / maxV * innerH;
              const y = segTop - h;
              segTop -= h;
              return /* @__PURE__ */ jsx("path", { d: colPath(gx, y, bw, h, si === topIdx), fill: colorOf(s, si) }, si);
            }),
            /* @__PURE__ */ jsx("path", { d: colPath(gx, topY, bw, totalH, true), fill: "url(#aqus-bar-gloss)" }),
            /* @__PURE__ */ jsx("text", { x: padL + gi * groupW + groupW / 2, y: height - 8, textAnchor: "middle", fontSize: "11", fill: "var(--chart-axis)", children: d.x })
          ] }, gi);
        }
        return /* @__PURE__ */ jsxs("g", { onMouseEnter: () => setHover(gi), onMouseLeave: () => setHover(null), children: [
          /* @__PURE__ */ jsx("rect", { x: padL + gi * groupW, y: padT, width: groupW, height: innerH, fill: hover === gi ? "var(--accent-glass)" : "transparent", rx: "6" }),
          series.map((s, si) => {
            const v = +d[s.key] || 0;
            const h = v / maxV * innerH;
            const cw = Math.max(0, bw - 3);
            const x = gx + si * bw, y = yAt(v);
            return /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx("path", { d: colPath(x, y, cw, h, true), fill: colorOf(s, si) }),
              /* @__PURE__ */ jsx("path", { d: colPath(x, y, cw, h, true), fill: "url(#aqus-bar-gloss)" })
            ] }, si);
          }),
          /* @__PURE__ */ jsx("text", { x: padL + gi * groupW + groupW / 2, y: height - 8, textAnchor: "middle", fontSize: "11", fill: "var(--chart-axis)", children: d.x })
        ] }, gi);
      })
    ] }),
    hover != null && ReactDOM.createPortal(
      (() => {
        const total = stacked ? series.reduce((a, s) => a + (+data[hover][s.key] || 0), 0) : null;
        return /* @__PURE__ */ jsxs("div", { style: {
          position: "fixed",
          left: pos.x + (pos.x > window.innerWidth * 0.65 ? -12 : 14),
          top: pos.y - 32,
          transform: pos.x > window.innerWidth * 0.65 ? "translateX(-100%)" : void 0,
          background: "var(--chart-tooltip-bg)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          border: "1px solid var(--glass-border-light)",
          borderBottomColor: "var(--glass-border-dark)",
          boxShadow: "var(--shadow-glass)",
          borderRadius: "var(--radius-md)",
          padding: "8px 12px",
          pointerEvents: "none",
          zIndex: 9999,
          minWidth: 104,
          fontFamily: "var(--font-ui)"
        }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-mini)", fontWeight: 700, color: "var(--text-muted)", marginBottom: 4, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase" }, children: data[hover].x }),
          series.map((s, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-body-sm)" }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: 8, height: 8, borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%", background: colorOf(s, i), flex: "none" } }),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)", flex: 1 }, children: s.label }),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--text)", fontWeight: 600 }, children: valueFormat(+data[hover][s.key] || 0) })
          ] }, i)),
          stacked && series.length > 1 && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-body-sm)", marginTop: 4, paddingTop: 4, borderTop: "1px solid var(--border)" }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: 8, flex: "none" } }),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)", flex: 1, fontWeight: 600 }, children: "Total" }),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--text)", fontWeight: 700 }, children: valueFormat(total) })
          ] })
        ] });
      })(),
      document.body
    ),
    showLegend && series.length > 1 && /* @__PURE__ */ jsx(ChartLegend, { series, style: { marginTop: "var(--space-3)", paddingLeft: padL } })
  ] });
}
function liquidBlobAt(cx, cy, r) {
  const k = r;
  return `M${cx},${(cy - k * 1.02).toFixed(2)} C${(cx + k * 0.95).toFixed(2)},${(cy - k * 1).toFixed(2)} ${(cx + k * 1.05).toFixed(2)},${(cy + k * 0.35).toFixed(2)} ${(cx + k * 0.88).toFixed(2)},${(cy + k * 0.7).toFixed(2)} C${(cx + k * 0.72).toFixed(2)},${(cy + k * 1.04).toFixed(2)} ${(cx - k * 0.5).toFixed(2)},${(cy + k * 1.06).toFixed(2)} ${(cx - k * 0.82).toFixed(2)},${(cy + k * 0.74).toFixed(2)} C${(cx - k * 1.04).toFixed(2)},${(cy + k * 0.4).toFixed(2)} ${(cx - k * 1).toFixed(2)},${(cy - k * 0.62).toFixed(2)} ${(cx - k * 0.72).toFixed(2)},${(cy - k * 0.86).toFixed(2)} C${(cx - k * 0.46).toFixed(2)},${(cy - k * 1.06).toFixed(2)} ${(cx - k * 0.36).toFixed(2)},${(cy - k * 1.04).toFixed(2)} ${cx},${(cy - k * 1.02).toFixed(2)} Z`;
}
function LineChart({
  data = [],
  series = [],
  height = 240,
  area = false,
  showGrid = true,
  showLegend = true,
  yTicks = 4,
  smooth = true,
  smoothTension = 1,
  valueFormat = (v) => v,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  const [hover, setHover] = React.useState(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const padL = 44, padR = 16, padT = 14, padB = 28;
  const innerW = Math.max(0, w - padL - padR);
  const innerH = height - padT - padB;
  const allVals = data.flatMap((d) => series.map((s) => +d[s.key] || 0));
  const maxV = Math.max(1, ...allVals);
  const minV = Math.min(0, ...allVals);
  const range = maxV - minV || 1;
  const xAt = (i) => padL + (data.length <= 1 ? innerW / 2 : i / (data.length - 1) * innerW);
  const yAt = (v) => padT + innerH - (v - minV) / range * innerH;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => minV + range * i / yTicks);
  const colorOf = (s, i) => s.color || CHART_PALETTE[i % CHART_PALETTE.length];
  const linePath = (s) => {
    const pts = data.map((d2, i) => [xAt(i), yAt(+d2[s.key] || 0)]);
    if (pts.length < 2) return pts.length ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` : "";
    if (!smooth) return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const t = 0.5 * smoothTension;
      const c1x = p1[0] + (p2[0] - p0[0]) * t / 3;
      const c1y = p1[1] + (p2[1] - p0[1]) * t / 3;
      const c2x = p2[0] - (p3[0] - p1[0]) * t / 3;
      const c2y = p2[1] - (p3[1] - p1[1]) * t / 3;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const areaPath = (s) => `${linePath(s)} L${xAt(data.length - 1).toFixed(1)},${yAt(minV).toFixed(1)} L${xAt(0).toFixed(1)},${yAt(minV).toFixed(1)} Z`;
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * w;
    let nearest = 0, min = Infinity;
    data.forEach((_, i) => {
      const d = Math.abs(xAt(i) - x);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setHover(nearest);
    setPos({ x: e.clientX, y: e.clientY });
  };
  return /* @__PURE__ */ jsxs("div", { ref, style: { width: "100%", fontFamily: "var(--font-ui)", position: "relative", ...style }, ...rest, children: [
    /* @__PURE__ */ jsxs("svg", { width: "100%", height, viewBox: `0 0 ${w} ${height}`, onMouseMove: onMove, onMouseLeave: () => setHover(null), style: { display: "block", overflow: "visible" }, children: [
      /* @__PURE__ */ jsx("defs", { children: series.map((s, i) => /* @__PURE__ */ jsxs("linearGradient", { id: `aqus-line-fill-${i}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: colorOf(s, i), stopOpacity: "var(--chart-fill-from)" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: colorOf(s, i), stopOpacity: "var(--chart-fill-to)" })
      ] }, i)) }),
      showGrid && ticks.map((t, i) => /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: padL, y1: yAt(t), x2: w - padR, y2: yAt(t), stroke: "var(--chart-grid)", strokeWidth: "1", strokeDasharray: i === 0 ? "0" : "3 4", opacity: i === 0 ? 1 : 0.6 }),
        /* @__PURE__ */ jsx("text", { x: padL - 8, y: yAt(t) + 4, textAnchor: "end", fontSize: "11", fill: "var(--chart-axis)", children: valueFormat(Math.round(t)) })
      ] }, i)),
      data.map((d, i) => /* @__PURE__ */ jsx("text", { x: xAt(i), y: height - 8, textAnchor: "middle", fontSize: "11", fill: "var(--chart-axis)", children: d.x }, i)),
      area && series.map((s, i) => /* @__PURE__ */ jsx("path", { d: areaPath(s), fill: `url(#aqus-line-fill-${i})` }, `a${i}`)),
      series.map((s, i) => /* @__PURE__ */ jsx("path", { d: linePath(s), fill: "none", stroke: colorOf(s, i), strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, `l${i}`)),
      data.length > 0 && series.map((s, i) => {
        const ex = xAt(data.length - 1), ey = yAt(+data[data.length - 1][s.key] || 0);
        return /* @__PURE__ */ jsxs("g", { style: { transformOrigin: `${ex}px ${ey}px` }, children: [
          /* @__PURE__ */ jsxs("circle", { cx: ex, cy: ey, r: "7", fill: colorOf(s, i), opacity: "0.18", children: [
            /* @__PURE__ */ jsx("animate", { attributeName: "r", values: "6;10;6", dur: "2.4s", repeatCount: "indefinite" }),
            /* @__PURE__ */ jsx("animate", { attributeName: "opacity", values: "0.22;0.05;0.22", dur: "2.4s", repeatCount: "indefinite" })
          ] }),
          /* @__PURE__ */ jsx("path", { d: liquidBlobAt(ex, ey, 4.5), fill: colorOf(s, i), stroke: "var(--surface)", strokeWidth: "1.5" })
        ] }, `end${i}`);
      }),
      hover != null && /* @__PURE__ */ jsx("line", { x1: xAt(hover), y1: padT, x2: xAt(hover), y2: padT + innerH, stroke: "var(--accent)", strokeWidth: "1", opacity: "0.4" }),
      hover != null && series.map((s, i) => /* @__PURE__ */ jsx("circle", { cx: xAt(hover), cy: yAt(+data[hover][s.key] || 0), r: "4.5", fill: "var(--surface)", stroke: colorOf(s, i), strokeWidth: "2.5" }, `p${i}`))
    ] }),
    hover != null && ReactDOM.createPortal(
      /* @__PURE__ */ jsxs("div", { style: {
        position: "fixed",
        left: pos.x + (pos.x > window.innerWidth * 0.65 ? -12 : 14),
        top: pos.y - 32,
        transform: pos.x > window.innerWidth * 0.65 ? "translateX(-100%)" : void 0,
        background: "var(--chart-tooltip-bg)",
        WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
        border: "1px solid var(--glass-border-light)",
        borderBottomColor: "var(--glass-border-dark)",
        boxShadow: "var(--shadow-glass)",
        borderRadius: "var(--radius-md)",
        padding: "8px 12px",
        pointerEvents: "none",
        zIndex: 9999,
        minWidth: 96,
        fontFamily: "var(--font-ui)"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: "var(--text-mini)", fontWeight: 700, color: "var(--text-muted)", marginBottom: 4, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase" }, children: data[hover].x }),
        series.map((s, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-body-sm)" }, children: [
          /* @__PURE__ */ jsx("span", { style: { width: 8, height: 8, borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%", background: colorOf(s, i), flex: "none" } }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)", flex: 1 }, children: s.label }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--text)", fontWeight: 600 }, children: valueFormat(+data[hover][s.key] || 0) })
        ] }, i))
      ] }),
      document.body
    ),
    showLegend && series.length > 0 && /* @__PURE__ */ jsx(ChartLegend, { series, style: { marginTop: "var(--space-3)", paddingLeft: padL } })
  ] });
}
function DonutChart({
  data = [],
  size = 200,
  thickness = 26,
  gap = 2,
  morph = true,
  centerLabel,
  centerValue,
  showLegend = true,
  valueFormat = (v) => v,
  style = {},
  ...rest
}) {
  const total = data.reduce((a, d) => a + (+d.value || 0), 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const gapLen = gap / 360 * circ;
  let offset = 0;
  const segs = data.map((d, i) => {
    const frac = (+d.value || 0) / total;
    const len = frac * circ;
    const seg = { d, i, len, offset, color: d.color || CHART_PALETTE[i % CHART_PALETTE.length] };
    offset += len;
    return seg;
  });
  const legendSeries = data.map((d, i) => ({ label: d.label, color: d.color || CHART_PALETTE[i % CHART_PALETTE.length] }));
  const [hover, setHover] = React.useState(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "var(--space-6)", flexWrap: "wrap", fontFamily: "var(--font-ui)", ...style }, ...rest, children: [
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: size, height: size, flex: "none" }, children: [
      /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { transform: "rotate(-90deg)", animation: morph ? "agus-liquid var(--dur-liquid) var(--ease-inout) infinite" : "none", overflow: "visible" }, children: [
        /* @__PURE__ */ jsx("circle", { cx, cy, r, fill: "none", stroke: "var(--chart-track)", strokeWidth: thickness }),
        segs.map((s) => /* @__PURE__ */ jsx(
          "circle",
          {
            cx,
            cy,
            r,
            fill: "none",
            stroke: s.color,
            strokeWidth: hover === s.i ? thickness + 5 : thickness,
            strokeDasharray: `${Math.max(0, s.len - gapLen)} ${circ - Math.max(0, s.len - gapLen)}`,
            strokeDashoffset: -s.offset,
            strokeLinecap: "round",
            opacity: hover == null || hover === s.i ? 1 : 0.4,
            style: { cursor: "pointer", transition: "opacity var(--dur-fast) var(--ease-out), stroke-width var(--dur-fast) var(--ease-out)" },
            onMouseEnter: () => setHover(s.i),
            onMouseLeave: () => setHover(null),
            onMouseMove: (e) => setPos({ x: e.clientX, y: e.clientY })
          },
          s.i
        ))
      ] }),
      (centerValue != null || centerLabel) && /* @__PURE__ */ jsxs("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none" }, children: [
        centerValue != null && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: Math.round(size * 0.2), color: "var(--text)", lineHeight: 1 }, children: centerValue }),
        centerLabel && /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-caption)", color: "var(--text-muted)", marginTop: 2 }, children: centerLabel })
      ] }),
      hover != null && ReactDOM.createPortal(
        /* @__PURE__ */ jsx("div", { style: {
          position: "fixed",
          left: pos.x + (pos.x > window.innerWidth * 0.65 ? -12 : 14),
          top: pos.y - 32,
          transform: pos.x > window.innerWidth * 0.65 ? "translateX(-100%)" : void 0,
          background: "var(--chart-tooltip-bg)",
          WebkitBackdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          backdropFilter: "blur(var(--glass-blur)) saturate(1.6)",
          border: "1px solid var(--glass-border-light)",
          borderBottomColor: "var(--glass-border-dark)",
          boxShadow: "var(--shadow-glass)",
          borderRadius: "var(--radius-md)",
          padding: "7px 11px",
          pointerEvents: "none",
          zIndex: 9999,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-ui)"
        }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: "var(--text-body-sm)" }, children: [
          /* @__PURE__ */ jsx("span", { style: { width: 8, height: 8, borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%", background: segs[hover].color, flex: "none" } }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--text-muted)" }, children: data[hover].label }),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--text)", fontWeight: 700 }, children: valueFormat(+data[hover].value || 0) }),
          /* @__PURE__ */ jsxs("span", { style: { color: "var(--text-muted)", fontSize: "var(--text-caption)" }, children: [
            "· ",
            Math.round((+data[hover].value || 0) / total * 100),
            "%"
          ] })
        ] }) }),
        document.body
      )
    ] }),
    showLegend && /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)" }, children: data.map((d, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        onMouseEnter: () => setHover(i),
        onMouseLeave: () => setHover(null),
        onMouseMove: (e) => setPos({ x: e.clientX, y: e.clientY }),
        style: { display: "flex", alignItems: "center", gap: 8, cursor: "default", opacity: hover == null || hover === i ? 1 : 0.5, transition: "opacity var(--dur-fast) var(--ease-out)" },
        children: [
          /* @__PURE__ */ jsx("span", { style: { width: 10, height: 10, borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%", background: legendSeries[i].color, flex: "none" } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-body-sm)", color: "var(--text-muted)", flex: 1 }, children: d.label }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "var(--text-body-sm)", color: "var(--text)", fontWeight: 600 }, children: valueFormat(+d.value || 0) })
        ]
      },
      i
    )) })
  ] });
}
function Sparkline({
  data = [],
  width = 96,
  height = 28,
  color = "var(--accent)",
  area = true,
  endDot = true,
  smooth = true,
  strokeWidth = 1.75,
  style = {},
  ...rest
}) {
  const vals = data.map(Number);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = max - min || 1;
  const pad = strokeWidth + 1;
  const xAt = (i) => pad + (vals.length <= 1 ? 0 : i / (vals.length - 1) * (width - pad * 2));
  const yAt = (v) => pad + (height - pad * 2) - (v - min) / range * (height - pad * 2);
  const pts = vals.map((v, i) => [xAt(i), yAt(v)]);
  const line = (() => {
    if (pts.length < 2) return pts.length ? `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` : "";
    if (!smooth) return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  })();
  const fill = `${line} L${xAt(vals.length - 1).toFixed(1)},${height} L${xAt(0).toFixed(1)},${height} Z`;
  const uid = React.useId().replace(/:/g, "");
  return /* @__PURE__ */ jsxs("svg", { width, height, viewBox: `0 0 ${width} ${height}`, style: { display: "inline-block", verticalAlign: "middle", overflow: "visible", ...style }, ...rest, children: [
    area && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: `spark-${uid}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: color, stopOpacity: "var(--chart-fill-from)" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: color, stopOpacity: "var(--chart-fill-to)" })
      ] }) }),
      /* @__PURE__ */ jsx("path", { d: fill, fill: `url(#spark-${uid})` })
    ] }),
    /* @__PURE__ */ jsx("path", { d: line, fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" }),
    endDot && vals.length > 0 && /* @__PURE__ */ jsx("circle", { cx: xAt(vals.length - 1), cy: yAt(vals[vals.length - 1]), r: strokeWidth + 1, fill: color })
  ] });
}
export {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Banner,
  BarChart,
  BlogCard,
  Breadcrumb,
  Button,
  CHART_PALETTE,
  Card,
  Carousel,
  ChartLegend,
  Checkbox,
  CodeBlock,
  ColorPicker,
  Combobox,
  CommandPalette,
  Container,
  ContextMenu,
  DatePicker,
  DescriptionList,
  Dialog,
  Divider,
  DonutChart,
  Drawer,
  EmptyState,
  FeatureCard,
  FileDropzone,
  FilterBar,
  Footer,
  GlassPanel,
  HeroSection,
  IconButton,
  Input,
  Kbd,
  LineChart,
  LiquidBubble,
  LoadingOverlay,
  MediaCard,
  Menu,
  Monogram,
  MultiSelect,
  NavBar,
  NotificationItem,
  NumberInput,
  OTPInput,
  PageHeader,
  Pagination,
  Popover,
  Progress,
  ProgressCircle,
  Prose,
  Radio,
  SearchInput,
  Section,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Sparkline,
  Spinner,
  Stack,
  StatCard,
  Stepper,
  Switch,
  Table,
  Tabs,
  Tag,
  TestimonialCard,
  Textarea,
  Timeline,
  Toast,
  ToggleGroup,
  Tooltip,
  TreeView,
  Wordmark
};
//# sourceMappingURL=aqus.es.js.map
