import axios from 'axios';
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
    const token = localStorage.getItem('access_token');
    const url = `http://3.221.159.196:3307/artigos/${artigo.id}`;
    const response = await axios.patch(
      url,
      {
        titulo: artigo.titulo,
        imagem: artigo.imagem,
        resumo: artigo.resumo,
        conteudo: artigo.conteudo,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    navigate('/artigos');
    return response;
  }

  async function novoArtigo(artigo: ArticleThumbnailProps) {
    const token = localStorage.getItem('access_token');
    const url = `http://3.221.159.196:3307/artigos/`;
    const response = await axios.post(
      url,
      {
        titulo: artigo.titulo,
        imagem: artigo.imagem,
        resumo: artigo.resumo,
        conteudo: artigo.conteudo,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    navigate('/artigos');
    return response;
  }

  useEffect(() => {
    if (id) {
      buscaArtigo();
    }
  }, [id]);

  async function buscaArtigo() {
    const token = localStorage.getItem('access_token');
    const response = await axios.get<ArticleThumbnailProps>(
      `http://3.221.159.196:3307/artigos/${id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    setArtigo(response.data);
  }

  return (
    <>
      <div className='items-center justify-center m-10'>
        <ArticleForm article={artigo} onSubmit={handleSubmit} />
      </div>
    </>
  );
};
