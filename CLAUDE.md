# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React + TypeScript + Vite project with the React Compiler enabled. The main application is located in the `point-web/` directory.

### Key Architecture Points

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (using rolldown-vite override for performance)
- **React Compiler**: Enabled via babel-plugin-react-compiler for automatic optimization
- **Package Manager**: Uses pnpm with specific overrides

## Common Development Commands

All commands should be run from the `point-web/` directory:

```bash
cd point-web

# Development server with HMR
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview
```

## Development Setup

1. Navigate to the `point-web` directory
2. Install dependencies with `npm install` (or `pnpm install`)
3. Run `npm run dev` to start development server
4. The app uses Vite's HMR for fast refresh during development

## Code Quality

- **ESLint Configuration**: Uses modern flat config with TypeScript, React hooks, and React refresh rules
- **TypeScript**: Project uses TypeScript with separate configs for app and node environments
- **React Compiler**: Automatically optimizes React components for performance (may impact dev/build performance)

## Worker Patterns

### 워커1 표준 작업 플로우 (패턴화됨)
AI 자동 병합 시스템을 사용하는 환경에서의 표준 워크플로우:

```bash
# 1. 작업 전 리베이스로 최신 동기화
git fetch origin && git rebase origin/main

# 2. 독립 작업 브랜치 생성
git checkout -b worker1-[feature-name]

# 3. 컴포넌트/기능 구현
# - TypeScript 컴포넌트 작성
# - CSS 스타일링
# - App.tsx에 예제 통합

# 4. 커밋 및 푸시
git add [files]
git commit -m "Add [feature]: [description]"
git push -u origin worker1-[feature-name]

# 5. main 브랜치 병합
git checkout main
git pull origin main  # 다른 워커 변경사항 동기화
git merge worker1-[feature-name]  # 충돌 시 수동 해결
git push origin main
git branch -d worker1-[feature-name]  # 정리
```

### 주요 원칙
- **충돌 방지**: 작업 전 항상 리베이스로 동기화
- **독립성**: 각 워커는 독립된 브랜치에서 작업
- **일관성**: 컴포넌트 구조와 명명 규칙 유지
- **통합성**: App.tsx에 실제 사용 예제 포함

### 컴포넌트 패턴
- `src/components/[ComponentName].tsx` - 메인 컴포넌트
- `src/components/[ComponentName].css` - 전용 스타일시트
- TypeScript Props 인터페이스 정의
- 크기/변형/상태 옵션 제공
- 접근성 고려 (focus, disabled 등)

## Important Notes

- The project uses `rolldown-vite` instead of standard Vite for improved performance
- React Compiler is enabled, which may impact development and build times but provides automatic React optimizations
- ESLint is configured for TypeScript and React with recommended rules for hooks and refresh
- **워커1 패턴**: 위의 표준 플로우를 항상 따라 일관성 유지