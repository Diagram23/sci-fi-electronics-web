/**
 * AuthModal — Sign In / Sign Up
 * Integrado con Supabase Auth via AuthContext
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, CheckCircle } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const AMBER     = '#C49A6C';
const AMBER_RGB = '196,154,108';

// ─── Field component ─────────────────────────────────────────────────────────
function Field({
  label, type, value, onChange, placeholder, icon: Icon, error,
}: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ElementType; error?: string;
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label style={{
        display: 'block', marginBottom: 8,
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: error ? '#E07070' : 'rgba(224,213,197,0.70)',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon
          size={15}
          style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? AMBER : 'rgba(196,154,108,0.45)',
            transition: 'color 0.2s',
            pointerEvents: 'none',
          }}
        />
        <input
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            paddingTop: 13, paddingBottom: 13,
            paddingLeft: 42, paddingRight: isPassword ? 44 : 14,
            background: focused ? 'rgba(196,154,108,0.04)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${error ? 'rgba(224,112,112,0.45)' : focused ? `rgba(${AMBER_RGB},0.45)` : 'rgba(255,255,255,0.10)'}`,
            borderRadius: 10,
            fontFamily: 'var(--font-body)', fontSize: '0.92rem',
            color: '#F4EFE8',
            outline: 'none',
            transition: 'all 0.2s',
            boxShadow: focused ? `0 0 0 3px rgba(${AMBER_RGB},0.08)` : 'none',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            style={{
              position: 'absolute', right: 12, top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(196,154,108,0.50)', padding: 4,
              display: 'flex', alignItems: 'center',
            }}
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {error && (
        <p style={{
          marginTop: 6, fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          color: '#E07070',
        }}>{error}</p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuthModal() {
  const { isAuthOpen, closeAuth, authView, openAuth, signIn, signUp } = useAuth();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const isSignIn = authView === 'signin';

  const reset = () => {
    setName(''); setEmail(''); setPassword('');
    setErrors({}); setLoading(false); setSuccess(false);
  };

  const handleClose = () => { reset(); closeAuth(); };
  const switchView  = (v: 'signin' | 'signup') => { reset(); openAuth(v); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isSignIn && !name.trim()) e.name = 'Name is required';
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (password.length < 6) e.password = 'At least 6 characters';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    const result = isSignIn
      ? await signIn(email, password)
      : await signUp(name, email, password);

    setLoading(false);
    if (result.error) {
      setErrors({ general: result.error });
    } else {
      setSuccess(true);
      setTimeout(() => handleClose(), 1400);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(4,3,2,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 301,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%', maxWidth: 440,
              background: 'linear-gradient(160deg, #27231A 0%, #1E1B16 100%)',
              border: `1px solid rgba(${AMBER_RGB},0.18)`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 60px rgba(${AMBER_RGB},0.05)`,
            }}>
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, rgba(${AMBER_RGB},0.55), transparent)`,
              }} />
              {/* Glow */}
              <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '60%', height: '60px',
                background: `radial-gradient(ellipse at 50% 0%, rgba(${AMBER_RGB},0.12), transparent)`,
                pointerEvents: 'none',
              }} />

              {/* Content */}
              <div style={{ padding: '2rem 2rem 2.2rem', position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.8rem' }}>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.60rem',
                      letterSpacing: '0.36em', textTransform: 'uppercase',
                      color: `rgba(${AMBER_RGB},0.60)`, marginBottom: 6,
                    }}>
                      SCI-FI ELECTRONICS
                    </p>
                    <h2 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 300,
                      fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
                      color: '#F4EFE8', margin: 0, lineHeight: 1.1,
                    }}>
                      {isSignIn ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p style={{
                      marginTop: 6, fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                      color: 'rgba(224,213,197,0.60)', lineHeight: 1.5,
                    }}>
                      {isSignIn
                        ? 'Sign in to access your purchases & licenses.'
                        : 'Join 3,200+ producers using SCI-FI tools.'}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer', color: 'rgba(255,255,255,0.45)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Tab switcher */}
                <div style={{
                  display: 'flex', gap: 4, padding: 4,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, marginBottom: '1.6rem',
                }}>
                  {(['signin', 'signup'] as const).map(v => (
                    <button
                      key={v}
                      onClick={() => switchView(v)}
                      style={{
                        flex: 1, padding: '9px 12px',
                        fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        background: authView === v ? `rgba(${AMBER_RGB},0.14)` : 'transparent',
                        border: authView === v ? `1px solid rgba(${AMBER_RGB},0.28)` : '1px solid transparent',
                        borderRadius: 9, cursor: 'pointer',
                        color: authView === v ? AMBER : 'rgba(224,213,197,0.55)',
                        transition: 'all 0.2s',
                        fontWeight: authView === v ? 600 : 400,
                      }}
                    >
                      {v === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                {/* Success state */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '0.75rem', padding: '2rem',
                        background: 'rgba(27,107,90,0.08)',
                        border: '1px solid rgba(27,107,90,0.22)',
                        borderRadius: 12,
                      }}
                    >
                      <CheckCircle size={32} color="rgba(42,138,114,0.95)" strokeWidth={1.5} />
                      <p style={{
                        fontFamily: 'var(--font-ui)', fontSize: '0.92rem',
                        color: 'rgba(224,213,197,0.90)', textAlign: 'center',
                      }}>
                        {isSignIn ? 'Signed in successfully!' : 'Account created! Welcome.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                {!success && (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <AnimatePresence mode="wait">
                      {!isSignIn && (
                        <motion.div
                          key="name-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <Field
                            label="Full Name" type="text"
                            value={name} onChange={setName}
                            placeholder="Your name"
                            icon={User} error={errors.name}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Field
                      label="Email" type="email"
                      value={email} onChange={setEmail}
                      placeholder="your@email.com"
                      icon={Mail} error={errors.email}
                    />

                    <Field
                      label="Password" type="password"
                      value={password} onChange={setPassword}
                      placeholder={isSignIn ? 'Your password' : 'Min. 6 characters'}
                      icon={Lock} error={errors.password}
                    />

                    {errors.general && (
                      <div style={{
                        padding: '10px 14px',
                        background: 'rgba(224,112,112,0.07)',
                        border: '1px solid rgba(224,112,112,0.25)',
                        borderRadius: 8,
                        fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                        color: '#E09090',
                      }}>
                        {errors.general}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={!loading ? { scale: 1.015, y: -1 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      disabled={loading}
                      style={{
                        marginTop: 4,
                        width: '100%', padding: '14px',
                        background: loading
                          ? 'rgba(196,154,108,0.12)'
                          : `linear-gradient(135deg, rgba(${AMBER_RGB},0.22), rgba(${AMBER_RGB},0.10))`,
                        border: `1px solid rgba(${AMBER_RGB},${loading ? '0.18' : '0.42'})`,
                        borderRadius: 10,
                        fontFamily: 'var(--font-ui)', fontSize: '0.80rem',
                        fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: loading ? `rgba(${AMBER_RGB},0.45)` : AMBER,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        transition: 'all 0.25s',
                      }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                            style={{
                              width: 16, height: 16, borderRadius: '50%',
                              border: `1.5px solid rgba(${AMBER_RGB},0.20)`,
                              borderTopColor: AMBER,
                            }}
                          />
                          {isSignIn ? 'Signing in…' : 'Creating account…'}
                        </>
                      ) : (
                        <>
                          {isSignIn ? <LogIn size={15} /> : <UserPlus size={15} />}
                          {isSignIn ? 'Sign In' : 'Create Account'}
                        </>
                      )}
                    </motion.button>

                    {/* Benefits */}
                    <div style={{
                      display: 'flex', justifyContent: 'center', gap: '1.5rem',
                      paddingTop: '0.8rem',
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      {['License Access', 'Free Updates', 'Order History'].map(b => (
                        <div key={b} style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                        }}>
                          <div style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: `rgba(${AMBER_RGB},0.65)`,
                          }} />
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: 'rgba(196,154,108,0.72)',
                          }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

