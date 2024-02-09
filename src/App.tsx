import React, { Suspense } from 'react';
import './styles/main.scss';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import FavoritesSkeleton from './components/favorites/FavoritesSkeleton';
import DetailPageSkeleton from './pages/detail/DetailPageSkeleton';
const DetailPage = React.lazy(() => import('./pages/detail/DetailPage'));
const FavoritesPage = React.lazy(() => import('./pages/favorites/FavoritesPage'));

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
              <Route
                path="/favorites"
                element={
                  <Suspense fallback={<FavoritesSkeleton />}>
                    <FavoritesPage />
                  </Suspense>
                }
              />
              <Route
                path="/movie/:movieId"
                element={
                  <Suspense fallback={<DetailPageSkeleton />}>
                    <DetailPage />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
