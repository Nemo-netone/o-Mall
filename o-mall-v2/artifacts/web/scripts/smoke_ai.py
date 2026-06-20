from pathlib import Path
import re

from playwright.sync_api import expect, sync_playwright


base = "http://127.0.0.1:5173"
out_dir = Path("test-results")
out_dir.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    page.goto(base)
    page.wait_for_load_state("networkidle")
    page.screenshot(path=str(out_dir / "bottom-nav-mobile.png"), full_page=False)

    ai_button = page.get_by_role("button", name="打开 AI 健康顾问")
    expect(ai_button).to_be_visible()
    ai_button.click()

    expect(page.get_by_role("heading", name="AI 健康顾问")).to_be_visible()
    expect(page.get_by_text("智能选品与健康问答")).to_be_visible()

    page.get_by_label("输入问题").fill("经常应酬喝酒，推荐哪款？")
    page.get_by_role("button", name="发送").click()
    expect(page.get_by_text("推荐商品")).to_be_visible(timeout=5000)
    expect(page.get_by_text("本地商品库回答")).to_be_visible()

    page.screenshot(path=str(out_dir / "ai-assistant-mobile.png"), full_page=True)

    page.locator(".ai-recos .ai-light-btn").first.click()
    page.wait_for_load_state("networkidle")
    expect(page).to_have_url(re.compile(r".*/#/product/.+"))

    browser.close()
