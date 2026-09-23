import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { DeviceFrame } from '@/components/DeviceFrame'
import { Toast } from '@/components/Toast'
import { useTripStore } from '@/store/tripStore'
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
import { Balances } from '@/screens/Balances'
import { Settle } from '@/screens/Settle'
import { SquaredUp } from '@/screens/SquaredUp'
import { SquaredUpStamp } from '@/screens/SquaredUpStamp'
import { PlanUpdated } from '@/screens/PlanUpdated'
import { Styleguide } from '@/screens/Styleguide'
import { Compare } from '@/screens/Compare'
import { screenById } from '@/screens/registry'

/** Every screen is deep-linkable for demos: /?screen=live-poll */
function Prototype() {
  const [params] = useSearchParams()
  const active = screenById(params.get('screen') ?? '')
  const toast = useTripStore((s) => s.toast)

  // Toasts are demo-global, not per-screen state, so they render once here —
  // every screen's content sits in the same status-bar-relative container,
  // which is what Toast positions itself against. The lock screen (04b)
  // draws its own notifications and never the app's toast.
  const showToast = toast && active?.id !== 'poll-notification'

  return (
    <DeviceFrame time={active?.time ?? '18:05'} chrome={active?.chrome ?? true}>
      {active?.id === 'home' ? (
        <Home />
      ) : active?.id === 'trip' ? (
        <TripLisbon />
      ) : active?.id === 'buddies' ? (
        <Buddies />
      ) : active?.id === 'add-a-buddy' ? (
        <AddABuddy />
      ) : active?.id === 'new-poll' ? (
        <NewPoll />
      ) : active?.id === 'poll-notification' ? (
        <PollNotification />
      ) : active?.id === 'vote' ? (
        <Vote />
      ) : active?.id === 'plan-updated' ? (
        <PlanUpdated />
      ) : active?.id === 'log-expense' ? (
        <LogExpense />
      ) : active?.id === 'split-by-item' ? (
        <SplitByItem />
      ) : active?.id === 'balances' ? (
        <Balances />
      ) : active?.id === 'settle' ? (
        <Settle />
      ) : active?.id === 'squared-up' ? (
        <SquaredUp />
      ) : active?.id === 'squared-up-stamp' ? (
        <SquaredUpStamp />
      ) : active?.id === 'live-poll' ? (
        <LivePoll />
      ) : (
        <Placeholder active={active} />
      )}
      {showToast && <Toast title={toast.title} detail={toast.detail} icon={toast.icon} iconSize={toast.iconSize} />}
    </DeviceFrame>
  )
}

export default function App() {
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
