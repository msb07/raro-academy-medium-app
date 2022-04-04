import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleThumbnailProps } from '../../components/ArticleThumbnail/ArticleThumbnail.types';
import { ArticleView } from '../../components/ArticleView';
import apiClient from '../../services/api-client';

export const ArtigoPage = () => {
  const [article, setArticle] = useState<ArticleThumbnailProps>();
  const { id } = useParams();

  useEffect(() => {
    async function loadArticle() {
      const url = `/artigos/${id}`;
      const response = await apiClient.get(url);
      setArticle({
        ...response.data,
        dataPublicacao: new Date(response.data.dataPublicacao),
      });
    }

    loadArticle();
  }, [id]);

  return (
    <div className='ml-60 mr-20 my-10'>
      {article && (
        <ArticleView
          article={article.conteudo}
          autor={article.autor}
          dataPublicacao={article.dataPublicacao}
          tempoLeitura={article.tempoLeitura}
        />
      )}
    </div>
  );
};
