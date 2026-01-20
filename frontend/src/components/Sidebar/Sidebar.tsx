import logo from "../../assets/image/logo-acervo.png";
import styles from "./styles/Sidebar.module.scss";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Library,
  Settings,
  LogOut,
  UserCircle,
  ListTodo,
  User,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export function Sidebar() {
  // Destruturamos tudo de uma vez para ficar mais limpo
  const { user, signOut } = useAuth();

  const location = useLocation();
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      roles: ["ADMIN", "EDITOR"],
    },
    {
      label: "Acervos",
      icon: Library,
      path: "/acervos",
      roles: ["ADMIN", "EDITOR"],
    },
    {
      label: "Autores",
      icon: UserCircle,
      path: "/autores",
      roles: ["ADMIN", "EDITOR"],
    },
    {
      label: "Usuários",
      icon: User,
      path: "/users",
      roles: ["ADMIN", "EDITOR"],
    },
    {
      label: "Categoria",
      icon: ListTodo,
      path: "/usuarios",
      roles: ["ADMIN"],
    },
    {
      label: "Configurações",
      icon: Settings,
      path: "/config",
      roles: ["ADMIN", "EDITOR"],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Acervo Caravelas" />
      </div>

      <nav className={styles.navigation}>
        {menuItems.map((item) => {
          if (!user?.role || !item.roles.includes(user.role)) {
            return null;
          }
          const isActive = location.pathname === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <a onClick={signOut} className={styles.navItem}>
          <LogOut />
          <span>Sair</span>
        </a>
      </div>
    </aside>
  );
}
