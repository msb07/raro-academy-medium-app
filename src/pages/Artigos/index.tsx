import apiClient from '../../services/api-client';
import { useEffect, useState } from 'react';
import { ArticleList } from '../../components/ArticleList';
import { ArticleThumbnailProps } from '../../components/ArticleThumbnail/ArticleThumbnail.types';

export const ArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);

  async function buscaArtigos() {
    const resposta = await apiClient.get<ArticleThumbnailProps[]>('/artigos');
    setArticles(resposta.data);
  }

  useEffect(() => {
    buscaArtigos();
  }, []);

  return (
    <div className='my-30'>
      <ArticleList articles={articles} />
    </div>
  );
};
