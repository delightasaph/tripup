import { AnimatePresence } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
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
import { SquaredUpStamp } from '@/screens/SquaredUpStamp'
import { PlanUpdated } from '@/screens/PlanUpdated'
import { ExpenseDetail } from '@/screens/ExpenseDetail'
import { Notifications } from '@/screens/Notifications'
import { PollQuestion } from '@/screens/PollQuestion'
import { QuickAdd } from '@/screens/QuickAdd'
import { Styleguide } from '@/screens/Styleguide'

/**
 * The app's chrome: the device frame, the global toast and the demo panel,
 * with whatever screen the route resolves to inside it.
 *
 * Screens cut rather than animate — motion belongs to the control you
 * touched, not to the page around it — so this is a plain container.
 */
function Shell({ children }: { children: ReactNode }) {
  const toast = useTripStore((s) => s.toast)
  const { pathname } = useLocation()
  // The lock screen draws its own notifications and never the app's toast.
  const showToast = toast && pathname !== '/poll/alert'

  return (
    <DeviceFrame>
      <div className="absolute inset-0">{children}</div>
      <AnimatePresence>
        {showToast && (
          <Toast key="toast" title={toast.title} detail={toast.detail} icon={toast.icon} iconSize={toast.iconSize} />
        )}
      </AnimatePresence>
      <DemoPanel />
    </DeviceFrame>
  )
}

/** 17 reads which expense to show straight off the path. */
function ExpenseDetailRoute() {
  const { entryId } = useParams()
  return <ExpenseDetail entryId={entryId ?? 'fado'} />
}

/** Wraps every screen route in the shell. */
function ShellLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
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
        {/* Internal tools, not part of the app */}
        <Route path="/styleguide" element={<Styleguide />} />

        <Route element={<ShellLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/trip" element={<TripLisbon initialTab="itinerary" syncTabToUrl />} />
          <Route path="/trip/expenses" element={<TripLisbon initialTab="expenses" syncTabToUrl />} />
          <Route path="/trip/buddies" element={<Buddies />} />
          <Route path="/trip/buddies/add" element={<AddABuddy />} />
          <Route path="/trip/add" element={<QuickAdd />} />
          <Route path="/trip/plan-updated" element={<PlanUpdated />} />

          <Route path="/poll/new" element={<PollQuestion />} />
          <Route path="/poll/places" element={<NewPoll />} />
          <Route path="/poll/alert" element={<PollNotification />} />
          <Route path="/poll/vote" element={<Vote />} />
          <Route path="/poll/live" element={<LivePoll />} />

          <Route path="/expenses/new" element={<LogExpense />} />
          <Route path="/expenses/new/items" element={<SplitByItem />} />
          {/* 16 — the same sheet with nothing on the plan to link to */}
          <Route path="/expenses/add" element={<LogExpense linked={false} />} />
          <Route path="/expenses/:entryId" element={<ExpenseDetailRoute />} />

          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settle" element={<Settle />} />
          <Route path="/squared-up" element={<SquaredUpStamp />} />

          {/* The screen index — internal, for jumping around while building */}
          <Route path="/screens" element={<Placeholder />} />
          {/* Anything else is not a screen: send it home rather than showing
              a dead end to whoever opened the link. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
