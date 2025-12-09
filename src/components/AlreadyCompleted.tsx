import { useAuth } from '../contexts/AuthContext';

export default function AlreadyCompleted() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Katılımınız için teşekkürler. Testi daha önce tamamladınız.
        </h2>
        <button
          onClick={signOut}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
