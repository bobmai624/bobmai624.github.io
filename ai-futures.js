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
    meaning: "If a system can plan my day, should I still be the one to decide what matters this morning?",
    summary: "I began with a small decision on Booking.com: which room would I look at first? In our group work, that question grew to the scale of a neighbourhood. We imagined what residents might ask AI to do for them, and what they might decide to do together.",
    role: "Individual platform review and two shared design submissions.",
    methods: ["Platform critique", "Forecasting", "Futures cone", "Storyboarding"],
    caseFacts: {
      context: "Advanced Interface Prototyping · INFO30005 · University of Melbourne",
      ownership: "I wrote A1. Rumaysa Fatima, Jessica Zou, Kaylee Li and I submitted A2.G1 and A2.G2 together.",
      contribution: "I mapped how a booking interface shapes choices. The forecasts, public-space scenario and service concepts below are our group work.",
      evidence: "A Booking.com critique, four forecasts for the 2030s, a 2038 neighbourhood scenario and three service concepts for 2036.",
      outcome: "Across four imagined futures, we asked which choices people would keep. Our no-scroll carriage gave passengers the option to put their feeds aside and play a game together.",
      limitation: "The future scenarios and their social effects remain speculative.",
    },
    coverAlt: "The group’s imagined Friction Zone park sign and welcome poster",
    coverCaption: "Signs for an imagined neighbourhood in Victoria, 2038 · A2.G1, pp. 24–25",
    files: ["A1 · Booking.com critical review", "A2.G1 · Your Future Reimagined", "A2.G2 · Conceptual Design"],
    study: {
      platform: { label: "A1 · Individual review", title: "Who puts this room first?", body: "When I compared rooms on Booking.com, the order of the results and the urgency messages already directed my attention. On page 12 I asked what might happen if AI personalised the ranking and the prices a traveller could see. Two people could start the same search and have different grounds for a decision. What would each need to know about how their list was made?", caption: "My review set AI personalisation alongside transparency, sustainability and dependence on the platform.", cite: "A1, pp. 5–7, 12–13" },
      forecasts: { label: "A2.G1 · Group forecasts", title: "Four ways AI could shape everyday life", body: "Our group began with signals about loneliness, paid communities, tracking and online trust. We developed four forecasts for the 2030s. I now read them as four future archetypes. In each one, a familiar interaction gives AI a different kind of influence.", caption: "Our four forecast illustrations, in the order they appear in the submission.", cite: "A2.G1, pp. 2–6",
        items: [
          ["The Optimised Self", "A watch can count my activity. If an assistant uses that count to set tomorrow’s goal, who gets to define progress on a day when I need rest?"],
          ["The Belonging Economy", "A platform might help me find a community. If recommendations favour paid groups, the same system can decide which invitations I ever see."],
          ["The Friction Movement", "We chose this forecast. A home assistant could offer a focus or recovery mode and wait for me to choose my priorities before planning anything."],
          ["The Identity Fracture", "I might present myself differently at work and among friends. An AI identity check could help establish trust, yet linking the two profiles could erase a boundary I wanted to keep."],
        ] },
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
      reflection: { label: "My reflection", title: "Who can decline the suggestion?", body: "I came away with a question I can use on a screen or a train: can someone understand the offer, decline it and still take part? For a traveller, that might mean seeing why a room ranks first. For a passenger, it might mean getting home quietly. Those details are where I would start evaluating these ideas with people." },
    },
  };
  const zh = {
    title: "我们希望 AI 参与怎样的未来？", kicker: "推想设计 · INFO30005",
    meaning: "假如系统能替我安排一整天，今天最重要的事，还由我来定吗？",
    summary: "最初，我在 Booking.com 上问了一个很小的问题：我会先看哪一间房？到了小组作业，我们把这个问题放进一个想象中的社区。居民愿意把哪些事交给 AI，又有哪些事想留给自己，或和邻居一起做？",
    role: "个人平台评析与两份小组设计作业。",
    methods: ["平台评析", "未来情景推演", "未来锥", "故事板"],
    caseFacts: {
      context: "墨尔本大学 · 高级界面原型设计 · INFO30005",
      ownership: "A1 由我独立完成。A2.G1 和 A2.G2 由 Rumaysa Fatima、Jessica Zou、Kaylee Li 和我共同完成。",
      contribution: "我在个人作业中梳理了订房界面怎样影响选择。后面的未来推演、公共空间设想和服务概念来自小组共同设计。",
      evidence: "一份订房平台评析、四种关于 2030 年代的未来设想、一个 2038 年社区情景，以及三个面向 2036 年的服务概念。",
      outcome: "我们设想了四种 AI 参与日常生活的未来，追问哪些选择该留给人。在我们设计的「不刷屏车厢」里，乘客可以自愿放下信息流，和同车的人玩一局桌游。",
      limitation: "这些未来情景及其可能带来的社会影响仍处于设想阶段。",
    },
    coverAlt: "小组为虚构的「留白区」设计的公园标牌与欢迎海报",
    coverCaption: "设想中的维多利亚州社区标识，2038 年 · A2.G1，第 24–25 页",
    files: ["A1 · Booking.com 平台评析", "A2.G1 · 重新想象未来生活", "A2.G2 · 概念设计"],
    study: {
      platform: { label: "A1 · 个人评析", title: "是谁把这间房排在第一位？", body: "我在 Booking.com 比较房间时，结果排序和催促预订的提示已经在引导我的注意。作业第 12 页把问题往前推了一步：如果 AI 能为不同旅客调整排序，甚至影响他们能看到哪些价格，两个人做同样的搜索，就可能依据不同的信息下决定。他们各自需要知道这份列表是怎么排出来的吗？", caption: "我把 AI 个性化推荐与透明度、可持续性、对平台的依赖放在一起讨论。", cite: "A1，第 5–7、12–13 页" },
      forecasts: { label: "A2.G1 · 小组未来推演", title: "四种未来里，AI 各自做什么？", body: "我们从孤独感、付费社群、自我追踪和网络信任出发，提出了四种关于 2030 年代的设想。现在回看，我把它们理解为四种未来生活的原型。每一种，我都想找一个具体情境，看看 AI 会介入哪一步。", caption: "小组作业中的四幅情景图，依原作顺序排列。", cite: "A2.G1，第 2–6 页",
        items: [
          ["被优化的自我", "手表可以记录我今天的活动量。如果助手据此设定明天的目标，当我真正需要的是休息时，谁来定义什么叫进步？"],
          ["归属感经济", "平台可以帮我找到同好。假如它优先推荐付费社群，它也就影响了我有机会收到哪些邀请。"],
          ["为生活保留一点阻力", "小组选择了这个方向。家里的助手可以提供「专注」或「恢复」模式，先等我想清楚今天要做什么，再开始帮忙。"],
          ["分裂的身份", "我在职场和朋友面前可能展现不同的一面。AI 身份核验可以帮助别人确认我是谁，但如果它把两套身份连起来，也可能抹去我有意保留的界限。"],
        ] },
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
      reflection: { label: "个人回顾", title: "拒绝了建议，还能参与吗？", body: "做完三份作业，我留下一个能用来检查界面和公共服务的问题：一个人能否明白系统在建议什么，自由地拒绝，然后继续做原本要做的事？对旅客来说，可能是看懂一间房为什么排第一。对乘客来说，也许只是安静地坐车回家。以后找人试用这些想法，我想先观察这些细节。" },
    },
  };
  const ja = {
    title: "AIに何を任せる未来を選ぶか", kicker: "スペキュラティブデザイン · INFO30005",
    meaning: "一日の予定をAIに組んでもらえるとしたら、今朝いちばん大事なことは誰が決めるのだろう。",
    summary: "出発点は、Booking.comで最初にどの部屋を見るかという小さな選択でした。グループ課題では舞台を架空の地域社会に移し、住民がAIに任せたいこと、自分で決めたいこと、近所の人と一緒にしたいことを考えました。",
    role: "個人で取り組んだプラットフォーム分析と、グループで提出した二つの設計課題。",
    methods: ["プラットフォーム分析", "未来予測", "未来のコーン", "絵コンテ"],
    caseFacts: {
      context: "メルボルン大学 · 応用インターフェース・プロトタイピング · INFO30005",
      ownership: "A1は私の個人課題です。A2.G1とA2.G2はRumaysa Fatima、Jessica Zou、Kaylee Liと私の4人で制作しました。",
      contribution: "個人課題では、宿泊予約の画面が選択にどう影響するかを図にしました。未来予測、公共空間のシナリオ、サービス案はグループで取り組んだものです。",
      evidence: "宿泊予約サイトの分析、2030年代を描いた四つの未来予測、2038年の地域社会のシナリオ、2036年を想定した三つのサービス案。",
      outcome: "四つの未来を描き、AIが暮らしに入っても自分で決めたいことは何かを考えました。私たちが提案した車両では、希望する乗客がスマホを置いて一緒にボードゲームを楽しめます。",
      limitation: "未来の暮らしと社会への影響は、いずれも授業で検討した仮説です。",
    },
    coverAlt: "架空の公園の入口に立つ案内板と、グループが構想した「余白の区域」のポスター",
    coverCaption: "2038年のビクトリア州を想定した案内表示 · A2.G1、24–25頁",
    files: ["A1 · Booking.comのプラットフォーム分析", "A2.G1 · 未来の暮らしを描く", "A2.G2 · コンセプト設計"],
    study: {
      platform: { label: "A1 · 個人課題", title: "この部屋はなぜ一番上に出るのか", body: "Booking.comで部屋を見比べると、一覧の順番や予約を急かす表示によって、目に留まる部屋が変わります。12頁では、AIが利用者に応じて順番や表示する料金を変えた場合を考えました。同じ条件で検索した二人が、違う情報を頼りに部屋を選ぶかもしれません。それぞれが納得して選ぶには、表示の仕組みをどこまで知る必要があるでしょうか。", caption: "個人課題ではAIによる個別化とともに、透明性、持続可能性、プラットフォームへの依存を検討しました。", cite: "A1、5–7・12–13頁" },
      forecasts: { label: "A2.G1 · グループでの未来予測", title: "四つの未来でAIが担う役割", body: "孤独感、有料コミュニティ、行動の記録、オンラインでの信頼を手がかりに、2030年代の暮らしを四通り描きました。私は今、この四つを未来の暮らしの原型として捉えています。それぞれの場面でAIはどんな判断に関わるのか、身近な例から考えてみました。", caption: "グループ課題で使った四つの未来のイメージ。掲載順は提出時と同じです。", cite: "A2.G1、2–6頁",
        items: [
          ["最適化される自分", "腕時計には今日の活動量が残ります。アシスタントがその数字で明日の目標を決めるなら、休養が必要な日に何を達成とみなすかは、誰が決めるのでしょうか。"],
          ["居場所が商品になる", "プラットフォームは趣味の合う人を探す手助けになります。有料の集まりが優先されるとしたら、どの誘いが自分に届くかまで推薦の仕組みが左右します。"],
          ["あえて手間を残す動き", "私たちが選んだのはこの未来です。家のAIは「集中」「休養」などを提示し、住民がその日の優先事項を決めてから手助けを始めます。"],
          ["分かれていくアイデンティティ", "仕事と友人の前で違う一面を見せることがあります。AIによる本人確認は信頼につながる一方、二つのプロフィールを結びつけると、自分で守りたかった境界まで消えてしまいます。"],
        ] },
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
      reflection: { label: "振り返り", title: "提案を断ったあとも参加できるか", body: "この授業を通して、画面にも公共サービスにも使える問いが残りました。何を勧められているかを理解し、断ったあとも、自分の用事を続けられるでしょうか。旅行者なら部屋の表示順に納得して選べること、乗客なら静かに帰れることかもしれません。実際に試してもらう機会があれば、私はそこから確かめたいです。" },
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
