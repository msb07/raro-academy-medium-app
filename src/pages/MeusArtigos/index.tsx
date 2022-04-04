import apiClient from '../../services/api-client';
import { useEffect, useState } from 'react';
import { ArticleList } from '../../components/ArticleList';
import { ArticleThumbnailProps } from '../../components/ArticleThumbnail/ArticleThumbnail.types';
import { NoArticles } from '../../components/NoArticles';

export const MeusArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);

  async function buscaMeusArtigos() {
    const response = await apiClient.get<ArticleThumbnailProps[]>(
      '/artigos/meus-artigos'
    );
    setArticles(response.data);
  }

  useEffect(() => {
    buscaMeusArtigos();
  }, []);

  if (articles.length === 0) {
    return <NoArticles />;
  }
  return (
    <div className='my-30'>
      <ArticleList articles={articles} />
    </div>
  );
};
