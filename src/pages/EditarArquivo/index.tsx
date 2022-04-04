import apiClient from '../../services/api-client';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleForm } from '../../components/ArticleForm';
import { ArticleThumbnailProps } from '../../components/ArticleThumbnail/ArticleThumbnail.types';

export const EditarArquivoPage = () => {
  const [artigo, setArtigo] = useState<ArticleThumbnailProps>();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (artigo: ArticleThumbnailProps) => {
    if (artigo.id) {
      alteraArtigo(artigo);
    } else {
      novoArtigo(artigo);
    }
  };

  async function alteraArtigo(artigo: ArticleThumbnailProps) {
    const url = `/artigos/${id}`;
    const response = await apiClient.patch(url, {
      titulo: artigo.titulo,
      imagem: artigo.imagem,
      resumo: artigo.resumo,
      conteudo: artigo.conteudo,
    });
    navigate(`/artigo/${response.data.id}`);
    return response;
  }

  async function novoArtigo(artigo: ArticleThumbnailProps) {
    const url = `/artigos`;
    const response = await apiClient.post(url, {
      titulo: artigo.titulo,
      imagem: artigo.imagem,
      resumo: artigo.resumo,
      conteudo: artigo.conteudo,
    });
    navigate(`/artigo/${response.data.id}`);
    return response;
  }

  async function deletaArtigo() {
    const url = `/artigos/${id}`;
    const response = await apiClient.delete(url);
    navigate('/artigos');
    return response;
  }

  useEffect(() => {
    if (id) {
      buscaArtigo();
    }
  }, [id]);

  async function buscaArtigo() {
    const response = await apiClient.get<ArticleThumbnailProps>(
      `/artigos/${id}`
    );
    setArtigo(response.data);
  }

  return (
    <>
      <div className='items-center justify-center m-10'>
        <ArticleForm
          article={artigo}
          onSubmit={handleSubmit}
          onClick={deletaArtigo}
        />
      </div>
    </>
  );
};
