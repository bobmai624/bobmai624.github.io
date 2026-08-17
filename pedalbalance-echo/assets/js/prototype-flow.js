const copy = (zh, en, ja) => Object.freeze({ zh, en, ja });

export const PROTOTYPE_STEPS = Object.freeze([
  {
    key: 'QUESTION',
    nav: copy('实验目的', 'PURPOSE', '実験目的'),
    tag: copy('01 · 实验问题', '01 · EXPERIMENT QUESTION', '01 · 実験課題'),
    title: copy('提示停止以后，\n调整还会保留吗？', 'Do the cues still help after they stop?', '提示が消えた後も、\n調整は残るか？'),
    summary: copy(
      '这个实验不是给骑行者打“平衡分”。它先记录个人的自然踩踏，再提供短促的脚踝振动提示，最后关掉提示，检查调整是否仍能保持。',
      'This experiment does not give the rider a “balance score.” It records natural pedalling, trains with short ankle cues, then removes the cues to test whether the adjustment remains.',
      'この実験は「バランス点数」を付けるものではない。自然なペダリングを記録し、短い足首提示で練習した後、提示を切って調整が残るかを確かめる。'
    ),
    action: copy('依次完成：个人基线 → 提示训练 → 无提示测试 → 过去自我回放。', 'Complete four conditions: personal baseline → cue training → no-cue test → past-self replay.', '個人基準 → 提示訓練 → 提示なしテスト → 過去自己再生の順に行う。'),
    system: copy('每完整一圈比较左右相对压力；只有持续超出个人容差，才提示贡献较低的一侧。', 'Compare relative left/right pressure after each complete revolution; cue the lower side only when deviation persists beyond personal tolerance.', '1回転ごとに左右の相対圧力を比較し、個人許容範囲を継続して外れた時だけ低い側へ提示する。'),
    check: copy('核心问题：没有提示时，骑行者是否仍能更快回到自己的稳定范围？', 'Core question: without cues, can the rider still return to their own stable range more quickly?', '核心質問：提示がなくても、自分の安定範囲へより早く戻れるか？'),
    inputLabel: copy('左右相对压力 · 49 / 51', 'Relative pressure · 49 / 51', '左右相対圧力・49 / 51'),
    decisionLabel: copy('完整一圈后再判断', 'Judge after one full turn', '1回転後に判定'),
    cueLabel: copy('此阶段不输出提示', 'No cue in this stage', 'この段階では提示なし'),
    outcomeLabel: copy('要回答：提示消失后，调整是否仍保留？', 'Ask: does adjustment remain after cues stop?', '確認：提示停止後も調整は残るか？'),
    machineState: copy('实验路线预览', 'EXPERIMENT OVERVIEW', '実験全体の確認'),
    values: [49, 51], cueSide: 'none', outputMode: 'off', focus: 'outcome'
  },
  {
    key: 'SETUP',
    nav: copy('安全准备', 'SAFE SETUP', '安全準備'),
    tag: copy('02 · 设备与安全', '02 · EQUIPMENT & SAFETY', '02 · 機器と安全'),
    title: copy('先让数据可信，\n也让输出随时可停。', 'Make the signal trustworthy—and the output stoppable.', '信号を信頼でき、\n出力をいつでも止められる状態にする。'),
    summary: copy(
      '实验只在固定式室内脚踏器上进行。左右踏板与主控连接后，先做零点和同一参考重量校准；振动只是提示，不会强迫身体动作。',
      'Use a stationary indoor trainer only. After both pedals connect to the hub, calibrate zero-load and one shared reference weight. Vibration is only a cue; it never forces movement.',
      '固定式室内トレーナーだけで行う。左右ペダルとハブを接続し、無荷重と共通基準重量で校正する。振動は手掛かりであり、身体を強制的に動かさない。'
    ),
    action: copy('检查连接、电量和佩戴舒适度；确认“停止输出”按钮可用后再开始。', 'Check links, battery and comfort; confirm STOP OUTPUT works before starting.', '接続、電池、装着感を確認し、「出力停止」が機能してから開始する。'),
    system: copy('任一节点超过 500ms 未响应，就立即清空振动队列并把该圈标记为无效。', 'If either node is silent for more than 500 ms, clear the vibration queue immediately and mark that revolution invalid.', 'どちらかのノードが500msを超えて応答しなければ、振動キューを直ちに消去し、その回転を無効にする。'),
    check: copy('零点漂移与左右参考响应均通过，且任何时刻都能停止输出。', 'Zero drift and left/right reference response pass, and output can be stopped at any moment.', 'ゼロ点ドリフトと左右の基準応答が合格し、いつでも出力を停止できる。'),
    inputLabel: copy('左、主控、右 · 已连接', 'Left, hub, right · linked', '左・ハブ・右・接続済み'),
    decisionLabel: copy('校准通过且数据新鲜', 'Calibration passes; data is fresh', '校正合格・データ更新中'),
    cueLabel: copy('安全锁定 · 输出关闭', 'Safety lock · output off', '安全ロック・出力OFF'),
    outcomeLabel: copy('设备就绪，异常时自动静默', 'Ready; faults automatically silence cues', '準備完了・異常時は自動停止'),
    machineState: copy('校准与安全检查', 'CALIBRATION & SAFETY', '校正と安全確認'),
    values: [50, 50], cueSide: 'none', outputMode: 'off', focus: 'input'
  },
  {
    key: 'BASELINE',
    nav: copy('个人基线', 'BASELINE', '個人基準'),
    tag: copy('03 · 记录自然状态', '03 · RECORD NATURAL PEDALLING', '03 · 自然状態を記録'),
    title: copy('先记录这个人的\n正常踩踏。', 'Start with this rider’s normal pedalling.', 'まず、この利用者の\n普段のペダリングを記録する。'),
    summary: copy(
      '骑行者在没有提示的情况下自然踩踏 60 秒。系统按完整曲柄圈累计左右相对压力，建立个人中心和容差，不把 50:50 强行定义成“正确”。',
      'The rider pedals naturally for 60 seconds with no cues. The system accumulates relative left/right pressure per full crank revolution to set a personal centre and tolerance; 50:50 is not imposed as “correct.”',
      '提示なしで60秒間、自然にペダリングする。システムはクランク1回転ごとの左右相対圧力を集計し、個人中心と許容範囲を設定する。50:50を正解として押し付けない。'
    ),
    action: copy('保持自然节奏，不主动追求左右相等。', 'Keep a natural cadence; do not deliberately chase equal sides.', '自然なテンポを保ち、意図的に左右同じにしない。'),
    system: copy('剔除传感器超时或不完整圈，只用有效圈计算个人中心 48.6 / 51.4 与容差 ±4.0。', 'Exclude sensor timeouts and incomplete turns; use valid revolutions to calculate a 48.6 / 51.4 centre and ±4.0 tolerance.', 'センサのタイムアウトと不完全な回転を除外し、有効回転から48.6 / 51.4の中心と±4.0の許容範囲を算出する。'),
    check: copy('得到后续训练可比较的个人参照，而不是通用标准。', 'Create a personal reference for later comparison—not a universal standard.', '後の比較に使う個人基準を作り、普遍的な基準とはしない。'),
    inputLabel: copy('60 秒自然踩踏 · 49 / 51', '60 s natural pedalling · 49 / 51', '60秒の自然走行・49 / 51'),
    decisionLabel: copy('只保留完整有效圈', 'Keep complete valid turns only', '完全で有効な回転のみ採用'),
    cueLabel: copy('提示关闭', 'Cues off', '提示OFF'),
    outcomeLabel: copy('个人中心 48.6 / 51.4 · 容差 ±4.0', 'Personal centre 48.6 / 51.4 · tolerance ±4.0', '個人中心 48.6 / 51.4・許容 ±4.0'),
    machineState: copy('正在建立个人基线', 'CAPTURING BASELINE', '個人基準を記録中'),
    values: [49, 51], cueSide: 'none', outputMode: 'off', focus: 'input'
  },
  {
    key: 'TRAINING',
    nav: copy('提示训练', 'CUE TRAINING', '提示訓練'),
    tag: copy('04 · 有提示训练', '04 · TRAIN WITH CUES', '04 · 提示あり訓練'),
    title: copy('偏差持续存在时，\n提示较低的一侧。', 'When deviation persists, cue the lower side.', '偏りが続いた時、\n低い側へ提示する。'),
    summary: copy(
      '当前完整一圈为左 43.8、右 56.2，连续超出个人容差。系统向左脚踝发出一次 180ms 的短振动，然后进入冷却；骑行者自己完成调整。',
      'The current full revolution is left 43.8, right 56.2 and remains beyond personal tolerance. The system sends one 180 ms vibration to the left ankle, then cools down; the rider makes the adjustment.',
      '現在の1回転は左43.8、右56.2で、個人許容範囲を継続して外れている。左足首へ180msの短い振動を1回送り、その後クールダウンする。調整するのは利用者自身である。'
    ),
    action: copy('保持节奏；感觉到左脚踝提示后，自主微调下一圈的踩踏。', 'Hold cadence; after the left-ankle cue, adjust the next revolution yourself.', 'テンポを保ち、左足首の提示後に次の回転を自分で微調整する。'),
    system: copy('等待完整一圈 → 检查数据质量 → 比较个人容差 → 只在持续偏差时提示。', 'Wait for a full turn → validate the signal → compare with personal tolerance → cue only persistent deviation.', '1回転を待つ → 信号品質を確認 → 個人許容範囲と比較 → 持続する偏りだけ提示する。'),
    check: copy('记录回到容差所需圈数，以及一共给了多少次提示。', 'Record revolutions needed to return inside tolerance and the total cue dose.', '許容範囲へ戻るまでの回転数と、提示総量を記録する。'),
    inputLabel: copy('完整一圈 · 左 43.8 / 右 56.2', 'Full turn · left 43.8 / right 56.2', '1回転・左43.8 / 右56.2'),
    decisionLabel: copy('连续超出个人容差', 'Persistently outside personal tolerance', '個人許容範囲を継続して超過'),
    cueLabel: copy('左脚踝 · 短振动 180ms', 'Left ankle · 180 ms brief cue', '左足首・短い振動180ms'),
    outcomeLabel: copy('下一圈由骑行者主动调整', 'Rider adjusts the next turn', '次の回転を利用者が自ら調整'),
    machineState: copy('提示训练进行中', 'CUE TRAINING ACTIVE', '提示訓練中'),
    values: [44, 56], cueSide: 'left', outputMode: 'cue', focus: 'cue'
  },
  {
    key: 'NO_CUE',
    nav: copy('关闭提示', 'NO-CUE TEST', '提示なし'),
    tag: copy('05 · 无提示测试', '05 · TEST WITHOUT CUES', '05 · 提示なしテスト'),
    title: copy('现在关掉提示，\n看调整能否留下来。', 'Now remove the cues and test what remains.', '提示を切り、\n調整が残るかを確かめる。'),
    summary: copy(
      '训练后立即关闭所有振动，但继续记录 15 个完整圈。只有这一段才能区分“装置当下帮得上忙”和“骑行者短时间内学会了调整”。',
      'Immediately after training, all vibration stops while 15 complete revolutions are still recorded. Only this phase separates “the device helps now” from “the rider briefly retains the adjustment.”',
      '訓練直後にすべての振動を停止し、さらに15回転を記録する。この段階で初めて「装置がその場で助けた」と「利用者が短時間調整を保持した」を区別できる。'
    ),
    action: copy('继续以相同节奏踩踏 15 圈，不会再收到脚踝提示。', 'Continue for 15 turns at the same cadence; no ankle cue will be sent.', '同じテンポで15回転続ける。足首提示は送られない。'),
    system: copy('只记录，不干预；保留有效圈、偏差和回到个人容差所需圈数。', 'Record without intervening; retain valid turns, deviation and turns needed to re-enter personal tolerance.', '介入せず記録のみ行い、有効回転、偏差、個人許容範囲へ戻る回転数を保持する。'),
    check: copy('如果无提示阶段仍比基线更快回到容差，才有短期保留的初步迹象。', 'If the no-cue phase returns inside tolerance faster than baseline, there is preliminary evidence of short-term retention.', '提示なし段階で基準時より早く許容範囲へ戻れば、短期保持の初期的な兆候となる。'),
    inputLabel: copy('无提示第 12 / 15 圈 · 47 / 53', 'No-cue turn 12 / 15 · 47 / 53', '提示なし12 / 15回転・47 / 53'),
    decisionLabel: copy('记录并比较，不触发提示', 'Record and compare; never cue', '記録と比較のみ・提示しない'),
    cueLabel: copy('脚踝输出关闭', 'Ankle output off', '足首出力OFF'),
    outcomeLabel: copy('观察是否独立回到个人容差', 'Observe independent return to tolerance', '自力で許容範囲へ戻るか観察'),
    machineState: copy('无提示测试进行中', 'NO-CUE TEST ACTIVE', '提示なしテスト中'),
    values: [47, 53], cueSide: 'none', outputMode: 'off', focus: 'outcome'
  },
  {
    key: 'REPLAY',
    nav: copy('自我回放', 'SELF REPLAY', '自己再生'),
    tag: copy('06 · 过去自我回放', '06 · PAST-SELF REPLAY', '06 · 過去自己再生'),
    title: copy('再与过去表现较好的\n一段自己比较。', 'Then compare with a better past version of yourself.', '次に、過去の良い自分の\n走行と比較する。'),
    summary: copy(
      '系统回放同一骑行者过去表现较好的一段轨迹，并明确标记来源。它测试“与自己的历史节奏比较”是否比普通纠偏信号更容易理解。',
      'The system replays a better segment from the same rider and keeps its provenance visible. This tests whether comparison with one’s own history is easier to understand than a generic correction signal.',
      '同じ利用者の過去の良い区間を、出所を明示して再生する。一般的な修正信号より、自分の履歴との比較の方が理解しやすいかを確かめる。'
    ),
    action: copy('跟随过去自己的节奏完成一段短回放，并说明它是否容易理解。', 'Follow a short past-self replay and report whether it is easy to understand.', '過去自己の短い再生に合わせ、理解しやすいかを報告する。'),
    system: copy('只调用标记为“过去自己”的轨迹；不会把模拟的“他人”数据伪装成真实参与者。', 'Use only a trace labelled “past self”; never disguise a simulated “other” as real participant data.', '「過去自己」と明示した軌跡だけを使い、模擬の「他者」を実参加者データに見せかけない。'),
    check: copy('比较理解度、回到容差的圈数和提示剂量，不预设回放一定更好。', 'Compare comprehension, turns to tolerance and cue dose without assuming replay must be better.', '理解度、許容範囲へ戻る回転数、提示量を比較し、再生の方が優れると決めつけない。'),
    inputLabel: copy('来源 · 过去自己 / 第 02 次', 'Source · past self / session 02', '出所・過去自己 / セッション02'),
    decisionLabel: copy('对齐当前圈与历史轨迹', 'Align current turn with stored trace', '現在の回転と保存軌跡を整合'),
    cueLabel: copy('按历史节奏给出引导', 'Guide from the stored rhythm', '保存リズムから案内'),
    outcomeLabel: copy('比较是否更易理解与保持', 'Compare comprehension and retention', '理解しやすさと保持を比較'),
    machineState: copy('过去自我回放', 'PAST-SELF REPLAY', '過去自己再生'),
    values: [46, 54], cueSide: 'none', outputMode: 'replay', focus: 'decision', traceProvenance: 'past_self'
  },
  {
    key: 'RESULTS',
    nav: copy('结果比较', 'RESULTS', '結果比較'),
    tag: copy('07 · 比较与导出', '07 · COMPARE & EXPORT', '07 · 比較と出力'),
    title: copy('最后比较阶段，\n而不是只看一个分数。', 'Compare the phases—not one flattering score.', '最後に、単一の点数ではなく\n各段階を比較する。'),
    summary: copy(
      '结果页并列显示基线、提示训练、无提示测试和自我回放。它导出逐圈值、无效原因、提示次数与轨迹来源；当前页面中的数字仍是演示数据，不是实验结论。',
      'The results view compares baseline, cue training, no-cue testing and self replay. It exports per-turn values, invalid reasons, cue count and trace provenance; the numbers shown here remain illustrative, not study findings.',
      '結果画面では基準、提示訓練、提示なしテスト、自己再生を並べて比較する。回転ごとの値、無効理由、提示回数、軌跡出所を出力する。ここに示す数値は説明用であり、研究結果ではない。'
    ),
    action: copy('查看各阶段差异，并导出原始逐圈记录供后续检查。', 'Review differences between phases and export the per-turn record for inspection.', '各段階の差を確認し、検証用に回転ごとの記録を出力する。'),
    system: copy('分别报告有效圈比例、平均偏差、回到容差所需圈数、提示剂量和排除原因。', 'Report valid-turn rate, mean deviation, turns to tolerance, cue dose and exclusion reasons separately.', '有効回転率、平均偏差、許容範囲へ戻る回転数、提示量、除外理由を個別に報告する。'),
    check: copy('只有真实采集后，无提示阶段优于基线且重复出现，才支持进一步讨论学习效果。', 'Only repeated real-data improvement in the no-cue phase over baseline supports further discussion of learning.', '実測で提示なし段階が基準より良い結果を繰り返した場合に限り、学習効果をさらに検討できる。'),
    inputLabel: copy('4 个阶段 · 逐圈记录', '4 phases · per-turn records', '4段階・回転別記録'),
    decisionLabel: copy('按同一指标并列比较', 'Compare with the same measures', '同じ指標で並列比較'),
    cueLabel: copy('结果页不输出提示', 'No output on results', '結果画面では出力なし'),
    outcomeLabel: copy('演示结果 · 等待真实采集验证', 'Illustrative result · awaiting real collection', '説明用結果・実測による検証待ち'),
    machineState: copy('证据已整理', 'EVIDENCE READY', '証拠を整理済み'),
    values: [49, 51], cueSide: 'none', outputMode: 'off', focus: 'outcome'
  }
]);

const LABELS = Object.freeze({
  zh: Object.freeze({
    close: '关闭 ×', back: '← 上一步', next: '下一步 →', restart: '重新开始 ↺', stop: '停止输出', stopped: '已停止 · 输出关闭',
    simulation: '示意模拟 · 非实验结果', stepsLabel: '实验阶段', doLabel: '你要做什么', systemLabel: '系统在做什么', checkLabel: '这一阶段看什么',
    inputTitle: '01 输入', decisionTitle: '02 判断', cueTitle: '03 提示', outcomeTitle: '04 观察', machineTitle: '当前状态',
    visualLabel: '从脚下输入到实验观察的示意流程', languageLabel: '切换语言'
  }),
  en: Object.freeze({
    close: 'CLOSE ×', back: '← BACK', next: 'NEXT →', restart: 'RESTART ↺', stop: 'STOP OUTPUT', stopped: 'STOPPED · OUTPUT OFF',
    simulation: 'ILLUSTRATIVE SIMULATION · NOT A STUDY RESULT', stepsLabel: 'Experiment stages', doLabel: 'WHAT YOU DO', systemLabel: 'WHAT THE SYSTEM DOES', checkLabel: 'WHAT THIS STAGE CHECKS',
    inputTitle: '01 INPUT', decisionTitle: '02 DECISION', cueTitle: '03 CUE', outcomeTitle: '04 OBSERVATION', machineTitle: 'CURRENT STATE',
    visualLabel: 'Illustrative flow from pedal input to experimental observation', languageLabel: 'Change language'
  }),
  ja: Object.freeze({
    close: '閉じる ×', back: '← 前へ', next: '次へ →', restart: '最初へ ↺', stop: '出力停止', stopped: '停止済み・出力OFF',
    simulation: '説明用シミュレーション・研究結果ではない', stepsLabel: '実験段階', doLabel: '利用者がすること', systemLabel: 'システムがすること', checkLabel: 'この段階で確かめること',
    inputTitle: '01 入力', decisionTitle: '02 判定', cueTitle: '03 提示', outcomeTitle: '04 観察', machineTitle: '現在の状態',
    visualLabel: 'ペダル入力から実験観察までの説明用フロー', languageLabel: '言語を切り替える'
  })
});

function supportedLanguage(language) {
  return Object.hasOwn(LABELS, language) ? language : 'zh';
}

export function getPrototypeStep(index, language = 'zh') {
  const lang = supportedLanguage(language);
  const safeIndex = Math.min(Math.max(Number.isFinite(index) ? Math.trunc(index) : 0, 0), PROTOTYPE_STEPS.length - 1);
  const step = PROTOTYPE_STEPS[safeIndex];
  const view = {};
  for (const [field, value] of Object.entries(step)) {
    view[field] = value && typeof value === 'object' && !Array.isArray(value) && Object.hasOwn(value, lang) ? value[lang] : value;
  }
  return Object.freeze(view);
}

export function prototypeLabels(language = 'zh') {
  return LABELS[supportedLanguage(language)];
}
