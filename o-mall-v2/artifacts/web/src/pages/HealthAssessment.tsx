import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ASSESS_SECTIONS, ASSESS_GRADE_DESC } from "../data/content";

export function HealthAssessment() {
  const [, navigate] = useLocation();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  // 拍平为 20 题，记录所属维度
  const ALL = useMemo(
    () => ASSESS_SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, section: s.name }))),
    [],
  );
  const total = ALL.length;
  const q = ALL[current]!;

  const answer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (current + 1 >= total) setDone(true);
    else setCurrent(current + 1);
  };

  const reset = () => {
    setAnswers([]);
    setCurrent(0);
    setDone(false);
  };

  // 计分：每题 (3-选项序)×5，满分 300
  const score = answers.reduce((s, a) => s + (3 - a) * 5, 0);
  const pct = Math.round((score / (total * 15)) * 100);
  const grade = pct >= 80 ? "优秀" : pct >= 65 ? "良好" : pct >= 50 ? "一般" : "需关注";
  const gradeColor = pct >= 80 ? "#2f6a52" : pct >= 65 ? "#4a8a6e" : pct >= 50 ? "#b8924b" : "#c0392b";

  // 六维得分
  const sectionScores = ASSESS_SECTIONS.map((s) => {
    const base = ALL.findIndex((x) => x.section === s.name);
    const sAns = s.questions.map((_, i) => answers[base + i] ?? 0);
    const sp = Math.round((sAns.reduce((a, v) => a + (3 - v), 0) / (s.questions.length * 3)) * 100);
    return { name: s.name, score: sp };
  });
  const weakest = sectionScores.reduce((a, b) => (a.score < b.score ? a : b));
  const strongest = sectionScores.reduce((a, b) => (a.score > b.score ? a : b));
  const recName = weakest.name === "应酬饮酒" ? "护肝肽® 醒酒冲剂" : "护肝肽® 小分子肽口服液";
  const recHref = weakest.name === "应酬饮酒" ? "/product/p2" : "/product/p3";

  if (done) {
    return (
      <div className="page">
        <header className="content-header">
          <span className="chip">健康画像测评</span>
          <h1>评测结果</h1>
          <p>评测完成，查看您的健康报告</p>
        </header>

        {/* 等级卡 */}
        <div className="grade-card" style={{ borderColor: gradeColor }}>
          <div className="grade-circle" style={{ borderColor: gradeColor, color: gradeColor }}>
            <b>{pct}</b>
            <small>分</small>
          </div>
          <div className="grade-info">
            <div className="grade-label" style={{ color: gradeColor }}>
              健康等级：{grade}
            </div>
            <div className="grade-sub">综合评估您的健康指数得分</div>
            <div className="grade-desc">{ASSESS_GRADE_DESC[grade]}</div>
          </div>
        </div>

        {/* 六维健康画像 */}
        <section className="cblock">
          <h3>六维健康画像</h3>
          {sectionScores.map((s) => (
            <div key={s.name} className="dim-row">
              <span className="dim-name">{s.name}</span>
              <span className="dim-track">
                <span
                  className="dim-fill"
                  style={{
                    width: `${s.score}%`,
                    background: s.score >= 80 ? "#2f6a52" : s.score >= 60 ? "#4a8a6e" : s.score >= 40 ? "#b8924b" : "#c0392b",
                  }}
                />
              </span>
              <span className="dim-score">{s.score}%</span>
            </div>
          ))}
          <div className="dim-footer">
            <span className="dim-tag warn">⚠ 最需关注：{weakest.name}</span>
            <span className="dim-tag good">✓ 表现最好：{strongest.name}</span>
          </div>
        </section>

        {/* 智能推荐 */}
        <div className="gold-banner rec-card">
          <div>
            <span className="rec-label">★ 智能推荐</span>
            <div className="rec-title">{recName}</div>
            <div className="rec-sub">根据您的【{weakest.name}】维度专项推荐</div>
          </div>
          <button className="rec-btn" onClick={() => navigate(recHref)}>
            查看详情 ›
          </button>
        </div>

        {/* 操作 */}
        <div className="quiz-actions">
          <button className="btn btn-ghost" onClick={reset}>
            ↻ 重新测评
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/category")}>
            去逛商城
          </button>
        </div>
        <p className="hint">本测评仅供参考，不替代医学诊断。</p>
      </div>
    );
  }

  const progress = Math.round((current / total) * 100);

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">健康画像测评</span>
        <h1>健康画像测评</h1>
        <p>{total} 题快速评估 · 科学精准</p>
      </header>

      <div className="quiz-progress-row">
        <span>
          第 <b style={{ color: "var(--c-primary)" }}>{current + 1}</b> / {total} 题
        </span>
        <span className="section-tag">{q.section}</span>
      </div>
      <div className="maturity-track" style={{ marginBottom: "1.4rem" }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <h2 className="quiz-question">{q.q}</h2>

      <div className="quiz-opts">
        {q.opts.map((opt, i) => (
          <button key={i} className="quiz-opt" onClick={() => answer(i)}>
            <span className="opt-index">{String.fromCharCode(65 + i)}</span>
            <span className="opt-text">{opt}</span>
            <span className="opt-caret" aria-hidden="true">
              ›
            </span>
          </button>
        ))}
      </div>

      <div className="quiz-dots">
        {ASSESS_SECTIONS.map((s) => {
          const start = ALL.findIndex((x) => x.section === s.name);
          const active = current >= start;
          return (
            <div key={s.name} className="quiz-dot-wrap">
              <span className={active ? "quiz-dot active" : "quiz-dot"} />
              <span className={active ? "quiz-dot-label active" : "quiz-dot-label"}>{s.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
