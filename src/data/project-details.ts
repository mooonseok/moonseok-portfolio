import type { ProjectSlug } from '@/data/types';

/**
 * 상세 페이지 본문 데이터 (design-spec.md §3.3 — 결론 선행 템플릿).
 * 서술은 짧게: ABSTRACT가 결론을 먼저 말하고, 본문은 근거만 푼다.
 */

/** 의사결정 비교표 한 행. */
export interface DecisionRow {
  option: string;
  reason: string;
  chosen?: boolean;
}

export interface DecisionTableData {
  title: string;
  rows: DecisionRow[];
}

export interface ResultItem {
  value: string;
  description: string;
  /** 출처 각주 — 수치와 동시 노출 (불변 제약). */
  source?: string;
}

export interface ProjectDetail {
  /** 오프닝 — 문제 한 문장 (display 타이포로 페이지를 연다). */
  problemStatement: string;
  abstract: { problem: string; decision: string; result: string };
  /** 문제 산문 — 짧은 문단 1~2개. */
  problem: string[];
  decisions: DecisionTableData[];
  results: ResultItem[];
  retrospective: string;
}

export const PROJECT_DETAILS: Record<ProjectSlug, ProjectDetail> = {
  'diary-canvas': {
    problemStatement:
      '스티커·사진을 손가락 하나로 옮기고, 돌리고, 키워야 했다.',
    abstract: {
      problem: '위치·회전·크기를 제스처 간섭 없이 독립 조정하는 캔버스',
      decision:
        '단일 제어점 핸들 — 중심-제어점 벡터로 회전(atan2)과 크기(거리 비율)를 분리 계산',
      result: 'Google Play 누적 약 1만 운영¹ · 아래 데모로 직접 검증 가능',
    },
    problem: [
      '다이어리 꾸미기의 핵심은 스티커·사진 배치다. 드래그·회전·확대가 자연스러워야 하고, 제스처끼리 간섭하면 안 된다.',
      '두 손가락 핀치 전제의 기성 위젯은 한 손 조작과 정밀 제어가 어려웠다. 변형 기준점도 위젯 로컬 좌표가 아니라 전역 좌표로 풀어야 했다.',
    ],
    decisions: [
      {
        title: '제스처 모델',
        rows: [
          {
            option: '두 손가락 핀치 (기성 위젯)',
            reason: '한 손 조작 불가 · 회전과 크기가 동시에 묶여 정밀 제어 어려움',
          },
          {
            option: '회전·크기 컨트롤 분리 (버튼 2개)',
            reason: 'UI 복잡도 증가 · 터치 타깃이 작아짐',
          },
          {
            option: '단일 제어점 핸들',
            reason:
              '한 손으로 회전+크기 동시 정밀 조정 — 회전은 atan2, 크기는 중심-제어점 거리 비율로 분리 계산. 기준점은 RenderBox.localToGlobal로 전역 좌표 변환',
            chosen: true,
          },
        ],
      },
    ],
    results: [
      {
        value: '약 1만',
        description: 'Google Play 누적 다운로드 — 약 1년 운영',
        source: 'Google Play 공개 지표',
      },
      {
        value: 'pixelRatio 5.0',
        description:
          'RepaintBoundary + toImage 고해상도 캡처로 일기 화면 저장·공유',
      },
    ],
    retrospective:
      '제스처 수학을 좌표계 변환부터 직접 풀어본 경험이 이후 모든 커스텀 인터랙션의 기반이 됐다. 위 데모는 같은 수식을 웹(Pointer Events)으로 포팅한 것이다.',
  },

  'kiosk-ota': {
    problemStatement:
      '무인 키오스크는 죽어도 고쳐줄 사람이 현장에 없다.',
    abstract: {
      problem: '키오스크 이탈·업데이트 시 현장 복구 인력 부재',
      decision:
        '이벤트 기반 watchdog + 의도적/비정상 해제 플래그 분리 · OTA는 Shorebird, 네이티브 변경만 APK 폴백',
      result: 'Dart 변경 분 단위 반영¹ · 키오스크 모드를 유지한 채 업데이트',
    },
    problem: [
      '현장 단말은 지정 화면을 벗어나면 안 된다. 그런데 외부 강제 해제·OS 이벤트로 키오스크 모드가 풀릴 수 있고, 스토어 심사를 기다리면 현장 버그 대응이 늦는다.',
      '까다로운 점: OTA 설치 중에는 의도적으로 키오스크를 풀어야 한다. 무조건 재진입하는 watchdog은 업데이트 자체를 막는다.',
    ],
    decisions: [
      {
        title: 'Watchdog 감시 방식',
        rows: [
          {
            option: '주기 폴링',
            reason: '이탈-복구 사이 공백 발생 · 불필요한 주기 작업',
          },
          {
            option: '이벤트 기반 감시',
            reason:
              '이탈 즉시 반응 — 의도적 해제(OTA 중)와 비정상 해제를 플래그로 분리해 오작동 없이 복구 (Device Owner 권한)',
            chosen: true,
          },
        ],
      },
      {
        title: '업데이트 경로',
        rows: [
          {
            option: '스토어 배포만',
            reason: '심사 대기 — 현장 버그에 분 단위 대응 불가',
          },
          {
            option: 'Shorebird OTA + APK 폴백',
            reason:
              'Dart 변경은 심사 없이 분 단위 patch · 네이티브 변경 시에만 서버 APK 자동 다운로드 후 업데이트 버튼 노출 — 키오스크 모드 유지',
            chosen: true,
          },
        ],
      },
    ],
    results: [
      {
        value: '분 단위',
        description: 'Dart 코드 변경 반영 주기 — 스토어 심사 생략',
        source: 'Shorebird patch 기준',
      },
      {
        value: '자동 재진입',
        description: '외부 강제 해제 시 watchdog이 키오스크 모드 복구',
      },
    ],
    retrospective:
      '복구 로직보다 "복구하면 안 되는 순간"을 정의하는 것이 설계의 핵심이었다. 플래그 하나가 watchdog과 OTA의 충돌을 풀었다.',
  },

  'realtime-sse': {
    problemStatement:
      '현장 상태는 화면의 새로고침을 기다려주지 않는다.',
    abstract: {
      problem: '입고–가공–출고 상태를 단말에 지연 없이 반영',
      decision: 'WebSocket 대신 SSE — 단방향 푸시에 맞는 최소 복잡도, 재연결 내장 설계',
      result: '폴링 제거 · 연결이 끊겨도 자동 재연결로 스트림 복구',
    },
    problem: [
      '현장 작업자는 입고–가공–출고 흐름을 실시간으로 본다. 주기 폴링은 지연과 서버 부하를 만들고, 무인 환경 특성상 네트워크가 끊겨도 사람이 새로고침해 주지 않는다.',
    ],
    decisions: [
      {
        title: '실시간 전송 방식',
        rows: [
          {
            option: '주기 폴링',
            reason: '반영 지연 · 변화 없는 구간에도 반복 요청',
          },
          {
            option: 'WebSocket',
            reason: '양방향이 필요 없는 화면에 과한 복잡도 — 연결 관리·프로토콜 부담',
          },
          {
            option: 'SSE',
            reason:
              '단방향 푸시에 정확히 맞음 · HTTP 인프라 재사용 · 끊김 시 자동 재연결을 클라이언트에 내장',
            chosen: true,
          },
        ],
      },
    ],
    results: [
      {
        value: '지연 없는 반영',
        description: '입고–가공–출고 상태가 발생 즉시 현장 단말에 표시',
      },
      {
        value: '자동 재연결',
        description: '연결 종료 감지 후 재구독 — 무인 환경에서 사람 개입 불필요',
      },
    ],
    retrospective:
      '기술 선택은 기능 수가 아니라 요구사항의 모양에 맞춰야 한다 — 단방향이면 단방향답게. 서버 측 스트리밍도 직접 구현해 양끝을 같은 그림으로 설계했다.',
  },

  'redis-ranking': {
    problemStatement:
      '베스트 랭킹이 매 요청마다 주문 테이블 전체를 집계하고 있었다.',
    abstract: {
      problem: '랭킹 조회 비용이 주문량에 선형 증가 (orderItem 풀스캔)',
      decision: '매시간 스케줄러 사전 계산 → Redis Sorted Set 캐시 조회로 전환',
      result: '40ms → 1ms, 약 40배 단축¹ · 조회 부하를 DB에서 분리',
    },
    problem: [
      '베스트 상품 랭킹은 orderItem groupBy 집계 + 정렬로 계산됐다. 합성 데이터 50만 건 시뮬레이션에서 요청당 약 40ms — 주문이 늘수록 선형으로 느려지는 구조였다.',
    ],
    decisions: [
      {
        title: '조회 경로',
        rows: [
          {
            option: '매 요청 집계 유지',
            reason: '항상 최신이지만 비용이 주문량에 선형 증가 — 풀스캔이 병목',
          },
          {
            option: 'DB 머티리얼라이즈드 뷰',
            reason: '갱신 시점 관리 복잡 · DB 부하가 그대로 DB에 남음',
          },
          {
            option: 'Redis Sorted Set 사전 계산',
            reason:
              '조회가 상수 시간(~1ms) · 랭킹 연산(ZREVRANGE) 내장 · 조회 부하를 DB 밖으로 분리',
            chosen: true,
          },
        ],
      },
      {
        title: '갱신 전략',
        rows: [
          {
            option: '주문마다 실시간 ZINCRBY',
            reason: '쓰기 경로마다 Redis 갱신 — 결제 트랜잭션에 부가 작업 추가',
          },
          {
            option: '매시간 배치 사전 계산',
            reason:
              '랭킹 특성상 시간 단위 시의성으로 충분 — 쓰기 경로 무변경, 스케줄러 중복 실행은 분산락(SET NX)으로 방지',
            chosen: true,
          },
        ],
      },
    ],
    results: [
      {
        value: '40ms → 1ms',
        description: '랭킹 조회 응답 시간 — 약 40배 단축',
        source: '합성 데이터 50만 건 시뮬레이션 기준',
      },
      {
        value: '상수 시간',
        description: '주문량과 무관한 조회 비용 — 집계는 스케줄러로 격리',
      },
    ],
    retrospective:
      '최적화 주장은 재현 가능해야 한다 — 합성 데이터로 시뮬레이션하고 측정 조건을 수치 옆에 남겼다.',
  },
};
