# FairNote Google Play 제출 가이드

## 빌드 정보

- 앱 이름: FairNote
- 패키지명: `com.harich1.fairnote`
- 버전 이름: `1.0`
- 버전 코드: `1`
- 최소 Android: API 24
- 대상 Android: API 36
- 업로드 파일: `D:\FairNote-Releases\1.0\FairNote-1.0.aab`
- AAB SHA-256: `F040912B5A0CCF996FB40CFC4E73AA7A5DC91EA48FFD94D7D49CD2885A281A14`

패키지명은 Play Console에 처음 업로드한 후 변경할 수 없다.

## Play Console 앱 생성

1. Play Console에서 **앱 만들기**를 선택한다.
2. 앱 이름은 `FairNote`로 입력한다.
3. 기본 언어는 한국어로 지정한다.
4. 앱/게임은 **앱**, 가격은 **무료**로 선택한다.
5. 사용자 문의 이메일을 입력한다.
6. 정책 및 Play App Signing 약관에 동의한다.

## 권장 스토어 분류

- 카테고리: 비즈니스
- 태그: 생산성, 재고/상품 관리, 비즈니스 도구
- 대상 연령: 만 18세 이상
- 광고 포함 여부: 아니요
- 앱 접근 권한: 모든 기능을 로그인 없이 이용 가능

## 한국어 스토어 문구

### 짧은 설명

박람회 현장에서 상품·가격·배송·명함을 사진과 함께 빠르게 기록하세요.

### 자세한 설명

FairNote는 박람회와 전시회 현장에서 관심 상품과 업체 정보를 빠르게 기록하는 현장 노트입니다.

상품 사진과 명함 사진을 먼저 촬영하고 가격, 배송, 포장, MOQ, 납기와 메모를 필요할 때 보완할 수 있습니다. 모든 입력 항목은 선택 사항이며 로그인이나 인터넷 연결 없이 바로 사용할 수 있습니다.

주요 기능:

- 상품 사진과 명함 사진 기록
- 가격, 배송, 포장, 연락처와 메모 관리
- 일반 박람회, 해외 소싱, 국내 소비재, 산업·기술 템플릿
- 한국어, 영어, 중국어 간체 지원
- 인터넷이 없는 현장에서도 오프라인 저장
- CSV, 사진 ZIP, JSON 백업 내보내기

기록은 사용자의 기기에 저장됩니다. 현재 버전은 계정이나 클라우드 동기화를 사용하지 않습니다.

## 영어 스토어 문구

### Short description

Capture products, prices, delivery details and business cards at trade fairs.

### Full description

FairNote is a field notebook for capturing products and supplier information at trade fairs and exhibitions.

Take product and business-card photos first, then add price, delivery, packaging, MOQ, lead time and notes when needed. Every field is optional, and the app works immediately without an account or internet connection.

Key features:

- Product and business-card photos
- Price, delivery, packaging, contact and notes
- General, overseas sourcing, consumer and industrial templates
- Korean, English and Simplified Chinese
- Offline-first local storage
- CSV, photo ZIP and JSON backup export

Records stay on the user's device. The current version does not use accounts or cloud sync.

## 중국어 간체 스토어 문구

### 简短说明

在展会现场快速记录商品、价格、配送、包装和名片。

### 完整说明

FairNote 是用于展会和展览现场的商品与供应商记录工具。

您可以先拍摄商品和名片照片，之后再补充价格、配送、包装、MOQ、交货期和备注。所有字段均为可选，无需账号或网络即可立即使用。

主要功能：

- 商品和名片照片
- 价格、配送、包装、联系人和备注
- 普通展会、海外采购、国内消费品、工业技术模板
- 支持韩语、英语和简体中文
- 离线优先的本地存储
- 导出 CSV、照片 ZIP 和 JSON 备份

记录保存在用户设备上。当前版本不使用账号或云同步。

## 앱 콘텐츠 답변

### 개인정보처리방침

- URL: `https://harich1.github.io/canton-fair-app/privacy.html`
- 작업 브랜치의 최신 개인정보처리방침을 `master`에 배포한 뒤 사용한다.

### 데이터 안전성

현재 1.0 빌드 기준:

- 앱이 사용자 데이터를 기기 밖으로 수집하는가: 아니요
- 사용자 데이터를 제3자와 공유하는가: 아니요
- 계정 생성 기능: 없음
- 데이터 삭제: Android 설정에서 FairNote의 저장공간/앱 데이터를 삭제하면 전체 삭제 가능
- 사진과 입력 정보: 기기 내부 IndexedDB에서만 처리
- 광고 SDK: 없음
- 분석 SDK: 없음
- Firebase: 없음

Play Console의 데이터 안전성 양식은 앱이 데이터를 수집하지 않더라도 제출해야 한다.

### 권한

패키지에서 확인된 권한:

- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`

카메라 앱과 시스템 사진 선택기를 호출하지만 민감한 카메라 권한은 패키지에 직접 선언하지 않는다.

### 기타 항목

- 로그인 필요: 아니요
- 광고 포함: 아니요
- 정부/금융/의료 앱: 아니요
- 뉴스 앱: 아니요
- 아동 대상 앱: 아니요
- 콘텐츠 등급: 폭력, 성적 콘텐츠, 도박, 약물 등 모두 없음

## 첫 업로드 순서

1. **테스트 및 출시 > 내부 테스트**로 이동한다.
2. 새 출시를 만든다.
3. Play App Signing을 활성화한다.
4. `FairNote-1.0.aab`를 업로드한다.
5. 출시 이름을 `1.0-internal`로 입력한다.
6. 출시 노트에 `FairNote 최초 내부 테스트 버전`을 입력한다.
7. 오류와 경고를 확인하고 내부 테스트로 출시한다.
8. 실제 Android 기기에서 설치 후 사진, 명함, 저장, 재실행, 내보내기를 확인한다.
9. 신규 개인 개발자 계정이면 비공개 테스트에 12명을 등록하고 14일 연속 유지한다.
10. 테스트 피드백을 정리한 후 프로덕션 접근을 신청한다.

## 아직 필요한 스토어 그래픽

- Play Store 앱 아이콘
- 휴대전화 스크린샷
- 1024×500 소개 그래픽

그래픽은 실제 Android 기기 QA가 끝난 뒤 최종 화면으로 제작한다.

## 업로드키

- 키: `D:\Android\keys\fairnote-upload.jks`
- 설정: `D:\Android\keys\fairnote-keystore.properties`
- 공개 인증서: `D:\Android\keys\fairnote-upload-certificate.pem`
- 인증서 SHA-256: `E7:1F:BE:2F:DA:3F:11:F1:3A:0F:AB:1A:EE:FE:30:A6:D6:01:47:79:DF:0A:62:D9:35:10:9B:1C:F9:F4:51:E4`

키와 설정 파일은 Git에 포함되지 않는다. 두 파일을 별도의 안전한 저장소에 함께 백업해야 한다.
