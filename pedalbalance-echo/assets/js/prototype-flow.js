function copy(zh, en, ja) {
  return Object.freeze({ zh, en, ja });
}

const references = Object.freeze({
  proprioceptive: Object.freeze({
    name: 'Proprioceptive Interaction',
    url: 'https://hpi.de/baudisch/projects/proprioceptive.html'
  }),
  hermits: Object.freeze({
    name: 'HERMITS',
    url: 'https://tangible.media.mit.edu/project/hermits/'
  }),
  muscle: Object.freeze({
    name: 'Muscle-Propelled Force Feedback',
    url: 'https://hpi.de/baudisch/projects/muscle-propelled-force-feedback.html'
  }),
  swarm: Object.freeze({
    name: 'SwarmHaptics',
    url: 'https://shape.stanford.edu/research/2019-SwarmHaptics/'
  }),
  wireality: Object.freeze({
    name: 'Wireality',
    url: 'https://www.futureinterfaces.com/research/2020/wireality'
  }),
  pantoguide: Object.freeze({
    name: 'PantoGuide',
    url: 'https://shape.stanford.edu/research/pantoguide/'
  }),
  linkedStick: Object.freeze({
    name: 'Linked-Stick',
    url: 'https://tangible.media.mit.edu/project/linkedstick/'
  }),
  decomposition: Object.freeze({
    name: 'Breaking It Down Is Better',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4015469/'
  }),
  robotLearning: Object.freeze({
    name: 'Robotic Assistance vs Visual Demonstration',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1569852/'
  })
});

function item(label, detail) {
  return Object.freeze({ label, detail });
}

function scene({ reference, ...definition }) {
  return Object.freeze({
    ...definition,
    referenceName: reference.name,
    referenceUrl: reference.url
  });
}

export const PROTOTYPE_STEPS = Object.freeze([
  scene({
    reference: references.proprioceptive,
    key: 'LOOP',
    visualKind: 'loop',
    nav: copy('闭环', 'CLOSED LOOP', '閉ループ'),
    tag: copy('01 · 一眼看懂实验', '01 · THE WHOLE EXPERIMENT', '01 · 実験の全体像'),
    title: copy('先看懂这一圈，\n到底发生了什么。', 'See the whole loop before the details.', '細部より先に、\n循環全体を見る。'),
    summary: copy(
      '左右脚的相对压力先被完整积累一圈；机器只在偏差持续存在时，向贡献较低一侧脚踝返回短提示；骑行者自己完成下一圈的修正。',
      'Bilateral relative pressure is accumulated for one complete revolution. Only a persistent deviation returns a brief cue to the lower-contributing ankle; the rider corrects the next turn voluntarily.',
      '左右の相対圧力を1回転分積算する。偏りが持続した時だけ寄与の低い側の足首へ短い提示を返し、次の回転は利用者自身が修正する。'
    ),
    action: copy('自然踩踏，不需要低头读取屏幕。', 'Pedal naturally without reading a screen.', '画面を見ず、自然にペダリングする。'),
    system: copy('脚下输入 → 完整一圈判断 → 对应侧短提示。', 'Pedal input → complete-turn decision → side-specific brief cue.', '足下入力 → 1回転判定 → 対応側への短い提示。'),
    check: copy('观察提示后，下一圈是否更快回到个人容差。', 'Observe whether the next turn returns to personal tolerance sooner.', '提示後の次の回転が個人許容範囲へ早く戻るかを見る。'),
    visualTitle: copy('人 → 机器 → 人 → 独立动作', 'HUMAN → MACHINE → HUMAN → INDEPENDENT ACTION', '人 → 機械 → 人 → 自立動作'),
    referenceMethod: copy('借鉴：用一张闭环图先定义输入与输出', 'Borrowed method: define input and output with one loop', '参照方法：1つの循環図で入出力を定義'),
    visualItems: [
      item(copy('脚下输入', 'PEDAL INPUT', 'ペダル入力'), copy('左 / 右相对压力', 'left / right relative pressure', '左右の相対圧力')),
      item(copy('机器判断', 'MACHINE DECISION', '機械判定'), copy('等待完整一圈', 'wait one complete revolution', '1回転を待つ')),
      item(copy('脚踝提示', 'ANKLE CUE', '足首提示'), copy('只提示贡献较低一侧', 'cue only the lower side', '寄与の低い側のみ提示')),
      item(copy('主动修正', 'ACTIVE CORRECTION', '能動的修正'), copy('机器不替人动作', 'the machine does not move the rider', '機械は人を動かさない'))
    ],
    machineState: copy('闭环待命', 'LOOP READY', 'ループ待機'),
    values: [48, 52], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.hermits,
    key: 'MODULES',
    visualKind: 'modules',
    nav: copy('模块', 'MODULES', 'モジュール'),
    tag: copy('02 · 把机制拆开', '02 · OPEN THE MECHANISM', '02 · 仕組みを分解'),
    title: copy('三个模块，\n各自只做一件事。', 'Three modules. One job each.', '3つのモジュール、\n役割は1つずつ。'),
    summary: copy('把看不见的系统拆成可检查的部件：踏板读取相对压力，控制器按完整一圈判断，脚踝端只返回短振动。', 'Make the invisible system inspectable: pedals read relative pressure, the controller decides over a complete turn, and the ankle unit returns only a brief vibration.', '見えない仕組みを検証可能な部品へ分ける。ペダルが相対圧力を読み、制御器が1回転単位で判定し、足首ユニットは短い振動だけを返す。'),
    action: copy('先理解每个模块，再看它们怎样连接。', 'Understand each module before following the connection.', '接続を見る前に各モジュールを理解する。'),
    system: copy('感知、解释与提示相互独立，故障时输出立即清零。', 'Sensing, interpretation and cueing remain separate; a fault clears output.', '感知・解釈・提示を分離し、障害時は出力を消去する。'),
    check: copy('任何模块都能单独说明输入、输出与限制。', 'Every module can state its input, output and limitation independently.', '各モジュールが入力・出力・制約を単独で説明できるかを見る。'),
    visualTitle: copy('SENSE / DECIDE / RETURN', 'SENSE / DECIDE / RETURN', 'SENSE / DECIDE / RETURN'),
    referenceMethod: copy('借鉴：用模块化机械短片解释一个系统的多种能力', 'Borrowed method: explain a system through modular mechanical units', '参照方法：機械モジュールでシステム能力を説明'),
    visualItems: [
      item(copy('01 感知', '01 SENSE', '01 感知'), copy('FSR-L / FSR-R + 霍尔节奏', 'FSR-L / FSR-R + Hall cadence', 'FSR-L / FSR-R + Hall ケイデンス')),
      item(copy('02 判断', '02 DECIDE', '02 判定'), copy('完整一圈 + 个人容差', 'complete turn + personal tolerance', '1回転 + 個人許容範囲')),
      item(copy('03 返回', '03 RETURN', '03 返却'), copy('左 / 右脚踝短振动', 'brief left / right ankle vibration', '左右足首への短い振動'))
    ],
    machineState: copy('模块已连接', 'MODULES CONNECTED', 'モジュール接続済み'),
    values: [50, 50], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.muscle,
    key: 'CUE_SEQUENCE',
    visualKind: 'sequence',
    nav: copy('一次提示', 'ONE CUE', '1回の提示'),
    tag: copy('03 · 三帧因果', '03 · THREE-FRAME CAUSE', '03 · 3コマの因果'),
    title: copy('提示不是答案，\n只是一次介入。', 'The cue is an intervention, not the answer.', '提示は答えではなく、\n一度の介入。'),
    summary: copy('第一帧保持自然节奏；第二帧在连续偏差后提示左脚踝；第三帧由骑行者主动调整下一圈。机器不会直接驱动肌肉。', 'Frame one holds cadence; frame two cues the left ankle after persistent deviation; frame three shows the rider voluntarily adjusting the next turn. The machine never drives the muscle.', '第1コマは自然なテンポ、第2コマは持続偏差後の左足首提示、第3コマは利用者自身による次回転の調整。機械は筋肉を直接駆動しない。'),
    action: copy('感觉到左侧短提示后，只微调下一圈。', 'After the brief left cue, adjust only the next turn.', '左側の短い提示後、次の1回転だけを微調整する。'),
    system: copy('等待完整一圈，确认持续偏差，再输出180毫秒示意提示。', 'Wait a complete turn, confirm persistent deviation, then issue an illustrative 180 ms cue.', '1回転を待ち、持続偏差を確認してから説明用180 ms提示を出す。'),
    check: copy('记录回到容差所需圈数和提示总量。', 'Record turns to tolerance and total cue dose.', '許容範囲へ戻る回転数と提示総量を記録する。'),
    visualTitle: copy('保持 → 提示 → 自主修正', 'HOLD → CUE → VOLUNTARY CORRECTION', '維持 → 提示 → 自主修正'),
    referenceMethod: copy('借鉴：用三帧动作序列分开机器作用与人的反应', 'Borrowed method: separate machine action and human response in three frames', '参照方法：3コマで機械作用と人の反応を分離'),
    visualItems: [
      item(copy('01 保持节奏', '01 HOLD CADENCE', '01 テンポ維持'), copy('左 44 / 右 56', 'left 44 / right 56', '左44 / 右56')),
      item(copy('02 左侧提示', '02 LEFT CUE', '02 左側提示'), copy('持续偏差后 · 180 ms', 'after persistent deviation · 180 ms', '持続偏差後・180 ms')),
      item(copy('03 主动调整', '03 SELF-CORRECT', '03 自主調整'), copy('下一圈回到 48 / 52', 'next turn returns to 48 / 52', '次回転で48 / 52へ'))
    ],
    machineState: copy('左侧提示 · 示意', 'LEFT CUE · ILLUSTRATIVE', '左側提示・説明用'),
    values: [44, 56], cueSide: 'left', outputMode: 'cue'
  }),
  scene({
    reference: references.swarm,
    key: 'DESIGN_SPACE',
    visualKind: 'matrix',
    nav: copy('变量', 'VARIABLES', '変数'),
    tag: copy('04 · 设计空间', '04 · DESIGN SPACE', '04 · デザイン空間'),
    title: copy('实验改变什么，\n一次说清楚。', 'Make every changed variable explicit.', '何を変える実験か、\n一度で明示する。'),
    summary: copy('实验不是比较“有设备”和“没设备”这么简单，而是分别控制提示时机、提示剂量、撤除方式和历史轨迹来源。', 'The study is not merely device versus no device. It separately controls cue timing, cue dose, withdrawal pattern and trace provenance.', '実験は単なる装置あり対なしではない。提示時機、提示量、撤去方法、軌跡の出所を個別に統制する。'),
    action: copy('在同一任务下体验可比较的反馈条件。', 'Experience comparable feedback conditions in the same task.', '同じ課題で比較可能なフィードバック条件を体験する。'),
    system: copy('每次只改变可追踪的条件，保留完整提示剂量记录。', 'Change traceable conditions and retain the complete cue-dose record.', '追跡可能な条件だけを変え、提示量の全記録を残す。'),
    check: copy('确认改善来自哪种条件，而不是界面新鲜感。', 'Identify which condition relates to change rather than interface novelty.', '変化がどの条件に関係するかを、新奇性と分けて見る。'),
    visualTitle: copy('四个可以被控制的实验变量', 'FOUR CONTROLLED EXPERIMENT VARIABLES', '統制できる4つの実験変数'),
    referenceMethod: copy('借鉴：先画设计空间，再进入场景与实验', 'Borrowed method: map the design space before scenarios and study', '参照方法：場面と実験の前にデザイン空間を示す'),
    visualItems: [
      item(copy('时机', 'TIMING', '時機'), copy('持续偏差后才提示', 'only after persistent deviation', '持続偏差後のみ提示')),
      item(copy('剂量', 'DOSE', '提示量'), copy('次数 + 持续时间', 'count + duration', '回数 + 持続時間')),
      item(copy('撤除', 'WITHDRAWAL', '撤去'), copy('持续 / 固定淡出 / 自适应', 'continuous / fixed fade / adaptive', '連続 / 固定フェード / 適応')),
      item(copy('来源', 'PROVENANCE', '出所'), copy('过去自己 / 匹配他人 / 无历史', 'past self / matched other / no history', '過去自己 / 対応他者 / 履歴なし'))
    ],
    machineState: copy('变量已定义', 'VARIABLES DEFINED', '変数定義済み'),
    values: [47, 53], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.wireality,
    key: 'SYSTEM_FACTS',
    visualKind: 'metrics',
    nav: copy('系统事实', 'SYSTEM FACTS', 'システム事実'),
    tag: copy('05 · 机制旁量化', '05 · QUANTIFY THE MECHANISM', '05 · 仕組みを数値化'),
    title: copy('数字放在机制旁边，\n不藏在表格里。', 'Put the numbers beside the mechanism.', '数字は表の中ではなく、\n仕組みの横へ。'),
    summary: copy('这些数字描述原型结构与实验规则，不是人体效果：两个踏板输入、一个完整踏圈窗口、两个脚踝提示位置、纠正时不需要读屏。', 'These numbers describe the prototype and study rule, not a human outcome: two pedal inputs, one complete-turn window, two ankle cue locations, and no screen required while correcting.', 'これらは人体効果ではなく、試作構成と実験規則を示す。2つのペダル入力、1回転の判定窓、2つの足首提示位置、修正中の画面読取は0。'),
    action: copy('只把数字当作机制约束，不当作研究结果。', 'Read the numbers as mechanism constraints, not study results.', '数字を研究結果ではなく仕組みの制約として読む。'),
    system: copy('固定式室内脚踏器；故障或停止时提示立即关闭。', 'Stationary indoor trainer only; fault or stop clears cues immediately.', '固定式室内トレーナーのみ。障害または停止で提示を即時解除する。'),
    check: copy('确认每个数字都能对应到一个部件或实验规则。', 'Confirm every number maps to a component or study rule.', '各数字が部品または実験規則に対応するか確認する。'),
    visualTitle: copy('结构事实 · 不是效果声明', 'STRUCTURAL FACTS · NOT OUTCOME CLAIMS', '構造上の事実・効果主張ではない'),
    referenceMethod: copy('借鉴：把反应时间、力与重量直接放到机构旁', 'Borrowed method: place quantified facts directly beside the mechanism', '参照方法：定量情報を機構のすぐ横へ置く'),
    visualItems: [
      item(copy('2', '2', '2'), copy('踏板相对压力输入', 'pedal pressure inputs', 'ペダル相対圧力入力')),
      item(copy('1', '1', '1'), copy('完整踏圈后判断', 'decision after a complete turn', '1回転後に判定')),
      item(copy('2', '2', '2'), copy('左右脚踝提示位置', 'left / right ankle cue locations', '左右足首の提示位置')),
      item(copy('0', '0', '0'), copy('纠正时必须读取的屏幕', 'screens required while correcting', '修正中に読む必要がある画面'))
    ],
    machineState: copy('安全边界可见', 'BOUNDARIES VISIBLE', '境界を表示'),
    values: [50, 50], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.pantoguide,
    key: 'TASK_CONDITIONS',
    visualKind: 'conditions',
    nav: copy('参与者任务', 'PARTICIPANT TASK', '参加者課題'),
    tag: copy('06 · 先讲人做什么', '06 · START WITH THE TASK', '06 · 課題から始める'),
    title: copy('四个条件，\n每一步都可执行。', 'Four conditions. Every action is concrete.', '4つの条件、\nすべて実行可能。'),
    summary: copy('参与者不需要理解控制算法，只需要完成四段相同节奏的踩踏：自然基线、接受提示、关闭提示、体验过去自我回放。', 'The participant does not need to understand the control algorithm. They complete four same-cadence blocks: natural baseline, cue assistance, cue removal and past-self replay.', '参加者は制御アルゴリズムを理解する必要がない。同じテンポで自然基準、提示あり、提示なし、過去自己再生の4区間を行う。'),
    action: copy('按顺序完成四段，每段都保持相同任务与节奏。', 'Complete four blocks in order with the same task and cadence.', '同じ課題とテンポで4区間を順番に行う。'),
    system: copy('改变提示条件，同时保持指标与记录方式一致。', 'Change the cue condition while keeping measures and recording consistent.', '提示条件だけを変え、指標と記録方法は一定にする。'),
    check: copy('比较各阶段，而不是比较不同任务。', 'Compare phases rather than different tasks.', '異なる課題ではなく各段階を比較する。'),
    visualTitle: copy('BASELINE → CUE → NO CUE → REPLAY', 'BASELINE → CUE → NO CUE → REPLAY', 'BASELINE → CUE → NO CUE → REPLAY'),
    referenceMethod: copy('借鉴：真实使用任务开场，再比较清楚的引导条件', 'Borrowed method: begin with the real task, then compare guidance conditions', '参照方法：実際の課題から始め、案内条件を比較'),
    visualItems: [
      item(copy('自然基线', 'BASELINE', '自然基準'), copy('60秒 · 不提示', '60 s · no cue', '60秒・提示なし')),
      item(copy('提示训练', 'CUE', '提示訓練'), copy('只提示持续偏差', 'cue persistent deviation only', '持続偏差のみ提示')),
      item(copy('关闭提示', 'NO CUE', '提示なし'), copy('15圈 · 只记录', '15 turns · record only', '15回転・記録のみ')),
      item(copy('自我回放', 'REPLAY', '自己再生'), copy('过去自己的有效轨迹', 'valid past-self trace', '過去自己の有効軌跡'))
    ],
    machineState: copy('任务顺序已锁定', 'TASK ORDER LOCKED', '課題順序を固定'),
    values: [49, 51], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.linkedStick,
    key: 'REPLAY',
    visualKind: 'replay',
    nav: copy('轨迹来源', 'TRACE SOURCE', '軌跡の出所'),
    tag: copy('07 · 过去自我回放', '07 · PAST-SELF REPLAY', '07 · 過去自己再生'),
    title: copy('机器返回的是过去的我，\n还是一条相似曲线？', 'Is the machine returning past me—or a similar curve?', '機械が返すのは過去の自分か、\n似た曲線か。'),
    summary: copy('先保存同一骑行者过去表现较好的一段有效轨迹，再区分过去自己、表现匹配的他人、视觉回放与无历史条件，避免把来源身份混在一起。', 'Save a valid better trace from the same rider, then distinguish past self, performance-matched other, visual replay and no history so provenance is never confounded.', '同じ利用者の過去の良い有効軌跡を保存し、過去自己、成績を合わせた他者、視覚再生、履歴なしを区別して出所を混同しない。'),
    action: copy('体验一段明确标记来源的回放，并报告是否容易理解。', 'Experience a provenance-labelled replay and report whether it is understandable.', '出所を明示した再生を体験し、理解しやすさを報告する。'),
    system: copy('保留版本、基线、时间戳与来源身份，不把模拟他人伪装成真实数据。', 'Preserve version, baseline, timestamp and source identity; never present simulated other data as real.', '版、基準、時刻、出所を保持し、模擬他者を実データに見せない。'),
    check: copy('比较理解度、回到容差的圈数与提示剂量。', 'Compare comprehension, turns to tolerance and cue dose.', '理解度、許容範囲へ戻る回転数、提示量を比較する。'),
    visualTitle: copy('同一轨迹难度 · 不同来源与输出', 'MATCHED TRACE DIFFICULTY · DIFFERENT SOURCE AND OUTPUT', '同じ軌跡難度・異なる出所と出力'),
    referenceMethod: copy('借鉴：把另一时间或另一人的物理动作重新传回身体', 'Borrowed method: return another time or person’s physical motion to the body', '参照方法：別の時間や人の物理動作を身体へ返す'),
    visualItems: [
      item(copy('PS-H', 'PS-H', 'PS-H'), copy('过去自己 + 身体提示', 'past self + bodily cue', '過去自己 + 身体提示')),
      item(copy('MO-H', 'MO-H', 'MO-H'), copy('表现匹配他人 + 身体提示', 'matched other + bodily cue', '対応他者 + 身体提示')),
      item(copy('PS-V', 'PS-V', 'PS-V'), copy('过去自己 + 屏幕轨迹', 'past self + visual trace', '過去自己 + 視覚軌跡')),
      item(copy('NF', 'NF', 'NF'), copy('没有历史轨迹', 'no historical trace', '履歴軌跡なし'))
    ],
    machineState: copy('来源 · 过去自己', 'SOURCE · PAST SELF', '出所・過去自己'),
    values: [46, 54], cueSide: 'none', outputMode: 'replay', traceProvenance: 'past_self'
  }),
  scene({
    reference: references.decomposition,
    key: 'TIMELINE',
    visualKind: 'timeline',
    nav: copy('时间线', 'TIMELINE', '時間軸'),
    tag: copy('08 · 完整实验顺序', '08 · COMPLETE STUDY ORDER', '08 · 実験の全順序'),
    title: copy('训练只是中间，\n撤除以后才开始验证。', 'Training is the middle. Evidence starts after withdrawal.', '訓練は途中。\n撤去後に検証が始まる。'),
    summary: copy('把基线、提示训练、立即无提示、24小时保持和新节奏迁移放在同一条时间线上，防止把训练中的好表现直接叫作学习。', 'Place baseline, cue training, immediate no-cue, 24-hour retention and new-cadence transfer on one timeline so good assisted performance is not renamed learning.', '基準、提示訓練、直後の提示なし、24時間保持、新テンポ転移を同じ時間軸に置き、訓練中の好成績を学習と呼ばない。'),
    action: copy('在每个无提示节点完成相同的独立测试。', 'Complete the same independent test at every no-cue checkpoint.', '各提示なし時点で同じ自立テストを行う。'),
    system: copy('训练阶段可以提示；评估、保持与迁移阶段保持输出关闭。', 'Training may cue; assessment, retention and transfer keep output off.', '訓練では提示できるが、評価・保持・転移では出力を切る。'),
    check: copy('比较短期变化、24小时保持和新节奏迁移。', 'Compare immediate change, 24-hour retention and transfer to a new cadence.', '直後の変化、24時間保持、新テンポへの転移を比較する。'),
    visualTitle: copy('BASELINE / TRAIN / WITHDRAW / RETAIN / TRANSFER', 'BASELINE / TRAIN / WITHDRAW / RETAIN / TRANSFER', 'BASELINE / TRAIN / WITHDRAW / RETAIN / TRANSFER'),
    referenceMethod: copy('借鉴：用完整阶段时间线和目标/实际对照解释实验', 'Borrowed method: explain the study with a full phase timeline and target/actual comparison', '参照方法：全段階時間軸と目標/実際の比較で説明'),
    visualItems: [
      item(copy('基线', 'BASELINE', '基準'), copy('自然策略', 'natural strategy', '自然な戦略')),
      item(copy('训练', 'TRAIN', '訓練'), copy('提示可用', 'cue available', '提示あり')),
      item(copy('立即撤除', 'WITHDRAW', '直後撤去'), copy('无提示测试', 'no-cue test', '提示なしテスト')),
      item(copy('24小时', '24 H', '24時間'), copy('保持测试', 'retention test', '保持テスト')),
      item(copy('新节奏', 'TRANSFER', '新テンポ'), copy('迁移测试', 'transfer test', '転移テスト'))
    ],
    machineState: copy('评估阶段 · 输出关闭', 'ASSESSMENT · OUTPUT OFF', '評価段階・出力OFF'),
    values: [48, 52], cueSide: 'none', outputMode: 'off'
  }),
  scene({
    reference: references.robotLearning,
    key: 'EVIDENCE',
    visualKind: 'evidence',
    nav: copy('证据', 'EVIDENCE', '証拠'),
    tag: copy('09 · 表现不等于学习', '09 · PERFORMANCE IS NOT LEARNING', '09 · 成績は学習ではない'),
    title: copy('最后分开两件事：\n机器帮到了，还是人学会了？', 'End by separating two claims: did the machine help—or did the rider learn?', '最後に2つを分ける。\n機械が助けたか、人が学んだか。'),
    summary: copy('当前数字只是示意模拟，不是研究结果。提示存在时偏差下降，只能说明当下表现；提示撤除后仍能保持，并迁移到新节奏，才支持进一步讨论学习。', 'The current numbers are illustrative, not study findings. Lower error with the cue supports assisted performance only; retention after removal and transfer to a new cadence are required before discussing learning.', '現在の数値は説明用で研究結果ではない。提示中の誤差低下は補助時の成績のみを示す。撤去後の保持と新テンポへの転移があって初めて学習を検討できる。'),
    action: copy('先看无提示结果，再阅读训练阶段的漂亮数字。', 'Read the no-cue result before the flattering training number.', '訓練中の良い数字より先に提示なし結果を見る。'),
    system: copy('分别导出阶段、有效圈、平均偏差、提示剂量和排除原因。', 'Export phase, valid turns, mean deviation, cue dose and exclusion reasons separately.', '段階、有効回転、平均偏差、提示量、除外理由を分けて出力する。'),
    check: copy('只有真实采集且无提示改善重复出现，才进入学习效果讨论。', 'Discuss learning only after repeated real-data improvement without cues.', '実測で提示なし改善が反復した時だけ学習効果を検討する。'),
    visualTitle: copy('当下表现 ≠ 独立学习', 'ASSISTED PERFORMANCE ≠ UNAIDED LEARNING', '補助時の成績 ≠ 自立学習'),
    referenceMethod: copy('借鉴：把机械引导与视觉示范放进无辅助回忆测试', 'Borrowed method: evaluate guidance through unaided reproduction', '参照方法：機械案内を無補助再現で評価'),
    visualItems: [
      item(copy('辅助时表现', 'ASSISTED PERFORMANCE', '補助時の成績'), copy('提示打开 · 偏差可能立即下降', 'cue on · error may fall immediately', '提示ON・誤差が直ちに下がり得る')),
      item(copy('独立学习', 'UNAIDED LEARNING', '自立学習'), copy('提示关闭 · 保持 + 迁移', 'cue off · retention + transfer', '提示OFF・保持 + 転移'))
    ],
    machineState: copy('示意结果 · 等待真实验证', 'ILLUSTRATIVE · AWAITING REAL VALIDATION', '説明用・実測検証待ち'),
    values: [49, 51], cueSide: 'none', outputMode: 'off'
  })
]);

const LABELS = Object.freeze({
  zh: Object.freeze({
    close: '关闭 ×', back: '← 上一步', next: '下一步 →', restart: '重新开始 ↺', stop: '停止输出', stopped: '已停止 · 输出关闭',
    simulation: '示意模拟 · 非实验结果', stepsLabel: '九种学术展示方法', doLabel: '参与者', systemLabel: '系统', checkLabel: '观察',
    machineTitle: '当前状态', visualLabel: 'PedalBalance Echo 九场景学术演示', languageLabel: '切换语言', referenceLabel: '展示方法参考'
  }),
  en: Object.freeze({
    close: 'CLOSE ×', back: '← BACK', next: 'NEXT →', restart: 'RESTART ↺', stop: 'STOP OUTPUT', stopped: 'STOPPED · OUTPUT OFF',
    simulation: 'ILLUSTRATIVE SIMULATION · NOT A STUDY RESULT', stepsLabel: 'Nine academic presentation methods', doLabel: 'PARTICIPANT', systemLabel: 'SYSTEM', checkLabel: 'OBSERVE',
    machineTitle: 'CURRENT STATE', visualLabel: 'PedalBalance Echo nine-scene academic demonstration', languageLabel: 'Change language', referenceLabel: 'PRESENTATION REFERENCE'
  }),
  ja: Object.freeze({
    close: '閉じる ×', back: '← 前へ', next: '次へ →', restart: '最初へ ↺', stop: '出力停止', stopped: '停止済み・出力OFF',
    simulation: '説明用シミュレーション・研究結果ではない', stepsLabel: '9つの学術的提示方法', doLabel: '参加者', systemLabel: 'システム', checkLabel: '観察',
    machineTitle: '現在の状態', visualLabel: 'PedalBalance Echo 9場面の学術デモ', languageLabel: '言語を切り替える', referenceLabel: '提示方法の参照'
  })
});

function supportedLanguage(language) {
  return Object.hasOwn(LABELS, language) ? language : 'zh';
}

function localize(value, language) {
  if (Array.isArray(value)) return value.map((entry) => localize(entry, language));
  if (!value || typeof value !== 'object') return value;
  if (Object.hasOwn(value, language) && Object.hasOwn(value, 'zh') && Object.hasOwn(value, 'en') && Object.hasOwn(value, 'ja')) {
    return value[language];
  }
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, localize(entry, language)]));
}

export function getPrototypeStep(index, language = 'zh') {
  const lang = supportedLanguage(language);
  const safeIndex = Math.min(Math.max(Number.isFinite(index) ? Math.trunc(index) : 0, 0), PROTOTYPE_STEPS.length - 1);
  return Object.freeze(localize(PROTOTYPE_STEPS[safeIndex], lang));
}

export function prototypeLabels(language = 'zh') {
  return LABELS[supportedLanguage(language)];
}
