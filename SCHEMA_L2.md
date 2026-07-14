# ShotSeed — Layer 2 Schema: Narrative & Pacing Structure

Layer 1(`SCHEMA.md`)이 **샷 단위**(이 샷은 어떻게 찍나)라면,
Layer 2는 **시간축·서사 단위** — *"감독이 이야기를 시간에 걸쳐 어떻게 흘려보내나"*.
= "감독 사고(directorial reasoning)"의 데이터화. E.V.E Creator가 스토리보드 전체를 설계하는 근거.

---

## 1. 최상위 — `filmStructure`

| 필드 | 타입 | 정의 |
|------|------|------|
| `source` | string | 분석 출처 (예: `Pixar · Geri's Game`) |
| `logline` | string | 한 줄 줄거리 |
| `total_duration` | string | 총 길이 |
| `narrative_arc` | enum | `setup_escalation_resolution` / `nested_flashback` / `parallel` / `circular` |
| `pacing_curve` | enum | `slow_build` / `steady` / `accelerating` / `staccato` |
| `hook_position` | number(0~1) | 관객을 잡는 반전/후크의 상대 위치 |
| `climax_position` | number(0~1) | 최고조 위치 |
| `beats` | Beat[] | 비트(장면 단위) 배열 — §2 |

## 2. `Beat` — 비트(연출 단위)

| 필드 | 타입 | 정의 |
|------|------|------|
| `n` | int | 순서 |
| `name` | string | 비트 이름 (예: "설정", "반전", "클라이맥스") |
| `t_start` / `t_end` | string | 시간 구간 |
| `function` | string | 이 비트의 서사 기능 |
| `tension` | number(0~1) | 긴장도 (페이싱 곡선의 y값) |
| `mood` | string[] | 무드 키워드 |
| `dominant_purpose` | enum | 이 비트의 주 샷 목적 (Layer 1 purpose) |
| `shot_pattern` | string | 감독이 이 비트에서 쓰는 전형적 샷 문법 (한 줄) |
| `mise_en_scene` | string | **미장셴** — 무대·구도·소품·블로킹·색이 *의미*를 어떻게 전달하나 (★ 가장 중요) |
| `twist` | string? | 이 비트에 트위스트가 있으면: *무엇이·어떻게 뒤집히나* + 셋업/페이오프 |
| `shot_ids` | int[] | 연결된 Layer 1 샷 (있으면) |

> **핵심 (사용자 강조):** ShotSeed가 진짜 학습·적용해야 하는 건 **① 트위스트 메커니즘**(어떻게 뒤집나)과
> **② 미장셴**(무대·구도·소품이 의미를 어떻게 실어나르나)이다. 이 둘이 "감독처럼 생각한다"의 핵심.
> `tension` 시퀀스 = 페이싱 곡선. `mise_en_scene` + `twist` = 연출의 *의도*.

## 3. 라벨링 프로토콜
1. 영상을 비트 단위로 분할(장면 전환·기능 변화 기준).
2. 각 비트의 `function`·`mood`·`dominant_purpose`를 판독.
3. `tension`은 0~1로 상대 배치(관객 체감 긴장). 후크·클라이맥스 위치 표시.
4. 비트의 전형적 샷 문법을 `shot_pattern` 한 줄로.
5. Layer 1 샷과 연결(`shot_ids`).

## 4. 실제 데이터 — «Geri's Game» (Pixar, 1997) 구조 분석

| n | 비트 | 구간 | 기능 | tension | 주 목적 | 샷 문법 |
|---|------|------|------|:---:|------|------|
| 1 | 설정 | 0:00–0:35 | 가을 공원·외로운 체스판, 세계 설정 | 0.15 | establishing | 와이드 설정샷, 정적, 따뜻한 백라이트로 톤 제시 |
| 2 | 반전 소개(hook) | 0:35–1:10 | "자기 자신과 둔다"는 반전 공개 | 0.30 | emotional_cu | OTS 왕복 + 표정 CU로 두 자아 대비 |
| 3 | 상승 | 1:10–2:30 | 공격적 자아가 압도, 소심한 쪽 몰림 | 0.55 | action | 인서트(말)·빠른 반응컷으로 압박 리듬 |
| 4 | 반전/저점 | 2:30–3:15 | 소심한 자아의 속임수(가짜 발작) | 0.78 | transition | 극적 리액션 → 판 뒤집는 연결 컷 |
| 5 | 클라이맥스 | 3:15–4:15 | 판을 뒤집고 승리 | 0.95 | action | 통쾌한 리듬, 클로즈업+와이드 교차 |
| 6 | 해소 | 4:15–4:40 | 상(틀니)을 자신에게, 흐뭇 | 0.25 | emotional_cu | 따뜻한 CU, 정적으로 여운 |

- `narrative_arc`: setup_escalation_resolution
- `pacing_curve`: slow_build → accelerating → 급해소
- `hook_position`: 0.16 (자기 자신과 둔다는 반전)
- `climax_position`: 0.78 (판을 뒤집는 순간)

> 이 표가 곧 E.V.E Creator의 "감독 문법 템플릿" — 사용자가 "따뜻한 코믹 단편"을 원하면
> 이 구조(비트·페이싱·비트별 샷 문법)를 뼈대로 새 스토리보드를 흘려보낸다.

### 4.1 트위스트 & 미장셴 심층 분석 (★ 핵심)

**트위스트 메커니즘:**
- **표면 반전:** 소심한 자아가 *가짜 심장 발작*으로 상대를 속이고 판을 돌려 이긴다 — 약자가 *힘이 아니라 속임수*로 승리.
- **심층 아이러니:** 상대는 곧 자기 자신. 이겨도 진 것도 결국 자기 — "자기와의 게임에서 스스로를 이기는" 아이러니가 웃음과 페이소스를 동시에 준다.
- **셋업 → 페이오프:** 초반(beat 2) "자기 자신과 둔다"는 반전으로 두 인격을 *심어두어야*, 후반(beat 4) "한쪽이 다른 쪽을 속인다"가 성립한다. **hook이 climax의 트위스트를 가능케 한다.**

**미장셴 모티프:**
- 마주 놓인 **두 의자·판** = 자아의 분열 (대칭 구도).
- **빈 가을 공원** = 고독 + 인생의 황혼 (계절 = 은유).
- **로우앵글 말 인서트** = 내적 위협을 물리적 크기로 치환.
- **따뜻한 백라이트·앰버 팔레트** = 노스탤지어. 상(**틀니**)의 소소함 = 유머로 무게를 덜어냄.

> 학습 포인트: 좋은 단편은 "예쁜 샷"이 아니라 **셋업↔페이오프로 짜인 트위스트**와 **의미를 실어나르는 미장셴**으로 작동한다. E.V.E Creator는 이 둘을 새 아이디어에 이식한다.

## 5. 버전
- v0.2 — Layer 2 스키마 + Geri's Game 구조 + **트위스트·미장셴 심층(§4.1)**.
- v0.1 — Layer 2 스키마 초안.
