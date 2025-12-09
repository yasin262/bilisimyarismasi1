export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "ÜBK ne zaman açıldı?",
    options: ["2025", "2024"],
    correctAnswer: "2025"
  },
  {
    id: 2,
    text: "TBD açılımı nedir?",
    options: ["Türkiye Bilim Derneği", "Türkiye Bilişim Derneği"],
    correctAnswer: "Türkiye Bilişim Derneği"
  },
  {
    id: 3,
    text: "ÜBK kimler üye olabilir?",
    options: ["İletişim Fakültesi", "Mühendislik ve Doğa Bilimleri Fakültesi", "İnsan ve Toplum Bilimleri Fakültesi", "Hepsi"],
    correctAnswer: "Hepsi"
  },
  {
    id: 4,
    text: "Kıvanç Öner Kimdir?",
    options: ["ÜBK başkanı", "TBD İstanbul Başkanı"],
    correctAnswer: "TBD İstanbul Başkanı"
  },
  {
    id: 5,
    text: "TBD ne zaman kuruldu?",
    options: ["2013", "1997", "1998", "1971"],
    correctAnswer: "1971"
  }
];
