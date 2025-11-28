# 안드로이드 폰에 앱 설치하기

이 앱을 안드로이드 폰에 설치하는 방법은 두 가지가 있습니다:

## 방법 1: PWA로 설치하기 (권장)

PWA(Progressive Web App)는 APK 파일 없이도 앱처럼 설치할 수 있는 웹 앱입니다.

### 필요한 것:
1. 웹 서버 (GitHub Pages, Netlify, Vercel 등)
2. HTTPS 연결 (필수)

### 설치 단계:

1. **파일을 웹 서버에 업로드**
   - GitHub Pages 사용 예시:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/사용자명/저장소명.git
     git push -u origin main
     ```
   - GitHub 저장소 Settings > Pages에서 배포

2. **안드로이드 폰에서 접속**
   - Chrome 브라우저로 배포된 URL 접속
   - 주소창 오른쪽의 ⋮ (메뉴) 클릭
   - "홈 화면에 추가" 선택
   - 앱 이름 확인 후 "추가" 클릭

3. **앱 사용**
   - 홈 화면에 생긴 아이콘을 탭하면 앱처럼 실행됩니다
   - 오프라인에서도 작동합니다

---

## 방법 2: APK 파일로 만들기

APK 파일을 만들려면 추가 도구가 필요합니다.

### 옵션 A: PWA Builder 사용 (가장 쉬움)

1. https://www.pwabuilder.com/ 접속
2. 배포된 웹사이트 URL 입력
3. "Start" 클릭
4. "Package For Stores" 탭에서 Android 선택
5. APK 다운로드

### 옵션 B: Capacitor 사용 (개발자용)

1. **Node.js 설치** (https://nodejs.org/)

2. **Capacitor 설치 및 설정**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npm install @capacitor/android
   npx cap add android
   ```

3. **Android Studio 설치**
   - https://developer.android.com/studio 에서 다운로드

4. **APK 빌드**
   ```bash
   npx cap copy
   npx cap open android
   ```
   - Android Studio에서 Build > Build Bundle(s) / APK(s) > Build APK(s)

5. **APK 파일 위치**
   - `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 추천 방법

**가장 간단한 방법**: 
1. GitHub Pages에 배포
2. 안드로이드 폰에서 Chrome으로 접속
3. "홈 화면에 추가"로 설치

이 방법은:
- APK 파일 불필요
- 자동 업데이트
- 설치 용량 적음
- 보안 승인 불필요

---

## 현재 파일 상태

다음 파일들이 준비되어 있습니다:
- `index.html` - 메인 앱
- `style.css` - 스타일
- `script.js` - 기능
- `manifest.json` - PWA 설정
- `sw.js` - 오프라인 지원

이 파일들을 웹 서버에 업로드하면 바로 사용 가능합니다!
