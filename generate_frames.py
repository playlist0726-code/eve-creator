#!/usr/bin/env python3
"""
generate_frames.py — E.V.E Creator 스토리보드 프레임 자동 생성기

storyboard_data.json의 각 프롬프트를 OpenAI 이미지 API로 생성해
storyboard_frames/beat<N>.png 로 저장한다. storyboard.html이 이를 자동 표시한다.
(원칙: 시스템이 프롬프트를 설계, 생성은 외부 API. "1인 영화 제작 코파일럿")

────────────────────────────────────────────────────────
사용법
  1) 설치:      pip install openai
  2) API 키:    export OPENAI_API_KEY="sk-..."      (Windows: set OPENAI_API_KEY=sk-...)
  3) 실행:
       python generate_frames.py             # 없는 프레임만 생성
       python generate_frames.py --force     # 전부 재생성
       python generate_frames.py --dry-run   # 프롬프트만 출력 (API 호출 X, 키 불필요)
────────────────────────────────────────────────────────
"""
import os
import sys
import json
import base64
import pathlib

ROOT = pathlib.Path(__file__).parent
DATA = ROOT / "storyboard_data.json"
OUT = ROOT / "storyboard_frames"
MODEL = "gpt-image-1"     # OpenAI 이미지 모델
SIZE = "1536x1024"        # 가로형(≈16:9) 콘티 프레임


def main():
    force = "--force" in sys.argv
    dry = "--dry-run" in sys.argv

    if not DATA.exists():
        print(f"❌ 데이터 파일이 없습니다: {DATA.name}")
        sys.exit(1)

    data = json.loads(DATA.read_text(encoding="utf-8"))
    suffix = data.get("style_suffix", "").strip()
    beats = data.get("beats", [])
    OUT.mkdir(exist_ok=True)

    client = None
    if not dry:
        key = os.environ.get("OPENAI_API_KEY")
        if not key:
            print('❌ OPENAI_API_KEY 환경변수가 없습니다.')
            print('   설정:  export OPENAI_API_KEY="sk-..."   (Windows: set OPENAI_API_KEY=sk-...)')
            print('   ※ 프롬프트만 확인하려면:  python generate_frames.py --dry-run')
            sys.exit(1)
        try:
            from openai import OpenAI
        except ImportError:
            print("❌ openai 패키지가 없습니다.  설치:  pip install openai")
            sys.exit(1)
        client = OpenAI()

    print(f"🎞  스토리보드 프레임 생성 — {len(beats)}컷 (모델: {MODEL}, 크기: {SIZE})")
    if dry:
        print("   [DRY-RUN] API를 호출하지 않고 프롬프트만 보여줍니다.\n")

    made, skipped, failed = 0, 0, 0
    for b in beats:
        n = b["n"]
        out = OUT / f"beat{n}.png"
        prompt = (b["prompt"] + ((", " + suffix) if suffix else "")).strip(", ")

        if out.exists() and not force and not dry:
            print(f"⏭  beat{n} ({b['name']}) — 이미 있음 (건너뜀, --force로 재생성)")
            skipped += 1
            continue

        print(f"🎬 beat{n} — {b['name']}")
        print(f"    {prompt}")
        if dry:
            continue

        try:
            resp = client.images.generate(model=MODEL, prompt=prompt, size=SIZE, n=1)
            b64 = resp.data[0].b64_json
            out.write_bytes(base64.b64decode(b64))
            print(f"    ✅ 저장: storyboard_frames/{out.name}")
            made += 1
        except Exception as e:
            print(f"    ⚠️  실패: {e}")
            failed += 1

    print()
    if dry:
        print("완료 (dry-run). 실제 생성은 API 키 설정 후 --dry-run 없이 실행하세요.")
    else:
        print(f"완료 — 생성 {made} · 건너뜀 {skipped} · 실패 {failed}")
        print("storyboard.html을 새로고침하면 프레임이 표시됩니다.")


if __name__ == "__main__":
    main()
