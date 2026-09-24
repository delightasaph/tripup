import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
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
import { ExpenseDetail } from '@/screens/ExpenseDetail'
import { Notifications } from '@/screens/Notifications'
import { PollQuestion } from '@/screens/PollQuestion'
import { QuickAdd } from '@/screens/QuickAdd'
import { Styleguide } from '@/screens/Styleguide'
import { Compare } from '@/screens/Compare'
import { screenById } from '@/screens/registry'

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
      return <TripLisbon initialTab={tab} syncTabToUrl />
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
    case 'log-expense-new':
      // 16 — the same sheet with nothing on the plan to link to.
      return <LogExpense linked={false} />
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
    case 'notifications':
      return <Notifications />
    case 'expense-detail':
      return <ExpenseDetail />
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

  // Balances (09) keeps its own clock (22:12) even though it now renders
  // through the `trip` screen id — the registry's static per-screen time
  // can't express "same screen, different tab", so pick it by hand.
  const time = id === 'trip' && tab === 'expenses' ? (screenById('balances')?.time ?? active?.time) : active?.time

  // Toasts are demo-global, not per-screen state, so they render once here —
  // every screen's content sits in the same status-bar-relative container,
  // which is what Toast positions itself against. The lock screen (04b)
  // draws its own notifications and never the app's toast.
  const showToast = toast && active?.id !== 'poll-notification'

  // No screen-level motion. Screens used to slide in and out and the trip
  // ticket used to travel between 01 and 02 as a shared element; both read as
  // the page itself lurching on an ordinary tap, which is exactly what a bug
  // looks like. Navigation is now a cut, and every bit of feedback comes from
  // the thing you actually touched — a button's press, a sheet rising, a bar
  // filling. Sheets still animate: a sheet is a surface arriving, not a page
  // changing under you.
  return (
    <DeviceFrame time={time ?? '18:05'} chrome={active?.chrome ?? true}>
      <>
        <div key={id || 'placeholder'} className="absolute inset-0">
          {screenFor(id, tab)}
        </div>
      </>
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
