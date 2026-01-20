import { useState } from "react";
import logo from "../../assets/image/logo-acervo.png";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/Loading/LoadingSpinner";

export const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, senha);
      navigate("/dashboard");
    } catch {
      alert("Falha no login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        {/*Lado Esquerdo; ID Visual*/}
        <section className={styles.brandingSection}>
          <img src={logo} alt="Logo Acervo Caravelas" className={styles.logo} />
        </section>

        {/* Lado Direito: Formulário de Acesso */}
        <section className={styles.formSection}>
          <div className={styles.loginCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.welcomeText}>Bem vindo ao</h2>
              <h2 className={styles.projectTitle}>
                Acervo <span>Caravelas!</span>
              </h2>
              <p>faça o Login para acessar o sistema</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Os inputs que já definimos antes virão aqui */}
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <div className={styles.linkRemember}>
                  <a href="#recuperar" className="link">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              <button type="submit" className={styles.loginButton} disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "ENTRAR"}
              </button>
              <p className={styles.loginFooter}>
                Um espaço digital para valorizar a história e a cultura de Caravelas.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};
