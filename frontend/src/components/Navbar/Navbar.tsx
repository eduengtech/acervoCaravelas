import { Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./styles/Navbar.module.scss";

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className={styles.navbar}>
      {/*Campo de Busca*/}
      <div className={styles.searchContainer}>
        <Search size={18} />
        <input type="text" placeholder="Buscar no acervo..." />
      </div>
      {/* Ações da Direita */}
      <div className={styles.actions}>
        {/* Implemnetação futura
        <button className={styles.iconBtn}>
          <div className={styles.badge}>4</div>
          <Inbox size={22} />
        </button>

        <button className={styles.iconBtn}>
          <Mail size={22} />
        </button>

        <button className={styles.iconBtn}>
          <Bell size={22} />
        </button>*/}

        {/* Foto do Usuário Logado */}
        <img
          src={user?.avatarUrl || "https://github.com/shadcn.png"}
          alt="Perfil"
          className={styles.avatar}
        />
      </div>
    </header>
  );
}
