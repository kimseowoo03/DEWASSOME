import { useState, useEffect } from "react";

const chapters = [
  {
    title: "기본 정보",
    questions: [
      {
        q: "연령대가 어떻게 되나요?",
        options: ["10대", "20대", "30대", "40대", "50대 이상"],
      },
      {
        q: "성별이 어떻게 되나요?",
        options: ["남성", "여성"],
      },
      {
        q: "피부 고민이 있다면 어떤건가요?",
        options: ["없음", "건성", "지성", "민감", "주름"],
      },
      {
        q: "피부 타입이 어떻게 되나요?",
        options: ["모름", "건성", "지성", "복합성", "민감성"],
      },
    ],
  },
  {
    title: "생활 습관 & 스트레스 (기초 체력 기반 환경)",
    questions: [
      {
        q: "하루 평균 수면 시간은 어느 정도인가요?",
        options: ["7시간 이상", "6~7시간", "5~6시간", "4~5시간", "4시간 미만"],
      },
      {
        q: "최근 2주간 스트레스를 얼마나 자주 느끼셨나요?",
        options: ["없음", "가끔", "종종", "자주", "항상"],
      },
      {
        q: "평소 식습관은 어느 정도 균형 잡혀 있다고 생각하시나요?",
        options: ["매우균형", "균형", "보통", "불균형", "매우 불균형"],
      },
      {
        q: "하루 물 섭취량은 어느 정도인가요?",
        options: ["충분히 섭취함", "적절히 섭취함", "불충분", "거의 안 마심", "전혀 안 마심"],
      },
      {
        q: "피로감이 피부 상태에 영향을 준다고 느끼시나요?",
        options: ["없음", "가끔", "종종", "자주", "항상"],
      },
    ],
  },
  {
    title: "회복력 & 탄력 (피부 복원력 지표)",
    questions: [
      {

        q: "피부를 눌렀을 때 복원되는 속도는?",
        options: ["즉시", "거의 바로", "약간 시간", "느림", "자국 오래"],

      },
      {

        q: "베개 자국 지속 시간은?",
        options: ["거의 없음", "5분 이내", "10~20분", "30분 이상", "1시간 이상"],

      },
      {

        q: "세안 후 피부 회복 속도는?",
        options: ["즉시 편안", "빠르게 회복", "약간 시간", "당김 지속", "오래 불편"],

      },
      {

        q: "피부 탄력 정도는?",
        options: ["매우 탄탄", "탄력 있음", "보통", "부족", "많이 처짐"],
      },
      {
        q: "피부 회복력 (컨디션 저하 시)은?",
        options: ["영향 없음", "약간 느림", "눈에 띄게 느림", "많이 느림", "거의 회복 안됨"],
      }
    ]
  },
  {
    title: "민감도 (피부 방어력 지표)",
    questions: [
      {
        q: "평소 피부 민감도는?",
        options: ["전혀 없음", "거의 없음", "보통", "민감", "매우 민감"],
      },
      {
        q: "홍조 발생 빈도는?",
        options: ["거의 없음", "가끔", "종종", "자주", "거의 항상"],
      },
      {
        q: "새 화장품 사용 시 반응은?",
        options: ["문제 없음", "가끔 반응", "절반 반응", "자주 트러블", "항상 문제"],
      },
      {
        q: "온도 변화에 대한 반응은?",
        options: ["영향 없음", "약간 반응", "보통", "민감 반응", "심하게 반응"],
      },
      {
        q: "외부 자극에 대한 반응은?",
        options: ["거의 없음", "약간 있음", "보통", "자주 자극", "매우 심함"],
      }
    ]
  },
  {
    title: "장벽 & 보습 유지력 (피부 기초 체력 핵심)",
    questions: [
      {
        q: "세안 후 피부 당김 정도는?",
        options: ["전혀 없음", "거의 없음", "약간 당김", "많이 당김", "매우 심함"],
      },
      {
        q: "하루 동안 건조함 빈도는?",
        options: ["전혀 없음", "거의 없음", "가끔", "자주", "지속됨"],
      },
      {
        q: "보습 유지 지속력은?",
        options: ["하루 종일", "오래 유지", "보통", "금방 사라짐", "거의 없음"],
      },
      {
        q: "각질/트러블 발생 정도는?",
        options: ["전혀 없음", "거의 없음", "가끔", "자주", "매우 심함"],
      },
      {
        q: "피부 컨디션 유지력은?",
        options: ["항상 안정", "비교적 안정", "보통", "쉽게 무너짐", "매우 불안정"],
      }
    ]
  },
];

export default function App() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [answers, setAnswers] = useState(
    chapters.map((c) => c.questions.map(() => null))
  );
  const [result, setResult] = useState(false);

  const select = (qIndex, optIndex) => {
    const newAnswers = [...answers];
    newAnswers[chapterIndex][qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const next = () => {
    const currentAnswers = answers[chapterIndex];

    // 챕터 내 모든 질문 선택 확인
    if (currentAnswers.includes(null)) {
      alert("모든 질문을 선택해주세요");
      return;
    }

    if (chapterIndex === chapters.length - 1) {
      setResult(true);
    } else {
      setChapterIndex(chapterIndex + 1);
    }
  };

  if (result) return <Result />;

  const currentChapter = chapters[chapterIndex];

  const prev = () => {
    if (chapterIndex === 0) return; // 첫 단계에서는 막기
    setChapterIndex(chapterIndex - 1);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.container}>
        <h2 style={styles.logo}>DEWASSOME</h2>

        <div style={styles.subtitle}>
          <h3 style={{ margin: 0 }}>듀어썸 피부 기초체력 테스트</h3>
          <p style={{ marginTop: 4, marginBottom: 10, color: "#666" }}>전문가들이 개발한 피부 기초체력 설문지</p>
        </div>

        <div style={styles.progressWrap}>
          <div style={styles.progressBg}>
            <div
              style={{
                ...styles.progress,
                width: `${((chapterIndex) / chapters.length) * 100}%`,
              }}
            />
          </div>

          <div style={styles.stepText}>
            Step {chapterIndex} of {chapters.length}
          </div>
        </div>

        <h3 style={styles.chapterTitle}>{currentChapter.title}</h3>

        {currentChapter.questions.map((item, qIdx) => (
          <div key={qIdx} style={styles.card}>
            <p style={styles.question}>
              Q{qIdx + 1}. {item.q}
            </p>

            <div style={styles.grid}>
              {item.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => select(qIdx, i)}
                  style={{
                    ...styles.option,
                    background:
                      answers[chapterIndex][qIdx] === i
                        ? "#C24A2C"
                        : "#f2f2f2",
                    color:
                      answers[chapterIndex][qIdx] === i
                        ? "#fff"
                        : "#333",
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            style={styles.prev}
            onClick={prev}
            disabled={chapterIndex === 0}
          >
            이전 단계
          </button>

          <button style={styles.next} onClick={next}>
            다음 단계
          </button>
        </div>
      </div>
    </div>
  );
}

function Bar({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={styles.barHeader}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div style={styles.barBg}>
        <div
          style={{
            ...styles.barFill,
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function Result() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2초 (원하면 3000으로 늘려도 됨)

    return () => clearTimeout(timer);
  }, []);

  // ✅ 로딩 화면
  if (loading) {
    return (
      <div style={styles.wrap}>
        <div style={styles.container}>
          <h2 style={styles.logo}>DEWASSOME</h2>

          {/* 간단 로딩 */}
          <div style={styles.loader} />

          <div style={{ textAlign: "center" }}>
            <h2>피부 기초체력 진단중...</h2>
            <p style={{ color: "#666" }}>
              데이터를 분석하고 있습니다
            </p>


          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={styles.wrap}>
      <div style={styles.container}>
        <h2 style={styles.logo}>DEWASSOME</h2>
        <h1 style={styles.title}>듀어썸 피부 기초체력 테스트 결과</h1>

        {/* 얼굴 일러스트 (간단 SVG) */}
        <div style={styles.faceWrap}>
          <img
            src="/face.png"
            alt="face"
            style={styles.faceImg}
          />
        </div>

        {/* 점수 + 차트 */}
        <div style={styles.row}>
          {/* 왼쪽 */}
          <div style={styles.scoreCard}>
            <p style={styles.cardTitle}>전반적인 피부 건강 점수</p>

            <div style={styles.donut}>
              <div style={styles.donutInner}>88점</div>
            </div>

            <p style={{ textAlign: "center", fontSize: 14, color: "#666" }}>
              뛰어난 피부 기초체력을 보유하고 있습니다.
            </p>
          </div>

          {/* 오른쪽 */}
          <div style={styles.scoreCard2}>
            <p style={styles.cardTitle}>상세 피부 지표</p>

            <div style={styles.barWrap}>
              <Bar label="수분" value={89} />
              <Bar label="탄력" value={30} />
              <Bar label="피부 톤" value={75} />
              <Bar label="주름" value={40} />
              <Bar label="민감도" value={22} />
            </div>
          </div>
        </div>

        {/* 스킨케어 가이드 */}
        <div style={styles.guideCard}>
          <h3 style={{ margin: "0px 0px 10px 0px", fontSize: 16 }}>개인 맞춤 스킨케어 가이드</h3>

          <img
            src="/skin.png"
            alt="skin"
            style={styles.skinImg}
          />
        </div>

        <div style={styles.shareCard}>
          {/* 상단 텍스트 + 공유 아이콘 */}
          <div style={styles.shareHeader}>
            <p style={styles.shareTitle}>나의 결과 공유 및 다음 단계</p>

            <div style={styles.shareIcon}>
              🔗
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
            {/* 버튼 */}
            <button style={styles.mainBtn}>
              나의 피부 타입 더 알아보기
            </button>

            {/* SNS 아이콘 */}
            <div style={styles.iconRow}>
              <div style={styles.circleIcon}>
                <img
                  src="/kakao.jpg"
                  alt="skin"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div style={styles.circleIcon}>
                <img
                  src="/insta.png"
                  alt="skin"
                  style={{ width: 20, height: 20 }}
                />
              </div>
              <div style={styles.circleIcon}>🔗</div>
            </div>
          </div>

          <button style={styles.mainBtn} onClick={() => window.location.reload()}>
            피부 기초체력 다시하기
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  prev: {
    flex: 1,
    padding: "16px",
    background: "#ddd",
    border: "none",
    cursor: "pointer",
    borderRadius: 14,
  },

  shareCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    background: "#f8f8f8",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  shareHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  shareTitle: {
    margin: 0,
    fontWeight: 600,
  },

  shareIcon: {
    fontSize: 18,
    cursor: "pointer",
  },

  mainBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    marginBottom: 15,
  },

  iconRow: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
  },

  circleIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  barWrap: {
    marginTop: 10,
  },

  barHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 4,
  },

  barBg: {
    height: 6,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    background: "#C24A2C",
    borderRadius: 10,
  },

  faceWrap: {
    display: "flex",
    justifyContent: "center",
  },
  faceImg: {
    width: "360px",
    display: "block",
    margin: "0 auto",
  },
  skinImg: {
    maxWidth: "400px",
    width: "100%",
    display: "block",
    margin: "0",
  },
  row: {
    display: "flex",
    gap: 10,
  },
  loader: {
    margin: "100px auto 50px auto",
    width: 50,
    height: 50,
    border: "4px solid #eee",
    borderTop: "4px solid #C24A2C",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  scoreCard: {
    flex: 1,
    background: "#fff",
    borderRadius: 16,
    padding: "10px 15px",
    border: "2px solid #d42c2c",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(196, 167, 167, 0.9)",
  },
  scoreCard2: {
    flex: 1,
    background: "#fff",
    borderRadius: 16,
    padding: "10px 15px",
    height: "100%",
    boxShadow: "0 4px 12px rgba(196, 167, 167, 0.9)",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    margin: 4,
  },

  donut: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "conic-gradient(#C24A2C 80%, #eee 0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4px auto",
  },

  donutInner: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
  },

  metricText: {
    fontSize: 12,
    marginTop: 10,
    display: "grid",
    gap: 4,
  },

  guideCard: {
    marginTop: 20,
    background: "#fff",
    padding: 15,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  guideRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },



  subtitle: {
    textAlign: "center",
  },
  stepText: {
    fontSize: 12,
    color: "#999",
    whiteSpace: "nowrap",
  },
  wrap: {
    background: "#eee",
    minHeight: "100vh",
  },
  container: {
    maxWidth: 420,
    margin: "0 auto",
    background: "#fff",
    padding: 20,
    minHeight: "calc(100vh - 40px)",
  },
  logo: {
    textAlign: "center",
    marginBottom: 10,
  },

  progressBg: {
    height: 6,
    background: "#ddd",
    borderRadius: 10,
    width: "80%",

  },
  progress: {
    height: "100%",
    background: "#C24A2C",
    borderRadius: 10,
  },
  chapterTitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "#C24A2C",
    background: "#f0eded",
    padding: 6,
    fontSize: 16,
  },
  card: {
    marginBottom: 30,
  },
  question: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gap: 4,
  },
  option: {
    padding: "14px 10px",
    borderRadius: 8,
    textAlign: "center",
    cursor: "pointer",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  next: {
    width: "70%",
    padding: 16,
    background: "#C24A2C",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: 14,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "10px solid #C24A2C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    margin: "20px auto",
  },
};