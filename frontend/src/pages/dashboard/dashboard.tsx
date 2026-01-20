import { useEffect, useState } from "react";
import { SummaryCards } from "../../components/Cards/SummaryCards";
import { PopularCategories } from "../../components/Categories/PopularCategories";
import { Navbar } from "../../components/Navbar/Navbar";
import { RecentAcervo } from "../../components/RecentAcervo/RecentAcervo";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { acervoHttp } from "../../service/api";
import styles from "./styles/Dashboard.module.scss";

interface CategoriaPopular {
  name: string;
  value: number;
  [Key: string]: string | number | undefined;
}

export const Dashboard = () => {
  const [popularData, setPopularData] = useState<CategoriaPopular[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await acervoHttp.get("/dashboard/popular-categories");
        setPopularData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContainer}>
        <Navbar />

        <header className={styles.mainTitle}>
          <h1>Bem-vindo ao Acervo Caravelas</h1>
          <p>
            Seu Gerenciador Cultural. Mantenha sua biblioteca digital organizada e segura
            em um só lugar.
          </p>
        </header>

        <SummaryCards />

        {/* Grid para alinhar Tabela e Gráfico lado a lado */}
        <section className={styles.contentGrid}>
          <div className={styles.tableArea}>
            <RecentAcervo />
          </div>
          <aside className={styles.chartArea}>
            <PopularCategories data={popularData} />
          </aside>
        </section>
      </main>
    </div>
  );
};
