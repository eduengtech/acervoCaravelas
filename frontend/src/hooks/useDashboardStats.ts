import { useEffect, useState } from "react";
import { acervoHttp } from "../service/api";

interface DashboardSats {
  totalAcervo: number;
  totalCategoria: number;
  totalAutores: number;
  totalUsuarios: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardSats>({
    totalAcervo: 0,
    totalCategoria: 0,
    totalAutores: 0,
    totalUsuarios: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function axiosStats() {
      try {
        setLoading(true);
        const response = await acervoHttp.get<DashboardSats>("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        setError("Erro ao carregar estatísticas");
        console.error(error);
      }
    }
    axiosStats();
  }, []);

  return { stats, loading, error };
}
