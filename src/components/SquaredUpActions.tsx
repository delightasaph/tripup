import { Button } from './Button'
import { Icon } from './Icon'

/** "Share recap" + "Back to trip" — identical on both endings (11 and 11B). */
export function SquaredUpActions() {
  return (
    <div className="absolute flex items-center" style={{ left: 20, right: 20, bottom: 34, gap: 10, height: 54 }}>
      <Button variant="secondary" height={54} icon={<Icon name="send" size={18} color="var(--color-ink-primary)" />}>
        Share recap
      </Button>
      <Button variant="primary" height={54} className="min-w-0 flex-1">
        Back to trip
      </Button>
    </div>
  )
}
