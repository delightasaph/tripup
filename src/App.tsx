import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
import { DeviceFrame } from '@/components/DeviceFrame'
import { Placeholder } from '@/screens/Placeholder'
import { Styleguide } from '@/screens/Styleguide'
import { screenById } from '@/screens/registry'

/** Every screen is deep-linkable for demos: /?screen=live-poll */
function Prototype() {
  const [params] = useSearchParams()
  const active = screenById(params.get('screen') ?? '')

  return (
    <DeviceFrame time={active?.time ?? '18:05'}>
      <Placeholder active={active} />
    </DeviceFrame>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/styleguide" element={<Styleguide />} />
        <Route path="*" element={<Prototype />} />
      </Routes>
    </BrowserRouter>
  )
}
