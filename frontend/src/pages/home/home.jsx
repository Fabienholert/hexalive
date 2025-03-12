export default function Home() {
  return (
    <div className="Home__container">
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
        <input type="submit" value="Envoyer" />
        <input type="submit" value="S inscrire" />
      </form>
    </div>
  );
}
