import React from 'react'
import ReactDOM from 'react-dom'
import {
  NavBar, Container, Section, Stack, Button, Card, MediaCard, Badge,
  Tag, SearchInput, IconButton, Divider, Dialog, Stepper, Input, Tooltip,
  Carousel, FeatureCard, EmptyState, Toast, Spinner,
} from '@agustin/aqus'

// ── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home', 'Books']

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 89, cat: 'Electronics', tag: 'Best seller', tagTone: 'accent',  icon: 'ph-headphones',      grad: '145deg, oklch(0.55 0.18 260), oklch(0.40 0.22 280)' },
  { id: 2, name: 'Merino Crewneck',     price: 64, cat: 'Apparel',     tag: 'New',         tagTone: 'success', icon: 'ph-t-shirt',          grad: '145deg, oklch(0.60 0.14 155), oklch(0.45 0.18 170)' },
  { id: 3, name: 'Desk Lamp Pro',       price: 44, cat: 'Home',        tag: null,          tagTone: null,      icon: 'ph-lamp',             grad: '145deg, oklch(0.65 0.15 42),  oklch(0.50 0.18 55)'  },
  { id: 4, name: 'Design Systems Book', price: 38, cat: 'Books',       tag: 'Staff pick',  tagTone: 'warning', icon: 'ph-book-bookmark',    grad: '145deg, oklch(0.58 0.16 320), oklch(0.44 0.20 335)' },
  { id: 5, name: 'Mechanical Keyboard', price: 129, cat: 'Electronics',tag: 'Limited',     tagTone: 'danger',  icon: 'ph-keyboard',         grad: '145deg, oklch(0.52 0.19 255), oklch(0.38 0.22 270)' },
  { id: 6, name: 'Linen Tote Bag',      price: 28, cat: 'Apparel',     tag: null,          tagTone: null,      icon: 'ph-bag-simple',       grad: '145deg, oklch(0.68 0.12 95),  oklch(0.55 0.14 105)' },
  { id: 7, name: 'Scented Candle Set',  price: 36, cat: 'Home',        tag: 'New',         tagTone: 'success', icon: 'ph-fire',             grad: '145deg, oklch(0.62 0.15 200), oklch(0.48 0.18 215)' },
  { id: 8, name: 'Typography Handbook', price: 42, cat: 'Books',       tag: null,          tagTone: null,      icon: 'ph-article',          grad: '145deg, oklch(0.66 0.12 275), oklch(0.52 0.15 285)' },
]

const COLLECTIONS = [
  { name: 'Summer Essentials', sub: '24 items · updated June 2026', grad: '135deg, oklch(0.65 0.18 42), oklch(0.50 0.22 25)' },
  { name: 'Work From Anywhere', sub: '18 items · productivity picks', grad: '135deg, oklch(0.55 0.20 260), oklch(0.40 0.22 280)' },
  { name: 'Gift Ideas under $50', sub: '31 items · all categories', grad: '135deg, oklch(0.60 0.15 155), oklch(0.45 0.18 170)' },
  { name: 'Design Desk Setup', sub: '12 items · curated by the team', grad: '135deg, oklch(0.58 0.16 320), oklch(0.44 0.20 335)' },
]

const CHECKOUT_STEPS = [
  { label: 'Cart',     description: 'Review items' },
  { label: 'Shipping', description: 'Delivery address' },
  { label: 'Payment',  description: 'Card details' },
  { label: 'Confirm',  description: 'Order placed' },
]

function useToast() {
  const [t, setT] = React.useState({ show: false, title: '', tone: 'accent' })
  const fire = React.useCallback((title, tone = 'accent') => {
    setT({ show: true, title, tone })
    setTimeout(() => setT(x => ({ ...x, show: false })), 2800)
  }, [])
  return [t, fire]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function StorefrontExample() {
  const [activeNav,  setActiveNav]  = React.useState('#shop')
  const [cat,        setCat]        = React.useState('All')
  const [q,          setQ]          = React.useState('')
  const [cart,       setCart]       = React.useState([])
  const [cartOpen,   setCartOpen]   = React.useState(false)
  const [step,       setStep]       = React.useState(0)
  const [shipping,   setShipping]   = React.useState({ name: '', address: '', city: '' })
  const [payment,    setPayment]    = React.useState({ card: '', expiry: '', cvv: '' })
  const [placing,    setPlacing]    = React.useState(false)
  const [toast,      fireToast]     = useToast()

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)

  const addToCart = (product) => {
    setCart(cs => {
      const existing = cs.find(i => i.id === product.id)
      return existing
        ? cs.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...cs, { ...product, qty: 1 }]
    })
    fireToast(`${product.name} added to cart`, 'success')
  }

  const removeFromCart = (id) => setCart(cs => cs.filter(i => i.id !== id))

  const placeOrder = () => {
    setPlacing(true)
    setTimeout(() => { setPlacing(false); setStep(3) }, 1200)
  }

  const closeCart = () => { setCartOpen(false); setTimeout(() => setStep(0), 300) }

  const section = activeNav.slice(1)

  const visible = PRODUCTS.filter(p =>
    (cat === 'All' || p.cat === cat) &&
    p.name.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      <NavBar
        links={[
          { href: '#shop',        label: 'Shop' },
          { href: '#collections', label: 'Collections' },
          { href: '#about',       label: 'About' },
        ]}
        activeHref={activeNav}
        onLinkClick={(l) => { setActiveNav(l.href) }}
        action={
          <Stack direction="row" gap={2} align="center">
            <Tooltip label={cartCount ? `${cartCount} item${cartCount > 1 ? 's' : ''} in cart` : 'Cart is empty'}>
              <div style={{ position: 'relative' }}>
                <IconButton variant="soft" label="Cart" onClick={() => setCartOpen(true)}>
                  <i className="ph ph-shopping-cart" />
                </IconButton>
                {cartCount > 0 && (
                  <Badge tone="accent" pill style={{ position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, fontSize: 10, padding: '0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartCount}
                  </Badge>
                )}
              </div>
            </Tooltip>
            <Button variant="primary" size="sm">Sign in</Button>
          </Stack>
        }
      />

      {/* ── Shop ──────────────────────────────────────────────── */}
      {section === 'shop' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <Stack direction="row" gap={3} align="center" justify="space-between" wrap>
                <Stack direction="row" gap={2} wrap>
                  {CATEGORIES.map(c => (
                    <Tag
                      key={c}
                      onClick={() => setCat(c)}
                      style={{
                        cursor: 'pointer',
                        background: cat === c ? 'var(--accent)' : undefined,
                        color: cat === c ? 'var(--on-accent)' : undefined,
                        borderColor: cat === c ? 'var(--accent)' : undefined,
                        transition: 'var(--transition-hover)',
                      }}
                    >
                      {c}
                    </Tag>
                  ))}
                </Stack>
                <SearchInput value={q} onChange={setQ} placeholder="Search products…" size="sm" />
              </Stack>

              {visible.length === 0 ? (
                <EmptyState
                  icon={<i className="ph ph-magnifying-glass" />}
                  title="No products found"
                  description={`Nothing matches "${q}" in ${cat === 'All' ? 'all categories' : cat}.`}
                  action={<Button variant="secondary" onClick={() => { setQ(''); setCat('All') }}>Clear filters</Button>}
                />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 20, alignItems: 'stretch' }}>
                  {visible.map(p => (
                    <MediaCard
                      key={p.id}
                      media={
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(${p.grad})` }}>
                          <i className={`ph ${p.icon}`} style={{ fontSize: 52, color: 'rgba(255,255,255,0.85)' }} />
                        </div>
                      }
                      mediaHeight={160}
                      title={p.name}
                      subtitle={`$${p.price}`}
                      badge={p.tag ? <Badge tone={p.tagTone} pill>{p.tag}</Badge> : undefined}
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<i className="ph ph-shopping-cart-simple" />}
                        style={{ width: '100%' }}
                        onClick={() => addToCart(p)}
                      >
                        Add to cart
                      </Button>
                    </MediaCard>
                  ))}
                </div>
              )}
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Collections ───────────────────────────────────────── */}
      {section === 'collections' && (
        <Section size="md">
          <Container>
            <Stack gap={4}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 800 }}>
                Collections
              </h2>
              <Carousel itemWidth="280px" gap={16} showDots showArrows>
                {COLLECTIONS.map(c => (
                  <MediaCard
                    key={c.name}
                    media={
                      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', background: `linear-gradient(${c.grad})`, padding: 20 }}>
                        <strong style={{ color: '#fff', fontSize: 'var(--text-body)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{c.name}</strong>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-caption)', marginTop: 4 }}>{c.sub}</span>
                      </div>
                    }
                    mediaHeight={200}
                    onClick={() => {}}
                    style={{ width: 280 }}
                  />
                ))}
              </Carousel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, marginTop: 16 }}>
                <FeatureCard icon={<i className="ph ph-truck" />}         title="Free shipping"   description="On all orders over $50." />
                <FeatureCard icon={<i className="ph ph-arrow-counter-clockwise" />} title="30-day returns" description="No questions asked." />
                <FeatureCard icon={<i className="ph ph-shield-check" />}  title="Secure checkout" description="SSL encrypted payments." />
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── About ─────────────────────────────────────────────── */}
      {section === 'about' && (
        <Section size="md">
          <Container>
            <Stack gap={4} style={{ maxWidth: 560 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 800 }}>
                About this store
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                A showcase storefront built entirely with Aqus components — the same 76-component library
                powering production apps. Every button, card, badge, and dialog you see here is a real component.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: 16 }}>
                {[['76', 'Components used'], ['0', 'Custom CSS written'], ['5', 'Chart primitives'], ['100%', 'Design token driven']].map(([val, label]) => (
                  <Card key={label} variant="resting" style={{ padding: 20, textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)', fontWeight: 800, color: 'var(--accent)' }}>{val}</div>
                    <div className="sc-item-desc">{label}</div>
                  </Card>
                ))}
              </div>
            </Stack>
          </Container>
        </Section>
      )}

      {/* ── Cart / Checkout dialog ────────────────────────────── */}
      <Dialog
        open={cartOpen}
        onClose={closeCart}
        title={step === 3 ? 'Order confirmed' : 'Your cart'}
        actions={
          step === 0 ? (
            <>
              <Button variant="ghost" onClick={closeCart}>Keep shopping</Button>
              <Button variant="primary" disabled={cart.length === 0} onClick={() => setStep(1)}>
                Checkout ({cartCount})
              </Button>
            </>
          ) : step === 1 ? (
            <>
              <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button variant="primary" onClick={() => setStep(2)}>Continue</Button>
            </>
          ) : step === 2 ? (
            <>
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" pulse={placing} onClick={placeOrder} disabled={placing}>
                {placing ? 'Placing order…' : 'Place order'}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => { closeCart(); setCart([]) }}>Back to shop</Button>
          )
        }
      >
        <Stack gap={4}>
          {step < 3 && (
            <Stepper steps={CHECKOUT_STEPS} current={step} />
          )}

          {step === 0 && (
            <Stack gap={3}>
              {cart.length === 0 ? (
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--text-body-sm)' }}>
                  Your cart is empty. Add some products first.
                </p>
              ) : (
                <>
                  {cart.map(item => (
                    <Stack key={item.id} direction="row" align="center" justify="space-between" gap={3}>
                      <Stack direction="row" align="center" gap={2}>
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: `linear-gradient(${item.grad})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <i className={`ph ${item.icon}`} style={{ color: '#fff', fontSize: 18 }} />
                        </div>
                        <Stack gap={0}>
                          <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600 }}>{item.name}</span>
                          <span className="sc-foot-note">Qty: {item.qty} · ${item.price * item.qty}</span>
                        </Stack>
                      </Stack>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                        <i className="ph ph-x" />
                      </Button>
                    </Stack>
                  ))}
                  <Divider />
                  <Stack direction="row" justify="space-between">
                    <strong>Total</strong>
                    <strong>${cart.reduce((a, i) => a + i.price * i.qty, 0)}</strong>
                  </Stack>
                </>
              )}
            </Stack>
          )}

          {step === 1 && (
            <Stack gap={3}>
              <Input label="Full name"       value={shipping.name}    onChange={e => setShipping(s => ({ ...s, name: e.target.value }))} placeholder="Sofia Reyes" />
              <Input label="Street address"  value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="123 Main St" />
              <Input label="City"            value={shipping.city}    onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="New York" />
            </Stack>
          )}

          {step === 2 && (
            <Stack gap={3}>
              <Input label="Card number" value={payment.card}   onChange={e => setPayment(p => ({ ...p, card: e.target.value }))}   placeholder="4242 4242 4242 4242" icon={<i className="ph ph-credit-card" />} />
              <Stack direction="row" gap={3}>
                <Input label="Expiry" value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" />
                <Input label="CVV"    value={payment.cvv}    onChange={e => setPayment(p => ({ ...p, cvv: e.target.value }))}    placeholder="123"   />
              </Stack>
              {placing && (
                <Stack direction="row" align="center" gap={2} style={{ padding: '12px 0' }}>
                  <Spinner size={18} />
                  <span className="sc-item-desc">Processing payment…</span>
                </Stack>
              )}
            </Stack>
          )}

          {step === 3 && (
            <Stack gap={3} align="center" style={{ padding: '16px 0', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--success-light, oklch(0.92 0.08 145))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'var(--success, oklch(0.60 0.18 145))' }}>
                <i className="ph ph-check" />
              </div>
              <Stack gap={1}>
                <strong style={{ fontSize: 'var(--text-body)' }}>Order placed successfully!</strong>
                <span className="sc-item-desc">Confirmation sent to your email. Estimated delivery: 3–5 business days.</span>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Dialog>

      {/* ── Toast ──────────────────────────────────────────────── */}
      {toast.show && ReactDOM.createPortal(
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast tone={toast.tone} title={toast.title} onClose={() => {}} />
        </div>,
        document.body
      )}
    </div>
  )
}
