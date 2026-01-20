import { useDashboardStats } from "../../hooks/useDashboardStats";
import styles from "./styles/SummaryCards.module.scss";
import { Library, Tags, PenTool, Users } from "lucide-react";

export function SummaryCards() {
  const { stats } = useDashboardStats();

  const cardsConfig = [
    {
      label: "Total de Acervos",
      value: stats?.totalAcervo ?? 0,
      icon: Library,
      colorClass: styles.green,
    },
    {
      label: "Categorias",
      value: stats?.totalCategoria ?? 0,
      icon: Tags,
      colorClass: styles.blue,
    },
    {
      label: "Autores",
      value: stats?.totalAutores ?? 0,
      icon: PenTool,
      colorClass: styles.orange,
    },
    {
      label: "Usuários Ativos",
      value: stats?.totalUsuarios ?? 0,
      icon: Users,
      colorClass: styles.purple,
    },
  ];

  return (
    <section className={styles.grid}>
      {cardsConfig.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={`${styles.iconContainer} ${card.colorClass}`}>
            <card.icon size={24} />
          </div>
          <div className={styles.info}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        </div>
      ))}
    </section>
  );
}
