(function applyStudentVoiceCopy(global) {
  const copy = {
    en: {
      meta: {
        title: "Bowen Mai — UX Design Student",
        description: "Bowen Mai is a UX Design student at the University of Melbourne. This portfolio documents coursework, research, prototypes and selected professional experience.",
      },
      site: {
        brandDiscipline: "Student design portfolio",
        heroTopline: "Bowen Mai — UX Design Student",
        workDescription: "Four projects I selected from my work in AI interaction, game design, financial modelling and embodied research.",
        capabilitiesTitle: "What I have practised",
        capabilitiesDescription: "The skills below come from coursework, research-assistant work, internships and individual projects.",
        disciplinesLabel: "Learning through projects",
        disciplinesTitle: "What I have practised",
        aboutParagraphOne: "I’m Bowen Mai, a UX Design student at the University of Melbourne. In my coursework, I plan small studies, build interaction prototypes and revise them after testing and observation.",
        aboutParagraphTwo: "The projects here move between conversational AI, games, financial modelling, visual design and embodied interaction. I use the portfolio to show both what I made and what I learned while making it.",
        archiveDescription: "Ten additional course projects, grouped by subject so they remain easy to find without competing with the four selected cases.",
        contactTitle: "Contact",
        contactIntro: "Thank you for visiting. If you would like to ask about a project or discuss study, research or internship opportunities, you can contact me below.",
        resumeFocus: "UX design · Research · Digital products · Business analysis",
        resumeSummary: "I’m studying UX Design in the Bachelor of Design at the University of Melbourne. Through coursework, internships and work experience, I have gained experience in user research, applied psychology, HCI, digital product design, business and market analysis, and frontline retail. I use surveys, interviews, data cleaning and basic statistics, together with Excel, Figma, UiPath/RPA and AI-assisted tools. I work in Chinese and English and have foundational Japanese. I’m seeking consulting internships related to financial-services digital transformation, customer experience or business analysis.",
        experienceTitle: "Experience",
        experienceOneBody: "I researched Australian occupations and employers for Chinese candidates planning a job search. I organised the work around candidate needs, roles, employers and application stages, then used UiPath/RPA and Codex-assisted workflows for extraction, cleaning and batch processing. Human review, source checks, privacy controls and exception handling remained part of the process.",
        experienceTwoBody: "I supported course-satisfaction and HCI research at the University of Melbourne. My work included helping define the research questions, designing mixed-method surveys, cleaning responses, reviewing open comments, preparing charts and contributing to reports, presentations and course recommendations.",
        experienceThreeBody: "During my UI/UX internship at TidyTeddy, I reviewed users, competitors, page structure, navigation and journeys for a website redesign. I mapped the main friction points and developed information architecture, high-fidelity interfaces and interactive prototypes through feedback from product, design and development colleagues.",
        experienceFourBody: "At PUMA, I asked customers about budget, preferences and intended use before recommending products. The role gave me direct experience of customer questions, purchasing decisions and service. I was recognised as Top Sales Advisor of the Month.",
        resumeProjectsTitle: "Selected research and project work",
        resumeProjectOneTitle: "Australian employment-market research",
        resumeProjectOneBody: "I organised public job and employer information by industry, region, occupation, employer type, skills and qualifications. In Excel, I standardised, cleaned, deduplicated and checked the sources before using the material to identify market segments, opportunity priorities, candidate profiles and job-search recommendations.",
        resumeProjectTwoTitle: "Australian career research and talent-matching workflow",
        resumeProjectTwoBody: "I separated candidate needs, occupation research, employer screening, matching suggestions and application tracking into traceable steps. UiPath/RPA and Codex supported browser work, extraction, cleaning, validation and batch organisation, while human review, source records, privacy controls and exception handling remained visible.",
        resumeProjectThreeTitle: "Student course-satisfaction and HCI research",
        resumeProjectThreeBody: "I helped design a survey about course content, teaching experience and learning support. The study combined quantitative items with open questions. I cleaned and summarised the responses, prepared charts and contributed to the report draft, internal presentation and course-improvement suggestions.",
        resumeProjectFourTitle: "TidyTeddy website redesign",
        resumeProjectFourBody: "I compared competitor websites, mapped the current journey and noted where users could struggle with page structure, navigation and action. I then developed information architecture and high-fidelity prototypes, revising them through team feedback.",
        resumeProjectFiveTitle: "Australian multi-asset investment study",
        resumeProjectFiveBody: "For a finance course, I standardised annual data for ten Australian assets from 2013 to 2024 and compared average return, volatility, CAGR and Sharpe ratio in Excel. I also tested an interest-rate pressure scenario and proposed a diversified direction centred on stable property and corporate debt.",
        resumeProjectSixTitle: "Melbourne CBD retail-mall feasibility study",
        resumeProjectSixBody: "In a four-person group, I contributed to a 15-sheet model for a 10,000 m² retail mall. The model connected construction costs, an 18-month programme, tenant mix, occupancy, rent, operating costs and five-year debt, then used DCF, NPV/IRR and sensitivity analysis to examine key risks.",
        resumeCapabilitiesTitle: "Methods, tools and languages",
        resumeCapabilityOneTitle: "Research and analysis",
        resumeCapabilityOneBody: "Survey design, interviews, mixed-method research, applied-psychology methods, data collection and cleaning, basic statistics, market and competitor research, needs analysis, process mapping and risk review.",
        resumeCapabilityTwoTitle: "Tools and communication",
        resumeCapabilityTwoBody: "Excel, PowerPoint, data visualisation and report drafting; UiPath/RPA, Codex, ChatGPT, DeepSeek and Figma; graphic design, information hierarchy, prototypes, output checks and team communication.",
        resumeCapabilityThreeTitle: "Web and interaction design",
        resumeCapabilityThreeBody: "Information architecture, responsive layouts, high-fidelity Figma prototypes and working knowledge of HTML, CSS and JavaScript.",
        resumeCapabilityFourTitle: "Business and market coursework",
        resumeCapabilityFourBody: "Comparative data analysis, cost-benefit reasoning, investment value, risk and financial-feasibility analysis.",
      },
      categories: {
        "digital-interaction": { description: "Interfaces, conversation flows and game rules I developed to see how feedback changes a user’s choices." },
        "ux-research": { description: "Course and research projects where I planned studies, observed participants and organised findings for another design iteration." },
        "visual-editorial": { description: "Books, type, images and colour studies made through material experiments and repeated visual testing." },
        "spatial-material": { description: "Projects where observation, light and narrative were developed through models, drawings and physical tests." },
        strategy: { description: "Finance and systems coursework using data, assumptions and scenarios to explain a decision and its limits." },
        "embodied-systems": { description: "A research-through-making project about sensing movement, returning feedback and testing what remains after guidance stops." },
      },
      capabilities: {
        groups: [
          {
            title: "UX research and evaluation",
            statement: "Most of my research experience comes from coursework and my research-assistant role. I have helped plan studies, run moderated sessions, observe participants and organise findings for the next design iteration.",
            skills: ["Research planning", "Moderated usability testing", "Task timing and observation", "Think-aloud facilitation", "Eye-tracking interpretation", "Finding synthesis"],
            evidence: "Library evaluation: 14 online participants, 5 moderated participants, 5 tasks and 8 recommendations.",
          },
          {
            title: "Interaction design and prototyping",
            statement: "I have built interface flows, a Voiceflow conversation and a browser game. Testing these projects taught me to simplify rules, make system states visible and leave important decisions with the user.",
            skills: ["User and conversation flows", "Information architecture", "Figma and Voiceflow", "HTML / CSS / JavaScript", "Game rules and feedback states", "Iterative testing"],
            evidence: "Signal Aftershock: an individual playable browser game. Vita: a group Voiceflow prototype with documented testing changes.",
          },
          {
            title: "Visual and analytical communication",
            statement: "My visual and finance projects use different tools, but both require careful editing. I select the evidence, make the comparison readable and state where the result is still limited.",
            skills: ["Editorial hierarchy and type", "Visual systems and sequence", "Presentation", "Comparative analysis", "Scenario and risk explanation", "Figma, Adobe, Excel and Rhino"],
            evidence: "Film to Book: a complete editorial sequence. Investment Strategy: a ten-asset comparison with corrected figures separated from the submitted workbook.",
          },
        ],
      },
      projects: {
        vita: {
          summary: "Vita was developed in a university group project that began with a speculative 2038 scenario. We asked how AI might help first- and second-year students reflect on their values and compare possible career directions without deciding for them. The result was a chatbot prototype for career reflection.",
          meaning: "The main question was how an AI tool could support reflection while leaving the student responsible for the final decision.",
          role: "Group project. I supported the Voiceflow structure, routing logic, technical implementation and prototype review, and also joined the research, testing and critique.",
          sections: [
            { title: "How the 2038 scenario led to Vita", body: "We began with a 2038 scenario in which technology made daily life easier but reduced social contact. Forecasts and speculative artefacts helped us narrow the project to a practical question: could technology help someone think through a decision without choosing for them?" },
            { title: "Building and testing the conversation", body: "Vita guided first- and second-year students through values, energisers, working styles and possible career directions. Testing revealed unstable routing, unclear system states and a risk that users might accept an answer too quickly. We responded with clearer boundaries, editable ideas and points where a person could step in." },
            { title: "What responsible AI meant in the interface", body: "We treated reliability, cultural bias and identity as interface questions that needed visible responses. The prototype shows uncertainty and asks the student to review or correct a suggestion instead of presenting it as a final answer." },
          ],
          caseFacts: {
            contribution: "I supported the Voiceflow structure, routing logic, technical implementation and prototype review. I also documented how coding tools were used.",
            outcome: "Testing helped the team make editable ideas, system limits and human hand-off points clearer.",
            homeContribution: "Group project · I supported Voiceflow structure, routing and prototype review",
          },
        },
        "library-evaluation": {
          summary: "In this five-person university project, we evaluated the University of Melbourne Library website with a five-second test, moderated sessions and eye tracking. The aim was to understand where students struggled and connect each recommendation to an observed task.",
          meaning: "We tried to keep each recommendation close to what participants actually did, while being honest about the small student sample.",
          role: "Five-person group project. I contributed to research planning, moderated evaluation work, observation, analysis and the final report.",
          sections: [
            { title: "First impressions and five real tasks", body: "Fourteen students completed the online five-second test and five students joined moderated sessions. We recorded task completion, time, difficulty, comments, observation and gaze behaviour while they booked rooms, used referencing tools, searched databases and found exam papers and journals." },
            { title: "Room booking caused the clearest difficulty", body: "All five moderated participants struggled with room booking, and one did not complete it within eight minutes. We also found weak confirmation and low-visibility controls in database search, past papers and downloads, even though participants generally valued the website." },
            { title: "Eight recommendations tied to the observations", body: "The final report proposed a guided booking sequence, clearer eligibility errors, explicit labels, matched-search feedback and a visible Select Space action. Each recommendation kept its report identifier so it could be checked against the original finding." },
          ],
          caseFacts: {
            contribution: "I contributed to the research plan, moderated evaluation work, observation, analysis and final report.",
            outcome: "As a team, we used the booking, search and labelling findings to prepare eight interface recommendations.",
          },
        },
        "signal-aftershock": {
          summary: "Signal Aftershock is an individual browser-game project for two or three players. Players draw relay lines, work within dice constraints and capture triangular areas while trying to reconnect a city after an earthquake.",
          meaning: "Playtesting showed me that the dice were most useful when they limited a choice but did not make the choice for the player.",
          role: "Individual project. I designed the rules, theme, interface and browser version, then revised them through small-scale playtesting.",
          sections: [
            { title: "Using dice to limit a line", body: "The game developed from an earlier Triangle Territory activity. Instead of moving a token, the dice limit the line a player can draw. This keeps chance in the game while leaving the spatial decision with the player." },
            { title: "Connecting an abstract rule to the earthquake story", body: "Players build relay lines, enclose coverage zones and reconnect important sites. Area, infrastructure bonuses and closure choices give the geometric rule a clear role in the emergency-communication story." },
            { title: "What I removed after playtesting", body: "I removed cards, character roles and attacks because they distracted from the line-and-dice mechanic. I also adjusted the dice stream, claim animation and large-triangle recognition so the game was easier to read and learn." },
          ],
          caseFacts: {
            contribution: "I designed the rules, interface, visual feedback and browser implementation, then revised them through playtesting.",
            outcome: "Removing cards, roles and attacks made the central dice-and-space mechanic easier to understand and teach.",
            homeContribution: "Individual project · I designed the rules, interface, browser build and playtests",
          },
        },
        "film-to-book": {
          summary: "For this individual editorial project, I made a hand-bound book from film stills, musical rhythm, transparent layers and folded pages.",
          meaning: "I wanted the reader to experience pace through handling the book, rather than see a frame-by-frame copy of the film.",
          role: "Individual project. I completed the visual research, material tests, composition and bookmaking.",
          sections: [
            { title: "Turning film material into a page sequence", body: "I treated still images, gestures, notation and text as parts of a visual score. Repetition and transparent layers connect the pages without retelling the film one frame at a time." },
            { title: "Testing rhythm through paper and folds", body: "Folded pages, translucent sheets and uneven marks make the pace physical. Quiet spreads are followed by denser overlaps, so the rhythm changes as the reader opens and turns the book." },
          ],
          caseFacts: { outcome: "The completed book uses scale, interruption, transparency and repetition to carry the film’s rhythm into a printed sequence." },
        },
        "colour-systems": {
          summary: "These two studio folios collect my colour experiments across a seasonal calendar, a book object, a Sony application and a spatial AR study.",
          meaning: "Across the exercises, I tested how the same colour changes when its material, cultural reference, product or lighting condition changes.",
          role: "Individual studio work. I carried out the colour research, image making, visual-system tests and mock-ups.",
          sections: [
            { title: "Testing colour in different contexts", body: "The studies move between perception, Chinese seasonal language, texture, product communication and atmospheric light. Rather than treating colour as one fixed sample, I compared what changed around it." },
            { title: "Applying the studies to a calendar and product", body: "The calendar gives each month a different material and emotional character. I then used a softer group of colour shifts in a Sony application to see how the product felt in different settings." },
          ],
          caseFacts: { outcome: "The two folios record how I controlled temperature, contrast and visual rhythm across several different briefs." },
        },
        "light-performance": {
          summary: "I built a small model box and made six photographic studies of how angle, distance, colour temperature and material change the atmosphere of an enclosed space.",
          meaning: "The experiments helped me compare how light behaves when it is directed, transmitted, refracted, reflected or diffused.",
          role: "Individual study. I planned the experiments, staged the model box, set the lights, photographed each test and compared the results.",
          sections: [
            { title: "Changing angle, colour and distance", body: "The first tests isolate the light direction, colour temperature and distance from the model. Red and blue fields create a strong contrast, while a low white beam shows how a tighter source changes depth and attention." },
            { title: "Comparing what each material does to light", body: "Transparent packaging, coloured water, metallic foil and dense fibres each produce a different result. I compared transmission, refraction, reflection, absorption and diffusion through the photographs." },
          ],
          caseFacts: { outcome: "The photographs show how fibre, translucent sheet, reflective surface and shadow each redistribute the same light source." },
        },
        pyrrha: {
          summary: "For this individual spatial-design project, I interpreted Italo Calvino’s Pyrrha through a looping field that holds both the imagined city and the city encountered in the story.",
          meaning: "The model helped me show how one name can hold an expectation and a conflicting lived experience at the same time.",
          role: "Individual project. I analysed the text, developed the notation and made the digital model and narrative views.",
          sections: [
            { title: "Starting from the gap between a name and a place", body: "I read Calvino’s text as a conflict between expectation and recognition. Different urban fragments sit within one looping structure, so the imagined and observed versions of the city remain distinct but share the same path." },
            { title: "Showing the same model at several scales", body: "I broke apart castle walls, houses and circulation, then reorganised them along the field. Notation, isometric drawing and framed perspectives show the same model at different levels of detail." },
          ],
          caseFacts: { outcome: "The final drawings and model organise the fragmented story cues into a looping spatial sequence with one notation system." },
        },
        "booking-systems": {
          summary: "For this individual desk-based review, I mapped Booking.com’s stakeholders, examined decision effort and persuasive patterns, and outlined a more inclusive redesign direction.",
          meaning: "The review asked me to look beyond the booking screen and consider who benefits, who carries the cost and what information a traveller needs to decide.",
          role: "Individual project. I completed the interface observation, systems map, literature review and critical analysis.",
          sections: [
            { title: "Mapping the people around the booking interface", body: "I expanded the interface into a map of travellers, accommodation providers, hospitality workers, payment services, communities and regulators. This made it easier to see where convenience for one person could create work or cost for someone else." },
            { title: "A redesign direction for clearer decisions", body: "The review connects accessibility, transparent information and local impact. The proposed direction invites affected users and communities into the design process instead of measuring success only through faster conversion." },
          ],
          caseFacts: {
            contribution: "I mapped stakeholders, reviewed decision friction and persuasive patterns, and proposed an inclusive redesign direction.",
            outcome: "The review identifies hierarchy, transparency and trust as priorities for reducing cognitive and decision effort.",
          },
        },
        "melbourne-motion": {
          summary: "This individual graphic-design project began with a route through Melbourne. I traced the movement and developed it into letterforms, maps, symbols and layered compositions.",
          meaning: "I used type and mapping to record the city as a sequence of movements and remembered fragments.",
          role: "Individual project. I documented the route, tested the letterforms and produced the final compositions.",
          sections: [
            { title: "Tracing a route into a letterform", body: "I traced, compressed and rearranged one journey through the city. The final line keeps some of the irregular movement while becoming a recognisable typographic form." },
            { title: "Building compositions from collected fragments", body: "Maps, street signs, market typography, textures and shifts in scale form the visual material. The project moves from one contour to posters that combine several impressions of Melbourne." },
          ],
          caseFacts: { outcome: "Cropping, repetition and changes in pace let the final sequence describe Melbourne through movement instead of a list of landmarks." },
        },
        "words-unleashed": {
          summary: "This two-part visual communication project pairs a generative AR environment with a quiet poetry publication. I used it to compare how words behave in a space and on a printed page.",
          meaning: "The AR work disperses language around the viewer, while the publication slows it down through spacing and sequence.",
          role: "Individual project with co-design input. I developed the concept, generative tests, editorial system and mock-ups.",
          sections: [
            { title: "Testing words as part of an AR environment", body: "The AR experiment uses botanical colour and particle-like forms. Instead of arranging type as a single line, I placed it across a field that the viewer could move through." },
            { title: "Slowing the same language down in print", body: "The publication uses short poems, wide spacing, small graphic cues and soft seasonal colour. Physical mock-ups helped me test whether the pacing remained clear when the pages were printed and bound." },
          ],
          caseFacts: { outcome: "The project compares how scale, spacing and repetition change a word across spatial and printed formats." },
        },
        "trace-exaggeration": {
          summary: "Across two assignments, I traced a botanical photograph, selected its main contours and developed the fragments into a three-dimensional Rhino model.",
          meaning: "The sequence records how the source image changed as I reduced, selected and exaggerated its lines.",
          role: "Individual project. I completed the observational tracing, abstraction, spatial translation and Rhino modelling.",
          sections: [
            { title: "Finding a smaller set of lines in the photograph", body: "I reduced a close botanical photograph to contours, overlaps and directional paths. The tracing gave me a limited group of forms to carry into the next assignment." },
            { title: "Extending the traced fragments in Rhino", body: "I extended, compressed and repeated selected forms in Rhino. Perspective and side views show how the model changes from dense intersections to longer projections." },
          ],
          caseFacts: { outcome: "The final model shows one route from an everyday photograph to a controlled set of spatial exaggerations." },
        },
        "investment-strategy": {
          summary: "For an individual finance-course project, I compared ten Australian asset classes from 2013 to 2024 using return, volatility, CAGR and Sharpe ratio, then prepared a 2025 portfolio direction.",
          meaning: "The comparison taught me to separate strong headline growth from performance after risk was considered.",
          role: "Individual project. I collected the data, built the Excel comparison, tested an interest-rate scenario and prepared the portfolio recommendation.",
          sections: [
            { title: "Comparing growth with volatility", body: "Industrial warehouse and logistics assets showed strong long-run growth but also high volatility. Residential property, commercial office and corporate bonds were more stable on a risk-adjusted basis." },
            { title: "Building a portfolio direction from the comparison", body: "My proposed direction uses stable real estate and corporate bonds as the core, with smaller exposure to higher-growth industrial assets. I also tested how tighter monetary conditions could change the balance." },
          ],
          caseFacts: {
            contribution: "I collected annual data, built the Excel comparison and used the return, risk and scenario results to prepare a portfolio direction.",
            outcome: "After correcting the portfolio calculations, the comparison supports a low-volatility core, measured growth exposure and clear underweights.",
          },
        },
        "financial-feasibility": {
          summary: "In a four-person university project, we studied the feasibility of a proposed 10,000 m² retail mall in Melbourne’s CBD. The submission included a report and a 15-sheet model covering construction, revenue, debt and sensitivity.",
          meaning: "The useful part of the model was seeing which assumptions could change the decision, especially occupancy, rent, cost and schedule.",
          role: "Four-person group project. I contributed to model development, scenario analysis, risk synthesis and the final recommendation.",
          sections: [
            { title: "Connecting cost, income and finance in one model", body: "The workbook connects capital costs, an 18-month construction programme, tenant mix, occupancy growth, rent escalation, operating expenses and five-year debt. The team used both front-door and back-door checks to review feasibility." },
            { title: "Testing the assumptions most likely to change the result", body: "We tested occupancy, anchor rent, delays, construction overruns and competition. The report then connected these risks to a conditional recommendation and possible controls." },
          ],
          caseFacts: {
            contribution: "I contributed to the model, scenario analysis, risk review and final recommendation.",
            outcome: "The submitted report recommended proceeding only under stated conditions and identified occupancy, rent, cost and schedule as the main drivers.",
            homeContribution: "Group project · I worked on the model, scenarios and risk review",
          },
        },
        "pedalbalance-echo": {
          summary: "PedalBalance Echo is an individual research-through-making project. I used pressure sensing, complete-revolution comparison and ankle vibration to explore how cycling feedback might be returned to the body with lower risk than DIY EMS.",
          meaning: "The project focuses on two questions: what remains after guidance stops, and whether a clearly labelled trace from a rider’s past performance can help a later attempt.",
          role: "Individual research and prototype plan. I reviewed the literature, set the safety boundary, designed the system and interaction, built the interface prototype and planned the study.",
          sections: [
            { title: "Returning a small cue after a complete revolution", body: "The prototype compares the left and right contribution across a complete revolution. If a difference continues beyond the rider’s personal baseline, it returns a short vibration to the corresponding ankle. It does not try to control the movement." },
            { title: "Two proposed studies on withdrawal and past-self feedback", body: "C1 compares different ways of fading guidance and then tests performance without cues. E2 separates the identity of a past-self trace from whether it is shown on a screen or returned through vibration. In the current one-person prototype, any matched-other trace is clearly labelled as simulated." },
            { title: "Keeping the mechanism while avoiding DIY EMS", body: "The prototype uses pressure, Hall sensing, vibration and optional read-only surface EMG. No DIY stimulation, medical claim or road-cycling test was included. The current simulations explain the proposed procedure; they are not human-study results." },
          ],
          caseFacts: {
            contribution: "I reviewed the literature, set the safety boundary, designed the sensing and feedback system, built the interface prototype and wrote the proposed study plan.",
            outcome: "The project narrows a broad body-sharing topic into two proposed studies about fading guidance and past-self feedback.",
            homeContribution: "Individual project · I researched, designed and prototyped the proposed study",
          },
        },
      },
    },
    zh: {
      meta: {
        title: "麦博文 — 用户体验设计学生",
        description: "麦博文是墨尔本大学用户体验设计学生。这个作品集记录了我的课程项目、研究、原型和部分工作经历。",
      },
      site: {
        brandDiscipline: "学生设计作品集",
        heroTopline: "麦博文 — 用户体验设计学生",
        workDescription: "我从人工智能交互、游戏设计、财务建模和身体性研究中选出的四个项目。",
        capabilitiesTitle: "我练习过的能力",
        capabilitiesDescription: "这些经验来自课程项目、研究助理工作、实习和个人制作。",
        disciplinesLabel: "在项目中学习",
        disciplinesTitle: "我练习过的能力",
        aboutParagraphOne: "我是麦博文，目前在墨尔本大学学习用户体验设计。在课程项目中，我会先进行小规模研究，再制作交互原型，并根据测试和观察结果继续修改设计。",
        aboutParagraphTwo: "这里的项目包括对话式人工智能、游戏、财务建模、视觉设计和身体交互。我希望同时说明自己做了什么，以及在制作过程中学到了什么。",
        archiveDescription: "另外十个课程项目按主题整理在这里。它们不会占用主页的大篇幅，但仍可以完整查看。",
        contactTitle: "联系我",
        contactIntro: "谢谢你看到这里。如果你想了解某个项目，或希望交流学习、研究与实习机会，可以通过以下方式联系我。",
        resumeFocus: "用户体验设计 · 研究 · 数字产品 · 商业分析",
        resumeSummary: "我目前在墨尔本大学攻读设计学学士，主修用户体验设计。课程、实习和工作经历涉及用户研究、应用心理学、HCI、数字产品、商业与市场分析，也包括一线零售服务。我使用问卷、访谈、数据清洗和基础统计开展研究，并用 Excel、Figma、UiPath/RPA 及 AI 辅助工具整理和呈现结果。能够使用中英文工作，日语为基础水平；希望申请金融服务数字化转型、客户体验或业务分析方向的咨询实习。",
        experienceTitle: "经历",
        experienceOneBody: "我为计划在澳大利亚求职的中国候选人整理职业和雇主信息。工作按候选人需求、岗位、雇主和申请阶段展开，并使用 UiPath/RPA 与 Codex 辅助提取、清洗和批量整理。人工复核、来源检查、隐私控制和异常处理仍保留在流程中。",
        experienceTwoBody: "我在墨尔本大学参与课程满意度与 HCI 研究，协助确定研究问题、设计混合方法问卷、清洗回答、阅读开放式意见、制作图表，并参与报告、汇报和课程建议的整理。",
        experienceThreeBody: "在 TidyTeddy 的 UI/UX 实习中，我为网站改版研究用户、竞品、页面结构、导航和用户旅程。我整理了主要问题，并根据产品、设计和开发同事的反馈，制作信息架构、高保真界面和交互原型。",
        experienceFourBody: "在 PUMA 工作时，我会先了解顾客的预算、偏好和使用场景，再推荐产品。这段经历让我直接接触顾客的问题、购买判断与一线服务。我曾获得月度最佳销售顾问。",
        resumeProjectsTitle: "研究与项目经历",
        resumeProjectOneTitle: "澳大利亚就业市场研究",
        resumeProjectOneBody: "我按行业、地区、职业、雇主类型、技能和学历整理公开的岗位与雇主信息。在 Excel 中完成标准化、清洗、去重和来源检查，再据此分析市场细分、机会优先级、候选人画像和求职方向。",
        resumeProjectTwoTitle: "澳大利亚职业研究与人才匹配流程",
        resumeProjectTwoBody: "我把候选人需求、职业研究、雇主筛选、匹配建议和申请跟踪拆分成可追溯步骤。UiPath/RPA 与 Codex 用于浏览器操作、提取、清洗、验证和批量整理，同时保留人工复核、来源记录、隐私控制与异常处理。",
        resumeProjectThreeTitle: "学生课程满意度与 HCI 研究",
        resumeProjectThreeBody: "我协助设计关于课程内容、教学体验和学习支持的问卷，并结合量化题目与开放式问题。我清洗和汇总回答、制作图表，并参与报告初稿、内部汇报和课程改进建议。",
        resumeProjectFourTitle: "TidyTeddy 网站改版",
        resumeProjectFourBody: "我比较竞品网站，梳理现有旅程，并记录页面结构、导航和操作中可能让用户受阻的位置。之后制作信息架构和高保真原型，并根据团队反馈继续修改。",
        resumeProjectFiveTitle: "澳大利亚多资产投资研究",
        resumeProjectFiveBody: "在金融课程中，我整理了 2013 至 2024 年十类澳大利亚资产的年度数据，并用 Excel 比较平均回报、波动率、CAGR 和夏普比率。我也测试了利率压力情景，并提出以稳定地产和企业债为核心的分散方向。",
        resumeProjectSixTitle: "墨尔本 CBD 零售商场可行性研究",
        resumeProjectSixBody: "在四人小组中，我参与制作一份关于 10,000 平方米零售商场的 15 个工作表模型。模型连接了建造成本、18 个月工期、租户组合、出租率、租金、运营成本和五年期债务，并用 DCF、NPV/IRR 与敏感性分析检查主要风险。",
        resumeCapabilitiesTitle: "方法、工具与语言",
        resumeCapabilityOneTitle: "研究与分析",
        resumeCapabilityOneBody: "问卷设计、访谈、混合方法研究、应用心理学方法、数据收集与清洗、基础统计、市场与竞品研究、需求分析、流程梳理和风险检查。",
        resumeCapabilityTwoTitle: "工具与沟通",
        resumeCapabilityTwoBody: "Excel、PowerPoint、数据可视化与报告写作；UiPath/RPA、Codex、ChatGPT、DeepSeek 与 Figma；平面设计、信息层级、原型检查和团队沟通。",
        resumeCapabilityThreeTitle: "网页与交互设计",
        resumeCapabilityThreeBody: "信息架构、响应式布局、Figma 高保真原型，以及 HTML、CSS 和 JavaScript 的基础实践。",
        resumeCapabilityFourTitle: "商业与市场课程",
        resumeCapabilityFourBody: "比较分析、成本效益思考、投资价值、风险与财务可行性分析。",
      },
      categories: {
        "digital-interaction": { description: "我通过界面、对话流程和游戏规则，练习如何让反馈帮助用户做选择。" },
        "ux-research": { description: "我在课程与研究项目中规划小型研究、观察参与者，并把发现整理为下一轮设计依据。" },
        "visual-editorial": { description: "我通过材料实验和反复测试，练习书籍、字体、图像与色彩的组织。" },
        "spatial-material": { description: "我用模型、图纸和实体实验，把观察、光线与叙事转化为空间表达。" },
        strategy: { description: "我在金融与系统课程中使用数据、假设和情景说明一个判断及其限制。" },
        "embodied-systems": { description: "一项关于动作感知、反馈和提示撤除后学习效果的研究型制作。" },
      },
      capabilities: {
        groups: [
          {
            title: "用户研究与评估",
            statement: "我的研究经验主要来自课程项目和研究助理工作。我参与过研究计划、主持式测试、观察和结果整理，并把发现用于下一轮设计。",
            skills: ["研究计划", "主持式可用性测试", "任务计时与观察", "边说边做", "眼动结果解读", "发现整理"],
            evidence: "图书馆评估：14 名线上参与者、5 名主持式参与者、5 个任务和 8 条建议。",
          },
          {
            title: "交互设计与原型",
            statement: "我制作过界面流程、Voiceflow 对话和浏览器游戏。测试这些项目让我学习如何删减规则、说明系统状态，并把重要决定留给用户。",
            skills: ["用户与对话流程", "信息架构", "Figma 与 Voiceflow", "HTML / CSS / JavaScript", "游戏规则与反馈状态", "迭代测试"],
            evidence: "余震信号：个人制作的可玩浏览器游戏。Vita：有测试记录的小组 Voiceflow 原型。",
          },
          {
            title: "视觉与分析表达",
            statement: "视觉项目和金融项目使用的工具不同，但都需要仔细编辑。我会选择必要证据、让比较容易阅读，也会说明结果的限制。",
            skills: ["编辑层级与字体", "视觉系统与顺序", "演示表达", "比较分析", "情景与风险说明", "Figma、Adobe、Excel 与 Rhino"],
            evidence: "电影转译为书：完整的编辑顺序。投资策略：十类资产比较，并把修正数据与原提交文件分开说明。",
          },
        ],
      },
      projects: {
        vita: {
          summary: "Vita 是一项大学小组课程项目。我们从 2038 年的未来情景出发，讨论 AI 能否在不替学生做决定的情况下，帮助大学一、二年级学生梳理价值观并比较不同职业方向。最后，我们制作了一款用于职业反思的聊天机器人原型。",
          meaning: "我们最关心的是：AI 可以怎样帮助学生反思，同时把最终决定留给学生本人。",
          role: "小组项目。我参与 Voiceflow 结构、路由逻辑、技术实现和原型检查，也参与了研究、测试与讨论。",
          sections: [
            { title: "2038 年情景如何发展为 Vita", body: "我们先讨论了一个技术让生活更方便、但社会联系变少的 2038 年情景。通过趋势和未来物件练习，问题逐渐缩小为：技术能否帮助人思考，而不是替人选择？" },
            { title: "制作并测试对话流程", body: "Vita 引导大学一、二年级学生梳理价值观、能量来源、工作方式和可能的职业方向。测试中出现了路由不稳定、系统状态不清楚和用户过快接受答案的问题，因此我们补充了边界、可修改内容和人工介入点。" },
            { title: "把 AI 的限制写进界面", body: "我们把可靠性、文化偏差和身份影响作为具体的交互问题处理。原型会显示不确定性，并邀请学生检查或修改建议，而不是把建议当作最终答案。" },
          ],
        },
        "library-evaluation": {
          summary: "在这项五人课程项目中，我们用五秒测试、主持式测试和眼动追踪评估墨尔本大学图书馆网站。我们希望找出学生在哪些任务中受阻，并让每条建议都对应一次可观察的行为。",
          meaning: "这项练习让我更重视建议与观察之间的关系，也提醒我不要把小样本结果说成普遍结论。",
          role: "五人小组项目。我参与研究计划、主持式评估、观察、分析和最终报告。",
          sections: [
            { title: "从第一印象到五个真实任务", body: "14 名学生完成线上五秒测试，另有 5 名学生参加主持式测试。我们记录他们在空间预订、引用、数据库、历年试题和期刊任务中的完成情况、时间、难度、口述、观察和注视行为。" },
            { title: "空间预订是最明显的困难", body: "5 名主持式参与者都在空间预订中遇到困难，其中 1 人在 8 分钟内没有完成。数据库搜索、历年试题和下载操作也出现确认不足或控件不明显的问题。" },
            { title: "把八条建议对应回观察", body: "报告提出了引导式预订、更清楚的资格错误、直接标签、匹配反馈和明显的“选择空间”按钮。每条建议保留原报告编号，方便回到原始发现核对。" },
          ],
        },
        "signal-aftershock": {
          summary: "《余震信号》是我个人制作的一款 2 至 3 人浏览器游戏。玩家在骰子限制下画出中继线路、围合三角区域，并尝试在地震后重新连接城市。",
          meaning: "试玩让我发现，骰子最有用的时候不是替玩家决定，而是限制玩家可以做出的选择。",
          role: "个人项目。我设计了规则、主题、界面和浏览器版本，并通过小规模试玩继续修改。",
          sections: [
            { title: "让骰子限制一条线", body: "游戏来自早期的 Triangle Territory 练习。骰子不再移动棋子，而是限制玩家能画出的线路，因此随机性仍然存在，但空间判断仍由玩家完成。" },
            { title: "让抽象规则对应地震故事", body: "玩家铺设中继线路、围合覆盖区域并重连重要地点。面积、设施加成和闭合方式，让几何规则在紧急通信故事中有了具体作用。" },
            { title: "试玩后删掉的内容", body: "我删去了卡牌、角色和攻击，因为它们会分散对画线和骰子的注意。我也调整了骰子序列、占领动画和大三角识别，让游戏更容易阅读和学习。" },
          ],
        },
        "film-to-book": {
          summary: "在这个个人编辑设计项目中，我用电影静帧、音乐节奏、透明材料和折页制作了一本手工书。",
          meaning: "我希望读者通过翻阅感到节奏，而不是看到电影画面的逐帧复制。",
          role: "个人项目。我完成视觉研究、材料测试、构图和书籍制作。",
          sections: [
            { title: "把电影素材重新组织为页面", body: "我把静帧、动作、乐谱和文字当作视觉节奏的组成部分。重复和透明层让页面彼此关联，同时避免逐帧复述电影。" },
            { title: "用纸张与折页测试节奏", body: "折页、半透明纸和不均匀笔触让节奏变得可以触摸。安静页面之后出现更密集的叠加，阅读速度也随翻页方式改变。" },
          ],
        },
        "colour-systems": {
          summary: "这两册工作室作品记录了我在节气日历、书籍、Sony 视觉应用和空间 AR 研究中的色彩实验。",
          meaning: "我比较了同一种色彩在材料、文化参照、产品和光线改变之后会产生什么不同。",
          role: "个人工作室项目。我完成色彩研究、图像制作、视觉系统测试和效果图。",
          sections: [
            { title: "在不同语境中测试色彩", body: "这些练习涉及知觉、中国节气语言、材质、产品沟通和环境光。我没有把色彩当作固定色块，而是比较它周围条件改变之后的效果。" },
            { title: "把研究用于日历与产品", body: "日历为每个月安排不同的材料感和情绪。之后我把一组较柔和的颜色变化用于 Sony 应用，观察产品在不同环境中的感觉。" },
          ],
        },
        "light-performance": {
          summary: "我制作了一个小型模型箱，并用六组摄影实验比较角度、距离、色温和材料怎样改变封闭空间的气氛。",
          meaning: "这些实验帮助我比较光在导向、透射、折射、反射和漫射时的不同表现。",
          role: "个人研究。我规划实验、布置模型箱、设置灯光、拍摄并比较各组结果。",
          sections: [
            { title: "改变角度、颜色和距离", body: "前两组测试分别控制光的方向、色温和光源距离。红蓝光场形成明显对比，低位白光则显示较集中的光源如何改变深度和注意力。" },
            { title: "比较材料如何改变光", body: "透明包装、有色水、金属箔和密集纤维分别产生不同结果。我通过照片比较透射、折射、反射、吸收和漫射。" },
          ],
        },
        pyrrha: {
          summary: "在这个个人空间设计项目中，我把卡尔维诺的《皮拉城》理解为一个循环场域，其中同时存在想象中的城市和故事中真正遇见的城市。",
          meaning: "模型帮助我表达：同一个名字可以同时承载预期和与预期冲突的亲身经验。",
          role: "个人项目。我分析文本、设计记谱方式，并完成数字模型和叙事视图。",
          sections: [
            { title: "从名字与地点之间的落差开始", body: "我把文本理解为预期与识别之间的冲突。不同城市片段位于同一个循环结构中，因此想象和观察到的城市彼此分开，又共享一条路径。" },
            { title: "用不同尺度展示同一个模型", body: "我拆分城墙、住宅和动线，再沿循环场重新组织。记谱、轴测图和框景从不同细节层级解释同一个模型。" },
          ],
        },
        "booking-systems": {
          summary: "在这项个人桌面研究中，我梳理了 Booking.com 的利益相关者、决策负担和说服性设计，并整理了一个更具包容性的改版方向。",
          meaning: "这项练习让我不只看预订页面，也考虑谁获得便利、谁承担成本，以及旅客需要什么信息才能判断。",
          role: "个人项目。我完成界面观察、系统图、文献阅读和批判性分析。",
          sections: [
            { title: "梳理预订界面周围的人", body: "我把旅客、住宿方、酒店员工、支付服务、社区和监管者放进同一张图中。这样更容易看到：一个人的便利可能会给另一个人增加工作或成本。" },
            { title: "让用户更清楚地做决定", body: "改版方向连接了无障碍、信息透明和本地影响，并建议让受影响的用户与社区参与设计，而不是只用更快的转化率衡量结果。" },
          ],
        },
        "melbourne-motion": {
          summary: "这个个人平面设计项目从一段墨尔本路线开始。我记录移动轨迹，并把它发展为字形、地图、符号和分层构图。",
          meaning: "我用字体和地图记录城市中的移动顺序与记忆片段。",
          role: "个人项目。我记录路线、测试字形并完成最终构图。",
          sections: [
            { title: "把一段路线变成字形", body: "我描摹、压缩和重新排列一段城市旅程。最终线条保留了一些不规则移动，同时成为可以辨认的字形。" },
            { title: "用收集的片段组织构图", body: "地图、路牌、市场字体、纹理和尺度变化构成主要素材。项目从一条轮廓发展为叠加多种墨尔本印象的海报。" },
          ],
        },
        "words-unleashed": {
          summary: "这个两部分视觉传达项目包括生成式 AR 环境和一本安静的诗歌出版物。我用它比较文字在空间中和印刷页面上的不同表现。",
          meaning: "AR 作品让文字散布在观看者周围，出版物则用留白和顺序让阅读变慢。",
          role: "个人项目，并包含共同设计意见。我完成概念、生成测试、编辑系统和效果图。",
          sections: [
            { title: "把文字放进 AR 环境", body: "AR 实验使用植物色彩和粒子状形态。我没有把文字排成单一行，而是把它分布在观看者可以移动穿行的场域中。" },
            { title: "在印刷中放慢同一组文字", body: "出版物使用短诗、宽间距、小型图形线索和柔和季节色。实体样书帮助我检查印刷装订后节奏是否仍然清楚。" },
          ],
        },
        "trace-exaggeration": {
          summary: "在两次作业中，我先描摹一张植物照片、选出主要轮廓，再把这些片段发展为 Rhino 三维模型。",
          meaning: "这个过程记录了原图怎样在删减、选择和夸张之后逐步改变。",
          role: "个人项目。我完成观察描摹、抽象、空间转译和 Rhino 建模。",
          sections: [
            { title: "从照片中找出较少的线", body: "我把植物近景照片简化为轮廓、重叠和方向路径。描摹得到的一小组形式成为下一次作业的基础。" },
            { title: "在 Rhino 中延伸这些片段", body: "我在 Rhino 中延伸、压缩和重复选出的形态。透视图和侧视图显示模型怎样从密集交叉变成长距离投影。" },
          ],
        },
        "investment-strategy": {
          summary: "在个人金融课程项目中，我用回报、波动率、CAGR 和夏普比率比较 2013 至 2024 年的十类澳大利亚资产，并据此整理 2025 年投资方向。",
          meaning: "这项比较让我学习把亮眼的增长数字和考虑风险后的表现分开阅读。",
          role: "个人项目。我收集数据、制作 Excel 比较、测试利率情景并提出组合方向。",
          sections: [
            { title: "把增长与波动放在一起比较", body: "工业仓储与物流资产的长期增长较高，但波动也较大。住宅地产、商业办公和企业债在风险调整后更稳定。" },
            { title: "从比较结果整理组合方向", body: "我的方向以较稳定的地产和企业债为核心，并保留较小比例的高增长工业资产。我也测试了货币条件收紧时可能出现的变化。" },
          ],
        },
        "financial-feasibility": {
          summary: "在四人课程小组中，我们研究了墨尔本 CBD 一座 10,000 平方米零售商场的可行性。提交内容包括报告和一份涵盖建造、收入、债务与敏感性的 15 个工作表模型。",
          meaning: "这个模型最有帮助的地方，是让我们看到出租率、租金、成本和工期等假设怎样改变最终判断。",
          role: "四人小组项目。我参与模型制作、情景分析、风险整理和最终建议。",
          sections: [
            { title: "在一个模型中连接成本、收入与融资", body: "模型连接了资本成本、18 个月工期、租户组合、出租率增长、租金变化、运营费用和五年期债务。团队使用正向和反向检查来复核可行性。" },
            { title: "测试最可能改变结果的假设", body: "我们测试了出租率、主力租户租金、延误、建造成本超支和竞争。报告再把这些风险连接到有条件的建议和可能的控制措施。" },
          ],
        },
        "pedalbalance-echo": {
          summary: "PedalBalance Echo 是一项个人研究型制作。我用压力感知、完整踏圈比较和脚踝振动，探索能否用比 DIY EMS 风险更低的方式把骑行反馈还给身体。",
          meaning: "项目集中在两个问题：提示停止后还留下什么，以及明确标注的过去自我轨迹能否帮助下一次尝试。",
          role: "个人研究与原型计划。我阅读文献、设定安全边界、设计系统与交互、制作界面原型，并规划研究流程。",
          sections: [
            { title: "完成一圈之后再返回小幅提示", body: "原型比较完整一圈中左右两侧的贡献。如果差异持续超过骑行者自己的基线，系统会向对应脚踝返回一次短振动，但不会控制动作。" },
            { title: "两项关于提示撤除与过去自我的拟议研究", body: "C1 比较不同的提示渐退方式，并在无提示条件下测试表现。E2 把过去自我轨迹的身份和显示方式分开比较。在当前单人原型中，任何匹配他人的轨迹都会明确标为模拟。" },
            { title: "保留研究机制，同时避免 DIY EMS", body: "原型使用压力、霍尔传感、振动和可选的只读表面肌电，不包含 DIY 电刺激、医疗结论或道路骑行测试。当前模拟用于解释拟议流程，并不是人体研究结果。" },
          ],
        },
      },
    },
    ja: {
      meta: {
        title: "Bowen Mai — UXデザインを学ぶ学生",
        description: "メルボルン大学でUXデザインを学ぶBowen Maiのポートフォリオです。授業制作、調査、プロトタイプ、実務経験の一部をまとめています。",
      },
      site: {
        brandDiscipline: "学生デザインポートフォリオ",
        heroTopline: "Bowen Mai — UXデザインを学ぶ学生",
        workDescription: "AIインタラクション、ゲームデザイン、財務モデリング、身体的リサーチから選んだ4件です。",
        capabilitiesTitle: "プロジェクトで学んだこと",
        capabilitiesDescription: "授業、リサーチアシスタント、インターン、個人制作を通じて経験した内容です。",
        disciplinesLabel: "プロジェクトを通じた学び",
        disciplinesTitle: "プロジェクトで学んだこと",
        aboutParagraphOne: "Bowen Maiです。メルボルン大学でUXデザインを学んでいます。授業では、小規模な調査を計画したり、インタラクションを試作したりしています。観察したことをもとに、デザインを見直してきました。",
        aboutParagraphTwo: "ここには会話AI、ゲーム、財務モデリング、ビジュアルデザイン、身体的インタラクションの制作を掲載しています。完成物だけでなく、制作中に考え直した点も示しています。",
        archiveDescription: "そのほかの授業制作10件は、分野ごとにまとめています。トップページでは小さく扱いますが、各ケースは引き続き閲覧できます。",
        contactTitle: "連絡先",
        contactIntro: "ここまでご覧いただき、ありがとうございます。プロジェクトについての質問や、学習・研究・実習に関するご連絡は、以下の連絡先からお願いします。",
        resumeFocus: "UXデザイン · リサーチ · デジタルプロダクト · ビジネス分析",
        resumeSummary: "メルボルン大学のデザイン学士課程でUXデザインを専攻しています。これまで、授業や実習でユーザー調査、応用心理学、HCI、デジタルプロダクト、ビジネス・市場分析に取り組みました。PUMAでは販売も経験しました。研究では、質問紙、インタビュー、データ整理、基礎統計を使います。制作と分析にはExcel、Figma、UiPath/RPA、AI支援ツールも使用しています。中国語と英語で仕事ができ、日本語は基礎レベルです。今後は、金融サービスのデジタル化、顧客体験、ビジネス分析に関わるコンサルティング実習を希望しています。",
        experienceTitle: "経験",
        experienceOneBody: "オーストラリアで就職活動を行う中国人候補者向けに、職業と企業の公開情報を調査しました。候補者の希望、職種、企業、応募段階ごとに整理し、UiPath/RPAとCodexを抽出、クリーニング、バッチ処理の補助に使いました。人による確認、出典、個人情報への配慮、例外処理は工程に残しています。",
        experienceTwoBody: "メルボルン大学で、授業満足度とHCIに関する調査を支援しました。調査課題の整理、混合手法の質問紙、回答のクリーニング、自由記述の確認、図表作成、報告書、発表、授業改善案の作成に参加しました。",
        experienceThreeBody: "TidyTeddyのUI/UXインターンでは、ウェブサイト改修のために利用者、競合、ページ構成、ナビゲーション、利用の流れを確認しました。主なつまずきを整理し、プロダクト、デザイン、開発メンバーの意見を受けながら、情報設計、高精細画面、操作プロトタイプを制作しました。",
        experienceFourBody: "PUMAでは、予算、好み、用途を確認してから商品を提案しました。利用者の質問や購入判断に直接接する経験になり、月間トップセールスアドバイザーにも選ばれました。",
        resumeProjectsTitle: "主な調査とプロジェクト",
        resumeProjectOneBody: "業界、地域、職種、企業種別、スキル、学歴ごとに公開求人と企業情報を整理しました。Excelで標準化、クリーニング、重複確認、出典確認を行い、市場区分、機会の優先度、候補者像、就職活動の方向を検討しました。",
        resumeProjectTwoBody: "候補者の希望、職業調査、企業選定、マッチング案、応募管理を追跡できる工程に分けました。UiPath/RPAとCodexはブラウザ操作、抽出、クリーニング、確認、バッチ整理を補助し、人による確認、出典、個人情報保護、例外処理も記録しました。",
        resumeProjectThreeBody: "授業内容、教育体験、学習支援に関する質問紙の設計を支援しました。量的な設問と自由記述を組み合わせ、回答のクリーニングと要約、図表作成、報告書初稿、内部発表、改善案に参加しました。",
        resumeProjectFourBody: "競合サイトを比較し、現在の利用の流れを整理して、ページ構成、ナビゲーション、操作で迷いやすい箇所を記録しました。その後、情報設計と高精細プロトタイプを制作し、チームの意見を受けて修正しました。",
        resumeProjectFiveBody: "金融の授業で、2013年から2024年までのオーストラリアの10資産について年次データを揃え、Excelで平均リターン、ボラティリティ、CAGR、シャープレシオを比較しました。金利上昇のシナリオも確認し、安定した不動産と社債を中心とする分散方針を検討しました。",
        resumeProjectSixBody: "4人グループで、延べ10,000㎡の小売施設を対象とする15シートのモデル制作に参加しました。建設費、18か月の工程、テナント構成、稼働率、賃料、運営費、5年債務をつなぎ、DCF、NPV/IRR、感度分析で主なリスクを確認しました。",
      },
      categories: {
        "digital-interaction": { description: "画面、会話の流れ、ゲームのルールを通じて、フィードバックが選択をどう支えるかを学びました。" },
        "ux-research": { description: "授業と調査で小規模な研究を計画し、参加者を観察して、次の制作に使える形へ整理しました。" },
        "visual-editorial": { description: "素材の試作と見直しを重ね、書籍、文字、画像、色の組み方を学びました。" },
        "spatial-material": { description: "模型、図面、実物実験を使い、観察、光、物語を空間表現へ移しました。" },
        strategy: { description: "金融とシステムの授業で、データ、仮定、シナリオを使い、判断と限界を説明しました。" },
        "embodied-systems": { description: "動きの計測、フィードバック、案内を止めた後の学習を扱うリサーチ・スルー・メイキングです。" },
      },
      capabilities: {
        groups: [
          {
            title: "UXリサーチと評価",
            statement: "現在のリサーチ経験は、主に授業のプロジェクトとリサーチアシスタントの仕事で得たものです。調査計画、モデレーテッドテスト、観察、結果の整理に参加してきました。",
            skills: ["調査計画", "モデレーテッドテスト", "タスク時間と観察", "発話思考法", "視線情報の解釈", "結果の整理"],
            evidence: "図書館評価：オンライン14人、対面5人、5タスク、8件の改善案。",
          },
          {
            title: "インタラクションデザインと試作",
            statement: "画面遷移、Voiceflowの会話、ブラウザゲームを制作しました。テストを通じて、ルールを減らし、状態を見えるようにし、大切な判断を利用者に残すことを学びました。",
            skills: ["ユーザーと会話の流れ", "情報設計", "FigmaとVoiceflow", "HTML / CSS / JavaScript", "ゲームルールと状態表示", "反復テスト"],
            evidence: "Signal Aftershock：個人制作のブラウザゲーム。Vita：テスト記録を残したグループ制作のVoiceflow試作。",
          },
          {
            title: "視覚表現と分析の伝え方",
            statement: "ビジュアル制作と金融分析では道具が異なりますが、どちらも編集が必要でした。必要な根拠を選び、比較を読みやすくし、結果の限界も書くようにしています。",
            skills: ["編集階層と文字", "視覚システムと順序", "プレゼンテーション", "比較分析", "シナリオとリスクの説明", "Figma、Adobe、Excel、Rhino"],
            evidence: "Film to Book：完成した編集シークエンス。Investment Strategy：修正値と提出時の表を分けて示した10資産比較。",
          },
        ],
      },
      projects: {
        vita: {
          summary: "Vitaは、2038年の未来シナリオから始めた大学のグループ制作です。AIが進路を決めるのではなく、大学1、2年生が自分の価値観を整理し、いくつかの方向を比べる手助けができるかを考えました。最終的に、キャリアについて振り返るためのチャットボットを試作しました。",
          meaning: "AIが内省を助けながら、最後の判断を学生本人に残す方法を考えました。",
          role: "グループ制作です。Voiceflowの構成、経路、技術実装、試作の確認を支援し、調査、テスト、検討にも参加しました。",
        },
        "library-evaluation": {
          summary: "5人の授業グループで、5秒テスト、モデレーテッドテスト、視線計測を使い、メルボルン大学図書館サイトを評価しました。学生がどこで迷うかを確認し、各提案を観察したタスクへ結び付けました。",
          meaning: "提案を実際の観察から離さず、小規模な学生サンプルの限界も明記しました。",
          role: "5人のグループ制作です。調査計画、モデレーテッド評価、観察、分析、報告書に参加しました。",
        },
        "signal-aftershock": {
          summary: "Signal Aftershockは、2〜3人で遊ぶ個人制作のブラウザゲームです。サイコロの制約の中で中継線を引き、三角形の範囲を獲得し、地震後の都市を再接続します。",
          meaning: "プレイテストから、サイコロは選択を代行するより、選べる条件を制限するときに役立つと学びました。",
          role: "個人制作です。ルール、テーマ、画面、ブラウザ版を設計し、小規模なプレイテストで修正しました。",
        },
        "film-to-book": {
          summary: "映画の静止画、音楽のリズム、透明素材、折り頁から手製本を制作した個人の編集デザインです。",
          meaning: "映画を一コマずつ写すのではなく、本を扱う動作からリズムを感じられるようにしました。",
          role: "個人制作です。ビジュアル調査、素材テスト、構成、製本を行いました。",
        },
        "colour-systems": {
          summary: "季節のカレンダー、書物、Sonyの応用、空間ARを通じて行った色彩実験を、二冊のスタジオフォリオにまとめました。",
          meaning: "素材、文化的な参照、製品、光の条件が変わると、同じ色がどう変わって見えるかを比べました。",
          role: "個人のスタジオ制作です。色彩調査、画像制作、視覚システムの試作、モックアップを行いました。",
        },
        "light-performance": {
          summary: "小さな模型箱を使い、角度、距離、色温度、素材が閉じた空間の雰囲気をどう変えるか、6つの写真実験で比べました。",
          meaning: "方向、透過、屈折、反射、拡散による光の違いを確認するための実験です。",
          role: "個人制作です。実験計画、模型の準備、照明、撮影、比較を行いました。",
        },
        pyrrha: {
          summary: "カルヴィーノの『ピュラ』を、想像した都市と物語の中で出会う都市が同居するループ状の場として読み直した空間制作です。",
          meaning: "一つの名前に、期待と、それに反する経験が重なる様子を模型で示しました。",
          role: "個人制作です。文章の分析、表記方法、デジタル模型、物語を示すビューを制作しました。",
        },
        "booking-systems": {
          summary: "Booking.comの関係者、意思決定の負担、説得的な表現を整理し、より包摂的な改修方向を考えた個人のデスクリサーチです。",
          meaning: "予約画面だけでなく、誰が便利になり、誰が負担し、旅行者にどの情報が必要かを考えました。",
          role: "個人制作です。画面観察、システムマップ、文献確認、批判的分析を行いました。",
        },
        "melbourne-motion": {
          summary: "メルボルンを通る一つの経路を記録し、文字、地図、記号、重なりのある構成へ展開した個人のグラフィックデザインです。",
          meaning: "文字と地図を使い、都市での移動と記憶の断片を記録しました。",
          role: "個人制作です。経路の記録、文字の試作、最終構成を行いました。",
        },
        "words-unleashed": {
          summary: "生成的なAR環境と静かな詩の冊子を組み合わせ、言葉が空間と紙面でどう変わるかを比べた二部構成の制作です。",
          meaning: "ARでは言葉を周囲へ広げ、冊子では余白と順序によって読む速度を落としました。",
          role: "共同デザインの意見を含む個人制作です。コンセプト、生成テスト、編集システム、モックアップを制作しました。",
        },
        "trace-exaggeration": {
          summary: "植物写真をトレースし、主な輪郭を選び、その断片をRhinoの三次元模型へ展開した二つの課題です。",
          meaning: "元の写真が、削減、選択、誇張を通じて変化する過程を記録しました。",
          role: "個人制作です。観察トレース、抽象化、空間への変換、Rhinoモデリングを行いました。",
        },
        "investment-strategy": {
          summary: "金融の個人課題で、2013年から2024年のオーストラリアの10資産を、リターン、ボラティリティ、CAGR、シャープレシオで比較し、2025年の投資方針を検討しました。",
          meaning: "大きな成長率と、リスクを考慮した後の成績を分けて読む練習になりました。",
          role: "個人制作です。データ収集、Excel比較、金利シナリオ、ポートフォリオ案を担当しました。",
          investmentStudy: {
            reflection: {
              body: "不動産、REIT、債券、株式、コモディティでは、価格変動、賃料・配当、再投資の扱いが異なります。入力を標準化すると比較しやすくなり、商業オフィスはコロナ後の印象に比べて、リスク調整後の成績が良いことも分かりました。",
            },
          },
        },
        "financial-feasibility": {
          summary: "4人の授業グループで、メルボルンCBDに計画された延べ10,000㎡の小売施設の事業性を検討しました。提出物は報告書と、建設、収益、債務、感度を扱う15シートのモデルです。",
          meaning: "稼働率、賃料、費用、工程の仮定が判断をどう変えるかを、モデルで確認できました。",
          role: "4人のグループ制作です。モデル、シナリオ分析、リスク整理、最終提案に参加しました。",
        },
        "pedalbalance-echo": {
          summary: "PedalBalance Echoは個人のリサーチ・スルー・メイキングです。圧力計測、1回転単位の比較、足首への振動を使い、DIY EMSより危険の少ない方法で自転車のフィードバックを身体へ戻せるかを考えました。",
          meaning: "案内を止めた後に何が残るか、明確に表示した過去の自分の軌跡が次の試行を助けるか、という二つの問いを扱います。",
          role: "個人の調査と試作計画です。文献確認、安全範囲、システムとインタラクション、画面試作、研究手順を作成しました。",
        },
      },
    },
  };

  function mergeInto(target, source) {
    if (!target || !source || typeof source !== "object") return target;
    if (Array.isArray(source)) {
      source.forEach((value, index) => {
        if (value && typeof value === "object") {
          if (!target[index] || typeof target[index] !== "object") target[index] = Array.isArray(value) ? [] : {};
          mergeInto(target[index], value);
        } else {
          target[index] = value;
        }
      });
      return target;
    }
    Object.entries(source).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        if (!target[key] || typeof target[key] !== "object") target[key] = Array.isArray(value) ? [] : {};
        mergeInto(target[key], value);
      } else {
        target[key] = value;
      }
    });
    return target;
  }

  const projectsById = new Map((global.PORTFOLIO_PROJECTS || []).map((project) => [project.id, project]));
  Object.entries(copy.en.projects).forEach(([id, override]) => mergeInto(projectsById.get(id), override));

  const categoriesById = new Map((global.PORTFOLIO_CATEGORIES || []).map((category) => [category.id, category]));
  Object.entries(copy.en.categories).forEach(([id, override]) => mergeInto(categoriesById.get(id), override));
  mergeInto(global.PORTFOLIO_CAPABILITIES, copy.en.capabilities);

  if (global.PORTFOLIO_I18N) {
    Object.entries(copy).forEach(([language, languageCopy]) => {
      const translation = global.PORTFOLIO_I18N[language];
      if (!translation) return;
      mergeInto(translation.meta, languageCopy.meta);
      mergeInto(translation.site, languageCopy.site);
      mergeInto(translation.categories, languageCopy.categories);
      mergeInto(translation.projects, languageCopy.projects);
      mergeInto(translation.capabilities, languageCopy.capabilities);
    });
  }

  global.PORTFOLIO_STUDENT_COPY = copy;
})(window);
