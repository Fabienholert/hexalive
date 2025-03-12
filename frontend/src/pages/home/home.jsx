import "./home.scss";

export default function Home() {
  return (
    <div className="home__container">
      <form>
        <label for="email"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre email"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="email"
          name="password"
          placeholder="votre mot de passe"
          required
        />
        <input type="submit" value="Se connecter" />
        <input type="submit" value="S inscrire" />
      </form>
    </div>
  );
}
