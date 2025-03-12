import "./home.scss";

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const elements = form.elements;

    const email = elements.email.value;
    const password = elements.password.value;

    form.reset();
    alert(`email= ${email} Password: ${password}`);
  };
  return (
    <div className="home__container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
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
