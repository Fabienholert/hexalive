export default function Profil() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const elements = form.elements;

    const email = elements.email.value;
    const password = elements.password.value;
    const ville = elements.ville.value;
    const codepostal = elements.codepostal.value;
    const facebook = elements.facebook.value;
    const instagram = elements.instagram.value;
    const tiktok = elements.tiktok.value;

    form.reset();
    alert(`email= ${email} Password: ${password}`);
  };

  return (
    <div className="profil__container">
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
          id="email"
          name="password"
          placeholder="votre mot de passe"
          required
        />
        <label htmlFor="codepostal">Code Postal</label>
        <input
          type="number"
          id="codepostal"
          name="codepostal"
          placeholder="votre code postal"
          required
        />
        <label htmlFor="ville">ville</label>
        <input
          type="text"
          id="ville"
          name="ville"
          placeholder="votre ville"
          required
        />

        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          placeholder="votre facebook"
        />
        <label htmlFor="instagram">Instagram</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          placeholder="votre instagram"
          required
        />
        <label htmlForr="tiktok">Tiktok</label>
        <input
          type="text"
          id="tiktok"
          name="tiktok"
          placeholder="votre tiktok"
        />
        <input type="submit" value="enregistrer" />
      </form>
    </div>
  );
}
