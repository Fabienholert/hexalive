export default function Profil() {
  return (
    <div className="profil__container">
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
        <label for="number">Code Postale</label>
        <input
          type="number"
          id="codepostale"
          name="codepostale"
          placeholder="votre code postale"
          required
        />
        <label for="text">ville</label>
        <input
          type="text"
          id="ville"
          name="ville"
          placeholder="votre ville"
          required
        />

        <label for="text">Facebook</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          placeholder="votre facebook"
        />
        <label for="text">Instagram</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          placeholder="votre instagram"
          required
        />
        <label for="text">Tiktok</label>
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
