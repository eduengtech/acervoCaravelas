// src/hooks/useRecentAcervos.ts
import { useEffect, useState } from "react";
import { acervoHttp } from "../service/api";

export function useRecentAcervos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRecent() {
    try {
      setLoading(true);
      // Rota que definimos no NestJS
      const response = await acervoHttp.get("/acervo/recent");
      setData(response.data);
    } catch (error) {
      console.error("Erro ao carregar acervos recentes", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecent();
  }, []);

  return { data, loading, refresh: fetchRecent };
}
