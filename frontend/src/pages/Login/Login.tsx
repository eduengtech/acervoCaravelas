import { useState } from "react";
import logo from "../../assets/image/logo-acervo.png"
import { useAuth } from "../../hooks/useAuth"
import styles from './Login.module.scss'

export const Login = () =>{
    const {signIn, signOut, isAuthenticated} =useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await signIn(email, senha);
    }

    return (
        <main className={styles.mainContainer}>
            <div className={styles.contentWrapper}>
                {/*Lado Esquerdo; ID Visual*/}
                <section className={styles.brandingSection}>
                    <img src={logo} alt="Logo Acervo Caravelas"  className={styles.logo}/>
                </section>

                {/* Lado Direito: Formulário de Acesso */}
                <section className={styles.formSection}>
                    <div className={styles.loginCard}>
                        <div className={styles.cardHeader}>
                            <h2 className={styles.welcomeText}>Bem vindo ao</h2>
                            <h2 className={styles.projectTitle}>Acervo <span>Caravelas!</span></h2>
                            <p>faça o Login para acessar o sistema</p>
                        </div>
                        
                        {!isAuthenticated ? (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                {/* Os inputs que já definimos antes virão aqui */}
                                <div className={styles.inputGroup}>
                                    <input type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input type="password"
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                    />
                                    <div className={styles.linkRemember}>
                                        <a href="" className="link">Esqueceu sua senha?</a>
                                    </div>
                                </div>
                                <button type="submit" className={styles.loginButton}>ENTRAR</button>
                                <p className={styles.loginFooter}>Um espaço digital para valorizar a história e a cultura de Caravelas.</p>
                            </form>
                        ) : (
                            <button onClick={signOut}>Logout Teste</button>
                        )}      
                    </div>
                </section>
            </div>
        </main>
    )
}