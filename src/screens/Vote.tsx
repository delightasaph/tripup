import { motion } from 'framer-motion'
import { useState } from 'react'
import { Avatar } from '@/components/Avatar'
import { IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { LivePill } from '@/components/LivePill'
import { PlaceTile } from '@/components/PlaceTile'
import { Pill } from '@/components/Pill'
import { PollOptionCard } from '@/components/PollOptionCard'
import { Ticker } from '@/components/Ticker'
import { dinnerPoll, people } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_LIFT, HOVER_SMALL, TAP_LARGE, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import {
  formatCountdown,
  selectActivePoll,
  selectPendingVoters,
  selectTotalVoters,
  selectPollOptionsView,
  selectTickerEvent,
  selectYourVote,
  useTripStore,
} from '@/store/tripStore'

/**
 * 04c · Vote, Nic's view — Figma `166:2631`.
 *
 * Results are hidden until you vote (avoids herd voting) — so this is a plain
 * radio list, not `PollOptionCard`. If the simulation already cast Nic's vote
 * (he wasn't watched in time), this opens straight into the results view —
 * "same layout as 05 without the asker controls".
 */
export function Vote() {
  const { replace } = useScreenNav()
  const [selected, setSelected] = useState('timeout')
  const poll = useTripStore(selectActivePoll)
  const { question, votes, closesInSeconds, nudged } = poll
  const optionsView = useTripStore(selectPollOptionsView)
  const pendingVoters = useTripStore(selectPendingVoters)
  const totalVoters = useTripStore(selectTotalVoters)
  const nicsVote = useTripStore((s) => selectYourVote(s, 'nic'))
  const ticker = useTripStore(selectTickerEvent)
  const castVote = useTripStore((s) => s.castVote)

  const option = optionsView.find((p) => p.id === selected) ?? optionsView[0]

  /**
   * Closing this lands on the trip, not back on the lock screen. The
   * notification is how Nic *got* here; it isn't somewhere to return to —
   * you don't leave an app into your own lock screen. `replace` so the lock
   * screen doesn't sit in the back stack either.
   */
  const leave = () => replace('trip')

  if (nicsVote) {
    const waitingOnId = pendingVoters.length === 1 ? pendingVoters[0] : null
    const waitingOn = waitingOnId ? people[waitingOnId] : null

    return (
      <div className="relative h-full overflow-hidden">
        <div className="absolute" style={{ left: 'var(--screen-padding)', top: 14, width: 350 }}>
          <div className="flex h-[40px] items-center justify-between">
            <div className="flex items-center" style={{ gap: 10 }}>
              <IconButton label="Close" onClick={leave}>
                <Icon name="close" size={20} />
              </IconButton>
              <Pill variant="lime" height={27} className="font-medium">
                On Nic’s phone
              </Pill>
            </div>
            <LivePill countdown={formatCountdown(closesInSeconds)} />
          </div>

          <div style={{ height: 20 }} />
          <div className="flex items-center" style={{ height: 22 }}>
            <Avatar person={dinnerPoll.askedBy} size={22} />
            <span className="text-footnote" style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}>
              {dinnerPoll.askedLine}
            </span>
          </div>
          <h1 className="text-title2 font-semibold" style={{ marginTop: 8, width: 330 }}>
            {question}
          </h1>

          <div style={{ height: 16 }} />
          {ticker && <Ticker person={ticker.person} event={ticker.event} when={ticker.when} />}

          <div className="relative" style={{ marginTop: 16, height: 388 }}>
            {optionsView.map((o, i) => (
              <div key={o.id} className="absolute left-0" style={{ top: [0, 140, 268][i] }}>
                <PollOptionCard option={o} fill={o.fill} leading={o.leading} yourVote={o.id === nicsVote} />
              </div>
            ))}
          </div>

          {waitingOn && (
            <div
              className="flex w-full items-center justify-center text-footnote"
              style={{ marginTop: 20, color: 'var(--color-ink-secondary)' }}
            >
              {votes.length} of {totalVoters} voted · {nudged ? `${waitingOn.label} was nudged` : `waiting on ${waitingOn.label}`}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute" style={{ left: 'var(--screen-padding)', top: 14, width: 350 }}>
        {/* Nav */}
        <div className="flex h-[40px] items-center justify-between">
          <div className="flex items-center" style={{ gap: 10 }}>
            <IconButton label="Close" onClick={leave}>
              <Icon name="close" size={20} />
            </IconButton>
            <Pill variant="lime" height={27} className="font-medium">
              On Nic’s phone
            </Pill>
          </div>
          <LivePill countdown={formatCountdown(closesInSeconds)} />
        </div>

        <div style={{ height: 20 }} />

        {/* Question */}
        <div className="flex items-center" style={{ height: 22 }}>
          <Avatar person={dinnerPoll.askedBy} size={22} />
          <span
            className="text-footnote"
            style={{ marginLeft: 8, color: 'var(--color-ink-secondary)' }}
          >
            {dinnerPoll.askedLine}
          </span>
        </div>
        <h1 className="text-title2 font-semibold" style={{ marginTop: 8, width: 330 }}>
          {question}
        </h1>

        <div style={{ height: 16 }} />
        {ticker && <Ticker person={ticker.person} event={ticker.event} when={ticker.when} />}

        {/* Options — selectable, no results shown yet */}
        <div className="flex w-full flex-col items-start" style={{ marginTop: 16, gap: 8 }}>
          {optionsView.map((p) => {
            const isSelected = p.id === selected
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                aria-pressed={isSelected}
                whileHover={HOVER_LIFT}
                whileTap={TAP_LARGE}
                transition={TAP_TRANSITION}
                className="flex w-full items-center text-left"
                style={{
                  gap: 14,
                  width: 350,
                  padding: '14px 16px 14px 14px',
                  borderRadius: 'var(--radius-card-lg)',
                  background: 'var(--color-surface-white)',
                  border: isSelected
                    ? '2px solid var(--color-ink-primary)'
                    : '2px solid transparent',
                }}
              >
                <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                  <PlaceTile place={p} />
                  <span
                    className="absolute flex items-center justify-center rounded-pill"
                    style={{
                      left: 34,
                      top: 34,
                      width: 22,
                      height: 22,
                      background: 'var(--color-surface-white)',
                      boxShadow: '0 2px 4px rgb(0 0 0 / 0.12)',
                    }}
                  >
                    <Icon name={p.icon} size={13} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-headline font-semibold whitespace-nowrap">{p.name}</p>
                  <p
                    className="text-caption whitespace-nowrap"
                    style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}
                  >
                    {p.line}
                  </p>
                </div>
                {isSelected ? (
                  <span
                    className="flex shrink-0 items-center justify-center rounded-pill"
                    style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                  >
                    <Icon name="check-white" size={13} />
                  </span>
                ) : (
                  <span
                    className="shrink-0 rounded-pill"
                    style={{
                      width: 24,
                      height: 24,
                      outline: '1.5px solid rgb(31 30 36 / 0.25)',
                      outlineOffset: '-1.5px',
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <div
          className="flex w-full items-center justify-center text-footnote"
          style={{ marginTop: 20, color: 'var(--color-ink-secondary)' }}
        >
          {votes.length} of {totalVoters} have voted · results show once you vote
        </div>
      </div>

      {/* Vote button, docked */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 130, background: 'var(--gradient-bottom-fade)' }}
      />
      <div className="absolute flex items-center" style={{ left: 20, right: 20, bottom: 34 }}>
        <motion.button
          type="button"
          onClick={() => castVote('nic', selected)}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex w-full items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
          }}
        >
          Vote for {option?.name}
        </motion.button>
      </div>
    </div>
  )
}
