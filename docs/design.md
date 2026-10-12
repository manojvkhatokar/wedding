# Marathi invitation design

Active concept: `marathi-concept.png`, produced with built-in Image Gen. The earlier palace/rose direction was discarded at the user's request.

Palette: warm ivory #fff9ed, leaf green #29493c, burnt saffron #bb4f25, antique gold #b28a44. Fonts: self-hosted Cormorant Garamond and DM Sans. The page is a continuous vertical invitation capped at 520px, even on desktop.

Section order: toran and wedding names with baraat; family invitation and Marathi couple illustration; green celebration section with reception, wedding, venue, calendar, sharing, and sign-off. Use open sections, gold rules, compact native controls, and no card grids. All wording is selectable HTML. Decorative watercolor assets have matching ivory backgrounds with no color washes.

Motion: flowers fall downward at scattered starting heights and randomized horizontal positions, with varied sizes, fall rates, subtle sway and rotation; every new fall picks a new horizontal position; screen-space occlusion keeps copy and controls clear while allowing particles to pass over illustrations; their speed follows smoothed scroll speed and eases to a stop when scrolling ends, toran sways gently, names and baraat move independently with scroll, the couple illustration subtly scales, and section content reveals progressively. Reduced motion and the pause control suppress decorative animation. The user-provided dhol track is bundled at `public/audio/wedding-dhol.mp3` and loops at 45% volume. Playback is attempted automatically on every load and reload. When autoplay is blocked, touching, clicking, starting a swipe or mouse-wheel scroll, or using navigation keys attempts to start music without a prompt. Scroll attempts are throttled and browser autoplay restrictions still apply. Intentional muting prevents subsequent touches from restarting it. The music control pauses/resumes playback, and an intentional mute persists through further interactions. Hidden tabs pause playback.

Intentional adaptations from the concept: exact user-provided venue spelling; full year in event rows; accessibility motion and sound controls; calendar and sharing status feedback. Marathi blessing and wedding wording are retained. The user's follow-up replaces the horse with an open car and adds alternating side illustrations to the event rows, replacing the separate day-numeral column to keep the mobile layout readable.

Image Gen prompts: (1) complete three-section mobile Marathi wedding invitation with toran, baraat, bride in green nauvari and groom in saffron pheta, ivory/saffron/leaf-green palette; (2) standalone watercolor baraat with dhol-tasha, tutari, dancing guests and decorated horse; (3) standalone Maharashtrian bride/groom illustration with mundavalya, flower garlands, banana trees and samai; (4) standalone horizontal marigold and mango-leaf toran. Production images contain no UI text.

Follow-up artwork generated with the built-in Image Gen tool:

- `public/images/baraat-car.webp`: edit the original baraat to replace the horse with a flower-decorated open-top car. Seat the groom on a raised rear seat, with a second man beside him visibly holding a maroon-and-gold sunshade umbrella. Preserve the musicians, dancing guests, watercolor style, and ivory background.
- `public/images/reception.webp`: matching watercolor couple welcoming guests on a marigold-decorated reception stage with warm lights, set against the section's leaf-green background.
- `public/images/wedding-ceremony.webp`: matching Marathi couple seated beside the sacred fire with marigold garlands and a brass samai, set against the same green background.

Event imagery stays alongside its own text at narrow phone widths: reception right, wedding left. Both images load lazily with reserved aspect ratios. They are illustrative scenes, not photos of the couple or venue.

Both full names use the same font size, weight, and color. Each name, “Manoj V Khatokar” and “Chethana D”, appears on one uninterrupted line in the shared responsive serif name style, sized to fit narrow phones.

Reception wardrobe edit, using built-in Image Gen: `public/images/reception-formal.webp`. Preserve the same couple, welcoming pose, floral arch, lights, watercolor style, and green backdrop; dress the groom in a black tuxedo with white shirt and bow tie and the bride in a burgundy-and-gold embroidered lehenga with choli and dupatta. Remove ceremonial headwear and forehead strings for reception styling. The wedding ceremony illustration retains traditional attire.

Latest baraat revision, using built-in Image Gen: `public/images/baraat-friends.webp`. Remove every flag and flagpole, dress only the groom in royal blue with gold embroidery, substantially reduce the crowd, and add friends in everyday shirts and trousers. Preserve the cream open car, raised seat, umbrella held by the attendant, musicians, and watercolor setting.

The Devanagari wording is replaced by Kannada: “ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ”, “ಶುಭ ವಿವಾಹ”, and “ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯೇ ನಮ್ಮ ಸಂತೋಷ” (your presence is our joy). Kannada text uses locally hosted Noto Serif Kannada and `lang="kn"`. Page metadata and native sharing use the Kannada wedding title too; English content remains in English. Kannada invitation wording cross-checked against https://purohit.app/wedding-card/kannada.

The current invitation is entirely in English at the user’s request: “With Lord Ganesha’s blessings”, “Our Wedding”, and “Your presence is our joy.” The page title and sharing metadata use “Our Wedding”; the Kannada font is no longer loaded.

Art correction: `public/images/baraat-friends-v2.webp`, edited with built-in Image Gen. Reposition the light-blue-shirt friend fully outside the car, on open ground in the foreground, with complete legs and visible shoes. Repair the car panel and flowers behind him. Preserve the royal-blue groom, raised seat, umbrella attendant, smaller crowd, casual friends, and flag-free watercolor composition.

Current background revision, edited with built-in Image Gen: `public/images/baraat-ivory.webp` and `public/images/couple-ivory.webp`. Remove all trees, palms and banana plants from both scenes. Replace them with warm ivory watercolor backgrounds, champagne fabric swags and delicate floral garlands. Preserve the people, clothing, car, raised seat, umbrella, corrected friend placement, brass lamps and wedding flowers. The reception, ceremony and toran illustrations already have tree-free settings and remain unchanged. Earlier asset names above document historical revisions only.

Auto-scroll: after the page load completes, allow a five-second reading pause, then advance at 70 pixels per second. Simple touches keep auto-scroll running. Manual scrolling and anchor navigation take priority, then auto-scroll resumes from the new position after 900 ms of inactivity. Stop at the bottom. Pause while hidden and respect reduced-motion preferences and the animation pause control.
