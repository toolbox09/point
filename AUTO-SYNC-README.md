# Auto-Sync Scripts

고급 Git 자동 동기화 스크립트로 충돌 해결 기능을 포함합니다.

## 기능

- **지능형 동기화**: 브랜치 상태를 분석하여 필요한 경우에만 동작
- **자동 충돌 해결**: 특정 파일 패턴에 대한 자동 충돌 해결
- **상세 로깅**: 타임스탬프와 색상 코딩된 로그
- **설정 가능한 간격**: 동기화 체크 간격 조정 가능

## 사용법

### Windows (PowerShell)
```powershell
# 기본 실행 (3초 간격)
.\auto-sync.ps1

# 간격 조정 (5초)
.\auto-sync.ps1 -Interval 5

# 상세 로그 활성화
.\auto-sync.ps1 -Verbose

# 조합 사용
.\auto-sync.ps1 -Interval 5 -Verbose
```

### Linux/Mac (Bash)
```bash
# 기본 실행 (3초 간격)
./auto-sync.sh

# 간격 조정 (5초)
./auto-sync.sh --interval 5

# 상세 로그 활성화
./auto-sync.sh --verbose

# 조합 사용
./auto-sync.sh --interval 5 --verbose
```

## 자동 충돌 해결

### 지원하는 충돌 패턴

1. **`.claude/settings.local.json`**
   - 중복 항목 자동 제거
   - 양쪽 브랜치의 설정 통합
   - 충돌 마커 자동 정리

### 추가 가능한 패턴

스크립트를 확장하여 다른 파일 타입의 충돌도 자동 해결할 수 있습니다:

- `package.json`: 의존성 병합
- 설정 파일들: JSON/YAML 파일 병합
- 문서 파일: Markdown 충돌 해결

## 로그 출력 예시

```
[2025-09-26 21:50:00] Starting Auto-Sync (interval: 3s, verbose: false)
[2025-09-26 21:50:03] Changes detected, pulling from remote...
[2025-09-26 21:50:04] Found 1 files with conflicts
[2025-09-26 21:50:04] Attempting to resolve conflict in: .claude/settings.local.json
[2025-09-26 21:50:04] Auto-resolved conflict in .claude/settings.local.json
[2025-09-26 21:50:04] All conflicts resolved automatically (1 files)
[2025-09-26 21:50:05] Merge completed successfully
[2025-09-26 21:50:06] Merge pushed to remote
```

## 중단 방법

- **Windows**: `Ctrl+C`
- **Linux/Mac**: `Ctrl+C`

스크립트는 안전하게 중단되며 마지막 상태 메시지를 출력합니다.

## 기존 스크립트와의 차이점

| 기능 | 기존 batch/sh | 새 auto-sync |
|------|--------------|---------------|
| 간격 조정 | 고정 | 설정 가능 |
| 충돌 해결 | 수동 | 자동 |
| 브랜치 상태 분석 | 단순 | 지능형 |
| 로그 | 기본 | 상세/색상 |
| 에러 처리 | 기본 | 고급 |

## 권장 사용법

1. **개발 중**: `--interval 3 --verbose` (빠른 동기화 + 상세 로그)
2. **백그라운드**: `--interval 10` (적당한 간격)
3. **안정 환경**: `--interval 30` (보수적 간격)