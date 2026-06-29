# FairNote

박람회 현장에서 관심 상품과 업체를 사진 중심으로 빠르게 기록하고, 행사 후 소싱 검토와 내보내기로 연결하는 로컬 우선 PWA입니다.

## 현재 원칙

- 로그인 없이 바로 시작
- 네트워크가 없어도 기록·조회 가능
- 모든 입력 항목은 선택 사항
- 한국어, 영어, 중국어 간체 지원
- 기록 화면에는 광고를 표시하지 않음
- AI 기능은 초기 버전 범위에서 제외

## 박람회 템플릿

- 일반 박람회
- 해외 소싱: 통화, MOQ, 선적·컨테이너 조건, 납기 등
- 국내 소비재: VAT, 국내 배송비, 최소 주문량
- 산업·기술: 사양, 인증, 도입 조건

모든 템플릿에서 상품 사진, 명함 사진, 가격, 배송, 포장, 연락처, 메모를 기록할 수 있습니다.

## 로컬 개발

Node.js 24 이상을 권장합니다.

```bash
npm install
npm run dev
```

검증:

```bash
npm run check
```

`check`는 ESLint, Vitest, 프로덕션 빌드, Playwright 모바일 E2E를 실행합니다. 처음 한 번은 아래 명령으로 Chromium을 설치해야 합니다.

```bash
npx playwright install chromium
```

## 데이터

기록과 사진은 IndexedDB에 저장됩니다. 기존 FairNote v1 DB는 처음 열 때 변경 전 스냅샷을 만든 후 이벤트 구조로 마이그레이션합니다.

이전 GitHub PAT/PIN 동기화 코드는 호환을 위해 아직 남아 있지만 UI와 네트워크 전송은 비활성화되어 있습니다. 선택적 계정 동기화는 별도 단계에서 Firebase 기반으로 교체할 예정입니다.

## 빌드

```bash
npm run build
```

결과물은 `dist/`에 생성됩니다. GitHub Pages 기본 경로는 `/canton-fair-app/`입니다.

## Android

Android 패키지명은 `com.harich1.fairnote`이며 Capacitor 8을 사용합니다.

```bash
npm run android:debug
npm run android:bundle
```

- 디버그 APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Play 업로드 AAB: `android/app/build/outputs/bundle/release/app-release.aab`

릴리스 빌드는 `FAIRNOTE_KEYSTORE_PROPERTIES` 환경 변수가 가리키는 외부 설정 파일을 사용한다. 업로드키와 비밀번호를 저장소에 커밋하지 않는다.

Play Console 입력 내용은 [docs/play-store-submission.md](docs/play-store-submission.md)를 따른다.
