import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { Scrim, Sheet } from '@/components/Sheet'
import { placePhotos } from '@/data/assets'
import { dinnerPoll } from '@/data/trip'
import { useScreenNav } from '@/lib/useScreenNav'
import { HOVER_SMALL, SPRING_POP, TAP_SMALL, TAP_TRANSITION } from '@/styles/motion'
import { useTripStore } from '@/store/tripStore'
import { TripLisbon } from './TripLisbon'

const DEADLINE_OPTIONS = [10, 20, 30, 60]

/**
 * 04 · New poll — Figma 164:2379.
 * The trip screen under a scrim, the "Ren joined" toast still up from 03, and
 * the New poll sheet (164:2513) at y 235.5.
 *
 * The question is editable and the option list is real (remove a place, or
 * bring it back from "Add a place") — not in the Figma, but Ari composing a
 * poll has to actually compose it. Two nested sheets (add a place, the
 * deadline) layer on top, matching how an iOS picker sheet stacks on a form.
 */
export function NewPoll() {
  const { go, back } = useScreenNav()
  const sendPoll = useTripStore((s) => s.sendPoll)
  const question = useTripStore((s) => s.pollQuestion)
  const setPollQuestion = useTripStore((s) => s.setPollQuestion)
  const optionIds = useTripStore((s) => s.pollOptionIds)
  const togglePollOption = useTripStore((s) => s.togglePollOption)
  const deadline = useTripStore((s) => s.pollDeadlineMinutes)
  const setPollDeadline = useTripStore((s) => s.setPollDeadline)

  const [addPlaceOpen, setAddPlaceOpen] = useState(false)
  const [deadlineOpen, setDeadlineOpen] = useState(false)

  const options = dinnerPoll.places.filter((p) => optionIds.includes(p.id))
  const canSend = options.length >= 2 // at least two places to vote between

  const send = () => {
    if (options.length < 2) return
    sendPoll()
    go('live-poll')
  }

  return (
    <div className="relative h-full">
      <TripLisbon scaleForSheet />
      <Scrim onClick={back} />

      <Sheet frameTop={235.5} gap={18} onDismiss={back}>
        <div className="flex w-full shrink-0 items-center justify-between">
          <h2 className="text-heading font-semibold">New poll</h2>
          {/* The slot this poll fills */}
          <span
            className="inline-flex shrink-0 items-center rounded-pill text-footnote font-medium"
            style={{
              gap: 5,
              padding: '6px 12px 6px 10px',
              background: 'var(--color-accent-violet-tint)',
              color: 'var(--color-accent-violet)',
            }}
          >
            <Icon name="clock-violet" size={14} />
            Dinner · 20:30
          </span>
        </div>

        {/* Question — editable */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          <span className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            Question
          </span>
          <input
            value={question}
            onChange={(e) => setPollQuestion(e.target.value)}
            aria-label="Poll question"
            className="w-full bg-transparent text-heading font-semibold outline-none"
            style={{ border: 'none', padding: 0 }}
          />
          <span
            aria-hidden="true"
            style={{ width: '100%', height: 1.5, background: 'var(--color-ink-primary)' }}
          />
        </div>

        {/* Options header */}
        <div className="flex w-full shrink-0 items-center justify-between text-footnote">
          <span style={{ color: 'var(--color-ink-secondary)' }}>
            {options.length} {options.length === 1 ? 'place' : 'places'} near you
          </span>
          <motion.button
            type="button"
            onClick={() => setAddPlaceOpen(true)}
            whileHover={HOVER_SMALL}
            whileTap={TAP_SMALL}
            transition={TAP_TRANSITION}
            className="font-medium"
            style={{ color: 'var(--color-accent-violet)' }}
          >
            + Add a place
          </motion.button>
        </div>

        {/* Options */}
        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
          <AnimatePresence initial={false}>
            {options.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="flex w-full items-center overflow-hidden"
                style={{
                  gap: 12,
                  padding: '10px 14px 10px 10px',
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--color-surface-ground)',
                }}
              >
                <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                  <img
                    src={placePhotos[p.photo]}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: 48,
                      height: 48,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-tile)',
                      display: 'block',
                    }}
                  />
                  <span
                    className="absolute flex items-center justify-center rounded-pill"
                    style={{
                      left: 32,
                      top: 32,
                      width: 22,
                      height: 22,
                      background: 'var(--color-surface-white)',
                      filter: 'drop-shadow(0 2px 2px rgb(31 30 36 / 0.12))',
                    }}
                  >
                    <Icon name={p.icon} size={13} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-headline font-semibold">{p.name}</p>
                  <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
                    {p.line}
                  </p>
                </div>
                <motion.button
                  type="button"
                  aria-label={`Remove ${p.name}`}
                  onClick={() => togglePollOption(p.id)}
                  disabled={options.length <= 2}
                  whileHover={options.length <= 2 ? undefined : HOVER_SMALL}
                  whileTap={options.length <= 2 ? undefined : TAP_SMALL}
                  transition={TAP_TRANSITION}
                  className="shrink-0"
                  style={{ opacity: options.length <= 2 ? 0.3 : 1 }}
                >
                  <Icon name="remove" size={16} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Deadline — tap to change */}
        <motion.button
          type="button"
          onClick={() => setDeadlineOpen(true)}
          whileHover={HOVER_SMALL}
          whileTap={TAP_SMALL}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center text-left"
          style={{
            gap: 12,
            height: 61,
            padding: '12px 14px',
            borderRadius: 'var(--radius-row-lg)',
            outline: '1.5px solid var(--color-line-default)',
            outlineOffset: '-1.5px',
          }}
        >
          <Icon name="clock" size={20} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold">Closes in {deadline} min</p>
            <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
              or as soon as all 7 have voted
            </p>
          </div>
          <Icon name="chevron-right-16" size={16} className="shrink-0" />
        </motion.button>

        {/* Send */}
        <motion.button
          type="button"
          onClick={send}
          disabled={!canSend}
          whileHover={canSend ? HOVER_SMALL : undefined}
          whileTap={canSend ? TAP_SMALL : undefined}
          transition={TAP_TRANSITION}
          className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
          style={{
            height: 54,
            gap: 8,
            paddingInline: 22,
            background: 'var(--color-ink-primary)',
            color: 'var(--color-surface-white)',
            filter: 'drop-shadow(0 10px 10px rgb(31 30 36 / 0.25))',
            opacity: canSend ? 1 : 0.5,
          }}
        >
          <Icon name="send" size={18} />
          Send to 6 buddies
        </motion.button>
      </Sheet>

      {/* Add a place — nested picker sheet */}
      <AnimatePresence>
        {addPlaceOpen && (
          <>
            <Scrim onClick={() => setAddPlaceOpen(false)} />
            <Sheet onDismiss={() => setAddPlaceOpen(false)}>
              <div className="flex w-full shrink-0 items-center justify-between">
                <h2 className="text-heading font-semibold">Add a place</h2>
                <span className="text-footnote" style={{ color: 'var(--color-ink-secondary)' }}>
                  {options.length} of {dinnerPoll.places.length}
                </span>
              </div>
              <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
                {dinnerPoll.places.map((p) => {
                  const included = optionIds.includes(p.id)
                  const disabled = included && options.length <= 2
                  return (
                    <motion.button
                      key={p.id}
                      type="button"
                      onClick={() => togglePollOption(p.id)}
                      disabled={disabled}
                      whileHover={disabled ? undefined : HOVER_SMALL}
                      whileTap={disabled ? undefined : TAP_SMALL}
                      transition={TAP_TRANSITION}
                      className="flex w-full items-center text-left"
                      style={{
                        gap: 12,
                        padding: '10px 14px 10px 10px',
                        borderRadius: 'var(--radius-card)',
                        background: included ? 'var(--color-accent-lime)' : 'var(--color-surface-ground)',
                        opacity: disabled ? 0.6 : 1,
                      }}
                    >
                      <img
                        src={placePhotos[p.photo]}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: 48,
                          height: 48,
                          objectFit: 'cover',
                          borderRadius: 'var(--radius-tile)',
                          display: 'block',
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-headline font-semibold">{p.name}</p>
                        <p className="text-caption" style={{ marginTop: 2, color: 'var(--color-ink-secondary)' }}>
                          {p.line}
                        </p>
                      </div>
                      {included ? (
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
              <motion.button
                type="button"
                onClick={() => setAddPlaceOpen(false)}
                whileHover={HOVER_SMALL}
                whileTap={TAP_SMALL}
                transition={TAP_TRANSITION}
                className="flex w-full shrink-0 items-center justify-center rounded-pill text-body font-medium"
                style={{
                  height: 54,
                  background: 'var(--color-ink-primary)',
                  color: 'var(--color-surface-white)',
                }}
              >
                Done
              </motion.button>
            </Sheet>
          </>
        )}
      </AnimatePresence>

      {/* Deadline — nested picker sheet */}
      <AnimatePresence>
        {deadlineOpen && (
          <>
            <Scrim onClick={() => setDeadlineOpen(false)} />
            <Sheet onDismiss={() => setDeadlineOpen(false)}>
              <h2 className="text-heading font-semibold">Closes in</h2>
              <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
                {DEADLINE_OPTIONS.map((minutes) => {
                  const selected = minutes === deadline
                  return (
                    <motion.button
                      key={minutes}
                      type="button"
                      onClick={() => {
                        setPollDeadline(minutes)
                        setDeadlineOpen(false)
                      }}
                      whileHover={HOVER_SMALL}
                      whileTap={TAP_SMALL}
                      transition={TAP_TRANSITION}
                      className="flex w-full items-center justify-between text-left"
                      style={{
                        padding: '14px 16px',
                        borderRadius: 'var(--radius-row-lg)',
                        background: 'var(--color-surface-ground)',
                        border: selected ? '2px solid var(--color-ink-primary)' : '2px solid transparent',
                      }}
                    >
                      <span className="text-body font-semibold">{minutes} min</span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={SPRING_POP}
                          className="flex shrink-0 items-center justify-center rounded-pill"
                          style={{ width: 24, height: 24, background: 'var(--color-ink-primary)' }}
                        >
                          <Icon name="check-white" size={13} />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
              <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                Or as soon as all 7 of you have voted, whichever comes first.
              </p>
            </Sheet>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
