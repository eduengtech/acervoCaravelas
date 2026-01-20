import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./styles/PopularCategories.module.scss";

interface CategoriaPopular {
  name: string;
  value: number;
  [key: string]: string | number | undefined;
}

interface PopularCategoriesProps {
  data: CategoriaPopular[];
}

const COLORS = ["#1a4d43", "#d4a017", "#c2b280", "#e5e4e2"];

export function PopularCategories({ data }: PopularCategoriesProps) {
  // Cálculo para a barra ser sempre proporcional ao maior valor
  const maxVal = data.length > 0 ? Math.max(...data.map((d) => d.value)) : 1;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categorias Populares</h2>

      <div className={styles.contentWrapper}>
        <div className={styles.legend}>
          {data.map((item, index) => (
            <div key={item.name} className={styles.legendItem}>
              <div className={styles.labelRow}>
                <div className={styles.info}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className={styles.name}>{item.name}</span>
                </div>
                <span className={styles.value}>{item.value}</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(item.value / maxVal) * 100}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
