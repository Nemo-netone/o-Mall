import { Link } from "wouter";
import { FUNCTIONS } from "../data/content";

export function Functions() {
  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">产品功能</span>
        <h1>核心功能与场景</h1>
        <p>围绕高F值小麦低聚肽，覆盖护肝、营养、肠道与企业原料</p>
      </header>

      {FUNCTIONS.map((f) => (
        <section key={f.title} className="cblock">
          <div className="tech-card-head">
            <span className="tech-ico" aria-hidden="true">
              {f.icon}
            </span>
            <div>
              <b>{f.title}</b>
              <p>{f.body}</p>
            </div>
          </div>
        </section>
      ))}

      <Link href="/products" className="btn btn-primary" style={{ width: "100%" }}>
        查看全部商品
      </Link>
    </div>
  );
}
