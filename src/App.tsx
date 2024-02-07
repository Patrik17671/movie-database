import React from 'react';
import './styles/main.scss';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import DetailPage from './pages/detail/DetailPage';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className={'App'}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <div className={'container container--medium'}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/movie/:movieId" element={<DetailPage />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
