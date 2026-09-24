import { IconButton } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { ledgerEntry, notificationGroups, payerLine, expenseSubLine, unreadCount } from '@/data/notifications'
import { formatEuros, formatEurosAuto } from '@/domain/money'
import { useScreenNav } from '@/lib/useScreenNav'

/**
 * 15 · Notifications — Figma `4098:2195`.
 *
 * Reached from the bell on 01, and clears its unread dot. Every row comes
 * from the ledger in docs/PRODUCT_SPEC.md §3: the titles, amounts and shares
 * are read off real expenses rather than written out here, so they can't
 * drift from what 09 and 17 show.
 *
 * The frame is taller than 844 and scrolls; there is no docked control on
 * this screen, so nothing has to stay above the fold.
 */
export function Notifications() {
  const { back } = useScreenNav()

  return (
    <div className="no-scrollbar h-full overflow-y-auto" style={{ overflowX: 'hidden' }}>
      <div
        className="flex flex-col items-start"
        style={{ paddingTop: 14, paddingInline: 'var(--screen-padding)', paddingBottom: 110, gap: 18 }}
      >
        <div className="flex h-[40px] w-full shrink-0 items-center justify-between">
          <IconButton label="Back" size={40} onClick={back}>
            <Icon name="arrow-left" size={20} />
          </IconButton>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start" style={{ gap: 2 }}>
          <h1 className="text-title1 font-semibold">Notifications</h1>
          <p className="text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
            {unreadCount} new
          </p>
        </div>

        {notificationGroups.map((group) => (
          <section key={group.label} className="flex w-full shrink-0 flex-col items-start" style={{ gap: 8 }}>
            <h2 className="text-footnote font-medium" style={{ color: 'var(--color-ink-secondary)' }}>
              {group.label}
            </h2>
            <div
              className="flex w-full flex-col items-start overflow-hidden"
              style={{
                borderRadius: 'var(--radius-row-lg)',
                background: 'var(--color-surface-white)',
                boxShadow: '0 4px 12px rgb(31 30 36 / 0.06)',
              }}
            >
              {group.rows.map((row, i) => {
                const entry = row.kind === 'expense' ? ledgerEntry(row.entryId) : null
                const title = entry ? payerLine(entry, formatEuros(entry.amountCents)) : row.kind === 'plan' ? row.title : ''
                const sub = entry ? expenseSubLine(entry, formatEurosAuto) : row.kind === 'plan' ? row.sub : ''

                return (
                  <div key={row.id} className="flex w-full flex-col items-start">
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        style={{ width: '100%', height: 1, background: 'var(--color-line-default)' }}
                      />
                    )}
                    <div className="flex w-full items-center" style={{ gap: 12, padding: '13px 16px' }}>
                      {/* The read rows keep the dot's 8 pt so every title
                          starts on the same line — the frame draws an empty
                          8 × 8 there rather than closing the gap. */}
                      <span
                        aria-hidden="true"
                        className="shrink-0 rounded-pill"
                        style={{
                          width: 8,
                          height: 8,
                          background: row.unread ? 'var(--color-accent-violet)' : 'transparent',
                        }}
                      />
                      <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 2 }}>
                        <p className="w-full text-body font-semibold">
                          {title}
                          {row.unread && <span className="sr-only"> · unread</span>}
                        </p>
                        <p className="w-full text-caption" style={{ color: 'var(--color-ink-secondary)' }}>
                          {sub}
                        </p>
                      </div>
                      <time className="text-caption2 shrink-0" style={{ color: 'var(--color-ink-secondary)' }}>
                        {row.time}
                      </time>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
