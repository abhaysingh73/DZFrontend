import React, { useState } from 'react';
import Navbar from './Navbar';
import Table from "./Table";
import CreateForm from "./CreateForm";

const ProductMaster = () => {
    const [selectedTab, setSelectedTab] = useState('products');
    const renderTabContent = () => {
        switch (selectedTab) {
            case 'add':
                return <CreateForm/>;
            case 'products':
                return <Table/>;
            default:
                return <div>Select a tab</div>;
        }
    };
    return (
        <div>
            <Navbar onSelectTab={setSelectedTab} />
            <div className="content-container">{renderTabContent()}</div>
        </div>

    );
};

export default ProductMaster;
