# EPS Branding / Theme Update TODO

## Phase 1 — Prep & Plan
- [x] Inspect key existing branding/theme files: Navbar, theme/tokens, GlassButton/GlassCard/StatCard
- [x] Inspect key public sections that contain purple/gradients: HomePage, Hero, Statistics, CTA, FAQ
- [ ] Create comprehensive edit plan and get approval

## Phase 2 — Apply Official EPS Palette
- [ ] Update `client/src/theme/tokens.js` to the official EPS palette values
- [ ] Update `client/src/theme/theme.js` gradients to use the EPS palette colors
- [ ] Replace any remaining hard-coded purple accent usage in public UI sections with palette colors

## Phase 3 — Navbar + Logo Integration
- [ ] Update Navbar to use uploaded `client/logo.png` with height 42–48px
- [ ] Display “EPS Job Consultancy” beside logo with correct spacing/alignment
- [ ] Ensure responsive behavior across breakpoints

## Phase 4 — Remove Emojis & Replace with Lucide Icons
- [ ] Replace any emoji usage in public UI with Lucide React SVG icons

## Phase 5 — Build Verification
- [ ] Ensure `lucide-react` is installed if required
- [ ] Run `npm run build` and fix compilation errors until build succeeds

## Phase 6 — Consistency Check
- [ ] Verify branding applied consistently across Navbar, Hero, Homepage, Public pages, Buttons, Cards, Badges, CTA, Footer
- [ ] Verify no emojis remain in public UI

