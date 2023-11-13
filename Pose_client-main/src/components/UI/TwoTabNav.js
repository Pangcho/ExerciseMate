import React, {useState} from 'react';
import styled from "styled-components";
import {ThemeColor} from "../../constants/Constants";
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 30px;
  position:sticky;
  top:10px;


  button {
    border: none;
    background-color: ${ThemeColor.navColor};
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 18px;
  }
`

export const TwoTabNav=({tab, tabStyle}) =>{
    const tabKeys = Object.keys(tab);
    const [activeTab, setActiveTab] = useState(tabKeys[0]);
    return (
        <>
            <TabContainer style={tabStyle}>
                {tabKeys.map(tabKey =>
                    <button key={tabKey}
                        onClick={() => setActiveTab(tabKey)}
                        style={{ fontWeight: activeTab === tabKey ? 'bold' : 'normal' }}>
                        {tabKey}
                    </button>
                )}
            </TabContainer>
            {tab[activeTab]}
        </>
    );
}

export default TwoTabNav;