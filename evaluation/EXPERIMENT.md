# Evaluation — Grounded vs. Naive Prompting

ShotSeed의 핵심 주장을 **측정**으로 검증하는 실험.

> **가설(H):** 동일한 장면을, ShotSeed 데이터로 조립한 *grounded 프롬프트*로 생성하면,
> 단순 묘사 *naive 프롬프트* 대비 **연출 의도(구도·조명·색·스타일)가 더 충실하고 일관된** 결과가 나온다.

---

## 실험 설계

- **대상 장면:** Geri's Game 설정샷 — "가을 공원, 자기 자신과 체스 두는 노인" (shot id 9, `establishing`, `3d`)
- **통제 변수 (동일하게 유지):** 같은 장면 내용 · 같은 모델 · 같은 종횡비 · 같은 시도 수
- **조작 변수 (이것만 다름):** 프롬프트의 *근거 유무*

### 조건 A — Naive 프롬프트
```
an old man playing chess alone in an autumn park
```
(내용만 있고 연출 정보 없음)

### 조건 B — Grounded 프롬프트 (ShotSeed 데이터로 조립)
```
cozy autumn park, a lone elderly man at a green chess table between two park benches,
red and golden foliage, warm afternoon backlight, Pixar 3D style, wide establishing shot,
painterly bokeh — palette: warm amber #9B6226, gold #D5A058, red foliage #C0392B,
green table #6B7B3A, sky #A9C8E0
```
(ShotSeed의 framing/angle/lighting/palette/style 필드를 프롬프트 층으로 재조립)

### 프롬프트 층 매핑 (grounded가 어디서 왔나)
| ShotSeed 필드 | → 프롬프트 |
|---------------|-----------|
| framing: Wide | "wide establishing shot" |
| angle: Eye Level/Slightly High | (구도 암시) |
| lighting: 따뜻한 백라이트 | "warm afternoon backlight" |
| palette: #9B6226 … | "palette: amber/gold/red/green/sky (HEX)" |
| source: Pixar | "Pixar 3D style" |

---

## 평가 기준 (비교 관점)
1. **구도 충실도** — 와이드 설정샷의 프레이밍이 나왔나
2. **조명/분위기** — 따뜻한 백라이트·황혼톤이 반영됐나
3. **색 일관성** — 가을 팔레트(앰버·레드·그린)가 살았나
4. **스타일 일관성** — 픽사풍 3D 룩인가
5. **의도성** — "우연히 나온 그림" vs "설계된 샷" 느낌

## 산출물
- `images/` — A/B 생성 이미지
- `RESULTS.md` — 나란히 비교 + 관찰 + 결론

## 한계 (정직 고지)
- 표본 소규모(장면 1~N개). 정량 지표가 아닌 **정성 비교** 중심.
- 미적 판정은 주관 개입 → 기준(위 5개)을 명시해 완화.
