#!/usr/bin/env python3
"""o-Mall workspace 的最小 Trellis 上下文助手。"""

from __future__ import annotations

import argparse
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
APP_ROOT = ROOT / "o-mall-v2"


def print_current() -> None:
    print("# O-Mall Trellis 上下文")
    print()
    print(f"工作区根目录: {ROOT}")
    print(f"主项目: {APP_ROOT}")
    print("参考项目: shopTwo-main（只读参考）")
    print("部署目标: CloudBase 静态托管优先；腾讯云 Linux x64 后置")
    print()
    print("当前任务: pr1-omall-rewrite")
    print("任务说明: .trellis/tasks/pr1-omall-rewrite/prd.md")


def print_phase(step: str | None) -> None:
    print("# 工作流")
    print()
    print("完整阶段说明见 .trellis/workflow.md。")
    if step:
        print()
        print(f"请求阶段: {step}")
    print()
    print("阶段 1: 明确范围")
    print("阶段 2: 建立合同")
    print("阶段 3: 实现")
    print("阶段 4: 验证")
    print("阶段 5: 沉淀")


def print_packages() -> None:
    print("# 包和 Spec 层")
    print()
    print("- o-mall-v2 根 workspace: package.json, pnpm-workspace.yaml")
    print("- o-mall-v2/artifacts/api-server: Express API")
    print("- o-mall-v2/artifacts/web: Vite React 前端")
    print("- o-mall-v2/lib/db: Drizzle/PostgreSQL 数据层")
    print("- o-mall-v2/lib/api-spec: OpenAPI 合同")
    print()
    print("相关 spec 索引:")
    print("- .trellis/spec/guides/index.md")
    print("- .trellis/spec/workspace/index.md")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["current", "phase", "packages"], default="current")
    parser.add_argument("--step")
    args = parser.parse_args()

    if args.mode == "phase":
        print_phase(args.step)
    elif args.mode == "packages":
        print_packages()
    else:
        print_current()


if __name__ == "__main__":
    main()
