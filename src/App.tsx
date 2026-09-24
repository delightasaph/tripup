import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigationType, useSearchParams } from 'react-router-dom'
import { DemoPanel } from '@/components/DemoPanel'
import { DeviceFrame } from '@/components/DeviceFrame'
import { Toast } from '@/components/Toast'
import { clearTripStoreTimers, useTripStore } from '@/store/tripStore'
import { Placeholder } from '@/screens/Placeholder'
import { TripLisbon } from '@/screens/TripLisbon'
import { LivePoll } from '@/screens/LivePoll'
import { Home } from '@/screens/Home'
import { Buddies } from '@/screens/Buddies'
import { AddABuddy } from '@/screens/AddABuddy'
import { NewPoll } from '@/screens/NewPoll'
import { PollNotification } from '@/screens/PollNotification'
import { Vote } from '@/screens/Vote'
import { LogExpense } from '@/screens/LogExpense'
import { SplitByItem } from '@/screens/SplitByItem'
import { Settle } from '@/screens/Settle'
import { SquaredUp } from '@/screens/SquaredUp'
import { SquaredUpStamp } from '@/screens/SquaredUpStamp'
import { PlanUpdated } from '@/screens/PlanUpdated'
import { PollQuestion } from '@/screens/PollQuestion'
import { QuickAdd } from '@/screens/QuickAdd'
import { Styleguide } from '@/screens/Styleguide'
import { Compare } from '@/screens/Compare'
import { screenById } from '@/screens/registry'
import { DUR_BASE, DUR_FAST, EASE_OUT } from '@/styles/motion'

/** `balances` (09) isn't a mounted screen any more — it's the trip shell's
 *  Expenses tab (docs/INTERACTION_EXECUTION_BRIEF.md §0). A raw `?screen=
 *  balances` deep link (an old bookmark, or the demo panel's screen list)
 *  still has to land somewhere: resolve it to the trip screen, opened on
 *  that tab, rather than giving it its own mounted component. */
function screenFor(id: string | undefined, tab: 'itinerary' | 'expenses') {
  switch (id) {
    case 'home':
      return <Home />
    case 'trip':
    case 'balances':
      return <TripLisbon ticketShared initialTab={tab} syncTabToUrl />
    case 'buddies':
      return <Buddies />
    case 'add-a-buddy':
      return <AddABuddy />
    case 'new-poll':
      return <NewPoll />
    case 'poll-notification':
      return <PollNotification />
    case 'vote':
      return <Vote />
    case 'plan-updated':
      return <PlanUpdated />
    case 'log-expense':
      return <LogExpense />
    case 'split-by-item':
      return <SplitByItem />
    case 'settle':
      return <Settle />
    case 'squared-up':
      return <SquaredUp />
    case 'squared-up-stamp':
      return <SquaredUpStamp />
    case 'live-poll':
      return <LivePoll />
    case 'quick-add':
      return <QuickAdd />
    case 'poll-question':
      return <PollQuestion />
    default:
      return <Placeholder active={screenById(id ?? '')} />
  }
}

/** Every screen is deep-linkable for demos: /?screen=live-poll */
function Prototype() {
  const [params] = useSearchParams()
  const rawId = params.get('screen') ?? ''
  // `balances` collapses onto the same mounted screen as `trip` — see
  // `screenFor` above — so the two share one AnimatePresence key and one
  // React instance. Tapping the tab bar (TripLisbon's `changeTab`) only ever
  // touches `?tab=`, never `?screen=`, so this id is stable across every tab
  // toggle: nothing here unmounts when Itinerary/Expenses switches.
  const id = rawId === 'balances' ? 'trip' : rawId
  const active = screenById(id)
  const tab: 'itinerary' | 'expenses' = rawId === 'balances' || params.get('tab') === 'expenses' ? 'expenses' : 'itinerary'
  const toast = useTripStore((s) => s.toast)
  const navigationType = useNavigationType()
  const reduceMotion = useReducedMotion()

  // Balances (09) keeps its own clock (22:12) even though it now renders
  // through the `trip` screen id — the registry's static per-screen time
  // can't express "same screen, different tab", so pick it by hand.
  const time = id === 'trip' && tab === 'expenses' ? (screenById('balances')?.time ?? active?.time) : active?.time

  // Toasts are demo-global, not per-screen state, so they render once here —
  // every screen's content sits in the same status-bar-relative container,
  // which is what Toast positions itself against. The lock screen (04b)
  // draws its own notifications and never the app's toast.
  const showToast = toast && active?.id !== 'poll-notification'

  // Forward pushes a history entry, back pops one — react-router's own POP
  // classification, so the slide direction always matches which way the
  // user actually moved (docs/DESIGN_SYSTEM.md §6.0 "Screen transitions").
  const isBack = navigationType === 'POP'
  const offset = reduceMotion ? 0 : isBack ? -12 : 24
  const exitOffset = reduceMotion ? 0 : isBack ? 24 : -12

  const variant = active?.sheet
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { x: offset, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: exitOffset, opacity: 0 },
      }

  return (
    <DeviceFrame time={time ?? '18:05'} chrome={active?.chrome ?? true}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={id || 'placeholder'}
          className="absolute inset-0"
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{ duration: reduceMotion ? DUR_FAST : DUR_BASE, ease: EASE_OUT }}
        >
          {screenFor(id, tab)}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {showToast && (
          <Toast key="toast" title={toast.title} detail={toast.detail} icon={toast.icon} iconSize={toast.iconSize} />
        )}
      </AnimatePresence>
      <DemoPanel />
    </DeviceFrame>
  )
}

export default function App() {
  // The store's vote/settle timers are module-level, not component state, so
  // they survive whichever screen is mounted — but they still need one place
  // to be swept if the app itself is ever torn down.
  useEffect(() => clearTripStoreTimers, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/styleguide" element={<Styleguide />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<Prototype />} />
      </Routes>
    </BrowserRouter>
  )
}
