import { useEffect } from 'react'
import { Avatar } from '@/components/Avatar'
import { Button, IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { LivePill } from '@/components/LivePill'
import { PollOptionCard } from '@/components/PollOptionCard'
import { Ticker } from '@/components/Ticker'
import { pendingRing } from '@/data/assets'
import { dinnerPoll, people } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import {
  formatCountdown,
  selectPendingVoters,
  selectPollOptionsView,
  selectYourVote,
  useTripStore,
} from '@/store/tripStore'

/**
 * 05 · Live poll, Ari's view — Figma 84:169.
 *
 * Offsets are the frame's own: content at x 20 / y 64, body at +60, options at
 * +154 with cards at 0 / 140 / 268, "Waiting on Sven" at +562, actions at 756.
 */
export function LivePoll() {
  const { askedLine } = dinnerPoll
  const { back, replace } = useScreenNav()

  const question = useTripStore((s) => s.pollQuestion)
  const closesInSeconds = useTripStore((s) => s.closesInSeconds)
  const pollClosed = useTripStore((s) => s.pollClosed)
  const winnerId = useTripStore((s) => s.winnerId)
  const nudged = useTripStore((s) => s.nudged)
  const changingVote = useTripStore((s) => s.changingVote)
  const votes = useTripStore((s) => s.votes)
  const optionsView = useTripStore(selectPollOptionsView)
  const pendingVoters = useTripStore(selectPendingVoters)
  const yourVote = useTripStore((s) => selectYourVote(s, 'ari'))
  const nudgeSven = useTripStore((s) => s.nudgeSven)
  const requestChangeVote = useTripStore((s) => s.requestChangeVote)
  const changeVoteTo = useTripStore((s) => s.changeVoteTo)
  const closePollNow = useTripStore((s) => s.closePollNow)

  // The poll can close on its own (everyone voted, or the nudge chain lands
  // Sven's vote) — when it does, follow everyone else to 06.
  useEffect(() => {
    if (pollClosed) replace('plan-updated')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollClosed])

  const lastVote = votes.at(-1)
  const ticker = lastVote
    ? {
        person: people[lastVote.personId],
        event: `voted ${dinnerPoll.places.find((p) => p.id === lastVote.optionId)?.name ?? ''}`,
        when: 'just now',
      }
    : null
  // Votes trickle in over ~6s; the "waiting on / nudge" panel is about the
  // final straggler, so it only appears once everyone else is in — showing it
  // mid-trickle would offer a Nudge for whoever's merely next alphabetically,
  // not the one Nudge actually reaches.
  const waitingOnId = pendingVoters.length === 1 ? pendingVoters[0] : null
  const waitingOn = waitingOnId ? people[waitingOnId] : null

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute" style={{ left: 'var(--screen-padding)', top: 14, width: 350 }}>
        {/* Nav */}
        <div className="flex h-[40px] items-center justify-between">
          <IconButton label="Back to itinerary" size={40} onClick={back}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
          <LivePill countdown={formatCountdown(closesInSeconds)} />
        </div>

        <div style={{ height: 20 }} />

        {/* Question */}
        <div className="flex items-center" style={{ height: 22 }}>
          <Avatar person={people.ari} size={22} />
          <span
            className="text-footnote"
            style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}
          >
            {askedLine.replace('Ari asked', 'You asked')}
          </span>
        </div>
        <h1 className="text-title2 font-semibold" style={{ marginTop: 8, width: 330 }}>
          {question}
        </h1>

        <div style={{ height: 16 }} />
        {ticker && <Ticker person={ticker.person} event={ticker.event} when={ticker.when} />}

        {/* Options — 0 / 140 / 268 from the top of the group */}
        <div className="relative" style={{ marginTop: 16, height: 388 }}>
          {optionsView.map((o, i) => (
            <div key={o.id} className="absolute left-0" style={{ top: [0, 140, 268][i] }}>
              <PollOptionCard
                option={o}
                fill={o.fill}
                leading={o.leading}
                yourVote={o.id === yourVote}
                sharedElement={pollClosed && winnerId === o.id}
                onClick={changingVote ? () => changeVoteTo(o.id) : undefined}
              />
            </div>
          ))}
        </div>

        {/* Waiting on the last voter */}
        {waitingOn && (
          <div
            className="relative"
            style={{
              marginTop: 20,
              width: 350,
              height: 64,
              borderRadius: 'var(--radius-card)',
              background: 'var(--color-surface-white-70)',
              outline: '1px solid var(--color-line-default)',
              outlineOffset: '-1px',
            }}
          >
            <span className="absolute" style={{ left: 10, top: 10, width: 42, height: 42 }}>
              <img
                src={pendingRing}
                alt=""
                aria-hidden="true"
                width={42}
                height={42}
                className="absolute inset-0"
              />
              <span className="absolute" style={{ left: 3, top: 3, opacity: 0.55 }}>
                <Avatar person={waitingOn} size={36} />
              </span>
            </span>
            <div className="absolute" style={{ left: 64, top: 13 }}>
              <p className="text-body font-semibold">{votes.length} of 7 voted</p>
              <p className="text-caption" style={{ marginTop: 3, color: 'var(--color-ink-secondary)' }}>
                {nudged ? `${waitingOn.label} was nudged` : `Waiting on ${waitingOn.label}`}
              </p>
            </div>
            <div className="absolute" style={{ left: 241, top: 13 }}>
              <Button
                variant="lilac"
                height={38}
                icon={<Icon name="bell" size={16} />}
                onClick={nudgeSven}
                disabled={nudged}
                style={{ width: 95, paddingInline: 0, opacity: nudged ? 0.5 : 1 }}
              >
                Nudge
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Actions over a 130 fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 130, background: 'var(--gradient-bottom-fade)' }}
      />
      <div
        className="absolute flex"
        style={{ left: 20, bottom: 34, width: 350, height: 54, gap: 10 }}
      >
        <Button variant="secondary" height={54} onClick={requestChangeVote} style={{ width: 137 }}>
          {changingVote ? 'Pick a place' : 'Change vote'}
        </Button>
        <Button variant="primary" height={54} onClick={closePollNow} style={{ width: 203 }}>
          Close poll now
        </Button>
      </div>
    </div>
  )
}
