# FairNote Google Play 제출 가이드

## 업로드 파일

- 앱 이름: FairNote
- 패키지 이름: `com.harich1.fairnote`
- 버전 이름: `1.0`
- 버전 코드: `1`
- 최소 Android: API 24
- 대상 Android: API 36
- AAB: `D:\FairNote-Releases\1.0\FairNote-1.0.aab`
- 업로드 키: `D:\Android\keys\fairnote-upload.jks`
- 개인정보처리방침: `https://harich1.github.io/canton-fair-app/privacy.html`

패키지 이름은 Play Console에 처음 업로드한 뒤 변경할 수 없다.

## 앱 생성

1. Play Console에서 **앱 만들기**를 누른다.
2. 앱 이름은 `FairNote`, 기본 언어는 한국어로 설정한다.
3. 앱 또는 게임은 **앱**, 무료 또는 유료는 **무료**를 선택한다.
4. 개발자 프로그램 정책과 Play App Signing 약관에 동의한다.
5. 카테고리는 **비즈니스**를 선택한다.
6. 연락처 이메일은 `rewardless@gmail.com`을 입력한다.

## 스토어 등록정보

제출용 문구 전체는 `store/play/store-listing.md`에 있다.

- 앱 아이콘: `store/play/assets/icon-512.png`
- 그래픽 이미지: `store/play/assets/feature-graphic-1024x500.png`
- 휴대전화 스크린샷: `store/play/assets/phone/`

## 앱 콘텐츠 답변

### 개인정보처리방침

`https://harich1.github.io/canton-fair-app/privacy.html`

### 앱 액세스

- 모든 기능을 제한 없이 사용할 수 있다.
- 로그인, 멤버십, 위치 또는 별도 인증이 필요하지 않다.

### 광고

- 광고 포함 여부: **아니요**

### 타겟층 및 콘텐츠

- 권장 대상: 만 18세 이상
- 아동 대상 앱: 아니요
- 폭력, 성적 콘텐츠, 약물, 도박, 공포, 욕설: 모두 없음
- 사용자 생성 콘텐츠: 없음
- 금융, 건강, 뉴스, 정부, 코로나19 관련 앱: 모두 아님

### 데이터 보안

현재 1.0 빌드 기준:

- 사용자 데이터를 기기 밖으로 수집하는가: **아니요**
- 사용자 데이터를 제3자와 공유하는가: **아니요**
- 계정 생성 기능: **없음**
- 광고 SDK: 없음
- 분석 SDK: 없음
- Firebase: 없음
- 모든 기록과 사진은 앱의 WebView 저장소(IndexedDB, localStorage)에만 저장
- CSV, ZIP, JSON 내보내기는 사용자가 직접 실행하는 기기 내 작업

Play의 정의상 기기 안에서만 처리되고 개발자 또는 제3자 서버로 전송되지 않는 데이터는 수집으로 신고하지 않는다.

### 권한

패키지에서 확인된 권한:

- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`

앱은 Android 시스템 카메라·사진 선택 화면을 호출한다. 사진은 앱 내부 저장소에만 보관되며 서버로 전송되지 않는다.

## 내부 테스트 업로드

1. **테스트 및 출시 > 내부 테스트**로 이동한다.
2. 새 출시를 만든다.
3. Play App Signing을 활성화한다.
4. `FairNote-1.0.aab`를 업로드한다.
5. 출시 이름은 `1.0-internal`로 입력한다.
6. 출시 노트는 `store/play/release-notes.md`에서 복사한다.
7. Play Console의 오류와 경고를 확인한다.
8. 테스터 이메일을 추가하고 내부 테스트로 출시한다.
9. 실제 Android 기기에서 설치해 사진, 명함, 로컬 저장, CSV·ZIP·JSON 내보내기를 확인한다.

신규 개인 개발자 계정에 비공개 테스트 요구사항이 표시되면 Play Console이 안내하는 테스터 수와 기간을 충족한 뒤 프로덕션 액세스를 신청한다.

## 업로드 키 백업

- 키 저장소: `D:\Android\keys\fairnote-upload.jks`
- 설정: `D:\Android\keys\fairnote-keystore.properties`
- 공개 인증서: `D:\Android\keys\fairnote-upload-certificate.pem`
- 인증서 SHA-256: `E7:1F:BE:2F:DA:3F:11:F1:3A:0F:AB:1A:EE:FE:30:A6:D6:01:47:79:DF:0A:62:D9:35:10:9B:1C:F9:F4:51:E4`

키 저장소와 설정 파일은 Git에 포함하지 않는다. 두 파일을 암호화된 외장 저장소 또는 비밀번호 관리자의 보안 파일 저장소에 함께 백업한다.
