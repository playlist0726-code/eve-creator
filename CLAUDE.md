# ShotSeed → First Frame

AI 애니메이션 제작을 위한 샷 레퍼런스 데이터셋 + 워크플로우 추천 시스템,
그리고 그 위에 올라가는 1인 영화 제작 코파일럿.

---

## 🌟 최종 비전 (North Star) — First Frame

**First Frame = 1인 영화 제작기.** (SceneForge의 후속 · 리브랜딩 이름)

사용자가 **무드 · 장르 · 만들고 싶은 장면 · 내용**만 채팅으로 입력하면,
전문 애니메이션(픽사 · 디즈니)을 분석한 데이터를 근거로 다음을 생성한다:

1. 무드에 맞는 **전체 스토리**
2. **스크립트 + 스토리보드(컷 리스트)**
3. 각 컷의 **이미지 프롬프트(t2i) · 영상 프롬프트(i2v) · 제작 워크플로우**

→ 아이디어의 주인(사용자)은 이 산출물을 **활용**한다. 이미지를 직접 만들고 싶으면
받은 프롬프트로 **본인이 직접 생성**한다. First Frame는 결과물을 대신 만들어주는 게
아니라 **"어떻게 만들지 전부 설계해 깔아주는"** 시스템이다.

**핵심 차별점:** 추천의 근거가 *전문가 영상을 프레임 단위로 분석한 데이터*라는 것.
"AI가 지어낸 조언"이 아니라 "분석된 연출 지식".

### 두 가지 데이터 소스 (그라운딩)
1. **ShotSeed 데이터셋** — 미리 분석해 쌓은 미국 애니메이션(Pixar / Disney) 샷 데이터. **2D / 3D 구분.**
2. **레퍼런스 업로드** — 사용자가 레퍼런스 영상을 넣으면 *즉석 분석*(프레임 추출 → 구조화)해 반영.
   (예: `디즈니 픽사 단편 리스트/`의 Geri's Game을 이 방식으로 분석해 데이터화함.)

### 범위
- 대상: **미국 애니메이션 중심** (Pixar, Disney)
- 축: **2D / 3D** 구분
- 사람의 역할: 아이디어 소유 · 큐레이션 · 실제 생성 실행 = **1인 스튜디오**

---

## 🔧 ShotSeed (데이터 엔진) — 현재 구현

First Frame가 소비하는 데이터/추천 레이어. 지금 `index.html` 단일 파일 앱으로 구현 중.

### 목적
사용자가 원하는 스타일을 텍스트로 입력하면, 큐레이션된 샷 데이터에서 가장 잘 맞는
샷을 매칭하여 T2I · I2V · 워크플로우를 추천한다.

### 화면 구성
**화면 1 — 추천 시스템 (메인)**
- 상단 입력창: 원하는 스타일/장면을 자유 텍스트로 입력
- 키워드 스코어링으로 상위 2~3개 샷 매칭
- 결과 카드: T2I 프롬프트 / I2V 프롬프트 / 워크플로우 표시

**화면 2 — 전체 데이터 브라우저**
- 샷 목적별 필터: All / Establishing / Emotional CU / Action / Transition
- (예정) 2D / 3D 필터, 스튜디오 태그 필터
- 전체 샷을 카드 그리드로 탐색

### 매칭 알고리즘
1. 입력 텍스트 → 한·영 시노님 맵으로 키워드 정규화
2. 각 샷의 `mood + lighting + purpose + description` 필드와 단어 매칭
3. 점수 합산 → 상위 3개 반환 (동점 시 purpose 직접 매칭 우선)

### 각 샷 데이터 필드
| 필드 | 설명 |
|------|------|
| `source` | 출처 태그 (작품/스튜디오명, 예: `Pixar · Geri's Game`) |
| `dimension` | **`2d` / `3d`** (예정 — 미국 애니 2D/3D 구분) |
| `purpose` | 샷 목적 — `establishing` / `emotional_cu` / `action` / `transition` |
| `mood` | 매칭용 키워드 배열 (한·영 혼용) |
| `framing` | 프레이밍 (Wide / Medium / Close-up 등) |
| `angle` | 카메라 앵글 |
| `movement` | 카메라 무빙 |
| `lighting` | 조명/무드 설명 |
| `palette` | 색 팔레트 HEX 배열 (실제 프레임에서 추출) |
| `description` | 샷 설명 |
| `t2iPrompt` | 텍스트→이미지 프롬프트 |
| `i2vPrompt` | 이미지→영상 프롬프트 |
| `workflow` | AI 제작 워크플로우 한 줄 요약 |

### 데이터 현황
- 총 11개 샷. 그중 3개는 **실제 분석 데이터** — Pixar «Geri's Game»을
  프레임 단위로 분석(establishing / emotional_cu / transition), 팔레트는 원본 프레임에서 추출.
- 나머지는 초기 샘플. 점차 실제 분석 데이터로 교체·확장 예정.

### 분석 워크플로우 (레퍼런스 → 데이터)
1. 영상에서 프레임 추출(ffmpeg) → 컨택트시트로 대표 샷 선별
2. 원본 프레임에서 팔레트(HEX) 추출 + 프레임 직접 판독 (카메라/조명/구도)
3. ShotSeed 스키마로 구조화해 `shots` 배열에 추가
> 프레임 캐시는 프로젝트 폴더에 남기지 않는다 (데이터셋만 유지).

---

## 디자인 방향
다크 시네마틱 테마. 배경 `#0d0d0d`, 골드 포인트 `#c9a227`, 둥근 카드 UI.

## ⭐ 차별화 핵심 — The Creator's Room (Step 2)
First Frame의 "다른 차원" 차별점. 단순히 초안을 뱉는 게 아니라, **GPT-5.6가 5개 영화 크루 역할
(Director · Writer · Cinematographer · Editor · Test Audience)로 나뉘어 초안 블루프린트를
craft 데이터에 근거해 비평하고, 구체적 before/after 수정을 적용하고, 흥행 점수를 재산정**한다.
= 자기비평(reflection) 루프. 사용자는 영화가 *측정 가능하게* 좋아지는 걸 지켜본다.
- `api/creators-room.js` + `lib/crew-schema.js` + `lib/crew-prompt.js` — GPT-5.6 structured critique.
- `js/eve-crew.js` — callCrew() + 블루프린트에서 결정론적으로 유도하는 리치 폴백(오프라인 데모 보장) + applyRevisions().
- `creators_room.html` — 크루가 순차 발언, 점수 v1→v2 애니메이션, before/after diff, 개선본 저장 후 다음 단계.
- 인용은 111개 allowlist ID로만 검증 (환각 인용 제거). 점수 상승은 리비전으로 정당화(상한 +30).

## 파일 구조
```
my-short-film/
├── index.html              # System home / Intake (Step 0) — pipeline · differentiator · KB · status
├── concept_lab.html        # Concept Lab (Step 1) — idea validation + hit-potential + GPT-5.6 blueprint
├── creators_room.html      # ★ The Creator's Room (Step 2) — 5-role AI crew critique + re-score
├── shotseed.html           # ShotSeed (Step 3) — shot recommender + browser
├── storyboard.html         # Story Flow (Step 4) — storyboard sheet (twist · mise-en-scène · pacing)
├── api/                     # Vercel serverless: generate-story.js · creators-room.js (GPT-5.6)
├── lib/                     # story-schema · system-prompt · craft-knowledge · crew-schema · crew-prompt
├── js/                      # eve-api · eve-state · eve-crew (client logic + fallbacks)
├── generate_frames.py      # Auto-generate storyboard frames (OpenAI image API)
├── storyboard_data.json    # Storyboard prompts (shared by script + storyboard.html)
├── CLAUDE.md               # Project north star + spec (this file)
├── VISION.md · SYSTEM_DESIGN.md   # English vision + architecture
├── SCHEMA.md · SCHEMA_L2.md        # Dataset codebooks (Layer 1 / Layer 2)
├── RESEARCH_PLAN.md        # Research roadmap
├── knowledge/              # Layer 0 knowledge base (7 JSON datasets)
├── evaluation/             # Grounded-vs-Naive experiment (+ images)
├── storyboard_frames/      # Generated storyboard frames (beatN.png)
└── references/             # Reference media (English-named)
    ├── disney_pixar_shorts/   # Pixar/Disney short mp4s
    ├── other_shorts/
    ├── slimetime/
    └── storyboard_style_refs/
```

## 연관 제품
- **First Frame** (구 SceneForge): ShotSeed 데이터를 소비하는 1인 영화 제작 코파일럿.
  아이디어 → 스토리 → 스크립트/스토리보드 → 컷별 프롬프트.

## 다음 할 일 (로드맵)
- [ ] ShotSeed 데이터 확장 — Pixar/Disney 단편 더 분석 (2D/3D 태깅)
- [ ] `dimension`(2d/3d) 필드 + 필터 UI 추가
- [ ] 레퍼런스 업로드 → 즉석 분석 흐름
- [ ] First Frame 프로토타입: 아이디어 입력 → 스토리/스크립트/스토리보드 생성
- [ ] 케이스 스터디(포트폴리오) 패키징
