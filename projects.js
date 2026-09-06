window.PORTFOLIO_CATEGORIES = [
  {
    id: "digital-interaction",
    label: "Digital Product & Interaction",
    description: "Interfaces, prototypes and rule systems that shape how people make decisions.",
  },
  {
    id: "ux-research",
    label: "UX Research & Systems",
    description: "Research and system mapping that turn evidence into practical design direction.",
  },
  {
    id: "visual-editorial",
    label: "Visual Communication & Editorial",
    description: "Typography, image, publication and colour used to translate ideas across media.",
  },
  {
    id: "spatial-material",
    label: "Space, Form & Material",
    description: "Observation, light and narrative transformed into material or three-dimensional form.",
  },
  {
    id: "strategy",
    label: "Strategy & Analytics",
    description: "Models and comparative evidence used to frame risk, value and recommendations.",
  },
  {
    id: "embodied-systems",
    label: "Embodied Systems",
    description: "Body sensing, haptics and experimental systems that connect movement with learning.",
  },
];

window.PORTFOLIO_PROJECTS = [
  {
    id: "vita",
    title: "Vita: Future Interfaces",
    shortTitle: "Vita",
    kicker: "AI interaction · speculative design",
    year: "2026",
    category: "digital-interaction",
    summary:
      "A future-facing design sequence that moves from signals about digital friction to Vita, a reflective career-exploration chatbot for students who need space to compare more than one possible future.",
    meaning:
      "The project asks how AI can support reflection without taking ownership of a student's identity or future away from them.",
    role:
      "Group project · Voiceflow prototyping and technical implementation support, with collaborative research, testing and critique.",
    methods: ["Futures research", "Service concepts", "Conversation design", "Prototype testing"],
    cover: {
      src: "assets/projects/vita/04-refined-prototype.jpg",
      alt: "Blue presentation cover for the refined Vita career chatbot prototype",
    },
    sections: [
      {
        eyebrow: "Context",
        title: "From frictionless technology to meaningful agency",
        body:
          "The work began by examining a 2038 scenario in which optimisation has made everyday life convenient but socially thin. Forecasts, drivers and artefacts from the future helped the team locate a more useful design question: how might technology help people reflect without making decisions for them?",
      },
      {
        eyebrow: "Prototype",
        title: "A conversation that keeps the user in control",
        body:
          "Vita helps first- and second-year students explore values, energisers, working styles and career hypotheses through structured reflection. Testing exposed unreliable routing, opaque system state and the risk of passive acceptance, leading to clearer boundaries, editable hypotheses and human hand-off points.",
      },
      {
        eyebrow: "Reflection",
        title: "Responsible AI is an interaction problem",
        body:
          "The critique treats reliability, cultural bias and identity shaping as interface concerns, not abstract warnings. The proposed direction shifts Vita from an answer engine toward a reflection companion that surfaces uncertainty and invites correction.",
      },
    ],
    media: [
      {
        type: "image",
        src: "assets/projects/vita/01-future-reimagined.jpg",
        alt: "Your Future Reimagined project title slide",
        caption: "Future scenario research established the wider social context.",
        layout: "wide",
      },
      {
        type: "image",
        src: "assets/projects/vita/02-frictionless-scenario.jpg",
        alt: "Scenario map describing a frictionless future community in 2038",
        caption: "A speculative 2038 scenario connected convenience with reduced agency.",
      },
      {
        type: "image",
        src: "assets/projects/vita/03-concept-storyboard.jpg",
        alt: "Storyboard for an offline community service concept",
        caption: "Early concepts explored social connection beyond screens.",
      },
      {
        type: "image",
        src: "assets/projects/vita/05-chatbot-structure.jpg",
        alt: "Flow diagram showing the structure of the Vita chatbot",
        caption: "The final concept translated reflection into a routed conversation system.",
        layout: "wide",
      },
      {
        type: "image",
        src: "assets/projects/vita/06-user-control.jpg",
        alt: "Analysis of user control and unpredictable AI system behaviour",
        caption: "Testing revealed where hard-coded logic was needed to support user control.",
      },
      {
        type: "image",
        src: "assets/projects/vita/07-reflection-companion.jpg",
        alt: "Process slide showing the shift from helper to reflection companion",
        caption: "The interaction model evolved from helper to reflection companion.",
      },
      {
        type: "image",
        src: "assets/projects/vita/08-prototype-conversation.jpg",
        alt: "Vita prototype conversation interface",
        caption: "A tested conversation path in the refined prototype.",
      },
      {
        type: "video",
        src: "files/vita-chatbot-demo.mp4",
        poster: "media/vita-poster.png",
        alt: "Screen recording of the Vita chatbot prototype in Voiceflow",
        caption: "Prototype walkthrough · local video",
        layout: "wide",
      },
    ],
    sources: [
      { label: "Prototype walkthrough · MP4", href: "files/vita-chatbot-demo.mp4" },
      {
        label: "Conceptual design submission · PDF",
        href: "files/aip-conceptual-design.pdf",
        labels: { zh: "概念设计小组提交 · PDF", ja: "コンセプト設計・共同提出 · PDF" },
        supplementary: true,
        sharedAttribution: true,
      },
      {
        label: "Future scenario submission · PDF",
        href: "files/aip-future-scenario.pdf",
        labels: { zh: "未来情景小组提交 · PDF", ja: "未来シナリオ・共同提出 · PDF" },
        supplementary: true,
        sharedAttribution: true,
      },
      {
        label: "Refined prototype submission · PDF",
        href: "files/aip-vita-refined-prototype.pdf",
        labels: { zh: "精炼原型小组提交 · PDF", ja: "改良プロトタイプ・共同提出 · PDF" },
        supplementary: true,
        sharedAttribution: true,
      },
    ],
  },
  {
    id: "library-evaluation",
    title: "Unimelb Library Evaluation",
    shortTitle: "Library Evaluation",
    kicker: "Usability research · evidence synthesis",
    year: "2026",
    category: "ux-research",
    summary:
      "A mixed-method usability evaluation of the University of Melbourne Library website, combining a five-second test, moderated lab sessions, eye tracking and prioritised design recommendations.",
    meaning:
      "Its value lies not in proving that the site has problems, but in tracing every recommendation back to observed user behaviour.",
    role:
      "Five-person group project · research planning, moderated testing, observation, analysis and report synthesis were completed collaboratively.",
    methods: ["5-second test", "Moderated usability testing", "Eye tracking", "Thematic synthesis"],
    cover: {
      src: "assets/projects/library/cover-session.jpg",
      alt: "Two moderated usability-test participants working through University of Melbourne Library tasks",
    },
    sections: [
      {
        eyebrow: "Study",
        title: "Testing first impressions and real tasks",
        body:
          "Fourteen students completed an online five-second test and five students joined in-person sessions. The lab study measured task completion, time, difficulty, observation and gaze behaviour across room booking, referencing, database, exam-paper and journal tasks.",
      },
      {
        eyebrow: "Finding",
        title: "Utility was strong; critical pathways were not",
        body:
          "The room-booking flow created the most severe friction: all five participants struggled and one could not complete it within eight minutes. Database search, past papers and download controls also lacked confirmation or visibility despite the site's overall usefulness.",
      },
      {
        eyebrow: "Outcome",
        title: "Eight recommendations linked back to evidence",
        body:
          "Recommendations were prioritised and traced to observed findings, including a guided booking sequence, clearer eligibility errors, explicit labels, matched-search feedback and a visible Select Space action.",
      },
    ],
    libraryStudy: {
      cover: {
        eyebrow: "INFO20004 · Mixed-method evaluation",
        title: "Observe.\nTrace.\nPrioritise.",
        body:
          "A usability study that follows one clear chain: representative tasks, observed behaviour, converging evidence and design action.",
      },
      metrics: [
        { value: "14", label: "online first-impression participants" },
        { value: "5", label: "moderated lab participants" },
        { value: "5", label: "representative library tasks" },
        { value: "8", label: "prioritised recommendations" },
      ],
      journey: {
        label: "01 / Evaluation journey",
        title: "The study moves from perception to performance.",
        body:
          "The online test checked what the homepage communicated at a glance. The lab sessions then tested whether students could complete everyday library tasks, while timing, observation, think-aloud comments and gaze behaviour explained where each pathway broke down.",
        steps: [
          {
            number: "01",
            title: "First impression",
            body: "A five-second exposure checked audience, purpose and immediate information hierarchy.",
          },
          {
            number: "02",
            title: "Task performance",
            body: "Five students attempted room booking, APA 7, databases, past exams and journal download.",
          },
          {
            number: "03",
            title: "Behaviour evidence",
            body: "Completion, time, difficulty, think-aloud notes and gaze paths were read together.",
          },
          {
            number: "04",
            title: "Design priority",
            body: "Eight recommendations were linked to findings, staged and assigned a user priority.",
          },
        ],
      },
      findings: {
        label: "02 / Evidence synthesis",
        title: "Three patterns explain the main friction.",
        body:
          "The sample is intentionally small, so each claim remains tied to the observed participants. Together, task time, moderated behaviour and gaze evidence reveal where the interface failed to communicate sequence, relevance or action.",
        items: [
          {
            stat: "5 / 5",
            title: "Room booking became the critical path.",
            body:
              "Every lab participant struggled after reaching the booking area, and one could not finish within the eight-minute limit. The problem was not a single broken button; it was an unclear sequence with competing controls and weak progress feedback.",
            image: "assets/projects/library/evidence-task-time.jpg",
            alt: "Bar chart comparing average completion time across five library tasks",
            caption: "Room booking took the longest average time; one incomplete attempt was excluded from the chart.",
          },
          {
            stat: "4 / 5",
            title: "Search results did not confirm relevance.",
            body:
              "Four participants were unsure whether they had found the correct mathematics databases. Results existed, but the interface did not clearly say why those results matched the query or whether the task was complete.",
            image: "assets/projects/library/evidence-search-heatmap.jpg",
            alt: "Eye-tracking heatmap over a University Library database result page",
            caption: "Attention dispersed across the database page instead of settling on a clear relevance cue.",
          },
          {
            stat: "F1–F8",
            title: "Visible controls still lacked meaning.",
            body:
              "Booking heatmaps show attention spread across navigation, fields and status areas. Observation exposed the deeper issue: unlabeled icons, hidden eligibility rules and weak confirmation forced participants into trial and error.",
            image: "assets/projects/library/evidence-booking-heatmap.jpg",
            alt: "Two eye-tracking heatmaps from the room-booking task",
            caption: "The evidence was used diagnostically: it supported observed confusion rather than replacing task data.",
          },
        ],
      },
      recommendations: {
        label: "03 / Design handoff",
        title: "Eight findings become eight concrete interface moves.",
        body:
          "The final handoff separates critical booking actions from search and labelling improvements. Each recommendation retains its report identifier so the proposed change can be traced back to the submitted evidence.",
        groups: [
          {
            label: "Priority A · Critical paths",
            items: [
              { id: "R1", title: "Guide booking step by step", body: "Expose sequence and progress before users enter the next stage." },
              { id: "R2", title: "Reveal Create Reservation at the right moment", body: "Make the primary action prominent only when it is applicable." },
              { id: "R3", title: "Explain ineligible spaces", body: "Prevent dead ends with direct eligibility and recovery messages." },
              { id: "R8", title: "Replace the green add icon", body: "Use an explicit Select Space button instead of an ambiguous symbol." },
            ],
          },
          {
            label: "Priority B · Search and language",
            items: [
              { id: "R4", title: "Rename Re:Cite", body: "Use Referencing and Citations so the destination is immediately legible." },
              { id: "R5", title: "Confirm the subject match", body: "Show a message such as “Matched to: Mathematics” beside results." },
              { id: "R6", title: "Surface All Filters", body: "Increase the visibility of the control needed to find past exams." },
              { id: "R7", title: "Label utility icons", body: "Pair functions with words such as Download PDF instead of icon-only actions." },
            ],
          },
        ],
      },
      limitation: {
        label: "Scope note",
        title: "Evidence for direction, not population-level proof.",
        body:
          "The online sample contained 14 students and the moderated sample contained 5 students. Think-aloud may have affected task speed, and the task set focused on common journeys rather than edge cases. The recommendations should therefore guide a next design iteration and larger follow-up test.",
      },
      video: {
        label: "04 / Presentation",
        title: "Watch the evaluation as one continuous argument.",
        body:
          "The presentation connects the task footage, observed breakdowns and recommendation logic. It is shown at the full reading width so interface details remain visible without opening a separate file.",
        src: "media/unimelb-library-video-presentation.mp4",
        poster: "media/library-video-poster.png",
        caption: "Evaluation presentation · 05:09 · local video",
      },
    },
    media: [
      {
        type: "image",
        src: "assets/projects/library/01-executive-summary.jpg",
        alt: "Executive summary page from the usability evaluation report",
        caption: "Mixed-method study design and participant overview.",
      },
      {
        type: "image",
        src: "assets/projects/library/02-task-findings.jpg",
        alt: "Task completion and difficulty charts from the evaluation",
        caption: "Room booking was the slowest and most difficult task.",
      },
      {
        type: "image",
        src: "assets/projects/library/03-eye-tracking.jpg",
        alt: "Eye-tracking diagram showing attention around a journal page",
        caption: "Gaze evidence explained why a small download control was missed.",
        layout: "source-limited",
      },
      {
        type: "image",
        src: "assets/projects/library/04-recommendations.jpg",
        alt: "Recommendation page with room-booking heatmaps",
        caption: "Recommendations connect directly to observed behaviour.",
      },
      {
        type: "image",
        src: "assets/projects/library/05-search-evidence.jpg",
        alt: "Search evidence and heatmaps from database tasks",
        caption: "Search needed clearer relevance and confirmation cues.",
      },
      {
        type: "image",
        src: "assets/projects/library/06-priority-table.jpg",
        alt: "Prioritised summary table of eight design recommendations",
        caption: "A concise handoff table grouped actions by stage and priority.",
        layout: "wide",
      },
      {
        type: "video",
        src: "files/unimelb-library-video-presentation.mp4",
        poster: "media/library-video-poster.png",
        alt: "Video presentation of the usability evaluation",
        caption: "Evaluation presentation · local video",
        layout: "video-native",
      },
    ],
    sources: [
      { label: "Video presentation · MP4", href: "files/unimelb-library-video-presentation.mp4" },
      {
        label: "Privacy-safe evidence summary · PDF",
        href: "files/unimelb-library-evaluation-public-summary.pdf",
        labels: { zh: "匿名化公开证据摘要 · PDF", ja: "匿名化した公開エビデンス概要 · PDF" },
        supplementary: true,
        sharedAttribution: true,
      },
    ],
  },
  {
    id: "signal-aftershock",
    title: "Signal Aftershock",
    shortTitle: "Signal Aftershock",
    kicker: "Game design · browser prototype",
    year: "2026",
    category: "digital-interaction",
    summary:
      "A two-to-three-player browser game that turns line drawing, dice constraints and triangle capture into an emergency communications race after an earthquake.",
    meaning:
      "Uncertainty becomes meaningful when it constrains a decision instead of making the decision on the player's behalf.",
    role: "Individual project · game rules, theme, interface, iteration and reviewed web implementation.",
    methods: ["Mechanic redesign", "Meaningful play", "Rapid prototyping", "Playtesting"],
    playableUrl:
      "https://bobmai624.github.io/signal-aftershock-triangulation-race-site/?v=e571d4b",
    cover: {
      src: "assets/projects/game/cover-gameplay.jpg",
      alt: "Live Signal Aftershock match with blue and orange relay lines across the emergency map",
    },
    sections: [
      {
        eyebrow: "Origin",
        title: "Uncertainty that sharpens decisions",
        body:
          "The redesign develops an earlier Triangle Territory activity. Dice do not move a token; they constrain the line a player can place. The result makes uncertainty part of spatial planning instead of replacing strategy.",
      },
      {
        eyebrow: "System",
        title: "Every line reconnects the city",
        body:
          "Players build relay lines, enclose coverage zones and reconnect critical sites. Area, infrastructure bonuses and closure choices turn an abstract geometric rule into a readable emergency-response story.",
      },
      {
        eyebrow: "Iteration",
        title: "Removing features made the game stronger",
        body:
          "Cards, character roles and attacks were removed so the central decisions stayed geometric. A balanced dice stream, clearer claim animation and improved large-triangle recognition made play more legible and fair.",
      },
    ],
    media: [
      {
        type: "image",
        src: "assets/projects/game/01-cover.jpg",
        alt: "Signal Aftershock game design portfolio cover",
        caption: "A thematic redesign of the Triangle Territory workshop mechanic.",
      },
      {
        type: "image",
        src: "assets/projects/game/02-command-map.jpg",
        alt: "Signal Aftershock game board and interface",
        caption: "The board reads as a live emergency command map.",
        layout: "wide",
      },
      {
        type: "image",
        src: "assets/projects/game/03-dice-system.jpg",
        alt: "Dice-based uncertainty system in the game interface",
        caption: "Dice create drawing limits, not automatic movement.",
      },
      {
        type: "image",
        src: "assets/projects/game/04-relay-rules.jpg",
        alt: "Relay line placement rules shown in the game",
        caption: "Line placement creates both opportunity and risk.",
      },
      {
        type: "image",
        src: "assets/projects/game/05-meaningful-play.jpg",
        alt: "Triangle capture and scoring shown in Signal Aftershock",
        caption: "Geometry, score and story reinforce each other.",
      },
      {
        type: "image",
        src: "assets/projects/game/06-alignment.jpg",
        alt: "Theme and mechanic alignment in the game design",
        caption: "Abstract rules are paired with disaster-response meaning.",
      },
      {
        type: "image",
        src: "assets/projects/game/07-iteration.jpg",
        alt: "End-state screen and iteration notes for Signal Aftershock",
        caption: "The final state remains visible on the map for clear closure.",
      },
    ],
    sources: [
      { label: "Game design portfolio · PDF", href: "files/signal-aftershock-game-design.pdf" },
      {
        label: "Open playable prototype",
        href: "https://bobmai624.github.io/signal-aftershock-triangulation-race-site/?v=e571d4b",
        external: true,
      },
    ],
  },
  {
    id: "film-to-book",
    title: "Film to Book",
    shortTitle: "Film to Book",
    kicker: "Editorial design · material translation",
    year: "2025",
    category: "visual-editorial",
    summary:
      "A hand-made editorial object that translates cinematic imagery and musical rhythm into transparent layers, folded sequences and richly overprinted spreads.",
    meaning:
      "The book turns the duration of film into an object whose folds, overlaps and resistance make rhythm physically readable.",
    role: "Individual project · visual research, material experiments, composition and bookmaking.",
    methods: ["Image sampling", "Layering", "Sequential composition", "Physical prototyping"],
    cover: {
      src: "assets/projects/film-book/08-final-spread.jpg",
      alt: "Dense layered spread combining notation, images and blue-red marks",
    },
    sections: [
      {
        eyebrow: "Translation",
        title: "A film becomes an object you can unfold",
        body:
          "Still images, gestures, fragments of notation and blocks of text are treated as a visual score. Repetition and transparency create continuity without reproducing the film frame by frame.",
      },
      {
        eyebrow: "Material",
        title: "Rhythm through overlap and resistance",
        body:
          "Folded pages, translucent sheets and uneven marks make time physical. Quiet passages give way to dense collisions, allowing pacing to emerge from how the reader handles the book.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/film-book/01-overview.jpg", alt: "Overview of research and the finished Film to Book object", caption: "Source fragments and the completed folded object." },
      { type: "image", src: "assets/projects/film-book/02-object.jpg", alt: "Rolled and folded views of the physical book", caption: "The format changes between roll, fan and spread." },
      { type: "image", src: "assets/projects/film-book/03-spread.jpg", alt: "Layered film imagery across a book spread", caption: "Film stills and notation share one continuous field.", layout: "wide" },
      { type: "image", src: "assets/projects/film-book/04-rhythm.jpg", alt: "Dark layered images and musical notation", caption: "Density controls pacing and emphasis." },
      { type: "image", src: "assets/projects/film-book/05-gesture.jpg", alt: "Gestural red blue and black marks over musical notation", caption: "Marks behave like movement and sound." },
      { type: "image", src: "assets/projects/film-book/06-sequence.jpg", alt: "Sequential image fragments across a musical score", caption: "Visual motifs return with changing intensity." },
      { type: "image", src: "assets/projects/film-book/07-density.jpg", alt: "Highly layered purple and orange book spread", caption: "A climactic spread compresses image, type and rhythm." },
      { type: "image", src: "assets/projects/film-book/08-final-spread.jpg", alt: "Final blue and red folded spread", caption: "The final sequence resolves into a cool, fragmented field.", layout: "wide" },
    ],
    sources: [{ label: "Complete project · PDF", href: "files/film-to-book.pdf" }],
  },
  {
    id: "colour-systems",
    title: "Colour Studio",
    shortTitle: "Colour Studio",
    kicker: "Colour research · visual systems",
    year: "2025",
    category: "visual-editorial",
    summary:
      "Two connected studio folios exploring colour as atmosphere, cultural memory and communication across a seasonal calendar, book object, Sony visual application and spatial AR field.",
    meaning:
      "Across the two folios, colour is tested as a changing relationship between memory, material, product and atmosphere.",
    role: "Individual studio work · colour research, visual systems, image making and applied mock-ups.",
    methods: ["Colour studies", "Editorial systems", "Brand application", "Light experiments"],
    cover: {
      src: "assets/projects/colour/04-colour-field.jpg",
      alt: "Vivid fluid colour field in cyan magenta yellow and violet",
    },
    sections: [
      {
        eyebrow: "System",
        title: "Colour changes meaning with context",
        body:
          "The folio treats colour as an event rather than a fixed swatch. Studies move between perception, Chinese seasonal language, texture, product communication and atmospheric light.",
      },
      {
        eyebrow: "Application",
        title: "From twelve seasons to one visual voice",
        body:
          "A calendar gives each month a distinct material and emotional register. The same discipline is tested in a soft Sony identity application, where subtle shifts in hue change how a product feels in context.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/colour/01-folio-cover.jpg", alt: "Colour Studio final folio cover", caption: "Final studio folio." },
      { type: "image", src: "assets/projects/colour/02-editorial-system.jpg", alt: "Pale blue and grey editorial composition", caption: "A quiet graphic language creates room for texture." },
      { type: "image", src: "assets/projects/colour/03-book-object.jpg", alt: "Mock-up of a colour research book", caption: "Colour research translated into a tactile publication." },
      { type: "image", src: "assets/projects/colour/04-colour-field.jpg", alt: "Iridescent abstract colour field", caption: "Digital colour behaves as atmosphere.", layout: "wide" },
      { type: "image", src: "assets/projects/colour/05-seasonal-calendar.jpg", alt: "Calendar spread using a Chinese seasonal colour system", caption: "Twelve months connect colour, texture and seasonal language." },
      { type: "image", src: "assets/projects/colour/06-summer.jpg", alt: "Bright summer calendar spread in green orange pink and blue", caption: "Summer intensifies contrast and motion." },
      { type: "image", src: "assets/projects/colour/07-sony-system.jpg", alt: "Pastel Sony wordmark and headphone graphic system", caption: "A restrained palette softens a technology product." },
      { type: "image", src: "assets/projects/colour/08-applied-poster.jpg", alt: "Sony headphone poster applied to a shop window", caption: "The system tested in an urban display context." },
      { type: "image", src: "assets/projects/colour/09-ar-field.jpg", alt: "Black spatial field filled with green and white particles", caption: "An AR experiment turns botanical colour into a spatial field." },
    ],
    sources: [
      { label: "Studio folio 2 · PDF", href: "files/colour-studio-folio-2.pdf" },
      { label: "Final folio · PDF", href: "files/colour-studio-final-folio.pdf" },
    ],
  },
  {
    id: "light-performance",
    title: "Light in Performance",
    shortTitle: "Light in Performance",
    kicker: "Light laboratory · material perception",
    year: "2025",
    category: "spatial-material",
    summary:
      "A six-part photographic investigation into how angle, distance, colour temperature and material behaviour turn a simple model box into a controlled laboratory for spatial atmosphere.",
    meaning:
      "Light is treated as a design material: directed, transmitted, refracted, reflected and diffused to change how ordinary objects and enclosed space are perceived.",
    role: "Individual study · experiment design, model-box staging, lighting, photography and comparative visual analysis.",
    methods: ["Controlled light studies", "Material testing", "Optical observation", "Photography"],
    cover: {
      src: "assets/projects/light-performance/01-chromatic-convergence.jpg",
      alt: "Two pairs of sunglasses staged where red and blue light fields meet inside a model box",
    },
    sections: [
      {
        eyebrow: "Control",
        title: "Angle and distance shape visibility",
        body:
          "The first studies isolate direction, colour temperature and light-source distance. Opposing red and blue fields create chromatic tension; a low white beam then reveals how a tighter focus changes hierarchy and depth.",
      },
      {
        eyebrow: "Material",
        title: "Every surface edits the light",
        body:
          "Transparent packaging, pigmented water, metallic foil and dense fibres become optical instruments. Each material produces a different spatial effect through transmission, refraction, reflection, absorption or diffusion.",
      },
    ],
    media: [
      {
        type: "image",
        src: "assets/projects/light-performance/01-chromatic-convergence.jpg",
        alt: "Two pairs of sunglasses dividing and joining red and blue light",
        title: "Chromatic convergence",
        principle: "Angle · colour temperature · transmission",
        finding:
          "Two angled pairs of sunglasses hold the warm and cool fields apart until their central overlap turns purple. The composition demonstrates that contrast and harmony can be produced by the same controlled intersection.",
        caption: "Opposing red and blue light meet through transparent lenses.",
      },
      {
        type: "image",
        src: "assets/projects/light-performance/02-intensity-depth.jpg",
        alt: "Sunglasses isolated by a low white beam in a dark model box",
        title: "Intensity makes depth",
        principle: "Distance · focus · visual hierarchy",
        finding:
          "A low white beam makes the front frame legible while the rear frame survives as a partial reflection. Moving the source changes the falloff, using visibility itself to separate foreground from background.",
        caption: "A focused beam guides the eye through layered visibility.",
      },
      {
        type: "image",
        src: "assets/projects/light-performance/03-synthetic-campfire.jpg",
        alt: "Transparent snack packages glowing like a small campfire in darkness",
        title: "Synthetic campfire",
        principle: "Warm core · cool edge · translucent packaging",
        finding:
          "A warm source buried inside transparent snack packages creates an amber core, while a distant cool reflection adds depth. Projected shadows on the model-box walls extend the object pile into an immersive fire-like atmosphere.",
        caption: "Packaging and shadow reconstruct the feeling of fire without depicting flame.",
      },
      {
        type: "image",
        src: "assets/projects/light-performance/04-water-refraction.jpg",
        alt: "A clear acrylic tank of coloured water projecting a soft coloured beam",
        title: "Fluid refraction",
        principle: "Pigment · water movement · projection",
        finding:
          "A horizontal white beam passes through coloured water and arrives on the wall as a softened projection. Pigment changes the hue; small movements in the water regulate intensity and make the boundary of the light feel temporary.",
        caption: "A fluid medium turns a fixed beam into an unstable spatial wash.",
      },
      {
        type: "image",
        src: "assets/projects/light-performance/05-reflective-topography.jpg",
        alt: "Discarded metallic coffee capsules reflecting blue green and violet light",
        title: "Reflective topography",
        principle: "Metallic curvature · multiple directions · fragmentation",
        finding:
          "Loosely scattered coffee capsules form an irregular field of curved reflectors. Multi-directional coloured light breaks across the foil, producing mixed hues and shifting gradients instead of one stable illuminated surface.",
        caption: "Repeated metallic objects fragment light into a changing landscape.",
      },
      {
        type: "image",
        src: "assets/projects/light-performance/06-diffuse-softness.jpg",
        alt: "A plush bear softly lit from above against a light wall and black base",
        title: "Diffuse softness",
        principle: "Fibrous texture · absorption · soft overhead light",
        finding:
          "Thousands of fine fibres scatter and absorb the overhead light, while the black base suppresses secondary reflection. The result is defined by softened edges and emotional warmth rather than brightness or sharp contrast.",
        caption: "Texture diffuses a directional source into an ambient, gentle image.",
      },
    ],
    lightStudy: {
      highlights: [
        {
          number: "01",
          title: "A controlled visual laboratory",
          body:
            "Angle, source distance, intensity and colour temperature are changed deliberately, turning the model box into a repeatable space for observing cause and effect.",
        },
        {
          number: "02",
          title: "Everyday objects become optical tools",
          body:
            "Sunglasses, snack packaging, coloured water, coffee capsules and fur are selected for how they transmit, refract, reflect, absorb or diffuse light.",
        },
        {
          number: "03",
          title: "Atmosphere is constructed, not applied",
          body:
            "Depth, tension, warmth, instability and softness emerge from physical relationships inside the scene rather than from a graphic effect added afterward.",
        },
      ],
      chapters: [
        {
          number: "01",
          eyebrow: "Direction and intensity",
          title: "Control",
          statement:
            "The opening pair isolates what the light source itself can do: divide colour fields, create a point of convergence, and use falloff to organise depth.",
          media: [0, 1],
        },
        {
          number: "02",
          eyebrow: "Transparent media",
          title: "Transformation",
          statement:
            "Light then passes through packaging and pigmented water. The medium changes its colour, movement and projection, turning simple objects into atmospheric devices.",
          media: [2, 3],
        },
        {
          number: "03",
          eyebrow: "Material response",
          title: "Surface",
          statement:
            "The final pair compares opposite surface behaviours: metallic curves multiply hard reflections, while dense fibres scatter and absorb the source into softness.",
          media: [4, 5],
        },
      ],
      comparison: [
        {
          material: "Transparent lenses",
          behaviour: "Transmission + convergence",
          effect: "Separate warm and cool fields meet as a balanced purple overlap.",
        },
        {
          material: "Pigmented water",
          behaviour: "Refraction + modulation",
          effect: "A fixed white beam becomes coloured, softened and responsive to movement.",
        },
        {
          material: "Metallic foil",
          behaviour: "Specular reflection",
          effect: "One light field breaks into unstable fragments and mixed hues.",
        },
        {
          material: "Fibrous fur + black base",
          behaviour: "Diffusion + absorption",
          effect: "Edges soften, secondary reflection falls away and the scene becomes ambient.",
        },
      ],
      conclusion: {
        eyebrow: "Design conclusion",
        title: "The material decides how light becomes space.",
        body:
          "Across six controlled scenes, light never acts alone. Geometry sets its direction, distance sets its hierarchy, and material determines whether it passes through, bends, breaks apart or dissolves. The work's central achievement is a practical vocabulary for composing atmosphere through physical cause and effect.",
      },
    },
    sources: [{ label: "Light in Performance · PDF", href: "files/light-in-performance-a1.pdf" }],
  },
  {
    id: "pyrrha",
    title: "Pyrrha: Cities & Names",
    shortTitle: "Pyrrha",
    kicker: "Spatial narrative · representation",
    year: "2024",
    category: "spatial-material",
    summary:
      "A spatial interpretation of Italo Calvino's Pyrrha, using a Möbius-like field to hold the tension between imagined castles, lived reality and the unstable impressions attached to names.",
    meaning:
      "The spatial field makes the instability of a name visible: an imagined city and an experienced city occupy the same continuous structure.",
    role: "Individual project · text analysis, notation, digital modelling and narrative perspectives.",
    methods: ["Text interpretation", "Notation", "Digital modelling", "Narrative perspectives"],
    cover: {
      src: "assets/projects/pyrrha/a3-perspectives.jpg",
      alt: "Atmospheric night and day perspectives of the Pyrrha model",
    },
    sections: [
      {
        eyebrow: "Idea",
        title: "A name carries one city; reality reveals another",
        body:
          "Calvino's text becomes a study of expectation and recognition. Contrasting urban fragments are set into one looping structure, allowing the imagined and observed city to remain separate while sharing a path.",
      },
      {
        eyebrow: "Representation",
        title: "Deconstruction as a continuous cycle",
        body:
          "Castle walls, houses and circulation are broken apart and reorganised along the field. Notation, isometric drawing and framed perspectives reveal the same system at different levels of abstraction.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/pyrrha/a3-process.jpg", alt: "Pyrrha research and process presentation board", caption: "Text analysis, references and work in progress." },
      { type: "image", src: "assets/projects/pyrrha/a3-isometric.jpg", alt: "Isometric notation field for the Pyrrha spatial model", caption: "The looping notation field organises contrasting fragments." },
      { type: "image", src: "assets/projects/pyrrha/a3-perspectives.jpg", alt: "Final day and night perspectives of Pyrrha", caption: "Final perspectives move between austere ruin and dream-like atmosphere.", layout: "wide" },
    ],
    sources: [{ label: "Assignment 3 boards · PDF", href: "files/pyrrha-assignment-3.pdf" }],
  },
  {
    id: "booking-systems",
    title: "Booking.com Systems Review",
    shortTitle: "Booking.com Review",
    kicker: "Systems review · inclusive decision support",
    year: "2026",
    category: "ux-research",
    summary:
      "An individual critical review of Booking.com that maps stakeholder dependencies, decision effort, persuasive patterns and a more inclusive redesign direction for a complex travel platform.",
    meaning:
      "The review reframes a booking interface as a network of people, incentives and consequences rather than a neutral transaction screen.",
    role: "Individual project · interface observation, systems mapping, literature review and critical synthesis.",
    methods: ["Systems mapping", "Interface observation", "Stakeholder analysis", "Literature review"],
    cover: {
      src: "assets/projects/booking/02-platform-overview.jpg",
      alt: "Booking.com platform overview with annotated interface screenshots",
    },
    sections: [
      {
        eyebrow: "System",
        title: "A convenient interface built on interdependence",
        body:
          "The review expands the interface into a system of travellers, accommodation providers, hospitality workers, payment infrastructure, communities and regulators. This reveals where platform convenience shifts costs elsewhere.",
      },
      {
        eyebrow: "Direction",
        title: "Make redesign more inclusive and participatory",
        body:
          "Accessibility, transparency and local impact are treated as connected design concerns. The proposed next step brings affected users and communities into the decision process rather than solving only for conversion speed.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/booking/01-critical-review.jpg", alt: "Cover for a critical review of Booking.com", caption: "Critical review framing." },
      { type: "image", src: "assets/projects/booking/02-platform-overview.jpg", alt: "What is Booking.com overview", caption: "The platform connects travel search, comparison and transaction." },
      { type: "image", src: "assets/projects/booking/03-methods.jpg", alt: "Methods used in the Booking.com review", caption: "Four complementary analytical lenses." },
      { type: "image", src: "assets/projects/booking/04-stakeholders.jpg", alt: "Booking.com stakeholder map", caption: "Stakeholders reveal competing goals and dependencies." },
      { type: "image", src: "assets/projects/booking/05-impact-map.jpg", alt: "Booking.com system and impact map", caption: "Interface choices connect to user behaviour and wider consequences.", layout: "wide" },
      { type: "image", src: "assets/projects/booking/06-accessibility-findings.jpg", alt: "Booking.com accessibility findings", caption: "Key barriers include hierarchy, transparency and decision support." },
      { type: "image", src: "assets/projects/booking/07-redesign-direction.jpg", alt: "Participatory redesign initiative for Booking.com", caption: "A co-design direction for a more inclusive journey." },
      { type: "image", src: "assets/projects/booking/08-conclusion.jpg", alt: "Final conclusion of the Booking.com review", caption: "A concise synthesis of speed, neutrality and participation." },
    ],
    sources: [{ label: "Critical review · PDF", href: "files/booking-com-critical-review.pdf" }],
  },
  {
    id: "melbourne-motion",
    title: "Melbourne in Motion",
    shortTitle: "Melbourne in Motion",
    kicker: "Typography · mapping",
    year: "2025",
    category: "visual-editorial",
    summary:
      "A graphic system that records movement through Melbourne as typographic memory, transforming a travelled route into letterforms, maps, symbols and layered urban compositions.",
    meaning:
      "Movement through the city becomes a form of memory reconstructed through type, mapping and collected visual fragments.",
    role: "Individual project · route documentation, typographic experiments and composition.",
    methods: ["Route mapping", "Letterform design", "Image sampling", "Poster composition"],
    cover: {
      src: "assets/projects/melbourne/06-composition-two.jpg",
      alt: "Orange grey and black typographic composition derived from a Melbourne route",
    },
    sections: [
      {
        eyebrow: "Source",
        title: "A route becomes a letterform",
        body:
          "A journey through the city is traced, compressed and rearranged. The line retains the irregularity of movement while becoming a recognisable typographic signature for Melbourne.",
      },
      {
        eyebrow: "System",
        title: "Memory assembled from urban fragments",
        body:
          "Maps, street signs, market typography, texture and scale are layered into a flexible visual language. The project moves from a single contour to posters that hold several impressions of the city at once.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/melbourne/01-cover.jpg", alt: "Brief 4 cover with experimental Bowen Mai wordmark", caption: "Brief 4: mapping movement into typographic memory." },
      { type: "image", src: "assets/projects/melbourne/02-route.jpg", alt: "Melbourne route drawn over an aerial map", caption: "The travelled route is the primary graphic source." },
      { type: "image", src: "assets/projects/melbourne/03-map-type.jpg", alt: "Map and Melbourne letterform study", caption: "Route geometry is tested as a wordmark." },
      { type: "image", src: "assets/projects/melbourne/04-detail-language.jpg", alt: "Close-ups of urban signs and typographic fragments", caption: "Urban details add texture, rhythm and scale." },
      { type: "image", src: "assets/projects/melbourne/05-composition-one.jpg", alt: "Black white and orange Melbourne map composition", caption: "Mapping and lettering share a dense poster field." },
      { type: "image", src: "assets/projects/melbourne/06-composition-two.jpg", alt: "Orange and grey route-based typographic composition", caption: "A second composition tests stronger hierarchy." },
      { type: "image", src: "assets/projects/melbourne/07-final-system.jpg", alt: "Final Melbourne typography and route system", caption: "The final system moves between mark, route and field.", layout: "wide" },
    ],
    sources: [{ label: "Brief 4 · PDF", href: "files/brief-4-melbourne.pdf" }],
  },
  {
    id: "words-unleashed",
    title: "Words Unleashed",
    shortTitle: "Words Unleashed",
    kicker: "Generative typography · publication",
    year: "2025",
    category: "visual-editorial",
    summary:
      "A two-part visual communication project pairing a generative AR environment with a quiet poetry publication, exploring how language can move between spatial experience and the printed page.",
    meaning:
      "The same language behaves in two opposite ways: dispersed and immersive in space, then quiet and deliberately paced in print.",
    role: "Individual project with co-design input · concept, generative tests, editorial system and mock-ups.",
    methods: ["Generative typography", "AR exploration", "Co-design", "Editorial design"],
    cover: {
      src: "assets/projects/words/03-generative-field.jpg",
      alt: "Green and cyan generative particle field from the AR project",
    },
    sections: [
      {
        eyebrow: "Digital",
        title: "Language released into space",
        body:
          "The AR experiment uses botanical colour and particle-like forms to create an environment that feels dispersed, unstable and alive. Type is treated less as a line to read than as a field to move through.",
      },
      {
        eyebrow: "Print",
        title: "A publication built from pauses",
        body:
          "The companion publication turns to restraint: sparse poetry, calibrated whitespace, small graphic cues and soft seasonal colour. Mock-ups test how the pacing survives as a physical object.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/words/01-cover.jpg", alt: "Words Unleashed project cover", caption: "Brief 3: Words Unleashed." },
      { type: "image", src: "assets/projects/words/02-ar-entry.jpg", alt: "AR project entry page with QR code and particle image", caption: "The AR experience begins from a printed threshold." },
      { type: "image", src: "assets/projects/words/03-generative-field.jpg", alt: "Generative green blue and black particle field", caption: "Botanical colour becomes a spatial particle system." },
      { type: "image", src: "assets/projects/words/04-spatial-type.jpg", alt: "Black generative spatial type beside grass reference", caption: "Digital density is compared with an observed natural field." },
      { type: "image", src: "assets/projects/words/05-poetry-spread.jpg", alt: "Minimal poetry spread with sparse black type", caption: "The publication slows the visual rhythm." },
      { type: "image", src: "assets/projects/words/06-publication-mockup.jpg", alt: "Open book mock-up on a blue surface", caption: "A physical mock-up tests proportion and pacing." },
      { type: "image", src: "assets/projects/words/07-botanical-spread.jpg", alt: "Botanical poetry spread with small green forms", caption: "Quiet colour markers connect text and season." },
      { type: "image", src: "assets/projects/words/08-final-publication.jpg", alt: "Final open publication mock-up", caption: "The final object balances openness and sequence.", layout: "wide" },
    ],
    sources: [{ label: "Brief 3 · PDF", href: "files/brief-3-words-unleashed.pdf" }],
  },
  {
    id: "trace-exaggeration",
    title: "Trace to Exaggeration",
    shortTitle: "Trace to Exaggeration",
    kicker: "Observation · digital modelling",
    year: "2024",
    category: "spatial-material",
    summary:
      "A two-assignment sequence that traces a botanical photograph, abstracts its contours and exaggerates the resulting fragments into a directional three-dimensional digital field.",
    meaning:
      "Observation is progressively reduced, selected and exaggerated until the source image gives rise to a new spatial logic.",
    role: "Individual project · observational tracing, abstraction, spatial translation and 3D modelling.",
    methods: ["Observational drawing", "Abstraction", "Spatial translation", "Rhino modelling"],
    cover: {
      src: "assets/projects/trace/a2-model.jpg",
      alt: "Perspective view of an abstract black and white digital model",
    },
    sections: [
      {
        eyebrow: "Assignment 1",
        title: "Finding structure inside an image",
        body:
          "A close botanical photograph is reduced to contour, overlap and directional paths. Tracing separates visual evidence from the source image and establishes a vocabulary for translation.",
      },
      {
        eyebrow: "Assignment 2",
        title: "Exaggerating direction into depth",
        body:
          "Selected fragments are extended, compressed and repeated in Rhino. Perspective and side views reveal a field that shifts from dense intersection to long, controlled projection.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/trace/a1-source.jpg", alt: "Pink flowers and green foliage used as the source image", caption: "Source photograph." },
      { type: "image", src: "assets/projects/trace/a1-tracing.jpg", alt: "Line tracing of the botanical photograph", caption: "Observed contours isolated from colour and depth." },
      { type: "image", src: "assets/projects/trace/a1-exaggeration.jpg", alt: "Tracing with coloured paths emphasising movement", caption: "Directional paths identify the translation strategy." },
      { type: "image", src: "assets/projects/trace/a2-model.jpg", alt: "Perspective view of the abstract digital model", caption: "The final model exaggerates the selected directions.", layout: "wide" },
      { type: "image", src: "assets/projects/trace/a2-section.jpg", alt: "Narrow side view of the abstract model", caption: "The side view reveals compression and depth." },
    ],
    sources: [
      { label: "Assignment 1 presentation · PPTX", href: "files/trace-into-form-assignment-1.pptx" },
      { label: "Assignment 2 model · 3DM", href: "files/digital-exaggeration-assignment-2.3dm" },
    ],
  },
  {
    id: "investment-strategy",
    title: "Australian Investment Strategy",
    shortTitle: "Investment Strategy",
    kicker: "Market analysis · portfolio strategy",
    year: "2025",
    category: "strategy",
    summary:
      "An individual comparison of ten Australian asset classes from 2013 to 2024, using return, volatility, CAGR and Sharpe ratio to construct a balanced 2025 portfolio strategy.",
    meaning:
      "The analysis separates headline growth from risk-adjusted performance so an allocation can be defended across different economic conditions.",
    role: "Individual project · data collection, metric comparison, scenario reasoning and portfolio recommendation.",
    methods: ["Comparative analysis", "Risk-adjusted metrics", "Scenario planning", "Portfolio allocation"],
    cover: {
      src: "assets/projects/investment/05-data-summary.png",
      alt: "Risk and long-run growth profile for ten Australian asset classes from 2013 to 2024",
      variant: "investment",
    },
    sections: [
      {
        eyebrow: "Analysis",
        title: "Separate growth from risk-adjusted performance",
        body:
          "Industrial warehouse and logistics assets delivered the strongest long-run growth but also high volatility. Residential property, commercial office and corporate bonds produced more stable risk-adjusted performance.",
      },
      {
        eyebrow: "Strategy",
        title: "A defensive core with selective growth exposure",
        body:
          "The recommended direction uses stable real estate and corporate bonds as anchors, then adds measured exposure to higher-growth industrial assets. Scenario reasoning tests how the mix behaves across changing monetary conditions.",
      },
    ],
    investmentStudy: {
      metrics: [
        {
          value: "10",
          label: "Asset classes",
          note: "Five property exposures plus equity, fixed income and commodities.",
        },
        {
          value: "12Y",
          label: "Observation window",
          note: "Annual performance series from 2013 through 2024, inclusive.",
        },
        {
          value: "04",
          label: "Decision metrics",
          note: "Average return, volatility, CAGR and Sharpe ratio.",
        },
        {
          value: "+200bp",
          label: "Stress scenario",
          note: "A 2025 RBA rate rise tests the resilience of the portfolio thesis.",
        },
      ],
      assumptions: [
        {
          label: "Risk-free rate",
          value: "2.5%",
          note: "Average RBA cash rate used in the Sharpe-ratio calculation.",
        },
        {
          label: "Return basis",
          value: "Total return",
          note: "Capital movement and income are aligned where each asset class permits.",
        },
        {
          label: "Initial basis",
          value: "$1,000",
          note: "A common starting value makes cumulative performance comparable.",
        },
      ],
      assets: [
        { rank: "01", code: "OFF", name: "Commercial Office", average: "8.47%", cagr: "8.47%", volatility: "0.56%", sharpe: "10.70", role: "Core", stance: "core", risk: 0.56, growth: 8.47 },
        { rank: "02", code: "RES", name: "Residential Property", average: "6.77%", cagr: "6.76%", volatility: "0.77%", sharpe: "5.56", role: "Core", stance: "core", risk: 0.77, growth: 6.76 },
        { rank: "03", code: "CB", name: "Corporate Bonds", average: "4.41%", cagr: "4.41%", volatility: "0.46%", sharpe: "4.18", role: "Core", stance: "core", risk: 0.46, growth: 4.41 },
        { rank: "04", code: "ASX", name: "ASX 200", average: "12.97%", cagr: "12.72%", volatility: "7.55%", sharpe: "1.39", role: "Diversifier", stance: "diversifier", risk: 7.55, growth: 12.72 },
        { rank: "05", code: "WH", name: "Industrial Warehouse", average: "25.55%", cagr: "23.07%", volatility: "22.24%", sharpe: "1.04", role: "Growth", stance: "growth", risk: 22.24, growth: 23.07 },
        { rank: "06", code: "LOG", name: "Logistics Facilities", average: "20.32%", cagr: "17.49%", volatility: "23.09%", sharpe: "0.77", role: "Growth", stance: "growth", risk: 23.09, growth: 17.49 },
        { rank: "07", code: "AU", name: "Gold (AUD)", average: "7.14%", cagr: "6.34%", volatility: "13.29%", sharpe: "0.35", role: "Diversifier", stance: "diversifier", risk: 13.29, growth: 6.34 },
        { rank: "08", code: "RTL", name: "Retail Property", average: "5.67%", cagr: "4.73%", volatility: "13.61%", sharpe: "0.23", role: "Minimise", stance: "reduce", risk: 13.61, growth: 4.73 },
        { rank: "09", code: "GB", name: "Government Bonds", average: "2.66%", cagr: "2.66%", volatility: "0.98%", sharpe: "0.16", role: "Minimise", stance: "reduce", risk: 0.98, growth: 2.66 },
        { rank: "10", code: "FE", name: "Iron Ore (AUD)", average: "2.62%", cagr: "-2.70%", volatility: "34.63%", sharpe: "0.00", role: "Avoid", stance: "reduce", risk: 34.63, growth: -2.7 },
      ],
      theses: [
        {
          number: "01",
          label: "Defensive core",
          title: "Reward consistency before headline growth",
          assets: "Residential Property · Commercial Office · Corporate Bonds",
          body: "These three assets combine the study's highest Sharpe ratios with the lowest observed volatility, creating the portfolio's stability layer.",
          signal: "Sharpe 4.18–10.70",
        },
        {
          number: "02",
          label: "Selective growth",
          title: "Add upside without letting it define the risk budget",
          assets: "Industrial Warehouse · Logistics Facilities",
          body: "CAGRs above 17% justify measured exposure, while volatility above 22% argues against allowing either asset to become a core holding.",
          signal: "CAGR 17.49–23.07%",
        },
        {
          number: "03",
          label: "Capital discipline",
          title: "Use diversifiers deliberately; reduce weak risk-return trades",
          assets: "Gold · ASX 200 / Retail · Government Bonds · Iron Ore",
          body: "Gold and equities add breadth in small roles. Retail property, government bonds and iron ore are reduced where return, volatility or risk-adjusted reward is unconvincing.",
          signal: "Explicit underweights",
        },
      ],
      scenario: {
        title: "+200bp RBA rate shock",
        intro: "A tightening scenario converts the ranking into a portfolio test: which exposures lose valuation support, which retain structural demand, and where should risk remain capped?",
        rows: [
          {
            market: "Fixed income",
            pressure: "Bond prices fall as yields rise.",
            response: "Keep government bonds limited; favour the relatively stronger income profile of corporate bonds.",
          },
          {
            market: "Real estate",
            pressure: "Higher borrowing costs pressure demand and valuations.",
            response: "Maintain the stable core, but cap risk; retain only moderate industrial and logistics exposure supported by long leases and structural demand.",
          },
          {
            market: "Equities",
            pressure: "Higher discount rates weigh on valuations and earnings growth.",
            response: "Use ASX 200 exposure for breadth rather than as the portfolio anchor.",
          },
          {
            market: "Gold & commodities",
            pressure: "Yielding assets become more competitive while global demand may weaken.",
            response: "Keep gold as a small hedge and avoid adding to the study's weakest risk-return exposure, iron ore.",
          },
        ],
        conclusion: "The stress response remains consistent with the base case: low-volatility assets form the foundation, high-growth exposures stay measured, and cyclical downside is deliberately underweighted.",
      },
      evidence: [1, 2, 3, 4],
      reflection: {
        title: "Comparable data was the real analytical challenge.",
        body: "Price movement, rental or dividend income and reinvestment conventions differ across property, REITs, bonds, equities and commodities. Standardising those inputs made the comparison legible — and revealed commercial office as a stronger risk-adjusted performer than its post-COVID perception suggested.",
      },
    },
    media: [
      { type: "image", src: "assets/projects/investment/01-strategy-summary.jpg", alt: "First page of the Australian investment strategy report", caption: "Executive summary and 2025 direction." },
      { type: "image", src: "assets/projects/investment/02-key-metrics.jpg", alt: "Key metric overview for ten investment classes", caption: "Return, volatility, CAGR and Sharpe ratio form the comparison." },
      { type: "image", src: "assets/projects/investment/03-portfolio-direction.jpg", alt: "Portfolio direction and asset allocation discussion", caption: "Stable anchors are balanced with selective growth." },
      { type: "image", src: "assets/projects/investment/04-scenario-view.jpg", alt: "Scenario view of the proposed investment portfolio", caption: "The recommendation is tested across economic conditions." },
      { type: "image", src: "assets/projects/investment/05-data-summary.png", alt: "Summary spreadsheet for the ten asset classes", caption: "The supporting workbook keeps the comparison auditable.", layout: "wide" },
    ],
    sources: [
      { label: "Investment strategy · PDF", href: "files/australian-investment-strategy.pdf" },
      { label: "Data collection · XLSX", href: "files/investment-data-collection.xlsx" },
    ],
  },
  {
    id: "financial-feasibility",
    title: "Retail Mall Feasibility",
    shortTitle: "Retail Mall Feasibility",
    kicker: "Financial modelling · risk analysis",
    year: "2025",
    category: "strategy",
    summary:
      "A group feasibility study for a 10,000-square-metre Melbourne CBD retail mall, supported by a 15-sheet model covering construction, revenue, debt, NPV/IRR, sensitivity and risk.",
    meaning:
      "The model turns a development idea into a decision by showing which assumptions change viability and which risks require active controls.",
    role: "Four-person group project · model development, feasibility analysis and strategic recommendation.",
    methods: ["Discounted cash flow", "NPV & IRR", "Sensitivity analysis", "Risk mitigation"],
    cover: {
      src: "assets/projects/feasibility/cover-project-brief.png",
      alt: "Financial feasibility project brief summarising the retail mall model, scenario testing and decision drivers",
    },
    sections: [
      {
        eyebrow: "Model",
        title: "A linked view of cost, income and financing",
        body:
          "The model connects capital costs, an 18-month construction schedule, tenant mix, occupancy growth, rent escalation, operating expenses and five-year debt. Front-door and back-door analyses provide complementary viability checks.",
      },
      {
        eyebrow: "Risk",
        title: "Test the assumptions that can change the decision",
        body:
          "Sensitivity work examines occupancy, anchor rent, delays, construction overruns and competition. The analysis then converts those exposures into staged recommendations and mitigation strategies.",
      },
    ],
    media: [
      { type: "image", src: "assets/projects/feasibility/01-report-cover.jpg", alt: "Financial Feasibility Analysis Report cover", caption: "Financial feasibility analysis for a Melbourne CBD retail development." },
      { type: "image", src: "assets/projects/feasibility/02-base-case.jpg", alt: "Base case outcomes from the feasibility report", caption: "Base assumptions establish capital need, tenant mix and financing." },
      { type: "image", src: "assets/projects/feasibility/03-findings.jpg", alt: "Charts of detailed financial findings", caption: "Model outputs are compared across core scenarios." },
      { type: "image", src: "assets/projects/feasibility/04-sensitivity.jpg", alt: "Sensitivity analysis charts", caption: "Occupancy and rent assumptions are tested for decision impact." },
      { type: "image", src: "assets/projects/feasibility/05-recommendations.jpg", alt: "Strategic recommendations from the feasibility analysis", caption: "Recommendations connect model results to investment action." },
      { type: "image", src: "assets/projects/feasibility/06-risk-strategy.jpg", alt: "Risk assessment and mitigation strategy", caption: "Risk controls address delay, overrun and competitive pressure." },
      { type: "image", src: "assets/projects/feasibility/07-sensitivity-table.png", alt: "Workbook sensitivity table for occupancy and anchor rent", caption: "The underlying spreadsheet keeps scenario ranges visible.", layout: "wide" },
    ],
    sources: [
      {
        label: "Privacy-safe evidence summary · PDF",
        href: "files/financial-feasibility-public-summary.pdf",
        labels: { zh: "匿名化公开证据摘要 · PDF", ja: "匿名化した公開エビデンス概要 · PDF" },
        supplementary: true,
        sharedAttribution: true,
      },
      {
        label: "Privacy-safe model extract · XLSX",
        href: "files/financial-feasibility-public-model.xlsx",
        labels: { zh: "匿名化财务模型摘录 · XLSX", ja: "匿名化した財務モデル抜粋 · XLSX" },
        supplementary: true,
        sharedAttribution: true,
      },
    ],
  },
  {
    id: "musclekey",
    title: "MuscleKey",
    shortTitle: "MuscleKey",
    kicker: "sEMG interaction · individual experiment",
    year: "2026",
    category: "embodied-systems",
    caseHref: "musclekey/index.html",
    summary:
      "An individual sEMG interaction prototype using a MyoWare sensor, Arduino threshold logic and a browser simulation to study how one forearm contraction could become a computer-input event.",
    meaning:
      "The project separates muscle electrical activity, an engineered input event and claims about force or health. The current prototype demonstrates the first two only.",
    role:
      "Individual project · method review, safety scoping, hardware planning, threshold logic, interactive website and ten-step procedure.",
    methods: [
      "Surface EMG",
      "Arduino threshold logic",
      "Interaction prototyping",
      "Instruction design",
      "Evidence documentation",
      "Safety scoping",
    ],
    cover: {
      src: "assets/projects/musclekey/interactive-demo.png",
      alt: "MuscleKey sEMG interaction prototype showing a live signal, activation thresholds and reaction-time trial controls",
    },
    shareImage: "assets/projects/musclekey/interactive-demo.png",
    sections: [
      {
        eyebrow: "Input chain",
        title: "Turn one muscle activation into one input event",
        body:
          "MyoWare reads the surface EMG envelope from the forearm. A trigger threshold creates one digital event, while a lower release threshold requires the signal to settle before another event can be recorded.",
      },
      {
        eyebrow: "Procedure",
        title: "Document the build as ten checkable steps",
        body:
          "The website breaks the experiment into materials, offline safety, electrode placement, wiring, signal inspection, calibration, trial logic and evidence packaging. Each step includes a success sign and a troubleshooting check.",
      },
      {
        eyebrow: "Evidence boundary",
        title: "Keep simulated interaction and real hardware evidence separate",
        body:
          "The browser simulator explains ENV and threshold logic but does not read the sensor. It is not participant data, a force measurement or a medical result, and the project does not use DIY EMS stimulation.",
      },
    ],
    media: [],
    sources: [
      {
        label: "Experiment method and build notes · README",
        href: "musclekey/README.md",
      },
      {
        label: "Research and media source register · Markdown",
        href: "musclekey/SOURCES.md",
      },
    ],
  },
  {
    id: "ai-for-education",
    title: "AI for Education Research",
    displayTitle: "AI for Education Research",
    shortTitle: "AI for Education Research",
    kicker: "HCI research · mixed methods",
    year: "2026",
    category: "ux-research",
    summary:
      "As an HCI research assistant at the University of Melbourne, I supported a study of how emerging AI tools might be integrated into university education.",
    meaning:
      "The project taught me to separate what student responses showed from questions that still required interpretation and further study.",
    role:
      "Research-assistant contribution · questionnaire development, data organisation, descriptive analysis, open-text coding and presentation support.",
    methods: [
      "Mixed-method questionnaire",
      "Response organisation",
      "Descriptive statistics",
      "Open-text coding",
      "Research communication",
    ],
    cover: {
      src: "assets/projects/professional/ai-education-cover.svg",
      alt: "Diagram of student responses moving through mixed-method analysis into questions for further education research",
    },
    sections: [
      {
        eyebrow: "Research setting",
        title: "Start with student experience, not a claim about the tool",
        body:
          "The project examined how emerging AI tools could be discussed within university education. I helped develop a mixed-method questionnaire that combined structured items with open responses, then collected and organised the resulting student feedback.",
      },
      {
        eyebrow: "Analysis",
        title: "Read quantitative patterns alongside open comments",
        body:
          "I used descriptive statistics to summarise the structured responses and open-text coding to identify recurring needs and concerns. Charts and presentation material helped make the two forms of evidence readable in seminars with researchers and educators.",
      },
      {
        eyebrow: "Evidence boundary",
        title: "Keep findings and interpretation separate",
        body:
          "The responses offered evidence of student needs and questions for further study. They did not prove that a particular AI tool improved learning, so I kept that distinction visible when preparing the analysis and discussion material.",
      },
    ],
    media: [
      {
        type: "image",
        src: "assets/projects/professional/ai-education-cover.svg",
        alt: "AI for Education Research overview diagram",
        caption: "Project overview · student feedback, mixed-method analysis and research discussion",
        layout: "wide",
      },
      {
        type: "image",
        src: "assets/projects/professional/ai-education-process.svg",
        alt: "Research process from questionnaire design to descriptive analysis, open-text coding and seminar material",
        caption: "My contribution across questionnaire work, analysis and research communication",
        layout: "wide",
      },
    ],
    educationStudy: {
      opening: {
        label: "Questionnaire study",
        title: "Two instruments make different parts of the course experience visible.",
        body:
          "The supplied materials contain a short six-question mid-semester pulse survey and a longer course-feedback instrument with twelve rating items and one open question. I present them as two documented formats because the materials do not establish that one replaced the other.",
        note:
          "The page describes the questionnaire design and a suitable analysis plan. No response dataset was supplied, so it does not report student findings or claim that an AI tool improved learning.",
      },
      liveForm: {
        label: "Live mid-semester pulse",
        title: "Six questions connect a broad signal to an explanation and a priority.",
        summary:
          "Three structured questions establish study level, the main challenge and the overall course experience. Three open questions ask why the challenge matters, what learning may last and what should change first.",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScIzChj6wir8NsZbpznc_IYwCXMqNIEuSUANPDLqZ2nv9tUzw/viewform",
        embedUrl:
          "https://docs.google.com/forms/d/e/1FAIpQLScIzChj6wir8NsZbpznc_IYwCXMqNIEuSUANPDLqZ2nv9tUzw/viewform?embedded=true",
        openLabel: "Open live questionnaire",
        questions: [
          { id: "01", kind: "choice", title: "Current study level", detail: "Undergraduate or postgraduate" },
          { id: "02", kind: "choice", title: "Most challenging aspect", detail: "Expectations, application, feedback, or workload and pacing" },
          { id: "03", kind: "open", title: "Why this aspect was challenging", detail: "A short explanation tied to Question 2" },
          { id: "04", kind: "choice", title: "Overall course experience", detail: "From mostly positive to difficult and frustrating" },
          { id: "05", kind: "open", title: "Learning that may remain useful", detail: "A skill, way of thinking, or personal quality" },
          { id: "06", kind: "open", title: "The first change to make", detail: "One specific improvement priority" },
        ],
      },
      longForm: {
        label: "Course-feedback instrument",
        title: "Twelve rating items separate course experience into six readable themes.",
        summary:
          "Each item uses a five-point agreement scale. The final open question asks students to name one change, which keeps the qualitative response focused on a decision rather than inviting an unfocused comment.",
        scaleItems: 12,
        openItems: 1,
        pdfLabel: "Read the complete questionnaire PDF",
        dimensions: [
          { title: "Expectations and standards", items: ["Q1 · Learning outcomes", "Q2 · Expected assignment standard"] },
          { title: "Understanding in practice", items: ["Q3 · Applying abstract ideas", "Q5 · Examples and activities"] },
          { title: "Pacing and consolidation", items: ["Q4 · Pace and depth", "Q11 · Time to consolidate learning"] },
          { title: "Support and assessment", items: ["Q6 · Support for assessment", "Q7 · Fairness of assessment"] },
          { title: "Feedback", items: ["Q8 · Specificity", "Q9 · Timing"] },
          { title: "Workload and value", items: ["Q10 · Time to absorb content", "Q12 · Effort feels worthwhile"] },
        ],
      },
      analysis: {
        label: "Analysis plan",
        title: "The analysis should move from distributions to reasons, then to a bounded course decision.",
        body:
          "The two formats support descriptive and qualitative analysis, but they do not justify a single overall quality score unless that measure is validated separately.",
        steps: [
          { title: "Describe the closed responses", body: "Report counts and percentages for choices, and distributions or medians for rating items. Keep the study level visible when the sample is large enough to compare." },
          { title: "Link signals to explanations", body: "Read the selected challenge beside its open explanation. This shows whether the same choice represents unclear teaching, assessment alignment, pacing or another issue." },
          { title: "Code open responses", body: "Code comments by issue, evidence and requested change. Allow more than one code when a response covers several parts of the learning experience." },
          { title: "Choose a review priority", body: "Use the recurring coded issues and the final priority question to identify what the teaching team should examine first. Keep rare but serious comments visible." },
        ],
      },
      boundary: {
        label: "Evidence boundary",
        title: "This page documents an instrument and an analysis method, not completed findings.",
        body:
          "No response dataset was supplied with the questionnaire. The page therefore does not invent percentages, participant numbers, quotations or claims about learning outcomes. A voluntary single-course survey would also describe self-reported experience rather than directly measure learning.",
      },
    },
    sources: [
      {
        label: "Course Feedback Survey · PDF",
        href: "files/course-feedback-survey.pdf",
      },
    ],
  },
  {
    id: "tidyteddy",
    title: "TidyTeddy: Website Design to Release",
    displayTitle: "TidyTeddy: Website Design to Release",
    shortTitle: "TidyTeddy",
    kicker: "UI/UX internship · product delivery",
    year: "2025",
    category: "digital-interaction",
    summary:
      "During my UI/UX internship at TidyTeddy, I worked on website updates and new functions from early journey analysis through responsive prototypes, handoff and release support.",
    meaning:
      "The experience taught me to preserve the main interaction logic while making design decisions clear enough for developers to implement.",
    role:
      "UI/UX design intern · user and competitor analysis, flows, Figma prototyping, responsive specifications, handoff and launch support.",
    methods: [
      "User and competitor review",
      "Journey mapping",
      "Page structure and flows",
      "Figma prototyping",
      "Responsive specifications",
      "Design handoff",
    ],
    cover: {
      src: "assets/projects/tidyteddy/original/01-desktop-hero-booking.png",
      alt: "TidyTeddy desktop homepage with service statement, quote actions and consultation form",
    },
    shareImage: "assets/projects/tidyteddy/original/01-desktop-hero-booking.png",
    sections: [
      {
        eyebrow: "Discovery",
        title: "Review the existing journey before drawing new screens",
        body:
          "I analysed users, competitors and current journeys, then used sketches and page structures to locate where website updates or new functions needed clearer navigation and action paths.",
      },
      {
        eyebrow: "Design",
        title: "Carry one interaction logic across desktop and mobile",
        body:
          "I developed desktop and mobile flows and high-fidelity Figma prototypes. The work specified responsive layouts, component states and navigation so that the intended behaviour remained visible beyond a single static screen.",
      },
      {
        eyebrow: "Handoff",
        title: "Revise the design through implementation feedback",
        body:
          "I coordinated with the IT team, revised the interface after technical feedback and supported release. My contribution covers design, handoff, coordination and launch support; I do not have verified post-launch conversion data.",
      },
    ],
    media: [],
    tidyTeddyStudy: {
      opening: {
        label: "Case map · live interface",
        title: "One service journey, from first promise to direct contact.",
        body:
          "I have organised this case around the decisions a visitor meets on the released landing page. The sequence moves from understanding the offer, to comparing services, checking evidence and deciding whether to enquire.",
        note:
          "The annotated boards are a retrospective reading of the live interface captured on 5 September 2026. They help explain the design, but they are not presented as user-test or conversion results.",
      },
      strategy: {
        label: "Experience strategy",
        title: "A six-step decision path",
        body:
          "The desktop and mobile versions use the same broad sequence while changing the amount and form of information shown at each step.",
        steps: [
          { title: "Promise", body: "Explain the service outcome before asking for action." },
          { title: "Entry", body: "Offer both an immediate quote and a lower-commitment route." },
          { title: "Compare", body: "Turn a broad service range into repeatable, scannable units." },
          { title: "Reassure", body: "Use proof points and customer stories to answer uncertainty." },
          { title: "Demonstrate", body: "Let visitors inspect before-and-after examples directly." },
          { title: "Contact", body: "Finish with values, navigation recovery and contact choices." },
        ],
      },
      openingBoard: "00",
      chapters: [
        {
          number: "01",
          eyebrow: "Entry & discovery",
          title: "Make the offer understandable before asking people to commit.",
          body:
            "The opening combines a short service promise with quote, exploration and consultation routes. The next section then gives each service the same card structure, so visitors can compare options without learning a new layout each time.",
          boards: ["01", "02"],
        },
        {
          number: "02",
          eyebrow: "Trust & evidence",
          title: "Move from broad reassurance to evidence a visitor can inspect.",
          body:
            "A compact proof band changes the page rhythm, testimonial cards give individual stories room to be read, and the before-and-after gallery turns visual evidence into a small interaction. The metric values themselves still require independent verification.",
          boards: ["03", "04", "05"],
        },
        {
          number: "03",
          eyebrow: "Brand & conversion close",
          title: "Close the journey without relying on one call to action.",
          body:
            "The About section explains the service in a compact set of value statements. Partner marks, footer navigation and direct-contact channels then provide reassurance and recovery paths, while the promotional overlay adds a temporary campaign route above the core journey.",
          boards: ["06", "07", "08"],
        },
        {
          number: "04",
          eyebrow: "Responsive translation",
          title: "Re-prioritise the content instead of only shrinking the desktop page.",
          body:
            "On the narrow layout, the booking form becomes a direct quote action, service categories become an icon grid, and testimonials appear one at a time. Brand and contact information is restacked into a vertical sequence that can be read and tapped comfortably.",
          boards: ["09", "10", "11", "12"],
        },
      ],
      boards: [
        { id: "00", src: "assets/projects/tidyteddy/annotated/00-end-to-end-experience-flow.png", alt: "Annotated overview of the complete TidyTeddy desktop landing-page journey", caption: "End-to-end map · promise, service comparison, reassurance, proof and contact form one continuous journey." },
        { id: "01", src: "assets/projects/tidyteddy/annotated/01-hero-and-booking.png", alt: "Annotated TidyTeddy desktop hero and consultation form", caption: "Hero and booking entry points · immediate and exploratory actions remain visible together." },
        { id: "02", src: "assets/projects/tidyteddy/annotated/02-service-architecture.png", alt: "Annotated four-card service comparison section", caption: "Service architecture · repeated cards make a broad offer easier to scan and compare." },
        { id: "03", src: "assets/projects/tidyteddy/annotated/03-social-proof-band.png", alt: "Annotated three-item proof-point band", caption: "Social-proof band · the layout creates a quick transition into reassurance; the displayed values are not treated here as verified results." },
        { id: "04", src: "assets/projects/tidyteddy/annotated/04-customer-stories.png", alt: "Annotated customer testimonial carousel with three review cards", caption: "Customer stories · a familiar review pattern separates individual voices without extending the page indefinitely." },
        { id: "05", src: "assets/projects/tidyteddy/annotated/05-before-after-proof.png", alt: "Annotated before-and-after gallery with room tabs and split-image controls", caption: "Before-and-after proof · room tabs and draggable comparisons let visitors inspect examples directly." },
        { id: "06", src: "assets/projects/tidyteddy/annotated/06-brand-reassurance.png", alt: "Annotated About section with value statements and a Learn More action", caption: "Brand reassurance · a short introduction and four value statements make the positioning easier to review." },
        { id: "07", src: "assets/projects/tidyteddy/annotated/07-credibility-and-footer.png", alt: "Annotated partner row and desktop footer", caption: "Credibility and utility · partner marks, navigation and contact routes support the end of the journey." },
        { id: "08", src: "assets/projects/tidyteddy/annotated/08-campaign-overlay.png", alt: "Annotated housekeeping promotion overlay above the TidyTeddy homepage", caption: "Campaign overlay · a temporary offer is given its own focused surface and several response routes." },
        { id: "09", src: "assets/projects/tidyteddy/annotated/09-mobile-service-discovery.png", alt: "Annotated mobile service-discovery view with compact navigation and icon grid", caption: "Mobile service discovery · the content model changes to keep key actions and categories reachable." },
        { id: "10", src: "assets/projects/tidyteddy/annotated/10-mobile-trust-flow.png", alt: "Annotated mobile proof band and single testimonial card", caption: "Mobile trust flow · one story at a time creates a calmer vertical reading sequence." },
        { id: "11", src: "assets/projects/tidyteddy/annotated/11-mobile-brand-story.png", alt: "Annotated mobile campaign panel, About copy and value cards", caption: "Mobile brand story · the promise, explanation and value cards are restacked as touch-friendly units." },
        { id: "12", src: "assets/projects/tidyteddy/annotated/12-mobile-contact-close.png", alt: "Annotated mobile partner grid, footer navigation and contact controls", caption: "Mobile contact close · proof, navigation recovery and direct-contact controls remain visible at the end." },
      ],
      review: {
        label: "Next review",
        title: "A released interface still needs careful checking.",
        body:
          "I reviewed the captured page as a production surface rather than treating release as the end of the project. These are the main issues I would verify before another iteration.",
        items: [
          { title: "Routes and recovery", body: "Several linked information pages returned 404 responses in the 5 September 2026 review, so navigation continuity still needs checking." },
          { title: "Claims and metrics", body: "Desktop and mobile captures showed different proof-point values. I treat the component as a layout pattern until the business figures are reconciled." },
          { title: "Language and contact", body: "CTA wording, Australian spelling and the visible email link need a consistency pass across breakpoints." },
          { title: "Access and media", body: "Text contrast, keyboard handling for the campaign layer, dismissal behaviour and image licensing remain production-review items." },
        ],
        accuracy:
          "This case describes the live interface captured on 5 September 2026. It does not claim unverified research findings, conversion improvements or business outcomes.",
      },
      captures: {
        label: "Original interface record",
        title: "The unannotated captures remain available for comparison.",
        body:
          "These screenshots preserve the desktop and mobile states behind the analysis above. They are shown at a lower hierarchy so the case remains readable while the source interface stays inspectable.",
        items: [
          { src: "assets/projects/tidyteddy/original/desktop-full-page.png", alt: "Full-page desktop capture of the TidyTeddy landing page", caption: "Desktop · complete landing-page capture", kind: "full" },
          { src: "assets/projects/tidyteddy/original/01-desktop-hero-booking.png", alt: "Desktop hero and consultation booking form", caption: "Desktop · hero and booking" },
          { src: "assets/projects/tidyteddy/original/02-desktop-service-cards.png", alt: "Desktop service-card section", caption: "Desktop · service cards" },
          { src: "assets/projects/tidyteddy/original/03-desktop-success-metrics.png", alt: "Desktop success-metrics band", caption: "Desktop · proof-point layout" },
          { src: "assets/projects/tidyteddy/original/04-desktop-testimonials.png", alt: "Desktop customer-testimonial carousel", caption: "Desktop · customer stories" },
          { src: "assets/projects/tidyteddy/original/05-desktop-before-after-gallery.png", alt: "Desktop before-and-after gallery", caption: "Desktop · before-and-after gallery" },
          { src: "assets/projects/tidyteddy/original/06-desktop-about.png", alt: "Desktop About section", caption: "Desktop · brand reassurance" },
          { src: "assets/projects/tidyteddy/original/07-desktop-partners-footer.png", alt: "Desktop partner row and footer", caption: "Desktop · credibility and footer" },
          { src: "assets/projects/tidyteddy/original/08-desktop-promo-overlay.png", alt: "Desktop promotional overlay", caption: "Desktop · campaign overlay" },
          { src: "assets/projects/tidyteddy/original/09-mobile-hero-services.png", alt: "Mobile hero and service categories", caption: "Mobile · entry and services", kind: "mobile" },
          { src: "assets/projects/tidyteddy/original/10-mobile-metrics-feedback.png", alt: "Mobile proof points and customer feedback", caption: "Mobile · reassurance", kind: "mobile" },
          { src: "assets/projects/tidyteddy/original/11-mobile-cta-about.png", alt: "Mobile campaign panel and About section", caption: "Mobile · brand story", kind: "mobile" },
          { src: "assets/projects/tidyteddy/original/12-mobile-partners-footer.png", alt: "Mobile partner grid and footer", caption: "Mobile · contact close", kind: "mobile" },
        ],
      },
    },
    sources: [],
  },
  {
    id: "linghang",
    title: "Linghang: Employment Operations & Workflow Design",
    displayTitle: "Linghang: Employment Operations & Workflow Design",
    shortTitle: "Linghang",
    kicker: "Product management · employment operations",
    year: "2026 — present",
    category: "strategy",
    summary:
      "At Linghang Education & Migration Service, I research Australian occupations and employers, organise job data and turn repeated operational tasks into reviewable workflows for the business team.",
    meaning:
      "The role has taught me to connect research with day-to-day operations, while keeping source checks, uncertainty and consequential decisions with people.",
    role:
      "Product Manager / Digital Consulting · employment research, data operations, workflow design, service planning and team hand-off.",
    methods: [
      "Process mapping",
      "Service planning",
      "UiPath and RPA",
      "Codex-supported workflows",
      "Source validation",
      "Privacy and exception handling",
    ],
    cover: {
      src: "assets/projects/professional/linghang-cover.svg",
      alt: "Responsible workflow diagram connecting client context, research and document tasks with human review",
    },
    sections: [
      {
        eyebrow: "Process mapping",
        title: "Find repeated work without losing the service context",
        body:
          "I map back-office processes and identify repeated work in information research, document checking, template use and knowledge reuse. I also organise service options around clients’ goals, backgrounds, eligibility, timing and risks.",
      },
      {
        eyebrow: "Workflow design",
        title: "Use automation for bounded research and organisation tasks",
        body:
          "I have designed workflows using UiPath, RPA and Codex to support structured collection, checking and reuse. The purpose is to reduce repeated manual handling while keeping the source and review path visible.",
      },
      {
        eyebrow: "Human responsibility",
        title: "Keep judgement, privacy and exceptions with people",
        body:
          "Automation cannot choose a client’s study, career or migration path. I therefore retain source validation, human review, privacy controls and exception handling. Because the role is ongoing, this case includes only workflows and materials completed before submission.",
      },
    ],
    media: [
      {
        type: "image",
        src: "assets/projects/professional/linghang-cover.svg",
        alt: "Linghang responsible digital workflow overview",
        caption: "Project overview · service context, bounded automation and human review",
        layout: "wide",
      },
      {
        type: "image",
        src: "assets/projects/professional/linghang-process.svg",
        alt: "Workflow diagram showing repeated tasks, automation support and retained human controls",
        caption: "Automation supports repeatable tasks while validation, privacy and exceptions remain under human review",
        layout: "wide",
      },
    ],
    linghangStudy: {
      labels: {
        roleMap: "Role map",
        workflow: "Workflow",
        workflowTitle: "Ten stages take a business question from scope to evidence-led revision.",
        input: "Input",
        output: "Output",
        gate: "Human gate",
        scale: "Evidence at scale",
        scaleTitle: "The numbers describe supplied working material, not commercial outcomes.",
        workProduced: "Work produced",
        workProducedTitle: "Four workstreams connected research to day-to-day operations.",
      },
      opening: {
        label: "Role and operating system",
        title: "I worked between employment research, data operations and business hand-off.",
        body:
          "My work began with Australian occupation and employer research. I then turned repeated collection, screening and document tasks into staged workflows, prepared structured outputs for colleagues and used their feedback to revise the next round of work.",
        note:
          "The formal portfolio title remains Product Manager / Digital Consulting. Employer outreach and final case decisions were shared with business colleagues; legal or migration advice stayed outside the automation workflow.",
      },
      roleMap: [
        { label: "My responsibility", title: "Research and workflow design", body: "Define the occupation scope, collect and structure public job data, design screening rules, prepare tools and document uncertainty." },
        { label: "Team hand-off", title: "Employer and candidate contact", body: "Business colleagues use the organised material for calls, messages, email outreach and follow-up, then return what they learn to the workflow." },
        { label: "Human decision", title: "Eligibility, compliance and individual advice", body: "People review source validity, exceptions, privacy and consequential decisions. Automation does not choose a client’s study, career or migration path." },
      ],
      workflow: [
        { id: "01", title: "Set the occupation boundary", input: "Business question and target occupation", action: "Define the ANZSCO title, synonyms, exclusions and duty keywords before searching.", output: "An occupation card and search boundary", owner: "Bowen", gate: "Do not collect until the scope is agreed" },
        { id: "02", title: "Verify the working environment", input: "Platforms, folders and data tools", action: "Check access, pagination and the expected input files without beginning collection.", output: "A recorded environment-ready state", owner: "Bowen", gate: "Explicit confirmation before collection" },
        { id: "03", title: "Collect the raw listings", input: "Approved search terms and platforms", action: "Work through the available result pages and preserve job, company, location and source links.", output: "Raw evidence with page lineage", owner: "Bowen", gate: "A first-page sample is not treated as complete" },
        { id: "04", title: "Recover gaps", input: "Raw files and platform limits", action: "Check missing pages, blocked views and uncertain records; send unresolved items to manual review.", output: "A gap log and reviewed raw set", owner: "Bowen + reviewer", gate: "No CAPTCHA bypass or guessed records" },
        { id: "05", title: "Clean and deduplicate", input: "Reviewed raw records", action: "Normalise the fourteen-field schema, remove deterministic duplicates and retain an audit trail for ambiguous cases.", output: "A stable screening table", owner: "Bowen", gate: "Schema and record-count checks must pass" },
        { id: "06", title: "Screen job relevance", input: "Clean records and occupation rules", action: "Place listings into keep, review or reject groups using duties and public evidence rather than job title alone.", output: "A cautious relevance decision", owner: "Bowen + reviewer", gate: "Uncertain cases remain review, not forced matches" },
        { id: "07", title: "Verify the employer", input: "Relevant listings", action: "Check the organisation’s public website, advertisement and contact route while recording the strength of the evidence.", output: "Company evidence and public contact route", owner: "Bowen", gate: "Do not infer ownership or ethnicity from names or images" },
        { id: "08", title: "Route by region", input: "Verified Australian location", action: "Normalise state and locality fields, then assign each record to the agreed regional owner.", output: "VIC, NSW/ACT/TAS, WA/SA/NT/QLD or manual review", owner: "Bowen + team", gate: "Remote, multi-state and conflicting locations stay manual" },
        { id: "09", title: "Hand off for contact", input: "Screened employer and role record", action: "Prepare the material used by colleagues for employer contact and candidate discussion.", output: "Contact work plus feedback on fit", owner: "Business colleagues", gate: "The employer retains hiring and compliance decisions" },
        { id: "10", title: "Revise or stop", input: "Contact feedback and business evidence", action: "Update search rules, narrow the target or stop a direction when the assumptions do not hold.", output: "A revised workflow or a documented stop decision", owner: "Bowen + team", gate: "Evidence determines whether another cycle is justified" },
      ],
      metrics: [
        { value: "456", label: "occupation records", basis: "Rows in the supplied Core Skills Occupation List reference CSV", caution: "A reference set, not occupations personally validated in depth" },
        { value: "216,566", label: "employer candidate records", basis: "Rows in the supplied active-employer source dataset", caution: "A candidate pool before screening, not verified leads or successful contacts" },
        { value: "3,291", label: "location hierarchy records", basis: "Data rows in the complete Victorian LGA and locality hierarchy sheet", caution: "A geographic reference used for routing" },
        { value: "19", label: "research spreadsheet files", basis: "18 Excel workbooks and one Numbers workbook in the supplied job-research folder", caution: "Includes versions and overlapping searches, so the values are not summed as unique leads" },
      ],
      workstreams: [
        { number: "01", title: "Employment-data pipeline", body: "A staged SOP moves public job listings from raw collection through gap recovery, cleaning, cautious occupation screening, employer evidence and regional hand-off." },
        { number: "02", title: "Career-path research", body: "A reusable framework compares education, professional recognition, work and longer-term options while recording source date, conditions, conflicts and items that need professional review." },
        { number: "03", title: "Resume and case tools", body: "Local prototypes organise resume extraction, missing-information checks, structured editing and client pathway evidence. They support preparation; they do not create credentials or legal conclusions." },
        { number: "04", title: "Employer communication", body: "Recruitment copy, screening questions and sector-specific outreach materials set expectations about work rights, location, role fit, consent and the employer’s control of hiring." },
      ],
      retrospective: {
        label: "Business-model retrospective",
        title: "The blue-collar sponsorship model did not become stable or repeatable, so the project was stopped.",
        body:
          "The work produced useful research and operating methods, but employer conversations did not support the assumptions required for a repeatable service. Recording that outcome was part of the job.",
        assumptions: [
          { title: "Labour shortage", body: "A shortage did not automatically mean that an employer was willing to sponsor an overseas worker." },
          { title: "Work readiness", body: "Domestic experience did not automatically meet Australian expectations for work rights, licensing, English and safety." },
          { title: "Decision structure", body: "The paying client, the employer who decides and the person who benefits were not always aligned." },
          { title: "Operating economics", body: "The pathway was long and uncertain, while employer supply and repeatability remained weak." },
        ],
        decision:
          "Later work should begin with verified employer demand, candidates closer to local work readiness and small staged tests with explicit stop conditions.",
      },
      boundaries: {
        label: "Responsibility boundary",
        title: "Automation supported preparation; people remained responsible for consequential decisions.",
        items: [
          { title: "Automation", body: "Used for extraction, organisation, comparison, draft structure and missing-field checks. Every important source still needs human verification." },
          { title: "Attribution", body: "I designed and operated research and workflow components. Employer outreach, candidate communication and business decisions were shared with colleagues." },
          { title: "Privacy", body: "The public case excludes candidate resumes, identity documents, contracts, health and bank records, passwords and private employer contact details." },
        ],
      },
    },
    sources: [],
  },
];

const caseFacts = {
  vita: {
    context: "University group project · responsible-AI interaction concept",
    ownership: "Four-person team; shared concept, research, testing and presentation",
    contribution: "I supported Voiceflow structure, routing logic, technical implementation and prototype review, and documented how coding tools were used.",
    evidence: "Refined Voiceflow prototype, walkthrough video and submitted group presentation",
    outcome: "Testing led the team to clarify editable hypotheses, system boundaries and human hand-off points.",
    limitation: "A course prototype, not a deployed service or evidence of long-term user impact.",
    homeContribution: "Group · Voiceflow structure, routing and prototype review",
    homeEvidence: "Refined prototype + walkthrough video",
  },
  "library-evaluation": {
    context: "University group project · mixed-method usability evaluation",
    ownership: "Five-person team; research planning, sessions, analysis and report were shared",
    contribution: "I contributed to the research plan, moderated evaluation work, observation, evidence synthesis and final report.",
    evidence: "14 online participants, 5 moderated participants, 5 representative tasks and 8 prioritised recommendations",
    outcome: "The team translated observed booking, search and labelling failures into eight traceable interface recommendations.",
    limitation: "The small student sample supports a next iteration, not population-level proof.",
  },
  "signal-aftershock": {
    context: "Individual game-design project · playable browser prototype",
    ownership: "Individual project",
    contribution: "I designed the rule system, interface, visual feedback and browser implementation, then revised them through playtesting.",
    evidence: "Playable prototype, development journal and documented rule changes",
    outcome: "Removing cards, roles and attacks made the dice-and-space mechanic clearer, fairer and faster to learn.",
    limitation: "Playtesting was formative and small-scale; it does not establish broad audience appeal.",
    homeContribution: "Individual · Rules, interface, browser build and playtesting",
    homeEvidence: "Playable game + documented rule changes",
  },
  "film-to-book": {
    context: "Individual editorial-design project · film translated into publication form",
    ownership: "Individual project",
    contribution: "I developed the visual system, pacing, typography, image treatment and final book sequence.",
    evidence: "Complete publication PDF and selected process spreads",
    outcome: "The final book turns cinematic rhythm into an editorial sequence through scale, interruption and controlled repetition.",
  },
  "colour-systems": {
    context: "Individual colour-studio folio · seasonal and comparative studies",
    ownership: "Individual project",
    contribution: "I planned, produced and edited colour studies across composition, contrast, material and seasonal narrative.",
    evidence: "Two submitted folios and selected high-resolution studies",
    outcome: "The studies establish a consistent method for controlling temperature, contrast and visual rhythm across changing briefs.",
  },
  "light-performance": {
    context: "Individual material experiment · light observed through four constructions",
    ownership: "Individual project",
    contribution: "I built the material tests, documented optical behaviour and compared how reflection, diffusion and shadow changed space.",
    evidence: "Four physical experiments, photographic record and submitted folio",
    outcome: "The comparison distinguishes how fibre, translucent sheet, reflective surface and shadow each redistribute one light source.",
  },
  pyrrha: {
    context: "Individual spatial-design project · narrative translated into model and notation",
    ownership: "Individual project",
    contribution: "I developed the spatial concept, drawings, model language and final visual narrative.",
    evidence: "Submitted design folio, plans, sections, axonometric views and model studies",
    outcome: "The final system turns fragmented story cues into a looping spatial sequence with a consistent notation language.",
  },
  "booking-systems": {
    context: "Individual desk-based critical review of Booking.com",
    ownership: "Individual project",
    contribution: "I mapped stakeholders, reviewed decision friction and persuasive patterns, and proposed an inclusive redesign direction.",
    evidence: "25-page critical review using interface observation, systems mapping and published literature",
    outcome: "The review reframes accessibility as cognitive and decision effort, then identifies hierarchy, transparency and trust as design priorities.",
    limitation: "This was not a WCAG conformance audit, assistive-technology test or study with disabled participants.",
  },
  "melbourne-motion": {
    context: "Individual graphic-design project · Melbourne represented through motion and sequence",
    ownership: "Individual project",
    contribution: "I created the visual concept, typographic system, image sequence and final publication.",
    evidence: "Submitted visual narrative and selected spreads",
    outcome: "The work uses cropping, repetition and pace to make the city read as movement rather than a static landmark set.",
  },
  "words-unleashed": {
    context: "Individual typographic project · language expanded into image and rhythm",
    ownership: "Individual project",
    contribution: "I designed the typographic experiments, compositional rules and final sequence.",
    evidence: "Submitted project PDF and selected typographic studies",
    outcome: "The sequence demonstrates how scale, spacing and repetition can shift a word from information into visual action.",
  },
  "trace-exaggeration": {
    context: "Individual spatial workflow · observation translated into editable geometry",
    ownership: "Individual project",
    contribution: "I traced source conditions, built the Rhino model and tested extension, compression and repetition across views.",
    evidence: "Presentation deck, Rhino 3DM model and exported drawings",
    outcome: "The workflow converts an everyday trace into a controlled family of spatial exaggerations.",
  },
  "investment-strategy": {
    context: "Individual finance-course project · ten-asset Australian investment comparison",
    ownership: "Individual project",
    contribution: "I collected annual data, built the workbook comparison and translated return, risk and scenario evidence into a portfolio direction.",
    evidence: "Twelve annual observations across ten asset classes, independently recomputed for this portfolio",
    outcome: "The corrected comparison supports a low-volatility core, measured growth exposure and explicit underweights.",
    limitation: "The submitted workbook contains formula and column-reference errors; corrected portfolio figures are labelled separately from the original file.",
  },
  "financial-feasibility": {
    context: "University group project · retail-development feasibility model",
    ownership: "Four-person team; modelling, analysis and recommendation were shared",
    contribution: "I contributed to model development, scenario analysis, risk synthesis and the final strategic recommendation.",
    evidence: "Submitted report and 15-sheet model covering construction, revenue, debt and sensitivity",
    outcome: "The submitted report recommended a conditional proceed and identified occupancy, rent, cost and schedule as decisive drivers.",
    limitation: "A later audit found unreconciled NPV and IRR outputs across sheets and the report, so the headline values are not presented here as verified facts.",
    homeContribution: "Group · Model development, scenarios and risk synthesis",
    homeEvidence: "15-sheet model + feasibility report",
  },
  musclekey: {
    context: "Individual teaching prototype · read-only surface EMG interaction",
    ownership: "Individual project",
    contribution: "I reviewed the method and safety documentation, planned the hardware chain, wrote the threshold and trial logic, built the interactive website and documented a ten-step procedure.",
    evidence: "Working browser simulation, tested threshold logic, ten-step illustrated procedure and a source register",
    outcome: "The project produces a clear teaching prototype for tracing one forearm sEMG signal from sensing to a digital input event.",
    limitation: "The website does not yet read live serial data, and no participant or clinical study was conducted. Simulated CSV remains separate from hardware evidence.",
    homeContribution: "Individual project · I planned the hardware chain, wrote the logic and built the website",
    homeEvidence: "Interactive simulation + ten-step illustrated procedure",
  },
  "ai-for-education": {
    context: "University research-assistant work · AI-supported education and student course experience",
    ownership: "Contribution within a University of Melbourne HCI research project",
    contribution: "I helped develop the mixed-method questionnaire, organised student responses, carried out descriptive analysis and open-text coding, and prepared charts and seminar material.",
    evidence: "Six-question live mid-semester survey, thirteen-item course-feedback PDF, questionnaire work, descriptive summaries and open-text analysis methods",
    outcome: "The analysis brought student needs and open questions into discussion with researchers and educators.",
    limitation: "The study identified student needs and questions for further research; it was not proof that a particular AI tool improved learning.",
  },
  tidyteddy: {
    context: "UI/UX internship · February–July 2025 · cleaning-services website updates and new functions",
    ownership: "Internship contribution within TidyTeddy’s product and IT workflow",
    contribution: "I analysed users, competitors and journeys; developed sketches, page structures, responsive flows and high-fidelity Figma prototypes; and supported handoff, revisions and release.",
    evidence: "Thirteen annotated interface boards and thirteen original captures tracing the released desktop and mobile journey, alongside the documented design and handoff scope",
    outcome: "The work carried the main interaction logic from early analysis through developer handoff and release support; the live interface was recaptured for this case on 5 September 2026.",
    limitation: "This is a retrospective account of my design, handoff, coordination and release-support contribution. I have no verified post-launch conversion data, and visible business metrics remain unverified.",
  },
  linghang: {
    context: "Ongoing product-management and digital-consulting work · employment, education and migration services",
    ownership: "Professional contribution within Linghang Education & Migration Service",
    contribution: "I researched Australian occupations, jobs and employers; structured collection and screening data; designed staged workflows and local preparation tools; and handed reviewed material to business colleagues.",
    evidence: "Staged data SOPs, 19 job-research spreadsheet files, career-path research plans, regional routing data, local resume and case-planning prototypes, recruitment copy and an internal business-model retrospective",
    outcome: "The work made data lineage, review gates and team hand-off explicit. It also supported a documented decision to stop a blue-collar sponsorship model when employer evidence did not support a stable, repeatable service.",
    limitation: "The role is ongoing, so this case includes only work completed before submission. Dataset sizes describe supplied working material, not verified leads, successful contacts or commercial outcomes. The public case excludes private candidate, employer, contract and identity records.",
  },
};

const sourcePolicies = {
  vita: "shared",
  "library-evaluation": "shared",
  "financial-feasibility": "shared",
};

window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS.map((project) => ({
  ...project,
  caseFacts: caseFacts[project.id],
  sourcePolicy: sourcePolicies[project.id] || "individual",
  sources: project.sources.map((source) => {
    if (!sourcePolicies[project.id]) return source;
    const isPresentation = source.href.endsWith(".mp4");
    return { ...source, presentation: isPresentation, restricted: false };
  }),
}));

window.PORTFOLIO_CAPABILITIES = {
  groups: [
    {
      number: "01",
      title: "UX Research & Evaluation",
      statement:
        "I plan usability studies, combine behavioural and task evidence, and turn findings into prioritised design recommendations.",
      skills: [
        "Research planning",
        "Moderated usability testing",
        "Task timing and observation",
        "Think-aloud facilitation",
        "Eye-tracking interpretation",
        "Evidence synthesis",
      ],
      evidence:
        "Library Evaluation · 14 online participants, 5 moderated participants, 5 tasks and 8 traceable recommendations.",
    },
    {
      number: "02",
      title: "Interaction Design & Prototyping",
      statement:
        "I prototype interfaces, conversation flows and rule-based systems, then revise them through testing.",
      skills: [
        "User and conversation flows",
        "Information architecture",
        "Figma and Voiceflow prototyping",
        "HTML / CSS / JavaScript",
        "Game rules and feedback states",
        "Iterative testing",
      ],
      evidence:
        "Signal Aftershock · an individual playable browser game; Vita · shared Voiceflow prototype and documented iteration.",
    },
    {
      number: "03",
      title: "Visual & Strategic Communication",
      statement:
        "I use visual hierarchy and structured analysis to make complex evidence easier to understand and act on.",
      skills: [
        "Editorial hierarchy and typography",
        "Visual systems and sequencing",
        "Presentation narratives",
        "Comparative analysis",
        "Scenario and risk communication",
        "Figma, Adobe, Excel and Rhino workflows",
      ],
      evidence:
        "Film to Book · complete editorial sequence; Investment Strategy · ten-asset comparison with independently audited portfolio metrics.",
    },
  ],
};

const publicVideoPath = (sourcePath) =>
  sourcePath.endsWith(".mp4") ? `media/${sourcePath.split("/").pop()}` : sourcePath;

window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS.map((project) => ({
  ...project,
  media: project.media.map((item) =>
    item.type === "video" ? { ...item, src: publicVideoPath(item.src) } : item,
  ),
  sources: project.sources.map((source) => ({
    ...source,
    href: source.external ? source.href : publicVideoPath(source.href),
  })),
}));
