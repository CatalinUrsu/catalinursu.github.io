/* ============================================================
   CONTENT — edit everything here, no need to touch HTML/CSS.
   To swap a project image: replace the file in assets/img/projects/
   or point `image` at a new path.
   ============================================================ */

const STATS = [
  { value: '70 fps',     from: '40 fps →',  label: 'Framerate after CPU/GPU optimization and bottleneck removal', tag: 'Unity Profiler' },
  { value: '0.88 GB',    from: '1.08 GB →', label: 'Memory footprint cut by 30% with Addressables and asset compression', tag: 'Memory Profiler' },
  { value: '4:3 – 21:9', from: '',          label: 'Resolution-independent UI with Safe Area support across mobile', tag: 'UGUI' },
  { value: '6+ years',   from: '',          label: 'Production Unity across mobile, AR, VR and PC', tag: 'since 2020' },
  { value: '12+',        from: '',          label: 'Shipped projects for NASA, Deloitte, PwC, Mercedes and Microsoft', tag: 'client work' },
  { value: '0 alloc',    from: '',          label: 'Update-loop logic replaced by reactive async flows with R3 and UniTask', tag: 'async' }
];

const STACK = [
  { label: 'core',             items: ['Unity', 'C#', 'Gameplay systems', 'UI systems'] },
  { label: 'architecture',     items: ['Zenject (DI)', 'SOLID', 'DRY', 'Event-driven'] },
  { label: 'async & reactive', items: ['UniTask', 'R3 (ReactiveProperty)'] },
  { label: 'performance',      items: ['Unity Profiler', 'Frame Debugger', 'Memory Profiler', 'CPU/GPU optimization'] },
  { label: 'ui',               items: ['UGUI', 'Adaptive layouts', 'Safe Area', 'Render textures', 'TextMeshPro', 'DoTween'] },
  { label: 'assets & more',    items: ['Addressables', 'Netcode for GameObjects', 'FMOD', 'VR / AR', 'Mobile'] }
];

const EDUCATION = [
  {
    place: 'State University of Moldova',
    field: 'Computer Science',
    period: '2017 — 2020',
    note: 'Faculty of Mathematics and Computer Science.'
  }
];

const LANGUAGES = [
  { name: 'Romanian', level: 'Native',                    bar: 100 },
  { name: 'Russian',  level: 'Native',                    bar: 100 },
  { name: 'English',  level: 'B2 · Upper Intermediate',   bar: 72 }
];

const EXPERIENCE = [
  {
    period: 'Apr 2021 — now',
    company: 'Bully Entertainment',
    role: 'Unity Gameplay Engineer',
    open: true,
    points: [
      'Led architecture design and implemented modular systems using DI and async patterns.',
      'Developed gameplay systems and complex UI architectures for production projects.',
      'Reworked and adapted complex UI systems for new designs and additional content.',
      'Optimized performance across CPU/GPU, batching and memory.',
      'Implemented async-driven UI logic with R3, removing Update loops and cutting allocations.',
      'Designed a DLC system with card-based mechanics, including deck generation with guaranteed win conditions.',
      'Built a reusable subtitle system (DoTween, TextMeshPro) with timing driven by audio playback.',
      'Implemented multiplayer synchronization for a cross-platform MR project (VR + PC).',
      'Worked in a team of 6-7 (2 developers), contributing to architecture decisions and code quality.'
    ]
  },
  {
    period: 'Jun — Sep 2020',
    company: 'Midnight Works',
    role: 'Unity Developer',
    open: false,
    points: [
      'Developed gameplay prototypes for 2D and 3D projects.',
      'Implemented core gameplay mechanics and UI systems.',
      'Integrated monetization systems (AdMob, Facebook SDK).',
      'Optimized performance for mobile devices.'
    ]
  }
];

/* ---------- commercial work ---------- */
const WORK_PROJECTS = [
  {
    title: "NASA's First Woman",
    meta: 'AR · Mobile — Bully Entertainment, gameplay + UI',
    images: [
      'assets/img/projects/nasa-1.jpg',
      'assets/img/projects/nasa-2.jpg',
      'assets/img/projects/nasa-3.jpg'
    ],
    text: 'Cutting-edge AR app for mobile. Wrote object-interaction and memory-management code, designed adaptive UI for a wide range of resolutions, and supported every phase from multilingual localization to content updates.',
    tags: ['Unity', 'AR', 'Adaptive UI', 'Localization', 'Memory optimization']
  },
  {
    title: 'OcVibe',
    meta: 'iOS · HoloLens 2 — Bully Entertainment, systems',
    images: [
      'assets/img/projects/ocvibe-1.jpg',
      'assets/img/projects/ocvibe-2.jpg',
      'assets/img/projects/ocvibe-3.jpg'
    ],
    text: 'Dual-platform build for iOS and HoloLens 2. First project where I introduced Addressables to manage content efficiently, then tuned the whole content pipeline for HoloLens hardware limits.',
    tags: ['Addressables', 'HoloLens 2', 'iOS', 'Performance']
  },
  {
    title: 'Planet3 — Phase II',
    meta: 'Card game · Education — Bully Entertainment, solo developer',
    images: [
      'assets/img/projects/planet3-1.jpg',
      'assets/img/projects/planet3-2.jpg',
      'assets/img/projects/planet3-3.jpg'
    ],
    text: 'Independently developed a mini-game about global warming across four iterations — card mechanics, varied end-game scenarios and the strategy layer. Covered development, UX and game design.',
    tags: ['Gameplay systems', 'Game design', 'UX', 'Unity']
  },
  {
    title: 'PwC Superbowl',
    meta: 'Physics · UI — Bully Entertainment, gameplay',
    images: [
      'assets/img/projects/pwc-1.jpg',
      'assets/img/projects/pwc-2.jpg',
      'assets/img/projects/pwc-3.jpg'
    ],
    text: 'Collaboration between PwC and Microsoft. Engineered precise physics for object interaction and built a responsive UI, then optimized elements to cut resource usage and smooth out the experience.',
    tags: ['Physics', 'UI', 'Optimization', 'Microsoft']
  },
  {
    title: 'Spinal Experience',
    meta: 'PC + Mobile · Cross-device — Bully Entertainment, systems',
    images: [
      'assets/img/projects/spinal-1.jpg',
      'assets/img/projects/spinal-2.jpg'
    ],
    text: 'Two connected applications — one on PC, one on mobile — letting a phone drive content on the desktop build. Cinemachine-driven presentation with a synchronized interaction layer between devices.',
    tags: ['Cinemachine', 'Cross-device', 'UI', 'Networking']
  },
  {
    title: 'VR Multiplayer Platform',
    meta: 'VR · Multiplayer — Bully Entertainment, networking',
    images: [
      'assets/img/projects/vr-1.jpg',
      'assets/img/projects/vr-2.jpg',
      'assets/img/projects/vr-3.jpg'
    ],
    text: 'Cross-platform MR project connecting VR headsets and PC clients into one shared world. Implemented the synchronization layer that keeps world state consistent across devices.',
    tags: ['Netcode for GameObjects', 'VR', 'Cross-platform', 'State sync']
  }
];

/* ---------- personal work ---------- */
const PET_PROJECTS = [
  {
    id: 'showcase',
    title: 'Showcase',
    meta: '2D game · Architecture reference — personal project, full ownership',
    images: ['assets/img/projects/showcase.jpg'],
    link: 'https://github.com/CatalinUrsu/Showcase',
    text: 'A complete 2D game built as an architecture reference: Zenject for composition, UniTask for async flow, R3 for reactive UI interaction. Event-driven logic instead of Update loops, with clean code, extensibility and performance as the whole point.',
    tags: ['Zenject', 'UniTask', 'R3', 'Event-driven', 'Open source']
  },
  {
    id: 'helpers',
    title: 'Helpers',
    meta: 'Unity package · Toolkit — personal project, reusable library',
    images: ['assets/img/projects/helpers.jpg'],
    link: 'https://github.com/CatalinUrsu/Tool_Helpers',
    text: 'A package of reusable modules pulled out of production projects, installable straight from a git URL. Covers FMOD audio infrastructure with pooled event instances, generic object pooling, a save system, an async state machine on UniTask, camera and scene-loading services with progress tracking, plus UI components. Lightweight API — modules work together or separately.',
    tags: ['Unity package', 'FMOD', 'Object pooling', 'State machine', 'UniTask', 'Addressables']
  },
  {
    id: 'idlenumber',
    title: 'IdleNumber',
    meta: 'Unity package · Custom type — personal project, systems',
    images: ['assets/img/projects/idlenumber.jpg'],
    link: 'https://github.com/CatalinUrsu/Tool_IdleNumber',
    text: 'A custom number type for idle games, where resources grow past what standard types display readably. Abbreviates values through K, M, B up to Q and then alphabetical sequences (AA, AB, AC…), with fixed or dynamic decimal precision. Built around a scalable conversion algorithm, tuned to keep computational overhead and memory use low during real-time updates.',
    tags: ['C#', 'Custom type', 'Idle games', 'Performance', 'Editor tooling']
  }
];
