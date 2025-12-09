import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Quiz from './components/Quiz';
import AlreadyCompleted from './components/AlreadyCompleted';
import AdminDashboard from './components/AdminDashboard';

const ADMIN_EMAIL = 'uskudarbilisimkulubu@gmail.com';

function App() {
  const { user, loading } = useAuth();
  const [hasCompleted, setHasCompleted] = useState<boolean | null>(null);
  const [checkingCompletion, setCheckingCompletion] = useState(true);

  useEffect(() => {
    if (user) {
      checkIfCompleted();
    } else {
      setCheckingCompletion(false);
    }
  }, [user]);

  const checkIfCompleted = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('quiz_submissions')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();

    setHasCompleted(!!data);
    setCheckingCompletion(false);
  };

  if (loading || checkingCompletion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Yükleniyor...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (user.email === ADMIN_EMAIL) {
    return <AdminDashboard />;
  }

  if (hasCompleted) {
    return <AlreadyCompleted />;
  }

  return <Quiz />;
}

export default App;
