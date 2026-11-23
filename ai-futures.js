// INFO30005 course case. Page references use the PDF viewer's page numbers.
(() => {
  const id = "ai-futures";
  const art = "assets/projects/ai-futures/";
  const documents = [
    "files/booking-com-critical-review.pdf",
    "files/aip-future-scenario.pdf",
    "files/aip-conceptual-design.pdf",
  ];
  const en = {
    title: "AI and the futures we choose",
    kicker: "Speculative design · INFO30005",
    meaning: "A watch can suggest a target. A writing assistant can suggest a conclusion. In both cases I want to know whose judgment I’m looking at.",
    summary: "I began by looking at which rooms Booking.com placed in front of me. My group then imagined four futures in which people hand different decisions to technology. Rereading our AI-use statements, I found a version of the same question in our own work. When a reader sees a finished argument or poster, how can they tell who gathered the material, who shaped it and who stood by the result?",
    role: "Individual platform review and two shared design submissions.",
    methods: ["Platform critique", "Forecasting", "Futures cone", "Storyboarding"],
    caseFacts: {
      context: "Advanced Interface Prototyping · INFO30005 · University of Melbourne",
      ownership: "I wrote A1. Rumaysa Fatima, Jessica Zou, Kaylee Li and I submitted A2.G1 and A2.G2 together.",
      contribution: "I mapped how a booking interface shapes choices. The forecasts, public-space scenario and service concepts are our group work.",
      evidence: "Three course submissions and their AI-use statements, four illustrated futures and a proposed reader study on how people interpret AI participation.",
      outcome: "Across four imagined futures, we asked which choices people would keep. Our no-scroll carriage gave passengers the option to put their feeds aside and play a game together.",
      limitation: "The future scenarios and their social effects remain speculative.",
    },
    coverAlt: "The group’s imagined Friction Zone park sign and welcome poster",
    coverCaption: "Signs for an imagined neighbourhood in Victoria, 2038 · A2.G1, pp. 24–25",
    files: ["A1 · Booking.com critical review", "A2.G1 · Your Future Reimagined", "A2.G2 · Conceptual Design"],
    study: {
      platform: { label: "A1 · Individual review", title: "Who puts this room first?", body: "When I compared rooms on Booking.com, the order of the results and the urgency messages already directed my attention. On page 12 I asked what might happen if AI personalised the ranking and the prices a traveller could see. Two people could start the same search and have different grounds for a decision. What would each need to know about how their list was made?", caption: "My review set AI personalisation alongside transparency, sustainability and dependence on the platform.", cite: "A1, pp. 5–7, 12–13" },
      forecasts: {
        label: "A2.G1 · Four future archetypes",
        title: "Who decides in each future?",
        body: "In each future our group imagined, I looked at one everyday choice.",
        aiLabel: "AI’s role",
        humanLabel: "Your choice",
        pageLabel: "A2.G1 · p. {n}",
        items: [
          { key: "optimised-self", title: "The Optimised Self",
            ai: "A watch could use your activity data to set tomorrow’s step target.", human: "Follow the target or rest. The watch counts steps. You know how tired you feel.",
            alt: "A wristband projects a step target and a calorie warning." },
          { key: "belonging-economy", title: "The Belonging Economy",
            ai: "A platform could rank paid clubs first, shaping which invitations you see.", human: "Join a club, pass on the invitation, or find company outside the platform.",
            alt: "A phone user is surrounded by subscription offers, even for the park." },
          { key: "friction-movement", title: "The Friction Movement",
            ai: "A home assistant offers a mode for focus, rest or company, then waits.", human: "You set the day’s priorities before asking for help. This is the future our group chose to develop.",
            alt: "Two people share a book on a bench with their phone set aside." },
          { key: "identity-fracture", title: "The Identity Fracture",
            ai: "An AI identity check could decide whether a platform accepts your profile as genuine.", human: "Choose what to share with friends or colleagues, even if keeping those identities separate gets harder.",
            alt: "A person steps through a phone and emerges as a different-looking avatar." },
        ],
      },
      cone: { label: "A2.G1 · Futures cone", title: "How much authority would AI have?", body: "On a separate diagram we varied a single condition: how much of everyday life people could hand over to automation. These were positions we could argue about in the studio.", cite: "A2.G1, p. 20",
        items: [
          ["Probable", "Convenience becomes routine. With fewer chances to work through problems themselves, people begin to question what they can still do unaided."],
          ["Plausible", "Algorithms set the benchmarks for a good life. People learn to perform well against those measures."],
          ["Possible", "A preference for pauses spreads to schools and workplaces. Interfaces leave time to think before prompting the next action."],
          ["Preferable", "Publicly funded Friction Zones give residents places to make things, spend time outdoors and leave predictive systems at the boundary."],
          ["Wildcard", "The government bans predictive algorithms and AI assistants. Even people who want assistance have to carry out tasks manually."],
        ] },
      zone: { label: "Victoria · 2038", title: "Crossing into a Friction Zone", body: "Our fictional resident sets their own priorities at 7 am. Later, on entering a Friction Zone, their device turns off predictions and nonessential alerts. A local noticeboard still helps neighbours borrow tools. We proposed keeping activity on local hardware so a conversation or a repair session could stay outside AI training data.", cite: "A2.G1, pp. 7–9, 12–13" },
      concepts: { label: "A2.G2 · Group concepts for 2036", title: "A seat on the train, a book, or a festival?", body: "For the next assignment we compared three ways to make an offline encounter easier to join. Each gave technology a different job.", cite: "A2.G2, pp. 2–3, 6, 10, 14–16", caption: "Our storyboard follows a passenger through the proposed no-scroll carriage.",
        items: [
          ["No-Scroll Carriage", "A passenger chooses the carriage. Social media pauses and a smart table suggests a board game. We favoured this proposal because people already share the journey. A rider who wants quiet still needs an ordinary carriage."],
          ["Knowledge Exchange", "A mobile robotic library brings books, audio and multilingual reading to suburban streets. Recommendations are optional. Borrowing a book is easy, though it may be the only interaction that happens."],
          ["Festival Portals", "An augmented-reality layer lets people explore a festival’s cultural setting together. Here the design question was who gets to tell that story, especially if a festival becomes a commercial attraction."],
        ] },
      participation: {
        label: "Looking back at our process",
        title: "Where did the AI suggestion end up?",
        body: "In the four futures above, a small intervention can change what a person considers next. I went back to our own design notes with that in mind. Some suggestions shaped what we discussed in class. Others fell apart as soon as we tried them. Here are four places where I can trace the difference.",
        items: [
          [
            "Who framed the question?",
            "Our group came up with questions about how people might spend time together. ChatGPT grouped similar questions. A cluster made overlaps easier to spot, but its heading could also make two different needs sound alike. We had to choose the wording we wanted to carry into the designs."
          ],
          [
            "What did a rejected suggestion contribute?",
            "When we needed a template for an iceberg diagram, Gemini suggested looking on Miro. We looked and found little we could use. We chose a background from Freepik instead. The tool influenced where we spent time looking, even though its suggestion never appeared on the slide."
          ],
          [
            "Can an image matter without being published?",
            "We took AI-generated poster references to a tutorial. They gave us something specific to ask for feedback on before developing our own Friction Zone poster. In the next assignment, generated images also helped us explore a Connection Table. We dropped that concept. These were two different endings for the same kind of assistance."
          ],
          [
            "Who checked the result?",
            "ChatGPT helped format references for the futures assignment. When we checked them against the university’s referencing guide, we corrected dates and capitalisation. A tidy entry on the final slide hides both a useful shortcut and the work of checking it."
          ]
        ],
        citations: [
          {
            sourceIndex: 1,
            page: 14,
            label: "Futures submission · AI declaration, p. 14"
          },
          {
            sourceIndex: 2,
            page: 18,
            label: "Concept design · AI declaration, p. 18"
          }
        ]
      },
      statements: {
        label: "AI-use statements · A closer reading",
        title: "What can you tell from “I used AI”?",
        body: "These are portfolio paraphrases of two submitted AI declarations. Each pair describes the same work twice, first in a single line and then with the division of labour made explicit. You can compare both versions with the original.",
        shortLabel: "A short disclosure",
        detailLabel: "With the work described",
        examples: [
          {
            title: "Who made the observation?",
            situation: "My individual Booking.com review",
            brief: "I used ChatGPT and DeepSeek while preparing my review.",
            detailed: "I took the screenshots and made the observations. ChatGPT helped me plan the review, group the evidence and revise the wording. DeepSeek suggested other ways to organise the headings. I checked the interpretations and made the final judgments.",
            note: "The short version leaves open an important possibility: did a tool inspect the booking page for me? The longer account answers that. It also leaves room for a harder question I raised in the assignment: did the polished wording make a claim sound more certain than my screenshot justified?",
            cite: {
              sourceIndex: 0,
              page: 14,
              label: "Individual review · GenAI reflection, p. 14"
            },
            contextCite: {
              sourceIndex: 0,
              page: 25,
              label: "Individual review · Supporting board, p. 25"
            }
          },
          {
            title: "Who chose what to design?",
            situation: "Our group’s concept design submission",
            brief: "Our group used AI for brainstorming and editing.",
            detailed: "We wrote the initial design questions. ChatGPT grouped them, and we chose and revised the wording. Claude helped condense our notes for the slides. We reviewed the meaning and chose the no-scroll carriage after comparing it with the other proposals.",
            note: "“Brainstorming” could suggest the tool came up with the project. Grouping our questions and choosing which idea to pursue were different jobs. For a tutor trying to understand our design judgment, that distinction matters more than a list of tool names.",
            cite: {
              sourceIndex: 2,
              page: 18,
              label: "Concept design · GenAI statement, p. 18"
            },
            contextCite: {
              sourceIndex: 2,
              page: 16,
              label: "Concept design · Selecting the carriage, p. 16"
            }
          }
        ],
        jump: "Read the AI-use statements"
      },
      studyPlan: {
        label: "Current research question · Proposed study",
        title: "Can readers tell who shaped an argument?",
        body: "These assignments left me wondering how a Japanese-language reader would interpret the same kinds of statements about an essay. The writing process can be known to the researcher and still be invisible to the reader. That gives me a way to test whether a disclosure helps.",
        items: [
          [
            "Keep the amount similar. Change the task.",
            "I would compare two essays with similar proportions of AI-drafted text. In one, AI drafts the central argument and conclusion. In the other, it drafts the opening and transitions. I would first ask readers what they consider the core of an essay, then check the materials without any labels so one version doesn’t simply read better."
          ],
          [
            "Give readers different accounts.",
            "One group would read without a statement. Others would see a simple AI-use label, the task AI performed, the proportion of text it drafted, or a layered account. In the last version a reader could open a short label, see the passages involved and inspect their drafting history."
          ],
          [
            "Separate attribution from evaluation.",
            "I would ask readers who developed the argument and compare their answers with the drafting record. I would record perceived effort and judgments of the author separately. Does a fuller account help a writer who used AI only for transitions receive a fairer reading? It might clarify the work without changing anyone’s opinion of it. This is a study I am proposing. I have no reader results to report."
          ]
        ]
      },
      reflection: {
        label: "What I take from the course",
        title: "Which decision needs to be visible?",
        body: "On the train, a passenger should be able to tell what happens if they decline the invitation to play. In my own review, a tutor should be able to tell whether I observed a problem or accepted a tool’s interpretation of it. Both examples have changed what I look for in an interface or a disclosure: I start with the decision another person needs to understand, then show the part of the process that lets them judge it.",
        editionNote: "AI helped draft and translate this portfolio update from my course submissions and research questions. The linked PDFs contain the statements submitted for the course."
      },
    },
  };
  const zh = {
    title: "我们希望 AI 参与怎样的未来？", kicker: "推想设计 · INFO30005",
    meaning: "手表能建议我每天走多少步，写作助手能建议一篇文章该怎样收尾。看到这样的建议，我想知道，它体现的是谁的判断？",
    summary: "起初，我关心的是 Booking.com 把哪些房间排在我面前。后来，小组设想了四种未来，比较人们愿意把哪些决定交给技术。重读作业里的 AI 使用声明时，我发现，同一个问题也藏在我们的设计过程里。读者看到一个论点、一张海报，怎么知道谁搜集了材料，谁影响了作品的走向，又是谁认可了最后的结果？",
    role: "个人平台评析与两份小组设计作业。",
    methods: ["平台评析", "未来情景推演", "未来锥", "故事板"],
    caseFacts: {
      context: "墨尔本大学 · 高级界面原型设计 · INFO30005",
      ownership: "A1 由我独立完成。A2.G1 和 A2.G2 由 Rumaysa Fatima、Jessica Zou、Kaylee Li 和我共同完成。",
      contribution: "我在个人作业中梳理了订房界面怎样影响选择。未来推演、公共空间设想和服务概念来自小组共同设计。",
      evidence: "三份课程作业及其 AI 使用声明、四幅未来情景插图，以及一项关于读者如何理解 AI 参与程度的研究计划。",
      outcome: "我们设想了四种 AI 参与日常生活的未来，追问哪些选择该留给人。在我们设计的「不刷屏车厢」里，乘客可以自愿放下信息流，和同车的人玩一局桌游。",
      limitation: "这些未来情景及其可能带来的社会影响仍处于设想阶段。",
    },
    coverAlt: "小组为虚构的「留白区」设计的公园标牌与欢迎海报",
    coverCaption: "设想中的维多利亚州社区标识，2038 年 · A2.G1，第 24–25 页",
    files: ["A1 · Booking.com 平台评析", "A2.G1 · 重新想象未来生活", "A2.G2 · 概念设计"],
    study: {
      platform: { label: "A1 · 个人评析", title: "是谁把这间房排在第一位？", body: "我在 Booking.com 比较房间时，结果排序和催促预订的提示已经在引导我的注意。作业第 12 页把问题往前推了一步：如果 AI 能为不同旅客调整排序，甚至影响他们能看到哪些价格，两个人做同样的搜索，就可能依据不同的信息下决定。他们各自需要知道这份列表是怎么排出来的吗？", caption: "我把 AI 个性化推荐与透明度、可持续性、对平台的依赖放在一起讨论。", cite: "A1，第 5–7、12–13 页" },
      forecasts: {
        label: "A2.G1 · 四种未来情景",
        title: "在这四种未来里，谁来做决定？",
        body: "回看小组设想的四种未来，我为每一种挑了一个日常选择。",
        aiLabel: "AI 做什么",
        humanLabel: "你来决定",
        pageLabel: "A2.G1 · 第 {n} 页",
        items: [
          { key: "optimised-self", title: "被优化的自我",
            ai: "手表可能根据你的活动记录，给你定下明天的步数目标。", human: "是再走一段，还是休息一天？手表数得出步数，累不累是你自己的感受。",
            alt: "手环投射出步数目标和热量提醒。" },
          { key: "belonging-economy", title: "归属感经济",
            ai: "推荐系统可能把付费社群排在前面，影响哪些邀请有机会被你看见。", human: "加入、婉拒，或是去平台之外找同伴，都由你决定。",
            alt: "拿着手机的人被各种订阅提示包围，连公园也要订阅。" },
          { key: "friction-movement", title: "为生活保留一点阻力",
            ai: "家里的助手列出专注、休息或社交几种模式，然后等你开口。", human: "你先定今天的要事，再决定要不要帮忙。小组选择了这个方向继续设计。",
            alt: "两个人把手机放在一旁，在长椅上共读一本书。" },
          { key: "identity-fracture", title: "分裂的身份",
            ai: "平台可能用 AI 核验身份，判断你提交的资料是否可信。", human: "在同事和朋友面前，你可以展现不同的一面。但要让这两个身份彼此独立，可能没那么容易。",
            alt: "一个人穿过手机屏幕，另一侧出现了模样不同的化身。" },
        ],
      },
      cone: { label: "A2.G1 · 未来锥", title: "我们愿意把多少决定权交给 AI？", body: "另一张图讨论的是自动化可以介入生活到什么程度。我们把五种情景放进「未来锥」，在课堂上讨论每一种会让人得到什么、又失去什么。", cite: "A2.G1，第 20 页",
        items: [
          ["很可能出现的未来", "便利成为常态。亲自解决问题的机会越来越少，人们开始担心，离开助手后自己还能做什么。"],
          ["有理由想象的未来", "算法为好生活设定指标，人们逐渐学会按照这些指标表现自己。"],
          ["可能出现的未来", "为思考留一点时间，从个人偏好变成学校和职场的做法。界面也会等一等，再催人进行下一步。"],
          ["我们期待的未来", "公共资金支持社区设立「留白区」，让居民做手工、亲近自然。预测系统的介入到入口为止。"],
          ["意外的极端情景", "政府全面禁止预测算法和 AI 助手。即便想得到辅助，人们也只能手动完成每项任务。"],
        ] },
      zone: { label: "维多利亚州 · 2038 年", title: "走进「留白区」之后", body: "在我们设想的一天里，居民早上七点自己决定当天的要事。稍后走进「留白区」，设备会关闭预测功能和非必要通知。邻里公告板仍能帮大家借工具。我们提议让数据留在本地设备上，这样一次闲聊或修理活动，就可以不成为 AI 的训练材料。", cite: "A2.G1，第 7–9、12–13 页" },
      concepts: { label: "A2.G2 · 面向 2036 年的小组概念", title: "在车厢、书摊，还是节庆现场相遇？", body: "接下来，我们比较了三种能让人更容易加入线下活动的服务。每个方案都给技术安排了不同的工作。", cite: "A2.G2，第 2–3、6、10、14–16 页", caption: "小组故事板描绘了一位乘客体验「不刷屏车厢」的过程。",
        items: [
          ["不刷屏车厢", "乘客自愿走进这节车厢，社交媒体暂停使用，智能桌会推荐桌游。我们选它，是因为人们本来就在同一班车上。想安静通勤的人仍然需要普通车厢。"],
          ["流动换书站", "机器人把图书、有声书和多语种读物带进郊区街道。居民可以选择要不要推荐；借书很方便，但也可能借完就走，没有和邻居交谈。"],
          ["节庆之门", "增强现实把节日的文化场景叠加到现场，让参与者结伴探索。我们关心的是谁有权讲述这些故事，尤其当节庆成为商业景点时。"],
        ] },
      participation: {
        label: "回看设计过程",
        title: "AI 提的建议，后来用在哪里？",
        body: "在上面的四种未来里，一次小小的提示就可能改变一个人接下来考虑什么。带着这个问题翻看设计笔记，我发现，有些建议影响了我们在课堂上讨论的内容，有些则一试就行不通。下面这四件事，都能在作业里找到来龙去脉。",
        items: [
          [
            "问题是谁提出来的？",
            "我们先围绕「人们可以怎样共度一段时间」提出设计问题，再请 ChatGPT 把相近的问题归在一起。归类后，重叠之处容易看出来了，但一个共同的标题也可能让两种需求听起来像一回事。最后用哪种措辞来指导设计，还得由小组决定。"
          ],
          [
            "没采纳的建议，也算参与吗？",
            "我们要画一张冰山图，Gemini 建议去 Miro 找模板。实际找了一圈，能用的很少，最后用了 Freepik 的一张背景图。成品上看不见 Gemini 的建议，但它确实影响了我们先去哪里找、把时间花在哪里。"
          ],
          [
            "没用进成品的图，也有影响吗？",
            "我们把 AI 生成的海报参考图带进辅导课，让大家对着具体的画面提意见，之后才设计自己的「留白区」海报。下一份作业里，我们也用生成图探索过一张让人交流的互动桌，后来放弃了这个方案。两次都是用 AI 出参考图。一次影响了最终海报，另一次只留在早期探索里。"
          ],
          [
            "谁核对了最后的结果？",
            "写未来情景作业时，ChatGPT 帮我们整理参考文献的格式。我们逐条对照学校的引用指南，改正了日期和大小写。读者在幻灯片上看到一条整齐的文献记录，很难从中分辨工具做了哪一步、我们又核对了什么。"
          ]
        ],
        citations: [
          {
            sourceIndex: 1,
            page: 14,
            label: "未来情景作业 · AI 使用声明，第 14 页"
          },
          {
            sourceIndex: 2,
            page: 18,
            label: "概念设计作业 · AI 使用声明，第 18 页"
          }
        ]
      },
      statements: {
        label: "细读 AI 使用声明",
        title: "一句「我用了 AI」，读者能看出什么？",
        body: "我从作业声明中选了两段，在作品集里分别用一句简短的话和一段较完整的叙述来转述。每组说的都是同一段经历，旁边的链接可以打开当时交的原文。",
        shortLabel: "一句话说明",
        detailLabel: "写清实际分工",
        examples: [
          {
            title: "谁观察了订房界面？",
            situation: "我的 Booking.com 个人评析",
            brief: "准备这份评析时，我用过 ChatGPT 和 DeepSeek。",
            detailed: "截图和观察记录由我完成。ChatGPT 帮我安排分析步骤、整理证据和修改措辞。DeepSeek 提供了几种组织标题的方式。我核对了对界面的解读，也由我做出最后的判断。",
            note: "只读第一句，老师仍可能问，是工具替我查看了订房页面吗？第二种写法交代了观察记录的来源。至于我在作业里提出的另一个问题，还得拿文字和截图对照着看。润色之后，我是不是把图中仅仅能推测的事写得太肯定了？",
            cite: {
              sourceIndex: 0,
              page: 14,
              label: "个人评析 · 生成式 AI 使用反思，第 14 页"
            },
            contextCite: {
              sourceIndex: 0,
              page: 25,
              label: "个人评析 · 过程记录，第 25 页"
            }
          },
          {
            title: "是谁选定了设计方向？",
            situation: "我们小组的概念设计作业",
            brief: "小组用 AI 辅助构思和编辑。",
            detailed: "最初的设计问题由我们提出，ChatGPT 把它们归类，我们再筛选和修改措辞。Claude 帮忙把笔记压缩成适合放进幻灯片的文字。我们复核了意思，也比较了几个提案，最终选中「不刷屏车厢」。",
            note: "「辅助构思」容易让人以为项目的点子出自工具。把已有的问题分组，和决定哪个点子值得做下去，是两件事。老师想了解我们怎样做设计判断时，这个区别比工具清单更有用。",
            cite: {
              sourceIndex: 2,
              page: 18,
              label: "概念设计作业 · 生成式 AI 使用声明，第 18 页"
            },
            contextCite: {
              sourceIndex: 2,
              page: 16,
              label: "概念设计 · 选择车厢方案，第 16 页"
            }
          }
        ],
        jump: "阅读 AI 使用声明"
      },
      studyPlan: {
        label: "我现在的问题 · 研究计划",
        title: "读者能看出是谁形成了文章的论点吗？",
        body: "这些作业让我想知道，读者看一篇日语文章时，会怎样理解类似的 AI 使用声明？假如研究者有实际的起草记录，便能把读者从声明中理解的分工，与写作时发生的事放在一起比较。",
        items: [
          [
            "让 AI 起草的篇幅相近，改变它写的部分",
            "我想比较两篇由 AI 起草的文字占比相近的文章。一篇请 AI 起草核心论点和结论，另一篇请它写开头和过渡段。我会先问读者，他们心目中哪些部分算一篇文章的核心，再请人试读不带标签的材料，检查其中一篇是否本来就写得更好。"
          ],
          [
            "让读者看到不同的说明",
            "一组读者只看文章。其他组分别看到「使用过 AI」的标签、AI 做过的具体任务、AI 起草的文字占比，或一份可以逐层展开的说明。在最后一种情况下，读者可以点开标签，看到涉及哪些段落，再查看这些段落的起草记录。"
          ],
          [
            "先看读者读懂了什么，再讨论评价是否公平",
            "我会请读者判断文章的论点是谁提出的，再用写作记录核对他们的答案。读者觉得作者付出了多少努力、怎样评价作者，我会另外记录。假如作者只让 AI 写了过渡段，更详细的说明能让评价更公平吗？也有可能，读者弄清了分工，对作者的看法却没有改变。这项研究还在计划中，尚无读者实验结果。"
          ]
        ]
      },
      reflection: {
        label: "这门课留给我的问题",
        title: "哪一个决定需要让人看得见？",
        body: "坐上车厢的乘客，需要知道婉拒一局桌游之后会怎样。读我的订房评析的老师，需要知道这个问题是我亲眼观察到的，还是我采纳了工具给出的解释。现在，无论设计一个界面，还是写一份 AI 使用声明，我都会先问，对方需要弄清的是哪一个决定？接着再回到过程里，找出足以让对方自己做判断的细节。",
        editionNote: "这次更新作品集时，我请 AI 根据课程作业和我的研究问题协助起草、翻译网页文案。课程提交时的 AI 使用声明可在所附 PDF 中查看。"
      },
    },
  };
  const ja = {
    title: "AIに何を任せる未来を選ぶか", kicker: "スペキュラティブデザイン · INFO30005",
    meaning: "腕時計は明日の目標歩数を、文章作成AIはレポートの結論を提案できます。その目標や結論を目にしたとき、誰の判断なのか、私には分かるでしょうか。",
    summary: "出発点は、Booking.comでどの部屋が最初に表示されるかという疑問でした。グループ課題では、日々の判断をどこまで技術に任せるか、四つの未来を描きました。あとで課題に添えたAIの利用申告を読み返すと、私たち自身の制作にも同じ問いが残っていました。完成した文章やポスターを見た人には、誰が材料を集め、形にし、これでよいと判断したのか、どこまで伝わるのでしょうか。",
    role: "個人で取り組んだプラットフォーム分析と、グループで提出した二つの設計課題。",
    methods: ["プラットフォーム分析", "未来予測", "未来のコーン", "絵コンテ"],
    caseFacts: {
      context: "メルボルン大学 · 応用インターフェース・プロトタイピング · INFO30005",
      ownership: "A1は私の個人課題です。A2.G1とA2.G2はRumaysa Fatima、Jessica Zou、Kaylee Liと私の4人で制作しました。",
      contribution: "個人課題では、宿泊予約の画面が選択にどう影響するかを図にしました。未来予測、公共空間のシナリオ、サービス案はグループで取り組んだものです。",
      evidence: "三つの課題とそれぞれのAI利用申告、四つの未来を描いたイラスト、AIの関わり方を読み手がどう受け取るかを調べる研究案。",
      outcome: "四つの未来を描き、AIが暮らしに入っても自分で決めたいことは何かを考えました。私たちが提案した車両では、希望する乗客がスマホを置いて一緒にボードゲームを楽しめます。",
      limitation: "未来の暮らしと社会への影響は、いずれも授業で検討した仮説です。",
    },
    coverAlt: "架空の公園の入口に立つ案内板と、グループが構想した「余白の区域」のポスター",
    coverCaption: "2038年のビクトリア州を想定した案内表示 · A2.G1、24–25頁",
    files: ["A1 · Booking.comのプラットフォーム分析", "A2.G1 · 未来の暮らしを描く", "A2.G2 · コンセプト設計"],
    study: {
      platform: { label: "A1 · 個人課題", title: "この部屋はなぜ一番上に出るのか", body: "Booking.comで部屋を見比べると、一覧の順番や予約を急かす表示によって、目に留まる部屋が変わります。12頁では、AIが利用者に応じて順番や表示する料金を変えた場合を考えました。同じ条件で検索した二人が、違う情報を頼りに部屋を選ぶかもしれません。それぞれが納得して選ぶには、表示の仕組みをどこまで知る必要があるでしょうか。", caption: "個人課題ではAIによる個別化とともに、透明性、持続可能性、プラットフォームへの依存を検討しました。", cite: "A1、5–7・12–13頁" },
      forecasts: {
        label: "A2.G1 · 四つの未来像",
        title: "四つの未来で、誰が何を決めるのか",
        body: "グループで描いた四つの未来から、日常の選択を一つずつ取り上げました。",
        aiLabel: "AIの役割",
        humanLabel: "自分で選べること",
        pageLabel: "A2.G1 · {n}頁",
        items: [
          { key: "optimised-self", title: "最適化される自分",
            ai: "腕時計が活動の記録をもとに、明日の目標歩数を決めるかもしれません。", human: "目標まで歩くか、今日は休むか。歩数は時計に分かっても、疲れを感じるのは自分です。",
            alt: "腕の端末に目標歩数と摂取カロリーの警告が映っている。" },
          { key: "belonging-economy", title: "居場所が商品になる",
            ai: "推薦システムが有料の集まりを上位に並べると、どの誘いが目に入るかも変わります。", human: "参加するか、誘いを断るか。アプリを離れて、自分で仲間を探すこともできます。",
            alt: "スマホを持つ人の周りに、公園まで含めた有料登録の案内が並ぶ。" },
          { key: "friction-movement", title: "あえて手間を残す動き",
            ai: "家のAIは、集中する、休む、人と過ごすという選択肢を示して待ちます。", human: "まず自分で今日の優先順位を決め、必要なときに助けを求めます。私たちはこの未来を選んで案を深めました。",
            alt: "二人がスマホを脇に置き、ベンチで一冊の本を読んでいる。" },
          { key: "identity-fracture", title: "分かれていくアイデンティティ",
            ai: "AIによる本人確認で、プロフィールが本人のものと認められるかが決まるかもしれません。", human: "職場と友人の前で、どんな自分を見せるかは選べます。ただ、その二つの顔を別々に保つのは難しくなります。",
            alt: "人がスマホの画面を通り抜け、反対側に別の姿で現れる。" },
        ],
      },
      cone: { label: "A2.G1 · 未来のコーン", title: "AIにどこまで判断を委ねるか", body: "別の図では、暮らしのどこまでを自動化するかを変えながら、五つのシナリオを比較しました。授業では、それぞれの暮らしを選ぶと何を得て、何を失うかを考えました。", cite: "A2.G1、20頁",
        items: [
          ["起こりそうな未来", "便利さが当たり前になり、自分で問題を解く機会が減ります。人々は、手助けなしで何ができるかを気にかけ始めます。"],
          ["十分に考えられる未来", "よい暮らしの基準をアルゴリズムが決め、人々はその尺度で評価されるように振る舞います。"],
          ["起こりうる未来", "少し立ち止まる習慣が学校や職場にも広がります。画面は次の操作を促す前に、考える時間を残します。"],
          ["望ましい未来", "公費で設けた「余白の区域」で住民が工作や自然との触れ合いを楽しみます。予測システムが介入するのは区域の入口までです。"],
          ["想定外の未来", "政府が予測アルゴリズムとAIアシスタントを全面的に禁止します。支援を望む人も、すべて手作業で行うことになります。"],
        ] },
      zone: { label: "ビクトリア州 · 2038年", title: "「余白の区域」に入ると", body: "想定した一日の始まりは朝7時。住民は今日の優先事項を自分で決めます。その後、区域に入ると、端末の予測機能と不要な通知が止まります。道具を借りるときには地域の掲示板が使えます。近所で交わす会話や修理の様子がAIの学習に使われずに済むよう、区域内のデータは現地の機器に留める案にしました。", cite: "A2.G1、7–9・12–13頁" },
      concepts: { label: "A2.G2 · 2036年のサービス案", title: "電車の座席、移動図書館、それともお祭りか", body: "次の課題では、人と顔を合わせるきっかけを三つのサービスとして考えました。技術に頼る場面はそれぞれ異なります。", cite: "A2.G2、2–3・6・10・14–16頁", caption: "スクロールを休む車両に乗った人の体験を描いたグループの絵コンテ。",
        items: [
          ["スクロールを休む車両", "希望者が乗るとSNSの利用が一時停止し、車内のテーブルがボードゲームを提案します。ふだん乗る電車で試せる点から、この案を選びました。静かに帰りたい乗客には、通常の車両も必要です。"],
          ["移動式の本の交換所", "ロボットが郊外の住宅地に本や多言語の読み物、オーディオブックを届けます。おすすめを受け取るかは自由です。本は借りやすくても、そこで会話が生まれるとは限りません。"],
          ["祭りのポータル", "拡張現実を通して、その祭りが生まれた土地の風景を来場者が一緒に巡ります。祭りが観光商品になる場合、その文化を誰の視点で伝えるかが課題になります。"],
        ] },
      participation: {
        label: "制作過程を振り返る",
        title: "AIの提案はその後どうなったか",
        body: "四つの未来では、ちょっとした提案が、次に何を選択肢として考えるかを左右します。私たちの制作記録にも、似た場面がありました。授業で話し合うきっかけになった提案もあれば、実際に試してみて見送った提案もあります。その行方をたどれるのが、次の四つの場面です。",
        items: [
          [
            "問いの形を決めたのは誰か",
            "人が一緒に時間を過ごすきっかけについて、まずグループでいくつも問いを出しました。ChatGPTに似た問いをまとめてもらうと、重なりが見えてきます。ただ、異なるニーズでも、同じ見出しの下に並ぶと一つの問題に見えてしまいます。どんな言葉で問いを立て、設計を進めるかは、私たちで決めました。"
          ],
          [
            "採用しなかった提案にも影響はあったか",
            "氷山モデルを図にするためのテンプレートを探していたとき、GeminiにMiroを勧められました。実際に探すと、使えそうなものはほとんど見つからず、結局Freepikで背景の画像を選びました。スライドにその提案は残っていません。それでも、最初にどこを探すかはAIのひと言で変わりました。"
          ],
          [
            "掲載しなかった画像は何の役に立ったか",
            "「余白の区域」のポスターを作る前に、AIが生成した参考画像を授業に持ち込みました。画像を見ながら意見をもらえたので、それを手がかりに私たちのポスターを作りました。次の課題でも、人が集まれるテーブルの案を生成画像で検討しましたが、その案は採用しませんでした。同じように作った参考画像でも、その後の設計とのつながりは違います。"
          ],
          [
            "最後に確かめたのは誰か",
            "未来を描く課題では、ChatGPTに参考文献の表記を整えてもらいました。大学の引用ガイドと照らし合わせたところ、日付や大文字の使い方に誤りがあり、私たちで直しました。提出した文献一覧だけを見ても、どこで手間を省けて、どこに確認の手間がかかったかまでは分かりません。"
          ]
        ],
        citations: [
          {
            sourceIndex: 1,
            page: 14,
            label: "未来を描く課題 · AI利用申告、14頁"
          },
          {
            sourceIndex: 2,
            page: 18,
            label: "コンセプト設計 · AI利用申告、18頁"
          }
        ]
      },
      statements: {
        label: "AI利用申告の読み比べ",
        title: "「AIを使いました」で何が伝わるか",
        body: "提出時の申告から二つの例を選び、このポートフォリオ用に言い換えました。同じ作業について、短く伝えた場合と、作業の中身まで書いた場合を比べられます。それぞれの例から提出時の文面も読めます。",
        shortLabel: "短い申告",
        detailLabel: "作業の中身まで書いた申告",
        examples: [
          {
            title: "画面を観察したのは誰か",
            situation: "個人で取り組んだBooking.comの分析",
            brief: "レビューをまとめる際にChatGPTとDeepSeekを使いました。",
            detailed: "予約画面を観察し、スクリーンショットを撮ったのは私です。ChatGPTには作業の段取り、観察記録の分類、文章の推敲を手伝ってもらいました。DeepSeekには見出しの構成案をいくつか出してもらいました。画面のどこから何が読み取れるかは、自分で確かめて判断しました。",
            note: "短い申告だけでは、予約画面を実際に確かめたのが私なのか、AIなのかも分かりません。詳しく書くと、その点は伝わります。そのうえで、課題を進めながら気になったことがあります。文章が整ったせいで、スクリーンショットからは言い切れないことまで、確かな結論に見えていないでしょうか。",
            cite: {
              sourceIndex: 0,
              page: 14,
              label: "個人課題 · 生成AI利用の振り返り、14頁"
            },
            contextCite: {
              sourceIndex: 0,
              page: 25,
              label: "個人レビュー · 制作メモ、25頁"
            }
          },
          {
            title: "どの案を進めるか決めたのは誰か",
            situation: "グループで提出したコンセプト設計",
            brief: "グループでのアイデア出しと文章の編集にAIを使いました。",
            detailed: "最初の問いはグループで書き出しました。ChatGPTに似た問いをまとめてもらい、どの問いを使うかを自分たちで決め、言葉を練り直しました。Claudeには、メモをスライドに収まる長さに整えてもらいました。意味が変わっていないかも私たちで確認しました。最後に他の案と比較して選んだのが、スクロールを休む車両です。",
            note: "「アイデア出しに使った」とだけ書くと、最初の案もAIが考えたように読めます。すでにある問いを分類することと、どの案を設計に移すか決めることは別の作業です。私たちがどう判断したかを知りたい先生には、使ったツールの名前を並べるより、この違いを書くほうが伝わります。",
            cite: {
              sourceIndex: 2,
              page: 18,
              label: "コンセプト設計 · 生成AIの利用申告、18頁"
            },
            contextCite: {
              sourceIndex: 2,
              page: 16,
              label: "コンセプト設計 · 車両案の選定、16頁"
            }
          }
        ],
        jump: "AI利用申告の書き方を比べる"
      },
      studyPlan: {
        label: "今の研究テーマ · 読者を対象とした研究案",
        title: "論の筋道を誰が考えたか、読み手に伝わるか",
        body: "この課題を終えて、同じような申告を日本語の小論文に添えると、読み手はどう受け取るのかが気になりました。研究者は執筆の過程を記録から知ることができますが、読み手が最初に目にするのは完成した文章です。利用申告を添えることで、実際の書き方がどこまで伝わるかを調べたいと思っています。",
        items: [
          [
            "AIが下書きする分量をそろえ、担当する箇所を変える",
            "文章全体のうちAIが下書きする割合が同程度の小論文を二つ用意します。一方では中心となる主張と結論を、もう一方では書き出しと段落のつなぎをAIが下書きします。まず、小論文のどこを核と考えるかを読み手に尋ねたいです。事前に利用申告を伏せて両方を読んでもらい、一方だけが読みやすいといった差も確かめます。"
          ],
          [
            "読み手に示す説明を変える",
            "あるグループには申告を添えずに読んでもらいます。他のグループには、「AIを使用」という短い表示、AIが担当した作業、AIが下書きした文章の割合、あるいは詳細を順に開ける表示のうち、いずれかを示します。最後の形式なら、短い表示を開いて該当箇所を見たあと、その箇所の下書きの履歴までたどれます。"
          ],
          [
            "何が伝わったかと、書き手がどう評価されたかを分けて尋ねる",
            "誰が論の筋道を考えたと思うかを尋ね、回答を執筆記録と照らし合わせます。書き手がどれだけ手間をかけたように見えたか、書き手自身をどう評価したかは別々に記録します。段落をつなぐ箇所だけでAIを使った人は、詳しく申告すると、より公平に読んでもらえるでしょうか。作業の分担が伝わっても、評価は変わらないかもしれません。これは今後の研究案で、読者調査はまだ実施していません。"
          ]
        ]
      },
      reflection: {
        label: "この授業を通して考えたこと",
        title: "どの判断が、相手から見える必要があるか",
        body: "車両に乗る人なら、ゲームの誘いを断ったらどうなるのか知りたいかもしれません。私のレビューを読む先生なら、画面上の問題を私自身が見つけたのか、AIの解釈を採用したのかを知りたいはずです。この二つの場面を考えてから、画面や利用申告を見るときの着眼点が変わりました。まず、相手が何を知れば自分で判断できるかを考えます。そのうえで、そこに至る過程のどこを見せるかを選びたいと思います。",
        editionNote: "このページの改訂では、提出課題と私の研究上の問いをもとに、本文の下書きと翻訳にAIを使いました。授業で提出した利用申告はリンク先のPDFで読めます。"
      },
    },
  };
  const sources = documents.map((href, i) => ({
    href, label: en.files[i] + " · PDF", labels: { zh: zh.files[i] + " · PDF", ja: ja.files[i] + " · PDF" },
    supplementary: true, sharedAttribution: i > 0, restricted: false,
  }));
  for (const [language, copy] of Object.entries({ en, zh, ja })) {
    const project = {
      id, category: "ux-research", year: "2026", title: copy.title, shortTitle: copy.title, displayTitle: copy.title,
      kicker: copy.kicker, summary: copy.summary, meaning: copy.meaning, role: copy.role, methods: copy.methods,
      cover: { src: art + "friction-zone.webp", alt: copy.coverAlt }, coverCaption: copy.coverCaption,
      sections: [], media: [], sources, caseFacts: copy.caseFacts, futuresStudy: copy.study,
    };
    if (language === "en") window.PORTFOLIO_PROJECTS.push(project);
    window.PORTFOLIO_I18N[language].projects[id] = project;
    window.PORTFOLIO_I18N[language].caseFacts[id] = copy.caseFacts;
    window.PORTFOLIO_STUDENT_COPY[language].projects[id] = { summary: copy.summary, meaning: copy.meaning, role: copy.role };
  }
})();
