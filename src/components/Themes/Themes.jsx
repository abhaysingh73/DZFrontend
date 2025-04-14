import React, { useState, useEffect } from 'react';
import "./Themes.css";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
import DigitalCard from '../DigitalCard/DigitalCard';
import { useUser } from '../../UserContext';
import { toast } from "react-toastify";

const Themes = () => {
    const { user } = useUser();
    let navigate = useNavigate();
    const [themes, setThemes] = useState({});
    const [themeColors, setThemesColors] = useState({});
    // const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedStructure, setSelectedStructure] = useState("0");

    useEffect(() => {
        API.get('http://localhost:5000/tmp/json/themes-color.json')
            .then((response) => {
                setThemesColors(response.data);
            })
            .catch((err) => console.error("themes not fetched", err));
        API.get('http://localhost:5000/tmp/json/themes-structure.json')
            .then((response) => {
                setThemes(response.data);
            })
            .catch((err) => console.error("themes not fetched", err));
    }, []);

    // const handleSelect = (theme) => {
    //     setSelectedTheme(theme);
    //     navigate(`/theme/${theme.id}`);
    // };

    const setNewTheme = () => {
        let reqObj = {
            themeId: selectedColor,
            themeStructureId: selectedStructure
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
        <div className="container">
            <div className="row vh-100">
                <div className="col-md-6">
                    <div className='outerDiv'>
                        <DigitalCard theme={themeColors[selectedColor]} structure={selectedStructure} />
                    </div>
                </div>
                <div className="col-md-6 bg-light d-flex align-items-center paddingBottom50">
                    <div className="text-center py-4" style={{ width: "100%" }}>
                        <h2 className="mb-3"> <span style={{ fontFamily: "cursive" }}>Hello </span>{user?.name?.toLowerCase()}</h2>
                        <p className="mb-4">Select the perfect theme for your Digital Card</p>
                        <div className="row justify-content-center">
                            <div className="col-md-6 mb-3">
                                <label>Structure</label>
                                <select
                                    className="form-select"
                                    value={selectedStructure}
                                    onChange={(e) => setSelectedStructure(e.target.value)}
                                >
                                    {Object.keys(themes).map((key) => (
                                        <option key={key} value={key}>
                                            {themes[key].name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Color Scheme</label>
                                <select className="form-select"
                                    value={selectedColor}
                                    onChange={(e) => setSelectedColor(e.target.value)}>
                                    {Object.keys(themeColors).map((key) => (
                                        <option key={key} value={key}>
                                            {themeColors[key].name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="forDesktop">
                                <button type="button" className="btn btn-success" onClick={setNewTheme}>Generate CARD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="forMobile navbar fixed-bottom navbar-light bg-light">
                <button type="button" className="btn btn-success" onClick={setNewTheme}>Confirm Selection</button>
            </nav>
        </div>
    );
}

export default Themes;
