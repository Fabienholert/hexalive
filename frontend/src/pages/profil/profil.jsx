export default function Profil() {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState([]); //déclare profiles

  // Hook pour récupérer la liste des profils (déplacé à l'intérieur du composant)
  const useProfiles = () => {
    useEffect(() => {
      const fetchProfiles = async () => {
        if (currentUser) {
          setProfiles([currentUser]); //utilise setProfiles
        } else {
          setProfiles([]); //utilise setProfiles
        }
      };

      fetchProfiles();
    }, [currentUser]);

    return {}; //ne retourne rien, on utilise setProfiles pour modifier l'état
  };

  useProfiles(); //appelle useProfiles

  const navigate = useNavigate();
  const { register, updateProfile /*currentUser*/ } = useAuth(); // currentUser déjà utilisé
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ville: "",
    codePostal: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    username: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (currentUser) {
        const success = await updateProfile(formData);
        if (success) {
          setIsEditing(false);
          alert("Profil mis à jour avec succès!");
        } else {
          setError(
            "Erreur lors de la mise à jour du profil. Veuillez réessayer."
          );
        }
      } else {
        console.log("Tentative d'inscription avec:", formData);
        const success = await register(formData);
        if (success) {
          alert("Profil créé avec succès!");
          navigate("/carte");
        } else {
          setError("Erreur lors de la création du profil. Veuillez réessayer.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification du profil:", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profil__container">
      <h1>Profil</h1>
      {/* Affichez les profils ici en utilisant `profiles` */}
      {profiles.map((profile, index) => (
        <div key={index}>{profile.username}</div>
      ))}
    </div>
  );
}
