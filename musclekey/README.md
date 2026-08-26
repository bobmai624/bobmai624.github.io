# MuscleKey EMG Experiment

这是一个中文单页实验说明与交互原型，用于解释如何把前臂表面肌电转换为电脑输入并记录反应时间。

## 查看页面

直接打开 `index.html`，或在本目录运行：

```bash
python3 -m http.server 9877 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:9877/index.html`。

## 文件结构

- `index.html`：页面内容、材料清单、实验步骤、引用与未来研究价值
- `assets/css/site.css`：响应式页面样式
- `assets/js/core.js`：阈值校准、双阈值检测和结果统计
- `assets/js/app.js`：网页模拟器、CSV导出和手机导航
- `assets/images/`：本地材料与佩戴图片
- `tests/`：核心算法和浏览器页面测试
- `SOURCES.md`：论文、官方文档、代码与图片来源登记

## 重要边界

- 页面模拟器不读取真实硬件；真实串口接入属于下一步实现。
- MyoWare测量肌电活动，不直接测量握力。
- 这是非医疗、只读sEMG原型。
- 不要把廉价EMS刺激模块连接进实验线路。

