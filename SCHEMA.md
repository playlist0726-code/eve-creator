# ShotSeed — Dataset Schema & Codebook

이 문서는 ShotSeed 데이터의 **정식 스키마 + 통제 어휘(controlled vocabulary) + 라벨링 규칙**이다.
목적: 누가 분석해도 **일관되고 재현 가능한** 데이터가 되도록 기준을 고정한다.
(전문가 검증 항목 "일관성·재현성·주관성 통제"에 대한 답.)

---

## 1. 필드 정의 (each shot object)

| 필드 | 타입 | 필수 | 정의 |
|------|------|------|------|
| `id` | int | ✔ | 고유 번호 |
| `dimension` | enum | ✔ | `2d` / `3d` (미국 애니 렌더 룩 기준) |
| `verified` | bool | — | `true` = 실제 영상 프레임 분석으로 만든 데이터 (샘플 아님) |
| `title` | string | ✔ | 샷 짧은 이름 |
| `source` | string | ✔ | 출처 `스튜디오 · 작품` (예: `Pixar · Geri's Game`) |
| `purpose` | enum | ✔ | 샷 목적 — 아래 §2 |
| `mood` | string[] | ✔ | 매칭용 키워드 (한·영 혼용, ≥5개) |
| `framing` | enum-ish | ✔ | 프레이밍 — 아래 §3 |
| `angle` | string | ✔ | 카메라 앵글 — 아래 §4 |
| `movement` | string | ✔ | 카메라 무빙 — 아래 §5 |
| `lighting` | string | ✔ | 조명·무드 서술 (자유, §6 어휘 권장) |
| `palette` | hex[] | ✔ | **원본 프레임에서 추출한** HEX 4~6색 |
| `description` | string | ✔ | 샷 서술 (Level 2~3 추상화 — §7) |
| `t2iPrompt` | string | ✔ | 텍스트→이미지 프롬프트 |
| `i2vPrompt` | string | ✔ | 이미지→영상 프롬프트 (모션·길이 포함) |
| `workflow` | string | ✔ | AI 제작 워크플로우 한 줄 |

---

## 2. `purpose` — 통제 어휘 (4값 고정)

| 값 | 정의 | 판별 기준 |
|----|------|-----------|
| `establishing` | 장소·세계·상황을 설정 | 넓은 공간, 인물 작게, 배경 정보 중심 |
| `emotional_cu` | 감정을 전달하는 클로즈업 | 얼굴/눈 중심, 표정이 주체 |
| `action` | 동적 사건·움직임 | 빠른 모션, 카메라·피사체 역동 |
| `transition` | 장면/시점/시간 연결 | 매치컷·인서트·와이프 등 연결 장치 |

> 애매하면 **"이 샷이 관객에게 하는 1차 기능"** 으로 판정한다.

## 3. `framing` — 표준 어휘

`Extreme Wide` / `Wide` / `Medium Wide` / `Medium` / `Medium Close-up` / `Close-up` / `Extreme Close-up` / `Insert`
(변형은 괄호로: 예 `Close-up (3/4)`)

## 4. `angle` — 표준 어휘

`Eye Level` / `Slightly High` / `High` / `Overhead` / `Slightly Low` / `Low` / `Extreme Low` / `Dutch`
(조합 허용: 예 `Low / Table Level`)

## 5. `movement` — 표준 어휘

`Static` / `Slow Push-in` / `Pull-out` / `Pan` / `Tilt` / `Dolly` / `Tracking` / `Handheld` / `Crash Zoom` / `Rack Focus` / `Whip Pan`
(조합 허용: 예 `Static + subtle handheld`)

## 6. `lighting` — 권장 서술 축

방향(front/side/back/top) · 질감(hard/soft/diffused) · 색온도(warm/neutral/cool) · 대비(low-key/mid/high) 를 포함해 서술.

## 7. 추상화 규칙 (저작권 안전)

- 시각 서술은 **Level 2~3** (연출·구조·시그니처)만. 원본 프레임/영상은 **저장하지 않는다.**
- `palette`는 원본 프레임에서 *색만* 추출 (표현이 아니라 데이터).
- 고유명사(작품·감독)는 `source`에만.

---

## 8. 라벨링 프로토콜 (재현 절차)

1. 영상에서 프레임 추출 (`ffmpeg fps=1/N`), 컨택트시트로 대표 샷 선별.
2. 대표 프레임을 **원본 해상도로 직접 판독** — framing/angle/movement/purpose.
3. `palette`는 원본 프레임에서 **자동 추출**(quantize).
4. 위 통제 어휘(§2~5) 안에서 값 선택. 신규 값이 필요하면 이 문서에 먼저 추가.
5. `verified: true` 부여. 출처를 `source`에 기록.

> 주관성 고지: purpose·mood는 분석자 판단이 개입한다. 그래서 **통제 어휘로 범위를 제한**하고,
> 판별 기준(§2)을 명시해 재현성을 높인다. (완전 객관은 아니며, 이를 논문 Limitations에 명시한다.)

---

## 9. 버전
- v0.1 — 초기 codebook. 통제 어휘 4/8/8, 추상화 규칙, 라벨링 프로토콜 확정.
