import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { questions } from '../data/questions';

export default function Quiz() {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = async (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      let score = 0;
      questions.forEach((q) => {
        if (newAnswers[q.id] === q.correctAnswer) {
          score++;
        }
      });

      await supabase.from('quiz_submissions').insert({
        user_id: user!.id,
        email: user!.email!,
        answers: newAnswers,
        score
      });

      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cevaplarınız kaydedildi. Teşekkürler.
          </h2>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">
            Soru {currentQuestion + 1} / {questions.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-gray-900 font-medium"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
