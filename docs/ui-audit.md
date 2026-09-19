# UI audit — my-own-booking (CozyPlaces)

Design review of the guest-facing and owner-facing UI, captured 2026-09-17 against commit
`a4892c8`. Reviewed as code plus a live pass over `/`, `/hostings/all`, and
`/hosting/[slug]` at 1440×900 and 390×844.

Each item records the problem, the reasoning, and a before/after so the change is auditable
later. Update the status inline as items land — this file doubles as the UI changelog.

Legend: ✅ Done · 🚧 In progress · ⬜ Not started · ⏭️ Skipped

---

## Summary

| Status | # | Item | Phase | Files |
|---|---|---|---|---|
| ✅ | 1 | Collapse two competing accent colours into one brand token | 1 | `src/app/globals.css`, `src/components/header.tsx`, `src/components/favourite-hostings-button.tsx`, `src/app/(auth)/layout.tsx`, `src/app/owner/layout.tsx` |
| ✅ | 2 | Rewrite product vocabulary: "hosting" → "place" | 1 | `src/app/page.tsx`, `src/components/header.tsx`, `src/components/owner-avatar.tsx`, `src/components/hostings-list.tsx`, `src/app/hostings/[place]/page.tsx`, `src/app/favourites/page.tsx`, `src/app/owner/dashboard/page.tsx`, `src/app/layout.tsx`, `src/components/hosting-button.tsx`, `src/components/hosting-form.tsx` |
| ✅ | 3 | Make price the visual anchor; drop the three-icon stack | 1 | `src/components/hosting-card.tsx`, `src/app/hosting/[slug]/page.tsx` |
| ✅ | 4 | `Pin` → `MapPin` (wrong icon: `Pin` is a pushpin) | 1 | `src/components/hosting-card.tsx`, `src/app/hosting/[slug]/page.tsx` |
| ✅ | 5 | Fix contrast on nav, footer, and form errors | 1 | `src/components/header.tsx`, `src/components/footer.tsx`, `src/components/*-form.tsx` |
| ✅ | 6 | Fix `1 guests` pluralisation and `8.000` number format | 1 | `src/components/hosting-card.tsx`, `src/app/page.tsx`, `src/app/hosting/[slug]/page.tsx` |
| ✅ | 7 | Give the city search field an accessible name (empty `<Label>`) | 1 | `src/components/search-form.tsx` |
| ✅ | 8 | Rebuild the detail page: 2 columns, sticky price panel, fixed-ratio gallery, a CTA | 2 | `src/app/hosting/[slug]/page.tsx`, `src/components/hosting-details-card-images.tsx` |
| ⏭️ | 9 | Make the primary button solid instead of a neon inset shadow | 3 | `src/app/globals.css`, `src/components/ui/button.tsx` |
| ✅ | 10 | Group the search controls into one pill | 3 | `src/components/search-form.tsx`, `src/components/start-date-popover.tsx`, `src/components/end-date-popover.tsx` |
| ✅ | 11 | Second display typeface; drop centred headings on inner pages | 3 | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/h1.tsx`, `src/components/h2.tsx`, `src/app/page.tsx`, `src/app/hostings/[place]/page.tsx`, `src/app/favourites/page.tsx`, `src/app/owner/dashboard/page.tsx`, `src/app/hosting/[slug]/page.tsx`, `src/components/hostings-list.tsx`, `src/components/favourite-hostings-list.tsx` |
| ✅ | 12 | Replace whole-card `scale` hover with a faster, quieter state | 3 | `src/app/globals.css`, `src/components/hosting-card.tsx`, `src/components/hosting-card-images.tsx` |
| ✅ | 13 | Decide the background: real hero or clean — not blurred mush | 3 | `src/components/hero-background.tsx` (new), `src/app/page.tsx`, `src/app/container.tsx`, `src/app/layout.tsx`, `src/app/favourites/page.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/(auth)/signup/page.tsx` |
| ✅ | 14 | Make skeletons match card shape; rewrite the empty state | 3 | `src/components/skeleton-card.tsx`, `src/components/skeleton.tsx`, `src/components/skeleton-grid.tsx` (new), `src/components/empty-state.tsx` (new), `src/components/hostings-list.tsx`, `src/components/favourite-hostings-list.tsx`, `src/app/hostings/[place]/{page,loading}.tsx`, `src/app/favourites/{page,loading}.tsx` |
| ✅ | 15 | Add a listings section to the home page (currently ends in ~300px of nothing) | 3 | `src/app/page.tsx`, `src/lib/server-utils.ts`, `src/components/skeleton-grid.tsx` |
| ✅ | 16 | Repair the theme token system so the `text-black`-style patches can go | 4 | `src/app/globals.css`, `src/app/layout.tsx`, `src/components/hosting-button.tsx`, `src/components/ui/button.tsx`, `src/components/hosting-form.tsx`, `src/components/{start,end}-date-popover.tsx`, `src/components/favourite-hostings-button.tsx`, `src/components/hosting-card.tsx`, `src/components/search-form.tsx` |
| ✅ | 17 | Stop using the brand colour for error toasts — errors need their own colour | 3 | `src/app/(auth)/layout.tsx`, `src/app/owner/layout.tsx` |
| ✅ | 18 | Error page apologises ("Sorry, something went wrong") — say what to do instead | 3 | `src/app/error.tsx` |
| ✅ | 19 | Search errors on `/` are never shown — no `Toaster` mounted there | 3 | `src/app/layout.tsx`, `src/app/(auth)/layout.tsx`, `src/app/owner/layout.tsx` |
| ✅ | 20 | A mistyped `?page=` shows the error page instead of a 404 or page 1 | 3 | `src/app/hostings/[place]/page.tsx` |

---

## What already works

Worth recording so it does not get "improved" away:

- The card grid on `/hostings/all` is well-proportioned — 16:9 images, and the hierarchy
  (photo → name → metadata → host) is the right order.
- The active-nav underline driven by framer-motion's `layoutId` is a genuinely nice detail.
- A dark base is the right call for this product: listing photography reads as more
  expensive against dark than against white.
- Component structure is clean and consistent (`H1`/`H2` wrappers, one `HostingCard` reused
  across guest and owner views, shared `main-container` spacing).

---

## 1. Two accent colours competing

**Status: ✅ landed.**

**Problem.** Two unrelated accents run in parallel: orange `#FF7205` (logo, nav underline,
favourite heart, toast border) and blue `#05acff` (`--color-accent`, button glow, date
picker, the "8.000 hostings" figure, links). The brand speaks orange while the interface
speaks blue, so neither reads as "this is the action colour". Most visible on the home page:
orange logo, blue-glowing `Search` button.

**Decision.** Orange is the brand — it is already in the logo and it suits "cozy". Keep it as
the single accent; demote blue to focus rings only. Also move it into a token, since
`#FF7205` is currently hardcoded in three separate files.

**Before**

```css
/* src/app/globals.css — one accent declared… */
@theme {
  --color-accent: #05acff;
}
```

```tsx
/* …while a different one is hardcoded in three places */
// src/components/header.tsx
<motion.div layoutId="nav-active" className="bg-[#FF7205] h-1 w-full absolute bottom-[-25]" />

// src/components/favourite-hostings-button.tsx
className={cn("transition", { "fill-[#FF7205] text-[#FF7205]": isFavourite })}

// src/app/(auth)/layout.tsx
style={{ border: '1px solid #ff7205', color: '#ff7205' }}
```

**After**

```css
@theme {
  --color-brand: #ff7205;
  --color-brand-hover: #ff8c33;
  --color-focus: #05acff; /* focus rings only */
}
```

```tsx
<motion.div layoutId="nav-active" className="bg-brand h-1 w-full absolute -bottom-4" />
className={cn("transition", { "fill-brand text-brand": isFavourite })}
```

`-bottom-4` lands the underline on the header's bottom border. The old `bottom-[-25]` was an
arbitrary value with no unit, so it generated `bottom: -25` — invalid CSS that the browser
dropped; the bar was sitting at its static position by accident.

The toast borders in both layouts now read `var(--color-brand)` instead of a literal. They
still use the brand colour for *error* toasts, which is semantically wrong — logged as
item 17.

### What this cost: Tailwind layer ordering

Folding the button's hover colours into `.common-btn` looked like an easy win. It is not
available yet, and the reason is worth recording:

- `.common-btn` sits in `@layer components`; Tailwind's own utilities sit in
  `@layer utilities`, which **outranks** it. So a plain `background-color` in `.common-btn`
  loses to `bg-transparent` from `buttonVariants`, and a plain `box-shadow` loses to
  `shadow-xs`.
- The original `inset-shadow-[0_0_5px_5px_#05acff]` worked because utilities compose through
  CSS variables: `inset-shadow-*` writes `--tw-inset-shadow` while `shadow-xs` writes
  `--tw-shadow`, and both feed one `box-shadow`. They never collided.
- Tailwind **cannot** build `inset-shadow-[0_0_5px_5px_var(--color-brand)]` — the arbitrary
  value silently fails to generate and `--tw-inset-shadow` stays at its reset value. Verified
  in the browser: `getComputedStyle(btn).boxShadow` had no inset layer.

So the glow is now plain CSS placed in `@layer utilities` (where it outranks `shadow-xs`)
while keeping the colour token, and the `hover:bg-brand …` utilities stay on the six call
sites. Removing that duplication would need a real `brand` variant on `Button` — item 9,
which was skipped, so the duplication stays by choice.

---

## 2. The word "hosting" works against the product

**Status: ✅ landed.**

**Problem.** In English, *hosting* means web hosting. "Find nice and cozy hosting to stay"
reads as if the product sells servers. The domain word is **place** / **stay** / **home** /
**listing**. This is the cheapest high-impact fix in the whole audit: it costs zero lines of
CSS.

**Before → After**

| Before | After |
|---|---|
| Find nice and cozy hosting to stay | Find a cozy place to stay |
| Browse more than 8.000 hostings for you | 8,000 places to choose from |
| All Hostings | All places |
| Owned by Emily Robinson | Hosted by Emily Robinson |
| Welcome to do that here | List your place |
| Sorry, no hostings found with the entered data | No places match these dates. Try another city or widen your dates. |

Internal identifiers (`Hosting` model, `getHostings`, routes) can stay as they are — this is
about user-facing strings only. Renaming the data model is a separate, larger decision.

---

## 3. Price is not the visual anchor

**Status: ✅ landed.**

**Problem.** `116 /night` is set at the same size and weight as `5 guests`. On a booking
card the price is the number people scan for. Compounding it, three identical icons stacked
vertically (`$` / pin / users) is a generic pattern, and `DollarSign` duplicates a symbol
that the value already carries.

**Before**

```tsx
<div className="flex items-center gap-2">
  <DollarSign className="h-4 w-4 text-foreground"/>
  <span className="text-muted-foreground">
    <span className="font-bold text-foreground">{price} </span>
    /night
  </span>
</div>
<div className="flex items-center gap-2">
  <Pin className="h-4 w-4 text-foreground" />
  <span className="text-muted-foreground">{location}</span>
</div>
<div className="flex items-center gap-2">
  <Users className="h-4 w-4 text-foreground" />
  <span className="text-muted-foreground">{maxGuests} guests</span>
</div>
```

**After** — one metadata line, price promoted and set in `tabular-nums`:

```tsx
<p className="text-muted-foreground text-sm">
  {location} · {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}
</p>
<p className="text-2xl font-semibold tabular-nums">
  ${price}
  <span className="text-base font-normal text-muted-foreground"> / night</span>
</p>
```

```
Before                      After
┌──────────────────┐        ┌──────────────────┐
│ [photo]          │        │ [photo]          │
│ Sunny Penthouse  │        │ Sunny Penthouse  │
│ $ 116 /night     │        │ Kyiv · 5 guests  │
│ ⚲ Kyiv           │        │ $116 / night     │  ← 24px, tabular
│ ⚇ 5 guests       │        │ ───              │
└──────────────────┘        └──────────────────┘
```

---

## 4. Wrong icon for location

**Status: ✅ landed.**

lucide's `Pin` is a pushpin (a stationery thumbtack). The map marker is `MapPin`. Small, but
it is the kind of thing that reads as carelessness at a glance.

**Before** `import { DollarSign, Pencil, Pin, Trash2, Users } from "lucide-react"`
**After** `import { MapPin, Pencil, Trash2, Users } from "lucide-react"`

---

## 5. Contrast below WCAG minimums

**Status: ✅ landed.**

Measured against the `bg-slate-950` body.

| Element | Before | Approx. ratio | After |
|---|---|---|---|
| Inactive nav links | `text-white/50` | ~3.4:1 | `text-white/70` |
| Footer copyright + links | `text-white/25` | ~1.9:1 | `text-white/50` |
| "Popular cities" label | `text-white/50` | ~3.4:1 | `text-white/65` |
| Form errors | `text-red-500` | raw Tailwind, outside the system | `text-destructive` |

Target: 4.5:1 for body text, 3:1 for large text. The footer is currently close to invisible.

---

## 6. Broken pluralisation and number format

**Status: ✅ landed.**

**Problem.** Two formatting bugs, both visible in the live UI.

**Before**

```tsx
// src/components/hosting-card.tsx — renders "1 guests" for single-guest listings
<span className="text-muted-foreground">{maxGuests} guests</span>

// src/app/page.tsx — "8.000" is a decimal point in en-US, so this reads as eight
<span className="font-bold text-accent">8.000 hostings</span>
```

**After**

```tsx
{maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}

8,000 places
```

The dashboard already handles this correctly (`hostings.length === 1 ? 'hosting' : 'hostings'`),
so this is an inconsistency rather than an unknown.

---

## 7. Search field has no accessible name

**Status: ✅ landed.**

**Problem.** The label is rendered but empty, so screen readers get nothing. A `placeholder`
is not an accessible name.

**Before**

```tsx
<Label htmlFor="city" className="sr-only"></Label>
<Input {...register('city')} id="city" placeholder="Enter city name..." />
```

**After**

```tsx
<Label htmlFor="city" className="sr-only">City</Label>
<Input {...register('city')} id="city" placeholder="Enter city name..." />
```

---

## 8. The detail page is the weakest screen

**Status: ✅ landed.**

And it is the one where the decision to book gets made. Current state:

- a **portrait** image centred at ~650px tall with large empty gutters either side;
- a thumbnail carousel below it — and only *then* the listing name;
- price, city, and guests as three identical 16px rows;
- **no CTA at all** — just a small `mailto:` line at the very bottom.

**Before**

```
┌────────────────────────────────┐
│        ┌──────────┐            │
│        │ portrait │            │  ← 650px tall, object-contain-ish
│        │  photo   │            │
│        └──────────┘            │
│   ◄ [thumb][thumb][thumb] ►    │
│ ───────────────────────────    │
│ Sunny Penthouse in Kyiv     ♡  │  ← name arrives here
│ Welcome to this stylish…       │
│ $ 116 / night                  │
│ ⚲ Kyiv                         │
│ ⚇ 5 guests                     │
│ Owned by Emily                  │
│ Contacts: hello@demo.com        │  ← the only way to act
└────────────────────────────────┘
```

**After**

```
┌──────────────────────────────────────────────┐
│ Sunny Penthouse in Kyiv                   ♡  │
│ Kyiv · 5 guests                              │
│ ┌────────────────────────┬─────────┬───────┐ │
│ │                        │ [thumb] │[thumb]│ │  ← 3:2, object-cover
│ │        hero 3:2        ├─────────┼───────┤ │
│ │                        │ [thumb] │ +4    │ │
│ └────────────────────────┴─────────┴───────┘ │
│ ┌──────────────────────────┐ ┌─────────────┐ │
│ │ About this place         │ │ $116 /night │ │ ← sticky
│ │ Welcome to this stylish… │ │ ┌─────────┐ │ │
│ │                          │ │ │ dates   │ │ │
│ │ Hosted by Emily Robinson │ │ │ guests  │ │ │
│ │ [avatar] bio…            │ │ └─────────┘ │ │
│ │                          │ │ [ Book ]    │ │
│ └──────────────────────────┘ └─────────────┘ │
└──────────────────────────────────────────────┘
```

Key moves: fixed aspect ratio with `object-cover` so portrait and landscape photos cannot
break the layout differently; `h1` above the gallery; two columns on desktop with the price
panel `sticky` so it stays on screen while the description is read.

### What landed, and where it differs from the sketch

- **CTA is "Contact host", not "Book".** There is no `Booking` model — `Availability` only
  stores one `from`/`to` range. Date and guest fields that submit nowhere would promise
  something the product cannot do, so the panel shows price, the availability range, and a
  `mailto:` button (subject pre-filled with the listing name). Real booking is a separate
  feature: model, migration, overlap validation.
- **Gallery geometry.** `grid-cols-[3fr_1fr_1fr] grid-rows-2` inside `aspect-[5/2]`: the hero
  is 3/5 wide and 2/5 tall, so it is exactly 3:2 and the tiles come out square. The ratio
  lives on the container, so no photo can change the layout. Under five photos the tiles
  would leave holes, so the hero takes the full width instead.
- **Lightbox.** Every tile opens a `Dialog` + the existing `Carousel` at that index; the last
  tile carries `+N` for the photos beyond five. Photos use `object-contain` there — the
  full frame matters once someone asked to see it.
- **Mobile** keeps a swipe carousel (3:2, `1 / 7` counter), and the price panel moves above
  the description with `order-first lg:order-none` — otherwise the CTA sat below the whole
  host bio.
- **Dates from `getHosting` are strings.** `unstable_cache` round-trips through JSON, so the
  page wraps them in `new Date()` before formatting (`timeZone: "UTC"` to avoid an
  off-by-one day).

**Known dev warning.** Next reports the mobile hero as an LCP image without `priority`. It is
loaded `eager` with `fetchPriority="high"`; `priority` was removed on purpose because it adds
a `<link rel=preload>` that desktop — where the carousel is `md:hidden` — would download
and never use. The hidden images also get `sizes="(max-width: 767px) 100vw, 1px"` so desktop
picks the smallest variant.

---

## 9. The primary button does not read as a button

**Status: ⏭️ skipped (2026-09-18).** Owner's decision: the glow button is part of the look the
owner wants to keep. The analysis below is left as a record of the trade-off, not as a to-do.

Consequences of keeping it:

- The six `hover:bg-brand hover:text-slate-950 focus:bg-brand active:bg-brand` call sites stay
  duplicated — there is no `brand` variant to fold them into.
- `button.tsx`'s `default` variant stays `bg-transparent`, so any new unstyled `<Button>` is
  still invisible until it gets a class.
- Carousel arrows keep their inline `style={{ color }}` switch on `arrow-color` (now matched
  with `includes`, not `===`). Inline style beats every Tailwind class, hover included — which
  is why the lightbox arrows turned white-on-white on hover and needed a local
  `hover:bg-white/15`.

**Problem.** A transparent fill plus a blurred inset glow is not a button, it is a neon sign.
And `hover:bg-accent` swaps the fill to blue, so hovering makes it look like a different
component rather than the same component in a different state.

**Before**

```css
.common-btn {
  @apply inset-shadow-[0_0_5px_5px_#05acff] text-white rounded-md py-2 px-4
         bg-transparent transition duration-200;
}
```

```tsx
<Button className="common-btn hover:bg-accent focus:bg-accent active:bg-accent" />
```

**After**

```css
.common-btn {
  @apply bg-brand text-slate-950 font-medium rounded-md py-2 px-4
         hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-focus
         transition-colors duration-150;
}
```

Note also that `src/components/ui/button.tsx` has had its `default` variant changed to
`bg-transparent`, so every unstyled `<Button>` in the app is invisible until a class is
passed. That is why `common-btn` exists at all.

---

## 10. Search controls do not read as one action

**Status: ✅ landed.**

**Problem.** Four separate 36px fields with their own borders plus a glowing button. It is
one action — "find a place for these dates" — but it looks like four unrelated inputs.

**Before**

```
[ Enter city name… ]  [ September 17th, 2026 ]  [ End Date ]  [ - 1 + ]  [ Search ]
```

**After** — one container with internal dividers:

```
╭──────────────┬──────────────┬─────────┬──────────╮
│ Where        │ When         │ Guests  │ [Search] │
│ Kyiv         │ Sep 17 – 21  │ 2       │          │
╰──────────────┴──────────────┴─────────┴──────────╯
```

Collapses to the current stacked layout below `lg`.

### What landed

```
╭─────────────────┬────────────────┬────────────────┬───────────────┬──────────╮
│ Where           │ Check in       │ Check out      │ Guests        │ [Search] │
│ Enter city name…│ Sep 18, 2026   │ End Date       │ -  1  +       │          │
╰─────────────────┴────────────────┴────────────────┴───────────────┴──────────╯
```

- **Every rule is `lg:`-prefixed**, so the stacked layout below `lg` (390px and 900px checked)
  is untouched. Four class strings at the top of `search-form.tsx` (`segment`, `divider`,
  `caption`, `bare`) keep the pill rules in one place.
- **Two date segments, not one "When".** A single range field means switching `DayPicker` to
  `mode="range"` and reworking the start/end state — a behaviour change, not a visual one.
- **Focus moves to the segment.** The controls lose their own ring inside the pill; the
  segment lights up via `has-[:focus-visible]` instead.
- **Dividers are `::before` lines**, not `border-l`: a border on a `rounded-full` segment
  curves into a `(`.
- **Guests is `lg:flex-none`.** With every segment on `flex-1`, "- 1 +" got the same width as
  the city field and read as mostly empty. It now sizes to its content; the freed width goes
  to city and dates. Segments stay left-aligned (caption over value, like the reference
  pattern): centring would leave caption and value with ragged, unaligned edges and put the
  typing caret mid-field.
- **Segments use `items-stretch`.** With `items-center`, segments of different content height
  sat at different offsets and the captions drifted by 2px.
- **Date format `PPP` → `MMM d, yyyy`** ("Sep 18, 2026" instead of "September 18th, 2026") so
  it fits a segment; matches the availability format on the detail page.
- **Fixed in passing:** at 1440px the old `md:w-[50%]` form (720px) was narrower than its
  controls, so the city field and guest counter were clipped. The pill is `lg:max-w-4xl`.

Not done, noted: the `-`/`+` guest buttons have no accessible name beyond the glyph.

---

## 11. Typography: one face, one weight, everything centred

**Status: ✅ landed.**

**Problem.** Inter + `font-bold` + `text-center` on every heading. Inter is a safe choice,
which is exactly why it reads as a default — it is the typeface you use before you have
chosen a typeface. And a centred `H1` above a card grid makes a catalogue look like a
landing page.

**Before**

```tsx
// src/app/layout.tsx
const inter = Inter({ subsets: ["latin"] });

// src/components/h1.tsx
className="text-3xl lg:text-6xl font-bold tracking-tight text-center"
```

**After**

```tsx
// Fraunces: a variable soft serif with opsz/SOFT axes — literally tunable for "cozy".
// Bricolage Grotesque is the sans alternative if a serif feels wrong.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

// h1.tsx — centring becomes opt-in per page, not baked in
className="font-display text-3xl lg:text-6xl tracking-tight"
```

Also: `ViewSection` in `src/app/page.tsx` uses `opacity-75` to dim the subheading. Opacity
multiplies with ancestor layers and gives unpredictable values — use a colour token instead.

### What landed

- **Fraunces for headings, Inter for everything else.** `next/font` loads Fraunces with the
  `SOFT` and `opsz` axes into `--font-fraunces` on `<html>`; `globals.css` maps it to a
  `font-display` utility and binds `"SOFT" 50` to it via
  `--font-display--font-variation-settings`, so every `font-display` heading gets the rounded
  serifs without repeating the setting. `opsz` needs no setting — `font-optical-sizing: auto`
  picks it from the font size.
- **Weight `bold` → `semibold`.** A serif at 60px carries more ink per glyph than Inter; 700
  looked heavy.
- **Centring is opt-in.** `H1`/`H2` no longer carry `text-center`. Pages that want it pass it:
  home, login, signup, account, 404, error, legal H1s, both empty states. Catalogue,
  favourites and dashboard titles are now left-aligned.
- **Left-aligned needs width.** `main-container` is `items-center`, so a bare `h1` shrinks to
  its text and gets centred as a flex item regardless of `text-align`. Catalogue titles are
  `w-full max-w-[1100px]` — the card grid's width — and line up with the first card at 1440,
  900 and 390px (measured, same `left`).
- **Also applied to** the detail page `h1` (it is an inline `<h1>`, not `H1`).
- **`opacity-75` → `text-white/75`.** Side effect: "8,000 places" is no longer dimmed along with
  the rest of the line, so the brand orange is at full strength.
- `H1` built its classes with a template string inside `cn(...)`, which leaked a literal
  `undefined` class when no `className` was passed; now `cn(base, className)`.

Not checked in the browser: the owner dashboard (behind login). Its H1 got `w-full` for the
same flex reason.

Dev note: the first reload after this change still served Inter — the dev server's CSS was
built from the previous `globals.css`. Touching `globals.css` fixed it; nothing in the code.
It happened again in items 12 and 13 — in 13 without `globals.css` being edited at all, and
`touch` no longer helped. See item 13 for what does.

---

## 12. Hover states are the most generic part

**Status: ✅ landed.**

**Problem.** `scale` on an entire card over 500ms is the default effect applied to any
catalogue, and it is slow enough to feel like lag. The card also has no border state change,
so the only feedback is the growth.

**Before**

```css
.state-effects {
  @apply hover:scale-103 focus:scale-103 transition duration-500;
}
```

**After** — move the motion inside the image, show state on the card border:

```css
.state-effects {
  @apply transition-colors duration-150 hover:border-white/25 focus-visible:border-white/25;
}
/* card keeps overflow-hidden; the img inside gets the subtle scale */
```

### What landed

| State | Before | After |
|---|---|---|
| Hover | whole card `scale-103`, 500ms | border `white/10 → white/25` (150ms) + photo `scale-103` (300ms, ease-out) |
| Keyboard focus | whole card `scale-103` | 2px `focus` ring with offset + the same border |
| Reduced motion | card still scaled | border only — the photo zoom is `motion-safe:` |
| Owner dashboard | whole card scaled | no hover state |

- **Resting border changed too.** The card took `border-border`, which with the light tokens
  active (item 16) is near-white `oklch(0.929…)`. The recipe's `hover:border-white/25` would
  have made hover *dimmer* than rest. Rest is now `border-white/10`, so hover reads as a lift.
- **`group` on the link, `group-hover:` on the card.** `.state-effects` sits on the `<Link>`
  but the border belongs to `Card` inside it. `group` cannot go into `.state-effects`: in
  Tailwind v4 it is a marker class, not a utility, so it cannot be `@apply`-ed.
- **Tailwind v4 scales with the `scale` property, not `transform`.** Checking
  `getComputedStyle(el).transform` reports `none` for `scale-103`; read `.scale` instead.
- **Owner cards lost their hover.** They are not clickable as a whole — only the edit/delete
  buttons are — so a card-level hover promised a click that does nothing.

Verified at 1440px: hovered card keeps its box (same `left`/`width` as its neighbour), border
goes to 25%, photo to `scale: 1.03`; `Tab` from the nav lands on the first card with
`:focus-visible` and the ring drawn.

---

## 13. The blurred background is a half-measure

**Status: ✅ landed — hero.** Both options were built behind a temporary `?bg=` switch and
compared live at 1440 and 390px; the owner chose the hero. The switch is gone.

**Problem.** On `/`, `/login`, and `/favourites` a photo is pushed through `blur-2xl` and
becomes a blue-violet diagonal smear. It adds no atmosphere (nothing is legible) and no
cleanliness (the background stops being even). `Container`'s `bg-white/[2%]` compounds it by
drawing a visible vertical panel with hard edges down both sides of the viewport.

Pick one:

- **A real hero** — unblurred photo, gradient overlay for legibility, headline and search
  form on top. Then the image earns its bytes.
- **Or a clean field** — drop the image and `bg-white/[2%]`, keep one subtle gradient. Then
  the typography carries the page.

**Before**

```tsx
<section className="absolute inset-0 z-[-1] overflow-hidden">
  <Image src={MainBackground} fill className="object-cover blur-2xl" quality={50} />
</section>
```

Also worth noting: this ships a full-size JPEG on three routes purely to display a colour
blur. Either option above is also a performance win.


### What landed

| Page | Before | After |
|---|---|---|
| `/` | `background-img-13` through `blur-2xl` | the same photo sharp and full-bleed: headline and search over the sky, the lit house below the text |
| `/login`, `/signup` | `img-10` / `img-3` blurred | same photos sharp; the form sits on a glass panel (`bg-slate-950/75 backdrop-blur-md`) |
| `/favourites` | `img-2` blurred | no photo — a grid of photo cards needs no photo underneath |
| every page | `Container` drew a `bg-white/[2%]` column with hard edges | removed |

- **One component, `HeroBackground`.** Full-bleed photo + a gradient that is dark behind the
  headline, clear through the middle and dissolves into the page in the last 8%. `className`
  sizes the photo box: making it taller than the page (`h-[170%]` on `/`) pushes the subject
  down; `/` also shifts the crop on phones with `max-sm:[&_img]:object-[56%_0%]` to centre the
  house, which sits right of centre in the photo.
- **Full-bleed without `100vw`.** `100vw` includes the always-on scrollbar, so the hero was 8px
  wider than the page and scrollable sideways. `overflow-x-hidden` only blocks *user*
  scrolling. The hero is `100cqw` of a full-width `@container` wrapper in `layout.tsx` — the
  page width without the scrollbar.
- **Not on `<body>`.** `@container` on `<body>` first looked fine, but containment on body stops
  its `overflow` propagating to the viewport: body became its own scroller (`clientWidth`
  jumped 1425 → 1440), which breaks anything listening to `window` scroll. Hence the wrapper.
- **The glass panel is needed** because the inputs are transparent (`bg-transparent`): without
  it stars and branches showed through the fields, and "No account yet?" sat on a snowy roof.

**Known limitation — resolution.** The photos are 728px (`img-13`) and 612px (`img-10`,
`img-3`) wide. Sharp and scaled ~3× on a 1440px screen they look soft and the stars pixelate.
A ≥1920px replacement drops straight in: same file, composition is already tuned.

**On phones** the stacked search form leaves no empty band, so the house can only partly clear
the text: the headline and form sit on the sky, "List your place" on the roof, and the lit
windows below it.

**Dev-server gotcha (third time).** New classes in `src/app/(auth)/*` never reached the served
CSS, and `touch globals.css` did not help. Tailwind itself found and built them (checked with
`@tailwindcss/oxide` and `compile`); the dev server's cached build did not. A real content
change to `globals.css` (append a line, reload, remove it) forces the rescan.

---

## 14. Loading and empty states

**Status: ✅ landed.**

**Problem.** `SkeletonCard` is a circle plus two short lines, but what loads is a grid of
cards with 16:9 photos. A skeleton that does not match the content's shape produces a visual
jump. And the empty state is a centred apology rather than a next step.

**Before**

```tsx
// skeleton-card.tsx
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[250px]" />

// hostings-list.tsx
<H2 className="text-muted-foreground">Sorry, no hostings found with the entered data</H2>
```

**After**

```tsx
// Mirror the real card: 16:9 block, title, two metadata lines
<div className="basis-80 max-w-[500px] w-full">
  <Skeleton className="aspect-video w-full rounded-xl" />
  <Skeleton className="mt-6 h-6 w-2/3" />
  <Skeleton className="mt-3 h-4 w-1/2" />
  <Skeleton className="mt-2 h-7 w-1/3" />
</div>

// Empty state: say what happened, offer the way out
<H2>No places match these dates</H2>
<p>Try another city, or widen your date range.</p>
<Button asChild><Link href="/hostings/all">Browse all places</Link></Button>
```


### What landed

- **`SkeletonCard` mirrors `HostingCard`**: same outer box (`flex-1 basis-80 max-w-[500px]`),
  same chrome, a 200px photo block (the card's image is a fixed 200px, not 16:9), and
  `CardContent`'s own `gap-y-2`/margins with each bar the height of the line it stands for.
  Measured at 1440px on `/hostings/all`: skeleton `163, 305, 340×427`, card `163, 305, 340×431`.
  The 4px left is the card's own `<img>` baseline gap (an inline image inside the carousel), not
  the skeleton.
- **`SkeletonGrid`** uses the list's exact classes (`gap-10`, `justify-center`,
  `max-w-[1100px]`); the old loading grids used `gap-20` and `justify-between`.
- **`loading.tsx` had two jobs.** The pages imported it as their `Suspense` fallback *under*
  the title, while Next also renders it *instead of* the page during navigation. Its `py-24`
  was too much in the first role and too little in the second. Now: `Suspense` falls back to
  `SkeletonGrid`; `loading.tsx` renders the page's own `main-container`, a title placeholder
  and the grid.
- **Favourites flashed "no favourites" before its cards.** The list reads `localStorage` in a
  `useEffect`, which `Suspense` never sees, and its state started as `[]`. It now starts as
  `null` (= not loaded) and shows `SkeletonGrid` until the first load; a failed load falls back
  to `[]`. Verified with a `MutationObserver` over a client-side navigation with two
  favourites saved: SKELETON → CARDS, no empty state in between.
- **`EmptyState`** (title, one line of help, one action) replaces both apologies:

  | List | Title | Action |
  |---|---|---|
  | search / city | No places match your search — *Try another city, or widen your dates.* | Browse all places (on `/hostings/all` itself: Start a new search → `/`) |
  | favourites | No favourites yet — *Tap the heart on any place to save it here.* | Browse all places |

  The favourites copy also finally drops the leftover "hostings" from item 2.
- `Skeleton` used `rounded-mb` — not a class — so skeletons had square corners; now `rounded-md`.

Known, not fixed: favourites shows a full page of 6 skeletons even when 2 places are saved.
The count lives in `localStorage` and is only known after hydration, so matching it would mean
a second render pass just for the placeholder.

Not in this item: `src/app/hosting/[slug]/loading.tsx` is still three bars of text, while the
page is now gallery + two columns (item 8).

**Follow-up (2026-09-19): detail-page skeleton.** Reported by the owner: while a place loaded,
only the header and footer showed, with the footer pulled up under the header. The old
`loading.tsx` was three bars in a plain `div` — no `main-container`, no `min-h-screen`.

It now mirrors `page.tsx` box for box: title row + heart, the `aspect-[5/2]` gallery grid
(`aspect-[3/2]` on phones), the description column and the price panel (first on phones).
Measured by delaying the page's RSC request 3s in Playwright and comparing skeleton vs page:

| | 1440px skeleton / page | 390px skeleton / page |
|---|---|---|
| Title row | 72 / 72 | 104 / 104 |
| Gallery | 1152×461 / 1152×461 | 351×234 / 351×235 |
| Price panel | 214 / 214 | 214 / 214 |

- On phones a name wraps to two 36px lines, so the title placeholder is two `h-8` bars there
  (32 + 8 + 32 = 72) and one bar from `sm` up.
- Small text lines are `h-5`, not the `Skeleton` default `h-4`: a `text-sm` line is 20px tall,
  and 4px per line was what made the panel 8px short.
- The description column cannot match — its length differs per place. It is below the fold at
  both widths, so the difference is not seen as a jump.

---

## 15. The home page ends in nothing

Below the search form there is roughly 300px of empty space before the "share your hosting"
block. A booking home page with **no listing imagery at all** gives up its strongest asset —
and `HostingCard` already exists. A "Recently added" or "Popular in Kyiv" row of three cards
fills the fold and shows people what is actually in the catalogue.

Also at 390px: "Want to share your hosting with the whole world?" runs to the very edge —
`text-2xl` is too large there.

**Status: ✅ landed.**

### What landed

```
┌───────────────────────────────────────────┐
│  hero — unchanged (headline, search, house) │  ← still 782px at 1440×900
├───────────────────────────────────────────┤
│ Top rated                    All places → │
│ [card]        [card]        [card]         │  ← same HostingCard, same 340px slots
└───────────────────────────────────────────┘
```

- **"Top rated", not "Guest favourites".** The schema has `guestFavorite`, but no row in the
  database sets it, so a favourites row rendered empty. `getFeaturedHostings` takes the three
  highest `rating`s with no filter — it works on any data. Cached with the `get-hostings`
  tag, so the create/edit/delete actions that already revalidate the catalogue refresh it too.
- **The problem statement had gone stale.** After item 13 the "300px of nothing" is where the
  lit house sits. The row goes *below* the hero, not into that band.
- **The hero had to be pinned.** The photo box is `h-[170%]` *of the hero*, and on desktop the
  hero's height came from `flex-1` (782px of box around 626px of content), i.e. from the
  viewport. With cards underneath, `flex-1` stops stretching it and the house jumps up under
  the text. The hero is now a `<section className="main-container relative">` inside a plain
  `<main>`, with `md:min-h-[calc(100svh-118px)]` (69px header + 49px footer) — the exact
  height it had. Measured: 782px before and after. On phones the content was already taller
  than that, so no min-height there.
- **Cards stream in.** The row sits in `Suspense` with `SkeletonGrid count={3}` (new optional
  prop, default 6), so the hero never waits on the query.
- **Alignment.** The heading row is `max-w-[1100px]` like the catalogue: "Top rated" and the
  first card both start at `left: 163` at 1440px — the same as `/hostings/all`. At 390px the
  cards stack full-width with the 12px gutter; no horizontal scroll.
- **`ViewSection` is `text-xl sm:text-2xl lg:text-3xl`.** On phones the hero is 12px shorter
  (700 → 688), so the house sits ~20px higher; "List your place" was on the roof before and
  still is. "Top rated" now peeks above the fold at 390×844 — a cue that the page goes on.

Type gotcha: `orderBy: { rating: 'desc' }` made TypeScript drop the `include` from the result
type (no `owner`, no `availability`). `'desc' as const` fixes it — the widened `string` no
longer matched Prisma's overload.

**Follow-up: price format.** Prices had no thousands separator (`$2800 / night`) — item 6 fixed
the headline figure but the card and the detail panel rendered `price` raw. Both now use
`price.toLocaleString('en-US')` → `$2,800`. The locale is explicit on purpose: `HostingCard` is a
client component, and a bare `toLocaleString()` could format differently on the server and in
a browser set to e.g. `uk-UA` (`2 800`), which is a hydration mismatch.

---

## 17. Error toasts in the brand colour

**Status: ✅ landed.**

**Problem.** Both `Toaster`s (`(auth)` and `owner` layouts) forced every toast to brand orange
through an inline `style`. The toasts in use are `toast.error` (8 call sites) and one
`toast.warning` — so the colour that means "this is the action" also meant "this failed".

**Before**

```tsx
<Toaster
  position="top-right"
  toastOptions={{
    className: 'bg-slate-950 text-white border-1 border-white',
    duration: 5000,
    style: { backgroundColor: '#020618', border: '1px solid var(--color-brand)', color: 'var(--color-brand)' },
  }}
/>
```

**After**

```tsx
<Toaster position="top-right" theme="dark" richColors toastOptions={{ duration: 5000 }} />
```

- **sonner already ships per-type colours** — `richColors` switches them on:
  `[data-rich-colors=true][data-type=error]` reads `--error-bg/-border/-text`, which sonner's
  dark theme defines. The inline `style` was what overrode them; inline beats any selector.
  The `className` was dead: sonner's `[data-sonner-toast][data-styled=true]` rules outrank a
  single class.
- **`theme="dark"` is explicit** because `ui/sonner.tsx` reads `useTheme()` and there is no
  `ThemeProvider` (item 16), so it was always `"system"` — light toasts on a light OS.
- Measured on `/login` with a wrong password: `type=error`, background `rgb(45 6 7)`, border
  `rgb(77 4 8)`, text `rgb(255 158 161)` — about 8:1. Warnings get sonner's amber.
- **sonner's red, not `--destructive`.** Form errors use `text-destructive`, but that token
  resolves to the *light* theme value until item 16. Worth unifying once the tokens are wired.

Seen in passing: search errors on the home page are never shown — logged as item 19.

---

## 18. The error page apologises

**Status: ✅ landed.**

**Problem.** "Sorry, something went wrong" + a frown icon: an apology, no explanation, and one
way forward (`Try again`) that fails again if the error is not transient.

**Before**

```tsx
<H1 className="flex gap-4 items-center justify-center mb-12">
  <span>Sorry, something went wrong</span>
  <span><FrownIcon size={40} /></span>
</H1>
<Button onClick={reset} className="common-btn …">Try again</Button>
```

**After** — the same shape as `EmptyState` (title, one line, the way out):

```
          This page didn't load
It's usually temporary. Try again, or go back to the home page.
          [ Try again ]   Go to home page
```

- `Try again` stays the primary action (it calls `reset()`); "Go to home page" is a quiet text
  link — the exit when retrying does not help.
- `EmptyState` is not reused: its action is a `Link`, and here the primary action is a callback.
- Checked by forcing an error with `/hostings/all?page=-5`: one line at 1440px
  (`max-w-lg text-balance`).

Seen in passing: that URL is user-reachable — logged as item 20.

---

## 19. Search errors on the home page are never shown

**Status: ✅ landed.** Found while doing item 17.

**Problem.** `search-form.tsx` reports failures with `toast.error(error.message)`, but a
`Toaster` is mounted only in the `(auth)` and `owner` layouts. On `/` — where the search form
lives — the call goes nowhere: the search silently does nothing.

**Proposed.** Mount one `Toaster` in the root `layout.tsx` and remove the two copies from the
`(auth)` and `owner` layouts (they are identical since item 17). Every page then shows its
toasts, and the toast config lives in one place.

### What landed

As proposed. The `(auth)` layout shrank to its `<main>`; the owner layout to its
`OwnerDataProvider` — the fragments existed only to hold the `Toaster`.

Verified: `/` now has one `Notifications` region (it had none); `/login` still has exactly one
(no duplicate), and a wrong password still shows the red error toast with the same colours.

Not verified end to end: the search error itself. `searchHosting` only fails when
`searchFormSchema` rejects the input, and the form runs the same schema on the client first —
so today that toast is a safety net that is hard to reach from the UI.

---

## 20. A mistyped `?page=` shows the error page

**Status: ✅ landed.** Found while doing item 18.

**Problem.** `getHostings` validates its params with `searchFormSchema` and throws
`Invalid search parameters` when they fail. The params come straight from the URL, so
`/hostings/all?page=-5` (or `?page=abc`, or a stale bookmark) lands on "This page didn't load"
— the page for *our* failures, shown for a URL the visitor typed. `Try again` fails again.

**Proposed.** Treat an invalid URL as the visitor's input, not a crash: on the page, fall back to
page 1 for a non-positive or non-numeric `page` (or call `notFound()` for a page past the last
one). The throw in `getHostings` can stay as a guard for real programming errors.

### What landed

- **Wider than `?page=`.** `guests` and the dates came from the URL unchecked too:
  `?guests=abc` failed the schema (throw), and `?startDate=abc` threw a `RangeError` from
  `toISOString()` on an invalid `Date` before the schema was even reached.
- **Sanitised once, in the page.** Two small helpers in `hostings/[place]/page.tsx`:
  `toPositiveInt` (anything but an integer ≥ 1 → 1, used for `page` and `guests`) and `toDate`
  (unparseable → `undefined`, i.e. no date filter). `getHostings` keeps its throw.
- **No `notFound()` for a page past the end.** `?page=99` already renders the empty state with a
  way out ("Browse all places"), which is more useful than a 404.

Verified by fetching each URL: `?page=-5`, `?page=abc`, `?page=1.5`, `?guests=0`, `?guests=abc`
and `?startDate=abc&endDate=xyz` all render 6 cards, same as `/hostings/all`; `?page=99` shows
the empty state; none shows the error page.

Not covered: the city in the path. `/hostings/<more than 50 characters>` still fails the
schema's `max(50)` and reaches the error page — rare enough to leave.

---

## 16. The theme token system is not actually wired up

**Problem.** This is invisible on screen today but it is why small patches keep appearing.

`globals.css` defines a full shadcn token set for both `:root` and `.dark`, but:

1. `<html>` never gets the `dark` class, so the **light** tokens are the active ones;
2. in `:root`, the real `--foreground` is commented out and replaced with
   `oklch(100% 0 0)` — white text on a white `--background`;
3. `layout.tsx` hardcodes `bg-slate-950 text-white`, which is the only reason anything is
   readable.

So every `text-muted-foreground` in the cards resolves to the *light* theme's
`oklch(0.854 …)`, a pale grey that happens to work on a dark background. It is a coincidence,
not a system — and it is why `hosting-button.tsx` needs
`<DialogContent className="text-black">` to make the dialog legible. `next-themes` is
installed and unused.

**Before**

```css
:root {
  --background: oklch(1 0 0);
  /* --foreground: oklch(0.129 0.042 264.695); */
  --foreground: oklch(100% 0 0);   /* white on white */
}
```

```tsx
<html lang="en">
  <body className={`${inter.className} bg-slate-950 text-white overflow-y-scroll`}>
```

**After**

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);  /* restored */
}
```

```tsx
<html lang="en" className="dark">
  <body className={`${inter.className} bg-background text-foreground overflow-y-scroll`}>
```

Then `DialogContent`'s `text-black` can go, and the dark palette becomes editable from one
place. Worth doing **after** phases 1–3, since it touches every screen at once.

**Status: ✅ landed.**

### What landed

- **`<html className="dark">`**, and `body` lost `bg-slate-950 text-white` — `@layer base`
  already applies `bg-background text-foreground`. The page background did not move: `.dark`'s
  `--background` is exactly `slate-950` (`oklch(0.129 0.042 264.695)`).
- **`:root` is a real light theme again**: `--foreground` restored, and `--muted-foreground`
  back from the hand-tuned `0.854` to shadcn's `0.554` — that value was a second patch of the
  same kind, making a light-theme token readable on a dark page.
- **Checked by numbers, not by eye.** A Playwright script read the computed colours of the same
  elements on `/`, `/hostings/all`, a detail page, `/login`, `/signup`, `/favourites` and the
  open date picker, before and after.

What the switch would have broken, and what was done about it:

| Found | Why | Fix |
|---|---|---|
| Text on **every** `<Button>` would turn dark navy | `variant: default` used `text-primary-foreground` — near-white in light, `0.208` in dark. `.common-btn`'s `text-white` is in `@layer components`, which utilities outrank | `default` → `text-foreground hover:bg-accent` |
| Favourite heart would vanish | `variant="secondary"`: near-white chip in light, `slate-800` in dark, under a `text-slate-950` heart | Explicit `bg-white hover:bg-white/80` — it is a chip *on a photo*, not a themed surface. Same for the owner's edit/delete chips |
| Calendar text would be invisible | `PopoverContent … bg-white` + `popover-foreground` turning light | `bg-white` removed; the calendar now uses the popover tokens (dark). Both versions were compared side by side; the owner chose dark |
| A filled box inside the search pill | `Input`'s `dark:bg-input/30` became active. It is `.x:is(.dark *)` — two classes of specificity — so `lg:bg-transparent` would lose | `bare` gets `lg:dark:bg-transparent` |
| Owner form styled for a white dialog | `text-black` on the dialog, three buttons; `text-gray-500` on two hints | Removed / `text-muted-foreground`; the dialog is now `bg-background` |

Visible changes that were kept:

- **Muted text is grey, not blue-ish** (`lab 82.9` → `lab 65.5`): card metadata, "/ night",
  hints. Still ≈ 7:1 on the page; the name → metadata → price hierarchy reads more clearly.
- **Input borders are `white/15`** instead of near-white, with a faint `white/4.5%` fill. On the
  stacked phone search they are softer but still read against the sky. Login/signup inputs keep
  their explicit `border-gray-300`.

**Not verified in the browser: the owner dashboard.** The add/edit dialog and the edit/delete
chips are behind login. The changes there are class removals toward the tokens checked
everywhere else, but nobody has looked at the form on a dark dialog yet.

Left as is: `next-themes` is still installed and unused (the app is dark-only, so there is
nothing for it to switch); `.common-btn`'s `text-white` and `.state-effects`'
`ring-offset-slate-950` are still literals rather than tokens.

Dev gotcha, fifth time: `lg:dark:bg-transparent` did not reach the served CSS until
`globals.css` got a real content change (then reverted).

---

## Phasing

| Phase | Theme | Items | Rough effort |
|---|---|---|---|
| 1 | Remove conflicting signals | 1–7 | half a day |
| 2 | Fix the decision screen | 8 | one day |
| 3 | Give it a character | 9–15, 17–20 | one to two days |
| 4 | Repair the foundations | 16 | half a day |

Phase order matters: while two accent colours are live, a new typeface or animation only adds
noise on top of a background that is already arguing with itself. Typography is worth touching
once the colour system is unambiguous.

---

## Housekeeping spotted in passing

Not UI, not acted on — listed so it is not lost:

- `.playwright-mcp/` was created by this review's screenshots; delete it or add it to
  `.gitignore`.
