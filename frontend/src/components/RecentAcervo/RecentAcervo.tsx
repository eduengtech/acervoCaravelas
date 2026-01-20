import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles/RecentAcervo.module.scss";
import { acervoHttp } from "../../service/api";

interface AcervoItem {
  id: string;
  titulo: string;
  tipoItem: { nome: string };
  categoria: { nome: string };
  criadoEm: string;
}

export function RecentAcervo() {
  const [items, setItems] = useState<AcervoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    acervoHttp
      .get("/acervo/recent")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Últimos Acervos Cadastrados</h2>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className={styles.info}>
                  Carregando...
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td className={styles.titulo}>{item.titulo}</td>
                  <td>{item.tipoItem?.nome}</td>
                  <td>
                    <span className={styles.badge}>{item.categoria?.nome}</span>
                  </td>
                  <td className={styles.date}>
                    {formatDistanceToNow(new Date(item.criadoEm), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.info}>
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.footer}>
          <button type="button">Ver todos os acervos</button>
        </div>
      </div>
    </div>
  );
}
