# storyboard_frames/

스토리보드 시트(`../storyboard.html`)의 **프레임 그림**이 들어가는 폴더.
파일명 규칙: `beat<N>.png` (예: `beat1.png` … `beat6.png`). HTML이 자동으로 불러온다.

## 자동 생성 (권장) — `../generate_frames.py`
```
pip install openai
export OPENAI_API_KEY="sk-..."        # Windows: set OPENAI_API_KEY=sk-...
python ../generate_frames.py          # 없는 프레임만 생성
python ../generate_frames.py --force  # 전부 재생성
python ../generate_frames.py --dry-run  # 프롬프트만 확인 (키 불필요)
```
→ `../storyboard_data.json`의 프롬프트 + `style_suffix`(콘티 화풍)로 6컷을 자동 생성해 여기 저장.

## 수동
`storyboard.html`의 각 T2I 프롬프트를 GPT/DALL·E에 넣어 생성 → `beat<N>.png`로 저장.

> 화풍은 `storyboard_data.json`의 `style_suffix` 한 줄로 통일 (예: 러프 연필 콘티 / 컬러 콘티).
