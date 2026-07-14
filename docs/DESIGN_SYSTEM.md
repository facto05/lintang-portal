# Design System
## Web Portal Berita Lembaga Investigasi Negara Kota Tangerang (LINTANG)

### 1. Brand Identity

#### 1.1 Design Principles
- **Professional & Trustworthy**: Kredibilitas lembaga pemerintah
- **Clear & Accessible**: Mudah dipahami semua kalangan umur
- **Clean & Modern**: Design minimalis, fokus pada konten
- **Responsive**: Optimal di semua perangkat
- **Fast & Efficient**: Performance prioritized

#### 1.2 Tone of Voice
- Formal namun approachable
- Bahasa Indonesia resmi namun mudah dipahami
- Transparan & akuntabel
- Otoritatif tanpa intimidating

### 2. Color Palette

#### 2.1 Primary Colors
```
Government Blue (Kepercayaan, Otoritas)
├── primary-50:  #EEF2F9
├── primary-100: #D1DDF2
├── primary-500: #1F5FA3  (Main brand)
├── primary-600: #1B4F8C  (Buttons, links)
├── primary-700: #174073  (Active states)
└── primary-900: #0D2847  (Text headings)
```

#### 2.2 Secondary Colors
```
Accent (Penekanan informasi penting)
├── accent-50:  #FEF3EB
├── accent-100: #FDD5BF
├── accent-500: #E67E22  (Alerts, highlights)
└── accent-600: #D35400  (Hover)
```

#### 2.3 Semantic Colors
```
Success: #27AE60  (Green - Approved)
Warning: #F39C12  (Orange - Pending)
Error:   #E74C3C  (Red - Rejected)
Info:    #1F5FA3  (Blue - Information)
```

#### 2.4 Neutral Colors
```
Gray Scale
├── gray-50:  #F8F9FA  (Page background)
├── gray-100: #F3F4F6  (Card background)
├── gray-200: #E5E7EB  (Borders)
├── gray-300: #D1D5DB  (Dividers)
├── gray-600: #4B5563  (Secondary text)
├── gray-700: #2D3748  (Body text)
└── gray-900: #1A202C  (Headings)
```

### 3. Typography

#### 3.1 Font Family
```
Headings: 'Plus Jakarta Sans', system-ui, sans-serif
Body: 'Inter', system-ui, sans-serif
Monospace: 'Fira Code', monospace
```

#### 3.2 Font Scale
```
Display:    42px / 2.625rem  (font-bold)    - Hero titles
H1:         32px / 2rem      (font-bold)    - Page titles
H2:         28px / 1.75rem   (font-semibold) - Section titles
H3:         24px / 1.5rem    (font-semibold) - Post titles
H4:         20px / 1.25rem   (font-medium)   - Card titles
Body Large: 18px / 1.125rem  (font-normal)   - Lead text
Body:       16px / 1rem      (font-normal)   - Regular text
Small:      14px / 0.875rem  (font-normal)   - Meta info
Caption:    12px / 0.75rem   (font-normal)   - Labels
```

#### 3.3 Line Heights & Weights
```
Headings:    1.2 line-height, 700 weight
Subheadings: 1.4 line-height, 600 weight
Body:        1.6 line-height, 400 weight
```

### 4. Spacing System

#### 4.1 Scale
```
4px   (xs)   - Small gaps
8px   (sm)   - Component spacing
16px  (md)   - Default spacing
24px  (lg)   - Section spacing
32px  (xl)   - Major sections
48px  (2xl)  - Page sections
64px  (3xl)  - Hero spacing
```

#### 4.2 Container Widths
```
Mobile:  100% (padding: 16px)
Tablet:  768px
Desktop: 1024px
Wide:    1280px (max)
```

### 5. Components

#### 5.1 Buttons

**Primary (CTA)**
```
Background: primary-600
Hover: primary-700
Padding: 12px 24px
Border-radius: 6px
Font-weight: 600
```

**Secondary (Alternative)**
```
Background: white
Border: 2px primary-600
Color: primary-600
Hover: Background primary-50
```

**Danger (Delete/Reject)**
```
Background: error (E74C3C)
Hover: Darker shade
```

**Sizes:**
- Small: 32px height, 12px 20px padding
- Medium: 40px height, 12px 24px padding (default)
- Large: 48px height, 14px 32px padding

#### 5.2 Cards

**Post Card**
```
- Border: 1px gray-200
- Border-radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Shadow increase, border color change
- Padding: 16px
- Image aspect ratio: 16:9
```

**Info Card (Dashboard)**
```
- Background: white
- Border-left: 4px colored (by status)
- Shadow: subtle
- Padding: 20px
```

#### 5.3 Forms

**Input Fields**
```
- Border: 1px gray-300
- Border-radius: 6px
- Padding: 12px 16px
- Font-size: 16px
- Focus: ring-2 ring-primary-500
- Error: border-error ring-error-200
```

**Select/Dropdown**
```
- Similar to inputs
- Chevron icon right-aligned
- Option hover: bg-primary-50
```

**Textarea**
```
- Min-height: 120px
- Resize: vertical
- Font-family: monospace (optional)
```

#### 5.4 Badges & Status Labels

```
Approved:  bg-green-100 text-green-800
Pending:   bg-yellow-100 text-yellow-800
Rejected:  bg-red-100 text-red-800
Draft:     bg-gray-100 text-gray-800
Published: bg-blue-100 text-blue-800
```

#### 5.5 Navigation

**Navbar**
```
- Height: 64px
- Background: white
- Border-bottom: 1px gray-200
- Sticky top
- Flex: Logo left, Menu center, User right
```

**Sidebar (Admin)**
```
- Width: 260px
- Background: gray-900
- Color: white
- Fixed left
- Top-padding: 64px
- Menu items: 40px height, 16px padding
```

### 6. Layout Patterns

#### 6.1 Public Homepage
```
┌──────────────────────────────┐
│      NAVBAR (sticky)          │
├──────────────────────────────┤
│                              │
│    FEATURED POST (hero)       │
│    Image + Overlay text       │
│                              │
├──────────────────────────────┤
│                              │
│  LATEST POSTS GRID (3 cols)  │
│  [Card] [Card] [Card]        │
│  [Card] [Card] [Card]        │
│  [Card] [Card] [Card]        │
│  [Card] [Card] [Card]        │
│                              │
├──────────────────────────────┤
│   PAGINATION                  │
├──────────────────────────────┤
│        FOOTER                 │
└──────────────────────────────┘
```

#### 6.2 Single Post
```
┌──────────────────────────────┐
│      NAVBAR (sticky)          │
├──────────────────────────────┤
│ Breadcrumb                    │
│ Category Badge               │
│ Title (H1)                   │
│ Author • Date • Views        │
│                              │
│ Featured Image (full-width)  │
│                              │
│ Content (max-w: 720px)       │
│                              │
│ Tags                         │
│ ────────────────             │
│ Related Posts (3 items)      │
│                              │
├──────────────────────────────┤
│        FOOTER                 │
└──────────────────────────────┘
```

#### 6.3 Admin Dashboard
```
┌────────────┬─────────────────────┐
│            │    TOP BAR          │
│  SIDEBAR   │    (Logo, User)     │
│            ├─────────────────────┤
│ Dashboard  │                     │
│ Posts      │  STAT CARDS         │
│ Approval   │  [Card] [Card]      │
│ Categories │                     │
│ Users      │  RECENT TABLE       │
│ Media      │                     │
│ Settings   │  ACTIONS            │
│            │                     │
└────────────┴─────────────────────┘
```

### 7. Responsive Design

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Grid System:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Navigation:**
- Mobile: Hamburger menu
- Desktop: Horizontal menu

### 8. Icons

**Library:** Heroicons v2

**Common Icons:**
```
home, menu, search, bell, user
edit, trash, plus, check, x
folder, tag, calendar, download
```

**Sizing:**
- Small: 16px (meta info)
- Medium: 20px (buttons)
- Large: 24px (hero)

### 9. Shadows & Elevation

```
None:     No shadow
Subtle:   0 1px 2px rgba(0,0,0,0.05)
Small:    0 1px 3px rgba(0,0,0,0.1)
Medium:   0 4px 6px rgba(0,0,0,0.1)
Large:    0 10px 15px rgba(0,0,0,0.1)
XL:       0 20px 25px rgba(0,0,0,0.15)
```

**Usage:**
- Cards: small (hover: medium)
- Modals: large
- Navbar: subtle
- Dropdowns: medium

### 10. Border Radius

```
2px   - Very subtle (inputs optional)
4px   - Subtle (default)
6px   - Standard (buttons, inputs)
8px   - Cards
12px  - Featured cards
16px  - Large sections
```

### 11. Animations

```
Button hover:    opacity 200ms ease
Link hover:      color 150ms ease
Card hover:      shadow 200ms ease, transform 200ms ease
Loading:         spin 1s linear infinite
Fade in:         opacity 300ms ease-out
Slide in:        transform 300ms ease-out
```

### 12. Accessibility

- **Contrast:** Minimum 4.5:1 (WCAG AA)
- **Focus:** Visible ring on interactive elements
- **Touch:** Minimum 44x44px targets
- **Motion:** Respect prefers-reduced-motion
- **Alt text:** All images must have descriptive alt
- **Semantic HTML:** Proper heading hierarchy

### 13. Dark Mode (Future)

```
Background:  gray-900
Card:        gray-800
Text:        gray-100
Border:      gray-700
```

This Design System ensures consistent, professional, accessible UI across LINTANG portal mencakup government standards dan modern usability practices.
