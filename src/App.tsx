import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { DeviceFrame } from '@/components/DeviceFrame'
import { Placeholder } from '@/screens/Placeholder'
import { TripLisbon } from '@/screens/TripLisbon'
import { LivePoll } from '@/screens/LivePoll'
import { Home } from '@/screens/Home'
import { Buddies } from '@/screens/Buddies'
import { NewPoll } from '@/screens/NewPoll'
import { PlanUpdated } from '@/screens/PlanUpdated'
import { Styleguide } from '@/screens/Styleguide'
import { Compare } from '@/screens/Compare'
import { screenById } from '@/screens/registry'

/** Every screen is deep-linkable for demos: /?screen=live-poll */
function Prototype() {
  const [params] = useSearchParams()
  const active = screenById(params.get('screen') ?? '')

  return (
    <DeviceFrame time={active?.time ?? '18:05'}>
      {active?.id === 'home' ? (
        <Home />
      ) : active?.id === 'trip' ? (
        <TripLisbon />
      ) : active?.id === 'buddies' ? (
        <Buddies />
      ) : active?.id === 'new-poll' ? (
        <NewPoll />
      ) : active?.id === 'plan-updated' ? (
        <PlanUpdated />
      ) : active?.id === 'live-poll' ? (
        <LivePoll />
      ) : (
        <Placeholder active={active} />
      )}
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
