import { useState } from "react";
import { Link } from "wouter";
import { ASSESSMENT } from "../data/content";

export function HealthAssessment() {
  // 记录每题所选「选项下标」
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const questions = ASSESSMENT.questions;
  const allAnswered = Object.keys(picks).length === questions.length;

  // 计分：把选项下标映射为该选项的 score 再求和
  const total = questions.reduce((sum, q, qi) => {
    const oi = picks[qi];
    return sum + (oi !== undefined ? q.options[oi]?.score ?? 0 : 0);
  }, 0);

  // 取不超过总分的最高档位
  const result =
    [...ASSESSMENT.results].reverse().find((r) => total >= r.min) ?? ASSESSMENT.results[0]!;

  if (done) {
    return (
      <div className="page">
        <header className="content-header">
          <span className="chip">健康评测</span>
          <h1>评测结果</h1>
        </header>
        <div className="quiz-result">
          <div className="level">{result.level}</div>
          <p>{result.advice}</p>
          <Link href="/products?cat=liver" className="btn btn-gold">
            查看护肝产品
          </Link>
        </div>
        <button
          className="btn btn-ghost"
          style={{ marginTop: "1rem" }}
          onClick={() => {
            setPicks({});
            setDone(false);
          }}
        >
          重新评测
        </button>
        <p className="hint">本评测仅供参考，不替代医学诊断。</p>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">健康评测</span>
        <h1>肝脏与营养自测</h1>
        <p>{ASSESSMENT.intro}</p>
      </header>

      {questions.map((q, qi) => (
        <div key={qi} className="quiz-q">
          <b>
            {qi + 1}. {q.q}
          </b>
          <div className="quiz-opts">
            {q.options.map((o, oi) => (
              <button
                key={oi}
                className={picks[qi] === oi ? "quiz-opt sel" : "quiz-opt"}
                onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
              >
                <span className="quiz-radio" aria-hidden="true" />
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        className="btn btn-primary"
        disabled={!allAnswered}
        onClick={() => setDone(true)}
        style={{ width: "100%" }}
      >
        {allAnswered ? "查看评测结果" : `请完成全部 ${questions.length} 题`}
      </button>
    </div>
  );
}
