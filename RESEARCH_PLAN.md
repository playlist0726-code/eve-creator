# ShotSeed / First Frame — 연구 계획 (Research Plan)

솔로 연구 프로젝트. 최종 산출물 = **연구 논문(PDF) + 라이브 데모 + 실제 제작 단편**.

---

## 0. 한 문장 기여 (Contribution)

> 전문 애니메이션(Pixar·Disney)의 연출을 **재현 가능한 구조화 데이터**로 만들어,
> AI 영상 생성을 *근거 있게(grounded)* 유도하는 **human-in-the-loop 워크플로우**를 제안하고,
> 이를 1인 영화 제작 코파일럿(First Frame)으로 구현한다.

**핵심 주장:** "근거 있는(grounded) 프롬프트가 순수 프롬프트보다 더 *의도된·일관된* 결과를 낸다."

---

## 1. 시스템 개요

```
[First Frame]  아이디어(무드·장르·장면·내용) → 스토리 → 스크립트/스토리보드 → 컷별 프롬프트
        │  (연출·스타일 판단 근거)
        ▼
[ShotSeed]  픽사/디즈니 프레임 단위 분석 데이터 (2D/3D) + 레퍼런스 즉석 분석
```

- 사람 = 아이디어 소유 · 큐레이션 · 실제 생성 실행 (1인 스튜디오)
- 시스템 = "대신 만들지 않고, 어떻게 만들지 설계해 깔아준다"

---

## 2. 논문 아웃라인 (paper skeleton)

1. **Abstract** — 문제·방법·결과 한 문단
2. **Introduction** — AI 애니메이션의 파편화·비일관성 문제, 동기, 기여
3. **Related Work** — AI 영상 생성 툴, 프롬프트 엔지니어링, 레퍼런스 기반 생성
4. **Method / System Design**
   - 4.1 ShotSeed 데이터 스키마 (프레임 단위, 필드 정의, 2D/3D)
   - 4.2 분석 파이프라인 (프레임 추출 → 팔레트 추출 → 구조화)
   - 4.3 매칭·추천 알고리즘 (키워드 정규화 · 스코어링)
   - 4.4 First Frame 흐름 (아이디어 → 스토리 → 스토리보드 → 프롬프트)
5. **Evaluation / Case Study**
   - Geri's Game 분석 (방법 재현성)
   - **Grounded vs Naive 프롬프트 비교** (핵심 실험)
   - 실제 제작 단편 (end-to-end 증명)
   - 수치: 분석한 단편 수 · 샷 수 · 필드 수
6. **Discussion** — human-in-the-loop, 저작권 안전 추상화, 한계
7. **Future Work / Conclusion / References**

---

## 3. 단계별 로드맵 (작업 목록과 연동)

| 단계 | 내용 | 산출물 |
|------|------|--------|
| P1 | 데이터셋 확장 — 단편 더 분석 (2D/3D) | shots 15~25개 |
| P2 | `dimension`(2D/3D) 필드 + 필터 UI | 앱 업데이트 |
| P3 | UI 폴리시 + 무료 배포 | **라이브 데모 URL** |
| P4 | Grounded vs Naive 비교 실험 | 비교 이미지 + 표 |
| P5 | First Frame로 실제 단편 1편 | **완성 영상** |
| P6 | 논문 작성 + PDF | **research paper** |
| P7 | 패키징 (케이스 스터디·GitHub·데모영상) | 공개·가시화 |

---

## 4. UI / 웹사이트 결정

- **논문** = PDF. 웹사이트 불필요.
- **데모** = 기존 `index.html`(ShotSeed 앱)이 곧 UI. 큰 웹사이트 안 만든다.
- **추가할 것** = 단일 HTML을 GitHub Pages/Netlify로 **무료 배포 → 공개 링크**. (클릭 데모 = 신뢰 ↑)

> 화려한 웹사이트에 시간 쓰지 않는다. 데모 배포 + 논문 + 실제 영상, 이 3개에 집중.

---

## 5. 지금 위치

- [x] ShotSeed 앱 골격 (index.html, 11샷)
- [x] 실제 분석 1편 (Geri's Game — establishing/emotional_cu/transition)
- [x] CLAUDE.md 북극성
- [ ] → 다음: P1(데이터 확장) 또는 P2(2D/3D 필터)
