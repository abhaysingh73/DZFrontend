import { useParams } from "react-router-dom";
import dcTheme1 from '../../assets/themes/DCTheme1.png';
import dcTheme2 from '../../assets/themes/DCTheme2.png';
import dcTheme3 from '../../assets/themes/DCTheme3.png';
import dcTheme4 from '../../assets/themes/DCTheme4.png';
import dcTheme5 from '../../assets/themes/DCTheme5.png';
import dcTheme6 from '../../assets/themes/DCTheme6.png';
import './ThemePage.css';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { toast } from "react-toastify";
import API from "../../Api";
import { useUser } from '../../UserContext';

const themes = [
    {
        id: 1,
        name: "Minimalistic & Elegant",
        image: dcTheme1,
        primaryColors: ["White", "Black", "Gray"],
        accentColors: ["Silver", "Gold"],
        bestFor: "Corporate, Modern, or Professional Digital Cards",
        example: "A white background with black text and gold/silver accents for icons or borders. This provides a clean and sleek look.",
        backgroundColor: "White",
        backgroundColorCode: "#FFFFFF",  // White
        textColor: "Black",
        textColorCode: "#000000",  // Black
        accentColor: "Gold", // or Silver
        accentColorCode: "#FFD700",  // Gold
    },
    {
        id: 2,
        name: "Vibrant & Playful",
        image: dcTheme2,
        primaryColors: ["Bright Blue", "Hot Pink", "Lime Green"],
        accentColors: ["Yellow", "Orange"],
        bestFor: "Creative professionals, Startups, or anyone in a fun, trendy industry",
        example: "A dark blue background with hot pink text and lime green accents for key elements. This combination is eye-catching and energetic.",
        backgroundColor: "Dark Blue",
        backgroundColorCode: "#1E90FF",  // Bright Blue
        textColor: "Hot Pink",
        textColorCode: "#FF1493",  // Hot Pink
        accentColor: "Lime Green",
        accentColorCode: "#32CD32",  // Lime Green
    },
    {
        id: 3,
        name: "Soft & Professional",
        image: dcTheme3,
        primaryColors: ["Navy Blue", "White", "Light Gray"],
        accentColors: ["Pastel Peach", "Pastel Mint Green"],
        bestFor: "Corporate, Consulting, or Financial sectors",
        example: "A navy blue background with white text, light gray icons, and pastel-colored accents for a calming, sophisticated vibe.",
        backgroundColor: "Navy Blue",
        backgroundColorCode: "#000080",  // Navy Blue
        textColor: "White",
        textColorCode: "#FFFFFF",  // White
        accentColor: "Pastel Mint Green", // or Pastel Peach
        accentColorCode: "#98FB98",  // Pastel Mint Green
    },
    {
        id: 4,
        name: "Nature-Inspired",
        image: dcTheme4,
        primaryColors: ["Forest Green", "Earth Brown", "Soft Beige"],
        accentColors: ["Golden Yellow", "Warm Red"],
        bestFor: "Eco-friendly businesses, wellness, or outdoor-oriented industries",
        example: "A forest green background with beige text and brown accents. Adding a golden yellow or red for a natural yet vibrant touch.",
        backgroundColor: "Forest Green",
        backgroundColorCode: "#228B22",  // Forest Green
        textColor: "Beige",
        textColorCode: "#F5F5DC",  // Beige
        accentColor: "Golden Yellow", // or Warm Red
        accentColorCode: "#FFD700",  // Golden Yellow
    },
    {
        id: 5,
        name: "Tech & Modern",
        image: dcTheme5,
        primaryColors: ["Dark Charcoal", "Navy", "Neon Green"],
        accentColors: ["Electric Blue", "Silver"],
        bestFor: "Tech startups, Digital products, or Innovators",
        example: "A dark charcoal background with neon green accents and white text. This gives off a modern, futuristic feel.",
        backgroundColor: "Dark Charcoal",
        backgroundColorCode: "#333333",  // Dark Charcoal
        textColor: "White",
        textColorCode: "#FFFFFF",  // White
        accentColor: "Neon Green", // or Electric Blue
        accentColorCode: "#39FF14",  // Neon Green
    },
    {
        id: 6,
        name: "Luxury & High-End",
        image: dcTheme6,
        primaryColors: ["Deep Burgundy", "Gold", "Cream"],
        accentColors: ["Black", "Dark Charcoal"],
        bestFor: "Luxury brands, high-end services, or fashion-related digital cards",
        example: "A deep burgundy background with gold text and accents, creating a luxurious, upscale feel.",
        backgroundColor: "Deep Burgundy",
        backgroundColorCode: "#800020",  // Deep Burgundy
        textColor: "Gold",
        textColorCode: "#FFD700",  // Gold
        accentColor: "Black", // or Dark Charcoal
        accentColorCode: "#000000",  // Black
    }
];

const ThemePage = () => {
    const navigate = useNavigate();
    const { themeId } = useParams();
    const theme = themes.find((t) => t.id == themeId);
    const { user } = useUser();

    if (!theme) {
        return <div>Theme not found</div>;
    }

    const backToThemes = () => {
        navigate('/themes')
    }

    const setNewTheme = () => {
        let reqObj = {
            themeId
        }
        API.post(`http://localhost:5000/api/onboard/update/${user._id}`, reqObj)
            .then((response) => {
                console.log(response);
                toast.success("Thank you, Your digital card will be mailed to you shortly");
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                toast.error("There was an error submitting the form. Please try again.");
            })
    }

    return (
        // <div>
        //   <h1>{theme.name}</h1>
        //   <p>{theme.bestFor}</p>
        //   <p>{theme.example}</p>
        //   <div style={{ backgroundColor: theme.backgroundColorCode, color: theme.textColorCode }}>
        //     <p>This is a preview of the {theme.name} theme!</p>
        //   </div>
        // </div>

        <div className="container">
            <div className="container-2">
            <div className="forDesktop">
                <button type="button" className="btn btn-success" onClick={setNewTheme}>Confirm Selection</button>&nbsp;
                <button type="button" className="btn btn-primary" onClick={backToThemes}>Go Back</button>
            </div>
            <br></br>
            <h2>{theme.name} Theme</h2>
                <div className="row theme-grid">
                    <div className="col-sm-3 theme-card" >
                        <div className={`card ${theme?.id === theme.id ? 'selected' : ''}`}>
                            <img src={theme.image} className="card-img-top" alt={theme.name} />
                            <div className="card-body">
                                <h5 className="card-title">{theme.name}</h5>
                                <p className="card-text">{theme.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 theme-card" >
                        <div className={`card ${theme?.id === theme.id ? 'selected' : ''}`}>
                            <img src={theme.image} className="card-img-top" alt={theme.name} />
                            <div className="card-body">
                                <h5 className="card-title">QR Code Display</h5>
                                <p className="card-text">{theme.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 theme-card" >
                        <div className={`card ${theme?.id === theme.id ? 'selected' : ''}`}>
                            <img src={theme.image} className="card-img-top" alt={theme.name} />
                            <div className="card-body">
                                <h5 className="card-title">Catalog Display</h5>
                                <p className="card-text">{theme.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 theme-card" >
                        <div className={`card ${theme?.id === theme.id ? 'selected' : ''}`}>
                            <img src={theme.image} className="card-img-top" alt={theme.name} />
                            <div className="card-body">
                                <h5 className="card-title">About Section</h5>
                                <p className="card-text">{theme.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="forMobile navbar fixed-bottom navbar-light bg-light">
                <button type="button" className="btn btn-success" onClick={setNewTheme}>Confirm Selection</button>
                <button type="button" className="btn btn-primary" onClick={backToThemes}>Go Back</button>
            </nav>
        </div>


    );
};

export default ThemePage;
