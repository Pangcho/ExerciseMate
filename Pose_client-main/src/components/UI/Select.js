import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {ThemeColor} from "../../constants/Constants"

const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

`;

const SelectedOption = styled.div`
  margin-left: 20px;
`;

const Arrow = styled.div`
  margin-right: 20px;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  margin-top: 10px;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

const Option = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  z-index: 10;
  border-radius: 16px;

  &:hover {
    background-color: ${ThemeColor.buttonColor};
  }
`;

const CustomSelect = ({item, options, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const containerRef = useRef(null);
    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange({option, item})
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SelectContainer ref={containerRef} onClick={toggleOptions}>
            <SelectedOption>{selectedOption ?? item}</SelectedOption>
            <Arrow>{isOpen ? '▲' : '▼'}</Arrow>
            {isOpen && (
                <OptionsList isOpen={isOpen}>
                    {options.map((option) => (
                        <Option key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </Option>
                    ))}
                </OptionsList>
            )}
        </SelectContainer>
    );
};

export default CustomSelect;